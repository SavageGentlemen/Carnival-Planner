import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { f as Lock, W as Wallet, E as ExternalLink, L as Loader2, g as getFunctions, e as app, h as httpsCallable } from "./index-CXUot43X.js";
import { C as ChevronLeft } from "./chevron-left-C_qBLmw1.js";
import { A as Award } from "./award-DJfbIRpy.js";
import { S as Sparkles } from "./sparkles-BEe8L_dR.js";
import { C as Check } from "./check-LoUvj2UR.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const ACHIEVEMENTS_CONFIG = {
  first_stamp: {
    id: "first_stamp",
    name: "First Steps",
    description: "Claim your first stamp",
    icon: "🎟️",
    category: "MILESTONE",
    points: 50,
    criteria: { type: "EVENT_COUNT", target: 1 }
  },
  island_hopper: {
    id: "island_hopper",
    name: "Island Hopper",
    description: "Check in at 3 different countries",
    icon: "🌊",
    category: "TRAVEL",
    points: 500,
    criteria: { type: "COUNTRY_COUNT", target: 3 }
  },
  sunrise_warrior: {
    id: "sunrise_warrior",
    name: "Sunrise Warrior",
    description: "Check in at 5 J'ouvert or early morning events",
    icon: "🌅",
    category: "EVENTS",
    points: 300,
    criteria: { type: "EVENT_TYPE", target: 5 }
  },
  loyal_fan: {
    id: "loyal_fan",
    name: "Loyal Fan",
    description: "Check in to 10 events total",
    icon: "⭐",
    category: "MILESTONE",
    points: 250,
    criteria: { type: "EVENT_COUNT", target: 10 }
  },
  tier_up: {
    id: "tier_up",
    name: "Moving Up",
    description: "Reach Silver tier",
    icon: "📈",
    category: "MILESTONE",
    points: 200,
    criteria: { type: "TIER_REACHED", target: "SILVER" }
  }
};
const CATEGORY_COLORS = {
  MILESTONE: "from-blue-500 to-indigo-500",
  TRAVEL: "from-teal-500 to-cyan-500",
  EVENTS: "from-orange-500 to-amber-500",
  SOCIAL: "from-pink-500 to-rose-500"
};
function AchievementList({ profile, onBack, walletAddress }) {
  const unlockedAchievements = profile?.unlockedAchievements || [];
  const achievementPoints = profile?.achievementPoints || 0;
  const totalEvents = profile?.totalEvents || 0;
  const countriesCount = (profile?.countriesVisited || []).length;
  const currentTier = profile?.currentTier || "BRONZE";
  const eventTypeStats = profile?.eventTypeStats || {};
  const mintedAchievements = profile?.mintedAchievements || [];
  const [mintingId, setMintingId] = reactExports.useState(null);
  const [mintResults, setMintResults] = reactExports.useState({});
  const [mintErrors, setMintErrors] = reactExports.useState({});
  const getProgress = (achievement) => {
    const { criteria } = achievement;
    let current = 0;
    let target = criteria.target;
    switch (criteria.type) {
      case "EVENT_COUNT":
        current = totalEvents;
        break;
      case "COUNTRY_COUNT":
        current = countriesCount;
        break;
      case "TIER_REACHED":
        const tierOrder = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
        const currentIndex = tierOrder.indexOf(currentTier);
        const targetIndex = tierOrder.indexOf(criteria.target);
        current = currentIndex >= targetIndex ? 1 : 0;
        target = 1;
        break;
      case "EVENT_TYPE":
        current = (eventTypeStats.jouvert || 0) + (eventTypeStats.breakfast || 0) + (eventTypeStats.early_morning || 0);
        break;
      default:
        current = 0;
    }
    return {
      current: Math.min(current, target),
      target,
      percent: Math.min(100, Math.floor(current / target * 100))
    };
  };
  const achievements = Object.values(ACHIEVEMENTS_CONFIG).map((achievement) => ({
    ...achievement,
    isUnlocked: unlockedAchievements.includes(achievement.id),
    progress: getProgress(achievement)
  }));
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const handleMintAchievement = async (achievementId) => {
    setMintingId(achievementId);
    setMintErrors((prev) => ({ ...prev, [achievementId]: null }));
    try {
      const functions = getFunctions(app);
      const mint = httpsCallable(functions, "mintAchievement");
      const result = await mint({ achievementId });
      setMintResults((prev) => ({ ...prev, [achievementId]: result.data }));
    } catch (err) {
      setMintErrors((prev) => ({ ...prev, [achievementId]: err.message || "Minting failed" }));
    } finally {
      setMintingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          className: "p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-6 h-6 text-purple-500" }),
          "Achievements"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
          unlockedCount,
          "/",
          achievements.length,
          " unlocked"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white mb-6 shadow-lg shadow-purple-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-200 text-sm", children: "Total Points Earned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-black", children: achievementPoints })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: achievements.map((achievement) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `relative bg-white dark:bg-gray-800 rounded-2xl border overflow-hidden transition-all ${achievement.isUnlocked ? "border-purple-200 dark:border-purple-800 shadow-sm" : "border-gray-200 dark:border-gray-700 opacity-75"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 bg-gradient-to-r ${CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.MILESTONE}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${achievement.isUnlocked ? "bg-purple-100 dark:bg-purple-900/30" : "bg-gray-100 dark:bg-gray-700 grayscale"}`, children: achievement.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `font-bold ${achievement.isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`, children: achievement.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: achievement.description })
                ] }),
                achievement.isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                  "Unlocked"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-lg text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                  "Locked"
                ] })
              ] }),
              !achievement.isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    achievement.progress.current,
                    "/",
                    achievement.progress.target
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-full rounded-full bg-gradient-to-r ${CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.MILESTONE} transition-all duration-500`,
                    style: { width: `${achievement.progress.percent}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 text-xs font-medium ${achievement.isUnlocked ? "text-purple-600 dark:text-purple-400" : "text-gray-400"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                achievement.isUnlocked ? `+${achievement.points} points earned` : `${achievement.points} points`
              ] }) }),
              achievement.isUnlocked && walletAddress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: mintedAchievements.includes(achievement.id) || mintResults[achievement.id] ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3 h-3" }),
                  "Minted"
                ] }),
                mintResults[achievement.id]?.txHash && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: mintResults[achievement.id].explorerUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-xs text-indigo-500 hover:text-indigo-600 flex items-center gap-0.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                      "View"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                mintErrors[achievement.id] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 mb-1", children: mintErrors[achievement.id] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => handleMintAchievement(achievement.id),
                    disabled: mintingId === achievement.id,
                    className: "inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 transition-all",
                    children: mintingId === achievement.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-3 h-3 animate-spin" }),
                      "Minting..."
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3 h-3" }),
                      "Mint NFT"
                    ] })
                  }
                )
              ] }) })
            ] })
          ] }) })
        ]
      },
      achievement.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm mb-2", children: "More achievements coming soon!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Squad Leader • Ocean Voyager • Carnival Royalty • and more..." })
    ] })
  ] });
}
export {
  AchievementList as default
};
