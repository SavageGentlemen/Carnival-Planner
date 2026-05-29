import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export default function GuidesCarousel({ isOpen, onClose, initialSlide = 0, isPromoter, isBandLeader }) {
    if (!isOpen) return null;

    const allSlides = [
        {
            id: 'squad',
            title: 'How to Build a Squad',
            description: 'Connect with friends, track locations on the road, and share your Carnival experience in real-time.',
            image: '/guides/playbook_squad.png',
            color: 'from-purple-600 to-pink-600'
        },
        {
            id: 'sell',
            title: 'How to Sell Costumes',
            description: 'Securely re-sell your costume or tickets on the Marketplace using our Stripe integration.',
            image: '/guides/playbook_sell.png',
            color: 'from-green-600 to-emerald-600'
        },
        {
            id: 'ar',
            title: 'How to Use AR Viewer',
            description: 'Preview costumes in your room before you buy them using our cutting-edge 3D Augmented Reality standard.',
            image: '/guides/playbook_ar.png',
            color: 'from-blue-600 to-cyan-600'
        },
        {
            id: 'bandos',
            title: 'Band Leader Tools',
            description: 'Total control for Band Leaders. Manage inventory, view analytics, and utilize live QR scanners for distribution.',
            image: '/guides/playbook_bandos.png',
            color: 'from-amber-600 to-orange-600',
            requiresBandLeader: true
        }
    ];

    // Filter slides based on user role
    const slides = allSlides.filter(slide => !slide.requiresBandLeader || isBandLeader);

    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    // Sync initialSlide if it changes during an open state
    useEffect(() => {
        setCurrentSlide(initialSlide < slides.length ? initialSlide : 0);
    }, [initialSlide, slides.length]);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const slide = slides[currentSlide];

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-xl animate-fadeIn">
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-2 text-white">
                    <BookOpen className="w-6 h-6 text-pink-500" />
                    <span className="font-bold text-lg">Carnival Playbook</span>
                </div>
                <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Image Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-3xl scale-125">
                    <img src={slide.image} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Main Content Card */}
                <div className="relative w-full max-w-lg mx-auto z-10 px-6">
                    <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
                        <div className="relative h-80 sm:h-96 w-full group">
                            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className={`absolute inset-0 bg-gradient-to-t ${slide.color} mix-blend-multiply opacity-50`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-3 inline-block shadow-lg border border-white/10">
                                    Step {currentSlide + 1} of {slides.length}
                                </span>
                                <h2 className="text-3xl font-black text-white mb-2 leading-tight drop-shadow-md">{slide.title}</h2>
                                <p className="text-gray-300 text-sm leading-relaxed drop-shadow-md">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-8">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="p-3 bg-white/10 border border-white/20 shadow-lg backdrop-blur-md rounded-full text-white disabled:opacity-20 hover:bg-white/30 hover:scale-110 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-8">
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === slides.length - 1}
                        className="p-3 bg-white/10 border border-white/20 shadow-lg backdrop-blur-md rounded-full text-white disabled:opacity-20 hover:bg-white/30 hover:scale-110 transition-all"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="pb-8 pt-4 px-6 z-10">
                <div className="max-w-md mx-auto flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full flex-1 transition-all ${idx === currentSlide ? 'bg-white shadow-lg shadow-white/50' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
