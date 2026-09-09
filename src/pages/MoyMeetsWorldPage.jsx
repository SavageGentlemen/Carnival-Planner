import React, { useState, useEffect, useMemo } from 'react';
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
  Heart,
  Menu,
  X
} from 'lucide-react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  MOY_TRAVEL_PACKAGES, 
  MOY_AGENT_PROFILE, 
  MOY_FAQS, 
  DEFAULT_SITE_CONTENT 
} from '../components/travel/travelData';
import { resolveTravelImageUrl, getTravelImageFallback, sanitizePackageData } from '../utils/travelMedia';
import TravelPackageCard from '../components/travel/TravelPackageCard';
import PackageDetailModal from '../components/travel/PackageDetailModal';
import BookingPaymentModal from '../components/travel/BookingPaymentModal';
import MoyAgentDashboard from '../components/travel/MoyAgentDashboard';
import { PrivacyPolicy, TermsOfService, RefundPolicy } from '../components/LegalPages';

class PortalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[PortalErrorBoundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-8 max-w-md text-center space-y-4 shadow-2xl">
            <div className="text-3xl">⚠️</div>
            <h3 className="text-lg font-black text-white uppercase font-heading">Portal Display Notice</h3>
            <p className="text-xs text-slate-300">A display issue occurred while loading this section. Your live database data is unaffected.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  if (this.props.onClose) this.props.onClose();
                }}
                className="px-5 py-2.5 bg-[#00e5cc] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#24f6df] transition-all shadow-md"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MoyMeetsWorldPage({ user }) {
  const navigate = useNavigate();
  const { packageId } = useParams();

  const [siteContent, setSiteContent] = useState(() => {
    try {
      const cached = localStorage.getItem('mmw_site_content');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SITE_CONTENT, ...parsed };
      }
    } catch (e) {}
    return DEFAULT_SITE_CONTENT;
  });

  const [packages, setPackages] = useState(() => {
    try {
      const cached = localStorage.getItem('mmw_packages_custom');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(sanitizePackageData);
      }
    } catch (e) {}
    return MOY_TRAVEL_PACKAGES.map(sanitizePackageData);
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingModalState, setBookingModalState] = useState(null); // { packageItem, accommodation }
  const [showAgentDashboard, setShowAgentDashboard] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [gatewaySettings, setGatewaySettings] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // Sync live site content (Bio, FAQs, Philosophy, Hero) from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'travelSiteContent', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setSiteContent(prev => ({ ...prev, ...data }));
        try {
          localStorage.setItem('mmw_site_content', JSON.stringify(data));
        } catch (e) {}
      }
    }, (err) => {
      console.warn('[MoyTravel] Site content sync notice:', err.message);
    });
    return () => unsub();
  }, []);

  // Sync live packages from Firestore with resilient local storage preservation
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'travelPackages'), (snap) => {
      if (!snap.empty) {
        const firestorePkgs = snap.docs.map(d => sanitizePackageData({ id: d.id, ...d.data() }));
        setPackages(firestorePkgs);
        try {
          localStorage.setItem('mmw_packages_custom', JSON.stringify(firestorePkgs));
        } catch (e) {}
      } else {
        // Only fallback if localStorage has no custom packages
        try {
          const cached = localStorage.getItem('mmw_packages_custom');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setPackages(parsed.map(sanitizePackageData));
              return;
            }
          }
        } catch (e) {}
        setPackages(MOY_TRAVEL_PACKAGES.map(sanitizePackageData));
      }
    }, (err) => {
      console.warn('[MoyTravel] Firestore packages sync notice:', err.message);
      try {
        const cached = localStorage.getItem('mmw_packages_custom');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPackages(parsed.map(sanitizePackageData));
          }
        }
      } catch (e) {}
    });
    return () => unsub();
  }, []);

  // Sync live gateway & contact settings from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'travelSettings', 'gateway'), (snap) => {
      if (snap.exists()) {
        setGatewaySettings(snap.data());
      }
    }, (err) => console.warn('[MoyTravel] Settings sync notice:', err.message));
    return () => unsub();
  }, []);

  const activeWhatsapp = gatewaySettings?.whatsappNum || siteContent?.aboutMoy?.whatsappNumber || MOY_AGENT_PROFILE.whatsappNumber;

  const destinationHighlights = useMemo(() => {
    if (!packages || packages.length === 0) return 'ST. LUCIA • THAILAND';
    const names = packages
      .map(p => (p.country || p.location || p.title || '').trim().toUpperCase())
      .filter(Boolean);
    const unique = Array.from(new Set(names));
    return unique.length > 0 ? unique.join(' • ') : 'ST. LUCIA • THAILAND';
  }, [packages]);

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

  const currentFaqs = (siteContent?.faqs && siteContent.faqs.length > 0) ? siteContent.faqs : MOY_FAQS;
  const filteredFaqs = currentFaqs.filter(f => 
    (f.q || '').toLowerCase().includes(faqSearch.toLowerCase()) || 
    (f.a || '').toLowerCase().includes(faqSearch.toLowerCase())
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

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00e5cc]" /> : <Menu className="w-5 h-5 text-[#00e5cc]" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 text-xs font-bold uppercase tracking-wider animate-fadeIn max-w-7xl mx-auto">
            <a 
              href="#experiences" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00e5cc]/20 text-slate-200 hover:text-[#00e5cc] transition-colors flex items-center justify-between"
            >
              <span>EXPERIENCES & DESTINATIONS</span>
              <span className="text-[10px] text-cyan-400">→</span>
            </a>
            <a 
              href="#vibe" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00e5cc]/20 text-slate-200 hover:text-[#00e5cc] transition-colors flex items-center justify-between"
            >
              <span>THE VIBE & EXPERIENCE</span>
              <span className="text-[10px] text-cyan-400">→</span>
            </a>
            <a 
              href="#about-moy" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00e5cc]/20 text-slate-200 hover:text-[#00e5cc] transition-colors flex items-center justify-between"
            >
              <span>ABOUT MOY</span>
              <span className="text-[10px] text-cyan-400">→</span>
            </a>
            <a 
              href="#accommodations" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00e5cc]/20 text-slate-200 hover:text-[#00e5cc] transition-colors flex items-center justify-between"
            >
              <span>ACCOMMODATIONS & AMENITIES</span>
              <span className="text-[10px] text-cyan-400">→</span>
            </a>
            <a 
              href="#faqs" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00e5cc]/20 text-slate-200 hover:text-[#00e5cc] transition-colors flex items-center justify-between"
            >
              <span>FREQUENTLY ASKED QUESTIONS</span>
              <span className="text-[10px] text-cyan-400">→</span>
            </a>
            
            <div className="pt-2 flex items-center justify-between border-t border-white/10 mt-1">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); navigate('/'); }}
                className="px-3 py-2 text-slate-400 hover:text-white text-xs font-bold transition-colors"
              >
                ← Carnival Planner
              </button>
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); setShowAgentDashboard(true); }}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-950 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold transition-colors"
              >
                Agent Portal
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ── HERO BANNER (Full-Bleed Visual First) ── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
        
        {/* Immersive Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={resolveTravelImageUrl(
              siteContent.hero?.backgroundImage || siteContent.aboutMoy?.lifestylePhoto || MOY_AGENT_PROFILE.lifestylePhoto,
              { type: 'lifestyle', isHero: true }
            )}
            alt="Moy Meets World Luxury Travel"
            className="w-full h-full object-cover object-center scale-105 opacity-40 filter brightness-90"
            onError={(e) => {
              const fallback = getTravelImageFallback({ type: 'lifestyle', isHero: true });
              if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
            }}
          />
          {/* Gradients to match rich dark luxury mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/70 to-black/75" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Official Emblem */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-cyan-400/40 p-1 mb-6 shadow-[0_0_40px_rgba(0,229,204,0.4)] bg-black/80 backdrop-blur-md">
            <img 
              src={siteContent.hero?.emblemImage || "/images/moymeetsworld_logo.jpg"} 
              alt="Moy Meets World" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Subtitle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/30 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,229,204,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00e5cc] animate-ping" />
            <span className="text-[11px] font-extrabold text-cyan-200 uppercase tracking-widest">
              {siteContent.hero?.destinationsPill || destinationHighlights}
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
            {siteContent.hero?.titleLine1 || 'TRAVEL IN FULL COLOR'}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00e5cc]">
              {siteContent.hero?.titleLine2 || 'MOY MEETS WORLD'}
            </span>
          </h1>

          {/* Subtitle / Promise */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium max-w-2xl mb-8 drop-shadow-md">
            {siteContent.hero?.tagline || 'Curated travel packages, and seamless bespoke journeys curated by Moy!'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a
              href="#experiences"
              className="px-8 py-3.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,204,0.5)] transition-all flex items-center gap-2 hover:scale-105"
            >
              <span>{siteContent.hero?.ctaButtonText || 'Explore Curated Escapes'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${activeWhatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I'd%20like%20to%20plan%20a%20curated%20carnival%20trip!`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 hover:border-cyan-400/40 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{siteContent.hero?.whatsappButtonText || 'WhatsApp Moy'}</span>
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
          {siteContent.manifesto?.title || 'OUR PHILOSOPHY'}
        </h2>

        <div className="space-y-4 text-lg sm:text-2xl md:text-3xl font-light text-slate-200 leading-relaxed font-heading">
          {(siteContent.manifesto?.lines || [
            'We move in rhythm.',
            'We travel for the culture.',
            'We honor the places and people that welcome us.',
            'We immerse, not consume.',
            'We show up as family, not  just tourists.'
          ]).filter(l => l && l.trim()).map((line, idx) => (
            <p 
              key={idx} 
              className={
                idx === 1 
                  ? "font-semibold text-white" 
                  : idx === 3 
                    ? "text-cyan-300 font-bold" 
                    : ""
              }
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 max-w-xl mx-auto text-xs sm:text-sm text-slate-400 font-medium">
          {siteContent.manifesto?.summary || 'Moy Meets World is your gateway to frictionless travel. Based in Trinidad & Tobago, we eliminate all planning stress so you can celebrate life in pure luxury.'}
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS / PACKAGES (3-Tile BahaYogi Cards) ── */}
      <section id="experiences" className="relative py-16 px-6 max-w-7xl mx-auto z-10">
        
        <div className="text-center mb-12">
          <span className="text-xs font-black text-[#00e5cc] uppercase tracking-widest block mb-1">
            {siteContent.packagesHeader?.kicker || 'CURATED PACKAGES'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            {siteContent.packagesHeader?.title || 'Upcoming Journeys & Retreats'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
            {siteContent.packagesHeader?.subtitle || 'Choose your next destination. All packages include premier accommodations, curated fetes, band registration, and on-ground host guidance.'}
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
            src={resolveTravelImageUrl(
              siteContent.experienceBanner?.backgroundImage,
              { type: 'lifestyle', isHero: true }
            )}
            alt="Carnival Vibe"
            className="w-full h-full object-cover object-center opacity-30"
            onError={(e) => {
              const fallback = getTravelImageFallback({ type: 'lifestyle', isHero: true });
              if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#06090e]/80 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#00e5cc] block mb-2">
            {siteContent.experienceBanner?.badge || 'EXPERIENCE THE UNFORGETTABLE'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-tight mb-4">
            {siteContent.experienceBanner?.title || 'MORE ADVENTURE.MORE CULTURE. MORE LIFE.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto mb-8">
            {siteContent.experienceBanner?.description || 'We curate every moment with intention and elegance.'}
          </p>
          <a
            href={siteContent.experienceBanner?.buttonLink || "#experiences"}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-[#00e5cc] font-black text-xs uppercase tracking-wider transition-all shadow-2xl"
          >
            <span>{siteContent.experienceBanner?.buttonText || 'Browse All Packages'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── ABOUT MOY / HOST SECTION ── */}
      <section id="about-moy" className="relative py-16 px-6 max-w-5xl mx-auto z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-500/30 bg-gradient-to-b from-slate-950 to-[#080c14]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Host Photo */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-cyan-400/40 p-1 shrink-0 shadow-[0_0_40px_rgba(0,229,204,0.35)] bg-black">
              <img 
                src={resolveTravelImageUrl(
                  siteContent.aboutMoy?.photo || siteContent.aboutMoy?.hostPhoto || MOY_AGENT_PROFILE.avatar,
                  { type: 'avatar' }
                )} 
                alt={siteContent.aboutMoy?.fullName || MOY_AGENT_PROFILE.fullName} 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  const fallback = getTravelImageFallback({ type: 'avatar' });
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                }}
              />
            </div>

            {/* Host Story */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00e5cc]" /> {siteContent.aboutMoy?.verifiedBadge || MOY_AGENT_PROFILE.verifiedBadge}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-heading mb-1">
                Meet Moy
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#00e5cc] mb-4">
                {siteContent.aboutMoy?.title || MOY_AGENT_PROFILE.title} • {siteContent.aboutMoy?.location || MOY_AGENT_PROFILE.location}
              </p>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6 whitespace-pre-line">
                {siteContent.aboutMoy?.bio || MOY_AGENT_PROFILE.bio}
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={`https://wa.me/${activeWhatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I'm%20planning%20my%20next%20carnival%20trip%20and%20would%20love%20your%20help!`}
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
            {siteContent.paymentSection?.heading || 'Trinidad Gateway & Flexible Installments'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
            {siteContent.paymentSection?.subheading || 'Managed directly out of Trinidad & Tobago with direct credit card processing, local TT bank transfer, and transparent milestone schedules.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-cyan-500/20">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-4 text-[#00e5cc]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-heading mb-2">
              {siteContent.paymentSection?.card1Title || '$500 Hold Spot Deposit'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {siteContent.paymentSection?.card1Desc || 'Secure limited costume sections and luxury villa rooms today with a simple $500 USD deposit. Flexible payment plans spread across months.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-cyan-500/20">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-4 text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-heading mb-2">
              {siteContent.paymentSection?.card2Title || 'WiPay & TT Direct Banking'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {siteContent.paymentSection?.card2Desc || 'Pay via WiPay Caribbean card checkout (TTD / USD), Republic Bank wire, or Stripe international checkout with zero hidden currency fees.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 text-center flex flex-col items-center border-cyan-500/20">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-4 text-cyan-300">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-heading mb-2">
              {siteContent.paymentSection?.card3Title || 'White-Glove Concierge'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {siteContent.paymentSection?.card3Desc || 'Direct 1-on-1 contact with Moy from the day you book until the last fete of your journey. Hand-delivered costumes & 24/7 security.'}
            </p>
          </div>

        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION (BahaYogi Searchable QA) ── */}
      <section id="faqs" className="relative py-16 px-6 max-w-4xl mx-auto z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-black text-[#00e5cc] uppercase tracking-widest block mb-1">
            {siteContent.faqsHeader?.kicker || 'FREQUENTLY ASKED QUESTIONS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight">
            {siteContent.faqsHeader?.title || 'Everything You Need To Know'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {siteContent.faqsHeader?.subtitle || 'Got questions about costume fittings, villas, or payment plans? Moy has you covered.'}
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
            href={`https://wa.me/${activeWhatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Moy,%20I%20have%20a%20question%20about%20your%20travel%20packages`}
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
                {siteContent.footer?.brandTagline || 'Curated Travel by Moy • Trinidad & Tobago'}
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
              href="https://instagram.com/moymeetsworld"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-[#00e5cc] flex items-center justify-center transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${activeWhatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
          <p>{siteContent.footer?.copyright || `© ${new Date().getFullYear()} Moy Meets World & Carnival Planner. All rights reserved.`}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-cyan-300 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setActiveLegalModal('terms')} className="hover:text-cyan-300 transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setActiveLegalModal('refund')} className="hover:text-cyan-300 transition-colors">Refund Policy</button>
          </div>
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
          gatewaySettings={gatewaySettings}
        />
      )}

      {/* ── LEGAL POLICY MODAL ── */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl p-4 sm:p-6 flex justify-center items-start animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-8 text-left">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/80 hover:bg-[#00e5cc] text-white hover:text-black flex items-center justify-center transition-all border border-white/20 shadow-xl"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
            {activeLegalModal === 'privacy' && <PrivacyPolicy onBack={() => setActiveLegalModal(null)} logo="/images/moymeetsworld_logo.jpg" />}
            {activeLegalModal === 'terms' && <TermsOfService onBack={() => setActiveLegalModal(null)} logo="/images/moymeetsworld_logo.jpg" />}
            {activeLegalModal === 'refund' && <RefundPolicy onBack={() => setActiveLegalModal(null)} logo="/images/moymeetsworld_logo.jpg" />}
          </div>
        </div>
      )}

      {showAgentDashboard && (
        <PortalErrorBoundary onClose={() => setShowAgentDashboard(false)}>
          <MoyAgentDashboard
            onClose={() => setShowAgentDashboard(false)}
            user={user}
          />
        </PortalErrorBoundary>
      )}

    </div>
  );
}
