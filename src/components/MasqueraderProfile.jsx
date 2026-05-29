import React, { useState, useEffect } from 'react';
import {
    User, MapPin, Users, Calendar, Instagram, Twitter,
    Globe, Edit2, Share2, Shield, ShieldCheck,
    Music, PartyPopper, Plane, Ticket, Wallet, ExternalLink, Box, BookOpen
} from 'lucide-react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { truncateAddress, getExplorerUrl } from '../services/web3Service';
import { QRCodeSVG } from 'qrcode.react';
import GuidesCarousel from './GuidesCarousel';

// Country flag emoji mapping
const COUNTRY_FLAGS = {
    'trinidad': '🇹🇹', 'jamaica': '🇯🇲', 'barbados': '🇧🇧', 'grenada': '🇬🇩',
    'stlucia': '🇱🇨', 'antigua': '🇦🇬', 'bahamas': '🇧🇸', 'bermuda': '🇧🇲',
    'stmaarten': '🇸🇽', 'stkitts-sugar-mas': '🇰🇳', 'nevis': '🇰🇳', 'dominica': '🇩🇲',
    'vincymas': '🇻🇨', 'stthomas': '🇻🇮', 'stcroix': '🇻🇮', 'guyana': '🇬🇾',
    'miami': '🇺🇸', 'atlanta': '🇺🇸', 'ny-labor-day': '🇺🇸', 'hollywood': '🇺🇸',
    'tampa': '🇺🇸', 'toronto': '🇨🇦', 'nottinghill': '🇬🇧', 'japan': '🇯🇵',
    'cayman-batabano': '🇰🇾', 'tobago': '🇹🇹', 'caymas': '🇺🇸'
};

const CARNIVAL_NAMES = {
    'trinidad': 'Trinidad', 'jamaica': 'Jamaica', 'barbados': 'Crop Over',
    'grenada': 'Spicemas', 'stlucia': 'St. Lucia', 'antigua': 'Antigua',
    'miami': 'Miami', 'toronto': 'Caribana', 'nottinghill': 'Notting Hill',
    'vincymas': 'Vincy Mas', 'stmaarten': 'St. Maarten', 'atlanta': 'Atlanta',
    'ny-labor-day': 'NY Labor Day', 'bahamas': 'Bahamas', 'bermuda': 'Bermuda'
};

