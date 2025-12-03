import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  CreditCard,
  Home,
  Briefcase,
  CheckSquare,
  Plus,
  Trash2,
  MapPin,
  Ticket,
  Clock,
  ChevronDown,
  AlertCircle,
  Lock,
  ExternalLink,
} from "lucide-react";

import { auth, db } from "./firebase";
import {
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

/** ------------------------------------------------------------------
 *  CONSTANTS & HELPERS
 *  ------------------------------------------------------------------ */

const appId = "carnival-planner-ui"; // used only for Firestore path names

const CARNIVALS = {
  stkitts2026: {
    id: "stkitts2026",
    name: "Sugar Mas 55",
    country: "St. Kitts & Nevis",
    date: "2026-01-02T08:00:00",
    color: "red",
    ad: {
      title: "Ferry Ticket",
      text: "Book ferry to Nevis for cool down.",
      link: "#",
    },
  },
  trinidad2026: {
    id: "trinidad2026",
    name: "Trinidad Carnival",
    country: "Trinidad & Tobago",
    date: "2026-02-16T04:00:00",
    color: "teal",
    ad: {
      title: "Need Transport?",
      text: "Book a reliable driver in POS.",
      link: "#",
    },
  },
  guyana2026: {
    id: "guyana2026",
    name: "Mashramani 2026",
    country: "Guyana",
    date: "2026-02-23T08:00:00",
    color: "yellow",
    ad: {
      title: "Hungry?",
      text: "Try ChowMan Ramen after the road.",
      link: "#",
    },
  },
  aruba2026: {
    id: "aruba2026",
    name: "Aruba Carnival",
    country: "Aruba",
    date: "2026-02-15T10:00:00",
    color: "blue",
    ad: {
      title: "Beach Day",
      text: "Eagle Beach lounger rentals.",
      link: "#",
    },
  },
  jamaica2026: {
    id: "jamaica2026",
    name: "Jamaica Carnival",
    country: "Jamaica",
    date: "2026-04-12T09:00:00",
    color: "green",
    ad: {
      title: "Ochi Transport",
      text: "Shuttles to Ocho Rios fetes.",
      link: "#",
    },
  },
  stmaarten2026: {
    id: "stmaarten2026",
    name: "St. Maarten Carnival",
    country: "St. Maarten",
    date: "2026-05-01T08:00:00",
    color: "orange",
    ad: {
      title: "Villa Stay",
      text: "Luxury villas in Simpson Bay.",
      link: "#",
    },
  },
  guyana_may_2026: {
    id: "guyana_may_2026",
    name: "Guyana Carnival (May)",
    country: "Guyana",
    date: "2026-05-26T14:00:00",
    color: "green",
    ad: {
      title: "VIP Tables",
      text: "Reserve for Genesis All White.",
      link: "#",
    },
  },
  bahamas2026: {
    id: "bahamas2026",
    name: "Bahamas Carnival",
    country: "Bahamas",
    date: "2026-06-06T10:00:00",
    color: "teal",
    ad: {
      title: "Atlantis Day Pass",
      text: "Recover at the water park.",
      link: "#",
    },
  },
  bermuda2026: {
    id: "bermuda2026",
    name: "Bermuda Carnival",
    country: "Bermuda",
    date: "2026-06-15T12:00:00",
    color: "blue",
    ad: {
      title: "Raft Up",
      text: "Catamaran rentals for the water.",
      link: "#",
    },
  },
  vincymas2026: {
    id: "vincymas2026",
    name: "Vincy Mas",
    country: "St. Vincent",
    date: "2026-07-07T09:00:00",
    color: "yellow",
    ad: {
      title: "Sunset Cruise",
      text: "Grenadines tour bookings.",
      link: "#",
    },
  },
  stlucia2026: {
    id: "stlucia2026",
    name: "St. Lucia Carnival",
    country: "St. Lucia",
    date: "2026-07-20T08:00:00",
    color: "blue",
    ad: {
      title: "Boat Ride?",
      text: "Catamaran cruises for cheap.",
      link: "#",
    },
  },
  barbados2026: {
    id: "barbados2026",
    name: "Crop Over 2026",
    country: "Barbados",
    date: "2026-08-03T08:00:00",
    color: "orange",
    ad: {
      title: "Villa Rental",
      text: "Stay near the beach.",
      link: "#",
    },
  },
  antigua2026: {
    id: "antigua2026",
    name: "Antigua Carnival",
    country: "Antigua",
    date: "2026-08-04T09:00:00",
    color: "red",
    ad: {
      title: "Sheer Rocks",
      text: "Dinner reservations at sunset.",
      link: "#",
    },
  },
  grenada2026: {
    id: "grenada2026",
    name: "Spicemas 2026",
    country: "Grenada",
    date: "2026-08-10T04:00:00",
    color: "red",
    ad: {
      title: "Jab Jab Oil",
      text: "Get your paint & oil kits.",
      link: "#",
    },
  },
  tobago2026: {
    id: "tobago2026",
    name: "Tobago Carnival",
    country: "Tobago",
    date: "2026-10-31T09:00:00",
    color: "teal",
    ad: {
      title: "Nylon Pool",
      text: "Glass bottom boat tours.",
      link: "#",
    },
  },
};

const TABS = {
  DASHBOARD: "dashboard",
  BUDGET: "budget",
  SCHEDULE: "schedule",
  VAULT: "vault",
  PACKING: "packing",
};

const DEFAULT_PACKING_LIST = [
  { id: "p1", category: "Essentials", item: "Passport", checked: false },
  { id: "p2", category: "Essentials", item: "Flight Tickets", checked: false },
  { id: "p3", category: "Essentials", item: "Cash (USD)", checked: false },
  {
    id: "p4",
    category: "The Road",
    item: "Gel Insoles",
    checked: false,
    affiliate: "https://amazon.com/insoles",
  },
  {
    id: "p5",
    category: "The Road",
    item: "Sunblock (Spray)",
    checked: false,
    affiliate: "https://amazon.com/sunblock",
  },
  {
    id: "p6",
    category: "The Road",
    item: "Stockings (2 pairs)",
    checked: false,
    affiliate: "https://amazon.com/stockings",
  },
  {
    id: "p7",
    category: "The Road",
    item: "Portable Charger",
    checked: false,
    affiliate: "https://amazon.com/powerbank",
  },
  {
    id: "p8",
    category: "Recovery",
    item: "Electrolytes",
    checked: false,
    affiliate: "https://amazon.com/electrolytes",
  },
];

const formatCurrency = (amount) => {
  const num = typeof amount === "number" ? amount : parseFloat(amount || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(isNaN(num) ? 0 : num);
};

const getDaysUntil = (targetDateString) => {
  const target = new Date(targetDateString);
  const now = new Date();
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const getCarnivalDates = (targetDateString) => {
  const target = new Date(targetDateString);
  const dates = [];
  for (let i = -5; i <= 2; i++) {
    const d = new Date(target);
    d.setDate(target.getDate() + i);
    dates.push({
      date: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      }),
      dayName: d.toLocaleDateString("en-US", { weekday: "long" }),
      isMain: i === 0 || i === 1,
    });
  }
  return dates;
};

const getPath = (userId, carnivalId, collectionName) => [
  "artifacts",
  appId,
  "users",
  userId,
  "carnivals",
  carnivalId,
  collectionName,
];

/** ------------------------------------------------------------------
 *  UI COMPONENTS
 *  ------------------------------------------------------------------ */

const StatPill = ({ label, value, color }) => {
  const colors = {
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-green-50 text-green-700 border-green-100",
  };
  return (
    <div
      className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
        colors[color] || colors.teal
      }`}
    >
      <span className="uppercase tracking-wide mr-1 opacity-70">
        {label}:
      </span>
      <span>{value}</span>
    </div>
  );
};

const Dashboard = ({ user, activeCarnival, daysLeft, stats, priorities, setPriorities }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempPriorities, setTempPriorities] = useState(priorities);

  useEffect(() => {
    setTempPriorities(priorities);
  }, [priorities]);

  const handleSave = () => {
    setPriorities(tempPriorities);
    setEditMode(false);
  };

  const gradients = {
    teal: "from-teal-600 to-emerald-600",
    yellow: "from-yellow-500 to-amber-600",
    blue: "from-blue-600 to-cyan-500",
    orange: "from-orange-500 to-red-500",
    red: "from-red-600 to-rose-600",
    green: "from-green-600 to-emerald-600",
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero card */}
      <div
        className={`bg-gradient-to-r ${
          gradients[activeCarnival.color] || gradients.teal
        } rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}
      >
        <div className="relative z-10">
          <h2 className="text-xs font-medium uppercase tracking-wider opacity-90 flex items-center gap-1">
            <Clock size={14} className="opacity-90" /> Countdown to{" "}
            {activeCarnival.name}
          </h2>
          <div className="flex items-baseline mt-2">
            <span className="text-5xl font-extrabold leading-none">
              {daysLeft}
            </span>
            <span className="ml-2 text-xl opacity-90">days left</span>
          </div>
          <p className="mt-3 text-xs font-light italic opacity-90">
            {activeCarnival.country} •{" "}
            {new Date(activeCarnival.date).toDateString()}
          </p>
        </div>
        <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-600">Budget</span>
            <CreditCard size={14} className={`text-${activeCarnival.color}-500`} />
          </div>
          <p className="font-bold text-slate-800 text-xs">
            {formatCurrency(stats.paid)} / {formatCurrency(stats.total)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-600">Packing</span>
            <CheckSquare size={14} className={`text-${activeCarnival.color}-500`} />
          </div>
          <p className="font-bold text-slate-800 text-xs">
            {stats.packed} / {stats.packTotal} items
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-600">Fetes</span>
            <Ticket size={14} className={`text-${activeCarnival.color}-500`} />
          </div>
          <p className="font-bold text-slate-800 text-xs">{stats.events} events</p>
        </div>
      </div>

      {/* Local ad */}
      <div className="bg-white border-l-4 border-slate-800 rounded-r-xl p-4 shadow-sm flex justify-between items-center">
        <div>
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <MapPin size={14} /> Local Plug
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeCarnival.ad.text}
          </p>
        </div>
        <button className="text-[10px] bg-slate-800 text-white px-3 py-1.5 rounded-lg font-bold">
          View
        </button>
      </div>

      {/* Priorities */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <AlertCircle size={16} className="text-orange-500" />
            Priorities
          </h3>
          <button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
        <div className="space-y-3">
          {tempPriorities.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                {i + 1}
              </span>
              {editMode ? (
                <input
                  type="text"
                  value={p}
                  onChange={(e) => {
                    const n = [...tempPriorities];
                    n[i] = e.target.value;
                    setTempPriorities(n);
                  }}
                  className="flex-1 border-b border-slate-200 text-sm py-1 outline-none"
                  placeholder="Add priority..."
                />
              ) : (
                <span
                  className={`text-sm ${
                    !p ? "text-slate-400 italic" : "text-slate-700"
                  }`}
                >
                  {p || "Tap edit to add..."}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Budget = ({ items, onAdd, onDelete, color }) => {
  const [newItem, setNewItem] = useState({ category: "", amount: "", paid: "" });
  const [isAdding, setIsAdding] = useState(false);

  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const paid = items.reduce((s, i) => s + (parseFloat(i.paid) || 0), 0);

  const handleAdd = () => {
    if (!newItem.category) return;
    onAdd({ ...newItem, id: Date.now().toString() });
    setNewItem({ category: "", amount: "", paid: "" });
    setIsAdding(false);
  };

  return (
    <div className="space-y-4 pb-20">
      <div
        className={`bg-${color}-50 p-4 rounded-xl border border-${color}-100 flex justify-between items-center`}
      >
        <div>
          <p className={`text-xs font-bold text-${color}-600 uppercase`}>
            Total Budget
          </p>
          <p className={`text-xl font-black text-${color}-800`}>
            {formatCurrency(total)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Balance Due</p>
          <p className="text-lg font-bold text-slate-700">
            {formatCurrency(total - paid)}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.category}
              </p>
              <p className="text-xs text-slate-500">
                Paid: {formatCurrency(item.paid)}{" "}
                <span className="text-slate-300">|</span> Due:{" "}
                <span className="text-orange-600">
                  {formatCurrency(item.amount - item.paid)}
                </span>
              </p>
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="text-slate-300 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            No expenses yet. Add your costume or flight!
          </div>
        )}
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className={`fixed bottom-20 right-4 p-4 rounded-full shadow-lg bg-${color}-600 text-white`}
      >
        <Plus size={24} />
      </button>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white w-full rounded-xl p-4 space-y-3">
            <h3 className="font-bold">Add Expense</h3>
            <input
              className="w-full p-2 border rounded"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            />
            <div className="flex gap-2">
              <input
                className="w-1/2 p-2 border rounded"
                type="number"
                placeholder="Cost"
                value={newItem.amount}
                onChange={(e) =>
                  setNewItem({ ...newItem, amount: e.target.value })
                }
              />
              <input
                className="w-1/2 p-2 border rounded"
                type="number"
                placeholder="Paid"
                value={newItem.paid}
                onChange={(e) =>
                  setNewItem({ ...newItem, paid: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleAdd}
              className={`w-full py-3 rounded-lg font-bold text-white bg-${color}-600`}
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="w-full py-2 text-slate-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Packing = ({ items, onToggle, color }) => (
  <div className="space-y-4 pb-20">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-slate-700">Packing List</h3>
      <span
        className={`text-xs bg-${color}-50 text-${color}-700 px-2 py-1 rounded-full font-bold`}
      >
        {items.filter((i) => i.checked).length}/{items.length} Ready
      </span>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-50">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 flex items-center justify-between group"
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onToggle(item.id)}
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                item.checked
                  ? `bg-${color}-500 border-${color}-500`
                  : "border-slate-300"
              }`}
            >
              {item.checked && (
                <CheckSquare size={14} className="text-white" />
              )}
            </div>
            <span
              className={`text-sm ${
                item.checked
                  ? "text-slate-400 line-through"
                  : "text-slate-700"
              }`}
            >
              {item.item}
            </span>
          </div>
          {item.affiliate && (
            <a
              href={item.affiliate}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded flex items-center gap-1"
            >
              Buy <ExternalLink size={10} />
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

const Schedule = ({ events, onAdd, onDelete, color, activeCarnival }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    type: "fete",
  });

  const dates = useMemo(
    () => getCarnivalDates(activeCarnival.date),
    [activeCarnival],
  );

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) setSelectedDate(dates[2].date);
  }, [dates, selectedDate]);

  const filteredEvents = events
    .filter((e) => e.date === selectedDate)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  const handleAdd = () => {
    if (!newEvent.title) return;
    onAdd({ ...newEvent, date: selectedDate, id: Date.now().toString() });
    setNewEvent({ title: "", time: "", type: "fete" });
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Date scroller */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-4 px-4">
        {dates.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl transition-all border ${
              selectedDate === day.date
                ? `bg-${color}-600 text-white border-${color}-600 shadow-md scale-105`
                : day.isMain
                ? `bg-${color}-50 text-${color}-800 border-${color}-200`
                : "bg-white text-slate-500 border-slate-100"
            }`}
          >
            <span className="text-[10px] font-bold uppercase">
              {day.label.split(" ")[0]}
            </span>
            <span className="text-lg font-bold">
              {day.label.split(" ")[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Events list */}
      <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">
            {dates.find((d) => d.date === selectedDate)?.dayName || "Events"}
          </h3>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
            {filteredEvents.length} Events
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pb-20">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex gap-3 group">
              <div className="w-14 pt-2 text-right text-xs font-medium text-slate-400">
                {event.time || "TBA"}
              </div>
              <div
                className={`flex-1 p-3 rounded-lg border-l-4 shadow-sm relative ${
                  event.type === "fete"
                    ? "bg-purple-50 border-purple-400"
                    : event.type === "mas"
                    ? `bg-${color}-50 border-${color}-400`
                    : "bg-slate-50 border-slate-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-slate-700 text-sm">
                    {event.title}
                  </span>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <span className="text-[10px] uppercase tracking-wide text-slate-400 mt-1 block">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm italic">
              No plans for this day.
              <br />
              Tap + to add a fete.
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className={`fixed bottom-20 right-4 p-4 rounded-full shadow-lg bg-${color}-600 text-white`}
      >
        <Plus size={24} />
      </button>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white w-full rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-slate-800">Add Event</h3>
            <input
              className="w-full p-2 border rounded-lg text-sm"
              placeholder="Event Name (e.g. Soca Brainwash)"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <div className="flex gap-2">
              <input
                type="time"
                className="w-1/2 p-2 border rounded-lg text-sm"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
              <select
                className="w-1/2 p-2 border rounded-lg bg-white text-sm"
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
              >
                <option value="fete">Fete</option>
                <option value="mas">Mas / Road</option>
                <option value="logistics">Transport</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-2 text-slate-500 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className={`flex-1 py-2 bg-${color}-600 text-white rounded-lg font-bold text-sm`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Vault = ({ color }) => (
  <div className="space-y-4">
    <div className="p-4 bg-slate-100 rounded-lg text-xs text-slate-600 flex gap-2">
      <Lock size={16} />
      <p>Pro Feature: Upload photos of your receipts & tickets securely.</p>
    </div>
    <button
      className={`w-full py-3 rounded-xl border-2 border-dashed border-${color}-200 text-${color}-600 font-bold text-sm flex items-center justify-center gap-2`}
    >
      <Lock size={16} /> Unlock Vault ($4.99/yr)
    </button>
  </div>
);

/** ------------------------------------------------------------------
 *  ROOT APP
 *  ------------------------------------------------------------------ */

export default function App() {
  const [user, setUser] = useState(null);
  const [activeCarnivalId, setActiveCarnivalId] = useState("trinidad2026");
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [budgetItems, setBudgetItems] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [events, setEvents] = useState([]);
  const [priorities, setPriorities] = useState(["", "", ""]);

  const activeCarnival = CARNIVALS[activeCarnivalId];
  const daysLeft = useMemo(
    () => getDaysUntil(activeCarnival.date),
    [activeCarnivalId, activeCarnival.date],
  );

  // Auth
  useEffect(() => {
    let unsubscribeAuth;

    const initAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
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

  // Firestore sync for current carnival
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;

    const unsubBudget = onSnapshot(
      collection(db, ...getPath(uid, activeCarnivalId, "budget")),
      (s) => setBudgetItems(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    const unsubPacking = onSnapshot(
      collection(db, ...getPath(uid, activeCarnivalId, "packing")),
      async (s) => {
        if (s.empty) {
          for (const i of DEFAULT_PACKING_LIST) {
            await setDoc(
              doc(db, ...getPath(uid, activeCarnivalId, "packing"), i.id),
              i,
            );
          }
        } else {
          setPackingList(s.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      },
    );

    const unsubEvents = onSnapshot(
      collection(db, ...getPath(uid, activeCarnivalId, "events")),
      (s) => setEvents(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
    );

    const unsubPriorities = onSnapshot(
      doc(db, ...getPath(uid, activeCarnivalId, "meta"), "priorities"),
      (s) => {
        if (s.exists()) {
          const list = s.data().list;
          if (Array.isArray(list)) {
            setPriorities(list.map((item) => String(item)));
          } else {
            setPriorities(["", "", ""]);
          }
        }
      },
    );

    return () => {
      unsubBudget();
      unsubPacking();
      unsubEvents();
      unsubPriorities();
    };
  }, [user, activeCarnivalId]);

  // Mutations
  const addBudgetItem = async (item) => {
    if (!user) return;
    await setDoc(
      doc(db, ...getPath(user.uid, activeCarnivalId, "budget"), item.id),
      item,
    );
  };

  const deleteBudgetItem = async (id) => {
    if (!user) return;
    await deleteDoc(
      doc(db, ...getPath(user.uid, activeCarnivalId, "budget"), id),
    );
  };

  const addEvent = async (event) => {
    if (!user) return;
    await setDoc(
      doc(db, ...getPath(user.uid, activeCarnivalId, "events"), event.id),
      event,
    );
  };

  const deleteEvent = async (id) => {
    if (!user) return;
    await deleteDoc(
      doc(db, ...getPath(user.uid, activeCarnivalId, "events"), id),
    );
  };

  const togglePacking = async (id) => {
    if (!user) return;
    const item = packingList.find((i) => i.id === id);
    if (item) {
      await setDoc(
        doc(db, ...getPath(user.uid, activeCarnivalId, "packing"), id),
        { ...item, checked: !item.checked },
      );
    }
  };

  const savePriority = async (list) => {
    setPriorities(list);
    if (user) {
      await setDoc(
        doc(db, ...getPath(user.uid, activeCarnivalId, "meta"), "priorities"),
        { list },
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
    paid: budgetItems.reduce(
      (s, i) => s + (parseFloat(i.paid) || 0),
      0,
    ),
    total: budgetItems.reduce(
      (s, i) => s + (parseFloat(i.amount) || 0),
      0,
    ),
    packed: packingList.filter((i) => i.checked).length,
    packTotal: packingList.length,
    events: events.length,
  };

  return (
    <div className="bg-slate-50 h-screen w-full font-sans flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm z-20">
        <div className="flex justify-between items-center">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-xl font-black text-slate-800 tracking-tight hover:opacity-70 transition-opacity"
            >
              {activeCarnival.name} <ChevronDown size={18} />
            </button>
            <p className="text-xs text-slate-400 font-medium">
              Digital Planner
            </p>

            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="max-h-64 overflow-y-auto">
                  {Object.values(CARNIVALS).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCarnivalId(c.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 flex items-center gap-2 ${
                        activeCarnivalId === c.id
                          ? `text-${c.color}-600 bg-${c.color}-50`
                          : "text-slate-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full bg-${c.color}-500`}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <StatPill
            label="Days"
            value={daysLeft}
            color={activeCarnival.color}
          />
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
          <Vault color={activeCarnival.color} />
        )}
      </main>

      {/* Bottom nav */}
      <nav className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-20 pb-6 md:pb-3">
        {[
          { id: TABS.DASHBOARD, icon: Home, label: "Home" },
          { id: TABS.BUDGET, icon: CreditCard, label: "Budget" },
          { id: TABS.SCHEDULE, icon: Calendar, label: "Fetes" },
          { id: TABS.VAULT, icon: Briefcase, label: "Vault" },
          { id: TABS.PACKING, icon: CheckSquare, label: "Pack" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id
                ? `text-${activeCarnival.color}-600`
                : "text-slate-400"
            }`}
          >
            <tab.icon
              size={22}
              strokeWidth={activeTab === tab.id ? 2.5 : 2}
            />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
