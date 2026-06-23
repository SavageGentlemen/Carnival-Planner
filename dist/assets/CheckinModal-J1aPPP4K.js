import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { X, Z as Zap, E as ExternalLink, i as Ticket, L as Loader2, g as getFunctions, e as app, h as httpsCallable } from "./index-CXUot43X.js";
import { C as Check } from "./check-LoUvj2UR.js";
import { S as Sparkles } from "./sparkles-BEe8L_dR.js";
import { G as Gift } from "./gift-Biw2Zx2l.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
function AutoMintBadge({ stampId }) {
  const [status, setStatus] = reactExports.useState("minting");
  const [txData, setTxData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!stampId) return;
    const autoMint = async () => {
      try {
        const functions = getFunctions(app);
        const mint = httpsCallable(functions, "mintStamp");
        const result = await mint({ stampId });
        setTxData(result.data);
        setStatus("success");
      } catch (err) {
        console.warn("[AutoMint] Skipped:", err.message);
        if (err.message?.includes("already")) {
          setStatus("success");
          setTxData({ alreadyMinted: true });
        } else {
          setStatus("error");
        }
      }
    };
    autoMint();
  }, [stampId]);
  if (status === "error") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-3 py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${status === "minting" ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300" : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300"}`, children: status === "minting" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }),
    "Minting on chain..."
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
    txData?.alreadyMinted ? "✓ Already on-chain" : "✨ Minted on-chain!",
    txData?.explorerUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: txData.explorerUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "ml-auto text-indigo-500 hover:text-indigo-700",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
      }
    )
  ] }) });
}
function CheckinModal({ isOpen, onClose, onSuccess }) {
  const [accessCode, setAccessCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const [minting, setMinting] = reactExports.useState(false);
  const [mintResult, setMintResult] = reactExports.useState(null);
  const [mintError, setMintError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isOpen) {
      setAccessCode("");
      setError(null);
      setSuccess(null);
      setMintResult(null);
      setMintError(null);
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError("Please enter an access code");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const functions = getFunctions(app);
      const passportCheckin = httpsCallable(functions, "passportCheckin");
      const result = await passportCheckin({ accessCode: accessCode.trim() });
      setSuccess(result.data);
      setTimeout(() => {
        onSuccess?.(result.data);
      }, 3e3);
    } catch (err) {
      console.error("Check-in error:", err);
      const errorMessage = err.message || "Check-in failed. Please try again.";
      if (err.code === "functions/not-found") {
        setError("Invalid or expired access code.");
      } else if (err.code === "functions/already-exists") {
        setError("You have already checked in to this event.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  const formatAccessCode = (value) => {
    return value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slideUp", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 mx-auto bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-500/30 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-16 h-16 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-yellow-900" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2", children: "Check-in Complete!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "You earned a new stamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-6 py-4 rounded-2xl border-2 ${success.stamp?.rarity === "LEGENDARY" ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20" : success.stamp?.rarity === "EPIC" ? "border-purple-400 bg-purple-50 dark:bg-purple-900/20" : success.stamp?.rarity === "RARE" ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 bg-gray-50 dark:bg-gray-700/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-gray-900 dark:text-white", children: success.stamp?.eventTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 capitalize", children: [
            success.stamp?.rarity?.toLowerCase(),
            " Stamp • #",
            success.stamp?.editionNumber
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-4 text-white mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-black", children: [
              "+",
              success.creditsEarned
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Credits" })
          ] }),
          success.bonusCredits > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-center gap-2 text-sm text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+",
              success.bonusCredits,
              " Achievement Bonus!"
            ] })
          ] })
        ] }),
        success.newAchievements?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-purple-600 dark:text-purple-400 mb-2", children: "🎉 Achievement Unlocked!" }),
          success.newAchievements.map((achievement) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: achievement.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: achievement.name })
          ] }, achievement.id))
        ] }),
        success.tierChanged && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg", children: [
          "🎊 You ranked up to ",
          success.newTier,
          "!"
        ] }) }),
        success.stamp?.id && /* @__PURE__ */ jsxRuntimeExports.jsx(AutoMintBadge, { stampId: success.stamp.id }),
        mintResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1", children: mintResult.alreadyMinted ? "✓ Already minted" : "✨ Minted on-chain!" }),
          mintResult.txHash && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: mintResult.explorerUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                "View on BaseScan"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
            children: "Done"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-teal-500 to-emerald-500 p-6 text-white text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "Event Check-in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-100 text-sm mt-1", children: "Enter your access code to earn stamps" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Access Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: accessCode,
                onChange: (e) => setAccessCode(formatAccessCode(e.target.value)),
                placeholder: "e.g. PRO-123-4567",
                className: "w-full px-5 py-4 text-2xl font-mono font-bold text-center tracking-widest bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:text-white transition-all uppercase",
                disabled: loading,
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-2 text-center", children: "Get this code from the event host or promoter" })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: loading || !accessCode.trim(),
              className: "w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
                "Checking in..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
                "Claim Stamp"
              ] })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            ` })
  ] });
}
export {
  CheckinModal as default
};
