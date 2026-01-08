const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

exports.testReceivePriceId = functions.https.onRequest(async (req, res) => {
  const { priceId, billingInterval } = req.body;

  if (!priceId) {
    console.warn("❌ No priceId received.");
    return res.status(400).json({ error: "Missing priceId" });
  }

  console.log("✅ Received priceId:", priceId);
  console.log("ℹ️ Billing Interval:", billingInterval || "not provided");

  // Optionally create a dummy checkout session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return res.status(200).json({
      message: "Stripe session created",
      sessionId: session.id,
    });
  } catch (error) {
    console.error("❌ Stripe error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});
