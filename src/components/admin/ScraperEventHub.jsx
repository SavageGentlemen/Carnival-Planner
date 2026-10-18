import React, { useState, useEffect } from 'react';
import { 
  Globe, Calendar, Ticket, ExternalLink, CheckCircle2, 
  RefreshCw, Sparkles, AlertCircle, Search, Filter, 
  Send, Plus, Trash2, ShieldCheck, Tag, Layers, Check
} from 'lucide-react';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '../../firebase';
import { supabase } from '../../supabaseClient';

export default function ScraperEventHub({ onSelectForAlert }) {
  const [selectedCarnival, setSelectedCarnival] = useState('trinidad');
  const [events, setEvents] = useState([]);
  const [lastScrapedAt, setLastScrapedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [publishing, setPublishing] = useState(false);
  const [publishedCount, setPublishedCount] = useState(0);

  const CARNIVALS = [
    { id: 'trinidad', name: 'Trinidad Carnival 🇹🇹' },
    { id: 'barbados', name: 'Barbados Crop Over 🇧🇧' },
    { id: 'jamaica', name: 'Jamaica Carnival 🇯🇲' },
    { id: 'stlucia', name: 'St. Lucia Carnival 🇱🇨' },
    { id: 'miami', name: 'Miami Carnival 🇺🇸' },
    { id: 'ny-labor-day', name: 'New York Labor Day 🇺🇸' },
    { id: 'toronto', name: 'Toronto Caribana 🇨🇦' },
    { id: 'antigua', name: 'Antigua Carnival 🇦🇬' },
    { id: 'grenada', name: 'Grenada Spicemas 🇬🇩' }
  ];

  const loadScrapedEvents = async (carnivalId) => {
    setLoading(true);
    try {
      if (db) {
        const docRef = doc(db, 'carnivalEvents', carnivalId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setEvents(data.events || []);
          setLastScrapedAt(data.lastScrapedAt || null);
        } else {
          setEvents([]);
          setLastScrapedAt(null);
        }
      }
    } catch (err) {
      console.warn('Failed to load scraped events:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScrapedEvents(selectedCarnival);
  }, [selectedCarnival]);

  // Filtered Events
  const filteredEvents = events.filter(e => {
    const matchesSearch = !search || 
      (e.title && e.title.toLowerCase().includes(search.toLowerCase())) ||
      (e.venue && e.venue.toLowerCase().includes(search.toLowerCase()));
    
    const matchesSource = sourceFilter === 'all' || 
      (e.source && e.source.toLowerCase().includes(sourceFilter.toLowerCase()));

    return matchesSearch && matchesSource;
  });

  // 1-Click Auto-Approve & Publish to Supabase/Firestore Live Events
  const handleAutoApproveAll = async () => {
    if (!filteredEvents.length) return;
    if (!confirm(`Auto-approve and sync ${filteredEvents.length} events to the live public calendar?`)) return;

    setPublishing(true);
    let successCount = 0;

    try {
      // 1. Sync to Supabase `events` table if available
      if (supabase) {
        const rows = filteredEvents.map(e => ({
          carnival_id: selectedCarnival,
          name: e.title,
          venue: e.venue || 'TBA',
          date: e.date || new Date().toISOString().slice(0, 10),
          ticket_url: e.ticketUrl || null,
          source: e.source || 'scraper',
          vibe_score: e.vibeScore || 8
        }));

        const { error } = await supabase.from('events').upsert(rows, { onConflict: 'name,carnival_id' });
        if (error) console.warn('Supabase upsert note:', error.message);
        else successCount = rows.length;
      }

      // 2. Mark events as approved in Firestore
      const docRef = doc(db, 'carnivalEvents', selectedCarnival);
      const updatedList = events.map(e => ({ ...e, isApproved: true, approvedAt: new Date().toISOString() }));
      await setDoc(docRef, {
        carnivalId: selectedCarnival,
        events: updatedList,
        lastApprovedAt: new Date().toISOString()
      }, { merge: true });

      setEvents(updatedList);
      setPublishedCount(filteredEvents.length);
      alert(`✅ Successfully auto-approved & published ${filteredEvents.length} events for ${selectedCarnival}!`);
    } catch (err) {
      alert(`Publish error: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-heading text-white flex items-center gap-2">
            <Globe className="w-7 h-7 text-[#00e5cc]" />
            Scraper & Automated Event Publishing Hub
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Auto-curates events scraped from IslandETickets, Frontline, Fetelist, TicketFederation & TriniJungleJuice.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadScrapedEvents(selectedCarnival)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            title="Refresh Scraped Events"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleAutoApproveAll}
            disabled={publishing || !filteredEvents.length}
            className="flex items-center gap-2 px-4 py-2 bg-[#00e5cc] hover:bg-[#2bfde5] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,204,0.3)] disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {publishing ? 'Publishing...' : `⚡ 1-Click Auto-Approve All (${filteredEvents.length})`}
          </button>
        </div>
      </div>

      {/* Carnival Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CARNIVALS.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCarnival(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              selectedCarnival === c.id
                ? 'bg-slate-100 text-slate-900 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Toolbar: Stats & Filter */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-white">
            {events.length} Scraped Events Available
          </span>
          <span>•</span>
          <span>Last sync: {lastScrapedAt ? new Date(lastScrapedAt).toLocaleString() : 'Automated 15m cron'}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search event or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5cc]"
            />
          </div>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Sources</option>
            <option value="islandetickets">Island eTickets</option>
            <option value="frontline">Frontline</option>
            <option value="trinijunglejuice">TriniJungleJuice</option>
            <option value="ticketfederation">TicketFederation</option>
            <option value="fetelist">Fetelist</option>
          </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-sm">Loading scraped carnival feed...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-300">No events found for {selectedCarnival}</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            The automated scraper cron runs every 15 minutes. Check other carnivals or verify scraper connectivity.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                evt.isApproved
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-[#00e5cc] border border-cyan-500/30">
                    {evt.source || 'Scraped'}
                  </span>
                  {evt.isApproved && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Published
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-extrabold text-white line-clamp-2 leading-snug">
                  {evt.title}
                </h4>

                <div className="mt-2 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{evt.date || 'TBA'}</span>
                  </div>
                  {evt.venue && (
                    <div className="flex items-center gap-1.5 truncate text-[11px] text-slate-400">
                      <span>📍 {evt.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {evt.ticketUrl ? (
                  <a
                    href={evt.ticketUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    Tickets
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500">No ticket link</span>
                )}

                <button
                  type="button"
                  onClick={() => onSelectForAlert && onSelectForAlert(evt)}
                  className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-[11px] font-bold transition-all flex items-center gap-1 shadow-sm"
                  title="Broadcast this fete as a VIP Flash Drop"
                >
                  <Send className="w-3 h-3 text-rose-400" />
                  Alert VIPs
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
