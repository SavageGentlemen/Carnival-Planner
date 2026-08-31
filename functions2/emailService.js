/**
 * Centralized Email Service for Caribbean Carnival Planner
 * 
 * Supports:
 * - Direct Resend REST API (via RESEND_API_KEY)
 * - Generic SMTP relays (Plunk, Brevo, Amazon SES, Postmark, Mailgun, Mailpit, Postal)
 * - Legacy Gmail App Passwords
 * - Automatic Mock/Dev Mode (logs to console or Mailpit without crashing)
 */

const nodemailer = require("nodemailer");

// --- Configuration ---
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER = process.env.SMTP_USER || process.env.GMAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
const SMTP_SECURE = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === "true" : SMTP_PORT === 465;
const DEFAULT_FROM = process.env.SMTP_FROM || (RESEND_API_KEY ? '"Caribbean Carnival Planner" <onboarding@resend.dev>' : (SMTP_USER ? `"Caribbean Carnival Planner" <${SMTP_USER}>` : '"Caribbean Carnival Planner" <cpteamgt@gmail.com>'));
const IS_DEV_MODE = process.env.EMAIL_DEV_MODE === "true" || (!RESEND_API_KEY && !SMTP_HOST && !SMTP_USER && !SMTP_PASS);

let cachedTransporter = null;

/**
 * Returns a configured Nodemailer transporter or null in Resend API / Mock mode.
 */
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  if (RESEND_API_KEY) {
    // Resend direct API mode
    return null;
  }

  if (IS_DEV_MODE && !SMTP_HOST) {
    console.log("[EmailService] Running in DEV/MOCK mode. Emails will be logged to console.");
    return null;
  }

  try {
    if (SMTP_HOST) {
      cachedTransporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: (SMTP_USER && SMTP_PASS) ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      });
    } else if (SMTP_USER && SMTP_PASS) {
      cachedTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
    }
    return cachedTransporter;
  } catch (err) {
    console.error("[EmailService] Failed to create transporter:", err.message);
    return null;
  }
}

/**
 * Core sendMail function
 */
async function sendMail({ to, subject, html, text, from = DEFAULT_FROM, replyTo }) {
  if (!to) {
    console.warn("[EmailService] sendMail skipped: No recipient specified.");
    return { success: false, reason: "no_recipient" };
  }

  // 1. Direct Resend API (Fastest & recommended for serverless)
  if (RESEND_API_KEY) {
    try {
      const resendFrom = from.includes('@') ? from : 'onboarding@resend.dev';
      const recipients = Array.isArray(to) ? to : [to];

      const payload = {
        from: resendFrom,
        to: recipients,
        subject,
        html: html || undefined,
        text: text || undefined,
        reply_to: replyTo || undefined,
      };

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("[EmailService - Resend API Error]:", data);
        return { success: false, error: data.message || JSON.stringify(data) };
      }

      console.log(`[EmailService - Resend] Sent '${subject}' to ${Array.isArray(to) ? to.join(", ") : to} (Id: ${data.id})`);
      return { success: true, messageId: data.id, provider: "resend" };
    } catch (err) {
      console.error("[EmailService - Resend Exception]:", err.message);
      return { success: false, error: err.message };
    }
  }

  // 2. SMTP Transporter
  const transporter = getTransporter();

  if (!transporter) {
    console.log("\n================ [EMAIL SERVICE - MOCK MODE] ================");
    console.log(`To:      ${to}`);
    console.log(`From:    ${from}`);
    console.log(`Subject: ${subject}`);
    console.log(`Preview: ${(text || html || "").substring(0, 150)}...`);
    console.log("============================================================\n");
    return { success: true, mock: true };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo,
    });
    console.log(`[EmailService - SMTP] Sent '${subject}' to ${to} (MessageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId, provider: "smtp" };
  } catch (err) {
    console.error(`[EmailService - SMTP Error] Failed to send email to ${to}:`, err.message);
    return { success: false, error: err.message };
  }
}

// --- Branded Container Styles ---
function wrapInBrandedTemplate(title, subtitle, contentHtml) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:540px;margin:0 auto;background:#111827;color:#fff;border-radius:16px;overflow:hidden;border:1px solid #1f2937;">
      <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:24px 24px 20px;">
        <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">🎭 Caribbean Carnival Planner</h1>
        ${subtitle ? `<p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.85);font-weight:500;">${subtitle}</p>` : ""}
      </div>
      <div style="padding:24px;background:#111827;">
        ${contentHtml}
        <div style="margin-top:28px;padding-top:16px;border-top:1px solid #374151;text-align:center;">
          <p style="font-size:12px;color:#9ca3af;margin:0 0 6px;">Caribbean Carnival Planner &bull; <a href="https://carnival-planner.com" style="color:#ec4899;text-decoration:none;">carnival-planner.com</a></p>
          <p style="font-size:11px;color:#6b7280;margin:0;">The ultimate multiplayer operating system for carnival.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * 1. Marketplace Order Confirmations (Buyer & Seller)
 */
