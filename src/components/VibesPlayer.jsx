import React, { useState, useEffect } from 'react';
import { Music, X, Minimize2, Maximize2, ExternalLink } from 'lucide-react';

// curated soca playlists for major carnivals
const PLAYLISTS = {
    // Trinidad - 'Soca 2025' (Spotify Official)
    'trinidad': 'https://open.spotify.com/embed/playlist/2H61cIhlAeFVmreSMqvui3',
    // Jamaica - 'Dancehall Official'
    'jamaica': 'https://open.spotify.com/embed/playlist/37i9dQZF1DX82pCGH5USnM',
    // Miami - 'Soca Classics'
    'miami': 'https://open.spotify.com/embed/playlist/37i9dQZF1DXS1X4r7p38D5',
    // St. Lucia - 'Dennery Segment'
    'stlucia': 'https://open.spotify.com/embed/playlist/37i9dQZF1DX62XscWx9t6h',
    // Barbados - 'Bashment Soca'
    'barbados': 'https://open.spotify.com/embed/playlist/37i9dQZF1DX23V8kYg8jC2',
    // St. Kitts, St. Thomas, USVI - 'Soca Anthems'
    'stkitts': 'https://open.spotify.com/embed/playlist/37i9dQZF1E4v6hGc9x5z4y',
    'stcroix': 'https://open.spotify.com/embed/playlist/37i9dQZF1E4v6hGc9x5z4y',
    'stthomas': 'https://open.spotify.com/embed/playlist/37i9dQZF1E4v6hGc9x5z4y',
    // Default - User Provided Playlist (Soca 2024/2025)
    'default': 'https://open.spotify.com/embed/playlist/28bCuQ5IhyPbmvJx30ZMea'
};

export default function VibesPlayer({ activeCarnivalId, isPremium }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Determine which playlist to show
    const getPlaylistData = () => {
        if (!activeCarnivalId) return { key: 'default', url: PLAYLISTS['default'] };

        // Find matching key
        const key = Object.keys(PLAYLISTS).find(k => activeCarnivalId.toLowerCase().includes(k));
        const url = PLAYLISTS[key] || PLAYLISTS['default'];
        return { key: key || 'default (fallback)', url };
    };

    const { key: playlistKey, url: playlistUrl } = getPlaylistData();

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce-slow"
                aria-label="Open Vibes Player"
            >
                <Music className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className={`fixed z-40 transition-all duration-300 shadow-2xl overflow-hidden bg-black/90 backdrop-blur-md border border-white/20 rounded-t-2xl sm:rounded-2xl
      ${isMinimized
                ? 'bottom-24 right-4 w-64 h-16 rounded-full'
                : 'bottom-0 sm:bottom-24 right-0 sm:right-4 w-full sm:w-80 h-[400px]'
            }`}
        >
            {/* Header */}
            <div className={`flex items-center justify-between p-3 bg-gradient-to-r from-pink-600 to-purple-700 text-white
        ${isMinimized ? 'h-full' : ''}`}
            >
                <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 animate-pulse" />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">
                            {isMinimized ? 'Carnival Vibes' : 'Soca Vibes Player'}
                        </span>
                        {!isMinimized && (
                            <span className="text-[10px] opacity-75 uppercase tracking-wider">
                                Playing: {playlistKey.replace('default', activeCarnivalId || 'General')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    {isMinimized ? (
                        <button onClick={() => setIsMinimized(false)} className="p-1 hover:bg-white/20 rounded">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    ) : (
                        <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/20 rounded">
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    )}
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <div className="h-[calc(100%-48px)] bg-black relative">
                    {!isPremium && (
                        <div className="absolute top-0 left-0 right-0 z-10 bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 text-center">
                            Upgrade directly in Spotify for ad-free listening
                        </div>
                    )}
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src={playlistUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            )}
        </div>
    );
}
