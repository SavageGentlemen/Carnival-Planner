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
import { auth, db } from './firebase'; // FIXED: Removed appId from import
import logo from './assets/carnival-logo.png';

// FIXED: Defined appId locally
const appId = 'carnival-planner';

export default function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  
  // Data state
  const [carnivals, setCarnivals] = useState({});
  const [activeCarnivalId, setActiveCarnivalId] = useState(null);
  const [activeTab, setActiveTab] = useState('Budget');
  
  // Form states
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCost, setNewBudgetCost] = useState('');
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleNote, setNewScheduleNote] = useState('');
  const [newPackingItem, setNewPackingItem] = useState('');

  // Premium State
  const [isPremium, setIsPremium] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  // --- CARNIVAL CONFIGURATION ---
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

  // 1. Handle Auth & Force Premium
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Load Carnivals
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

  // 3. Handle Redirect Results
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
    setActiveTab('Budget');
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
          createdAt: Timestamp.now(),
        }, { merge: true });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- DATA MUTATIONS ---

  const updateCarnivalData = async (field, newData) => {
    if (!user || !activeCarnivalId) return;
    const ref = doc(db, 'users', user.uid, 'apps', appId, 'carnivals', activeCarnivalId);
    await updateDoc(ref, { [field]: newData });
  };

  const addBudgetItem = () => {
    if (!newBudgetName.trim() || !newBudgetCost) return;
    const current = carnivals[activeCarnivalId] || {};
    const items = current.budget || [];
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
    const current = carnivals[activeCarnivalId] || {};
    const items = current.schedule || [];
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

  const addPackingItem = () => {
    if (!newPackingItem.trim()) return;
    const current = carnivals[activeCarnivalId] || {};
    const items = current.packing || [];
    const newItem = { id: Date.now().toString(), item: newPackingItem.trim(), checked: false };
    updateCarnivalData('packing', [...items, newItem]);
    setNewPackingItem('');
  };

  const togglePackingItem = (id) => {
    const items = carnivals[activeCarnivalId]?.packing || [];
    const updated = items.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
    updateCarnivalData('packing', updated);
  };

  const removePackingItem = (id) => {
    const items = carnivals[activeCarnivalId]?.packing || [];
    updateCarnivalData('packing', items.filter(i => i.id !== id));
  };

  // --- EXPORT FEATURE ---

  const handleExport = () => {
    if (!currentCarnival) return;
    
    const lines = [];
    lines.push(`CARNIVAL PLANNER: ${currentCarnival.name}`);
    lines.push('==========================================\n');
    
    lines.push('--- BUDGET ---');
    (currentCarnival.budget || []).forEach(b => {
      lines.push(`${b.name}: $${b.cost.toFixed(2)}`);
    });
    lines.push(`TOTAL ESTIMATE: $${budgetTotal.toFixed(2)}\n`);

    lines.push('--- SCHEDULE ---');
    const sortedSchedule = (currentCarnival.schedule || []).slice().sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
    sortedSchedule.forEach(s => {
      lines.push(`${new Date(s.datetime).toLocaleString()} | ${s.title} ${s.note ? `(${s.note})` : ''}`);
    });
    lines.push('\n');

    lines.push('--- PACKING LIST ---');
    (currentCarnival.packing || []).forEach(p => {
      lines.push(`[${p.checked ? 'x' : ' '}] ${p.item}`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCarnival.name.replace(/\s+/g, '_')}_Plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- RENDER HELPERS ---

  const currentCarnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
  const budgetTotal = currentCarnival?.budget?.reduce((acc, item) => acc + (item.cost || 0), 0) || 0;

  // --- UI RENDER ---

  if (showLanding && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 opacity-50 z-0"></div>
        <div className="relative z-10 flex flex-col items-center">
          <img src={logo} alt="Carnival Planner" className="w-40 h-40 mb-6 drop-shadow-2xl animate-pulse" />
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-center">Carnival Planner</h1>
          <p className="text-xl mb-8 text-center max-w-lg text-gray-200">
            The ultimate companion for your Caribbean carnival experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center text-sm w-full max-w-2xl">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-bold text-yellow-300">Budget Tracker</h3>
              <p>Manage fete tickets and costume costs.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl mb-2 block">📅</span>
              <h3 className="font-bold text-blue-300">Itinerary</h3>
              <p>Schedule your events and fetes.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <span className="text-2xl mb-2 block">🎒</span>
              <h3 className="font-bold text-green-300">Packing List</h3>
              <p>Never forget your essentials.</p>
            </div>
          </div>

          <button
            onClick={() => setShowLanding(false)}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Start Planning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm py-4 px-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-800 hidden sm:block">Carnival Planner</h1>
        </div>
        {user && (
          <div className="flex items-center gap-3">
            {isPremium && (
              <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-sm">
                PREMIUM UNLOCKED
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* BODY */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {!user ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to fete?</h2>
            <p className="mb-8 text-gray-600 max-w-md">
              Sign in to save your budgets and itineraries securely in the cloud.
            </p>
            <button
              onClick={handleSignIn}
              className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="G" />
              Sign in with Google
            </button>
          </div>
        ) : (
          <div>
            {/* CARNIVAL SELECTOR */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Select your Destination</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {carnivalOptions.map((c, idx) => {
                  const isActive = activeCarnivalId === c.id;
                  const gradient = gradientClasses[idx % gradientClasses.length];
                  return (
                    <div
                      key={c.id}
                      onClick={() => selectCarnival(c.id, `${c.name} - ${monthNames[c.monthIndex]}`)}
                      className={`
                        snap-center min-w-[200px] cursor-pointer rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all duration-300
                        ${isActive ? 'ring-4 ring-offset-2 ring-blue-400 scale-105' : 'hover:scale-105 opacity-90'}
                        ${gradient}
                      `}
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
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">Select a carnival above to begin.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {/* TABS */}
                <div className="flex border-b border-gray-100">
                  {['Budget', 'Schedule', 'Packing', 'Info'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        flex-1 py-4 text-sm font-medium transition-colors relative
                        ${activeTab === tab ? 'text-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                      `}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {/* TAB: BUDGET */}
                  {activeTab === 'Budget' && (
                    <div className="animate-fadeIn">
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Budget</h3>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Estimated Cost</p>
                          <p className="text-2xl font-black text-green-600">${budgetTotal.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {(currentCarnival.budget || []).map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                            <span className="font-medium text-gray-700">{item.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-gray-900">${item.cost.toFixed(2)}</span>
                              <button onClick={() => removeBudgetItem(item.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                        {(currentCarnival.budget || []).length === 0 && (
                          <p className="text-center text-gray-400 py-4 italic">No expenses added yet.</p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Costume, Flight, Fete..."
                          value={newBudgetName}
                          onChange={(e) => setNewBudgetName(e.target.value)}
                          className="flex-[2] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <input
                          type="number"
                          placeholder="0.00"
                          value={newBudgetCost}
                          onChange={(e) => setNewBudgetCost(e.target.value)}
                          className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button onClick={addBudgetItem} className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB: SCHEDULE */}
                  {activeTab === 'Schedule' && (
                    <div className="animate-fadeIn">
                       <h3 className="text-xl font-bold text-gray-800 mb-4">Itinerary</h3>
                       <div className="space-y-4 mb-6">
                        {currentCarnival.schedule && currentCarnival.schedule.length > 0 ? (
                          currentCarnival.schedule
                            .slice()
                            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
                            .map((event) => (
                              <div key={event.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 relative group">
                                <div className="text-center min-w-[60px]">
                                  <span className="block text-xs font-bold text-gray-500 uppercase">
                                    {new Date(event.datetime).toLocaleDateString('en-US', { month: 'short' })}
                                  </span>
                                  <span className="block text-xl font-black text-gray-800">
                                    {new Date(event.datetime).getDate()}
                                  </span>
                                  <span className="block text-xs text-gray-500">
                                    {new Date(event.datetime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800">{event.title}</h4>
                                  {event.note && <p className="text-sm text-gray-600 mt-1">{event.note}</p>}
                                </div>
                                <button 
                                  onClick={() => removeScheduleItem(event.id)}
                                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            ))
                        ) : (
                          <p className="text-center text-gray-400 py-4 italic">No events scheduled.</p>
                        )}
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl">
                          <input
                            type="text"
                            placeholder="Event Name (e.g. AM Bush)"
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
                            placeholder="Notes (Location, Outfit...)"
                            value={newScheduleNote}
                            onChange={(e) => setNewScheduleNote(e.target.value)}
                            className="p-2 border rounded md:col-span-2"
                          />
                          <button onClick={addScheduleItem} className="md:col-span-2 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
                            Add Event
                          </button>
                       </div>
                    </div>
                  )}

                  {/* TAB: PACKING */}
                  {activeTab === 'Packing' && (
                    <div className="animate-fadeIn">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Packing List</h3>
                      <div className="space-y-2 mb-6">
                        {(currentCarnival.packing || []).map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 shadow-sm rounded-lg">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => togglePackingItem(item.id)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className={`text-gray-700 ${item.checked ? 'line-through opacity-50' : ''}`}>
                                {item.item}
                              </span>
                            </div>
                            <button onClick={() => removePackingItem(item.id)} className="text-gray-400 hover:text-red-500">
                              ×
                            </button>
                          </div>
                        ))}
                         {(currentCarnival.packing || []).length === 0 && (
                          <p className="text-center text-gray-400 py-4 italic">Add items so you don't forget them!</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Sunscreen, Flag, Vitamin C..."
                          value={newPackingItem}
                          onChange={(e) => setNewPackingItem(e.target.value)}
                          className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button onClick={addPackingItem} className="px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB: INFO (PREMIUM & EXPORT) */}
                  {activeTab === 'Info' && (
                    <div className="animate-fadeIn text-center">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mb-6 shadow-xl">
                         <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                         <h2 className="text-2xl font-bold mb-2">Premium Features Active</h2>
                         <p className="text-gray-400 mb-6">You have full access to all Carnival Planner tools.</p>
                         
                         <button 
                           onClick={handleExport}
                           className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
                         >
                           <span>📥</span> Export Full Itinerary
                         </button>
                         <p className="text-xs text-gray-500 mt-2">Downloads a text summary of your budget and events.</p>
                      </div>

                      <div className="text-left bg-blue-50 p-6 rounded-xl">
                        <h4 className="font-bold text-blue-900 mb-2">About {currentCarnival.name}</h4>
                        <p className="text-blue-800 text-sm">
                          Keep track of your spending and schedule to ensure a stress-free experience on the road.
                          Use the export button above to share your plans with your squad.
                        </p>
                      </div>
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