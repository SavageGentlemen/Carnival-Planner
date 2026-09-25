import React, { lazy, Suspense } from 'react';
import { Shield, AlertCircle, RefreshCw, Lock, Download, Check } from 'lucide-react';
import { useMoyDashboard } from '../../hooks/useMoyDashboard';

// Lazy loaded components
const AgentAnalytics = lazy(() => import('./AgentAnalytics').then(m => ({ default: m.AgentAnalytics })));
const BookingsManager = lazy(() => import('./BookingsManager').then(m => ({ default: m.BookingsManager })));
const PackageEditor = lazy(() => import('./PackageEditor').then(m => ({ default: m.PackageEditor })));
const SiteContentEditor = lazy(() => import('./SiteContentEditor').then(m => ({ default: m.SiteContentEditor })));
const GatewaySettings = lazy(() => import('./GatewaySettings').then(m => ({ default: m.GatewaySettings })));
const DashboardErrorBoundary = lazy(() => import('./DashboardErrorBoundary').then(m => ({ default: m.DashboardErrorBoundary })));

export default function MoyAgentDashboard({ onClose, user }) {
  const dash = useMoyDashboard(user, onClose);


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14] text-slate-100 flex flex-col animate-fadeIn">
      
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-30 bg-[#080c14]/90 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,204,0.3)] shrink-0">
              <img 
                src="/images/moymeetsworld_logo.jpg" 
                alt="Moy Meets World" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-base font-black text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <span>MOY MEETS WORLD</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                  🇹🇹 Trinidad Operations
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Chief Travel Curator & Booking Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {dash.currentUser?.email ? (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Synced: {dash.currentUser.email}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={dash.handleGoogleSignIn}
                disabled={dash.isLoggingIn}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 text-[11px] font-bold text-amber-300 transition-colors"
                title="Sign in with your Google or Admin account to enable instant live cloud syncing"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{dash.isLoggingIn ? 'Connecting...' : 'Sign In for Cloud Sync'}</span>
              </button>
            )}

            <button
              onClick={dash.handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/20 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,204,0.3)]"
            >
              Exit Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* ── DASHBOARD BODY ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        <Suspense fallback={<div className="text-center p-8 text-cyan-400"><RefreshCw className="w-6 h-6 animate-spin mx-auto"/></div>}>
          <AgentAnalytics bookings={dash.bookings} totalRevenueDeposits={dash.totalRevenueDeposits} />
        </Suspense>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 flex-wrap">
          <button
            onClick={() => dash.setActiveTab('bookings')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              dash.activeTab === 'bookings'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Guest Bookings ({dash.bookings.length})
          </button>
          
          <button
            onClick={() => dash.setActiveTab('packages')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              dash.activeTab === 'packages'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Manage Packages ({dash.packagesList.length})
          </button>

          <button
            onClick={() => dash.setActiveTab('siteContent')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              dash.activeTab === 'siteContent'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Site Content, Bio & FAQs
          </button>

          <button
            onClick={() => dash.setActiveTab('gateway')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              dash.activeTab === 'gateway'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Trinidad Gateway & Bank Settings
          </button>
        </div>

        <Suspense fallback={<div className="text-center p-8 text-cyan-400"><RefreshCw className="w-6 h-6 animate-spin mx-auto"/></div>}>
          {dash.activeTab === 'bookings' && (
            <BookingsManager {...dash} />
          )}

          {dash.activeTab === 'packages' && (
            <PackageEditor {...dash} />
          )}

          {dash.activeTab === 'siteContent' && (
            <SiteContentEditor {...dash} />
          )}

          {dash.activeTab === 'gateway' && (
            <GatewaySettings {...dash} />
          )}
        </Suspense>
      </main>

    </div>
  );
}
