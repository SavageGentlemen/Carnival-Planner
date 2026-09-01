// Cloud Functions entry point for Caribbean Carnival Planner.

const functions = require("firebase-functions");
const { onCall, HttpsError, onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const emailService = require("./emailService");
const { runScraper } = require("./scraper");
const { generateVibeScores } = require("./vibeEngine");

const app = admin.initializeApp();

const APP_ID = "carnival-planner-v1";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;
const stripeAccountId = process.env.STRIPE_ACCOUNT_ID || null;

let stripe = null;
if (stripeSecretKey) {
  const stripeOpts = { apiVersion: "2024-04-10" };
  if (stripeAccountId) {
    stripeOpts.stripeAccount = stripeAccountId;
  }
  stripe = new Stripe(stripeSecretKey, stripeOpts);
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

// Use the squad-db (Native Mode) for squad operations
// Pass both app and database ID to ensure correct database is used
const squadDb = getFirestore(app, 'squad-db');
const defaultDb = getFirestore(app); // Default Firestore database for user tracking

// ----- OpenWA WhatsApp Alerts Helper -----
// Dispatches outbound WhatsApp messages to squad members who have opted in.
// Looks up each member's whatsapp_number & whatsapp_opt_in from the users collection.
async function dispatchWhatsAppAlerts(memberUids, alertTitle, alertBody) {
  const openwaUrl = process.env.OPENWA_API_URL || null;
  const openwaKey = process.env.OPENWA_API_KEY || 'secure_shared_secret';

  if (!openwaUrl) {
    console.log('[WhatsApp] OPENWA_API_URL not configured — skipping WhatsApp dispatch.');
    return { sent: 0, skipped: memberUids.length };
  }

  let sent = 0;
  let skipped = 0;

  for (const uid of memberUids) {
    try {
      // Check opt-in and phone number from the default Firestore users collection
      const userDoc = await defaultDb.collection('users').doc(uid).get();
      if (!userDoc.exists) { skipped++; continue; }

      const userData = userDoc.data();
      if (!userData.whatsapp_opt_in || !userData.whatsapp_number) {
        skipped++;
        continue;
      }

      // Format number for WhatsApp: strip leading '+' and append @c.us
      const rawNumber = String(userData.whatsapp_number).replace(/[^\d]/g, '');
      const waId = `${rawNumber}@c.us`;

      const content = `*${alertTitle}*\n\n${alertBody}`;

      await globalThis.fetch(`${openwaUrl}/sendText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openwaKey}`
        },
        body: JSON.stringify({ to: waId, content })
      });

      sent++;
      console.log(`[WhatsApp] Alert sent to ${waId}`);
    } catch (err) {
      console.error(`[WhatsApp] Failed to send to ${uid}:`, err.message);
      skipped++;
    }
  }

  console.log(`[WhatsApp] Dispatch complete: ${sent} sent, ${skipped} skipped.`);
  return { sent, skipped };
}

// ----- Free Multi-Channel Emergency Dispatch (Telegram & Discord Webhooks) -----
async function dispatchTelegramAlert(alertTitle, alertBody, mapUrl) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return false;
  }
  try {
    const text = `🚨 *${alertTitle}*\n\n${alertBody}${mapUrl ? `\n\n📍 *Live Location:* ${mapUrl}` : ''}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await globalThis.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });
    console.log('[Telegram Alert] Emergency broadcast dispatched successfully.');
    return true;
  } catch (err) {
    console.error('[Telegram Alert] Failed to dispatch Telegram alert:', err.message);
    return false;
  }
}

async function dispatchDiscordAlert(alertTitle, alertBody, mapUrl) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }
  try {
    const content = `🚨 **${alertTitle}**\n${alertBody}${mapUrl ? `\n📍 **Live Location:** ${mapUrl}` : ''}`;
    await globalThis.fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    console.log('[Discord Alert] Emergency broadcast dispatched successfully.');
    return true;
  } catch (err) {
    console.error('[Discord Alert] Failed to dispatch Discord alert:', err.message);
    return false;
  }
}

// ----- Premium Status Helper -----
// Used to dynamically adjust platform fees: 0% for premium, 10% for free
const PREMIUM_OVERRIDE_EMAILS = ['djkrss1@gmail.com', 'maikacooke@gmail.com'];

async function checkUserPremium(uid, email) {
  // 1. Email override
  if (PREMIUM_OVERRIDE_EMAILS.includes((email || '').toLowerCase())) {
    return true;
  }
  // 2. Firestore premium check
  try {
    const userAppDoc = await squadDb.doc(`users/${uid}/apps/${APP_ID}`).get();
    if (userAppDoc.exists && userAppDoc.data()?.premiumActive === true) {
      return true;
    }
  } catch (err) {
    console.log('Premium check failed (non-critical):', err.message);
  }
  return false;
}

/**
 * Calculate platform fee based on premium status and B2B "BandOS" role.
 * Free:               10% platform fee (deducted from seller)
 * Individual Premium: 0% platform fee (Pass-through)
 * Official Band:      5% booking fee (added to total - passed to consumer)
 */
function calculatePlatformFee(amountInCents, isPremium, isOfficialBand = false) {
  if (isOfficialBand) {
    return Math.round(amountInCents * 0.05); // 5% B2B rate
  }
  if (isPremium) return 0;
  return Math.round(amountInCents * 0.10);
}

// ----- Callable: createCheckoutSession (v2) -----
exports.createCheckoutSession = onCall(
  { cors: true, invoker: "public", secrets: ["STRIPE_SECRET_KEY"] },
  async (request) => {
    const {
      priceId,
      uid: uidFromClient,
      email: emailFromClient,
      success_url,
      cancel_url,
      affiliateRef
    } = request.data || {};

    const uid = (request.auth && request.auth.uid) || uidFromClient;
    const email =
      (request.auth &&
        request.auth.token &&
        request.auth.token.email) ||
      emailFromClient;

    if (!priceId || typeof priceId !== "string") {
      throw new HttpsError(
        "invalid-argument",
        "A valid Stripe priceId string is required."
      );
    }

    if (!stripe) {
      throw new HttpsError(
        "failed-precondition",
        "Stripe is not configured on the server."
      );
    }

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
          ...(affiliateRef ? { affiliateRef: affiliateRef } : {}),
          priceId,
          appId: APP_ID,
        },
        subscription_data: {
          metadata: {
            ...(uid ? { firebaseUid: uid } : {}),
            ...(affiliateRef ? { affiliateRef: affiliateRef } : {}),
            priceId,
            appId: APP_ID,
          },
        },
        success_url: finalSuccessUrl,
        cancel_url: finalCancelUrl,
      }, {
        stripeAccount: stripeAccountId
      });

      return {
        sessionId: session.id,
        checkoutUrl: session.url,
        url: session.url
      };
    } catch (err) {
      console.error("Error creating Stripe Checkout session:", err);
      throw new HttpsError(
        "internal",
        `Unable to create Stripe Checkout session: ${err.message}`
      );
    }
  }
);

// ----- Webhook: handleStripeWebhook -----
exports.handleStripeWebhook = onRequest(
  { secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "AIRALO_CLIENT_ID", "AIRALO_CLIENT_SECRET"] },
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

          // Check if this is a vault contribution
          if (meta.type === 'vault_contribution' && meta.vaultId && meta.contributionId) {
            const vaultRef = squadDb.collection('vaults').doc(meta.vaultId);
            const contribRef = vaultRef.collection('contributions').doc(meta.contributionId);
            const contribDoc = await contribRef.get();

            if (contribDoc.exists) {
              const amount = contribDoc.data().amount || 0;
              const userId = meta.firebaseUid;

              // Mark contribution as succeeded
              await contribRef.update({ status: 'succeeded', stripeCheckoutSessionId: session.id });

              // Update vault total
              await vaultRef.update({
                totalSaved: FieldValue.increment(amount),
                updatedAt: FieldValue.serverTimestamp(),
              });

              // Update member's total contributed
              if (userId) {
                const memberRef = vaultRef.collection('members').doc(userId);
                const memberDoc = await memberRef.get();
                if (memberDoc.exists) {
                  await memberRef.update({ totalContributed: FieldValue.increment(amount) });
                }
              }

              console.log(`[Vault] Contribution of $${amount} to vault ${meta.vaultId} succeeded.`);
            }
            break; // Don't fall through to subscription handling
          }

          // Existing subscription checkout handling
          const uid = meta.firebaseUid;

          if (!uid) break;

          // --- AIRALO eSIM PURCHASE ---
          if (meta.type === 'airalo_purchase') {
            const packageId = meta.packageId;
            console.log(`[Airalo Webhook] Completing eSIM order for ${uid}, package: ${packageId}`);
            await completeAiraloOrder(uid, packageId);
            return res.json({ received: true });
          }

          const priceId = meta.priceId || null;

          const subscriptionId = session.subscription;
          const customerId = session.customer;
          let currentPeriodEnd = null;
          let status = "active";

          if (subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId, {
              stripeAccount: stripeAccountId
            });
            status = sub.status;
            currentPeriodEnd = sub.current_period_end
              ? new Date(sub.current_period_end * 1000)
              : null;
          }

          // Store premium status in squad-db
          const userAppRef = squadDb.doc(`users/${uid}/apps/${APP_ID}`);
          await userAppRef.set({
            premiumActive: true,
            premiumUpdatedAt: FieldValue.serverTimestamp(),
            premiumPriceId: priceId,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            premiumCurrentPeriodEnd: currentPeriodEnd,
            subscriptionStatus: status,
          }, { merge: true });

          // --- AFFILIATE CONVERSION TRACKING ---
          const affiliateRef = meta.affiliateRef || null;
          if (affiliateRef) {
            try {
              // Find the affiliate by code
              const affiliatesSnap = await defaultDb.collection('affiliates')
                .where('affiliateCode', '==', affiliateRef)
                .where('status', '==', 'approved')
                .limit(1)
                .get();

              if (!affiliatesSnap.empty) {
                const affiliateDoc = affiliatesSnap.docs[0];
                const affiliateData = affiliateDoc.data();
                const commissionRate = affiliateData.commissionRate || 0.20;

                // Calculate commission based on plan
                // Monthly ($4.99): 20% = ~$1.00 | Annual ($39.99): flat $2.00
                const isYearly = priceId && priceId.includes('yearly') || (priceId === 'price_1SanMhJR9xpdRiXinv2F9knM');
                const commission = isYearly ? 2.00 : (4.99 * commissionRate);

                // Record conversion
                await defaultDb.collection('affiliateConversions').add({
                  affiliateUid: affiliateData.uid || affiliateData.userId,
                  affiliateCode: affiliateRef,
                  subscriberUid: uid,
                  subscriberEmail: session.customer_email || email || null,
                  plan: isYearly ? 'yearly' : 'monthly',
                  commission: commission,
                  payoutStatus: 'pending',
                  stripeSessionId: session.id,
                  convertedAt: FieldValue.serverTimestamp(),
                });

                // Update affiliate totals
                await affiliateDoc.ref.update({
                  totalConversions: FieldValue.increment(1),
                  totalEarnings: FieldValue.increment(commission),
                });

                console.log(`[Affiliate] Recorded conversion: ${affiliateRef} earned $${commission} from ${uid}`);
              } else {
                console.log(`[Affiliate] Ref code ${affiliateRef} not found or not approved.`);
              }
            } catch (affErr) {
              // Don't fail the webhook if affiliate tracking fails
              console.error('[Affiliate] Conversion tracking error:', affErr);
            }
          }

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

          const userAppRef = squadDb.doc(`users/${uid}/apps/${APP_ID}`);
          await userAppRef.set({
            premiumActive: active,
            premiumUpdatedAt: FieldValue.serverTimestamp(),
            premiumPriceId: priceId,
            stripeCustomerId: subscription.customer,
            stripeSubscriptionId: subscription.id,
            premiumCurrentPeriodEnd: currentPeriodEnd,
            subscriptionStatus: subscription.status,
          }, { merge: true });

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
  }
);

// ----- Squad Sharing Functions (v2 with public invoker) -----

function generateShareCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

exports.createSquadShareCode = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { carnivalId, carnivalName, uid: uidFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;

    if (!uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    if (!carnivalId) {
      throw new HttpsError('invalid-argument', 'Carnival ID required.');
    }

    const sharedPlansRef = squadDb.collection('sharedPlans');

    // Query by ownerId only, then filter by carnivalId in code
    const existingQuery = await sharedPlansRef
      .where('ownerId', '==', uid)
      .get();

    // Filter for matching carnivalId
    const matchingPlan = existingQuery.docs.find(doc => doc.data().carnivalId === carnivalId);

    if (matchingPlan) {
      return {
        shareCode: matchingPlan.data().shareCode,
        planId: matchingPlan.id
      };
    }

    const shareCode = generateShareCode();
    const now = new Date();
    const planRef = await sharedPlansRef.add({
      ownerId: uid,
      carnivalId,
      carnivalName: carnivalName || carnivalId,
      shareCode,
      members: [{
        uid,
        role: 'owner',
        joinedAt: now
      }],
      createdAt: now
    });

    return { shareCode, planId: planRef.id };
  }
);

exports.joinSquadByCode = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { shareCode, uid: uidFromClient, email: emailFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;
    const email = (request.auth && request.auth.token && request.auth.token.email) || emailFromClient;

    if (!uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    if (!shareCode || shareCode.length !== 6) {
      throw new HttpsError('invalid-argument', 'Valid 6-character share code required.');
    }

    const sharedPlansRef = squadDb.collection('sharedPlans');
    const query = await sharedPlansRef
      .where('shareCode', '==', shareCode.toUpperCase())
      .limit(1)
      .get();

    if (query.empty) {
      throw new HttpsError('not-found', 'Invalid share code.');
    }

    const planDoc = query.docs[0];
    const planData = planDoc.data();

    const isAlreadyMember = planData.members?.some(m => m.uid === uid);
    if (isAlreadyMember) {
      return {
        success: true,
        message: 'Already a member',
        planId: planDoc.id,
        carnivalName: planData.carnivalName
      };
    }

    const updatedMembers = [...(planData.members || []), {
      uid,
      email: email || null,
      role: 'member',
      joinedAt: new Date()
    }];
    await planDoc.ref.update({ members: updatedMembers });

    // === NEW SQUAD GOALS LOGIC ===
    if (updatedMembers.length === 5) {
      try {
        const batch = admin.firestore().batch();
        const ninetyDaysFromNow = new Date();
        ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);

        updatedMembers.forEach((member) => {
          const userAppRef = squadDb.doc(`users/${member.uid}/apps/${APP_ID}`);
          batch.set(userAppRef, {
            premiumActive: true,
            premiumUpdatedAt: FieldValue.serverTimestamp(),
            premiumCurrentPeriodEnd: ninetyDaysFromNow,
            premiumSource: 'squad_goals_promo'
          }, { merge: true });
        });

        await batch.commit();
        console.log(`Squad Goals Reached for Plan ${planDoc.id}! 3 months premium granted to all 5 members.`);
      } catch (err) {
        console.error("Error creating Squad Goals premium reward:", err);
      }
    }
    // === END SQUAD GOALS LOGIC ===

    return {
      success: true,
      message: 'Joined squad!',
      planId: planDoc.id,
      carnivalName: planData.carnivalName,
      ownerId: planData.ownerId
    };
  }
);

exports.getSharedPlanData = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { planId, uid: uidFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;

    if (!uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    if (!planId) {
      throw new HttpsError('invalid-argument', 'Plan ID required.');
    }

    const planDoc = await squadDb.collection('sharedPlans').doc(planId).get();

    if (!planDoc.exists) {
      throw new HttpsError('not-found', 'Plan not found.');
    }

    const planData = planDoc.data();

    const isMember = planData.members?.some(m => m.uid === uid);
    if (!isMember) {
      throw new HttpsError('permission-denied', 'Not a member of this squad.');
    }

    return {
      planId: planDoc.id,
      ...planData
    };
  }
);

exports.leaveSquad = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { planId, uid: uidFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;

    if (!uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    if (!planId) {
      throw new HttpsError('invalid-argument', 'Plan ID required.');
    }

    const planRef = squadDb.collection('sharedPlans').doc(planId);
    const planDoc = await planRef.get();

    if (!planDoc.exists) {
      throw new HttpsError('not-found', 'Plan not found.');
    }

    const planData = planDoc.data();

    if (planData.ownerId === uid) {
      throw new HttpsError('failed-precondition', 'Owner cannot leave. Transfer ownership or delete the squad.');
    }

    const updatedMembers = (planData.members || []).filter(m => m.uid !== uid);
    await planRef.update({ members: updatedMembers });

    return { success: true };
  }
);

exports.getMySquads = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { uid: uidFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;

    if (!uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const sharedPlansRef = squadDb.collection('sharedPlans');
    const snapshot = await sharedPlansRef.get();

    const mySquads = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const isMember = data.members?.some(m => m.uid === uid);
      if (isMember) {
        mySquads.push({
          planId: doc.id,
          carnivalId: data.carnivalId,
          carnivalName: data.carnivalName,
          shareCode: data.shareCode,
          memberCount: data.members?.length || 0,
          isOwner: data.ownerId === uid
        });
      }
    });

    return { squads: mySquads };
  }
);

// ----- FCM Token Management -----

exports.saveFcmToken = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { fcmToken } = request.data || {};

    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;

    if (!fcmToken) {
      throw new HttpsError('invalid-argument', 'FCM token required.');
    }

    const tokenRef = squadDb.collection('fcmTokens').doc(uid);
    await tokenRef.set({
      token: fcmToken,
      updatedAt: new Date()
    }, { merge: true });

    return { success: true };
  }
);

// ----- Road Ready Notification (Premium Feature) -----

exports.sendRoadReadyAlert = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const {
      carnivalId,
      carnivalName,
      userName
    } = request.data || {};

    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;

    if (!carnivalId) {
      throw new HttpsError('invalid-argument', 'Carnival ID required.');
    }

    // Check if user has premium access (server-side enforcement)
    const userAppRef = squadDb.doc(`users/${uid}/apps/${APP_ID}`);
    const userAppDoc = await userAppRef.get();

    // Also check for superuser (djkrss1@gmail.com) by checking if email matches
    const userEmail = request.auth.token?.email || '';
    const isSuperuser = userEmail === 'djkrss1@gmail.com';
    const isPremium = isSuperuser || (userAppDoc.exists && userAppDoc.data()?.premiumActive === true);

    if (!isPremium) {
      throw new HttpsError('permission-denied', 'Road Ready alerts require premium subscription.');
    }

    // Find all squads for this carnival where user is a member
    // UNIFIED DB: Query 'squads' collection (was 'sharedPlans')
    const squadsRef = squadDb.collection('squads');
    const snapshot = await squadsRef.where('carnivalId', '==', carnivalId).get();

    const squadMemberUids = new Set();
    snapshot.forEach(doc => {
      const data = doc.data();
      // Schema: members is array of strings ['uid1', 'uid2']
      if (data.members?.includes(uid)) {
        data.members.forEach(memberUid => {
          if (memberUid !== uid) {
            squadMemberUids.add(memberUid);
          }
        });
      }
    });

    if (squadMemberUids.size === 0) {
      return { success: true, notified: 0, message: 'No squad members to notify.' };
    }

    // Get FCM tokens for all squad members
    const fcmTokensRef = squadDb.collection('fcmTokens');
    const tokens = [];

    for (const memberUid of squadMemberUids) {
      const tokenDoc = await fcmTokensRef.doc(memberUid).get();
      if (tokenDoc.exists && tokenDoc.data()?.token) {
        tokens.push(tokenDoc.data().token);
      }
    }

    const displayName = userName || 'A squad member';
    let successCount = 0;

    if (tokens.length > 0) {
      // Send push notifications
      const message = {
        notification: {
          title: `${displayName} is Road Ready!`,
          body: `Ready to party at ${carnivalName || carnivalId}! Time to link up!`
        },
        data: {
          type: 'road_ready',
          carnivalId,
          senderUid: uid
        },
        tokens
      };

      try {
        const response = await admin.messaging().sendEachForMulticast(message);
        successCount = response.successCount;
        console.log(`Road Ready notifications sent: ${response.successCount} success, ${response.failureCount} failed`);
      } catch (err) {
        console.error('Error sending Road Ready notifications:', err);
      }
    }

    try {
      // --- WhatsApp Dispatch (non-blocking) ---
      const waResult = await dispatchWhatsAppAlerts(
        Array.from(squadMemberUids),
        `${displayName} is Road Ready! 🎉`,
        `Ready to party at ${carnivalName || carnivalId}! Time to link up!`
      );

      return {
        success: true,
        notified: successCount,
        whatsappSent: waResult.sent,
        message: `Notified ${successCount} squad member(s) via FCM! (${waResult.sent} via WhatsApp)`
      };
    } catch (err) {
      console.error('Error sending WhatsApp alerts:', err);
      return {
        success: true,
        notified: successCount,
        whatsappSent: 0,
        message: `Notified ${successCount} squad member(s) via FCM! (WhatsApp dispatch failed: ${err.message})`
      };
    }
  }
);

// ----- Callable: sendSafetyAlert (Wearable Safety Check & Road Emergency SOS) -----
exports.sendSafetyAlert = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const {
      carnivalId,
      userName,
      heartRate,
      duration,
      lat,
      lng,
      location,
      alertType = 'health'
    } = request.data || {};

    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;

    if (!carnivalId) {
      throw new HttpsError('invalid-argument', 'Carnival ID required.');
    }

    // Premium check (server-side enforcement)
    const userAppRef = squadDb.doc(`users/${uid}/apps/${APP_ID}`);
    const userAppDoc = await userAppRef.get();
    const userEmail = request.auth.token?.email || '';
    const isSuperuser = userEmail === 'djkrss1@gmail.com';
    const isPremium = isSuperuser || (userAppDoc.exists && userAppDoc.data()?.premiumActive === true);

    if (!isPremium) {
      throw new HttpsError('permission-denied', 'Safety alerts require premium subscription.');
    }

    // Cooldown check: max 1 alert per 5 minutes per user for emergency SOS, 15m for health
    const cooldownMs = alertType === 'sos' ? 5 * 60 * 1000 : 15 * 60 * 1000;
    const cooldownRef = squadDb.doc(`safetyCooldowns/${uid}`);
    const cooldownDoc = await cooldownRef.get();
    if (cooldownDoc.exists) {
      const lastAlert = cooldownDoc.data()?.lastAlertAt?.toMillis?.() || cooldownDoc.data()?.lastAlertAt || 0;
      if (Date.now() - lastAlert < cooldownMs) {
        return { success: true, notified: 0, message: 'Alert cooldown active. Try again in a few minutes.' };
      }
    }

    // Find squad members
    const squadsRef = squadDb.collection('squads');
    const snapshot = await squadsRef.where('carnivalId', '==', carnivalId).get();

    const squadMemberUids = new Set();
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.members?.includes(uid)) {
        data.members.forEach(memberUid => {
          if (memberUid !== uid) {
            squadMemberUids.add(memberUid);
          }
        });
      }
    });

    const displayName = userName || 'A squad member';
    const hrText = heartRate ? ` (${heartRate} bpm for ${duration || '?'} min)` : '';
    const effectiveLat = lat || location?.lat || location?.latitude;
    const effectiveLng = lng || location?.lng || location?.longitude;
    const mapUrl = effectiveLat && effectiveLng ? `https://maps.google.com/?q=${effectiveLat},${effectiveLng}` : null;

    const alertTitle = alertType === 'sos' ? `🚨 ROAD EMERGENCY SOS: ${displayName}!` : `⚠️ Check on ${displayName}!`;
    const alertBody = alertType === 'sos' 
      ? `${displayName} triggered an emergency SOS beacon on the carnival road route.${mapUrl ? ' Location pin attached.' : ''}`
      : `Elevated heart rate detected${hrText}. Make sure they're OK!`;

    // Get FCM tokens
    const fcmTokensRef = squadDb.collection('fcmTokens');
    const tokens = [];

    for (const memberUid of squadMemberUids) {
      const tokenDoc = await fcmTokensRef.doc(memberUid).get();
      if (tokenDoc.exists && tokenDoc.data()?.token) {
        tokens.push(tokenDoc.data().token);
      }
    }

    let successCount = 0;

    if (tokens.length > 0) {
      // Send HIGH priority safety alert
      const message = {
        notification: {
          title: alertTitle,
          body: alertBody
        },
        data: {
          type: alertType === 'sos' ? 'emergency_sos' : 'safety_alert',
          senderUid: uid,
          heartRate: String(heartRate || ''),
          duration: String(duration || ''),
          mapUrl: mapUrl || ''
        },
        android: { priority: 'high' },
        apns: { headers: { 'apns-priority': '10' } },
        tokens
      };

      try {
        const response = await admin.messaging().sendEachForMulticast(message);
        successCount = response.successCount;
        console.log(`Safety alert sent: ${response.successCount} success, ${response.failureCount} failed`);
      } catch (err) {
        console.error('Error sending safety alert FCM:', err);
      }
    }

    try {
      // Set cooldown
      await cooldownRef.set({ lastAlertAt: Date.now() });

      // --- Multi-channel dispatch (non-blocking) ---
      const waResult = await dispatchWhatsAppAlerts(
        Array.from(squadMemberUids),
        alertTitle,
        alertBody + (mapUrl ? `\n\nLive GPS Pin: ${mapUrl}` : '')
      );

      const telegramSent = await dispatchTelegramAlert(alertTitle, alertBody, mapUrl);
      const discordSent = await dispatchDiscordAlert(alertTitle, alertBody, mapUrl);

      return {
        success: true,
        notified: successCount,
        whatsappSent: waResult.sent,
        telegramSent,
        discordSent,
        mapUrl,
        message: `Safety alert dispatched across FCM (${successCount}), WhatsApp (${waResult.sent}), Telegram (${telegramSent ? 'OK' : 'Off'}), and Discord (${discordSent ? 'OK' : 'Off'}).`
      };
    } catch (err) {
      console.error('Error in multi-channel safety alert dispatch:', err);
      return {
        success: true,
        notified: successCount,
        whatsappSent: 0,
        message: `Safety alert sent to ${successCount} member(s). (Multi-channel dispatch note: ${err.message})`
      };
    }
  }
);

