require('dotenv').config({ path: '../.env' });
const admin = require('firebase-admin');
const { sendMail, wrapInBrandedTemplate } = require('../emailService');

// Initialize Firebase Admin (Uses environment credentials, or default if on GCP)
if (!admin.apps.length) {
    admin.initializeApp();
}

// IMPORTANT: Define the Reward here before executing the blast
const REWARD = "$250 Carnival Uber Credit"; 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getEmailPayload = (firstName) => {
    return `Hey ${firstName},

Right now, you are building your Carnival itinerary on the grid. But if you are still trying to coordinate flights, Airbnbs, and fete tickets with your friends inside a chaotic WhatsApp group chat, you are going to lose money and miss out on tickets.

Carnival is a multiplayer experience. Your planning should be too.

We just unlocked the Multiplayer Itinerary feature on your dashboard, and we are initiating the Squad Promo to celebrate.

The Promo:
Stop sending screenshots. Invite your crew directly into your Carnival Planner dashboard so everyone can sync flights, vote on fetes, and split costs in one place.

If you invite 4 friends to join your shared itinerary link before Friday at midnight, your entire squad is instantly entered to win ${REWARD}.

Your Action Step:

1. Log into your terminal here: https://carnival-planner.com/dashboard
2. Hit the "Invite Squad" button on your itinerary.
3. Drop the link in your group chat.
4. The moment the 4th friend connects to your board, your squad is locked in for the promo.

Secure your route. We’ll see you on the road.

- The CP Team
Carnival-Planner.com`;
};

const getEmailHtml = (firstName) => {
    const rawContent = `
        <h2 style="color:#fff;margin-top:0;font-size:18px;">The group chat is killing your Carnival plans.</h2>
        <p style="color:#d1d5db;line-height:1.6;">Hey <strong>${firstName}</strong>,</p>
        <p style="color:#d1d5db;line-height:1.6;">Right now, you are building your Carnival itinerary. But coordinating flights, Airbnbs, and fete tickets inside a chaotic WhatsApp group chat leads to missed drops and lost money.</p>
        <p style="color:#d1d5db;line-height:1.6;">Carnival is a multiplayer experience. Your planning should be too.</p>
        <div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:16px;margin:20px 0;">
            <h3 style="color:#ec4899;margin-top:0;font-size:16px;">🔥 The Squad Promo</h3>
            <p style="color:#e5e7eb;margin:0;font-size:14px;line-height:1.5;">Invite 4 friends to join your shared itinerary link before Friday at midnight, and your squad is entered to win <strong style="color:#34d399;">${REWARD}</strong>.</p>
        </div>
        <div style="text-align:center;margin:24px 0;">
            <a href="https://carnival-planner.com/dashboard" style="background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Open Multiplayer Itinerary →</a>
        </div>
        <p style="color:#9ca3af;font-size:13px;line-height:1.5;">Drop your squad link in the group chat. The moment the 4th friend connects, your squad is locked in for the promo.</p>
    `;
    return wrapInBrandedTemplate("Squad Promo", "Multiplayer Itinerary", rawContent);
};

async function broadcastPromo() {
    console.log("=== SYSTEM STATUS: PSYCHOLOGICAL CONVERSION ENGINE ===");
    console.log("Starting Squad Promo Broadcast Extraction...\n");
    
    let users = [];
    try {
        // Data Extraction: Pulling all registered users
        let listUsersResult = await admin.auth().listUsers(1000);
        users.push(...listUsersResult.users);
        while (listUsersResult.pageToken) {
            listUsersResult = await admin.auth().listUsers(1000, listUsersResult.pageToken);
            users.push(...listUsersResult.users);
        }
    } catch (error) {
        console.warn("Could not extract users from Firebase Auth directly:", error.message);
        console.log("Falling back to Firestore user database if available...");
        try {
            const snap = await admin.firestore().collection('users').get();
            users = snap.docs.map(d => ({ email: d.data().email, displayName: d.data().displayName || d.data().name }));
        } catch (dbErr) {
            console.error("Firestore user fetch failed:", dbErr.message);
            users = [];
        }
    }

    // Filter out users without emails
    users = users.filter(usr => usr.email && usr.email.includes('@'));

    console.log(`[DATA EXTRACTION COMPLETE] Found ${users.length} active users with email addresses. \nInitiating Send Protocol...`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Carnival Planner';
        const payloadText = getEmailPayload(firstName);
        const payloadHtml = getEmailHtml(firstName);

        const result = await sendMail({
            to: user.email,
            subject: 'The group chat is killing your Carnival plans. (Squad Promo inside)',
            text: payloadText,
            html: payloadHtml,
        });

        if (result.success) {
            successCount++;
            console.log(`[SUCCESS] Email dispatched to ${user.email} (${i+1}/${users.length})`);
        } else {
            failCount++;
            console.error(`[BOUNCED/SKIPPED] Failed for ${user.email}:`, result.error || result.reason);
        }

        // Throttling (Anti-Spam Measure): only throttle if not mock mode
        if (!result.mock && i < users.length - 1) {
            const throttleMs = Math.floor(Math.random() * (90000 - 45000 + 1)) + 45000;
            console.log(`[THROTTLING] Anti-spam delay: ${(throttleMs / 1000).toFixed(1)} seconds...`);
            await delay(throttleMs);
        }
    }

    console.log("\n====== BROADCAST COMPLETE ======");
    console.log(`Total Dispatched: ${successCount}`);
    console.log(`Total Failed/Skipped: ${failCount}`);
    console.log("Protocol finished. Entering standby mode.");
}

// Execute if run directly
if (require.main === module) {
    broadcastPromo().then(() => process.exit(0)).catch(err => {
        console.error("Broadcast failed:", err);
        process.exit(1);
    });
}

module.exports = { broadcastPromo };
