import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Filter, MapPin, Feather, Box, Sparkles } from 'lucide-react';
import { bandDirectory } from '../data/bandDirectory';
import { HolographicCard, CostumeStage3D, LiquidButton } from './threeui';

const ModelViewer = React.lazy(() => import('./ModelViewer'));

export default function CostumeDirectory({ carnivalId, isPremium = false }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [view3dModel, setView3dModel] = useState(null);
    const [showStudioStage, setShowStudioStage] = useState(false);

    const filteredBands = useMemo(() => {
        return bandDirectory.filter(band => {
            // Filter by carnival if specified, otherwise show all
            if (carnivalId && band.carnivalId !== carnivalId) return false;

            // Search term
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                band.name.toLowerCase().includes(searchLower) ||
                band.tags.some(tag => tag.toLowerCase().includes(searchLower));

            // Type filter (future proofing, mostly 'mas' now)
            const matchesType = selectedType === 'all' || band.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [carnivalId, searchTerm, selectedType]);

    const carnivalName = (id) => {
        switch (id) {
            case 'trinidad': return 'Trinidad';
            case 'jamaica': return 'Jamaica';
            case 'miami': return 'Miami';
            case 'nottinghill': return 'London';
            case 'toronto': return 'Toronto';
            case 'barbados': return 'Barbados';
            case 'grenada': return 'Grenada';
            case 'antigua': return 'Antigua';
            case 'stlucia': return 'St. Lucia';
            case 'atlanta': return 'Atlanta';
            default: return id;
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Search & Mode Header */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-xl">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black flex items-center gap-2 text-white font-heading">
                            <Feather className="w-5 h-5 text-cyan-400" />
                            Costume & Mas Bands
                        </h2>
                        <p className="text-sm text-slate-400 font-medium">
                            Find your frontline, backline, and showpiece package for {carnivalId ? carnivalName(carnivalId) : 'Carnival'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <LiquidButton
                            size="sm"
                            variant={showStudioStage ? 'sunset' : 'glass'}
                            onClick={() => setShowStudioStage(!showStudioStage)}
                            icon={Sparkles}
                        >
                            {showStudioStage ? 'Close 3D Stage' : '3D Studio Stage'}
                        </LiquidButton>

                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search bands..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Studio Stage Display (Collapsible) */}
            {showStudioStage && (
                <div className="animate-fadeIn">
                    <CostumeStage3D
                        itemType="wings"
                        color="#ec4899"
                        accentColor="#00e5cc"
                        title="Frontline Wing & Headpiece 3D Stage"
                        price="Interactive Showcase"
                        className="w-full h-96 rounded-3xl"
                    />
                </div>
            )}

            {/* Grid with Holographic 3D Tilt */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBands.map((band, idx) => (
                    <HolographicCard key={idx} tier="RARE" maxTilt={10} scaleOnHover={1.02}>
                        <div className="bg-slate-900/90 rounded-3xl p-5 flex flex-col justify-between h-full group">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors font-heading">
                                            {band.name}
                                        </h3>
                                        {!carnivalId && (
                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                                {carnivalName(band.carnivalId)}
                                            </span>
                                        )}
                                    </div>
                                    {band.website && (
                                        <a
                                            href={band.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-slate-800 rounded-full hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {band.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 text-[10px] font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/20 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 3D Try-on button */}
                            {isPremium && band.modelUrl && (
                                <button
                                    onClick={() => setView3dModel({ url: band.modelUrl, usdzUrl: band.usdzUrl, title: band.name })}
                                    className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-black text-xs font-black rounded-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                                >
                                    <Box className="w-3.5 h-3.5" />
                                    Try in 3D
                                </button>
                            )}
                        </div>
                    </HolographicCard>
                ))}
            </div>

            {filteredBands.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <Feather className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-bold">No bands found matching your search.</p>
                </div>
            )}

            {/* 3D Model Viewer overlay */}
            {view3dModel && (
                <React.Suspense fallback={null}>
                    <ModelViewer
                        modelUrl={view3dModel.url}
                        usdzUrl={view3dModel.usdzUrl}
                        title={view3dModel.title}
                        onClose={() => setView3dModel(null)}
                        isPremium={isPremium}
                    />
                </React.Suspense>
            )}
        </div>
    );
}

