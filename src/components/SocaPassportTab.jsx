import React from 'react';
import { ExternalLink, CreditCard, Music, ShieldCheck, Zap, Info } from 'lucide-react';

export default function SocaPassportTab({ user, activeCarnivalId }) {
    const passportUrl = `http://localhost:5001/socapassport?uid=${user?.uid || ''}&carnival=${activeCarnivalId || ''}`;

    return (
        <div className="flex flex-col min-h-[500px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="p-8 bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 text-white relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner group transition-transform hover:scale-105">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight">SOCA PASSPORT</h3>
                            <p className="text-teal-50 font-medium opacity-90">Your Digital Carnival Identity</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                        <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></div>
                        Bridge Active
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
                <div className="relative group cursor-pointer" onClick={() => window.open(passportUrl, '_blank')}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative p-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]">
                        <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-2">
                            <Zap className="w-10 h-10 text-teal-500" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">Ready to Sync?</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                            Open your Soca Passport to view your digital credentials, collection, and vibes.
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(passportUrl, '_blank');
                            }}
                            className="mt-4 group flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-1 active:scale-95"
                        >
                            LAUNCH PASSPORT
                            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Info Box */}
                <div className="max-w-md p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 flex gap-4 text-left">
                    <div className="flex-shrink-0 mt-0.5">
                        <Info className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Secure Bridge 🔐</p>
                        <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                            For your security, Soca Passport opens in a protected environment. We've automatically passed your credentials to ensure a seamless "hand-in-hand" experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-gray-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Encryption Active
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-gray-400">
                        <Music className="w-3.5 h-3.5 text-teal-500" />
                        Sound Sync: ON
                    </div>
                </div>
                <p className="text-[10px] font-bold text-gray-300 dark:text-gray-600 italic">SOCA AUTHENTICATION SERVICE v2.4</p>
            </div>
        </div>
    );
}
