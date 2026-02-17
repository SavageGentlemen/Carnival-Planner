import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

// Import Passport components
import PassportHome from './PassportHome';
import CheckinModal from './CheckinModal';
import StampCollection from './StampCollection';
import AchievementList from './AchievementList';
import PassportCard from './PassportCard';
import Leaderboard from './Leaderboard';
import RewardsList from './RewardsList';

export default function SocaPassportTab({ user, isPremium, activeCarnivalId, activePlanId, isDemoMode }) {
    const [currentView, setCurrentView] = useState('home'); // home, stamps, achievements, leaderboard
    const [showCheckinModal, setShowCheckinModal] = useState(false);
    const [showPassportCard, setShowPassportCard] = useState(false);
    const [profile, setProfile] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Load profile for sub-components
    useEffect(() => {
        if (!user) return;

        // DEMO MODE - Mock Profile
        if (isDemoMode) {
            setProfile({
                totalCredits: 1250,
                currentTier: 'GOLD',
                tierProgress: {
                    nextTier: 'PLATINUM',
                    creditsToNextTier: 750,
                    progressPercent: 62
                },
                totalEvents: 8,
                countriesVisited: ['TT', 'BB'],
                unlockedAchievements: ['first-checkin', 'island-hopper'],
                achievementPoints: 150,
                achievementDefinitions: {} // Populate if needed for AchievementList
            });
            return;
        }

        const loadProfile = async () => {
            try {
                const functions = getFunctions(app);
                const getProfile = httpsCallable(functions, 'getPassportProfile');
                const result = await getProfile();
                setProfile(result.data);
            } catch (err) {
                console.error('Error loading passport profile:', err);
            }
        };

        loadProfile();
    }, [user, refreshKey, isDemoMode]);

    // Handle successful check-in
    const handleCheckinSuccess = (result) => {
        setShowCheckinModal(false);
        setRefreshKey(prev => prev + 1); // Trigger refresh of passport data
    };

    // Render current view
    const renderView = () => {
        switch (currentView) {
            case 'stamps':
                return (
                    <StampCollection
                        user={user}
                        onBack={() => setCurrentView('home')}
                    />
                );
            case 'achievements':
                return (
                    <AchievementList
                        profile={profile}
                        onBack={() => setCurrentView('home')}
                    />
                );
            case 'leaderboard':
                return (
                    <Leaderboard
                        user={user}
                        onBack={() => setCurrentView('home')}
                    />
                );
            case 'rewards':
                return (
                    <RewardsList
                        user={user}
                        profile={profile}
                        onBack={() => setCurrentView('home')}
                    />
                );
            default:
                return (
                    <PassportHome
                        key={refreshKey}
                        user={user}
                        isPremium={isPremium}
                        activeCarnivalId={activeCarnivalId}
                        activePlanId={activePlanId}
                        isDemoMode={isDemoMode}
                        onOpenCheckin={() => setShowCheckinModal(true)}
                        onViewStamps={() => setCurrentView('stamps')}
                        onViewAchievements={() => setCurrentView('achievements')}
                        onViewLeaderboard={() => setCurrentView('leaderboard')}
                        onViewRewards={() => setCurrentView('rewards')}
                    />
                );
        }
    };

    return (
        <div className="min-h-[500px]">
            {/* Header with Share Button */}
            {currentView === 'home' && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                            <img src="/images/passport/icon_passport.png" alt="Soca Passport" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Soca Passport</h2>
                            <p className="text-sm text-gray-500">Your carnival journey</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowPassportCard(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
            )}

            {/* Main Content */}
            {renderView()}

            {/* Check-in Modal */}
            <CheckinModal
                isOpen={showCheckinModal}
                onClose={() => setShowCheckinModal(false)}
                onSuccess={handleCheckinSuccess}
            />

            {/* Passport Card Modal */}
            <PassportCard
                profile={profile}
                isOpen={showPassportCard}
                onClose={() => setShowPassportCard(false)}
            />
        </div>
    );
}
