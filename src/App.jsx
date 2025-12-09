import React, { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
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
import { auth, db, appId } from './firebase';
import { carnivalData } from './carnivals.js';

const dateDiffInDays = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export default function App() {
  // --- State Management ---
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState(window.location.pathname);
  const [carnivals, setCarnivals] = useState({});
  const [activeCarnivalId, setActiveCarnivalId] = useState(null);
  const [activeTab, setActiveTab] = useState('Budget');

  // Form State
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCost, setNewBudgetCost] = useState('');
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleNote, setNewScheduleNote] = useState('');
  const [newPackingItem, setNewPackingItem] = useState('');

  // Premium State
  const [isPremium, setIsPremium] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // --- Configuration ---
  const functions = getFunctions();
  const STRIPE_MONTHLY_PRICE_ID = 'price_1SanHUJR9xpdRiXijLesRPVt';
  const STRIPE_YEARLY_PRICE_ID = 'price_1SanMhJR9xpdRiXinv2F9knM';

  const carnivalOptions = [
    { id: 'trinidad', name: 'Trinidad Carnival', monthIndex: 1 },
    { id: 'stkitts-sugar-mas', name: 'St. Kitts & Nevis (Sugar Mas)', monthIndex: 0 },
    { id: 'aruba', name: 'Aruba Carnival', monthIndex: 1 },
    { id: 'guyana-mashramani', name: 'Guyana Mashramani', monthIndex: 1 },
    { id: 'guyana-independence', name: 'Guyana Independence Carnival', monthIndex: 4 },
    { id: 'jamaica', name: 'Jamaica Carnival', monthIndex: 3 },
    { id: 'stmaarten', name: 'St. Maarten Carnival', monthIndex: 3 },
    { id: 'bahamas', name: 'Bahamas Carnival', monthIndex: 5 },
    { id: 'bermuda', name: 'Bermuda Carnival', monthIndex: 5 },
    { id: 'vincymas', name: 'Vincy Mas (St. Vincent)', monthIndex: 6 },
    { id: 'antigua', name: 'Antigua Carnival', monthIndex: 7 },
    { id: 'tobago', name: 'Tobago Carnival', monthIndex: 9 },
    { id: 'stlucia', name: 'St. Lucia Carnival', monthIndex: 6 },
  ];

  const gradientClasses = [
    'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
    'bg-gradient-to-r from-teal-400 to-cyan-500',
    'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500',
    'bg-gradient-to-r from-purple-600 to-indigo-600',
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // --- Effects ---
  useEffect(() => {
    const handler = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const goHome = () => {
    window.history.pushState({}, '', '/');
    setRoute('/');
  };

  // Auth Listener
  useEffect(() => {
    onAuthStateChanged(auth, setUser);
    getRedirectResult(auth)
      .catch((err) => console.error('Redirect Error:', err))
      .finally(() => setLoading(false));
  }, []);


  // Premium Status Listener
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

  // Carnival Data Listener
  useEffect(() => {
    if (!user) {
      setCarnivals({});
      setActiveCarnivalId(null);
      return;
    }
    const carnivalsRef = collection(db, 'users', user.uid, 'apps', appId, 'carnivals');
    const unsubscribe = onSnapshot(carnivalsRef, (snapshot) => {
      const map = {};
      snapshot.forEach((docSnap) => { map[docSnap.id] = docSnap.data(); });
      setCarnivals(map);
      if (!activeCarnivalId && snapshot.docs.length > 0) {
        setActiveCarnivalId(snapshot.docs[0].id);
      }
    });
    return () => unsubscribe();
  }, [user]);

  // --- Actions ---
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error('Sign In Error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setActiveCarnivalId(null);
      setActiveTab('Budget');
    } catch (err) { console.error('Sign Out Error:', err); }
  };

  const handleSubscribe = async (interval) => {
    if (!user) return alert("Please sign in to subscribe.");

    const billingInterval = interval === "yearly" ? "yearly" : "monthly";
    const priceId = billingInterval === "yearly" ? STRIPE_YEARLY_PRICE_ID : STRIPE_MONTHLY_PRICE_ID;

    if (!priceId || priceId.startsWith("price_XXXXXXXX")) {
      return alert("Premium pricing is not configured properly.");
    }

    setIsCheckingOut(true);
    try {
      const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");
      const result = await createCheckoutSession({
        priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });
      if (result.data?.checkoutUrl) {
        window.location.href = result.data.checkoutUrl;
      } else {
        alert("Unable to start checkout.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Problem starting checkout. Try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // --- Data Helpers ---
  const selectCarnival = async (id, name) => {
    if (!user) return;
    setActiveCarnivalId(id);
    if (!carnivals[id]) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'apps', appId, 'carnivals', id), {
          name, budget: [], schedule: [], packing: [], createdAt: Timestamp.now(),
        }, { merge: true });
      } catch (err) { console.error('Create Carnival Error:', err); }
    }
  };

  const updateCarnivalData = async (field, newData) => {
    if (!user || !activeCarnivalId) return;
    try {
      const ref = doc(db, 'users', user.uid, 'apps', appId, 'carnivals', activeCarnivalId);
      await updateDoc(ref, { [field]: newData });
    } catch (err) { console.error(`Error updating ${field}:`, err); }
  };

  // Budget
  const addBudgetItem = () => {
    if (!newBudgetName.trim() || !newBudgetCost) return;
    const carnival = carnivals[activeCarnivalId] || {};
    const newItem = { id: Date.now().toString(), name: newBudgetName.trim(), cost: parseFloat(newBudgetCost) };
    updateCarnivalData('budget', [...(carnival.budget || []), newItem]);
    setNewBudgetName(''); setNewBudgetCost('');
  };
  const removeBudgetItem = (itemId) => {
    const carnival = carnivals[activeCarnivalId];
    if (carnival?.budget) updateCarnivalData('budget', carnival.budget.filter(i => i.id !== itemId));
  };

  // Schedule
  const addScheduleItem = () => {
    if (!newScheduleName.trim() || !newScheduleDate) return;
    const carnival = carnivals[activeCarnivalId] || {};
    const newItem = { id: Date.now().toString(), title: newScheduleName.trim(), datetime: newScheduleDate, note: newScheduleNote.trim() };
    updateCarnivalData('schedule', [...(carnival.schedule || []), newItem]);
    setNewScheduleName(''); setNewScheduleDate(''); setNewScheduleNote('');
  };
  const removeScheduleItem = (itemId) => {
    const carnival = carnivals[activeCarnivalId];
    if (carnival?.schedule) updateCarnivalData('schedule', carnival.schedule.filter(i => i.id !== itemId));
  };

  // Packing
  const addPackingItem = () => {
    if (!newPackingItem.trim()) return;
    const carnival = carnivals[activeCarnivalId] || {};
    const newItem = { id: Date.now().toString(), item: newPackingItem.trim(), checked: false };
    updateCarnivalData('packing', [...(carnival.packing || []), newItem]);
    setNewPackingItem('');
  };
  const togglePackingItem = (itemId) => {
    const carnival = carnivals[activeCarnivalId];
    if (carnival?.packing) updateCarnivalData('packing', carnival.packing.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i));
  };
  const removePackingItem = (itemId) => {
    const carnival = carnivals[activeCarnivalId];
    if (carnival?.packing) updateCarnivalData('packing', carnival.packing.filter(i => i.id !== itemId));
  };

  const currentCarnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
  const budgetTotal = currentCarnival?.budget?.reduce((sum, item) => sum + (item.cost || 0), 0) || 0;

  // --- Rendering ---
  if (loading || user === undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (route === '/premium-success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <img src="/assets/carnival592x592.png" alt="Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-extrabold mb-2">Welcome to Premium 🎉</h1>
        <button onClick={goHome} className="mt-6 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">Back to Planner</button>
      </div>
    );
  }
  if (route === '/premium-cancel') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <img src="/assets/carnival592x592.png" alt="Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-3xl font-extrabold mb-2">Checkout Cancelled</h1>
        <button onClick={goHome} className="mt-6 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-800">Back to Planner</button>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <img src="/assets/carnival592x592.png" alt="Logo" className="w-48 h-48 mb-6" />
        <h1 className="text-4xl font-extrabold mb-2">Carnival Planner</h1>
        <p className="text-lg mb-8">Plan your perfect carnival experience.</p>
        <button onClick={handleSignIn} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">Get Started</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white/90 backdrop-blur-md">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Carnival Planner</h1>
        {user && (
          <div className="flex items-center gap-4">
            {isPremium && <span className="px-2 py-1 text-xs bg-yellow-300 text-yellow-800 rounded-full">Premium</span>}
            <button onClick={handleSignOut} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Sign Out</button>
          </div>
        )}
      </header>

      <main className="flex-1 p-6">
        <div>
          {!isPremium && (
            <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-3 mb-6 rounded">
              <p className="font-semibold">Unlock Premium Features</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleSubscribe('monthly')} className="px-3 py-1 bg-blue-600 text-white rounded">Monthly $4.99</button>
                <button onClick={() => handleSubscribe('yearly')} className="px-3 py-1 bg-indigo-600 text-white rounded">Yearly $39.99</button>
              </div>
            </div>
          )}

          {/* Carnival Selector */}
          <div className="mb-6 overflow-x-auto pb-2 flex space-x-4">
            {carnivalOptions.map((c, idx) => {
              const isActive = activeCarnivalId === c.id;
              const carnival = carnivalData.find(data => data.name === c.name);
              const daysRemaining = carnival ? dateDiffInDays(new Date(), new Date(carnival.date)) : null;

              return (
                <div key={c.id} onClick={() => selectCarnival(c.id, `${c.name} - ${monthNames[c.monthIndex]}`)}
                  className={`min-w-[220px] cursor-pointer rounded-xl p-4 shadow-md transition-transform transform hover:scale-105 ${gradientClasses[idx % gradientClasses.length]} ${isActive ? 'ring-4 ring-yellow-300' : ''}`}>
                  <h4 className="text-white font-bold text-lg">{c.name}</h4>
                  <p className="text-white text-sm opacity-80">{monthNames[c.monthIndex]}</p>
                  {daysRemaining !== null && (
                    <div className="text-white text-2xl font-bold mt-2">
                      {daysRemaining > 0 ? `${daysRemaining} days` : (daysRemaining === 0 ? 'Today!' : 'Happening Now!')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Carnival View */}
          {currentCarnival && (
            <div>
              <div className="mb-4 border-b border-gray-200">
                {['Budget', 'Schedule', 'Packing'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`mr-4 pb-2 border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>{tab}</button>
                ))}
              </div>

              {activeTab === 'Budget' && (
                <div>
                  <ul className="mb-4 divide-y divide-gray-200">
                    {currentCarnival.budget?.map(item => (
                      <li key={item.id} className="py-2 flex justify-between">
                        <span>{item.name} - ${item.cost.toFixed(2)}</span>
                        <button onClick={() => removeBudgetItem(item.id)} className="text-red-500">Remove</button>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                    <input placeholder="Item" value={newBudgetName} onChange={e => setNewBudgetName(e.target.value)} className="p-2 border rounded" />
                    <input type="number" placeholder="Cost" value={newBudgetCost} onChange={e => setNewBudgetCost(e.target.value)} className="p-2 border rounded" />
                    <button onClick={addBudgetItem} className="bg-blue-600 text-white p-2 rounded">Add</button>
                  </div>
                  <p className="font-bold">Total: ${budgetTotal.toFixed(2)}</p>
                </div>
              )}

              {activeTab === 'Schedule' && (
                <div>
                  <ul className="mb-4 divide-y divide-gray-200">
                    {currentCarnival.schedule?.sort((a,b) => new Date(a.datetime) - new Date(b.datetime)).map(event => (
                      <li key={item.id} className="py-2 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-600">{new Date(event.datetime).toLocaleString()} {event.note && `- ${event.note}`}</div>
                        </div>
                        <button onClick={() => removeScheduleItem(event.id)} className="text-red-500">Remove</button>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input placeholder="Event" value={newScheduleName} onChange={e => setNewScheduleName(e.target.value)} className="p-2 border rounded" />
                    <input type="datetime-local" value={newScheduleDate} onChange={e => setNewScheduleDate(e.target.value)} className="p-2 border rounded" />
                    <input placeholder="Notes" value={newScheduleNote} onChange={e => setNewScheduleNote(e.target.value)} className="p-2 border rounded" />
                    <button onClick={addScheduleItem} className="bg-blue-600 text-white p-2 rounded">Add</button>
                  </div>
                </div>
              )}

              {activeTab === 'Packing' && (
                <div>
                  <ul className="mb-4 divide-y divide-gray-200">
                    {currentCarnival.packing?.map(item => (
                      <li key={item.id} className="py-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={item.checked} onChange={() => togglePackingItem(item.id)} className="h-5 w-5" />
                          <span className={item.checked ? 'line-through text-gray-500' : ''}>{item.item}</span>
                        </div>
                        <button onClick={() => removePackingItem(item.id)} className="text-red-500">Remove</button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input placeholder="Item" value={newPackingItem} onChange={e => setNewPackingItem(e.target.value)} className="flex-1 p-2 border rounded" />
                    <button onClick={addPackingItem} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
