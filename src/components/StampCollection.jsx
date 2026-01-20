import React, { useState, useEffect } from 'react';
import { Star, Filter, Heart, MapPin, Calendar, ChevronLeft, Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

// Country flag mapping
const COUNTRY_FLAGS = {
    TT: '🇹🇹', US: '🇺🇸', JM: '🇯🇲', BB: '🇧🇧', LC: '🇱🇨',
    VC: '🇻🇨', GD: '🇬🇩', AG: '🇦🇬', KN: '🇰🇳', BS: '🇧🇸',
    BM: '🇧🇲', GY: '🇬🇾', CA: '🇨🇦', GB: '🇬🇧', VG: '🇻🇬',
    VI: '🇻🇮', KY: '🇰🇾', SX: '🇸🇽', MQ: '🇲🇶', GP: '🇬🇵',
    PR: '🇵🇷', CU: '🇨🇺', HT: '🇭🇹', DO: '🇩🇴', AW: '🇦🇼',
    CW: '🇨🇼', JP: '🇯🇵', XX: '🎭'
};

// Rarity configuration
const RARITY_CONFIG = {
    LEGENDARY: {
        name: 'Legendary',
        borderColor: 'border-yellow-400',
        bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/30',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        glow: 'shadow-lg shadow-yellow-400/30'
    },
    EPIC: {
        name: 'Epic',
        borderColor: 'border-purple-400',
        bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30',
        textColor: 'text-purple-600 dark:text-purple-400',
        glow: 'shadow-lg shadow-purple-400/20'
    },
    RARE: {
        name: 'Rare',
        borderColor: 'border-blue-400',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/30',
        textColor: 'text-blue-600 dark:text-blue-400',
        glow: ''
    },
    COMMON: {
        name: 'Common',
        borderColor: 'border-gray-300 dark:border-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-700/50',
        textColor: 'text-gray-600 dark:text-gray-400',
        glow: ''
    }
};

export default function StampCollection({ user, onBack }) {
    const [stamps, setStamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('ALL'); // ALL, LEGENDARY, EPIC, RARE, COMMON
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        if (!user) return;

        const loadStamps = async () => {
            setLoading(true);
            setError(null);

            try {
                const functions = getFunctions(app);
                const getStamps = httpsCallable(functions, 'getPassportStamps');
                const result = await getStamps({
                    limit: 100,
                    rarity: filter === 'ALL' ? null : filter
                });
                setStamps(result.data.stamps || []);

                // Load favorites from stamps
                const favs = new Set(result.data.stamps?.filter(s => s.isFavorite).map(s => s.id) || []);
                setFavorites(favs);

            } catch (err) {
                console.error('Error loading stamps:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadStamps();
    }, [user, filter]);

    const toggleFavorite = (stampId) => {
        setFavorites(prev => {
            const newFavs = new Set(prev);
            if (newFavs.has(stampId)) {
                newFavs.delete(stampId);
            } else {
                newFavs.add(stampId);
            }
            return newFavs;
        });
        // TODO: Persist to Firestore
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return 'Unknown';
        const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Count by rarity
    const rarityCounts = stamps.reduce((acc, stamp) => {
        acc[stamp.rarity] = (acc[stamp.rarity] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        Stamp Collection
                    </h2>
                    <p className="text-sm text-gray-500">{stamps.length} stamps collected</p>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-1 px-1">
                <button
                    onClick={() => setFilter('ALL')}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === 'ALL'
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                >
                    All ({stamps.length})
                </button>
                {['LEGENDARY', 'EPIC', 'RARE', 'COMMON'].map((rarity) => (
                    <button
                        key={rarity}
                        onClick={() => setFilter(rarity)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === rarity
                                ? `${RARITY_CONFIG[rarity].bgColor} ${RARITY_CONFIG[rarity].textColor} border ${RARITY_CONFIG[rarity].borderColor}`
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        {RARITY_CONFIG[rarity].name} ({rarityCounts[rarity] || 0})
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="text-center py-12">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => setFilter('ALL')}
                        className="px-4 py-2 bg-teal-500 text-white rounded-xl"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && stamps.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                        <Star className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">
                        No Stamps Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Check in to events to start collecting stamps!
                    </p>
                </div>
            )}

            {/* Stamps Grid */}
            {!loading && stamps.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {stamps.map((stamp) => {
                        const config = RARITY_CONFIG[stamp.rarity] || RARITY_CONFIG.COMMON;
                        const isFavorite = favorites.has(stamp.id);

                        return (
                            <div
                                key={stamp.id}
                                className={`relative rounded-2xl border-2 ${config.borderColor} ${config.bgColor} ${config.glow} p-4 transition-all hover:scale-[1.02] cursor-pointer`}
                            >
                                {/* Favorite Button */}
                                <button
                                    onClick={() => toggleFavorite(stamp.id)}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                </button>

                                {/* Country Flag */}
                                <div className="text-4xl mb-3 text-center">
                                    {COUNTRY_FLAGS[stamp.countryCode] || COUNTRY_FLAGS.XX}
                                </div>

                                {/* Event Title */}
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm text-center truncate mb-1">
                                    {stamp.eventTitle}
                                </h4>

                                {/* Edition Number */}
                                <p className={`text-xs ${config.textColor} text-center font-medium uppercase tracking-wide`}>
                                    {config.name} #{stamp.editionNumber}
                                </p>

                                {/* Date and Location */}
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        <span>{formatDate(stamp.stampedAt)}</span>
                                    </div>
                                    {stamp.location && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{stamp.location}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Credits Earned */}
                                <div className="mt-2 text-center">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-medium">
                                        +{stamp.creditsEarned} credits
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
