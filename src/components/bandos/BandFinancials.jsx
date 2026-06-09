import React, { useState, useEffect } from 'react';
import { DollarSign, ExternalLink, Loader2, TrendingUp, TrendingDown, Clock, CreditCard } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export default function BandFinancials({ bandId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [bandId]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('band_profiles')
        .select('*')
        .eq('id', bandId)
        .single();
        
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStripe = async () => {
    setConnecting(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-connect-onboard', {
        body: { bandId }
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to Stripe');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" /></div>;

  const isConnected = !!profile?.stripe_account_id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-500" />
          Financials & Payouts
        </h2>
      </div>

      {!isConnected ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 text-center max-w-xl mx-auto my-12">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold dark:text-white mb-2">Connect your bank account</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            BandOS partners with Stripe for secure payments. Set up your connected account to receive payouts directly to your bank account.
          </p>
          <button
            onClick={handleConnectStripe}
            disabled={connecting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-70 transition-colors"
          >
            {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ExternalLink className="w-5 h-5" />}
            Connect with Stripe
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-500 uppercase">Net Sales</span>
                <div className="p-1.5 bg-green-50 text-green-600 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
              </div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">$0.00</p>
              <p className="text-xs text-gray-500 mt-1">Available for payout</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-500 uppercase">Pending</span>
                <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-lg"><Clock className="w-4 h-4" /></div>
              </div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">$0.00</p>
              <p className="text-xs text-gray-500 mt-1">Clearing in 2 days</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm flex flex-col justify-center items-center text-center">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Stripe Account Active</p>
              <button
                onClick={handleConnectStripe}
                disabled={connecting}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-300 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {connecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                Stripe Dashboard
              </button>
            </div>
          </div>

          {/* Transactions Table Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
            </div>
            <div className="p-8 text-center text-gray-500">
              No transactions yet. As sales are made, they will appear here.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
