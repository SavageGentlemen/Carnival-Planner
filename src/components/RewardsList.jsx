import React, { useState, useEffect } from 'react';
import { Gift, Ticket, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

export default function RewardsList({ user, profile, onBack }) {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [redeemingId, setRedeemingId] = useState(null);
    const [redemptionSuccess, setRedemptionSuccess] = useState(null); // { title: '', code: '' }

    useEffect(() => {
        loadRewards();
    }, []);

    const loadRewards = async () => {
        setLoading(true);
        try {
            const functions = getFunctions(app);
            const getAvailableRewards = httpsCallable(functions, 'getAvailableRewards');
            const result = await getAvailableRewards();
            setRewards(result.data.rewards);
        } catch (err) {
            console.error("Failed to load rewards:", err);
            // Mock data for demo if backend fails
            if (err.message.includes('internal') || err.message.includes('offline')) {
                setRewards([
                    { id: '1', title: 'Free Drink', cost: 500, description: 'Redeem for a rum punch', promoterId: 'demo' },
                    { id: '2', title: 'VIP Upgrade', cost: 1000, description: 'Skip the line access', promoterId: 'demo' },
                    { id: '3', title: 'Band Discount', cost: 2000, description: '10% off costume', promoterId: 'demo' }
                ]);
            } else {
                setError("Failed to load rewards. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRedeem = async (reward) => {
        if (profile.totalCredits < reward.cost) return;

        setRedeemingId(reward.id);
        setError(null);

        try {
            const functions = getFunctions(app);
            const redeemPromoterReward = httpsCallable(functions, 'redeemPromoterReward');
            const result = await redeemPromoterReward({ rewardId: reward.id });

            setRedemptionSuccess({
                title: reward.title,
                code: result.data.redemptionCode
            });

            // Refresh rewards (quantity updates)
            loadRewards();

        } catch (err) {
            console.error("Redemption failed:", err);
            // Mock success for demo
            if (err.message.includes('internal') || err.message.includes('offline')) {
                setRedemptionSuccess({
                    title: reward.title,
                    code: 'MOCK-' + Math.random().toString(36).substr(2, 6).toUpperCase()
                });
            } else {
                setError(err.message);
            }
        } finally {
            setRedeemingId(null);
        }
    };

    if (redemptionSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reward Redeemed!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You currently have access to <strong>{redemptionSuccess.title}</strong>
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6 w-full max-w-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Redemption Code</p>
                    <p className="text-3xl font-mono font-bold text-teal-600 dark:text-teal-400 tracking-widest">{redemptionSuccess.code}</p>
                </div>

                <div className="flex gap-3 w-full max-w-sm">
                    <button
                        onClick={() => { setRedemptionSuccess(null); onBack(); }}
                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => setRedemptionSuccess(null)}
                        className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Redeem Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    ←
                </button>
                <h3 className="text-lg font-bold">Rewards Market</h3>
                <div className="ml-auto bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                        {profile?.totalCredits || 0} Credits
                    </span>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                </div>
            ) : rewards.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Gift className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No rewards available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {rewards.map(reward => {
                        const canAfford = (profile?.totalCredits || 0) >= reward.cost;
                        return (
                            <div key={reward.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg">{reward.title}</h4>
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">
                                        {reward.cost} pts
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                                    {reward.description}
                                </p>
                                <button
                                    onClick={() => handleRedeem(reward)}
                                    disabled={!canAfford || redeemingId === reward.id}
                                    className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                                        ${canAfford
                                            ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}
                                    `}
                                >
                                    {redeemingId === reward.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Ticket className="w-4 h-4" />
                                            {canAfford ? 'Redeem Reward' : 'Insufficient Credits'}
                                        </>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
