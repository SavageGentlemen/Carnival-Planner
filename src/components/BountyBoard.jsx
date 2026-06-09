import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { supabase } from '../supabaseClient';
import { Camera, Clock, CheckCircle, ShieldAlert } from 'lucide-react';

export default function BountyBoard({ user, activeCarnivalId }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submittingId, setSubmittingId] = useState(null);

    useEffect(() => {
        if (!activeCarnivalId) return;

        const fetchActiveEvents = async () => {
            setLoading(true);
            try {
                // Mocking active events or fetching from Supabase if they exist
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('carnival_id', activeCarnivalId)
                    .limit(5);

                if (error) throw error;
                
                // Fallback to mock data if empty
                if (!data || data.length === 0) {
                    setEvents([
                        { id: '1', name: 'Soca Brainwash', venue: 'O2 Park', bounty: 20 },
                        { id: '2', name: 'Tribe Ignite', venue: 'Hasely Crawford', bounty: 15 },
                        { id: '3', name: 'AM Bush', venue: 'Chaguaramas', bounty: 30 }
                    ]);
                } else {
                    setEvents(data.map(e => ({ ...e, bounty: 15 })));
                }
            } catch (err) {
                console.error('Failed to load events for bounties:', err);
                setEvents([
                    { id: '1', name: 'Soca Brainwash', venue: 'O2 Park', bounty: 20 },
                    { id: '2', name: 'Tribe Ignite', venue: 'Hasely Crawford', bounty: 15 }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchActiveEvents();
    }, [activeCarnivalId]);

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const handleBountySubmit = async (eventId, type) => {
        if (!user) {
            alert("Please log in to submit bounties!");
            return;
        }

        setSubmittingId(eventId);
        try {
            // Mock RPC call by directly inserting into bounties table
            const { error } = await supabase
                .from('bounties')
                .insert([{
                    event_id: eventId.length > 10 ? eventId : null, // Handle mock IDs
                    user_id: user.id || user.uid,
                    bounty_type: type,
                    status: 'COMPLETED',
                    reward_credits: 15
                }]);

            if (error) {
                console.warn('Supabase error (expected if mock ID):', error.message);
            }

            // Award Stamp & Confetti
            triggerConfetti();
            
            // Optimistic UI update: Remove the completed bounty from list
            setTimeout(() => {
                setEvents(prev => prev.filter(e => e.id !== eventId));
                setSubmittingId(null);
            }, 1000);

        } catch (err) {
            console.error('Bounty submission error:', err);
            setSubmittingId(null);
        }
    };

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading bounties...</div>;
    }

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6" />
                    Active Bounties
                </h2>
                <p className="text-purple-100 text-sm">
                    Report wait times or upload live photos from these events to earn credits and digital stamps!
                </p>
            </div>

            <AnimatePresence>
                {events.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                        <p className="text-gray-500 dark:text-gray-400">No active bounties at the moment.</p>
                    </motion.div>
                )}
                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{event.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{event.venue}</p>
                                <div className="mt-2 inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-md text-xs font-bold">
                                    <span>💎</span> {event.bounty} Credits
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleBountySubmit(event.id, 'WAIT_TIME')}
                                    disabled={submittingId === event.id}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    {submittingId === event.id ? <CheckCircle className="w-4 h-4 animate-bounce" /> : <Clock className="w-4 h-4" />}
                                    Wait Time
                                </button>
                                <button
                                    onClick={() => handleBountySubmit(event.id, 'PHOTO_UPLOAD')}
                                    disabled={submittingId === event.id}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    <Camera className="w-4 h-4" />
                                    Photo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
