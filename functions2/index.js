// Cloud Functions entry point for Carnival Planner premium subscriptions.

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const StripeLib = require("stripe");

// Initialise the Firebase Admin SDK once per process.
admin.initializeApp();

/**
 * createCheckoutSession
 *
 * Callable function that creates a Stripe Checkout session for a
 * subscription to Carnival Planner Premium.
 *
 * The client calls this with:
 *   const createSession = httpsCallable(functions, "createCheckoutSession");
 *   const { sessionId } = await createSession({ priceId: "price_123" });
 *   stripe.redirectToCheckout({ sessionId });
 */
exports.createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // Require the user to be logged in.
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

    // Read Stripe secret from functions config *inside* the handler
    const stripeSecret = functions.config().stripe &&
      functions.config().stripe.secret_key;

    if (!stripeSecret) {
      // This prevents runtime crashes if config is missing
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Stripe is not configured on this project. " +
          "Set functions.config().stripe.secret_key first."
      );
    }

    // Initialise Stripe client lazily, once we know we have a key
    const stripe = StripeLib(stripeSecret);

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: context.auth.token.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: "https://carnival-planner.web.app/premium-success",
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
  }
);
