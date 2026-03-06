import React, { useState, useEffect, useRef } from 'react';
import { Navigation, MapPin, X, Compass, AlertCircle, ArrowUp } from 'lucide-react';
import { calculateDistance, calculateBearing, formatDistance, getCompassDirection } from '../utils/gpsUtils';

/**
 * ARCompassFallback — 2D compass-style directional guide.
 * Used as fallback when WebXR AR is not available (iOS, desktop).
 * Shows direction + distance to target with an animated compass ring.
 */
export default function ARCompassFallback({ target, onClose }) {
    const [userPos, setUserPos] = useState(null);
    const [heading, setHeading] = useState(null);
    const [bearing, setBearing] = useState(null);
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);
    const watchIdRef = useRef(null);

    // Watch GPS position
    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation not available');
            return;
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
            (pos) => {
                setUserPos({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                });
                setError(null);
            },
            (err) => setError(`GPS error: ${err.message}`),
            { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
        );

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    // Device orientation for compass heading
    useEffect(() => {
        const handleOrientation = (event) => {
            if (event.webkitCompassHeading !== undefined) {
                setHeading(event.webkitCompassHeading);
            } else if (event.alpha !== null) {
                setHeading(360 - event.alpha);
            }
        };

        if (window.DeviceOrientationEvent) {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(state => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation, true);
                        }
                    })
                    .catch(console.error);
            } else {
                window.addEventListener('deviceorientation', handleOrientation, true);
            }
        }

        return () => window.removeEventListener('deviceorientation', handleOrientation, true);
    }, []);

    // Calculate bearing and distance to target
    useEffect(() => {
        if (!userPos || !target?.lat || !target?.lng) return;
        setDistance(calculateDistance(userPos.lat, userPos.lng, target.lat, target.lng));
        setBearing(calculateBearing(userPos.lat, userPos.lng, target.lat, target.lng));
    }, [userPos, target]);

    // Arrow rotation: bearing relative to device heading
    const arrowRotation = heading !== null && bearing !== null
        ? (bearing - heading + 360) % 360
        : 0;

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-full">
                        <Navigation className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Compass Navigate</h3>
                        <p className="text-[10px] text-indigo-300">{target.name || 'Destination'}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Main compass area */}
            <div className="flex flex-col items-center justify-center h-full">
                {error ? (
                    <div className="flex flex-col items-center gap-3 p-6">
                        <AlertCircle className="w-12 h-12 text-red-400" />
                        <p className="text-white text-center">{error}</p>
                        <p className="text-gray-400 text-sm text-center">
                            Enable location services to use navigation.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Compass ring */}
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30" />
                            <div className="absolute inset-2 rounded-full border border-indigo-500/20" />

                            {/* Cardinal directions */}
                            {['N', 'E', 'S', 'W'].map((dir, i) => {
                                const angle = i * 90 - (heading || 0);
                                const rad = (angle * Math.PI) / 180;
                                const r = 112;
                                const x = 128 + r * Math.sin(rad);
                                const y = 128 - r * Math.cos(rad);
                                return (
                                    <span
                                        key={dir}
                                        className={`absolute text-xs font-bold transition-all ${dir === 'N' ? 'text-red-400' : 'text-gray-500'}`}
                                        style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                                    >
                                        {dir}
                                    </span>
                                );
                            })}

                            {/* Direction arrow */}
                            <div
                                className="absolute inset-8 flex items-center justify-center transition-transform duration-200"
                                style={{ transform: `rotate(${arrowRotation}deg)` }}
                            >
                                <div className="flex flex-col items-center">
                                    <ArrowUp className="w-16 h-16 text-indigo-400 drop-shadow-lg" strokeWidth={3} />
                                    <div className="w-1 h-16 bg-gradient-to-b from-indigo-400 to-transparent rounded-full" />
                                </div>
                            </div>

                            {/* Center info */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
                                    {distance !== null ? (
                                        <>
                                            <span className="text-3xl font-black text-white">
                                                {formatDistance(distance)}
                                            </span>
                                            {bearing !== null && (
                                                <p className="text-xs text-indigo-300 mt-1">
                                                    {getCompassDirection(bearing)}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Destination info */}
                        <div className="mt-8 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-pink-400" />
                                <span className="text-white font-bold">{target.name || 'Destination'}</span>
                            </div>
                            {target.venue && (
                                <p className="text-sm text-gray-400">{target.venue}</p>
                            )}
                            {userPos && (
                                <p className="text-[10px] text-gray-600 mt-2">
                                    GPS accuracy: ±{Math.round(userPos.accuracy)}m
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full">
                        <Compass className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs text-gray-300">
                            {heading !== null ? `${Math.round(heading)}°` : 'Calibrating...'}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-colors"
                    >
                        Exit Navigation
                    </button>
                </div>
            </div>
        </div>
    );
}
