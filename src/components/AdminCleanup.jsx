import React, { useState, useMemo } from 'react';
import { Trash2, AlertTriangle, ShieldAlert, Check, X } from 'lucide-react';

export default function AdminCleanup({ users, onDeleteUser, onDeleteAll, onClose }) {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

    // Filter for potential "ghost" users
    // Defined as: No email AND No display name (or default 'User')
    const ghostUsers = useMemo(() => {
        return users.filter(u => {
            const hasEmail = u.profile?.email && u.profile.email.trim() !== '';
            const hasName = u.profile?.displayName && u.profile.displayName.trim() !== '' && u.profile.displayName !== 'User';
            // We consider it a "ghost" if it lacks BOTH useful identifiers
            return !hasEmail && !hasName;
        });
    }, [users]);

    const handleSelect = (id) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const handleSelectAll = () => {
        if (selectedIds.size === ghostUsers.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(ghostUsers.map(u => u.id)));
        }
    };

    const executeBatchDelete = () => {
        if (confirmDeleteAll) {
            onDeleteAll(Array.from(selectedIds));
            setConfirmDeleteAll(false);
            setSelectedIds(new Set());
        } else {
            setConfirmDeleteAll(true);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">Database Cleanup</h3>
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                            Found {ghostUsers.length} incomplete records
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {ghostUsers.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <Check className="w-12 h-12 mx-auto mb-3 text-green-500 opacity-50" />
                        <p>Database is clean! No incomplete users found.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.size > 0 && selectedIds.size === ghostUsers.length}
                                    onChange={handleSelectAll}
                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Select All ({ghostUsers.length})
                                </span>
                            </div>

                            {selectedIds.size > 0 && (
                                <button
                                    onClick={executeBatchDelete}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${confirmDeleteAll
                                            ? 'bg-red-600 text-white hover:bg-red-700'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300'
                                        }`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {confirmDeleteAll ? 'CONFIRM DELETION' : `Delete (${selectedIds.size})`}
                                </button>
                            )}
                        </div>

                        <div className="max-h-[300px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 font-medium sticky top-0 backdrop-blur-sm">
                                    <tr>
                                        <th className="p-3 w-10"></th>
                                        <th className="p-3">User ID</th>
                                        <th className="p-3">Created</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {ghostUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(user.id)}
                                                    onChange={() => handleSelect(user.id)}
                                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                />
                                            </td>
                                            <td className="p-3 font-mono text-xs text-gray-500">{user.id}</td>
                                            <td className="p-3 text-gray-600 dark:text-gray-300">
                                                {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'Unknown'}
                                            </td>
                                            <td className="p-3 text-right">
                                                <button
                                                    onClick={() => onDeleteUser(user.id)}
                                                    className="text-gray-400 hover:text-red-500 transition"
                                                    title="Delete single user"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* Footer Warning */}
            {ghostUsers.length > 0 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border-t border-yellow-100 dark:border-yellow-900/20 flex items-start gap-3 text-xs text-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                        <strong>Warning:</strong> Deleting users is permanent. This will remove their record from the 'users' collection.
                        If they sign in again, a new record will be created.
                    </p>
                </div>
            )}
        </div>
    );
}
