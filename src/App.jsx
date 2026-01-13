import React, { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  getRedirectResult,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app, { auth, db, requestNotificationPermission, onForegroundMessage } from './firebase';
import logo from './assets/carnival-logo.png';
import { carnivalData } from './carnivals';
import FeteMap from './components/FeteMap';
import SquadChat from './components/SquadChat';
import MediaVault from './components/MediaVault';
import VibesPlayer from './components/VibesPlayer';
import PromoAd from './components/PromoAd';
import AdManager from './components/AdManager';
import AdminAnalytics from './components/AdminAnalytics';
import SplashPage from './components/SplashPage';
import { PrivacyPolicy, TermsOfService, CookiePolicy, RefundPolicy } from './components/LegalPages';
import InstallPrompt from './components/InstallPrompt';
import { ContactPage, SupportAdmin } from './components/ContactSupport';
import AccountSettings from './components/AccountSettings';
import SocaPassportTab from './components/SocaPassportTab';
import HomeHub from './components/HomeHub';

import EmailAuthForm, { EmailVerificationBanner } from './components/EmailAuthForm';
import { createSquad, joinSquadByCode, leaveSquad } from './services/squadService'; // Squad Service

// --- CONFIGURATION ---
const appId = 'carnival-planner-v1';

// ✅ STRIPE PRICE IDs (Updated from your request)
const STRIPE_MONTHLY_PRICE_ID = 'price_1SanHUJR9xpdRiXijLesRPVt';
const STRIPE_YEARLY_PRICE_ID = 'price_1SanMhJR9xpdRiXinv2F9knM';

// Curated Fete Database (Free for all users)
const POPULAR_EVENTS = {
  trinidad: [
    { title: "Soca Brainwash", note: "The main event. Bring drinks." },
    { title: "AM Bush", note: "J'ouvert style. Wear old clothes." },
    { title: "Phuket", note: "All inclusive." },
    { title: "Soaka Street Festival", note: "Iron park." },
  ],
  stlucia: [
    { title: "Remedy", note: "Beachside." },
    { title: "Mess", note: "Paint and Powder." },
    { title: "Indulgence", note: "Breakfast fete." },
  ],
  default: [
    { title: "Catamaran Cruise", note: "Boat ride." },
    { title: "J'ouvert", note: "Paint and powder." },
    { title: "Monday Mas", note: "On the road." },
  ]
};

export default function App() {
  // --- STATE ---
  const [user, setUser] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false); // NEW: Demo Mode State

  // Data
  const [carnivals, setCarnivals] = useState({});
  const [activeCarnivalId, setActiveCarnivalId] = useState(null);
  const [activeTab, setActiveTab] = useState('Budget');

  // UI State
  const [isPremium, setIsPremium] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [roadMode, setRoadMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Form Inputs
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCost, setNewBudgetCost] = useState('');
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleNote, setNewScheduleNote] = useState('');
  const [newPackingItem, setNewPackingItem] = useState('');

  // Squad & Costume Forms
  const [newSquadMember, setNewSquadMember] = useState('');
  const [costumeDetails, setCostumeDetails] = useState({ band: '', section: '', total: '', paid: '' });

  // Squad Sharing State
  const [squadShareCode, setSquadShareCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [squadMembers, setSquadMembers] = useState([]); // Array of member objects
  const [currentSquad, setCurrentSquad] = useState(null); // Full squad object
  const [isCreatingShare, setIsCreatingShare] = useState(false);
  const [isJoiningSquad, setIsJoiningSquad] = useState(false);
  const [squadShareError, setSquadShareError] = useState('');
  const [squadShareSuccess, setSquadShareSuccess] = useState('');

  // Import Demo Data
  // NOTE: In a real build, we might want to lazy load this, but for now standard import is fine.
  // We'll rely on the file existing.

  // --- DEMO MODE HANDLERS ---
  const handleTryDemo = async () => {
    // Dynamically import demo data to avoid bundling unless needed (optimisation)
    const { DEMO_USER, DEMO_CARNIVALS, DEMO_SQUAD } = await import('./demoData');

    setIsDemoMode(true);
    setUser(DEMO_USER);
    setCarnivals(DEMO_CARNIVALS);
    setActiveCarnivalId('trinidad'); // Default to Trinidad
    setSquadMembers(DEMO_SQUAD);
    setIsPremium(true); // Let them experience premium features
    setShowLanding(false);

    // Set some demo specific state
    setSharedCarnivalData(DEMO_CARNIVALS.trinidad); // Simulate squad mode
  };

  const handleExitDemo = () => {
    setIsDemoMode(false);
    setUser(null);
    setCarnivals({});
    setActiveCarnivalId(null);
    setSquadMembers([]);
    setIsPremium(false);
    setShowLanding(true);
    setSharedCarnivalData(null);
  };

  // Auto-start demo if ?demo=true param is present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === 'true') {
      handleTryDemo();
    }
  }, []);

  // --- EXISTING HANDLERS MODIFIED FOR DEMO ---

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

      if (!squad) throw new Error("Join successful but no squad data returned");

      setSquadShareSuccess(`Joined ${squad.name || 'Squad'}!`);
      // Realtime listener in useEffect will pick up the rest
      setJoinCode('');
    } catch (error) {
      console.error("Error joining squad:", error);
      setSquadShareError(error.message || 'Invalid code');
    } finally {
      setIsJoiningSquad(false);
    }
  };

  // SQUAD: Handle Leave
  const handleLeaveSquad = async () => {
    if (isDemoMode) {
      if (confirm("Exit Demo Mode?")) handleExitDemo();
      return;
    }
    if (!user || !currentSquad) return;
    if (confirm("Are you sure you want to leave this squad?")) {
      await leaveSquad(user, currentSquad.id);
      setCurrentSquad(null);
      setSquadMembers([]);
    }
  };

  // Notification State
  const [toastMessage, setToastMessage] = useState(null);
  const [notifySquadOnRoadReady, setNotifySquadOnRoadReady] = useState(true);
  const [isSendingRoadReadyAlert, setIsSendingRoadReadyAlert] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Legal Pages State
  const [activeLegalPage, setActiveLegalPage] = useState(null);

  // Email Auth State
  const [showEmailAuth, setShowEmailAuth] = useState(false);

  // Scraped Events State (Premium Feature)
  const [scrapedEvents, setScrapedEvents] = useState([]);
  const [isLoadingScrapedEvents, setIsLoadingScrapedEvents] = useState(false);
  const [scrapedEventsLastUpdated, setScrapedEventsLastUpdated] = useState(null);

  // --- CONFIG ---
  const carnivalOptions = [
    { id: 'stkitts-sugar-mas', name: 'St. Kitts (Sugar Mas)', monthIndex: 0 },
    { id: 'stcroix', name: 'St. Croix Carnival', monthIndex: 0 },
    { id: 'trinidad', name: 'Trinidad Carnival', monthIndex: 1 },
    { id: 'dominica', name: 'Dominica (Mas Domnik)', monthIndex: 1 },
    { id: 'jamaica', name: 'Jamaica Carnival', monthIndex: 3 },
    { id: 'tampa', name: 'Tampa Bay Carnival', monthIndex: 3 },
    { id: 'stmaarten', name: 'St. Maarten Carnival', monthIndex: 3 },
    { id: 'cayman-batabano', name: 'Cayman Batabano', monthIndex: 4 },
    { id: 'stthomas', name: 'St. Thomas Carnival', monthIndex: 4 },
    { id: 'guyana', name: 'Guyana Independence', monthIndex: 4 },
    { id: 'bahamas', name: 'Bahamas Carnival', monthIndex: 5 },
    { id: 'bermuda', name: 'Bermuda Carnival', monthIndex: 5 },
    { id: 'hollywood', name: 'Hollywood Carnival', monthIndex: 5 },
    { id: 'caymas', name: 'Caymas Carnival', monthIndex: 5 },
    { id: 'vincymas', name: 'St. Vincent (Vincy Mas)', monthIndex: 6 },
    { id: 'stlucia', name: 'St. Lucia Carnival', monthIndex: 6 },
    { id: 'toronto', name: 'Toronto (Caribana)', monthIndex: 7 },
    { id: 'barbados', name: 'Barbados Crop Over', monthIndex: 7 },
    { id: 'nevis', name: 'Nevis Culturama', monthIndex: 7 },
    { id: 'antigua', name: 'Antigua Carnival', monthIndex: 7 },
    { id: 'grenada', name: 'Grenada Spicemas', monthIndex: 7 },
    { id: 'ny-labor-day', name: 'New York Carnival', monthIndex: 8 },
    { id: 'japan', name: 'Japan Caribbean', monthIndex: 8 },
    { id: 'miami', name: 'Miami Carnival', monthIndex: 9 },
    { id: 'tobago', name: 'Tobago Carnival', monthIndex: 10 },
  ];

  const gradientClasses = [
    'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
    'bg-gradient-to-r from-teal-400 to-cyan-500',
    'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500',
    'bg-gradient-to-r from-purple-600 to-indigo-600',
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // --- EFFECTS ---

  // 1. Dark Mode - Apply to DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 1b. Load and persist theme preference per user
  useEffect(() => {
    if (!user || isDemoMode) return;

    const loadThemePreference = async () => {
      try {
        const userPrefsRef = doc(db, 'users', user.uid, 'preferences', 'theme');
        const prefSnap = await getDoc(userPrefsRef);
        if (prefSnap.exists()) {
          const data = prefSnap.data();
          if (typeof data.darkMode === 'boolean') {
            setDarkMode(data.darkMode);
          }
        }
      } catch (err) {
        console.log('Could not load theme preference:', err);
      }
    };

    loadThemePreference();
  }, [user, isDemoMode]);

  // 1c. Save theme preference when it changes
  const saveThemePreference = async (isDark) => {
    if (!user || isDemoMode) return;
    try {
      const userPrefsRef = doc(db, 'users', user.uid, 'preferences', 'theme');
      await setDoc(userPrefsRef, { darkMode: isDark, updatedAt: Timestamp.now() }, { merge: true });
    } catch (err) {
      console.log('Could not save theme preference:', err);
    }
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    saveThemePreference(newValue);
  };

  // 2. Auth Listener - Also creates/updates user document for analytics
  useEffect(() => {
    // If we're in demo mode, ignore standard auth listener
    if (isDemoMode) return;

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      // Create/update user document for admin analytics tracking
      if (u) {
        console.log('[Analytics] Creating/updating user doc for:', u.uid, u.email);

        // Use setDoc with merge - works offline and syncs when online
        // No need for getDoc first - merge handles both create and update
        try {
          const userDocRef = doc(db, 'users', u.uid);
          await setDoc(userDocRef, {
            lastLoginAt: Timestamp.now(),
            email: u.email || null,
            displayName: u.displayName || null,
          }, { merge: true });
          console.log('[Analytics] User document updated successfully');
        } catch (err) {
          console.error('[Analytics] Failed to update user doc:', err.code, err.message);
        }
      }
    });
    return () => unsubscribe();
  }, [isDemoMode]);

  // --- EFFECT: SQUAD SUBSCRIPTION ---
  useEffect(() => {
    if (!user) {
      // Don't clear if demo mode, cause that wipes our fake squad
      if (!isDemoMode) {
        setCurrentSquad(null);
        setSquadMembers([]);
      }
      return;
    }

    if (isDemoMode) return; // Bypass Firestore listeners in demo mode

    // Listen to user profile for currentSquadId changes
    const unsubUser = onSnapshot(doc(db, 'users', user.uid), (uDoc) => {
      const uData = uDoc.data();
      if (uData?.currentSquadId) {
        // Subscribe to that squad
        const unsubSquad = onSnapshot(doc(db, 'squads', uData.currentSquadId), (sSnap) => {
          if (sSnap.exists()) {
            const sData = sSnap.data();
            setCurrentSquad({ id: sSnap.id, ...sData });

            // ⚡ REALTIME SYNC: Update shared data instantly from listener
            setSharedCarnivalData(sData);

            // Convert memberDetails map to array for UI
            const membersList = Object.values(sData.memberDetails || {});
            setSquadMembers(membersList);
            setSquadShareCode(sData.inviteCode);
          } else {
            setCurrentSquad(null); // Squad was deleted
            setSharedCarnivalData(null);
            setSquadMembers([]);
          }
        });
        // We need to return this unsub to clean it up, but inside a nested listener it's tricky.
        //Ideally we'd use a separate state 'squadId' to trigger another useEffect.
        // But this pattern works for simple cases if we assume one active squad.
      } else {
        setCurrentSquad(null);
        setSquadMembers([]);
      }
    });

    return () => unsubUser();
  }, [user, isDemoMode]);

  // 3. Premium Check (Firestore + Admin Override)
  useEffect(() => {
    if (!user) {
      if (!isDemoMode) setIsPremium(false);
      return;
    }

    if (isDemoMode) {
      setIsPremium(true); // Always premium in demo
      return;
    }

    // ⭐ SUPERUSER/PREMIUM OVERRIDE: Ensure these emails are always premium
    const premiumEmails = ['djkrss1@gmail.com', 'maikacooke@gmail.com'];
    if (premiumEmails.includes(user.email)) {
      setIsPremium(true);
    }

    const appRef = doc(db, 'users', user.uid, 'apps', appId);
    const unsub = onSnapshot(appRef, (snap) => {
      // If user is in the premium override list, enforce true regardless of DB
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
  }, [user, isDemoMode]);

  // 4. Load Carnivals
  useEffect(() => {
    if (!user) {
      if (!isDemoMode) {
        setCarnivals({});
        setActiveCarnivalId(null);
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
      if (!activeCarnivalId && snapshot.docs.length > 0) {
        setActiveCarnivalId(snapshot.docs[0].id);
      }
    });
    return () => unsubscribe();
  }, [user, isDemoMode]);

  useEffect(() => {
    if (!isDemoMode) {
      getRedirectResult(auth).catch((err) => console.error(err));
    }
  }, [isDemoMode]);

  // 5. Request notification permission and save FCM token
  useEffect(() => {
    if (!user || isDemoMode) return; // Skip in demo

    const setupNotifications = async () => {
      try {
        const vapidKey = 'BLbW7EjHjQ9_YjKrRbJwgBgRqnkSmZsXMnEWTQZpqYwSRbVgYLmXW5RvXA2_aS3vH9XJpCxHu4VmXnZL2wQxMvI';
        const token = await requestNotificationPermission(vapidKey);

        if (token) {
          const functions = getFunctions(app);
          const saveFcmToken = httpsCallable(functions, 'saveFcmToken');
          await saveFcmToken({ fcmToken: token });
          console.log('FCM token saved');
        }
      } catch (err) {
        console.log('Error setting up notifications:', err);
      }
    };

    setupNotifications();

    onForegroundMessage((payload) => {
      console.log('Foreground message:', payload);
      setToastMessage({
        title: payload.notification?.title || 'Squad Alert',
        body: payload.notification?.body || 'Someone in your squad is Road Ready!'
      });
      setTimeout(() => setToastMessage(null), 5000);
    });
  }, [user, isDemoMode]);

  // --- ACTIONS ---

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  const handleSignOut = async () => {
    if (isDemoMode) {
      handleExitDemo();
      return;
    }
    await firebaseSignOut(auth);
    setShowLanding(true);
    setRoadMode(false);
    setActiveTab('Budget');
    setDarkMode(true);
  };

  // --- STRIPE SUBSCRIPTION ---
  const handleSubscribe = async (interval) => {
    if (isDemoMode) {
      alert("Subscriptions are disabled in Demo Mode.");
      return;
    }
    if (!user) {
      alert("You must be signed in to subscribe.");
      return;
    }

    // Determine the Price ID
    const billingInterval = interval === "yearly" ? "yearly" : "monthly";
    const priceId = billingInterval === "yearly" ? STRIPE_YEARLY_PRICE_ID : STRIPE_MONTHLY_PRICE_ID;

    // Safety Check
    if (!priceId) {
      console.error("Price ID missing for interval:", billingInterval);
      alert("Premium pricing configuration error. Please contact support.");
      return;
    }

    setIsCheckingOut(true);

    try {
      // ✅ Explicitly use 'app' to ensure correct instance
      const functions = getFunctions(app);
      const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");

      console.log(`Starting checkout... Interval: ${billingInterval}, PriceID: ${priceId}`);

      // ✅ Send success_url and cancel_url
      const result = await createCheckoutSession({
        priceId: priceId, // Ensure key is explicitly 'priceId'
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });

      const { data } = result || {};

      if (data && (data.url || data.checkoutUrl)) {
        window.location.href = data.url || data.checkoutUrl;
      } else {
        console.error("No checkout URL returned:", data);
        alert("Unable to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error starting checkout:", error);
      alert("There was a problem starting your checkout: " + error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const selectCarnival = async (id, name) => {
    if (!user) return;
    setActiveCarnivalId(id);

    if (isDemoMode) {
      // If they select a carnival not in our demo data, just initialize empty
      if (!carnivals[id]) {
        setCarnivals(prev => ({
          ...prev,
          [id]: {
            name,
            budget: [],
            schedule: [],
            packing: [],
            squad: [],
            costume: null,
            createdAt: new Date().toISOString()
          }
        }));
        setSharedCarnivalData(null); // Switching away from the shared demo one
      } else if (id === 'trinidad' && carnivals['trinidad']) {
        // If going back to demo trinidad, re-enable shared data view
        setSharedCarnivalData(carnivals['trinidad']);
      } else {
        setSharedCarnivalData(null);
      }
      return;
    }

    if (!carnivals[id]) {
      try {
        const ref = doc(db, 'users', user.uid, 'apps', appId, 'carnivals', id);
        await setDoc(ref, {
          name,
          budget: [],
          schedule: [],
          packing: [],
          squad: [],
          costume: null,
          createdAt: Timestamp.now(),
        }, { merge: true });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Check if current carnival has shared data (is part of a squad)
  const currentSharedPlanId = carnivals[activeCarnivalId]?.sharedPlanId;
  const isCollaborative = !!currentSharedPlanId;

  // State for shared collaborative data
  const [sharedCarnivalData, setSharedCarnivalData] = useState(null);
  const [loadingSharedData, setLoadingSharedData] = useState(false);

  // Load shared carnival data when in a squad
  const loadSharedCarnivalData = async () => {
    if (isDemoMode) return; // Handled in selectCarnival for demo

    if (!currentSharedPlanId || !user) {
      setSharedCarnivalData(null);
      return;
    }

    setLoadingSharedData(true);
    try {
      const functions = getFunctions(app);
      const getSharedData = httpsCallable(functions, 'getSharedCarnivalData');
      const result = await getSharedData({
        planId: currentSharedPlanId,
        uid: user.uid
      });
      setSharedCarnivalData(result.data);
    } catch (err) {
      console.log('Could not load shared carnival data:', err.message);
      setSharedCarnivalData(null);
    } finally {
      setLoadingSharedData(false);
    }
  };

  // Reload shared data when carnival changes
  useEffect(() => {
    if (currentSharedPlanId && !isDemoMode) {
      loadSharedCarnivalData();
    } else if (!isDemoMode) {
      setSharedCarnivalData(null);
    }
  }, [currentSharedPlanId, user, isDemoMode]);

  // Update carnival data - uses shared data if in a squad, otherwise personal data
  const updateCarnivalData = async (field, newData, action = 'set') => {
    if (!user || !activeCarnivalId) return;

    // --- DEMO MODE UPDATE LOGIC ---
    if (isDemoMode) {
      // Helper to update local state in demo mode
      const updateLocal = (targetData) => {
        let updatedFieldData = newData;
        if (action === 'add' && Array.isArray(targetData[field])) {
          updatedFieldData = [...(targetData[field] || []), ...newData];
        } else if (action === 'remove' && Array.isArray(targetData[field])) {
          updatedFieldData = (targetData[field] || []).filter(i => i.id !== newData.id);
        } else if (action === 'update' && Array.isArray(targetData[field])) { // Handle togglePacking
          // newData here is likely the whole array from togglePackingItem logic below, 
          // OR it's a specific item if we were consistent.
          // Let's protect against the inconsistent usage in the helper functions below.
          // Actually, togglePackingItem in helper passes the FULL array for 'update' in non-collaborative, 
          // but passes {id, checked} for 'update' in collaborative.
          // We are mimicking collaborative mostly.
          if (newData.id !== undefined) {
            // Collaborative style update single item params
            updatedFieldData = (targetData[field] || []).map(i => i.id === newData.id ? { ...i, ...newData } : i);
          }
        }

        // If we entered here with a full array replacement (standard non-collab set), just use newData
        if (action === 'set') updatedFieldData = newData;

        return {
          ...targetData,
          [field]: updatedFieldData
        };
      };

      if (isCollaborative) {
        setSharedCarnivalData(prev => updateLocal(prev));
        // Also update the base carnival to keep in sync somewhat
        setCarnivals(prev => ({
          ...prev,
          [activeCarnivalId]: updateLocal(prev[activeCarnivalId])
        }));
      } else {
        setCarnivals(prev => ({
          ...prev,
          [activeCarnivalId]: updateLocal(prev[activeCarnivalId])
        }));
      }
      return;
    }
    // --- END DEMO MODE ---

    // If this is a shared carnival, update the shared data
    if (currentSharedPlanId && ['budget', 'schedule', 'packing', 'costume', 'squad'].includes(field)) {
      try {
        const functions = getFunctions(app);
        const updateSharedData = httpsCallable(functions, 'updateSharedCarnivalData');
        const result = await updateSharedData({
          planId: currentSharedPlanId,
          field,
          data: newData,
          action,
          uid: user.uid,
          userEmail: user.email
        });

        // Update local shared data state
        if (result.data?.data) {
          setSharedCarnivalData(result.data.data);
        }
        return;
      } catch (err) {
        console.error('Error updating shared data:', err);
        // Fall back to personal data
      }
    }

    // Update personal carnival data
    const ref = doc(db, 'users', user.uid, 'apps', appId, 'carnivals', activeCarnivalId);
    await updateDoc(ref, { [field]: newData });
  };


  // Helper to get current carnival data - prefers shared data if available
  const getCurrentCarnivalData = (field) => {
    if (isCollaborative && sharedCarnivalData && sharedCarnivalData[field] !== undefined) {
      return sharedCarnivalData[field];
    }
    return carnivals[activeCarnivalId]?.[field];
  };

  // Fetch scraped events for premium users when carnival changes (via Cloud Function)
  useEffect(() => {
    if (!user || !activeCarnivalId || !isPremium) {
      setScrapedEvents([]);
      return;
    }

    const fetchScrapedEvents = async () => {
      setIsLoadingScrapedEvents(true);
      try {
        const functions = getFunctions(app);
        const getScrapedEvents = httpsCallable(functions, 'getScrapedEvents');
        const result = await getScrapedEvents({ carnivalId: activeCarnivalId });

        if (result.data?.success) {
          setScrapedEvents(result.data.events || []);
          setScrapedEventsLastUpdated(result.data.lastScrapedAt);
        } else {
          setScrapedEvents([]);
          setScrapedEventsLastUpdated(null);
        }
      } catch (err) {
        console.log('Error fetching scraped events:', err);
        setScrapedEvents([]);
      } finally {
        setIsLoadingScrapedEvents(false);
      }
    };

    fetchScrapedEvents();
  }, [user, activeCarnivalId, isPremium]);

  // --- FEATURE HANDLERS ---

  const toggleRoadMode = async () => {
    setRoadMode(true);

    if (isPremium && notifySquadOnRoadReady && currentCarnival) {
      setIsSendingRoadReadyAlert(true);
      try {
        const functions = getFunctions(app);
        const sendRoadReadyAlert = httpsCallable(functions, 'sendRoadReadyAlert');
        const result = await sendRoadReadyAlert({
          carnivalId: activeCarnivalId,
          carnivalName: currentCarnival.name,
          userName: user?.displayName || user?.email?.split('@')[0] || 'Squad Member'
        });

        if (result.data?.notified > 0) {
          setToastMessage({
            title: 'Squad Notified!',
            body: `${result.data.notified} squad member(s) alerted that you're Road Ready!`
          });
          setTimeout(() => setToastMessage(null), 5000);
        }
      } catch (err) {
        console.log('Error sending Road Ready alert:', err);
      } finally {
        setIsSendingRoadReadyAlert(false);
      }
    }
  };

  const addBudgetItem = () => {
    if (!newBudgetName.trim() || !newBudgetCost) return;
    const newItem = { id: Date.now().toString(), name: newBudgetName.trim(), cost: parseFloat(newBudgetCost) };

    if (isCollaborative) {
      updateCarnivalData('budget', [newItem], 'add');
    } else {
      const items = carnivals[activeCarnivalId]?.budget || [];
      updateCarnivalData('budget', [...items, newItem]);
    }
    setNewBudgetName('');
    setNewBudgetCost('');
  };
  const removeBudgetItem = (id) => {
    if (isCollaborative) {
      updateCarnivalData('budget', { id }, 'remove');
    } else {
      const items = carnivals[activeCarnivalId]?.budget || [];
      updateCarnivalData('budget', items.filter(i => i.id !== id));
    }
  };

  const addScheduleItem = () => {
    if (!newScheduleName.trim() || !newScheduleDate) return;
    const newItem = {
      id: Date.now().toString(),
      title: newScheduleName.trim(),
      datetime: newScheduleDate,
      note: newScheduleNote.trim()
    };

    if (isCollaborative) {
      updateCarnivalData('schedule', [newItem], 'add');
    } else {
      const items = carnivals[activeCarnivalId]?.schedule || [];
      updateCarnivalData('schedule', [...items, newItem]);
    }
    setNewScheduleName('');
    setNewScheduleDate('');
    setNewScheduleNote('');
  };
  const removeScheduleItem = (id) => {
    if (isCollaborative) {
      updateCarnivalData('schedule', { id }, 'remove');
    } else {
      const items = carnivals[activeCarnivalId]?.schedule || [];
      updateCarnivalData('schedule', items.filter(i => i.id !== id));
    }
  };

  const addCuratedEvent = (evt) => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 1);
    defaultDate.setHours(12, 0, 0, 0);
    const dateStr = defaultDate.toISOString().slice(0, 16);

    const newItem = {
      id: Date.now().toString(),
      title: evt.title,
      datetime: dateStr,
      note: evt.note || "Added from curated list"
    };

    if (isCollaborative) {
      updateCarnivalData('schedule', [newItem], 'add');
    } else {
      const items = carnivals[activeCarnivalId]?.schedule || [];
      updateCarnivalData('schedule', [...items, newItem]);
    }
  };

  const addPackingItem = () => {
    if (!newPackingItem.trim()) return;
    const newItem = { id: Date.now().toString(), item: newPackingItem.trim(), checked: false };

    if (isCollaborative) {
      updateCarnivalData('packing', [newItem], 'add');
    } else {
      const items = carnivals[activeCarnivalId]?.packing || [];
      updateCarnivalData('packing', [...items, newItem]);
    }
    setNewPackingItem('');
  };
  const togglePackingItem = (id) => {
    const items = isCollaborative
      ? (sharedCarnivalData?.packing || [])
      : (carnivals[activeCarnivalId]?.packing || []);
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (isCollaborative) {
      updateCarnivalData('packing', { id, checked: !item.checked }, 'update');
    } else {
      updateCarnivalData('packing', items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
    }
  };
  const removePackingItem = (id) => {
    if (isCollaborative) {
      updateCarnivalData('packing', { id }, 'remove');
    } else {
      const items = carnivals[activeCarnivalId]?.packing || [];
      updateCarnivalData('packing', items.filter(i => i.id !== id));
    }
  };

  const addSquadMember = () => {
    if (!newSquadMember.trim()) return;
    const newItem = { id: Date.now().toString(), name: newSquadMember.trim() };

    if (isCollaborative) {
      updateCarnivalData('squad', [newItem], 'add');
    } else {
      const items = carnivals[activeCarnivalId]?.squad || [];
      updateCarnivalData('squad', [...items, newItem]);
    }
    setNewSquadMember('');
  };
  const removeSquadMember = (id) => {
    if (isCollaborative) {
      updateCarnivalData('squad', { id }, 'remove');
    } else {
      const items = carnivals[activeCarnivalId]?.squad || [];
      updateCarnivalData('squad', items.filter(i => i.id !== id));
    }
  };

  // Squad Sharing Functions
  const createSquadShareCode = async () => {
    const carnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
    if (!activeCarnivalId || !carnival) return;
    setIsCreatingShare(true);
    setSquadShareError('');
    try {
      const functions = getFunctions(app);
      const createShare = httpsCallable(functions, 'createSquadShareCode');
      const result = await createShare({
        carnivalId: activeCarnivalId,
        carnivalName: carnival.name,
        uid: user.uid
      });
      setSquadShareCode(result.data.shareCode);
      // Save share code to user's carnival data for persistence
      updateCarnivalData('shareCode', result.data.shareCode);
      updateCarnivalData('sharedPlanId', result.data.planId);
      setSquadShareSuccess('Share code created!');
      // Refresh squad members to show owner
      setTimeout(() => {
        fetchSquadMembers();
        setSquadShareSuccess('');
      }, 1000);
    } catch (err) {
      console.error('Error creating share code:', err);
      setSquadShareError(err.message || 'Failed to create share code');
    } finally {
      setIsCreatingShare(false);
    }
  };

  // Load share code when carnival changes
  useEffect(() => {
    const carnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
    if (carnival?.shareCode) {
      setSquadShareCode(carnival.shareCode);
    } else {
      setSquadShareCode('');
    }
  }, [activeCarnivalId, carnivals]);

  // Fetch squad members from shared plan
  const fetchSquadMembers = async () => {
    const carnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
    if (!carnival?.sharedPlanId || !user) {
      setSquadMembers([]);
      return;
    }

    try {
      const functions = getFunctions(app);
      const getSharedPlan = httpsCallable(functions, 'getSharedPlanData');
      const result = await getSharedPlan({
        planId: carnival.sharedPlanId,
        uid: user.uid
      });

      if (result.data?.members) {
        setSquadMembers(result.data.members);
      }
    } catch (err) {
      console.log('Could not fetch squad members:', err.message);
      setSquadMembers([]);
    }
  };

  // Load squad members when carnival or share code changes
  useEffect(() => {
    if (activeCarnivalId && user) {
      fetchSquadMembers();
    }
  }, [activeCarnivalId, carnivals, user]);

  const joinSquadByCode = async () => {
    if (!joinCode.trim() || joinCode.length !== 6) {
      setSquadShareError('Please enter a valid 6-character code');
      return;
    }
    setIsJoiningSquad(true);
    setSquadShareError('');
    try {
      const functions = getFunctions(app);
      const joinSquad = httpsCallable(functions, 'joinSquadByCode');
      const result = await joinSquad({
        shareCode: joinCode.toUpperCase(),
        uid: user.uid,
        email: user.email
      });
      setSquadShareSuccess(`Joined ${result.data.carnivalName} squad!`);
      setJoinCode('');

      // Persist the planId for the joiner so they can see squad members
      if (result.data.planId) {
        updateCarnivalData('sharedPlanId', result.data.planId);
      }

      // Refresh squad members list after a brief delay for data to persist
      setTimeout(() => {
        fetchSquadMembers();
      }, 500);
      setTimeout(() => setSquadShareSuccess(''), 3000);
    } catch (err) {
      console.error('Error joining squad:', err);
      setSquadShareError(err.message || 'Failed to join squad');
    } finally {
      setIsJoiningSquad(false);
    }
  };

  const copyShareCode = () => {
    if (squadShareCode) {
      navigator.clipboard.writeText(squadShareCode);
      setSquadShareSuccess('Code copied to clipboard!');
      setTimeout(() => setSquadShareSuccess(''), 2000);
    }
  };

  const saveCostume = () => {
    updateCarnivalData('costume', {
      ...costumeDetails,
      total: parseFloat(costumeDetails.total) || 0,
      paid: parseFloat(costumeDetails.paid) || 0,
      updatedAt: Date.now()
    });
    alert('Costume details saved!');
  };

  const handleExport = () => {
    if (!currentCarnival) return;
    const lines = [];
    lines.push(`CARNIVAL PLANNER: ${currentCarnival.name}`);
    lines.push('==========================================\n');
    lines.push(`-- SQUAD --`);
    (currentCarnival.squad || []).forEach(s => lines.push(`- ${s.name}`));
    lines.push('\n');
    lines.push('-- COSTUME --');
    if (currentCarnival.costume) {
      lines.push(`Band: ${currentCarnival.costume.band}`);
      lines.push(`Section: ${currentCarnival.costume.section}`);
      lines.push(`Balance Due: $${((currentCarnival.costume.total || 0) - (currentCarnival.costume.paid || 0)).toFixed(2)}`);
    } else {
      lines.push('No costume details.');
    }
    lines.push('\n');
    lines.push('-- SCHEDULE --');
    const sorted = (currentCarnival.schedule || []).slice().sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    sorted.forEach(s => lines.push(`${new Date(s.datetime).toLocaleString()} | ${s.title}`));

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCarnival.name.replace(/\s+/g, '_')}_Plan.txt`;
    a.click();
  };


  // --- RENDER VARS ---
  const baseCarnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;

  // Merge shared data with local carnival data when in collaborative mode
  const currentCarnival = baseCarnival ? {
    ...baseCarnival,
    // Override with shared data if available
    ...(isCollaborative && sharedCarnivalData ? {
      budget: sharedCarnivalData.budget || baseCarnival.budget || [],
      schedule: sharedCarnivalData.schedule || baseCarnival.schedule || [],
      packing: sharedCarnivalData.packing || baseCarnival.packing || [],
      costume: sharedCarnivalData.costume || baseCarnival.costume,
      squad: sharedCarnivalData.squad || baseCarnival.squad || [],
    } : {})
  } : null;
  const budgetTotal = currentCarnival?.budget?.reduce((acc, item) => acc + (item.cost || 0), 0) || 0;
  const costumeBalance = currentCarnival?.costume ? (currentCarnival.costume.total - currentCarnival.costume.paid) : 0;
  const curatedEvents = currentCarnival ? (POPULAR_EVENTS[activeCarnivalId] || POPULAR_EVENTS.default) : [];

  // --- VIEW: LEGAL PAGES & CONTACT ---
  if (activeLegalPage) {
    const legalProps = { onBack: () => setActiveLegalPage(null), logo };
    switch (activeLegalPage) {
      case 'privacy': return <PrivacyPolicy {...legalProps} />;
      case 'terms': return <TermsOfService {...legalProps} />;
      case 'cookies': return <CookiePolicy {...legalProps} />;
      case 'refund': return <RefundPolicy {...legalProps} />;
      case 'contact': return <ContactPage {...legalProps} user={user} />;
      default: setActiveLegalPage(null);
    }
  }

  // --- VIEW: SPLASH SCREEN ---
  if (showLanding && !user) {
    return <SplashPage onGetStarted={() => setShowLanding(false)} logo={logo} onLegalPage={setActiveLegalPage} onTryDemo={handleTryDemo} />;
  }

  // --- VIEW: ROAD MODE (PREMIUM) ---
  if (user && roadMode && currentCarnival) {
    const nextEvent = (currentCarnival.schedule || [])
      .slice()
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
      .find(e => new Date(e.datetime) > new Date());

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold italic">ROAD MODE</h1>
          <button onClick={() => setRoadMode(false)} className="text-sm bg-gray-800 px-3 py-1 rounded">Exit</button>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl shadow-lg">
            <h2 className="text-sm font-bold opacity-75 uppercase tracking-wider mb-1">Up Next</h2>
            {nextEvent ? (
              <>
                <div className="text-3xl font-black mb-1">{nextEvent.title}</div>
                <div className="text-xl opacity-90">{new Date(nextEvent.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="mt-2 text-sm bg-white/20 inline-block px-2 py-1 rounded">{nextEvent.note || "No notes"}</div>
              </>
            ) : (
              <div className="text-xl italic opacity-75">No more fetes scheduled! Sleep time?</div>
            )}
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-sm font-bold opacity-75 uppercase tracking-wider mb-2">Costume Pickup</h2>
            {currentCarnival.costume ? (
              <div>
                <div className="text-xl font-bold text-yellow-400">{currentCarnival.costume.band}</div>
                <div className="text-gray-400">Section: {currentCarnival.costume.section}</div>
                {costumeBalance > 0 && <div className="text-red-400 font-bold mt-1">Balance Due: ${costumeBalance}</div>}
              </div>
            ) : (
              <div className="text-gray-500 italic">No costume details saved.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: MAIN APP ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-2xl max-w-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold">{toastMessage.title}</p>
                <p className="text-sm opacity-90">{toastMessage.body}</p>
              </div>
              <button onClick={() => setToastMessage(null)} className="ml-2 text-white/70 hover:text-white">×</button>
            </div>
          </div>
        </div>
      )}

      {/* PWA INSTALL PROMPT */}
      <InstallPrompt />

      {/* HEADER */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 flex justify-between items-center sticky top-0 z-20 transition-colors">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-800 dark:text-white hidden sm:block">Carnival Planner</h1>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300">
              {darkMode ? '☀️' : '🌙'}
            </button>
            {/* Demo Mode Exit Button */}
            {isDemoMode && (
              <button
                onClick={handleExitDemo}
                className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 transition-colors"
              >
                EXIT DEMO
              </button>
            )}

            {currentCarnival && (
              <button
                onClick={toggleRoadMode}
                disabled={isSendingRoadReadyAlert}
                className="px-3 py-1 text-xs font-bold rounded-full transition bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 disabled:opacity-50"
              >
                {isSendingRoadReadyAlert ? '...' : 'GO ROAD READY'}
              </button>
            )}
            {!isPremium ? (
              <span className="text-xs text-gray-400 dark:text-gray-500">Free Plan</span>
            ) : (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-bold">Premium</span>
            )}
            {/* Online/Offline Status */}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOnline ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
              {isOnline ? 'Online' : 'Offline Mode'}
            </div>

            <button onClick={handleSignOut} className="text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400">Sign Out</button>
          </div>
        )}
      </header>

      {/* EMAIL VERIFICATION BANNER */}
      {user && <EmailVerificationBanner user={user} />}

      {/* BODY */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            {showEmailAuth ? (
              <EmailAuthForm
                onBack={() => setShowEmailAuth(false)}
                onSuccess={() => setShowEmailAuth(false)}
              />
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Welcome Back</h2>
                <div className="space-y-3 w-full max-w-sm">
                  <button
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="G" />
                    Continue with Google
                  </button>
                  <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  <button
                    onClick={() => setShowEmailAuth(true)}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-sm hover:opacity-90 text-white font-semibold transition-opacity"
                  >
                    Continue with Email
                  </button>
                </div>
                <button
                  onClick={() => setShowLanding(true)}
                  className="mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Back to home
                </button>
              </>
            )}
          </div>
        ) : (
          <div>
            {/* CARNIVAL SELECTOR */}
            <div className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {carnivalOptions.map((c, idx) => {
                  const isActive = activeCarnivalId === c.id;
                  const gradient = gradientClasses[idx % gradientClasses.length];
                  const carnivalNameMap = {
                    'stkitts-sugar-mas': 'Sugar Mas',
                    'stcroix': 'St. Croix Carnival',
                    'trinidad': 'Trinidad Carnival',
                    'dominica': 'Mas Domnik',
                    'jamaica': 'Jamaica Carnival',
                    'tampa': 'Tampa Bay Carnival',
                    'stmaarten': 'St. Maarten Carnival',
                    'cayman-batabano': 'Cayman Carnival Batabano',
                    'stthomas': 'St. Thomas Carnival',
                    'guyana': 'Guyana Independence',
                    'bahamas': 'Bahamas Carnival',
                    'bermuda': 'Bermuda Carnival',
                    'hollywood': 'Hollywood Carnival',
                    'caymas': 'Caymas Carnival',
                    'vincymas': 'Vincy Mas',
                    'stlucia': 'Saint Lucia Carnival',
                    'toronto': 'Toronto Caribbean Carnival',
                    'barbados': 'Crop Over',
                    'nevis': 'Nevis Culturama',
                    'antigua': 'Antigua Carnival',
                    'grenada': 'Spice Mas',
                    'ny-labor-day': 'New York Carnival',
                    'japan': 'Japan Caribbean Carnival',
                    'miami': 'Miami Carnival',
                    'tobago': 'Tobago Carnival'
                  };
                  const searchName = carnivalNameMap[c.id] || c.name;
                  const matchingCarnival = carnivalData.find(cd =>
                    cd.name.toLowerCase().includes(searchName.toLowerCase()) ||
                    searchName.toLowerCase().includes(cd.name.split('(')[0].trim().toLowerCase())
                  );
                  let daysUntil = null;
                  if (matchingCarnival) {
                    const now = new Date();
                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const [year, month, day] = matchingCarnival.date.split('-').map(Number);
                    const carnivalDate = new Date(year, month - 1, day);
                    if (carnivalDate >= today) {
                      daysUntil = Math.round((carnivalDate - today) / (1000 * 60 * 60 * 24));
                    }
                  }
                  return (
                    <div
                      key={c.id}
                      onClick={() => selectCarnival(c.id, `${c.name} - ${monthNames[c.monthIndex]}`)}
                      className={`snap-center min-w-[200px] cursor-pointer rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all duration-300 ${isActive ? 'ring-4 ring-offset-2 ring-blue-400 scale-105' : 'hover:scale-105 opacity-90'} ${gradient}`}
                    >
                      <div className="relative z-10 text-white">
                        <h4 className="font-bold text-lg leading-tight mb-1">{c.name}</h4>
                        <p className="text-xs font-medium uppercase tracking-wider opacity-90">{monthNames[c.monthIndex]}</p>
                        {matchingCarnival && (
                          <p className="text-xs font-medium opacity-80 mt-1">
                            {new Date(matchingCarnival.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        )}
                        {daysUntil !== null && (
                          <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 inline-block">
                            <span className="text-lg font-black">{daysUntil}</span>
                            <span className="text-xs ml-1 opacity-90">days</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HOME HUB / DASHBOARD */}
            {!currentCarnival ? (
              <HomeHub
                user={user}
                activeCarnivalId={null}
                carnivalData={carnivalData}
                scrapedEvents={scrapedEvents}
                squadMembers={[]}
                budgetTotal={0}
                budgetSpent={0}
                isPremium={isPremium}
                onAction={setActiveTab}
              />
            ) : (
              <>
                <HomeHub
                  user={user}
                  activeCarnivalId={activeCarnivalId}
                  carnivalData={carnivalData}
                  scrapedEvents={scrapedEvents}
                  squadMembers={squadMembers}
                  budgetTotal={20000} // Placeholder Goal
                  budgetSpent={budgetTotal} // This variable holds the sum of costs
                  isPremium={isPremium}
                  onAction={setActiveTab}
                />
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                  {/* PREMIUM UPGRADE BANNER - Only shown to free users */}
                  {!isPremium && (
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <p className="text-white font-bold text-sm">Unlock Premium Features</p>
                          <p className="text-white/80 text-xs">Go ad-free and get a Premium badge!</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('Info')}
                        className="px-4 py-2 bg-white text-orange-600 font-bold text-sm rounded-full hover:bg-gray-100 transition"
                      >
                        Upgrade
                      </button>
                    </div>
                  )}
                  {/* PROMO ADS - Only shown to free users */}
                  {!isPremium && (
                    <div className="border-b border-gray-100 dark:border-gray-700">
                      <PromoAd placement="banner" onUpgradeClick={() => setActiveTab('Info')} />
                    </div>
                  )}
                  {/* TABS */}
                  <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto scrollbar-hide">
                    {[
                      'Budget', 'Costume', 'Schedule', 'Squad', 'Passport',
                      'Packing', 'Map', 'Media', 'Info'
                    ].filter(tab => isPremium || !['Map', 'Media', 'Passport'].includes(tab)).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          console.log('Switching to tab:', tab, 'isPremium:', isPremium);
                          setActiveTab(tab);
                        }}
                        className={`flex-shrink-0 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      >
                        {tab}
                        {['Map', 'Media', 'Passport'].includes(tab) && <span className="ml-1 text-xs text-yellow-500">★</span>}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></div>}
                      </button>
                    ))}
                  </div>

                  {/* COLLABORATIVE MODE INDICATOR */}
                  {isCollaborative && (
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-lg">👥</span>
                        <div>
                          <p className="text-white font-medium text-sm">Squad Mode Active</p>
                          <p className="text-white/80 text-xs">Changes sync with {squadMembers.length} squad member(s)</p>
                        </div>
                      </div>
                      <button
                        onClick={loadSharedCarnivalData}
                        disabled={loadingSharedData}
                        className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full hover:bg-white/30 transition disabled:opacity-50"
                      >
                        {loadingSharedData ? 'Syncing...' : 'Refresh'}
                      </button>
                    </div>
                  )}

                  <div className="p-6">
                    {/* TAB: BUDGET (Free) */}
                    {activeTab === 'Budget' && (
                      <div className="animate-fadeIn">
                        <div className="flex justify-between items-end mb-6">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Budget</h3>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Estimate</p>
                            <p className="text-2xl font-black text-green-600 dark:text-green-400">${budgetTotal.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="space-y-3 mb-6">
                          {(currentCarnival.budget || []).map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                                {item.addedBy && isCollaborative && (
                                  <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                                    by {item.addedBy.email?.split('@')[0] || 'squad member'}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900 dark:text-white">${item.cost.toFixed(2)}</span>
                                <button onClick={() => removeBudgetItem(item.id)} className="text-gray-400 hover:text-red-500">×</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="flex gap-2 flex-1">
                            <input type="text" placeholder="Item" value={newBudgetName} onChange={(e) => setNewBudgetName(e.target.value)} className="flex-[2] p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                            <input type="number" placeholder="0.00" value={newBudgetCost} onChange={(e) => setNewBudgetCost(e.target.value)} className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                          </div>
                          <button onClick={addBudgetItem} className="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add</button>
                        </div>
                        {/* Inline Ad for free users */}
                        {!isPremium && (
                          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <PromoAd placement="inline" onUpgradeClick={() => setActiveTab('Info')} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB: COSTUME (Free) */}
                    {activeTab === 'Costume' && (
                      <div className="animate-fadeIn">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Mas Costume</h3>
                        <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl border border-pink-100 dark:border-pink-900 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Band Name</label>
                              <input
                                type="text"
                                className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white"
                                value={costumeDetails.band || (currentCarnival.costume?.band || '')}
                                onChange={(e) => setCostumeDetails({ ...costumeDetails, band: e.target.value })}
                                placeholder="e.g. Tribe, Bliss..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Section</label>
                              <input
                                type="text"
                                className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white"
                                value={costumeDetails.section || (currentCarnival.costume?.section || '')}
                                onChange={(e) => setCostumeDetails({ ...costumeDetails, section: e.target.value })}
                                placeholder="e.g. The Monarch"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Total Cost</label>
                              <input
                                type="number"
                                className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white"
                                value={costumeDetails.total || (currentCarnival.costume?.total || '')}
                                onChange={(e) => setCostumeDetails({ ...costumeDetails, total: e.target.value })}
                                placeholder="0.00"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Amount Paid</label>
                              <input
                                type="number"
                                className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white"
                                value={costumeDetails.paid || (currentCarnival.costume?.paid || '')}
                                onChange={(e) => setCostumeDetails({ ...costumeDetails, paid: e.target.value })}
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <button onClick={saveCostume} className="mt-4 w-full py-2 bg-pink-600 text-white font-bold rounded hover:bg-pink-700">
                            Save Details
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB: SCHEDULE (Free) */}
                    {activeTab === 'Schedule' && (
                      <div className="animate-fadeIn">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Itinerary</h3>

                        {/* Popular Events - Free for all users */}
                        {curatedEvents.length > 0 && (
                          <div className="mb-6">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Popular Events (Click to Add)</p>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {curatedEvents.map((evt, i) => (
                                <button
                                  key={i}
                                  onClick={() => addCuratedEvent(evt)}
                                  className="min-w-[140px] p-3 text-left rounded-lg border transition bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800"
                                >
                                  <div className="font-bold text-blue-900 dark:text-blue-300 text-sm">{evt.title}</div>
                                  <div className="text-xs text-blue-700 dark:text-blue-400 opacity-75 truncate">{evt.note}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Live Events - Premium Feature */}
                        {isPremium ? (
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                Live Events from Fete Sites
                              </p>
                              {scrapedEventsLastUpdated && (
                                <span className="text-xs text-gray-400">
                                  Updated: {new Date(scrapedEventsLastUpdated).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            {isLoadingScrapedEvents ? (
                              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                <div className="animate-spin inline-block w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full mb-2"></div>
                                <p className="text-sm">Loading live events...</p>
                              </div>
                            ) : scrapedEvents.length > 0 ? (
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {scrapedEvents.slice(0, 10).map((evt, i) => (
                                  <div
                                    key={evt.id || i}
                                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:shadow-md transition"
                                  >
                                    {evt.image && (
                                      <img src={evt.image} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm truncate">{evt.title}</h5>
                                      {evt.date && (
                                        <p className="text-xs text-emerald-700 dark:text-emerald-400">
                                          {new Date(evt.date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                          {evt.time && ` at ${evt.time}`}
                                        </p>
                                      )}
                                      {evt.venue && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{evt.venue}</p>}
                                      <p className="text-xs text-gray-400">via {evt.source}</p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                      {evt.url && (
                                        <a
                                          href={evt.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                        >
                                          Tickets
                                        </a>
                                      )}
                                      <button
                                        onClick={() => addCuratedEvent({ title: evt.title, note: evt.venue || `via ${evt.source}` })}
                                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                      >
                                        + Add
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                                <p className="text-sm text-emerald-700 dark:text-emerald-400">No live events found for this carnival yet.</p>
                                <p className="text-xs text-gray-500 mt-1">Events are updated daily from fetelist.com & frontlineticketing.com</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🎉</span>
                              <div className="flex-1">
                                <p className="font-bold text-amber-900 dark:text-amber-300">Unlock Live Event Listings</p>
                                <p className="text-xs text-amber-700 dark:text-amber-400">Premium members get daily-updated fete listings from fetelist.com & frontlineticketing.com</p>
                              </div>
                              <button
                                onClick={() => setActiveTab('Info')}
                                className="px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg hover:opacity-90 flex-shrink-0"
                              >
                                Upgrade
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="space-y-4 mb-6">
                          {(currentCarnival.schedule || []).map((event) => (
                            <div key={event.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-400 relative group">
                              <div className="text-center min-w-[60px]">
                                <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{new Date(event.datetime).toLocaleDateString(undefined, { month: 'short' })}</span>
                                <span className="block text-xl font-black text-gray-800 dark:text-white">{new Date(event.datetime).getDate()}</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">{new Date(event.datetime).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white">{event.title}</h4>
                                {event.note && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.note}</p>}
                                {event.addedBy && isCollaborative && (
                                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    Added by {event.addedBy.email?.split('@')[0] || 'squad member'}
                                  </p>
                                )}
                              </div>
                              <button onClick={() => removeScheduleItem(event.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100">×</button>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                          <input type="text" placeholder="Event Name" value={newScheduleName} onChange={(e) => setNewScheduleName(e.target.value)} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                          <input type="datetime-local" value={newScheduleDate} onChange={(e) => setNewScheduleDate(e.target.value)} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                          <input type="text" placeholder="Notes" value={newScheduleNote} onChange={(e) => setNewScheduleNote(e.target.value)} className="p-2 border rounded md:col-span-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                          <button onClick={addScheduleItem} className="md:col-span-2 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">Add Event</button>
                        </div>
                      </div>
                    )}

                    {/* TAB: SQUAD (Free) */}
                    {activeTab === 'Squad' && (
                      <div className="animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Your Squad</h3>
                          <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{currentCarnival.squad?.length || 0} members</span>
                        </div>

                        {/* Squad Sharing Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 mb-4">
                          <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                            <span>🔗</span> Squad Sharing
                          </h4>

                          {/* Status Messages */}
                          {squadShareError && (
                            <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm">
                              {squadShareError}
                            </div>
                          )}
                          {squadShareSuccess && (
                            <div className="mb-3 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-sm">
                              {squadShareSuccess}
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Create Share Code */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Share your carnival plan with friends:</p>
                              {squadShareCode ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider">{squadShareCode}</span>
                                  <button
                                    onClick={copyShareCode}
                                    className="text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-3 py-1 rounded hover:bg-purple-200"
                                  >
                                    Copy
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={handleCreateSquad}
                                  disabled={isCreatingShare}
                                  className="w-full py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 disabled:opacity-50"
                                >
                                  {isCreatingShare ? 'Creating...' : 'Start a Squad'}
                                </button>
                              )}
                            </div>

                            {/* Join Squad */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Join a friend's squad:</p>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Enter 6-digit code"
                                  value={joinCode}
                                  onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                                  className="flex-1 p-2 border rounded font-mono text-center tracking-wider uppercase dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  maxLength={6}
                                />
                                <button
                                  onClick={handleJoinSquad}
                                  disabled={isJoiningSquad || joinCode.length !== 6}
                                  className="bg-pink-600 text-white px-4 rounded hover:bg-pink-700 disabled:opacity-50"
                                >
                                  {isJoiningSquad ? '...' : 'Join'}
                                </button>
                              </div>
                            </div>
                          </div>

                          {currentSquad && (
                            <div className="mt-4 text-center">
                              <button onClick={handleLeaveSquad} className="text-sm text-red-500 hover:text-red-700 underline">
                                Leave Squad
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Premium: Road Ready Notification Toggle */}
                        {isPremium && (
                          <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifySquadOnRoadReady}
                                onChange={(e) => setNotifySquadOnRoadReady(e.target.checked)}
                                className="w-5 h-5 text-purple-600 rounded"
                              />
                              <div>
                                <span className="font-medium text-purple-800 dark:text-purple-300">Notify squad when I go Road Ready</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Send push notification to squad members</p>
                              </div>
                              <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Premium</span>
                            </label>
                          </div>
                        )}


                        {/* Shared Squad Members - People who joined via share code */}
                        {squadMembers.length > 0 && (
                          <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
                                <span>👥</span> Connected Squad Members
                              </h4>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">These users joined using your share code and can see this carnival plan. Click "Refresh" to check for new members.</p>
                            <div className="flex flex-wrap gap-2">
                              {squadMembers.map((member, idx) => (
                                <div
                                  key={member.uid || idx}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-full border ${member.role === 'owner'
                                    ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800'
                                    : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
                                    }`}
                                >
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                                    {(member.email || member.uid || '?').charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className={`font-medium text-sm ${member.role === 'owner'
                                      ? 'text-yellow-800 dark:text-yellow-300'
                                      : 'text-green-800 dark:text-green-300'
                                      }`}>
                                      {member.email || `User ${member.uid?.slice(0, 6)}...`}
                                    </span>
                                    <span className={`text-xs ${member.role === 'owner'
                                      ? 'text-yellow-600 dark:text-yellow-400'
                                      : 'text-green-600 dark:text-green-400'
                                      }`}>
                                      {member.role === 'owner' ? '👑 Owner' : '✓ Member'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Manual Squad List */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Add (Offline List)</h4>
                          <div className="flex flex-col sm:flex-row gap-2 mb-4">
                            <input
                              type="text"
                              placeholder="Add friend's name"
                              value={newSquadMember}
                              onChange={(e) => setNewSquadMember(e.target.value)}
                              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            />
                            <button onClick={addSquadMember} className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-medium">Add</button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(currentCarnival.squad || []).map(member => (
                              <div key={member.id} className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-800">
                                <span className="text-purple-900 dark:text-purple-200 font-medium">{member.name}</span>
                                <button onClick={() => removeSquadMember(member.id)} className="text-purple-400 hover:text-red-500 text-xs font-bold">×</button>
                              </div>
                            ))}
                            {(currentCarnival.squad || []).length === 0 && <p className="text-gray-400 italic text-sm">No squad members added yet. Riding solo?</p>}
                          </div>
                        </div>
                      </div>
                        
                        {/* SQUAD CHAT */}
                    <div className="mt-8 mb-8">
                      <SquadChat
                        squadId={currentSquad?.id}
                        user={user}
                        isDemoMode={isDemoMode}
                      />
                    </div>

                    {/* Inline Ad for free users */}
                    {!isPremium && (
                      <div className="mt-4">
                        <PromoAd placement="inline" onUpgradeClick={() => setActiveTab('Info')} />
                      </div>
                    )}
                  </div>
                    )}

                  {/* TAB: PACKING (Free) */}
                  {activeTab === 'Packing' && (
                    <div className="animate-fadeIn">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Packing List</h3>
                      <div className="space-y-2 mb-6">
                        {(currentCarnival.packing || []).map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm rounded-lg">
                            <div className="flex items-center gap-3">
                              <input type="checkbox" checked={item.checked} onChange={() => togglePackingItem(item.id)} className="w-5 h-5 text-blue-600 rounded" />
                              <span className={`text-gray-700 dark:text-gray-200 ${item.checked ? 'line-through opacity-50' : ''}`}>{item.item}</span>
                            </div>
                            <button onClick={() => removePackingItem(item.id)} className="text-gray-400 hover:text-red-500">×</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" placeholder="Item" value={newPackingItem} onChange={(e) => setNewPackingItem(e.target.value)} className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" />
                        <button onClick={addPackingItem} className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add</button>
                      </div>
                      {/* Inline Ad for free users */}
                      {!isPremium && (
                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <PromoAd placement="inline" onUpgradeClick={() => setActiveTab('Info')} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB: MAP (Premium) */}
                  {activeTab === 'Map' && isPremium && (
                    <div className="animate-fadeIn">
                      <FeteMap
                        locations={currentCarnival.mapLocations || []}
                        scrapedEvents={scrapedEvents}
                        onLocationsChange={(newLocations) => updateCarnivalData('mapLocations', newLocations)}
                        carnivalName={currentCarnival.name}
                        carnivalId={activeCarnivalId}
                      />
                    </div>
                  )}

                  {/* TAB: PASSPORT (Premium Upgrade Integration) */}
                  {activeTab === 'Passport' && isPremium && (
                    <div className="animate-fadeIn">
                      <SocaPassportTab
                        user={user}
                        activeCarnivalId={activeCarnivalId}
                      />
                    </div>
                  )}

                  {/* TAB: MEDIA VAULT (Premium) */}
                  {activeTab === 'Media' && isPremium && (
                    <div className="animate-fadeIn">
                      <MediaVault
                        files={currentCarnival.mediaFiles || []}
                        onFilesChange={(newFiles) => updateCarnivalData('mediaFiles', newFiles)}
                        carnivalName={currentCarnival.name}
                        carnivalId={activeCarnivalId}
                        userId={user.uid}
                      />
                    </div>
                  )}

                  {/* TAB: INFO & EXPORT */}
                  {activeTab === 'Info' && (
                    <div className="animate-fadeIn text-center">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mb-6 shadow-xl">
                        <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{isPremium ? "Premium Supporter" : "Support the App"}</h2>
                        <p className="text-gray-400 mb-6">{isPremium ? "Thank you for supporting Carnival Planner!" : "All features are free! Premium removes ads and shows your support."}</p>

                        <button
                          onClick={handleExport}
                          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full font-bold transition-colors bg-white text-gray-900 hover:bg-gray-100"
                        >
                          <span>📥</span> Export Itinerary
                        </button>
                      </div>

                      {/* Premium Subscription Buttons (Upsell) */}
                      {!isPremium && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                          <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Become a Premium Supporter</h3>
                          <p className="text-yellow-700 dark:text-yellow-500 text-sm mb-4">Get an ad-free experience and a Premium badge to show your support!</p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                              onClick={() => handleSubscribe("monthly")}
                              disabled={isCheckingOut}
                              className="px-4 py-2 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 disabled:opacity-50"
                            >
                              {isCheckingOut ? "Loading..." : "Monthly - $4.99"}
                            </button>
                            <button
                              onClick={() => handleSubscribe("yearly")}
                              disabled={isCheckingOut}
                              className="px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded shadow hover:bg-yellow-500 disabled:opacity-50"
                            >
                              {isCheckingOut ? "Loading..." : "Yearly - $39.99"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Account Settings */}
                      <div className="mt-6">
                        <AccountSettings user={user} />
                      </div>

                      {/* AD MANAGER, SUPPORT & ANALYTICS - Admin Only */}
                      {user?.email === 'djkrss1@gmail.com' && (
                        <div className="mt-6 text-left space-y-8">
                          <AdManager />
                          <SupportAdmin />
                          <AdminAnalytics />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
          </>
        )}
    </div>
  )
}
      </main >

  {/* Footer with Legal Links */ }
  < footer className = "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 px-4 mt-auto" >
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <button
          onClick={() => setActiveLegalPage('privacy')}
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Privacy
        </button>
        <span>|</span>
        <button
          onClick={() => setActiveLegalPage('terms')}
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Terms
        </button>
        <span>|</span>
        <button
          onClick={() => setActiveLegalPage('cookies')}
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Cookies
        </button>
        <span>|</span>
        <button
          onClick={() => setActiveLegalPage('refund')}
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Refunds
        </button>
        <span>|</span>
        <button
          onClick={() => setActiveLegalPage('contact')}
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Contact
        </button>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-xs mt-3">
        © {new Date().getFullYear()} Carnival Planner
      </p>
    </div>
      </footer >

  {/* Vibes Player (Floating) */ }
{
  user && (
    <VibesPlayer activeCarnivalId={activeCarnivalId} isPremium={isPremium} />
  )
}
    </div >
  );
}