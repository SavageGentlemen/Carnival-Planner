import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  DollarSign, 
  Users, 
  UploadCloud, 
  Calendar, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp,
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function PromoterAdminHub() {
  const [activeSubTab, setActiveSubTab] = useState('revenue'); // revenue, promoters, migrations, reps
  const [promotersList, setPromotersList] = useState([]);
  const [migrationFeed, setMigrationFeed] = useState([]);
  const [topReps, setTopReps] = useState([]);
  const [platformStats, setPlatformStats] = useState({
    totalPlatformFeeRevenue: 0,
    totalGrossTicketVolume: 0,
    totalTicketsSold: 0,
    totalAudienceMigrated: 0,
    activePromoters: 0,
    activeEvents: 0
  });

  useEffect(() => {
    const fetchPromoterPlatformData = async () => {
      try {
        if (supabase) {
          const { data: events } = await supabase.from('events').select('*');
          const totalEvents = events?.length || 0;
          
          setPlatformStats({
            totalPlatformFeeRevenue: 0,
            totalGrossTicketVolume: 0,
            totalTicketsSold: 0,
            totalAudienceMigrated: 0,
            activePromoters: 0,
            activeEvents: totalEvents
          });
        }
      } catch (e) {
        console.warn('Error fetching promoter stats:', e);
      }
    };
    fetchPromoterPlatformData();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-pink-500" />
            Promoter & Event Ticketing Admin Hub
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Platform-wide party ticketing fee revenue ($1.00 + 3.0%), competitor migration streams, and organizer verification.
          </p>
        </div>

        {/* Sub Nav */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 flex-wrap gap-1">
          {[
            { id: 'revenue', label: 'Ticket Fee Revenue', icon: DollarSign },
            { id: 'promoters', label: 'Promoter Directory (' + promotersList.length + ')', icon: Building2 },
            { id: 'migrations', label: 'Migration Stream', icon: UploadCloud },
            { id: 'reps', label: 'Ambassador Network', icon: Crown },
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

      {/* SUB-TAB 1: REVENUE */}
      {activeSubTab === 'revenue' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-gray-900 p-6 rounded-2xl border border-purple-500/30 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Ticketing Take-Rate Revenue ($1.00 + 3.0% per ticket)
                </span>
                <p className="text-4xl font-black text-white mt-1">
                  {"$" + platformStats.totalPlatformFeeRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Collected automatically from <strong>{platformStats.totalTicketsSold.toLocaleString()} tickets sold</strong> across {platformStats.activeEvents} live events.
                </p>
              </div>

              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700 text-right">
                <div className="text-xs text-gray-400">Total Ticket GMV Processed</div>
                <div className="text-2xl font-black text-green-400">
                  {"$" + platformStats.totalGrossTicketVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-purple-400 mt-0.5">$0/month subscription cost for promoters</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Active Promoters</span>
                <Building2 className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{platformStats.activePromoters}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">NY, Miami, Trinidad, London</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Migrated Attendee Contacts</span>
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{platformStats.totalAudienceMigrated.toLocaleString()}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">Ported from Eventbrite & POSH</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Live Fêtes / Events</span>
                <Calendar className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-3xl font-black text-teal-500">{platformStats.activeEvents}</p>
              <p className="text-xs text-gray-500 mt-1">Selling tickets with instant payouts</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PROMOTERS DIRECTORY */}
      {activeSubTab === 'promoters' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Promoter Organizations ({promotersList.length})</h3>
            <span className="text-xs text-gray-500">Live ticket sales & payout status</span>
          </div>

          <div className="overflow-x-auto">
            {promotersList.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                No promoter organizations registered yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-3.5 font-bold">Promoter</th>
                    <th className="p-3.5 font-bold">Location</th>
                    <th className="p-3.5 font-bold">Active Events</th>
                    <th className="p-3.5 font-bold">Tickets Sold</th>
                    <th className="p-3.5 font-bold">Gross Sales</th>
                    <th className="p-3.5 font-bold">Platform Fee Take</th>
                    <th className="p-3.5 font-bold">Stripe Payout Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {promotersList.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-gray-900 dark:text-white">{p.name}</div>
                        <div className="text-purple-600 dark:text-purple-400 text-[11px] font-mono">{p.handle}</div>
                      </td>
                      <td className="p-3.5 text-gray-500">{p.city}</td>
                      <td className="p-3.5">{p.activeEvents} events</td>
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{p.ticketsSold}</td>
                      <td className="p-3.5 font-bold text-green-600 dark:text-green-400">{"$" + p.grossSales.toLocaleString()}</td>
                      <td className="p-3.5 font-black text-pink-600 dark:text-pink-400">{"$" + p.platformFeeRevenue.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className={"px-2 py-0.5 rounded text-[11px] font-bold " + (p.status === 'VERIFIED' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400")}>
                          {p.status === 'VERIFIED' ? 'Connected & Verified' : 'Pending Connect'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MIGRATION FEED */}
      {activeSubTab === 'migrations' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Live Migration Activity Stream</h3>
            <p className="text-xs text-gray-500">Attendee and VIP databases migrated from competing platforms.</p>
          </div>

          <div className="overflow-x-auto">
            {migrationFeed.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                No attendee migration streams active currently.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-3.5 font-bold">Promoter</th>
                    <th className="p-3.5 font-bold">Platform Source</th>
                    <th className="p-3.5 font-bold">Contacts Ingested</th>
                    <th className="p-3.5 font-bold">SMS Ready (E.164)</th>
                    <th className="p-3.5 font-bold">VIP Spenders</th>
                    <th className="p-3.5 font-bold">Activity Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {migrationFeed.map(m => (
                    <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{m.promoter}</td>
                      <td className="p-3.5">
                        <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-[11px] font-bold">
                          {m.source}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{m.contacts} contacts</td>
                      <td className="p-3.5 text-green-600 dark:text-green-400 font-medium">{m.phones} phones</td>
                      <td className="p-3.5 text-amber-500 font-bold">{m.vips} VIPs</td>
                      <td className="p-3.5 text-gray-400">{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: REPS */}
      {activeSubTab === 'reps' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Global Ambassador Rep Leaderboard</h3>
            <p className="text-xs text-gray-500">Top street team sub-promoters generating ticket sales across all events.</p>
          </div>

          <div className="overflow-x-auto">
            {topReps.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-xs">
                No street team sales recorded yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-3.5 font-bold">Ambassador Rep</th>
                    <th className="p-3.5 font-bold">Promoter Organization</th>
                    <th className="p-3.5 font-bold">Tracking Code</th>
                    <th className="p-3.5 font-bold">Tickets Sold</th>
                    <th className="p-3.5 font-bold">Sales Volume</th>
                    <th className="p-3.5 font-bold">Earned Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topReps.map((r, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                        <span className="text-amber-500 mr-1.5">#{idx + 1}</span> {r.name}
                      </td>
                      <td className="p-3.5 text-gray-600 dark:text-gray-300">{r.promoter}</td>
                      <td className="p-3.5">
                        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded text-purple-600 dark:text-purple-400 font-mono">
                          ?rep={r.code}
                        </code>
                      </td>
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{r.ticketsSold}</td>
                      <td className="p-3.5 font-bold text-green-600 dark:text-green-400">{"$" + r.volume.toFixed(2)}</td>
                      <td className="p-3.5 font-bold text-amber-500">{"$" + r.commission.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
