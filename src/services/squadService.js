import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    onSnapshot,
    deleteField,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase';
import { supabase } from '../supabaseClient';
import { generateNostrKeyPair } from './nostrService';

// Helper: Generate a random 6-character invite code
const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Helper: Ensure user exists in Supabase users table and return their Supabase UUID
const ensureSupabaseUser = async (user) => {
    const authId = user.uid || user.id;
    if (!authId) throw new Error("No user ID found");

    // 1. Try to find user
    const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', authId)
        .maybeSingle();

    if (existingUser) {
        return existingUser.id;
    }

    // 2. If not found, insert a minimal profile record
    const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
            auth_id: authId,
            display_name: user.displayName || user.email || 'Anonymous User'
        })
        .select('id')
        .single();

    if (insertError) {
        console.error("Error creating user profile in Supabase:", insertError);
        throw insertError;
    }

    return newUser.id;
};

// --- CREATE SQUAD ---
export const createSquad = async (user, squadName, carnivalId) => {
    if (!user) throw new Error("User not authenticated");

    const inviteCode = generateInviteCode();
    const keyPair = generateNostrKeyPair();
    const authId = user.uid || user.id;

    const dbUserId = await ensureSupabaseUser(user);

    // 1. Create the squad in Supabase squads table
    const { data: squadData, error: squadError } = await supabase
        .from('squads')
        .insert({
            name: squadName,
            invite_code: inviteCode,
            leader_id: dbUserId,
            target_carnival_id: carnivalId,
            nostr_pubkey: keyPair.publicKeyHex,
            nostr_privkey: keyPair.privateKeyHex
        })
        .select('*')
        .single();

    if (squadError) {
        console.error("Error inserting squad in Supabase:", squadError);
        throw squadError;
    }

    const squadId = squadData.id;

    // 2. Add the leader to squad_members
    const { error: memberError } = await supabase
        .from('squad_members')
        .insert({
            squad_id: squadId,
            user_id: dbUserId,
            role: 'LEADER'
        });

    if (memberError) {
        console.error("Error inserting squad member in Supabase:", memberError);
        throw memberError;
    }

    // 3. Set the current_squad_id on the user
    const { error: userUpdateError } = await supabase
        .from('users')
        .update({ current_squad_id: squadId })
        .eq('id', dbUserId);

    if (userUpdateError) {
        console.error("Error linking user to current squad:", userUpdateError);
        throw userUpdateError;
    }

    // Return format matches old Firestore expectations + Nostr keys
    return {
        id: squadId,
        name: squadName,
        leaderId: authId,
        leaderName: user.displayName || user.email,
        members: [authId],
        inviteCode: inviteCode,
        carnivalId: carnivalId,
        nostrPrivKey: keyPair.privateKeyHex,
        nostrPubKey: keyPair.publicKeyHex,
        nostr_privkey: keyPair.privateKeyHex,
        nostr_pubkey: keyPair.publicKeyHex
    };
};

// --- JOIN SQUAD ---
export const joinSquadByCode = async (user, inviteCode) => {
    if (!user) throw new Error("Must be logged in");

    const authId = user.uid || user.id;
    const dbUserId = await ensureSupabaseUser(user);

    // 1. Find squad with this invite code
    const { data: squadData, error: squadFetchError } = await supabase
        .from('squads')
        .select('*')
        .eq('invite_code', inviteCode.toUpperCase())
        .maybeSingle();

    if (squadFetchError || !squadData) {
        throw new Error("Invalid Squad Code");
    }

    const squadId = squadData.id;

    // 2. Add user to squad_members (check if already in it first)
    const { data: existingMember } = await supabase
        .from('squad_members')
        .select('id')
        .eq('squad_id', squadId)
        .eq('user_id', dbUserId)
        .maybeSingle();

    if (!existingMember) {
        const { error: memberInsertError } = await supabase
            .from('squad_members')
            .insert({
                squad_id: squadId,
                user_id: dbUserId,
                role: 'MEMBER'
            });

        if (memberInsertError) {
            console.error("Error joining squad members:", memberInsertError);
            throw memberInsertError;
        }
    }

    // 3. Update user's current_squad_id
    const { error: userUpdateError } = await supabase
        .from('users')
        .update({ current_squad_id: squadId })
        .eq('id', dbUserId);

    if (userUpdateError) {
        console.error("Error updating user current squad:", userUpdateError);
        throw userUpdateError;
    }

    // Return squad data matching expected attributes
    return {
        id: squadData.id,
        name: squadData.name,
        inviteCode: squadData.invite_code,
        leaderId: squadData.leader_id,
        carnivalId: squadData.target_carnival_id,
        nostr_pubkey: squadData.nostr_pubkey,
        nostr_privkey: squadData.nostr_privkey,
        nostrPubKey: squadData.nostr_pubkey,
        nostrPrivKey: squadData.nostr_privkey
    };
};

// --- LEAVE SQUAD ---
export const leaveSquad = async (user, squadId) => {
    if (!user || !squadId) return;

    const dbUserId = await ensureSupabaseUser(user);

    // 1. Remove from squad_members
    const { error: memberError } = await supabase
        .from('squad_members')
        .delete()
        .eq('squad_id', squadId)
        .eq('user_id', dbUserId);

    if (memberError) {
        console.error("Error leaving squad members:", memberError);
    }

    // 2. Clear current_squad_id in users
    const { error: userError } = await supabase
        .from('users')
        .update({ current_squad_id: null })
        .eq('id', dbUserId);

    if (userError) {
        console.error("Error clearing user current squad ID:", userError);
    }
};

