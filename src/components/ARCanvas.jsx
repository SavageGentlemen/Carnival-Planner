import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import { X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import ARScene from './ARScene';

// Create XR store outside component to prevent re-renders
const store = createXRStore({
    // Request hit-test for potential future ground-plane features
    hitTest: false,
});

/**
 * ARCanvas — WebXR AR experience wrapper.
 *
 * Manages the Three.js Canvas, XR session lifecycle, and AR UI overlay.
 * Renders ARScene (3D waypoints) inside the XR provider.
 */
export default function ARCanvas({ userLocation, waypoints = [], onClose }) {
    const [arActive, setArActive] = useState(false);
    const [arError, setArError] = useState(null);

    const handleEnterAR = useCallback(async () => {
        try {
            setArError(null);
            await store.enterAR();
            setArActive(true);
        } catch (err) {
            console.error('AR session failed:', err);
            setArError(err.message || 'Failed to start AR session');
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black">
            {/* Three.js Canvas fills the screen */}
            <Canvas
                className="w-full h-full"
                camera={{ position: [0, 1.6, 0], fov: 70 }}
                gl={{ alpha: true, antialias: true }}
            >
                <XR store={store}>
                    <ARScene userLocation={userLocation} waypoints={waypoints} />
                </XR>
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top bar */}
                <div className="flex items-center justify-between p-4 pointer-events-auto">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                        {arActive ? (
                            <>
                                <Eye className="w-4 h-4 text-green-400" />
                                <span className="text-green-300 text-xs font-bold">AR LIVE</span>
                            </>
                        ) : (
                            <>
                                <EyeOff className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-300 text-xs font-bold">PREVIEW</span>
                            </>
                        )}
                        <span className="text-gray-400 text-xs ml-1">
                            {waypoints.length} pin{waypoints.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Error message */}
                {arError && (
                    <div className="flex items-center gap-2 mx-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl pointer-events-auto">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-200 text-sm">{arError}</p>
                    </div>
                )}

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
                    <div className="flex flex-col gap-3">
                        {/* GPS status */}
                        {userLocation && (
                            <div className="text-center">
                                <span className="text-[10px] text-gray-500 bg-black/40 px-2 py-1 rounded-full">
                                    📍 ±{Math.round(userLocation.accuracy)}m accuracy
                                </span>
                            </div>
                        )}

                        {/* Enter AR button (only if not already in AR) */}
                        {!arActive && (
                            <button
                                onClick={handleEnterAR}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    Launch AR Camera
                                </div>
                                <p className="text-indigo-200 text-xs mt-1">Opens camera passthrough with 3D waypoints</p>
                            </button>
                        )}

                        {/* Exit button */}
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            Exit AR Mode
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
