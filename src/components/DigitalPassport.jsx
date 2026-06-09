import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { BookOpen, Star, Loader2 } from 'lucide-react';

const RARITY_COLORS = {
    COMMON: 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700',
    RARE: 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30',
    EPIC: 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30',
    LEGENDARY: 'border-yellow-400 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'
};

const getCountryEmoji = (code) => {
    const emojis = { TT: '🇹🇹', US: '🇺🇸', JM: '🇯🇲', BB: '🇧🇧', LC: '🇱🇨', VC: '🇻🇨' };
    return emojis[code] || '🎭';
};

export default function DigitalPassport({ user }) {
    const [stamps, setStamps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchStamps = async () => {
            try {
                // Fetch bounties which represent completed stamps
                const { data, error } = await supabase
                    .from('bounties')
                    .select('*, events(name, carnival_id)')
                    .eq('user_id', user.id || user.uid)
                    .eq('status', 'COMPLETED');

                if (error) throw error;
                
                // Map bounties to stamps
                if (data && data.length > 0) {
                    setStamps(data.map(b => ({
                        id: b.id,
                        eventTitle: b.events?.name || 'Carnival Event',
                        countryCode: 'TT', // Default or extract from carnival_id
                        rarity: b.reward_credits >= 30 ? 'LEGENDARY' : b.reward_credits >= 20 ? 'EPIC' : b.reward_credits >= 15 ? 'RARE' : 'COMMON'
                    })));
                } else {
                    // Fallback to empty if none found
                    setStamps([]);
                }
            } catch (err) {
                console.error('Error fetching stamps:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStamps();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl">
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Digital Passport
                </h2>
                <p className="text-pink-100 text-sm">
                    Your collection of earned stamps from carnival events around the world!
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Stamp Collection ({stamps.length})
                    </h3>
                </div>

                {stamps.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Your passport is empty!</p>
                        <p className="text-sm text-gray-400">Head over to the Bounty Board to start collecting stamps.</p>
                    </div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
                    >
                        {stamps.map((stamp) => (
                            <motion.div
                                key={stamp.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                                    visible: { opacity: 1, scale: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                                className={`aspect-square rounded-2xl border-2 ${RARITY_COLORS[stamp.rarity]} flex flex-col items-center justify-center p-2 text-center shadow-sm cursor-pointer`}
                            >
                                <span className="text-3xl sm:text-4xl mb-1 filter drop-shadow-sm">
                                    {getCountryEmoji(stamp.countryCode)}
                                </span>
                                <p className="text-[10px] sm:text-xs font-bold text-gray-800 dark:text-gray-200 truncate w-full">
                                    {stamp.eventTitle}
                                </p>
                                <p className={`text-[8px] sm:text-[9px] uppercase font-black tracking-wider mt-1
                                    ${stamp.rarity === 'LEGENDARY' ? 'text-yellow-600 dark:text-yellow-400' : 
                                      stamp.rarity === 'EPIC' ? 'text-purple-600 dark:text-purple-400' : 
                                      stamp.rarity === 'RARE' ? 'text-blue-600 dark:text-blue-400' : 
                                      'text-gray-500'}
                                `}>
                                    {stamp.rarity}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
