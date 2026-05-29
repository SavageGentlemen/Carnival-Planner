import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR } from '@react-three/xr';
import { useGLTF, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { X, Loader2, Box, Info } from 'lucide-react';

function Model({ url, scale = 1, rotation = [0, 0, 0] }) {
    // Attempt to load the GLTF/GLB model
    const { scene } = useGLTF(url);

    // Simple interaction to rotate model when clicked in AR
    const [active, setActive] = useState(false);

    return (
        <Interactive
            onSelect={() => setActive(!active)}
            onHover={() => { }}
            onBlur={() => { }}
        >
            <primitive
                object={scene}
                scale={active ? scale * 1.1 : scale}
                rotation={rotation}
                position={[0, -1, -2]} // Positioned slightly in front and below eye-level by default in AR
            />
        </Interactive>
    );
}

// Pre-load common fallback if desired, though we usually just let it fail gracefully
// useGLTF.preload('/fallback-costume.glb');

export default function CostumeViewerAR({ url, title, onClose }) {
    const [error, setError] = useState(false);

    // We handle the loading state using React Suspense wrap around the Canvas below

    // If there is an issue loading the GLB, useGLTF throws an error that we can catch
    // However, @react-three/fiber error boundaries are tricky. A simple fallback is to just show UI.

    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col">
            {/* Header / UI Layer */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center border border-purple-500/50">
                        <Box className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold">{title || 'Costume Try-On'}</h2>
                        <span className="text-xs text-purple-300 flex items-center gap-1">
                            <Info className="w-3 h-3" /> WebXR Supported
                        </span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-red-500/80 rounded-full text-white transition-colors backdrop-blur-md"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom Controls / Instructions */}
            <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center z-10 pointer-events-none">
                <div className="bg-gray-900/80 border border-gray-700/50 backdrop-blur-md px-6 py-4 rounded-2xl text-center max-w-sm pointer-events-auto">
                    <p className="text-sm text-gray-300 mb-3">
                        <strong className="text-white">Desktop:</strong> Drag to rotate, scroll to zoom.<br />
                        <strong className="text-white">Mobile VR/AR:</strong> Click "Enter AR" to view in your room.
                    </p>

                    {/* ARButton injects the WebXR entry point if supported by browser/device */}
                    <div className="inline-block overflow-hidden rounded-xl shadow-lg shadow-purple-500/20 border border-purple-500/50">
                        <ARButton className="!bg-purple-600 !text-white !font-bold !px-6 !py-3 !border-none !rounded-none hover:!bg-purple-500 transition-colors" />
                    </div>
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="flex-1 w-full h-full">
                {error ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
                        <Box className="w-12 h-12 text-gray-500 mb-4" />
                        <p className="font-bold text-lg mb-2">Failed to load 3D Model</p>
                        <p className="text-sm text-gray-400">The file might be corrupted or in an unsupported format.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">Go Back</button>
                    </div>
                ) : (
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                        <XR>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                            <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#c084fc" />

                            <React.Suspense fallback={null}>
                                <Model url={url} scale={1.5} />
                                <Environment preset="city" />
                                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                            </React.Suspense>

                            <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
                        </XR>
                    </Canvas>
                )}
            </div>
        </div>
    );
}

// Error boundary specific wrapper to catch GLTF loading errors gracefully
export class CostumeViewerErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-white p-6 text-center">
                    <Box className="w-16 h-16 text-yellow-500 mb-4" />
                    <p className="font-bold text-xl mb-2">AR Viewer Error</p>
                    <p className="text-gray-400 mb-6 max-w-sm">We ran into an issue rendering this 3D costume model. It may be using an unsupported compression format.</p>
                    <button onClick={this.props.onClose} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition">
                        Return to Marketplace
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
