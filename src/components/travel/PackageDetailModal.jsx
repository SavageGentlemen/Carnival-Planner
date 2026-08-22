import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  CreditCard, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  HeartHandshake,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { MOY_AGENT_PROFILE } from './travelData';

export default function PackageDetailModal({ packageItem, onClose, onOpenBooking }) {
  if (!packageItem) return null;

  const [selectedTier, setSelectedTier] = useState(packageItem.accommodations?.[0]?.type || 'Single Luxury Suite');

  const {
    title,
    subtitle,
    country,
    badge,
    dates,
    duration,
    location,
    heroImage,
    overview,
    whenWhere,
    included = [],
    notIncluded = [],
    pricing = {},
    accommodations = [],
    spotsRemaining
  } = packageItem;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#080c14] border border-cyan-500/20 rounded-none sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100 my-auto">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="fixed sm:absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/70 hover:bg-[#00e5cc] text-white hover:text-black border border-white/20 hover:border-transparent flex items-center justify-center transition-all shadow-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── 1. HERO BANNER ── */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/50 to-black/30" />

          {/* Hero Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[11px] font-bold text-[#00e5cc] uppercase tracking-wider backdrop-blur-md">
                {country}
              </span>
              {badge && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  {badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 font-medium">
                {duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-2">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl">
              {subtitle} • <span className="text-[#00e5cc] font-semibold">{dates}</span>
            </p>
          </div>
        </div>

        {/* ── 2. BODY CONTENT (BahaYogi Minimal Flow) ── */}
        <div className="p-6 sm:p-8 md:p-10 space-y-12">
          
          {/* Overview & Intro */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00e5cc]" /> Curated by Moy
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading tracking-tight mb-4">
              An Experience To Remember
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {overview}
            </p>
          </div>

          {/* ── 3. THREE-COLUMN BREAKDOWN (When & Where / Included / Not Included) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            
            {/* Col 1: When & Where */}
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#00e5cc]">
                  <Calendar className="w-5 h-5" />
                  <h3 className="text-base font-black uppercase text-white font-heading tracking-wide">
                    When & Where?
                  </h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Dates</span>
                    <p className="text-white font-semibold">{whenWhere?.dates}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Destination</span>
                    <p className="text-white font-semibold">{whenWhere?.location}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Accommodations</span>
                    <p className="text-white font-semibold">{whenWhere?.hotel}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>24/7 On-Ground Host Security</span>
              </div>
            </div>

            {/* Col 2: What's Included */}
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-base font-black uppercase text-white font-heading tracking-wide">
                  What's Included?
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                {included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: What's Not Included */}
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
              <div className="flex items-center gap-2 mb-3 text-rose-400">
                <XCircle className="w-5 h-5" />
                <h3 className="text-base font-black uppercase text-white font-heading tracking-wide">
                  What's Not Included?
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
                {notIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400/80 font-bold text-base leading-none">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── 4. HOST SPOTLIGHT CARD ── */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* Host Avatar / Emblem */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-cyan-400/40 p-0.5 shrink-0 shadow-[0_0_25px_rgba(0,229,204,0.3)] bg-black">
                <img 
                  src="/images/moymeetsworld_logo.jpg" 
                  alt="Moy Meets World" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Host Bio */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-xl font-black text-white font-heading">
                    {MOY_AGENT_PROFILE.fullName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-400/40">
                    🇹🇹 Based in Trinidad
                  </span>
                </div>
                <p className="text-xs text-[#00e5cc] font-semibold mb-3">
                  {MOY_AGENT_PROFILE.title}
                </p>
                
                {/* Premium Perk Callout in Host Card */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Carnival Planner Premium: 5% Off Package + Free Costume Delivery</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-4">
                  {MOY_AGENT_PROFILE.bio}
                </p>
                
                {/* Host Contact Quick Actions */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
                  <a
                    href={`https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I'm%20interested%20in%20the%20${encodeURIComponent(title)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Moy Directly</span>
                  </a>
                  <span className="text-slate-400 font-medium">
                    Email: <span className="text-slate-200">{MOY_AGENT_PROFILE.email}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ── 5. ACCOMMODATION TIERS & PAYMENT SELECTOR ── */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black uppercase text-white font-heading">
                Accommodations & Package Pricing
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose your preferred room occupancy. You can hold your spot today with a ${pricing?.deposit || 500} USD deposit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {accommodations.map((acc, idx) => {
                const isSelected = selectedTier === acc.type;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTier(acc.type)}
                    className={`glass-panel p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(0,229,204,0.25)] ring-1 ring-cyan-400'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {acc.occupancy}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-cyan-400 bg-[#00e5cc] text-black' : 'border-white/30'
                        }`}>
                          {isSelected && <span className="text-xs font-black">✓</span>}
                        </div>
                      </div>

                      <h4 className="text-xl font-black text-white font-heading mb-1">
                        {acc.type}
                      </h4>
                      <div className="text-2xl font-black text-cyan-300 font-heading mb-3">
                        {acc.price}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4">
                        {acc.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span>Hold Deposit:</span>
                        <span className="font-bold text-[#00e5cc]">${pricing?.deposit || 500} USD</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTier(acc.type);
                          onOpenBooking(packageItem, acc);
                        }}
                        className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-[#00e5cc] hover:bg-[#24f6df] text-black shadow-[0_0_20px_rgba(0,229,204,0.4)]'
                            : 'bg-white/10 hover:bg-white text-white hover:text-black'
                        }`}
                      >
                        <span>Book {acc.type}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Schedule Callout */}
            {pricing?.paymentSchedule && (
              <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center text-xs text-slate-300">
                <span className="font-bold text-white uppercase tracking-wider block mb-1">💳 Flexible Payment Terms</span>
                {pricing.paymentSchedule}
              </div>
            )}
          </div>

        </div>

        {/* ── 6. BOTTOM STICKY ACTION BAR ── */}
        <div className="sticky bottom-0 z-30 p-4 sm:p-6 bg-[#080c14]/95 backdrop-blur-xl border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Ready to experience {title}?
            </span>
            <span className="text-sm font-extrabold text-white font-heading">
              Secure spot with ${pricing?.deposit || 500} USD deposit
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I'd%20like%20to%20inquire%20about%20customizing%20the%20${encodeURIComponent(title)}%20package`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask Moy</span>
            </a>

            <button
              onClick={() => onOpenBooking(packageItem, accommodations.find(a => a.type === selectedTier) || accommodations[0])}
              className="flex-1 sm:flex-initial py-3 px-8 rounded-full bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,204,0.4)] transition-all hover:scale-105"
            >
              Reserve Spot Now ($500)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
