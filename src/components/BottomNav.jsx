import React, { useCallback } from 'react';

/**
 * BottomNav — Mobile-first sticky bottom navigation bar.
 *
 * Groups all app features into 5 navigational hubs.
 * Styled in the luxury dark carnival design system with glowing cyan (#00e5cc) accents.
 *
 * @param {string}   activeHub   - Currently active hub key
 * @param {function} onHubChange - Called with the hub key on tap
 * @param {boolean}  isPremium   - Whether the user has a premium subscription
 * @param {boolean}  isAdmin     - Whether the user is an admin
 * @param {boolean}  roadMode    - Whether road-day mode is active
 * @param {function} onSosPress  - Called when the SOS FAB is tapped
 */

const HUBS = [
  { key: 'plan',     emoji: '📋', label: 'Plan'     },
  { key: 'squad',    emoji: '👥', label: 'Squad'    },
  { key: 'passport', emoji: '🎫', label: 'Passport' },
  { key: 'store',    emoji: '🛍️', label: 'Store'    },
  { key: 'profile',  emoji: '👤', label: 'Profile'  },
];

export default function BottomNav({
  activeHub,
  onHubChange,
  isPremium = false,
  isAdmin = false,
  roadMode = false,
  onSosPress,
}) {
  const handleTap = useCallback(
    (key) => {
      // Haptic feedback when available (Capacitor / native)
      if (window?.navigator?.vibrate) {
        window.navigator.vibrate(10);
      }
      onHubChange(key);
    },
    [onHubChange],
  );

  return (
    <>
      {/* ── SOS Floating Action Button (road mode only) ────────── */}
      {roadMode && (
        <button
          onClick={onSosPress}
          aria-label="SOS Emergency"
          className="
            fixed z-50 right-4 flex items-center justify-center
            w-14 h-14 rounded-full
            border border-red-400
            shadow-[0_0_25px_rgba(239,68,68,0.6)]
            active:translate-x-[2px] active:translate-y-[2px]
            transition-all duration-150 ease-out
            animate-sos-pulse
          "
          style={{
            bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
          }}
        >
          <span className="text-2xl leading-none" role="img" aria-label="Emergency">
            🚨
          </span>
        </button>
      )}

      {/* ── Bottom Navigation Bar ──────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="
          fixed bottom-0 inset-x-0 z-50
          flex items-center justify-around
          bg-[#0b0f17]/95
          backdrop-blur-xl
          border-t border-cyan-500/25
          shadow-[0_-4px_25px_rgba(0,0,0,0.6)]
          transition-colors duration-300
        "
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          /* Total visual height = bar (64px) + safe-area */
        }}
      >
        {HUBS.map(({ key, emoji, label }) => {
          const isActive = activeHub === key;

          return (
            <button
              key={key}
              onClick={() => handleTap(key)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`
                relative flex flex-col items-center justify-center
                flex-1 h-16
                transition-all duration-200 ease-out
                active:scale-90
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                ${isActive ? 'scale-105' : 'opacity-60 hover:opacity-90'}
              `}
            >
              {/* Active indicator line */}
              {isActive && (
                <span
                  className="
                    absolute -top-[1px] left-1/2 -translate-x-1/2
                    w-8 h-[3px] rounded-full
                  "
                  style={{
                    background: '#00e5cc',
                    boxShadow: '0 0 10px #00e5cc, 0 0 20px rgba(0, 229, 204, 0.5)',
                  }}
                />
              )}

              {/* Icon */}
              <span
                className={`
                  text-xl leading-none transition-transform duration-200
                  ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,229,204,0.7)]' : ''}
                `}
                role="img"
                aria-hidden="true"
              >
                {emoji}
              </span>

              {/* Label */}
              <span
                className={`
                  mt-0.5 text-[10px] font-bold uppercase tracking-wider leading-tight
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'text-[#00e5cc]'
                      : 'text-slate-400'
                  }
                `}
              >
                {label}
              </span>

              {/* Active dot (below label) */}
              {isActive && (
                <span
                  className="
                    absolute bottom-1 left-1/2 -translate-x-1/2
                    w-1 h-1 rounded-full
                  "
                  style={{
                    background: '#00e5cc',
                    boxShadow: '0 0 6px #00e5cc',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Inline keyframes for SOS pulse ─────────────────────── */}
      <style>{`
        @keyframes sos-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
          }
        }
        .animate-sos-pulse {
          animation: sos-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
