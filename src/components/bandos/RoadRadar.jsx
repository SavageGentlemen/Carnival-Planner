import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MapPin, 
  Truck, 
  Wine, 
  Utensils, 
  HeartHandshake, 
  Navigation, 
  Plus, 
  Edit3, 
  Trash2, 
  Loader2, 
  RefreshCw, 
  Check, 
  Share2, 
  Zap, 
  X,
  Compass,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bandOSService } from '../../services/bandOSService';

const TRUCK_ICONS = {
  music: { icon: Radio, color: 'text-pink-400', bg: 'bg-pink-500/20 border-pink-500/30' },
  drinks: { icon: Wine, color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30' },
  food: { icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30' },
  restroom: { icon: HeartHandshake, color: 'text-cyan-400', bg: 'bg-cyan-500/20 border-cyan-500/30' },
  medical: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30' }
};

export default function RoadRadar({ bandId }) {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [broadcastingGps, setBroadcastingGps] = useState(false);

  const [formData, setFormData] = useState({
    truck_name: '',
    truck_type: 'music',
    latitude: 10.6605,
    longitude: -61.5165,
    heading: 85,
    status_message: ''
  });

  useEffect(() => {
    loadTrucks();
  }, [bandId]);

  const loadTrucks = async () => {
    setLoading(true);
    try {
      const data = await bandOSService.getRoadLocations(bandId);
      setTrucks(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTruck = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await bandOSService.updateRoadLocation(bandId, formData);
      setTrucks([created, ...trucks.filter(t => t.id !== created.id)]);
      setShowAddModal(false);
      setFormData({
        truck_name: '',
        truck_type: 'music',
        latitude: 10.6605,
        longitude: -61.5165,
        heading: 85,
        status_message: ''
      });
    } catch (err) {
      alert('Failed to save truck coordinates');
    } finally {
      setSaving(false);
    }
  };

  const handleBroadcastDeviceGPS = (truckId) => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }

    setBroadcastingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, heading } = pos.coords;
        const target = trucks.find(t => t.id === truckId);
        if (!target) return;

        const updated = await bandOSService.updateRoadLocation(bandId, {
          ...target,
          latitude,
          longitude,
          heading: heading || 0,
          status_message: '📍 Live Device GPS Broadcast Active'
        });

        setTrucks(trucks.map(t => t.id === truckId ? updated : t));
        setBroadcastingGps(false);
        alert(`✅ GPS broadcasted for ${target.truck_name}! (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`);
      },
      (err) => {
        setBroadcastingGps(false);
        alert(`Failed to get device GPS: ${err.message}`);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this truck beacon from Road Radar?')) return;
    setTrucks(trucks.filter(t => t.id !== id));
    await bandOSService.deleteRoadLocation(id);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <Radio className="w-6 h-6 text-pink-500 animate-pulse" />
            Live Road Radar & Truck Telemetry
          </h2>
          <p className="text-xs text-white/50">
            Broadcast real-time GPS locations for sound trucks, hydration stations, and restrooms to masqueraders on the parade route.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadTrucks}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Refresh Fleet Radar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg shadow-pink-500/20"
          >
            <Plus className="w-4 h-4" /> Add Truck Beacon
          </button>
        </div>
      </div>

      {/* Simulated Radar Visual Banner */}
      <div className="glass-panel rounded-3xl border border-white/10 bg-gradient-to-b from-gray-900/90 to-[#080c14] p-6 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        
        {/* Radar Rings Background */}
        <div className="w-48 h-48 sm:w-64 sm:h-64 border border-pink-500/20 rounded-full mx-auto relative flex items-center justify-center mb-4">
          <div className="w-32 h-32 sm:w-44 sm:h-44 border border-pink-500/30 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 border border-pink-500/40 rounded-full flex items-center justify-center">
              <Compass className="w-8 h-8 text-pink-500 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>
          
          {/* Simulated Truck Blips */}
          <div className="absolute top-8 left-12 w-3 h-3 bg-pink-400 rounded-full animate-ping" />
          <div className="absolute top-8 left-12 w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-500" />

          <div className="absolute bottom-12 right-14 w-3 h-3 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-12 right-14 w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-500" />
        </div>

        <h3 className="text-base font-bold font-display text-white mb-1">
          {trucks.length} Road Beacons Broadcasting Live
        </h3>
        <p className="text-xs text-white/50 max-w-md mx-auto">
          Masqueraders with the Carnival Planner app or web link receive live waypoint updates amidst congested parade cell networks.
        </p>
      </div>

      {/* Truck Fleet Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/50 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-xs">Connecting to road radar satellites...</p>
        </div>
      ) : trucks.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center border border-white/10 bg-white/5 max-w-md mx-auto">
          <Radio className="w-12 h-12 text-pink-400/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1 font-display">No Road Beacons Deployed</h3>
          <p className="text-xs text-white/50 mb-4">
            Add GPS beacons for Sound Trucks, Drinks Trucks, and Restrooms so your masqueraders can pinpoint your band on Carnival Monday & Tuesday.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg shadow-pink-500/20"
          >
            <Plus className="w-4 h-4" /> Add First Truck Beacon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {trucks.map(truck => {
              const theme = TRUCK_ICONS[truck.truck_type] || TRUCK_ICONS.music;
              const IconComponent = theme.icon;

              return (
                <motion.div
                  key={truck.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all shadow-lg group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${theme.bg}`}>
                          <IconComponent className={`w-4 h-4 ${theme.color}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white font-display leading-tight">{truck.truck_name}</h4>
                          <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">{truck.truck_type} truck</span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    </div>

                    {/* Status Message */}
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 mb-3 text-xs">
                      <p className="text-white/80 font-medium">"{truck.status_message || 'Parade route moving on schedule'}"</p>
                      <p className="text-[10px] text-white/40 mt-1 font-mono">
                        GPS: {truck.latitude?.toFixed(4)}, {truck.longitude?.toFixed(4)} • Heading {truck.heading || 0}°
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => handleBroadcastDeviceGPS(truck.id)}
                      disabled={broadcastingGps}
                      className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Broadcast My Location
                    </button>

                    <button
                      onClick={() => handleDelete(truck.id)}
                      className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove Beacon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Add Truck Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel max-w-md w-full p-6 rounded-3xl border border-white/20 bg-gray-900/95 shadow-2xl text-white relative"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-display flex items-center gap-2 mb-1">
              <Truck className="w-5 h-5 text-pink-500" />
              Add Road Radar Truck
            </h3>
            <p className="text-xs text-white/50 mb-6">
              Create a live tracking waypoint for sound systems, bar trucks, or first aid.
            </p>

            <form onSubmit={handleCreateTruck} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Truck / Station Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Main DJ Truck #1 — Private Ryan"
                  value={formData.truck_name}
                  onChange={e => setFormData({ ...formData, truck_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Category *</label>
                <select
                  value={formData.truck_type}
                  onChange={e => setFormData({ ...formData, truck_type: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="music" className="bg-gray-900 text-white">Sound / Music Truck</option>
                  <option value="drinks" className="bg-gray-900 text-white">Drinks / Hydration Bar</option>
                  <option value="food" className="bg-gray-900 text-white">Lunch & Snack Truck</option>
                  <option value="restroom" className="bg-gray-900 text-white">AC Restroom Trailer</option>
                  <option value="medical" className="bg-gray-900 text-white">Medical & Cool-down Tent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Status Announcement</label>
                <input
                  type="text"
                  placeholder="e.g. Rum restocked, turning onto Ariapita Ave"
                  value={formData.status_message}
                  onChange={e => setFormData({ ...formData, status_message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Deploy Beacon
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
