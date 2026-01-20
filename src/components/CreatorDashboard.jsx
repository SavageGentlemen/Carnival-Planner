import React, { useState, useEffect } from 'react';
import {
    Sparkles, Link2, Copy, Check, ExternalLink, TrendingUp,
    MousePointer, Users, DollarSign, Loader2, AlertCircle,
    Plus, Share2, Globe
} from 'lucide-react';
import { doc, getDoc, setDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { bandDirectory } from '../data/bandDirectory';

// Generate partner links with affiliate code
const generatePartnerLinks = (affiliateCode, bands) => {
    if (!affiliateCode || !bands) return [];

    return bands
        .filter(band => band.website)
        .slice(0, 10)
        .map(band => ({
            id: `${band.carnivalId}-${band.name.toLowerCase().replace(/\s+/g, '-')}`,
            name: band.name,
            carnival: band.carnivalId,
            originalUrl: band.website,
            affiliateUrl: `${band.website}${band.website.includes('?') ? '&' : '?'}ref=${affiliateCode}`,
            tags: band.tags || []
        }));
};

export default function CreatorDashboard({ user, isPremium }) {
    const [loading, setLoading] = useState(true);
    const [affiliateData, setAffiliateData] = useState(null);
    const [applying, setApplying] = useState(false);
    const [copied, setCopied] = useState(null);
    const [error, setError] = useState('');

    // Load affiliate data
    useEffect(() => {
        if (!user) return;

        const loadAffiliateData = async () => {
            setLoading(true);
            try {
                // Check if user is already an affiliate
                const affiliateRef = doc(db, 'affiliates', user.uid);
                const affiliateSnap = await getDoc(affiliateRef);

                if (affiliateSnap.exists()) {
                    setAffiliateData({ id: affiliateSnap.id, ...affiliateSnap.data() });
                }
            } catch (err) {
                console.error('Error loading affiliate data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadAffiliateData();
    }, [user]);

    // Apply for creator program
    const handleApply = async () => {
        if (!user) return;

        setApplying(true);
        setError('');

        try {
            // Generate unique affiliate code
            const baseCode = (user.displayName || user.email?.split('@')[0] || 'creator')
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, '')
                .slice(0, 8);
            const affiliateCode = `${baseCode}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

            const affiliateData = {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
                affiliateCode,
                status: 'pending', // pending | approved | rejected
                stats: {
                    totalClicks: 0,
                    totalConversions: 0,
                    earnings: 0
                },
                partnerLinks: [],
                appliedAt: Timestamp.now()
            };

            await setDoc(doc(db, 'affiliates', user.uid), affiliateData);
            setAffiliateData({ id: user.uid, ...affiliateData });
        } catch (err) {
            console.error('Error applying:', err);
            setError('Failed to submit application. Please try again.');
        } finally {
            setApplying(false);
        }
    };

    // Copy affiliate link to clipboard
    const copyToClipboard = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    // Not an affiliate yet - show application CTA
    if (!affiliateData) {
        return (
            <div className="max-w-2xl mx-auto animate-fadeIn">
                <div className="text-center p-8 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-3xl shadow-2xl text-white">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6">
                        <Sparkles className="w-10 h-10 text-yellow-300" />
                    </div>
                    <h2 className="text-3xl font-black mb-3">Become a Creator</h2>
                    <p className="text-white/80 mb-8 max-w-md mx-auto">
                        Share your favorite carnival bands and fetes with your followers.
                        Get unique tracking links and see how many people you're inspiring!
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <Link2 className="w-6 h-6 mx-auto mb-2 text-purple-300" />
                            <p className="text-sm font-medium">Unique Links</p>
                        </div>
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-300" />
                            <p className="text-sm font-medium">Track Clicks</p>
                        </div>
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <Users className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                            <p className="text-sm font-medium">Grow Influence</p>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center justify-center gap-2 p-3 mb-4 bg-red-500/20 rounded-xl text-red-200 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleApply}
                        disabled={applying}
                        className="px-8 py-4 bg-white text-purple-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
                    >
                        {applying ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Apply to Join
                            </>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    // Pending approval
    if (affiliateData.status === 'pending') {
        return (
            <div className="max-w-2xl mx-auto animate-fadeIn">
                <div className="text-center p-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-3xl border-2 border-yellow-200 dark:border-yellow-800">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
                        <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Pending</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your creator application is under review. We'll notify you once approved!
                    </p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Your affiliate code: <span className="font-mono font-bold">{affiliateData.affiliateCode}</span>
                    </p>
                </div>
            </div>
        );
    }

    // Rejected
    if (affiliateData.status === 'rejected') {
        return (
            <div className="max-w-2xl mx-auto animate-fadeIn">
                <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-3xl border-2 border-red-200 dark:border-red-800">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Not Approved</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Unfortunately, your application wasn't approved at this time.
                        Please contact support for more information.
                    </p>
                </div>
            </div>
        );
    }

    // Approved - show full dashboard
    const partnerLinks = generatePartnerLinks(affiliateData.affiliateCode, bandDirectory);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                        Creator Dashboard
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Share your links and track your influence
                    </p>
                </div>
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        ✓ Approved Creator
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <MousePointer className="w-5 h-5 mb-2 text-purple-500" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {affiliateData.stats?.totalClicks || 0}
                    </p>
                    <p className="text-xs text-gray-500">Total Clicks</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <Users className="w-5 h-5 mb-2 text-blue-500" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {affiliateData.stats?.totalConversions || 0}
                    </p>
                    <p className="text-xs text-gray-500">Conversions</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <TrendingUp className="w-5 h-5 mb-2 text-green-500" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {partnerLinks.length}
                    </p>
                    <p className="text-xs text-gray-500">Partner Links</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-sm text-white">
                    <Sparkles className="w-5 h-5 mb-2" />
                    <p className="text-sm font-mono font-bold">{affiliateData.affiliateCode}</p>
                    <p className="text-xs opacity-80">Your Code</p>
                </div>
            </div>

            {/* Affiliate Code Section */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Your Affiliate Code</h3>
                        <p className="text-sm text-gray-500">Share this code or use the links below</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl font-mono text-lg font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                        {affiliateData.affiliateCode}
                    </div>
                    <button
                        onClick={() => copyToClipboard(affiliateData.affiliateCode, 'code')}
                        className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                    >
                        {copied === 'code' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Partner Links */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-blue-500" />
                    Partner Links
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Share these links with your followers. Clicks are automatically tracked!
                </p>

                <div className="space-y-3">
                    {partnerLinks.map((link) => (
                        <div
                            key={link.id}
                            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {link.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate font-mono">
                                    {link.affiliateUrl}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => copyToClipboard(link.affiliateUrl, link.id)}
                                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    title="Copy link"
                                >
                                    {copied === link.id ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-500" />
                                    )}
                                </button>
                                <a
                                    href={link.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                                    title="Open link"
                                >
                                    <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {partnerLinks.length === 0 && (
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                        <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">No partner links available yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
