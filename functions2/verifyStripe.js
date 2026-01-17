const Stripe = require('stripe');
require('dotenv').config();

const key = process.env.STRIPE_SECRET_KEY;
const accountId = process.env.STRIPE_ACCOUNT_ID;

if (!key) {
    console.error("No STRIPE_SECRET_KEY found in environment.");
    process.exit(1);
}

console.log(`Testing key: ${key.substring(0, 15)}...`);
console.log(`Account ID: ${accountId || 'None provided'}`);

const stripe = new Stripe(key, {
    apiVersion: '2024-04-10',
});

async function verify() {
    try {
        console.log("Attempting to create a Checkout Session (expecting 'No such price' error)...");

        // Use a dummy price ID. If we get "No such price", it means we have PERMISSION.
        // If we get "Permission denied", we don't.
        const priceId = "price_fake123";

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
        }, {
            stripeAccount: accountId,
        });

        console.log("✅ Checkout Session created successfully! (Unexpected for fake price)");
        console.log("Session ID:", session.id);
        console.log("URL:", session.url);

    } catch (err) {
        if (err.message.includes("No such price")) {
            console.log("✅ PERMISSION CONFIRMED! (Stripe authorized the request and rejected the fake price)");
        } else {
            console.error("❌ Verification failed:", err.message);
        }
    }
}

verify();
