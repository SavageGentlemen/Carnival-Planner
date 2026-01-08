import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Wallet, Shirt, CheckSquare, Zap, Image, Wifi, Crown, ChevronDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const carnivals = [
  { name: 'Sugar Mas (St. Kitts)', color: 'from-green-500 to-emerald-500', month: 'January' },
  { name: 'St. Croix', color: 'from-yellow-500 to-amber-500', month: 'January' },
  { name: 'Trinidad', color: 'from-red-500 to-pink-500', month: 'February' },
  { name: 'Dominica', color: 'from-lime-500 to-green-500', month: 'February' },
  { name: 'Jamaica', color: 'from-green-500 to-yellow-500', month: 'April' },
  { name: 'Tampa Bay', color: 'from-blue-500 to-cyan-500', month: 'April' },
  { name: 'St. Maarten', color: 'from-orange-500 to-yellow-500', month: 'April' },
  { name: 'Cayman Batabano', color: 'from-teal-500 to-cyan-500', month: 'May' },
  { name: 'St. Thomas', color: 'from-indigo-500 to-blue-500', month: 'May' },
  { name: 'Guyana', color: 'from-green-600 to-yellow-500', month: 'May' },
  { name: 'Bahamas', color: 'from-sky-500 to-blue-500', month: 'June' },
  { name: 'Bermuda', color: 'from-pink-400 to-rose-500', month: 'June' },
  { name: 'Caymas', color: 'from-cyan-500 to-teal-500', month: 'June' },
  { name: 'St. Vincent (Vincy Mas)', color: 'from-blue-500 to-green-500', month: 'July' },
  { name: 'St. Lucia', color: 'from-blue-400 to-cyan-400', month: 'July' },
  { name: 'Toronto (Caribana)', color: 'from-red-500 to-amber-500', month: 'August' },
  { name: 'Barbados Crop Over', color: 'from-amber-500 to-yellow-500', month: 'August' },
  { name: 'Antigua', color: 'from-orange-500 to-red-500', month: 'August' },
  { name: 'Nevis Culturama', color: 'from-purple-500 to-pink-500', month: 'August' },
  { name: 'Grenada Spicemas', color: 'from-green-500 to-red-500', month: 'August' },
  { name: 'Notting Hill', color: 'from-purple-500 to-indigo-500', month: 'August' },
  { name: 'New York', color: 'from-blue-600 to-purple-500', month: 'September' },
  { name: 'Japan Caribbean', color: 'from-rose-500 to-pink-500', month: 'September' },
  { name: 'Miami', color: 'from-pink-500 to-purple-500', month: 'October' },
  { name: 'Tobago', color: 'from-red-600 to-orange-500', month: 'November' },
];

const freeFeatures = [
  { icon: Wallet, title: 'Budget Planner', desc: 'Track every dollar of your carnival spend' },
  { icon: Shirt, title: 'Costume Tracker', desc: 'Band, section & payment tracking' },
  { icon: Calendar, title: 'Event Scheduler', desc: 'Curated fetes + your custom events' },
  { icon: Users, title: 'Squad Coordination', desc: 'Share plans with your crew via code' },
  { icon: CheckSquare, title: 'Packing List', desc: 'Never forget your essentials' },
  { icon: Zap, title: 'Road Ready Mode', desc: 'Quick-glance view for carnival day' },
];

const premiumFeatures = [
  { icon: MapPin, title: 'Interactive Fete Map', desc: 'Pin accommodations, fetes, costume pickups & meetup spots with distance calculations' },
  { icon: Image, title: 'Media Vault', desc: 'Upload tickets, photos & documents for each carnival' },
  { icon: Wifi, title: 'Offline Mode', desc: 'Access your plans without internet' },
  { icon: Crown, title: 'Ad-Free Experience', desc: 'No promotional interruptions' },
];

