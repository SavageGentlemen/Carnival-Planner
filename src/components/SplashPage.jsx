import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Package, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Play, 
  Pause, 
  Search, 
  Flame, 
  Volume2, 
  VolumeX, 
  Instagram, 
  Twitter, 
  Facebook,
  Plane,
  ShieldCheck
} from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { LiquidButton, HolographicCard, CostumeStage3D } from './threeui';

export default function SplashPage({ onGetStarted, logo, onTryDemo, onOpenConcierge, onLegalPage }) {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoUrl, setVideoUrl] = useState('/videos/background_apps.mp4');
  const [videoTitle, setVideoTitle] = useState('Top 5 Fetes This Weekend');
  const [videoSubtitle, setVideoSubtitle] = useState('Barbados & Trinidad Edition');
  const [costumeSlide, setCostumeSlide] = useState(0);
  const [costumeViewMode, setCostumeViewMode] = useState('photo'); // 'photo' | '3d'
  const videoRef = useRef(null);

  // Costumes data for carousel showcase
  const costumes = [
    {
      id: 'teal',
      title: 'Turquoise Empress',
      section: 'Frontline Wing Package',
      band: 'Tribe Carnival • Trinidad',
      image: '/images/carnival/costume_teal.jpg',
      price: '$1,250'
    },
    {
      id: 'gold',
      title: 'Solar Radiance',
      section: 'Individual Showpiece',
      band: 'Zulu International • Barbados',
      image: '/images/carnival/costume_gold.jpg',
      price: '$1,400'
    },
    {
      id: 'pink',
      title: 'Magenta Blossom',
      section: 'Backline & Collar Upgrade',
      band: 'YUMA Vibe • Trinidad',
      image: '/images/carnival/costume_pink.jpg',
      price: '$950'
    },
    {
      id: 'red',
      title: 'Fire Monarch',
      section: 'Full Feather Backpack',
      band: 'Xodus Carnival • Jamaica',
      image: '/images/carnival/trinidad.jpg',
      price: '$1,100'
    }
  ];

  // Fetch latest auto-generated short from Firestore
  useEffect(() => {
    const fetchLatestShort = async () => {
      try {
        const q = query(
          collection(db, 'feteShorts'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const data = snap.docs[0].data();
          if (data.videoUrl) setVideoUrl(data.videoUrl);
          if (data.title) setVideoTitle(data.title);
          if (data.subtitle) setVideoSubtitle(data.subtitle);
        }
      } catch (e) {
        console.warn('[Shorts] Could not fetch latest short:', e.message);
      }
    };
    fetchLatestShort();
  }, []);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent("Yo! Check out Caribbean Carnival Planner — it has 330+ fetes, costume pickup spots, and an AI Concierge for Trinidad, Barbados & Jamaica Carnival: https://carnival-planner.web.app");
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (onOpenConcierge) {
      onOpenConcierge(quickQuery || "Show me top upcoming fetes in Trinidad and Barbados");
    }
  };

  const handleNextCostume = () => {
    setCostumeSlide((prev) => (prev + 1) % costumes.length);
  };

  const handlePrevCostume = () => {
    setCostumeSlide((prev) => (prev - 1 + costumes.length) % costumes.length);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden selection:bg-[#00e5cc] selection:text-black font-sans relative">
      
      {/* ── LEFT & RIGHT DECORATIVE FEATHER ACCENTS ── */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-[220px] md:w-[300px] lg:w-[360px] h-full z-10 opacity-70 mix-blend-screen bg-no-repeat bg-contain bg-left-top hidden sm:block"
        style={{ backgroundImage: "url('/images/carnival/feathers_left.jpg')" }}
      />
      <div 
        className="pointer-events-none fixed top-0 right-0 w-[220px] md:w-[300px] lg:w-[360px] h-full z-10 opacity-70 mix-blend-screen bg-no-repeat bg-contain bg-right-top hidden sm:block"
        style={{ backgroundImage: "url('/images/carnival/feathers_right.jpg')" }}
      />

      {/* ── TOP NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#080c14]/90 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00e5cc] to-teal-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,204,0.4)] border border-cyan-300/40">
              <span className="text-xl">🪶</span>
            </div>
            <div>
              <span className="font-extrabold tracking-widest text-white text-base block font-heading uppercase">
                CARIBBEAN CARNIVAL
              </span>
            </div>
          </div>

          {/* Center Nav Links (Mockup Structure) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            <a href="#hero" className="text-[#00e5cc] transition-colors hover:text-white">HOME</a>
            <a href="#events" className="text-slate-300 hover:text-[#00e5cc] transition-colors">EVENTS</a>
            <a href="#costumes" className="text-slate-300 hover:text-[#00e5cc] transition-colors">COSTUMES</a>
            <button 
              onClick={() => navigate('/moymeetsworld')} 
              className="text-[#00e5cc] hover:text-white transition-colors flex items-center gap-1 font-extrabold"
            >
              <span>TRAVEL (MOY)</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full">NEW</span>
            </button>
            <a href="#packages" className="text-slate-300 hover:text-[#00e5cc] transition-colors">PACKAGES</a>
            <a href="#guide" onClick={(e) => { e.preventDefault(); onOpenConcierge?.('Tell me about carnival planning guide'); }} className="text-slate-300 hover:text-[#00e5cc] transition-colors">GUIDE</a>
            <a href="#about" className="text-slate-300 hover:text-[#00e5cc] transition-colors">ABOUT</a>
            <a href="#promoter-boost" className="text-slate-300 hover:text-[#00e5cc] transition-colors">CONTACT</a>
          </nav>

          {/* Right CTA Button */}
          <div className="flex items-center gap-3">
            <LiquidButton
              size="sm"
              variant="cyan"
              onClick={onGetStarted}
            >
              SIGN UP
            </LiquidButton>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER SECTION ── */}
      <section id="hero" className="relative pt-24 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto z-20">
        
        {/* Full-width Hero Card */}
        <div className="relative rounded-3xl overflow-hidden min-h-[480px] md:min-h-[560px] flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-cyan-500/20">
          
          {/* Hero Background Image */}
          <img 
            src="/images/carnival/hero_banner.jpg" 
            alt="Caribbean Carnival Masqueraders" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* Ambient Dark Overlays for Optimal Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-[#080c14]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/60 via-transparent to-[#080c14]/60" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Live Ticker Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-cyan-400/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,229,204,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00e5cc] animate-pulse"></span>
              <span className="text-[11px] font-bold text-cyan-200 uppercase tracking-widest">
                25+ Global Carnivals • 330+ Live Fetes
              </span>
            </div>

            {/* Headline matching Mockup */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] font-heading mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              EXPERIENCE THE MAGIC<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00e5cc]">
                OF CARIBBEAN CARNIVAL
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-medium max-w-xl mb-8 drop-shadow-md">
              Your unforgettable celebration awaits. We plan, you fete!
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <LiquidButton
                variant="cyan"
                size="lg"
                onClick={onGetStarted}
                icon={ArrowRight}
              >
                START PLANNING YOUR TRIP
              </LiquidButton>

              <LiquidButton
                variant="glass"
                size="lg"
                onClick={onTryDemo}
              >
                Preview Live Fete Map
              </LiquidButton>
            </div>

            {/* Instant AI Concierge Search Box */}
            <form onSubmit={handleQuickSearch} className="w-full max-w-xl">
              <div className="relative flex items-center bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-1.5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus-within:border-cyan-400 transition-all">
                <Search className="w-4 h-4 text-cyan-400 ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Ask AI: 'Top fetes in Trinidad' or 'Costume pickup tips'..."
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-slate-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#00e5cc] hover:bg-[#24f6df] text-black font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_15px_rgba(0,229,204,0.3)] shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Ask AI
                </button>
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                <button
                  type="button"
                  onClick={() => onOpenConcierge?.("Top 5 fetes this weekend")}
                  className="text-[11px] bg-slate-900/60 hover:bg-slate-800 border border-cyan-500/20 px-3 py-1 rounded-full text-slate-300 font-medium transition-all"
                >
                  🎉 Weekend Fetes
                </button>
                <button
                  type="button"
                  onClick={() => onOpenConcierge?.("Barbados Crop Over fetes and ticket prices")}
                  className="text-[11px] bg-slate-900/60 hover:bg-slate-800 border border-cyan-500/20 px-3 py-1 rounded-full text-slate-300 font-medium transition-all"
                >
                  🌴 Crop Over 2026
                </button>
                <button
                  type="button"
                  onClick={() => onOpenConcierge?.("Trinidad Carnival costume pickup tips")}
                  className="text-[11px] bg-slate-900/60 hover:bg-slate-800 border border-cyan-500/20 px-3 py-1 rounded-full text-slate-300 font-medium transition-all"
                >
                  🎭 Costume Info
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* ── SECTION 1: UNLOCK YOUR CARNIVAL ADVENTURE (3 Pillar Cards) ── */}
      <section id="packages" className="relative py-12 px-6 max-w-7xl mx-auto z-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-heading">
            UNLOCK YOUR CARNIVAL ADVENTURE
          </h2>
          <div className="w-16 h-1 bg-[#00e5cc] mx-auto mt-3 rounded-full shadow-[0_0_10px_#00e5cc]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Expert Planning */}
          <HolographicCard tier="RARE">
            <div className="p-8 text-center flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center mb-5 text-[#00e5cc] shadow-[0_0_20px_rgba(0,229,204,0.25)] group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase text-white font-heading tracking-wide mb-2">
                EXPERT PLANNING
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Expert planning around your needs, matching your schedule, budget and squad context.
              </p>
            </div>
          </HolographicCard>

          {/* Card 2: Tailored Packages */}
          <HolographicCard tier="GOLD">
            <div className="p-8 text-center flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center mb-5 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase text-white font-heading tracking-wide mb-2">
                TAILORED PACKAGES
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Custom-tailored curated packages, costume fittings, hotel stays and transport options.
              </p>
            </div>
          </HolographicCard>

          {/* Card 3: Exclusive Events */}
          <HolographicCard tier="EPIC">
            <div className="p-8 text-center flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-pink-950/60 border border-pink-400/40 flex items-center justify-center mb-5 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.25)] group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black uppercase text-white font-heading tracking-wide mb-2">
                EXCLUSIVE EVENTS
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Access experiential events, all-inclusive boat rides, and exclusive VIP tickets with ease.
              </p>
            </div>
          </HolographicCard>

        </div>
      </section>

      {/* ── FEATURED PARTNER HIGHLIGHT: MOY MEETS WORLD ── */}
      <section className="relative py-12 px-6 max-w-7xl mx-auto z-20">
        <div className="relative rounded-3xl overflow-hidden glass-panel p-8 md:p-12 border-cyan-400/40 shadow-[0_0_50px_rgba(0,229,204,0.2)] bg-gradient-to-r from-slate-950 via-[#080c14] to-slate-950">
          
          {/* Subtle Ambient Background Image */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="/images/moymeetsworld_logo.jpg" 
              alt="Moy Meets World Travel" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080c14] via-[#080c14]/90 to-[#080c14]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[#00e5cc] text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,204,0.3)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Travel Partner • Trinidad & Tobago</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <span>⭐ Premium: 5% Off + VIP Delivery</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-3">
                Moy Meets World <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5cc] to-teal-400">✈️</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-6">
                Looking for a full-service, stress-free carnival experience? Travel with <strong>Moy</strong> (Chief Travel Curator based in Trinidad). Hand-delivered costumes, luxury villa stays, premier fete tickets, and 24/7 on-ground concierge.
              </p>

              {/* Highlight Perks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-xs font-bold text-slate-200">
                <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 p-2.5 rounded-xl">
                  <span className="text-emerald-400">✓</span> VIP Band Costumes
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 p-2.5 rounded-xl">
                  <span className="text-emerald-400">✓</span> 5-Star Villas & Hotels
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 p-2.5 rounded-xl">
                  <span className="text-amber-300">✓</span> 5% Premium Savings
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <LiquidButton
                  variant="cyan"
                  size="md"
                  onClick={() => navigate('/moymeetsworld')}
                  icon={ArrowRight}
                >
                  Explore Packages with Moy
                </LiquidButton>

                <button
                  onClick={() => navigate('/moymeetsworld/trinidad-carnival-2027')}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/20 hover:border-cyan-400/40 transition-all"
                >
                  Trinidad 2027 Package
                </button>
              </div>
            </div>

            {/* Right Card / Destination Preview */}
            <div className="w-full lg:w-80 shrink-0">
              <HolographicCard tier="GOLD" onClick={() => navigate('/moymeetsworld')}>
                <div className="p-5 bg-slate-950/90 rounded-3xl group">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-black">
                    <img 
                      src="/images/moymeetsworld_logo.jpg" 
                      alt="Moy Meets World" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 text-[#00e5cc] font-black text-[9px] uppercase px-2 py-0.5 rounded backdrop-blur-sm border border-cyan-400/30">
                      FLAGSHIP 2027
                    </div>
                    <div className="absolute bottom-2 right-2 bg-[#00e5cc] text-black font-black text-[10px] uppercase px-2 py-0.5 rounded">
                      $500 Deposit
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-black text-white text-base font-heading">Trinidad Mas Experience</h4>
                  </div>
                  <p className="text-xs text-cyan-300 font-semibold mb-2">Feb 5 - 11, 2027 • Port of Spain</p>
                  <p className="text-[11px] text-slate-300 leading-normal line-clamp-2">
                    All-inclusive J'ouvert, Tribe / YUMA Frontline costume, private villa and premier fetes.
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#00e5cc] font-bold">
                    <span>View Full Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </HolographicCard>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: UPCOMING CARNIVALS ── */}
      <section id="events" className="relative py-12 px-6 max-w-7xl mx-auto z-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-heading">
            UPCOMING CARNIVALS
          </h2>
          <div className="w-16 h-1 bg-[#00e5cc] mx-auto mt-3 rounded-full shadow-[0_0_10px_#00e5cc]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Carnival 1: Trinidad */}
          <HolographicCard tier="EPIC">
            <div className="flex flex-col justify-between h-full bg-slate-950/80 rounded-3xl overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/images/carnival/trinidad.jpg" 
                  alt="Trinidad Carnival" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600/90 text-white font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm">
                  TRINIDAD & TOBAGO
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-white font-heading tracking-wide mb-1">
                    TRINIDAD
                  </h3>
                  <p className="text-xs font-bold text-cyan-300 mb-2">Dates: Feb 8 - Feb 9, 2027</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    The Greatest Show on Earth. 50+ world-class fetes, J'ouvert morning, and two days of nonstop road revelry.
                  </p>
                </div>
                <div className="mt-6">
                  <LiquidButton variant="cyan" size="md" className="w-full" onClick={onGetStarted}>
                    DISCOVER
                  </LiquidButton>
                </div>
              </div>
            </div>
          </HolographicCard>

          {/* Carnival 2: Barbados */}
          <HolographicCard tier="GOLD">
            <div className="flex flex-col justify-between h-full bg-slate-950/80 rounded-3xl overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/images/carnival/barbados.jpg" 
                  alt="Barbados Crop Over Carnival" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-500/90 text-black font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm">
                  BARBADOS
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-white font-heading tracking-wide mb-1">
                    BARBADOS
                  </h3>
                  <p className="text-xs font-bold text-cyan-300 mb-2">Dates: Jul 28 - Aug 3, 2027</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Sweetest Summer Festival. Grand Kadooment day, sunrise beach parties, and unforgettable Bajan soca vibes.
                  </p>
                </div>
                <div className="mt-6">
                  <LiquidButton variant="gold" size="md" className="w-full" onClick={onGetStarted}>
                    DISCOVER
                  </LiquidButton>
                </div>
              </div>
            </div>
          </HolographicCard>

          {/* Carnival 3: Notting Hill */}
          <HolographicCard tier="PLATINUM">
            <div className="flex flex-col justify-between h-full bg-slate-950/80 rounded-3xl overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/images/carnival/nottinghill.jpg" 
                  alt="Notting Hill Carnival" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600/90 text-white font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm">
                  UNITED KINGDOM
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-white font-heading tracking-wide mb-1">
                    NOTTING HILL
                  </h3>
                  <p className="text-xs font-bold text-cyan-300 mb-2">Dates: Aug 30 - Aug 31, 2026</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Europe's largest street party. Over a million attendees dancing through West London to mammoth sound systems.
                  </p>
                </div>
                <div className="mt-6">
                  <LiquidButton variant="purple" size="md" className="w-full" onClick={onGetStarted}>
                    DISCOVER
                  </LiquidButton>
                </div>
              </div>
            </div>
          </HolographicCard>

        </div>
      </section>

      {/* ── SECTION 3: STUNNING COSTUMES (Gallery & 3D Stage) ── */}
      <section id="costumes" className="relative py-12 px-6 max-w-7xl mx-auto z-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-heading">
            STUNNING COSTUMES
          </h2>
          <div className="w-16 h-1 bg-[#00e5cc] mx-auto mt-3 rounded-full shadow-[0_0_10px_#00e5cc]" />
        </div>

        {/* Mode Switcher: Photo Gallery vs 3D Studio Stage */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-900/90 border border-cyan-500/30 rounded-2xl backdrop-blur-md shadow-lg">
            <button
              onClick={() => setCostumeViewMode('photo')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                costumeViewMode === 'photo'
                  ? 'bg-[#00e5cc] text-gray-950 shadow-[0_0_15px_rgba(0,229,204,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📸 Photo Gallery
            </button>
            <button
              onClick={() => setCostumeViewMode('3d')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                costumeViewMode === '3d'
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> ✨ 3D Studio Stage
            </button>
          </div>
        </div>

        {/* If 3D Stage View Mode is Selected */}
        {costumeViewMode === '3d' ? (
          <div className="max-w-4xl mx-auto">
            <CostumeStage3D
              itemType="wings"
              color="#ec4899"
              accentColor="#00e5cc"
              title="Carnival Frontline 3D Showcase"
              price="$1,250"
              className="w-full h-96 md:h-[450px] rounded-3xl"
            />
          </div>
        ) : (
          /* Photo Carousel Container */
          <div className="relative">
            
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevCostume}
              aria-label="Previous Costume"
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/90 border border-cyan-400/40 text-white flex items-center justify-center hover:bg-[#00e5cc] hover:text-black transition-all shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button 
              onClick={handleNextCostume}
              aria-label="Next Costume"
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/90 border border-cyan-400/40 text-white flex items-center justify-center hover:bg-[#00e5cc] hover:text-black transition-all shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* 3 Visible Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const index = (costumeSlide + offset) % costumes.length;
                const item = costumes[index];
                return (
                  <HolographicCard key={item.id} tier="RARE" onClick={onGetStarted}>
                    <div className="overflow-hidden group cursor-pointer bg-slate-950/90 rounded-3xl">
                      <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                          <span className="text-[10px] font-black uppercase text-[#00e5cc] tracking-widest block mb-1">
                            {item.band}
                          </span>
                          <h4 className="text-lg font-black text-white font-heading">{item.title}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-slate-300">{item.section}</span>
                            <span className="text-sm font-extrabold text-cyan-300">{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HolographicCard>
                );
              })}
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {costumes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCostumeSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    costumeSlide === i 
                      ? 'w-8 bg-[#00e5cc] shadow-[0_0_10px_#00e5cc]' 
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

          </div>
        )}
      </section>


      {/* ── VIDEO SHORTS & PROMOTER BOOST SECTION ── */}
      <section id="promoter-boost" className="relative py-12 px-6 max-w-7xl mx-auto z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Promoter Boost Card */}
          <div className="lg:col-span-2 glass-panel p-8 md:p-10 flex flex-col justify-between border-cyan-500/30">
            <div>
              <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider font-heading mb-4">
                FOR EVENT PROMOTERS & BAND LEADERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-heading">
                Boost Your Fete to 10,000+ Carnival Goers 🎟️
              </h2>
              <p className="text-slate-300 text-sm md:text-base mt-3 max-w-xl font-medium leading-relaxed">
                Pin your event to the top of our curated live feed ($49) or get featured in our automated weekly video Shorts distributed to YouTube, Instagram Reels & TikTok ($149).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] text-center font-heading"
              >
                Pin Event Feed ($49)
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-full font-bold text-xs uppercase tracking-wider transition-all text-center font-heading"
              >
                Video Short Boost ($149)
              </button>
            </div>
          </div>

          {/* Right Col: Video Short Card */}
          <div className="glass-panel p-6 flex flex-col justify-between border-cyan-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#00e5cc] animate-pulse" />
                <span className="font-extrabold text-xs text-white font-heading">Weekly Auto Short</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                AI Generated
              </span>
            </div>

            {/* Video Player */}
            <div
              className="relative rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/20 h-56 mb-3 group cursor-pointer"
              onClick={handlePlayPause}
            >
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted={isMuted}
                  loop
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-cyan-950 animate-pulse" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className={`w-12 h-12 rounded-full bg-[#00e5cc] text-black flex items-center justify-center shadow-2xl transition-all ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90' : 'opacity-100 scale-100'}`}>
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(e); }}
                className="absolute bottom-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors border border-white/20"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <div className="absolute bottom-2.5 left-2.5 z-10 pr-10">
                <p className="font-black text-white text-xs font-heading truncate">{videoTitle}</p>
                <p className="text-[10px] text-cyan-300 font-bold truncate">{videoSubtitle}</p>
              </div>
            </div>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Share2 className="w-3.5 h-3.5" /> Share with Crew on WhatsApp
            </button>
          </div>

        </div>
      </section>

      {/* ── FOOTER (Matching Mockup) ── */}
      <footer className="relative bg-[#05080e] border-t border-cyan-500/20 pt-12 pb-8 px-6 z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00e5cc] to-teal-700 flex items-center justify-center shadow-[0_0_10px_rgba(0,229,204,0.4)]">
                <span className="text-base">🪶</span>
              </div>
              <span className="font-extrabold tracking-widest text-white text-sm font-heading uppercase">
                CARIBBEAN CARNIVAL
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-[#00e5cc] flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-[#00e5cc] flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-[#00e5cc] flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Bottom Sub-links and Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-400 font-medium">
            <div className="flex flex-wrap items-center gap-6">
              <a href="#hero" className="hover:text-cyan-300 transition-colors">Home</a>
              <a href="#events" className="hover:text-cyan-300 transition-colors">Social</a>
              <a href="#packages" className="hover:text-cyan-300 transition-colors">Utility</a>
              <button onClick={() => onLegalPage?.('privacy')} className="hover:text-cyan-300 transition-colors">Privacy</button>
              <button onClick={() => onLegalPage?.('terms')} className="hover:text-cyan-300 transition-colors">Terms</button>
            </div>

            <p className="text-slate-400">
              © {new Date().getFullYear()} caribbeancarnival.com. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
