import React, { useState } from 'react';
import { Bell, Zap, CheckCircle2, Send, ShieldCheck, Flame } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function FeteDropAlertBox() {
  const [contact, setContact] = useState('');
  const [carnival, setCarnival] = useState('Trinidad Carnival 🇹🇹');
  const [notifyMethod, setNotifyMethod] = useState('whatsapp');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, 'feteAlertLeads'), {
          contact: contact.trim(),
          notifyMethod,
          preferredCarnival: carnival,
          source: 'landing_alert_banner',
          createdAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.warn('Lead capture offline fallback:', err.message);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-purple-950/80 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-slate-100 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#00e5cc]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {submitted ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-cyan-950 border border-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3 text-[#00e5cc] shadow-[0_0_20px_rgba(0,229,204,0.4)]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black text-white font-heading uppercase">
            YOU'RE ON THE VIP ALERT RADAR!
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            We will ping you via {notifyMethod === 'whatsapp' ? 'WhatsApp' : 'Email'} 15 minutes before <strong>{carnival}</strong> fete tickets & band launches drop.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Text */}
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Never Miss a Sold-Out Fete Drop
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-heading uppercase tracking-tight leading-tight">
              Get Fete Ticket & Band Launch Flash Alerts
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium">
              Soca Brainwash, AMBUSH, and Tribe sell out in 3 minutes. Get free instant alerts sent directly to your phone before tickets go live.
            </p>
          </div>

          {/* Right Input Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-2 max-w-md">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <select
                  value={carnival}
                  onChange={(e) => setCarnival(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
                >
                  <option value="Trinidad Carnival 🇹🇹">Trinidad 🇹🇹</option>
                  <option value="Barbados Crop Over 🇧🇧">Crop Over 🇧🇧</option>
                  <option value="Jamaica Carnival 🇯🇲">Jamaica 🇯🇲</option>
                  <option value="Miami Carnival 🇺🇸">Miami 🇺🇸</option>
                  <option value="Notting Hill Carnival 🇬🇧">Notting Hill 🇬🇧</option>
                </select>

                <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-0.5">
                  <button
                    type="button"
                    onClick={() => setNotifyMethod('whatsapp')}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${notifyMethod === 'whatsapp' ? 'bg-[#00e5cc] text-black' : 'text-slate-400'}`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifyMethod('email')}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${notifyMethod === 'email' ? 'bg-[#00e5cc] text-black' : 'text-slate-400'}`}
                  >
                    Email
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type={notifyMethod === 'email' ? 'email' : 'tel'}
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={notifyMethod === 'whatsapp' ? "+1 (555) 000-0000" : "name@example.com"}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5cc]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00e5cc] hover:bg-[#24f6df] text-black font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,204,0.3)] shrink-0 flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{loading ? 'Joining...' : 'Alert Me'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-[#00e5cc]" />
                <span>Zero spam. Only critical ticket drop & band launch announcements.</span>
              </div>
            </div>
          </form>

        </div>
      )}

    </div>
  );
}
