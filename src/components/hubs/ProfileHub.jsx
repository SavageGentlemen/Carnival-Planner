import React, { useMemo } from 'react';

const ALL_SUB_TABS = [
  { key: 'Profile', label: '👤 Profile' },
  { key: 'Media', label: '📸 Media', premium: true },
  { key: 'Promoter', label: '📢 Promoter' },
  { key: 'Settings', label: '⚙️ Settings' },
];

const MODE_OPTIONS = [
  { key: 'masquerader', label: '🎭 Masquerader' },
  { key: 'bandleader', label: '🎺 Band Leader', requiresBandLeader: true },
];

const ProfileHub = ({
  activeSubTab = 'Profile',
  onSubTabChange,
  children,
  isPremium = false,
  isAdmin = false,
  userMode = 'masquerader',
  onModeChange,
}) => {
  const visibleTabs = useMemo(
    () => ALL_SUB_TABS.filter((tab) => !tab.premium || isPremium),
    [isPremium]
  );

  const visibleModes = useMemo(
    () => MODE_OPTIONS.filter((mode) => !mode.requiresBandLeader || isAdmin),
    [isAdmin]
  );

  return (
    <div className="w-full">
      {/* Mode Switcher — only show if user has more than one mode available */}
      {visibleModes.length > 1 && (
        <div className="bg-[#0b0f17]/90 backdrop-blur-md border-b border-cyan-500/20 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Mode
            </span>
            {visibleModes.map((mode) => {
              const isActiveMode = userMode === mode.key;
              return (
                <button
                  key={mode.key}
                  onClick={() => onModeChange?.(mode.key)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-bold
                    transition-all duration-200 ease-out whitespace-nowrap
                    ${isActiveMode
                      ? 'bg-[#00e5cc] text-black shadow-[0_0_12px_rgba(0,229,204,0.3)]'
                      : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white'
                    }
                  `}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-tab navigation bar */}
      <div className="sticky top-0 z-10 bg-[#0b0f17]/90 backdrop-blur-md border-b border-cyan-500/20">
        <nav
          className="flex overflow-x-auto scrollbar-hide gap-1.5 px-3 py-2"
          role="tablist"
          aria-label="Profile sub-tabs"
        >
          {visibleTabs.map((tab) => {
            const isActive = activeSubTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSubTabChange?.(tab.key)}
                className={`
                  relative flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold
                  transition-all duration-200 ease-out whitespace-nowrap
                  ${isActive
                    ? 'bg-cyan-950/70 text-[#00e5cc] border border-cyan-400/40 shadow-[0_0_12px_rgba(0,229,204,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850 border border-transparent'
                  }
                `}
              >
                {tab.label}
                {tab.premium && (
                  <span className="ml-1 text-[10px] align-super text-amber-400 font-black">★</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content area */}
      <div
        key={activeSubTab}
        className="animate-[fadeIn_0.25s_ease-out] mt-3"
      >
        {children}
      </div>
    </div>
  );
};

export default ProfileHub;
