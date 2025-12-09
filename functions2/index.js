// Cloud Functions entry point for Carnival Planner premium subscriptions.

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

const APP_ID = "carnival-planner-v1";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;

let stripe = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-04-10" });
} else {
  console.warn("Stripe secret key is not set.");
}

const db = admin.firestore();
const { FieldValue } = admin.firestore;

// ----- Helper: Set Premium Status -----
async function setPremiumStatus(uid, info) {
  const { active, priceId, customerId, subscriptionId, currentPeriodEnd, status } = info;
  const userAppRef = db.doc(`users/${uid}/apps/${APP_ID}`);
  
  const update = {
    premiumActive: !!active,
    premiumUpdatedAt: FieldValue.serverTimestamp(),
  };
  if (priceId) update.premiumPriceId = priceId;
  if (customerId) update.stripeCustomerId = customerId;
  if (subscriptionId) update.stripeSubscriptionId = subscriptionId;
  if (currentPeriodEnd) update.premiumCurrentPeriodEnd = currentPeriodEnd;
  if (status) update.subscriptionStatus = status;

  await userAppRef.set(update, { merge: true });
}

// ----- Callable: createCheckoutSession -----
exports.createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    
    // --- 1. SAFETY UNWRAP LOGIC ---
    // Sometimes data arrives as { data: { priceId: ... } } instead of { priceId: ... }
    let payload = data || {};
    if (payload.data && !payload.priceId) {
        console.log("Unwrapping nested data object...");
        payload = payload.data;
    }

    const { 
      priceId, 
      uid: uidFromClient, 
      email: emailFromClient,
      success_url,
      cancel_url 
    } = payload;

    // --- 2. LOGGING FOR DEBUGGING ---
    console.log("createCheckoutSession Processing:", {
      receivedKeys: Object.keys(payload),
      priceId: priceId,
      hasAuth: !!context.auth
    });

    const uid = (context.auth && context.auth.uid) || uidFromClient;
    const email = (context.auth && context.auth.token && context.auth.token.email) || emailFromClient;

    // --- 3. VALIDATION WITH DETAILED ERROR ---
    if (!priceId || typeof priceId !== "string") {
      // Return the EXACT data received so we can see it in the browser console error
      throw new functions.https.HttpsError(
        "invalid-argument",
        `A valid Stripe priceId string is required. Server received: ${JSON.stringify(payload)}`
      );
    }

    if (!stripe) {
      throw new functions.https.HttpsError("failed-precondition", "Stripe is not configured on the server.");
    }

    // Default URL logic
    const DEFAULT_ORIGIN = "https://carnival-planner.web.app";
    const origin = success_url || DEFAULT_ORIGIN;
    const cancelOrigin = cancel_url || DEFAULT_ORIGIN;

    const finalSuccessUrl = `${origin}/premium-success?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = `${cancelOrigin}/premium-cancel`;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email || undefined,
        line_items: [{ price: priceId, quantity: 1 }],
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
        success_url: finalSuccessUrl,
        cancel_url: finalCancelUrl,
      });

      return {
        sessionId: session.id,
        checkoutUrl: session.url,
        url: session.url 
      };
    } catch (err) {
      console.error("Error creating Stripe Checkout session:", err);
      throw new functions.https.HttpsError("internal", `Stripe API Error: ${err.message}`);
    }
  }
);

// ----- Webhook: handleStripeWebhook -----
exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
    if (!stripe || !webhookSecret) return res.status(500).send("Stripe not configured.");

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const uid = session.metadata.firebaseUid;
        if (uid) {
           await setPremiumStatus(uid, {
            active: true,
            priceId: session.metadata.priceId,
            customerId: session.customer,
            subscriptionId: session.subscription,
            status: "active"
          });
        }
      } else if (["customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) {
         const subscription = event.data.object;
         const uid = subscription.metadata.firebaseUid;
         if (uid) {
           const active = subscription.status === "active" || subscription.status === "trialing";
           await setPremiumStatus(uid, {
             active,
             priceId: subscription.metadata.priceId,
             customerId: subscription.customer,
             subscriptionId: subscription.id,
             status: subscription.status
           });
         }
      }
      res.json({ received: true });
    } catch (err) {
      console.error("Webhook handler error:", err);
      res.status(500).send("Webhook handler failed.");
    }
});