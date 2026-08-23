import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  UserPlus, 
  Copy, 
  Check, 
  Award, 
  Users, 
  Shirt, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { supabase } from '../../supabaseClient';

export default function BandAmbassadors({ bandId }) {
  const [reps, setReps] = useState([
    {
      id: 'rep_1',
      name: 'Jordan Vance',
      code: 'jordan',
      role: 'Section Leader',
      assignedSection: 'Frontline Feathers — Solstice',
      commissionPerCostume: 35.00,
      costumesSold: 28,
      depositVolume: 11200.00,
      commissionEarned: 980.00,
      status: 'ACTIVE'
    },
    {
      id: 'rep_2',
      name: 'Kendra Thomas',
      code: 'kendra',
      role: 'Influencer Ambassador',
      assignedSection: 'Backline Masquerader — Eclipse',
      commissionPerCostume: 20.00,
      costumesSold: 19,
      depositVolume: 4750.00,
      commissionEarned: 380.00,
      status: 'ACTIVE'
    },
    {
      id: 'rep_3',
      name: 'Marcus Thorne',
      code: 'marcus',
      role: 'Promoter Rep',
      assignedSection: 'All Sections',
      commissionPerCostume: 25.00,
      costumesSold: 14,
      depositVolume: 5200.00,
      commissionEarned: 350.00,
      status: 'ACTIVE'
    }
  ]);

  const [copiedCode, setCopiedCode] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formRole, setFormRole] = useState('Section Leader');
  const [formSection, setFormSection] = useState('Frontline Feathers — Solstice');
  const [formCommission, setFormCommission] = useState('30.00');

  const handleCopyLink = (code) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullLink = origin + '/?band=' + (bandId || 'tribe') + '&rep=' + code;
    navigator.clipboard.writeText(fullLink);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateRep = (e) => {
    e.preventDefault();
    if (!formName || !formCode) return;

    const newRep = {
      id: 'rep_' + Date.now(),
      name: formName,
      code: formCode.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      role: formRole,
      assignedSection: formSection,
      commissionPerCostume: parseFloat(formCommission) || 25.00,
      costumesSold: 0,
      depositVolume: 0,
      commissionEarned: 0,
      status: 'ACTIVE'
    };

    setReps([newRep, ...reps]);
    setShowAddModal(false);
    setFormName('');
    setFormCode('');
    setFormCommission('30.00');
  };

  const totalCostumes = reps.reduce((s, r) => s + r.costumesSold, 0);
  const totalDeposits = reps.reduce((s, r) => s + r.depositVolume, 0);
  const totalCommissions = reps.reduce((s, r) => s + r.commissionEarned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-pink-500" />
            Section Leaders & Ambassador Tracking
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Equip section designers and influencer reps with unique referral links and track costume sales commissions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all text-sm"
        >
          <UserPlus className="w-4 h-4" /> Add Section Leader / Rep
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Costumes Referred</span>
            <Shirt className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{totalCostumes}</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">Driven by Section Leaders & Reps</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deposit Volume Driven</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-black text-green-600 dark:text-green-400">
            {"$" + totalDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-1">Costume registration deposits collected</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Commissions Owed</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-500">
            {"$" + totalCommissions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 mt-1">Auto-calculated designer payouts</p>
        </div>
      </div>

      {/* Reps Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">Active Section Leaders ({reps.length})</h3>
          <span className="text-xs text-gray-500">Unique referral tracking active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="p-3.5 font-bold">Leader / Ambassador</th>
                <th className="p-3.5 font-bold">Assigned Section</th>
                <th className="p-3.5 font-bold">Tracking Link</th>
                <th className="p-3.5 font-bold">Commission</th>
                <th className="p-3.5 font-bold">Sold</th>
                <th className="p-3.5 font-bold">Deposit Volume</th>
                <th className="p-3.5 font-bold">Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {reps.map((rep) => (
                <tr key={rep.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-gray-900 dark:text-white">{rep.name}</div>
                    <span className="text-xs text-pink-600 dark:text-pink-400 font-semibold">{rep.role}</span>
                  </td>
                  <td className="p-3.5 text-gray-600 dark:text-gray-300">
                    <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-bold">
                      {rep.assignedSection}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded text-xs text-purple-600 dark:text-purple-400 font-mono">
                        ?rep={rep.code}
                      </code>
                      <button
                        onClick={() => handleCopyLink(rep.code)}
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedCode === rep.code ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedCode === rep.code ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </td>
                  <td className="p-3.5 text-gray-700 dark:text-gray-300 font-medium">
                    {"$" + rep.commissionPerCostume.toFixed(2) + " / costume"}
                  </td>
                  <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                    {rep.costumesSold}
                  </td>
                  <td className="p-3.5 font-bold text-green-600 dark:text-green-400">
                    {"$" + rep.depositVolume.toFixed(2)}
                  </td>
                  <td className="p-3.5 font-bold text-amber-500">
                    {"$" + rep.commissionEarned.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Add Section Leader or Ambassador</h3>
            <p className="text-xs text-gray-500 mb-5">Create custom tracking link and commission rate for costume sales.</p>

            <form onSubmit={handleCreateRep} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Leader / Ambassador Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samantha Cole"
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (!formCode) setFormCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                  }}
                  className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="Section Leader">Section Leader</option>
                    <option value="Influencer Ambassador">Influencer Ambassador</option>
                    <option value="Promoter Rep">Promoter Rep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Tracking Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. samantha"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Assigned Section</label>
                <input
                  type="text"
                  value={formSection}
                  onChange={(e) => setFormSection(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Commission Per Costume ($)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  required
                  value={formCommission}
                  onChange={(e) => setFormCommission(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  Generate Tracking Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