async function sendOrderConfirmation(orderData, sellerEmail) {
  const itemEmoji = orderData.category === "ticket" ? "🎫" : "👗";
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (orderData.currency || "usd").toUpperCase(),
  }).format(orderData.amount);

  // Buyer confirmation email
  if (orderData.buyerEmail) {
    const buyerContent = `
      <h2 style="margin:0 0 8px;font-size:18px;color:#ffffff;">Order Confirmed! ✅</h2>
      <p style="color:#9ca3af;font-size:14px;margin:0 0 16px;">Your purchase on Caribbean Carnival Marketplace was successful.</p>
      <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:16px;margin-bottom:16px;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#ffffff;">${itemEmoji} ${orderData.listingTitle || "Carnival Listing"}</p>
        ${orderData.carnival ? `<p style="margin:0 0 4px;font-size:12px;color:#a78bfa;">${orderData.carnival}</p>` : ""}
        <p style="margin:8px 0 0;font-size:20px;font-weight:900;color:#34d399;">${formattedPrice}</p>
      </div>
      <p style="color:#9ca3af;font-size:13px;margin:0 0 12px;line-height:1.5;">The seller has been notified. They will contact you directly to arrange ticket transfer or costume pickup.</p>
      <div style="text-align:center;margin-top:20px;">
        <a href="https://carnival-planner.com/marketplace" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">View in Marketplace</a>
      </div>
    `;

    await sendMail({
      to: orderData.buyerEmail,
      subject: `${itemEmoji} Order Confirmed — ${orderData.listingTitle || "Marketplace Purchase"}`,
      html: wrapInBrandedTemplate("Marketplace", "Order Confirmation", buyerContent),
    });
  }

  // Seller notification email
  if (sellerEmail) {
    const sellerPayout = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (orderData.currency || "usd").toUpperCase(),
    }).format(orderData.sellerPayout || orderData.amount);

    const sellerContent = `
      <h2 style="margin:0 0 8px;font-size:18px;color:#ffffff;">You Made a Sale! 🎉</h2>
      <p style="color:#9ca3af;font-size:14px;margin:0 0 16px;">Your listing has been purchased on Caribbean Carnival Marketplace.</p>
      <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:16px;margin-bottom:16px;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#ffffff;">${itemEmoji} ${orderData.listingTitle || "Carnival Listing"}</p>
        ${orderData.carnival ? `<p style="margin:0 0 4px;font-size:12px;color:#a78bfa;">${orderData.carnival}</p>` : ""}
        <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">Sale price: ${formattedPrice}</p>
        <p style="margin:4px 0 0;font-size:20px;font-weight:900;color:#34d399;">Your payout: ${sellerPayout}</p>
      </div>
      <p style="color:#9ca3af;font-size:13px;margin:0 0 8px;">Buyer email: <strong style="color:#a78bfa;">${orderData.buyerEmail || "Not provided"}</strong></p>
      <p style="color:#6b7280;font-size:12px;margin:8px 0 0;line-height:1.5;">Please coordinate with the buyer for delivery/pickup. Payouts are transferred automatically via Stripe Connect.</p>
    `;

    await sendMail({
      to: sellerEmail,
      subject: `🎉 You Made a Sale — ${orderData.listingTitle || "Marketplace Listing"}`,
      html: wrapInBrandedTemplate("Marketplace", "Seller Notification", sellerContent),
    });
  }
}

/**
 * 2. Squad Vault Invitations
 */
async function sendVaultInvitation({ vaultName, goalAmount, contributionAmount, contributionFrequency, inviterName, toEmail, vaultId, inviteCode }) {
  const joinUrl = `https://carnival-planner.web.app?joinVault=${vaultId}&code=${inviteCode}`;
  
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:#ffffff;">🏦 Squad Vault Invite</h2>
    <p style="color:#d1d5db;font-size:14px;line-height:1.5;margin:0 0 16px;">
      <strong style="color:#ec4899;">${inviterName || "A squad leader"}</strong> invited you to join <strong>"${vaultName}"</strong> — an automated savings vault for your carnival squad.
    </p>
    <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:16px;margin-bottom:20px;">
      ${contributionAmount && contributionFrequency ? `<p style="margin:0 0 6px;font-size:14px;color:#e5e7eb;"><strong>Contribution:</strong> $${contributionAmount} / ${contributionFrequency}</p>` : ""}
      ${goalAmount ? `<p style="margin:0;font-size:14px;color:#34d399;"><strong>Squad Goal:</strong> $${goalAmount}</p>` : ""}
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="${joinUrl}" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-size:15px;">Join the Vault →</a>
    </div>
    <p style="margin:16px 0 0;font-size:12px;color:#6b7280;text-align:center;">Squad Vault is a collaborative savings club by Carnival-Planner.com. Not a bank.</p>
  `;

  return sendMail({
    to: toEmail,
    subject: `🏦 You're invited to save for carnival — ${vaultName}`,
    html: wrapInBrandedTemplate("Squad Vault", "Multiplayer Savings", content),
  });
}

