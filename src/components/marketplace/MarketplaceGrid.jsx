import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../../firebase';
import { Search, Tag, Ticket, Shirt, Filter, ShoppingCart, Loader2, AlertCircle, Box, Sparkles } from 'lucide-react';
import { HolographicCard, LiquidButton } from '../threeui';

const CostumeViewerAR = React.lazy(() => import('./CostumeViewerAR'));

const CATEGORIES = [
    { id: 'all', label: 'All Items', icon: Filter },
    { id: 'ticket', label: 'Tickets', icon: Ticket },
    { id: 'costume', label: 'Costumes', icon: Shirt },
];

export default function MarketplaceGrid({ user }) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeFilter, setActiveFilter] = useState('all'); // all, official, resale
    const [searchQuery, setSearchQuery] = useState('');
    const [purchasingId, setPurchasingId] = useState(null);
    const [view3dModel, setView3dModel] = useState(null);

    // Fetch listings from Firestore with real-time updates
    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            let q;
            if (activeCategory === 'all') {
                q = query(
                    collection(db, 'marketplaceListings'),
                    where('status', '==', 'active'),
                    orderBy('createdAt', 'desc'),
                    limit(50)
                );
            } else {
                q = query(
                    collection(db, 'marketplaceListings'),
                    where('status', '==', 'active'),
                    where('category', '==', activeCategory),
                    orderBy('createdAt', 'desc'),
                    limit(50)
                );
            }

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setListings(items);
                setLoading(false);
            }, (err) => {
                console.error('Error fetching marketplace listings:', err);
                setError('Unable to load listings. Please try again.');
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err) {
            console.error('Marketplace query error:', err);
            setError('Unable to load listings.');
            setLoading(false);
        }
    }, [activeCategory]);

    // Filter listings by search query (client-side)
    const filteredListings = listings.filter(listing => {
        // Filter by Official vs Resale
        if (activeFilter === 'official' && !listing.isOfficial) return false;
        if (activeFilter === 'resale' && listing.isOfficial) return false;

        // Filter by text search
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            listing.title?.toLowerCase().includes(q) ||
            listing.description?.toLowerCase().includes(q) ||
            listing.carnival?.toLowerCase().includes(q)
        );
    });

    // Handle purchase
    const handlePurchase = useCallback(async (listing) => {
        if (!user) {
            alert('Please sign in to make a purchase.');
            return;
        }

        if (user.uid === listing.sellerId) {
            alert("You can't purchase your own listing.");
            return;
        }

        setPurchasingId(listing.id);

        try {
            const functions = getFunctions();
            const createCheckout = httpsCallable(functions, 'createMarketplaceCheckout');

            const result = await createCheckout({
                listingId: listing.id,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

            if (result.data?.checkoutUrl) {
                window.location.href = result.data.checkoutUrl;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (err) {
            console.error('Purchase error:', err);
            alert(err.message || 'Failed to start checkout. Please try again.');
        } finally {
            setPurchasingId(null);
        }
    }, [user]);

    // Format price
    const formatPrice = (price, currency = 'usd') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).format(price);
    };

    // Time ago helper
    const timeAgo = (date) => {
        if (!date) return '';
        const now = new Date();
        const created = date.toDate ? date.toDate() : new Date(date);
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;
        return created.toLocaleDateString();
    };

    return (
        <div>
            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tickets, costumes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex gap-1.5 bg-gray-800/50 p-1 rounded-xl border border-gray-700">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeCategory === cat.id
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Filter Tabs (Official vs Resale) */}
                <div className="flex gap-1.5 bg-gray-800/50 p-1 rounded-xl border border-gray-700 w-full sm:w-auto overflow-x-auto">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeFilter === 'all' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                        Browse All
                    </button>
                    <button
                        onClick={() => setActiveFilter('official')}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeFilter === 'official' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/50 shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Box className="w-3.5 h-3.5" /> Official Drops
                    </button>
                    <button
                        onClick={() => setActiveFilter('resale')}
                        className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeFilter === 'resale' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                        Resale Market
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 text-sm">{error}</p>
                </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden animate-pulse">
                            <div className="h-40 bg-gray-700/50" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-700 rounded w-3/4" />
                                <div className="h-3 bg-gray-700 rounded w-1/2" />
                                <div className="h-8 bg-gray-700 rounded w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredListings.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-5xl mb-4">🎪</div>
                    <h3 className="text-xl font-bold text-white mb-2">No listings yet</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        {searchQuery
                            ? 'No items match your search. Try adjusting your filters.'
                            : 'Be the first to list tickets or costumes for sale! Switch to the "Sell" tab to get started.'}
                    </p>
                </div>
            )}

            {/* Listings Grid */}
            {!loading && filteredListings.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredListings.map((listing) => (
                        <HolographicCard 
                            key={listing.id}
                            tier={listing.isOfficial ? 'PLATINUM' : listing.category === 'costume' ? 'EPIC' : 'RARE'}
                            maxTilt={10}
                            scaleOnHover={1.02}
                        >
                            <div className="group bg-slate-900/90 rounded-3xl overflow-hidden h-full flex flex-col justify-between">
                                {/* Image / Placeholder */}
                                <div className="relative h-44 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                                    {listing.imageUrl ? (
                                        <img
                                            src={listing.imageUrl}
                                            alt={listing.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            {listing.category === 'ticket' ? (
                                                <Ticket className="w-12 h-12 text-slate-600" />
                                            ) : (
                                                <Shirt className="w-12 h-12 text-slate-600" />
                                            )}
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${listing.category === 'ticket'
                                            ? 'bg-blue-600/90 text-white border border-blue-400/30'
                                            : 'bg-pink-600/90 text-white border border-pink-400/30'
                                            }`}>
                                            {listing.category === 'ticket' ? '🎫 Ticket' : '👗 Costume'}
                                        </span>
                                    </div>

                                    {/* Official Badge */}
                                    {listing.isOfficial && (
                                        <div className="absolute top-3 right-3">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-600 border border-purple-400 text-white shadow-lg flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Official
                                            </span>
                                        </div>
                                    )}

                                    {/* Price Badge */}
                                    <div className="absolute bottom-3 right-3">
                                        <span className="px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl text-cyan-300 font-black text-sm border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,204,0.3)]">
                                            {formatPrice(listing.price, listing.currency)}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="font-black text-white text-base mb-1 truncate group-hover:text-cyan-300 transition-colors font-heading">
                                            {listing.title}
                                        </h3>
                                        {listing.description && (
                                            <p className="text-slate-400 text-xs mb-3 line-clamp-2">{listing.description}</p>
                                        )}

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                {listing.carnival && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                                                        <Tag className="w-2.5 h-2.5" />
                                                        {listing.carnival}
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-slate-500 font-medium">
                                                    {timeAgo(listing.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {/* Purchase Button */}
                                        <LiquidButton
                                            variant={listing.isOfficial ? 'purple' : 'cyan'}
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handlePurchase(listing)}
                                            disabled={purchasingId === listing.id || listing.sellerId === user?.uid}
                                            loading={purchasingId === listing.id}
                                            icon={ShoppingCart}
                                        >
                                            {listing.sellerId === user?.uid ? 'Your Listing' : 'Purchase Now'}
                                        </LiquidButton>

                                        {/* View in 3D button for costumes with models */}
                                        {listing.category === 'costume' && listing.model3dUrl && (
                                            <button
                                                onClick={() => setView3dModel({ url: listing.model3dUrl, usdzUrl: listing.model3dUsdzUrl, title: listing.title })}
                                                className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Box className="w-3.5 h-3.5" />
                                                View in 3D
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </HolographicCard>
                    ))}
                </div>
            )}

            {/* 3D Model Viewer overlay */}
            {view3dModel && (
                <React.Suspense fallback={null}>
                    <CostumeViewerAR
                        url={view3dModel.url}
                        title={view3dModel.title}
                        onClose={() => setView3dModel(null)}
                    />
                </React.Suspense>
            )}
        </div>
    );
}
