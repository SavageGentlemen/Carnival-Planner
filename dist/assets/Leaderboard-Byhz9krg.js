import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as createLucideIcon, L as Loader2, I as TrendingUp, g as getFunctions, e as app, h as httpsCallable } from "./index-CXUot43X.js";
import { T as Trophy } from "./trophy-hLhL8QOQ.js";
import { C as ChevronLeft } from "./chevron-left-C_qBLmw1.js";
import { U as User } from "./user-B1jUIL0e.js";
import { C as Crown } from "./crown-i0HipylQ.js";
import { S as Star } from "./star-CGQXWRD_.js";
import { A as Award } from "./award-DJfbIRpy.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Flame = createLucideIcon("Flame", [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Medal = createLucideIcon("Medal", [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
]);
const TIER_STYLES = {
  BRONZE: {
    bg: "bg-gradient-to-r from-amber-600 to-amber-700",
    text: "text-amber-100",
    border: "border-amber-500"
  },
  SILVER: {
    bg: "bg-gradient-to-r from-gray-400 to-gray-500",
    text: "text-gray-100",
    border: "border-gray-400"
  },
  GOLD: {
    bg: "bg-gradient-to-r from-yellow-400 to-amber-500",
    text: "text-yellow-100",
    border: "border-yellow-400"
  },
  PLATINUM: {
    bg: "bg-gradient-to-r from-purple-500 to-indigo-600",
    text: "text-purple-100",
    border: "border-purple-400"
  }
};
const RANK_ICONS = {
  1: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/20" },
  2: { icon: Medal, color: "text-gray-300", bg: "bg-gray-400/20" },
  3: { icon: Medal, color: "text-amber-600", bg: "bg-amber-600/20" }
};
function Leaderboard({ user, onBack }) {
  const [leaderboard, setLeaderboard] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [userRank, setUserRank] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const functions = getFunctions(app);
        const getLeaderboard = httpsCallable(functions, "getPassportLeaderboard");
        const result = await getLeaderboard({ limit: 50 });
        setLeaderboard(result.data.leaderboard || []);
        if (user) {
          const userIndex = result.data.leaderboard?.findIndex(
            (entry) => entry.userId === user.uid
          );
          if (userIndex !== -1) {
            setUserRank(userIndex + 1);
          }
        }
      } catch (err) {
        console.error("Error loading leaderboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, [user]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 text-purple-500 animate-spin" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Loading leaderboard..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] text-center p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-red-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-800 dark:text-white mb-2", children: "Unable to Load Leaderboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400 mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          className: "px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors",
          children: "Go Back"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-6 h-6 text-gray-600 dark:text-gray-300" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 text-yellow-500" }),
          "Leaderboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Top Carnival Passport Holders" })
      ] }),
      userRank && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Your Rank" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black text-purple-500", children: [
          "#",
          userRank
        ] })
      ] })
    ] }),
    leaderboard.length >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-2 mb-6 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-[120px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-t-2xl p-3 text-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg", children: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto mb-2 mt-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden", children: leaderboard[1].profilePictureUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: leaderboard[1].profilePictureUrl, alt: "", className: "w-full h-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-gray-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-gray-700 dark:text-gray-200 truncate", children: leaderboard[1].displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-gray-800 dark:text-white", children: leaderboard[1].totalCredits })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 bg-gray-300 dark:bg-gray-600 rounded-b-lg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-[140px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-b from-yellow-300 to-amber-400 dark:from-yellow-500 dark:to-amber-600 rounded-t-2xl p-4 text-center relative shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-8 h-8 text-yellow-500 drop-shadow-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 mx-auto mb-2 mt-4 rounded-full bg-white/80 dark:bg-gray-800 flex items-center justify-center overflow-hidden ring-4 ring-yellow-400/50", children: leaderboard[0].profilePictureUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: leaderboard[0].profilePictureUrl, alt: "", className: "w-full h-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-gray-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-amber-900 dark:text-white truncate", children: leaderboard[0].displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black text-amber-800 dark:text-yellow-100", children: leaderboard[0].totalCredits }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${TIER_STYLES[leaderboard[0].currentTier || "BRONZE"].bg} ${TIER_STYLES[leaderboard[0].currentTier || "BRONZE"].text}`, children: leaderboard[0].currentTier })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-yellow-400 dark:bg-yellow-600 rounded-b-lg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-[120px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-700 dark:to-amber-800 rounded-t-2xl p-3 text-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg", children: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto mb-2 mt-4 rounded-full bg-amber-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden", children: leaderboard[2].profilePictureUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: leaderboard[2].profilePictureUrl, alt: "", className: "w-full h-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-gray-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-amber-800 dark:text-amber-100 truncate", children: leaderboard[2].displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-amber-900 dark:text-white", children: leaderboard[2].totalCredits })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-amber-400 dark:bg-amber-700 rounded-b-lg" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-purple-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-800 dark:text-white", children: "All Rankings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-400", children: [
          "(",
          leaderboard.length,
          " users)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: leaderboard.map((entry, index) => {
        const rank = index + 1;
        const isCurrentUser = user && entry.userId === user.uid;
        const rankConfig = RANK_ICONS[rank];
        const tierStyle = TIER_STYLES[entry.currentTier || "BRONZE"];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-4 p-4 transition-colors ${isCurrentUser ? "bg-purple-50 dark:bg-purple-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center font-bold ${rankConfig ? `${rankConfig.bg} ${rankConfig.color}` : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`, children: rankConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(rankConfig.icon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: rank }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden", children: entry.profilePictureUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: entry.profilePictureUrl, alt: "", className: "w-full h-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-gray-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `font-medium truncate ${isCurrentUser ? "text-purple-600 dark:text-purple-400" : "text-gray-800 dark:text-white"}`, children: [
                    entry.displayName,
                    isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "(You)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${tierStyle.bg} ${tierStyle.text}`, children: entry.currentTier })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
                    entry.totalEvents,
                    " events"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3 h-3" }),
                    entry.achievementCount,
                    " badges"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-gray-900 dark:text-white", children: entry.totalCredits.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "credits" })
              ] })
            ]
          },
          entry.userId
        );
      }) }),
      leaderboard.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-gray-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "No rankings yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Be the first to check in and earn credits!" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-5 text-white text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-8 h-8 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "Keep the vibes going!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm", children: "Check in to more events to climb the leaderboard" })
    ] })
  ] });
}
export {
  Leaderboard as default
};
