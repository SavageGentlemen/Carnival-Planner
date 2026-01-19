import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Mock messages for Demo Mode
let DEMO_MESSAGES = [
    { id: '1', text: "Who's ready for the road?! 🇹🇹", senderId: '2', senderName: 'Soca Junkie', createdAt: new Date(Date.now() - 86400000).toISOString(), isBot: false },
    { id: '2', text: "My costume is ready! The Monarch section looks fire 🔥", senderId: '3', senderName: 'Fete King', createdAt: new Date(Date.now() - 80000000).toISOString(), isBot: false },
    { id: '3', text: "Just waiting on my flight confirmation.", senderId: '4', senderName: 'Carnival Baby', createdAt: new Date(Date.now() - 70000000).toISOString(), isBot: false },
    { id: '4', text: "Welcome to Trinidad! I'm your Carnival Concierge. Ask me anything about fete locations, transport, or safety tips!", senderId: 'bot', senderName: 'Carnival Concierge', createdAt: new Date(Date.now() - 60000).toISOString(), isBot: true },
];

// --- PRODUCTION: FIRESTORE ---

export const subscribeToMessages = (squadId, isDemoMode, callback) => {
    if (isDemoMode) {
        // DEMO: Return mock messages immediately
        callback(DEMO_MESSAGES);
        return () => { }; // detailed unsubscribe
    }

    if (!squadId) {
        console.warn("subscribeToMessages aborted: No squadId provided.");
        return () => { };
    }
    console.log("Subscribing to messages for squad:", squadId);

    const messagesRef = collection(db, 'squads', squadId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Handle Firestore Timestamp vs Date vs String
            createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : new Date().toISOString()
        }));
        callback(messages);
    }, (error) => {
        console.error("❌ Chat subscription error:", error);
        // We could also notify the user via a callback if we had one for errors
    });

    return unsubscribe;
};

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const sendMessage = async (squadId, user, text, imageFile, isDemoMode, callback) => {
    let imageUrl = null;

    // HANDLING IMAGE UPLOAD
    if (imageFile) {
        if (isDemoMode) {
            // DEMO: Create local blob URL
            imageUrl = URL.createObjectURL(imageFile);
        } else {
            // PRODUCTION: Upload to Firebase Storage
            try {
                const storageRef = ref(storage, `squads/${squadId}/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            } catch (err) {
                console.error("Image upload failed:", err);
                // Fail silently or handle error? For now proceed without image
            }
        }
    }

    const messageData = {
        text,
        imageUrl,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 Hours from now
        senderId: user.uid || 'demo-user',
        senderName: user.displayName || 'Me',
        senderPhoto: user.photoURL || null,
        createdAt: isDemoMode ? new Date().toISOString() : serverTimestamp(),
        isBot: false
    };

    if (isDemoMode) {
        // DEMO: Update local array and trigger callback
        const tempMsg = { id: Date.now().toString(), ...messageData };
        DEMO_MESSAGES = [...DEMO_MESSAGES, tempMsg];
        callback([...DEMO_MESSAGES]);

        // SIMULATE AI REPLY
        setTimeout(() => {
            const aiReply = generateMockAIReply(text || (imageFile ? "Nice photo! 📸" : "..."));
            const botMsg = {
                id: (Date.now() + 1).toString(),
                text: aiReply,
                senderId: 'bot',
                senderName: 'Carnival Concierge',
                senderPhoto: null, // We'll handle icon in UI
                createdAt: new Date().toISOString(),
                isBot: true
            };
            DEMO_MESSAGES = [...DEMO_MESSAGES, botMsg];
            callback([...DEMO_MESSAGES]);
        }, 1500);

        return;
    }

    // PRODUCTION: Add to Firestore
    if (!squadId) {
        console.warn("sendMessage aborted: No squadId provided.");
        return;
    }
    console.log("Sending message to Firestore...", { squadId, messageData });
    await addDoc(collection(db, 'squads', squadId, 'messages'), messageData);

    // 🤖 AI CONCIERGE (PRODUCTION)
    // Trigger a bot reply if not a bot message (prevent loops)
    if (!messageData.isBot) {
        setTimeout(async () => {
            const aiReply = generateMockAIReply(text || (imageFile ? "Nice photo! 📸" : "..."));
            const botMsg = {
                text: aiReply,
                senderId: 'bot',
                senderName: 'Carnival Concierge',
                senderPhoto: null,
                createdAt: serverTimestamp(),
                isBot: true,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };

            try {
                await addDoc(collection(db, 'squads', squadId, 'messages'), botMsg);
                console.log("🤖 AI Concierge replied:", aiReply);
            } catch (err) {
                console.error("Failed to send AI reply:", err);
            }
        }, 2000); // 2 second delay for realism
    }
};

// --- HELPER: MOCK AI ---
const generateMockAIReply = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes('fete') || lower.includes('party')) {
        return "Based on your schedule, I recommend 'Phuket' on Friday night. It's close to your Airbnb in Woodbrook and tickets are running low! 🎫";
    }
    if (lower.includes('food') || lower.includes('hungry') || lower.includes('eat')) {
        return "You have to try 'Sauce Doubles' in Curepe! Or if you're near the Savannah, check out the corn soup vendor near the exit. 🌽";
    }
    if (lower.includes('transport') || lower.includes('taxi') || lower.includes('uber')) {
        return "Rideshare apps like TT RideShare are reliable. For late nights, I recommend pre-booking a driver for your squad. Safety first! 🚗";
    }
    if (lower.includes('costume') || lower.includes('mas')) {
        return "Costume pickup for Tribe is at the Queen's Park Savannah. Don't forget your distribution slip and ID! 🎭";
    }

    return "That sounds like a vibe! Remember to stay hydrated 💧. Need help with transport or fete tickets?";
};
