/**
 * AffiliateDashboard.jsx — Referral program dashboard for Squad Leaders & Influencers
 *
 * Shows referral link, stats (clicks, signups, conversions, earnings),
 * commission history, and payout status.
 */
import { useState, useEffect } from 'react';
import {
    collection, query, where, getDocs, doc, getDoc, onSnapshot,
    addDoc, Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import {
    Link, Copy, Check, TrendingUp, Users, DollarSign, Eye,
    Share2, ExternalLink, Award, Loader2, MousePointer
} from 'lucide-react';

const APP_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'https://carnival-planner.web.app';

export default function AffiliateDashboard({ user }) {
    const [affiliateData, setAffiliateData] = useState(null);
    const [conversions, setConversions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [applying, setApplying] = useState(false);

    // Load affiliate profile
    useEffect(() => {
        if (!user?.uid) return;

        const unsub = onSnapshot(doc(db, 'affiliates', user.uid), (snap) => {
            if (snap.exists()) {
                setAffiliateData({ id: snap.id, ...snap.data() });
            } else {
                setAffiliateData(null);
            }
            setLoading(false);
        });

        return () => unsub();
    }, [user?.uid]);

    // Load conversions once affiliate data is available
    useEffect(() => {
        if (!affiliateData?.affiliateCode) return;

        const q = query(
            collection(db, 'affiliateConversions'),
            where('affiliateCode', '==', affiliateData.affiliateCode)
        );
        const unsub = onSnapshot(q, (snap) => {
            const list = [];
            snap.forEach(d => list.push({ id: d.id, ...d.data() }));
            list.sort((a, b) => (b.convertedAt?.toMillis?.() || 0) - (a.convertedAt?.toMillis?.() || 0));
            setConversions(list);
        });

        return () => unsub();
    }, [affiliateData?.affiliateCode]);

    // Copy referral link
    const handleCopy = () => {
        if (!affiliateData?.affiliateCode) return;
        const link = `${APP_ORIGIN}?ref=${affiliateData.affiliateCode}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Share referral link
    const handleShare = () => {
        if (!affiliateData?.affiliateCode) return;
        const link = `${APP_ORIGIN}?ref=${affiliateData.affiliateCode}`;
        if (navigator.share) {
            navigator.share({
                title: 'Caribbean Carnival Planner',
                text: 'Plan your carnival experience with me! Use my link to sign up:',
                url: link,
            }).catch(() => { });
        } else {
            handleCopy();
        }
    };

    // Apply to become affiliate
    const handleApply = async () => {
        if (!user) return;
        setApplying(true);
        try {
            // Generate a unique affiliate code from display name or uid
            const baseName = (user.displayName || user.email?.split('@')[0] || 'user')
                .replace(/[^a-zA-Z0-9]/g, '')
                .toUpperCase()
                .slice(0, 8);
            const code = `${baseName}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

            await addDoc(collection(db, 'affiliates'), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email,
                affiliateCode: code,
                commissionRate: 0.20, // 20% default
                status: 'pending',
                totalEarnings: 0,
                totalConversions: 0,
                appliedAt: Timestamp.now(),
            });
            // Note: the doc ID is auto-generated, but we query by uid/code
        } catch (err) {
            console.error('Apply error:', err);
            alert('Failed to apply: ' + err.message);
        }
        setApplying(false);
    };

    // ── Stats ──
    const totalEarnings = conversions.reduce((s, c) => s + (c.commission || 0), 0);
    const pendingEarnings = conversions
        .filter(c => c.payoutStatus !== 'paid')
        .reduce((s, c) => s + (c.commission || 0), 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            </div>
        );
    }

    // ── Not an affiliate yet ──
    if (!affiliateData) {
        return (
            <div className="max-w-lg mx-auto text-center space-y-6 py-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Become a Carnival Ambassador
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Share your unique referral link with your squad. When someone signs up for Premium
                    using your link, you earn <span className="font-bold text-purple-500">20% commission</span> on
                    their first payment.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-left space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">How it works:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Share your unique referral link</li>
                        <li>• Your friend signs up and goes Premium ($4.99/mo or $39.99/yr)</li>
                        <li>• You earn 20% commission on their first payment</li>
                        <li>• Commissions are paid out monthly</li>
                    </ul>
                </div>
                <button
                    onClick={handleApply}
                    disabled={applying}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                    {applying ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Applying...
                        </>
                    ) : (
                        <>
                            <Award className="w-5 h-5" /> Apply to Join
                        </>
                    )}
                </button>
            </div>
        );
    }

    // ── Pending approval ──
    if (affiliateData.status === 'pending') {
        return (
            <div className="max-w-lg mx-auto text-center space-y-4 py-8">
                <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Application Under Review</h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Your affiliate application is being reviewed. You'll get access to your referral
                    link once approved.
                </p>
            </div>
        );
    }

    // ── Rejected ──
    if (affiliateData.status === 'rejected') {
        return (
            <div className="max-w-lg mx-auto text-center space-y-4 py-8">
                <p className="text-gray-500 dark:text-gray-400">
                    Your application was not approved at this time. Contact support for details.
                </p>
            </div>
        );
    }

    // ── Active affiliate dashboard ──
    const referralLink = `${APP_ORIGIN}?ref=${affiliateData.affiliateCode}`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        Affiliate Dashboard
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Code: <span className="font-mono font-bold text-purple-600">{affiliateData.affiliateCode}</span>
                        {' · '}
                        {(affiliateData.commissionRate * 100).toFixed(0)}% commission
                    </p>
                </div>
            </div>

            {/* Referral Link */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Your Referral Link</p>
                <div className="flex items-center gap-2">
                    <input
                        type="text" readOnly value={referralLink}
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300"
                    />
                    <button onClick={handleCopy}
                        className={`p-2 rounded-lg transition ${copied
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                            }`}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={handleShare}
                        className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Conversions', value: conversions.length, icon: Users, color: 'text-blue-500' },
                    { label: 'Total Earned', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: 'text-green-500' },
                    { label: 'Pending', value: `$${pendingEarnings.toFixed(2)}`, icon: TrendingUp, color: 'text-orange-500' },
                    { label: 'Commission', value: `${(affiliateData.commissionRate * 100).toFixed(0)}%`, icon: Award, color: 'text-purple-500' },
                ].map(stat => (
                    <div key={stat.label}
                        className="bg-white dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
                        <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Conversion History */}
            <div className="bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Conversion History
                    </h4>
                </div>
                {conversions.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-600">
                        {conversions.map(conv => (
                            <div key={conv.id} className="flex items-center justify-between px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {conv.subscriberEmail ? conv.subscriberEmail.replace(/(.{2}).*(@)/, '$1***$2') : 'Premium Signup'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {conv.convertedAt?.toDate?.().toLocaleDateString() || 'N/A'}
                                        {conv.plan && ` · ${conv.plan}`}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                                        +${(conv.commission || 0).toFixed(2)}
                                    </p>
                                    <p className={`text-xs font-medium ${conv.payoutStatus === 'paid'
                                            ? 'text-green-500'
                                            : 'text-orange-500'
                                        }`}>
                                        {conv.payoutStatus === 'paid' ? 'Paid' : 'Pending'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No conversions yet — share your referral link!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
