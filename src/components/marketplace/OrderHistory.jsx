import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Package, Clock, CheckCircle2, AlertCircle, ShoppingBag, ChevronRight, Ticket, Shirt } from 'lucide-react';

const STATUS_CONFIG = {
    pending: { label: 'Processing', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
    completed: { label: 'Completed', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
    failed: { label: 'Failed', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertCircle },
};

export default function OrderHistory({ user }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'marketplaceOrders'),
            where('buyerId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setOrders(items);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching orders:', err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const formatDate = (date) => {
        if (!date) return '';
        const d = date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const formatPrice = (price, currency = 'usd') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).format(price);
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-800/50 rounded-xl p-5 animate-pulse">
                        <div className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-700 rounded-lg flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-3/4" />
                                <div className="h-3 bg-gray-700 rounded w-1/2" />
                                <div className="h-3 bg-gray-700 rounded w-1/4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No orders yet</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">
                    When you purchase tickets or costumes, they'll appear here. Browse the marketplace to find what you need!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-400" />
                    My Orders
                </h3>
                <span className="text-xs text-gray-500">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
            </div>

            {orders.map((order) => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                const StatusIcon = status.icon;

                return (
                    <div
                        key={order.id}
                        className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex gap-4">
                            {/* Item thumbnail */}
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                                {order.imageUrl ? (
                                    <img src={order.imageUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        {order.category === 'ticket' ? (
                                            <Ticket className="w-6 h-6 text-gray-600" />
                                        ) : (
                                            <Shirt className="w-6 h-6 text-gray-600" />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Order details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="text-sm font-bold text-white truncate">{order.listingTitle || 'Marketplace Item'}</h4>
                                    <span className="text-sm font-bold text-green-400 flex-shrink-0">
                                        {formatPrice(order.amount, order.currency)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    {order.carnival && (
                                        <span className="text-[10px] text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full">
                                            {order.carnival}
                                        </span>
                                    )}
                                    <span className="text-[10px] text-gray-500">
                                        from {order.sellerName || 'Seller'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status.color}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {status.label}
                                    </span>
                                    <span className="text-[10px] text-gray-500">{formatDate(order.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Seller Contact (for completed orders) */}
                        {order.status === 'completed' && order.sellerEmail && (
                            <div className="mt-3 pt-3 border-t border-gray-700/50">
                                <p className="text-[10px] text-gray-500">
                                    Contact seller: <a href={`mailto:${order.sellerEmail}`} className="text-purple-400 hover:underline">{order.sellerEmail}</a>
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
