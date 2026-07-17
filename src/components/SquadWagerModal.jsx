import React, { useState } from 'react';
import { Trophy, Swords, AlertCircle, X, Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import app from '../firebase';

export default function SquadWagerModal({ onClose, currentSquadId }) {
  const [targetSquadId, setTargetSquadId] = useState('');
  const [wagerAmount, setWagerAmount] = useState('');
  const [winCondition, setWinCondition] = useState('Most Events Attended');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInitiateWager = async (e) => {
    e.preventDefault();
    if (!targetSquadId || !wagerAmount) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const functions = getFunctions(app);
      
      // Connect to emulator for testing
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        connectFunctionsEmulator(functions, "127.0.0.1", 5001);
      }

      const initiateWager = httpsCallable(functions, 'initiateSquadWager');
      
      const result = await initiateWager({
        challengerSquadId: currentSquadId || 'SQUAD-TEST', // Fallback for testing if prop isn't passed
        targetSquadId,
        wagerAmount,
        winCondition
      });

      setSuccess(result.data.message || `Wager challenge sent to Squad ${targetSquadId}!`);
      
      // Wait a bit before closing
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to initiate wager.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-400" />
            Squad PvP Wager
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center py-8 text-center animate-fadeIn">
              <Trophy className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">Challenge Sent!</h3>
              <p className="text-green-400 font-medium">{success}</p>
            </div>
          ) : (
            <form onSubmit={handleInitiateWager} className="space-y-5">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">
                  Challenge another squad. If accepted, wagered credits are locked until the win condition is met. Winner takes the pot!
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Target Squad ID / Code</label>
                <input 
                  type="text" 
                  required
                  value={targetSquadId}
                  onChange={(e) => setTargetSquadId(e.target.value)}
                  placeholder="e.g. SQUAD-X7Y9"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Wager Amount (Credits)</label>
                <input 
                  type="number" 
                  min="50"
                  required
                  value={wagerAmount}
                  onChange={(e) => setWagerAmount(e.target.value)}
                  placeholder="Minimum 50 credits"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Win Condition</label>
                <select 
                  value={winCondition}
                  onChange={(e) => setWinCondition(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition appearance-none"
                >
                  <option value="Most Events Attended">Most Events Attended (24h)</option>
                  <option value="First to 1000 Credits">First to 1000 Credits</option>
                  <option value="Sunrise Warrior Race">Sunrise Warrior Race</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Swords className="w-5 h-5" />}
                {loading ? 'Initiating...' : 'Send Challenge'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
