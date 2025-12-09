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
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app, { auth, db } from './firebase'; // ✅ Imported 'app' explicitly
import logo from './assets/carnival-logo.png';

// --- CONFIGURATION ---
const appId = 'carnival-planner-v1';

// ✅ STRIPE PRICE IDs (Updated from your request)
const STRIPE_MONTHLY_PRICE_ID = 'price_1SanHUJR9xpdRiXijLesRPVt';
const STRIPE_YEARLY_PRICE_ID = 'price_1SanMhJR9xpdRiXinv2F9knM';

// Premium Feature: Curated Fete Database
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
  
  // Data
  const [carnivals, setCarnivals] = useState({});
  const [activeCarnivalId, setActiveCarnivalId] = useState(null);
  const [activeTab, setActiveTab] = useState('Budget');
  
  // UI State
  const [isPremium, setIsPremium] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [roadMode, setRoadMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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

  // --- CONFIG ---
  const carnivalOptions = [
    { id: 'trinidad', name: 'Trinidad Carnival', monthIndex: 1 },
    { id: 'stkitts-sugar-mas', name: 'St. Kitts (Sugar Mas)', monthIndex: 0 },
    { id: 'aruba', name: 'Aruba Carnival', monthIndex: 1 },
    { id: 'guyana-mashramani', name: 'Guyana Mashramani', monthIndex: 1 },
    { id: 'guyana-independence', name: 'Guyana Independence', monthIndex: 4 },
    { id: 'jamaica', name: 'Jamaica Carnival', monthIndex: 3 },
    { id: 'stmaarten', name: 'St. Maarten Carnival', monthIndex: 3 },
    { id: 'bahamas', name: 'Bahamas Carnival', monthIndex: 5 },
    { id: 'bermuda', name: 'Bermuda Carnival', monthIndex: 5 },
    { id: 'vincymas', name: 'Vincy Mas', monthIndex: 6 },
    { id: 'antigua', name: 'Antigua Carnival', monthIndex: 7 },
    { id: 'stlucia', name: 'St. Lucia Carnival', monthIndex: 6 },
    { id: 'tobago', name: 'Tobago Carnival', monthIndex: 9 },
    { id: 'nottinghill', name: 'Notting Hill', monthIndex: 7 },
    { id: 'miami', name: 'Miami Carnival', monthIndex: 9 },
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

  // 1. Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 2. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // 3. Premium Check (Firestore + Admin Override)
  useEffect(() => {
    if (!user) {
      setIsPremium(false);
      return;
    }

    // ⭐ SUPERUSER CHECK: Ensure djkrss1@gmail.com is always premium
    if (user.email === 'djkrss1@gmail.com') {
      setIsPremium(true);
      // We continue to listen to Firestore, but the boolean above stays true
    }

    const appRef = doc(db, 'users', user.uid, 'apps', appId);
    const unsub = onSnapshot(appRef, (snap) => {
      // If user is the specific admin, enforce true regardless of DB
      if (user.email === 'djkrss1@gmail.com') {
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
  }, [user]);

  // 4. Load Carnivals
  useEffect(() => {
    if (!user) {
      setCarnivals({});
      setActiveCarnivalId(null);
      return;
    }
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
  }, [user]);

  useEffect(() => {
    getRedirectResult(auth).catch((err) => console.error(err));
  }, []);

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
    await firebaseSignOut(auth);
    setShowLanding(true);
    setRoadMode(false);
    setActiveTab('Budget');
  };

  // --- STRIPE SUBSCRIPTION ---
  const handleSubscribe = async (interval) => {
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

  const updateCarnivalData = async (field, newData) => {
    if (!user || !activeCarnivalId) return;
    const ref = doc(db, 'users', user.uid, 'apps', appId, 'carnivals', activeCarnivalId);
    await updateDoc(ref, { [field]: newData });
  };

  // --- FEATURE HANDLERS ---

  const toggleRoadMode = () => {
    if (!isPremium) {
      alert("Road Ready Mode is a Premium feature. Upgrade to access!");
      setActiveTab('Info');
      return;
    }
    setRoadMode(true);
  };

  const addBudgetItem = () => {
    if (!newBudgetName.trim() || !newBudgetCost) return;
    const items = carnivals[activeCarnivalId]?.budget || [];
    const newItem = { id: Date.now().toString(), name: newBudgetName.trim(), cost: parseFloat(newBudgetCost) };
    updateCarnivalData('budget', [...items, newItem]);
    setNewBudgetName('');
    setNewBudgetCost('');
  };
  const removeBudgetItem = (id) => {
    const items = carnivals[activeCarnivalId]?.budget || [];
    updateCarnivalData('budget', items.filter(i => i.id !== id));
  };

  const addScheduleItem = () => {
    if (!newScheduleName.trim() || !newScheduleDate) return;
    const items = carnivals[activeCarnivalId]?.schedule || [];
    const newItem = { 
      id: Date.now().toString(), 
      title: newScheduleName.trim(), 
      datetime: newScheduleDate, 
      note: newScheduleNote.trim() 
    };
    updateCarnivalData('schedule', [...items, newItem]);
    setNewScheduleName('');
    setNewScheduleDate('');
    setNewScheduleNote('');
  };
  const removeScheduleItem = (id) => {
    const items = carnivals[activeCarnivalId]?.schedule || [];
    updateCarnivalData('schedule', items.filter(i => i.id !== id));
  };

  const addCuratedEvent = (evt) => {
    if (!isPremium) {
      alert("Curated Events are for Premium users only.");
      setActiveTab('Info');
      return;
    }
    const items = carnivals[activeCarnivalId]?.schedule || [];
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
    updateCarnivalData('schedule', [...items, newItem]);
  };

  const addPackingItem = () => {
    if (!newPackingItem.trim()) return;
    const items = carnivals[activeCarnivalId]?.packing || [];
    const newItem = { id: Date.now().toString(), item: newPackingItem.trim(), checked: false };
    updateCarnivalData('packing', [...items, newItem]);
    setNewPackingItem('');
  };
  const togglePackingItem = (id) => {
    const items = carnivals[activeCarnivalId]?.packing || [];
    updateCarnivalData('packing', items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };
  const removePackingItem = (id) => {
    const items = carnivals[activeCarnivalId]?.packing || [];
    updateCarnivalData('packing', items.filter(i => i.id !== id));
  };

  const addSquadMember = () => {
    if (!newSquadMember.trim()) return;
    const items = carnivals[activeCarnivalId]?.squad || [];
    const newItem = { id: Date.now().toString(), name: newSquadMember.trim() };
    updateCarnivalData('squad', [...items, newItem]);
    setNewSquadMember('');
  };
  const removeSquadMember = (id) => {
    const items = carnivals[activeCarnivalId]?.squad || [];
    updateCarnivalData('squad', items.filter(i => i.id !== id));
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
    if (!isPremium) {
      alert("Export is a Premium feature.");
      setActiveTab('Info');
      return;
    }
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
    const sorted = (currentCarnival.schedule || []).slice().sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
    sorted.forEach(s => lines.push(`${new Date(s.datetime).toLocaleString()} | ${s.title}`));
    
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCarnival.name.replace(/\s+/g, '_')}_Plan.txt`;
    a.click();
  };

  // --- HELPER COMPONENTS ---

  const PremiumLock = ({ featureName }) => (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center mx-4">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{featureName} is Premium</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6 mx-auto">Upgrade to access {featureName.toLowerCase()} and take your planning to the next level.</p>
      <button 
        onClick={() => setActiveTab('Info')} 
        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full shadow-md hover:scale-105 transition"
      >
        Upgrade Now
      </button>
    </div>
  );

  // --- RENDER VARS ---
  const currentCarnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
  const budgetTotal = currentCarnival?.budget?.reduce((acc, item) => acc + (item.cost || 0), 0) || 0;
  const costumeBalance = currentCarnival?.costume ? (currentCarnival.costume.total - currentCarnival.costume.paid) : 0;
  const curatedEvents = currentCarnival ? (POPULAR_EVENTS[activeCarnivalId] || POPULAR_EVENTS.default) : [];

  // --- VIEW: SPLASH SCREEN ---
  if (showLanding && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 opacity-50 z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <img src={logo} alt="Carnival Planner" className="w-32 h-32 mb-6 drop-shadow-2xl animate-pulse" />
          <h1 className="text-4xl font-extrabold mb-2">Carnival Planner 2.0</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-md">Plan your Mas. Track your Fetes. Coordinate your Squad.</p>
          <button onClick={() => setShowLanding(false)} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
            Enter the Bacchanal
          </button>
        </div>
      </div>
    );
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
                <div className="text-xl opacity-90">{new Date(nextEvent.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
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
      {/* HEADER */}
      <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 flex justify-between items-center sticky top-0 z-20 transition-colors">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-800 dark:text-white hidden sm:block">Carnival Planner</h1>
        </div>
        {user && (
          <div className="flex items-center gap-3">
             {/* Dark Mode Toggle */}
             <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300">
               {darkMode ? '☀️' : '🌙'}
             </button>
            {currentCarnival && (
              <button 
                onClick={toggleRoadMode}
                className={`px-3 py-1 text-xs font-bold rounded-full transition ${isPremium ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200' : 'bg-gray-100 text-gray-400'}`}
              >
                {isPremium ? "GO ROAD READY" : "🔒 ROAD MODE"}
              </button>
            )}
            {!isPremium ? (
              <span className="text-xs text-gray-400 dark:text-gray-500">Free Plan</span>
            ) : (
               <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-bold">Premium</span>
            )}
            <button onClick={handleSignOut} className="text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400">Sign Out</button>
          </div>
        )}
      </header>

      {/* BODY */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {!user ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Welcome Back</h2>
            <button onClick={handleSignIn} className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="G" />
              Sign in with Google
            </button>
          </div>
        ) : (
          <div>
            {/* CARNIVAL SELECTOR */}
            <div className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {carnivalOptions.map((c, idx) => {
                  const isActive = activeCarnivalId === c.id;
                  const gradient = gradientClasses[idx % gradientClasses.length];
                  return (
                    <div
                      key={c.id}
                      onClick={() => selectCarnival(c.id, `${c.name} - ${monthNames[c.monthIndex]}`)}
                      className={`snap-center min-w-[200px] cursor-pointer rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all duration-300 ${isActive ? 'ring-4 ring-offset-2 ring-blue-400 scale-105' : 'hover:scale-105 opacity-90'} ${gradient}`}
                    >
                      <div className="relative z-10 text-white">
                        <h4 className="font-bold text-lg leading-tight mb-1">{c.name}</h4>
                        <p className="text-xs font-medium uppercase tracking-wider opacity-90">{monthNames[c.monthIndex]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DASHBOARD */}
            {!currentCarnival ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400">Select a carnival above to begin.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                {/* TABS */}
                <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
                  {['Budget', 'Costume', 'Schedule', 'Squad', 'Packing', 'Info'].map((tab) => {
                    const isLocked = !isPremium && (tab === 'Costume'); 
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 min-w-[80px] py-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      >
                        {isLocked ? `🔒 ${tab}` : tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></div>}
                      </button>
                    );
                  })}
                </div>

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
                            <span className="font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-gray-900 dark:text-white">${item.cost.toFixed(2)}</span>
                              <button onClick={() => removeBudgetItem(item.id)} className="text-gray-400 hover:text-red-500">×</button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Item" value={newBudgetName} onChange={(e) => setNewBudgetName(e.target.value)} className="flex-[2] p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        <input type="number" placeholder="0.00" value={newBudgetCost} onChange={(e) => setNewBudgetCost(e.target.value)} className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        <button onClick={addBudgetItem} className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                      </div>
                    </div>
                  )}

                  {/* TAB: COSTUME (Locked) */}
                  {activeTab === 'Costume' && (
                    <div className="animate-fadeIn">
                       {!isPremium ? (
                         <PremiumLock featureName="Costume Tracker" />
                       ) : (
                         <>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Mas Costume</h3>
                          <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl border border-pink-100 dark:border-pink-900 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Band Name</label>
                                <input 
                                  type="text" 
                                  className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white" 
                                  value={costumeDetails.band || (currentCarnival.costume?.band || '')}
                                  onChange={(e) => setCostumeDetails({...costumeDetails, band: e.target.value})}
                                  placeholder="e.g. Tribe, Bliss..."
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Section</label>
                                <input 
                                  type="text" 
                                  className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white" 
                                  value={costumeDetails.section || (currentCarnival.costume?.section || '')}
                                  onChange={(e) => setCostumeDetails({...costumeDetails, section: e.target.value})}
                                  placeholder="e.g. The Monarch"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Total Cost</label>
                                <input 
                                  type="number" 
                                  className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white" 
                                  value={costumeDetails.total || (currentCarnival.costume?.total || '')}
                                  onChange={(e) => setCostumeDetails({...costumeDetails, total: e.target.value})}
                                  placeholder="0.00"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1">Amount Paid</label>
                                <input 
                                  type="number" 
                                  className="w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white" 
                                  value={costumeDetails.paid || (currentCarnival.costume?.paid || '')}
                                  onChange={(e) => setCostumeDetails({...costumeDetails, paid: e.target.value})}
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                            <button onClick={saveCostume} className="mt-4 w-full py-2 bg-pink-600 text-white font-bold rounded hover:bg-pink-700">
                              Save Details
                            </button>
                          </div>
                         </>
                       )}
                    </div>
                  )}

                  {/* TAB: SCHEDULE (Free, but Curated Events are Locked) */}
                  {activeTab === 'Schedule' && (
                    <div className="animate-fadeIn">
                       <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Itinerary</h3>
                       
                       {/* Popular Events - Locked Content */}
                       {curatedEvents.length > 0 && (
                         <div className="mb-6">
                           <p className="text-xs font-bold text-gray-400 uppercase mb-2">Popular Events {isPremium ? "(Click to Add)" : "(Premium Only)"}</p>
                           <div className="flex gap-2 overflow-x-auto pb-2">
                             {curatedEvents.map((evt, i) => (
                               <button 
                                 key={i} 
                                 onClick={() => addCuratedEvent(evt)}
                                 className={`min-w-[140px] p-3 text-left rounded-lg border transition ${isPremium ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60 cursor-not-allowed'}`}
                               >
                                 <div className="font-bold text-blue-900 dark:text-blue-300 text-sm">{evt.title} {isPremium ? "" : "🔒"}</div>
                                 <div className="text-xs text-blue-700 dark:text-blue-400 opacity-75 truncate">{evt.note}</div>
                               </button>
                             ))}
                           </div>
                         </div>
                       )}

                       <div className="space-y-4 mb-6">
                        {(currentCarnival.schedule || []).map((event) => (
                              <div key={event.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-400 relative group">
                                <div className="text-center min-w-[60px]">
                                  <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{new Date(event.datetime).toLocaleDateString(undefined, {month:'short'})}</span>
                                  <span className="block text-xl font-black text-gray-800 dark:text-white">{new Date(event.datetime).getDate()}</span>
                                  <span className="block text-xs text-gray-500 dark:text-gray-400">{new Date(event.datetime).toLocaleTimeString(undefined, {hour:'numeric', minute:'2-digit'})}</span>
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800 dark:text-white">{event.title}</h4>
                                  {event.note && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.note}</p>}
                                </div>
                                <button onClick={() => removeScheduleItem(event.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100">×</button>
                              </div>
                            ))}
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                          <input type="text" placeholder="Event Name" value={newScheduleName} onChange={(e) => setNewScheduleName(e.target.value)} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                          <input type="datetime-local" value={newScheduleDate} onChange={(e) => setNewScheduleDate(e.target.value)} className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                          <input type="text" placeholder="Notes" value={newScheduleNote} onChange={(e) => setNewScheduleNote(e.target.value)} className="p-2 border rounded md:col-span-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                          <button onClick={addScheduleItem} className="md:col-span-2 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">Add Event (Free)</button>
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
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
                        <div className="flex gap-2 mb-4">
                          <input 
                            type="text" 
                            placeholder="Add friend's name" 
                            value={newSquadMember}
                            onChange={(e) => setNewSquadMember(e.target.value)}
                            className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <button onClick={addSquadMember} className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700">Add</button>
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
                      <div className="flex gap-2">
                        <input type="text" placeholder="Item" value={newPackingItem} onChange={(e) => setNewPackingItem(e.target.value)} className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        <button onClick={addPackingItem} className="px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                      </div>
                    </div>
                  )}

                  {/* TAB: INFO & EXPORT */}
                  {activeTab === 'Info' && (
                    <div className="animate-fadeIn text-center">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mb-6 shadow-xl">
                         <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                         <h2 className="text-2xl font-bold mb-2">{isPremium ? "Premium Active" : "Get Premium"}</h2>
                         <p className="text-gray-400 mb-6">{isPremium ? "You have full access." : "Unlock Export, Costume Tracker, and Road Mode."}</p>
                         
                         <button 
                           onClick={handleExport} 
                           className={`flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full font-bold transition-colors ${isPremium ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                         >
                           <span>{isPremium ? "📥" : "🔒"}</span> Export Itinerary
                         </button>
                      </div>
                      
                      {/* Premium Subscription Buttons (Upsell) */}
                      {!isPremium && (
                         <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                           <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Upgrade Today</h3>
                           <p className="text-yellow-700 dark:text-yellow-500 text-sm mb-4">Choose a plan to unlock all features instantly.</p>
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
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}