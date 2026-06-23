import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { L as Loader2, C as Calendar, b as MapPin, g as getFunctions, e as app, h as httpsCallable } from "./index-CXUot43X.js";
import { C as ChevronLeft } from "./chevron-left-C_qBLmw1.js";
import { S as Star } from "./star-CGQXWRD_.js";
import { H as Heart } from "./heart-Byuw4YdV.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const COUNTRY_FLAGS = {
  TT: "🇹🇹",
  US: "🇺🇸",
  JM: "🇯🇲",
  BB: "🇧🇧",
  LC: "🇱🇨",
  VC: "🇻🇨",
  GD: "🇬🇩",
  AG: "🇦🇬",
  KN: "🇰🇳",
  BS: "🇧🇸",
  BM: "🇧🇲",
  GY: "🇬🇾",
  CA: "🇨🇦",
  GB: "🇬🇧",
  VG: "🇻🇬",
  VI: "🇻🇮",
  KY: "🇰🇾",
  SX: "🇸🇽",
  MQ: "🇲🇶",
  GP: "🇬🇵",
  PR: "🇵🇷",
  CU: "🇨🇺",
  HT: "🇭🇹",
  DO: "🇩🇴",
  AW: "🇦🇼",
  CW: "🇨🇼",
  JP: "🇯🇵",
  XX: "🎭"
};
const RARITY_CONFIG = {
  LEGENDARY: {
    name: "Legendary",
    borderColor: "border-yellow-400",
    bgColor: "bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    glow: "shadow-lg shadow-yellow-400/30"
  },
  EPIC: {
    name: "Epic",
    borderColor: "border-purple-400",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30",
    textColor: "text-purple-600 dark:text-purple-400",
    glow: "shadow-lg shadow-purple-400/20"
  },
  RARE: {
    name: "Rare",
    borderColor: "border-blue-400",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/30",
    textColor: "text-blue-600 dark:text-blue-400",
    glow: ""
  },
  COMMON: {
    name: "Common",
    borderColor: "border-gray-300 dark:border-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-700/50",
    textColor: "text-gray-600 dark:text-gray-400",
    glow: ""
  }
};
function StampCollection({ user, onBack }) {
  const [stamps, setStamps] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("ALL");
  const [favorites, setFavorites] = reactExports.useState(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (!user) return;
    const loadStamps = async () => {
      setLoading(true);
      setError(null);
      try {
        const functions = getFunctions(app);
        const getStamps = httpsCallable(functions, "getPassportStamps");
        const result = await getStamps({
          limit: 100,
          rarity: filter === "ALL" ? null : filter
        });
        setStamps(result.data.stamps || []);
        const favs = new Set(result.data.stamps?.filter((s) => s.isFavorite).map((s) => s.id) || []);
        setFavorites(favs);
      } catch (err) {
        console.error("Error loading stamps:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadStamps();
  }, [user, filter]);
  const toggleFavorite = (stampId) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(stampId)) {
        newFavs.delete(stampId);
      } else {
        newFavs.add(stampId);
      }
      return newFavs;
    });
  };
  const formatDate = (dateValue) => {
    if (!dateValue) return "Unknown";
    const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  const rarityCounts = stamps.reduce((acc, stamp) => {
    acc[stamp.rarity] = (acc[stamp.rarity] || 0) + 1;
    return acc;
  }, {});
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-yellow-500" }),
          "Stamp Collection"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
          stamps.length,
          " stamps collected"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-4 mb-4 -mx-1 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setFilter("ALL"),
          className: `flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === "ALL" ? "bg-teal-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
          children: [
            "All (",
            stamps.length,
            ")"
          ]
        }
      ),
      ["LEGENDARY", "EPIC", "RARE", "COMMON"].map((rarity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setFilter(rarity),
          className: `flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === rarity ? `${RARITY_CONFIG[rarity].bgColor} ${RARITY_CONFIG[rarity].textColor} border ${RARITY_CONFIG[rarity].borderColor}` : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
          children: [
            RARITY_CONFIG[rarity].name,
            " (",
            rarityCounts[rarity] || 0,
            ")"
          ]
        },
        rarity
      ))
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 text-teal-500 animate-spin" }) }),
    error && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setFilter("ALL"),
          className: "px-4 py-2 bg-teal-500 text-white rounded-xl",
          children: "Retry"
        }
      )
    ] }),
    !loading && !error && stamps.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-gray-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-700 dark:text-gray-200 mb-2", children: "No Stamps Yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Check in to events to start collecting stamps!" })
    ] }),
    !loading && stamps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: stamps.map((stamp) => {
      const config = RARITY_CONFIG[stamp.rarity] || RARITY_CONFIG.COMMON;
      const isFavorite = favorites.has(stamp.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `relative rounded-2xl border-2 ${config.borderColor} ${config.bgColor} ${config.glow} p-4 transition-all hover:scale-[1.02] cursor-pointer`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleFavorite(stamp.id),
                className: "absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3 text-center", children: COUNTRY_FLAGS[stamp.countryCode] || COUNTRY_FLAGS.XX }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-sm text-center truncate mb-1", children: stamp.eventTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-xs ${config.textColor} text-center font-medium uppercase tracking-wide`, children: [
              config.name,
              " #",
              stamp.editionNumber
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(stamp.stampedAt) })
              ] }),
              stamp.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: stamp.location })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-medium", children: [
              "+",
              stamp.creditsEarned,
              " credits"
            ] }) }),
            stamp.mintedTxHash && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://basescan.org/tx/${stamp.mintedTxHash}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors",
                children: "⛓ On-Chain"
              }
            ) })
          ]
        },
        stamp.id
      );
    }) })
  ] });
}
export {
  StampCollection as default
};
