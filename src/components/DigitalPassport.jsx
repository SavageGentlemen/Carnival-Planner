import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { BookOpen, Star, Loader2, Sparkles } from 'lucide-react';
import { HolographicCard } from './threeui';

const RARITY_COLORS = {
    COMMON: 'border-gray-500/40 bg-slate-800/60 text-gray-300',
    RARE: 'border-cyan-400/60 bg-cyan-950/40 text-cyan-300',
    EPIC: 'border-pink-400/60 bg-pink-950/40 text-pink-300',
    LEGENDARY: 'border-yellow-400/70 bg-amber-950/40 text-yellow-300'
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
        <div className="p-4 max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-[0_0_40px_rgba(6,182,212,0.3)] relative overflow-hidden border border-white/20">
                <div className="relative z-10">
                    <span className="px-3 py-1 bg-black/30 border border-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
                        <Sparkles className="w-3 h-3 text-yellow-300" /> Web3 & Social Passport
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center gap-2 font-heading tracking-wide">
                        <BookOpen className="w-7 h-7" />
                        Digital Carnival Passport
                    </h2>
                    <p className="text-cyan-100 text-sm max-w-xl font-medium">
                        Your interactive holographic stamp collection earned at fetes, j'ouverts, and road marches worldwide!
                    </p>
                </div>
            </div>

            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-white flex items-center gap-2 font-heading">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        Collected Stamps ({stamps.length})
                    </h3>
                    <span className="text-xs text-cyan-300 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-400/30">
                        Holographic Badges
                    </span>
                </div>

                {stamps.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-white font-bold">Your passport is empty!</p>
                        <p className="text-sm text-slate-400 mt-1">Complete quests in the Bounty Board to unlock holographic stamps.</p>
                    </div>
                ) : (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {stamps.map((stamp) => (
                            <HolographicCard 
                                key={stamp.id} 
                                tier={stamp.rarity}
                                maxTilt={18}
                                scaleOnHover={1.06}
                            >
                                <div className={`aspect-square rounded-2xl p-3 flex flex-col items-center justify-center text-center backdrop-blur-md ${RARITY_COLORS[stamp.rarity] || RARITY_COLORS.COMMON}`}>
                                    <span className="text-3xl sm:text-4xl mb-1 filter drop-shadow-md">
                                        {getCountryEmoji(stamp.countryCode)}
                                    </span>
                                    <p className="text-xs font-black text-white truncate w-full">
                                        {stamp.eventTitle}
                                    </p>
                                    <p className="text-[9px] uppercase font-extrabold tracking-wider mt-1 opacity-90">
                                        {stamp.rarity}
                                    </p>
                                </div>
                            </HolographicCard>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
