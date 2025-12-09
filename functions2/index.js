// Cloud Functions entry point for Carnival Planner premium subscriptions.

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

// Keep this in sync with the appId used in your frontend Firestore paths.
const APP_ID = "carnival-planner-v1";

// ----- Stripe setup (v7 compatible — NO functions.config) -----
// These MUST be set in your environment using:
//   firebase functions:secrets:set STRIPE_SECRET_KEY
//   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;

let stripe = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
  });
} else {
  console.warn(
    "Stripe secret key is not set. Run:\n" +
      "firebase functions:secrets:set STRIPE_SECRET_KEY"
  );
}

if (!webhookSecret) {
  console.warn(
    "Stripe webhook secret not set. Run:\n" +
      "firebase functions:secrets:set STRIPE_WEBHOOK_SECRET"
  );
}

// Convenience for Firestore
const db = admin.firestore();
const { FieldValue } = admin.firestore;

// ----- Helper: update premium status in Firestore -----

async function setPremiumStatus(uid, info) {
  const {
    active,
    priceId,
    customerId,
    subscriptionId,
    currentPeriodEnd,
    status,
  } = info;

  const userAppRef = db.doc(`users/${uid}/apps/${APP_ID}`);

  const update = {
    premiumActive: !!active,
    premiumUpdatedAt: FieldValue.serverTimestamp(),
  };

  if (priceId !== undefined) update.premiumPriceId = priceId;
  if (customerId !== undefined) update.stripeCustomerId = customerId;
  if (subscriptionId !== undefined) update.stripeSubscriptionId = subscriptionId;
  if (currentPeriodEnd !== undefined)
    update.premiumCurrentPeriodEnd = currentPeriodEnd;
  if (status !== undefined) update.subscriptionStatus = status;

  await userAppRef.set(update, { merge: true });
}

// ----- Callable: createCheckoutSession -----

exports.createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // 1. Extract params, including the new URLs from the client
    const { 
      priceId, 
      uid: uidFromClient, 
      email: emailFromClient,
      success_url, // <--- New param from client
      cancel_url   // <--- New param from client
    } = data || {};

    // Prefer Firebase Auth, but fall back to explicit uid/email from client
    const uid = (context.auth && context.auth.uid) || uidFromClient;
    const email =
      (context.auth &&
        context.auth.token &&
        context.auth.token.email) ||
      emailFromClient;

    console.log("createCheckoutSession incoming:", {
      hasAuth: !!context.auth,
      uid,
      email,
      priceId,
      success_url // Log this to debug if needed
    });

    if (!uid) {
      console.warn(
        "createCheckoutSession called without uid. Proceeding without user metadata."
      );
    }

    if (!priceId || typeof priceId !== "string") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "A valid Stripe priceId string is required."
      );
    }

    if (!stripe) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Stripe is not configured on the server."
      );
    }

    // 2. LOGIC FIX: Determine the Redirect URLs
    // If client sends an origin (e.g. http://localhost:5173), use it.
    // If client sends nothing, fallback to the production URL.
    const DEFAULT_ORIGIN = "https://carnival-planner.web.app";
    
    // We treat the inputs as "Origins" because App.jsx sends window.location.origin
    const origin = success_url || DEFAULT_ORIGIN;
    const cancelOrigin = cancel_url || DEFAULT_ORIGIN;

    // Construct the full Stripe required format
    const finalSuccessUrl = `${origin}/premium-success?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = `${cancelOrigin}/premium-cancel`;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email || undefined,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          ...(uid ? { firebaseUid: uid } : {}),
          priceId,
          appId: APP_ID,
        },
        subscription_data: {
          metadata: {
            ...(uid ? { firebaseUid: uid } : {}),
            priceId,
            appId: APP_ID,
          },
        },
        // 3. USE THE DYNAMIC URLs
        success_url: finalSuccessUrl,
        cancel_url: finalCancelUrl,
      });

      return {
        sessionId: session.id,
        checkoutUrl: session.url,
        url: session.url // Return both just in case
      };
    } catch (err) {
      console.error("Error creating Stripe Checkout session:", err);
      // Return the specific error message to the client to help debugging
      throw new functions.https.HttpsError(
        "internal",
        `Unable to create Stripe Checkout session: ${err.message}`
      );
    }
  }
);

// ----- Webhook: handleStripeWebhook -----

exports.handleStripeWebhook = functions.https.onRequest(
  async (req, res) => {

    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    if (!stripe || !webhookSecret) {
      console.error("Stripe not configured. Cannot handle webhook.");
      res.status(500).send("Stripe not configured.");
      return;
    }

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const meta = session.metadata || {};
          const uid = meta.firebaseUid;
          const priceId = meta.priceId || null;

          if (!uid) break;

          const subscriptionId = session.subscription;
          const customerId = session.customer;
          let currentPeriodEnd = null;
          let status = "active";

          if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            status = sub.status;
            currentPeriodEnd = sub.current_period_end
              ? new Date(sub.current_period_end * 1000)
              : null;
          }

          await setPremiumStatus(uid, {
            active: true,
            priceId,
            customerId,
            subscriptionId,
            currentPeriodEnd,
            status,
          });

          break;
        }

        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object;
          const meta = subscription.metadata || {};
          const uid = meta.firebaseUid;
          const priceId = meta.priceId || null;

          if (!uid) break;

          const active =
            subscription.status === "active" ||
            subscription.status === "trialing";

          const currentPeriodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000)
            : null;

          await setPremiumStatus(uid, {
            active,
            priceId,
            customerId: subscription.customer,
            subscriptionId: subscription.id,
            currentPeriodEnd,
            status: subscription.status,
          });

          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Webhook handler error:", err);
      res.status(500).send("Webhook handler failed.");
    }
  });