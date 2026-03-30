require('dotenv').config({ path: '../.env' });
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin (Uses environment credentials, or default if on GCP)
if (!admin.apps.length) {
    admin.initializeApp();
}

// Ensure SMTP environment variables are fully loaded
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 465;
const SMTP_USER = process.env.SMTP_USER || 'cpteam@carnival-planner.com';
const SMTP_PASS = process.env.SMTP_PASS;

// IMPORTANT: Define the Reward here before executing the blast
const REWARD = "$250 Carnival Uber Credit"; 

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
});

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

Log into your terminal here: https://carnival-planner.com/dashboard
Hit the "Invite Squad" button on your itinerary.
Drop the link in your group chat.
The moment the 4th friend connects to your board, your squad is locked in for the promo.

Secure your route. We’ll see you on the road.

- The CP Team
Carnival-Planner.com`;
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
        console.error("Error extracting users from Firebase Auth:", error.message);
        console.log("Ensure your GOOGLE_APPLICATION_CREDENTIALS are set if running locally.");
        process.exit(1);
    }

    // Filter out users without emails
    users = users.filter(usr => usr.email);

    console.log(`[DATA EXTRACTION COMPLETE] Found ${users.length} active users with email addresses. \nInitiating Throttled Send Protocol...`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        // Payload Injection: Inject the user's first name dynamically
        const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Carnival Planner';
        const payload = getEmailPayload(firstName);

        const mailOptions = {
            from: `"The CP Team" <${SMTP_USER}>`,
            to: user.email,
            subject: 'The group chat is killing your Carnival plans. (Squad Promo inside)',
            text: payload
        };

        try {
            await transporter.sendMail(mailOptions);
            successCount++;
            console.log(`[SUCCESS] Email securely dispatched to ${user.email} (${i+1}/${users.length})`);
        } catch (err) {
            failCount++;
            console.error(`[BOUNCED] Failed to send to ${user.email}:`, err.message);
        }

        // Throttling (Anti-Spam Measure): 45s to 90s randomized delay
        if (i < users.length - 1) {
            const throttleMs = Math.floor(Math.random() * (90000 - 45000 + 1)) + 45000;
            console.log(`[THROTTLING] Anti-spam protocol active. Delaying next send by ${(throttleMs / 1000).toFixed(1)} seconds...`);
            await delay(throttleMs);
        }
    }

    console.log("\n====== BROADCAST COMPLETE ======");
    console.log(`Total Successful Sends: ${successCount}`);
    console.log(`Total Bounced/Failed: ${failCount}`);
    console.log("Protocol finished. Entering standby mode.");
    process.exit(0);
}

// Execute the broadcast protocol
broadcastPromo();
