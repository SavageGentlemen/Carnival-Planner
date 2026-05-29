import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../../firebase';
import { ExternalLink, CheckCircle2, Clock, CreditCard, Loader2, ArrowRight } from 'lucide-react';

export default function SellerOnboarding({ user, isPremium }) {
    const [sellerStatus, setSellerStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [onboarding, setOnboarding] = useState(false);
    const [dashboardLoading, setDashboardLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

    // Listen to seller status in Firestore
    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            doc(db, 'marketplaceSellers', user.uid),
            (snap) => {
                if (snap.exists()) {
                    setSellerStatus(snap.data());
                } else {
                    setSellerStatus(null);
                }
                setLoading(false);
            },
            (err) => {
                console.error('Error loading seller status:', err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Start Stripe Connect onboarding
    const handleStartOnboarding = async () => {
        setOnboarding(true);
        try {
            const functions = getFunctions();
            const createAccount = httpsCallable(functions, 'createConnectAccount');

            const result = await createAccount({
                returnUrl: window.location.origin,
                refreshUrl: window.location.origin,
            });

            if (result.data?.onboardingUrl) {
                window.location.href = result.data.onboardingUrl;
            } else {
                throw new Error('No onboarding URL returned');
            }
        } catch (err) {
            console.error('Onboarding error:', err);
            alert('Failed to start seller onboarding. ' + (err.message || ''));
        } finally {
            setOnboarding(false);
        }
    };

    // Verify Stripe Connect status manually
    const handleVerifyStatus = async () => {
        setVerifying(true);
        try {
            const functions = getFunctions();
            const verifyAccount = httpsCallable(functions, 'verifyConnectAccount');

            const result = await verifyAccount();

            if (result.data?.isReady) {
                // The onSnapshot listener will soon pick up the change,
                // but we might want to alert them immediately
                alert('Your account is now fully verified and active!');
            } else {
                alert('Your account is still not fully verified by Stripe. Please Continue Onboarding.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            alert('Failed to verify seller status. ' + (err.message || ''));
        } finally {
            setVerifying(false);
        }
    };

    // Open Stripe Express Dashboard
    const handleOpenDashboard = async () => {
        setDashboardLoading(true);
        try {
            const functions = getFunctions();
            const createLoginLink = httpsCallable(functions, 'createConnectLoginLink');

            const result = await createLoginLink();

            if (result.data?.loginUrl) {
                window.open(result.data.loginUrl, '_blank');
            } else {
                throw new Error('No dashboard URL returned');
            }
        } catch (err) {
            console.error('Dashboard link error:', err);
            alert('Failed to open Stripe dashboard. ' + (err.message || ''));
        } finally {
            setDashboardLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            </div>
        );
    }

    // Already onboarded
    if (sellerStatus?.onboardingComplete) {
        return (
            <div className="space-y-6">
                {/* Status Card */}
                <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-700/50 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Seller Account Active ✅</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Your Stripe Express account is connected. You can receive payouts and list items for sale.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleOpenDashboard}
                                    disabled={dashboardLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-all"
                                >
                                    {dashboardLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <ExternalLink className="w-4 h-4" />
                                    )}
                                    Stripe Dashboard
                                </button>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <CreditCard className="w-3.5 h-3.5" />
                                    Account: {sellerStatus.stripeAccountId?.slice(0, 12)}...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats placeholder */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-white">
                            {sellerStatus.chargesEnabled ? '✅' : '❌'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Charges Enabled</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
                        <p className="text-2xl font-black text-white">
                            {sellerStatus.payoutsEnabled ? '✅' : '❌'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Payouts Enabled</p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center">
                    Platform fee: {sellerStatus?.isOfficialBand 
                        ? '5% (Passed to customer)' 
                        : (isPremium ? '0%' : '10%')} per transaction • Payouts managed by Stripe
                </p>
            </div>
        );
    }

    // Onboarding started but not complete
    if (sellerStatus && !sellerStatus.onboardingComplete) {
        return (
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-700/50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Onboarding In Progress</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                    You've started the process but haven't finished. Complete your Stripe identity verification to start selling.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={handleStartOnboarding}
                        disabled={onboarding || verifying}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {onboarding ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowRight className="w-4 h-4" />
                        )}
                        Continue Onboarding
                    </button>
                    <button
                        onClick={handleVerifyStatus}
                        disabled={onboarding || verifying}
                        className="w-full sm:w-auto px-6 py-3 bg-white/10 border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {verifying ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <span className="text-xl">🔄</span>
                        )}
                        Refresh Status
                    </button>
                </div>
            </div>
        );
    }

    // Not started — show onboarding CTA
    return (
        <div className="text-center py-8">
            <div className="max-w-md mx-auto">
                {/* Graphic */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl rotate-6" />
                    <div className="absolute inset-0 bg-gray-800 rounded-3xl border border-gray-700 flex items-center justify-center">
                        <CreditCard className="w-14 h-14 text-purple-400" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-white mb-4">
                    {/* profileData is not defined in this component, using a placeholder for demonstration */}
                    {false ? 'Collect Costume Payments via Stripe' : 'Start Selling on the Marketplace'}
                </h2>
                <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                    {false
                        ? 'Connect your bank account securely to receive payouts directly from masquerader registrations.'
                        : 'Connect your bank account securely via Stripe to receive payouts when your items sell.'}
                </p>

                {/* How it Works */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 mb-6 text-left">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">How It Works</h4>
                    <div className="space-y-3">
                        {[
                            { step: '1', text: 'Connect your bank account via Stripe (2 min)' },
                            { step: '2', text: 'List your tickets or costumes with a price' },
                            { step: '3', text: `Get paid directly when someone purchases — ${sellerStatus?.isOfficialBand 
                                ? 'plus a 5% booking fee added for the buyer' 
                                : `minus a ${isPremium ? '0%' : '10%'} platform fee`}` },
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {item.step}
                                </span>
                                <p className="text-gray-300 text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleStartOnboarding}
                    disabled={onboarding}
                    className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-purple-500/20"
                >
                    {onboarding ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Setting up...
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Connect Stripe Account
                        </>
                    )}
                </button>

                <p className="text-xs text-gray-500 mt-4">
                    Powered by Stripe Express • KYC handled by Stripe • Your banking details are never stored on our servers
                </p>
            </div>
        </div>
    );
}
