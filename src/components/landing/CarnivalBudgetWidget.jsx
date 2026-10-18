import React, { useState } from 'react';
import { DollarSign, Plane, Sparkles, Users, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';

const CARNIVALS = [
  { id: 'trinidad', name: 'Trinidad Carnival', flag: '🇹🇹', defaultFlight: 850, defaultCurrency: 'USD', localCurrency: 'TTD', localRate: 6.8 },
  { id: 'barbados', name: 'Barbados Crop Over', flag: '🇧🇧', defaultFlight: 750, defaultCurrency: 'USD', localCurrency: 'BBD', localRate: 2.0 },
  { id: 'jamaica', name: 'Jamaica Carnival', flag: '🇯🇲', defaultFlight: 600, defaultCurrency: 'USD', localCurrency: 'JMD', localRate: 155.0 },
  { id: 'miami', name: 'Miami Carnival', flag: '🇺🇸', defaultFlight: 350, defaultCurrency: 'USD', localCurrency: 'USD', localRate: 1.0 },
  { id: 'nottinghill', name: 'Notting Hill Carnival', flag: '🇬🇧', defaultFlight: 950, defaultCurrency: 'USD', localCurrency: 'GBP', localRate: 0.78 },
];

const COSTUME_TIERS = [
  { id: 'backline', label: 'Backline', price: 750, desc: 'Classic road costume & band wristband' },
  { id: 'midline', label: 'Midline', price: 1350, desc: 'Collar & feather accents included' },
  { id: 'frontline', label: 'Frontline', price: 2400, desc: 'Giant backpack, wire bra & VIP amenities' },
];

const LODGING_TIERS = [
  { id: 'shared', label: 'Shared Squad Villa', pricePerPerson: 700, desc: '4-8 people sharing a villa' },
  { id: 'standard', label: 'Hotel / Airbnb', pricePerPerson: 1400, desc: 'Private 2-person room' },
  { id: 'luxury', label: 'Luxury Resort', pricePerPerson: 2800, desc: 'Hyatt / Hilton / Premium oceanfront' },
];

const CURRENCY_SYMBOLS = {
  USD: '$',
  TTD: 'TT$',
  BBD: 'Bds$',
  JMD: 'J$',
  GBP: '£',
  CAD: 'CA$'
};

export default function CarnivalBudgetWidget({ onGetStarted, onTryDemo }) {
  const [selectedCarnival, setSelectedCarnival] = useState(CARNIVALS[0]);
  const [costumeTier, setCostumeTier] = useState(COSTUME_TIERS[0]);
  const [feteCount, setFeteCount] = useState(5);
  const [lodgingTier, setLodgingTier] = useState(LODGING_TIERS[0]);
  const [flightOrigin, setFlightOrigin] = useState('us_east');
  const [includeJouvert, setIncludeJouvert] = useState(true);
  const [currency, setCurrency] = useState('USD');

  // Flight pricing matrix
  const flightPrices = {
    us_east: selectedCarnival.defaultFlight,
    us_west: selectedCarnival.defaultFlight + 250,
    uk: 1100,
    canada: selectedCarnival.defaultFlight + 180,
    caribbean: 350,
  };

  const currentFlight = flightPrices[flightOrigin] || selectedCarnival.defaultFlight;
  const feteTotal = feteCount * 135; // average all-inclusive fete price ~$135
  const jouvertCost = includeJouvert ? 220 : 0;
  const groundTransport = 250;
  const foodDrinks = 300;

  const totalUsd = currentFlight + costumeTier.price + feteTotal + lodgingTier.pricePerPerson + jouvertCost + groundTransport + foodDrinks;

  // Currency conversion
  const rates = {
    USD: 1.0,
    TTD: 6.8,
    BBD: 2.0,
    JMD: 155.0,
    GBP: 0.78,
    CAD: 1.36
  };

  const convertedTotal = Math.round(totalUsd * (rates[currency] || 1.0));
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  return (
    <div className="w-full bg-[#0a0f1d]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" /> Interactive Trip Estimator
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-tight">
            How Much Does Carnival Really Cost?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            Slide the options below to calculate your estimated trip budget in seconds. No login required.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-cyan-500/30 p-1 rounded-xl shrink-0 self-start md:self-auto">
          {['USD', 'TTD', 'GBP', 'CAD'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currency === curr 
                  ? 'bg-[#00e5cc] text-black shadow-[0_0_10px_rgba(0,229,204,0.4)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Carnival Destination Picker */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
              1. Choose Carnival Destination
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CARNIVALS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCarnival(c)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                    selectedCarnival.id === c.id
                      ? 'border-[#00e5cc] bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(0,229,204,0.2)]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-xs font-bold truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Costume Tier */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
              2. Costume Section Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COSTUME_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setCostumeTier(tier)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    costumeTier.id === tier.id
                      ? 'border-[#00e5cc] bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(0,229,204,0.2)]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">{tier.label}</div>
                  <div className="text-[11px] text-[#00e5cc] font-semibold mt-0.5">~${tier.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fete Count Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Number of Fetes (Parties)
              </label>
              <span className="text-xs font-extrabold text-[#00e5cc] bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                {feteCount} Fetes (~${feteTotal})
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={feteCount}
              onChange={(e) => setFeteCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00e5cc]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
              <span>2 (Light Pump)</span>
              <span>5 (Standard Crew)</span>
              <span>10 (Iron Fete Veteran)</span>
            </div>
          </div>

          {/* Lodging Tier & J'ouvert Check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                4. Accommodation Style
              </label>
              <select
                value={lodgingTier.id}
                onChange={(e) => setLodgingTier(LODGING_TIERS.find(t => t.id === e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00e5cc]"
              >
                {LODGING_TIERS.map(l => (
                  <option key={l.id} value={l.id}>{l.label} (~${l.pricePerPerson})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                5. J'ouvert Morning Band
              </label>
              <button
                type="button"
                onClick={() => setIncludeJouvert(!includeJouvert)}
                className={`w-full p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  includeJouvert 
                    ? 'border-[#00e5cc] bg-cyan-950/40 text-white' 
                    : 'border-slate-800 bg-slate-900/60 text-slate-400'
                }`}
              >
                <span>Paint & Powder J'ouvert</span>
                <span className="text-[#00e5cc]">{includeJouvert ? 'Included (+$220)' : 'Skipped ($0)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Live Summary Box Column */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-cyan-950/30 border border-cyan-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5cc]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-xs font-bold text-cyan-300 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Estimated Total Budget
          </div>
          
          <div className="text-4xl sm:text-5xl font-black text-white font-heading tracking-tight mb-1">
            {currencySymbol}{convertedTotal.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mb-6 font-medium">
            Estimated per-person cost for {selectedCarnival.name}.
          </p>

          {/* Line Item Breakdown */}
          <div className="space-y-2 text-xs border-t border-b border-cyan-500/20 py-4 mb-6">
            <div className="flex justify-between text-slate-300">
              <span>✈️ Flights & Transit:</span>
              <span className="font-bold text-white">${currentFlight + groundTransport}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>🎭 {costumeTier.label} Costume:</span>
              <span className="font-bold text-white">${costumeTier.price}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>🎟️ {feteCount} Fete Tickets:</span>
              <span className="font-bold text-white">${feteTotal}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>🏨 Lodging ({lodgingTier.label}):</span>
              <span className="font-bold text-white">${lodgingTier.pricePerPerson}</span>
            </div>
            {includeJouvert && (
              <div className="flex justify-between text-slate-300">
                <span>⚡ J'ouvert Package:</span>
                <span className="font-bold text-white">${jouvertCost}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>🥥 Food, Street Doubles & Drinks:</span>
              <span className="font-bold text-white">${foodDrinks}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={onGetStarted}
              className="w-full bg-gradient-to-r from-[#00e5cc] to-teal-500 hover:from-[#24f6df] hover:to-teal-400 text-black font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,204,0.4)] flex items-center justify-center gap-2"
            >
              <span>LOCK IN THIS PLAN & INVITE SQUAD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTryDemo}
              className="w-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-cyan-500/20 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Preview Live In Demo Mode
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00e5cc]" />
            <span>Free interactive budget tracker. Multi-currency enabled.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
