import React, { Suspense, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, Center } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { X, Maximize2, Minimize2, Box, Smartphone, RotateCw, Loader2, Eye } from 'lucide-react';

/**
 * ModelViewer — 3D costume/product viewer with AR try-on.
 * Loads .glb/.gltf models from Firebase Storage.
 * Premium only. Supports WebXR AR + iOS AR Quick Look fallback.
 */

// Create XR store outside component for stable reference
const xrStore = createXRStore();

function Model({ url, onLoaded }) {
    const { scene } = useGLTF(url);

    React.useEffect(() => {
        if (scene) {
            onLoaded?.();
        }
    }, [scene]);

    return (
        <Center>
            <primitive object={scene} />
        </Center>
    );
}

function LoadingSpinner() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2 text-white">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading 3D Model...</span>
            </div>
        </Html>
    );
}

export default function ModelViewer({
    modelUrl,       // URL to .glb/.gltf file
    usdzUrl,        // Optional URL to .usdz for iOS AR Quick Look
    title,          // Product/costume name
    onClose,        // Close handler
    isPremium,
}) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const [arActive, setArActive] = useState(false);
    const [arError, setArError] = useState(null);
    const containerRef = useRef(null);

    // Check for WebXR AR support
    const [arSupported, setArSupported] = useState(false);
    React.useEffect(() => {
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-ar').then(setArSupported).catch(() => setArSupported(false));
        }
    }, []);

    // iOS detection for AR Quick Look
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (!isPremium) return null;
    if (!modelUrl) return null;

    const handleARView = useCallback(async () => {
        if (isIOS && usdzUrl) {
            // iOS AR Quick Look — opens native AR viewer
            const a = document.createElement('a');
            a.rel = 'ar';
            a.href = usdzUrl;
            const img = document.createElement('img');
            a.appendChild(img);
            a.click();
        } else if (arSupported) {
            // WebXR AR — launch camera passthrough with 3D model
            try {
                setArError(null);
                await xrStore.enterAR();
                setArActive(true);
            } catch (err) {
                console.error('AR session failed:', err);
                setArError(err.message || 'AR session failed');
            }
        }
    }, [arSupported, isIOS, usdzUrl]);

    return (
        <div
            ref={containerRef}
            className={`fixed z-50 bg-black/95 backdrop-blur-xl flex flex-col transition-all duration-300 ${isFullscreen ? 'inset-0' : 'inset-4 sm:inset-8 md:inset-16 rounded-2xl'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <Box className="w-5 h-5 text-purple-400" />
                    <div>
                        <h3 className="text-white font-bold text-sm">{title || '3D Viewer'}</h3>
                        <p className="text-[10px] text-gray-400">Drag to rotate • Pinch to zoom</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Auto-rotate toggle */}
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={`p-2 rounded-lg transition-colors ${autoRotate ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-white'
                            }`}
                        title="Toggle auto-rotate"
                    >
                        <RotateCw className="w-4 h-4" />
                    </button>

                    {/* AR button */}
                    {(arSupported || (isIOS && usdzUrl)) && (
                        <button
                            onClick={handleARView}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${arActive
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                                }`}
                        >
                            {arActive ? (
                                <><Eye className="w-3.5 h-3.5" /> AR Active</>
                            ) : (
                                <><Smartphone className="w-3.5 h-3.5" /> Try in AR</>
                            )}
                        </button>
                    )}

                    {/* Fullscreen toggle */}
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* AR Error */}
            {arError && (
                <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30">
                    <p className="text-red-300 text-xs">{arError}</p>
                </div>
            )}

            {/* 3D Canvas */}
            <div className="flex-1 relative">
                <Canvas
                    camera={{ position: [0, 1, 3], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <XR store={xrStore}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
                        <directionalLight position={[-3, 2, -3]} intensity={0.3} />

                        <Suspense fallback={<LoadingSpinner />}>
                            <Model url={modelUrl} onLoaded={() => setIsLoaded(true)} />
                            <Environment preset="city" />
                            <ContactShadows position={[0, -1, 0]} opacity={0.4} blur={2} />
                        </Suspense>

                        <OrbitControls
                            autoRotate={autoRotate}
                            autoRotateSpeed={2}
                            enablePan={false}
                            minPolarAngle={Math.PI / 6}
                            maxPolarAngle={Math.PI / 1.5}
                            minDistance={1.5}
                            maxDistance={6}
                        />
                    </XR>
                </Canvas>

                {/* Loading overlay */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                            <span className="text-sm text-gray-300">Loading 3D model...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">
                    {arActive ? '🟢 AR session active — move your phone to place costume' :
                        arSupported ? '✅ AR try-on available on this device' :
                            isIOS && usdzUrl ? '✅ AR Quick Look available' :
                                '❌ AR not supported on this browser'}
                </span>
                {!isIOS && !arSupported && (
                    <span className="text-[10px] text-gray-500">Use Chrome on Android for AR</span>
                )}
            </div>
        </div>
    );
}
