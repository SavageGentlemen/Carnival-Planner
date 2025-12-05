// Cloud Functions entry point for Carnival Planner premium subscriptions.

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

// Keep this in sync with the appId used in your frontend Firestore paths.
const APP_ID = "carnival-planner-v1";

// ----- Stripe setup -----

// Set these from the project root:
//   firebase functions:config:set stripe.secret_key="sk_live_..." stripe.webhook_secret="whsec_..."
const stripeSecretKey = functions.config().stripe.secret_key;
const webhookSecret = functions.config().stripe.webhook_secret;

if (!stripeSecretKey) {
  throw new Error(
    "Missing Stripe secret key. Set with: firebase functions:config:set stripe.secret_key=\"sk_live_...\""
  );
}

if (!webhookSecret) {
  console.warn(
    "WARNING: stripe.webhook_secret is not set. Webhook verification will fail until you configure it."
  );
}

const stripe = Stripe(stripeSecretKey, {
  apiVersion: "2024-04-10",
});

// ----- Helpers -----

/**
 * Write premium flags to Firestore under:
 *   users/{uid}/apps/{APP_ID}
 */
async function setPremiumStatus(uid, data) {
  const db = admin.firestore();
  const appDocRef = db.collection("users").doc(uid).collection("apps").doc(APP_ID);

  await appDocRef.set(
    {
      premiumActive: data.active,
      premiumPriceId: data.priceId || null,
      stripeCustomerId: data.customerId || null,
      stripeSubscriptionId: data.subscriptionId || null,
      premiumCurrentPeriodEnd: data.currentPeriodEnd || null,
      premiumUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

// ----- Callable: createCheckoutSession -----

/**
 * Callable function: createCheckoutSession
 *
 * Client usage (frontend):
 *   const createSession = httpsCallable(functions, "createCheckoutSession");
 *   const { sessionId } = await createSession({ priceId });
 *   await stripe.redirectToCheckout({ sessionId });
 */
exports.createCheckoutSession = functions
  .region("us-central1")
  .https.onCall(async (data, context) => {
    // Require auth
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to start a checkout session."
      );
    }

    const { priceId } = data || {};
    if (!priceId || typeof priceId !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid Stripe priceId string is required."
      );
    }

    const uid = context.auth.uid;
    const email = context.auth.token.email;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        // Metadata used later in webhooks
        metadata: {
          firebaseUid: uid,
          priceId,
          appId: APP_ID,
        },
        subscription_data: {
          metadata: {
            firebaseUid: uid,
            priceId,
            appId: APP_ID,
          },
        },
        success_url:
          "https://carnival-planner.web.app/premium-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://carnival-planner.web.app/premium-cancel",
      });

      return { sessionId: session.id };
    } catch (err) {
      console.error("Error creating Stripe Checkout session:", err);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to create Stripe Checkout session."
      );
    }
  });

// ----- Webhook: handleStripeWebhook -----

/**
 * HTTP endpoint for Stripe webhooks.
 *
 * Configure in Stripe Dashboard:
 *   URL: https://us-central1-YOUR_PROJECT.cloudfunctions.net/handleStripeWebhook
 *   Events:
 *     - checkout.session.completed
 *     - customer.subscription.deleted
 *     - customer.subscription.updated (optional)
 *
 * IMPORTANT: In firebase.json you must allow rawBody for this function:
 *
 *   "functions": {
 *     "source": "functions2",
 *     "runtime": "nodejs20",
 *     "ignore": ["node_modules"],
 *     "serviceAccount": "default",
 *     "predeploy": ["npm --prefix \"$RESOURCE_DIR\" run lint || exit 0"],
 *     "endpoints": {
 *       "handleStripeWebhook": {
 *         "region": "us-central1"
 *       }
 *     }
 *   }
 */
exports.handleStripeWebhook = functions
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    let event;
    const sig = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;

          const meta = session.metadata || {};
          const uid = meta.firebaseUid;
          const priceId = meta.priceId;
          const appId = meta.appId || APP_ID;

          if (!uid || appId !== APP_ID) {
            console.warn("checkout.session.completed missing uid/appId metadata");
            break;
          }

          await setPremiumStatus(uid, {
            active: true,
            priceId,
            customerId: session.customer || null,
            subscriptionId: session.subscription || null,
            currentPeriodEnd: null, // we’ll update this on subscription.updated
          });
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object;
          const meta = subscription.metadata || {};
          const uid = meta.firebaseUid;
          const appId = meta.appId || APP_ID;

          if (!uid || appId !== APP_ID) break;

          const currentPeriodEnd = subscription.current_period_end
            ? admin.firestore.Timestamp.fromMillis(
                subscription.current_period_end * 1000
              )
            : null;

          await setPremiumStatus(uid, {
            active: subscription.status === "active",
            priceId: meta.priceId || subscription.items?.data?.[0]?.price?.id,
            customerId: subscription.customer || null,
            subscriptionId: subscription.id || null,
            currentPeriodEnd,
          });
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object;
          const meta = subscription.metadata || {};
          const uid = meta.firebaseUid;
          const appId = meta.appId || APP_ID;

          if (!uid || appId !== APP_ID) break;

          await setPremiumStatus(uid, {
            active: false,
            priceId: meta.priceId || null,
            customerId: subscription.customer || null,
            subscriptionId: subscription.id || null,
            currentPeriodEnd: null,
          });
          break;
        }

        default:
          console.log(`Unhandled Stripe event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Error handling Stripe webhook:", err);
      res.status(500).send("Webhook handler failed.");
    }
  });
