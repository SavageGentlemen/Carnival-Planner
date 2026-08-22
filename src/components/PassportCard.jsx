import React, { useRef, useState } from 'react';
import { Download, Share2, Copy, Check, X, Sparkles, Trophy, MapPin, Ticket } from 'lucide-react';
import html2canvas from 'html2canvas';
import { HolographicCard, LiquidButton } from './threeui';

// Tier configuration for card styling
const TIER_STYLES = {
    BRONZE: {
        gradient: 'from-amber-700 via-amber-600 to-orange-700',
        accent: 'bg-amber-400',
        icon: '🥉'
    },
    SILVER: {
        gradient: 'from-slate-400 via-gray-300 to-slate-500',
        accent: 'bg-gray-300',
        icon: '🥈'
    },
    GOLD: {
        gradient: 'from-yellow-500 via-amber-400 to-yellow-600',
        accent: 'bg-yellow-300',
        icon: '🥇'
    },
    PLATINUM: {
        gradient: 'from-purple-600 via-indigo-500 to-fuchsia-600',
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
    const tierStyle = TIER_STYLES[tier] || TIER_STYLES.BRONZE;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-30"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Card Preview */}
                <div className="p-6">
                    <div className="text-center mb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 px-3 py-1 bg-cyan-950/60 border border-cyan-400/30 rounded-full">
                            Interactive Holographic Pass
                        </span>
                        <h3 className="text-xl font-black text-white mt-2 font-heading">
                            Your Soca Passport
                        </h3>
                    </div>

                    {/* 3D Holographic Card Wrapper */}
                    <HolographicCard tier={tier} enableGlare={true} enableHoloFoil={true}>
                        <div
                            ref={cardRef}
                            className={`relative bg-gradient-to-br ${tierStyle.gradient} rounded-2xl p-6 text-white shadow-xl overflow-hidden aspect-[1.586/1] border border-white/20`}
                        >
                            {/* Decorative Pattern */}
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                                <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-white rounded-full translate-x-1/4 translate-y-1/4" />
                                <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
                            </div>

                            {/* Header */}
                            <div className="relative flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm text-xl shadow-inner">
                                        {tierStyle.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Soca Passport</p>
                                        <p className="text-sm font-black tracking-wide">{tier} TIER</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-white drop-shadow">{profile?.totalCredits || 0}</p>
                                    <p className="text-[10px] text-white/80 uppercase tracking-widest">Credits</p>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="relative mb-4">
                                <p className="text-xl font-black truncate text-white drop-shadow">
                                    {profile?.displayName || 'Carnival Lover'}
                                </p>
                            </div>

                            {/* Stats Row */}
                            <div className="relative grid grid-cols-3 gap-2 mb-4">
                                <div className="bg-black/20 backdrop-blur-md rounded-xl p-2 text-center border border-white/10">
                                    <Ticket className="w-4 h-4 mx-auto mb-1 opacity-90 text-cyan-300" />
                                    <p className="text-lg font-black">{profile?.totalEvents || 0}</p>
                                    <p className="text-[8px] uppercase tracking-wider opacity-80 font-bold">Events</p>
                                </div>
                                <div className="bg-black/20 backdrop-blur-md rounded-xl p-2 text-center border border-white/10">
                                    <MapPin className="w-4 h-4 mx-auto mb-1 opacity-90 text-amber-300" />
                                    <p className="text-lg font-black">{(profile?.countriesVisited || []).length}</p>
                                    <p className="text-[8px] uppercase tracking-wider opacity-80 font-bold">Countries</p>
                                </div>
                                <div className="bg-black/20 backdrop-blur-md rounded-xl p-2 text-center border border-white/10">
                                    <Trophy className="w-4 h-4 mx-auto mb-1 opacity-90 text-pink-300" />
                                    <p className="text-lg font-black">{(profile?.unlockedAchievements || []).length}</p>
                                    <p className="text-[8px] uppercase tracking-wider opacity-80 font-bold">Badges</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                                    <span className="text-[10px] font-bold text-white/90 tracking-wide">Caribbean Carnival Planner</span>
                                </div>
                                <p className="text-[10px] font-mono text-white/70">
                                    {new Date().getFullYear()}
                                </p>
                            </div>
                        </div>
                    </HolographicCard>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                    <LiquidButton
                        variant="cyan"
                        size="md"
                        onClick={handleDownload}
                        disabled={downloading}
                        loading={downloading}
                        icon={Download}
                    >
                        Download
                    </LiquidButton>

                    <LiquidButton
                        variant="glass"
                        size="md"
                        onClick={handleShare}
                        icon={copied ? Check : Share2}
                    >
                        {copied ? 'Copied!' : 'Share Pass'}
                    </LiquidButton>
                </div>

                {/* Footer Hint */}
                <p className="px-6 pb-4 text-[11px] text-gray-400 text-center">
                    ✨ Tilt or move your cursor across the card for holographic shimmer.
                </p>
            </div>
        </div>
    );
}

