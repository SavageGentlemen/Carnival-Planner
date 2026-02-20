import React from 'react';
import { X, MapPin, Users, Calendar, Music, Camera, Wallet } from 'lucide-react';

export default function WelcomeModal({ onClose }) {
    const features = [
        { icon: Calendar, title: 'Plan Your Schedule', desc: 'Add fetes, mas, and events to your itinerary' },
        { icon: Wallet, title: 'Track Your Budget', desc: 'Keep tabs on costume costs, accommodations, and more' },
        { icon: Users, title: 'Squad Up', desc: 'Create or join a squad to share plans with friends' },
        { icon: MapPin, title: 'Map Your Adventure', desc: 'Pin venues and see event locations (Premium)' },
        { icon: Camera, title: 'Share Memories', desc: 'Upload photos to your private media vault (Premium)' },
        { icon: Music, title: 'Vibes Player', desc: 'Stream soca playlists while you plan' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-6 rounded-t-2xl text-white text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-black mb-1">Welcome to Caribbean Carnival Planner! 🎭</h2>
                    <p className="text-white/90 text-sm">Your all-in-one Caribbean carnival companion</p>
                </div>

                {/* Features */}
                <div className="p-6 space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
                        Here's what you can do:
                    </p>

                    <div className="grid gap-3">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white flex-shrink-0">
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">{feature.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
                    >
                        Let's Go! 🎉
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        Tap "Help" in the footer anytime for guidance
                    </p>
                </div>
            </div>
        </div>
    );
}
