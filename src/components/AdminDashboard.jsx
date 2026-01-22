import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Megaphone, MessageSquare, Users, Settings,
    Loader2, Check, X, Plus, Trash2, Shield, AlertTriangle
} from 'lucide-react';
import {
    collection, query, where, getDocs, doc, updateDoc,
    setDoc, deleteDoc, Timestamp, orderBy, onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

// Import existing admin tools
import AdminAnalytics from './AdminAnalytics';
import AdManager from './AdManager';
import { SupportAdmin } from './ContactSupport';

export default function AdminDashboard({ user }) {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check basic admin permissions or role
    useEffect(() => {
        if (!user) return;
        // Hardcoded Super Admin for bootstrap security
        if (user.email === 'djkrss1@gmail.com') {
            setIsSuperAdmin(true);
        }
        setLoading(false);
    }, [user]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading Admin Dashboard...</div>;
    }

    const tabs = [
        { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'Ads', label: 'Ad Manager', icon: Megaphone },
        { id: 'Support', label: 'Support', icon: MessageSquare },
        { id: 'Settings', label: 'Admins', icon: Settings },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            {/* Sidebar / Topbar Navigation */}
            <div className="bg-gray-900 text-white p-4 md:p-6 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="text-pink-500" />
                        Admin Console
                    </h1>
                    <p className="text-gray-400 text-sm">Manage your entire carnival platform</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-pink-600 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
                {activeTab === 'Overview' && <AdminAnalytics />}
                {activeTab === 'Ads' && <AdManager />}
                {activeTab === 'Support' && <SupportAdmin />}
                {activeTab === 'Settings' && <AdminManagement user={user} isSuperAdmin={isSuperAdmin} />}
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: Creator Requests ---
function CreatorRequests({ user }) {
    const [allCreators, setAllCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('pending');

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({ open: false, id: null, action: null, name: '' });

    useEffect(() => {
        // Get ALL affiliates so we can filter client-side
        const q = query(collection(db, 'affiliates'));
        const unsub = onSnapshot(q,
            (snapshot) => {
                const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                docs.sort((a, b) => (b.appliedAt?.toMillis?.() || 0) - (a.appliedAt?.toMillis?.() || 0));
                setAllCreators(docs);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error("CreatorRequests query failed:", err);
                setError(err.message);
                setLoading(false);
            }
        );
        return () => unsub();
    }, []);

    const filteredCreators = allCreators.filter(c => {
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
                await deleteDoc(doc(db, 'affiliates', id));
            } else {
                await updateDoc(doc(db, 'affiliates', id), {
                    status: action,
                    reviewedAt: Timestamp.now(),
                    reviewedBy: user.email
                });
                if (action === 'approved') {
                    await setDoc(doc(db, 'userProfiles', id), { isCreator: true }, { merge: true });
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

    if (loading) return <div className="text-center p-8"><Loader2 className="animate-spin mx-auto text-pink-500" /></div>;

    if (error) return (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">Failed to load: {error}</p>
            <p className="text-sm text-gray-500 mt-2">This may require a Firestore index. Check the console.</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Confirmation Modal */}
            {confirmModal.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-lg font-bold dark:text-white mb-2">Confirm Action</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to <span className="font-bold">{confirmModal.action}</span> creator "{confirmModal.name}"?
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
                    <Users className="text-pink-500" />
                    Creator Management
                </h2>

                {/* Filter Tabs */}
                <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {[
                        { id: 'pending', label: 'Pending', count: allCreators.filter(c => c.status === 'pending').length },
                        { id: 'approved', label: 'Approved', count: allCreators.filter(c => c.status === 'approved').length },
                        { id: 'all', label: 'All', count: allCreators.length }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFilter === tab.id
                                ? 'bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </div>

            {filteredCreators.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500">No {activeFilter === 'all' ? '' : activeFilter} creators found.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredCreators.map(req => (
                        <div key={req.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg dark:text-white">{req.displayName}</h3>
                                    {getStatusBadge(req.status)}
                                </div>
                                <p className="text-sm text-gray-500 font-mono mb-1">{req.email}</p>
                                <div className="flex gap-2 text-xs flex-wrap">
                                    <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded">Code: {req.affiliateCode}</span>
                                    <span className="text-gray-400">Applied: {req.appliedAt?.toDate?.().toLocaleDateString() || 'N/A'}</span>
                                    {req.reviewedBy && <span className="text-gray-400">Reviewed by: {req.reviewedBy}</span>}
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
                                                    onClick={() => openConfirm(req.id, 'rejected', req.displayName)}
                                                    className="flex-1 md:flex-none px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <X className="w-4 h-4" /> Reject
                                                </button>
                                                <button
                                                    onClick={() => openConfirm(req.id, 'approved', req.displayName)}
                                                    className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Check className="w-4 h-4" /> Approve
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => openConfirm(req.id, 'delete', req.displayName)}
                                            className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete creator"
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

// --- SUB-COMPONENT: Admin Management ---
function AdminManagement({ user, isSuperAdmin }) {
    const [admins, setAdmins] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'admins'),
            (snap) => {
                setAdmins(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error("AdminManagement query failed:", err);
                setError(err.message);
                setLoading(false);
            }
        );
        return () => unsub();
    }, []);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        if (!newAdminEmail.trim()) return;
        setAdding(true);
        try {
            // 1. Find user by email (This is tricky without an admin SDK, so we rely on a manual input for now
            // OR we assume the admin knows the exact email. Ideally we should verify it.)

            // For now, since we can't easily query Auth by email from client, 
            // we will query the 'users' collection where we sync user data.
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', newAdminEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("User not found! They must log in to the app at least once.");
                setAdding(false);
                return;
            }

            const targetUserDoc = querySnapshot.docs[0];
            const targetUid = targetUserDoc.id;

            // 2. Add to admins collection
            await setDoc(doc(db, 'admins', targetUid), {
                email: newAdminEmail,
                role: 'admin',
                addedBy: user.email,
                addedAt: Timestamp.now()
            });

            setNewAdminEmail('');
            alert(`Added ${newAdminEmail} as admin!`);
        } catch (err) {
            console.error(err);
            alert("Failed to add admin: " + err.message);
        } finally {
            setAdding(false);
        }
    };

    const handleRemove = async (adminId) => {
        if (!confirm("Remove this admin? They will lose access immediately.")) return;
        try {
            await deleteDoc(doc(db, 'admins', adminId));
        } catch (err) {
            console.error(err);
            alert("Failed to remove admin");
        }
    };

    if (loading) return <div className="text-center p-8"><Loader2 className="animate-spin mx-auto text-pink-500" /></div>;

    if (error) return (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">Failed to load admins: {error}</p>
        </div>
    );

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Warning Banner */}
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800 flex gap-3 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="shrink-0" />
                <div>
                    <h4 className="font-bold">Access Control</h4>
                    <p className="text-sm opacity-90">Admins have full access to analytics, support messages, and ad management. Only grant this to trusted team members.</p>
                </div>
            </div>

            {/* Add Admin Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4 dark:text-white">Add New Admin</h3>
                <form onSubmit={handleAddAdmin} className="flex gap-4">
                    <input
                        type="email"
                        placeholder="Enter user email address"
                        value={newAdminEmail}
                        onChange={e => setNewAdminEmail(e.target.value)}
                        className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-pink-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={adding}
                        className="px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {adding ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        Add Admin
                    </button>
                </form>
            </div>

            {/* Admin List */}
            <div>
                <h3 className="font-bold text-lg mb-4 dark:text-white">Current Admins</h3>
                <div className="space-y-3">
                    {/* Always show Super Admin */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 opacity-75">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                D
                            </div>
                            <div>
                                <p className="font-bold dark:text-white">djkrss1@gmail.com</p>
                                <p className="text-xs text-pink-500 font-bold uppercase">Super Admin</p>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">Owner</span>
                    </div>

                    {/* Dynamic Admins */}
                    {admins.map(admin => (
                        <div key={admin.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold">
                                    {admin.email[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold dark:text-white">{admin.email}</p>
                                    <p className="text-xs text-gray-500">Added by {admin.addedBy?.split('@')[0]}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(admin.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
