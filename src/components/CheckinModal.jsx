import React, { useState, useEffect } from 'react';
import { X, Zap, Loader2, Check, AlertCircle, Ticket, Sparkles, Gift } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

export default function CheckinModal({ isOpen, onClose, onSuccess }) {
    const [accessCode, setAccessCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setAccessCode('');
            setError(null);
            setSuccess(null);
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accessCode.trim()) {
            setError('Please enter an access code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const functions = getFunctions(app);
            const passportCheckin = httpsCallable(functions, 'passportCheckin');
            const result = await passportCheckin({ accessCode: accessCode.trim() });

            setSuccess(result.data);

            // Notify parent after a delay
            setTimeout(() => {
                onSuccess?.(result.data);
            }, 3000);

        } catch (err) {
            console.error('Check-in error:', err);
            const errorMessage = err.message || 'Check-in failed. Please try again.';

            // Map Firebase error codes to friendly messages
            if (err.code === 'functions/not-found') {
                setError('Invalid or expired access code.');
            } else if (err.code === 'functions/already-exists') {
                setError('You have already checked in to this event.');
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const formatAccessCode = (value) => {
        // Convert to uppercase and remove invalid characters
        return value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Success State */}
                {success ? (
                    <div className="p-8 text-center">
                        {/* Stamp Animation */}
                        <div className="relative mb-6">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-500/30 animate-bounce">
                                <Check className="w-16 h-16 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Sparkles className="w-4 h-4 text-yellow-900" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                            Check-in Complete!
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            You earned a new stamp
                        </p>

                        {/* Stamp Preview */}
                        <div className="inline-block mb-6">
                            <div className={`px-6 py-4 rounded-2xl border-2 ${success.stamp?.rarity === 'LEGENDARY' ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' :
                                    success.stamp?.rarity === 'EPIC' ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' :
                                        success.stamp?.rarity === 'RARE' ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' :
                                            'border-gray-300 bg-gray-50 dark:bg-gray-700/50'
                                }`}>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    {success.stamp?.eventTitle}
                                </p>
                                <p className="text-sm text-gray-500 capitalize">
                                    {success.stamp?.rarity?.toLowerCase()} Stamp • #{success.stamp?.editionNumber}
                                </p>
                            </div>
                        </div>

                        {/* Credits Earned */}
                        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-4 text-white mb-4">
                            <div className="flex items-center justify-center gap-3">
                                <Zap className="w-6 h-6" />
                                <span className="text-3xl font-black">+{success.creditsEarned}</span>
                                <span className="text-white/80">Credits</span>
                            </div>
                            {success.bonusCredits > 0 && (
                                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/90">
                                    <Gift className="w-4 h-4" />
                                    <span>+{success.bonusCredits} Achievement Bonus!</span>
                                </div>
                            )}
                        </div>

                        {/* New Achievements */}
                        {success.newAchievements?.length > 0 && (
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 mb-4">
                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
                                    🎉 Achievement Unlocked!
                                </p>
                                {success.newAchievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center justify-center gap-2">
                                        <span className="text-2xl">{achievement.icon}</span>
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {achievement.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tier Change */}
                        {success.tierChanged && (
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white mb-4">
                                <p className="font-bold text-lg">🎊 You ranked up to {success.newTier}!</p>
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-6 text-white text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Ticket className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black">Event Check-in</h2>
                            <p className="text-teal-100 text-sm mt-1">Enter your access code to earn stamps</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Access Code
                                </label>
                                <input
                                    type="text"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(formatAccessCode(e.target.value))}
                                    placeholder="e.g. PRO-123-4567"
                                    className="w-full px-5 py-4 text-2xl font-mono font-bold text-center tracking-widest bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:text-white transition-all uppercase"
                                    disabled={loading}
                                    autoFocus
                                />
                                <p className="text-xs text-gray-400 mt-2 text-center">
                                    Get this code from the event host or promoter
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !accessCode.trim()}
                                className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Checking in...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Claim Stamp
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>

            {/* Styles for animations */}
            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
