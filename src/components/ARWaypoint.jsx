import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation, X, Eye, Compass, Loader2 } from 'lucide-react';

// Lazy-load heavy 3D dependencies — only downloaded when user enters AR
const ARCanvas = React.lazy(() => import('./ARCanvas'));
const ARCompassFallback = React.lazy(() => import('./ARCompassFallback'));

/**
 * ARWaypoint — AR Navigation Controller.
 *
 * Detects WebXR AR support and provides two modes:
 *   1. WebXR AR Mode: Full camera passthrough with 3D floating waypoints
 *   2. Compass Fallback: 2D compass-style directional guide (iOS, desktop)
 *
 * Props:
 *   - targets: Array of { lat, lng, name, type, venue, id }
 *   - target: Single target (legacy compat, converted to array internally)
 *   - onClose: Callback to dismiss the overlay
 *   - isPremium: Gate access to premium features
 */
export default function ARWaypoint({ targets, target, onClose, isPremium }) {
    const [arSupported, setArSupported] = useState(null); // null = checking, true/false = result
    const [mode, setMode] = useState(null); // null = selection screen, 'ar' | 'compass'
    const [userPos, setUserPos] = useState(null);
    const [gpsError, setGpsError] = useState(null);
    const watchIdRef = useRef(null);

    // Normalize single target to array
    const allTargets = targets || (target ? [target] : []);

    // Check WebXR AR support
    useEffect(() => {
        const checkAR = async () => {
            if (!navigator.xr) {
                setArSupported(false);
                return;
            }
            try {
                const supported = await navigator.xr.isSessionSupported('immersive-ar');
                setArSupported(supported);
            } catch {
                setArSupported(false);
            }
        };
        checkAR();
    }, []);

    // Watch GPS position
    useEffect(() => {
        if (!navigator.geolocation) {
            setGpsError('Geolocation not available');
            return;
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                setUserPos({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                });
                setGpsError(null);
            },
            (err) => setGpsError(`GPS error: ${err.message}`),
            { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
        );

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    if (!isPremium || allTargets.length === 0) return null;

    // If mode already selected, render it
    if (mode === 'ar') {
        return (
            <React.Suspense fallback={<ARLoadingScreen onClose={onClose} />}>
                <ARCanvas
                    userLocation={userPos}
                    waypoints={allTargets}
                    onClose={onClose}
                />
            </React.Suspense>
        );
    }

    if (mode === 'compass') {
        return (
            <React.Suspense fallback={<ARLoadingScreen onClose={onClose} />}>
                <ARCompassFallback
                    target={allTargets[0]}
                    onClose={onClose}
                />
            </React.Suspense>
        );
    }

    // Mode selection screen
    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-full">
                        <Navigation className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">AR Navigation</h3>
                        <p className="text-xs text-indigo-300">
                            {allTargets.length} waypoint{allTargets.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Mode selection */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                <h2 className="text-2xl font-black text-white text-center mb-2">
                    Choose Navigation Mode
                </h2>

                {/* GPS Status */}
                {gpsError ? (
                    <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <p className="text-red-300 text-sm">{gpsError}</p>
                    </div>
                ) : userPos ? (
                    <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl">
                        <p className="text-green-300 text-sm">📍 GPS locked (±{Math.round(userPos.accuracy)}m)</p>
                    </div>
                ) : (
                    <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-yellow-300 animate-spin" />
                        <p className="text-yellow-300 text-sm">Acquiring GPS...</p>
                    </div>
                )}

                {/* AR Mode Button */}
                <button
                    onClick={() => setMode('ar')}
                    disabled={arSupported === false || !userPos}
                    className={`w-full max-w-sm p-6 rounded-2xl border transition-all ${arSupported
                            ? 'bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-indigo-500/40 hover:border-indigo-400 hover:scale-[1.02]'
                            : 'bg-gray-800/50 border-gray-700 opacity-50 cursor-not-allowed'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/30 rounded-xl">
                            <Eye className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-white font-bold text-lg">AR Camera View</h3>
                            <p className="text-gray-400 text-sm">
                                {arSupported === null
                                    ? 'Checking WebXR support...'
                                    : arSupported
                                        ? 'See 3D waypoints through your camera'
                                        : 'WebXR not supported on this browser'}
                            </p>
                        </div>
                    </div>
                    {arSupported && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {allTargets.slice(0, 3).map((t, i) => (
                                <span key={i} className="px-2 py-0.5 bg-indigo-500/20 rounded-full text-[10px] text-indigo-300 font-medium">
                                    {t.name || t.title}
                                </span>
                            ))}
                            {allTargets.length > 3 && (
                                <span className="px-2 py-0.5 bg-indigo-500/20 rounded-full text-[10px] text-indigo-300">
                                    +{allTargets.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </button>

                {/* Compass Fallback Button */}
                <button
                    onClick={() => setMode('compass')}
                    disabled={!userPos}
                    className="w-full max-w-sm p-6 rounded-2xl border bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-600/40 hover:border-gray-500 hover:scale-[1.02] transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-600/30 rounded-xl">
                            <Compass className="w-8 h-8 text-gray-300" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-white font-bold text-lg">Compass Navigate</h3>
                            <p className="text-gray-400 text-sm">
                                2D compass with distance & direction
                            </p>
                        </div>
                    </div>
                </button>

                <p className="text-gray-600 text-xs text-center mt-4">
                    AR Camera requires Android Chrome. iOS uses Compass mode.
                </p>
            </div>
        </div>
    );
}

/** Full-screen loading overlay */
function ARLoadingScreen({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
            <p className="text-white font-medium">Loading AR Experience...</p>
            <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition"
            >
                Cancel
            </button>
        </div>
    );
}
