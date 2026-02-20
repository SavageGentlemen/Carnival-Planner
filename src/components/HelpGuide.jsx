import React from 'react';
import { X, Calendar, Wallet, Users, MapPin, Camera, Music, Mic, CreditCard, HelpCircle } from 'lucide-react';

export default function HelpGuide({ onClose }) {
    const sections = [
        {
            title: 'Getting Started',
            items: [
                { icon: '🎭', text: 'Select your carnival from the dropdown at the top' },
                { icon: '➕', text: 'Use the tabs to add budget items, schedule events, and more' },
                { icon: '💾', text: 'Everything saves automatically to your account' },
            ]
        },
        {
            title: 'Free Features',
            items: [
                { icon: Calendar, text: 'Schedule — Add fetes, mas bands, and events' },
                { icon: Wallet, text: 'Budget — Track all your carnival expenses' },
                { icon: Users, text: 'Squad — Create/join a group and chat with friends' },
                { icon: Mic, text: 'Voice Add — Say "Add Tribe Friday 3pm" to quick-add events' },
                { icon: Music, text: 'Vibes Player — Stream soca playlists while planning' },
            ]
        },
        {
            title: 'Premium Features',
            items: [
                { icon: MapPin, text: 'Map — Pin venues and view event locations' },
                { icon: Camera, text: 'Media Vault — Store and share carnival photos' },
                { icon: '🎫', text: 'Live Events — Daily-updated fete listings from ticket sites' },
                { icon: '📡', text: 'Road Mode — Offline mesh chat via Bitchat' },
            ]
        },
        {
            title: 'Squad Mode',
            items: [
                { icon: '🔗', text: 'Create a squad to get a 6-digit share code' },
                { icon: '👥', text: 'Friends join with your code to sync plans' },
                { icon: '💬', text: 'Chat with your squad and the AI Carnival Concierge' },
                { icon: '🚫', text: 'Leaders can remove members if needed' },
            ]
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">How to Use Caribbean Carnival Planner</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {sections.map((section, i) => (
                        <div key={i}>
                            <h3 className="font-bold text-purple-600 dark:text-purple-400 text-sm uppercase tracking-wider mb-3">
                                {section.title}
                            </h3>
                            <div className="space-y-2">
                                {section.items.map((item, j) => (
                                    <div key={j} className="flex items-start gap-3 p-2">
                                        <span className="text-lg flex-shrink-0">
                                            {typeof item.icon === 'string' ? item.icon : <item.icon className="w-5 h-5 text-gray-500" />}
                                        </span>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Tips */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                        <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">💡 Pro Tips</h3>
                        <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                            <li>• Use Demo Mode to try all features without signing up</li>
                            <li>• Export your itinerary from the Info tab as a backup</li>
                            <li>• The AI Concierge in Squad Chat can answer carnival questions</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
}
