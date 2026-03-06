import React, { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight, X, Zap, TrendingDown } from 'lucide-react';

/**
 * VibeAlert — Dynamic rerouting toast component.
 * Appears when a planned event's vibe score drops below threshold.
 * Shows the event, its current score, and a suggested alternative.
 */
export default function VibeAlert({ alert, onSwap, onDismiss }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (alert) {
            // Slide in
            requestAnimationFrame(() => setIsVisible(true));

            // Auto-dismiss after 15 seconds
            const timer = setTimeout(() => handleDismiss(), 15000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [alert]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            setIsVisible(false);
            onDismiss?.();
        }, 300);
    };

    const handleSwap = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            setIsVisible(false);
            onSwap?.(alert);
        }, 200);
    };

    if (!alert) return null;

    const { droppedEvent, suggestedEvent } = alert;

    return (
        <div
            className={`
        fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[420px] z-50
        transition-all duration-300 ease-out
        ${isVisible && !isExiting
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0 pointer-events-none'}
      `}
        >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-red-950/90 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/10">
                {/* Animated pulse border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-red-500/20 animate-pulse pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/20 rounded-full">
                            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-300">Vibe Alert</span>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="p-1 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4 pb-2">
                    {/* Dropped Event */}
                    <div className="flex items-center gap-3 py-2">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                            <span className="text-lg font-black text-red-400">{droppedEvent.score}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{droppedEvent.title}</p>
                            <p className="text-xs text-red-300/80">{droppedEvent.reason || 'Vibe score dropped'}</p>
                        </div>
                    </div>

                    {/* Arrow divider */}
                    {suggestedEvent && (
                        <>
                            <div className="flex items-center gap-2 py-1">
                                <div className="flex-1 h-px bg-gradient-to-r from-red-500/30 to-emerald-500/30" />
                                <span className="text-[10px] text-gray-400 font-medium uppercase">Try instead</span>
                                <div className="flex-1 h-px bg-gradient-to-l from-emerald-500/30 to-red-500/30" />
                            </div>

                            {/* Suggested Event */}
                            <div className="flex items-center gap-3 py-2">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <span className="text-lg font-black text-emerald-400">{suggestedEvent.score}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{suggestedEvent.title}</p>
                                    <p className="text-xs text-emerald-300/80">
                                        {suggestedEvent.venue || suggestedEvent.reason || 'Hot right now 🔥'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full">
                                    <Zap className="w-3 h-3 text-emerald-400" />
                                    <span className="text-xs font-bold text-emerald-300">{suggestedEvent.score}/10</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 px-4 pb-4 pt-1">
                    {suggestedEvent && (
                        <button
                            onClick={handleSwap}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                        >
                            <ArrowRight className="w-4 h-4" />
                            Swap Now
                        </button>
                    )}
                    <button
                        onClick={handleDismiss}
                        className="flex-1 px-4 py-2.5 bg-white/5 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/10 transition-all border border-white/10"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
