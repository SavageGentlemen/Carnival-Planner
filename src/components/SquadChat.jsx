import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Camera, Image as ImageIcon, X } from 'lucide-react';
import { subscribeToMessages, sendMessage } from '../services/chatService';

export default function SquadChat({ squadId, user, isDemoMode }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // File object
    const [previewUrl, setPreviewUrl] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    console.log("SquadChat Rendered. squadId:", squadId, "User:", user?.uid);

    // Subscribe to messages
    useEffect(() => {
        const effectiveSquadId = isDemoMode ? 'demo-squad' : squadId;
        const unsubscribe = subscribeToMessages(effectiveSquadId, isDemoMode, (msgs) => {
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [squadId, isDemoMode]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Clean up preview URL
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim() && !selectedImage) return;

        const text = inputText;
        const image = selectedImage;

        // Optimistic Clear
        setInputText('');
        setSelectedImage(null);
        setPreviewUrl(null);

        try {
            const effectiveSquadId = isDemoMode ? 'demo-squad' : squadId;
            await sendMessage(effectiveSquadId, user, text, image, isDemoMode, setMessages); // Pass setMessages for demo update
        } catch (err) {
            console.error("Failed to send:", err);
            // Restore input on fail? A bit complex with image but acceptable for MVP
            setInputText(text);
        }
    };

    if (!squadId) {
        return (
            <div className="flex flex-col h-[300px] items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">No Active Squad</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    Join or create a squad above to verify your Road Mode connection and start chatting!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[65vh] sm:h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative">
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
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
                        <p>No messages yet. Say hi!</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.senderId === (user?.uid || 'demo-user');
                        const isBot = msg.isBot;

                        // Check Expiry
                        let isExpired = false;
                        let expiresAtDate = null;
                        if (msg.expiresAt) {
                            expiresAtDate = new Date(msg.expiresAt);
                            if (new Date() > expiresAtDate) isExpired = true;
                        }

                        return (
                            <div
                                key={msg.id}
                                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex max-w-[85%] sm:max-w-[80%] gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm 
                    ${isBot ? 'bg-gradient-to-br from-pink-500 to-orange-400' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                        {isBot ? <Bot className="w-4 h-4 text-white" /> : <UserIcon className="w-4 h-4 text-white" />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[10px] text-gray-400 mb-1 ml-1">{msg.senderName}</span>
                                        <div className={`px-4 py-2 sm:py-3 rounded-2xl shadow-sm text-sm leading-relaxed relative break-words
                        ${isMe
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : isBot
                                                    ? 'bg-white dark:bg-gray-800 border-l-4 border-pink-500 text-gray-800 dark:text-gray-100 rounded-tl-none'
                                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none'
                                            }
                    `}>
                                            {/* IMAGE RENDERING */}
                                            {msg.imageUrl && (
                                                <div className="mb-2">
                                                    {isExpired ? (
                                                        <div className="w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-500">
                                                            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                                                            <span className="text-xs italic">Image expired</span>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group">
                                                            <img
                                                                src={msg.imageUrl}
                                                                alt="Shared"
                                                                className="w-48 h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                                                onClick={() => window.open(msg.imageUrl, '_blank')}
                                                            />
                                                            <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                                                                ⏳ 24h
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-400 mt-1 opacity-50">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-2 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">

                {/* Image Preview */}
                {previewUrl && (
                    <div className="mb-3 relative inline-block">
                        <img src={previewUrl} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-purple-200" />
                        <button
                            type="button"
                            onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                )}

                <div className="flex gap-2 items-center">
                    {/* File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 sm:p-3 flex-shrink-0 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                        title="Upload Image (Expires in 24h)"
                    >
                        <Camera className="w-5 h-5" />
                    </button>

                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={selectedImage ? "Add caption..." : "Message squad..."}
                        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 dark:text-white placeholder-gray-400 transition-all text-sm sm:text-base min-w-0"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() && !selectedImage}
                        className="p-2 sm:p-3 flex-shrink-0 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-purple-500/30"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
