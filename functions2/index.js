// Cloud Functions entry point for Caribbean Carnival Planner.

const functions = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
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

// ----- Callable: createCheckoutSession (v2) -----
exports.createCheckoutSession = onCall(
  { cors: true, invoker: "public" },
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

    if (tokens.length === 0) {
      return { success: true, notified: 0, message: 'No squad members with notifications enabled.' };
    }

    // Send push notifications
    const displayName = userName || 'A squad member';
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
      console.log(`Road Ready notifications sent: ${response.successCount} success, ${response.failureCount} failed`);

      return {
        success: true,
        notified: response.successCount,
        message: `Notified ${response.successCount} squad member(s)!`
      };
    } catch (err) {
      console.error('Error sending Road Ready notifications:', err);
      throw new HttpsError('internal', 'Failed to send notifications.');
    }
  }
);

// ----- Callable: sendSafetyAlert (Wearable Safety Check) -----
exports.sendSafetyAlert = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    const {
      carnivalId,
      userName,
      heartRate,
      duration
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

    // Cooldown check: max 1 alert per 15 minutes per user
    const cooldownRef = squadDb.doc(`safetyCooldowns/${uid}`);
    const cooldownDoc = await cooldownRef.get();
    if (cooldownDoc.exists) {
      const lastAlert = cooldownDoc.data()?.lastAlertAt?.toMillis?.() || cooldownDoc.data()?.lastAlertAt || 0;
      const fifteenMinMs = 15 * 60 * 1000;
      if (Date.now() - lastAlert < fifteenMinMs) {
        return { success: true, notified: 0, message: 'Alert cooldown active. Try again later.' };
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

    if (squadMemberUids.size === 0) {
      return { success: true, notified: 0, message: 'No squad members to notify.' };
    }

    // Get FCM tokens
    const fcmTokensRef = squadDb.collection('fcmTokens');
    const tokens = [];

    for (const memberUid of squadMemberUids) {
      const tokenDoc = await fcmTokensRef.doc(memberUid).get();
      if (tokenDoc.exists && tokenDoc.data()?.token) {
        tokens.push(tokenDoc.data().token);
      }
    }

    if (tokens.length === 0) {
      return { success: true, notified: 0, message: 'No squad members with notifications enabled.' };
    }

    // Send HIGH priority safety alert
    const displayName = userName || 'A squad member';
    const hrText = heartRate ? ` (${heartRate} bpm for ${duration || '?'} min)` : '';
    const message = {
      notification: {
        title: `⚠️ Check on ${displayName}!`,
        body: `Elevated heart rate detected${hrText}. Make sure they're OK!`
      },
      data: {
        type: 'safety_alert',
        senderUid: uid,
        heartRate: String(heartRate || ''),
        duration: String(duration || '')
      },
      android: { priority: 'high' },
      apns: { headers: { 'apns-priority': '10' } },
      tokens
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(`Safety alert sent: ${response.successCount} success, ${response.failureCount} failed`);

      // Set cooldown
      await cooldownRef.set({ lastAlertAt: Date.now() });

      return {
        success: true,
        notified: response.successCount,
        message: `Safety alert sent to ${response.successCount} squad member(s).`
      };
    } catch (err) {
      console.error('Error sending safety alert:', err);
      throw new HttpsError('internal', 'Failed to send safety alert.');
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

    const { title, date, time, location, capacity, type } = request.data;
    const uid = request.auth.uid;

    if (!title || !date) {
      throw new HttpsError('invalid-argument', 'Title and Date are required.');
    }

    // 1. Check Promoter Status & Limits
    const promoterProfileRef = squadDb.collection('promoterProfiles').doc(uid);
    const promoterDoc = await promoterProfileRef.get();

    let isPro = false;
    if (promoterDoc.exists) {
      isPro = promoterDoc.data().isPro || false;
    } else {
      // Auto-create basic profile
      await promoterProfileRef.set({ isPro: false, createdAt: new Date() });
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
    // Simple logic: FETE-XXXX (random 4 chars)
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const accessCode = `FETE-${randomSuffix}`;

    // 3. Create Event
    const eventData = {
      title,
      date: new Date(`${date}T${time || '12:00'}`),
      location,
      capacity: parseInt(capacity) || 0,
      eventType: type || 'fete',
      accessCode,
      creatorId: uid,
      isActive: true,
      totalCheckins: 0,
      createdAt: new Date(),
      countryCode: 'XX', // Default, logic to infer from location needed later
      carnivalCircuit: 'custom',
      isFlagship: false
    };

    const docRef = await squadDb.collection('passportEvents').add(eventData);

    return {
      success: true,
      eventId: docRef.id,
      accessCode
    };
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

    // 1. Get Promoter Profile (for Pro status)
    const promoterDoc = await squadDb.collection('promoterProfiles').doc(uid).get();
    const isPro = promoterDoc.exists ? promoterDoc.data().isPro : false;

    // 2. Get Events
    const eventsQuery = await squadDb.collection('passportEvents')
      .where('creatorId', '==', uid)
      .orderBy('date', 'desc')
      .get();

    const events = [];
    let totalCheckins = 0;
    let activeEvents = 0;

    // Calculate Today's Checkins
    // Note: Ideally checkins collection query for today, but for efficiency we'll just sum totals here for now
    // Or we could do a separate query if needed. 
    // Let's stick to event-level aggregates for MVP speed.

    eventsQuery.forEach(doc => {
      const data = doc.data();
      events.push({
        id: doc.id,
        title: data.title,
        date: data.date.toDate().toISOString(),
        checkins: data.totalCheckins || 0,
        capacity: data.capacity,
        status: data.isActive ? 'active' : 'past',
        accessCode: data.accessCode
      });

      totalCheckins += (data.totalCheckins || 0);
      if (data.isActive) activeEvents++;
    });

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

    const rewardsQuery = await squadDb.collection('promoterRewards')
      .where('promoterId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const rewards = [];
    rewardsQuery.forEach(doc => {
      rewards.push({ id: doc.id, ...doc.data() });
    });

    return { rewards };
  }
);

// ----- Get Available Rewards (User View) -----
exports.getAvailableRewards = onCall(
  { cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    // 1. Get all active rewards
    const rewardsQuery = await squadDb.collection('promoterRewards')
      .where('active', '==', true)
      .orderBy('cost', 'asc')
      .get();

    const rewards = [];
    rewardsQuery.forEach(doc => {
      const data = doc.data();
      // Only include if quantity is null (unlimited) or > 0
      if (data.quantity === null || data.quantity > 0) {
        rewards.push({ id: doc.id, ...data });
      }
    });

    return { rewards };
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
  { cors: true, invoker: "public" },
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

      // 3. Calculate fees
      const priceInCents = Math.round(listing.price * 100);
      const platformFee = Math.round(priceInCents * 0.10); // 10% platform fee

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
            unit_amount: priceInCents,
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
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.log("Gmail credentials not configured — skipping order emails.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  const itemEmoji = orderData.category === 'ticket' ? '🎫' : '👗';
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: (orderData.currency || 'usd').toUpperCase() }).format(orderData.amount);

  const emailStyle = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;background:#111827;color:#fff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:24px 24px 16px;">
        <h1 style="margin:0;font-size:20px;font-weight:800;">🎭 Caribbean Carnival Planner</h1>
        <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Marketplace</p>
      </div>
      <div style="padding:24px;">
        %%CONTENT%%
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #374151;text-align:center;">
          <p style="font-size:11px;color:#6b7280;margin:0;">Caribbean Carnival Planner &bull; carnival-planner.com</p>
        </div>
      </div>
    </div>
  `;

  // --- Buyer confirmation email ---
  if (orderData.buyerEmail) {
    const buyerContent = `
      <h2 style="margin:0 0 8px;font-size:18px;">Order Confirmed! ✅</h2>
      <p style="color:#9ca3af;font-size:14px;margin:0 0 16px;">Your purchase was successful.</p>
      <div style="background:#1f2937;border-radius:12px;padding:16px;margin-bottom:16px;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;">${itemEmoji} ${orderData.listingTitle}</p>
        ${orderData.carnival ? `<p style="margin:0 0 4px;font-size:12px;color:#a78bfa;">${orderData.carnival}</p>` : ''}
        <p style="margin:8px 0 0;font-size:20px;font-weight:900;color:#34d399;">${formattedPrice}</p>
      </div>
      <p style="color:#9ca3af;font-size:13px;margin:0;">The seller has been notified. They will contact you to arrange delivery/pickup.</p>
    `;

    try {
      await transporter.sendMail({
        from: `"Caribbean Carnival Planner" <${gmailUser}>`,
        to: orderData.buyerEmail,
        subject: `${itemEmoji} Order Confirmed — ${orderData.listingTitle}`,
        html: emailStyle.replace('%%CONTENT%%', buyerContent),
      });
      console.log(`Marketplace email sent to buyer: ${orderData.buyerEmail}`);
    } catch (err) {
      console.error('Failed to send buyer email:', err.message);
    }
  }

  // --- Seller notification email ---
  if (sellerEmail) {
    const sellerPayout = new Intl.NumberFormat('en-US', { style: 'currency', currency: (orderData.currency || 'usd').toUpperCase() }).format(orderData.sellerPayout || orderData.amount);

    const sellerContent = `
      <h2 style="margin:0 0 8px;font-size:18px;">You Made a Sale! 🎉</h2>
      <p style="color:#9ca3af;font-size:14px;margin:0 0 16px;">Your listing has been purchased.</p>
      <div style="background:#1f2937;border-radius:12px;padding:16px;margin-bottom:16px;">
        <p style="margin:0 0 4px;font-size:16px;font-weight:700;">${itemEmoji} ${orderData.listingTitle}</p>
        ${orderData.carnival ? `<p style="margin:0 0 4px;font-size:12px;color:#a78bfa;">${orderData.carnival}</p>` : ''}
        <p style="margin:8px 0 0;font-size:14px;color:#9ca3af;">Sale price: ${formattedPrice}</p>
        <p style="margin:4px 0 0;font-size:20px;font-weight:900;color:#34d399;">Your payout: ${sellerPayout}</p>
      </div>
      <p style="color:#9ca3af;font-size:13px;margin:0;">Buyer email: <strong style="color:#a78bfa;">${orderData.buyerEmail || 'Not provided'}</strong></p>
      <p style="color:#6b7280;font-size:12px;margin:8px 0 0;">Please coordinate with the buyer for delivery/pickup. Payouts are handled via your Stripe Connect account.</p>
    `;

    try {
      await transporter.sendMail({
        from: `"Caribbean Carnival Planner" <${gmailUser}>`,
        to: sellerEmail,
        subject: `🎉 You Made a Sale — ${orderData.listingTitle}`,
        html: emailStyle.replace('%%CONTENT%%', sellerContent),
      });
      console.log(`Marketplace email sent to seller: ${sellerEmail}`);
    } catch (err) {
      console.error('Failed to send seller email:', err.message);
    }
  }
}

// ----- Webhook: handleMarketplaceWebhook -----
// Listens for Stripe Connect events and updates Firestore accordingly
exports.handleMarketplaceWebhook = functions.https.onRequest(
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

          // Only process marketplace purchases
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

// Contract ABI — only the functions we call server-side
const PASSPORT_CONTRACT_ABI = [
  'function mintStamp(address to, uint256 tokenId, bytes data) external',
  'function mintAchievement(address to, uint256 tokenId) external',
  'function hasMinted(uint256 tokenId, address user) view returns (bool)'
];

// Achievement ID → Token ID mapping (1000+)
const ACHIEVEMENT_TOKEN_IDS = {
  first_stamp: 1000,
  loyal_fan: 1001,
  carnival_veteran: 1002,
  island_hopper: 1003,
  globe_trotter: 1004,
  sunrise_warrior: 1005,
  tier_up: 1006
};

/**
 * Get ethers wallet + contract for minting.
 * Reads config from environment variables.
 */
function getMintingContract() {
  const privateKey = process.env.WEB3_PRIVATE_KEY;
  const contractAddress = process.env.WEB3_CONTRACT_ADDRESS;
  const rpcUrl = process.env.WEB3_RPC_URL || 'https://mainnet.base.org';

  if (!privateKey || !contractAddress) {
    throw new HttpsError(
      'failed-precondition',
      'Web3 minting is not configured. Contract address or private key missing.'
    );
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, PASSPORT_CONTRACT_ABI, wallet);

  return { provider, wallet, contract };
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

    // 1. Get user profile — check wallet
    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      throw new HttpsError('not-found', 'Passport profile not found.');
    }

    const profile = profileDoc.data();
    const walletAddress = profile.walletAddress;

    if (!walletAddress) {
      throw new HttpsError(
        'failed-precondition',
        'No wallet connected. Please connect a wallet in your profile first.'
      );
    }

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

    // 4. Generate a unique token ID from the event
    // Use the event's hash to generate a deterministic token ID in the 1-999 range
    const eventHash = ethers.id(stamp.eventId);
    const tokenId = (Number(BigInt(eventHash) % 999n) + 1);

    // 5. Mint on-chain
    try {
      const { contract } = getMintingContract();

      // Encode stamp metadata as bytes
      const mintData = ethers.toUtf8Bytes(JSON.stringify({
        eventTitle: stamp.eventTitle,
        rarity: stamp.rarity,
        edition: stamp.editionNumber,
        checkedInAt: stamp.stampedAt?.toDate?.()?.toISOString() || new Date().toISOString()
      }));

      const tx = await contract.mintStamp(walletAddress, tokenId, mintData);
      console.log(`Minting stamp tokenId=${tokenId} to ${walletAddress}, tx=${tx.hash}`);

      // Wait for confirmation
      const receipt = await tx.wait(1);

      // 6. Save mint info back to Firestore
      await stampRef.update({
        mintedTxHash: tx.hash,
        mintedTokenId: tokenId,
        mintedAt: new Date(),
        mintedBlockNumber: receipt.blockNumber,
        walletAddress: walletAddress
      });

      // Update profile mint count
      await profileRef.update({
        mintedStampCount: FieldValue.increment(1),
        lastMintAt: new Date()
      });

      return {
        success: true,
        alreadyMinted: false,
        txHash: tx.hash,
        tokenId,
        blockNumber: receipt.blockNumber,
        explorerUrl: `https://basescan.org/tx/${tx.hash}`
      };
    } catch (error) {
      console.error('Mint stamp error:', error);

      if (error.reason?.includes('Already minted')) {
        // Already minted on-chain but not recorded in Firestore
        throw new HttpsError('already-exists', 'This stamp has already been minted on-chain.');
      }

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
    if (!PASSPORT_ACHIEVEMENTS[achievementId]) {
      throw new HttpsError('not-found', 'Unknown achievement.');
    }

    const tokenId = ACHIEVEMENT_TOKEN_IDS[achievementId];
    if (!tokenId) {
      throw new HttpsError('not-found', 'This achievement cannot be minted yet.');
    }

    // 1. Get user profile
    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      throw new HttpsError('not-found', 'Passport profile not found.');
    }

    const profile = profileDoc.data();
    const walletAddress = profile.walletAddress;

    if (!walletAddress) {
      throw new HttpsError(
        'failed-precondition',
        'No wallet connected. Please connect a wallet in your profile first.'
      );
    }

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
        achievementId,
        tokenId
      };
    }

    // 4. Mint on-chain
    try {
      const { contract } = getMintingContract();

      const tx = await contract.mintAchievement(walletAddress, tokenId);
      console.log(`Minting achievement ${achievementId} (tokenId=${tokenId}) to ${walletAddress}, tx=${tx.hash}`);

      const receipt = await tx.wait(1);

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
        tokenId,
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        explorerUrl: `https://basescan.org/tx/${tx.hash}`
      };
    } catch (error) {
      console.error('Mint achievement error:', error);

      if (error.reason?.includes('Already minted')) {
        // Already minted on-chain — record in Firestore
        await profileRef.update({
          mintedAchievements: FieldValue.arrayUnion(achievementId)
        });
        throw new HttpsError('already-exists', 'This achievement has already been minted on-chain.');
      }

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

    // Check if user already has a wallet
    const profileRef = admin.firestore().doc(`passportProfiles/${uid}`);
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
      walletCreatedAt: admin.firestore.FieldValue.serverTimestamp(),
      walletEmail: email,
    };

    // Store encrypted key in a separate secure subcollection
    await admin.firestore().doc(`walletKeys/${uid}`).set({
      encryptedKey: encryptedKey,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Update the user's passport profile
    await profileRef.set(walletData, { merge: true });

    // Also update the squad-db path if it exists
    try {
      await admin.firestore().doc(`squad-db/passportProfiles/${uid}`).set(walletData, { merge: true });
    } catch (e) {
      // Ignore if this path doesn't exist
    }

    console.log(`[Wallet] Generated embedded wallet for ${uid}: ${wallet.address}`);

    return {
      walletAddress: wallet.address,
      walletType: 'embedded',
      isNew: true
    };
  }
);
