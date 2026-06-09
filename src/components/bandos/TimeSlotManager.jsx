import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { bandOSService } from '../../services/bandOSService';

export default function TimeSlotManager({ bandId }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    location_details: ''
  });

  useEffect(() => {
    fetchSlots();
  }, [bandId]);

  const fetchSlots = async () => {
    try {
      const data = await bandOSService.getDistributionSlots(bandId);
      setSlots(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Combine date and time
      const startDateTime = new Date(`${newSlot.date}T${newSlot.startTime}`);
      const endDateTime = new Date(`${newSlot.date}T${newSlot.endTime}`);

      const created = await bandOSService.createDistributionSlot({
        band_id: bandId,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        capacity: parseInt(newSlot.capacity),
        location_details: newSlot.location_details
      });

      setSlots([...slots, created].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)));
      setIsCreating(false);
      setNewSlot({ date: '', startTime: '', endTime: '', capacity: '', location_details: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create time slot');
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" /></div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <div>
          <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            Distribution Time Slots
          </h3>
          <p className="text-sm text-gray-500 mt-1">Manage pickup windows to prevent overcrowding.</p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
        >
          {isCreating ? 'Cancel' : <><Plus className="w-4 h-4" /> New Slot</>}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-5 border-b border-gray-200 dark:border-gray-700 bg-purple-50 dark:bg-purple-900/10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input required type="date" value={newSlot.date} onChange={e => setNewSlot({...newSlot, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
              <input required type="time" value={newSlot.startTime} onChange={e => setNewSlot({...newSlot, startTime: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">End Time</label>
              <input required type="time" value={newSlot.endTime} onChange={e => setNewSlot({...newSlot, endTime: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Max Capacity</label>
              <input required type="number" min="1" value={newSlot.capacity} onChange={e => setNewSlot({...newSlot, capacity: e.target.value})} placeholder="e.g. 50" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Location Details</label>
            <input required type="text" value={newSlot.location_details} onChange={e => setNewSlot({...newSlot, location_details: e.target.value})} placeholder="e.g. Mas Camp Main Entrance" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors">
            Create Time Slot
          </button>
        </form>
      )}

      <div className="p-5">
        {slots.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No time slots scheduled yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map(slot => {
              const start = new Date(slot.start_time);
              const end = new Date(slot.end_time);
              const percentFull = Math.min(100, Math.round((slot.booked_count / slot.capacity) * 100));
              
              return (
                <div key={slot.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-1 bg-purple-500" style={{ width: `${percentFull}%` }}></div>
                  
                  <div className="font-bold text-gray-900 dark:text-white mb-1">
                    {start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-lg font-black text-purple-600 dark:text-purple-400 mb-3">
                    {start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{slot.location_details}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>{slot.booked_count} / {slot.capacity} Booked</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
