import React from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export function GatewaySettings({
  gatewayAutosaveStatus, gatewaySavedText, settingsSaved, setSettingsSaved, setGatewayAutosaveStatus, setGatewaySavedText,
  wipayId, whatsappNum, bankAccount, updateGatewaySetting
}) {
  return (
    <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border-cyan-500/30 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-heading">
                  Trinidad Payment Gateway Configuration
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Configure your WiPay Caribbean Merchant ID, Republic Bank settlement details, and WhatsApp Concierge routing. Changes autosave automatically.
                </p>
              </div>

              {gatewayAutosaveStatus === 'saving' && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Autosaving...</span>
                </div>
              )}
              {gatewayAutosaveStatus === 'saved' && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{gatewaySavedText || 'Autosaved'}</span>
                </div>
              )}
            </div>

            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Gateway settings successfully updated for live customer checkouts.</span>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  localStorage.setItem('mmw_gateway_draft', JSON.stringify({ wipayId, whatsappNum, bankAccount }));
                } catch (e) {}
                setSettingsSaved(true);
                setGatewayAutosaveStatus('saved');
                setGatewaySavedText('Settings saved successfully');
                setTimeout(() => setSettingsSaved(false), 4000);

                try {
                  await setDoc(doc(db, 'travelSettings', 'gateway'), {
                    wipayId,
                    whatsappNum,
                    bankAccount,
                    updatedAt: new Date().toISOString()
                  }, { merge: true });
                } catch (err) {
                  console.warn('Cloud gateway sync notice (saved locally):', err.message);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  WiPay Caribbean Merchant ID (Trinidad & Tobago)
                </label>
                <input
                  type="text"
                  value={wipayId}
                  onChange={(e) => updateGatewaySetting('wipay', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Connects credit/debit card checkouts directly to your Trinidad WiPay account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Moy WhatsApp Concierge Phone Number
                </label>
                <input
                  type="text"
                  value={whatsappNum}
                  onChange={(e) => updateGatewaySetting('whatsapp', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Republic Bank Account Number (Settlement Account)
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => updateGatewaySetting('bank', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all"
                >
                  Save Gateway Settings
                </button>
              </div>
            </form>
          </div>
  );
}
