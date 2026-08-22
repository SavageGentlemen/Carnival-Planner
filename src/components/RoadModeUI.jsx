import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * RoadModeUI — "Parade Day" premium festival companion interface.
 *
 * Designed for one-handed use while on the road in a carnival band.
 * High-contrast, huge touch targets, sunlight-readable neon accents.
 */
export default function RoadModeUI({
  user,
  currentCarnival,
  costumeBalance,
  currentSquad,
  squadMembers,
  connectedPeers,
  peerId,
  meshMessages,
  meshChatInput,
  setMeshChatInput,
  broadcastMessage,
  broadcastLocation,
  onExit,
  onSos,
  setToastMessage,
  nip19,
}) {
  // ── Countdown timer for next event ──
  const [countdown, setCountdown] = useState('');
  const [sharingLocation, setSharingLocation] = useState(false);
  const [sosConfirm, setSosConfirm] = useState(false);
  const sosTimerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Compute next event once
  const nextEvent = (currentCarnival?.schedule || [])
    .slice()
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .find((e) => new Date(e.datetime) > new Date());

  // Countdown tick
  useEffect(() => {
    if (!nextEvent) return;
    const tick = () => {
      const diff = new Date(nextEvent.datetime) - new Date();
      if (diff <= 0) {
        setCountdown('NOW');
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [nextEvent]);

  // Auto-scroll mesh chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [meshMessages]);

  // SOS double-tap safety: first tap arms, second fires
  const handleSos = useCallback(() => {
    if (!sosConfirm) {
      setSosConfirm(true);
      sosTimerRef.current = setTimeout(() => setSosConfirm(false), 4000);
      return;
    }
    clearTimeout(sosTimerRef.current);
    setSosConfirm(false);

    // Fire the SOS handler if provided
    if (onSos) {
      onSos();
    } else {
      // Fallback: broadcast SOS over mesh + try to share location
      broadcastMessage?.('🚨 SOS — I NEED HELP! 🚨');
      navigator.geolocation?.getCurrentPosition(
        (pos) => {
          broadcastLocation?.(pos.coords.latitude, pos.coords.longitude);
          broadcastMessage?.(
            `📍 My location: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
          );
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }

    setToastMessage?.({ title: '🚨 SOS Sent!', body: 'Your squad has been alerted.' });
    setTimeout(() => setToastMessage?.(null), 5000);
  }, [sosConfirm, onSos, broadcastMessage, broadcastLocation, setToastMessage]);

  // Share location handler
  const handleShareLocation = useCallback(() => {
    setSharingLocation(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        broadcastLocation?.(pos.coords.latitude, pos.coords.longitude);
        setToastMessage?.({ title: '📍 Location Shared!', body: 'Squad can see your pin.' });
        setTimeout(() => setToastMessage?.(null), 3000);
        setSharingLocation(false);
      },
      () => {
        setToastMessage?.({ title: 'Location Error', body: 'Could not get GPS. Check permissions.' });
        setTimeout(() => setToastMessage?.(null), 3000);
        setSharingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  }, [broadcastLocation, setToastMessage]);

  // Send mesh chat
  const handleSendChat = useCallback(() => {
    if (!meshChatInput?.trim()) return;
    broadcastMessage?.(meshChatInput.trim());
    setMeshChatInput('');
  }, [meshChatInput, broadcastMessage, setMeshChatInput]);

  // Vibe report handler
  const handleVibeReport = useCallback(() => {
    broadcastMessage?.('📸 VIBE CHECK — crowd energy is 🔥 right now!');
    setToastMessage?.({ title: '📸 Vibe Reported!', body: 'Your squad knows the energy.' });
    setTimeout(() => setToastMessage?.(null), 3000);
  }, [broadcastMessage, setToastMessage]);

  // Last 3 mesh messages for the mini chat
  const recentMessages = (meshMessages || []).slice(-3);

  return (
    <div className="min-h-screen bg-transparent text-white relative z-10 flex flex-col"
         style={{ paddingTop: 'env(safe-area-inset-top, 16px)', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>

      {/* ── HEADER BAR ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-2xl">🎭</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse border border-black" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider uppercase"
                style={{ textShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
              ROAD MODE
            </h1>
            <p className="text-[11px] text-gray-400 font-medium -mt-0.5">Parade Day Active</p>
          </div>
        </div>

        {/* EXIT — intentionally small to prevent accidental taps */}
        <button
          onClick={onExit}
          className="text-xs font-semibold text-gray-400 bg-gray-800/80 hover:bg-gray-700 border border-gray-700
                     px-3 py-1.5 rounded-lg transition-colors active:scale-95"
        >
          ✕ Exit
        </button>
      </div>

      {/* ── SCROLLABLE CARD STACK ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scrollbar-hide"
           style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1.  🚨 EMERGENCY SOS BUTTON
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <button
          onClick={handleSos}
          className={`
            relative w-full rounded-2xl font-black text-white text-2xl tracking-wide
            flex items-center justify-center gap-3 transition-all active:scale-[0.97]
            ${sosConfirm
              ? 'bg-gradient-to-r from-red-700 via-red-600 to-orange-600 animate-pulse'
              : 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600'
            }
          `}
          style={{
            minHeight: '80px',
            boxShadow: sosConfirm
              ? '0 0 30px rgba(239,68,68,0.7), 0 0 60px rgba(239,68,68,0.3)'
              : '0 0 20px rgba(239,68,68,0.4), 0 0 40px rgba(239,68,68,0.15)',
          }}
        >
          <span className="text-3xl">{sosConfirm ? '⚠️' : '🚨'}</span>
          <span>{sosConfirm ? 'TAP AGAIN TO CONFIRM' : 'EMERGENCY SOS'}</span>
          {/* Glow ring on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none" />
        </button>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2.  📍 SQUAD RADAR
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="rounded-2xl overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.15) 100%)',
               border: '1px solid rgba(16,185,129,0.3)',
               boxShadow: '0 0 25px rgba(16,185,129,0.1)',
             }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <h2 className="text-lg font-bold tracking-wide uppercase">Squad Radar</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-bold text-lg">{connectedPeers?.length || 0}</span>
                <span className="text-emerald-400/70 text-sm font-medium">
                  peer{(connectedPeers?.length || 0) !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <button
              onClick={handleShareLocation}
              disabled={sharingLocation}
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500
                         text-white font-bold text-lg rounded-xl transition-all active:scale-[0.97]
                         disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                minHeight: '64px',
                boxShadow: '0 0 20px rgba(16,185,129,0.3)',
              }}
            >
              {sharingLocation ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Getting GPS…
                </>
              ) : (
                <>📡 Share My Location</>
              )}
            </button>

            {/* Squad member avatars row */}
            {squadMembers?.length > 0 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {squadMembers.slice(0, 8).map((m, i) => (
                  <div key={m.uid || i}
                       className="flex flex-col items-center min-w-[48px]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold border-2 border-gray-800">
                      {(m.displayName || m.email || '?').charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-0.5 truncate max-w-[48px]">
                      {(m.displayName || m.email?.split('@')[0] || 'Anon').split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3.  📸 REPORT VIBE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <button
          onClick={handleVibeReport}
          className="w-full rounded-2xl font-bold text-white text-lg
                     flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
          style={{
            minHeight: '64px',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.25) 100%)',
            border: '1px solid rgba(168,85,247,0.4)',
            boxShadow: '0 0 20px rgba(168,85,247,0.15)',
          }}
        >
          <span className="text-2xl">📸</span>
          Report Vibe
        </button>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4.  ⏭ UP NEXT EVENT
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="rounded-2xl overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)',
               border: '1px solid rgba(139,92,246,0.3)',
               boxShadow: '0 0 25px rgba(139,92,246,0.1)',
             }}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⏭</span>
              <h2 className="text-sm font-bold text-purple-300 uppercase tracking-widest">Up Next</h2>
            </div>

            {nextEvent ? (
              <>
                <div className="text-2xl font-black leading-tight mb-2"
                     style={{ textShadow: '0 0 15px rgba(139,92,246,0.4)' }}>
                  {nextEvent.title}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg text-white/90 font-semibold">
                    {new Date(nextEvent.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {countdown && (
                    <span className="text-sm font-bold px-3 py-1 rounded-full"
                          style={{
                            background: countdown === 'NOW'
                              ? 'linear-gradient(135deg, #22c55e, #10b981)'
                              : 'rgba(139,92,246,0.3)',
                            boxShadow: countdown === 'NOW'
                              ? '0 0 15px rgba(34,197,94,0.5)'
                              : 'none',
                          }}>
                      {countdown === 'NOW' ? '🔴 HAPPENING NOW' : `in ${countdown}`}
                    </span>
                  )}
                </div>
                {nextEvent.note && (
                  <div className="mt-2 text-sm text-white/60 bg-white/5 px-3 py-1.5 rounded-lg inline-block">
                    {nextEvent.note}
                  </div>
                )}
              </>
            ) : (
              <div className="text-lg italic text-white/50 py-2">
                No more events scheduled 🌅
              </div>
            )}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5.  👗 COSTUME INFO
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentCarnival?.costume && (
          <div className="rounded-2xl overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, rgba(234,179,8,0.12) 0%, rgba(251,146,60,0.12) 100%)',
                 border: '1px solid rgba(234,179,8,0.25)',
               }}>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👗</span>
                <h2 className="text-sm font-bold text-yellow-300/90 uppercase tracking-widest">Costume</h2>
              </div>
              <div className="text-xl font-bold text-yellow-300"
                   style={{ textShadow: '0 0 12px rgba(234,179,8,0.3)' }}>
                {currentCarnival.costume.band}
              </div>
              <div className="text-base text-white/60 mt-0.5">
                Section: {currentCarnival.costume.section}
              </div>
              {costumeBalance > 0 && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-red-500/20 border border-red-500/30
                                text-red-400 font-bold text-sm px-3 py-1.5 rounded-lg"
                     style={{ boxShadow: '0 0 12px rgba(239,68,68,0.15)' }}>
                  💰 Balance Due: ${costumeBalance}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6.  💬 MINI MESH CHAT
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="rounded-2xl overflow-hidden"
             style={{
               background: 'rgba(30,30,40,0.7)',
               border: '1px solid rgba(255,255,255,0.08)',
             }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">Mesh Chat</h2>
              </div>
              {peerId && (
                <span className="text-[10px] text-gray-500 font-mono truncate max-w-[100px]">
                  {peerId.slice(0, 8)}…
                </span>
              )}
            </div>

            {/* Message feed — last 3 */}
            <div className="space-y-1.5 mb-3 min-h-[60px] max-h-[100px] overflow-y-auto">
              {recentMessages.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center py-3">
                  No mesh messages yet…
                </p>
              ) : (
                recentMessages.map((msg, idx) => (
                  <div key={idx}
                       className="text-sm bg-white/5 rounded-lg px-3 py-2 flex items-start gap-2">
                    <span className="text-purple-400 font-bold text-xs mt-0.5 shrink-0">
                      {(msg.from || 'anon').slice(0, 6)}
                    </span>
                    <span className="text-white/80 break-words flex-1">{msg.text || msg.data || String(msg)}</span>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick send */}
            <div className="flex gap-2">
              <input
                type="text"
                value={meshChatInput || ''}
                onChange={(e) => setMeshChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChat();
                }}
                placeholder="Message squad…"
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 text-base text-white
                           placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50
                           transition-colors"
                style={{ minHeight: '48px' }}
              />
              <button
                onClick={handleSendChat}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl px-5
                           transition-all active:scale-95"
                style={{
                  minHeight: '48px',
                  boxShadow: '0 0 15px rgba(168,85,247,0.25)',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* ── NOSTR BRIDGE (if squad has nostr pubkey) ── */}
        {currentSquad?.nostr_pubkey && nip19 && (
          <div className="rounded-2xl overflow-hidden"
               style={{
                 background: 'rgba(30,30,40,0.5)',
                 border: '1px solid rgba(168,85,247,0.2)',
               }}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🌐</span>
                  <h2 className="text-xs font-bold text-purple-300/80 uppercase tracking-widest">Nostr Bridge</h2>
                </div>
                <span className="text-[10px] bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded border border-purple-700/50 font-mono">
                  Nostr
                </span>
              </div>
              <div className="bg-black/40 p-3 rounded-xl border border-gray-700/50 flex items-center justify-between gap-2 overflow-hidden">
                <span className="font-mono text-[10px] text-purple-300 select-all truncate flex-1">
                  {(() => {
                    try {
                      const pk = currentSquad.nostr_pubkey;
                      return pk.startsWith('npub1') ? pk : nip19.npubEncode(pk);
                    } catch {
                      return currentSquad.nostr_pubkey;
                    }
                  })()}
                </span>
                <button
                  onClick={() => {
                    try {
                      const pk = currentSquad.nostr_pubkey;
                      const npub = pk.startsWith('npub1') ? pk : nip19.npubEncode(pk);
                      navigator.clipboard.writeText(npub);
                      setToastMessage?.({ title: 'Copied!', body: 'Nostr npub copied to clipboard.' });
                      setTimeout(() => setToastMessage?.(null), 3000);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg
                             transition shrink-0 active:scale-95 font-semibold"
                  style={{ minHeight: '32px' }}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom spacer for safe scrolling */}
        <div className="h-4" />
      </div>
    </div>
  );
}