export default function SplashPage({ onGetStarted, logo, onLegalPage }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeCarousel, setActiveCarousel] = useState(0);
  const carouselRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveCarousel((prev) => (prev + 1) % carnivals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 208;
      const scrollPosition = activeCarousel * cardWidth - (carouselRef.current.offsetWidth / 2) + (cardWidth / 2);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeCarousel]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveCarousel((prev) => (prev - 1 + carnivals.length) % carnivals.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveCarousel((prev) => (prev + 1) % carnivals.length);
  };

  const handleDotClick = (idx) => {
    setIsAutoPlaying(false);
    setActiveCarousel(idx);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"
          style={{
            top: -200 + scrollY * 0.1,
            right: -200,
            transform: `rotate(${scrollY * 0.02}deg)`
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
          style={{
            bottom: -100 + scrollY * 0.05,
            left: -100
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
          style={{
            top: '40%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo with glow */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-3xl blur-2xl opacity-60 animate-pulse scale-110" />
            <img
              src={logo}
              alt="Carnival Planner"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl shadow-2xl border-2 border-white/20"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent">
              Plan Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Perfect Carnival (AGENT UPDATE)
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate planning companion for <span className="text-white font-semibold">25+ Caribbean carnivals</span>.
            Budget, schedule, squad coordination — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="group relative px-10 py-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl font-bold text-xl shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free
                <Sparkles className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Trust badge */}
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Crown className="w-4 h-4 text-yellow-500" />
            Free forever for core features. Premium available for power users.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </div>
      </section>

      {/* Carnival Preview Carousel */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              25+ Caribbean Carnivals
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            From Trinidad to Miami, we've got your carnival season covered
          </p>

          {/* Carousel */}
          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20 hover:scale-110"
              aria-label="Previous carnival"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20 hover:scale-110"
              aria-label="Next carnival"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-8 md:px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onTouchStart={() => setIsAutoPlaying(false)}
            >
              {carnivals.map((carnival, idx) => (
                <div
                  key={carnival.name}
                  onClick={() => handleDotClick(idx)}
                  className={`flex-shrink-0 w-44 md:w-48 h-28 md:h-32 rounded-2xl bg-gradient-to-br ${carnival.color} p-4 flex flex-col justify-between snap-center transition-all duration-500 cursor-pointer ${idx === activeCarousel ? 'scale-105 shadow-2xl ring-2 ring-white/50' : 'opacity-60 hover:opacity-80'
                    }`}
                >
                  <span className="text-white font-bold text-base md:text-lg drop-shadow-md">{carnival.name}</span>
                  <span className="text-white/90 text-sm font-medium">{carnival.month}</span>
                </div>
              ))}
            </div>

            {/* Carousel indicators - grouped by 5 for easier navigation */}
            <div className="flex justify-center items-center gap-1 mt-6 flex-wrap">
              {carnivals.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeCarousel ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to ${carnivals[idx].name}`}
                />
              ))}
            </div>

            {/* Current carnival display */}
            <div className="text-center mt-4">
              <span className="text-white/70 text-sm">
                {activeCarousel + 1} of {carnivals.length} carnivals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Features Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
              100% FREE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to Plan
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              All core planning features are completely free. No credit card, no trial limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeFeatures.map((feature, idx) => (
              <div
                key={feature.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full text-sm font-semibold mb-4">
              <Crown className="w-4 h-4" />
              PREMIUM
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Level Up Your Experience
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Unlock powerful features for the ultimate carnival planning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-pink-500/10 border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/40 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing callout */}
          <div className="text-center bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-pink-500/10 border border-yellow-500/20 rounded-3xl p-8">
            <p className="text-2xl font-bold mb-2">
              <span className="text-yellow-400">$4.99/month</span>
              <span className="text-gray-500 mx-3">or</span>
              <span className="text-yellow-400">$39.99/year</span>
              <span className="text-green-400 text-sm ml-2">(Save 33%)</span>
            </p>
            <p className="text-gray-400">Cancel anytime. No commitments.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Plan Your
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Best Carnival Yet?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of carnival enthusiasts planning their perfect experience
          </p>

          <button
            onClick={onGetStarted}
            className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl font-bold text-2xl shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Start Planning Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <p className="mt-8 text-gray-500">
            Free to use. Sign in with Google to get started.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-bold">Carnival Planner</span>
          </div>
          <p className="text-gray-500 text-sm text-center mb-6">
            Plan your Mas. Track your Fetes. Coordinate your Squad.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <button
              onClick={() => onLegalPage?.('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => onLegalPage?.('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => onLegalPage?.('cookies')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => onLegalPage?.('refund')}
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => onLegalPage?.('contact')}
              className="hover:text-white transition-colors"
            >
              Contact Us
            </button>
          </div>

          <p className="text-gray-600 text-xs text-center mt-6">
            © {new Date().getFullYear()} Carnival Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
