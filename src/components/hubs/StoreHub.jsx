import React from 'react';

const SUB_TABS = [
  { key: 'Marketplace', label: '🛍️ Marketplace' },
];

const StoreHub = ({ activeSubTab = 'Marketplace', onSubTabChange, children }) => {
  return (
    <div className="w-full">
      {/* Sub-tab navigation bar */}
      <div className="sticky top-0 z-10 bg-[#0b0f17]/90 backdrop-blur-md border-b border-cyan-500/20">
        <nav
          className="flex overflow-x-auto scrollbar-hide gap-1.5 px-3 py-2"
          role="tablist"
          aria-label="Store sub-tabs"
        >
          {SUB_TABS.map((tab) => {
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

export default StoreHub;
