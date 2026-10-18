import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, X, Sparkles, Flame, CheckCircle } from 'lucide-react';

export default function CarnivalStoryCardModal({ 
  isOpen, 
  onClose, 
  user, 
  currentCarnival, 
  events = [], 
  costumeDetails = {} 
}) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Masquerader';
  const carnivalName = currentCarnival?.name || 'Trinidad Carnival 2026';
  const bandName = costumeDetails?.band || 'Tribe';
  const sectionName = costumeDetails?.section || 'Frontline';

  // Take top 5 scheduled events
  const displayEvents = events.slice(0, 5);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5,
        backgroundColor: '#080c14',
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `carnival-lineup-${displayName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate story card:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
        canvas.toBlob(async (blob) => {
          const file = new File([blob], 'carnival-lineup.png', { type: 'image/png' });
          await navigator.share({
            title: `My ${carnivalName} Lineup`,
            text: `Check out my carnival schedule on Caribbean Carnival Planner!`,
            files: [file]
          });
        });
      } catch (e) {
        console.warn('Share canceled or failed:', e);
      }
    } else {
      navigator.clipboard.writeText(`https://carnival-planner.web.app`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── 9:16 VERTICAL STORY CARD ── */}
        <div
          ref={cardRef}
          className="w-full aspect-[9/16] rounded-3xl bg-gradient-to-b from-[#0e1628] via-[#080c14] to-[#04060a] border border-cyan-400/40 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,229,204,0.3)] relative overflow-hidden text-white"
        >
          {/* Neon Glow Blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#00e5cc]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-12 left-0 w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00e5cc] to-teal-700 flex items-center justify-center border border-cyan-300/40 shadow-[0_0_10px_rgba(0,229,204,0.4)]">
                <span className="text-sm">🪶</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-200 font-heading">
                CARNIVAL PLANNER
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[#00e5cc]">
              ROAD READY 2026
            </span>
          </div>

          {/* User Lineup Intro */}
          <div className="relative z-10 my-auto py-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-black uppercase tracking-wider mb-2">
              <Flame className="w-3 h-3 text-rose-400 animate-pulse" /> Official Squad Lineup
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight font-heading leading-tight drop-shadow-md">
              {displayName}'s<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00e5cc]">
                {carnivalName}
              </span>
            </h2>

            {/* Costume Band Badge */}
            <div className="mt-3 p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Band & Section</span>
                <span className="text-xs font-black text-white">{bandName} • {sectionName}</span>
              </div>
              <span className="text-lg">🎭</span>
            </div>

            {/* Scheduled Fetes Lineup */}
            <div className="mt-3 space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Scheduled Fetes ({displayEvents.length || 'VIP'})
              </span>
              {(displayEvents.length > 0 ? displayEvents : [
                { name: 'Soca Brainwash', date: 'Sat 11 AM' },
                { name: "Caesar's Army A.M.BUSH", date: 'Sat 3 AM' },
                { name: 'Phuket All-Inclusive', date: 'Fri 2 PM' },
                { name: 'Tribe Ignite Concert', date: 'Thu 9 PM' }
              ]).map((event, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="font-extrabold text-slate-200 truncate pr-2">
                    {i + 1}. {event.name || event.title}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold shrink-0">
                    {event.date || 'Locked In'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer with QR & Watermark */}
          <div className="relative z-10 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-left">
            <div>
              <span className="text-[9px] font-medium text-slate-400 block">Plan your squad itinerary at:</span>
              <span className="text-xs font-black text-[#00e5cc] tracking-wide">carnival-planner.web.app</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-cyan-400/40 flex items-center justify-center text-xs">
              📲
            </div>
          </div>

        </div>

        {/* Action Buttons Below Card */}
        <div className="w-full flex gap-3 mt-4">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,204,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating...' : 'Download PNG'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-[#00e5cc]" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Share Story'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
