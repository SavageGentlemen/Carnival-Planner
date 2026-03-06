import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ShoppingBag, Tag, Package, Store } from 'lucide-react';
import MarketplaceErrorBoundary from './MarketplaceErrorBoundary';
import MarketplaceGrid from './MarketplaceGrid';
import CreateListing from './CreateListing';
import SellerOnboarding from './SellerOnboarding';
import OrderHistory from './OrderHistory';

const TABS = [
    { id: 'browse', label: 'Browse', icon: ShoppingBag },
    { id: 'sell', label: 'Sell', icon: Store },
    { id: 'listings', label: 'My Listings', icon: Tag },
    { id: 'orders', label: 'Orders', icon: Package },
];

export default function MarketplacePage({ user }) {
    const [activeTab, setActiveTab] = useState('browse');
    const [sellerStatus, setSellerStatus] = useState(null);

    // Listen to seller onboarding status (if logged in)
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
            },
            (err) => {
                console.error('Error loading seller status:', err);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return (
        <MarketplaceErrorBoundary>
            <div className="space-y-6">
                {/* Marketplace Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-white flex items-center gap-2">
                            <span className="text-2xl">🎪</span>
                            Marketplace
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">Buy &amp; sell carnival tickets and costumes</p>
                    </div>
                    {sellerStatus?.onboardingComplete && (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                            ✅ Seller Active
                        </span>
                    )}
                </div>

                {/* Sub-Navigation */}
                <div className="flex gap-1 bg-gray-800/50 p-1 rounded-xl border border-gray-700">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                {activeTab === 'browse' && (
                    <MarketplaceGrid user={user} />
                )}

                {activeTab === 'sell' && (
                    <SellerOnboarding user={user} />
                )}

                {activeTab === 'listings' && (
                    <CreateListing user={user} sellerStatus={sellerStatus} />
                )}

                {activeTab === 'orders' && (
                    <OrderHistory user={user} />
                )}

                {/* Platform Info Footer */}
                <div className="text-center pt-4 border-t border-gray-800">
                    <p className="text-[10px] text-gray-500">
                        🔒 Payments secured by Stripe Connect • 10% platform fee per transaction • Seller identity verified by Stripe
                    </p>
                </div>
            </div>
        </MarketplaceErrorBoundary>
    );
}
