import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { appId } from '../appConstants';

export function useCarnivalData({ user, isDemoMode, db }) {
  const [carnivals, setCarnivals] = useState({});
  const [activeCarnivalId, setActiveCarnivalId] = useState(() => {
    return localStorage.getItem('actCvnId') || null;
  });

  // 4. Load Carnivals
  useEffect(() => {
    if (!user) {
      if (!isDemoMode) {
        setCarnivals({});
      }
      return;
    }

    if (isDemoMode) return; // Loaded in handleTryDemo

    const carnivalsRef = collection(db, 'users', user.uid, 'apps', appId, 'carnivals');
    const unsubscribe = onSnapshot(carnivalsRef, (snapshot) => {
      const map = {};
      snapshot.forEach((docSnap) => {
        map[docSnap.id] = docSnap.data();
      });
      setCarnivals(map);
    });
    return () => unsubscribe();
  }, [user, isDemoMode, db]);

  // 4a. Auto-Heal: Ensure activeCarnivalId is always valid if user has carnivals
  useEffect(() => {
    if (!user || isDemoMode) return;
    const carnivalIds = Object.keys(carnivals);
    if (carnivalIds.length > 0) {
      if (
        activeCarnivalId === null ||
        activeCarnivalId === 'null' ||
        !carnivals[activeCarnivalId]
      ) {
        const firstValidId = carnivalIds[0];
        console.log('[Auto-Heal] Selecting valid carnival ID:', firstValidId);
        setActiveCarnivalId(firstValidId);
        localStorage.setItem('actCvnId', firstValidId);
      }
    }
  }, [carnivals, activeCarnivalId, user, isDemoMode]);

  return {
    carnivals,
    setCarnivals,
    activeCarnivalId,
    setActiveCarnivalId,
  };
}
