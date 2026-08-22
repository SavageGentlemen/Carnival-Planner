import React, { useMemo, useEffect, useState } from 'react';
import { Calendar, Wallet, Users, MapPin, Zap, ExternalLink, Ticket, ArrowRight, TrendingUp, PartyPopper, Share2, Plane, Sparkles } from 'lucide-react';
import { HolographicCard, LiquidButton } from './threeui';

const SquadPromoProgressBar = ({ currentMemberCount, shareCode }) => {
    if (currentMemberCount >= 5) {
        return (
            <div 
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-4 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] border border-amber-300/40 mb-6 text-center text-white animate-fadeIn"
            >
                <div className="flex items-center justify-center gap-2 mb-1">
                    <PartyPopper className="w-6 h-6 animate-bounce" />
                    <h3 className="font-black text-xl tracking-wide uppercase font-heading">Squad Goals Unlocked!</h3>
                    <PartyPopper className="w-6 h-6 animate-bounce" />
                </div>
                <p className="font-bold text-sm">Premium Activated for 3 Months for the whole squad! 🏆</p>
            </div>
        );
    }

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/?squad=${shareCode}`;
        if (navigator.share && shareCode) {
            try {
                await navigator.share({
                    title: 'Join my Squad on Carnival Planner!',
                    text: `Use my invite code ${shareCode} to join my squad. If we hit 5 members, we all get 3 months of Premium FREE!`,
                    url: shareUrl
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else if (shareCode) {
            navigator.clipboard.writeText(shareUrl);
            alert(`Squad invite link copied to clipboard!\n${shareUrl}`);
        }
    };

    const progressPercentage = (currentMemberCount / 5) * 100;
    const membersNeeded = 5 - currentMemberCount;

    return (
        <div className="glass-panel p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-cyan-500/20">
            <div className="flex-1 w-full">
                <p className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    🔥 <span className="text-[#00e5cc]">{currentMemberCount}/5 Squad Members.</span> 
                    Add {membersNeeded} more {membersNeeded === 1 ? 'friend' : 'friends'} to unlock 3 Months of Premium!
                </p>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                    <div 
                        style={{ width: `${progressPercentage}%`, transition: 'width 1s ease-out' }}
                        className="h-full bg-gradient-to-r from-teal-400 to-[#00e5cc] rounded-full shadow-[0_0_10px_#00e5cc]"
                    />
                </div>
            </div>
            
            <LiquidButton
                variant="cyan"
                size="sm"
                onClick={handleShare}
                icon={Share2}
            >
                Share Invite Code
            </LiquidButton>
        </div>
    );
};


export default function HomeHub({
    user,
    activeCarnivalId,
    carnivalData,
    scrapedEvents = [],
    vibeScores = {},
    squadMembers = [],
    squadShareCode = '',
    budgetTotal = 0,
    budgetSpent = 0,
    isPremium,
    onAction
}) {
    // 1. Calculate "Next Up" Carnival
    const nextCarnival = useMemo(() => {
        if (activeCarnivalId) {
            const carnivalNameMap = {
                'stkitts-sugar-mas': 'Sugar Mas',
                'stcroix': 'St. Croix Carnival',
                'trinidad': 'Trinidad Carnival',
                'dominica': 'Mas Domnik',
                'jamaica': 'Jamaica Carnival',
                'tampa': 'Tampa Bay Carnival',
                'stmaarten': 'St. Maarten Carnival',
                'cayman-batabano': 'Cayman Carnival Batabano',
                'stthomas': 'St. Thomas Carnival',
                'atlanta': 'Atlanta Caribbean Carnival',
                'guyana': 'Guyana Independence',
                'bahamas': 'Bahamas Carnival',
                'bermuda': 'Bermuda Carnival',
                'hollywood': 'Hollywood Carnival',
                'caymas': 'Caymas Carnival',
                'vincymas': 'Vincy Mas',
                'stlucia': 'Saint Lucia Carnival',
                'toronto': 'Toronto Caribbean Carnival',
                'barbados': 'Crop Over',
                'nevis': 'Nevis Culturama',
                'antigua': 'Antigua Carnival',
                'grenada': 'Spice Mas',
                'ny-labor-day': 'New York Carnival',
                'japan': 'Japan Caribbean Carnival',
                'miami': 'Miami Carnival',
                'tobago': 'Tobago Carnival'
            };

            const searchName = carnivalNameMap[activeCarnivalId] || activeCarnivalId.replace(/-/g, ' ');

            const found = carnivalData.find(c =>
                c.name.toLowerCase().includes(searchName.toLowerCase()) ||
                searchName.toLowerCase().includes(c.name.split('(')[0].trim().toLowerCase())
            );
            return found || carnivalData[0];
        }

        const today = new Date();
        const sorted = [...carnivalData].sort((a, b) => new Date(a.date) - new Date(b.date));
        return sorted.find(c => new Date(c.date) >= today) || sorted[0];
    }, [activeCarnivalId, carnivalData]);

    // Countdown Logic
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

    useEffect(() => {
        if (!nextCarnival) return;
        const updateTimer = () => {
            const target = new Date(nextCarnival.date + 'T00:00:00');
            const now = new Date();
            const diff = target - now;

            if (diff > 0) {
                const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                setTimeLeft({ days, hours });
            } else {
                setTimeLeft({ days: 0, hours: 0 });
            }
        };
        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
    }, [nextCarnival]);

    // Recent Events for Ticker
    const recentEvents = useMemo(() => {
        if (scrapedEvents.length > 0) return scrapedEvents.slice(0, 5);
        return null;
    }, [scrapedEvents]);

    // Top Vibes — highest-scoring events
    const topVibes = useMemo(() => {
        const scores = Object.values(vibeScores);
        if (scores.length === 0) return null;
        return scores
            .filter(s => s.score >= 6)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }, [vibeScores]);

    return (
        <div className="space-y-6 mb-8 animate-fadeIn">
            {/* SQUAD PROMO PROGRESS BAR */}
            {activeCarnivalId && <SquadPromoProgressBar currentMemberCount={squadMembers.length + 1} shareCode={squadShareCode} />}

            {/* 1. HERO SECTION */}
            <HolographicCard tier="GOLD" maxTilt={8} scaleOnHover={1.01}>
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-white">
                    {/* Background Image / Feather Tint */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
                        style={{ backgroundImage: "url('/images/carnival/hero_banner.jpg')" }}
                    />
                    
                    {/* Ambient glow shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                    <div className="relative z-10 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-widest border border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(0,229,204,0.2)]">
                                        {activeCarnivalId ? 'CURRENT MISSION' : 'UP NEXT'}
                                    </span>
                                    {isPremium && (
                                        <span className="flex items-center px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest border border-amber-400/30">
                                            <Zap className="w-3 h-3 mr-1" /> Premium
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-1 font-heading">
                                    {nextCarnival?.name?.split('(')[0].trim() || 'Carnival'}
                                </h2>
                                <p className="text-slate-300 text-sm font-medium">Get ready for the road.</p>
                            </div>

                            {/* Countdown Box */}
                            <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,204,0.15)]">
                                <div className="text-center">
                                    <span className="block text-2xl sm:text-3xl font-black text-[#00e5cc] font-heading">{timeLeft.days}</span>
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Days</span>
                                </div>
                                <div className="h-8 w-px bg-white/20"></div>
                                <div className="text-center">
                                    <span className="block text-2xl sm:text-3xl font-black text-white font-heading">{timeLeft.hours}</span>
                                    <span className="text-[10px] uppercase font-bold text-slate-400">Hrs</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. LIVE TICKER */}
                        {recentEvents && (
                            <div className="mt-6 flex items-center gap-3 bg-slate-950/70 rounded-xl p-2.5 backdrop-blur-sm border border-white/10 overflow-hidden">
                                <div className="flex-shrink-0 flex items-center gap-1.5 px-2 py-0.5 bg-red-600 rounded text-[10px] font-black uppercase text-white animate-pulse">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    Live
                                </div>
                                <div className="flex-1 overflow-hidden whitespace-nowrap">
                                    <div className="inline-block animate-marquee text-xs font-medium">
                                        {recentEvents.map((evt, i) => (
                                            <span key={evt.id || i} className="mr-8">
                                                🔥 <span className="font-bold text-cyan-200">{evt.title}</span>
                                                {vibeScores[evt.id] && (
                                                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                                        {vibeScores[evt.id].score}/10
                                                    </span>
                                                )}
                                                {evt.venue && <span className="opacity-75 text-slate-300"> @ {evt.venue}</span>}
                                                {evt.price && <span className="text-[#00e5cc] ml-1 font-bold">(${evt.price})</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </HolographicCard>

            {/* 2. TOP VIBES */}
            {topVibes && topVibes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {topVibes.map((vibe, i) => (
                        <HolographicCard key={vibe.eventId || i} tier={i === 0 ? 'GOLD' : 'RARE'} maxTilt={10} scaleOnHover={1.02} onClick={() => onAction('Schedule')}>
                            <div className="glass-panel p-3.5 rounded-2xl h-full border-cyan-500/25">
                                <div className="flex items-center gap-1 mb-1">
                                    <TrendingUp className={`w-3.5 h-3.5 ${i === 0 ? 'text-[#00e5cc]' : 'text-amber-400'}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        {i === 0 ? '🔥 Hottest' : `#${i + 1}`}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-white truncate">{vibe.title}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className={`text-lg font-black ${i === 0 ? 'text-[#00e5cc]' : 'text-amber-400'}`}>
                                        {vibe.score}
                                    </span>
                                    <span className="text-[10px] text-slate-400">/10</span>
                                </div>
                                {vibe.reason && (
                                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{vibe.reason}</p>
                                )}
                            </div>
                        </HolographicCard>
                    ))}
                </div>
            )}

            {/* 3. STATS & ACTIONS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Stat: Budget */}
                <HolographicCard tier="RARE" maxTilt={10} scaleOnHover={1.03} onClick={() => onAction('Budget')}>
                    <div className="glass-panel p-4 rounded-2xl h-full group border-cyan-500/20">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-cyan-950/60 border border-cyan-400/30 rounded-xl text-[#00e5cc]">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00e5cc] transition-colors" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Budget Spent</p>
                        <p className="text-lg font-bold text-white mt-0.5">
                            ${budgetSpent.toLocaleString()}
                            <span className="text-xs text-slate-400 font-normal ml-1">/ ${budgetTotal.toLocaleString()}</span>
                        </p>
                        {budgetTotal > 0 && (
                            <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-[#00e5cc] rounded-full shadow-[0_0_8px_#00e5cc]"
                                    style={{ width: `${Math.min((budgetSpent / budgetTotal) * 100, 100)}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                </HolographicCard>

                {/* Stat: Squad */}
                <HolographicCard tier="RARE" maxTilt={10} scaleOnHover={1.03} onClick={() => onAction('Squad')}>
                    <div className="glass-panel p-4 rounded-2xl h-full group border-cyan-500/20">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-emerald-950/60 border border-emerald-400/30 rounded-xl text-emerald-400">
                                <Users className="w-5 h-5" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Squad Online</p>
                        <p className="text-lg font-bold text-white mt-0.5">
                            {squadMembers.length + 1}
                            <span className="text-xs text-slate-400 font-normal ml-1">members</span>
                        </p>
                        <div className="flex -space-x-2 mt-2">
                            {[...Array(Math.min(squadMembers.length + 1, 4))].map((_, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950"></div>
                            ))}
                        </div>
                    </div>
                </HolographicCard>

                {/* Action: Map Events */}
                <HolographicCard tier="PLATINUM" maxTilt={10} scaleOnHover={1.03} onClick={() => onAction('Map')}>
                    <div className="glass-panel p-4 rounded-2xl h-full group border-cyan-500/20">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-purple-950/60 border border-purple-400/30 rounded-xl text-purple-400">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Live Events</p>
                        <p className="text-lg font-bold text-white mt-0.5">{scrapedEvents.length || '30+'}</p>
                        <p className="text-[10px] text-cyan-400 font-bold mt-1">View Map</p>
                    </div>
                </HolographicCard>

                {/* Action: Passport */}
                <HolographicCard tier="GOLD" maxTilt={10} scaleOnHover={1.03} onClick={() => onAction('Passport')}>
                    <div className="glass-panel p-4 rounded-2xl h-full group border-cyan-500/20 bg-gradient-to-br from-slate-900 to-teal-950/60">
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-cyan-950/80 border border-cyan-400/40 rounded-xl text-[#00e5cc]">
                                <Ticket className="w-5 h-5" />
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#00e5cc] transition-colors" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Identity</p>
                        <p className="text-lg font-bold text-white mt-0.5">Passport</p>
                        <p className="text-[10px] text-[#00e5cc] font-bold mt-1">Launch App</p>
                    </div>
                </HolographicCard>

            </div>

            {/* ── MOY MEETS WORLD VIP TRAVEL CONCIERGE CARD ── */}
            <HolographicCard tier="PLATINUM" maxTilt={8} scaleOnHover={1.01} onClick={() => { window.location.href = '/moymeetsworld'; }}>
                <div className="glass-panel p-6 rounded-3xl border-cyan-400/30 bg-gradient-to-r from-slate-950 via-[#080c14] to-cyan-950/30 group shadow-[0_0_30px_rgba(0,229,204,0.15)]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cyan-400/40 p-0.5 bg-black shrink-0 shadow-[0_0_20px_rgba(0,229,204,0.3)]">
                                <img 
                                    src="/images/moymeetsworld_logo.jpg" 
                                    alt="Moy Meets World" 
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-0.5">
                                    <span className="text-xs font-black text-white uppercase tracking-wider font-heading">
                                        MOY MEETS WORLD TRAVEL
                                    </span>
                                    <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase rounded border border-emerald-500/30">
                                        Curated by Moy
                                    </span>
                                    <span className="px-2 py-0.2 bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase rounded border border-amber-500/30">
                                        ⭐ Premium: 5% Off
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300 font-medium">
                                    Full-service carnival packages: Band costumes, luxury villas, fete tickets, 5% Premium savings & 24/7 host.
                                </p>
                            </div>
                        </div>

                        <LiquidButton variant="cyan" size="sm" icon={ArrowRight}>
                            Explore Escapes
                        </LiquidButton>
                    </div>
                </div>
            </HolographicCard>

        </div>
    );
}

