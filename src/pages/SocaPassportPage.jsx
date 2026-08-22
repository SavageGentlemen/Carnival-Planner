import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';
import SocaPassportTab from '../components/SocaPassportTab';
import { ArrowLeft, LogIn, Sparkles, MapPin, Trophy, Ticket, Shield, Play } from 'lucide-react';

/**
 * SocaPassportPage — Standalone routed page for Soca Passport
 * 
 * Routes:
 *   /passport         → Authenticated user's passport (or public landing)
 *   /passport/:userId → View another user's public passport profile
 */
export default function SocaPassportPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [publicProfile, setPublicProfile] = useState(null);
  const [publicLoading, setPublicLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('[Passport Auth Error]', err);
      setAuthError('Google sign-in popup closed or blocked. Trying Demo mode...');
      setIsDemoMode(true);
    }
  };

  // Listen for auth state
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // If viewing another user's passport, fetch their public profile
  useEffect(() => {
    if (!userId) return;
    setPublicLoading(true);

    const fetchPublicProfile = async () => {
      try {
        const functions = getFunctions(app);
        const getProfile = httpsCallable(functions, 'getPassportProfile');
        const result = await getProfile({ targetUserId: userId });
        setPublicProfile(result.data);
      } catch (err) {
        console.warn('[Passport] Could not load public profile:', err.message);
        // Show demo fallback
        setPublicProfile({
          displayName: 'Carnival Goer',
          totalCredits: 850,
          currentTier: 'SILVER',
          totalEvents: 5,
          countriesVisited: ['TT', 'BB'],
          tierProgress: { nextTier: 'GOLD', creditsToNextTier: 150, progressPercent: 85 }
        });
      } finally {
        setPublicLoading(false);
      }
    };

    fetchPublicProfile();
  }, [userId]);

  // Tier styling
  const tierColors = {
    BRONZE: { bg: 'from-amber-900 to-amber-700', text: 'text-amber-300', border: 'border-amber-500/40' },
    SILVER: { bg: 'from-slate-600 to-slate-400', text: 'text-slate-200', border: 'border-slate-400/40' },
    GOLD: { bg: 'from-yellow-600 to-amber-400', text: 'text-yellow-200', border: 'border-yellow-400/40' },
    PLATINUM: { bg: 'from-purple-600 to-pink-500', text: 'text-purple-200', border: 'border-purple-400/40' },
  };

  // ─── PUBLIC PROFILE VIEW ───────────────────────────────────────
  if (userId && publicProfile) {
    const tier = publicProfile.currentTier || 'BRONZE';
    const colors = tierColors[tier] || tierColors.BRONZE;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 text-white">
        {/* Header */}
        <nav className="sticky top-0 z-50 px-4 py-3 backdrop-blur-xl bg-black/60 border-b border-white/10">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Caribbean Carnival Planner
            </button>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Soca Passport</span>
          </div>
        </nav>

        <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
          {/* Public Passport Card */}
          <div className={`relative overflow-hidden bg-gradient-to-br ${colors.bg} rounded-3xl p-6 border ${colors.border} shadow-2xl`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">
                  {(publicProfile.displayName || 'C')[0].toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-black">{publicProfile.displayName || 'Carnival Goer'}</h1>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 ${colors.text}`}>
                    {tier} Tier
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <Trophy className="w-5 h-5 mx-auto mb-1 opacity-70" />
                  <p className="text-xl font-black">{publicProfile.totalCredits || 0}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-60">Credits</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <Ticket className="w-5 h-5 mx-auto mb-1 opacity-70" />
                  <p className="text-xl font-black">{publicProfile.totalEvents || 0}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-60">Events</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <MapPin className="w-5 h-5 mx-auto mb-1 opacity-70" />
                  <p className="text-xl font-black">{(publicProfile.countriesVisited || []).length}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-60">Islands</p>
                </div>
              </div>

              {/* Tier Progress */}
              {publicProfile.tierProgress && (
                <div className="mt-4 bg-white/10 rounded-xl p-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold opacity-70">{tier}</span>
                    <span className="font-bold opacity-70">{publicProfile.tierProgress.nextTier}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/40 rounded-full transition-all"
                      style={{ width: `${publicProfile.tierProgress.progressPercent || 0}%` }}
                    />
                  </div>
                  <p className="text-[10px] mt-1.5 opacity-50 text-center">
                    {publicProfile.tierProgress.creditsToNextTier} credits to {publicProfile.tierProgress.nextTier}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA: Get Your Own Passport */}
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6 text-center backdrop-blur-xl">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h2 className="text-lg font-black mb-2">Get Your Soca Passport</h2>
            <p className="text-sm text-gray-400 mb-4">
              Check in at fetes, earn stamps, climb the leaderboard, and unlock rewards across Trinidad, Barbados & Jamaica carnival.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Start Your Passport Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── LOADING STATE ─────────────────────────────────────────────
  if (authLoading || publicLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-bold">Loading Soca Passport...</p>
        </div>
      </div>
    );
  }

  // ─── UNAUTHENTICATED LANDING (When not logged in and not in demo mode) ───
  if (!user && !isDemoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 text-white">
        <nav className="sticky top-0 z-50 px-4 py-3 backdrop-blur-xl bg-black/60 border-b border-white/10">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Caribbean Carnival Planner
            </button>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Soca Passport</span>
          </div>
        </nav>

        <div className="max-w-lg mx-auto px-4 py-12 space-y-8">
          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black">Soca Passport</h1>
            <p className="text-gray-400 max-w-sm mx-auto">
              Your digital carnival passport. Check in at fetes across the Caribbean, earn stamps, compete on leaderboards, and unlock exclusive rewards.
            </p>
          </div>

          {authError && (
            <div className="bg-purple-900/40 border border-purple-500/40 rounded-xl p-3 text-xs text-purple-200 text-center">
              {authError}
            </div>
          )}

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Ticket className="w-5 h-5" />, label: 'QR Check-in', desc: 'Scan at the gate' },
              { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', desc: 'Compete globally' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Island Stamps', desc: 'Collect them all' },
              { icon: <Sparkles className="w-5 h-5" />, label: 'Tier Rewards', desc: 'Bronze → Platinum' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-900/80 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-purple-400 mb-2 flex justify-center">{f.icon}</div>
                <p className="text-sm font-bold">{f.label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-black py-4 rounded-2xl text-base transition-all shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In to Get Started
            </button>
            <button
              onClick={() => setIsDemoMode(true)}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-purple-300 font-bold py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Preview Demo Passport Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED OR DEMO MODE: FULL PASSPORT EXPERIENCE ───
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 px-4 py-3 backdrop-blur-xl bg-white/80 dark:bg-black/60 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Planner
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">Soca Passport</span>
          </div>
        </div>
      </nav>

      {/* Full SocaPassportTab Experience */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <SocaPassportTab
          user={user || { uid: 'demo-user', displayName: 'Masquerader' }}
          isPremium={true}
          activeCarnivalId={null}
          activePlanId={null}
          isDemoMode={isDemoMode || !user}
        />
      </div>
    </div>
  );
}