/**
 * 3. Abandoned Checkout Recovery
 */
async function sendAbandonedCartEmail({ userEmail, itemName, recoveryUrl }) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:#ffffff;">Still thinking about it? 🎟️</h2>
    <p style="color:#d1d5db;font-size:14px;line-height:1.5;margin:0 0 16px;">
      Your tickets/pass for <strong>${itemName || "your Carnival Experience"}</strong> are still reserved for you!
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${recoveryUrl}" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-size:15px;">Complete Checkout Now →</a>
    </div>
  `;

  return sendMail({
    to: userEmail,
    subject: `⚠️ You left something behind! Complete your fete booking`,
    html: wrapInBrandedTemplate("Checkout Recovery", "Ticket Reservation", content),
  });
}

/**
 * 4. Weekly Digest Newsletter
 */
async function sendWeeklyDigestEmail({ to, subscriberName, topFetis = [], bandUpdates = [] }) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:20px;color:#ffffff;">🌴 Carnival Weekly Radar</h2>
    <p style="color:#d1d5db;font-size:14px;line-height:1.5;margin:0 0 16px;">
      Hey <strong>${subscriberName || "Carnival Lover"}</strong>, here are this week's top fetes, band releases, and carnival travel deals.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="https://carnival-planner.web.app" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-size:15px;">Open Carnival Planner →</a>
    </div>
  `;

  return sendMail({
    to,
    subject: `🌴 Your Weekly Carnival Digest & New Fete Drops`,
    html: wrapInBrandedTemplate("Carnival Planner", "Weekly Radar", content),
  });
}

/**
 * 5. BandOS Masquerader Registration Confirmation
 */
