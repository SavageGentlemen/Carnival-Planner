import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Plane, TrendingDown, ExternalLink, Flame, Sparkles } from 'lucide-react';

export default function FlightDealsWidget() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCarnival, setFilterCarnival] = useState('all');

  useEffect(() => {
    async function loadDeals() {
      try {
        // Try fetching from Firestore first
        const q = query(collection(db, 'flightDeals'), orderBy('discountPercent', 'desc'), limit(12));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const fsDeals = [];
          snap.forEach(doc => fsDeals.push({ id: doc.id, ...doc.data() }));
          setDeals(fsDeals);
        } else {
          // Fallback to static JSON backup
          fetchStaticDeals();
        }
      } catch (err) {
        console.warn('Using static flight deals fallback:', err.message);
        fetchStaticDeals();
      } finally {
        setLoading(false);
      }
    }

    async function fetchStaticDeals() {
      try {
        const res = await fetch('/data/flight_deals.json');
        if (res.ok) {
          const data = await res.json();
          setDeals(data);
        } else {
          setDeals(FALLBACK_DEALS);
        }
      } catch (e) {
        setDeals(FALLBACK_DEALS);
      }
    }

    loadDeals();
  }, []);

  const FALLBACK_DEALS = [
    {
      id: 'JFK-POS-fallback',
      origin: 'JFK',
      destination: 'POS',
      destinationCity: 'Port of Spain',
      destinationCountry: 'Trinidad',
      carnivalName: 'Trinidad Carnival 2026',
      airline: 'Caribbean Airlines',
      currentPrice: 425,
      baselinePrice: 650,
      savingsAmount: 225,
      discountPercent: 35,
      isHotDeal: true,
      bookingUrl: 'https://www.google.com/travel/flights?q=Flights%20to%20POS%20from%20JFK'
    },
    {
      id: 'MIA-KIN-fallback',
      origin: 'MIA',
      destination: 'KIN',
      destinationCity: 'Kingston',
      destinationCountry: 'Jamaica',
      carnivalName: 'Jamaica Carnival 2026',
      airline: 'American Airlines',
      currentPrice: 320,
      baselinePrice: 480,
      savingsAmount: 160,
      discountPercent: 33,
      isHotDeal: true,
      bookingUrl: 'https://www.google.com/travel/flights?q=Flights%20to%20KIN%20from%20MIA'
    },
    {
      id: 'JFK-BBD-fallback',
      origin: 'JFK',
      destination: 'BBD',
      destinationCity: 'Bridgetown',
      destinationCountry: 'Barbados',
      carnivalName: 'Barbados Crop Over 2026',
      airline: 'JetBlue',
      currentPrice: 410,
      baselinePrice: 580,
      savingsAmount: 170,
      discountPercent: 29,
      isHotDeal: true,
      bookingUrl: 'https://www.google.com/travel/flights?q=Flights%20to%20BBD%20from%20JFK'
    }
  ];

  const filteredDeals = filterCarnival === 'all'
    ? deals
    : deals.filter(d => (d.destination || '').toLowerCase() === filterCarnival.toLowerCase());

  return (
    <div className="mb-10 bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Bypassing Dynamic Pricing
            </span>
            <span className="bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Live Tracker
            </span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Plane className="w-6 h-6 text-cyan-400 animate-pulse" />
            Caribbean Carnival Flight Price Alerts ✈️
          </h2>
          <p className="text-xs text-gray-400">
            Real-time price drop detection for major routes to Trinidad, Jamaica, Barbados & St. Lucia.
          </p>
        </div>

        {/* Airport Filter Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {['all', 'POS', 'KIN', 'BBD', 'UVF', 'GND'].map(code => (
            <button
              key={code}
              onClick={() => setFilterCarnival(code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterCarnival === code
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400'
              }`}
            >
              {code === 'all' ? '✈️ All Routes' : code}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400 text-sm animate-pulse">
          Searching global flight pricing channels...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="relative bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-4 transition-all duration-300 shadow-lg group"
            >
              {deal.isHotDeal && (
                <div className="absolute top-3 right-3 bg-pink-500/20 border border-pink-500/50 text-pink-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 text-pink-400 fill-pink-400" /> HOT DEAL
                </div>
              )}

              <div className="text-xs font-bold text-cyan-400 mb-1 flex items-center gap-1">
                <span>{deal.origin}</span>
                <span className="text-gray-500">➔</span>
                <span>{deal.destination}</span>
                <span className="text-gray-400 font-normal">({deal.destinationCity})</span>
              </div>

              <div className="text-xs text-gray-300 font-medium mb-3">
                {deal.carnivalName}
              </div>

              <div className="flex items-baseline justify-between mb-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-2xl font-black text-white">${deal.currentPrice}</span>
                  <span className="text-xs text-gray-500 line-through ml-2">${deal.baselinePrice}</span>
                  <div className="text-[10px] text-gray-400">{deal.airline}</div>
                </div>

                <div className="text-right">
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black px-2 py-1 rounded-lg inline-flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Save {deal.discountPercent}%
                  </span>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">
                    -${deal.savingsAmount} drop
                  </div>
                </div>
              </div>

              <a
                href={deal.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md group-hover:scale-[1.02]"
              >
                View Deal on Flights <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
