import React, { useState, useEffect } from 'react';
import {
    collection, query, onSnapshot, doc, updateDoc, orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import {
    Users, Search, CheckCircle, XCircle,
    DollarSign, Percent, MoreVertical, Award
} from 'lucide-react';

export default function AffiliateManager() {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected

    useEffect(() => {
        // Fetch affiliates ordered by application date (newest first)
        const q = query(collection(db, 'affiliates'), orderBy('appliedAt', 'desc'));

        const unsub = onSnapshot(q, (snap) => {
            const list = [];
            snap.forEach(d => list.push({ id: d.id, ...d.data() }));
            setAffiliates(list);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        if (!confirm(`Are you sure you want to mark this affiliate as ${newStatus}?`)) return;
        try {
            await updateDoc(doc(db, 'affiliates', id), {
                status: newStatus
            });
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status.');
        }
    };

    const handleUpdateCommission = async (id, currentRate) => {
        const newRateRaw = prompt(`Enter new commission rate (e.g., 25 for 25%):`, (currentRate * 100).toFixed(0));
        if (!newRateRaw) return;

        const newRate = parseFloat(newRateRaw) / 100;
        if (isNaN(newRate) || newRate < 0 || newRate > 1) {
            alert('Invalid rate. Please enter a number between 0 and 100.');
            return;
        }

        try {
            await updateDoc(doc(db, 'affiliates', id), {
                commissionRate: newRate
            });
        } catch (err) {
            console.error('Error updating commission:', err);
            alert('Failed to update commission rate.');
        }
    };

    const filteredAffiliates = affiliates.filter(a => {
        const matchesSearch =
            (a.displayName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (a.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (a.affiliateCode?.toLowerCase() || '').includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === 'all' || a.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading Affiliates...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        Affiliate Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Review applications, set commission rates, and track ambassador performance.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or code..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm dark:text-white"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm dark:text-white"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">Ambassador</th>
                                <th className="px-6 py-4 font-medium">Code</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Performance</th>
                                <th className="px-6 py-4 font-medium">Comm. Rate</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {filteredAffiliates.map(affiliate => (
                                <tr key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {affiliate.displayName || 'Unknown'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {affiliate.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md">
                                            {affiliate.affiliateCode}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {affiliate.status === 'approved' && (
                                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                                                <CheckCircle className="w-3 h-3" /> Approved
                                            </span>
                                        )}
                                        {affiliate.status === 'pending' && (
                                            <span className="inline-flex items-center gap-1 text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-medium">
                                                <Users className="w-3 h-3" /> Pending
                                            </span>
                                        )}
                                        {affiliate.status === 'rejected' && (
                                            <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                                                <XCircle className="w-3 h-3" /> Rejected
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 dark:text-white font-medium">
                                            ${(affiliate.totalEarnings || 0).toFixed(2)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {affiliate.totalConversions || 0} conversions
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleUpdateCommission(affiliate.id, affiliate.commissionRate || 0.20)}
                                            className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                                        >
                                            <span className="font-medium">
                                                {((affiliate.commissionRate || 0.20) * 100).toFixed(0)}%
                                            </span>
                                            <Percent className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {affiliate.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(affiliate.id, 'approved')}
                                                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
                                                    title="Approve Affiliate"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {affiliate.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleUpdateStatus(affiliate.id, 'rejected')}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                                    title="Reject Affiliate"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredAffiliates.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <Award className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No affiliates found matching your criteria.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
