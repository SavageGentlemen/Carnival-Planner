// Cloud Functions entry point for Carnival Planner premium subscriptions.

const functions = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const Stripe = require("stripe");

const app = admin.initializeApp();

const APP_ID = "carnival-planner-v1";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;
const stripeAccountId = process.env.STRIPE_ACCOUNT_ID || null;

let stripe = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
  });
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
      cancel_url
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
  island_hopper: {
    id: 'island_hopper',
    name: 'Island Hopper',
    description: 'Check in at 3 different countries',
    icon: '🌊',
    category: 'TRAVEL',
    points: 500,
    criteria: { type: 'COUNTRY_COUNT', target: 3 }
  },
  sunrise_warrior: {
    id: 'sunrise_warrior',
    name: 'Sunrise Warrior',
    description: 'Check in at 5 J\'ouvert or early morning events',
    icon: '🌅',
    category: 'EVENTS',
    points: 300,
    criteria: { type: 'EVENT_TYPE', target: 5, eventTypes: ['jouvert', 'breakfast', 'early_morning'] }
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
  tier_up: {
    id: 'tier_up',
    name: 'Moving Up',
    description: 'Reach Silver tier',
    icon: '📈',
    category: 'MILESTONE',
    points: 200,
    criteria: { type: 'TIER_REACHED', target: 'SILVER' }
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
        unlocked = profile.currentTier === criteria.target ||
          (criteria.target === 'SILVER' && ['SILVER', 'GOLD', 'PLATINUM'].includes(profile.currentTier)) ||
          (criteria.target === 'GOLD' && ['GOLD', 'PLATINUM'].includes(profile.currentTier));
        break;
      case 'EVENT_TYPE':
        // Count events of specific types
        const typeCount = (profile.eventTypeStats || {})[criteria.eventTypes[0]] || 0;
        unlocked = typeCount >= criteria.target;
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
    if (!request.auth || !request.auth.uid) {
      throw new HttpsError('unauthenticated', 'Must be signed in.');
    }

    const uid = request.auth.uid;
    const profileRef = squadDb.doc(`passportProfiles/${uid}`);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      // Auto-initialize if doesn't exist
      const initResult = await exports.initializePassport.run({ auth: request.auth }, null);
      return initResult.profile;
    }

    const profile = profileDoc.data();

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

    return {
      ...profile,
      tierProgress: {
        nextTier,
        creditsToNextTier: Math.max(0, creditsToNextTier),
        progressPercent: Math.min(100, Math.max(0, progressPercent))
      },
      achievementDefinitions: PASSPORT_ACHIEVEMENTS
    };
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