async function sendBandRegistrationConfirmation({ to, bandName, sectionTitle, buyerName, depositPaid, totalAmount, orderId, orderQrCode, portalUrl, primaryColor = "#ec4899" }) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:20px;color:#ffffff;">🎉 You're Registered with ${bandName || "The Band"}!</h2>
    <p style="color:#d1d5db;font-size:14px;line-height:1.5;margin:0 0 16px;">
      Hey <strong>${buyerName || "Masquerader"}</strong>, your costume spot for <strong>"${sectionTitle || "Costume Section"}"</strong> is officially locked in!
    </p>

    <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:18px;margin-bottom:20px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e5e7eb;">
        <tr>
          <td style="padding:6px 0;color:#9ca3af;">Order Reference:</td>
          <td style="padding:6px 0;font-weight:bold;color:#ffffff;text-align:right;font-family:monospace;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#9ca3af;">Section:</td>
          <td style="padding:6px 0;font-weight:bold;color:#a78bfa;text-align:right;">${sectionTitle}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#9ca3af;">Deposit Paid:</td>
          <td style="padding:6px 0;font-weight:bold;color:#34d399;text-align:right;">$${Number(depositPaid || 0).toFixed(2)}</td>
        </tr>
        ${totalAmount ? `
        <tr>
          <td style="padding:6px 0;color:#9ca3af;">Total Balance:</td>
          <td style="padding:6px 0;font-weight:bold;color:#ffffff;text-align:right;">$${Number(totalAmount || 0).toFixed(2)}</td>
        </tr>
        ` : ""}
      </table>
    </div>

    ${orderQrCode ? `
    <div style="background:#111827;border:2px dashed #4b5563;border-radius:12px;padding:16px;text-align:center;margin-bottom:20px;">
      <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;text-transform:uppercase;font-weight:bold;letter-spacing:1px;">Your Mas Camp Pickup QR Identifier</p>
      <p style="margin:0;font-size:22px;font-weight:900;letter-spacing:3px;color:#ec4899;font-family:monospace;">${orderQrCode}</p>
      <p style="margin:6px 0 0;font-size:11px;color:#6b7280;">Present this QR or code at costume distribution week.</p>
    </div>
    ` : ""}

    <div style="text-align:center;margin:24px 0;">
      <a href="${portalUrl}" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 12px rgba(236,72,153,0.3);">Access Masquerader Portal →</a>
    </div>

    <p style="margin:16px 0 0;font-size:12px;color:#6b7280;text-align:center;">Manage your sizing, track installment balances, and choose mas camp pickup slots anytime.</p>
  `;

  return sendMail({
    to,
    subject: `🎉 Registration Confirmed: ${sectionTitle} — ${bandName}`,
    html: wrapInBrandedTemplate(bandName || "BandOS", "Registration Confirmation", content),
  });
}

/**
 * 6. BandOS Payment Installment Reminder
 */
async function sendBandPaymentReminderEmail({ to, bandName, sectionTitle, buyerName, installmentLabel, amountDue, dueDate, portalUrl, isOverdue = false }) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:${isOverdue ? "#f87171" : "#ffffff"};">
      ${isOverdue ? "⚠️ Overdue Payment Notice" : "⏳ Upcoming Costume Installment"}
    </h2>
    <p style="color:#d1d5db;font-size:14px;line-height:1.5;margin:0 0 16px;">
      Hey <strong>${buyerName || "Masquerader"}</strong>, this is a reminder for your <strong>"${sectionTitle || "Costume"}"</strong> balance with <strong>${bandName || "The Band"}</strong>.
    </p>

    <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:16px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:14px;color:#9ca3af;">Installment: <strong style="color:#ffffff;">${installmentLabel || "Scheduled Payment"}</strong></p>
      <p style="margin:0 0 6px;font-size:14px;color:#9ca3af;">Due Date: <strong style="color:${isOverdue ? "#f87171" : "#fbbf24"};">${dueDate || "Soon"}</strong></p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:900;color:#34d399;">Amount Due: $${Number(amountDue || 0).toFixed(2)}</p>
    </div>

    <div style="text-align:center;margin:24px 0;">
      <a href="${portalUrl}" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-size:15px;">Pay Installment Online →</a>
    </div>

    <p style="margin:16px 0 0;font-size:12px;color:#6b7280;text-align:center;">Secure checkout powered by Stripe. Your spot on the road remains secured once current.</p>
  `;

  return sendMail({
    to,
    subject: `${isOverdue ? "⚠️ Overdue Notice" : "⏳ Payment Reminder"}: $${Number(amountDue || 0).toFixed(2)} for ${sectionTitle} (${bandName})`,
    html: wrapInBrandedTemplate(bandName || "BandOS", "Payment Notice", content),
  });
}

/**
 * 7. BandOS Mas Camp Distribution Ready Alert
 */
async function sendDistributionReadyEmail({ to, bandName, sectionTitle, buyerName, orderId, distributionSlot, masCampLocation, portalUrl, qrCodeUrl }) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:20px;color:#34d399;">👗 Your Costume is Ready for Pickup!</h2>
    <p style="color:#d1d5db;font-size:14px;line-height:1.5;margin:0 0 16px;">
      Hey <strong>${buyerName || "Masquerader"}</strong>, the workshop team has completed your costume for <strong>"${sectionTitle}"</strong>!
    </p>

    <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:16px;margin-bottom:20px;">
      ${distributionSlot ? `<p style="margin:0 0 6px;font-size:14px;color:#e5e7eb;"><strong>Scheduled Window:</strong> ${distributionSlot}</p>` : ""}
      ${masCampLocation ? `<p style="margin:0 0 6px;font-size:14px;color:#e5e7eb;"><strong>Pickup Location:</strong> ${masCampLocation}</p>` : ""}
      <p style="margin:0;font-size:13px;color:#9ca3af;">Order Ref: <strong style="color:#ffffff;font-family:monospace;">${orderId}</strong></p>
    </div>

    <div style="text-align:center;margin:24px 0;">
      <a href="${portalUrl}" style="background:linear-gradient(135deg,#34d399,#059669);color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-size:15px;">View Pickup Pass & QR Code →</a>
    </div>

    <p style="margin:16px 0 0;font-size:12px;color:#6b7280;text-align:center;">Remember to bring photo ID or assign an authorized squad proxy in your portal.</p>
  `;

  return sendMail({
    to,
    subject: `👗 Costume Ready for Pickup! — ${sectionTitle} (${bandName})`,
    html: wrapInBrandedTemplate(bandName || "BandOS", "Distribution Ready", content),
  });
}

module.exports = {
  sendMail,
  sendOrderConfirmation,
  sendVaultInvitation,
  sendAbandonedCartEmail,
  sendWeeklyDigestEmail,
  sendBandRegistrationConfirmation,
  sendBandPaymentReminderEmail,
  sendDistributionReadyEmail,
  wrapInBrandedTemplate,
  getTransporter,
};
