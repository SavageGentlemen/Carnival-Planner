import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { g as getFunctions, e as app, h as httpsCallable, L as Loader2, i as Ticket } from "./index-CXUot43X.js";
import { C as CheckCircle2 } from "./check-circle-2-CWiN2kBJ.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import { G as Gift } from "./gift-Biw2Zx2l.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
function RewardsList({ user, profile, onBack }) {
  const [rewards, setRewards] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [redeemingId, setRedeemingId] = reactExports.useState(null);
  const [redemptionSuccess, setRedemptionSuccess] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadRewards();
  }, []);
  const loadRewards = async () => {
    setLoading(true);
    try {
      const functions = getFunctions(app);
      const getAvailableRewards = httpsCallable(functions, "getAvailableRewards");
      const result = await getAvailableRewards();
      setRewards(result.data.rewards);
    } catch (err) {
      console.error("Failed to load rewards:", err);
      if (err.message.includes("internal") || err.message.includes("offline")) {
        setRewards([
          { id: "1", title: "Free Drink", cost: 500, description: "Redeem for a rum punch", promoterId: "demo" },
          { id: "2", title: "VIP Upgrade", cost: 1e3, description: "Skip the line access", promoterId: "demo" },
          { id: "3", title: "Band Discount", cost: 2e3, description: "10% off costume", promoterId: "demo" }
        ]);
      } else {
        setError("Failed to load rewards. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleRedeem = async (reward) => {
    if (profile.totalCredits < reward.cost) return;
    setRedeemingId(reward.id);
    setError(null);
    try {
      const functions = getFunctions(app);
      const redeemPromoterReward = httpsCallable(functions, "redeemPromoterReward");
      const result = await redeemPromoterReward({ rewardId: reward.id });
      setRedemptionSuccess({
        title: reward.title,
        code: result.data.redemptionCode
      });
      loadRewards();
    } catch (err) {
      console.error("Redemption failed:", err);
      if (err.message.includes("internal") || err.message.includes("offline")) {
        setRedemptionSuccess({
          title: reward.title,
          code: "MOCK-" + Math.random().toString(36).substr(2, 6).toUpperCase()
        });
      } else {
        setError(err.message);
      }
    } finally {
      setRedeemingId(null);
    }
  };
  if (redemptionSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-8 h-8 text-green-600 dark:text-green-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: "Reward Redeemed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 dark:text-gray-400 mb-6", children: [
        "You currently have access to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: redemptionSuccess.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6 w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wider mb-1", children: "Redemption Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-mono font-bold text-teal-600 dark:text-teal-400 tracking-widest", children: redemptionSuccess.code })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setRedemptionSuccess(null);
              onBack();
            },
            className: "flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setRedemptionSuccess(null),
            className: "flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors",
            children: "Redeem Another"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "Rewards Market" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-teal-700 dark:text-teal-300", children: [
        profile?.totalCredits || 0,
        " Credits"
      ] }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4" }),
      error
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 text-teal-600 animate-spin" }) }) : rewards.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No rewards available right now." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: rewards.map((reward) => {
      const canAfford = (profile?.totalCredits || 0) >= reward.cost;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg", children: reward.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium", children: [
            reward.cost,
            " pts"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1", children: reward.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleRedeem(reward),
            disabled: !canAfford || redeemingId === reward.id,
            className: `w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                                        ${canAfford ? "bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow" : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"}
                                    `,
            children: redeemingId === reward.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-4 h-4" }),
              canAfford ? "Redeem Reward" : "Insufficient Credits"
            ] })
          }
        )
      ] }, reward.id);
    }) })
  ] });
}
export {
  RewardsList as default
};
