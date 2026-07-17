import React, { useState, useEffect, useMemo } from 'react';
import {
  createVault, inviteToVault, contributeToVault, requestVaultPayout,
  freezeVault as freezeVaultFn, closeVault as closeVaultFn,
  subscribeToUserVaults, subscribeToVault, subscribeToVaultMembers,
  subscribeToVaultContributions, subscribeToVaultPayouts,
  getWhatsAppShareLink, formatCurrency, getVaultProgress
} from '../services/vaultService';

// ── SVG Progress Ring ──
function ProgressRing({ progress, size = 120, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (progress / 100) * circ;
  const color = progress >= 100 ? '#22c55e' : progress >= 50 ? '#eab308' : '#a855f7';
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-gray-700" />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        className="transition-all duration-700" />
    </svg>
  );
}

// ── Vault Card ──
function VaultCard({ vault, onSelect }) {
  const progress = getVaultProgress(vault.totalSaved || 0, vault.goalAmount || 1);
  const freq = vault.contributionFrequency === 'weekly' ? 'Fri' : vault.contributionFrequency === 'biweekly' ? 'Every 2 wks' : 'Monthly';
  return (
    <button onClick={() => onSelect(vault)} className="w-full text-left bg-gradient-to-br from-purple-900/80 to-gray-900 border border-purple-500/30 rounded-2xl p-5 hover:border-purple-400/60 transition-all shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <ProgressRing progress={progress} size={72} stroke={6} />
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{progress}%</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg truncate">{vault.name}</h3>
          <p className="text-purple-300 text-sm">{formatCurrency(vault.totalSaved || 0)} / {formatCurrency(vault.goalAmount)}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
              {vault.memberCount || 0} members
            </span>
            <span className="text-xs text-gray-400">Next: {freq} {formatCurrency(vault.contributionAmount)}</span>
          </div>
          {vault.status === 'frozen' && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full mt-1 inline-block">❄️ Frozen</span>}
        </div>
      </div>
    </button>
  );
}

// ── Create Vault Modal ──
function CreateVaultModal({ user, onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', targetDate: '', goalAmount: 5000, contributionAmount: 100, contributionFrequency: 'weekly', inviteEmails: '' });
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setError('');
    if (!form.name.trim()) return setError('Name your vault');
    if (form.goalAmount < 100 || form.goalAmount > 20000) return setError('Goal must be $100–$20,000');
    if (form.contributionAmount < 25 || form.contributionAmount > 500) return setError('Contribution must be $25–$500');
    setLoading(true);
    try {
      const emails = form.inviteEmails.split(/[,\n]/).map(e => e.trim()).filter(Boolean);
      if (emails.length > 10) return setError('Max 10 members');
      const result = await createVault({
        name: form.name, targetDate: form.targetDate, goalAmount: Number(form.goalAmount),
        contributionAmount: Number(form.contributionAmount), contributionFrequency: form.contributionFrequency,
        inviteEmails: emails,
      });
      onCreated(result);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create vault');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-purple-500/30 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">🏦 Create Your Carnival Sou Sou</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>
        <p className="text-purple-300 text-sm mb-6">Save together for carnival. No awkward Venmo texts. No missed costume deposits.</p>

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-200">
              <p className="font-bold mb-2">How it works:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Invite your crew (2–10 people)</li>
                <li>Set auto-save: e.g. $100 every Friday</li>
                <li>We hold the money safe until costume drop</li>
                <li>Pay Tribe/Yuma direct with 1 click</li>
              </ol>
              <p className="mt-2 text-xs text-purple-400">You're the "Banker". We're the vault. FDIC-insured through Stripe.</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Vault Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="e.g. Trinidad 2027 Squad" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Target Date</label>
              <input type="date" value={form.targetDate} onChange={e => setForm({...form, targetDate: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Goal Amount (max $20,000)</label>
              <input type="number" min={100} max={20000} value={form.goalAmount} onChange={e => setForm({...form, goalAmount: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none" />
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors">Next →</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Contribution Per Member ($25–$500)</label>
              <input type="range" min={25} max={500} step={25} value={form.contributionAmount}
                onChange={e => setForm({...form, contributionAmount: Number(e.target.value)})} className="w-full accent-purple-500" />
              <p className="text-center text-2xl font-bold text-white mt-1">{formatCurrency(form.contributionAmount)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Frequency</label>
              <div className="grid grid-cols-3 gap-2">
                {['weekly','biweekly','monthly'].map(f => (
                  <button key={f} onClick={() => setForm({...form, contributionFrequency: f})}
                    className={`py-2 rounded-xl text-sm font-medium transition-colors ${form.contributionFrequency === f ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-purple-500'}`}>
                    {f === 'weekly' ? 'Weekly' : f === 'biweekly' ? 'Bi-weekly' : 'Monthly'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Invite Crew (emails, comma-separated)</label>
              <textarea value={form.inviteEmails} onChange={e => setForm({...form, inviteEmails: e.target.value})}
                placeholder="friend1@email.com, friend2@email.com" rows={3}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none resize-none" />
              <p className="text-xs text-gray-500 mt-1">2–10 members. They'll get an email invite.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-colors">← Back</button>
              <button onClick={handleCreate} disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Creating...' : 'Start My Vault — Free'}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">By continuing, you agree to KYC check. Takes 60 sec.</p>
          </div>
        )}

        {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

// ── Vault Detail View ──
function VaultDetail({ vault, user, onBack }) {
  const [members, setMembers] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [topUpAmount, setTopUpAmount] = useState(50);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutDesc, setPayoutDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPayout, setShowPayout] = useState(false);

  const isAdmin = vault.adminUserId === user?.uid;
  const progress = getVaultProgress(vault.totalSaved || 0, vault.goalAmount || 1);

  useEffect(() => {
    if (!vault?.id) return;
    const unsubs = [
      subscribeToVaultMembers(vault.id, setMembers),
      subscribeToVaultContributions(vault.id, setContributions),
      subscribeToVaultPayouts(vault.id, setPayouts),
    ];
    return () => unsubs.forEach(u => u());
  }, [vault?.id]);

  const handleTopUp = async () => {
    setLoading(true);
    try {
      const result = await contributeToVault(vault.id, topUpAmount);
      if (result?.checkoutUrl) window.location.href = result.checkoutUrl;
    } catch (err) { alert('Top-up failed: ' + err.message); }
    finally { setLoading(false); }
  };

  const handlePayout = async () => {
    if (!payoutAmount || Number(payoutAmount) <= 0) return;
    setLoading(true);
    try {
      await requestVaultPayout(vault.id, Number(payoutAmount), 'bank_transfer', payoutDesc || 'Payout');
      setShowPayout(false); setPayoutAmount(''); setPayoutDesc('');
      alert('Payout initiated! 1.9% fee applied for bank transfer.');
    } catch (err) { alert('Payout failed: ' + err.message); }
    finally { setLoading(false); }
  };

  const handleFreeze = async () => {
    if (!confirm('Freeze this vault? No new charges will occur.')) return;
    try { await freezeVaultFn(vault.id, 'Admin freeze'); } catch (err) { alert(err.message); }
  };

  const handleClose = async () => {
    if (!confirm('Close vault and refund members pro-rata minus fees? This cannot be undone.')) return;
    try { await closeVaultFn(vault.id); onBack(); } catch (err) { alert(err.message); }
  };

  const whatsappLink = getWhatsAppShareLink(vault.name, vault.inviteCode || '', vault.id);

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-purple-400 hover:text-purple-300 text-sm font-medium">← Back to Vaults</button>

      {/* Header Card */}
      <div className="bg-gradient-to-br from-purple-900/80 to-gray-900 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <ProgressRing progress={progress} size={110} stroke={8} />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">{progress}%</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{vault.name}</h2>
            <p className="text-purple-300 text-lg">{formatCurrency(vault.totalSaved || 0)} <span className="text-gray-500">/ {formatCurrency(vault.goalAmount)}</span></p>
            <p className="text-sm text-gray-400 mt-1">{vault.memberCount || members.length} members · {vault.contributionFrequency} · {formatCurrency(vault.contributionAmount)}/person</p>
            {vault.status === 'frozen' && <p className="text-red-400 text-sm font-bold mt-1">❄️ Vault Frozen{vault.frozenReason ? `: ${vault.frozenReason}` : ''}</p>}
            {vault.status === 'closed' && <p className="text-gray-400 text-sm font-bold mt-1">🔒 Vault Closed</p>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {vault.status === 'active' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button onClick={handleTopUp} disabled={loading}
            className="py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm disabled:opacity-50">
            💰 Top Up {formatCurrency(topUpAmount)}
          </button>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm text-center">
            📱 WhatsApp Invite
          </a>
          {isAdmin && (
            <>
              <button onClick={() => setShowPayout(true)} className="py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm">
                🎭 Release Payout
              </button>
              <button onClick={handleFreeze} className="py-3 bg-red-600/20 hover:bg-red-600/40 text-red-400 font-bold rounded-xl transition-colors text-sm border border-red-500/30">
                ❄️ Freeze
              </button>
            </>
          )}
        </div>
      )}

      {/* Payout Modal */}
      {showPayout && (
        <div className="bg-gray-800 border border-purple-500/30 rounded-xl p-4 space-y-3">
          <h3 className="text-white font-bold">Release Payout</h3>
          <input type="number" placeholder="Amount" value={payoutAmount} onChange={e => setPayoutAmount(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <input type="text" placeholder="e.g. Costume Deposit — Tribe Carnival" value={payoutDesc} onChange={e => setPayoutDesc(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <p className="text-xs text-gray-400">Fee: 1.9% on bank transfer. 0% on virtual card (coming soon).</p>
          <div className="flex gap-3">
            <button onClick={() => setShowPayout(false)} className="flex-1 py-2 bg-gray-700 text-gray-300 rounded-xl">Cancel</button>
            <button onClick={handlePayout} disabled={loading} className="flex-1 py-2 bg-purple-600 text-white font-bold rounded-xl disabled:opacity-50">
              {loading ? 'Processing...' : 'Confirm Payout'}
            </button>
          </div>
        </div>
      )}

      {/* Members */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <h3 className="text-white font-bold mb-3">👥 Members</h3>
        <div className="space-y-2">
          {members.length === 0 && <p className="text-gray-500 text-sm">No members yet. Send invites!</p>}
          {members.map(m => (
            <div key={m.id} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {(m.displayName || m.email || '?')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{m.displayName || m.email}</p>
                  <p className="text-gray-500 text-xs">{m.role === 'admin' ? '🏦 Banker' : 'Member'} · {m.status}</p>
                </div>
              </div>
              <p className="text-green-400 text-sm font-bold">{formatCurrency(m.totalContributed || 0)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Contributions */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <h3 className="text-white font-bold mb-3">💸 Recent Contributions</h3>
        {contributions.length === 0 && <p className="text-gray-500 text-sm">No contributions yet.</p>}
        {contributions.slice(0, 10).map(c => (
          <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
            <div>
              <p className="text-white text-sm">{c.userEmail || 'Member'}</p>
              <p className="text-gray-500 text-xs">{c.createdAt?.toDate?.()?.toLocaleDateString() || ''}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${c.status === 'succeeded' ? 'text-green-400' : c.status === 'failed' ? 'text-red-400' : 'text-yellow-400'}`}>
                {c.status === 'succeeded' ? '+' : ''}{formatCurrency(c.amount)}
              </p>
              <p className="text-xs text-gray-500">{c.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Payouts */}
      {payouts.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">📤 Payouts</h3>
          {payouts.map(p => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
              <div>
                <p className="text-white text-sm">{p.description}</p>
                <p className="text-gray-500 text-xs">{p.type} · Fee: {formatCurrency(p.feeAmount || 0)}</p>
              </div>
              <p className="text-orange-400 text-sm font-bold">-{formatCurrency(p.amount)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Admin: Close Vault */}
      {isAdmin && vault.status !== 'closed' && (
        <button onClick={handleClose} className="w-full py-3 bg-red-900/30 border border-red-500/30 text-red-400 font-bold rounded-xl hover:bg-red-900/50 transition-colors text-sm">
          Close Vault & Refund Members
        </button>
      )}

      {/* Legal Disclaimer Footer */}
      <div className="text-xs text-gray-500 border-t border-gray-700 pt-4 space-y-1">
        <p>Squad Vault is a savings club service provided by Carnival-Planner.com.</p>
        <p>Not a bank. Funds held with our banking partner via Stripe Treasury, Member FDIC.</p>
        <p>Not lending, not credit, not interest-bearing. No returns guaranteed.</p>
        <p>You save your own money. We charge 1.9% only on cash-out to external bank.</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// MAIN EXPORT: SquadVault Tab Component
// ══════════════════════════════════════
export default function SquadVault({ user, isDemoMode }) {
  const [vaults, setVaults] = useState([]);
  const [selectedVault, setSelectedVault] = useState(null);
  const [liveVault, setLiveVault] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('vault-onboarded'));

  // Subscribe to user's vaults
  useEffect(() => {
    if (!user || isDemoMode) return;
    const unsub = subscribeToUserVaults(user.uid, setVaults);
    return () => unsub();
  }, [user, isDemoMode]);

  // Subscribe to selected vault for real-time updates
  useEffect(() => {
    if (!selectedVault?.id) { setLiveVault(null); return; }
    const unsub = subscribeToVault(selectedVault.id, setLiveVault);
    return () => unsub();
  }, [selectedVault?.id]);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('vault-onboarded', 'true');
  };

  if (isDemoMode) {
    return (
      <div className="p-8 text-center">
        <span className="text-4xl mb-4 block">🏦</span>
        <h2 className="text-xl font-bold text-white mb-2">Squad Vault</h2>
        <p className="text-gray-400">Sign up to create a savings vault with your crew!</p>
      </div>
    );
  }

  // Onboarding explainer
  if (showOnboarding) {
    return (
      <div className="p-6">
        <div className="bg-gradient-to-br from-purple-900 to-gray-900 border border-purple-500/30 rounded-3xl p-8 text-center max-w-lg mx-auto">
          <span className="text-5xl mb-4 block">🏦</span>
          <h2 className="text-2xl font-bold text-white mb-3">Squad Vault</h2>
          <p className="text-purple-200 mb-6">Like a sou sou but for carnival. Save together, pay costume on time, no awkward texts.</p>
          <div className="grid grid-cols-2 gap-4 text-left mb-6">
            {[
              { icon: '👥', title: 'Invite Crew', desc: '2–10 people' },
              { icon: '💰', title: 'Auto-Save', desc: '$100 every Friday' },
              { icon: '🔒', title: 'Safe Vault', desc: 'FDIC-insured via Stripe' },
              { icon: '🎭', title: '1-Click Pay', desc: 'Direct to costume vendor' },
            ].map(item => (
              <div key={item.title} className="bg-purple-800/30 rounded-xl p-3">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-white text-sm font-bold mt-1">{item.title}</p>
                <p className="text-purple-300 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <button onClick={dismissOnboarding} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
            Got it — Show me Vaults
          </button>
        </div>
      </div>
    );
  }

  // Detail view
  if (selectedVault && liveVault) {
    return (
      <div className="p-4">
        <VaultDetail vault={liveVault} user={user} onBack={() => setSelectedVault(null)} />
      </div>
    );
  }

  // List view
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">🏦 Squad Vaults</h2>
        <button onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-colors">
          + New Vault
        </button>
      </div>

      {vaults.length === 0 ? (
        <div className="bg-gray-800/50 border border-dashed border-gray-600 rounded-2xl p-8 text-center">
          <span className="text-4xl mb-3 block">🎭</span>
          <h3 className="text-white font-bold text-lg mb-2">No vaults yet</h3>
          <p className="text-gray-400 text-sm mb-4">Create a savings vault with your carnival crew. Pool money, pay costume on time.</p>
          <button onClick={() => setShowCreate(true)} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors">
            Start My Vault — Free
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {vaults.map(v => <VaultCard key={v.id} vault={v} onSelect={setSelectedVault} />)}
        </div>
      )}

      {showCreate && <CreateVaultModal user={user} onClose={() => setShowCreate(false)} onCreated={(result) => { console.log('Vault created:', result); }} />}
    </div>
  );
}