// --- REMOVE MEMBER (Leader only) ---
export const removeSquadMember = async (leaderUid, squadId, memberUid) => {
    if (!leaderUid || !squadId || !memberUid) {
        throw new Error("Missing required parameters");
    }

    const dbLeaderId = await ensureSupabaseUser({ uid: leaderUid });
    const dbMemberId = await ensureSupabaseUser({ uid: memberUid });

    // 1. Fetch squad and verify leadership
    const { data: squadData, error: squadFetchError } = await supabase
        .from('squads')
        .select('*')
        .eq('id', squadId)
        .single();

    if (squadFetchError || !squadData) {
        throw new Error("Squad not found");
    }

    if (squadData.leader_id !== dbLeaderId) {
        throw new Error("Only the squad leader can remove members");
    }

    // 2. Prevent leader from removing themselves
    if (dbMemberId === dbLeaderId) {
        throw new Error("Leaders cannot remove themselves. Transfer leadership or delete the squad.");
    }

    console.log(`Removing member ${memberUid} from squad ${squadId}`);

    // 3. Remove from squad_members
    const { error: deleteError } = await supabase
        .from('squad_members')
        .delete()
        .eq('squad_id', squadId)
        .eq('user_id', dbMemberId);

    if (deleteError) {
        console.error("Error removing member from squad_members:", deleteError);
        throw deleteError;
    }

    // 4. Clear removed user's current_squad_id
    const { error: userError } = await supabase
        .from('users')
        .update({ current_squad_id: null })
        .eq('id', dbMemberId);

    if (userError) {
        console.warn("Could not update removed user profile:", userError);
    }

    console.log(`Member ${memberUid} removed successfully`);
    return { success: true };
};

// --- REGENERATE INVITE CODE (Leader only) ---
export const regenerateInviteCode = async (leaderUid, squadId) => {
    if (!leaderUid || !squadId) {
        throw new Error("Missing required parameters");
    }

    const dbLeaderId = await ensureSupabaseUser({ uid: leaderUid });

    const { data: squadData, error: squadFetchError } = await supabase
        .from('squads')
        .select('*')
        .eq('id', squadId)
        .single();

    if (squadFetchError || !squadData) {
        throw new Error("Squad not found");
    }

    if (squadData.leader_id !== dbLeaderId) {
        throw new Error("Only the squad leader can regenerate the invite code");
    }

    const newCode = generateInviteCode();

    const { error: updateError } = await supabase
        .from('squads')
        .update({ invite_code: newCode })
        .eq('id', squadId);

    if (updateError) {
        console.error("Error updating squad invite code:", updateError);
        throw updateError;
    }

    console.log(`New invite code generated for squad ${squadId}: ${newCode}`);
    return newCode;
};

// --- SYNC EVENTS (Uses Firestore setDoc to merge on ephemeral document) ---
export const addSquadEvent = async (squadId, event) => {
    const squadRef = doc(db, 'squads', squadId);
    await setDoc(squadRef, {
        sharedItinerary: arrayUnion(event)
    }, { merge: true });
};

export const removeSquadEvent = async (squadId, event) => {
    const squadRef = doc(db, 'squads', squadId);
    await setDoc(squadRef, {
        sharedItinerary: arrayRemove(event)
    }, { merge: true });
};

// --- GET USER'S SQUADS ---
export const getUserSquads = async (userId) => {
    if (!userId) throw new Error("User ID required");

    const dbUserId = await ensureSupabaseUser({ uid: userId });

    const { data: memberRows, error } = await supabase
        .from('squad_members')
        .select(`
            role,
            squads (
                id,
                name,
                target_carnival_id,
                invite_code,
                leader_id
            )
        `)
        .eq('user_id', dbUserId);

    if (error || !memberRows) {
        console.error("Error fetching user squads:", error);
        return [];
    }

    // Resolve member count for each squad in parallel
    const squads = await Promise.all(memberRows.map(async (row) => {
        const squad = row.squads;
        if (!squad) return null;

        const { count } = await supabase
            .from('squad_members')
            .select('*', { count: 'exact', head: true })
            .eq('squad_id', squad.id);

        return {
            id: squad.id,
            name: squad.name || 'Unnamed Squad',
            carnivalId: squad.target_carnival_id,
            inviteCode: squad.invite_code,
            memberCount: count || 0,
            isLeader: row.role === 'LEADER'
        };
    }));

    return squads.filter(Boolean);
};

// --- SWITCH ACTIVE SQUAD ---
export const switchActiveSquad = async (userId, squadId) => {
    if (!userId) throw new Error("User ID required");

    const dbUserId = await ensureSupabaseUser({ uid: userId });

    const { error } = await supabase
        .from('users')
        .update({ current_squad_id: squadId })
        .eq('id', dbUserId);

    if (error) {
        console.error("Error switching active squad:", error);
        throw error;
    }
};

// --- LIVE STREAM: Start streaming (uses Firestore setDoc to allow auto-creation) ---
export const startLiveStream = async (squadId, userId, roomId) => {
    if (!squadId || !roomId) throw new Error("Squad ID and Room ID required");

    const squadRef = doc(db, 'squads', squadId);
    await setDoc(squadRef, {
        liveStream: {
            roomId: roomId,
            hostId: userId,
            startedAt: new Date().toISOString()
        }
    }, { merge: true });

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
