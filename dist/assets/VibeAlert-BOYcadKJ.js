import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as createLucideIcon, X, Z as Zap, R as ArrowRight } from "./index-CXUot43X.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingDown = createLucideIcon("TrendingDown", [
  ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7", key: "1r2t7k" }],
  ["polyline", { points: "16 17 22 17 22 11", key: "11uiuu" }]
]);
function VibeAlert({ alert, onSwap, onDismiss }) {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const [isExiting, setIsExiting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (alert) {
      requestAnimationFrame(() => setIsVisible(true));
      const timer = setTimeout(() => handleDismiss(), 15e3);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [alert]);
  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsVisible(false);
      onDismiss?.();
    }, 300);
  };
  const handleSwap = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsVisible(false);
      onSwap?.(alert);
    }, 200);
  };
  if (!alert) return null;
  const { droppedEvent, suggestedEvent } = alert;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `
        fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[420px] z-50
        transition-all duration-300 ease-out
        ${isVisible && !isExiting ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}
      `,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-red-950/90 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl border-2 border-red-500/20 animate-pulse pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-3 pb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2 py-0.5 bg-red-500/20 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-red-300", children: "Vibe Alert" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleDismiss,
              className: "p-1 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-red-400", children: droppedEvent.score }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white truncate", children: droppedEvent.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-300/80", children: droppedEvent.reason || "Vibe score dropped" })
            ] })
          ] }),
          suggestedEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-red-500/30 to-emerald-500/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-medium uppercase", children: "Try instead" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-l from-emerald-500/30 to-red-500/30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black text-emerald-400", children: suggestedEvent.score }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white truncate", children: suggestedEvent.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-300/80", children: suggestedEvent.venue || suggestedEvent.reason || "Hot right now 🔥" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-emerald-300", children: [
                  suggestedEvent.score,
                  "/10"
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 pb-4 pt-1", children: [
          suggestedEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleSwap,
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
                "Swap Now"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleDismiss,
              className: "flex-1 px-4 py-2.5 bg-white/5 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/10 transition-all border border-white/10",
              children: "Dismiss"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  VibeAlert as default
};