// ----- Shared Carnival Data Functions (Collaborative Planning) -----

// Get shared carnival data for a squad
exports.getSharedCarnivalData = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    // SECURITY: Only accept authenticated requests - reject client-supplied uid
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const { planId } = request.data || {};

    if (!planId) {
      throw new HttpsError('invalid-argument', 'Plan ID required.');
    }

    // Verify membership
    const planDoc = await squadDb.collection('sharedPlans').doc(planId).get();
    if (!planDoc.exists) {
      throw new HttpsError('not-found', 'Plan not found.');
    }

    const planData = planDoc.data();
    const isMember = planData.members?.some(m => m.uid === uid);
    if (!isMember) {
      throw new HttpsError('permission-denied', 'Not a member of this squad.');
    }

    // Get shared carnival data
    const sharedDataDoc = await squadDb.collection('sharedPlans').doc(planId)
      .collection('carnivalData').doc('main').get();

    if (!sharedDataDoc.exists) {
      // Return empty structure if no shared data yet
      return {
        budget: [],
        schedule: [],
        packing: [],
        costume: null,
        squad: []
      };
    }

    return sharedDataDoc.data();
  }
);

// Update shared carnival data (add/remove/update items)
exports.updateSharedCarnivalData = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    // SECURITY: Only accept authenticated requests - reject client-supplied uid/email
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const email = request.auth.token?.email || null;
    const { planId, field, data, action } = request.data || {};

    if (!planId || !field) {
      throw new HttpsError('invalid-argument', 'Plan ID and field required.');
    }

    const validFields = ['budget', 'schedule', 'packing', 'costume', 'squad'];
    if (!validFields.includes(field)) {
      throw new HttpsError('invalid-argument', 'Invalid field.');
    }

    // Verify membership
    const planDoc = await squadDb.collection('sharedPlans').doc(planId).get();
    if (!planDoc.exists) {
      throw new HttpsError('not-found', 'Plan not found.');
    }

    const planData = planDoc.data();
    const isMember = planData.members?.some(m => m.uid === uid);
    if (!isMember) {
      throw new HttpsError('permission-denied', 'Not a member of this squad.');
    }

    const sharedDataRef = squadDb.collection('sharedPlans').doc(planId)
      .collection('carnivalData').doc('main');

    // Get current data
    const sharedDataDoc = await sharedDataRef.get();
    const currentData = sharedDataDoc.exists ? sharedDataDoc.data() : {
      budget: [],
      schedule: [],
      packing: [],
      costume: null,
      squad: []
    };

    // Add contributor info to items
    const now = new Date();
    const contributor = { uid, email: email || null, at: now };

    if (field === 'costume') {
      // Costume is a single object, not an array
      currentData.costume = { ...data, updatedBy: contributor };
    } else if (action === 'add' && Array.isArray(data)) {
      // Adding new items to array fields
      const itemsWithContributor = data.map(item => ({
        ...item,
        addedBy: contributor
      }));
      currentData[field] = [...(currentData[field] || []), ...itemsWithContributor];
    } else if (action === 'remove' && data?.id) {
      // Removing an item by ID
      currentData[field] = (currentData[field] || []).filter(item => item.id !== data.id);
    } else if (action === 'update' && data?.id) {
      // Updating an existing item
      currentData[field] = (currentData[field] || []).map(item =>
        item.id === data.id ? { ...item, ...data, updatedBy: contributor } : item
      );
    } else if (action === 'set') {
      // Replace entire field
      if (Array.isArray(data)) {
        currentData[field] = data.map(item => ({
          ...item,
          addedBy: item.addedBy || contributor
        }));
      } else {
        currentData[field] = data;
      }
    }

    // Save updated data
    await sharedDataRef.set(currentData, { merge: true });

    return { success: true, data: currentData };
  }
);

// ----- Callable: deleteUserAccount -----
// Deletes all user data from Firestore, Storage, and Auth
exports.deleteUserAccount = onCall(
  {
    region: "us-central1",
    enforceAppCheck: false
  },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in to delete account.');
    }

    const uid = request.auth.uid;
    const userEmail = request.auth.token?.email || '';

    console.log(`Deleting account for user: ${uid} (${userEmail})`);

    try {
      // 1. Delete all carnival data under users/{uid}/apps/{APP_ID}/carnivals/*
      const carnivalsRef = squadDb.collection(`users/${uid}/apps/${APP_ID}/carnivals`);
      const carnivalsSnapshot = await carnivalsRef.get();
      const carnivalDeletes = carnivalsSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(carnivalDeletes);
      console.log(`Deleted ${carnivalsSnapshot.docs.length} carnival documents`);

      // 2. Delete the app document users/{uid}/apps/${APP_ID}
      const appRef = squadDb.doc(`users/${uid}/apps/${APP_ID}`);
      await appRef.delete();
      console.log('Deleted app document');

      // 3. Delete the user document users/{uid}
      const userRef = squadDb.doc(`users/${uid}`);
      await userRef.delete();
      console.log('Deleted user document');

      // 4. Delete FCM token
      const fcmRef = squadDb.doc(`fcmTokens/${uid}`);
      await fcmRef.delete();
      console.log('Deleted FCM token');

      // 5. Delete files from Firebase Storage (if any)
      try {
        const bucket = admin.storage().bucket();
        const [files] = await bucket.getFiles({ prefix: `users/${uid}/` });
        if (files.length > 0) {
          await Promise.all(files.map(file => file.delete()));
          console.log(`Deleted ${files.length} storage files`);
        }
      } catch (storageErr) {
        console.log('Storage deletion skipped (no files or error):', storageErr.message);
      }

      // 6. Remove user from any squads (UNIFIED: 'squads' collection)
      const squadsRef = squadDb.collection('squads');
      // Helper query: check if member of any squad
      const snapshot = await squadsRef.where('members', 'array-contains', uid).get();
      const squadUpdates = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        // If Leader, delete squad? Or transfer?
        // App logic implies leader deleting account kills the squad for now or leaves it headless.
        // Safer to delete squad if leader leaves, OR ideally just remove them.
        // Frontend 'leaveSquad' logic: update members.

        if (data.leaderId === uid) {
          // If leader, delete the squad to avoid orphan states
          squadUpdates.push(doc.ref.delete());
        } else {
          // Remove from members array
          const updatedMembers = (data.members || []).filter(m => m !== uid);
          squadUpdates.push(doc.ref.update({ members: updatedMembers }));
        }
      });
      await Promise.all(squadUpdates);
      console.log('Removed user from squads');

      // 7. Delete the Firebase Auth user account
      await admin.auth().deleteUser(uid);
      console.log('Deleted Auth user');

      return {
        success: true,
        message: 'Account and all data deleted successfully.'
      };
    } catch (err) {
      console.error('Error deleting user account:', err);
      throw new HttpsError('internal', 'Failed to delete account. Please try again.');
    }
  }
);

// ----- Callable: migrateAuthUsers -----
// Admin-only function to migrate all Firebase Auth users to the users collection
exports.migrateAuthUsers = onCall(
  {
    region: "us-central1",
    enforceAppCheck: false
  },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    // Only allow admin to run this
    const adminEmail = 'djkrss1@gmail.com';
    const userEmail = request.auth.token?.email || '';

    if (userEmail !== adminEmail) {
      throw new HttpsError('permission-denied', 'Only admin can run user migration.');
    }

    console.log(`Starting user migration by admin: ${userEmail}`);

    try {
      // List all users from Firebase Auth (with pagination)
      let authUsers = [];
      let pageToken = undefined;

      do {
        const listUsersResult = await admin.auth().listUsers(1000, pageToken);
        authUsers = authUsers.concat(listUsersResult.users);
        pageToken = listUsersResult.pageToken;
      } while (pageToken);

      console.log(`Found ${authUsers.length} users in Firebase Auth`);

      let created = 0;
      let updated = 0;
      let skipped = 0;

      // Create/update user documents for each auth user in squad-db (Native Mode)
      for (const authUser of authUsers) {
        const userRef = squadDb.doc(`users/${authUser.uid}`);
        const userDoc = await userRef.get();

        // Use Firebase Auth metadata for dates
        const createdAt = authUser.metadata.creationTime
          ? new Date(authUser.metadata.creationTime)
          : new Date();
        const lastLoginAt = authUser.metadata.lastSignInTime
          ? new Date(authUser.metadata.lastSignInTime)
          : createdAt;

        if (!userDoc.exists) {
          // Create new user document
          await userRef.set({
            email: authUser.email || null,
            displayName: authUser.displayName || null,
            createdAt,
            lastLoginAt,
            migratedFromAuth: true,
            migratedAt: new Date()
          });
          created++;
          console.log(`Created user doc for: ${authUser.email || authUser.uid}`);
        } else {
          // Update existing user with any missing fields
          const existingData = userDoc.data();
          const updates = {};

          if (!existingData.createdAt) {
            updates.createdAt = createdAt;
          }
          if (!existingData.email && authUser.email) {
            updates.email = authUser.email;
          }
          if (!existingData.displayName && authUser.displayName) {
            updates.displayName = authUser.displayName;
          }

          if (Object.keys(updates).length > 0) {
            await userRef.update(updates);
            updated++;
            console.log(`Updated user doc for: ${authUser.email || authUser.uid}`);
          } else {
            skipped++;
          }
        }
      }

      console.log(`Migration complete: ${created} created, ${updated} updated, ${skipped} skipped`);

      return {
        success: true,
        total: authUsers.length,
        created,
        updated,
        skipped,
        message: `Migrated ${created} new users, updated ${updated}, skipped ${skipped}.`
      };
    } catch (err) {
      console.error('Error migrating users:', err);
      throw new HttpsError('internal', `Migration failed: ${err.message}`);
    }
  }
);

// ----- Callable: getAdminUsers -----
// Returns all users from Firebase Auth + syncs them to squad-db
// This ensures admin dashboard always shows accurate counts
exports.getAdminUsers = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');

    const userEmail = request.auth.token?.email || '';
    // Check admin status from admins collection or hardcoded super admin
    let isAdmin = userEmail === 'djkrss1@gmail.com';
    if (!isAdmin) {
      try {
        const adminDoc = await squadDb.doc(`admins/${request.auth.uid}`).get();
        isAdmin = adminDoc.exists;
      } catch (e) { /* ignore */ }
    }
    if (!isAdmin) throw new HttpsError('permission-denied', 'Admin only.');

    try {
      // List ALL users from Firebase Auth (paginated)
      let authUsers = [];
      let pageToken = undefined;
      do {
        const listResult = await admin.auth().listUsers(1000, pageToken);
        authUsers = authUsers.concat(listResult.users);
        pageToken = listResult.pageToken;
      } while (pageToken);

      console.log(`[getAdminUsers] Found ${authUsers.length} users in Firebase Auth`);

      // Sync each auth user to squad-db/users (upsert)
      const usersList = [];
      for (const authUser of authUsers) {
        const userRef = squadDb.doc(`users/${authUser.uid}`);
        const userDoc = await userRef.get();

        const createdAt = authUser.metadata.creationTime
          ? new Date(authUser.metadata.creationTime)
          : new Date();
        const lastLoginAt = authUser.metadata.lastSignInTime
          ? new Date(authUser.metadata.lastSignInTime)
          : createdAt;

        if (!userDoc.exists) {
          await userRef.set({
            email: authUser.email || null,
            displayName: authUser.displayName || null,
            createdAt,
            lastLoginAt,
            migratedFromAuth: true,
            migratedAt: new Date()
          });
        }

        // Check premium status
        let isPremium = false;
        let carnivalCount = 0;
        try {
          const appRef = squadDb.doc(`users/${authUser.uid}/apps/${APP_ID}`);
          const appSnap = await appRef.get();
          if (appSnap.exists) {
            isPremium = !!appSnap.data().premiumActive;
            if (appSnap.data().selectedCarnivals) {
              carnivalCount = Object.keys(appSnap.data().selectedCarnivals).length;
            }
          }
        } catch (e) { /* ignore */ }

        if (authUser.email && ['djkrss1@gmail.com'].includes(authUser.email.toLowerCase())) {
          isPremium = true;
        }

        usersList.push({
          id: authUser.uid,
          email: authUser.email || null,
          displayName: authUser.displayName || null,
          createdAt: createdAt.toISOString(),
          lastLoginAt: lastLoginAt.toISOString(),
          isPremium,
          carnivalCount,
          provider: authUser.providerData?.[0]?.providerId || 'unknown',
        });
      }

      return {
        success: true,
        total: usersList.length,
        premium: usersList.filter(u => u.isPremium).length,
        users: usersList,
      };
    } catch (err) {
      console.error('[getAdminUsers] Error:', err);
      throw new HttpsError('internal', `Failed to fetch users: ${err.message}`);
    }
  }
);

// ----- Callable: getScrapedEvents (Premium only) -----
// Fetches scraped event data for a carnival - only accessible to premium users
exports.getScrapedEvents = onCall(
  { region: "us-central1" },
  async (request) => {
    const uid = request.auth?.uid;
    const email = request.auth?.token?.email;

    if (!uid) {
      throw new HttpsError('unauthenticated', 'You must be signed in to access live events.');
    }

    const { carnivalId } = request.data || {};

    if (!carnivalId || typeof carnivalId !== 'string') {
      throw new HttpsError('invalid-argument', 'A valid carnivalId is required.');
    }

    // Email override for premium users
    const PREMIUM_OVERRIDE_EMAILS = ['djkrss1@gmail.com', 'maikacooke@gmail.com'];
    let isPremium = PREMIUM_OVERRIDE_EMAILS.includes(email?.toLowerCase());

    // Check Firestore for premium status if not in override list
    if (!isPremium) {
      try {
        const userAppDoc = await squadDb.doc(`users/${uid}/apps/${APP_ID}`).get();
        if (userAppDoc.exists) {
          const data = userAppDoc.data();
          isPremium = data.premiumActive === true;
        }
      } catch (err) {
        console.log('Error checking premium status:', err);
      }
    }

    if (!isPremium) {
      throw new HttpsError('permission-denied', 'Live events are a premium feature. Please upgrade to access.');
    }

    // Fetch scraped events for the carnival
    try {
      const eventsDoc = await squadDb.doc(`carnivalEvents/${carnivalId}`).get();

      if (!eventsDoc.exists) {
        return {
          success: true,
          events: [],
          lastScrapedAt: null,
          message: 'No events found for this carnival yet.'
        };
      }

      const data = eventsDoc.data();
      return {
        success: true,
        events: data.events || [],
        lastScrapedAt: data.lastScrapedAt || null,
        eventCount: data.eventCount || 0,
        sources: data.sources || []
      };
    } catch (err) {
      console.error('Error fetching scraped events:', err);
      throw new HttpsError('internal', 'Failed to fetch events.');
    }
  }
);

// ===================================================================
// SOCA PASSPORT 2.0 FUNCTIONS
// ===================================================================

// Achievement definitions (stored in code for simplicity, could be in Firestore)
const PASSPORT_ACHIEVEMENTS = {
  first_stamp: {
    id: 'first_stamp',
    name: 'First Steps',
    description: 'Claim your first stamp',
    icon: '🎟️',
    category: 'MILESTONE',
    points: 50,
    criteria: { type: 'EVENT_COUNT', target: 1 }
  },
  loyal_fan: {
    id: 'loyal_fan',
    name: 'Loyal Fan',
    description: 'Check in to 10 events total',
    icon: '⭐',
    category: 'MILESTONE',
    points: 250,
    criteria: { type: 'EVENT_COUNT', target: 10 }
  },
  carnival_veteran: {
    id: 'carnival_veteran',
    name: 'Carnival Veteran',
    description: 'Attend 25+ total events',
    icon: '🎖️',
    category: 'MILESTONE',
    points: 300,
    criteria: { type: 'EVENT_COUNT', target: 25 }
  },
  island_hopper: {
    id: 'island_hopper',
    name: 'Island Hopper',
    description: 'Check in at 5 different countries',
    icon: '🏝️',
    category: 'TRAVEL',
    points: 200,
    criteria: { type: 'COUNTRY_COUNT', target: 5 }
  },
  globe_trotter: {
    id: 'globe_trotter',
    name: 'Globe Trotter',
    description: 'Check in at 3 different countries',
    icon: '🌍',
    category: 'TRAVEL',
    points: 100,
    criteria: { type: 'COUNTRY_COUNT', target: 3 }
  },
  sunrise_warrior: {
    id: 'sunrise_warrior',
    name: 'Sunrise Warrior',
    description: 'Attend 5 J\'ouvert or early morning events',
    icon: '🌅',
    category: 'EVENTS',
    points: 150,
    criteria: { type: 'EVENT_TYPE', target: 5, eventTypes: ['jouvert', 'breakfast'] }
  },
  ocean_voyager: {
    id: 'ocean_voyager',
    name: 'Ocean Voyager',
    description: 'Attend 3 boat ride events',
    icon: '🚢',
    category: 'EVENTS',
    points: 100,
    criteria: { type: 'EVENT_TYPE', target: 3, eventTypes: ['boat_ride'] }
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Attend 5 breakfast fetes',
    icon: '🍳',
    category: 'EVENTS',
    points: 100,
    criteria: { type: 'EVENT_TYPE', target: 5, eventTypes: ['breakfast'] }
  },
  mud_master: {
    id: 'mud_master',
    name: 'Mud Master',
    description: 'Attend 5 J\'ouvert events',
    icon: '🎨',
    category: 'EVENTS',
    points: 150,
    criteria: { type: 'EVENT_TYPE', target: 5, eventTypes: ['jouvert'] }
  },
  tier_up: {
    id: 'tier_up',
    name: 'Moving Up',
    description: 'Reach Silver tier',
    icon: '📈',
    category: 'MILESTONE',
    points: 200,
    criteria: { type: 'TIER_REACHED', target: 'SILVER' }
  },
  gold_status: {
    id: 'gold_status',
    name: 'Gold Status',
    description: 'Reach Gold tier',
    icon: '🥇',
    category: 'MILESTONE',
    points: 350,
    criteria: { type: 'TIER_REACHED', target: 'GOLD' }
  },
  legend: {
    id: 'legend',
    name: 'Living Legend',
    description: 'Reach Platinum tier',
    icon: '👑',
    category: 'MILESTONE',
    points: 500,
    criteria: { type: 'TIER_REACHED', target: 'PLATINUM' }
  },
  rarity_hunter: {
    id: 'rarity_hunter',
    name: 'Rarity Hunter',
    description: 'Collect a Legendary stamp',
    icon: '💎',
    category: 'COLLECTOR',
    points: 75,
    criteria: { type: 'RARITY_COLLECTED', target: 'LEGENDARY' }
  }
};

