import React, { useState, useEffect } from 'react';
import {
    Trophy, Crown, Medal, ChevronLeft, Loader2, User,
    TrendingUp, Flame, Star, Award
} from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

// Tier badge configuration
const TIER_STYLES = {
    BRONZE: {
        bg: 'bg-gradient-to-r from-amber-600 to-amber-700',
        text: 'text-amber-100',
        border: 'border-amber-500'
    },
    SILVER: {
        bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
        text: 'text-gray-100',
        border: 'border-gray-400'
    },
    GOLD: {
        bg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
        text: 'text-yellow-100',
        border: 'border-yellow-400'
    },
    PLATINUM: {
        bg: 'bg-gradient-to-r from-purple-500 to-indigo-600',
        text: 'text-purple-100',
        border: 'border-purple-400'
    }
};

// Rank icons for top 3
const RANK_ICONS = {
    1: { icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    2: { icon: Medal, color: 'text-gray-300', bg: 'bg-gray-400/20' },
    3: { icon: Medal, color: 'text-amber-600', bg: 'bg-amber-600/20' }
};

export default function Leaderboard({ user, onBack }) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRank, setUserRank] = useState(null);

    useEffect(() => {
        const loadLeaderboard = async () => {
            setLoading(true);
            setError(null);

            try {
                const functions = getFunctions(app);
                const getLeaderboard = httpsCallable(functions, 'getPassportLeaderboard');
                const result = await getLeaderboard({ limit: 50 });
                setLeaderboard(result.data.leaderboard || []);

                // Find current user's rank
                if (user) {
                    const userIndex = result.data.leaderboard?.findIndex(
                        entry => entry.userId === user.uid
                    );
                    if (userIndex !== -1) {
                        setUserRank(userIndex + 1);
                    }
                }
            } catch (err) {
                console.error('Error loading leaderboard:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadLeaderboard();
    }, [user]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-pulse">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">Loading leaderboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                    <Trophy className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Unable to Load Leaderboard</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        Leaderboard
                    </h2>
                    <p className="text-sm text-gray-500">Top Carnival Passport Holders</p>
                </div>
                {userRank && (
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Your Rank</p>
                        <p className="text-2xl font-black text-purple-500">#{userRank}</p>
                    </div>
                )}
            </div>

            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
                <div className="flex items-end justify-center gap-2 mb-6 px-4">
                    {/* 2nd Place */}
                    <div className="flex-1 max-w-[120px]">
                        <div className="bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-t-2xl p-3 text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                2
                            </div>
                            <div className="w-12 h-12 mx-auto mb-2 mt-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                {leaderboard[1].profilePictureUrl ? (
                                    <img src={leaderboard[1].profilePictureUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">
                                {leaderboard[1].displayName}
                            </p>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">
                                {leaderboard[1].totalCredits}
                            </p>
                        </div>
                        <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-b-lg" />
                    </div>

                    {/* 1st Place */}
                    <div className="flex-1 max-w-[140px]">
                        <div className="bg-gradient-to-b from-yellow-300 to-amber-400 dark:from-yellow-500 dark:to-amber-600 rounded-t-2xl p-4 text-center relative shadow-lg">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <Crown className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
                            </div>
                            <div className="w-14 h-14 mx-auto mb-2 mt-4 rounded-full bg-white/80 dark:bg-gray-800 flex items-center justify-center overflow-hidden ring-4 ring-yellow-400/50">
                                {leaderboard[0].profilePictureUrl ? (
                                    <img src={leaderboard[0].profilePictureUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-7 h-7 text-gray-400" />
                                )}
                            </div>
                            <p className="text-sm font-bold text-amber-900 dark:text-white truncate">
                                {leaderboard[0].displayName}
                            </p>
                            <p className="text-xl font-black text-amber-800 dark:text-yellow-100">
                                {leaderboard[0].totalCredits}
                            </p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${TIER_STYLES[leaderboard[0].currentTier || 'BRONZE'].bg} ${TIER_STYLES[leaderboard[0].currentTier || 'BRONZE'].text}`}>
                                {leaderboard[0].currentTier}
                            </span>
                        </div>
                        <div className="h-24 bg-yellow-400 dark:bg-yellow-600 rounded-b-lg" />
                    </div>

                    {/* 3rd Place */}
                    <div className="flex-1 max-w-[120px]">
                        <div className="bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-700 dark:to-amber-800 rounded-t-2xl p-3 text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                3
                            </div>
                            <div className="w-12 h-12 mx-auto mb-2 mt-4 rounded-full bg-amber-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                {leaderboard[2].profilePictureUrl ? (
                                    <img src={leaderboard[2].profilePictureUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            <p className="text-xs font-medium text-amber-800 dark:text-amber-100 truncate">
                                {leaderboard[2].displayName}
                            </p>
                            <p className="text-lg font-bold text-amber-900 dark:text-white">
                                {leaderboard[2].totalCredits}
                            </p>
                        </div>
                        <div className="h-10 bg-amber-400 dark:bg-amber-700 rounded-b-lg" />
                    </div>
                </div>
            )}

            {/* Full Rankings List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <span className="font-bold text-gray-800 dark:text-white">All Rankings</span>
                    <span className="text-sm text-gray-400">({leaderboard.length} users)</span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {leaderboard.map((entry, index) => {
                        const rank = index + 1;
                        const isCurrentUser = user && entry.userId === user.uid;
                        const rankConfig = RANK_ICONS[rank];
                        const tierStyle = TIER_STYLES[entry.currentTier || 'BRONZE'];

                        return (
                            <div
                                key={entry.userId}
                                className={`flex items-center gap-4 p-4 transition-colors ${isCurrentUser
                                        ? 'bg-purple-50 dark:bg-purple-900/20'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                {/* Rank */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${rankConfig
                                        ? `${rankConfig.bg} ${rankConfig.color}`
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                    }`}>
                                    {rankConfig ? (
                                        <rankConfig.icon className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm">{rank}</span>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                    {entry.profilePictureUrl ? (
                                        <img src={entry.profilePictureUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>

                                {/* Name & Stats */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className={`font-medium truncate ${isCurrentUser
                                                ? 'text-purple-600 dark:text-purple-400'
                                                : 'text-gray-800 dark:text-white'
                                            }`}>
                                            {entry.displayName}
                                            {isCurrentUser && <span className="ml-1 text-xs">(You)</span>}
                                        </p>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tierStyle.bg} ${tierStyle.text}`}>
                                            {entry.currentTier}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            {entry.totalEvents} events
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Award className="w-3 h-3" />
                                            {entry.achievementCount} badges
                                        </span>
                                    </div>
                                </div>

                                {/* Credits */}
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {entry.totalCredits.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400">credits</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {leaderboard.length === 0 && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <Trophy className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No rankings yet</p>
                        <p className="text-sm text-gray-400">Be the first to check in and earn credits!</p>
                    </div>
                )}
            </div>

            {/* Motivational Footer */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-5 text-white text-center">
                <Flame className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Keep the vibes going!</h3>
                <p className="text-white/80 text-sm">Check in to more events to climb the leaderboard</p>
            </div>
        </div>
    );
}
