/**
 * Firebase Cloud Functions configuration for Stripe Checkout.
 *
 * This example demonstrates how to create a secure endpoint that
 * initializes a Stripe Checkout session for a subscription.  You
 * should not embed your Stripe secret key in client‑side code.  Use
 * the Firebase CLI to set `stripe.secret_key` in your environment:
 *
 *   firebase functions:config:set stripe.secret_key="sk_live_..."
 *
 * Then deploy your functions:
 *
 *   firebase deploy --only functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Stripe with the secret key from environment configuration.
const stripe = Stripe(functions.config().stripe.secret_key);

/**
 * Callable function to create a Stripe Checkout session for a
 * subscription.  The client should pass a priceId (the ID of the
 * Stripe Price corresponding to your $4.99/month or $39.99/year plan).
 */
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to subscribe.');
  }
  const priceId = data.priceId;
  if (!priceId) {
    throw new functions.https.HttpsError('invalid-argument', 'A priceId is required.');
  }
  try {
    // Create a Checkout session with subscription mode
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // The success and cancel URLs should be on your domain
      success_url: 'https://carnival-planner.firebaseapp.com/checkout-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://carnival-planner.firebaseapp.com/checkout-cancelled',
      // Optionally pass the customer email
      customer_email: context.auth.token.email,
    });
    return { sessionId: session.id };
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    throw new functions.https.HttpsError('internal', 'Unable to create checkout session');
  }
});