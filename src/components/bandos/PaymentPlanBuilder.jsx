import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Loader2, Calendar, Percent } from 'lucide-react';
import { bandOSService } from '../../services/bandOSService';

export default function PaymentPlanBuilder({ bandId }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  const [newPlan, setNewPlan] = useState({
    name: '',
    is_default: false,
    installments: [
      { label: 'Deposit', percentage: 25, days_offset: 0 },
      { label: 'Installment 1', percentage: 25, days_offset: 30 },
      { label: 'Installment 2', percentage: 50, days_offset: 60 }
    ]
  });

  useEffect(() => {
    fetchPlans();
  }, [bandId]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await bandOSService.getPaymentPlans(bandId);
      setPlans(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInstallment = () => {
    setNewPlan({
      ...newPlan,
      installments: [
        ...newPlan.installments,
        { label: `Installment ${newPlan.installments.length}`, percentage: 0, days_offset: 90 }
      ]
    });
  };

  const handleRemoveInstallment = (index) => {
    const updated = [...newPlan.installments];
    updated.splice(index, 1);
    setNewPlan({ ...newPlan, installments: updated });
  };

  const handleInstallmentChange = (index, field, value) => {
    const updated = [...newPlan.installments];
    updated[index][field] = field === 'label' ? value : Number(value);
    setNewPlan({ ...newPlan, installments: updated });
  };

  const totalPercentage = newPlan.installments.reduce((acc, curr) => acc + (curr.percentage || 0), 0);

  const handleSavePlan = async (e) => {
    e.preventDefault();
    if (totalPercentage !== 100) {
      alert('Percentages must sum to exactly 100%');
      return;
    }
    
    try {
      const created = await bandOSService.createPaymentPlan({
        band_id: bandId,
        name: newPlan.name,
        is_default: newPlan.is_default,
        installments: newPlan.installments
      });
      setPlans([created, ...plans.map(p => newPlan.is_default ? { ...p, is_default: false } : p)]);
      setIsCreating(false);
      setNewPlan({
        name: '',
        is_default: false,
        installments: [
          { label: 'Deposit', percentage: 25, days_offset: 0 },
          { label: 'Installment 1', percentage: 25, days_offset: 30 },
          { label: 'Installment 2', percentage: 50, days_offset: 60 }
        ]
      });
    } catch (err) {
      console.error(err);
      alert('Failed to save payment plan');
    }
  };

  if (loading) return <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" /> Payment Plans
        </h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          {isCreating ? 'Cancel' : <><Plus className="w-4 h-4" /> New Plan</>}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSavePlan} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex justify-between items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Plan Name</label>
              <input required value={newPlan.name} onChange={e => setNewPlan({...newPlan, name: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="e.g. Standard 3-Pay" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="is_default" checked={newPlan.is_default} onChange={e => setNewPlan({...newPlan, is_default: e.target.checked})} className="w-4 h-4 text-purple-600" />
              <label htmlFor="is_default" className="text-sm font-bold text-gray-700 dark:text-gray-300">Set as Default Plan</label>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900 dark:text-white">Installment Schedule</h3>
              <span className={`text-sm font-bold px-2 py-1 rounded ${totalPercentage === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                Total: {totalPercentage}%
              </span>
            </div>
            
            <div className="space-y-3">
              {newPlan.installments.map((inst, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Label</label>
                    <input required value={inst.label} onChange={e => handleInstallmentChange(idx, 'label', e.target.value)} type="text" className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white" />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Percentage</label>
                    <div className="relative">
                      <input required value={inst.percentage} onChange={e => handleInstallmentChange(idx, 'percentage', e.target.value)} type="number" min="1" max="100" className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white" />
                      <Percent className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Days from deposit</label>
                    <input required value={inst.days_offset} onChange={e => handleInstallmentChange(idx, 'days_offset', e.target.value)} type="number" min="0" className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white" />
                  </div>
                  <div className="pt-5">
                    <button type="button" onClick={() => handleRemoveInstallment(idx)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg" disabled={newPlan.installments.length <= 1}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={handleAddInstallment} className="mt-3 text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Installment
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Visual Preview</h4>
            <div className="w-full h-8 flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              {newPlan.installments.map((inst, idx) => (
                <div 
                  key={idx} 
                  className={`h-full flex items-center justify-center text-[10px] font-bold text-white border-r border-white/20 last:border-r-0`}
                  style={{ 
                    width: `${inst.percentage || 0}%`,
                    backgroundColor: `hsl(${280 + (idx * 40)}, 70%, 50%)`
                  }}
                  title={`${inst.label}: ${inst.percentage}%`}
                >
                  {inst.percentage > 5 ? `${inst.percentage}%` : ''}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={totalPercentage !== 100} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save Payment Plan
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map(plan => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  {plan.name}
                  {plan.is_default && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Default</span>}
                </h3>
                <p className="text-sm text-gray-500">{plan.installments?.length || 0} installments</p>
              </div>
            </div>
            
            <div className="w-full h-4 flex rounded-full overflow-hidden mb-3">
              {plan.installments?.map((inst, idx) => (
                <div 
                  key={idx} 
                  className={`h-full`}
                  style={{ 
                    width: `${inst.percentage || 0}%`,
                    backgroundColor: `hsl(${280 + (idx * 40)}, 70%, 50%)`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="space-y-1">
              {plan.installments?.map((inst, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(${280 + (idx * 40)}, 70%, 50%)`}}></span>
                    {inst.label}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">{inst.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {plans.length === 0 && !isCreating && (
          <div className="md:col-span-2 p-12 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No payment plans created yet.</p>
            <p className="text-sm text-gray-400 mt-1">Create a plan to allow masqueraders to pay in installments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
