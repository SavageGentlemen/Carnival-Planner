import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Zap, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { generateSmartItinerary } from '../services/itineraryAutoPilotService';

export default function AutoPilotModal({
  isOpen,
  onClose,
  carnivalName = 'Carnival',
  carnivalId = 'trinidad',
  onApplyItinerary
}) {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 9);
    return d.toISOString().split('T')[0];
  });
  const [pace, setPace] = useState('balanced');
  const [budget, setBudget] = useState('moderate');
  const [loading, setLoading] = useState(false);
  const [previewItems, setPreviewItems] = useState(null);
  const [source, setSource] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateSmartItinerary({
        destination: carnivalName,
        carnivalId,
        startDate,
        endDate,
        pace,
        budget
      });
      setPreviewItems(res.itinerary || []);
      setSource(res.source);
    } catch (err) {
      console.error('Failed to generate smart itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (previewItems && previewItems.length > 0) {
      onApplyItinerary(previewItems);
      onClose();
    }
  };

  const getCategoryBadge = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'fete':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">🍹 Fete</span>;
      case 'parade':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">🥁 Road March</span>;
      case 'costume':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">🎭 Costume Pickup</span>;
      case 'rest':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">💤 Rest & Recharge</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">✈️ Travel</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-gray-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold">1-Click Smart Itinerary Auto-Pilot</h3>
              <p className="text-xs text-gray-400">AI-optimized, conflict-free schedule for {carnivalName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {!previewItems ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Autonomous Pacing Engine:</strong> Our bot calculates recovery sleep windows between breakfast and late-night fetes, reserves mas camp costume collection slots, and schedules Carnival Monday & Tuesday road marches without double-booking.
                </div>
              </div>

              {/* Date Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    Trip Arrival Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    Trip Departure Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Pace Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Carnival Energy Level & Pace
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'high_energy', label: '🔥 Non-Stop', desc: 'Max fetes, high pump' },
                    { id: 'balanced', label: '⚖️ Balanced', desc: 'Fetes + essential rest' },
                    { id: 'chill', label: '🌴 Relaxed', desc: 'Scenic & manageable' },
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        pace === p.id
                          ? 'border-pink-500 bg-pink-500/20 text-white'
                          : 'border-gray-700 bg-gray-800/60 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <div className="font-bold text-xs">{p.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Budget Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Smart Saver', desc: 'Cooler fetes & free limes' },
                    { id: 'moderate', label: 'Standard', desc: 'Mix of all-inclusives' },
                    { id: 'vip', label: 'Ultra-VIP', desc: 'Premium cabanas & staples' },
                  ].map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        budget === b.id
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-gray-700 bg-gray-800/60 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <div className="font-bold text-xs">{b.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {previewItems.length} Events Scheduled
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-300">
                    Source: {source === 'ai_optimized' ? '🤖 AI Tailored' : '⚡ Smart Template'}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewItems(null)}
                  className="text-xs text-gray-400 hover:text-white underline"
                >
                  Adjust Filters
                </button>
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {previewItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3 rounded-xl bg-gray-800/70 border border-gray-700/60 flex items-start gap-3 hover:border-purple-500/40 transition"
                  >
                    <div className="text-center min-w-[50px] p-1.5 rounded-lg bg-gray-900 border border-gray-700/50">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">
                        {item.date ? new Date(item.date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' }) : 'Day'}
                      </span>
                      <span className="block text-sm font-black text-white">
                        {item.date ? new Date(item.date + 'T00:00:00').getDate() : idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                        {getCategoryBadge(item.category)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-400" />
                          {item.time || '12:00'}
                        </span>
                        {item.venue && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-purple-400" />
                            {item.venue}
                          </span>
                        )}
                      </div>
                      {item.note && (
                        <p className="text-[11px] text-gray-400 italic bg-gray-900/60 p-1.5 rounded border border-gray-800">
                          💡 {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
                ✨ <strong>Non-Destructive Import:</strong> Applying this itinerary will merge with your existing plans without deleting custom events. You can edit, drag, or delete any item anytime!
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-gray-900/90">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition"
          >
            Close
          </button>

          {!previewItems ? (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-pink-500/20 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Run AI Auto-Pilot
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              Apply to My Schedule
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
