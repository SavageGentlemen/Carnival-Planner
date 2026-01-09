import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Home, Shirt, PartyPopper, Users, Plus, Trash2, Navigation } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createColoredIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const PIN_TYPES = {
  accommodation: { label: 'Accommodation', color: '#3B82F6', icon: Home },
  costume: { label: 'Costume Pickup', color: '#F59E0B', icon: Shirt },
  fete: { label: 'Fete Location', color: '#EC4899', icon: PartyPopper },
  meetup: { label: 'Meetup Spot', color: '#10B981', icon: Users },
};

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Country-specific map centers for each carnival
const CARNIVAL_CENTERS = {
  'trinidad': { center: [10.6918, -61.2225], zoom: 11, country: 'Trinidad & Tobago' },
  'stkitts-sugar-mas': { center: [17.3026, -62.7177], zoom: 12, country: 'St. Kitts' },
  'aruba': { center: [12.5211, -69.9683], zoom: 12, country: 'Aruba' },
  'guyana-mashramani': { center: [6.8013, -58.1551], zoom: 12, country: 'Guyana' },
  'guyana-independence': { center: [6.8013, -58.1551], zoom: 12, country: 'Guyana' },
  'jamaica': { center: [18.0179, -76.8099], zoom: 11, country: 'Jamaica' },
  'stmaarten': { center: [18.0425, -63.0548], zoom: 12, country: 'St. Maarten' },
  'bahamas': { center: [25.0343, -77.3963], zoom: 12, country: 'Bahamas' },
  'bermuda': { center: [32.3078, -64.7505], zoom: 13, country: 'Bermuda' },
  'vincymas': { center: [13.1587, -61.2248], zoom: 12, country: 'St. Vincent' },
  'antigua': { center: [17.1274, -61.8468], zoom: 12, country: 'Antigua' },
  'stlucia': { center: [14.0101, -60.9870], zoom: 11, country: 'St. Lucia' },
  'tobago': { center: [11.1889, -60.7320], zoom: 11, country: 'Tobago' },
  'nottinghill': { center: [51.5156, -0.2050], zoom: 14, country: 'London, UK' },
  'miami': { center: [25.7617, -80.1918], zoom: 11, country: 'Miami, FL' },
};

export default function FeteMap({ locations = [], onLocationsChange, carnivalName, carnivalId }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPin, setNewPin] = useState({ name: '', type: 'fete', lat: '', lng: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const accommodation = locations.find(loc => loc.type === 'accommodation');
  
  // Get country-specific center or fall back to Trinidad
  const carnivalConfig = CARNIVAL_CENTERS[carnivalId] || CARNIVAL_CENTERS['trinidad'];
  
  const defaultCenter = useMemo(() => {
    if (accommodation) return [accommodation.lat, accommodation.lng];
    if (locations.length > 0) return [locations[0].lat, locations[0].lng];
    return carnivalConfig.center;
  }, [locations, accommodation, carnivalConfig]);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
    }
    setIsSearching(false);
  };

  const selectSearchResult = (result) => {
    setNewPin({
      ...newPin,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      name: newPin.name || result.display_name.split(',')[0]
    });
    setSearchResults([]);
    setSearchQuery('');
  };

  const addLocation = () => {
    if (!newPin.name || !newPin.lat || !newPin.lng) return;
    const newLocation = {
      id: Date.now().toString(),
      name: newPin.name,
      type: newPin.type,
      lat: parseFloat(newPin.lat),
      lng: parseFloat(newPin.lng),
    };
    onLocationsChange([...locations, newLocation]);
    setNewPin({ name: '', type: 'fete', lat: '', lng: '' });
    setShowAddForm(false);
  };

  const removeLocation = (id) => {
    onLocationsChange(locations.filter(loc => loc.id !== id));
  };

  const getDistanceFromAccommodation = (loc) => {
    if (!accommodation || loc.type === 'accommodation') return null;
    const dist = calculateDistance(accommodation.lat, accommodation.lng, loc.lat, loc.lng);
    if (dist < 1) return `${Math.round(dist * 1000)}m`;
    return `${dist.toFixed(1)}km`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            Fete Map - {carnivalName}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-7">
            📍 {carnivalConfig.country}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Pin
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Location name"
              value={newPin.name}
              onChange={(e) => setNewPin({ ...newPin, name: e.target.value })}
              className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <select
              value={newPin.type}
              onChange={(e) => setNewPin({ ...newPin, type: e.target.value })}
              className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            >
              {Object.entries(PIN_TYPES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for a place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <button
              onClick={searchLocation}
              disabled={isSearching}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSearching ? '...' : 'Search'}
            </button>
          </div>

          {searchResults.length > 0 && (
            <ul className="bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-lg max-h-40 overflow-y-auto">
              {searchResults.map((result, idx) => (
                <li
                  key={idx}
                  onClick={() => selectSearchResult(result)}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer text-sm truncate dark:text-white"
                >
                  {result.display_name}
                </li>
              ))}
            </ul>
          )}

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={newPin.lat}
              onChange={(e) => setNewPin({ ...newPin, lat: e.target.value })}
              className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={newPin.lng}
              onChange={(e) => setNewPin({ ...newPin, lng: e.target.value })}
              className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={addLocation}
              disabled={!newPin.name || !newPin.lat || !newPin.lng}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Location
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="h-[400px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
        <MapContainer
          center={defaultCenter}
          zoom={carnivalConfig.zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={defaultCenter} />
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createColoredIcon(PIN_TYPES[loc.type]?.color || '#6B7280')}
            >
              <Popup>
                <div className="font-medium">{loc.name}</div>
                <div className="text-xs text-gray-500">{PIN_TYPES[loc.type]?.label}</div>
                {getDistanceFromAccommodation(loc) && (
                  <div className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                    <Navigation className="w-3 h-3" />
                    {getDistanceFromAccommodation(loc)} from accommodation
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {locations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Saved Locations</h4>
          <div className="grid gap-2">
            {locations.map((loc) => {
              const pinType = PIN_TYPES[loc.type];
              const IconComponent = pinType?.icon || MapPin;
              const distance = getDistanceFromAccommodation(loc);
              return (
                <div
                  key={loc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: pinType?.color || '#6B7280' }}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">{loc.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {pinType?.label}
                        {distance && ` • ${distance} from stay`}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeLocation(loc.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!accommodation && locations.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <Home className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Start by adding your accommodation location</p>
          <p className="text-sm">Then add fetes, costume pickup, and meetup spots</p>
        </div>
      )}
    </div>
  );
}
