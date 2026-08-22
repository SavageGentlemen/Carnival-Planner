import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Plane, 
  Compass, 
  Instagram, 
  Globe, 
  Lock, 
  ArrowLeft,
  Search,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  MOY_TRAVEL_PACKAGES, 
  MOY_AGENT_PROFILE, 
  MOY_FAQS 
} from '../components/travel/travelData';
import TravelPackageCard from '../components/travel/TravelPackageCard';
import PackageDetailModal from '../components/travel/PackageDetailModal';
import BookingPaymentModal from '../components/travel/BookingPaymentModal';
import MoyAgentDashboard from '../components/travel/MoyAgentDashboard';

export default function MoyMeetsWorldPage({ user }) {
  const navigate = useNavigate();
  const { packageId } = useParams();

  const [packages, setPackages] = useState(MOY_TRAVEL_PACKAGES);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingModalState, setBookingModalState] = useState(null); // { packageItem, accommodation }
  const [showAgentDashboard, setShowAgentDashboard] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync live packages from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'travelPackages'), (snap) => {
      if (!snap.empty) {
        const firestorePkgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPackages(firestorePkgs);
      } else {
        setPackages(MOY_TRAVEL_PACKAGES);
      }
    }, (err) => {
      console.warn('[MoyTravel] Firestore packages sync:', err.message);
    });
    return () => unsub();
  }, []);

  // Auto-open package if linked by ID in URL
  useEffect(() => {
    if (packageId) {
      const match = packages.find(p => p.id === packageId);
      if (match) setSelectedPackage(match);
    }
  }, [packageId, packages]);

  // Scroll listener for header transparency to solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (packageItem, accommodation) => {
    setBookingModalState({
      packageItem,
      accommodation: accommodation || packageItem.accommodations?.[0]
    });
  };

  const filteredFaqs = MOY_FAQS.filter(f => 
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 selection:bg-[#00e5cc] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* ── TOP HEADER / NAVBAR (BahaYogi Transparent to Scrolled) ── */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 px-6 py-4 ${
        isScrolled 
          ? 'bg-[#06090e]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl py-3.5' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-cyan-400/40 p-0.5 shadow-[0_0_20px_rgba(0,229,204,0.4)] bg-black shrink-0">
              <img 
                src="/images/moymeetsworld_logo.jpg" 
                alt="Moy Meets World Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-extrabold tracking-widest text-white text-base block font-heading uppercase">
                MOY MEETS WORLD
              </span>
              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block -mt-0.5">
                Curated Travel by Moy
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            <a href="#experiences" className="text-slate-300 hover:text-[#00e5cc] transition-colors">EXPERIENCES</a>
            <a href="#vibe" className="text-slate-300 hover:text-[#00e5cc] transition-colors">THE VIBE</a>
            <a href="#about-moy" className="text-slate-300 hover:text-[#00e5cc] transition-colors">ABOUT MOY</a>
            <a href="#accommodations" className="text-slate-300 hover:text-[#00e5cc] transition-colors">ACCOMMODATIONS</a>
            <a href="#faqs" className="text-slate-300 hover:text-[#00e5cc] transition-colors">FAQS</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Back to Carnival Planner button if on sub-route */}
            <button
              onClick={() => navigate('/')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Carnival Planner</span>
            </button>

            {/* Direct Booking Action */}
            <a
              href="#experiences"
              className="px-5 py-2 bg-[#00e5cc] hover:bg-[#24f6df] text-black rounded-full text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,204,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              BOOK RETREAT
            </a>
          </div>

        </div>
      </header>

      {/* ── HERO BANNER (Full-Bleed Visual First) ── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
        
        {/* Immersive Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/moymeetsworld_logo.jpg"
            alt="Moy Meets World Luxury Travel"
            className="w-full h-full object-cover object-center scale-105 opacity-35 filter brightness-75"
          />
          {/* Gradients to match BahaYogi rich dark mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/70 to-black/75" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Official Emblem */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-cyan-400/40 p-1 mb-6 shadow-[0_0_40px_rgba(0,229,204,0.4)] bg-black/80 backdrop-blur-md">
            <img 
              src="/images/moymeetsworld_logo.jpg" 
              alt="Moy Meets World" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Subtitle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/30 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,229,204,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00e5cc] animate-ping" />
            <span className="text-[11px] font-extrabold text-cyan-200 uppercase tracking-widest">
              TRINIDAD • BARBADOS • GREECE • JAMAICA • BRAZIL
            </span>
          </div>

          {/* Premium Member Deal Callout */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/50 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-black text-amber-200 uppercase tracking-wide">
              ⭐ Carnival Planner Premium Perk: 5% Off Any Package + Free VIP Costume Delivery
            </span>
          </div>

          {/* Minimalist Punchy Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.05] font-heading mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            TRAVEL IN FULL COLOR<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00e5cc]">
              MOY MEETS WORLD
            </span>
          </h1>

          {/* Subtitle / Promise */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium max-w-2xl mb-8 drop-shadow-md">
            Curated Caribbean carnival packages, luxury villas, and seamless bespoke journeys curated by Moy.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a
              href="#experiences"
              className="px-8 py-3.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,204,0.5)] transition-all flex items-center gap-2 hover:scale-105"
            >
              <span>Explore Curated Escapes</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I'd%20like%20to%20plan%20a%20curated%20carnival%20trip!`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 hover:border-cyan-400/40 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Moy</span>
            </a>
          </div>

          {/* Scroll Down Indicator */}
          <a 
            href="#vibe"
            aria-label="Scroll to vibe section"
            className="w-9 h-9 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-[#00e5cc] flex items-center justify-center transition-all animate-bounce"
          >
            <ChevronDown className="w-4 h-4" />
          </a>

        </div>
      </section>

      {/* ── THE VIBE & MANIFESTO (BahaYogi Minimal Text Flow) ── */}
      <section id="vibe" className="relative py-20 px-6 max-w-4xl mx-auto text-center z-10">
        <div className="w-12 h-1 bg-[#00e5cc] mx-auto mb-8 rounded-full shadow-[0_0_10px_#00e5cc]" />

        <h2 className="text-xs font-bold uppercase tracking-widest text-[#00e5cc] mb-3">
          OUR PHILOSOPHY
        </h2>

        <div className="space-y-4 text-lg sm:text-2xl md:text-3xl font-light text-slate-200 leading-relaxed font-heading">
          <p>We move in rhythm.</p>
          <p className="font-semibold text-white">We travel for the culture.</p>
          <p>We fete with intention.</p>
          <p>We honor the places and people that welcome us.</p>
          <p className="text-cyan-300 font-bold">We immerse, not consume.</p>
          <p>We show up as family, not tourists.</p>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 max-w-xl mx-auto text-xs sm:text-sm text-slate-400 font-medium">
          Moy Meets World is your gateway to frictionless cultural revelry. Based in Trinidad & Tobago, we eliminate all planning stress so you can celebrate life in pure luxury.
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS / PACKAGES (3-Tile BahaYogi Cards) ── */}
      <section id="experiences" className="relative py-16 px-6 max-w-7xl mx-auto z-10">
        
        <div className="text-center mb-12">
          <span className="text-xs font-black text-[#00e5cc] uppercase tracking-widest block mb-1">
            CURATED PACKAGES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            Upcoming Journeys & Retreats
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
            Choose your next destination. All packages include premier accommodations, curated fetes, band registration, and on-ground host guidance.
          </p>
        </div>

        {/* 3-Column / Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <TravelPackageCard
              key={pkg.id}
              packageItem={pkg}
              onSelect={(p) => setSelectedPackage(p)}
              onBookDirect={(p) => handleOpenBooking(p, p.accommodations?.[0])}
            />
          ))}
        </div>

      </section>

      {/* ── PARALLAX BANNER (more vibes. more culture. more life) ── */}
      <section className="relative py-24 px-6 text-center my-12 overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/carnival/costume_teal.jpg"
            alt="Carnival Vibe"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#06090e]/80 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#00e5cc] block mb-2">
            EXPERIENCE THE UNFORGETTABLE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight mb-4">
            more vibes. more culture. more life.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto mb-8">
            From sunrise J'ouvert to private yacht celebrations, we curate every moment with bespoke elegance.
          </p>
          <a
            href="#experiences"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-[#00e5cc] font-black text-xs uppercase tracking-wider transition-all shadow-2xl"
          >
            <span>Browse All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── ABOUT MOY / HOST SECTION ── */}
      <section id="about-moy" className="relative py-16 px-6 max-w-5xl mx-auto z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-500/30 bg-gradient-to-b from-slate-950 to-[#080c14]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Host Photo / Emblem */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-cyan-400/40 p-1 shrink-0 shadow-[0_0_40px_rgba(0,229,204,0.35)] bg-black">
              <img 
                src="/images/moymeetsworld_logo.jpg" 
                alt="Moy Meets World" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Host Story */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00e5cc]" /> {MOY_AGENT_PROFILE.verifiedBadge}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-heading mb-1">
                Meet Moy
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#00e5cc] mb-4">
                {MOY_AGENT_PROFILE.title} • {MOY_AGENT_PROFILE.location}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
                {MOY_AGENT_PROFILE.bio}
              </p>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={`https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I'm%20planning%20my%20next%20carnival%20trip%20and%20would%20love%20your%20help!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Moy Directly</span>
                </a>

                <button
                  onClick={() => setShowAgentDashboard(true)}
                  className="px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/20 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Travel Agent Management Console"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Agent Portal</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ACCOMMODATIONS & TRINIDAD PAYMENT GATEWAY HIGHLIGHT ── */}
      <section id="accommodations" className="relative py-16 px-6 max-w-7xl mx-auto z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-black text-[#00e5cc] uppercase tracking-widest block mb-1">
            SEAMLESS BOOKING & PAYMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight">
            Trinidad Gateway & Flexible Installments
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
            Managed directly out of Trinidad & Tobago with direct credit card processing, local TT bank transfer, and transparent milestone schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-cyan-500/20">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-4 text-[#00e5cc]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-heading mb-2">
              $500 Hold Spot Deposit
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Secure limited costume sections and luxury villa rooms today with a simple $500 USD deposit. Flexible payment plans spread across months.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-cyan-500/20">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-4 text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-heading mb-2">
              WiPay & TT Direct Banking
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Pay via WiPay Caribbean card checkout (TTD / USD), Republic Bank wire, or Stripe international checkout with zero hidden currency fees.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-cyan-500/20">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-4 text-cyan-300">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-heading mb-2">
              White-Glove Concierge
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Direct 1-on-1 contact with Moy from the day you book until the last fete of your journey. Hand-delivered costumes & 24/7 security.
            </p>
          </div>

        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION (BahaYogi Searchable QA) ── */}
      <section id="faqs" className="relative py-16 px-6 max-w-4xl mx-auto z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-[#00e5cc] uppercase tracking-widest block mb-1">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Have questions about costume pickups, roommates, or flights? Find answers below.
          </p>
        </div>

        {/* FAQ Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search FAQs (e.g. deposit, flights, solo, costume)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00e5cc] focus:outline-none shadow-lg"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20 transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:text-[#00e5cc] transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white font-heading">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium border-t border-white/5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Questions Callout */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>Still have questions? </span>
          <a
            href={`https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I%20have%20a%20question%20about%20your%20travel%20packages`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e5cc] font-bold hover:underline"
          >
            Chat with Moy on WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER (BahaYogi Minimal Footer) ── */}
      <footer className="relative bg-[#04060a] border-t border-cyan-500/20 pt-12 pb-8 px-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/40 p-0.5 bg-black shrink-0">
              <img 
                src="/images/moymeetsworld_logo.jpg" 
                alt="Moy Meets World" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <span className="font-extrabold tracking-widest text-white text-sm font-heading uppercase block">
                MOY MEETS WORLD
              </span>
              <span className="text-[10px] text-cyan-400 font-bold block">
                Curated Travel by Moy • Trinidad & Tobago
              </span>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#experiences" className="hover:text-cyan-300 transition-colors">Packages</a>
            <a href="#about-moy" className="hover:text-cyan-300 transition-colors">About Moy</a>
            <a href="#faqs" className="hover:text-cyan-300 transition-colors">FAQs</a>
            <button onClick={() => navigate('/')} className="hover:text-cyan-300 transition-colors">
              Carnival Planner
            </button>
            <button onClick={() => setShowAgentDashboard(true)} className="hover:text-[#00e5cc] font-bold transition-colors">
              Agent Portal
            </button>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-[#00e5cc] flex items-center justify-center transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Moy Meets World Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Powered by Caribbean Carnival Planner OS</p>
        </div>
      </footer>

      {/* ── MODALS ── */}
      {selectedPackage && (
        <PackageDetailModal
          packageItem={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onOpenBooking={(pkg, acc) => {
            setSelectedPackage(null);
            handleOpenBooking(pkg, acc);
          }}
        />
      )}

      {bookingModalState && (
        <BookingPaymentModal
          packageItem={bookingModalState.packageItem}
          selectedAccommodation={bookingModalState.accommodation}
          onClose={() => setBookingModalState(null)}
          user={user}
        />
      )}

      {showAgentDashboard && (
        <MoyAgentDashboard
          onClose={() => setShowAgentDashboard(false)}
          user={user}
        />
      )}

    </div>
  );
}
