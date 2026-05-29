import React, { useState, useEffect } from 'react';
import { Globe, Wifi, Shield, ArrowRight, Search, Loader2, Info, Check, Zap, MapPin } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../../firebase';

export default function TelecomStore({ user, onBack, isPremium }) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('local'); // local, regional, global
    const [purchasing, setPurchasing] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            setLoading(true);
            try {
                const functions = getFunctions(app);
                const getPackages = httpsCallable(functions, 'getAiraloPackages');
                const result = await getPackages({ type: activeTab });
                setPackages(result.data.packages || []);
            } catch (err) {
                console.error("Failed to fetch eSIM packages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [activeTab]);

    const handlePurchase = async (pkg) => {
        setPurchasing(pkg.id);
        try {
            const functions = getFunctions(app);
            const initiatePurchase = httpsCallable(functions, 'initiateAiraloPurchase');
            const result = await initiatePurchase({
                packageId: pkg.id,
                packageName: `${pkg.operator} - ${pkg.data} (${pkg.validity})`,
                retailPrice: pkg.price,
                countryCode: pkg.countries?.[0]?.code || 'GLOBAL'
            });
            
            if (result.data.checkoutUrl) {
                window.location.href = result.data.checkoutUrl;
            }
        } catch (err) {
            console.error("Purchase failed:", err);
            alert("Failed to initiate purchase. Please try again.");
        } finally {
            setPurchasing(null);
        }
    };

    const filteredPackages = packages.filter(pkg => 
        pkg.operator.toLowerCase().includes(search.toLowerCase()) ||
        (pkg.countries || []).some(c => c.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Intro */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                            <Wifi className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Stay Connected</h2>
                    </div>
                    <p className="text-white/80 text-lg max-w-md font-medium">
                        High-speed global data without the roaming fees. Buy localized eSIMs for 200+ destinations instantly.
                    </p>
                </div>
                {/* Decorative Elements */}
                <Globe className="absolute -right-12 -bottom-12 w-64 h-64 text-white/10 rotate-12" />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full sm:w-auto">
                    {[
                        { id: 'local', label: 'Local', icon: MapPin },
                        { id: 'regional', label: 'Regional', icon: Globe },
                        { id: 'global', label: 'Global', icon: Zap },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white dark:bg-gray-700 shadow-lg text-purple-600 dark:text-purple-400' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search destination..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                </div>
            </div>

            {/* Catalog Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="h-64 rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                    ))}
                </div>
            ) : filteredPackages.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Packages Found</h3>
                    <p className="text-gray-500">Try a different destination or check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg) => (
                        <div 
                            key={pkg.id} 
                            className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-lg font-black text-gray-900 dark:text-white">{pkg.operator}</h4>
                                    <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest">
                                        {pkg.countries?.[0]?.name || 'Multiple Countries'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-gray-900 dark:text-white">${pkg.price}</span>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Once-Off</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Data</p>
                                    <p className="text-lg font-black text-gray-900 dark:text-white">{pkg.data}</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Validity</p>
                                    <p className="text-lg font-black text-gray-900 dark:text-white">{pkg.validity}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handlePurchase(pkg)}
                                disabled={purchasing === pkg.id}
                                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                {purchasing === pkg.id ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Get eSIM
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {/* Perks Badge (e.g. Premium) */}
                            {isPremium && (
                                <div className="absolute top-4 right-4 translate-x-12 -translate-y-4 rotate-45">
                                    <div className="bg-yellow-400 text-black text-[8px] font-black px-8 py-1 uppercase shadow-lg">
                                        Priority Support
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                {[
                    { icon: Shield, title: 'Safe & Secure', desc: 'Encrypted via Stripe' },
                    { icon: Zap, title: 'Instant Delivery', desc: 'No physical SIM required' },
                    { icon: Globe, title: 'Global Coverage', desc: 'Over 200 destinations' },
                ].map((perk, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border border-gray-100 dark:border-gray-700">
                        <perk.icon className="w-6 h-6 text-purple-500 mb-3" />
                        <h5 className="text-sm font-black text-gray-900 dark:text-white mb-1">{perk.title}</h5>
                        <p className="text-xs text-gray-500">{perk.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
