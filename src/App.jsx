import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  CreditCard, 
  Home, 
  Briefcase, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Plane, 
  MapPin, 
  Ticket, 
  Clock,
  Sun,
  Moon,
  Music,
  LogOut,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Map,
  Lock,
  ExternalLink
} from 'lucide-react';

// --- Firebase (use the centralized instance) ---
import { auth, db } from "./firebase";
import { 
  signInWithCustomToken, 
  signInAnonymously, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot
} from "firebase/firestore";

// FIX: Sanitize appId to prevent slash-related path errors in Firestore
const rawAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const appId = rawAppId.replace(/[^a-zA-Z0-9_-]/g, '_');

// --- Multi-Island Data ---
const CARNIVALS = {
  // JANUARY
  'stkitts2026': {
    id: 'stkitts2026',
    name: 'Sugar Mas 55',
    country: 'St. Kitts & Nevis',
    date: '2026-01-02T08:00:00', // Grand Parade
    color: 'red',
    ad: { title: 'Ferry Ticket', text: 'Book ferry to Nevis for cool down.', link: '#' }
  },
  // FEBRUARY
  'trinidad2026': {
    id: 'trinidad2026',
    name: 'Trinidad Carnival',
    country: 'Trinidad & Tobago',
    date: '2026-02-16T04:00:00', // J'ouvert
    color: 'teal',
    ad: { title: 'Need Transport?', text: 'Book a reliable driver in POS.', link: '#' }
  },
  'guyana2026': {
    id: 'guyana2026',
    name: 'Mashramani 2026',
    country: 'Guyana',
    date: '2026-02-23T08:00:00', // Republic Day
    color: 'yellow',
    ad: { title: 'Hungry?', text: 'Try ChowMan Ramen after the road.', link: '#' }
  },
  'aruba2026': {
    id: 'aruba2026',
    name: 'Aruba Carnival',
    country: 'Aruba',
    date: '2026-02-15T10:00:00', // Grand Parade
    color: 'blue',
    ad: { title: 'Beach Day', text: 'Eagle Beach lounger rentals.', link: '#' }
  },
  // APRIL
  'jamaica2026': {
    id: 'jamaica2026',
    name: 'Jamaica Carnival',
    country: 'Jamaica',
    date: '2026-04-12T09:00:00', // Road March
    color: 'green',
    ad: { title: 'Ochi Transport', text: 'Shuttles to Ocho Rios fetes.', link: '#' }
  },
  'stmaarten2026': {
    id: 'stmaarten2026',
    name: 'St. Maarten Carnival',
    country: 'St. Maarten',
    date: '2026-05-01T08:00:00', // Grand Parade (Labor Day)
    color: 'orange',
    ad: { title: 'Villa Stay', text: 'Luxury villas in Simpson Bay.', link: '#' }
  },
  // MAY
  'guyana_may_2026': {
    id: 'guyana_may_2026',
    name: 'Guyana Carnival (May)',
    country: 'Guyana',
    date: '2026-05-26T14:00:00', // Independence
    color: 'green',
    ad: { title: 'VIP Tables', text: 'Reserve for Genesis All White.', link: '#' }
  },
  // JUNE
  'bahamas2026': {
    id: 'bahamas2026',
    name: 'Bahamas Carnival',
    country: 'Bahamas',
    date: '2026-06-06T10:00:00', 
    color: 'teal',
    ad: { title: 'Atlantis Day Pass', text: 'Recover at the water park.', link: '#' }
  },
  'bermuda2026': {
    id: 'bermuda2026',
    name: 'Bermuda Carnival',
    country: 'Bermuda',
    date: '2026-06-15T12:00:00', // Heroes Weekend
    color: 'blue',
    ad: { title: 'Raft Up', text: 'Catamaran rentals for the water.', link: '#' }
  },
  // JULY
  'vincymas2026': {
    id: 'vincymas2026',
    name: 'Vincy Mas',
    country: 'St. Vincent',
    date: '2026-07-07T09:00:00', // Mardi Gras
    color: 'yellow',
    ad: { title: 'Sunset Cruise', text: 'Grenadines tour bookings.', link: '#' }
  },
  'stlucia2026': {
    id: 'stlucia2026',
    name: 'St. Lucia Carnival',
    country: 'St. Lucia',
    date: '2026-07-20T08:00:00', 
    color: 'blue',
    ad: { title: 'Boat Ride?', text: 'Catamaran cruises for cheap.', link: '#' }
  },
  // AUGUST
  'barbados2026': {
    id: 'barbados2026',
    name: 'Crop Over 2026',
    country: 'Barbados',
    date: '2026-08-03T08:00:00', // Kadooment Day
    color: 'orange',
    ad: { title: 'Villa Rental', text: 'Stay near the beach.', link: '#' }
  },
  'antigua2026': {
    id: 'antigua2026',
    name: 'Antigua Carnival',
    country: 'Antigua',
    date: '2026-08-04T09:00:00', 
    color: 'red',
    ad: { title: 'Sheer Rocks', text: 'Dinner reservations at sunset.', link: '#' }
  },
  'grenada2026': {
    id: 'grenada2026',
    name: 'Spicemas 2026',
    country: 'Grenada',
    date: '2026-08-10T04:00:00', // Jab Jab J'ouvert
    color: 'red',
    ad: { title: 'Jab Jab Oil', text: 'Get your paint & oil kits.', link: '#' }
  },
  // OCTOBER
  'tobago2026': {
    id: 'tobago2026',
    name: 'Tobago Carnival',
    country: 'Tobago',
    date: '2026-10-31T09:00:00', 
    color: 'teal',
    ad: { title: 'Nylon Pool', text: 'Glass bottom boat tours.', link: '#' }
  }
};

