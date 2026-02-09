import React, { useState, useEffect } from 'react';
import { Video, VideoOff, Maximize2, Minimize2, Copy, Check, Users, X } from 'lucide-react';

export default function SquadLiveStream({
    squadId,
    isPremium,
    isHost,
    activeRoomId,
    onStartStream,
    onEndStream
}) {
    const [isStreaming, setIsStreaming] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [viewerCount, setViewerCount] = useState(0);

    // Generate unique room ID for this squad session
    const generateRoomId = () => `carnival-${squadId}-${Date.now().toString(36)}`;

    // VDO.Ninja URLs
    const getHostUrl = (roomId) =>
        `https://vdo.ninja/?room=${roomId}&push&quality=1&autostart`;

    const getViewerUrl = (roomId) =>
        `https://vdo.ninja/?room=${roomId}&view&cleanoutput&autoplay`;

    // Start streaming (host only)
    const handleStartStream = () => {
        const newRoomId = generateRoomId();
        setIsStreaming(true);
        onStartStream?.(newRoomId);
    };

    // End streaming
    const handleEndStream = () => {
        setIsStreaming(false);
        onEndStream?.();
    };

    // Copy invite link
    const copyInviteLink = async () => {
        if (!activeRoomId) return;
        const viewerUrl = getViewerUrl(activeRoomId);
        await navigator.clipboard.writeText(viewerUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // If no active stream and not trying to host, show nothing
    if (!activeRoomId && !isHost) return null;

    // Host controls when not streaming
    if (isHost && !activeRoomId) {
        return (
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-full">
                            <Video className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">Go Live</h4>
                            <p className="text-sm text-gray-400">Stream to your squad in real-time</p>
                        </div>
                    </div>
                    <button
                        onClick={handleStartStream}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
                    >
                        <Video className="w-4 h-4" />
                        Start Stream
                    </button>
                </div>
            </div>
        );
    }

    // Active stream view
    const streamUrl = isHost && isStreaming
        ? getHostUrl(activeRoomId)
        : getViewerUrl(activeRoomId);

    return (
        <div className={`bg-gray-900 rounded-xl overflow-hidden mb-4 border border-purple-500/30 transition-all ${isFullscreen ? 'fixed inset-4 z-50' : ''
            }`}>
            {/* Stream Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse">
                        🔴 LIVE
                    </span>
                    <span className="text-white text-sm font-medium">
                        {isHost ? 'You are streaming' : 'Squad Live Stream'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Viewer count placeholder */}
                    <span className="flex items-center gap-1 text-white/80 text-sm">
                        <Users className="w-4 h-4" />
                        <span>Squad</span>
                    </span>

                    {/* Copy link button */}
                    {isHost && (
                        <button
                            onClick={copyInviteLink}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Copy viewer link"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-white" />
                            )}
                        </button>
                    )}

                    {/* Fullscreen toggle */}
                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isFullscreen ? (
                            <Minimize2 className="w-4 h-4 text-white" />
                        ) : (
                            <Maximize2 className="w-4 h-4 text-white" />
                        )}
                    </button>

                    {/* End stream button (host only) */}
                    {isHost && (
                        <button
                            onClick={handleEndStream}
                            className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                            title="End stream"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    )}
                </div>
            </div>

            {/* VDO.Ninja iFrame */}
            <div className={`relative bg-black ${isFullscreen ? 'h-[calc(100%-48px)]' : 'h-64 sm:h-80'}`}>
                <iframe
                    src={streamUrl}
                    allow="camera; microphone; display-capture; autoplay; fullscreen"
                    className="w-full h-full border-0"
                    title="Live Stream"
                />

                {/* Loading overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 pointer-events-none opacity-0 transition-opacity">
                    <div className="text-white text-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm">Connecting...</p>
                    </div>
                </div>
            </div>

            {/* Host tip */}
            {isHost && isStreaming && (
                <div className="px-4 py-2 bg-purple-900/50 text-purple-200 text-xs text-center">
                    💡 Tip: Allow camera/microphone access in the stream window above. Your squad can now see you!
                </div>
            )}
        </div>
    );
}
