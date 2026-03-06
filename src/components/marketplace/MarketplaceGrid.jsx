import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../../firebase';
import { Search, Tag, Ticket, Shirt, Filter, ShoppingCart, Loader2, AlertCircle, Box } from 'lucide-react';

const ModelViewer = React.lazy(() => import('../ModelViewer'));

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredListings.map((listing) => (
                        <div
                            key={listing.id}
                            className="group bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                            {/* Image / Placeholder */}
                            <div className="relative h-40 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
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
                                            <Ticket className="w-12 h-12 text-gray-600" />
                                        ) : (
                                            <Shirt className="w-12 h-12 text-gray-600" />
                                        )}
                                    </div>
                                )}

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${listing.category === 'ticket'
                                        ? 'bg-blue-500/90 text-white'
                                        : 'bg-pink-500/90 text-white'
                                        }`}>
                                        {listing.category === 'ticket' ? '🎫 Ticket' : '👗 Costume'}
                                    </span>
                                </div>

                                {/* Price Badge */}
                                <div className="absolute bottom-3 right-3">
                                    <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-white font-bold text-sm">
                                        {formatPrice(listing.price, listing.currency)}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-purple-300 transition-colors">
                                    {listing.title}
                                </h3>
                                {listing.description && (
                                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{listing.description}</p>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {listing.carnival && (
                                            <span className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full">
                                                <Tag className="w-2.5 h-2.5" />
                                                {listing.carnival}
                                            </span>
                                        )}
                                        <span className="text-[10px] text-gray-500">
                                            {timeAgo(listing.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Purchase Button */}
                                <button
                                    onClick={() => handlePurchase(listing)}
                                    disabled={purchasingId === listing.id || listing.sellerId === user?.uid}
                                    className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${listing.sellerId === user?.uid
                                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                        : purchasingId === listing.id
                                            ? 'bg-purple-700 text-white cursor-wait'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/20'
                                        }`}
                                >
                                    {listing.sellerId === user?.uid ? (
                                        'Your Listing'
                                    ) : purchasingId === listing.id ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-4 h-4" />
                                            Purchase
                                        </>
                                    )}
                                </button>

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
                    ))}
                </div>
            )}

            {/* 3D Model Viewer overlay */}
            {view3dModel && (
                <React.Suspense fallback={null}>
                    <ModelViewer
                        modelUrl={view3dModel.url}
                        usdzUrl={view3dModel.usdzUrl}
                        title={view3dModel.title}
                        onClose={() => setView3dModel(null)}
                        isPremium={true}
                    />
                </React.Suspense>
            )}
        </div>
    );
}