const TABS = {
  DASHBOARD: 'dashboard',
  BUDGET: 'budget',
  SCHEDULE: 'schedule',
  VAULT: 'vault',
  PACKING: 'packing'
};

const DEFAULT_PACKING_LIST = [
  { id: 'p1', category: 'Essentials', item: 'Passport', checked: false },
  { id: 'p2', category: 'Essentials', item: 'Flight Tickets', checked: false },
  { id: 'p3', category: 'Essentials', item: 'Cash (USD)', checked: false },
  { id: 'p4', category: 'The Road', item: 'Gel Insoles', checked: false, affiliate: 'https://amazon.com/insoles' },
  { id: 'p5', category: 'The Road', item: 'Sunblock (Spray)', checked: false, affiliate: 'https://amazon.com/sunblock' },
  { id: 'p6', category: 'The Road', item: 'Stockings (2 pairs)', checked: false, affiliate: 'https://amazon.com/stockings' },
  { id: 'p7', category: 'The Road', item: 'Portable Charger', checked: false, affiliate: 'https://amazon.com/powerbank' },
  { id: 'p8', category: 'Recovery', item: 'Electrolytes', checked: false, affiliate: 'https://amazon.com/electrolytes' },
];

// --- Helper Functions ---
const formatCurrency = (amount) => {
  const num = typeof amount === 'number' ? amount : parseFloat(amount || 0);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(isNaN(num) ? 0 : num);
};

const getDaysUntil = (targetDateString) => {
  const target = new Date(targetDateString);
  const now = new Date();
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays > 0 ? diffDays : 0;
};

// Generates 7 days around the carnival date
const getCarnivalDates = (targetDateString) => {
  const target = new Date(targetDateString);
  const dates = [];
  // Start 5 days before
  for (let i = -5; i <= 2; i++) {
    const d = new Date(target);
    d.setDate(target.getDate() + i);
    dates.push({
      date: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      dayName: d.toLocaleDateString('en-US', { weekday: 'long' }),
      isMain: i === 0 || i === 1 // Highlight Carnival Mon/Tue equivalent
    });
  }
  return dates;
};

// Database path helper
const getPath = (userId, carnivalId, collectionName) => {
  return ['artifacts', appId, 'users', userId, 'carnivals', carnivalId, collectionName];
};

// --- UI Components (unchanged from your version) ---

