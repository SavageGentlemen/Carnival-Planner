import React, { useState, useEffect } from 'react';
import {
    CreditCard, Trophy, MapPin, Star, Ticket, ChevronRight,
    Zap, Award, TrendingUp, Loader2, Sparkles, Gift
} from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

// Tier configuration with images
const TIER_CONFIG = {
    BRONZE: {
        name: 'Bronze',
        color: 'from-amber-600 to-amber-800',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        icon: '🥉',
        medalImage: '/images/passport/medal_bronze.png',
        bgImage: '/images/passport/bg_bronze.png'
    },
    SILVER: {
        name: 'Silver',
        color: 'from-gray-400 to-gray-600',
        textColor: 'text-gray-500',
        bgColor: 'bg-gray-100 dark:bg-gray-700/30',
        icon: '🥈',
        medalImage: '/images/passport/medal_silver.png',
        bgImage: '/images/passport/bg_silver.png'
    },
    GOLD: {
        name: 'Gold',
        color: 'from-yellow-400 to-amber-500',
        textColor: 'text-yellow-500',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: '🥇',
        medalImage: '/images/passport/medal_gold.png',
        bgImage: '/images/passport/bg_gold.png'
    },
    PLATINUM: {
        name: 'Platinum',
        color: 'from-purple-400 to-indigo-600',
        textColor: 'text-purple-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        icon: '💎',
        medalImage: '/images/passport/medal_platinum.png',
        bgImage: '/images/passport/bg_platinum.png'
    }
};

// Rarity colors
const RARITY_COLORS = {
    COMMON: 'border-gray-300 dark:border-gray-600',
    RARE: 'border-blue-400 dark:border-blue-500',
    EPIC: 'border-purple-500 dark:border-purple-400',
    LEGENDARY: 'border-yellow-400 dark:border-yellow-500'
};

export default function PassportHome({ user, isPremium, activeCarnivalId, onOpenCheckin, onViewStamps, onViewAchievements, onViewLeaderboard }) {
    const [profile, setProfile] = useState(null);
    const [recentStamps, setRecentStamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load passport profile and recent stamps
    useEffect(() => {
        if (!user) return;

        const loadPassportData = async () => {
            setLoading(true);
            setError(null);

            try {
                const functions = getFunctions(app);

                // Get profile
                const getProfile = httpsCallable(functions, 'getPassportProfile');
                const profileResult = await getProfile();
                setProfile(profileResult.data);

                // Get recent stamps (separate try-catch so profile still shows if stamps fail)
                try {
                    const getStamps = httpsCallable(functions, 'getPassportStamps');
                    const stampsResult = await getStamps({ limit: 5 });
                    setRecentStamps(stampsResult.data.stamps || []);
                } catch (stampsErr) {
                    console.warn('Error loading stamps (non-critical):', stampsErr);
                    setRecentStamps([]);
                }

            } catch (err) {
                console.error('Error loading passport data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPassportData();
    }, [user]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-pulse">
                <div className="p-4 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
                    <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">Loading your passport...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                    <CreditCard className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Unable to Load Passport</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const tier = TIER_CONFIG[profile?.currentTier || 'BRONZE'];
    const tierProgress = profile?.tierProgress || {};
    const achievements = profile?.unlockedAchievements || [];
    const achievementDefs = profile?.achievementDefinitions || {};

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Profile Header with Background Image */}
            <div
                className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl min-h-[180px]"
                style={{
                    backgroundImage: `url(${tier.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Fallback gradient overlay for better text readability */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-60`} />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {/* Medal Image */}
                            <div className="w-20 h-20 flex items-center justify-center">
                                <img
                                    src={tier.medalImage}
                                    alt={`${tier.name} Medal`}
                                    className="w-full h-full object-contain drop-shadow-lg"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight drop-shadow-md">SOCA PASSPORT</h2>
                                <p className="text-white/90 text-sm font-medium drop-shadow">{tier.name} Tier</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-black drop-shadow-md">{profile?.totalCredits || 0}</p>
                            <p className="text-xs text-white/80 uppercase tracking-wider font-medium">Credits</p>
                        </div>
                    </div>

                    {/* Tier Progress */}
                    {tierProgress.nextTier && (
                        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">{tier.name}</span>
                                <span className="text-white/90">
                                    {tierProgress.creditsToNextTier} to {tierProgress.nextTier}
                                </span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-500"
                                    style={{ width: `${tierProgress.progressPercent}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-teal-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile?.totalEvents || 0}</p>
                    <p className="text-xs text-gray-500">Events</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(profile?.countriesVisited || []).length}
                    </p>
                    <p className="text-xs text-gray-500">Countries</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{achievements.length}</p>
                    <p className="text-xs text-gray-500">Achievements</p>
                </div>
            </div>

            {/* Check-in CTA */}
            <button
                onClick={onOpenCheckin}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-2xl p-5 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-1 active:scale-[0.99]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6" />
                    <span className="text-lg font-bold">CHECK IN TO EVENT</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
            </button>

            {/* Recent Stamps */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Recent Stamps
                    </h3>
                    {recentStamps.length > 0 && (
                        <button
                            onClick={onViewStamps}
                            className="text-sm text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1"
                        >
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {recentStamps.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <Ticket className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">No stamps yet</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Check in to your first event!</p>
                    </div>
                ) : (
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                        {recentStamps.map((stamp) => (
                            <div
                                key={stamp.id}
                                className={`flex-shrink-0 w-24 h-24 rounded-2xl border-2 ${RARITY_COLORS[stamp.rarity]} bg-gray-50 dark:bg-gray-700 flex flex-col items-center justify-center p-2 text-center`}
                            >
                                <span className="text-2xl mb-1">
                                    {stamp.countryCode === 'TT' ? '🇹🇹' :
                                        stamp.countryCode === 'US' ? '🇺🇸' :
                                            stamp.countryCode === 'JM' ? '🇯🇲' :
                                                stamp.countryCode === 'BB' ? '🇧🇧' :
                                                    stamp.countryCode === 'LC' ? '🇱🇨' :
                                                        stamp.countryCode === 'VC' ? '🇻🇨' : '🎭'}
                                </span>
                                <p className="text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate w-full">
                                    {stamp.eventTitle}
                                </p>
                                <p className="text-[8px] text-gray-400 uppercase">{stamp.rarity}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Achievements Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Achievements
                        <span className="text-xs font-normal text-gray-400">
                            {achievements.length}/{Object.keys(achievementDefs).length}
                        </span>
                    </h3>
                    <button
                        onClick={onViewAchievements}
                        className="text-sm text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1"
                    >
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {Object.values(achievementDefs).map((achievement) => {
                        const isUnlocked = achievements.includes(achievement.id);
                        return (
                            <div
                                key={achievement.id}
                                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${isUnlocked
                                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 shadow-sm'
                                    : 'bg-gray-100 dark:bg-gray-700 opacity-40 grayscale'
                                    }`}
                                title={`${achievement.name}${isUnlocked ? ' ✓' : ''}`}
                            >
                                {achievement.icon}
                            </div>
                        );
                    })}
                </div>

                {profile?.achievementPoints > 0 && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-purple-500">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">{profile.achievementPoints} Achievement Points</span>
                    </div>
                )}
            </div>

            {/* Leaderboard Teaser */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Leaderboard</h3>
                            <p className="text-white/70 text-sm">See how you rank</p>
                        </div>
                    </div>
                    <button onClick={onViewLeaderboard} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                        View Rankings
                    </button>
                </div>
            </div>
        </div>
    );
}