// Tier thresholds
const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 500,
  GOLD: 1500,
  PLATINUM: 5000
};

// Credit amounts by rarity
const CREDIT_AMOUNTS = {
  COMMON: 50,
  RARE: 75,
  EPIC: 100,
  LEGENDARY: 150
};

// Calculate tier from credits
function calculateTier(totalCredits) {
  if (totalCredits >= TIER_THRESHOLDS.PLATINUM) return 'PLATINUM';
  if (totalCredits >= TIER_THRESHOLDS.GOLD) return 'GOLD';
  if (totalCredits >= TIER_THRESHOLDS.SILVER) return 'SILVER';
  return 'BRONZE';
}

// Calculate stamp rarity
function calculateRarity(event, checkinNumber) {
  // First 50 check-ins are LEGENDARY
  if (checkinNumber <= 50) return 'LEGENDARY';
  // Annual flagship events are EPIC
  if (event.isAnnualFlagship || event.isFlagship) return 'EPIC';
  // Small events (<500 capacity) are RARE
  if (event.maxCapacity && event.maxCapacity < 500) return 'RARE';
  // First 200 check-ins are RARE
  if (checkinNumber <= 200) return 'RARE';
  return 'COMMON';
}

// Check if achievements should be unlocked
function checkAchievements(profile, newCheckin) {
  const unlockedAchievements = profile.unlockedAchievements || [];
  const newlyUnlocked = [];

  for (const [id, achievement] of Object.entries(PASSPORT_ACHIEVEMENTS)) {
    // Skip if already unlocked
    if (unlockedAchievements.includes(id)) continue;

    const { criteria } = achievement;
    let unlocked = false;

    switch (criteria.type) {
      case 'EVENT_COUNT':
        unlocked = profile.totalEvents >= criteria.target;
        break;
      case 'COUNTRY_COUNT':
        unlocked = (profile.countriesVisited || []).length >= criteria.target;
        break;
      case 'TIER_REACHED':
        // Check if user has reached the target tier (or higher)
        const tierOrder = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];
        const targetIndex = tierOrder.indexOf(criteria.target);
        const currentIndex = tierOrder.indexOf(profile.currentTier || 'BRONZE');
        unlocked = currentIndex >= targetIndex;
        break;
      case 'EVENT_TYPE':
        // Sum events of all specified types
        const eventTypeStats = profile.eventTypeStats || {};
        let typeCount = 0;
        for (const eventType of criteria.eventTypes) {
          typeCount += eventTypeStats[eventType] || 0;
        }
        unlocked = typeCount >= criteria.target;
        break;
      case 'RARITY_COLLECTED':
        // Check if user has collected a stamp of the target rarity
        // This is checked when a new stamp is collected
        if (newCheckin && newCheckin.rarity === criteria.target) {
          unlocked = true;
        }
        break;
    }

    if (unlocked) {
      newlyUnlocked.push(id);
    }
  }

  return newlyUnlocked;
}

// ----- Initialize Passport Profile -----
exports.initializePassport = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const email = request.auth.token?.email || null;
    const displayName = request.auth.token?.name || 'Carnival Lover';

    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    const existingProfile = await profileRef.get();

    if (existingProfile.exists) {
      return { success: true, profile: existingProfile.data(), isNew: false };
    }

    const now = new Date();
    const newProfile = {
      userId: uid,
      email,
      displayName,
      profilePictureUrl: null,

      // Core Stats
      totalCredits: 0,
      lifetimeCredits: 0,
      currentTier: 'BRONZE',
      totalEvents: 0,
      countriesVisited: [],

      // Achievements
      unlockedAchievements: [],
      achievementPoints: 0,

      // Event Type Stats (for achievements)
      eventTypeStats: {
        fete: 0,
        jouvert: 0,
        breakfast: 0,
        boat_ride: 0,
        cooler_fete: 0,
        all_inclusive: 0
      },

      // Timestamps
      passportCreatedAt: now,
      lastCheckinAt: null,

      // Settings
      isPublic: false,
      showOnLeaderboard: true
    };

    await profileRef.set(newProfile);

    return { success: true, profile: newProfile, isNew: true };
  }
);

// ----- Get Passport Profile -----
exports.getPassportProfile = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    try {
      console.log('getPassportProfile called');

      if (!request.auth || !request.auth.uid) {
        console.log('No auth, throwing unauthenticated');
        throw new HttpsError('unauthenticated', 'Must be signed in.');
      }

      const uid = request.auth.uid;
      const email = request.auth.token?.email || null;
      const displayName = request.auth.token?.name || 'Carnival Lover';

      console.log('Getting profile for uid:', uid);

      const profileRef = squadDb.doc(`passportProfiles/${uid}`);
      console.log('Profile ref created, getting document...');

      let profileDoc = await profileRef.get();
      console.log('Profile doc exists:', profileDoc.exists);

      // Auto-initialize if doesn't exist
      if (!profileDoc.exists) {
        console.log('Creating new profile...');
        const now = new Date();
        const newProfile = {
          userId: uid,
          email,
          displayName,
          profilePictureUrl: null,
          totalCredits: 0,
          lifetimeCredits: 0,
          currentTier: 'BRONZE',
          totalEvents: 0,
          countriesVisited: [],
          unlockedAchievements: [],
          achievementPoints: 0,
          eventTypeStats: {
            fete: 0,
            jouvert: 0,
            breakfast: 0,
            boat_ride: 0,
            cooler_fete: 0,
            all_inclusive: 0
          },
          passportCreatedAt: now,
          lastCheckinAt: null,
          isPublic: false,
          showOnLeaderboard: true
        };

        await profileRef.set(newProfile);
        console.log('New profile created successfully');

        return {
          ...newProfile,
          tierProgress: {
            nextTier: 'SILVER',
            creditsToNextTier: 500,
            progressPercent: 0
          },
          achievementDefinitions: PASSPORT_ACHIEVEMENTS
        };
      }

      const profile = profileDoc.data();
      console.log('Got existing profile');

      // Calculate next tier progress
      const currentCredits = profile.totalCredits || 0;
      let nextTier = null;
      let creditsToNextTier = 0;
      let progressPercent = 100;

      if (profile.currentTier === 'BRONZE') {
        nextTier = 'SILVER';
        creditsToNextTier = TIER_THRESHOLDS.SILVER - currentCredits;
        progressPercent = Math.floor((currentCredits / TIER_THRESHOLDS.SILVER) * 100);
      } else if (profile.currentTier === 'SILVER') {
        nextTier = 'GOLD';
        creditsToNextTier = TIER_THRESHOLDS.GOLD - currentCredits;
        progressPercent = Math.floor(((currentCredits - TIER_THRESHOLDS.SILVER) / (TIER_THRESHOLDS.GOLD - TIER_THRESHOLDS.SILVER)) * 100);
      } else if (profile.currentTier === 'GOLD') {
        nextTier = 'PLATINUM';
        creditsToNextTier = TIER_THRESHOLDS.PLATINUM - currentCredits;
        progressPercent = Math.floor(((currentCredits - TIER_THRESHOLDS.GOLD) / (TIER_THRESHOLDS.PLATINUM - TIER_THRESHOLDS.GOLD)) * 100);
      }

      console.log('Returning profile with tier progress');
      return {
        ...profile,
        tierProgress: {
          nextTier,
          creditsToNextTier: Math.max(0, creditsToNextTier),
          progressPercent: Math.min(100, Math.max(0, progressPercent))
        },
        achievementDefinitions: PASSPORT_ACHIEVEMENTS
      };
    } catch (error) {
      console.error('getPassportProfile ERROR:', error.message);
      console.error('Error stack:', error.stack);
      throw new HttpsError('internal', `Failed to get profile: ${error.message}`);
    }
  }
);

// ----- Get Passport Stamps -----
exports.getPassportStamps = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const { limit: queryLimit = 50, rarity, carnivalId } = request.data || {};

    let query = squadDb.collection('passportStamps')
      .where('userId', '==', uid)
      .orderBy('stampedAt', 'desc');

    if (rarity) {
      query = query.where('rarity', '==', rarity);
    }

    if (carnivalId) {
      query = query.where('carnivalCircuit', '==', carnivalId);
    }

    const snapshot = await query.limit(queryLimit).get();

    const stamps = [];
    snapshot.forEach(doc => {
      stamps.push({ id: doc.id, ...doc.data() });
    });

    return { stamps, count: stamps.length };
  }
);

// ----- Passport Check-in -----
exports.passportCheckin = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const { accessCode } = request.data || {};

    if (!accessCode || typeof accessCode !== 'string') {
      throw new HttpsError('invalid-argument', 'Access code is required.');
    }

    const cleanCode = accessCode.toUpperCase().trim();

    // 1. Find the event by access code
    const eventsQuery = await squadDb.collection('passportEvents')
      .where('accessCode', '==', cleanCode)
      .where('isActive', '==', true)
      .limit(1)
      .get();

    if (eventsQuery.empty) {
      throw new HttpsError('not-found', 'Invalid or expired access code.');
    }

    const eventDoc = eventsQuery.docs[0];
    const event = { id: eventDoc.id, ...eventDoc.data() };

    // 2. Check for duplicate check-in
    const existingCheckin = await squadDb.collection('passportCheckins')
      .where('userId', '==', uid)
      .where('eventId', '==', event.id)
      .limit(1)
      .get();

    if (!existingCheckin.empty) {
      throw new HttpsError('already-exists', 'You have already checked in to this event.');
    }

    // 3. Get current check-in count for this event (for rarity calculation)
    const checkinCountQuery = await squadDb.collection('passportCheckins')
      .where('eventId', '==', event.id)
      .count()
      .get();
    const checkinNumber = (checkinCountQuery.data().count || 0) + 1;

    // 4. Calculate rarity and credits
    const rarity = calculateRarity(event, checkinNumber);
    const creditsEarned = CREDIT_AMOUNTS[rarity];

    // 5. Get or create user profile
    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    let profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      // Initialize profile
      await exports.initializePassport.run({ auth: request.auth }, null);
      profileDoc = await profileRef.get();
    }

    const profile = profileDoc.data();

    // 6. Create check-in record
    const now = new Date();
    const checkinRef = squadDb.collection('passportCheckins').doc();
    const checkinData = {
      id: checkinRef.id,
      userId: uid,
      eventId: event.id,
      accessCode: cleanCode,
      creditsEarned,
      checkinMethod: 'CODE_ENTRY',
      checkedInAt: now,
      metadata: {
        eventTitle: event.title,
        eventDate: event.date,
        countryCode: event.countryCode,
        carnivalCircuit: event.carnivalCircuit
      }
    };
    await checkinRef.set(checkinData);

    // 7. Create stamp
    const stampRef = squadDb.collection('passportStamps').doc();
    const stampData = {
      id: stampRef.id,
      userId: uid,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,

      // Location
      countryCode: event.countryCode || 'XX',
      carnivalCircuit: event.carnivalCircuit || 'unknown',
      location: event.location || '',

      // Rarity
      rarity,
      editionNumber: checkinNumber,
      totalEditions: event.maxCapacity || 0, // 0 means unlimited

      // Credits
      creditsEarned,

      // Meta
      stampedAt: now,
      checkinMethod: 'CODE_ENTRY',
      isFavorite: false,

      // Event metadata for display
      eventType: event.eventType || 'fete'
    };
    await stampRef.set(stampData);

    // 8. Update user profile
    const newTotalCredits = (profile.totalCredits || 0) + creditsEarned;
    const newLifetimeCredits = (profile.lifetimeCredits || 0) + creditsEarned;
    const newTotalEvents = (profile.totalEvents || 0) + 1;
    const countriesVisited = [...new Set([...(profile.countriesVisited || []), event.countryCode])];
    const newTier = calculateTier(newTotalCredits);

    // Update event type stats
    const eventTypeStats = profile.eventTypeStats || {};
    const eventType = event.eventType || 'fete';
    eventTypeStats[eventType] = (eventTypeStats[eventType] || 0) + 1;

    const profileUpdate = {
      totalCredits: newTotalCredits,
      lifetimeCredits: newLifetimeCredits,
      totalEvents: newTotalEvents,
      countriesVisited,
      currentTier: newTier,
      lastCheckinAt: now,
      eventTypeStats
    };

    // 9. Check for new achievements
    const tempProfile = { ...profile, ...profileUpdate };
    const newAchievements = checkAchievements(tempProfile, checkinData);

    if (newAchievements.length > 0) {
      const achievementPoints = newAchievements.reduce((sum, id) =>
        sum + (PASSPORT_ACHIEVEMENTS[id]?.points || 0), 0);

      profileUpdate.unlockedAchievements = FieldValue.arrayUnion(...newAchievements);
      profileUpdate.achievementPoints = (profile.achievementPoints || 0) + achievementPoints;

      // Add achievement bonus credits
      profileUpdate.totalCredits += achievementPoints;
      profileUpdate.lifetimeCredits += achievementPoints;
    }

    await profileRef.update(profileUpdate);

    // 10. Update event check-in count
    await eventDoc.ref.update({
      totalCheckins: FieldValue.increment(1),
      lastCheckinAt: now
    });

    return {
      success: true,
      stamp: stampData,
      creditsEarned,
      bonusCredits: newAchievements.length > 0 ?
        newAchievements.reduce((sum, id) => sum + (PASSPORT_ACHIEVEMENTS[id]?.points || 0), 0) : 0,
      newTier,
      tierChanged: newTier !== profile.currentTier,
      newAchievements: newAchievements.map(id => PASSPORT_ACHIEVEMENTS[id]),
      totalCredits: profileUpdate.totalCredits
    };
  }
);

// ----- Get Passport Leaderboard -----
exports.getPassportLeaderboard = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { limit: queryLimit = 25 } = request.data || {};

    const snapshot = await squadDb.collection('passportProfiles')
      .where('showOnLeaderboard', '==', true)
      .orderBy('totalCredits', 'desc')
      .limit(queryLimit)
      .get();

    const leaderboard = [];
    let rank = 1;

    snapshot.forEach(doc => {
      const data = doc.data();
      leaderboard.push({
        rank: rank++,
        userId: doc.id,
        displayName: data.displayName || 'Anonymous',
        profilePictureUrl: data.profilePictureUrl,
        totalCredits: data.totalCredits || 0,
        currentTier: data.currentTier || 'BRONZE',
        totalEvents: data.totalEvents || 0,
        countriesVisited: (data.countriesVisited || []).length,
        achievementCount: (data.unlockedAchievements || []).length
      });
    });

    return { leaderboard };
  }
);

// ----- Get Squad Passport Stats -----
exports.getSquadPassportStats = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;

    // Find user's squad(s)
    // Note: Firestore array-contains check for objects is tricky if exact match needed.
    // However, since we store full objects, we might need a workaround or check all.
    // A better schema would be a separate 'memberUids' array field, but we work with what we have.
    // For now, we'll simple query all plans and filter in memory or rely on client passing planId.
    // To keep it efficient, let's try to query if we can, but 'members' schema makes it hard.
    // Alternative: The client likely knows the planId. If passed, use it.

    let { planId } = request.data || {};
    let planData = null;

    if (planId) {
      const planDoc = await squadDb.collection('sharedPlans').doc(planId).get();
      if (planDoc.exists) {
        planData = planDoc.data();
        // Verify membership
        const isMember = planData.members?.some(m => m.uid === uid);
        if (!isMember) planData = null;
      }
    }

    // Fallback: search for a plan where user is a member (inefficient scan if many plans, 
    // but assuming low volume or specialized index usually needed). 
    // As a robust fallback without index changes: 
    // We can't easily query the array of objects for just the UID.
    // So we will assume the client passes the planId or we rely on the user having 
    // a 'currentSquadId' in their profile (not currently there).

    // For this MVP, if no planId provided, we return empty structure.
    if (!planData) {
      // Search optimization: check recent plans created by user? 
      // Or ask 'squads' collection if that's easier?
      // Let's rely on client context for now.
      // Attempt one widespread query: 
      /* 
      const snapshot = await squadDb.collection('sharedPlans')
         .orderBy('lastActive', 'desc')
         .limit(20)
         .get(); 
      // filter in memory
      */
      return { inSquad: false };
    }

    // Get all member profiles
    const memberUids = planData.members.map(m => m.uid);
    const squadName = planData.squadName || planData.carnivalName || 'My Squad';

    // Fetch up to 10 members' profiles
    const memberProfiles = [];
    const profilesSnapshot = await squadDb.collection('passportProfiles')
      .where('userId', 'in', memberUids.slice(0, 10)) // Firestore 'in' limit
      .get();

    profilesSnapshot.forEach(doc => {
      memberProfiles.push(doc.data());
    });

    // Aggregate Stats
    let totalSquadCredits = 0;
    let totalSquadEvents = 0;
    const commonCountries = new Set();

    memberProfiles.forEach(p => {
      totalSquadCredits += (p.totalCredits || 0);
      totalSquadEvents += (p.totalEvents || 0);
      (p.countriesVisited || []).forEach(c => commonCountries.add(c));
    });

    // Sort members by credits for mini-leaderboard
    const rankedMembers = memberProfiles
      .sort((a, b) => (b.totalCredits || 0) - (a.totalCredits || 0))
      .map(p => ({
        userId: p.userId,
        displayName: p.displayName,
        profilePictureUrl: p.profilePictureUrl,
        totalCredits: p.totalCredits || 0,
        currentTier: p.currentTier || 'BRONZE'
      }));

    return {
      inSquad: true,
      squadName,
      squadId: planId,
      stats: {
        totalCredits: totalSquadCredits,
        totalEvents: totalSquadEvents,
        countriesVisited: commonCountries.size,
        memberCount: memberUids.length
      },
      members: rankedMembers
    };
  }
);

// ----- Seed Passport Events (Admin Only) -----
exports.seedPassportEvents = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    // Only allow admin to run this
    const adminEmails = ['djkrss1@gmail.com', 'maikacooke@gmail.com'];
    const userEmail = request.auth?.token?.email || '';

    if (!adminEmails.includes(userEmail)) {
      throw new HttpsError('permission-denied', 'Admin access required.');
    }

    const SAMPLE_EVENTS = [
      {
        title: "Demo Test Event",
        date: new Date('2026-01-20T12:00:00'),
        location: "Test Location",
        countryCode: "TT",
        carnivalCircuit: "trinidad",
        accessCode: "TEST-001",
        isActive: true,
        isFlagship: false,
        eventType: "fete",
        maxCapacity: 1000,
        organizerName: "Carnival Planner Team",
        totalCheckins: 0
      },
      {
        title: "Soca Brainwash 2026",
        date: new Date('2026-02-23T20:00:00'),
        location: "O2 Park, Chaguaramas",
        countryCode: "TT",
        carnivalCircuit: "trinidad",
        accessCode: "BRAIN-2026",
        isActive: true,
        isFlagship: true,
        eventType: "fete",
        maxCapacity: 15000,
        organizerName: "Island People",
        totalCheckins: 0
      },
      {
        title: "AM Bush J'ouvert",
        date: new Date('2026-02-24T04:00:00'),
        location: "Brian Lara Promenade",
        countryCode: "TT",
        carnivalCircuit: "trinidad",
        accessCode: "AMBUSH-2026",
        isActive: true,
        isFlagship: false,
        eventType: "jouvert",
        maxCapacity: 5000,
        organizerName: "Tribe",
        totalCheckins: 0
      },
      {
        title: "Miami Carnival Road March",
        date: new Date('2026-10-11T09:00:00'),
        location: "Miami-Dade Fairgrounds",
        countryCode: "US",
        carnivalCircuit: "miami",
        accessCode: "MIAMI-ROAD",
        isActive: true,
        isFlagship: true,
        eventType: "carnival",
        maxCapacity: 50000,
        organizerName: "Miami Broward Carnival",
        totalCheckins: 0
      },
      {
        title: "Sunrise Breakfast Fete",
        date: new Date('2026-07-14T06:00:00'),
        location: "Mas Camp, St. Lucia",
        countryCode: "LC",
        carnivalCircuit: "stlucia",
        accessCode: "SUNRISE-LC",
        isActive: true,
        isFlagship: false,
        eventType: "breakfast",
        maxCapacity: 800,
        organizerName: "Lucian Events",
        totalCheckins: 0
      },
      {
        title: "Catamaran Vibes Cruise",
        date: new Date('2026-08-02T11:00:00'),
        location: "Barbados Harbour",
        countryCode: "BB",
        carnivalCircuit: "barbados",
        accessCode: "BOAT-VIBES",
        isActive: true,
        isFlagship: false,
        eventType: "boat_ride",
        maxCapacity: 200,
        organizerName: "Island Cruises",
        totalCheckins: 0
      }
    ];

    const eventsRef = squadDb.collection('passportEvents');
    const results = [];

    for (const event of SAMPLE_EVENTS) {
      // Check if event with this access code already exists
      const existing = await eventsRef.where('accessCode', '==', event.accessCode).limit(1).get();

      if (existing.empty) {
        const docRef = await eventsRef.add({
          ...event,
          createdAt: new Date()
        });
        results.push({ accessCode: event.accessCode, title: event.title, status: 'created', id: docRef.id });
      } else {
        results.push({ accessCode: event.accessCode, title: event.title, status: 'already_exists' });
      }
    }

    return {
      success: true,
      message: `Processed ${SAMPLE_EVENTS.length} events`,
      results
    };
  }
);
// ----- Create Promoter Event -----
exports.createPromoterEvent = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const { title, date, time, location, capacity, type,
            bottleService, vipTables, standingTables, vipPrice, tableCapacity,
            description, ticketsEnabled, ticketTiers } = request.data;
    const uid = request.auth.uid;
    const userEmail = request.auth.token?.email || '';

    // Admin override
    const ADMIN_EMAILS = ['djkrss1@gmail.com'];
    const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

    if (!title || !date) {
      throw new HttpsError('invalid-argument', 'Title and Date are required.');
    }

    // 1. Check Promoter Status & Limits
    const promoterProfileRef = squadDb.collection('promoterProfiles').doc(uid);
    const promoterDoc = await promoterProfileRef.get();

    let isPro = isAdmin; // Admin always Pro
    if (promoterDoc.exists) {
      isPro = isPro || promoterDoc.data().isPro || false;
    } else {
      // Auto-create basic profile
      await promoterProfileRef.set({ isPro: isAdmin, createdAt: new Date() });
    }

    // Check active event limit for free tier
    if (!isPro) {
      const activeEventsQuery = await squadDb.collection('passportEvents')
        .where('creatorId', '==', uid)
        .where('isActive', '==', true)
        .get();

      if (activeEventsQuery.size >= 3) {
        throw new HttpsError('resource-exhausted', 'Free limit reached (3 active events). Please upgrade to Pro.');
      }
    }

    // 2. Generate Access Code
    const typePrefix = (type || 'fete').toUpperCase().substring(0, 4);
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const accessCode = `${typePrefix}-${randomSuffix}`;

    // 3. Create Event
    const eventData = {
      title,
      date: new Date(`${date}T${time || '12:00'}`),
      location,
      capacity: parseInt(capacity) || 0,
      eventType: type || 'fete',
      description: description || '',
      accessCode,
      creatorId: uid,
      isActive: true,
      totalCheckins: 0,
      createdAt: new Date(),
      countryCode: 'XX',
      carnivalCircuit: 'custom',
      isFlagship: false,
      // VIP / Hospitality options
      bottleService: bottleService || false,
      vipTables: vipTables || false,
      standingTables: standingTables || false,
      vipPrice: vipPrice ? parseFloat(vipPrice) : null,
      tableCapacity: tableCapacity ? parseInt(tableCapacity) : null,
      // Ticket sales
      ticketsEnabled: !!ticketsEnabled,
      ticketTiers: ticketsEnabled && Array.isArray(ticketTiers) ? ticketTiers.map(t => ({
        name: String(t.name || 'General Admission').substring(0, 50),
        price: Math.max(0, parseFloat(t.price) || 0),
        quantity: Math.max(1, parseInt(t.quantity) || 100),
        sold: 0,
        description: String(t.description || '').substring(0, 200)
      })) : [],
      ticketsSold: 0
    };

    const docRef = await squadDb.collection('passportEvents').add(eventData);

    return {
      success: true,
      eventId: docRef.id,
      accessCode
    };
  }
);

