import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AppsPage() {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-black text-white">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
            >
                <source src="/videos/background_apps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-[2px]"></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center p-6">

                {/* Header */}
                <div className="text-center mb-12 animate-fadeIn">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tighter drop-shadow-lg mb-4">
                        CARNIVAL APPS
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                        Essential tools for the road
                    </p>
                </div>

                {/* App Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">

                    {/* Bitchat Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                <span className="text-4xl">💬</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Bitchat Mesh</h3>
                            <p className="text-gray-300 mb-6 text-sm">Offline communication for when cell service dies on the road.</p>

                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://apps.apple.com/us/app/bitchat-mesh/id6748219622"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
                                >
                                    <span>🍎</span> App Store
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.bitchat.droid"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-2"
                                >
                                    <span>🤖</span> Play Store
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Carnival Planner Card (Recursive/Meta) */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                                <span className="text-4xl">🎭</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Carnival Planner</h3>
                            <p className="text-gray-300 mb-6 text-sm">Plan your fete schedule, budget, and squad coordination.</p>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg"
                            >
                                Launch Planner
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer/Back Button */}
                <div className="mt-16">
                    <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">
                        <ArrowLeft className="w-4 h-4" /> Back to Planner
                    </a>
                </div>

            </div>
        </div>
    );
}
