import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  ExternalLink,
  ChevronRight,
  Loader2,
  Users,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bandOSService } from '../../../services/bandOSService';
import { currencyService } from '../../../services/currencyService';

const CARNIVAL_CITIES = [
  { id: 'ALL', label: 'All Destinations', flag: '🌴' },
  { id: 'Trinidad', label: 'Trinidad Carnival', flag: '🇹🇹' },
  { id: 'Jamaica', label: 'Jamaica Carnival', flag: '🇯🇲' },
  { id: 'Miami', label: 'Miami Carnival', flag: '🇺🇸' },
  { id: 'Barbados', label: 'Crop Over Barbados', flag: '🇧🇧' },
  { id: 'Notting Hill', label: 'Notting Hill London', flag: '🇬🇧' },
  { id: 'Toronto', label: 'Toronto Caribana', flag: '🇨🇦' }
];

export default function BandDirectory() {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    loadBands();
  }, [selectedCity]);

  const loadBands = async () => {
    setLoading(true);
    try {
      const data = await bandOSService.getPublicBandsDirectory({ city: selectedCity });
      setBands(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredBands = bands.filter(b => {
    if (searchTerm) {
      const match = b.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.carnival_city?.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-pink-500 selection:text-white font-body">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-pink-500/20">
              CP
            </div>
            <span className="font-display font-black text-lg tracking-tight text-white">
              Band<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">OS</span> Directory
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <select
              value={selectedCurrency}
              onChange={e => setSelectedCurrency(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              {currencyService.getCurrencies().map(c => (
                <option key={c.code} value={c.code} className="bg-gray-900 text-white">
                  {c.flag} {c.code} ({c.symbol})
                </option>
              ))}
            </select>

            <a
              href="/?tab=bandos-signup"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white transition-colors"
            >
              Join as Band
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold mb-4">
          <Flame className="w-3.5 h-3.5 text-pink-400" />
          Official BandOS Band Registry 2026 / 2027
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white mb-4">
          Discover Verified <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
            Carnival Bands Worldwide
          </span>
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto mb-8">
          Browse official costume sections, register directly with zero markups, and pay deposits securely via automated installment plans.
        </p>

        {/* Search Input Bar */}
        <div className="max-w-xl mx-auto relative mb-6">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by band name, destination, or theme..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500 shadow-2xl backdrop-blur-md transition-colors"
          />
        </div>

        {/* City Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CARNIVAL_CITIES.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                selectedCity === city.id
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500 text-pink-300 shadow-lg shadow-pink-500/10 scale-105'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{city.flag}</span>
              <span>{city.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Band Cards Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/50 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
            <p className="text-xs">Loading verified band directory...</p>
          </div>
        ) : filteredBands.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center border border-white/10 bg-white/5 max-w-md mx-auto">
            <Compass className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1 font-display">No Bands Found</h3>
            <p className="text-xs text-white/50 mb-4">
              Try adjusting your search keywords or switching destination filters.
            </p>
            <button
              onClick={() => { setSelectedCity('ALL'); setSearchTerm(''); }}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/15"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredBands.map((band, idx) => {
                const startingPriceUSD = band.starting_price || 500;
                const formattedPrice = currencyService.convertAndFormat(startingPriceUSD, selectedCurrency, true);

                return (
                  <motion.div
                    key={band.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-panel rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:shadow-2xl hover:shadow-pink-500/10"
                  >
                    <div>
                      {/* Hero Image Container */}
                      <div className="relative h-48 overflow-hidden bg-gray-900">
                        {band.hero_image_url ? (
                          <img
                            src={band.hero_image_url}
                            alt={band.business_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-pink-900/40 via-purple-900/40 to-blue-900/40" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-black/30" />
                        
                        {/* Destination Badge */}
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-pink-400" />
                          {band.carnival_city || 'Caribbean'}
                        </div>

                        {/* Verified Badge */}
                        <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Verified
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold font-display text-white group-hover:text-pink-300 transition-colors">
                          {band.business_name}
                        </h3>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2">
                          {band.tagline || 'Experience pure road vibez, premium costume packages, and all-inclusive amenities.'}
                        </p>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-white/40 block text-[10px] uppercase font-bold">Costumes From</span>
                            <span className="font-bold text-emerald-400 font-display text-base">{formattedPrice}</span>
                          </div>

                          <div className="text-right">
                            <span className="text-white/40 block text-[10px] uppercase font-bold">Registration</span>
                            <span className="text-pink-400 font-bold">Deposit Plan Open</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="p-5 pt-0">
                      <a
                        href={`/band/${band.slug || band.id}`}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all hover:scale-[1.02]"
                      >
                        <span>View Sections & Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Band Leader Onboarding Promotion Banner */}
        <div className="mt-16 glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-blue-950/40 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 block">
              Are you a Carnival Band Leader?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-3">
              Power Your Band with BandOS — $0 Monthly Subscription.
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mb-6 leading-relaxed">
              Launch your white-label storefront, collect costume deposits directly to your bank account via Stripe Connect, automate payment plans, and eliminate spreadsheet chaos forever.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/?tab=bandos-signup"
                className="px-6 py-3 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Apply as Band Leader</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