// ----- Delete Promoter Event -----
exports.deletePromoterEvent = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const { eventId } = request.data;
    const uid = request.auth.uid;
    const userEmail = request.auth.token?.email || '';

    if (!eventId) {
      throw new HttpsError('invalid-argument', 'Event ID is required.');
    }

    // Admin override
    const ADMIN_EMAILS = ['djkrss1@gmail.com'];
    const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

    // Verify ownership
    const eventDoc = await squadDb.collection('passportEvents').doc(eventId).get();
    if (!eventDoc.exists) {
      throw new HttpsError('not-found', 'Event not found.');
    }

    const eventData = eventDoc.data();
    if (eventData.creatorId !== uid && !isAdmin) {
      throw new HttpsError('permission-denied', 'You can only delete your own events.');
    }

    await squadDb.collection('passportEvents').doc(eventId).delete();

    return { success: true, deletedId: eventId };
  }
);

// ----- Get Event Public Info (no auth required to view) -----
exports.getEventPublicInfo = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { eventId } = request.data || {};
    if (!eventId) {
      throw new HttpsError('invalid-argument', 'Event ID is required.');
    }

    try {
      const eventDoc = await squadDb.collection('passportEvents').doc(eventId).get();
      if (!eventDoc.exists) {
        throw new HttpsError('not-found', 'Event not found.');
      }

      const data = eventDoc.data();

      // Parse date safely
      let eventDate;
      try {
        if (data.date && typeof data.date.toDate === 'function') {
          eventDate = data.date.toDate().toISOString();
        } else if (data.date instanceof Date) {
          eventDate = data.date.toISOString();
        } else if (data.date) {
          eventDate = new Date(data.date).toISOString();
        } else {
          eventDate = new Date().toISOString();
        }
      } catch (e) {
        eventDate = new Date().toISOString();
      }

      // Return public-safe event data (no creatorId, accessCode, etc.)
      return {
        success: true,
        event: {
          id: eventDoc.id,
          title: data.title,
          date: eventDate,
          location: data.location || '',
          description: data.description || '',
          eventType: data.eventType || 'fete',
          capacity: data.capacity || 0,
          isActive: data.isActive || false,
          ticketsEnabled: data.ticketsEnabled || false,
          ticketTiers: (data.ticketTiers || []).map(t => ({
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            sold: t.sold || 0,
            available: Math.max(0, (t.quantity || 0) - (t.sold || 0)),
            description: t.description || ''
          })),
          bottleService: data.bottleService || false,
          vipTables: data.vipTables || false,
          vipPrice: data.vipPrice || null,
          totalCheckins: data.totalCheckins || 0,
          promoterName: data.promoterName || null
        }
      };
    } catch (err) {
      if (err instanceof HttpsError) throw err;
      console.error('Error fetching event public info:', err);
      throw new HttpsError('internal', 'Failed to load event info.');
    }
  }
);

// ----- Purchase Event Ticket -----
exports.purchaseEventTicket = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in to purchase tickets.');
    }

    if (!stripe) {
      throw new HttpsError('failed-precondition', 'Stripe is not configured on the server.');
    }

    const uid = request.auth.uid;
    const buyerEmail = request.auth.token?.email || null;
    const {
      eventId,
      tierName,
      quantity = 1,
      success_url,
      cancel_url
    } = request.data || {};

    if (!eventId || !tierName) {
      throw new HttpsError('invalid-argument', 'Event ID and tier name are required.');
    }

    const purchaseQty = Math.min(Math.max(1, parseInt(quantity) || 1), 10); // Max 10 per purchase

    const DEFAULT_ORIGIN = "https://www.carnival-planner.com";

    try {
      // 1. Fetch the event
      const eventDoc = await squadDb.collection('passportEvents').doc(eventId).get();
      if (!eventDoc.exists) {
        throw new HttpsError('not-found', 'Event not found.');
      }

      const event = eventDoc.data();

      if (!event.isActive) {
        throw new HttpsError('failed-precondition', 'This event is no longer active.');
      }

      if (!event.ticketsEnabled) {
        throw new HttpsError('failed-precondition', 'Tickets are not available for this event.');
      }

      // 2. Find the requested tier
      const tierIndex = (event.ticketTiers || []).findIndex(t => t.name === tierName);
      if (tierIndex === -1) {
        throw new HttpsError('not-found', 'Ticket tier not found.');
      }

      const tier = event.ticketTiers[tierIndex];
      const available = (tier.quantity || 0) - (tier.sold || 0);
      if (available < purchaseQty) {
        throw new HttpsError('resource-exhausted', `Only ${available} tickets remaining for ${tierName}.`);
      }

      // Don't allow buying your own tickets
      if (event.creatorId === uid) {
        throw new HttpsError('failed-precondition', 'You cannot purchase tickets for your own event.');
      }

      // 3. Get the promoter's Stripe Connect account
      const sellerDoc = await squadDb.doc(`marketplaceSellers/${event.creatorId}`).get();
      if (!sellerDoc.exists || !sellerDoc.data().stripeAccountId) {
        throw new HttpsError('failed-precondition', 'Event organizer has not completed payment setup.');
      }

      const sellerStripeId = sellerDoc.data().stripeAccountId;

      // 4. Calculate pricing (premium users pay 0% platform fee)
      const buyerIsPremium = await checkUserPremium(uid, buyerEmail);
      const isOfficialBand = sellerDoc.data()?.isOfficialBand === true;
      const pricePerTicket = Math.round(tier.price * 100); // cents
      const baseProductAmount = pricePerTicket * purchaseQty;
      const platformFee = calculatePlatformFee(baseProductAmount, buyerIsPremium, isOfficialBand);

      // Total for consumer: Add fee ONLY for official bands (booking fee model)
      const totalAmount = isOfficialBand ? (baseProductAmount + platformFee) : baseProductAmount;

      // 5. Create ticket order document
      const ticketCode = `TIX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const orderRef = squadDb.collection('ticketOrders').doc();
      await orderRef.set({
        eventId,
        eventTitle: event.title,
        eventDate: event.date,
        tierName,
        quantity: purchaseQty,
        pricePerTicket: tier.price,
        totalAmount: totalAmount / 100,
        platformFee: platformFee / 100,
        sellerPayout: (totalAmount - platformFee) / 100,
        buyerId: uid,
        buyerEmail,
        sellerId: event.creatorId,
        sellerStripeId,
        ticketCode,
        status: 'pending',
        buyerIsPremium,
        createdAt: new Date(),
        qrData: JSON.stringify({
          orderId: orderRef.id,
          eventId,
          tierName,
          ticketCode,
          quantity: purchaseQty
        })
      });

      // 6. Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: buyerEmail || undefined,
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${event.title} — ${tierName}`,
              description: `🎫 ${purchaseQty}x ${tierName} ticket${purchaseQty > 1 ? 's' : ''}`,
            },
            unit_amount: isOfficialBand ? (pricePerTicket + Math.round(platformFee / purchaseQty)) : pricePerTicket,
          },
          quantity: purchaseQty,
        }],
        payment_intent_data: {
          application_fee_amount: platformFee,
          transfer_data: {
            destination: sellerStripeId,
          },
        },
        metadata: {
          orderId: orderRef.id,
          eventId,
          buyerUid: uid,
          sellerId: event.creatorId,
          tierName,
          tierIndex: String(tierIndex),
          quantity: String(purchaseQty),
          type: 'ticket_purchase',
        },
        success_url: `${success_url || DEFAULT_ORIGIN}?ticket_purchase=success&order_id=${orderRef.id}`,
        cancel_url: `${cancel_url || DEFAULT_ORIGIN}?ticket_purchase=cancelled`,
      });

      // 7. Update order with session
      await orderRef.update({ stripeSessionId: session.id });

      return {
        success: true,
        checkoutUrl: session.url,
        orderId: orderRef.id,
        sessionId: session.id,
      };
    } catch (err) {
      console.error("Error creating ticket checkout:", err);
      if (err instanceof HttpsError) throw err;
      throw new HttpsError('internal', `Failed to create ticket checkout: ${err.message}`);
    }
  }
);

// ----- Get Promoter Ticket Sales -----
exports.getPromoterTicketSales = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;

    try {
      // Get all ticket orders for this promoter
      const ordersQuery = await squadDb.collection('ticketOrders')
        .where('sellerId', '==', uid)
        .get();

      const orders = [];
      let totalRevenue = 0;
      let totalTicketsSold = 0;
      const eventBreakdown = {};

      ordersQuery.forEach(doc => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          eventTitle: data.eventTitle,
          tierName: data.tierName,
          quantity: data.quantity,
          totalAmount: data.totalAmount,
          sellerPayout: data.sellerPayout,
          buyerEmail: data.buyerEmail,
          status: data.status,
          ticketCode: data.ticketCode,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date(data.createdAt).toISOString()
        });

        if (data.status === 'completed') {
          totalRevenue += (data.sellerPayout || 0);
          totalTicketsSold += (data.quantity || 0);

          // Group by event
          const eKey = data.eventId || 'unknown';
          if (!eventBreakdown[eKey]) {
            eventBreakdown[eKey] = { title: data.eventTitle, sold: 0, revenue: 0 };
          }
          eventBreakdown[eKey].sold += (data.quantity || 0);
          eventBreakdown[eKey].revenue += (data.sellerPayout || 0);
        }
      });

      // Sort by newest first
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return {
        success: true,
        orders,
        summary: {
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          totalTicketsSold,
          totalOrders: orders.length,
          eventBreakdown: Object.values(eventBreakdown)
        }
      };
    } catch (err) {
      console.error('Error fetching ticket sales:', err);
      return { success: true, orders: [], summary: { totalRevenue: 0, totalTicketsSold: 0, totalOrders: 0, eventBreakdown: [] } };
    }
  }
);

// ----- Get Promoter Stats -----
exports.getPromoterStats = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const userEmail = request.auth.token?.email || '';

    // Admin override — djkrss1@gmail.com always has Pro access
    const ADMIN_EMAILS = ['djkrss1@gmail.com'];
    const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

    // 1. Get Promoter Profile (for Pro status)
    const promoterDoc = await squadDb.collection('promoterProfiles').doc(uid).get();
    const isPro = isAdmin || (promoterDoc.exists ? promoterDoc.data().isPro : false);

    // 2. Get Events (no orderBy to avoid composite index requirement)
    let events = [];
    let totalCheckins = 0;
    let activeEvents = 0;

    try {
      const eventsQuery = await squadDb.collection('passportEvents')
        .where('creatorId', '==', uid)
        .get();

      eventsQuery.forEach(doc => {
        const data = doc.data();
        // Safe date parsing — handle Firestore Timestamp, JS Date, or string
        let eventDate;
        try {
          if (data.date && typeof data.date.toDate === 'function') {
            eventDate = data.date.toDate().toISOString();
          } else if (data.date instanceof Date) {
            eventDate = data.date.toISOString();
          } else if (data.date) {
            eventDate = new Date(data.date).toISOString();
          } else {
            eventDate = new Date().toISOString();
          }
        } catch (e) {
          console.warn(`Invalid date for event ${doc.id}:`, e.message);
          eventDate = new Date().toISOString();
        }

        events.push({
          id: doc.id,
          title: data.title,
          date: eventDate,
          checkins: data.totalCheckins || 0,
          capacity: data.capacity,
          status: data.isActive ? 'active' : 'past',
          accessCode: data.accessCode,
          eventType: data.eventType || 'fete',
          bottleService: data.bottleService || false,
          vipTables: data.vipTables || false,
          standingTables: data.standingTables || false,
          vipPrice: data.vipPrice || null,
          tableCapacity: data.tableCapacity || null,
          ticketsEnabled: data.ticketsEnabled || false,
          ticketTiers: data.ticketTiers || [],
          ticketsSold: data.ticketsSold || 0
        });

        totalCheckins += (data.totalCheckins || 0);
        if (data.isActive) activeEvents++;
      });

      // Sort by date descending in-memory (avoids composite index)
      events.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (queryErr) {
      console.error('Failed to query passportEvents:', queryErr.message);
      // Return empty events rather than crashing
    }

    return {
      stats: {
        totalCheckins,
        activeEvents,
        todayCheckins: 0, // Placeholder
        isPro
      },
      events: events,
      isPro
    };
  }
);

// ----- Create Promoter Reward -----
exports.createPromoterReward = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const { title, description, cost, quantity } = request.data;
    const uid = request.auth.uid;

    if (!title || !cost) {
      throw new HttpsError('invalid-argument', 'Title and Cost are required.');
    }

    const rewardData = {
      promoterId: uid,
      title,
      description: description || '',
      cost: parseInt(cost),
      quantity: quantity ? parseInt(quantity) : null,
      active: true,
      createdAt: new Date(),
      redemptions: 0
    };

    const docRef = await squadDb.collection('promoterRewards').add(rewardData);

    return { success: true, rewardId: docRef.id };
  }
);

// ----- Get Promoter Rewards -----
exports.getPromoterRewards = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;

    try {
      const rewardsQuery = await squadDb.collection('promoterRewards')
        .where('promoterId', '==', uid)
        .get();

      const rewards = [];
      rewardsQuery.forEach(doc => {
        rewards.push({ id: doc.id, ...doc.data() });
      });

      // Sort in-memory to avoid index requirement
      rewards.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt) || 0;
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt) || 0;
        return dateB - dateA;
      });

      return { rewards };
    } catch (error) {
      console.error('Error fetching promoter rewards:', error);
      return { rewards: [] };
    }
  }
);

// ----- Get Available Rewards (User View) -----
exports.getAvailableRewards = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    try {
      // 1. Get all active rewards
      const rewardsQuery = await squadDb.collection('promoterRewards')
        .where('active', '==', true)
        .get();

      const rewards = [];
      rewardsQuery.forEach(doc => {
        const data = doc.data();
        // Only include if quantity is null (unlimited) or > 0
        if (data.quantity === null || data.quantity > 0) {
          rewards.push({ id: doc.id, ...data });
        }
      });

      // Sort in-memory to avoid index requirement
      rewards.sort((a, b) => (a.cost || 0) - (b.cost || 0));

      return { rewards };
    } catch (error) {
      console.error('Error fetching available rewards:', error);
      return { rewards: [] };
    }
  }
);

// ----- Redeem Promoter Reward -----
exports.redeemPromoterReward = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const { rewardId } = request.data;
    const uid = request.auth.uid;

    if (!rewardId) {
      throw new HttpsError('invalid-argument', 'Reward ID is required.');
    }

    return await squadDb.runTransaction(async (transaction) => {
      // 1. Get Reward
      const rewardRef = squadDb.collection('promoterRewards').doc(rewardId);
      const rewardDoc = await transaction.get(rewardRef);

      if (!rewardDoc.exists) {
        throw new HttpsError('not-found', 'Reward not found.');
      }

      const rewardData = rewardDoc.data();
      if (!rewardData.active) {
        throw new HttpsError('failed-precondition', 'Reward is no longer active.');
      }
      if (rewardData.quantity !== null && rewardData.quantity <= 0) {
        throw new HttpsError('resource-exhausted', 'Reward is out of stock.');
      }

      // 2. Get User Profile
      const userRef = squadDb.collection('passportProfiles').doc(uid);
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists) {
        throw new HttpsError('not-found', 'User profile not found.');
      }

      const userData = userDoc.data();
      const currentCredits = userData.totalCredits || 0;

      if (currentCredits < rewardData.cost) {
        throw new HttpsError('failed-precondition', `Insufficient credits. You need ${rewardData.cost} but have ${currentCredits}.`);
      }

      // 3. Execute Transaction Updates

      // Deduct credits
      const newCredits = currentCredits - rewardData.cost;
      transaction.update(userRef, { totalCredits: newCredits });

      // Update Reward stats
      const rewardUpdates = {
        redemptions: (rewardData.redemptions || 0) + 1
      };
      if (rewardData.quantity !== null) {
        rewardUpdates.quantity = rewardData.quantity - 1;
      }
      transaction.update(rewardRef, rewardUpdates);

      // Create Redemption Record
      const redemptionRef = squadDb.collection('rewardRedemptions').doc();
      const redemptionCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      transaction.set(redemptionRef, {
        userId: uid,
        rewardId: rewardId,
        rewardTitle: rewardData.title,
        cost: rewardData.cost,
        promoterId: rewardData.promoterId,
        timestamp: new Date(),
        code: redemptionCode,
        status: 'active' // active, redeemed, expired
      });

      return {
        success: true,
        redemptionCode,
        remainingCredits: newCredits,
        message: `Successfully redeemed ${rewardData.title}!`
      };
    });
  }
);

// =====================================================================
// ===== MARKETPLACE: Stripe Connect + Peer-to-Peer Payments ===========
// =====================================================================

const marketplaceWebhookSecret = process.env.STRIPE_MARKETPLACE_WEBHOOK_SECRET || null;

if (!marketplaceWebhookSecret) {
  console.warn(
    "Marketplace webhook secret not set. Run:\n" +
    "firebase functions:secrets:set STRIPE_MARKETPLACE_WEBHOOK_SECRET"
  );
}

