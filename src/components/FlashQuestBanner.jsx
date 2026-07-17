import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Zap, MapPin, Clock, Trophy } from 'lucide-react';

export default function FlashQuestBanner({ onQuestClick }) {
  const [activeQuests, setActiveQuests] = useState([]);

  useEffect(() => {
    // Listen for unexpired active quests
    const q = query(
      collection(db, 'flashQuests'),
      where('expiresAt', '>', new Date())
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const quests = [];
      snapshot.forEach((doc) => {
        quests.push({ id: doc.id, ...doc.data() });
      });
      setActiveQuests(quests);
    }, (error) => {
      console.error("Error fetching flash quests:", error);
    });

    return () => unsubscribe();
  }, []);

  if (activeQuests.length === 0) return null;

  const currentQuest = activeQuests[0]; // Display the first active quest

  return (
    <div 
      onClick={() => onQuestClick && onQuestClick(currentQuest)}
      className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg text-white animate-fadeIn cursor-pointer"
    >
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      {/* Animated shine effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-[shine_3s_infinite]" />
      
      <div className="relative z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm animate-pulse">
            <Zap className="w-5 h-5 text-yellow-100" />
          </div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider text-white drop-shadow-sm flex items-center gap-1.5">
              Flash Quest Active
              <span className="bg-red-500 text-[9px] px-1.5 py-0.5 rounded-sm animate-pulse">LIVE</span>
            </h3>
            <p className="text-xs font-medium text-orange-50 mt-0.5 truncate max-w-[200px]">
              {currentQuest.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1 text-xs text-orange-100 mb-0.5">
              <Trophy className="w-3 h-3" /> Reward
            </div>
            <div className="font-bold text-sm">+{currentQuest.rewardCredits} Credits</div>
          </div>
          
          <div className="bg-black/20 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-orange-200" />
              <span>Ends Soon</span>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
      `}} />
    </div>
  );
}
