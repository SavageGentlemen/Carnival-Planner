import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { h as html2canvas } from "./html2canvas.esm-s7HdUlmq.js";
import { X, i as Ticket, b as MapPin, D as Download, S as Share2 } from "./index-CXUot43X.js";
import { T as Trophy } from "./trophy-hLhL8QOQ.js";
import { S as Sparkles } from "./sparkles-BEe8L_dR.js";
import { C as Check } from "./check-LoUvj2UR.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const TIER_STYLES = {
  BRONZE: {
    gradient: "from-amber-600 via-amber-500 to-orange-600",
    accent: "bg-amber-400",
    icon: "🥉"
  },
  SILVER: {
    gradient: "from-gray-400 via-gray-300 to-slate-400",
    accent: "bg-gray-300",
    icon: "🥈"
  },
  GOLD: {
    gradient: "from-yellow-400 via-amber-400 to-yellow-500",
    accent: "bg-yellow-300",
    icon: "🥇"
  },
  PLATINUM: {
    gradient: "from-purple-500 via-indigo-500 to-purple-600",
    accent: "bg-purple-400",
    icon: "💎"
  }
};
function PassportCard({ profile, isOpen, onClose }) {
  const cardRef = reactExports.useRef(null);
  const [downloading, setDownloading] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  if (!isOpen) return null;
  const tier = profile?.currentTier || "BRONZE";
  const tierStyle = TIER_STYLES[tier];
  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true
      });
      const link = document.createElement("a");
      link.download = `soca-passport-${profile?.displayName?.replace(/\s+/g, "-").toLowerCase() || "card"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Error generating card:", err);
      alert("Could not download card. Please try again.");
    } finally {
      setDownloading(false);
    }
  };
  const handleShare = async () => {
    const shareData = {
      title: "My Soca Passport",
      text: `I'm a ${tier} tier carnivalist with ${profile?.totalCredits || 0} credits! Check out my Soca Passport on Caribbean Carnival Planner.`,
      url: window.location.origin
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share error:", err);
        }
      }
    } else {
      handleCopyLink();
    }
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-20",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-4 text-center", children: "Your Passport Card" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: cardRef,
          className: `relative bg-gradient-to-br ${tierStyle.gradient} rounded-2xl p-6 text-white shadow-xl overflow-hidden aspect-[1.586/1]`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-48 h-48 border-2 border-white rounded-full translate-x-1/4 translate-y-1/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 w-64 h-64 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm text-xl", children: tierStyle.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-white/70 uppercase tracking-wider", children: "Soca Passport" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", children: [
                    tier,
                    " TIER"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black", children: profile?.totalCredits || 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/70 uppercase", children: "Credits" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black truncate", children: profile?.displayName || "Carnival Lover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid grid-cols-3 gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-4 h-4 mx-auto mb-1 opacity-80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: profile?.totalEvents || 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] uppercase opacity-70", children: "Events" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mx-auto mb-1 opacity-80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: (profile?.countriesVisited || []).length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] uppercase opacity-70", children: "Countries" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 mx-auto mb-1 opacity-80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: (profile?.unlockedAchievements || []).length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] uppercase opacity-70", children: "Badges" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 opacity-70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium opacity-70", children: "Caribbean Carnival Planner" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono opacity-50", children: (/* @__PURE__ */ new Date()).getFullYear() })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pt-0 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleDownload,
          disabled: downloading,
          className: "flex items-center justify-center gap-2 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50",
          children: [
            downloading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
            "Download"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleShare,
          className: "flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold transition-colors",
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-500" }),
            "Copied!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5" }),
            "Share"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-4 text-xs text-gray-400 text-center", children: "Note: For best results, download requires the html2canvas library." })
  ] }) });
}
export {
  PassportCard as default
};