const StatPill = ({ label, value, color }) => {
  const colors = {
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    green: 'bg-green-50 text-green-700 border-green-100',
  };
  return (
    <div className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${colors[color] || colors.teal}`}>
      <span className="uppercase tracking-wide mr-1 opacity-70">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

// ... [KEEP all your Dashboard, Budget, Packing, Schedule, Vault components EXACTLY as they are]
// I haven’t changed their internals – only the imports and Firebase wiring at the top.
// (You can paste them straight from your existing file below this comment.)

// --- App Root Component ---

export default function App() {
  const [user, setUser] = useState(null);
  const [activeCarnivalId, setActiveCarnivalId] = useState('trinidad2026');
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data
  const [budgetItems, setBudgetItems] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [events, setEvents] = useState([]);
  const [priorities, setPriorities] = useState(['', '', '']);
  
  const activeCarnival = CARNIVALS[activeCarnivalId];
  const daysLeft = useMemo(() => getDaysUntil(activeCarnival.date), [activeCarnivalId, activeCarnival.date]);

  // Auth
  useEffect(() => {
    let unsubscribeAuth;

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.error("Auth Error", e);
      }

      unsubscribeAuth = onAuthStateChanged(auth, setUser);
    };

    initAuth();

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  // Sync Data based on Active Carnival
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;

    const unsubBudget = onSnapshot(
      collection(db, ...getPath(uid, activeCarnivalId, 'budget')), 
      s => setBudgetItems(s.docs.map(d => ({id:d.id, ...d.data()})))
    );

    const unsubPacking = onSnapshot(
      collection(db, ...getPath(uid, activeCarnivalId, 'packing')), 
      async s => {
        if(s.empty) {
          // Seed default packing list for new carnival
          for(const i of DEFAULT_PACKING_LIST) {
            await setDoc(doc(db, ...getPath(uid, activeCarnivalId, 'packing'), i.id), i);
          }
        } else {
          setPackingList(s.docs.map(d => ({id:d.id, ...d.data()})));
        }
      }
    );

    const unsubEvents = onSnapshot(
      collection(db, ...getPath(uid, activeCarnivalId, 'events')), 
      s => setEvents(s.docs.map(d => ({id:d.id, ...d.data()})))
    );

    const unsubPriorities = onSnapshot(
      doc(db, ...getPath(uid, activeCarnivalId, 'meta'), 'priorities'), 
      s => { 
        if(s.exists()) {
          const list = s.data().list;
          if (Array.isArray(list)) {
            setPriorities(list.map(item => String(item)));
          } else {
            setPriorities(['', '', '']);
          }
        }
      }
    );

    return () => { 
      unsubBudget(); 
      unsubPacking(); 
      unsubEvents(); 
      unsubPriorities(); 
    };
  }, [user, activeCarnivalId]);

  // Actions
  const addBudgetItem = async (item) => {
    if(!user) return;
    await setDoc(doc(db, ...getPath(user.uid, activeCarnivalId, 'budget'), item.id), item);
  };

  const deleteBudgetItem = async (id) => {
    if(!user) return;
    await deleteDoc(doc(db, ...getPath(user.uid, activeCarnivalId, 'budget'), id));
  };

  const addEvent = async (event) => {
    if(!user) return;
    await setDoc(doc(db, ...getPath(user.uid, activeCarnivalId, 'events'), event.id), event);
  };

  const deleteEvent = async (id) => {
    if(!user) return;
    await deleteDoc(doc(db, ...getPath(user.uid, activeCarnivalId, 'events'), id));
  };

  const togglePacking = async (id) => {
    if(!user) return;
    const item = packingList.find(i=>i.id===id);
    if(item) {
      await setDoc(
        doc(db, ...getPath(user.uid, activeCarnivalId, 'packing'), id), 
        {...item, checked: !item.checked}
      );
    }
  };

  const savePriority = async (list) => {
    setPriorities(list);
    if(user) {
      await setDoc(
        doc(db, ...getPath(user.uid, activeCarnivalId, 'meta'), 'priorities'), 
        {list}
      );
    }
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-400 text-sm">
        Loading...
      </div>
    );
  }

  const stats = {
    paid: budgetItems.reduce((s,i)=>s+(parseFloat(i.paid)||0),0),
    total: budgetItems.reduce((s,i)=>s+(parseFloat(i.amount)||0),0),
    packed: packingList.filter(i=>i.checked).length,
    packTotal: packingList.length,
    events: events.length
  };

  return (
    <div className="bg-slate-50 h-screen w-full font-sans flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header with Island Switcher */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm z-20">
        <div className="flex justify-between items-center">
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-xl font-black text-slate-800 tracking-tight hover:opacity-70 transition-opacity"
            >
              {activeCarnival.name} <ChevronDown size={18} />
            </button>
            <p className="text-xs text-slate-400 font-medium">Digital Planner</p>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="max-h-64 overflow-y-auto">
                  {Object.values(CARNIVALS).map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setActiveCarnivalId(c.id); setIsMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center gap-2 ${activeCarnivalId === c.id ? `text-${c.color}-600 bg-${c.color}-50` : 'text-slate-600'}`}
                    >
                      <span className={`w-2 h-2 rounded-full bg-${c.color}-500`}></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <StatPill label="Days" value={daysLeft} color={activeCarnival.color} />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {activeTab === TABS.DASHBOARD && (
          <Dashboard 
            user={user} 
            activeCarnival={activeCarnival} 
            daysLeft={daysLeft} 
            stats={stats} 
            priorities={priorities} 
            setPriorities={savePriority} 
          />
        )}
        {activeTab === TABS.BUDGET && (
          <Budget 
            items={budgetItems} 
            onAdd={addBudgetItem} 
            onDelete={deleteBudgetItem} 
            color={activeCarnival.color} 
          />
        )}
        {activeTab === TABS.PACKING && (
          <Packing 
            items={packingList} 
            onToggle={togglePacking} 
            color={activeCarnival.color} 
          />
        )}
        {activeTab === TABS.SCHEDULE && (
          <Schedule 
            events={events} 
            onAdd={addEvent} 
            onDelete={deleteEvent} 
            color={activeCarnival.color} 
            activeCarnival={activeCarnival} 
          />
        )}
        {activeTab === TABS.VAULT && (
          <Vault 
            logistics={{}} 
            color={activeCarnival.color} 
          />
        )}
      </main>

      {/* Nav */}
      <nav className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-20 pb-6 md:pb-3">
        {[
          { id: TABS.DASHBOARD, icon: Home, label: 'Home' },
          { id: TABS.BUDGET, icon: CreditCard, label: 'Budget' },
          { id: TABS.SCHEDULE, icon: Calendar, label: 'Fetes' },
          { id: TABS.VAULT, icon: Briefcase, label: 'Vault' },
          { id: TABS.PACKING, icon: CheckSquare, label: 'Pack' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === tab.id ? `text-${activeCarnival.color}-600` : 'text-slate-400'}`}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
