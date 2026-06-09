import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useSquadSubscription({ user, isDemoMode }) {
  const [currentSquad, setCurrentSquad] = useState(null);
  const [squadMembers, setSquadMembers] = useState([]);
  const [sharedCarnivalData, setSharedCarnivalData] = useState(null);
  const [targetSquadId, setTargetSquadId] = useState(null);
  const [squadShareCode, setSquadShareCode] = useState('');

  // EFFECT: USER PROFILE LISTENER (for current_squad_id)
  useEffect(() => {
    if (!user || isDemoMode) {
      setTargetSquadId(null);
      return;
    }

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('current_squad_id')
        .eq('auth_id', user.id)
        .single();
      
      if (data?.current_squad_id && data.current_squad_id !== targetSquadId) {
        setTargetSquadId(data.current_squad_id);
      }
    };
    fetchUser();

    // Listen to user updates
    const userChannel = supabase.channel(`user-${user.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `auth_id=eq.${user.id}`
      }, (payload) => {
        const newSquadId = payload.new.current_squad_id;
        if (newSquadId !== targetSquadId) {
          setTargetSquadId(newSquadId);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userChannel);
    };
  }, [user, isDemoMode, targetSquadId]);

  // EFFECT: SQUAD SUBSCRIPTION
  useEffect(() => {
    if (!user || isDemoMode) return;

    if (!targetSquadId) {
      setCurrentSquad(null);
      setSquadMembers([]);
      setSharedCarnivalData(null);
      return;
    }

    const fetchSquadData = async () => {
      const { data: squadData } = await supabase
        .from('squads')
        .select('*')
        .eq('id', targetSquadId)
        .single();

      if (squadData) {
        setCurrentSquad(squadData);
        setSharedCarnivalData(squadData);
        setSquadShareCode(squadData.invite_code);
        
        const { data: membersData } = await supabase
          .from('squad_members')
          .select('users(*), role, joined_at')
          .eq('squad_id', targetSquadId);
          
        if (membersData) {
          setSquadMembers(membersData.map(m => m.users));
        }
      } else {
        setCurrentSquad(null);
        setSharedCarnivalData(null);
        setSquadMembers([]);
        setSquadShareCode('');
      }
    };

    fetchSquadData();

    // Subscribe to the squad
    const squadChannel = supabase.channel(`squad-${targetSquadId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'squads',
        filter: `id=eq.${targetSquadId}`
      }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setCurrentSquad(payload.new);
          setSharedCarnivalData(payload.new);
        } else if (payload.eventType === 'DELETE') {
          setCurrentSquad(null);
          setSharedCarnivalData(null);
          setSquadMembers([]);
          setSquadShareCode('');
        }
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'squad_members',
        filter: `squad_id=eq.${targetSquadId}`
      }, () => {
        // Re-fetch members on any change for simplicity
        fetchSquadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(squadChannel);
      setSquadShareCode('');
    };
  }, [targetSquadId, user, isDemoMode]);

  // SELF-HEAL: Ensure consistent state
  useEffect(() => {
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