// ----- Callable: createConnectAccount -----
// Creates a Stripe Connect Express account for a seller and returns the onboarding URL
exports.createConnectAccount = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in to become a seller.');
    }

    if (!stripe) {
      throw new HttpsError('failed-precondition', 'Stripe is not configured on the server.');
    }

    const uid = request.auth.uid;
    const email = request.auth.token?.email || null;
    const { returnUrl, refreshUrl } = request.data || {};

    const DEFAULT_ORIGIN = "https://carnival-planner.web.app";
    const baseReturnUrl = returnUrl || DEFAULT_ORIGIN;
    const baseRefreshUrl = refreshUrl || DEFAULT_ORIGIN;

    try {
      // Check if seller already has a Connect account
      const sellerRef = squadDb.doc(`marketplaceSellers/${uid}`);
      const sellerDoc = await sellerRef.get();

      let accountId;

      if (sellerDoc.exists && sellerDoc.data().stripeAccountId) {
        // Existing account — generate a new onboarding link (in case they didn't finish)
        accountId = sellerDoc.data().stripeAccountId;
      } else {
        // Create a new Express account
        const account = await stripe.accounts.create({
          type: 'express',
          email: email || undefined,
          metadata: {
            firebaseUid: uid,
            platform: 'carnival-planner-marketplace'
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        });

        accountId = account.id;

        // Store the Connect account ID in Firestore
        await sellerRef.set({
          stripeAccountId: accountId,
          email: email,
          onboardingComplete: false,
          createdAt: new Date(),
        }, { merge: true });
      }

      // Create an Account Link for onboarding
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${baseRefreshUrl}?stripe_refresh=true`,
        return_url: `${baseReturnUrl}?stripe_onboarding=complete`,
        type: 'account_onboarding',
      });

      return {
        success: true,
        onboardingUrl: accountLink.url,
        accountId: accountId,
      };
    } catch (err) {
      console.error("Error creating Connect account:", err);
      throw new HttpsError('internal', `Failed to create seller account: ${err.message}`);
    }
  }
);

// ----- Callable: verifyConnectAccount -----
// Manually requests account status from Stripe (useful if webhook drops)
exports.verifyConnectAccount = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    if (!stripe) {
      throw new HttpsError('failed-precondition', 'Stripe is not configured on the server.');
    }

    const uid = request.auth.uid;

    try {
      const sellerRef = squadDb.doc(`marketplaceSellers/${uid}`);
      const sellerDoc = await sellerRef.get();

      if (!sellerDoc.exists || !sellerDoc.data().stripeAccountId) {
        return { success: false, isReady: false, message: 'No Stripe account linked.' };
      }

      const accountId = sellerDoc.data().stripeAccountId;
      const account = await stripe.accounts.retrieve(accountId);

      const isReady = account.charges_enabled && account.payouts_enabled;

      await sellerRef.update({
        onboardingComplete: isReady,
        chargesEnabled: account.charges_enabled || false,
        payoutsEnabled: account.payouts_enabled || false,
        updatedAt: new Date(),
      });

      return {
        success: true,
        isReady,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled
      };
    } catch (err) {
      console.error("Error verifying Connect account:", err);
      throw new HttpsError('internal', `Failed to verify seller account: ${err.message}`);
    }
  }
);

// ----- Callable: createConnectLoginLink -----
// Returns a Stripe Express dashboard link so sellers can view payouts/settings
exports.createConnectLoginLink = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    if (!stripe) {
      throw new HttpsError('failed-precondition', 'Stripe is not configured.');
    }

    const uid = request.auth.uid;

    try {
      const sellerDoc = await squadDb.doc(`marketplaceSellers/${uid}`).get();

      if (!sellerDoc.exists || !sellerDoc.data().stripeAccountId) {
        throw new HttpsError('not-found', 'No seller account found. Complete onboarding first.');
      }

      const accountId = sellerDoc.data().stripeAccountId;

      const loginLink = await stripe.accounts.createLoginLink(accountId);

      return {
        success: true,
        loginUrl: loginLink.url,
      };
    } catch (err) {
      console.error("Error creating login link:", err);
      if (err instanceof HttpsError) throw err;
      throw new HttpsError('internal', `Failed to create dashboard link: ${err.message}`);
    }
  }
);

// ----- Callable: createMarketplaceCheckout -----
// Creates a Stripe Checkout Session for a marketplace purchase
// Routes funds: 90% to seller's Connect account, 10% platform fee
exports.createMarketplaceCheckout = onCall(
  { cors: true, invoker: "public", secrets: ["STRIPE_SECRET_KEY"] },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in to purchase.');
    }

    if (!stripe) {
      throw new HttpsError('failed-precondition', 'Stripe is not configured on the server.');
    }

    const uid = request.auth.uid;
    const buyerEmail = request.auth.token?.email || null;
    const {
      listingId,
      success_url,
      cancel_url
    } = request.data || {};

    if (!listingId) {
      throw new HttpsError('invalid-argument', 'Listing ID is required.');
    }

    const DEFAULT_ORIGIN = "https://carnival-planner.web.app";

    try {
      // 1. Fetch the listing from Firestore
      const listingDoc = await squadDb.doc(`marketplaceListings/${listingId}`).get();

      if (!listingDoc.exists) {
        throw new HttpsError('not-found', 'Listing not found.');
      }

      const listing = listingDoc.data();

      // Validate listing is still available
      if (listing.status !== 'active') {
        throw new HttpsError('failed-precondition', 'This item is no longer available.');
      }

      // Prevent buying your own listing
      if (listing.sellerId === uid) {
        throw new HttpsError('failed-precondition', 'You cannot purchase your own listing.');
      }

      // 2. Fetch seller's Stripe Connect account ID
      const sellerDoc = await squadDb.doc(`marketplaceSellers/${listing.sellerId}`).get();

      if (!sellerDoc.exists || !sellerDoc.data().stripeAccountId) {
        throw new HttpsError('failed-precondition', 'Seller has not completed payment setup.');
      }

      const sellerStripeId = sellerDoc.data().stripeAccountId;

      // 3. Calculate fees (premium users pay 0% platform fee)
      const buyerIsPremium = await checkUserPremium(uid, buyerEmail);
      const isOfficialBand = sellerDoc.data()?.isOfficialBand === true;
      const priceInCents = Math.round(listing.price * 100);
      const platformFee = calculatePlatformFee(priceInCents, buyerIsPremium, isOfficialBand);

      // Total for consumer: Add fee ONLY for official bands (booking fee model)
      const totalAmount = isOfficialBand ? (priceInCents + platformFee) : priceInCents;

      // 4. Create the order document (pending)
      const orderRef = squadDb.collection('marketplaceOrders').doc();
      await orderRef.set({
        listingId: listingId,
        listingTitle: listing.title,
        imageUrl: listing.imageUrl || '',
        category: listing.category || 'ticket',
        carnival: listing.carnival || '',
        buyerId: uid,
        buyerEmail: buyerEmail,
        sellerId: listing.sellerId,
        sellerName: listing.sellerName || 'Seller',
        sellerStripeId: sellerStripeId,
        amount: listing.price,
        platformFee: platformFee / 100,
        sellerPayout: (priceInCents - platformFee) / 100,
        currency: listing.currency || 'usd',
        status: 'pending',
        buyerIsPremium,
        createdAt: new Date(),
      });

      // 5. Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: buyerEmail || undefined,
        line_items: [{
          price_data: {
            currency: listing.currency || 'usd',
            product_data: {
              name: listing.title,
              description: `${listing.category === 'ticket' ? '🎫 Event Ticket' : '👗 Costume'} — ${listing.carnival || 'Carnival'}`,
              ...(listing.imageUrl ? { images: [listing.imageUrl] } : {}),
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        }],
        payment_intent_data: {
          application_fee_amount: platformFee,
          transfer_data: {
            destination: sellerStripeId,
          },
        },
        metadata: {
          orderId: orderRef.id,
          listingId: listingId,
          buyerUid: uid,
          sellerId: listing.sellerId,
          type: 'marketplace_purchase',
        },
        success_url: `${success_url || DEFAULT_ORIGIN}?marketplace_purchase=success&order_id=${orderRef.id}`,
        cancel_url: `${cancel_url || DEFAULT_ORIGIN}?marketplace_purchase=cancelled`,
      });

      // Update order with Stripe session ID
      await orderRef.update({
        stripeSessionId: session.id,
      });

      return {
        success: true,
        checkoutUrl: session.url,
        orderId: orderRef.id,
        sessionId: session.id,
      };
    } catch (err) {
      console.error("Error creating marketplace checkout:", err);
      if (err instanceof HttpsError) throw err;
      throw new HttpsError('internal', `Failed to create checkout: ${err.message}`);
    }
  }
);

// ----- Email helper for marketplace orders -----
async function sendOrderEmails(orderData, sellerEmail) {
  try {
    await emailService.sendOrderConfirmation(orderData, sellerEmail);
  } catch (err) {
    console.error("Failed to send order emails:", err.message);
  }
}

// ----- Webhook: handleMarketplaceWebhook -----
// Listens for Stripe Connect events and updates Firestore accordingly
exports.handleMarketplaceWebhook = onRequest(
  { secrets: ["STRIPE_SECRET_KEY", "STRIPE_MARKETPLACE_WEBHOOK_SECRET"] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    if (!stripe || !marketplaceWebhookSecret) {
      console.error("Stripe/Marketplace webhook not configured.");
      res.status(500).send("Stripe marketplace webhook not configured.");
      return;
    }

    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, marketplaceWebhookSecret);
    } catch (err) {
      console.error("Marketplace webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    try {
      switch (event.type) {
        // --- Payment completed: mark order + listing as sold ---
        case "checkout.session.completed": {
          const session = event.data.object;
          const meta = session.metadata || {};

          // Only process marketplace purchases and ticket purchases
          if (meta.type === 'ticket_purchase') {
            // --- TICKET PURCHASE ---
            const orderId = meta.orderId;
            const eventId = meta.eventId;
            const tierIndex = parseInt(meta.tierIndex);
            const qty = parseInt(meta.quantity) || 1;

            if (!orderId) {
              console.warn("Ticket webhook: no orderId in metadata.");
              break;
            }

            console.log(`Ticket: Completing order ${orderId} for event ${eventId}`);

            // Update ticket order to completed
            const ticketOrderRef = squadDb.doc(`ticketOrders/${orderId}`);
            await ticketOrderRef.update({
              status: 'completed',
              completedAt: new Date(),
              stripePaymentIntentId: session.payment_intent || null,
            });

            // Update event: decrement tier availability, increment sold
            if (eventId && !isNaN(tierIndex)) {
              const eventRef = squadDb.doc(`passportEvents/${eventId}`);
              const eventSnap = await eventRef.get();
              if (eventSnap.exists) {
                const eventData = eventSnap.data();
                const tiers = eventData.ticketTiers || [];
                if (tiers[tierIndex]) {
                  tiers[tierIndex].sold = (tiers[tierIndex].sold || 0) + qty;
                  await eventRef.update({
                    ticketTiers: tiers,
                    ticketsSold: FieldValue.increment(qty)
                  });
                }
              }
            }

            console.log(`Ticket: Order ${orderId} completed, ${qty} tickets sold.`);
            break;
          }

          if (meta.type !== 'marketplace_purchase') {
            console.log("Marketplace webhook: ignoring non-marketplace session.");
            break;
          }

          const orderId = meta.orderId;
          const listingId = meta.listingId;

          if (!orderId) {
            console.warn("Marketplace webhook: no orderId in metadata.");
            break;
          }

          console.log(`Marketplace: Completing order ${orderId} for listing ${listingId}`);

          // Update the Order to completed
          const orderRef = squadDb.doc(`marketplaceOrders/${orderId}`);
          await orderRef.update({
            status: 'completed',
            completedAt: new Date(),
            stripePaymentIntentId: session.payment_intent || null,
          });

          // Mark the Listing as sold
          if (listingId) {
            const listingRef = squadDb.doc(`marketplaceListings/${listingId}`);
            await listingRef.update({
              status: 'sold',
              soldAt: new Date(),
              soldTo: meta.buyerUid || null,
            });
          }

          console.log(`Marketplace: Order ${orderId} completed, listing ${listingId} marked as sold.`);

          // --- Send email notifications to buyer and seller ---
          try {
            const orderDoc = await orderRef.get();
            const orderData = orderDoc.data();
            if (orderData) {
              // Look up seller email from Firebase Auth
              let sellerEmail = null;
              try {
                const sellerUser = await admin.auth().getUser(orderData.sellerId);
                sellerEmail = sellerUser.email;
              } catch (e) { /* seller email lookup failed, non-critical */ }

              await sendOrderEmails(orderData, sellerEmail);
            }
          } catch (emailErr) {
            // Email failure should not block the webhook response
            console.error('Failed to send order emails (non-critical):', emailErr.message);
          }

          break;
        }

        // --- Connect account updated: check onboarding status ---
        case "account.updated": {
          const account = event.data.object;
          const firebaseUid = account.metadata?.firebaseUid;

          if (!firebaseUid) {
            console.log("Marketplace webhook: account.updated with no firebaseUid, skipping.");
            break;
          }

          const isFullyOnboarded = account.charges_enabled && account.payouts_enabled;

          const sellerRef = squadDb.doc(`marketplaceSellers/${firebaseUid}`);
          await sellerRef.update({
            onboardingComplete: isFullyOnboarded,
            chargesEnabled: account.charges_enabled || false,
            payoutsEnabled: account.payouts_enabled || false,
            updatedAt: new Date(),
          });

          console.log(`Marketplace: Seller ${firebaseUid} onboarding status: ${isFullyOnboarded ? 'complete' : 'pending'}`);
          break;
        }

        default:
          console.log(`Marketplace webhook: unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Marketplace webhook handler error:", err);
      res.status(500).send("Marketplace webhook handler failed.");
    }
  }
);

// ===================================================================
// VIBE ENGINE — Scheduled Scraping + AI Scoring
// ===================================================================

// Scheduled: Run scraper + vibe scoring every 15 minutes
// Only active during carnival season — disable by removing the schedule
exports.scheduledScrapeEvents = onSchedule(
  {
    schedule: "every 15 minutes",
    timeZone: "America/Port_of_Spain",
    region: "us-central1",
    timeoutSeconds: 300,
    memory: "512MiB",
    secrets: ["GEMINI_API_KEY"],
  },
  async (event) => {
    console.log("Vibe Engine: Scheduled scrape + score run starting...");

    try {
      // 1. Run the scraper
      const scrapeResult = await runScraper(squadDb);
      console.log(`Vibe Engine: Scraper finished. ${scrapeResult.totalScraped} events across ${scrapeResult.categorizedCount} carnivals.`);

      // 2. Generate vibe scores
      const geminiKey = process.env.GEMINI_API_KEY;
      const vibeResult = await generateVibeScores(squadDb, geminiKey);
      console.log(`Vibe Engine: Scoring finished. ${vibeResult.scored} events scored.`);

      return { scrapeResult, vibeResult };
    } catch (err) {
      console.error("Vibe Engine: Scheduled run failed:", err);
    }
  }
);

// Admin-only: Manually trigger scraper + vibe engine
exports.runVibeEngine = onCall(
  {
    region: "us-central1",
    cors: true,
    invoker: "public",
    secrets: ["GEMINI_API_KEY"],
  },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    // Admin-only check
    const adminEmail = 'djkrss1@gmail.com';
    const userEmail = request.auth.token?.email || '';
    if (userEmail !== adminEmail) {
      throw new HttpsError('permission-denied', 'Only admin can trigger the Vibe Engine.');
    }

    console.log(`Vibe Engine: Manual trigger by ${userEmail}`);

    try {
      const scrapeResult = await runScraper(squadDb);
      const geminiKey = process.env.GEMINI_API_KEY;
      const vibeResult = await generateVibeScores(squadDb, geminiKey);

      return {
        success: true,
        scrapeResult,
        vibeResult,
        message: `Scraped ${scrapeResult.totalScraped} events, scored ${vibeResult.scored} events.`
      };
    } catch (err) {
      console.error("Vibe Engine manual run error:", err);
      throw new HttpsError('internal', `Vibe Engine failed: ${err.message}`);
    }
  }
);

// Callable Cloud Function: AI Fete & Travel Concierge
exports.feteConcierge = onCall(
  {
    region: "us-central1",
    cors: true,
    invoker: "public",
    secrets: ["GEMINI_API_KEY"],
  },
  async (request) => {
    const { query } = request.data || {};
    if (!query || typeof query !== 'string') {
      throw new HttpsError('invalid-argument', 'A query string is required.');
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      throw new HttpsError('failed-precondition', 'Gemini API key is not configured.');
    }

    try {
      // 1. Fetch all scraped fete documents from Firestore
      const snap = await squadDb.collection('carnivalEvents').get();
      const allEvents = [];
      
      snap.forEach(doc => {
        const data = doc.data();
        const events = data.events || [];
        events.forEach(evt => {
          allEvents.push({
            id: evt.id,
            title: evt.title,
            date: evt.date || 'TBD',
            venue: evt.venue || 'TBD',
            url: evt.url || '#',
            price: evt.price || 'TBD',
            source: evt.source || 'CCP',
            location: data.carnivalId || 'Caribbean'
          });
        });
      });

      // 2. Select up to 40 events to fit context
      const slicedEvents = allEvents.slice(0, 40);

      // 3. Format the event corpus
      const eventCorpus = slicedEvents.map(evt => {
        return `- Title: "${evt.title}" | Location/Carnival: ${evt.location} | Date: ${evt.date} | Venue: ${evt.venue} | Tickets: ${evt.price} | Link: ${evt.url}`;
      }).join('\n');

      // 4. Initialize Gemini model
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // 5. Build prompt
      const prompt = `You are the CaribPulse AI Fete & Travel Concierge, a high-energy, helpful, and legendary Caribbean culture guide. Your job is to help partygoers find upcoming fetes, concerts, and travel accommodation tips based on the event directory database below.

Event Directory Database:
${eventCorpus || "No upcoming fetes found in directory currently."}

User Question: "${query}"

Guidelines:
1. Tone: Enthusiastic, welcoming, and high-energy (use appropriate emojis and light Caribbean/Carnival slang like "vibe", "fete", "bacchanal", "pump", but keep it highly readable).
2. Direct Links: If you mention an event that has a link in the database, you MUST render it as a clickable Markdown link using its exact URL. Example: [Buy Tickets here](URL).
3. Travel/Hotels: If the user is asking about a location or fete, naturally recommend they check hotel listings. Insert a link to Booking.com search using their location. Example format: [Book Hotels in Location here](https://www.booking.com/searchresults.html?ss=LocationName&aid=caribpulse).
4. Accuracy: Only recommend events that are listed in the database. If no direct match exists, suggest similar events or explain you don't see it in the active feed, but suggest searching for other locations.
5. Formatting: Use bullet points and paragraphs. Keep responses concise and scannable.

Response:`;

      const result = await model.generateContent(prompt);
      const answer = result.response.text();

      return {
        success: true,
        answer
      };
    } catch (err) {
      console.error("Fete Concierge AI error:", err);
      throw new HttpsError('internal', `Concierge failed: ${err.message}`);
    }
  }
);

// HTTP Endpoint: Public Events Export for fete video compiler
exports.publicEventsExport = onRequest(
  { region: "us-central1", cors: true, invoker: "public" },
  async (req, res) => {
    const key = req.query.key;
    const EXPORT_SECRET = "CCP-Video-Export-Token-2026-Secure";
    if (key !== EXPORT_SECRET) {
      res.status(403).send("Forbidden");
      return;
    }

    try {
      const snap = await squadDb.collection('carnivalEvents').get();
      const allEvents = [];
      
      snap.forEach(doc => {
        const data = doc.data();
        const events = data.events || [];
        events.forEach(evt => {
          allEvents.push({
            id: evt.id,
            title: evt.title,
            date: evt.date || evt.date_raw || 'TBD',
            venue: evt.venue || 'TBD',
            price: evt.price || 'TBD',
            url: evt.url || '#',
            source: evt.source || 'CCP',
            image: evt.image || null,
            location: data.carnivalId || 'Caribbean'
          });
        });
      });

      res.status(200).json(allEvents);
    } catch (err) {
      console.error("Failed to export events:", err);
      res.status(500).send(err.message);
    }
  }
);

// Scheduled: Weekly Auto-Publish Top Fetes Short payload to n8n (Every Friday at 9 AM)
exports.scheduledFeteVideoPublish = onSchedule(
  {
    schedule: "0 9 * * 5", // Every Friday at 9:00 AM AST
    timeZone: "America/Port_of_Spain",
    region: "us-central1",
    timeoutSeconds: 300,
  },
  async (event) => {
    console.log("Auto-Shorts: Generating weekly fete video payload...");
    const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://sgx.app.n8n.cloud/webhook/36e6bf2c-0f5a-41ca-b639-eb8f9bcc81ae";

    try {
      const snap = await squadDb.collection('carnivalEvents').get();
      const carnivals = ["barbados", "trinidad", "jamaica"];

      for (const carnId of carnivals) {
        const doc = snap.docs.find(d => d.id === carnId);
        if (!doc) continue;
        const events = doc.data().events || [];
        if (events.length === 0) continue;

        const topEvents = events.slice(0, 5).map(e => ({
          title: e.title,
          date: e.date || e.date_raw || 'TBD',
          venue: e.venue || 'TBD',
          price: e.price || 'TBD'
        }));

        const payload = {
          location: carnId,
          title: `Top 5 Fetes This Weekend in ${carnId.toUpperCase()}! 🌴 #Shorts #Carnival`,
          description: `Discover upcoming fetes and book travel on CaribPulse AI at https://carnival-planner.web.app! Island: ${carnId}`,
          tags: `carnival,fetes,${carnId},caribbean,socamusic,party`,
          topEvents: topEvents,
          timestamp: new Date().toISOString()
        };

        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        console.log(`Auto-Shorts: Pushed ${carnId} payload to n8n (Status: ${res.status})`);
      }
    } catch (err) {
      console.error("Auto-Shorts: Scheduled publish failed:", err);
    }
  }
);

// Callable: Fetch vibe scores for a carnival (fallback if real-time listener fails)
exports.getVibeScores = onCall(
  { region: "us-central1", cors: true, invoker: "public" },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const { carnivalId } = request.data || {};
    if (!carnivalId || typeof carnivalId !== 'string') {
      throw new HttpsError('invalid-argument', 'A valid carnivalId is required.');
    }

    try {
      const doc = await squadDb.collection('vibeScores').doc(carnivalId).get();
      if (!doc.exists) {
        return { success: true, scores: [], generatedAt: null };
      }

      const data = doc.data();
      return {
        success: true,
        scores: data.scores || [],
        generatedAt: data.generatedAt || null,
        avgScore: data.avgScore || 0,
      };
    } catch (err) {
      console.error('Error fetching vibe scores:', err);
      throw new HttpsError('internal', 'Failed to fetch vibe scores.');
    }
  }
);

// ═══════════════════════════════════════════════════════════════
// WEB3 PASSPORT — ON-CHAIN MINTING
// ═══════════════════════════════════════════════════════════════

const { ethers } = require('ethers');

// Crossmint Configuration
const CROSSMINT_API_KEY = process.env.CROSSMINT_API_KEY || 'ck_production_34QAfBpa1vBME3LMBUZAJbHuKt6ZsZm427jwhwPR7RoyRWEtdB5mXEqXWxKYZFTRpWci4Y2sV9Gy6dUzWkbwJdy9zAr856xB72KPwpzSG8iFpNx2AeKJJVTLZkPg8hhQGqVmBFron2zVTjd4HykYtBkRbPJSnx6psEbotcH6itKq3QJ2wtRjwfvXBqBYFJ64sTwTPj3979M3pE9Lck1RtdE';
const CROSSMINT_COLLECTION_ID = process.env.CROSSMINT_COLLECTION_ID || '1d0a1221-6a27-4c65-a204-788acafd188c';

/**
 * Mint NFT using Crossmint Minting API and poll for status.
 */
async function mintWithCrossmint(recipient, nftMetadata) {
  const url = `https://www.crossmint.com/api/2022-06-09/collections/${CROSSMINT_COLLECTION_ID}/nfts`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-API-KEY': CROSSMINT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient: recipient,
      metadata: nftMetadata
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Crossmint Mint API returned ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  const actionId = result.actionId;
  if (!actionId) {
    throw new Error('No actionId returned from Crossmint');
  }

  console.log(`Crossmint mint initiated. Action ID: ${actionId}. Polling status...`);

  // Poll for status
  const actionUrl = `https://www.crossmint.com/api/2022-06-09/actions/${actionId}`;
  let attempts = 0;
  const maxAttempts = 15; // 30 seconds max polling time

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;

    try {
      const statusResponse = await fetch(actionUrl, {
        headers: {
          'X-API-KEY': CROSSMINT_API_KEY
        }
      });

      if (!statusResponse.ok) {
        console.warn(`Status polling failed on attempt ${attempts}: ${statusResponse.status}`);
        continue;
      }

      const statusResult = await statusResponse.json();
      console.log(`Polling attempt ${attempts} status: ${statusResult.status}`);

      if (statusResult.status === 'success') {
        const txHash = statusResult.data?.transactionHash || '';
        const tokenId = statusResult.data?.token?.id || '';
        return {
          success: true,
          txHash: txHash,
          tokenId: tokenId,
          actionId: actionId
        };
      } else if (statusResult.status === 'failed') {
        throw new Error(`Crossmint mint action failed: ${statusResult.error || 'Unknown error'}`);
      }
    } catch (pollErr) {
      console.error(`Error polling Crossmint status:`, pollErr);
      if (attempts >= maxAttempts) {
        throw pollErr;
      }
    }
  }

  throw new Error(`Crossmint minting timed out after 30 seconds. Action ID: ${actionId}`);
}

