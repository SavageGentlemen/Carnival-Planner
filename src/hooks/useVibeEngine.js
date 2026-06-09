import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useVibeEngine({ user, activeCarnivalId, isDemoMode, getCurrentCarnivalData, updateCarnivalData, setToastMessage }) {
  const [vibeScores, setVibeScores] = useState({});
  const [vibeAlert, setVibeAlert] = useState(null);

  // Vibe Engine: Real-time listener for vibe scores via Supabase
  useEffect(() => {
    if (!user || !activeCarnivalId || isDemoMode) {
      setVibeScores({});
      return;
    }

    // Initial fetch
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, name, venue, vibe_score')
        .eq('carnival_id', activeCarnivalId);
        
      if (data) {
        const scoresMap = {};
        data.forEach(e => {
            scoresMap[e.id] = {
                eventId: e.id,
                title: e.name,
                venue: e.venue,
                score: e.vibe_score || Math.floor(Math.random() * 5) + 5, // mock score if missing
                reason: e.vibe_score >= 7 ? 'High squad activity!' : 'Low activity reported.'
            };
        });
        setVibeScores(scoresMap);
      }
    };
    
    fetchScores();

    // Listen to event updates
    const channel = supabase.channel(`vibe-engine-${activeCarnivalId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'events', filter: `carnival_id=eq.${activeCarnivalId}` }, (payload) => {
        const updated = payload.new;
        setVibeScores(prev => ({
            ...prev,
            [updated.id]: {
                eventId: updated.id,
                title: updated.name,
                venue: updated.venue,
                score: updated.vibe_score || 0,
                reason: updated.vibe_score >= 7 ? 'High squad activity!' : 'Low activity reported.'
            }
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, activeCarnivalId, isDemoMode]);

  // Vibe Engine: Watch for planned events with tanking scores
  useEffect(() => {
    if (Object.keys(vibeScores).length === 0) return;
    const schedule = getCurrentCarnivalData('schedule') || [];
    if (schedule.length === 0) return;

    for (const planned of schedule) {
      // Find matching vibe score by title
      const matchedScore = Object.values(vibeScores).find(s =>
        s.title && planned.name &&
        s.title.toLowerCase().includes(planned.name.toLowerCase())
      );

      if (matchedScore && matchedScore.score <= 3) {
        // Find the best alternative
        const allScores = Object.values(vibeScores);
        const best = allScores
          .filter(s => s.score >= 7 && s.title !== matchedScore.title)
          .sort((a, b) => b.score - a.score)[0];

        if (best) {
          setVibeAlert({
            droppedEvent: {
              title: matchedScore.title,
              score: matchedScore.score,
              reason: matchedScore.reason,
            },
            suggestedEvent: {
              title: best.title,
              score: best.score,
              reason: best.reason,
              venue: best.venue,
            },
          });
          break; // Only show one alert at a time
        }
      }
    }
  }, [vibeScores, activeCarnivalId, getCurrentCarnivalData]);

  const handleVibeSwap = (alert) => {
    const schedule = getCurrentCarnivalData('schedule') || [];
    const updated = schedule.map(item =>
      item.name?.toLowerCase().includes(alert.droppedEvent.title.toLowerCase())
        ? { ...item, name: alert.suggestedEvent.title, note: `Swapped from ${alert.droppedEvent.title} (Vibe: ${alert.droppedEvent.score}/10)` }
        : item
    );
    updateCarnivalData('schedule', updated);
    setVibeAlert(null);
    setToastMessage({ title: 'Vibe Swap Complete 🔥', body: `Swapped to ${alert.suggestedEvent.title}` });
  };

  const dismissVibeAlert = () => setVibeAlert(null);

  return { vibeScores, vibeAlert, handleVibeSwap, dismissVibeAlert };
}
