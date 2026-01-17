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
    const sharedPlansRef = squadDb.collection('sharedPlans');
    const snapshot = await sharedPlansRef.get();

    const squadMemberUids = new Set();
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.carnivalId === carnivalId) {
        const isMember = data.members?.some(m => m.uid === uid);
        if (isMember) {
          data.members.forEach(m => {
            if (m.uid !== uid) {
              squadMemberUids.add(m.uid);
            }
          });
        }
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

      // 2. Delete the app document users/{uid}/apps/{APP_ID}
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

      // 6. Remove user from any shared plans
      const sharedPlansRef = squadDb.collection('sharedPlans');
      const plansSnapshot = await sharedPlansRef.get();
      const planUpdates = [];

      plansSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.members?.some(m => m.uid === uid)) {
          const updatedMembers = data.members.filter(m => m.uid !== uid);
          planUpdates.push(doc.ref.update({ members: updatedMembers }));
        }
        if (data.ownerUid === uid) {
          planUpdates.push(doc.ref.delete());
        }
      });
      await Promise.all(planUpdates);
      console.log('Removed user from shared plans');

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