export default function MasqueraderProfile({
    profileData,
    isOwnProfile,
    onEdit,
    currentUser
}) {
    const [loading, setLoading] = useState(false);
    const [requestingBandOS, setRequestingBandOS] = useState(false);
    const [bandOSRequested, setBandOSRequested] = useState(false);
    const [playbookOpen, setPlaybookOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    if (!profileData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 dark:text-gray-400">
                <User className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Profile not found</p>
                <p className="text-sm">This masquerader hasn't created a public profile yet.</p>
            </div>
        );
    }

    const {
        displayName = 'Carnival Lover',
        username,
        bio = '',
        profilePhoto,
        coverPhoto,
        isPublic,
        carnivalHistory = [],
        stats = {},
        socialLinks = {},
        walletAddress,
        mintedStampCount = 0,
        mintedAchievementCount = 0,
        isBandLeader = false,
        onAccessBandLeader
    } = profileData;

    const countriesVisited = [...new Set(carnivalHistory.map(c => c.carnivalId))];

    const handleRequestBandOS = async () => {
        if (!currentUser) return;
        setRequestingBandOS(true);
        try {
            await setDoc(doc(db, 'bandOSRequests', currentUser.uid), {
                email: currentUser.email,
                displayName: displayName || currentUser.displayName,
                appliedAt: Timestamp.now(),
                status: 'pending'
            });
            setBandOSRequested(true);
            alert("BandOS access requested! An admin will review your account.");
        } catch (err) {
            console.error("Failed to request BandOS:", err);
            alert("Failed to submit request: " + err.message);
        } finally {
            setRequestingBandOS(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            {/* Cover Photo */}
            <div className="relative h-48 md:h-64 rounded-t-3xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                {coverPhoto && (
                    <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Edit & Promoter Actions */}
                {isOwnProfile && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                            onClick={profileData.onAccessPromoter}
                            className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold hover:bg-white/30 transition-colors flex items-center gap-1.5"
                        >
                            <Ticket className="w-3.5 h-3.5" />
                            {profileData.isPromoter ? 'Promoter Dashboard' : 'Become a Promoter'}
                        </button>
                        {profileData.isBandLeader ? (
                            <button
                                onClick={profileData.onAccessBandLeader}
                                className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold hover:bg-white/30 transition-colors flex items-center gap-1.5"
                            >
                                <Box className="w-3.5 h-3.5" />
                                BandOS Dashboard
                            </button>
                        ) : (
                            <button
                                onClick={handleRequestBandOS}
                                disabled={requestingBandOS || bandOSRequested}
                                className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold hover:bg-white/30 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            >
                                <Box className="w-3.5 h-3.5" />
                                {bandOSRequested ? 'BandOS Requested' : 'Request BandOS Access'}
                            </button>
                        )}
                        <button
                            onClick={onEdit}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                        >
                            <Edit2 className="w-5 h-5 text-white" />
                        </button>
                    </div>
                )}

                {/* Privacy Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    {isPublic ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full text-green-200 text-xs font-medium">
                            <Globe className="w-3.5 h-3.5" /> Public
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-500/20 backdrop-blur-md rounded-full text-gray-200 text-xs font-medium">
                            <Shield className="w-3.5 h-3.5" /> Private
                        </span>
                    )}
                </div>
            </div>

            {/* Profile Header */}
            <div className="relative px-6 pb-6 bg-white dark:bg-gray-800 rounded-b-3xl shadow-lg">
                {/* Avatar */}
                <div className="absolute -top-16 left-6">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Name & Bio */}
                <div className="pt-20 md:pt-6 md:ml-40">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                {displayName}
                            </h1>
                            {username && (
                                <p className="text-gray-500 dark:text-gray-400">@{username}</p>
                            )}
                        </div>

                        {/* Wallet Badge */}
                        <div className="flex gap-3 items-center">
                            {walletAddress ? (
                                <a
                                    href={getExplorerUrl(walletAddress, 'address')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                                >
                                    <Wallet className="w-3.5 h-3.5" />
                                    {truncateAddress(walletAddress)}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            ) : isOwnProfile && (
                                <button
                                    onClick={onEdit}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-xs font-bold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/25 animate-pulse"
                                >
                                    <Wallet className="w-3.5 h-3.5" />
                                    Connect Wallet
                                </button>
                            )}
                            {socialLinks.instagram && (
                                <a
                                    href={`https://instagram.com/${socialLinks.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400 hover:scale-110 transition-transform"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a
                                    href={`https://twitter.com/${socialLinks.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 dark:text-blue-400 hover:scale-110 transition-transform"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.tiktok && (
                                <a
                                    href={`https://tiktok.com/@${socialLinks.tiktok}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
                                >
                                    <Music className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {bio && (
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl">{bio}</p>
                    )}
                </div>

                {/* Stats Row */}
                <div className="mt-6 grid grid-cols-4 gap-3">
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                        <PartyPopper className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{carnivalHistory.length}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Carnivals</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl">
                        <Plane className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{countriesVisited.length}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Countries</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl">
                        <Users className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {[...new Set(carnivalHistory.map(c => c.band).filter(Boolean))].length}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bands</p>
                    </div>
                    {walletAddress && (
                        <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl">
                            <Wallet className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{mintedStampCount + mintedAchievementCount}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">On-Chain</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Official Costume QR Codes (Road Mode Sync) */}
            {isOwnProfile && profileData.officialPurchases && profileData.officialPurchases.length > 0 && (
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-purple-100 dark:border-purple-900/30">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Box className="w-5 h-5 text-purple-500" />
                        Official Costume Claims
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profileData.officialPurchases.map(order => (
                            <div key={order.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                <div className="bg-white p-2 rounded-xl shrink-0">
                                    <QRCodeSVG value={`ORDER_ID:${order.id}`} size={80} level="H" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white capitalize">{order.listingTitle}</h3>
                                    <p className="text-xs text-gray-500 mb-2">Band: {order.sellerName || 'Official Band'}</p>
                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${order.distributionStatus === 'Distributed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {order.distributionStatus || 'Pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Carnival History */}
            {carnivalHistory.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        Carnival History
                    </h2>
                    <div className="grid gap-3">
                        {carnivalHistory.sort((a, b) => (b.year || 0) - (a.year || 0)).map((carnival, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                <div className="text-3xl">
                                    {COUNTRY_FLAGS[carnival.carnivalId] || '🎭'}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {CARNIVAL_NAMES[carnival.carnivalId] || carnival.carnivalId}
                                        {carnival.year && <span className="text-gray-400 font-normal ml-2">{carnival.year}</span>}
                                    </p>
                                    {carnival.band && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {carnival.band}
                                            {carnival.section && <span className="ml-1">• {carnival.section}</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Countries Visited (Flags) */}
            {countriesVisited.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-pink-500" />
                        Countries Visited
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {[...new Set(countriesVisited.map(c => COUNTRY_FLAGS[c] || '🏳️'))].map((flag, idx) => (
                            <span key={idx} className="text-4xl hover:scale-125 transition-transform cursor-default">
                                {flag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Help & Guides */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-900/30">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    Help & Guides
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div onClick={() => { setInitialSlide(0); setPlaybookOpen(true); }} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-gray-100 dark:border-gray-700">
                        <img src="/guides/playbook_squad.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Build a Squad" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest block mb-0.5">Step 1</span>
                            <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">Build a Squad</h3>
                        </div>
                    </div>
                    <div onClick={() => { setInitialSlide(1); setPlaybookOpen(true); }} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-gray-100 dark:border-gray-700">
                        <img src="/guides/playbook_sell.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sell Costumes" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block mb-0.5">Step 2</span>
                            <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">Sell Costumes</h3>
                        </div>
                    </div>
                    <div onClick={() => { setInitialSlide(2); setPlaybookOpen(true); }} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-gray-100 dark:border-gray-700">
                        <img src="/guides/playbook_ar.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="AR Viewer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block mb-0.5">Step 3</span>
                            <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">AR Viewer</h3>
                        </div>
                    </div>
                    <div onClick={() => { setInitialSlide(3); setPlaybookOpen(true); }} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-gray-100 dark:border-gray-700">
                        <img src="/guides/playbook_bandos.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="BandOS" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block mb-0.5">Step 4</span>
                            <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">BandOS</h3>
                        </div>
                    </div>
                </div>
            </div>

            <GuidesCarousel
                isOpen={playbookOpen}
                onClose={() => setPlaybookOpen(false)}
                initialSlide={initialSlide}
                isBandLeader={isBandLeader || profileData?.bandLeaderStatus === 'approved'}
            />
        </div>
    );
}
