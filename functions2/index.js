const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

// Define the Stripe Secret Key Parameter
// Ensure you have set this via CLI: firebase functions:secrets:set STRIPE_SECRET_KEY
const stripeKey = defineString("STRIPE_SECRET_KEY");

exports.createCheckoutSession = onCall({ cors: true }, async (request) => {
  // Initialize Stripe inside the function using the secure parameter value
  const stripe = require("stripe")(stripeKey.value());

  const { priceId, successUrl, cancelUrl } = request.data;

  // Basic validation
  if (!priceId) {
    throw new HttpsError('invalid-argument', 'The function must be called with a "priceId".');
  }

  try {
    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Uses the ID passed from the frontend (Monthly or Yearly)
          quantity: 1,
        },
      ],
      mode: "subscription", // Required for recurring billing
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        product: "Carnival Planner Premium"
      }
    });

    // Return the URL to the frontend
    return { url: session.url, id: session.id };
    
  } catch (error) {
    console.error("Stripe Error:", error);
    // Throw a structured error back to the client
    throw new HttpsError('internal', 'Unable to initiate checkout: ' + error.message);
  }
});