// ----- Mint Stamp as NFT -----
exports.mintStamp = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const { stampId } = request.data || {};

    if (!stampId) {
      throw new HttpsError('invalid-argument', 'Stamp ID is required.');
    }

    // 1. Get user profile
    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      throw new HttpsError('not-found', 'Passport profile not found.');
    }

    const profile = profileDoc.data();
    const walletAddress = profile.walletAddress;
    const userEmail = request.auth.token?.email || profile.email;

    if (!walletAddress && !userEmail) {
      throw new HttpsError(
        'failed-precondition',
        'No wallet connected or email address found to mint to.'
      );
    }

    // Determine Crossmint recipient string
    const recipient = walletAddress 
      ? `web3:${walletAddress}:base` 
      : `email:${userEmail}:base`;

    // 2. Get stamp — verify it belongs to this user
    const stampRef = squadDb.doc(`passportStamps/${stampId}`);
    const stampDoc = await stampRef.get();

    if (!stampDoc.exists) {
      throw new HttpsError('not-found', 'Stamp not found.');
    }

    const stamp = stampDoc.data();
    if (stamp.userId !== uid) {
      throw new HttpsError('permission-denied', 'This stamp does not belong to you.');
    }

    // 3. Check if already minted
    if (stamp.mintedTxHash) {
      return {
        success: true,
        alreadyMinted: true,
        txHash: stamp.mintedTxHash,
        tokenId: stamp.mintedTokenId,
        explorerUrl: `https://basescan.org/tx/${stamp.mintedTxHash}`
      };
    }

    // 4. Mint on-chain via Crossmint
    try {
      const metadata = {
        name: stamp.eventTitle || "Carnival Stamp",
        image: stamp.eventImage || "https://carnival-planner.web.app/icon.png",
        description: `Digital Stamp for ${stamp.eventTitle}. Collected on ${stamp.stampedAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()}.`,
        attributes: [
          { trait_type: "Event", value: stamp.eventTitle || "Unknown" },
          { trait_type: "Rarity", value: stamp.rarity || "Common" },
          { trait_type: "Edition", value: String(stamp.editionNumber || 1) },
          { trait_type: "Check-in Method", value: stamp.checkinMethod || "Manual" }
        ]
      };

      const mintResult = await mintWithCrossmint(recipient, metadata);

      // 5. Save mint info back to Firestore
      await stampRef.update({
        mintedTxHash: mintResult.txHash,
        mintedTokenId: mintResult.tokenId || mintResult.actionId,
        mintedAt: new Date(),
        walletAddress: walletAddress || recipient
      });

      // Update profile mint count
      await profileRef.update({
        mintedStampCount: FieldValue.increment(1),
        lastMintAt: new Date()
      });

      return {
        success: true,
        alreadyMinted: false,
        txHash: mintResult.txHash,
        tokenId: mintResult.tokenId || mintResult.actionId,
        explorerUrl: mintResult.txHash ? `https://basescan.org/tx/${mintResult.txHash}` : ''
      };
    } catch (error) {
      console.error('Mint stamp error:', error);
      throw new HttpsError('internal', `Minting failed: ${error.message}`);
    }
  }
);

// ----- Mint Achievement as NFT -----
exports.mintAchievement = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const { achievementId } = request.data || {};

    if (!achievementId) {
      throw new HttpsError('invalid-argument', 'Achievement ID is required.');
    }

    // Validate achievement exists
    const achievementDef = PASSPORT_ACHIEVEMENTS[achievementId];
    if (!achievementDef) {
      throw new HttpsError('not-found', 'Unknown achievement.');
    }

    // 1. Get user profile
    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      throw new HttpsError('not-found', 'Passport profile not found.');
    }

    const profile = profileDoc.data();
    const walletAddress = profile.walletAddress;
    const userEmail = request.auth.token?.email || profile.email;

    if (!walletAddress && !userEmail) {
      throw new HttpsError(
        'failed-precondition',
        'No wallet connected or email address found to mint to.'
      );
    }

    // Determine Crossmint recipient string
    const recipient = walletAddress 
      ? `web3:${walletAddress}:base` 
      : `email:${userEmail}:base`;

    // 2. Verify achievement is unlocked
    const unlockedAchievements = profile.unlockedAchievements || [];
    if (!unlockedAchievements.includes(achievementId)) {
      throw new HttpsError(
        'failed-precondition',
        'This achievement has not been unlocked yet.'
      );
    }

    // 3. Check if already minted
    const mintedAchievements = profile.mintedAchievements || [];
    if (mintedAchievements.includes(achievementId)) {
      return {
        success: true,
        alreadyMinted: true,
        achievementId
      };
    }

    // 4. Mint on-chain via Crossmint
    try {
      const metadata = {
        name: achievementDef.name || "Carnival Achievement",
        image: "https://carnival-planner.web.app/icon.png",
        description: achievementDef.description || "Earned achievement in Carnival Planner.",
        attributes: [
          { trait_type: "Achievement ID", value: achievementId },
          { trait_type: "Points Value", value: String(achievementDef.points || 0) },
          { trait_type: "Icon", value: achievementDef.icon || "🏆" }
        ]
      };

      const mintResult = await mintWithCrossmint(recipient, metadata);

      // 5. Record in Firestore
      await profileRef.update({
        mintedAchievements: FieldValue.arrayUnion(achievementId),
        mintedAchievementCount: FieldValue.increment(1),
        lastMintAt: new Date()
      });

      return {
        success: true,
        alreadyMinted: false,
        achievementId,
        txHash: mintResult.txHash,
        explorerUrl: mintResult.txHash ? `https://basescan.org/tx/${mintResult.txHash}` : ''
      };
    } catch (error) {
      console.error('Mint achievement error:', error);
      throw new HttpsError('internal', `Minting failed: ${error.message}`);
    }
  }
);

// ═══════════════════════════════════════════════════════════════
// AUTO-WALLET — INVISIBLE EMBEDDED WALLET GENERATION
// ═══════════════════════════════════════════════════════════════

const crypto = require('crypto');

/**
 * Encrypt a private key with AES-256-GCM for secure Firestore storage.
 */
