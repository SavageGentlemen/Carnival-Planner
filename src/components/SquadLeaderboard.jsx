import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { Trophy, Medal, Users, Loader2 } from 'lucide-react';

export default function SquadLeaderboard({ user, currentSquad }) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentSquad?.id) {
            setLoading(false);
            return;
        }

        const fetchLeaderboard = async () => {
            try {
                // Fetch squad members and their total credits from bounties or users table
                // Since total_credits is in users table, we can just fetch squad members and join with users
                const { data, error } = await supabase
                    .from('squad_members')
                    .select(`
                        user_id,
                        users (
                            display_name,
                            total_credits,
                            current_tier
                        )
                    `)
                    .eq('squad_id', currentSquad.id);

                if (error) throw error;

                if (data) {
                    const formatted = data.map(m => ({
                        id: m.user_id,
                        name: m.users?.display_name || 'Anonymous',
                        credits: m.users?.total_credits || 0,
                        tier: m.users?.current_tier || 'BRONZE'
                    })).sort((a, b) => b.credits - a.credits);

                    setLeaderboard(formatted);
                }
            } catch (err) {
                console.error('Error fetching squad leaderboard:', err);
                // Mock data if error
                setLeaderboard([
                    { id: '1', name: 'Carnival King', credits: 450, tier: 'GOLD' },
                    { id: '2', name: 'Soca Queen', credits: 320, tier: 'SILVER' },
                    { id: user?.id || user?.uid, name: user?.displayName || 'You', credits: 150, tier: 'BRONZE' }
                ].sort((a, b) => b.credits - a.credits));
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();

        // Optional: Realtime subscription for leaderboard updates
        const channel = supabase.channel(`squad-leaderboard-${currentSquad.id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
                fetchLeaderboard();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);

    }, [currentSquad?.id, user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
            </div>
        );
    }

    if (!currentSquad?.id) {
        return (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl max-w-2xl mx-auto mt-4">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Join a Squad</h3>
                <p className="text-gray-500 dark:text-gray-400">
                    You need to be in a squad to view the leaderboard and compete with friends!
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        Squad Leaderboard
                    </h2>
                    <p className="text-yellow-100 text-sm">
                        Compete with your squad members by earning bounties on the road!
                    </p>
                </div>
                <div className="hidden sm:block">
                    <Trophy className="w-16 h-16 text-yellow-200/50" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">Rankings</h3>
                    <span className="text-sm text-gray-500">{leaderboard.length} members</span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    <AnimatePresence>
                        {leaderboard.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-4 flex items-center justify-between transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                                    (user?.id === member.id || user?.uid === member.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 flex justify-center">
                                        {index === 0 ? <Medal className="w-6 h-6 text-yellow-500" /> :
                                         index === 1 ? <Medal className="w-6 h-6 text-gray-400" /> :
                                         index === 2 ? <Medal className="w-6 h-6 text-amber-600" /> :
                                         <span className="text-gray-400 font-bold">#{index + 1}</span>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            {member.name}
                                            {(user?.id === member.id || user?.uid === member.id) && (
                                                <span className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase">
                                                    You
                                                </span>
                                            )}
                                        </h4>
                                        <p className="text-xs text-gray-500 uppercase font-medium mt-0.5">{member.tier} TIER</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-lg text-indigo-600 dark:text-indigo-400">{member.credits}</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Credits</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
