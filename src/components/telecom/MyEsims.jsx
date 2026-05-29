import React, { useState, useEffect } from 'react';
import { Wifi, Clock, Download, ExternalLink, ShieldCheck, Loader2, QrCode, AlertCircle } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../../firebase';

export default function MyEsims({ user, onBack }) {
    const [esims, setEsims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEsims = async () => {
            if (!user) return;
            try {
                const functions = getFunctions(app);
                const getUserEsims = httpsCallable(functions, 'getUserEsims');
                const result = await getUserEsims();
                setEsims(result.data.esims || []);
            } catch (err) {
                console.error("Error fetching user eSIMs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEsims();
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
            </div>
        );
    }

    if (esims.length === 0) {
        return (
            <div className="text-center py-24 bg-gray-50/50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wifi className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Stay Ready, Stay Connected</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-4 font-medium">
                    You haven't purchased any data packs yet. Get an eSIM before your next trip to avoid roaming fees!
                </p>
                <button 
                    onClick={onBack}
                    className="mt-8 px-8 py-3 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 active:scale-95 transition-all"
                >
                    Explore Store
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {esims.map((esim) => (
                <div key={esim.id} className="group overflow-hidden bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Card Header */}
                    <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-sm">
                                <Wifi className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                    {esim.packageId || 'Data Pack'}
                                </h4>
                                <p className="text-xs text-gray-500 font-bold uppercase">
                                    Purchased {new Date(esim.purchasedAt?.seconds * 1000).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="px-4 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg shadow-green-500/20">
                                Active
                            </span>
                        </div>
                    </div>

                    {/* Sim Details */}
                    {esim.esims?.map((sim, i) => (
                        <div key={i} className="p-6 space-y-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* QR Code Section */}
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="relative p-4 bg-white rounded-3xl shadow-inner border border-gray-100 group-hover:scale-105 transition-transform duration-500">
                                        {sim.qrcodeUrl ? (
                                            <img src={sim.qrcodeUrl} alt="eSIM QR Code" className="w-40 h-40" />
                                        ) : (
                                            <div className="w-40 h-40 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl">
                                                <QrCode className="w-10 h-10 mb-2 animate-pulse" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Generating...</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 border-4 border-purple-500/10 rounded-3xl pointer-events-none" />
                                    </div>
                                    <p className="mt-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">Scan to Install</p>
                                </div>

                                {/* Credentials Section */}
                                <div className="flex-1 space-y-5">
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">SM-DP+ Address</label>
                                        <div className="flex gap-2">
                                            <code className="flex-1 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 break-all dark:text-gray-300">
                                                {sim.lpa || 'Processing...'}
                                            </code>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Activation Code</label>
                                        <div className="flex gap-2">
                                            <code className="flex-1 text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded-xl border dark:border-gray-700 break-all dark:text-gray-300">
                                                {sim.matchingId || 'Processing...'}
                                            </code>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 pt-2">
                                        <button className="flex-1 py-4 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-black rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl">
                                            <Download className="w-5 h-5" />
                                            Direct Install
                                        </button>
                                        <a 
                                            href={sim.installationGuides} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-md flex items-center justify-center"
                                            title="View Guide"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Alert / Note */}
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed">
                                    <strong>Heads up:</strong> Do not delete your eSIM once installed. Most eSIMs can only be installed once. Ensure you have a stable Wi-Fi connection during setup.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
