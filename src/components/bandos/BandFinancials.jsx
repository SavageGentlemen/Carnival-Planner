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
  HelpCircle,
  PieChart,
  Users,
  Award,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { bandOSService } from '../../services/bandOSService';
import { motion } from 'framer-motion';

export default function BandFinancials({ bandId }) {
  const [profile, setProfile] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  // Simulator state
  const [costumeDeposit, setCostumeDeposit] = useState(400);
  const [costumeCount, setCostumeCount] = useState(150);
  const [feeMode, setFeeMode] = useState('PASS_TO_BUYER');

  useEffect(() => {
    fetchFinancialData();
  }, [bandId]);

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      const [profileData, liveMetrics] = await Promise.all([
        supabase ? supabase.from('band_profiles').select('*').eq('id', bandId).single().then(res => res.data) : null,
        bandOSService.getLiveFinancialMetrics(bandId)
      ]);
      if (profileData) setProfile(profileData);
      if (liveMetrics) {
        setMetrics(liveMetrics);
        // Pre-fill simulator defaults from real average data if available
        if (liveMetrics.avgOrderValue > 0) {
          setCostumeDeposit(Math.round(liveMetrics.avgOrderValue * 0.35));
          setCostumeCount(Math.max(50, liveMetrics.totalOrders));
        }
      }
    } catch (err) {
      console.error('Error fetching financial data:', err);
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
      alert('Stripe Connect onboarding requires cloud functions deployment.');
    } catch (err) {
      console.error(err);
      alert('Failed to connect to Stripe');
    } finally {
      setConnecting(false);
    }
  };

  // Fee calculation for costume deposit
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/50 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="text-xs">Loading live financial ledgers...</p>
      </div>
    );
  }

  const isConnected = !!profile?.stripe_account_id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            Financials & Live Revenue Intelligence
          </h2>
          <p className="text-xs text-white/50">
            Real-time deposit tracking, receivable balances, and automated Stripe Connect payouts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400" /> $0 / Month Band Leader Guarantee
        </div>
      </div>

      {/* Live Financial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/50 uppercase">Total Gross GMV</span>
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-white font-display">
            ${(metrics?.totalGrossVolume || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-white/40 mt-1">{metrics?.totalOrders || 0} total registered masqueraders</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/50 uppercase">Collected Deposits</span>
            <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg"><CheckCircle2 className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-cyan-400 font-display">
            ${(metrics?.collectedDeposits || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-white/40 mt-1">Directly funded for costume production</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/50 uppercase">Pending Receivables</span>
            <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg"><Clock className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-amber-400 font-display">
            ${(metrics?.outstandingReceivables || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-white/40 mt-1">Remaining balances on installment plans</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white/50 uppercase">Ambassador Payouts</span>
            <div className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg"><Award className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-black text-purple-400 font-display">
            ${(metrics?.totalCommissionsOwed || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-white/40 mt-1">{metrics?.totalAmbassadorSales || 0} sales driven via referral links</p>
        </div>
      </div>

      {/* Stripe Connect Banner / Card */}
      {!isConnected ? (
        <div className="glass-panel rounded-3xl border border-white/20 bg-gradient-to-b from-blue-950/40 to-purple-950/40 backdrop-blur-xl p-6 text-center max-w-xl mx-auto shadow-2xl">
          <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
            <CreditCard className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-display">Direct Bank Account Payouts</h3>
          <p className="text-xs text-white/60 mb-5 max-w-md mx-auto">
            Connect your band's bank account via Stripe Connect to receive instant rolling payouts on costume deposits.
          </p>
          <button
            onClick={handleConnectStripe}
            disabled={connecting}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 mx-auto text-xs disabled:opacity-70 transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.02]"
          >
            {connecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
            Connect Direct Payouts with Stripe
          </button>
        </div>
      ) : (
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Stripe Express Account Active</p>
              <p className="text-[11px] text-white/50">Direct deposits routing to your linked bank account.</p>
            </div>
          </div>
          <button
            onClick={handleConnectStripe}
            className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open Stripe Dashboard
          </button>
        </div>
      )}

      {/* Section Sales Breakdown */}
      {metrics?.sectionBreakdown && metrics.sectionBreakdown.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
              <PieChart className="w-4 h-4 text-pink-500" />
              Section Sales & Revenue Breakdown
            </h3>
            <span className="text-xs text-white/40 font-medium">Real-time conversions</span>
          </div>

          <div className="space-y-3">
            {metrics.sectionBreakdown.map((sec, idx) => {
              const share = metrics.totalGrossVolume > 0 ? Math.round((sec.revenue / metrics.totalGrossVolume) * 100) : 0;
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <div>
                      <span className="text-xs font-bold text-white">{sec.title}</span>
                      <span className="text-[11px] text-white/50 ml-2">({sec.count} masqueraders)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">${sec.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <span className="text-[10px] text-white/40 ml-2">({share}% of GMV)</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                      style={{ width: `${Math.min(100, share)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Deposit Fee Transparency Calculator / Simulator */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
              Deposit & Production Economics
            </span>
            <h3 className="text-base font-bold text-white mt-0.5 font-display">
              Costume Deposit Fee Simulator
            </h3>
          </div>

          {/* Toggle */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setFeeMode('PASS_TO_BUYER')}
              className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all " + (feeMode === 'PASS_TO_BUYER' ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm" : "text-white/50 hover:text-white")}
            >
              Pass Fee to Masquerader ($0 Cost)
            </button>
            <button
              type="button"
              onClick={() => setFeeMode('ABSORB_FEE')}
              className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all " + (feeMode === 'ABSORB_FEE' ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm" : "text-white/50 hover:text-white")}
            >
              Absorb in Costume Price
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-white/70 mb-1">
              Average Costume Deposit ($)
            </label>
            <input
              type="number"
              min="50"
              step="25"
              value={costumeDeposit}
              onChange={(e) => setCostumeDeposit(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/70 mb-1">
              Target Masquerader Registrations
            </label>
            <input
              type="number"
              min="10"
              max="5000"
              value={costumeCount}
              onChange={(e) => setCostumeCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Simulation Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="border-r border-white/10 pr-3">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Band Leader Net Deposit
            </div>
            <div className="text-2xl font-black text-white mt-1 font-display">
              {"$" + bandTakeHomeNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">
              {feeMode === 'PASS_TO_BUYER' ? '100% of deposit for costume production' : 'Net payout after absorbed fees'}
            </div>
          </div>

          <div className="border-r border-white/10 pr-3">
            <div className="text-xs font-bold text-purple-400">
              Masquerader Deposit Checkout
            </div>
            <div className="text-2xl font-black text-white mt-1 font-display">
              {"$" + masqueraderPaysPerDeposit.toFixed(2)}
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">
              Includes secure card processing & platform fee
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-white/50">
              Platform & Processing Fees
            </div>
            <div className="text-xl font-bold text-white/70 mt-1">
              {"$" + (totalPlatformFees + totalStripeFees).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">
              {"$" + (platformFeePerDeposit + stripeFeePerDeposit).toFixed(2) + " total per costume"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/50 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>BandOS Guarantee:</strong> $0 monthly subscription fee. You keep 100% of your costume deposit to fund costume wireframing, feathers, and production.
          </span>
        </div>
      </div>
    </div>
  );
}
