import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot, Timestamp, query, collection, where, getDocs } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

import app, { setAnalyticsUser } from '../firebase';
import { supabase } from '../supabaseClient';
import { useFirestoreDoc } from './useFirestoreSWR';
import { appId } from '../appConstants';

export function useAuth({ auth, db }) {
  const [user, setUser] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [userMode, setUserMode] = useState('masquerader');
  const [isPremium, setIsPremium] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEmailAuth, setShowEmailAuth] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [bandProfile, setBandProfile] = useState(null);
  const [officialPurchases, setOfficialPurchases] = useState([]);

  // 2. Auth Listener
  useEffect(() => {
    if (isDemoMode) return;

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        console.log('[Analytics] Creating/updating user doc for:', u.uid, u.email);
        setAnalyticsUser(u.uid, {
          email: u.email || '',
          displayName: u.displayName || ''
        });

        try {
          const userDocRef = doc(db, 'users', u.uid);
          await setDoc(userDocRef, {
            lastLoginAt: Timestamp.now(),
            email: u.email || null,
            displayName: u.displayName || null,
          }, { merge: true });
          console.log('[Analytics] User document updated successfully');

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setDoc(userDocRef, {
                  lastLocation: { lat: latitude, lng: longitude },
                  lastLocationAt: Timestamp.now()
                }, { merge: true }).then(() => console.log('Location saved')).catch(e => console.error("Loc save error", e));
              },
              (error) => {
                console.log("Geolocation denied/error:", error.message);
              }
            );
          }

          const ensureWalletFn = httpsCallable(getFunctions(app), 'ensureWallet');
          ensureWalletFn({}).then((result) => {
            const { walletAddress, isNew } = result.data;
            if (isNew) {
              console.log('[Web3] 🎉 Generated new carnival wallet:', walletAddress);
            } else {
              console.log('[Web3] Wallet exists:', walletAddress);
            }
          }).catch((err) => {
            console.warn('[Web3] Auto-wallet skipped:', err.message);
          });
        } catch (err) {
          console.error('[Analytics] Failed to update user doc:', err.code, err.message);
        }
      } else {
        setAnalyticsUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db, isDemoMode]);

  // 3. Premium Check
  useEffect(() => {
    if (!user) {
      if (!isDemoMode) setIsPremium(false);
      return;
    }

    if (isDemoMode) {
      setIsPremium(true);
      return;
    }

    const premiumEmails = ['djkrss1@gmail.com', 'maikacooke@gmail.com'];
    if (premiumEmails.includes(user.email)) {
      setIsPremium(true);
    }

    const appRef = doc(db, 'users', user.uid, 'apps', appId);
    const unsub = onSnapshot(appRef, (snap) => {
      if (premiumEmails.includes(user.email)) {
        setIsPremium(true);
        return;
      }

      if (snap.exists()) {
        const data = snap.data();
        setIsPremium(!!data.premiumActive);
      } else {
        setIsPremium(false);
      }
    });
    return () => unsub();
  }, [user, isDemoMode, db]);

  // 3b. Admin Role Check
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const checkAdmin = async () => {
      if (isDemoMode) {
        setIsAdmin(true);
        return;
      }

      const SUPER_ADMINS = [
        'djkrss1@gmail.com', 
        'info@moymeetsworld.com', 
        'moymeetsworld@gmail.com',
        'defoursemoy@gmail.com',
        'info@moysworld.com'
      ];
      const email = (user.email || '').toLowerCase();
      if (SUPER_ADMINS.includes(email)) {
        setIsAdmin(true);
        return;
      }

      try {
        const adminRef = doc(db, 'admins', user.uid);
        const adminSnap = await getDoc(adminRef);
        setIsAdmin(adminSnap.exists());
      } catch (err) {
        console.error("Admin check failed:", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user, isDemoMode, db]);

  const fetchBandProfile = async () => {
    if (!user || isDemoMode) {
      setBandProfile(null);
      return;
    }
    try {
      const { data } = await supabase
        .from('band_profiles')
        .select('status')
        .eq('id', user.uid)
        .single();
      setBandProfile(data || null);
    } catch (e) {
      console.error("Error fetching band profile:", e);
      setBandProfile(null);
    }
  };

  // 4b. Load User Profile
  const { data: swrProfile } = useFirestoreDoc(
    user && !isDemoMode ? `userProfiles/${user.uid}` : null
  );
  useEffect(() => {
    if (!user || isDemoMode) {
      setUserProfile(null);
      setOfficialPurchases([]);
      setBandProfile(null);
      return;
    }
    if (swrProfile) {
      setUserProfile(swrProfile);
    }

    fetchBandProfile();

    const fetchPurchases = async () => {
      try {
        const q = query(collection(db, 'marketplaceOrders'), where('buyerId', '==', user.uid), where('category', '==', 'costume'));
        const snap = await getDocs(q);
        const purchases = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setOfficialPurchases(purchases);
      } catch (e) {
        console.error("Error fetching purchases for profile", e);
      }
    };
    fetchPurchases();
  }, [user, isDemoMode, swrProfile, db]);

  const handleTryDemo = async ({ setCarnivals, setActiveCarnivalId, setSquadMembers, setShowLanding, setSharedCarnivalData }) => {
    const { DEMO_USER, DEMO_CARNIVALS, DEMO_SQUAD } = await import('../demoData');
    setIsDemoMode(true);
    setUser(DEMO_USER);
    setCarnivals(DEMO_CARNIVALS);
    setActiveCarnivalId('trinidad');
    setSquadMembers(DEMO_SQUAD);
    setIsPremium(true);
    setShowLanding(false);
    setSharedCarnivalData(DEMO_CARNIVALS.trinidad);
  };

  const handleExitDemo = ({ setCarnivals, setActiveCarnivalId, setSquadMembers, setShowLanding, setSharedCarnivalData }) => {
    setIsDemoMode(false);
    setUser(null);
    setCarnivals({});
    setActiveCarnivalId(null);
    setSquadMembers([]);
    setIsPremium(false);
    setShowLanding(true);
    setSharedCarnivalData(null);
  };

  const handleSignOut = async ({ setShowLanding, setRoadMode, setActiveTab, setDarkMode }) => {
    if (Capacitor.isNativePlatform()) {
      await FirebaseAuthentication.signOut().catch(() => {});
    }
    await firebaseSignOut(auth);
    setShowLanding(true);
    setRoadMode(false);
    setActiveTab('Budget');
    setDarkMode(true);
    localStorage.removeItem('actCvnId');
  };

  return {
    user, setUser,
    isDemoMode, setIsDemoMode,
    userMode, setUserMode,
    isPremium, setIsPremium,
    isAdmin, setIsAdmin,
    showEmailAuth, setShowEmailAuth,
    userProfile, setUserProfile,
    bandProfile, setBandProfile,
    officialPurchases, setOfficialPurchases,
    handleSignOut,
    handleTryDemo,
    handleExitDemo
  };
}
