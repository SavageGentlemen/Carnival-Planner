import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, CreditCard, Home, Briefcase, CheckSquare, Plus, Trash2, 
  Plane, MapPin, Ticket, Clock, Sun, Moon, Music, LogOut, 
  ChevronDown, ChevronUp, AlertCircle, Map, Lock, ExternalLink
} from 'lucide-react';

// --- Firebase Imports ---
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

// --- CRITICAL FIX: Import from your local file ---
import { auth, db, appId } from './firebase';

// --- Multi-Island Data ---
const CARNIVALS = {
  'trinidad2026': { id: 'trinidad2026', name: 'Trinidad Carnival', country: 'Trinidad & Tobago', date: '2026-02-16T04:00:00', color: 'teal', ad: { title: 'Need Transport?', text: 'Book a reliable driver in POS.', link: '#' } },
  'guyana2026': { id: 'guyana2026', name: 'Mashramani 2026', country: 'Guyana', date: '2026-02-23T08:00:00', color: 'yellow', ad: { title: 'Hungry?', text: 'Try ChowMan Ramen after the road.', link: '#' } },
  'stlucia2026': { id: 'stlucia2026', name: 'St. Lucia Carnival', country: 'St. Lucia', date: '2026-07-20T08:00:00', color: 'blue', ad: { title: 'Boat Ride?', text: 'Catamaran cruises for cheap.', link: '#' } },
  'barbados2026': { id: 'barbados2026', name: 'Crop Over 2026', country: 'Barbados', date: '2026-08-03T08:00:00', color: 'orange', ad: { title: 'Villa Rental', text: 'Stay near the beach.', link: '#' } },
  'grenada2026': { id: 'grenada2026', name: 'Spicemas 2026', country: 'Grenada', date: '2026-08-10T04:00:00', color: 'red', ad: { title: 'Jab Jab Oil', text: 'Get your paint & oil kits.', link: '#' } },
  // Add other islands here as needed
};

const TABS = { DASHBOARD: 'dashboard', BUDGET: 'budget', SCHEDULE: 'schedule', VAULT: 'vault', PACKING: 'packing' };

const DEFAULT_PACKING_LIST = [
  { id: 'p1', category: 'Essentials', item: 'Passport', checked: false },
  { id: 'p2', category: 'Essentials', item: 'Flight Tickets', checked: false },
  { id: 'p4', category: 'The Road', item: 'Gel Insoles', checked: false, affiliate: '#' },
  { id: 'p5', category: 'The Road', item: 'Sunblock', checked: false, affiliate: '#' },
];

