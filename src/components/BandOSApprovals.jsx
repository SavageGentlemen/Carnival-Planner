import React, { useState, useEffect } from 'react';
import { Loader2, Check, X, Box, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Keep this just to update the legacy userProfiles

export default function BandOSApprovals({ user }) {
    const [allRequests, setAllRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('pending');

    const [confirmModal, setConfirmModal] = useState({ open: false, id: null, action: null, name: '' });

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data, error } = await supabase
                    .from('band_profiles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setAllRequests(data || []);
            } catch (err) {
                console.error("Failed to fetch band profiles:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();

        // Optional: Set up real-time subscription for new signups
        const channel = supabase.channel('public:band_profiles')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'band_profiles' }, payload => {
                fetchProfiles(); // Just re-fetch on any change to keep it simple
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const filteredRequests = allRequests.filter(c => {
        if (activeFilter === 'all') return true;
        return c.status === activeFilter;
    });

    const openConfirm = (id, action, name) => {
        setConfirmModal({ open: true, id, action, name });
    };

    const closeConfirm = () => {
        setConfirmModal({ open: false, id: null, action: null, name: '' });
    };

    const handleAction = async () => {
        const { id, action } = confirmModal;
        closeConfirm();
        setProcessingId(id);

        try {
            if (action === 'delete') {
                const { error } = await supabase.from('band_profiles').delete().eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('band_profiles').update({ status: action }).eq('id', id);
                if (error) throw error;

                // Sync the legacy Firebase boolean so the rest of the app knows they are a band leader
                if (action === 'approved') {
                    await setDoc(doc(db, 'userProfiles', id), { isBandLeader: true }, { merge: true });
                } else if (action === 'rejected') {
                    await setDoc(doc(db, 'userProfiles', id), { isBandLeader: false }, { merge: true });
                }
            }
        } catch (err) {
            console.error(err);
            alert("Action failed: " + err.message);
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        };
        return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status] || styles.pending}`}>{status}</span>;
    };

    if (loading) return <div className="text-center p-8"><Loader2 className="animate-spin mx-auto text-purple-500" /></div>;

    if (error) return (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">Failed to load: {error}</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Confirmation Modal */}
            {confirmModal.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-lg font-bold dark:text-white mb-2">Confirm Action</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to <span className="font-bold">{confirmModal.action}</span> "{confirmModal.name}"?
                            {confirmModal.action === 'delete' && <span className="text-red-500 block mt-2">This action cannot be undone.</span>}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={closeConfirm}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAction}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${confirmModal.action === 'delete' || confirmModal.action === 'rejected'
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                {confirmModal.action === 'approved' ? 'Approve' : confirmModal.action === 'rejected' ? 'Reject' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                    <Box className="w-6 h-6 text-purple-500" />
                    BandOS Approvals
                </h2>

                <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {[
                        { id: 'pending', label: 'Pending', count: allRequests.filter(c => c.status === 'pending').length },
                        { id: 'approved', label: 'Approved', count: allRequests.filter(c => c.status === 'approved').length },
                        { id: 'all', label: 'All', count: allRequests.length }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === tab.id
                                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </div>

            {filteredRequests.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500">No {activeFilter === 'all' ? '' : activeFilter} BandOS requests found.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredRequests.map(req => (
                        <div key={req.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg dark:text-white">{req.business_name}</h3>
                                    {getStatusBadge(req.status)}
                                </div>
                                <p className="text-sm text-gray-500 font-mono mb-1">{req.support_email}</p>
                                {req.tax_id && <p className="text-sm font-medium text-purple-500 mb-1">Tax ID: {req.tax_id}</p>}
                                <div className="flex gap-2 text-xs flex-wrap mt-2">
                                    <span className="text-gray-400">Applied: {new Date(req.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                {processingId === req.id ? (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    <>
                                        {req.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => openConfirm(req.id, 'rejected', req.business_name)}
                                                    className="flex-1 md:flex-none px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <X className="w-4 h-4" /> Reject
                                                </button>
                                                <button
                                                    onClick={() => openConfirm(req.id, 'approved', req.business_name)}
                                                    className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Check className="w-4 h-4" /> Approve
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => openConfirm(req.id, 'delete', req.business_name)}
                                            className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete request"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
