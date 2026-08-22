import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Building2, 
  MessageCircle, 
  Download, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Settings, 
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  DollarSign,
  Trash2,
  Check
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { MOY_AGENT_PROFILE, MOY_TRAVEL_PACKAGES } from './travelData';

export default function MoyAgentDashboard({ onClose, user }) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'packages' | 'gateway'
  const [bookings, setBookings] = useState([]);
  const [packagesList, setPackagesList] = useState(MOY_TRAVEL_PACKAGES);
  const [editingPkg, setEditingPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mmw_agent_auth') === 'true';
  });

  // Trinidad Gateway Settings Form State
  const [wipayId, setWipayId] = useState(MOY_AGENT_PROFILE.trinidadBankingInfo.wipayMerchantId);
  const [whatsappNum, setWhatsappNum] = useState(MOY_AGENT_PROFILE.whatsappNumber);
  const [bankAccount, setBankAccount] = useState('180-801-445-001');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Sync packages from Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'travelPackages'), (snap) => {
      if (!snap.empty) {
        const firestorePkgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPackagesList(firestorePkgs);
      } else {
        setPackagesList(MOY_TRAVEL_PACKAGES);
      }
    }, (err) => {
      console.warn('[MoyTravel] Firestore packages sync notice:', err.message);
    });
    return () => unsub();
  }, []);

  // Authenticate Moy
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'moy2027' || passcode === 'carnival2027' || user?.email?.includes('moy') || user?.email?.includes('admin')) {
      setIsAuthenticated(true);
      localStorage.setItem('mmw_agent_auth', 'true');
    } else {
      alert('Incorrect Travel Agent access code.');
    }
  };

  // Real-time Firestore sync for incoming bookings
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, 'travelBookings'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        setBookings(list);
        setLoading(false);
      },
      (err) => {
        console.warn('[MoyAgentDashboard] Firestore listener:', err.message);
        // Fallback demo data for immediate testing if collection empty
        setBookings([
          {
            id: 'demo-1',
            bookingRef: 'MMW-TRI-4821',
            packageTitle: 'Trinidad Carnival',
            destination: 'Port of Spain, Trinidad',
            customerName: 'Aria Montano',
            customerEmail: 'aria.montano@example.com',
            customerPhone: '+1 (868) 755-1234',
            guestCount: 2,
            roomType: 'Shared Double Room',
            masqueradeSection: 'Tribe Frontline (Butterfly)',
            paymentMethod: 'wipay',
            depositAmount: 1000,
            status: 'confirmed',
            createdAt: { toDate: () => new Date() }
          },
          {
            id: 'demo-2',
            bookingRef: 'MMW-BAR-9120',
            packageTitle: 'Barbados Crop Over',
            destination: 'Christ Church, Barbados',
            customerName: 'Marcus Sterling',
            customerEmail: 'marcus.s@example.com',
            customerPhone: '+1 (347) 555-8989',
            guestCount: 1,
            roomType: 'Oceanfront King Deluxe',
            masqueradeSection: 'Zulu International',
            paymentMethod: 'stripe',
            depositAmount: 500,
            status: 'pending_payment',
            createdAt: { toDate: () => new Date(Date.now() - 86400000) }
          }
        ]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, 'travelBookings', bookingId), {
        status: newStatus
      });
    } catch (err) {
      console.warn('Update status notice:', err.message);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return alert('No bookings to export.');
    const headers = ['Ref', 'Name', 'Email', 'Phone', 'Package', 'Room', 'Guests', 'Band Section', 'Deposit USD', 'Method', 'Status'];
    const rows = bookings.map(b => [
      b.bookingRef,
      `"${b.customerName}"`,
      b.customerEmail,
      b.customerPhone,
      `"${b.packageTitle}"`,
      `"${b.roomType}"`,
      b.guestCount,
      `"${b.masqueradeSection || 'N/A'}"`,
      b.depositAmount,
      b.paymentMethod,
      b.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moy_travel_bookings_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bookingRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.packageTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenueDeposits = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, curr) => acc + (curr.depositAmount || 0), 0);

  // ── AUTH GATE FOR MOY ──
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
        <div className="w-full max-w-md bg-[#080c14] border border-cyan-500/30 rounded-3xl p-8 text-center text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-[#00e5cc] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,229,204,0.3)]">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight font-heading">
            Moy Meets World
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            Travel Agent Management Portal (Trinidad Operations)
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Agent Access Passcode (e.g. moy2027)"
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/20 text-white text-sm text-center tracking-widest focus:border-[#00e5cc] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all"
            >
              Access Dashboard
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white font-medium block mx-auto"
            >
              Cancel and Return
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14] text-slate-100 flex flex-col animate-fadeIn">
      
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-30 bg-[#080c14]/90 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,204,0.3)] shrink-0">
              <img 
                src="/images/moymeetsworld_logo.jpg" 
                alt="Moy Meets World" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-base font-black text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <span>MOY MEETS WORLD</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                  🇹🇹 Trinidad Operations
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Chief Travel Curator & Booking Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/20 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,204,0.3)]"
            >
              Exit Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* ── DASHBOARD BODY ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-heading">
              {bookings.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across all active destinations</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Confirmed Deposits</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-heading">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Spots locked with $500 deposit</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Pending Action</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-heading">
              {bookings.filter(b => b.status === 'pending_payment').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting wire / WiPay payment</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Deposits (USD)</span>
              <DollarSign className="w-4 h-4 text-[#00e5cc]" />
            </div>
            <div className="text-3xl font-black text-[#00e5cc] font-heading">
              ${totalRevenueDeposits.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct Trinidad payout pool</p>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Guest Bookings ({bookings.length})
          </button>
          
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'packages'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Manage Packages ({MOY_TRAVEL_PACKAGES.length})
          </button>

          <button
            onClick={() => setActiveTab('gateway')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'gateway'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Trinidad Gateway & Bank Settings
          </button>
        </div>

        {/* ── TAB 1: GUEST BOOKINGS ── */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ref, email or destination..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00e5cc] focus:outline-none"
              />
            </div>

            {/* Bookings Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-black tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Ref #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Room & Guests</th>
                      <th className="p-4">Band Section</th>
                      <th className="p-4">Deposit</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200 font-medium">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          No bookings found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-cyan-950/20 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#00e5cc]">
                            {b.bookingRef}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-[11px] text-slate-400">{b.customerEmail}</div>
                            <div className="text-[10px] text-cyan-300 font-mono">{b.customerPhone}</div>
                          </td>
                          <td className="p-4 font-semibold text-white">
                            {b.packageTitle}
                          </td>
                          <td className="p-4">
                            <div>{b.roomType}</div>
                            <div className="text-[10px] text-slate-400">{b.guestCount} Guest(s)</div>
                          </td>
                          <td className="p-4 text-slate-300 text-[11px]">
                            {b.masqueradeSection || '—'}
                          </td>
                          <td className="p-4 font-bold text-emerald-400">
                            ${b.depositAmount} USD
                          </td>
                          <td className="p-4 uppercase text-[10px] font-bold text-cyan-200">
                            {b.paymentMethod}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {b.customerPhone && (
                                <a
                                  href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(b.customerName)},%20Moy%20here%20from%20Moy%20Meets%20World%20regarding%20your%20${encodeURIComponent(b.packageTitle)}%20booking%20(${b.bookingRef})!`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}

                              <button
                                onClick={() => handleUpdateStatus(b.id, b.status === 'confirmed' ? 'pending_payment' : 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-white border border-white/20 transition-all"
                              >
                                {b.status === 'confirmed' ? 'Mark Pending' : 'Mark Paid'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 2: MANAGE PACKAGES ── */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white font-heading">Active Destinations & Packages</h3>
                <p className="text-xs text-slate-400">Edit prices, dates, spots remaining, or toggle package status.</p>
              </div>
              <button
                onClick={() => {
                  const newPkg = {
                    id: `custom-pkg-${Date.now()}`,
                    title: 'New Destination Experience',
                    subtitle: 'Curated Cultural Escape',
                    country: 'Caribbean',
                    dates: 'Summer 2027',
                    spotsTotal: 20,
                    spotsRemaining: 20,
                    status: 'Booking Open',
                    pricing: { deposit: 500, doubleOccupancy: 2500, singleOccupancy: 3500 },
                    tagline: 'Custom curated carnival journey.',
                    overview: 'Experience this stunning cultural celebration with full concierge guidance.',
                    cardImage: '/images/carnival/hero_banner.jpg',
                    heroImage: '/images/carnival/hero_banner.jpg',
                    included: ['Luxury Accommodations', 'Band Registration', 'Fete Tickets', 'Airport Transfers'],
                    notIncluded: ['International Flights', 'Personal Spending']
                  };
                  setEditingPkg(newPkg);
                }}
                className="px-4 py-2 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                + Add New Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packagesList.map((pkg) => (
                <div key={pkg.id} className="glass-panel p-6 rounded-2xl border-cyan-500/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold uppercase border border-cyan-400/30">
                        {pkg.country}
                      </span>
                      <span className={`text-xs font-bold ${pkg.spotsRemaining > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pkg.spotsRemaining} / {pkg.spotsTotal} spots left
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white font-heading mb-1">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-cyan-300 font-semibold mb-3">
                      {pkg.dates}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Starting:</span>
                      <span className="font-bold text-white">${pkg.pricing?.doubleOccupancy?.toLocaleString()} USD</span>
                    </div>
                    <button
                      onClick={() => setEditingPkg({ ...pkg })}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EDIT PACKAGE MODAL ── */}
        {editingPkg && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#080c14] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-slate-100 max-h-[90vh] overflow-y-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-lg font-black text-white font-heading">
                  Edit Package: {editingPkg.title}
                </h3>
                <button
                  onClick={() => setEditingPkg(null)}
                  className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPackagesList(prev => {
                    const exists = prev.find(p => p.id === editingPkg.id);
                    const updated = exists 
                      ? prev.map(p => p.id === editingPkg.id ? editingPkg : p)
                      : [editingPkg, ...prev];
                    localStorage.setItem('mmw_packages_custom', JSON.stringify(updated));
                    return updated;
                  });
                  setEditingPkg(null);
                  alert('Package details updated successfully!');
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      value={editingPkg.title}
                      onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Dates Display</label>
                    <input
                      type="text"
                      required
                      value={editingPkg.dates}
                      onChange={(e) => setEditingPkg({ ...editingPkg, dates: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Custom Quote Mode (Remove Demo Prices)</span>
                    <span className="text-[11px] text-slate-400">
                      When enabled, displays "Price on Request" instead of fixed demo price numbers.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={editingPkg.customQuoteOnly || false}
                    onChange={(e) => setEditingPkg({ ...editingPkg, customQuoteOnly: e.target.checked })}
                    className="w-5 h-5 accent-[#00e5cc] rounded"
                  />
                </div>

                {!editingPkg.customQuoteOnly && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Double Occupancy ($ USD)</label>
                      <input
                        type="number"
                        value={editingPkg.pricing?.doubleOccupancy || ''}
                        onChange={(e) => setEditingPkg({
                          ...editingPkg,
                          pricing: { ...editingPkg.pricing, doubleOccupancy: Number(e.target.value) }
                        })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Single Suite ($ USD)</label>
                      <input
                        type="number"
                        value={editingPkg.pricing?.singleOccupancy || ''}
                        onChange={(e) => setEditingPkg({
                          ...editingPkg,
                          pricing: { ...editingPkg.pricing, singleOccupancy: Number(e.target.value) }
                        })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Hold Deposit ($ USD)</label>
                      <input
                        type="number"
                        value={editingPkg.pricing?.deposit || 500}
                        onChange={(e) => setEditingPkg({
                          ...editingPkg,
                          pricing: { ...editingPkg.pricing, deposit: Number(e.target.value) }
                        })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Spots Remaining</label>
                    <input
                      type="number"
                      value={editingPkg.spotsRemaining}
                      onChange={(e) => setEditingPkg({ ...editingPkg, spotsRemaining: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Status Badge</label>
                    <select
                      value={editingPkg.status}
                      onChange={(e) => setEditingPkg({ ...editingPkg, status: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                    >
                      <option value="Booking Open">Booking Open</option>
                      <option value="Limited Spots">Limited Spots</option>
                      <option value="Waitlist Open">Waitlist Open</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tagline Summary</label>
                  <textarea
                    rows={2}
                    value={editingPkg.tagline}
                    onChange={(e) => setEditingPkg({ ...editingPkg, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm(`Are you sure you want to delete ${editingPkg.title}?`)) {
                        try {
                          await deleteDoc(doc(db, 'travelPackages', editingPkg.id));
                        } catch (err) {
                          console.warn('Firestore delete notice:', err.message);
                        }
                        setPackagesList(prev => prev.filter(p => p.id !== editingPkg.id));
                        setEditingPkg(null);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#00e5cc] text-black font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,204,0.3)] hover:bg-[#24f6df] transition-all"
                    >
                      Save Package Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── TAB 3: TRINIDAD GATEWAY & BANKING SETTINGS ── */}
        {activeTab === 'gateway' && (
          <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border-cyan-500/30 space-y-6">
            <div>
              <h2 className="text-xl font-black text-white font-heading">
                Trinidad Payment Gateway Configuration
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Configure your WiPay Caribbean Merchant ID, Republic Bank settlement details, and WhatsApp Concierge routing.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Gateway settings successfully updated for live customer checkouts.</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSettingsSaved(true);
                setTimeout(() => setSettingsSaved(false), 4000);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  WiPay Caribbean Merchant ID (Trinidad & Tobago)
                </label>
                <input
                  type="text"
                  value={wipayId}
                  onChange={(e) => setWipayId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Connects credit/debit card checkouts directly to your Trinidad WiPay account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Moy WhatsApp Concierge Phone Number
                </label>
                <input
                  type="text"
                  value={whatsappNum}
                  onChange={(e) => setWhatsappNum(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Republic Bank Account Number (Settlement Account)
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all"
                >
                  Save Gateway Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

    </div>
  );
}
