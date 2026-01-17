import {
    collection,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    arrayUnion,
    arrayRemove,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Helper: Generate a random 6-character invite code
const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// --- CREATE SQUAD ---
export const createSquad = async (user, squadName, carnivalId) => {
    if (!user) throw new Error("User not authenticated");

    const inviteCode = generateInviteCode();

    const squadData = {
        name: squadName,
        leaderId: user.uid,
        leaderName: user.displayName || user.email,
        members: [user.uid],
        // Store minimal details for UI (avatars etc)
        memberDetails: {
            [user.uid]: {
                name: user.displayName || user.email,
                role: 'leader',
                photoURL: user.photoURL || null,
                joinedAt: new Date().toISOString()
            }
        },
        carnivalId: carnivalId,
        inviteCode: inviteCode,
        createdAt: serverTimestamp(),
        sharedItinerary: [] // Array of events
    };

    // Add to 'squads' collection
    console.log("Attempting to create squad doc...", squadData);
    const squadRef = await addDoc(collection(db, 'squads'), squadData);
    console.log("Squad doc created with ID:", squadRef.id);

    // Track in user's profile
    const userRef = doc(db, 'users', user.uid);
    console.log("Updating user profile for squad:", user.uid);
    await setDoc(userRef, {
        currentSquadId: squadRef.id
    }, { merge: true });
    console.log("User profile updated.");

    return { id: squadRef.id, ...squadData };
};

// --- JOIN SQUAD ---
export const joinSquadByCode = async (user, inviteCode) => {
    console.log("joinSquadByCode started", { uid: user?.uid, inviteCode });
    if (!user) throw new Error("Must be logged in");

    // 1. Find squad with this code
    const squadsRef = collection(db, 'squads');
    const q = query(squadsRef, where('inviteCode', '==', inviteCode.toUpperCase()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error("Invalid Squad Code");
    }

    const squadDoc = querySnapshot.docs[0];
    const squadId = squadDoc.id;
    const squadData = squadDoc.data();
    console.log("Squad found:", { squadId, squadData });

    // 2. Update user profile FIRST to ensure connection is repaired
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
        currentSquadId: squadId
    }, { merge: true });
    console.log("User profile updated with squadId:", squadId);

    // 3. Check if already member
    if (squadData.members && squadData.members.includes(user.uid)) {
        console.log("User already in squad (skipping array update)");
        return { id: squadId, ...squadData };
    }

    // 4. Add user to squad members array
    const squadRef = doc(db, 'squads', squadId);

    // SAFETY CHECK FOR NAME
    const userName = user.displayName || user.email || "Unknown User";
    console.log("Adding user to squad:", userName);

    await updateDoc(squadRef, {
        members: arrayUnion(user.uid),
        [`memberDetails.${user.uid}`]: {
            name: userName,
            role: 'member',
            photoURL: user.photoURL || null,
            joinedAt: new Date().toISOString()
        }
    });
    console.log("Squad doc updated");

    return { id: squadId, ...squadData };
};

// --- LEAVE SQUAD ---
export const leaveSquad = async (user, squadId) => {
    if (!user || !squadId) return;

    const squadRef = doc(db, 'squads', squadId);
    const userRef = doc(db, 'users', user.uid);

    // Remove from squad
    // unique usage: deleting a map field requires 'deleteField()' but simpler to just ignore it
    // or overwrite. For array members its easy.
    await updateDoc(squadRef, {
        members: arrayRemove(user.uid)
        // We intentionally leave memberDetails history or clean it up? 
        // Keeping it for history is safer for now.
    });

    // Clear from user profile
    await updateDoc(userRef, {
        currentSquadId: null // or deleteField()
    });
};

// --- SYNC EVENTS ---
export const addSquadEvent = async (squadId, event) => {
    const squadRef = doc(db, 'squads', squadId);
    await updateDoc(squadRef, {
        sharedItinerary: arrayUnion(event)
    });
};

export const removeSquadEvent = async (squadId, event) => {
    const squadRef = doc(db, 'squads', squadId);
    await updateDoc(squadRef, {
        sharedItinerary: arrayRemove(event)
    });
};
