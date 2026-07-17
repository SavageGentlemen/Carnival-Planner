import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { generateSecretKey, getPublicKey } from 'nostr-tools';
import { bytesToHex } from '@noble/hashes/utils';
import { readFileSync } from 'fs';
import path from 'path';

/**
 * --- NOSTR KEY BACKFILL (ADMIN) ---
 * Why this script exists: Standard Firestore security rules prevent standalone scripts 
 * from writing to squads without an authenticated user. This script uses 'firebase-admin' 
 * to bypass those rules and patch legacy squads.
 * 
 * SETUP:
 * 1. Go to Firebase Console -> Project Settings -> Service Accounts.
 * 2. Click "Generate New Private Key".
 * 3. Save the JSON file as 'service-account.json' in the root of this project.
 * 4. Run: npm install firebase-admin
 * 5. Run: node scripts/backfillNostrKeys.js
 */

const SERVICE_ACCOUNT_PATH = path.resolve(process.cwd(), './service-account.json');

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
} catch (err) {
  console.error("\n❌ ERROR: 'service-account.json' not found in project root.");
  console.error("1. Go to Firebase Console -> Project Settings -> Service Accounts.");
  console.error("2. Generate a new private key.");
  console.error("3. Save it as 'service-account.json' in your project folder.\n");
  process.exit(1);
}

// Initialize Admin SDK
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Access the 'squad-db' database specifically (as set in firebase.js)
const db = getFirestore(app, "squad-db");

async function backfill() {
  console.log("🚀 Starting Nostr Key Backfill in Admin Mode...");
  
  try {
    const squadsRef = db.collection('squads');
    const snapshot = await squadsRef.get();
    
    if (snapshot.empty) {
      console.log("No squads found in database.");
      process.exit(0);
    }

    let updatedCount = 0;
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      if (!data.nostrPrivKey) {
        console.log(`- Generating keys for squad: ${data.name || doc.id}`);
        
        const sk = generateSecretKey();      // Uint8Array
        const pk = getPublicKey(sk);          // Hex string
        const skHex = bytesToHex(sk);         // Hex string
        
        await doc.ref.update({
          nostrPrivKey: skHex,
          nostrPubKey: pk
        });
        
        updatedCount++;
      }
    }
    
    console.log(`\n✅ Backfill complete. Patched ${updatedCount} squads.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Database error during backfill:", err);
    process.exit(1);
  }
}

backfill();
