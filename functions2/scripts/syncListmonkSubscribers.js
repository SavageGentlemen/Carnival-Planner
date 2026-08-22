/**
 * Listmonk Subscriber Sync Script
 * 
 * Extracts active users from Firestore/Supabase and synchronizes them
 * with your self-hosted Listmonk instance for targeted squad promo blasts.
 * 
 * Usage:
 *   node functions2/scripts/syncListmonkSubscribers.js
 */

require('dotenv').config({ path: '../.env' });
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const LISTMONK_URL = process.env.LISTMONK_URL || 'http://localhost:9000';
const LISTMONK_USER = process.env.LISTMONK_API_USER || 'admin';
const LISTMONK_PASS = process.env.LISTMONK_API_TOKEN || 'carnival_admin_pass';
const LIST_ID = parseInt(process.env.LISTMONK_PROMO_LIST_ID || '1', 10);

async function syncSubscribers() {
  console.log('=== LISTMONK USER SYNC ENGINE ===');
  console.log(`Target Listmonk Host: ${LISTMONK_URL}`);

  try {
    const usersSnap = await db.collection('users').get();
    console.log(`Found ${usersSnap.size} user records in Firestore.`);

    const authHeader = 'Basic ' + Buffer.from(`${LISTMONK_USER}:${LISTMONK_PASS}`).toString('base64');
    let synced = 0;
    let skipped = 0;

    for (const doc of usersSnap.docs) {
      const u = doc.data();
      const email = u.email;
      const name = u.displayName || u.name || email?.split('@')[0] || 'Carnival Planner User';

      if (!email || !email.includes('@')) {
        skipped++;
        continue;
      }

      const payload = {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        status: 'enabled',
        lists: [LIST_ID],
        attribs: {
          carnivalInterest: u.selectedCarnival || 'Trinidad',
          squadRole: u.isBandLeader ? 'BandLeader' : 'Masquerader',
          isMasquerader: u.isMasquerader || false,
        },
        preconfirm_subscriptions: true,
      };

      try {
        const res = await fetch(`${LISTMONK_URL}/api/subscribers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          },
          body: JSON.stringify(payload),
        });

        if (res.ok || res.status === 409) {
          synced++;
        } else {
          console.warn(`[Sync] Warning for ${email}: Status ${res.status}`);
        }
      } catch (postErr) {
        console.error(`[Sync] Failed to post ${email} to Listmonk:`, postErr.message);
      }
    }

    console.log(`\nSync Completed! Successfully synced: ${synced}, Skipped: ${skipped}`);
  } catch (err) {
    console.error('Listmonk Sync Error:', err.message);
  }
}

if (require.main === module) {
  syncSubscribers();
}

module.exports = { syncSubscribers };
