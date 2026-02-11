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
    serverTimestamp,
    deleteField
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

    // 3. Add user to squad members array FIRST
    const squadRef = doc(db, 'squads', squadId);

    // SAFETY CHECK FOR NAME
    const userName = user.displayName || user.email || "Unknown User";
    console.log("Adding user to squad:", userName);

    if (!squadData.members || !squadData.members.includes(user.uid)) {
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
    } else {
        console.log("User already in squad (skipping array update)");
    }

    // 4. Update user profile LAST to confirm connection
    // This triggers the UI listener, so we insure permissions are ready above.
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
        currentSquadId: squadId
    }, { merge: true });
    console.log("User profile updated with squadId:", squadId);

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

// --- REMOVE MEMBER (Leader only) ---
export const removeSquadMember = async (leaderUid, squadId, memberUid) => {
    if (!leaderUid || !squadId || !memberUid) {
        throw new Error("Missing required parameters");
    }

    // 1. Fetch squad and verify leadership
    const squadRef = doc(db, 'squads', squadId);
    const squadSnap = await getDoc(squadRef);

    if (!squadSnap.exists()) {
        throw new Error("Squad not found");
    }

    const squadData = squadSnap.data();

    if (squadData.leaderId !== leaderUid) {
        throw new Error("Only the squad leader can remove members");
    }

    // 2. Prevent leader from removing themselves
    if (memberUid === leaderUid) {
        throw new Error("Leaders cannot remove themselves. Transfer leadership or delete the squad.");
    }

    // 3. Check if member is actually in the squad
    if (!squadData.members || !squadData.members.includes(memberUid)) {
        throw new Error("User is not a member of this squad");
    }

    console.log(`Removing member ${memberUid} from squad ${squadId}`);

    // 4. Remove from members array and memberDetails map
    await updateDoc(squadRef, {
        members: arrayRemove(memberUid),
        [`memberDetails.${memberUid}`]: deleteField()
    });

    // 5. Clear removed user's currentSquadId
    const userRef = doc(db, 'users', memberUid);
    try {
        await updateDoc(userRef, {
            currentSquadId: null
        });
    } catch (err) {
        // User doc may not exist yet, that's ok
        console.warn("Could not update removed user's profile:", err);
    }

    console.log(`Member ${memberUid} removed successfully`);
    return { success: true };
};

// --- REGENERATE INVITE CODE (Leader only) ---
export const regenerateInviteCode = async (leaderUid, squadId) => {
    if (!leaderUid || !squadId) {
        throw new Error("Missing required parameters");
    }

    const squadRef = doc(db, 'squads', squadId);
    const squadSnap = await getDoc(squadRef);

    if (!squadSnap.exists()) {
        throw new Error("Squad not found");
    }

    const squadData = squadSnap.data();

    if (squadData.leaderId !== leaderUid) {
        throw new Error("Only the squad leader can regenerate the invite code");
    }

    const newCode = generateInviteCode();

    await updateDoc(squadRef, {
        inviteCode: newCode
    });

    console.log(`New invite code generated for squad ${squadId}: ${newCode}`);
    return newCode;
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

// --- GET USER'S SQUADS ---
export const getUserSquads = async (userId) => {
    if (!userId) throw new Error("User ID required");

    const squadsRef = collection(db, 'squads');
    const q = query(squadsRef, where('members', 'array-contains', userId));
    const querySnapshot = await getDocs(q);

    const squads = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        squads.push({
            id: doc.id,
            name: data.name || 'Unnamed Squad',
            carnivalId: data.carnivalId,
            memberCount: data.members?.length || 0,
            isLeader: data.leaderId === userId,
            inviteCode: data.inviteCode
        });
    });

    return squads;
};

// --- SWITCH ACTIVE SQUAD ---
export const switchActiveSquad = async (userId, squadId) => {
    if (!userId) throw new Error("User ID required");

    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
        currentSquadId: squadId
    }, { merge: true });
};

// --- LIVE STREAM: Start streaming (stores room ID for squad) ---
export const startLiveStream = async (squadId, userId, roomId) => {
    if (!squadId || !roomId) throw new Error("Squad ID and Room ID required");

    const squadRef = doc(db, 'squads', squadId);
    await updateDoc(squadRef, {
        liveStream: {
            roomId: roomId,
            hostId: userId,
            startedAt: new Date().toISOString()
        }
    });

    console.log(`Live stream started for squad ${squadId}: ${roomId}`);
    return { roomId };
};

// --- LIVE STREAM: End streaming ---
export const endLiveStream = async (squadId, userId) => {
    if (!squadId) throw new Error("Squad ID required");

    const squadRef = doc(db, 'squads', squadId);
    const squadSnap = await getDoc(squadRef);

    if (squadSnap.exists()) {
        const data = squadSnap.data();
        // Only the host can end the stream
        if (data.liveStream?.hostId === userId) {
            await updateDoc(squadRef, {
                liveStream: deleteField()
            });
            console.log(`Live stream ended for squad ${squadId}`);
        }
    }
};

// --- LIVE STREAM: Subscribe to stream status ---
export const subscribeToLiveStream = (squadId, callback) => {
    if (!squadId) {
        callback(null);
        return () => { };
    }

    const squadRef = doc(db, 'squads', squadId);
    return onSnapshot(squadRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            callback(data.liveStream || null);
        } else {
            callback(null);
        }
    });
};
