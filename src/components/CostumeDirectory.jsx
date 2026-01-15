import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Filter, MapPin, Feather } from 'lucide-react';
import { bandDirectory } from '../data/bandDirectory';

export default function CostumeDirectory({ carnivalId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');

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
            {/* Search Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                            <Feather className="w-5 h-5 text-purple-500" />
                            Costume Bands
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Find your perfect fit for {carnivalId ? carnivalName(carnivalId) : 'Carnival'}
                        </p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search bands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBands.map((band, idx) => (
                    <div
                        key={idx}
                        className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {band.name}
                                </h3>
                                {!carnivalId && (
                                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {carnivalName(band.carnivalId)}
                                    </span>
                                )}
                            </div>
                            {band.website && (
                                <a
                                    href={band.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/40 dark:hover:text-purple-400 transition"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {band.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {filteredBands.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Feather className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No bands found matching your search.</p>
                </div>
            )}
        </div>
    );
}
