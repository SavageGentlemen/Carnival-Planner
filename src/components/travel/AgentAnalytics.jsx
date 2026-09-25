import React from 'react';
import { Users, CheckCircle2, Clock, DollarSign } from 'lucide-react';

export function AgentAnalytics({ bookings, totalRevenueDeposits }) {
  return (
    <>
      {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-heading">
              {bookings.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across all active destinations</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Confirmed Deposits</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-heading">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Spots locked with $500 deposit</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Pending Action</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-heading">
              {bookings.filter(b => b.status === 'pending_payment').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting wire / WiPay payment</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Deposits (USD)</span>
              <DollarSign className="w-4 h-4 text-[#00e5cc]" />
            </div>
            <div className="text-3xl font-black text-[#00e5cc] font-heading">
              ${totalRevenueDeposits.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct Trinidad payout pool</p>
          </div>

        </div>
    </>
  );
}
