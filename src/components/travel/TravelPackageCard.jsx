import React from 'react';
import { Calendar, MapPin, Sparkles, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TravelPackageCard({ packageItem, onSelect, onBookDirect }) {
  const {
    id,
    title,
    subtitle,
    country,
    badge,
    dates,
    location,
    cardImage,
    accentColor,
    status,
    spotsRemaining,
    pricing
  } = packageItem;

  const isSoldOut = spotsRemaining === 0;

  return (
    <div 
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-slate-950 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,229,204,0.2)] min-h-[440px] md:min-h-[480px] cursor-pointer"
      onClick={() => onSelect(packageItem)}
    >
      {/* Background Image with Zoom on Hover */}
      <img
        src={cardImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Atmospheric Overlays for optimal readability (BahaYogi style) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 opacity-90 group-hover:opacity-85 transition-opacity" />
      <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor || '#00e5cc' }} />
          <span>{country}</span>
        </div>

        {badge && (
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/90 to-rose-500/90 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-md">
            {badge}
          </span>
        )}
      </div>

      {/* Card Content (Bottom Aligned, Minimal & Punchy) */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end">
        
        {/* Dates Pill */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{dates}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-1 group-hover:text-[#00e5cc] transition-colors">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 font-medium mb-3 line-clamp-1">
          {subtitle}
        </p>

        {/* Premium Discount Perk Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-200 text-[10px] font-extrabold uppercase tracking-wide mb-3">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Premium Perk: 5% Off ({pricing?.doubleOccupancy ? `$${Math.round(pricing.doubleOccupancy * 0.05)} Savings` : 'Exclusive VIP'})</span>
        </div>

        {/* Pricing & Spots Info */}
        <div className="flex items-center justify-between pt-3 border-t border-white/15 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              {packageItem.customQuoteOnly ? 'Pricing Structure' : 'Starting from'}
            </span>
            <div className="flex items-baseline gap-1">
              {packageItem.customQuoteOnly ? (
                <span className="text-sm font-black text-[#00e5cc] font-heading">
                  Custom Quote on Request
                </span>
              ) : (
                <>
                  <span className="text-xl font-extrabold text-white font-heading">
                    ${pricing?.doubleOccupancy?.toLocaleString() || '2,450'}
                  </span>
                  <span className="text-[11px] text-slate-400">USD / person</span>
                </>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              {packageItem.customQuoteOnly ? 'Inquiries' : 'Hold Deposit'}
            </span>
            <span className="text-xs font-black text-[#00e5cc] bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-400/30">
              {packageItem.customQuoteOnly ? 'Open' : `$${pricing?.deposit || 500} USD`}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(packageItem);
            }}
            className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Explore Package</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookDirect(packageItem);
            }}
            className="py-3 px-5 rounded-full bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,229,204,0.3)] hover:scale-105"
          >
            Book
          </button>
        </div>

      </div>
    </div>
  );
}
