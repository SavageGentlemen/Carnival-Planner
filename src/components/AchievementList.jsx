import React from 'react';
import { Award, Lock, Check, ChevronLeft, Sparkles } from 'lucide-react';

// Achievement configuration with full details
const ACHIEVEMENTS_CONFIG = {
    first_stamp: {
        id: 'first_stamp',
        name: 'First Steps',
        description: 'Claim your first stamp',
        icon: '🎟️',
        category: 'MILESTONE',
        points: 50,
        criteria: { type: 'EVENT_COUNT', target: 1 }
    },
    island_hopper: {
        id: 'island_hopper',
        name: 'Island Hopper',
        description: 'Check in at 3 different countries',
        icon: '🌊',
        category: 'TRAVEL',
        points: 500,
        criteria: { type: 'COUNTRY_COUNT', target: 3 }
    },
    sunrise_warrior: {
        id: 'sunrise_warrior',
        name: 'Sunrise Warrior',
        description: 'Check in at 5 J\'ouvert or early morning events',
        icon: '🌅',
        category: 'EVENTS',
        points: 300,
        criteria: { type: 'EVENT_TYPE', target: 5 }
    },
    loyal_fan: {
        id: 'loyal_fan',
        name: 'Loyal Fan',
        description: 'Check in to 10 events total',
        icon: '⭐',
        category: 'MILESTONE',
        points: 250,
        criteria: { type: 'EVENT_COUNT', target: 10 }
    },
    tier_up: {
        id: 'tier_up',
        name: 'Moving Up',
        description: 'Reach Silver tier',
        icon: '📈',
        category: 'MILESTONE',
        points: 200,
        criteria: { type: 'TIER_REACHED', target: 'SILVER' }
    }
};

// Category colors
const CATEGORY_COLORS = {
    MILESTONE: 'from-blue-500 to-indigo-500',
    TRAVEL: 'from-teal-500 to-cyan-500',
    EVENTS: 'from-orange-500 to-amber-500',
    SOCIAL: 'from-pink-500 to-rose-500'
};

export default function AchievementList({ profile, onBack }) {
    const unlockedAchievements = profile?.unlockedAchievements || [];
    const achievementPoints = profile?.achievementPoints || 0;
    const totalEvents = profile?.totalEvents || 0;
    const countriesCount = (profile?.countriesVisited || []).length;
    const currentTier = profile?.currentTier || 'BRONZE';
    const eventTypeStats = profile?.eventTypeStats || {};

    // Calculate progress for each achievement
    const getProgress = (achievement) => {
        const { criteria } = achievement;
        let current = 0;
        let target = criteria.target;

        switch (criteria.type) {
            case 'EVENT_COUNT':
                current = totalEvents;
                break;
            case 'COUNTRY_COUNT':
                current = countriesCount;
                break;
            case 'TIER_REACHED':
                const tierOrder = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];
                const currentIndex = tierOrder.indexOf(currentTier);
                const targetIndex = tierOrder.indexOf(criteria.target);
                current = currentIndex >= targetIndex ? 1 : 0;
                target = 1;
                break;
            case 'EVENT_TYPE':
                // Sum up event types that match (jouvert, breakfast, early_morning)
                current = (eventTypeStats.jouvert || 0) +
                    (eventTypeStats.breakfast || 0) +
                    (eventTypeStats.early_morning || 0);
                break;
            default:
                current = 0;
        }

        return {
            current: Math.min(current, target),
            target,
            percent: Math.min(100, Math.floor((current / target) * 100))
        };
    };

    const achievements = Object.values(ACHIEVEMENTS_CONFIG).map(achievement => ({
        ...achievement,
        isUnlocked: unlockedAchievements.includes(achievement.id),
        progress: getProgress(achievement)
    }));

    const unlockedCount = achievements.filter(a => a.isUnlocked).length;

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
                        <Award className="w-6 h-6 text-purple-500" />
                        Achievements
                    </h2>
                    <p className="text-sm text-gray-500">{unlockedCount}/{achievements.length} unlocked</p>
                </div>
            </div>

            {/* Total Points Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white mb-6 shadow-lg shadow-purple-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-purple-200 text-sm">Total Points Earned</p>
                        <p className="text-4xl font-black">{achievementPoints}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Sparkles className="w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={`relative bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden transition-all ${achievement.isUnlocked
                                ? 'border-purple-200 dark:border-purple-800 shadow-sm'
                                : 'border-gray-200 dark:border-gray-700 opacity-75'
                            }`}
                    >
                        {/* Category Gradient Bar */}
                        <div className={`h-1 bg-gradient-to-r ${CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.MILESTONE}`} />

                        <div className="p-4">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${achievement.isUnlocked
                                        ? 'bg-purple-100 dark:bg-purple-900/30'
                                        : 'bg-gray-100 dark:bg-gray-700 grayscale'
                                    }`}>
                                    {achievement.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className={`font-bold ${achievement.isUnlocked
                                                    ? 'text-gray-900 dark:text-white'
                                                    : 'text-gray-600 dark:text-gray-400'
                                                }`}>
                                                {achievement.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {achievement.description}
                                            </p>
                                        </div>

                                        {/* Status Badge */}
                                        {achievement.isUnlocked ? (
                                            <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium">
                                                <Check className="w-3 h-3" />
                                                Unlocked
                                            </div>
                                        ) : (
                                            <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-lg text-xs font-medium">
                                                <Lock className="w-3 h-3" />
                                                Locked
                                            </div>
                                        )}
                                    </div>

                                    {/* Progress Bar (if not unlocked) */}
                                    {!achievement.isUnlocked && (
                                        <div className="mt-3">
                                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                <span>Progress</span>
                                                <span>{achievement.progress.current}/{achievement.progress.target}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.MILESTONE} transition-all duration-500`}
                                                    style={{ width: `${achievement.progress.percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Points */}
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${achievement.isUnlocked
                                                ? 'text-purple-600 dark:text-purple-400'
                                                : 'text-gray-400'
                                            }`}>
                                            <Sparkles className="w-3 h-3" />
                                            {achievement.isUnlocked ? `+${achievement.points} points earned` : `${achievement.points} points`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coming Soon Teaser */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">More achievements coming soon!</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Squad Leader • Ocean Voyager • Carnival Royalty • and more...
                </p>
            </div>
        </div>
    );
}
