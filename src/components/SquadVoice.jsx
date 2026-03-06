import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Users, Volume2, VolumeX, AlertCircle, Wifi } from 'lucide-react';
import { VoiceManager, isWebRTCSupported } from '../services/webrtcService';

/**
 * SquadVoice — P2P voice chat UI for premium squad members.
 * Uses WebRTC with Firestore signaling for mesh audio connections.
 */
export default function SquadVoice({ squadId, userId, userName, isPremium, squadMembers = [] }) {
    const [isInCall, setIsInCall] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [peerStates, setPeerStates] = useState({}); // { peerId: 'connecting'|'connected'|'disconnected' }
    const [error, setError] = useState(null);
    const voiceManagerRef = useRef(null);

    const supported = isWebRTCSupported();

    const handlePeerStateChange = useCallback(({ peerId, state }) => {
        setPeerStates(prev => ({ ...prev, [peerId]: state }));
    }, []);

    const startCall = async () => {
        if (!supported || !squadId || !userId) return;

        setError(null);
        const manager = new VoiceManager(squadId, userId, handlePeerStateChange);
        voiceManagerRef.current = manager;

        const result = await manager.start();
        if (result.success) {
            setIsInCall(true);
        } else {
            setError(result.error || 'Failed to start voice chat. Check microphone permissions.');
        }
    };

    const endCall = async () => {
        if (voiceManagerRef.current) {
            await voiceManagerRef.current.stop();
            voiceManagerRef.current = null;
        }
        setIsInCall(false);
        setIsMuted(false);
        setPeerStates({});
    };

    const toggleMute = () => {
        if (voiceManagerRef.current) {
            const muted = voiceManagerRef.current.toggleMute();
            setIsMuted(muted);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (voiceManagerRef.current) {
                voiceManagerRef.current.stop();
            }
        };
    }, []);

    const connectedPeers = Object.entries(peerStates).filter(([, s]) => s === 'connected').length;
    const connectingPeers = Object.entries(peerStates).filter(([, s]) => s === 'connecting').length;

    // Premium gate
    if (!isPremium) {
        return (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🎙️</span>
                    <div className="flex-1">
                        <p className="font-bold text-amber-900 dark:text-amber-300">Squad Voice Chat</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400">Talk to your squad hands-free with P2P voice — no cell service needed</p>
                    </div>
                    <span className="px-2 py-1 text-[10px] font-bold bg-amber-500 text-white rounded-full uppercase">Premium</span>
                </div>
            </div>
        );
    }

    if (!supported) {
        return (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">Voice chat requires a browser with WebRTC support (Chrome, Safari, Firefox).</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-xl border border-indigo-200 dark:border-indigo-800">
            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between ${isInCall
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30'
                }`}>
                <div className="flex items-center gap-2">
                    <Mic className={`w-4 h-4 ${isInCall ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                    <span className={`text-sm font-bold ${isInCall ? 'text-white' : 'text-indigo-800 dark:text-indigo-300'}`}>
                        Squad Voice
                    </span>
                    {isInCall && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-[10px] text-white font-medium">LIVE</span>
                        </span>
                    )}
                </div>

                {isInCall && (
                    <div className="flex items-center gap-1.5 text-white/80 text-xs">
                        <Users className="w-3.5 h-3.5" />
                        <span>{connectedPeers} connected</span>
                        {connectingPeers > 0 && <span className="text-white/50">({connectingPeers} joining...)</span>}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-4 bg-white dark:bg-gray-800">
                {error && (
                    <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {!isInCall ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Start a voice call with your squad — P2P, no data plan needed once connected.
                        </p>
                        <button
                            onClick={startCall}
                            disabled={!squadId}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                        >
                            <Phone className="w-4 h-4" />
                            Start Voice Chat
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* Peer list */}
                        {Object.entries(peerStates).length > 0 ? (
                            <div className="space-y-2">
                                {Object.entries(peerStates).map(([peerId, state]) => {
                                    const member = squadMembers.find(m => m.uid === peerId || m.id === peerId);
                                    const name = member?.displayName || member?.name || peerId.slice(0, 8);

                                    return (
                                        <div key={peerId} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                            <div className={`w-2 h-2 rounded-full ${state === 'connected' ? 'bg-green-500' :
                                                    state === 'connecting' ? 'bg-amber-500 animate-pulse' :
                                                        'bg-gray-400'
                                                }`} />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">{name}</span>
                                            <span className="text-[10px] text-gray-400 uppercase">{state}</span>
                                            {state === 'connected' && (
                                                <Volume2 className="w-3.5 h-3.5 text-green-500" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 py-4 text-gray-400">
                                <Wifi className="w-4 h-4 animate-pulse" />
                                <span className="text-sm">Waiting for squad members to join...</span>
                            </div>
                        )}

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                onClick={toggleMute}
                                className={`p-3 rounded-full transition-all ${isMuted
                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={endCall}
                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
                            >
                                <PhoneOff className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
