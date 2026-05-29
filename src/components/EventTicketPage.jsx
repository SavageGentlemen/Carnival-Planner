import React, { useState, useEffect } from 'react';
import {
    Ticket, MapPin, Calendar, Clock, Users, Loader2,
    ArrowLeft, Minus, Plus, ShieldCheck, Sparkles, Wine
} from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

export default function EventTicketPage({ eventId, user, onBack }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedTier, setSelectedTier] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [purchasing, setPurchasing] = useState(false);
    const [purchaseError, setPurchaseError] = useState('');

    useEffect(() => {
        loadEvent();
    }, [eventId]);

    const loadEvent = async () => {
        setLoading(true);
        setError('');
        try {
            const functions = getFunctions(app);
            const getInfo = httpsCallable(functions, 'getEventPublicInfo');
            const result = await getInfo({ eventId });
            setEvent(result.data.event);
            // Auto-select cheapest tier
            const tiers = result.data.event?.ticketTiers || [];
            if (tiers.length > 0) setSelectedTier(tiers[0].name);
        } catch (err) {
            console.error('Failed to load event:', err);
            setError('Event not found or unavailable.');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async () => {
        if (!user) {
            setPurchaseError('Please sign in to purchase tickets.');
            return;
        }
        if (!selectedTier) {
            setPurchaseError('Please select a ticket tier.');
            return;
        }

        setPurchasing(true);
        setPurchaseError('');

        try {
            const functions = getFunctions(app);
            const purchase = httpsCallable(functions, 'purchaseEventTicket');
            const result = await purchase({
                eventId,
                tierName: selectedTier,
                quantity,
                success_url: window.location.origin,
                cancel_url: window.location.href
            });

            // Redirect to Stripe Checkout
            if (result.data.checkoutUrl) {
                window.location.href = result.data.checkoutUrl;
            }
        } catch (err) {
            console.error('Purchase error:', err);
            setPurchaseError(err.message || 'Failed to start checkout.');
        } finally {
            setPurchasing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
                <div className="text-center">
                    <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Event Not Found</h2>
                    <p className="text-gray-400 mb-6">{error || 'This event may have been removed.'}</p>
                    <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const activeTier = event.ticketTiers?.find(t => t.name === selectedTier);
    const totalPrice = activeTier ? (activeTier.price * quantity) : 0;

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 via-purple-600/20 to-pink-600/30" />
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(251,191,36,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168,85,247,0.1) 0%, transparent 50%)'
                }} />

                <div className="relative max-w-3xl mx-auto px-4 pt-6 pb-10">
                    <button onClick={onBack}
                        className="flex items-center gap-1 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div className="flex items-start gap-2 mb-2">
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-500/30">
                            {event.eventType?.replace(/_/g, ' ') || 'Event'}
                        </span>
                        {event.bottleService && (
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full flex items-center gap-1 border border-purple-500/30">
                                <Wine className="w-3 h-3" /> VIP
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-400" />
                            {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                        {event.location && (
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-amber-400" />
                                {event.location}
                            </span>
                        )}
                    </div>

                    {event.description && (
                        <p className="mt-4 text-gray-400 leading-relaxed max-w-xl">
                            {event.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Ticket Selection */}
            <div className="max-w-3xl mx-auto px-4 -mt-2 pb-20">
                {!event.ticketsEnabled || !event.ticketTiers?.length ? (
                    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
                        <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">Tickets are not available for this event.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-amber-400" /> Select Tickets
                        </h2>

                        <div className="space-y-3 mb-6">
                            {event.ticketTiers.map((tier) => {
                                const isSelected = selectedTier === tier.name;
                                const soldOut = tier.available <= 0;
                                return (
                                    <button
                                        key={tier.name}
                                        onClick={() => !soldOut && setSelectedTier(tier.name)}
                                        disabled={soldOut}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                                            soldOut
                                                ? 'border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed'
                                                : isSelected
                                                    ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                                                    : 'border-gray-800 bg-gray-900 hover:border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-white flex items-center gap-2">
                                                    {tier.name}
                                                    {soldOut && <span className="text-xs text-red-400 font-medium">SOLD OUT</span>}
                                                </p>
                                                {tier.description && (
                                                    <p className="text-sm text-gray-400 mt-0.5">{tier.description}</p>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">{tier.available} remaining</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-amber-400">${tier.price}</p>
                                                <p className="text-xs text-gray-500">per ticket</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quantity Selector */}
                        {selectedTier && activeTier && (
                            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-gray-300">Quantity</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-xl font-bold text-white w-8 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, Math.min(activeTier.available, quantity + 1)))}
                                            className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                                    <div>
                                        <p className="text-sm text-gray-400">{selectedTier} × {quantity}</p>
                                    </div>
                                    <p className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        )}

                        {purchaseError && (
                            <p className="text-red-400 text-sm mb-4 flex items-center gap-1">
                                ⚠️ {purchaseError}
                            </p>
                        )}

                        {/* Purchase Button */}
                        <button
                            onClick={handlePurchase}
                            disabled={purchasing || !selectedTier}
                            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all text-lg flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {purchasing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Ticket className="w-5 h-5" />
                                    {user ? `Buy Tickets — $${totalPrice.toFixed(2)}` : 'Sign In to Buy Tickets'}
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Secure checkout</span>
                            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Instant delivery</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
