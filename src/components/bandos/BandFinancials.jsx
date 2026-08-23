import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ExternalLink, 
  Loader2, 
  TrendingUp, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { supabase } from '../../supabaseClient';

export default function BandFinancials({ bandId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  // Simulator state
  const [costumeDeposit, setCostumeDeposit] = useState(400);
  const [costumeCount, setCostumeCount] = useState(150);
  const [feeMode, setFeeMode] = useState('PASS_TO_BUYER');

  useEffect(() => {
    fetchProfile();
  }, [bandId]);

  const fetchProfile = async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_profiles')
          .select('*')
          .eq('id', bandId)
          .single();
        if (!error && data) setProfile(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStripe = async () => {
    setConnecting(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.functions.invoke('stripe-connect-onboard', {
          body: { bandId }
        });
        if (error) throw error;
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      }
      alert('Stripe Connect sandbox initialized for demo band!');
    } catch (err) {
      console.error(err);
      alert('Failed to connect to Stripe');
    } finally {
      setConnecting(false);
    }
  };

  // Fee calculation for costume deposit
  // Standard deposit fee: 2.5% + $1.00 (convenience fee passed to masquerader)
  const depositTotal = Number((costumeDeposit * costumeCount).toFixed(2));
  const platformFeePerDeposit = Number((costumeDeposit * 0.025 + 1.00).toFixed(2));
  const totalPlatformFees = Number((platformFeePerDeposit * costumeCount).toFixed(2));
  const stripeFeePerDeposit = Number((costumeDeposit * 0.029 + 0.30).toFixed(2));
  const totalStripeFees = Number((stripeFeePerDeposit * costumeCount).toFixed(2));

  const masqueraderPaysPerDeposit = feeMode === 'PASS_TO_BUYER' 
    ? Number((costumeDeposit + platformFeePerDeposit + stripeFeePerDeposit).toFixed(2))
    : costumeDeposit;

  const bandTakeHomeNet = feeMode === 'PASS_TO_BUYER' 
    ? depositTotal 
    : Number((depositTotal - totalPlatformFees - totalStripeFees).toFixed(2));

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-pink-500" /></div>;

  const isConnected = !!profile?.stripe_account_id;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Financials & Payout Architecture
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Automated Stripe Connect deposits with zero monthly subscription overhead.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-1.5 rounded-full text-xs font-bold text-green-700 dark:text-green-400">
          <Zap className="w-3.5 h-3.5" /> $0 / Month Band Leader Guarantee
        </div>
      </div>

      {/* Stripe Connect Banner */}
      {!isConnected ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 text-center max-w-xl mx-auto">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold dark:text-white mb-1">Direct Bank Account Payouts</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
            Connect your bank account via Stripe Connect to receive instant rolling costume deposit payouts.
          </p>
          <button
            onClick={handleConnectStripe}
            disabled={connecting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 mx-auto text-xs disabled:opacity-70 transition-colors shadow-md"
          >
            {connecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
            Connect Direct Payouts with Stripe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Available Payouts</span>
              <div className="p-1.5 bg-green-50 text-green-600 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">$0.00</p>
            <p className="text-xs text-gray-500 mt-1">Direct to connected bank</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Pending Clearing</span>
              <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-lg"><Clock className="w-4 h-4" /></div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">$0.00</p>
            <p className="text-xs text-gray-500 mt-1">Clearing in 2 business days</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-sm flex flex-col justify-center items-center text-center">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Stripe Express Connected</p>
            <button
              onClick={handleConnectStripe}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-300 font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Stripe Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Deposit Fee Transparency Calculator */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
              Deposit & Production Economics
            </span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
              Costume Deposit Fee Calculator
            </h3>
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setFeeMode('PASS_TO_BUYER')}
              className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all " + (feeMode === 'PASS_TO_BUYER' ? "bg-pink-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
            >
              Pass Fee to Masquerader ($0 Cost)
            </button>
            <button
              type="button"
              onClick={() => setFeeMode('ABSORB_FEE')}
              className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all " + (feeMode === 'ABSORB_FEE' ? "bg-pink-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
            >
              Absorb in Costume Price
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Average Costume Deposit ($)
            </label>
            <input
              type="number"
              min="50"
              step="25"
              value={costumeDeposit}
              onChange={(e) => setCostumeDeposit(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Target Masquerader Registrations
            </label>
            <input
              type="number"
              min="10"
              max="5000"
              value={costumeCount}
              onChange={(e) => setCostumeCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-bold"
            />
          </div>
        </div>

        {/* Simulation Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="border-r border-gray-200 dark:border-gray-700 pr-3">
            <div className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Band Leader Net Deposit
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {"$" + bandTakeHomeNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              {feeMode === 'PASS_TO_BUYER' ? '100% of deposit for costume production' : 'Net payout after absorbed fees'}
            </div>
          </div>

          <div className="border-r border-gray-200 dark:border-gray-700 pr-3">
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
              Masquerader Deposit Checkout
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {"$" + masqueraderPaysPerDeposit.toFixed(2)}
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              Includes secure card processing & platform fee
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-gray-500">
              Platform & Processing Fees
            </div>
            <div className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-1">
              {"$" + (totalPlatformFees + totalStripeFees).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              {"$" + (platformFeePerDeposit + stripeFeePerDeposit).toFixed(2) + " total per costume"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span>
            <strong>BandOS Guarantee:</strong> $0 monthly subscription fee. You keep 100% of your costume deposit to fund costume wireframing, feathers, and production.
          </span>
        </div>

      </div>

    </div>
  );
}
