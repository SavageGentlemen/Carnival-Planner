const admin = require('firebase-admin');
const serviceAccount = require('./functions2/serviceAccountKey.json'); // assuming this exists or I'll initialize another way

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // They've run firebase deploy, so gcloud auth should be valid
        projectId: 'carnival-planner'
    });
}

async function checkSellerStatus() {
    try {
        const db = admin.firestore();
        const sellersRef = db.collection('marketplaceSellers');
        const snapshot = await sellersRef.get();

        if (snapshot.empty) {
            console.log('No seller documents found.');
            return;
        }

        snapshot.forEach(doc => {
            console.log('Seller ID:', doc.id);
            console.log('Data:', doc.data());
            console.log('---');
        });
    } catch (error) {
        console.error('Error fetching sellers:', error);
    }
}

checkSellerStatus();
