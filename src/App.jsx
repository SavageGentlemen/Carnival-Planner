import React, { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithRedirect,
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
import { auth, db, appId, app } from './firebase';
import logo from './assets/carnival-logo.png';

/**
 * The main application component.  This component controls all
 * navigation and data management for the Carnival Planner.  It uses
 * Firebase Authentication to determine if a user is logged in and
 * Firebase Firestore to persist carnival data, including budgets,
 * schedules and packing lists.  All state is kept inside this
 * component for simplicity, but the UI is broken into logical
 * sections for readability.
 */
export default function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(window.location.pathname);
  // Map of carnivalId -> carnival object
  const [carnivals, setCarnivals] = useState({});
  // Currently selected carnival ID (slug)
  const [activeCarnivalId, setActiveCarnivalId] = useState(null);
  // Currently selected tab
  const [activeTab, setActiveTab] = useState('Budget');
  // Local form state for budgets
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCost, setNewBudgetCost] = useState('');
  // Local form state for schedule entries
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleNote, setNewScheduleNote] = useState('');
  // Local form state for packing list
  const [newPackingItem, setNewPackingItem] = useState('');

  const [isPremium, setIsPremium] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Stripe Functions + Price IDs
  const functions = getFunctions();
  const STRIPE_MONTHLY_PRICE_ID = 'price_1SanHUJR9xpdRiXijLesRPVt';
  const STRIPE_YEARLY_PRICE_ID = 'price_1SanMhJR9xpdRiXinv2F9knM';

  // Initiates the subscription flow by calling the Cloud Function that
  // creates a Stripe Checkout session.  `billingInterval` controls
  // whether we use the monthly or yearly price.
  const handleSubscribe = async (interval) => {
    if (!user) {
      alert("You must be signed in to subscribe.");
      return;
    }
  
    const billingInterval = interval === "yearly" ? "yearly" : "monthly";
  
    // Choose the Stripe priceId based on the billing interval
    const priceId =
      billingInterval === "yearly"
        ? STRIPE_YEARLY_PRICE_ID
        : STRIPE_MONTHLY_PRICE_ID;
  
    if (!priceId || priceId.startsWith("price_XXXXXXXX")) {
      console.error("Stripe priceId is not configured correctly:", {
        billingInterval,
        priceId,
      });
      alert(
        "Premium pricing is not configured yet. Please contact support or try again later."
      );
      return;
    }
  
    setIsCheckingOut(true);
  
    try {
      console.log("Starting checkout with:", {
        billingInterval,
        priceId,
        uid: user.uid,
        email: user.email || null,
      });
  
      const createCheckoutSession = httpsCallable(
        functions,
        "createCheckoutSession"
      );
  
      // ✅ Send priceId to the Cloud Function (this is what it expects)
      const result = await createCheckoutSession({ priceId });
  
      console.log("createCheckoutSession result:", result);
  
      const { data } = result || {};
      if (data && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("No checkoutUrl returned from Cloud Function", data);
        alert("Unable to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error starting Stripe checkout:", error);
  
      const message =
        (error && error.message) ||
        (error && error.data && error.data.message) ||
        "There was a problem starting your checkout. Please try again.";
  
      alert(message);
    } finally {
      setIsCheckingOut(false);
    }
  };  

  // Control whether the landing page (splash screen) is visible.  The
  // landing page is shown initially and can be dismissed by the
  // visitor.  Once dismissed, it will not reappear unless the page
  // reloads.  We do not show the landing when a user is already
  // authenticated.
  const [showLanding, setShowLanding] = useState(true);

  // Define the available carnivals with descriptive names, unique
  // identifiers and the month they occur in (0-based month index).
  // The `id` field is used as the Firestore document slug, while
  // `name` is displayed to the user.  `monthIndex` is used to
  // calculate the countdown to the next carnival.
  const carnivalOptions = [
    { id: 'trinidad', name: 'Trinidad Carnival', monthIndex: 1 }, // February
    { id: 'stkitts-sugar-mas', name: 'St. Kitts & Nevis (Sugar Mas)', monthIndex: 0 }, // January
    { id: 'aruba', name: 'Aruba Carnival', monthIndex: 1 }, // February
    { id: 'guyana-mashramani', name: 'Guyana Mashramani', monthIndex: 1 }, // February
    { id: 'guyana-independence', name: 'Guyana Independence Carnival', monthIndex: 4 }, // May
    { id: 'jamaica', name: 'Jamaica Carnival', monthIndex: 3 }, // April
    { id: 'stmaarten', name: 'St. Maarten Carnival', monthIndex: 3 }, // April/May – approximate to April
    { id: 'bahamas', name: 'Bahamas Carnival', monthIndex: 5 }, // June
    { id: 'bermuda', name: 'Bermuda Carnival', monthIndex: 5 }, // June
    { id: 'vincymas', name: 'Vincy Mas (St. Vincent)', monthIndex: 6 }, // July
    { id: 'antigua', name: 'Antigua Carnival', monthIndex: 7 }, // August
    { id: 'tobago', name: 'Tobago Carnival', monthIndex: 9 }, // October
    { id: 'stlucia', name: 'St. Lucia Carnival', monthIndex: 6 }, // July
  ];

  // Colourful gradient classes applied to the island cards.  These
  // gradients cycle through the list so that each card has a distinct
  // appearance.  Add or remove gradients to customise the palette.
  const gradientClasses = [
    'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
    'bg-gradient-to-r from-teal-400 to-cyan-500',
    'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500',
    'bg-gradient-to-r from-purple-600 to-indigo-600',
  ];

  // Month names for display.  Used to derive a human-readable label
  // from the monthIndex stored in carnivalOptions.
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Simple route handling for Stripe return URLs
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const goHome = () => {
    window.history.pushState({}, '', '/');
    setRoute('/');
  };

  // Listen to authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Listen for premium status in Firestore, as written by Stripe webhooks
  useEffect(() => {
    if (!user) {
      setIsPremium(false);
      return;
    }

    const appRef = doc(db, 'users', user.uid, 'apps', appId);
    const unsub = onSnapshot(appRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setIsPremium(Boolean(data.premiumActive));
      } else {
        setIsPremium(false);
      }
    });

    return () => unsub();
  }, [user]);

  // On mount, handle the result of a redirect sign-in.  If there is an
  // error during the OAuth redirect flow, it will be caught here and
  // logged to the console.  Otherwise, onAuthStateChanged will fire
  // once the user is signed in.
  useEffect(() => {
    getRedirectResult(auth).catch((err) => {
      if (err) {
        console.error('Error handling redirect result:', err);
      }
    });
  }, []);

  // Subscribe to the user's carnivals when logged in
  useEffect(() => {
    if (!user) {
      setCarnivals({});
      setActiveCarnivalId(null);
      return undefined;
    }
    // The carnivals subcollection is stored under users/{uid}/apps/{appId}/carnivals.
    const carnivalsRef = collection(
      db,
      'users',
      user.uid,
      'apps',
      appId,
      'carnivals',
    );
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

  // Sign in with Google.  Using redirect instead of popup avoids
  // issues with blocked pop-ups and cross-origin restrictions during
  // development.  If redirect fails (e.g. because of an invalid
  // configuration), the error will be logged to the console.
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error('Error initiating Google sign in:', err);
    }
  };

  // Sign out the current user
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setActiveCarnivalId(null);
      setActiveTab('Budget');
    } catch (err) {
      console.error('Error during sign out:', err);
    }
  };

  // Ensure a carnival document exists and select it
  const selectCarnival = async (id, name) => {
    if (!user) return;
    setActiveCarnivalId(id);
    if (!carnivals[id]) {
      try {
        const carnivalRef = doc(
          db,
          'users',
          user.uid,
          'apps',
          appId,
          'carnivals',
          id,
        );
        await setDoc(
          carnivalRef,
          {
            name,
            budget: [],
            schedule: [],
            packing: [],
            createdAt: Timestamp.now(),
          },
          { merge: true },
        );
      } catch (err) {
        console.error('Error creating carnival:', err);
      }
    }
  };

  // Add a new budget item
  const addBudgetItem = async () => {
    if (!user || !activeCarnivalId) return;
    if (!newBudgetName.trim() || !newBudgetCost) return;
    const carnival = carnivals[activeCarnivalId] || {};
    const newItem = {
      id: Date.now().toString(),
      name: newBudgetName.trim(),
      cost: parseFloat(newBudgetCost),
    };
    const updatedBudget = Array.isArray(carnival.budget)
      ? [...carnival.budget, newItem]
      : [newItem];
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { budget: updatedBudget });
      setNewBudgetName('');
      setNewBudgetCost('');
    } catch (err) {
      console.error('Error adding budget item:', err);
    }
  };

  // Remove a budget item by ID
  const removeBudgetItem = async (itemId) => {
    if (!user || !activeCarnivalId) return;
    const carnival = carnivals[activeCarnivalId];
    if (!carnival || !Array.isArray(carnival.budget)) return;
    const updatedBudget = carnival.budget.filter((item) => item.id !== itemId);
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { budget: updatedBudget });
    } catch (err) {
      console.error('Error removing budget item:', err);
    }
  };

  // Add a schedule entry
  const addScheduleItem = async () => {
    if (!user || !activeCarnivalId) return;
    if (!newScheduleName.trim() || !newScheduleDate) return;
    const carnival = carnivals[activeCarnivalId] || {};
    const newItem = {
      id: Date.now().toString(),
      title: newScheduleName.trim(),
      datetime: newScheduleDate,
      note: newScheduleNote.trim(),
    };
    const updatedSchedule = Array.isArray(carnival.schedule)
      ? [...carnival.schedule, newItem]
      : [newItem];
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { schedule: updatedSchedule });
      setNewScheduleName('');
      setNewScheduleDate('');
      setNewScheduleNote('');
    } catch (err) {
      console.error('Error adding schedule item:', err);
    }
  };

  // Remove a schedule entry by ID
  const removeScheduleItem = async (itemId) => {
    if (!user || !activeCarnivalId) return;
    const carnival = carnivals[activeCarnivalId];
    if (!carnival || !Array.isArray(carnival.schedule)) return;
    const updatedSchedule = carnival.schedule.filter(
      (item) => item.id !== itemId,
    );
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { schedule: updatedSchedule });
    } catch (err) {
      console.error('Error removing schedule item:', err);
    }
  };

  // Add a packing list item
  const addPackingItem = async () => {
    if (!user || !activeCarnivalId) return;
    if (!newPackingItem.trim()) return;
    const carnival = carnivals[activeCarnivalId] || {};
    const newItem = {
      id: Date.now().toString(),
      item: newPackingItem.trim(),
      checked: false,
    };
    const updatedPacking = Array.isArray(carnival.packing)
      ? [...carnival.packing, newItem]
      : [newItem];
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { packing: updatedPacking });
      setNewPackingItem('');
    } catch (err) {
      console.error('Error adding packing item:', err);
    }
  };

  // Toggle the checked state of a packing item
  const togglePackingItem = async (itemId) => {
    if (!user || !activeCarnivalId) return;
    const carnival = carnivals[activeCarnivalId];
    if (!carnival || !Array.isArray(carnival.packing)) return;
    const updatedPacking = carnival.packing.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item,
    );
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { packing: updatedPacking });
    } catch (err) {
      console.error('Error toggling packing item:', err);
    }
  };

  // Remove a packing item
  const removePackingItem = async (itemId) => {
    if (!user || !activeCarnivalId) return;
    const carnival = carnivals[activeCarnivalId];
    if (!carnival || !Array.isArray(carnival.packing)) return;
    const updatedPacking = carnival.packing.filter((item) => item.id !== itemId);
    try {
      const ref = doc(
        db,
        'users',
        user.uid,
        'apps',
        appId,
        'carnivals',
        activeCarnivalId,
      );
      await updateDoc(ref, { packing: updatedPacking });
    } catch (err) {
      console.error('Error removing packing item:', err);
    }
  };

  // Derive current carnival object
  const currentCarnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;

  // Compute budget total
  const budgetTotal =
    currentCarnival && Array.isArray(currentCarnival.budget)
      ? currentCarnival.budget.reduce((sum, item) => sum + (item.cost || 0), 0)
      : 0;

  // Handle Stripe return routes before showing the main app
  if (route === '/premium-success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <img src={logo} alt="Carnival Planner logo" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-extrabold mb-2">Welcome to Premium 🎉</h1>
        <p className="text-center text-lg mb-6 max-w-md">
          Your Carnival Planner Premium subscription is active. You now unlock advanced features as they roll out.
        </p>
        <button
          onClick={goHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Carnival Planner
        </button>
      </div>
    );
  }

  if (route === '/premium-cancel') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <img src={logo} alt="Carnival Planner logo" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-extrabold mb-2">Checkout Cancelled</h1>
        <p className="text-center text-lg mb-6 max-w-md">
          No worries—your free planner still works great. You can upgrade to Premium anytime from inside the app.
        </p>
        <button
          onClick={goHome}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Back to Carnival Planner
        </button>
      </div>
    );
  }

  // Render a simple splash screen with the logo before showing the
  // rest of the application.  The splash is suppressed when the
  // visitor clicks "Get Started" or if a user is already logged in.
  if (showLanding && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <img src={logo} alt="Carnival Planner logo" className="w-48 h-48 mb-6" />
        <h1 className="text-4xl font-extrabold mb-2">Carnival Planner</h1>
        <p className="text-center text-lg mb-8 max-w-md">
          Plan your perfect carnival experience across Trinidad, Guyana and St. Lucia.
        </p>
        <button
          onClick={() => setShowLanding(false)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Carnival Planner</h1>
        {user && (
          <div className="flex items-center gap-4">
            {isPremium && (
              <span className="px-2 py-1 text-xs bg-yellow-300 text-yellow-800 rounded-full">
                Premium
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {!user && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Carnival Planner</h2>
            <p className="mb-6 text-gray-600 max-w-md">
              Organize your trip for Trinidad, Guyana or St. Lucia. Track your
              budget, schedule your fetes and build a packing list—all in one
              place.
            </p>
            <button
              onClick={handleSignIn}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Sign in with Google
            </button>
          </div>
        )}
        {user && (
          <div>
            {/* Premium upsell banner */}
            {!isPremium && (
              <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-3 mb-6 rounded">
                <p className="font-semibold mb-1">Unlock Premium Features</p>
                <p className="text-sm mb-2">
                  Export itineraries, store travel documents, enjoy offline access and plan with
                  friends. Premium is just $4.99/month or $39.99/year.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <button
                    onClick={() => handleSubscribe('monthly')}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go Monthly – $4.99
                  </button>
                  <button
                    onClick={() => handleSubscribe('yearly')}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Go Yearly – $39.99
                  </button>
                </div>
              </div>
            )}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Choose your carnival</h2>
              {/* Horizontally scrollable list of carnival cards */}
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {carnivalOptions.map((c, idx) => {
                  const isActive = activeCarnivalId === c.id;
                  const gradient = gradientClasses[idx % gradientClasses.length];
                  // Compute days remaining until the next occurrence of this carnival.
                  const now = new Date();
                  const year =
                    now.getMonth() <= c.monthIndex
                      ? now.getFullYear()
                      : now.getFullYear() + 1;
                  const eventDate = new Date(year, c.monthIndex, 1);
                  const diffMs = eventDate.getTime() - now.getTime();
                  const diffDays = Math.max(
                    0,
                    Math.ceil(diffMs / (1000 * 60 * 60 * 24)),
                  );
                  return (
                    <div
                      key={c.id}
                      onClick={() =>
                        selectCarnival(
                          c.id,
                          `${c.name} - ${monthNames[c.monthIndex]}`,
                        )
                      }
                      className={`min-w-[220px] cursor-pointer rounded-xl p-4 shadow-md transition-transform transform hover:scale-105 ${gradient} ${
                        isActive ? 'ring-4 ring-yellow-300' : ''
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <img src={logo} alt="logo" className="w-6 h-6 mr-2" />
                        <h4 className="text-white font-bold text-lg">{c.name}</h4>
                      </div>
                      <p className="text-white text-sm opacity-80">
                        {monthNames[c.monthIndex]}
                      </p>
                      <p className="text-white text-xs opacity-80 mt-1">
                        {diffDays} days left
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {!currentCarnival && (
              <p className="text-gray-600">
                Select a carnival above to start planning. A new carnival will be
                created automatically if one doesn't already exist.
              </p>
            )}
            {currentCarnival && (
              <div>
                <div className="mb-4 border-b border-gray-200">
                  {['Budget', 'Schedule', 'Packing'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={
                        'mr-4 pb-2 border-b-2 ' +
                        (activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700')
                      }
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {activeTab === 'Budget' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Budget Items</h3>
                    {Array.isArray(currentCarnival.budget) &&
                    currentCarnival.budget.length > 0 ? (
                      <ul className="mb-4 divide-y divide-gray-200">
                        {currentCarnival.budget.map((item) => (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between items-center"
                          >
                            <span>
                              {item.name} - ${item.cost.toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeBudgetItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 mb-4">No budget items yet.</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Item description"
                        value={newBudgetName}
                        onChange={(e) => setNewBudgetName(e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="number"
                        placeholder="Cost"
                        value={newBudgetCost}
                        onChange={(e) => setNewBudgetCost(e.target.value)}
                        className="p-2 border rounded"
                      />
                      <button
                        onClick={addBudgetItem}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Item
                      </button>
                    </div>
                    <p className="font-semibold">Total: ${budgetTotal.toFixed(2)}</p>
                  </div>
                )}
                {activeTab === 'Schedule' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Schedule</h3>
                    {Array.isArray(currentCarnival.schedule) &&
                    currentCarnival.schedule.length > 0 ? (
                      <ul className="mb-4 divide-y divide-gray-200">
                        {currentCarnival.schedule
                          .slice()
                          .sort(
                            (a, b) =>
                              new Date(a.datetime) - new Date(b.datetime),
                          )
                          .map((event) => (
                            <li
                              key={event.id}
                              className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="mb-1 sm:mb-0">
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-gray-600">
                                  {new Date(event.datetime).toLocaleString()}{' '}
                                  {event.note ? ' - ' + event.note : ''}
                                </div>
                              </div>
                              <button
                                onClick={() => removeScheduleItem(event.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 mb-4">
                        No events scheduled yet.
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Event name"
                        value={newScheduleName}
                        onChange={(e) => setNewScheduleName(e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="datetime-local"
                        value={newScheduleDate}
                        onChange={(e) => setNewScheduleDate(e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Notes (optional)"
                        value={newScheduleNote}
                        onChange={(e) => setNewScheduleNote(e.target.value)}
                        className="p-2 border rounded"
                      />
                      <button
                        onClick={addScheduleItem}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'Packing' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Packing List</h3>
                    {Array.isArray(currentCarnival.packing) &&
                    currentCarnival.packing.length > 0 ? (
                      <ul className="mb-4 divide-y divide-gray-200">
                        {currentCarnival.packing.map((item) => (
                          <li
                            key={item.id}
                            className="py-2 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => togglePackingItem(item.id)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                              />
                              <span
                                className={
                                  item.checked
                                    ? 'line-through text-gray-500'
                                    : ''
                                }
                              >
                                {item.item}
                              </span>
                            </div>
                            <button
                              onClick={() => removePackingItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 mb-4">
                        Your packing list is empty.
                      </p>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Item to pack"
                        value={newPackingItem}
                        onChange={(e) => setNewPackingItem(e.target.value)}
                        className="flex-1 p-2 border rounded"
                      />
                      <button
                        onClick={addPackingItem}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="bg-gray-100 text-center text-sm p-4 text-gray-500">
        © {new Date().getFullYear()} Carnival Planner
      </footer>
    </div>
  );
}