function encryptPrivateKey(privateKey) {
  // Use a deterministic encryption key derived from WEB3_PRIVATE_KEY
  // In production, use a dedicated KMS or Firebase Secrets
  const secret = process.env.WEB3_PRIVATE_KEY || 'fallback-encryption-key';
  const key = crypto.createHash('sha256').update(secret).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(privateKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${tag}:${encrypted}`;
}

/**
 * Decrypt a private key from Firestore storage.
 */
function decryptPrivateKey(encryptedData) {
  const secret = process.env.WEB3_PRIVATE_KEY || 'fallback-encryption-key';
  const key = crypto.createHash('sha256').update(secret).digest();
  const [ivHex, tagHex, encrypted] = encryptedData.split(':');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * ensureWallet — Auto-generate an invisible Web3 wallet for a user.
 * Called on first login. If user already has a wallet, returns it.
 * The private key is encrypted and stored securely — users never see it.
 */
exports.ensureWallet = onCall(
  { region: 'us-central1', cors: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Must be logged in.');
    }

    const uid = request.auth.uid;
    const email = request.auth.token.email || '';

    try {
      // Check if user already has a wallet in squadDb (passportProfiles)
      const profileRef = squadDb.doc(`passportProfiles/${uid}`);
      const profileSnap = await profileRef.get();

      if (profileSnap.exists && profileSnap.data().walletAddress) {
        return {
          walletAddress: profileSnap.data().walletAddress,
          walletType: profileSnap.data().walletType || 'embedded',
          isNew: false
        };
      }

      // Generate a new wallet
      const wallet = ethers.Wallet.createRandom();
      const encryptedKey = encryptPrivateKey(wallet.privateKey);

      // Save to Firestore — wallet address is public, key is encrypted
      const walletData = {
        walletAddress: wallet.address,
        walletType: 'embedded',
        walletCreatedAt: FieldValue.serverTimestamp(),
        walletEmail: email,
      };

      // Store encrypted key in a separate secure subcollection in squadDb
      await squadDb.doc(`walletKeys/${uid}`).set({
        encryptedKey: encryptedKey,
        createdAt: FieldValue.serverTimestamp(),
      });

      // Update the user's passport profile in squadDb
      await profileRef.set(walletData, { merge: true });

      console.log(`[Wallet] Generated embedded wallet for ${uid}: ${wallet.address}`);

    } catch (err) {
      console.error('[Wallet] Failed to ensure wallet:', err);
      throw new HttpsError('internal', 'Failed to generate or retrieve wallet.');
    }
  }
);

// ===== AIRALO eSIM INTEGRATION (Telecom-as-a-Service) ============

const AIRALO_BASE_URL = process.env.AIRALO_ENV === 'production' 
  ? 'https://partners-api.airalo.com' 
  : 'https://sandbox-partners-api.airalo.com';

const airaloClientId = process.env.AIRALO_CLIENT_ID || null;
const airaloClientSecret = process.env.AIRALO_CLIENT_SECRET || null;

/**
 * Internal helper to complete an Airalo order after successful payment.
 */
async function completeAiraloOrder(uid, packageId) {
  console.log(`[Airalo] Completing order for uid: ${uid}, pkg: ${packageId}`);
  
  try {
    const token = await getAiraloToken();
    
    const response = await fetch(`${AIRALO_BASE_URL}/v2/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        package_id: packageId,
        quantity: 1,
        description: `Order for user ${uid}`
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Airalo API order failed: ${errText}`);
    }

    const result = await response.json();
    const orderData = result.data;
    
    // Store in Firestore
    const userEsimRef = squadDb.collection('userEsims').doc();
    await userEsimRef.set({
      userId: uid,
      packageId: packageId,
      airaloOrderId: orderData.id,
      esims: (orderData.sims || []).map(sim => ({
        iccid: sim.iccid,
        lpa: sim.lpa,
        matchingId: sim.matching_id,
        qrcodeUrl: sim.qrcode_url,
        installationGuides: sim.installation_guides
      })),
      status: 'completed',
      purchasedAt: FieldValue.serverTimestamp(),
    });

    console.log(`[Airalo] Successfully completed order ${orderData.id} for ${uid}`);
    return true;
  } catch (err) {
    console.error(`[Airalo] Order completion FAILED for ${uid}:`, err.message);
    // Track failure for manual resolution
    await squadDb.collection('failedOrders').add({
      type: 'airalo_order_failure',
      userId: uid,
      packageId,
      error: err.message,
      createdAt: FieldValue.serverTimestamp()
    });
    return false;
  }
}

/**
 * Internal helper to retrieve (and cache) Airalo OAuth2 token.
 */
async function getAiraloToken() {
  if (!airaloClientId || !airaloClientSecret) {
    throw new Error("Airalo credentials (AIRALO_CLIENT_ID/SECRET) not configured.");
  }

  // Tokens are valid for 24h. We cache in Firestore to respect rate limits.
  const tokenRef = squadDb.doc('config/airalo_token');
  const tokenDoc = await tokenRef.get();
  const now = Date.now();

  if (tokenDoc.exists) {
    const data = tokenDoc.data();
    // Refresh if expiring within next hour
    if (data.expiresAt > now + (3600 * 1000)) {
      return data.accessToken;
    }
  }

  console.log('[Airalo] Fetching new access token...');
  const response = await fetch(`${AIRALO_BASE_URL}/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: airaloClientId,
      client_secret: airaloClientSecret,
      grant_type: 'client_credentials'
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Airalo auth failed: ${errText}`);
  }

  const result = await response.json();
  const accessToken = result.data.access_token;
  const expiresIn = result.data.expires_in || 86400;
  const expiresAt = now + (expiresIn * 1000);

  await tokenRef.set({
    accessToken,
    expiresAt,
    updatedAt: FieldValue.serverTimestamp()
  });

  return accessToken;
}

/**
 * Call: getAiraloPackages
 * Fetches the eSIM catalog and applies the platform markup.
 */
exports.getAiraloPackages = onCall(
  { cors: true, invoker: "public", secrets: ["AIRALO_CLIENT_ID", "AIRALO_CLIENT_SECRET"] },
  async (request) => {
    const { countryCode, regionCode, type = 'local' } = request.data || {};
    
    try {
      const token = await getAiraloToken();
      
      // Build filters
      let query = `?type=${type}`;
      if (countryCode) query += `&filter[country]=${countryCode}`;
      if (regionCode) query += `&filter[region]=${regionCode}`;

      const response = await fetch(`${AIRALO_BASE_URL}/v2/packages${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Airalo Catalog API error: ${response.statusText}`);
      }

      const result = await response.json();
      const packages = result.data || [];

      // Resale Strategy: 20% markup + rounded up to nearest $0.99 or .00
      const markupRatio = 1.25; // 25% markup
      const resalablePackages = packages.map(pkg => {
        const wholesalePrice = parseFloat(pkg.price);
        const retailPrice = Math.ceil(wholesalePrice * markupRatio); // Rounded up to nearest dollar
        
        return {
          id: pkg.id,
          slug: pkg.slug,
          type: pkg.type,
          price: retailPrice, // User-facing price
          originalPrice: wholesalePrice,
          currency: 'USD',
          data: pkg.data, // amount of data (e.g. 1GB)
          validity: pkg.validity, // (e.g. 7 days)
          operator: pkg.operator?.title || 'Airalo Global',
          net_type: pkg.net_type,
          countries: (pkg.countries || []).map(c => ({ name: c.title, code: c.country_code }))
        };
      });

      return { packages: resalablePackages };
    } catch (err) {
      console.error("[Airalo] Catalog error:", err);
      throw new HttpsError("internal", `Telecom catalog unavailable: ${err.message}`);
    }
  }
);

/**
 * Call: initiateAiraloPurchase
 * Creates a Stripe checkout session for an eSIM.
 */
exports.initiateAiraloPurchase = onCall(
  { cors: true, invoker: "public", secrets: ["STRIPE_SECRET_KEY", "AIRALO_CLIENT_ID", "AIRALO_CLIENT_SECRET"] },
  async (request) => {
    const { packageId, packageName, retailPrice, uid: uidFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;

    if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in to purchase travel data.');
    if (!packageId || !retailPrice) throw new HttpsError('invalid-argument', 'Missing package details.');

    try {
      const origin = "https://carnival-planner.web.app";
      
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `eSIM Global Data: ${packageName || packageId}`,
              images: ['https://www.airalo.com/assets/images/logo.png'],
              description: 'Powered by Airalo - Digital travel data'
            },
            unit_amount: Math.round(retailPrice * 100),
          },
          quantity: 1,
        }],
        metadata: {
          type: 'airalo_purchase',
          packageId,
          firebaseUid: uid,
          retailPrice: retailPrice.toString()
        },
        success_url: `${origin}/telecom-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/telecom-cancel`,
      });

      return { 
        sessionId: session.id,
        checkoutUrl: session.url 
      };
    } catch (err) {
      console.error("[Airalo] Checkout error:", err);
      throw new HttpsError("internal", "Failed to initiate payment for data package.");
    }
  }
);

/**
 * Call: getUserEsims
 * Lists all purchased eSIMs for the current user.
 */
exports.getUserEsims = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const { uid: uidFromClient } = request.data || {};
    const uid = (request.auth && request.auth.uid) || uidFromClient;

    if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in.');

    try {
      const snap = await squadDb.collection('userEsims')
        .where('userId', '==', uid)
        .orderBy('purchasedAt', 'desc')
        .get();

      return { 
        esims: snap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) 
      };
    } catch (err) {
      console.error("[Airalo] Fetch error:", err);
      throw new HttpsError("internal", "Could not retrieve your eSIMs.");
    }
  }
);

// ═══════════════════════════════════════════════════════════════
// PROMOTER DASHBOARD — ZERO-TRUST IDOR PROTECTION PROTOCOL
// ═══════════════════════════════════════════════════════════════

exports.getPromoterDashboard = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    // Phase 1: Identify the Active Avatar
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Code 401: Secure Session Token Missing.');
    }
    const activeUserId = request.auth.uid;

    // Phase 2: Identify the Target Asset
    const targetDashboardId = request.data.dashboard_id;
    if (!targetDashboardId) {
      throw new HttpsError('invalid-argument', 'Missing target asset ID.');
    }

    // Phase 3: Query the Grid
    // Assumes promoterDashboards is a collection at the database root. Adjust if needed.
    const dashboardRef = admin.firestore().collection('promoterDashboards').doc(targetDashboardId);
    const dashboardDoc = await dashboardRef.get();

    if (!dashboardDoc.exists) {
      throw new HttpsError('not-found', 'Asset not found on the grid.');
    }

    const requestedDashboard = dashboardDoc.data();

    // Phase 4: The Physical Lock (The IDOR Patch)
    if (requestedDashboard.owner_id !== activeUserId) {
      // THE KILL SWITCH
      console.warn(`[THREAT DETECTED] User ${activeUserId} attempted IDOR on Dashboard ${targetDashboardId}`);
      
      throw new HttpsError(
        'permission-denied', 
        'Code 403: Access Denied. You lack the cryptographic clearance for this asset.'
      );
    }

    // Phase 5: Access Granted
    return {
      success: true,
      dashboard: requestedDashboard
    };
  }
);

// --- SOCA PASSPORT V2 FUNCTIONS ---

// 1. Transactional Squad Wagers
exports.initiateSquadWager = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }
    const { challengerSquadId, targetSquadId, wagerAmount, winCondition } = request.data || {};
    
    if (!challengerSquadId || !targetSquadId || !wagerAmount) {
      throw new HttpsError('invalid-argument', 'Missing required wager fields.');
    }

    const parsedAmount = parseInt(wagerAmount, 10);
    if (isNaN(parsedAmount) || parsedAmount < 50) {
      throw new HttpsError('invalid-argument', 'Wager amount must be at least 50 credits.');
    }

    try {
      let newWagerId = '';
      await squadDb.runTransaction(async (transaction) => {
        // Read challenger squad stats
        const challengerRef = squadDb.doc(`squads/${challengerSquadId}`);
        const challengerDoc = await transaction.get(challengerRef);
        
        let currentCredits = 0;

        if (!challengerDoc.exists) {
          if (challengerSquadId === 'SQUAD-TEST') {
            // Auto-create for local testing and deduct immediately
            transaction.set(challengerRef, {
              squadName: 'Test Squad',
              totalCredits: 1000 - parsedAmount
            });
            currentCredits = 1000;
          } else {
            throw new HttpsError('not-found', 'Challenger squad not found.');
          }
        } else {
          currentCredits = challengerDoc.data().totalCredits || 0;
          if (currentCredits < parsedAmount) {
            throw new HttpsError('failed-precondition', 'Insufficient squad credits for this wager.');
          }
          // Deduct credits (lock them)
          transaction.update(challengerRef, {
            totalCredits: FieldValue.increment(-parsedAmount)
          });
        }

        // Create the wager document
        const wagerRef = squadDb.collection('squadWagers').doc();
        newWagerId = wagerRef.id;
        transaction.set(wagerRef, {
          challengerSquadId,
          targetSquadId,
          wagerAmount: parsedAmount,
          winCondition: winCondition || 'Most Events Attended',
          status: 'pending_acceptance',
          createdAt: FieldValue.serverTimestamp(),
          createdBy: request.auth.uid
        });
      });

      return { success: true, message: 'Wager initiated and credits locked.', wagerId: newWagerId };
    } catch (err) {
      console.error('Initiate wager failed:', err);
      throw new HttpsError('internal', 'Failed to initiate wager: ' + err.message);
    }
  }
);

exports.resolveSquadWager = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }
    const { wagerId, winnerSquadId } = request.data || {};
    if (!wagerId || !winnerSquadId) {
      throw new HttpsError('invalid-argument', 'Missing wagerId or winnerSquadId.');
    }

    const wagerRef = squadDb.collection('squadWagers').doc(wagerId);

    try {
      await squadDb.runTransaction(async (transaction) => {
        const wagerDoc = await transaction.get(wagerRef);
        if (!wagerDoc.exists) {
          throw new HttpsError('not-found', 'Wager not found.');
        }

        const wager = wagerDoc.data();
        if (wager.status !== 'active') {
          throw new HttpsError('failed-precondition', 'Wager is not active.');
        }

        if (winnerSquadId !== wager.challengerSquadId && winnerSquadId !== wager.targetSquadId) {
          throw new HttpsError('invalid-argument', 'Winner must be one of the participating squads.');
        }

        const reward = wager.wagerAmount * 2; // Winner takes all

        transaction.update(wagerRef, {
          status: 'resolved',
          winnerSquadId: winnerSquadId,
          resolvedAt: FieldValue.serverTimestamp()
        });

        // Add to winner's credits
        const winnerStatsRef = squadDb.doc(`squads/${winnerSquadId}`);
        transaction.set(winnerStatsRef, {
          totalCredits: FieldValue.increment(reward)
        }, { merge: true });
      });

      return { success: true, message: 'Wager resolved successfully.' };
    } catch (err) {
      console.error('Transaction failed:', err);
      throw new HttpsError('internal', 'Wager resolution failed: ' + err.message);
    }
  }
);

// 2. Seasonal Reset
exports.seasonalReset = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const userEmail = request.auth?.token?.email || '';
    if (userEmail !== 'djkrss1@gmail.com') {
      throw new HttpsError('permission-denied', 'Only admins can trigger seasonal reset.');
    }

    const profilesRef = defaultDb.collection('passportProfiles');
    const snapshot = await profilesRef.get();

    const batch = defaultDb.batch();
    let count = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      const currentCredits = data.totalCredits || 0;
      
      if (currentCredits > 0) {
        batch.update(doc.ref, {
          legacyTokens: FieldValue.increment(currentCredits),
          totalCredits: 0,
          currentTier: 'BRONZE',
          lastSeasonalResetAt: FieldValue.serverTimestamp()
        });
        count++;
      }
    });

    if (count > 0) {
      await batch.commit();
    }

    return { success: true, usersReset: count };
  }
);

// 3. Verify Physical Attendance
exports.verifyPhysicalAttendance = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const { qrPayload } = request.data || {};
    
    if (!qrPayload) {
      throw new HttpsError('invalid-argument', 'Missing QR payload.');
    }

    // Basic cryptographic validation simulation
    let payloadObj;
    try {
      // Decode base64 JSON payload
      const decoded = Buffer.from(qrPayload, 'base64').toString('utf-8');
      payloadObj = JSON.parse(decoded);
    } catch (e) {
      throw new HttpsError('invalid-argument', 'Invalid QR format.');
    }

    const { eventId, secret, credits, countryCode } = payloadObj;
    
    // Validate secret
    if (secret !== 'soca_passport_secure_key_2026') {
      throw new HttpsError('permission-denied', 'Cryptographic signature invalid.');
    }

    const earnedCredits = credits || 100;

    // Award Digital Stamp and Credits
    const profileRef = defaultDb.collection('passportProfiles').doc(uid);
    const stampsRef = defaultDb.collection('passportStamps');

    const newStamp = {
      userId: uid,
      eventId: eventId || 'unknown_event',
      eventTitle: `Physical Check-in ${eventId || ''}`,
      countryCode: countryCode || 'XX',
      rarity: 'COMMON',
      creditsEarned: earnedCredits,
      stampedAt: FieldValue.serverTimestamp(),
      isFavorite: false,
      editionNumber: Math.floor(Math.random() * 1000) + 1
    };

    try {
      await defaultDb.runTransaction(async (t) => {
        const profileDoc = await t.get(profileRef);
        
        const newStampRef = stampsRef.doc();
        t.set(newStampRef, newStamp);

        if (profileDoc.exists) {
          t.update(profileRef, {
            totalCredits: FieldValue.increment(earnedCredits),
            totalEvents: FieldValue.increment(1)
          });
        } else {
          t.set(profileRef, {
            userId: uid,
            totalCredits: earnedCredits,
            totalEvents: 1,
            currentTier: 'BRONZE'
          });
        }
      });

      return { success: true, message: 'Attendance verified! Digital Stamp awarded.', credits: earnedCredits };
    } catch (err) {
      console.error('Error verifying attendance:', err);
      throw new HttpsError('internal', 'Failed to award stamp.');
    }
  }
);

// ═══════════════════════════════════════
// SQUAD VAULT (SOU SOU) CLOUD FUNCTIONS
// ═══════════════════════════════════════

const VAULT_CASHOUT_FEE = 0.019; // 1.9%
const VAULT_MAX_SIZE = 20000;

// Email transporter (delegated to centralized emailService)
function getMailTransporter() {
  return emailService.getTransporter();
}

// ── createVault ──
exports.createVault = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    const uid = request.auth.uid;
    const email = request.auth.token?.email || '';
    const displayName = request.auth.token?.name || email.split('@')[0];

    const { name, targetDate, goalAmount, contributionAmount, contributionFrequency, inviteEmails } = request.data || {};

    if (!name || typeof name !== 'string') throw new HttpsError('invalid-argument', 'Vault name required.');
    if (!goalAmount || goalAmount < 100 || goalAmount > VAULT_MAX_SIZE) throw new HttpsError('invalid-argument', `Goal must be $100–$${VAULT_MAX_SIZE}.`);
    if (!contributionAmount || contributionAmount < 25 || contributionAmount > 500) throw new HttpsError('invalid-argument', 'Contribution must be $25–$500.');
    if (!['weekly', 'biweekly', 'monthly'].includes(contributionFrequency)) throw new HttpsError('invalid-argument', 'Invalid frequency.');

    const inviteCode = generateShareCode();

    // Create vault document
    const vaultRef = squadDb.collection('vaults').doc();
    const vaultData = {
      name: name.trim(),
      targetDate: targetDate || null,
      goalAmount: Number(goalAmount),
      totalSaved: 0,
      status: 'active',
      adminUserId: uid,
      adminEmail: email,
      contributionAmount: Number(contributionAmount),
      contributionFrequency,
      maxVaultSize: VAULT_MAX_SIZE,
      memberCount: 1,
      members: [uid],
      inviteCode,
      frozenReason: null,
      totalPayouts: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await vaultRef.set(vaultData);

    // Add admin as first member
    await vaultRef.collection('members').doc(uid).set({
      userId: uid,
      email,
      displayName,
      status: 'active',
      role: 'admin',
      totalContributed: 0,
      failedPaymentCount: 0,
      invitedAt: FieldValue.serverTimestamp(),
      joinedAt: FieldValue.serverTimestamp(),
    });

    // Send email invites if provided
    const emails = Array.isArray(inviteEmails) ? inviteEmails.filter(e => e && e.includes('@')).slice(0, 10) : [];
    if (emails.length > 0) {
      for (const inviteEmail of emails) {
        // Create pending member doc
        const memberRef = vaultRef.collection('members').doc();
        await memberRef.set({
          userId: null,
          email: inviteEmail,
          displayName: inviteEmail.split('@')[0],
          status: 'invited',
          role: 'member',
          totalContributed: 0,
          failedPaymentCount: 0,
          invitedAt: FieldValue.serverTimestamp(),
          joinedAt: null,
        });

        await emailService.sendVaultInvitation({
          vaultName: name,
          goalAmount,
          contributionAmount,
          contributionFrequency,
          inviterName: displayName,
          toEmail: inviteEmail,
          vaultId: vaultRef.id,
          inviteCode,
        });
      }
    }

    return { success: true, vaultId: vaultRef.id, inviteCode };
  }
);

// ── joinVault ──
exports.joinVault = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    const uid = request.auth.uid;
    const email = request.auth.token?.email || '';
    const displayName = request.auth.token?.name || email.split('@')[0];
    const { vaultId, inviteCode } = request.data || {};

    if (!vaultId) throw new HttpsError('invalid-argument', 'Vault ID required.');

    const vaultRef = squadDb.collection('vaults').doc(vaultId);
    const vaultDoc = await vaultRef.get();
    if (!vaultDoc.exists) throw new HttpsError('not-found', 'Vault not found.');

    const vault = vaultDoc.data();
    if (vault.status !== 'active') throw new HttpsError('failed-precondition', 'Vault is not active.');
    if (vault.members?.includes(uid)) return { success: true, message: 'Already a member.' };
    if ((vault.memberCount || 0) >= 10) throw new HttpsError('failed-precondition', 'Vault is full (max 10).');

    // Update vault
    await vaultRef.update({
      members: FieldValue.arrayUnion(uid),
      memberCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Check if there's a pending invite for this email
    const pendingQuery = await vaultRef.collection('members').where('email', '==', email).where('status', '==', 'invited').limit(1).get();
    if (!pendingQuery.empty) {
      await pendingQuery.docs[0].ref.update({
        userId: uid,
        displayName,
        status: 'active',
        joinedAt: FieldValue.serverTimestamp(),
      });
    } else {
      await vaultRef.collection('members').doc(uid).set({
        userId: uid,
        email,
        displayName,
        status: 'active',
        role: 'member',
        totalContributed: 0,
        failedPaymentCount: 0,
        invitedAt: FieldValue.serverTimestamp(),
        joinedAt: FieldValue.serverTimestamp(),
      });
    }

    return { success: true, vaultName: vault.name };
  }
);

// ── contributeToVault — Creates Stripe Checkout for one-time contribution ──
exports.contributeToVault = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    if (!stripe) throw new HttpsError('failed-precondition', 'Stripe not configured.');

    const uid = request.auth.uid;
    const email = request.auth.token?.email || '';
    const { vaultId, amount } = request.data || {};

    if (!vaultId) throw new HttpsError('invalid-argument', 'Vault ID required.');
    if (!amount || amount < 1 || amount > 5000) throw new HttpsError('invalid-argument', 'Amount must be $1–$5000.');

    const vaultRef = squadDb.collection('vaults').doc(vaultId);
    const vaultDoc = await vaultRef.get();
    if (!vaultDoc.exists) throw new HttpsError('not-found', 'Vault not found.');

    const vault = vaultDoc.data();
    if (vault.status !== 'active') throw new HttpsError('failed-precondition', 'Vault is not active.');
    if (!vault.members?.includes(uid)) throw new HttpsError('permission-denied', 'Not a member.');

    // Check vault cap
    if ((vault.totalSaved || 0) + amount > vault.maxVaultSize) {
      throw new HttpsError('failed-precondition', `Would exceed vault max ($${vault.maxVaultSize}).`);
    }

    // Create pending contribution
    const contribRef = vaultRef.collection('contributions').doc();
    await contribRef.set({
      userId: uid,
      userEmail: email,
      amount: Number(amount),
      status: 'pending',
      type: 'manual',
      stripeCheckoutSessionId: null,
      failureReason: null,
      createdAt: FieldValue.serverTimestamp(),
    });

    const DEFAULT_ORIGIN = "https://carnival-planner.web.app";
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `Vault Contribution: ${vault.name}` },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      metadata: {
        type: 'vault_contribution',
        vaultId,
        contributionId: contribRef.id,
        firebaseUid: uid,
      },
      success_url: `${DEFAULT_ORIGIN}?vaultSuccess=${vaultId}`,
      cancel_url: `${DEFAULT_ORIGIN}?vaultCancel=${vaultId}`,
    }, stripeAccountId ? { stripeAccount: stripeAccountId } : undefined);

    // Save session ID
    await contribRef.update({ stripeCheckoutSessionId: session.id });

    return { checkoutUrl: session.url, sessionId: session.id };
  }
);

// ── requestVaultPayout — Admin triggers bank transfer ──
exports.requestVaultPayout = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    const uid = request.auth.uid;
    const { vaultId, amount, type, description } = request.data || {};

    if (!vaultId || !amount) throw new HttpsError('invalid-argument', 'Vault ID and amount required.');

    const vaultRef = squadDb.collection('vaults').doc(vaultId);
    const vaultDoc = await vaultRef.get();
    if (!vaultDoc.exists) throw new HttpsError('not-found', 'Vault not found.');

    const vault = vaultDoc.data();
    if (vault.adminUserId !== uid) throw new HttpsError('permission-denied', 'Only vault admin can request payouts.');
    if (vault.status !== 'active') throw new HttpsError('failed-precondition', 'Vault is not active.');
    if (amount > (vault.totalSaved || 0)) throw new HttpsError('failed-precondition', 'Insufficient vault balance.');

    const payoutType = type || 'bank_transfer';
    const feeAmount = payoutType === 'bank_transfer' ? Math.round(amount * VAULT_CASHOUT_FEE * 100) / 100 : 0;

    // Create payout record
    await vaultRef.collection('payouts').doc().set({
      amount: Number(amount),
      type: payoutType,
      description: description || 'Payout',
      merchant: null,
      status: 'pending',
      feeAmount,
      netAmount: amount - feeAmount,
      initiatedBy: uid,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Update vault balance
    await vaultRef.update({
      totalSaved: FieldValue.increment(-amount),
      totalPayouts: FieldValue.increment(amount),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { success: true, feeAmount, netAmount: amount - feeAmount };
  }
);

// ── freezeVault ──
exports.freezeVault = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    const uid = request.auth.uid;
    const { vaultId, reason } = request.data || {};

    const vaultRef = squadDb.collection('vaults').doc(vaultId);
    const vaultDoc = await vaultRef.get();
    if (!vaultDoc.exists) throw new HttpsError('not-found', 'Vault not found.');

    const vault = vaultDoc.data();
    // Allow admin or super admin
    const userEmail = request.auth.token?.email || '';
    if (vault.adminUserId !== uid && userEmail !== 'djkrss1@gmail.com') {
      throw new HttpsError('permission-denied', 'Only vault admin can freeze.');
    }

    await vaultRef.update({
      status: 'frozen',
      frozenReason: reason || 'Manual freeze',
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { success: true };
  }
);

// ── closeVault ──
exports.closeVault = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    const uid = request.auth.uid;
    const { vaultId } = request.data || {};

    const vaultRef = squadDb.collection('vaults').doc(vaultId);
    const vaultDoc = await vaultRef.get();
    if (!vaultDoc.exists) throw new HttpsError('not-found', 'Vault not found.');

    const vault = vaultDoc.data();
    const userEmail = request.auth.token?.email || '';
    if (vault.adminUserId !== uid && userEmail !== 'djkrss1@gmail.com') {
      throw new HttpsError('permission-denied', 'Only vault admin can close.');
    }

    await vaultRef.update({
      status: 'closed',
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { success: true, message: 'Vault closed. Refunds will be processed in 3-5 business days.' };
  }
);

// ── inviteToVault ──
exports.inviteToVault = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Must be signed in.');
    const uid = request.auth.uid;
    const { vaultId, emails } = request.data || {};

    if (!vaultId || !Array.isArray(emails)) throw new HttpsError('invalid-argument', 'Vault ID and emails required.');

    const vaultRef = squadDb.collection('vaults').doc(vaultId);
    const vaultDoc = await vaultRef.get();
    if (!vaultDoc.exists) throw new HttpsError('not-found', 'Vault not found.');

    const vault = vaultDoc.data();
    if (vault.adminUserId !== uid) throw new HttpsError('permission-denied', 'Only admin can invite.');

    const displayName = request.auth.token?.name || request.auth.token?.email?.split('@')[0] || 'Someone';
    const inviteCode = vault.inviteCode || '';
    let sent = 0;

    for (const email of emails.filter(e => e && e.includes('@')).slice(0, 10)) {
      const memberRef = vaultRef.collection('members').doc();
      await memberRef.set({
        userId: null, email, displayName: email.split('@')[0],
        status: 'invited', role: 'member', totalContributed: 0,
        failedPaymentCount: 0, invitedAt: FieldValue.serverTimestamp(), joinedAt: null,
      });

      const res = await emailService.sendVaultInvitation({
        vaultName: vault.name,
        goalAmount: vault.goalAmount,
        contributionAmount: vault.contributionAmount,
        contributionFrequency: vault.contributionFrequency,
        inviterName: displayName,
        toEmail: email,
        vaultId,
        inviteCode,
      });
      if (res.success) sent++;
    }

    return { success: true, sent };
  }
);

// ----- WhatsApp Curated Local Knowledge Bases -----
const WHATSAPP_COUNTRY_CONFIGS = {
  trinidad: {
    name: "Trinidad",
    fetes: "Trinidad Carnival has legendary fetes! Here are the top ones for your schedule:\n\n1. **Soca Brainwash** (Saturdays, absolute staple) 🍹\n2. **AM Bush** (Saturdays, dirty mas/paint & powder) 🎨\n3. **Phuket** (Friday, ultra-premium all-inclusive) 🍾\n4. **Soaka Street Festival** (Sunday, high-energy rhythm & iron) 🥁\n\n*Pro-tip: Buy tickets early as they sell out fast on committee sites!*",
    food: "Trinidad's street food is world-famous. You must try:\n\n1. **Doubles:** Two baras (flat fried dough) filled with channa (chickpeas). Check out *Sauce Doubles* in Curepe or the Savannah! 🌽\n2. **Bake & Shark:** Crispy fried shark meat in a fried bake. Head to *Maracas Bay* for the original! 🦈\n3. **Corn Soup:** Thick, spicy split pea soup. Best enjoyed hot after a late-night fete near the Savannah. 🥣",
    transport: "Getting around during Carnival:\n\n1. **Rideshare:** Use local rideshare apps like **TT RideShare** or **Travelr**.\n2. **Private Drivers:** For squad groups, pre-book a registered driver for late-night fete returns.\n3. **Red Band Maxi Taxis:** Cheap and routes run along the Eastern Main Road.",
    costumes: "Tribe / Bliss / Lost Tribe costume collection takes place at the Queen's Park Savannah distribution center. Bring your distribution slip, ID, and original credit card."
  },
  jamaica: {
    name: "Jamaica",
    fetes: "Jamaica Carnival has incredible energy! Must-attend events are:\n\n1. **Sunrise Breakfast Party** (A major highlight) 🍳\n2. **Frenchmen** (Ultra-premium event) 🍾\n3. **A.M.B.U.S.H. Jamaica** (J'ouvert) 🎨\n4. **PM Fete** 🍹",
    food: "Jamaica's culinary scene:\n\n1. **Jerk Chicken/Pork:** Spiced and smoked. Best from roadside jerk pan drums in Kingston! 🍗\n2. **Ackee & Saltfish:** Jamaica's national dish, savory and delicious, served with fried dumplings. 🥟\n3. **Devon House Ice Cream:** Grab a scoop of local flavors in Kingston. 🍦",
    transport: "Kingston transport:\n\n1. **Registered Taxis:** Look for official red plate taxis.\n2. **Private Shuttles:** Pre-booking a private driver is recommended.",
    costumes: "Xodus, GenXS, and Yard Mas collections happen at their respective mas camps/distribution sites in Kingston. Bring printed receipt, credit card, and valid ID."
  },
  stlucia: {
    name: "St. Lucia",
    fetes: "St. Lucia Carnival features breathtaking scenic fetes:\n\n1. **Remedy** (Famous beach fete/coolers allowed) 🏖️\n2. **Mess** (Paint, powder J'ouvert) 🎨\n3. **Indulgence** (Scenic breakfast fete) 🍳",
    food: "St. Lucia eats:\n\n1. **Green Fig & Saltfish:** St. Lucia's national dish made with green bananas and salted codfish. 🍌\n2. **Bouillon:** A hearty local stew with meat and provisions. 🍲\n3. **Fresh Seafood:** Head to the Gros Islet Friday Night Street Party! 🐟",
    transport: "Transit tips: Use taxis with green license plates (official tourist transport). Minibuses Castries to Gros Islet are affordable.",
    costumes: "Just 4 Fun, Legends, and Xuvo Mas costume pickup is done at the band houses in Rodney Bay. Bring collection slip, ID, and payment card."
  },
  barbados: {
    name: "Barbados",
    fetes: "Crop Over (Barbados) highlights:\n\n1. **Cohobblopot** (Huge stage show with masquerade) 🎭\n2. **Foreday Morning Jam** (Late-night J'ouvert jump) 🎨\n3. **Lifted / Mimosa** (Premium all-inclusive breakfast fetes) 🍳",
    food: "Barbados local eats:\n\n1. **Flying Fish & Cou-Cou:** The national dish—steamed flying fish in spicy gravy. 🐟\n2. **Fish Cakes:** Spicy, deep-fried saltfish batter. Get them hot from Oistins Fish Fry! 🧆\n3. **Macaroni Pie:** Bajan baked macaroni pie is cheesy and packed with flavor. 🥧",
    transport: "Barbados transport: ZR Vans (Route 11 for South Coast) are fast/cheap. Z-Plate Taxis are official registered taxis.",
    costumes: "Aura, Zulu, Baje International showrooms. Collections happen at showrooms around Bridgetown. Bring Passport, receipt, and payment verification."
  },
  tobago: {
    name: "Tobago",
    fetes: "Tobago Carnival road/beach events:\n\n1. **Wave & Rave Boat Party** (Thursday before parade) ⛵\n2. **Fog Angels J'ouvert** (Paint, mud & powder, Friday morning) 🎨\n3. **Beach to Beach Parade** (Scenic Scarborough to Pigeon Point road march) 🏖️\n4. **Pretty Mas Parade** (Sunday showpiece) 🎭",
    food: "Tobago's food:\n\n1. **Curry Crab & Dumpling:** Signature dish of Tobago! Try Store Bay or Pigeon Point. 🦀\n2. **Benne Balls:** Sesame seeds (benne) and brown sugar crunchy balls. 🧆\n3. **Dirt Oven Bread:** Traditional baking in clay dirt ovens, incredibly soft. 🍞",
    transport: "Transit: Hired taxis starting with H plate. Car rentals are recommended to explore Speyside.",
    costumes: "Fog Angels collection takes place at Chill Out Bar, Bon Accord, Tobago. Bring registration slip, ID, and original credit card."
  }
};

// ----- Webhook: whatsappWebhook (v2) -----
exports.whatsappWebhook = onRequest(
  async (req, res) => {
    console.log("Incoming WhatsApp event:", JSON.stringify(req.body));

    const { event, data } = req.body || {};
    if (event !== "message" || !data) {
      res.sendStatus(200);
      return;
    }

    const senderNumber = data.from; // e.g. "18687726435@c.us"
    const messageText = (data.body || "").trim();

    if (!messageText) {
      res.sendStatus(200);
      return;
    }

    let activeCountry = "trinidad";
    const lowerText = messageText.toLowerCase();

    if (lowerText.includes("jamaica") || lowerText.includes("kingston")) activeCountry = "jamaica";
    else if (lowerText.includes("st lucia") || lowerText.includes("lucia") || lowerText.includes("rodney bay")) activeCountry = "stlucia";
    else if (lowerText.includes("barbados") || lowerText.includes("crop over") || lowerText.includes("kadooment")) activeCountry = "barbados";
    else if (lowerText.includes("tobago") || lowerText.includes("fog angels")) activeCountry = "tobago";

    const config = WHATSAPP_COUNTRY_CONFIGS[activeCountry];
    let replyText = "";

    if (lowerText.includes("fete") || lowerText.includes("party") || lowerText.includes("event") || lowerText.includes("schedule")) {
      replyText = `🎉 *${config.name} Carnival Fetes*:\n\n${config.fetes}`;
    } else if (lowerText.includes("food") || lowerText.includes("eat") || lowerText.includes("doubles") || lowerText.includes("jerk") || lowerText.includes("crab")) {
      replyText = `🍽️ *${config.name} Carnival Food Spots*:\n\n${config.food}`;
    } else if (lowerText.includes("transport") || lowerText.includes("taxi") || lowerText.includes("drive") || lowerText.includes("get around")) {
      replyText = `🚗 *${config.name} Transport Guide*:\n\n${config.transport}`;
    } else if (lowerText.includes("costume") || lowerText.includes("pickup") || lowerText.includes("collection") || lowerText.includes("mas camp")) {
      replyText = `🎭 *${config.name} Costume Pickup Info*:\n\n${config.costumes}`;
    } else {
      replyText = `👋 Hello! I am your AI Carnival Concierge.\n\nAsk me about:\n- *Fetes* (e.g., "tell me about Jamaica fetes")\n- *Food* (e.g., "where to get doubles in Trinidad")\n- *Transport* (e.g., "tips for getting around Barbados")\n- *Costumes* (e.g., "where to pick up Fog Angels costumes in Tobago")`;
    }

    try {
      let openwaUrl = req.query.api_url;
      if (!openwaUrl) {
        const incomingHost = req.headers['x-forwarded-host'] || req.headers.host;
        const proto = req.headers['x-forwarded-proto'] || 'https';
        if (incomingHost && !incomingHost.includes('localhost') && !incomingHost.includes('127.0.0.1')) {
          openwaUrl = `${proto}://${incomingHost}`;
        } else {
          openwaUrl = process.env.OPENWA_API_URL || "http://localhost:8085";
        }
      }
      const openwaKey = req.query.api_key || process.env.OPENWA_API_KEY || "secure_shared_secret";

      const targetFetch = globalThis.fetch;
      await targetFetch(`${openwaUrl}/sendText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openwaKey}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
          to: senderNumber,
          content: replyText
        })
      });
      console.log(`Sent WhatsApp reply to ${senderNumber}`);
    } catch (err) {
      console.error("Error sending reply to WhatsApp via OpenWA:", err.message);
    }

    res.sendStatus(200);
  }
);

// ==========================================
// PHASE 3: AUTOMATED REVENUE ENGINE & PROMOTER MONETIZATION
// ==========================================

// 1. Scheduled Weekly Fete Digest Email (Every Monday at 8:00 AM AST)
exports.scheduledWeeklyFeteDigest = onSchedule(
  {
    schedule: "0 8 * * 1",
    timeZone: "America/Port_of_Spain",
    retryCount: 2,
  },
  async (event) => {
    console.log("[Weekly Digest] Generating weekly fete digest email...");
    
    try {
      // Fetch upcoming scraped events
      const eventsSnap = await defaultDb.collection("carnivalEvents")
        .orderBy("date", "asc")
        .limit(10)
        .get();
        
      if (eventsSnap.empty) {
        console.log("[Weekly Digest] No upcoming events found.");
        return;
      }

      const eventsList = [];
      eventsSnap.forEach((doc) => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });

      // Build HTML email newsletter
      let eventCardsHtml = "";
      eventsList.forEach((evt) => {
        eventCardsHtml += `
          <div style="background:#1e1b4b; border-radius:12px; padding:16px; margin-bottom:16px; border:1px solid #4c1d95;">
            <span style="background:#ec4899; color:white; font-size:11px; font-weight:bold; padding:3px 8px; border-radius:10px; text-transform:uppercase;">${evt.location || 'Caribbean'}</span>
            <h3 style="color:#ffffff; margin:8px 0 4px 0; font-size:18px;">${evt.title || 'Fete Party'}</h3>
            <p style="color:#a78bfa; margin:0 0 8px 0; font-size:14px;">📍 ${evt.venue || 'Venue TBD'} | 📅 ${evt.date || 'TBD'}</p>
            <p style="color:#e2e8f0; margin:0 0 12px 0; font-size:13px;">Tickets from: <strong style="color:#34d399;">${evt.price || 'TBD'}</strong></p>
            <a href="https://carnival-planner.web.app" style="background:#06b6d4; color:white; text-decoration:none; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:bold; display:inline-block;">Get Tickets & Info →</a>
          </div>
        `;
      });

      const emailHtml = `
        <div style="font-family:Arial, sans-serif; background-color:#0f0728; color:#ffffff; padding:24px;">
          <div style="max-width:600px; margin:0 auto; background-color:#130b38; border-radius:16px; padding:24px; border:1px solid #3b0764;">
            <div style="text-align:center; padding-bottom:16px; border-bottom:1px solid #3b0764;">
              <h1 style="color:#ec4899; margin:0; font-size:24px;">🌴 CaribPulse Weekly Fete Digest</h1>
              <p style="color:#94a3b8; font-size:14px; margin-top:4px;">The hottest fetes dropping across the islands this week</p>
            </div>
            
            <div style="margin-top:20px;">
              ${eventCardsHtml}
            </div>

            <!-- Promoter Boost Upsell Banner -->
            <div style="background:linear-gradient(135deg, #f59e0b, #ec4899); border-radius:12px; padding:20px; text-align:center; margin-top:24px; color:#ffffff;">
              <h3 style="margin:0 0 6px 0; font-size:18px;">Are you an Event Promoter? 🎟️</h3>
              <p style="margin:0 0 12px 0; font-size:13px;">Boost your event to thousands of carnival-goers & video shorts!</p>
              <a href="https://carnival-planner.web.app/promoter" style="background:#ffffff; color:#0f172a; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:bold; font-size:14px; display:inline-block;">Boost Event for $49 →</a>
            </div>

            <div style="text-align:center; margin-top:24px; color:#64748b; font-size:12px;">
              <p>Sent by CaribPulse AI — Your Caribbean Event & Travel Engine</p>
              <p><a href="https://carnival-planner.web.app" style="color:#06b6d4;">Open CaribPulse App</a></p>
            </div>
          </div>
        </div>
      `;

      // Dispatch to opted-in users via centralized email service
      const usersSnap = await defaultDb.collection("users").limit(100).get();
      console.log(`[Weekly Digest] Found ${usersSnap.size} user accounts to evaluate for newsletter dispatch.`);

      let sentCount = 0;
      for (const userDoc of usersSnap.docs) {
        const u = userDoc.data();
        if (u.email) {
          try {
            const res = await emailService.sendWeeklyDigestEmail({
              to: u.email,
              emailHtml,
            });
            if (res.success) sentCount++;
          } catch (mailErr) {
            console.error(`[Weekly Digest] Email error for ${u.email}:`, mailErr.message);
          }
        }
      }
      console.log(`[Weekly Digest] Newsletter dispatched to ${sentCount} subscribers.`);
    } catch (err) {
      console.error("[Weekly Digest] Execution failed:", err);
    }
  }
);

// 2. Promoter Boost Stripe Checkout (`createPromoterBoostCheckout`)
exports.createPromoterBoostCheckout = onCall(
  { cors: true },
  async (request) => {
    const { eventId, boostTier } = request.data || {};
    
    if (!eventId) {
      throw new HttpsError("invalid-argument", "eventId is required.");
    }
    
    if (!stripe) {
      throw new HttpsError("failed-precondition", "Stripe is not configured.");
    }

    // Tiers: $49 (Standard Feed Pin) or $149 (Featured Video Short Boost)
    const isVideoBoost = boostTier === "video_short";
    const priceAmount = isVideoBoost ? 14900 : 4900;
    const tierName = isVideoBoost ? "Featured Video Short + Feed Boost" : "Standard Feed Pin (7 Days)";

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `CaribPulse Event Boost: ${tierName}`,
                description: `Boost event ${eventId} across CaribPulse mobile app & video Short compilations.`,
              },
              unit_amount: priceAmount,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: "promoter_boost",
          eventId: eventId,
          boostTier: boostTier || "standard",
        },
        success_url: `https://carnival-planner.web.app?boost_success=true&eventId=${eventId}`,
        cancel_url: `https://carnival-planner.web.app?boost_cancel=true`,
      });

      return { checkoutUrl: session.url, sessionId: session.id };
    } catch (err) {
      console.error("Promoter boost checkout creation failed:", err);
      throw new HttpsError("internal", err.message);
    }
  }
);

