import React, { useRef, useState } from 'react';
import { Download, Share2, Copy, Check, X, Sparkles, Trophy, MapPin, Ticket } from 'lucide-react';
import html2canvas from 'html2canvas';

// Tier configuration for card styling
const TIER_STYLES = {
    BRONZE: {
        gradient: 'from-amber-600 via-amber-500 to-orange-600',
        accent: 'bg-amber-400',
        icon: '🥉'
    },
    SILVER: {
        gradient: 'from-gray-400 via-gray-300 to-slate-400',
        accent: 'bg-gray-300',
        icon: '🥈'
    },
    GOLD: {
        gradient: 'from-yellow-400 via-amber-400 to-yellow-500',
        accent: 'bg-yellow-300',
        icon: '🥇'
    },
    PLATINUM: {
        gradient: 'from-purple-500 via-indigo-500 to-purple-600',
        accent: 'bg-purple-400',
        icon: '💎'
    }
};

export default function PassportCard({ profile, isOpen, onClose }) {
    const cardRef = useRef(null);
    const [downloading, setDownloading] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const tier = profile?.currentTier || 'BRONZE';
    const tierStyle = TIER_STYLES[tier];

    const handleDownload = async () => {
        if (!cardRef.current) return;

        setDownloading(true);
        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: null,
                useCORS: true
            });

            const link = document.createElement('a');
            link.download = `soca-passport-${profile?.displayName?.replace(/\s+/g, '-').toLowerCase() || 'card'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Error generating card:', err);
            alert('Could not download card. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'My Soca Passport',
            text: `I'm a ${tier} tier carnivalist with ${profile?.totalCredits || 0} credits! Check out my Soca Passport on Caribbean Carnival Planner.`,
            url: window.location.origin
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share error:', err);
                }
            }
        } else {
            // Fallback: copy link
            handleCopyLink();
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.origin);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy error:', err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Card Preview */}
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                        Your Passport Card
                    </h3>

                    {/* The Actual Card */}
                    <div
                        ref={cardRef}
                        className={`relative bg-gradient-to-br ${tierStyle.gradient} rounded-2xl p-6 text-white shadow-xl overflow-hidden aspect-[1.586/1]`}
                    >
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-white rounded-full translate-x-1/4 translate-y-1/4" />
                            <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        {/* Header */}
                        <div className="relative flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm text-xl">
                                    {tierStyle.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider">Soca Passport</p>
                                    <p className="text-sm font-bold">{tier} TIER</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black">{profile?.totalCredits || 0}</p>
                                <p className="text-[10px] text-white/70 uppercase">Credits</p>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="relative mb-4">
                            <p className="text-xl font-black truncate">
                                {profile?.displayName || 'Carnival Lover'}
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="relative grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
                                <Ticket className="w-4 h-4 mx-auto mb-1 opacity-80" />
                                <p className="text-lg font-bold">{profile?.totalEvents || 0}</p>
                                <p className="text-[8px] uppercase opacity-70">Events</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
                                <MapPin className="w-4 h-4 mx-auto mb-1 opacity-80" />
                                <p className="text-lg font-bold">{(profile?.countriesVisited || []).length}</p>
                                <p className="text-[8px] uppercase opacity-70">Countries</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
                                <Trophy className="w-4 h-4 mx-auto mb-1 opacity-80" />
                                <p className="text-lg font-bold">{(profile?.unlockedAchievements || []).length}</p>
                                <p className="text-[8px] uppercase opacity-70">Badges</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3 opacity-70" />
                                <span className="text-[10px] font-medium opacity-70">Caribbean Carnival Planner</span>
                            </div>
                            <p className="text-[10px] font-mono opacity-50">
                                {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center justify-center gap-2 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                    >
                        {downloading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download className="w-5 h-5" />
                        )}
                        Download
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 text-green-500" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Share2 className="w-5 h-5" />
                                Share
                            </>
                        )}
                    </button>
                </div>

                {/* Note about html2canvas */}
                <p className="px-6 pb-4 text-xs text-gray-400 text-center">
                    Note: For best results, download requires the html2canvas library.
                </p>
            </div>
        </div>
    );
}
