import React from 'react';
import { Sparkles, Users, Wallet, Map, CreditCard, ArrowRight, Zap, Globe, Shield, Music, Eye } from 'lucide-react';

export default function SplashPage({ onGetStarted, logo, onTryDemo }) {

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans">

      {/* SocaVoid canvas renders behind this via App.jsx */}

      {/* --- NAV HEADER --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center font-bold text-sm">
              CP
            </div>
            <span className="font-bold tracking-tight text-white/90">Caribbean Carnival Planner</span>
          </div>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-semibold transition-all"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">V2.0 Now Live</span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 leading-tight">
          The Operating System<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            For Caribbean Carnivals.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          The all-in-one workspace for your next carnival. Budget, schedule, squad sync, and ticketing — seamlessly integrated.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105"
          >
            Start Planning For Free
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onTryDemo}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border border-white/10 text-white rounded-full font-bold text-lg backdrop-blur-sm transition-all transform hover:scale-105 shadow-[0_0_30px_-8px_rgba(168,85,247,0.4)]"
          >
            <Eye className="inline-block mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Preview App — No Sign Up
          </button>
        </div>

        {/* Hero Visual / Dashboard Preview */}
        <div className="mt-20 relative w-full max-w-5xl aspect-[16/9] rounded-2xl border border-white/10 overflow-hidden shadow-2xl group">
          {/* Carnival feathers background */}
          <img
            src="/carnival-feathers.png"
            alt="Caribbean Carnival Feathers"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/20" />

          {/* Window Chrome */}
          <div className="absolute top-4 left-4 right-4 h-4 flex gap-2 z-20">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>

          {/* Mock Dashboard Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-20">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-black text-xl sm:text-2xl">Trinidad Carnival 2026</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Your squad is ready • 4 members synced</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <span className="text-3xl font-black text-white">47</span>
                <span className="text-xs text-gray-300 ml-1">days to go</span>
              </div>
            </div>

            {/* Data Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Budget</p>
                <p className="text-white font-bold text-lg">$2,850</p>
                <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-green-400 w-3/4 h-full rounded-full" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Events</p>
                <p className="text-white font-bold text-lg">6 Fetes</p>
                <p className="text-green-400 text-[10px] mt-1">2 booked ✓</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hidden sm:block">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Costume</p>
                <p className="text-white font-bold text-lg">Tribe</p>
                <p className="text-pink-400 text-[10px] mt-1">Deposit paid ✓</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 hidden sm:block">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Passport</p>
                <p className="text-white font-bold text-lg">🥇 Gold</p>
                <p className="text-yellow-400 text-[10px] mt-1">12 stamps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCROLLING TICKER --- */}
      <div className="w-full bg-white/5 border-y border-white/5 py-4 overflow-hidden relative z-10 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-sm font-medium text-gray-400 uppercase tracking-widest">
          <span>✨  350+ Live Squads</span>
          <span>📍  Trinidad 2026 Ready</span>
          <span>💰  Expense Tracking</span>
          <span>🎵  Soca Included</span>
          <span>🛂  Passport Sync Active</span>
          <span>🌍  Global Carnival Database</span>
          <span>✨  350+ Live Squads</span>
          <span>📍  Trinidad 2026 Ready</span>
          <span>💰  Expense Tracking</span>
          <span>🎵  Soca Included</span>
          <span>🛂  Passport Sync Active</span>
          <span>🌍  Global Carnival Database</span>
        </div>
      </div>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Everything you need.<br />Nothing you don't.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Card 1: Squad (Large) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-yellow-500/30 transition-all p-8 flex flex-col justify-between">
            {/* Feather accent */}
            <img src="/carnival-feathers.png" alt="" className="absolute top-0 right-0 w-72 h-72 object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700 transform rotate-45 translate-x-16 -translate-y-16" />
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Users className="w-48 h-48 text-yellow-500 transform rotate-12 translate-x-12 -translate-y-12" />
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/20 flex items-center justify-center mb-4 text-yellow-400 border border-yellow-500/20">
                <Users />
              </div>
              <h3 className="text-2xl font-bold mb-2">Squad Sync</h3>
              <p className="text-gray-400 max-w-sm">Real-time collaboration. See when your friends add events, update budgets, or get road ready.</p>
            </div>
            {/* Avatars visual */}
            <div className="flex -space-x-4 mt-8">
              {['🇹🇹', '🇯🇲', '🇧🇧', '🇱🇨'].map((flag, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 border-4 border-gray-900 flex items-center justify-center text-lg transform transition-transform group-hover:translate-x-2" style={{ transitionDelay: `${i * 50}ms` }}>
                  {flag}
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 border-4 border-gray-900 flex items-center justify-center text-xs font-bold text-white z-10 shadow-lg shadow-yellow-500/20">
                +3
              </div>
            </div>
          </div>

          {/* Card 2: Budget (Tall) */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-green-500/30 transition-all p-8 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/20 flex items-center justify-center mb-4 text-green-400 border border-green-500/20">
              <Wallet />
            </div>
            <h3 className="text-2xl font-bold mb-2">Smart Budget</h3>
            <p className="text-gray-400 mb-8">Track every costume payment, fete ticket, and flight.</p>

            <div className="mt-auto space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 group-hover:bg-gray-750 transition-colors">
                <div className="flex justify-between text-sm mb-2">
                  <span>Costume Deposit</span>
                  <span className="font-mono text-green-400">-$300</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 w-3/4 h-full rounded-full" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 group-hover:bg-gray-750 transition-colors">
                <div className="flex justify-between text-sm mb-2">
                  <span>Flight (MIA &rarr; POS)</span>
                  <span className="font-mono text-green-400">-$850</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 w-full h-full rounded-full" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 group-hover:bg-gray-750 transition-colors">
                <div className="flex justify-between text-sm mb-2">
                  <span>Soca Brainwash</span>
                  <span className="font-mono text-yellow-400">-$120</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 w-1/2 h-full rounded-full" />
                </div>
              </div>
              <div className="text-center pt-2">
                <span className="text-2xl font-black text-white">$2,850</span>
                <span className="text-xs text-gray-500 ml-2">/ $4,000 goal</span>
              </div>
            </div>
          </div>

          {/* Card 3: Map */}
          <div className="relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-purple-500/30 transition-all p-8">
            {/* Feather BG */}
            <img src="/carnival-feathers.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />

            <div className="relative z-20 h-full flex flex-col justify-end">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
                <Map />
              </div>
              <h3 className="text-2xl font-bold mb-2">Live Map</h3>
              <p className="text-gray-400">Discover fetes, events, and band routes near your AirBnb.</p>
            </div>
          </div>

          {/* Card 4: Passport */}
          <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-900/30 via-gray-900 to-teal-900/20 border border-white/10 hover:border-yellow-500/30 transition-all p-8 flex items-center justify-between">
            {/* Gold feather accent */}
            <img src="/carnival-feathers.png" alt="" className="absolute right-0 top-0 bottom-0 w-1/2 object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="max-w-xs relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-teal-500/20 flex items-center justify-center mb-4 text-yellow-400 border border-yellow-500/20">
                <CreditCard />
              </div>
              <h3 className="text-2xl font-bold mb-2">Soca Passport</h3>
              <p className="text-gray-400">Your digital carnival identity. Collect stamps, earn medals, and climb the leaderboard.</p>
            </div>
            {/* ID Card Visual */}
            <div className="hidden sm:block relative w-64 h-40 bg-gradient-to-br from-yellow-500/20 to-teal-500/10 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 z-10">
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg" />
              <div className="absolute top-4 right-4 text-[10px] font-mono text-yellow-400/50">9438-2910</div>
              <div className="absolute bottom-12 left-4">
                <p className="text-xs font-bold text-white/80">READY TO FETE</p>
                <p className="text-[10px] text-gray-500">Level: Gold Masquerader</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="text-[10px] font-bold text-yellow-400">🥇 12 STAMPS</span>
                <span className="text-[10px] text-gray-500">FEB 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="relative z-10 py-32 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-black mb-8">Ready to jump?</h2>
        <button
          onClick={onGetStarted}
          className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
        >
          Get Started Now
        </button>

        <div className="mt-16 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-center gap-8">
          <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Global Support</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure Data</span>
          <span className="flex items-center gap-2"><Music className="w-4 h-4" /> Vibes Included</span>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="w-full border-t border-white/10 p-8 text-center text-gray-600 text-sm">
        &copy; 2026 Caribbean Carnival Planner. Built for the culture.
      </div>
    </div>
  );
}
