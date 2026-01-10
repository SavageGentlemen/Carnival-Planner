import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Wallet, Map, CreditCard, ArrowRight, Zap, Globe, Shield, Music } from 'lucide-react';

export default function SplashPage({ onGetStarted, logo }) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans">

      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen transition-transform duration-100 ease-out"
          style={{
            top: -200,
            left: -200,
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen transition-transform duration-100 ease-out"
          style={{
            bottom: -100,
            right: -100,
            transform: `translate(${mousePos.x * -0.03}px, ${mousePos.y * -0.03}px)`
          }}
        />
      </div>

      {/* --- NAV HEADER --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center font-bold text-sm">
              CP
            </div>
            <span className="font-bold tracking-tight text-white/90">Carnival Planner</span>
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
            For Carnival.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          The all-in-one workspace for your next carnival. Budget, schedule, squad sync, and ticketing — seamlessly integrated.
        </p>

        {/* CTA */}
        <button
          onClick={onGetStarted}
          className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105"
        >
          Start Planning For Free
          <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Hero Visual / Dashboard Preview (CSS Art) */}
        <div className="mt-20 relative w-full max-w-5xl aspect-[16/9] bg-gray-900/50 rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl group">
          {/* Glossy Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

          {/* Fake UI Elements */}
          <div className="absolute top-4 left-4 right-4 h-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>

          {/* Content Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <div className="text-2xl font-bold text-white/50">Mission Control</div>
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
          <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-white/20 transition-all p-8 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Users className="w-48 h-48 text-indigo-500 transform rotate-12 translate-x-12 -translate-y-12" />
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                <Users />
              </div>
              <h3 className="text-2xl font-bold mb-2">Squad Sync</h3>
              <p className="text-gray-400 max-w-sm">Real-time collaboration. See when your friends add events, update budgets, or get road ready.</p>
            </div>
            {/* Avatars visual */}
            <div className="flex -space-x-4 mt-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-900 flex items-center justify-center text-xs font-bold text-gray-500 transform transition-transform group-hover:translate-x-2" style={{ transitionDelay: `${i * 50}ms` }}>
                  User
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-indigo-600 border-4 border-gray-900 flex items-center justify-center text-xs font-bold text-white z-10">
                +3
              </div>
            </div>
          </div>

          {/* Card 2: Budget (Tall) */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-white/20 transition-all p-8 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
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
                  <span>Flight (MIA -> POS)</span>
                  <span className="font-mono text-green-400">-$850</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 w-full h-full rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Map */}
          <div className="relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-white/20 transition-all p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            {/* Fake Map BG */}
            <div className="absolute inset-0 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>

            <div className="relative z-20 h-full flex flex-col justify-end">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <Map />
              </div>
              <h3 className="text-2xl font-bold mb-2">Live Map</h3>
              <p className="text-gray-400">Discover events near your AirBnb.</p>
            </div>
          </div>

          {/* Card 4: Passport */}
          <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 to-gray-900 border border-white/10 hover:border-teal-500/30 transition-all p-8 flex items-center justify-between">
            <div className="max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4 text-teal-400">
                <CreditCard />
              </div>
              <h3 className="text-2xl font-bold mb-2">Soca Passport</h3>
              <p className="text-gray-400">Your digital carnival identity. Syncs seamlessly with the Soca Passport app.</p>
            </div>
            {/* ID Card Visual */}
            <div className="hidden sm:block relative w-64 h-40 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-teal-500" />
              <div className="absolute top-4 right-4 text-[10px] font-mono opacity-50">9438-2910</div>
              <div className="absolute bottom-4 left-4 text-xs font-bold">FEBUARY 2026</div>
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
        &copy; 2026 Carnival Planner. Built for the culture.
      </div>
    </div>
  );
}
