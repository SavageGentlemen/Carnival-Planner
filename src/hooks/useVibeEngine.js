import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

export function useVibeEngine({ user, activeCarnivalId, isDemoMode, db, getCurrentCarnivalData, updateCarnivalData, setToastMessage }) {
  const [vibeScores, setVibeScores] = useState({});
  const [vibeAlert, setVibeAlert] = useState(null);

  // Vibe Engine: Real-time listener for vibe scores
  useEffect(() => {
    if (!user || !activeCarnivalId || isDemoMode) {
      setVibeScores({});
      return;
    }

    const vibeRef = doc(db, 'vibeScores', activeCarnivalId);
    const unsubVibe = onSnapshot(vibeRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const scoresMap = {};
        (data.scores || []).forEach(s => {
          scoresMap[s.eventId] = s;
        });
        setVibeScores(scoresMap);
        console.log(`Vibe Engine: Loaded ${Object.keys(scoresMap).length} scores for ${activeCarnivalId}`);
      } else {
        setVibeScores({});
      }
    }, (err) => {
      console.log('Vibe Engine: Listener error:', err.message);
      setVibeScores({});
    });

    return () => unsubVibe();
  }, [user, activeCarnivalId, isDemoMode, db]);

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
    setToastMessage(`Swapped to ${alert.suggestedEvent.title} 🔥`);
  };

  const dismissVibeAlert = () => setVibeAlert(null);

  return { vibeAlert, handleVibeSwap, dismissVibeAlert };
}
