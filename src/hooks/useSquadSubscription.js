import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

export function useSquadSubscription({ user, isDemoMode, db }) {
  const [currentSquad, setCurrentSquad] = useState(null);
  const [squadMembers, setSquadMembers] = useState([]);
  const [sharedCarnivalData, setSharedCarnivalData] = useState(null);
  const [targetSquadId, setTargetSquadId] = useState(null);
  const [squadShareCode, setSquadShareCode] = useState('');

  // --- EFFECT: USER PROFILE LISTENER (for currentSquadId) ---
  useEffect(() => {
    if (!user || isDemoMode) {
      setTargetSquadId(null); // Clear target squad if no user or in demo
      return;
    }

    // Listen to user profile for currentSquadId changes
    const unsubUser = onSnapshot(doc(db, 'users', user.uid), (uDoc) => {
      const uData = uDoc.data();
      const newSquadId = uData?.currentSquadId || null;

      // Update the target ID which triggers the next effect
      if (newSquadId !== targetSquadId) {
        console.log("App: User changed squad to:", newSquadId);
        setTargetSquadId(newSquadId);
      }
    });
    return () => unsubUser();
  }, [user, isDemoMode, targetSquadId, db]);

  // --- EFFECT: SQUAD SUBSCRIPTION (Cleanly separated) ---
  useEffect(() => {
    // 1. Cleanup check
    if (!user || isDemoMode) return;

    // 2. If no target squad, clear state and return
    if (!targetSquadId) {
      console.log("App: No target squad, clearing state.");
      setCurrentSquad(null);
      setSquadMembers([]);
      setSharedCarnivalData(null);
      return;
    }

    // 3. Subscribe to the TARGET squad
    console.log("App: Subscribing to squad:", targetSquadId);
    const unsubSquad = onSnapshot(doc(db, 'squads', targetSquadId), (sSnap) => {
      if (sSnap.exists()) {
        const sData = sSnap.data();
        console.log("App: Squad loaded:", sSnap.id);
        setCurrentSquad({ id: sSnap.id, ...sData });
        setSharedCarnivalData(sData);

        const membersList = Object.values(sData.memberDetails || {});
        setSquadMembers(membersList);
        setSquadShareCode(sData.inviteCode);
      } else {
        console.warn("App: Target squad does not exist/deleted:", targetSquadId);
        setCurrentSquad(null);
        setSharedCarnivalData(null);
        setSquadMembers([]);
        setSquadShareCode('');
      }
    });

    return () => {
      console.log("App: Unsubscribing from squad:", targetSquadId);
      unsubSquad();
      setSquadShareCode('');
    };
  }, [targetSquadId, user, isDemoMode, db]);

  // --- SELF-HEAL: Ensure consistent state ---
  useEffect(() => {
    // If currentSquad is null, Members MUST be empty.
    // If we detect ghost members, kill them.
    if (!currentSquad && squadMembers.length > 0) {
      console.warn("App: DETECTED GHOST MEMBERS! Self-healing state.");
      setSquadMembers([]);
      setSquadShareCode('');
    }
  }, [currentSquad, squadMembers]);

  return {
    currentSquad,
    squadMembers,
    sharedCarnivalData,
    squadShareCode,
    targetSquadId,
    setCurrentSquad,
    setSquadMembers,
    setSharedCarnivalData,
    setSquadShareCode,
    setTargetSquadId
  };
}
