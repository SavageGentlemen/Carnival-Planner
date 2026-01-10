import React from 'react';
import { ExternalLink, CreditCard, Music, ShieldCheck } from 'lucide-react';

export default function SocaPassportTab({ user, activeCarnivalId }) {
    const passportUrl = `http://localhost:5001/socapassport?uid=${user?.uid || ''}&carnival=${activeCarnivalId || ''}`;

    return (
        <div className="flex flex-col h-[70vh] bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="p-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Your Soca Passport</h3>
                        <p className="text-sm opacity-90">Digital identity for the next carnival adventure</p>
                    </div>
                </div>
                <a
                    href={passportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    title="Open in new tab"
                >
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>

            <div className="flex-1 relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <iframe
                    src={passportUrl}
                    className="w-full h-full border-none"
                    title="Soca Passport"
                />

                {/* Fallback/Loading Overlay (subtle) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-xl flex flex-col items-center gap-2">
                        <Music className="w-8 h-8 text-teal-500 animate-pulse" />
                        <p className="text-xs font-bold text-teal-600">Syncing with Soca Passport...</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    Secure Sync
                </div>
                <div className="flex items-center gap-1.5">
                    <Music className="w-3 h-3" />
                    Vibe Locked
                </div>
            </div>
        </div>
    );
}
