import React, { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard, Plus, Settings, Users, ArrowUpRight, Copy, Check, MoreVertical,
    Loader2, DollarSign, Image as ImageIcon, Shirt, Box, PackageOpen, ScanLine, AlertCircle,
    BookOpen, Award
} from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Html5QrcodeScanner } from 'html5-qrcode';
import CostumeBuilder from './bandos/CostumeBuilder';
import TimeSlotManager from './bandos/TimeSlotManager';
import BandCRM from './bandos/BandCRM';
import BandFinancials from './bandos/BandFinancials';
import BandAmbassadors from './bandos/BandAmbassadors';
import { supabase } from '../supabaseClient';
import { bandOSService } from '../services/bandOSService';
import { offlineDistributionService } from '../services/offlineDistributionService';
import { Palette, CalendarClock, Link as LinkIcon, ExternalLink, Layers, Search, Volume2, CheckCircle2, Radio, Wifi, WifiOff, DownloadCloud, UploadCloud } from 'lucide-react';
const PaymentPlanBuilder = React.lazy(() => import('./bandos/PaymentPlanBuilder'));
const InventoryMatrix = React.lazy(() => import('./bandos/InventoryMatrix'));
const RoadRadar = React.lazy(() => import('./bandos/RoadRadar'));
const BandPlaybook = React.lazy(() => import('./bandos/BandPlaybook'));

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
    
    const [brandingData, setBrandingData] = useState({
        logo_url: '', hero_image_url: '', tagline: '', primary_color: '#ec4899', secondary_color: '#8b5cf6', slug: '', carnival_city: '', instagram_handle: '', facebook_url: ''
    });
    const [brandingSaving, setBrandingSaving] = useState(false);

    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState('');
    const scannerRef = useRef(null);
    const scannerId = "qr-reader";

    // Phase 2: Live Distribution State & Audio
    const [distMetrics, setDistMetrics] = useState({ total: 0, distributed: 0, percentage: 0, pickupsToday: 0, avgWaitMinutes: 4.5 });
    const [manualSearchQuery, setManualSearchQuery] = useState('');
    const [manualResults, setManualResults] = useState([]);
    const [isSearchingManual, setIsSearchingManual] = useState(false);

    const playChime = (success = true) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            if (success) {
                osc.frequency.setValueAtTime(587.33, ctx.currentTime);
                osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, ctx.currentTime);
                osc.frequency.setValueAtTime(160, ctx.currentTime + 0.15);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            }
        } catch (e) {}
    };

    // Phase 3: Offline Mas Camp Mode & Sync
    const [offlineStatus, setOfflineStatus] = useState({ hasCache: false, count: 0, pendingSyncCount: 0 });
    const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const [isSyncing, setIsSyncing] = useState(false);

    const checkOfflineStatus = () => {
        if (!user?.uid) return;
        const status = offlineDistributionService.getCacheStatus(user.uid);
        setOfflineStatus(status);
    };

    useEffect(() => {
        const updateNet = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', updateNet);
        window.addEventListener('offline', updateNet);
        checkOfflineStatus();
        return () => {
            window.removeEventListener('online', updateNet);
            window.removeEventListener('offline', updateNet);
        };
    }, [user?.uid]);

    const handleCacheRoster = async () => {
        if (!user?.uid) {
            alert('Please sign in as a band leader to cache roster.');
            return;
        }
        setIsSyncing(true);
        const res = await offlineDistributionService.cacheRosterForOffline(user.uid);
        checkOfflineStatus();
        setIsSyncing(false);
        if (res.success) {
            alert(`✅ Roster cached for offline mas camp! (${res.count} masqueraders ready for offline QR scanning)`);
        } else {
            alert('Failed to cache roster for offline mode');
        }
    };

    const handleSyncPending = async () => {
        if (!user?.uid) return;
        setIsSyncing(true);
        const res = await offlineDistributionService.syncPendingQueue(user.uid);
        checkOfflineStatus();
        setIsSyncing(false);
        alert(`✅ Synced ${res.synced} offline pickups to cloud!`);
    };

    // Load Data
    useEffect(() => {
        const bandId = user?.uid;
        if (!bandId) {
            setLoading(false);
            return;
        }
        setLoading(true);

        const loadDashboardData = async () => {
            try {
                let sbSections = [];
                let sbOrders = [];

                if (supabase) {
                    try {
                        const { data: secData } = await supabase
                            .from('band_costume_sections')
                            .select('*')
                            .eq('band_id', bandId);
                        if (secData) sbSections = secData;

                        const { data: ordData } = await supabase
                            .from('band_orders')
                            .select(`*, band_costume_sections (title)`)
                            .eq('band_id', bandId)
                            .order('created_at', { ascending: false });
                        if (ordData) sbOrders = ordData;

                        const { data: bandProfile } = await supabase
                            .from('band_profiles')
                            .select('*')
                            .eq('id', bandId)
                            .single();
                        if (bandProfile) {
                            setBrandingData(prev => ({ ...prev, ...bandProfile }));
                        }
                    } catch (e) {
                        console.warn('[BandOS] Supabase live query notice:', e.message);
                    }
                }

                // Fallback demo data if queries returned empty
                if (sbSections.length === 0) {
                    sbSections = [
                        { id: 'sec-1', title: 'Frontline Feathers — Solstice', base_price: 1250, deposit_amount: 400 },
                        { id: 'sec-2', title: 'Backline Masquerader — Eclipse', base_price: 750, deposit_amount: 250 }
                    ];
                }

                if (sbOrders.length === 0) {
                    sbOrders = [
                        { id: 'ORD-1092', buyer_name: 'Jade Alexander', band_costume_sections: { title: 'Frontline Feathers — Solstice' }, distribution_status: 'Pending', created_at: new Date().toISOString() },
                        { id: 'ORD-1088', buyer_name: 'Marcus Thorne', band_costume_sections: { title: 'Backline Masquerader — Eclipse' }, distribution_status: 'Distributed', created_at: new Date(Date.now() - 86400000).toISOString() }
                    ];
                }

                const formattedOrders = sbOrders.map(o => ({
                    id: o.id,
                    buyerName: o.buyer_name || o.buyerName || 'Masquerader',
                    listingTitle: o.band_costume_sections?.title || o.listingTitle || 'Costume',
                    distributionStatus: o.distribution_status || o.distributionStatus || 'Pending',
                    createdAt: o.created_at || o.createdAt
                }));

                setSections(sbSections);
                setRoster(formattedOrders);
                setStats({
                    totalMasqueraders: formattedOrders.length,
                    activeSections: sbSections.length,
                    distributedCount: formattedOrders.filter(i => i.distributionStatus === 'Distributed').length
                });

            } catch (err) {
                console.error("Error loading BandOS Dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();

        let ordersChannel;
        let sectionsChannel;

        if (supabase && user && user.uid) {
            ordersChannel = supabase.channel('band_orders_changes')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'band_orders', filter: `band_id=eq.${user.uid}` }, () => {
                    loadDashboardData();
                })
                .subscribe();

            sectionsChannel = supabase.channel('band_sections_changes')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'band_costume_sections', filter: `band_id=eq.${user.uid}` }, () => {
                    loadDashboardData();
                })
                .subscribe();
        }

        return () => {
            if (ordersChannel) supabase.removeChannel(ordersChannel);
            if (sectionsChannel) supabase.removeChannel(sectionsChannel);
        };
    }, [user]);

    // QR Scanner Initialization (Delayed for DOM mounting)
    useEffect(() => {
        let timerId;
        if (activeTab === 'scanner') {
            timerId = setTimeout(() => {
                const scannerElement = document.getElementById(scannerId);
                if (scannerElement) {
                    try {
                        const html5QrcodeScanner = new Html5QrcodeScanner(
                            scannerId,
                            { fps: 10, qrbox: { width: 250, height: 250 } },
                            false
                        );

                        html5QrcodeScanner.render(
                            (decodedText) => handleScanSuccess(decodedText, html5QrcodeScanner),
                            () => { /* Ignore background scan errors */ }
                        );
                        scannerRef.current = html5QrcodeScanner;
                    } catch (e) {
                        console.warn("Scanner init notice:", e.message);
                    }
                }
            }, 150);
        }

        return () => {
            if (timerId) clearTimeout(timerId);
            if (scannerRef.current) {
                scannerRef.current.clear().catch(console.error);
                scannerRef.current = null;
            }
        };
    }, [activeTab]);

    const handleSaveBranding = async (e) => {
        e.preventDefault();
        setBrandingSaving(true);
        try {
            await bandOSService.updateBandBranding(user.uid, brandingData);
            alert('Branding saved successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to save branding');
        } finally {
            setBrandingSaving(false);
        }
    };

    const copyPublicLink = () => {
        if (!brandingData.slug) return alert("Set a slug first.");
        const url = `${window.location.origin}/band/${brandingData.slug}`;
        navigator.clipboard.writeText(url);
        alert('Public link copied to clipboard!');
    };

    const loadDistMetrics = async () => {
        if (!user?.uid) return;
        try {
            const m = await bandOSService.getDistributionMetrics(user.uid);
            if (m) setDistMetrics(m);
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        if (activeTab === 'scanner') {
            loadDistMetrics();
        }
    }, [activeTab]);

    const handleManualSearch = async (queryText) => {
        setManualSearchQuery(queryText);
        if (!queryText.trim() || !user?.uid) {
            setManualResults([]);
            return;
        }
        setIsSearchingManual(true);
        try {
            const results = await bandOSService.searchMasqueradersForDistribution(user.uid, queryText);
            setManualResults(results || []);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSearchingManual(false);
        }
    };

    const handleManualCheckoff = async (order) => {
        if (!window.confirm(`Confirm costume collection for ${order.buyer_name || 'Masquerader'} (${order.band_costume_sections?.title || 'Costume'})?`)) return;
        try {
            await bandOSService.updateOrderStatus(order.id, {
                distribution_status: 'Distributed',
                distributed_at: new Date().toISOString(),
                distributed_by: user?.uid || 'band-staff'
            });
            playChime(true);
            setManualResults(prev => prev.map(o => o.id === order.id ? { ...o, distribution_status: 'Distributed' } : o));
            loadDistMetrics();
            alert(`✅ ${order.buyer_name || 'Masquerader'} marked as Distributed!`);
        } catch (e) {
            playChime(false);
            alert('Failed to mark distribution status');
        }
    };

    const handleScanSuccess = async (decodedText, scannerInstance) => {
        // Pauses scanning
        if (scannerInstance) scannerInstance.pause();
        setScanning(true);
        setScanError('');
        setScanResult(null);

        try {
            // Expected Format: "ORDER_ID:12345" or "BANDOS-12345" or raw UUID
            let orderId = decodedText;
            if (decodedText.startsWith('ORDER_ID:')) {
                orderId = decodedText.split(':')[1];
            } else if (decodedText.startsWith('BANDOS-')) {
                orderId = decodedText.replace('BANDOS-', '');
            }

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
                    playChime(false);
                    throw new Error("Order not found in system.");
                }
                const legacyData = legacyOrderSnap.data();
                if (legacyData.sellerId !== user?.uid) {
                    playChime(false);
                    throw new Error("Order belongs to another Band");
                }
                if (legacyData.distributionStatus === 'Distributed') {
                    playChime(false);
                    throw new Error("Costume already marked as Distributed!");
                }
                
                await updateDoc(legacyOrderRef, {
                    distributionStatus: 'Distributed',
                    distributedAt: new Date()
                });
                
                playChime(true);
                setScanResult({
                    success: true,
                    orderId,
                    buyerName: legacyData.buyerName || 'Masquerader',
                    listingTitle: legacyData.listingTitle || 'Costume',
                    warehouseLocation: 'Legacy Section',
                    isLegacy: true
                });
                loadDistMetrics();
                return;
            }

            if (orderData.band_id !== user?.uid) {
                playChime(false);
                throw new Error("Order belongs to another Band");
            }

            if (orderData.distribution_status === 'Distributed') {
                playChime(false);
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

            playChime(true);
            setScanResult({
                success: true,
                orderId,
                buyerName: orderData.buyer_name || 'Masquerader',
                listingTitle: orderData.band_costume_sections?.title || 'Costume',
                warehouseLocation: orderData.warehouse_location || 'Main Floor',
                isProxy,
                variants: orderData.selected_variants || {}
            });
            loadDistMetrics();

        } catch (err) {
            playChime(false);
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
                        label="Sections Catalog"
                        icon={<Shirt className="w-4 h-4" />}
                        onClick={() => setActiveTab('sections')}
                    />
                    <NavButton
                        active={activeTab === 'inventory'}
                        label="Inventory Matrix"
                        icon={<Layers className="w-4 h-4" />}
                        onClick={() => setActiveTab('inventory')}
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
                        active={activeTab === 'ambassadors'}
                        label="Section Leaders & Reps"
                        icon={<Award className="w-4 h-4" />}
                        onClick={() => setActiveTab('ambassadors')}
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
                        active={activeTab === 'branding'}
                        label="Branding"
                        icon={<Palette className="w-4 h-4" />}
                        onClick={() => setActiveTab('branding')}
                    />
                    <NavButton
                        active={activeTab === 'plans'}
                        label="Payment Plans"
                        icon={<CalendarClock className="w-4 h-4" />}
                        onClick={() => setActiveTab('plans')}
                    />
                    <NavButton
                        active={activeTab === 'radar'}
                        label="Road Radar"
                        icon={<Radio className="w-4 h-4 text-pink-400" />}
                        onClick={() => setActiveTab('radar')}
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                            {activeTab === 'scanner' ? 'Costume Distribution' : activeTab === 'radar' ? 'Road Radar' : activeTab}
                        </h1>
                        <p className="text-xs text-gray-500">Carnival Band Leader Operating Panel</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Offline Mode Indicator & Sync Tools */}
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl text-xs shadow-sm">
                            {isOnline ? (
                                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                                    <Wifi className="w-3.5 h-3.5" /> Online
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                                    <WifiOff className="w-3.5 h-3.5" /> Offline Mode
                                </span>
                            )}

                            <span className="text-gray-300 dark:text-gray-600">|</span>

                            <button
                                onClick={handleCacheRoster}
                                disabled={isSyncing}
                                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 font-bold flex items-center gap-1"
                                title="Cache roster locally so distribution staff can scan QR codes with zero cell reception"
                            >
                                <DownloadCloud className="w-3.5 h-3.5" />
                                {offlineStatus.hasCache ? `Cached (${offlineStatus.count})` : 'Cache Roster'}
                            </button>

                            {offlineStatus.pendingSyncCount > 0 && (
                                <button
                                    onClick={handleSyncPending}
                                    disabled={isSyncing}
                                    className="px-2 py-0.5 rounded-md bg-pink-500 text-white font-bold flex items-center gap-1 animate-pulse text-[11px]"
                                    title="Sync offline pickups to cloud"
                                >
                                    <UploadCloud className="w-3 h-3" />
                                    Sync ({offlineStatus.pendingSyncCount})
                                </button>
                            )}
                        </div>

                        <button onClick={onExit || onClose} className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
                            Back to Profile
                        </button>
                    </div>
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
                        <CostumeBuilder bandId={user?.uid} />
                    </div>
                )}

                {/* INVENTORY MATRIX TAB */}
                {activeTab === 'inventory' && (
                    <div className="space-y-4">
                        <React.Suspense fallback={<div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-pink-500" /></div>}>
                            <InventoryMatrix bandId={user?.uid} />
                        </React.Suspense>
                    </div>
                )}

                {/* FINANCIALS TAB */}
                {activeTab === 'financials' && (
                    <div className="h-full">
                        <BandFinancials bandId={user?.uid} />
                    </div>
                )}

                {/* ROSTER TAB */}
                {activeTab === 'roster' && (
                    <div className="h-full">
                        <BandCRM bandId={user?.uid} />
                    </div>
                )}

                {/* AMBASSADORS TAB */}
                {activeTab === 'ambassadors' && (
                    <div className="h-full">
                        <BandAmbassadors bandId={user?.uid} />
                    </div>
                )}

                {/* SCANNER TAB */}
                {activeTab === 'scanner' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Live Distribution Summary Dashboard */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <span className="text-xs text-gray-500 font-bold uppercase">Total Registered</span>
                                <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{distMetrics.total || stats.totalMasqueraders}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <span className="text-xs text-gray-500 font-bold uppercase">Collected Today</span>
                                <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{distMetrics.pickupsToday || 0}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <span className="text-xs text-gray-500 font-bold uppercase">Pickup Progress</span>
                                <p className="text-2xl font-black text-green-600 dark:text-green-400 mt-1">{distMetrics.percentage || 0}%</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <span className="text-xs text-gray-500 font-bold uppercase">Avg Processing</span>
                                <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1">{distMetrics.avgWaitMinutes || 4.5} <span className="text-xs font-normal">min</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Camera QR Scanner */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-bold mb-1 flex items-center gap-2 text-gray-900 dark:text-white">
                                    <ScanLine className="w-5 h-5 text-purple-500" />
                                    Live Camera QR Scanner
                                </h2>
                                <p className="text-xs text-gray-500 mb-4">
                                    Scan masquerader QR code from their mobile pass or self-service order link.
                                </p>

                                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-black mb-4 flex justify-center items-center">
                                    <div id={scannerId} className="w-full max-w-sm"></div>
                                </div>

                                {/* Scan Results */}
                                {scanResult && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="font-bold text-green-900 dark:text-green-300 text-base">Verified & Picked Up!</h3>
                                        <p className="text-green-700 dark:text-green-400 text-xs mt-1 mb-2">
                                            <strong>{scanResult.buyerName}</strong> — <span className="italic">{scanResult.listingTitle}</span>
                                        </p>
                                        
                                        <div className="bg-white dark:bg-gray-800 p-2.5 rounded-lg mb-3 text-left border border-green-200 dark:border-green-700 text-xs">
                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">Warehouse Location</div>
                                            <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                                <Box className="w-3.5 h-3.5 text-purple-500" /> {scanResult.warehouseLocation}
                                            </p>
                                            {!scanResult.isLegacy && Object.entries(scanResult.variants || {}).map(([k, v]) => (
                                                <p key={k} className="text-gray-600 dark:text-gray-300 capitalize text-[11px]">
                                                    <span className="font-medium">{k.replace('_', ' ')}:</span> {v}
                                                </p>
                                            ))}
                                            {scanResult.isProxy && (
                                                <div className="mt-1.5 p-1 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">
                                                    SQUAD PROXY PICKUP AUTHORIZED
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={resumeScanning}
                                            className="px-5 py-1.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition text-xs shadow-sm"
                                        >
                                            Scan Next Masquerader
                                        </button>
                                    </div>
                                )}

                                {scanError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                                        <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <h3 className="font-bold text-red-900 dark:text-red-300 text-base">Scan Alert</h3>
                                        <p className="text-red-700 dark:text-red-400 text-xs mt-1 mb-3">{scanError}</p>
                                        <button
                                            onClick={resumeScanning}
                                            className="px-5 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition text-xs shadow-sm"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Manual Lookup & Fast Check-off */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
                                        <Search className="w-4 h-4 text-pink-500" />
                                        Manual Lookup & Fast Check-off
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-4">
                                        If masquerader has no phone/QR, search by name, email, or order ID to verify.
                                    </p>

                                    <div className="relative mb-3">
                                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={manualSearchQuery}
                                            onChange={e => handleManualSearch(e.target.value)}
                                            placeholder="Search name, email, or phone..."
                                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-pink-500"
                                        />
                                    </div>

                                    {/* Search Results List */}
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                        {isSearchingManual ? (
                                            <div className="text-center py-6 text-gray-400 text-xs flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" /> Searching roster...
                                            </div>
                                        ) : manualResults.length === 0 ? (
                                            <div className="text-center py-6 text-gray-400 text-xs">
                                                {manualSearchQuery ? 'No matching masqueraders found' : 'Type to search registered masqueraders'}
                                            </div>
                                        ) : (
                                            manualResults.map(order => (
                                                <div key={order.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 text-xs">
                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                                            {order.buyer_name || order.buyerName || 'Masquerader'}
                                                            <span className="text-[10px] text-gray-400 font-normal">({order.id})</span>
                                                        </p>
                                                        <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                                                            {order.band_costume_sections?.title || order.listingTitle || 'Costume'}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        disabled={order.distribution_status === 'Distributed'}
                                                        onClick={() => handleManualCheckoff(order)}
                                                        className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm " + (
                                                            order.distribution_status === 'Distributed'
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 cursor-not-allowed"
                                                                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                                                        )}
                                                    >
                                                        {order.distribution_status === 'Distributed' ? '✓ Collected' : 'Mark Collected'}
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-500 flex items-center gap-2">
                                    <Volume2 className="w-3.5 h-3.5 text-green-500" />
                                    <span>Audio chime synthesizes on each confirmed masquerader pickup.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* LOGISTICS TAB */}
                {activeTab === 'logistics' && (
                    <div className="space-y-4">
                        <TimeSlotManager bandId={user?.uid} />
                    </div>
                )}

                {/* BRANDING TAB */}
                {activeTab === 'branding' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">Storefront Branding</h2>
                                <p className="text-sm text-gray-500">Customize how your band appears to masqueraders.</p>
                            </div>
                            <button onClick={copyPublicLink} className="flex items-center gap-2 text-sm font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                                <LinkIcon className="w-4 h-4" /> Copy Public Link
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <form onSubmit={handleSaveBranding} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Band Slug</label>
                                    <div className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <span className="text-gray-500">{typeof window !== 'undefined' ? `${window.location.host}/band/` : 'carnival-planner.com/band/'}</span>
                                        <input 
                                            value={brandingData.slug} 
                                            onChange={e => setBrandingData({...brandingData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                                            className="bg-transparent border-none outline-none font-medium flex-1 text-gray-900 dark:text-white"
                                            placeholder="your-band"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Carnival City</label>
                                        <input value={brandingData.carnival_city} onChange={e => setBrandingData({...brandingData, carnival_city: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g. Trinidad" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tagline</label>
                                        <input value={brandingData.tagline} onChange={e => setBrandingData({...brandingData, tagline: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Play Mas." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Logo URL</label>
                                    <input value={brandingData.logo_url} onChange={e => setBrandingData({...brandingData, logo_url: e.target.value})} type="url" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Hero Image URL</label>
                                    <input value={brandingData.hero_image_url} onChange={e => setBrandingData({...brandingData, hero_image_url: e.target.value})} type="url" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="https://..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Color</label>
                                        <div className="flex gap-2 items-center">
                                            <input value={brandingData.primary_color || '#ec4899'} onChange={e => setBrandingData({...brandingData, primary_color: e.target.value})} type="color" className="h-10 w-16 p-1 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer" />
                                            <span className="text-xs font-mono">{brandingData.primary_color}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Secondary Color</label>
                                        <div className="flex gap-2 items-center">
                                            <input value={brandingData.secondary_color || '#8b5cf6'} onChange={e => setBrandingData({...brandingData, secondary_color: e.target.value})} type="color" className="h-10 w-16 p-1 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer" />
                                            <span className="text-xs font-mono">{brandingData.secondary_color}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Instagram Handle</label>
                                        <input value={brandingData.instagram_handle} onChange={e => setBrandingData({...brandingData, instagram_handle: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="@band" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Facebook URL</label>
                                        <input value={brandingData.facebook_url} onChange={e => setBrandingData({...brandingData, facebook_url: e.target.value})} type="url" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="https://..." />
                                    </div>
                                </div>
                                
                                <button type="submit" disabled={brandingSaving} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 mt-4 transition-colors disabled:opacity-70">
                                    {brandingSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Palette className="w-5 h-5" />}
                                    Save Branding
                                </button>
                            </form>

                            {/* Live Preview */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Live Preview</h3>
                                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg" style={{ height: '400px' }}>
                                    <div 
                                        className="h-32 w-full bg-gray-200 dark:bg-gray-800 relative bg-cover bg-center"
                                        style={{ backgroundImage: brandingData.hero_image_url ? `url(${brandingData.hero_image_url})` : 'none' }}
                                    >
                                        <div className="absolute inset-0 bg-black/40"></div>
                                        <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-white shadow-md border-2 border-white overflow-hidden flex items-center justify-center">
                                            {brandingData.logo_url ? (
                                                <img src={brandingData.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-black text-gray-300">LOGO</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-10 px-6 pb-6">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">{brandingData.business_name || 'Your Band Name'}</h3>
                                        {brandingData.tagline && <p className="text-sm text-gray-500 mt-1">{brandingData.tagline}</p>}
                                        <div className="flex gap-2 mt-3">
                                            <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: brandingData.primary_color || '#ec4899' }}>2025 Carnival</span>
                                            <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: brandingData.secondary_color || '#8b5cf6' }}>{brandingData.carnival_city || 'City'}</span>
                                        </div>
                                        <div className="mt-6 flex justify-between gap-3">
                                            <div className="h-10 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                                            <div className="h-10 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PLANS TAB */}
                {activeTab === 'plans' && (
                    <div className="h-full">
                        <React.Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 text-purple-500 animate-spin" /></div>}>
                            <PaymentPlanBuilder bandId={user?.uid} />
                        </React.Suspense>
                    </div>
                )}

                {/* ROAD RADAR TAB */}
                {activeTab === 'radar' && (
                    <div className="h-full">
                        <React.Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 text-pink-500 animate-spin" /></div>}>
                            <RoadRadar bandId={user?.uid} />
                        </React.Suspense>
                    </div>
                )}

                {/* PLAYBOOK TAB */}
                {activeTab === 'playbook' && (
                    <div className="h-full">
                        <React.Suspense fallback={<div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 text-pink-500 animate-spin" /></div>}>
                            <BandPlaybook bandId={user?.uid} />
                        </React.Suspense>
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
