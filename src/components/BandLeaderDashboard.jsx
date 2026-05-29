import React, { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard, Plus, Settings, Users, ArrowUpRight, Copy, Check, MoreVertical,
    Loader2, DollarSign, Image as ImageIcon, Shirt, Box, PackageOpen, ScanLine, AlertCircle
} from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BandLeaderDashboard({ user, onExit }) {
    const [activeTab, setActiveTab] = useState('overview'); // overview, sections, roster, scanner
    const [stats, setStats] = useState({
        totalMasqueraders: 0,
        activeSections: 0,
        distributedCount: 0
    });
    const [sections, setSections] = useState([]);
    const [roster, setRoster] = useState([]);
    const [loading, setLoading] = useState(true);

    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState('');
    const scannerRef = useRef(null);
    const scannerId = "qr-reader";

    // Load Data
    useEffect(() => {
        if (!user) return;
        setLoading(true);

        // Sub to Band's Official Listings (Sections)
        const qSections = query(collection(db, 'marketplaceListings'), where('sellerId', '==', user.uid), where('category', '==', 'costume'));
        const unsubSections = onSnapshot(qSections, (snap) => {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setSections(items);
            setStats(s => ({ ...s, activeSections: items.length }));
        });

        // Sub to Orders for this Band (Roster)
        const qOrders = query(collection(db, 'marketplaceOrders'), where('sellerId', '==', user.uid), where('status', '==', 'completed'));
        const unsubOrders = onSnapshot(qOrders, (snap) => {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setRoster(items);
            setStats(s => ({
                ...s,
                totalMasqueraders: items.length,
                distributedCount: items.filter(i => i.distributionStatus === 'Distributed').length
            }));
            setLoading(false);
        });

        return () => {
            unsubSections();
            unsubOrders();
        };
    }, [user]);

    // QR Scanner Initialization
    useEffect(() => {
        if (activeTab === 'scanner') {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                scannerId,
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );

            html5QrcodeScanner.render(
                (decodedText) => handleScanSuccess(decodedText, html5QrcodeScanner),
                (err) => { /* Ignore background scan errors */ }
            );
            scannerRef.current = html5QrcodeScanner;
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(console.error);
                scannerRef.current = null;
            }
        };
    }, [activeTab]);

    const handleScanSuccess = async (decodedText, scannerInstance) => {
        // Pauses scanning
        if (scannerInstance) scannerInstance.pause();
        setScanning(true);
        setScanError('');
        setScanResult(null);

        try {
            // Expected Format: "ORDER_ID:12345"
            const parts = decodedText.split(':');
            if (parts.length !== 2 || parts[0] !== 'ORDER_ID') {
                throw new Error("Invalid Carnival Planner QR Code");
            }
            const orderId = parts[1];

            // Verify Order belongs to this band
            const orderRef = doc(db, 'marketplaceOrders', orderId);
            const orderSnap = await getDoc(orderRef);

            if (!orderSnap.exists()) {
                throw new Error("Order not found");
            }

            const orderData = orderSnap.data();

            if (orderData.sellerId !== user.uid) {
                throw new Error("Order belongs to another Band");
            }

            if (orderData.distributionStatus === 'Distributed') {
                throw new Error("Costume already marked as Distributed!");
            }

            // Update status
            await updateDoc(orderRef, {
                distributionStatus: 'Distributed',
                distributedAt: new Date()
            });

            setScanResult({
                success: true,
                orderId,
                buyerName: orderData.buyerName || 'Masquerader',
                listingTitle: orderData.listingTitle || 'Costume'
            });

        } catch (err) {
            setScanError(err.message);
        } finally {
            setScanning(false);
        }
    };

    const resumeScanning = () => {
        setScanResult(null);
        setScanError('');
        if (scannerRef.current) scannerRef.current.resume();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/20">
                        <Box className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 dark:text-white leading-tight">BandOS</h2>
                        <span className="text-[10px] uppercase bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 font-bold tracking-wider">
                            BAND LEADER
                        </span>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavButton
                        active={activeTab === 'overview'}
                        label="Overview"
                        icon={<LayoutDashboard className="w-4 h-4" />}
                        onClick={() => setActiveTab('overview')}
                    />
                    <NavButton
                        active={activeTab === 'sections'}
                        label="Costume Sections"
                        icon={<Shirt className="w-4 h-4" />}
                        onClick={() => setActiveTab('sections')}
                    />
                    <NavButton
                        active={activeTab === 'roster'}
                        label="Masquerader Roster"
                        icon={<Users className="w-4 h-4" />}
                        onClick={() => setActiveTab('roster')}
                    />
                    <NavButton
                        active={activeTab === 'scanner'}
                        label="Distribution Scanner"
                        icon={<ScanLine className="w-4 h-4" />}
                        onClick={() => setActiveTab('scanner')}
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                        {activeTab === 'scanner' ? 'Costume Distribution' : activeTab}
                    </h1>
                    <button onClick={onExit} className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Back to Profile
                    </button>
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatCard
                                label="Total Masqueraders"
                                value={stats.totalMasqueraders}
                                icon={<Users className="text-blue-500" />}
                            />
                            <StatCard
                                label="Active Sections"
                                value={stats.activeSections}
                                icon={<Shirt className="text-pink-500" />}
                            />
                            <StatCard
                                label="Distributed Costumes"
                                value={`${stats.distributedCount} / ${stats.totalMasqueraders}`}
                                icon={<PackageOpen className="text-teal-500" />}
                            />
                        </div>

                        {/* Recent Registrations mini-list */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Recent Registrations</h2>
                            {roster.length === 0 ? (
                                <p className="text-sm text-gray-500">No masqueraders registered yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {roster.slice(0, 5).map(r => (
                                        <div key={r.id} className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{r.buyerName || 'Masquerader'}</p>
                                                <p className="text-xs text-gray-500">{r.listingTitle}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${r.distributionStatus === 'Distributed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                {r.distributionStatus || 'Pending'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SECTIONS TAB */}
                {activeTab === 'sections' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                            <div>
                                <h3 className="font-bold text-purple-900 dark:text-purple-300">Manage Sections</h3>
                                <p className="text-sm text-purple-700 dark:text-purple-400">Head over to the Marketplace to add or edit sections.</p>
                            </div>
                        </div>

                        {sections.length === 0 ? (
                            <div className="text-center py-10">
                                <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No active costume sections found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {sections.map(s => (
                                    <div key={s.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4 items-center shadow-sm">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                            {s.imageUrl ? (
                                                <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><Shirt className="text-gray-400" /></div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white truncate">{s.title}</h4>
                                            <p className="text-sm text-gray-500">${s.price}</p>
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded">
                                                {s.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ROSTER TAB */}
                {activeTab === 'roster' && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-3">Masquerader</th>
                                        <th className="px-6 py-3">Section</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Order ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roster.map(r => (
                                        <tr key={r.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {r.buyerName || 'Masquerader'}
                                                {r.buyerEmail && <div className="text-xs text-gray-500 font-normal">{r.buyerEmail}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {r.listingTitle}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded text-xs font-bold ${r.distributionStatus === 'Distributed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'}`}>
                                                    {r.distributionStatus || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-gray-500">
                                                {r.id.substring(0, 8)}...
                                            </td>
                                        </tr>
                                    ))}
                                    {roster.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">
                                                No roster data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


                {/* SCANNER TAB */}
                {activeTab === 'scanner' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                            <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                                <ScanLine className="w-5 h-5 text-purple-500" />
                                Scan Distribution QR
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">
                                Scanner requires camera access. Scan the masquerader's QR code from their Road Mode or Order History.
                            </p>

                            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-black mb-6 flex justify-center items-center">
                                {/* The container ID must exactly match what Html5QrcodeScanner expects */}
                                <div id={scannerId} className="w-full max-w-sm"></div>
                            </div>

                            {/* Scan Results */}
                            {scanResult && (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 text-center">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="font-bold text-green-900 dark:text-green-300 text-lg">Verified!</h3>
                                    <p className="text-green-700 dark:text-green-400 text-sm mt-1 mb-4">
                                        <strong>{scanResult.buyerName}</strong> is cleared for: <br />
                                        <span className="italic">{scanResult.listingTitle}</span>
                                    </p>
                                    <button
                                        onClick={resumeScanning}
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                                    >
                                        Scan Next
                                    </button>
                                </div>
                            )}

                            {scanError && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 text-center">
                                    <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h3 className="font-bold text-red-900 dark:text-red-300 text-lg">Scan Failed</h3>
                                    <p className="text-red-700 dark:text-red-400 text-sm mt-1 mb-4">{scanError}</p>
                                    <button
                                        onClick={resumeScanning}
                                        className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function NavButton({ active, label, icon, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-sm font-bold ${active
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
        </button>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg">{icon}</div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white mt-2">{value}</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{label}</p>
        </div>
    );
}
