import React, { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard, Plus, Settings, Users, ArrowUpRight, Copy, Check, MoreVertical,
    Loader2, DollarSign, Image as ImageIcon, Shirt, Box, PackageOpen, ScanLine, AlertCircle,
    BookOpen
} from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Html5QrcodeScanner } from 'html5-qrcode';
import CostumeBuilder from './bandos/CostumeBuilder';
import TimeSlotManager from './bandos/TimeSlotManager';
import BandCRM from './bandos/BandCRM';
import BandFinancials from './bandos/BandFinancials';
import { supabase } from '../supabaseClient';

export default function BandLeaderDashboard({ user, onExit, onClose }) {
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

        const loadDashboardData = async () => {
            try {
                // 1. Fetch sections from Supabase
                const { data: sbSections, error: secErr } = await supabase
                    .from('band_costume_sections')
                    .select('*')
                    .eq('band_id', user.uid);
                
                if (secErr) throw secErr;

                // 2. Fetch orders from Supabase
                const { data: sbOrders, error: ordErr } = await supabase
                    .from('band_orders')
                    .select(`
                        *,
                        band_costume_sections (title)
                    `)
                    .eq('band_id', user.uid)
                    .order('created_at', { ascending: false });

                if (ordErr) throw ordErr;

                // Convert Supabase orders to match the roster format expected in the overview tab
                const formattedOrders = (sbOrders || []).map(o => ({
                    id: o.id,
                    buyerName: o.buyer_name,
                    listingTitle: o.band_costume_sections?.title || 'Costume',
                    distributionStatus: o.distribution_status,
                    createdAt: o.created_at
                }));

                setSections(sbSections || []);
                setRoster(formattedOrders);
                setStats({
                    totalMasqueraders: formattedOrders.length,
                    activeSections: (sbSections || []).length,
                    distributedCount: formattedOrders.filter(i => i.distributionStatus === 'Distributed').length
                });

            } catch (err) {
                console.error("Error loading BandOS Dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();

        // Set up real-time subscription for orders and sections
        const ordersChannel = supabase.channel('band_orders_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'band_orders', filter: `band_id=eq.${user.uid}` }, payload => {
                loadDashboardData();
            })
            .subscribe();

        const sectionsChannel = supabase.channel('band_sections_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'band_costume_sections', filter: `band_id=eq.${user.uid}` }, payload => {
                loadDashboardData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(ordersChannel);
            supabase.removeChannel(sectionsChannel);
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

            // Verify Order belongs to this band in Supabase
            const { data: orderData, error } = await supabase
                .from('band_orders')
                .select('*, band_costume_sections(title)')
                .eq('id', orderId)
                .single();

            if (error || !orderData) {
                // Fallback to check if it's a legacy Firebase order
                const legacyOrderRef = doc(db, 'marketplaceOrders', orderId);
                const legacyOrderSnap = await getDoc(legacyOrderRef);
                if (!legacyOrderSnap.exists()) {
                    throw new Error("Order not found in system.");
                }
                const legacyData = legacyOrderSnap.data();
                if (legacyData.sellerId !== user.uid) throw new Error("Order belongs to another Band");
                if (legacyData.distributionStatus === 'Distributed') throw new Error("Costume already marked as Distributed!");
                
                await updateDoc(legacyOrderRef, {
                    distributionStatus: 'Distributed',
                    distributedAt: new Date()
                });
                
                setScanResult({
                    success: true,
                    orderId,
                    buyerName: legacyData.buyerName || 'Masquerader',
                    listingTitle: legacyData.listingTitle || 'Costume',
                    warehouseLocation: 'Legacy Section',
                    isLegacy: true
                });
                return;
            }

            if (orderData.band_id !== user.uid) {
                throw new Error("Order belongs to another Band");
            }

            if (orderData.distribution_status === 'Distributed') {
                throw new Error("Costume already marked as Distributed!");
            }

            // Update status in Supabase
            const { error: updateError } = await supabase
                .from('band_orders')
                .update({ 
                    distribution_status: 'Distributed',
                    distributed_at: new Date().toISOString(),
                    distributed_by: user.uid
                })
                .eq('id', orderId);

            if (updateError) throw updateError;

            // Check if this was a proxy pickup (Squad pickup)
            const isProxy = orderData.proxy_pickup_id && orderData.proxy_pickup_id !== orderData.buyer_id;

            setScanResult({
                success: true,
                orderId,
                buyerName: orderData.buyer_name || 'Masquerader',
                listingTitle: orderData.band_costume_sections?.title || 'Costume',
                warehouseLocation: orderData.warehouse_location || 'Main Floor',
                isProxy,
                variants: orderData.selected_variants || {}
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
                        label="Sections & Inventory"
                        icon={<Shirt className="w-4 h-4" />}
                        onClick={() => setActiveTab('sections')}
                    />
                    <NavButton
                        active={activeTab === 'financials'}
                        label="Financials"
                        icon={<DollarSign className="w-4 h-4" />}
                        onClick={() => setActiveTab('financials')}
                    />
                    <NavButton
                        active={activeTab === 'roster'}
                        label="Masquerader Roster"
                        icon={<Users className="w-4 h-4" />}
                        onClick={() => setActiveTab('roster')}
                    />
                    <NavButton
                        active={activeTab === 'logistics'}
                        label="Logistics & Slots"
                        icon={<Box className="w-4 h-4" />}
                        onClick={() => setActiveTab('logistics')}
                    />
                    <NavButton
                        active={activeTab === 'scanner'}
                        label="Distribution Scanner"
                        icon={<ScanLine className="w-4 h-4" />}
                        onClick={() => setActiveTab('scanner')}
                    />
                    <NavButton
                        active={activeTab === 'playbook'}
                        label="Guide Playbook"
                        icon={<BookOpen className="w-4 h-4" />}
                        onClick={() => setActiveTab('playbook')}
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                        {activeTab === 'scanner' ? 'Costume Distribution' : activeTab}
                    </h1>
                    <button onClick={onExit || onClose} className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
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
                        <CostumeBuilder bandId={user.uid} />
                    </div>
                )}

                {/* FINANCIALS TAB */}
                {activeTab === 'financials' && (
                    <div className="h-full">
                        <BandFinancials bandId={user.uid} />
                    </div>
                )}

                {/* ROSTER TAB */}
                {activeTab === 'roster' && (
                    <div className="h-full">
                        <BandCRM bandId={user.uid} />
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
                                    <p className="text-green-700 dark:text-green-400 text-sm mt-1 mb-2">
                                        <strong>{scanResult.buyerName}</strong> is cleared for: <br />
                                        <span className="italic">{scanResult.listingTitle}</span>
                                    </p>
                                    
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 text-left border border-green-200 dark:border-green-700 shadow-sm">
                                        <div className="text-xs text-gray-500 uppercase font-bold mb-1">Fulfillment Details</div>
                                        <p className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                                            <Box className="w-4 h-4" /> Aisle: {scanResult.warehouseLocation}
                                        </p>
                                        {!scanResult.isLegacy && Object.entries(scanResult.variants || {}).map(([k, v]) => (
                                            <p key={k} className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                                <span className="font-medium">{k.replace('_', ' ')}:</span> {v}
                                            </p>
                                        ))}
                                        {scanResult.isProxy && (
                                            <div className="mt-2 p-2 bg-purple-100 text-purple-700 rounded text-xs font-bold border border-purple-200">
                                                SQUAD PROXY PICKUP AUTHORIZED
                                            </div>
                                        )}
                                    </div>

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

                {/* LOGISTICS TAB */}
                {activeTab === 'logistics' && (
                    <div className="space-y-4">
                        <TimeSlotManager bandId={user.uid} />
                    </div>
                )}

                {/* PLAYBOOK TAB */}
                {activeTab === 'playbook' && (
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-8 animate-fadeIn text-left">
                        <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900 text-white rounded-2xl p-6 shadow-md mb-6">
                            <h2 className="text-2xl font-black mb-2">BandOS Enterprise Playbook</h2>
                            <p className="text-purple-200 text-sm">Your comprehensive master guide to operating your band at scale using the BandOS suite.</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 mb-3">1. Operational Overview</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    BandOS is an enterprise management suite designed specifically for carnival band leaders. It consolidates costume manufacturing, inventory matrices, secure payments, masquerader registration management, and QR-based logistics fulfillment into a single control panel.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-4 rounded-xl">
                                        <h4 className="font-bold text-purple-900 dark:text-purple-400 text-sm mb-1">Inventory Management</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Configure size profiles, belts, custom collar upgrades, and set hard stock caps to prevent overselling.</p>
                                    </div>
                                    <div className="bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 p-4 rounded-xl">
                                        <h4 className="font-bold text-pink-900 dark:text-pink-400 text-sm mb-1">CRM & Roster Portability</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Search masqueraders, send mass push notifications, and import/export lists in clean CSV format.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 mb-3">2. Costume Builder (Tab: Sections)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    Use the **Sections** tab to create your costume catalogue. You can define base listing prices and configure down-payment deposit amounts.
                                </p>
                                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 rounded-xl mb-4 text-amber-800 dark:text-amber-300 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="font-bold text-sm">Logistical Stock Control</h5>
                                        <p className="text-xs opacity-90 mt-0.5">Always set inventory caps on popular sections. Leave blank only if you have unlimited raw materials for feathers/wireframes.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 mb-3">3. Masquerader CRM & Portability (Tab: CRM)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    The **Roster** tab provides advanced data portability features:
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                                    <li><strong>Exporting:</strong> Use checkboxes to export a custom selected set, or export the currently searched list to standard CSV formats.</li>
                                    <li><strong>Importing:</strong> Map legacy CSV columns (e.g. `Name`, `Email`, `Section`, `Amount Paid`) to bulk import masqueraders from other platforms.</li>
                                    <li><strong>Broadcasts:</strong> Send mass real-time push messages to alert masqueraders of pickup schedule changes or emergency notifications.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 mb-3">4. QR Code Fulfillment (Tab: Scanner)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    Eliminate distribution day queues. Scan the QR code presented in the masquerader's Digital Passport.
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Scanner Responses</h4>
                                    <div className="space-y-2">
                                        <div className="flex gap-2 items-center text-xs text-green-700 dark:text-green-400">
                                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                                            <strong>Green (Verified):</strong> Displays customer sizes, options, and warehouse aisle/bin location.
                                        </div>
                                        <div className="flex gap-2 items-center text-xs text-yellow-700 dark:text-yellow-400">
                                            <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                                            <strong>Yellow (Already Distributed):</strong> Costume has already been marked as picked up.
                                        </div>
                                        <div className="flex gap-2 items-center text-xs text-red-700 dark:text-red-400">
                                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                                            <strong>Red (Error):</strong> Ticket belongs to another band, or does not exist in the database.
                                        </div>
                                    </div>
                                </div>
                            </div>
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
