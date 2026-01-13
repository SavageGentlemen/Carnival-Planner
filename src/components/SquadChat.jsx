import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { subscribeToMessages, sendMessage } from '../services/chatService';

export default function SquadChat({ squadId, user, isDemoMode }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Subscribe to messages
    useEffect(() => {
        // Determine effective squadId for demo
        const effectiveSquadId = isDemoMode ? 'demo-squad' : squadId;

        const unsubscribe = subscribeToMessages(effectiveSquadId, isDemoMode, (msgs) => {
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [squadId, isDemoMode]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const text = inputText;
        setInputText(''); // optimistic clear

        try {
            const effectiveSquadId = isDemoMode ? 'demo-squad' : squadId;
            // For demo mode, we pass the setMessages setter to update local state
            await sendMessage(effectiveSquadId, user, text, isDemoMode, setMessages);
        } catch (err) {
            console.error("Failed to send:", err);
            setInputText(text); // restore if failed
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Squad Chat</h3>
                        <p className="text-xs text-purple-100 opacity-90 flex items-center gap-1">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            Carnival Concierge Active
                        </p>
                    </div>
                </div>
                {isDemoMode && (
                    <span className="px-2 py-1 text-[10px] font-black tracking-widest bg-yellow-400 text-yellow-900 rounded uppercase">Demo</span>
                )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                {messages.map((msg) => {
                    const isMe = msg.senderId === (user?.uid || 'demo-user');
                    const isBot = msg.isBot;

                    return (
                        <div
                            key={msg.id}
                            className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[80%] gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm 
                    ${isBot ? 'bg-gradient-to-br from-pink-500 to-orange-400' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                    {isBot ? <Bot className="w-4 h-4 text-white" /> : <UserIcon className="w-4 h-4 text-white" />}
                                </div>

                                {/* Bubble */}
                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    <span className="text-[10px] text-gray-400 mb-1 ml-1">{msg.senderName}</span>
                                    <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                        ${isMe
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : isBot
                                                ? 'bg-white dark:bg-gray-800 border-l-4 border-pink-500 text-gray-800 dark:text-gray-100 rounded-tl-none'
                                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none'
                                        }
                    `}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 opacity-50">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask Concierge or chat with squad..."
                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 dark:text-white placeholder-gray-400 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-purple-500/30"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
