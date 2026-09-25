import { useState } from 'react';
import { 
  createSquad, 
  joinSquadByCode, 
  leaveSquad, 
  removeSquadMember, 
  regenerateInviteCode, 
  getUserSquads, 
  switchActiveSquad 
} from '../services/squadService';

export function useSquadHandlers({ 
  user, 
  isDemoMode, 
  currentSquad, 
  activeCarnivalId, 
  db, 
  setToastMessage, 
  setCurrentSquad, 
  setSquadMembers, 
  setSquadShareCode 
}) {
  const [joinCode, setJoinCode] = useState('');
  const [isCreatingShare, setIsCreatingShare] = useState(false);
  const [isJoiningSquad, setIsJoiningSquad] = useState(false);
  const [squadShareError, setSquadShareError] = useState('');
  const [squadShareSuccess, setSquadShareSuccess] = useState('');
  const [userSquads, setUserSquads] = useState([]); // All squads user belongs to
  const [loadingSquads, setLoadingSquads] = useState(false);

  // SQUAD: Handle Create
  const handleCreateSquad = async () => {
    if (isDemoMode) {
      alert("This feature is simulated in Demo Mode.");
      return;
    }
    if (!user) return;
    setIsCreatingShare(true);
    setSquadShareError('');
    try {
      const squad = await createSquad(user, `${user.displayName || 'User'}'s Squad`, activeCarnivalId);
      setCurrentSquad(squad);
      setSquadShareCode(squad.inviteCode);
      setToastMessage('Only Premium users can lead a squad!'); // Wait logic check below
    } catch (error) {
      console.error("Error creating squad:", error);
      setSquadShareError(`Failed: ${error.message}`);
    } finally {
      setIsCreatingShare(false);
    }
  };

  // SQUAD: Handle Join
  const handleJoinSquad = async () => {
    if (isDemoMode) {
      alert("Joining squads is simulated in Demo Mode.");
      return;
    }
    if (!user || !joinCode) return;
    const cleanCode = joinCode.trim().toUpperCase(); // Sanitization
    setIsJoiningSquad(true);
    setSquadShareError('');
    console.log("HandleJoinSquad: Attempting to join with code:", cleanCode);

    try {
      const squad = await joinSquadByCode(user, cleanCode);
      console.log("HandleJoinSquad: Join success. Squad result:", squad);

      if (!squad) {
        console.warn("HandleJoinSquad: No squad object returned, but execution did not throw. Assuming success via listener.");
      }

      setSquadShareSuccess(`Joined Squad!`);
      // Realtime listener in useEffect will pick up the rest
      setJoinCode('');
    } catch (error) {
      console.error("Error joining squad:", error);
      setSquadShareError(error.message || 'Invalid code');
    } finally {
      setIsJoiningSquad(false);
    }
  };

  // SQUAD: Load User's Squads
  const loadUserSquads = async () => {
    if (!user || isDemoMode) return;
    setLoadingSquads(true);
    try {
      const squads = await getUserSquads(user.uid);
      setUserSquads(squads);
    } catch (err) {
      console.error("Failed to load user squads:", err);
    } finally {
      setLoadingSquads(false);
    }
  };

  // SQUAD: Handle Leave
  const handleLeaveSquad = async ({ handleExitDemo }) => {
    if (isDemoMode) {
      if (confirm("Exit Demo Mode?")) handleExitDemo();
      return;
    }
    if (!user || !currentSquad) return;
    if (confirm("Are you sure you want to leave this squad?")) {
      const leavingSquadId = currentSquad.id;
      await leaveSquad(user, leavingSquadId);

      // Find next available squad to switch to
      const remainingSquads = userSquads.filter(s => s.id !== leavingSquadId);
      if (remainingSquads.length > 0) {
        // Switch to first remaining squad
        await switchActiveSquad(user.uid, remainingSquads[0].id);
        setToastMessage(`Switched to ${remainingSquads[0].name}`);
      } else {
        setCurrentSquad(null);
        setSquadMembers([]);
      }

      // Reload squads list
      loadUserSquads();
    }
  };

  // SQUAD: Handle Remove Member (Leader only)
  const handleRemoveMember = async (memberUid, memberName) => {
    if (isDemoMode) {
      alert("Member removal is disabled in Demo Mode.");
      return;
    }
    if (!user || !currentSquad) return;
    if (currentSquad.leaderId !== user.uid) {
      alert("Only the squad leader can remove members.");
      return;
    }

    if (!confirm(`Remove ${memberName} from your squad?`)) return;

    try {
      await removeSquadMember(user.uid, currentSquad.id, memberUid);
      setToastMessage(`${memberName} has been removed from the squad.`);

      // Ask about regenerating invite code
      if (confirm(`${memberName} was removed.\\n\\nWould you like to generate a new invite code?\\n(This prevents them from rejoining with the old code)`)) {
        const newCode = await regenerateInviteCode(user.uid, currentSquad.id);
        setSquadShareCode(newCode);
        setToastMessage(`New invite code: ${newCode}`);
      }
    } catch (error) {
      console.error("Error removing member:", error);
      alert(`Failed to remove member: ${error.message}`);
    }
  };

  // SQUAD: Switch Active Squad
  const handleSwitchSquad = async (squadId) => {
    if (!user || isDemoMode) return;
    if (squadId === currentSquad?.id) return; // Already on this squad

    try {
      await switchActiveSquad(user.uid, squadId);
      // The listener on user profile will pick up the change
      setToastMessage('Switched squad!');
    } catch (err) {
      console.error("Failed to switch squad:", err);
      alert("Failed to switch squad: " + err.message);
    }
  };

  return {
    joinCode, setJoinCode,
    isCreatingShare, setIsCreatingShare,
    isJoiningSquad, setIsJoiningSquad,
    squadShareError, setSquadShareError,
    squadShareSuccess, setSquadShareSuccess,
    userSquads, setUserSquads,
    loadingSquads, setLoadingSquads,
    handleCreateSquad,
    handleJoinSquad,
    handleLeaveSquad,
    handleRemoveMember,
    loadUserSquads,
    handleSwitchSquad
  };
}
