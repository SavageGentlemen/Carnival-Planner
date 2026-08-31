import React, { useState, useEffect } from 'react';
import { 
  Loader2, 
  Check, 
  X, 
  Box, 
  Trash2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Shirt, 
  Award, 
  Crown,
  ExternalLink,
  PackageOpen,
  Sparkles,
  Layers
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function BandOSApprovals({ user }) {
  const [activeSubTab, setActiveSubTab] = useState('revenue'); // revenue, bands, approvals, ambassadors
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('pending');
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, action: null, name: '' });

  const [liveOrders, setLiveOrders] = useState([]);

  useEffect(() => {
    const fetchProfilesAndOrders = async () => {
      try {
        if (supabase) {
          const { data: profiles, error: pError } = await supabase
            .from('band_profiles')
            .select('*')
            .order('created_at', { ascending: false });

          if (!pError && profiles) {
            setAllRequests(profiles);
          }

          const { data: orders, error: oError } = await supabase
            .from('band_orders')
            .select('*, band_profiles(business_name), band_costume_sections(title)');

          if (!oError && orders) {
            setLiveOrders(orders);
          }
        }
      } catch (err) {
        console.warn("Notice: Fetching platform data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfilesAndOrders();
  }, []);

  const filteredRequests = allRequests.filter(c => {
    if (activeFilter === 'all') return true;
    return c.status === activeFilter;
  });

  const openConfirm = (id, action, name) => {
    setConfirmModal({ open: true, id, action, name });
  };

  const closeConfirm = () => {
    setConfirmModal({ open: false, id: null, action: null, name: '' });
  };

  const handleAction = async () => {
    const { id, action } = confirmModal;
    closeConfirm();
    setProcessingId(id);

    try {
      if (supabase) {
        if (action === 'delete') {
          await supabase.from('band_profiles').delete().eq('id', id);
        } else {
          await supabase.from('band_profiles').update({ status: action }).eq('id', id);
          if (action === 'approved') {
            await setDoc(doc(db, 'userProfiles', id), { isBandLeader: true }, { merge: true });
          } else if (action === 'rejected') {
            await setDoc(doc(db, 'userProfiles', id), { isBandLeader: false }, { merge: true });
          }
        }
      }
      setAllRequests(allRequests.map(r => r.id === id ? { ...r, status: action } : r));
    } catch (err) {
      console.error(err);
      alert("Action error: " + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  // Build live aggregated bands from real DB
  const approvedBands = allRequests.filter(b => b.status === 'approved');
  const globalBands = approvedBands.map(b => {
    const bandOrders = liveOrders.filter(o => o.band_id === b.id);
    const masqueradersCount = bandOrders.length;
    const distributedCount = bandOrders.filter(o => o.distribution_status === 'Distributed').length;
    const distributedPercent = masqueradersCount > 0 ? Math.round((distributedCount / masqueradersCount) * 100) : 0;
    const depositVolume = bandOrders.reduce((s, o) => s + (parseFloat(o.amount_paid) || 0), 0);
    const grossCostumeGMV = bandOrders.reduce((s, o) => s + (parseFloat(o.total_amount) || parseFloat(o.amount_paid) || 0), 0);
    const platformFeeRevenue = bandOrders.reduce((s, o) => s + ((parseFloat(o.amount_paid) || 0) * 0.025 + 1.00), 0);

    return {
      id: b.id,
      name: b.business_name || 'Carnival Band',
      contactName: b.contact_name || b.name || 'Band Leader',
      carnivalCity: b.carnival_city || 'Caribbean',
      masqueradersCount,
      activeSections: 0,
      distributedPercent,
      grossCostumeGMV,
      depositVolume,
      platformFeeRevenue,
      stripeConnected: !!b.stripe_account_id,
      status: b.status
    };
  });

  const totalNetworkMasqueraders = liveOrders.length;
  const totalNetworkGMV = liveOrders.reduce((s, o) => s + (parseFloat(o.total_amount) || parseFloat(o.amount_paid) || 0), 0);
  const totalPlatformTake = liveOrders.reduce((s, o) => s + ((parseFloat(o.amount_paid) || 0) * 0.025 + 1.00), 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Box className="w-6 h-6 text-pink-500" />
            BandOS Master Platform Admin Hub
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Platform-wide costume deposit revenue, band approvals, and live distribution tracking.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 flex-wrap gap-1">
          {[
            { id: 'revenue', label: 'Platform Revenue', icon: DollarSign },
            { id: 'bands', label: 'Global Band Directory', icon: Shirt },
            { id: 'ambassadors', label: 'Section Leaders', icon: Award },
            { id: 'approvals', label: 'Band Approvals (' + filteredRequests.length + ')', icon: Check },
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeSubTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveSubTab(t.id)}
                className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all " + (isActive ? "bg-pink-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: PLATFORM REVENUE & KPIS */}
      {activeSubTab === 'revenue' && (
        <div className="space-y-6">
          
          {/* Main Revenue Card */}
          <div className="bg-gradient-to-r from-pink-900/40 via-purple-900/30 to-gray-900 p-6 rounded-2xl border border-pink-500/30 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> BandOS Platform Take-Rate (2.5% + $1.00 on Deposits)
                </span>
                <p className="text-4xl font-black text-white mt-1">
                  {"$" + totalPlatformTake.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Collected automatically from <strong>{totalNetworkMasqueraders.toLocaleString()} masquerader costume deposits</strong>.
                </p>
              </div>

              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700 text-right">
                <div className="text-xs text-gray-400">Total Costume GMV Processed</div>
                <div className="text-2xl font-black text-green-400">
                  {"$" + totalNetworkGMV.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-purple-400 mt-0.5">$0/month SaaS cost for band leaders</div>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gross Platform GMV</span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{"$" + totalNetworkGMV.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <span className="text-[10px] text-emerald-500 font-bold mt-1 inline-block">Real-time costume booking volume</span>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Platform Take (2.5% + $1)</span>
              <p className="text-2xl font-black text-pink-600 dark:text-pink-400 mt-1">{"$" + totalPlatformTake.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <span className="text-[10px] text-purple-500 font-bold mt-1 inline-block">Direct net SaaS revenue</span>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Masqueraders</span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{totalNetworkMasqueraders}</p>
              <span className="text-[10px] text-blue-500 font-bold mt-1 inline-block">Across all verified bands</span>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Bands</span>
              <p className="text-2xl font-black text-amber-500 mt-1">{approvedBands.length}</p>
              <span className="text-[10px] text-gray-400 font-bold mt-1 inline-block">Approved band leaders</span>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: ACTIVE BANDS TABLE */}
      {activeSubTab === 'bands' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Active BandOS Bands</h3>
              <p className="text-xs text-gray-500">Live operational status and revenue performance per band.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            {globalBands.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                No active bands currently approved. Applications will appear in the Application Queue.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-3.5 font-bold">Band Profile</th>
                    <th className="p-3.5 font-bold">Location</th>
                    <th className="p-3.5 font-bold">Masqueraders</th>
                    <th className="p-3.5 font-bold">Costume GMV</th>
                    <th className="p-3.5 font-bold">Deposit Volume</th>
                    <th className="p-3.5 font-bold">Platform Fee</th>
                    <th className="p-3.5 font-bold">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {globalBands.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/40 text-pink-600 flex items-center justify-center font-black">
                          {b.name.charAt(0)}
                        </div>
                        <div>
                          <div>{b.name}</div>
                          <div className="text-[10px] text-gray-400 font-normal">{b.contactName}</div>
                        </div>
                      </td>
                      <td className="p-3.5 text-gray-600 dark:text-gray-300">{b.carnivalCity}</td>
                      <td className="p-3.5 font-bold text-purple-600 dark:text-purple-400">{b.masqueradersCount}</td>
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{"$" + b.grossCostumeGMV.toLocaleString()}</td>
                      <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">{"$" + b.depositVolume.toLocaleString()}</td>
                      <td className="p-3.5 font-black text-pink-600 dark:text-pink-400">{"$" + b.platformFeeRevenue.toLocaleString()}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className="bg-teal-500 h-full rounded-full" style={{ width: b.distributedPercent + '%' }}></div>
                          </div>
                          <span className="font-bold text-teal-600 dark:text-teal-400">{b.distributedPercent}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SECTION LEADERS LEADERBOARD */}
      {activeSubTab === 'ambassadors' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Top Section Leaders & Ambassadors</h3>
            <p className="text-xs text-gray-500">Cross-band ranking of designers driving masquerader registrations.</p>
          </div>

          <div className="overflow-x-auto">
            {topAmbassadors.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                No section leader referral registrations recorded yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-3.5 font-bold">Section Leader</th>
                    <th className="p-3.5 font-bold">Band & Section</th>
                    <th className="p-3.5 font-bold">Costumes Sold</th>
                    <th className="p-3.5 font-bold">Volume Driven</th>
                    <th className="p-3.5 font-bold">Earned Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topAmbassadors.map((rep, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                        <span className="text-amber-500 mr-1.5">#{idx + 1}</span> {rep.name}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-purple-600 dark:text-purple-400">{rep.band}</div>
                        <div className="text-gray-400 text-[11px]">{rep.section}</div>
                      </td>
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{rep.sales} costumes</td>
                      <td className="p-3.5 font-bold text-green-600 dark:text-green-400">{"$" + rep.volume.toLocaleString()}</td>
                      <td className="p-3.5 font-bold text-amber-500">{"$" + rep.commission.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: BAND APPROVALS QUEUE */}
      {activeSubTab === 'approvals' && (
        <div className="space-y-4">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {['pending', 'approved', 'rejected', 'all'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={"px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors " + (activeFilter === filter ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs">
                No band applications matching filter <strong>{activeFilter}</strong>.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRequests.map(req => (
                  <div key={req.id} className="p-4 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">{req.name || req.band_name || 'Band Leader'}</div>
                      <div className="text-gray-500">{req.contact_email || req.email} &bull; {req.carnival_name || 'Carnival'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openConfirm(req.id, 'approved', req.name)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => openConfirm(req.id, 'rejected', req.name)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              Confirm {confirmModal.action}?
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Are you sure you want to mark <strong>{confirmModal.name || 'this band'}</strong> as {confirmModal.action}?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAction}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-xl text-xs"
              >
                Confirm
              </button>
              <button
                onClick={closeConfirm}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
