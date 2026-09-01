const { onCall, HttpsError, onRequest } = require("firebase-functions/v2/https");
const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const { sendBandRegistrationConfirmation } = require("./emailService");

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY || null;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-04-10" });
}

function getSupabase() {
  const url = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key";
  return createClient(url, key);
}

exports.createBandDepositCheckout = onCall(
  { cors: true, invoker: "public", secrets: ["STRIPE_SECRET_KEY"] },
  async (request) => {
    const { bandId, sectionId, buyerName, buyerEmail, buyerPhone, selectedVariants, affiliateCode } = request.data || {};

    if (!bandId || !sectionId || !buyerEmail || !buyerName) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    const stripe = getStripe();
    if (!stripe) {
      throw new HttpsError("failed-precondition", "Stripe is not configured.");
    }

    const supabase = getSupabase();
    try {
      // 1. Get band profile for Stripe account ID
      const { data: bandData, error: bandError } = await supabase
        .from("band_profiles")
        .select("stripe_account_id, name, slug")
        .eq("id", bandId)
        .single();

      if (bandError || !bandData) {
        throw new Error("Band not found or Supabase error");
      }
      
      const bandStripeAccountId = bandData.stripe_account_id;
      if (!bandStripeAccountId) {
        throw new Error("Band has not connected Stripe");
      }

      // 2. Get section details
      const { data: sectionData, error: sectionError } = await supabase
        .from("band_costume_sections")
        .select("deposit_amount, capacity_limit, registration_count, name")
        .eq("id", sectionId)
        .single();

      if (sectionError || !sectionData) {
        throw new Error("Section not found");
      }

      if (sectionData.capacity_limit && sectionData.registration_count >= sectionData.capacity_limit) {
        throw new Error("Section is sold out");
      }

      const depositAmount = sectionData.deposit_amount;
      const depositCents = Math.round(depositAmount * 100);

      // 3. Calculate fees
      const platformFeeCents = Math.round(depositCents * 0.025) + 100; // 2.5% + $1.00

      // 4. Create Stripe Checkout Session
      const SITE_URL = process.env.SITE_URL || "https://carnival-planner.web.app";
      const slug = bandData.slug || bandId;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: buyerEmail,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${bandData.name} - ${sectionData.name} Deposit`,
              },
              unit_amount: depositCents,
            },
            quantity: 1,
          }
        ],
        payment_intent_data: {
          application_fee_amount: platformFeeCents,
          transfer_data: {
            destination: bandStripeAccountId,
          }
        },
        metadata: {
          bandId,
          sectionId,
          buyerName,
          buyerEmail,
          buyerPhone: buyerPhone || "",
          selectedVariants: JSON.stringify(selectedVariants || {}),
          affiliateCode: affiliateCode || "",
          type: "band_deposit"
        },
        success_url: `${SITE_URL}/band/${slug}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_URL}/band/${slug}`,
      });

      return {
        url: session.url,
        sessionId: session.id
      };
    } catch (err) {
      console.error("Band checkout error:", err);
      throw new HttpsError("internal", err.message);
    }
  }
);

exports.handleBandCheckoutWebhook = onRequest(
  { secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "GMAIL_USER", "GMAIL_APP_PASSWORD"] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;
    if (!stripe || !webhookSecret) {
      res.status(500).send("Stripe not configured");
      return;
    }

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    const supabase = getSupabase();
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const meta = session.metadata || {};

      if (meta.type === "band_deposit") {
        try {
          const { bandId, sectionId, buyerName, buyerEmail, buyerPhone, selectedVariants, affiliateCode } = meta;

          // Create order in Supabase
          const { data: orderData, error: orderError } = await supabase
            .from("band_orders")
            .insert({
              band_id: bandId,
              section_id: sectionId,
              buyer_name: buyerName,
              buyer_email: buyerEmail,
              buyer_phone: buyerPhone,
              variants: JSON.parse(selectedVariants || "{}"),
              affiliate_code: affiliateCode,
              stripe_session_id: session.id,
              amount_paid: session.amount_total / 100,
              status: "deposit_paid"
            })
            .select()
            .single();

          if (orderError) throw orderError;

          const orderId = orderData.id;

          // Generate QR code identifier
          const qrCode = `BANDOS-${orderId}`;
          await supabase.from("band_orders").update({ order_qr_code: qrCode }).eq("id", orderId);

          // Get default payment plan logic (simplified placeholder for now)
          // E.g., we could create schedule entries here
          await supabase.from("band_payment_schedule").insert({
            order_id: orderId,
            amount: 100, // placeholder
            due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: "pending"
          });

          // Increment section registration
          const { data: sectionData } = await supabase
            .from("band_costume_sections")
            .select("title, registration_count, capacity_limit, base_price")
            .eq("id", sectionId)
            .single();
            
          if (sectionData) {
            const newCount = (sectionData.registration_count || 0) + 1;
            const updates = { registration_count: newCount };
            
            if (sectionData.capacity_limit && newCount >= sectionData.capacity_limit) {
              updates.is_sold_out = true;
            }
            
            await supabase.from("band_costume_sections").update(updates).eq("id", sectionId);
          }

          // Dispatch confirmation email
          try {
            const { data: bandData } = await supabase
              .from("band_profiles")
              .select("business_name, slug, primary_color")
              .eq("id", bandId)
              .single();

            const SITE_URL = process.env.SITE_URL || "https://carnival-planner.web.app";
            const bandSlug = bandData?.slug || bandId;
            const portalUrl = `${SITE_URL}/band/${bandSlug}/order/${orderId}`;
            const bandTitle = bandData?.business_name || "Carnival Band";

            await sendBandRegistrationConfirmation({
              to: buyerEmail,
              bandName: bandTitle,
              sectionTitle: sectionData?.title || "Costume Section",
              buyerName: buyerName,
              depositPaid: session.amount_total / 100,
              totalAmount: sectionData?.base_price || (session.amount_total / 100),
              orderId: orderId,
              orderQrCode: qrCode,
              portalUrl: portalUrl,
              primaryColor: bandData?.primary_color || "#ec4899"
            });
          } catch (emailErr) {
            console.warn("[BandOS Webhook] Confirmation email notice:", emailErr.message);
          }

        } catch (e) {
          console.error("Error processing band deposit webhook:", e);
        }
      }
    }

    res.json({ received: true });
  }
);

exports.createBalancePaymentCheckout = onCall(
  { cors: true, invoker: "public", secrets: ["STRIPE_SECRET_KEY"] },
  async (request) => {
    const { orderId, scheduleId, buyerEmail } = request.data || {};

    if (!orderId || !scheduleId || !buyerEmail) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    const stripe = getStripe();
    if (!stripe) {
      throw new HttpsError("failed-precondition", "Stripe is not configured.");
    }

    const supabase = getSupabase();
    try {
      // Validate order ownership
      const { data: orderData, error: orderError } = await supabase
        .from("band_orders")
        .select("buyer_email, band_id")
        .eq("id", orderId)
        .single();

      if (orderError || !orderData) {
        throw new Error("Order not found");
      }

      if (orderData.buyer_email !== buyerEmail) {
        throw new Error("Unauthorized");
      }

      // Get schedule amount
      const { data: scheduleData, error: scheduleError } = await supabase
        .from("band_payment_schedule")
        .select("amount, status")
        .eq("id", scheduleId)
        .single();

      if (scheduleError || !scheduleData || scheduleData.status !== "pending") {
        throw new Error("Invalid schedule entry");
      }

      // Get band stripe account
      const { data: bandData } = await supabase
        .from("band_profiles")
        .select("stripe_account_id, name, slug")
        .eq("id", orderData.band_id)
        .single();

      const paymentAmountCents = Math.round(scheduleData.amount * 100);
      const platformFeeCents = Math.round(paymentAmountCents * 0.025) + 100;

      const SITE_URL = process.env.SITE_URL || "https://carnival-planner.web.app";
      const slug = bandData.slug || orderData.band_id;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: buyerEmail,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${bandData.name} - Installment Payment`,
              },
              unit_amount: paymentAmountCents,
            },
            quantity: 1,
          }
        ],
        payment_intent_data: {
          application_fee_amount: platformFeeCents,
          transfer_data: {
            destination: bandData.stripe_account_id,
          }
        },
        metadata: {
          orderId,
          scheduleId,
          type: "balance_payment"
        },
        success_url: `${SITE_URL}/band/${slug}/order/${orderId}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_URL}/band/${slug}/order/${orderId}`,
      });

      return {
        url: session.url,
        sessionId: session.id
      };
    } catch (err) {
      throw new HttpsError("internal", err.message);
    }
  }
);
