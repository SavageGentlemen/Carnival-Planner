import React, { useState, useEffect } from 'react';
import { 
  Flame, Bell, Send, Users, Download, Search, CheckCircle2, 
  ExternalLink, Smartphone, Mail, AlertTriangle, Sparkles, Filter, 
  RefreshCw, Radio, Tag, Clock
} from 'lucide-react';
import { feteLeadService } from '../../services/feteLeadService';

export default function FeteDropLeadManager() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [carnivalFilter, setCarnivalFilter] = useState('all');

  // Broadcast Form State
  const [targetCarnival, setTargetCarnival] = useState('Trinidad Carnival 🇹🇹');
  const [feteName, setFeteName] = useState('');
  const [dropTime, setDropTime] = useState('Tomorrow at 10:00 AM AST');
  const [ticketUrl, setTicketUrl] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [note, setNote] = useState('');
  const [dispatching, setDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);
  const [previewTab, setPreviewTab] = useState('whatsapp');

  const POPULAR_FETES = [
    'Soca Brainwash',
    'AMBUSH / Caesar\'s Army',
    'Tribe Mas Band Launch',
    'Phuket All-Inclusive',
    'Soaka Street Festival',
    'Scorch Crop Over',
    'Sunrise Breakfast Party (Jamaica)',
    'Remedy Beach Fete (St. Lucia)'
  ];

  const loadLeads = async () => {
    setLoading(true);
    const data = await feteLeadService.getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const stats = feteLeadService.getLeadStats(leads);

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = !search || 
      (l.contact && l.contact.toLowerCase().includes(search.toLowerCase())) ||
      (l.preferredCarnival && l.preferredCarnival.toLowerCase().includes(search.toLowerCase()));
    
    const matchesChannel = channelFilter === 'all' || l.notifyMethod === channelFilter;
    const matchesCarnival = carnivalFilter === 'all' || l.preferredCarnival === carnivalFilter;

    return matchesSearch && matchesChannel && matchesCarnival;
  });

  // Calculate target audience count for composer
  const audienceForCarnival = leads.filter(l => 
    targetCarnival === 'all' || l.preferredCarnival === targetCarnival
  );

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!feteName.trim()) return;

    if (!confirm(`Broadcast VIP Drop alert for "${feteName}" to ${audienceForCarnival.length} subscribers?`)) {
      return;
    }

    setDispatching(true);
    try {
      const result = await feteLeadService.broadcastDropAlert({
        carnival: targetCarnival,
        feteName: feteName.trim(),
        dropTime: dropTime.trim(),
        ticketUrl: ticketUrl.trim(),
        promoCode: promoCode.trim(),
        note: note.trim(),
        targetLeads: audienceForCarnival
      });

      setDispatchResult(result);
    } catch (err) {
      alert(`Dispatch error: ${err.message}`);
    } finally {
      setDispatching(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-heading text-white flex items-center gap-2">
            <Flame className="w-7 h-7 text-rose-500 animate-pulse" />
            VIP Fete Drops & Lead Dispatch Hub
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Capture masquerader leads from landing pages and dispatch instant alerts for sold-out fete drops.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadLeads}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => feteLeadService.exportToCSV(leads)}
            disabled={!leads.length}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#00e5cc]" />
            Export CSV ({leads.length})
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Total VIP Subscribers</span>
            <Users className="w-4 h-4 text-[#00e5cc]" />
          </div>
          <div className="text-2xl font-black text-white">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1">From landing drop alerts</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>WhatsApp Leads</span>
            <Smartphone className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats.whatsappCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">High-open rate direct mobile</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Email Subscribers</span>
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{stats.emailCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Full HTML calendar digest</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>Top Carnival Focus</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-purple-300 truncate">
            {Object.keys(stats.carnivalCounts).length ? Object.entries(stats.carnivalCounts).sort((a,b) => b[1] - a[1])[0][0] : 'None'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Highest lead interest</div>
        </div>
      </div>

      {/* Main Action Grid: Dispatcher on Left, Leads on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Campaign Dispatcher (Col 7) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
              <h3 className="text-lg font-extrabold text-white">Broadcast VIP Flash Drop Alert</h3>
            </div>
            <span className="text-xs bg-rose-950/80 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full font-bold">
              {audienceForCarnival.length} Masqueraders Targeted
            </span>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4">
            
            {/* Target Carnival */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Target Carnival</label>
              <select
                value={targetCarnival}
                onChange={(e) => setTargetCarnival(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
              >
                <option value="Trinidad Carnival 🇹🇹">Trinidad Carnival 🇹🇹</option>
                <option value="Barbados Crop Over 🇧🇧">Crop Over 🇧🇧</option>
                <option value="Jamaica Carnival 🇯🇲">Jamaica Carnival 🇯🇲</option>
                <option value="Miami Carnival 🇺🇸">Miami Carnival 🇺🇸</option>
                <option value="Notting Hill Carnival 🇬🇧">Notting Hill 🇬🇧</option>
                <option value="all">🌐 All Carnivals (Global Blast)</option>
              </select>
            </div>

            {/* Quick Chips */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#00e5cc]" /> Quick Select Trending Fetes
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_FETES.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFeteName(f)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Fete Name & Ticket URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Event / Fete Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Soca Brainwash 2026"
                  value={feteName}
                  onChange={(e) => setFeteName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ticket Link (URL)</label>
                <input
                  type="url"
                  placeholder="https://islandetickets.com/..."
                  value={ticketUrl}
                  onChange={(e) => setTicketUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
                />
              </div>
            </div>

            {/* Drop Time & Promo Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Drop Date & Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tomorrow at 10:00 AM AST"
                  value={dropTime}
                  onChange={(e) => setDropTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Access / Promo Code (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. VIPEARLYBIRD"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
                />
              </div>
            </div>

            {/* Note / Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Masquerader Note (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Committee tickets only. Log in before 9:55 AM!"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
              />
            </div>

            {/* Live Message Preview Accordion */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">Live Alert Preview:</span>
                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('whatsapp')}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${previewTab === 'whatsapp' ? 'bg-emerald-500 text-black' : 'text-slate-400'}`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('email')}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${previewTab === 'email' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}
                  >
                    Email
                  </button>
                </div>
              </div>

              {previewTab === 'whatsapp' ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-100 font-mono leading-relaxed space-y-1">
                  <div>🚨 <strong>CARNIVAL PLANNER VIP FLASH DROP</strong> 🚨</div>
                  <div>🎉 <strong>Event:</strong> {feteName || '[Event Name]'}</div>
                  <div>📍 <strong>Carnival:</strong> {targetCarnival}</div>
                  <div>⏰ <strong>Drop Time:</strong> {dropTime || 'Dropping Soon'}</div>
                  {ticketUrl && <div>🎟️ <strong>Tickets:</strong> {ticketUrl}</div>}
                  {promoCode && <div>🔑 <strong>Access Code:</strong> {promoCode}</div>}
                  {note && <div>💬 <strong>Note:</strong> {note}</div>}
                  <div className="text-[10px] text-emerald-400 pt-1">_Powered by Caribbean Carnival Planner (www.carnival-planner.com)_</div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white text-sm">🔥 VIP ALERT: {feteName || '[Event Name]'} Tickets Dropping!</div>
                  <p>Get ready! Tickets for <strong>{feteName || '[Event Name]'}</strong> are scheduled to drop on <strong>{dropTime}</strong>.</p>
                  {ticketUrl && (
                    <a href={ticketUrl} target="_blank" rel="noreferrer" className="inline-block px-3 py-1.5 bg-[#00e5cc] text-black font-extrabold rounded-lg text-xs">
                      Buy Tickets Now →
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Broadcast Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={dispatching || !feteName.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {dispatching ? 'Broadcasting VIP Drop...' : `Broadcast to ${audienceForCarnival.length} VIPs`}
              </button>

              {dispatchResult && dispatchResult.whatsappBroadcastUrl && (
                <a
                  href={dispatchResult.whatsappBroadcastUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0"
                >
                  <Smartphone className="w-4 h-4" />
                  Blast on WhatsApp
                </a>
              )}
            </div>

            {dispatchResult && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Successfully logged campaign <strong>#{dispatchResult.campaignId.slice(0, 8)}</strong>! Targeted {dispatchResult.totalSent} subscribers ({dispatchResult.whatsappCount} WhatsApp, {dispatchResult.emailCount} Email).
                </span>
              </div>
            )}

          </form>
        </div>

        {/* Leads Directory (Col 5) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00e5cc]" /> VIP Subscribers ({filteredLeads.length})
            </h3>
          </div>

          {/* Search & Filters */}
          <div className="space-y-2 mb-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search phone, email, or carnival..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5cc]"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none"
              >
                <option value="all">All Channels</option>
                <option value="whatsapp">WhatsApp Only</option>
                <option value="email">Email Only</option>
              </select>

              <select
                value={carnivalFilter}
                onChange={(e) => setCarnivalFilter(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none"
              >
                <option value="all">All Carnivals</option>
                <option value="Trinidad Carnival 🇹🇹">Trinidad</option>
                <option value="Barbados Crop Over 🇧🇧">Crop Over</option>
                <option value="Jamaica Carnival 🇯🇲">Jamaica</option>
                <option value="Miami Carnival 🇺🇸">Miami</option>
                <option value="Notting Hill Carnival 🇬🇧">Notting Hill</option>
              </select>
            </div>
          </div>

          {/* Leads Table / List */}
          <div className="flex-1 overflow-y-auto max-h-[420px] space-y-2 pr-1 custom-scrollbar">
            {loading ? (
              <div className="text-center py-12 text-slate-500 text-xs">Loading subscribers...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No VIP subscribers found. Share the budget estimator and fete alert box to capture leads!
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      {lead.notifyMethod === 'whatsapp' ? (
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                      <span className="font-semibold text-xs text-white truncate">
                        {lead.contact}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {lead.preferredCarnival} • {lead.createdAtFormatted}
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${lead.notifyMethod === 'whatsapp' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'}`}>
                    {lead.notifyMethod === 'whatsapp' ? 'WA' : 'Email'}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