const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(isNaN(parseFloat(amount)) ? 0 : parseFloat(amount));
const getDaysUntil = (d) => {
  const target = new Date(d);
  const now = new Date();
  const diffTime = target - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
const getPath = (uid, cid, col) => ['artifacts', appId, 'users', uid, 'carnivals', cid, col];

const getCarnivalDates = (targetDateString) => {
  const target = new Date(targetDateString);
  const dates = [];
  for (let i = -5; i <= 2; i++) {
    const d = new Date(target);
    d.setDate(target.getDate() + i);
    dates.push({
      date: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      dayName: d.toLocaleDateString('en-US', { weekday: 'long' }),
      isMain: i === 0 || i === 1 
    });
  }
  return dates;
};

// --- Components ---
const StatPill = ({ label, value, color }) => (
  <div className={`px-3 py-1 rounded-full text-[11px] font-semibold border bg-${color}-50 text-${color}-700 border-${color}-100`}>
    <span className="opacity-70 mr-1">{label}:</span>{value}
  </div>
);

const Dashboard = ({ activeCarnival, daysLeft, stats }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
    <div className={`bg-${activeCarnival.color}-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
      <div className="relative z-10">
        <h2 className="text-xs font-medium uppercase opacity-90 flex gap-1"><Clock size={14}/> Countdown</h2>
        <div className="flex items-baseline mt-2"><span className="text-5xl font-extrabold">{daysLeft}</span><span className="ml-2 text-xl opacity-90">days</span></div>
        <p className="mt-3 text-xs italic opacity-90">{activeCarnival.country} • {new Date(activeCarnival.date).toDateString()}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 text-xs">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between mb-1"><span className="font-semibold">Budget</span><CreditCard size={14}/></div>
        <p className="font-bold">{formatCurrency(stats.paid)} / {formatCurrency(stats.total)}</p>
      </div>
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between mb-1"><span className="font-semibold">Pack</span><CheckSquare size={14}/></div>
        <p className="font-bold">{stats.packed}/{stats.packTotal}</p>
      </div>
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between mb-1"><span className="font-semibold">Events</span><Ticket size={14}/></div>
        <p className="font-bold">{stats.events}</p>
      </div>
    </div>
  </div>
);

const Budget = ({ items, onAdd, onDelete, color }) => {
  const [n, setN] = useState({c:'', a:'', p:''});
  const [add, setAdd] = useState(false);
  const total = items.reduce((s,i)=>s+(parseFloat(i.amount)||0),0);
  const paid = items.reduce((s,i)=>s+(parseFloat(i.paid)||0),0);
  return (
    <div className="space-y-4 pb-20">
      <div className={`bg-${color}-50 p-4 rounded-xl border border-${color}-100 flex justify-between`}>
        <div><p className={`text-xs font-bold text-${color}-600`}>TOTAL</p><p className={`text-xl font-black text-${color}-800`}>{formatCurrency(total)}</p></div>
        <div className="text-right"><p className="text-xs text-slate-500">DUE</p><p className="text-lg font-bold text-slate-700">{formatCurrency(total-paid)}</p></div>
      </div>
      <div className="space-y-2">
        {items.map(i=>(
          <div key={i.id} className="bg-white p-3 rounded-lg shadow-sm border flex justify-between">
            <div><p className="text-sm font-semibold">{i.category}</p><p className="text-xs text-slate-500">Pd: {formatCurrency(i.paid)}</p></div>
            <button onClick={()=>onDelete(i.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
      <button onClick={()=>setAdd(true)} className={`fixed bottom-20 right-4 p-4 rounded-full shadow-lg bg-${color}-600 text-white`}><Plus/></button>
      {add && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white w-full rounded-xl p-4 space-y-3">
            <h3 className="font-bold">Add Cost</h3>
            <input className="w-full p-2 border rounded" placeholder="Item" value={n.c} onChange={e=>setN({...n, c:e.target.value})}/>
            <div className="flex gap-2">
              <input className="w-1/2 p-2 border rounded" type="number" placeholder="Cost" value={n.a} onChange={e=>setN({...n, a:e.target.value})}/>
              <input className="w-1/2 p-2 border rounded" type="number" placeholder="Paid" value={n.p} onChange={e=>setN({...n, p:e.target.value})}/>
            </div>
            <button onClick={()=>{onAdd({...n, id:Date.now().toString()}); setAdd(false); setN({c:'',a:'',p:''})}} className={`w-full py-3 rounded bg-${color}-600 text-white`}>Save</button>
            <button onClick={()=>setAdd(false)} className="w-full py-2 text-slate-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Schedule = ({ events, onAdd, onDelete, color, activeCarnival }) => {
  const [sel, setSel] = useState(null);
  const [add, setAdd] = useState(false);
  const [n, setN] = useState({t:'', time:'', type:'fete'});
  const dates = useMemo(()=>getCarnivalDates(activeCarnival.date), [activeCarnival]);
  useEffect(()=>{if(dates.length && !sel) setSel(dates[2].date)}, [dates, sel]);
  const filtered = events.filter(e=>e.date===sel).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-4 px-4">
        {dates.map(d=>(
          <button key={d.date} onClick={()=>setSel(d.date)} className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center border ${sel===d.date?`bg-${color}-600 text-white border-${color}-600`:d.isMain?`bg-${color}-50 text-${color}-800 border-${color}-200`:'bg-white text-slate-500 border-slate-100'}`}>
            <span className="text-[10px] font-bold uppercase">{d.label.split(' ')[0]}</span><span className="text-lg font-bold">{d.label.split(' ')[1]}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 overflow-y-auto pb-20 space-y-3">
        {filtered.map(e=>(
          <div key={e.id} className="flex gap-3"><div className="w-14 text-xs text-right text-slate-400 pt-2">{e.time}</div><div className={`flex-1 p-3 rounded-lg border-l-4 bg-slate-50 border-${color}-400 flex justify-between`}>
            <span className="font-semibold text-sm">{e.title}</span><button onClick={()=>onDelete(e.id)} className="text-slate-300"><Trash2 size={14}/></button>
          </div></div>
        ))}
        {!filtered.length && <div className="text-center py-8 text-slate-400 text-sm">No plans today.</div>}
      </div>
      <button onClick={()=>setAdd(true)} className={`fixed bottom-20 right-4 p-4 rounded-full shadow-lg bg-${color}-600 text-white`}><Plus/></button>
      {add && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white w-full rounded-xl p-4 space-y-4">
            <h3 className="font-bold">Add Event</h3>
            <input className="w-full p-2 border rounded" placeholder="Event Name" value={n.t} onChange={e=>setN({...n, t:e.target.value})}/>
            <div className="flex gap-2"><input type="time" className="w-1/2 p-2 border rounded" value={n.time} onChange={e=>setN({...n, time:e.target.value})}/><select className="w-1/2 p-2 border rounded" value={n.type} onChange={e=>setN({...n, type:e.target.value})}><option value="fete">Fete</option><option value="mas">Mas</option></select></div>
            <button onClick={()=>{onAdd({...n, date:sel, id:Date.now().toString()}); setAdd(false); setN({t:'',time:'', type:'fete'})}} className={`w-full py-2 bg-${color}-600 text-white rounded`}>Save</button>
            <button onClick={()=>setAdd(false)} className="w-full py-2 text-slate-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Packing = ({ items, onToggle, color }) => (
  <div className="space-y-4 pb-20">
    <div className="flex justify-between"><h3 className="font-bold">Packing List</h3><span className={`text-xs bg-${color}-50 px-2 py-1 rounded font-bold`}>{items.filter(i=>i.checked).length}/{items.length} Ready</span></div>
    <div className="bg-white rounded-xl shadow-sm border divide-y">
      {items.map(i=>(
        <div key={i.id} onClick={()=>onToggle(i.id)} className="p-4 flex items-center gap-3 cursor-pointer">
          <div className={`w-5 h-5 rounded border flex items-center justify-center ${i.checked?`bg-${color}-500 border-${color}-500`:'border-slate-300'}`}>{i.checked&&<CheckSquare size={14} className="text-white"/>}</div>
          <span className={`text-sm ${i.checked?'text-slate-400 line-through':'text-slate-700'}`}>{i.item}</span>
          {i.affiliate && <a href={i.affiliate} target="_blank" className="ml-auto text-[10px] bg-slate-100 px-2 py-1 rounded">Buy</a>}
        </div>
      ))}
    </div>
  </div>
);

const Vault = ({ color }) => (
  <div className="space-y-4">
    <div className="p-4 bg-slate-100 rounded text-xs text-slate-600 flex gap-2"><Lock size={16}/><p>Pro Feature: Upload photos securely.</p></div>
    <button className={`w-full py-3 rounded border-2 border-dashed border-${color}-200 text-${color}-600 font-bold text-sm`}>Unlock Vault ($4.99/yr)</button>
  </div>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [cid, setCid] = useState('trinidad2026');
  const [tab, setTab] = useState(TABS.DASHBOARD);
  const [menu, setMenu] = useState(false);
  const [budget, setBudget] = useState([]);
  const [packing, setPacking] = useState([]);
  const [events, setEvents] = useState([]);
  
  const active = CARNIVALS[cid];
  const daysLeft = useMemo(()=>getDaysUntil(active.date), [active]);

  useEffect(()=>{
    const initAuth = async () => {
      try { await signInAnonymously(auth); } catch(e){console.error(e)}
    };
    initAuth();
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(()=>{
    if(!user) return;
    const uid = user.uid;
    const unsubB = onSnapshot(collection(db, ...getPath(uid, cid, 'budget')), s=>setBudget(s.docs.map(d=>({id:d.id, ...d.data()}))));
    const unsubP = onSnapshot(collection(db, ...getPath(uid, cid, 'packing')), async s=>{
      if(s.empty) for(const i of DEFAULT_PACKING_LIST) await setDoc(doc(db, ...getPath(uid, cid, 'packing'), i.id), i);
      else setPacking(s.docs.map(d=>({id:d.id, ...d.data()})));
    });
    const unsubE = onSnapshot(collection(db, ...getPath(uid, cid, 'events')), s=>setEvents(s.docs.map(d=>({id:d.id, ...d.data()}))));
    return ()=>{unsubB(); unsubP(); unsubE();}
  }, [user, cid]);

  const addB = async (i) => user && await setDoc(doc(db, ...getPath(user.uid, cid, 'budget'), i.id), i);
  const delB = async (id) => user && await deleteDoc(doc(db, ...getPath(user.uid, cid, 'budget'), id));
  const addE = async (e) => user && await setDoc(doc(db, ...getPath(user.uid, cid, 'events'), e.id), e);
  const delE = async (id) => user && await deleteDoc(doc(db, ...getPath(user.uid, cid, 'events'), id));
  const togP = async (id) => { const i = packing.find(x=>x.id===id); if(i) await setDoc(doc(db, ...getPath(user.uid, cid, 'packing'), id), {...i, checked:!i.checked}); };

  if(!user) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const stats = { paid: budget.reduce((s,i)=>s+(parseFloat(i.paid)||0),0), total: budget.reduce((s,i)=>s+(parseFloat(i.amount)||0),0), packed: packing.filter(i=>i.checked).length, packTotal: packing.length, events: events.length };

  return (
    <div className="bg-slate-50 h-screen w-full font-sans flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm z-20 flex justify-between items-center">
        <div className="relative">
          <button onClick={()=>setMenu(!menu)} className="flex items-center gap-2 text-xl font-black text-slate-800">{active.name} <ChevronDown/></button>
          {menu && <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border z-50 max-h-64 overflow-y-auto">{Object.values(CARNIVALS).map(c=><button key={c.id} onClick={()=>{setCid(c.id);setMenu(false)}} className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-2 ${cid===c.id?`text-${c.color}-600`:''}`}><span className={`w-2 h-2 rounded-full bg-${c.color}-500`}></span>{c.name}</button>)}</div>}
        </div>
        <StatPill label="Days" value={daysLeft} color={active.color}/>
      </div>
      <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {tab===TABS.DASHBOARD && <Dashboard activeCarnival={active} daysLeft={daysLeft} stats={stats}/>}
        {tab===TABS.BUDGET && <Budget items={budget} onAdd={addB} onDelete={delB} color={active.color}/>}
        {tab===TABS.PACKING && <Packing items={packing} onToggle={togP} color={active.color}/>}
        {tab===TABS.SCHEDULE && <Schedule events={events} onAdd={addE} onDelete={delE} color={active.color} activeCarnival={active}/>}
        {tab===TABS.VAULT && <Vault color={active.color}/>}
      </main>
      <nav className="bg-white border-t px-6 py-3 flex justify-between z-20">
        {[{id:TABS.DASHBOARD,i:Home},{id:TABS.BUDGET,i:CreditCard},{id:TABS.SCHEDULE,i:Calendar},{id:TABS.VAULT,i:Briefcase},{id:TABS.PACKING,i:CheckSquare}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={tab===t.id?`text-${active.color}-600`:'text-slate-400'}><t.i size={22}/></button>)}
      </nav>
    </div>
  );
}