// 3. Scheduled Abandoned Checkout Recovery (`scheduledAbandonedCheckoutRecovery`)
exports.scheduledAbandonedCheckoutRecovery = onSchedule(
  {
    schedule: "0 */6 * * *", // Every 6 hours
    retryCount: 1,
  },
  async (event) => {
    console.log("[Abandoned Checkout] Checking for dropped checkouts...");
    try {
      // Find pending checkout sessions older than 2 hours that haven't been recovered
      const twoHoursAgo = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 2 * 60 * 60 * 1000));
      
      const pendingSnap = await defaultDb.collection("pendingCheckouts")
        .where("status", "==", "initiated")
        .where("createdAt", "<=", twoHoursAgo)
        .limit(20)
        .get();

      if (pendingSnap.empty) {
        console.log("[Abandoned Checkout] No pending checkouts to recover.");
        return;
      }

      console.log(`[Abandoned Checkout] Processing ${pendingSnap.size} abandoned sessions.`);
      
      for (const doc of pendingSnap.docs) {
        const item = doc.data();
        if (item.userEmail && item.recoveryUrl) {
          // Send re-engagement email via centralized email service
          await emailService.sendAbandonedCartEmail({
            userEmail: item.userEmail,
            itemName: item.itemName,
            recoveryUrl: item.recoveryUrl,
          });
          // Mark recovered to prevent duplicates
          await doc.ref.update({ status: "recovery_sent", recoveredAt: admin.firestore.FieldValue.serverTimestamp() });
        }
      }
    } catch (err) {
      console.error("[Abandoned Checkout] Error:", err);
    }
  }
);

// 4. Autonomous Blog & SEO Article Generator (`scheduledSeoBlogGenerator`)
// Runs automatically every Wednesday at 4:00 AM AST to publish Google SEO articles
exports.scheduledSeoBlogGenerator = onSchedule(
  {
    schedule: "0 4 * * 3",
    timeZone: "America/Port_of_Spain",
    retryCount: 1,
  },
  async (event) => {
    console.log("[SEO Generator] Generating new Google-optimized carnival travel guide...");
    
    try {
      const islands = ["trinidad", "barbados", "jamaica", "stlucia", "tobago"];
      const targetIsland = islands[Math.floor(Math.random() * islands.length)];
      
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const titleIsland = targetIsland.charAt(0).toUpperCase() + targetIsland.slice(1);
      const slug = `${targetIsland}-carnival-fete-guide-${Date.now()}`;
      
      const articleData = {
        slug: slug,
        island: targetIsland,
        title: `${titleIsland} Carnival 2026: Official Fete Schedule, Ticket Prices & Local Food Guide`,
        metaDescription: `Everything you need to know about ${titleIsland} Carnival 2026. Top fetes, ticket prices, costume pickup tips, and local street food.`,
        publishDate: dateStr,
        author: "CaribPulse AI Travel Engine",
        readTime: "5 min read",
        heroImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
        content: `
          <h2>Welcome to the Official ${titleIsland} Carnival 2026 Guide</h2>
          <p>Planning your trip to ${titleIsland}? CaribPulse AI automatically tracks upcoming fetes, ticket releases, costume distribution schedules, and transport routes to ensure you have an unforgettable carnival experience.</p>
          
          <h3>Top Highlights & What to Expect</h3>
          <ul>
            <li><strong>Fete Tickets:</strong> Popular all-inclusives and boat rides sell out quickly. Buy directly via verified platform links on CaribPulse.</li>
            <li><strong>Costume Pickup:</strong> Always bring your printed receipt, ID, and original credit card to the band house.</li>
            <li><strong>Local Eats:</strong> Don't leave without tasting local authentic street food after late-night fetes.</li>
          </ul>

          <p>Use our AI Concierge on the main page to get custom recommendations, budget breakdowns, and squad planning for ${titleIsland}!</p>
        `,
        schemaJson: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${titleIsland} Carnival 2026: Official Fete Schedule, Ticket Prices & Local Food Guide`,
          "description": `Everything you need to know about ${titleIsland} Carnival 2026.`,
          "author": { "@type": "Organization", "name": "CaribPulse AI" },
          "publisher": { "@type": "Organization", "name": "CaribPulse AI", "url": "https://carnival-planner.web.app" }
        },
        createdAt: FieldValue.serverTimestamp()
      };

      await defaultDb.collection("seoArticles").doc(slug).set(articleData);
      console.log(`[SEO Generator] Published new article for ${titleIsland}: ${slug}`);
    } catch (err) {
      console.error("[SEO Generator] Error publishing article:", err);
    }
  }
);

// ==========================================
// 24/7 DATABASE HYGIENE & QUOTA PURGE BOT
// ==========================================
exports.scheduledDatabaseHygiene = onSchedule(
  {
    schedule: "0 4 * * *", // Every day at 4:00 AM AST
    timeZone: "America/Port_of_Spain",
    retryCount: 2,
  },
  async (event) => {
    console.log("[Database Hygiene Bot] Starting automated database purge & quota cleanup...");
    let prunedCooldowns = 0;
    let prunedQuests = 0;

    try {
      // 1. Purge old safety alert cooldown records (> 7 days old)
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const cooldownsSnap = await squadDb.collection("safetyCooldowns").get();
      const batch1 = squadDb.batch();
      let batch1Count = 0;

      cooldownsSnap.forEach((doc) => {
        const data = doc.data();
        const lastAlertAt = data.lastAlertAt?.toMillis?.() || data.lastAlertAt || 0;
        if (lastAlertAt < sevenDaysAgo) {
          batch1.delete(doc.ref);
          batch1Count++;
          prunedCooldowns++;
        }
      });

      if (batch1Count > 0) {
        await batch1.commit();
      }

      // 2. Deactivate expired Flash Quests
      const now = new Date();
      const expiredQuestsSnap = await defaultDb.collection("flashQuests")
        .where("active", "==", true)
        .where("expiresAt", "<", now)
        .get();

      if (!expiredQuestsSnap.empty) {
        const batch2 = defaultDb.batch();
        expiredQuestsSnap.forEach((doc) => {
          batch2.update(doc.ref, { active: false, status: "expired" });
          prunedQuests++;
        });
        await batch2.commit();
      }

      console.log(`[Database Hygiene Bot] Cleanup complete: Pruned ${prunedCooldowns} old safety records, deactivated ${prunedQuests} expired quests.`);
    } catch (err) {
      console.error("[Database Hygiene Bot] Error executing database cleanup:", err);
    }
  }
);



// ==========================================
// 24/7 MARKETPLACE PRICE TAPER BOT (DUTCH AUCTION)
// ==========================================
exports.scheduledMarketplacePriceTaper = onSchedule(
  {
    schedule: "0 3 * * *", // Every day at 3:00 AM AST
    timeZone: "America/Port_of_Spain",
    retryCount: 1,
  },
  async (event) => {
    console.log("[Price Taper Bot] Running automated marketplace price tapering...");
    let discountedCount = 0;

    try {
      const snap = await defaultDb.collection("marketplaceListings")
        .where("status", "==", "active")
        .where("autoPriceTaper", "==", true)
        .get();

      if (snap.empty) {
        console.log("[Price Taper Bot] No listings opted into auto-price tapering.");
        return;
      }

      const batch = defaultDb.batch();

      snap.forEach((doc) => {
        const item = doc.data();
        const currentPrice = Number(item.price) || 0;
        const floorPrice = Number(item.floorPrice) || Math.round(currentPrice * 0.6);
        const taperPercent = Number(item.taperPercent) || 0.05; // 5% daily discount

        if (currentPrice > floorPrice) {
          const discountAmount = Math.max(1, Math.round(currentPrice * taperPercent));
          const newPrice = Math.max(floorPrice, currentPrice - discountAmount);

          if (newPrice < currentPrice) {
            batch.update(doc.ref, {
              price: newPrice,
              originalPrice: item.originalPrice || currentPrice,
              priceDropActive: true,
              lastPriceDropAt: FieldValue.serverTimestamp(),
              updatedAt: FieldValue.serverTimestamp(),
              priceDropHistory: FieldValue.arrayUnion({
                date: new Date().toISOString(),
                oldPrice: currentPrice,
                newPrice: newPrice,
                discountPercent: Math.round(((item.originalPrice || currentPrice) - newPrice) / (item.originalPrice || currentPrice) * 100),
              })
            });
            discountedCount++;
            console.log(`[Price Taper Bot] Listing ${doc.id} discounted: $${currentPrice} -> $${newPrice} (Floor: $${floorPrice})`);
          }
        }
      });

      if (discountedCount > 0) {
        await batch.commit();
      }

      console.log(`[Price Taper Bot] Finished: Tapered prices for ${discountedCount} listings.`);
    } catch (err) {
      console.error("[Price Taper Bot] Error during price tapering execution:", err);
    }
  }
);

// ==========================================
// 1-CLICK AI SMART ITINERARY AUTO-PILOT
// ==========================================
exports.generateSmartItinerary = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const {
      destination = "Trinidad & Tobago",
      carnivalId = "trinidad",
      startDate,
      endDate,
      pace = "balanced",
      budget = "moderate"
    } = request.data || {};

    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
    const dayCount = Math.max(3, Math.min(10, Math.round((end - start) / (24 * 60 * 60 * 1000)) + 1));

    console.log(`[Smart Itinerary] Generating ${dayCount}-day itinerary for ${destination} (${pace} pace)...`);

    const formatDate = (d) => d.toISOString().split("T")[0];
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Attempt AI-Powered generation if Gemini is configured
    if (geminiKey) {
      try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `You are the Master Carnival Itinerary AI Planner. Generate an optimal, conflict-free ${dayCount}-day itinerary for ${destination} (${carnivalId} carnival).
Travel dates: ${formatDate(start)} to ${formatDate(end)}.
Pace: ${pace}. Budget tier: ${budget}.

CRITICAL RULES:
1. Schedule MUST account for essential carnival milestones: Arrival, Costume Pickup at Mas Camp, Cooler Fete, Premium All-Inclusive Fete, J'ouvert (early morning 3 AM - 8 AM), Carnival Monday (Road March), Carnival Tuesday (Pretty Mas on de stage), and Cool-Down Lime.
2. Ensure rest/hydration windows between late-night and breakfast fetes (do not schedule back-to-back without rest).
3. Return STRICTLY a valid JSON array of objects without markdown backticks.

Each object in the array must follow this schema:
{
  "title": "Event or Activity Title (e.g. Lost Tribe Costume Collection, Soca Brainwash, J'ouvert Morning, Road March)",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "category": "Fete" | "Costume" | "Rest" | "Travel" | "Parade",
  "priority": "essential" | "recommended" | "optional",
  "venue": "Venue name or location",
  "note": "Concise pro-tip (clothing, hydration, arrival advice)"
}`;

        const result = await model.generateContent(prompt);
        let rawText = result.response.text().trim();
        if (rawText.startsWith('```json')) rawText = rawText.replace(/^```json/, '').replace(/```$/, '').trim();
        else if (rawText.startsWith('```')) rawText = rawText.replace(/^```/, '').replace(/```$/, '').trim();

        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            success: true,
            source: "ai_optimized",
            itinerary: parsed.map((item, idx) => ({
              id: `auto-${Date.now()}-${idx}`,
              ...item,
              isAutoPilot: true,
              isCustom: false,
            }))
          };
        }
      } catch (aiErr) {
        console.warn("[Smart Itinerary] Gemini generation failed, falling back to heuristic template:", aiErr.message);
      }
    }

    // 2. Intelligent Heuristic Rule-Based Fallback
    const dates = [];
    for (let i = 0; i < dayCount; i++) {
      const cur = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(formatDate(cur));
    }

    const templateItems = [
      {
        dayOffset: 0,
        time: "14:00",
        title: `Arrival in ${destination} & Check-in`,
        category: "Travel",
        priority: "essential",
        venue: "Airport / Accommodation",
        note: "Settle into stay, purchase local SIM/eSIM and hydrate."
      },
      {
        dayOffset: 0,
        time: "17:00",
        title: "Costume Camp Collection Window",
        category: "Costume",
        priority: "essential",
        venue: "Band Mas Camp / Distribution Center",
        note: "Bring photo ID, distribution slip, and original credit card for size fitting."
      },
      {
        dayOffset: 1,
        time: "07:00",
        title: "Sunrise Breakfast Fete",
        category: "Fete",
        priority: "essential",
        venue: "Scenic Coastal Venue / Park",
        note: "Wear chic shades, linen or bright pastels. Eat breakfast early!"
      },
      {
        dayOffset: 1,
        time: "14:00",
        title: "Afternoon Rest & Squad Recharge",
        category: "Rest",
        priority: "recommended",
        venue: "Accommodation",
        note: "Mandatory 3-hour rest window to pace your energy."
      },
      {
        dayOffset: 1,
        time: "20:00",
        title: "Sunset Cooler Fete",
        category: "Fete",
        priority: "recommended",
        venue: "Outdoor Festival Grounds",
        note: "Pack cooler with plastic bottles and ice before 6 PM."
      },
      {
        dayOffset: 2,
        time: "16:00",
        title: "Ultra-Premium All-Inclusive Fete",
        category: "Fete",
        priority: "essential",
        venue: "Estate Grounds",
        note: "High fashion fete wear. Gourmet food and top-shelf drinks provided."
      },
      {
        dayOffset: 3,
        time: "03:30",
        title: "Official J'ouvert Morning (Mud, Paint & Oil)",
        category: "Parade",
        priority: "essential",
        venue: "City Streets",
        note: "Wear old clothes and cover phone in waterproof pouch. Pure bacchanal!"
      },
      {
        dayOffset: 3,
        time: "10:00",
        title: "J'ouvert Scrub-Off & Rest Window",
        category: "Rest",
        priority: "essential",
        venue: "Accommodation",
        note: "Baby oil helps remove paint and mud. Sleep until afternoon."
      },
      {
        dayOffset: 4,
        time: "09:00",
        title: "Carnival Monday Road March (Wear Monday Wear)",
        category: "Parade",
        priority: "essential",
        venue: "Parade Route",
        note: "Custom Monday wear swimsuit or stylish shorts. Follow your music truck."
      },
      {
        dayOffset: 5,
        time: "08:00",
        title: "Carnival Tuesday — Full Costume Pretty Mas On Stage",
        category: "Parade",
        priority: "essential",
        venue: "Grand Stand / Judging Stage",
        note: "Full feather backpack and headpiece. This is the main event!"
      },
      {
        dayOffset: Math.min(dayCount - 1, 6),
        time: "12:00",
        title: "Post-Carnival Beach Cool-Down & Departure",
        category: "Travel",
        priority: "recommended",
        venue: "Beach / Airport",
        note: "Bake & shark by the sea or airport departure transfer."
      }
    ];

    const generatedItinerary = templateItems
      .filter(item => item.dayOffset < dates.length)
      .map((item, idx) => ({
        id: `auto-${Date.now()}-${idx}`,
        title: item.title,
        date: dates[item.dayOffset],
        time: item.time,
        category: item.category,
        priority: item.priority,
        venue: item.venue,
        note: item.note,
        isAutoPilot: true,
        isCustom: false
      }));

    return {
      success: true,
      source: "heuristic_template",
      itinerary: generatedItinerary
    };
  }
);

const { createBandDepositCheckout, handleBandCheckoutWebhook, createBalancePaymentCheckout } = require('./bandCheckout');
const { sendPaymentReminders } = require('./paymentReminders');
exports.createBandDepositCheckout = createBandDepositCheckout;
exports.handleBandCheckoutWebhook = handleBandCheckoutWebhook;
exports.createBalancePaymentCheckout = createBalancePaymentCheckout;
exports.sendPaymentReminders = sendPaymentReminders;
