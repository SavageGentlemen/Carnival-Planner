import React, { useMemo, useEffect, useState } from 'react';
import { Calendar, Wallet, Users, MapPin, Zap, ExternalLink, Ticket, ArrowRight, Music } from 'lucide-react';

export default function HomeHub({
    user,
    activeCarnivalId,
    carnivalData,
    scrapedEvents = [],
    squadMembers = [],
    budgetTotal = 0,
    budgetSpent = 0,
    isPremium,
    onAction
}) {
    // 1. Calculate "Next Up" Carnival
    // Determined resolved carnival event relative to selection or date
    const nextCarnival = useMemo(() => {
        if (activeCarnivalId) {
            // ROBUST MAPPING: Matches App.jsx logic to handle mismatched IDs (e.g. stmaarten vs St. Maarten)
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
            return found || carnivalData[0]; // Fallback
        }

        const today = new Date();
        const sorted = [...carnivalData].sort((a, b) => new Date(a.date) - new Date(b.date));
        return sorted.find(c => new Date(c.date) >= today) || sorted[0]; // Fallback to first if none future
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
                // Use Ceil to count partial days as a full day (standard for "Days To Go")
                const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                setTimeLeft({ days, hours });
            } else {
                setTimeLeft({ days: 0, hours: 0 });
            }
        };
        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [nextCarnival]);

    // Recent Events for Ticker
    const recentEvents = useMemo(() => {
        // Filter scraped events for the ACTIVE carnival if possible, or just show all if relevant?
        // For now, let's only show scraped events if we have them.
        if (scrapedEvents.length > 0) return scrapedEvents.slice(0, 5);

        // If no events, return NULL so we can hide the ticker
        return null;
    }, [scrapedEvents]);

    return (
        <div className="space-y-6 mb-8 animate-fadeIn">
            {/* 1. HERO SECTION */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 shadow-2xl text-white">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl -ml-10 -mb-10 animate-pulse"></div>

                <div className="relative z-10 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                    {activeCarnivalId ? 'CURRENT MISSION' : 'UP NEXT'}
                                </span>
                                {isPremium && (
                                    <span className="flex items-center px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-[10px] font-bold uppercase tracking-widest">
                                        <Zap className="w-3 h-3 mr-1" /> Premium
                                    </span>
                                )}
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-1">
                                {nextCarnival?.name?.split('(')[0].trim() || 'Carnival'}
                            </h2>
                            <p className="text-white/80 text-sm font-medium">Get ready for the road.</p>
                        </div>

                        {/* Countdown Box */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                            <div className="text-center">
                                <span className="block text-2xl sm:text-3xl font-black">{timeLeft.days}</span>
                                <span className="text-[10px] uppercase opacity-70">Days</span>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="text-center">
                                <span className="block text-2xl sm:text-3xl font-black">{timeLeft.hours}</span>
                                <span className="text-[10px] uppercase opacity-70">Hrs</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. LIVE TICKER (Embedded in Hero) - Only show if we have events */}
                    {recentEvents && (
                        <div className="mt-8 flex items-center gap-3 bg-black/20 rounded-xl p-2.5 backdrop-blur-sm overflow-hidden">
                            <div className="flex-shrink-0 flex items-center gap-1.5 px-2 py-0.5 bg-red-500 rounded text-[10px] font-bold uppercase animate-pulse">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                Live
                            </div>
                            <div className="flex-1 overflow-hidden whitespace-nowrap">
                                <div className="inline-block animate-marquee text-xs font-medium">
                                    {recentEvents.map((evt, i) => (
                                        <span key={evt.id || i} className="mr-8">
                                            🔥 <span className="font-bold text-pink-200">{evt.title}</span>
                                            {evt.venue && <span className="opacity-75"> @ {evt.venue}</span>}
                                            {evt.price && <span className="text-green-300 ml-1">(${evt.price})</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. STATS & ACTIONS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Stat: Budget */}
                <div
                    onClick={() => onAction('Budget')}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Budget Spent</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">
                        ${budgetSpent.toLocaleString()}
                        <span className="text-xs text-gray-400 font-normal ml-1">/ ${budgetTotal.toLocaleString()}</span>
                    </p>
                    {budgetTotal > 0 && (
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${Math.min((budgetSpent / budgetTotal) * 100, 100)}%` }}
                            ></div>
                        </div>
                    )}
                </div>

                {/* Stat: Squad */}
                <div
                    onClick={() => onAction('Squad')}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Squad Online</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">
                        {squadMembers.length + 1}
                        <span className="text-xs text-gray-400 font-normal ml-1">members</span>
                    </p>
                    <div className="flex -space-x-2 mt-2">
                        {[...Array(Math.min(squadMembers.length + 1, 4))].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
                        ))}
                    </div>
                </div>

                {/* Action: Map Events */}
                <div
                    onClick={() => onAction('Map')}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Live Events</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">{scrapedEvents.length || '30+'}</p>
                    <p className="text-[10px] text-purple-500 font-bold mt-1"> View Map</p>
                </div>

                {/* Action: Passport */}
                <div
                    onClick={() => onAction('Passport')}
                    className="bg-gradient-to-br from-teal-500 to-emerald-600 p-4 rounded-2xl shadow-sm shadow-teal-500/20 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-white/20 rounded-lg text-white">
                            <Ticket className="w-5 h-5" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-teal-100 font-medium">Identity</p>
                    <p className="text-lg font-bold text-white mt-0.5">Passport</p>
                    <p className="text-[10px] text-white/80 font-bold mt-1">Launch App</p>
                </div>
            </div>
        </div>
    );
}
