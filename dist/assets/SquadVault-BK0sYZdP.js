import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as collection, q as query, i as orderBy, w as where, o as onSnapshot, d as doc } from "./vendor-firebase-data-O6IN0zfq.js";
import { d as db, h as httpsCallable, g as getFunctions, e as app } from "./index-CXUot43X.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
const functions = getFunctions(app);
async function createVault(data) {
  const fn = httpsCallable(functions, "createVault");
  const result = await fn(data);
  return result.data;
}
async function contributeToVault(vaultId, amount) {
  const fn = httpsCallable(functions, "contributeToVault");
  const result = await fn({ vaultId, amount });
  return result.data;
}
async function requestVaultPayout(vaultId, amount, type, description) {
  const fn = httpsCallable(functions, "requestVaultPayout");
  const result = await fn({ vaultId, amount, type, description });
  return result.data;
}
async function freezeVault(vaultId, reason) {
  const fn = httpsCallable(functions, "freezeVault");
  const result = await fn({ vaultId, reason });
  return result.data;
}
async function closeVault(vaultId) {
  const fn = httpsCallable(functions, "closeVault");
  const result = await fn({ vaultId });
  return result.data;
}
function subscribeToUserVaults(userId, callback) {
  const vaultsRef = collection(db, "vaults");
  const q = query(
    vaultsRef,
    where("members", "array-contains", userId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const vaults = snapshot.docs.map((doc2) => ({
      id: doc2.id,
      ...doc2.data()
    }));
    callback(vaults);
  }, (err) => {
    console.error("[VaultService] Error subscribing to user vaults:", err);
    callback([]);
  });
}
function subscribeToVault(vaultId, callback) {
  const vaultRef = doc(db, "vaults", vaultId);
  return onSnapshot(vaultRef, (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  }, (err) => {
    console.error("[VaultService] Error subscribing to vault:", err);
    callback(null);
  });
}
function subscribeToVaultMembers(vaultId, callback) {
  const membersRef = collection(db, "vaults", vaultId, "members");
  const q = query(membersRef, orderBy("joinedAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const members = snapshot.docs.map((doc2) => ({
      id: doc2.id,
      ...doc2.data()
    }));
    callback(members);
  }, (err) => {
    console.error("[VaultService] Error subscribing to vault members:", err);
    callback([]);
  });
}
function subscribeToVaultContributions(vaultId, callback) {
  const contribRef = collection(db, "vaults", vaultId, "contributions");
  const q = query(contribRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const contributions = snapshot.docs.map((doc2) => ({
      id: doc2.id,
      ...doc2.data()
    }));
    callback(contributions);
  }, (err) => {
    console.error("[VaultService] Error subscribing to contributions:", err);
    callback([]);
  });
}
function subscribeToVaultPayouts(vaultId, callback) {
  const payoutsRef = collection(db, "vaults", vaultId, "payouts");
  const q = query(payoutsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const payouts = snapshot.docs.map((doc2) => ({
      id: doc2.id,
      ...doc2.data()
    }));
    callback(payouts);
  }, (err) => {
    console.error("[VaultService] Error subscribing to payouts:", err);
    callback([]);
  });
}
function getWhatsAppShareLink(vaultName, inviteCode, vaultId) {
  const url = `${window.location.origin}?joinVault=${vaultId}&code=${inviteCode}`;
  const text = `🎭 Join my Squad Vault "${vaultName}" on Carnival Planner!

Save together for carnival — no awkward Venmo texts.

${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function getVaultProgress(totalSaved, goalAmount) {
  if (!goalAmount || goalAmount <= 0) return 0;
  return Math.min(Math.round(totalSaved / goalAmount * 100), 100);
}
function ProgressRing({ progress, size = 120, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - progress / 100 * circ;
  const color = progress >= 100 ? "#22c55e" : progress >= 50 ? "#eab308" : "#a855f7";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, className: "transform -rotate-90", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: "currentColor", strokeWidth: stroke, className: "text-gray-700" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: size / 2,
        cy: size / 2,
        r: radius,
        fill: "none",
        stroke: color,
        strokeWidth: stroke,
        strokeDasharray: circ,
        strokeDashoffset: offset,
        strokeLinecap: "round",
        className: "transition-all duration-700"
      }
    )
  ] });
}
function VaultCard({ vault, onSelect }) {
  const progress = getVaultProgress(vault.totalSaved || 0, vault.goalAmount || 1);
  const freq = vault.contributionFrequency === "weekly" ? "Fri" : vault.contributionFrequency === "biweekly" ? "Every 2 wks" : "Monthly";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSelect(vault), className: "w-full text-left bg-gradient-to-br from-purple-900/80 to-gray-900 border border-purple-500/30 rounded-2xl p-5 hover:border-purple-400/60 transition-all shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { progress, size: 72, stroke: 6 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-0 flex items-center justify-center text-sm font-bold text-white", children: [
        progress,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white text-lg truncate", children: vault.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-purple-300 text-sm", children: [
        formatCurrency(vault.totalSaved || 0),
        " / ",
        formatCurrency(vault.goalAmount)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full", children: [
          vault.memberCount || 0,
          " members"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
          "Next: ",
          freq,
          " ",
          formatCurrency(vault.contributionAmount)
        ] })
      ] }),
      vault.status === "frozen" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full mt-1 inline-block", children: "❄️ Frozen" })
    ] })
  ] }) });
}
function CreateVaultModal({ user, onClose, onCreated }) {
  const [step, setStep] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ name: "", targetDate: "", goalAmount: 5e3, contributionAmount: 100, contributionFrequency: "weekly", inviteEmails: "" });
  const [error, setError] = reactExports.useState("");
  const handleCreate = async () => {
    setError("");
    if (!form.name.trim()) return setError("Name your vault");
    if (form.goalAmount < 100 || form.goalAmount > 2e4) return setError("Goal must be $100–$20,000");
    if (form.contributionAmount < 25 || form.contributionAmount > 500) return setError("Contribution must be $25–$500");
    setLoading(true);
    try {
      const emails = form.inviteEmails.split(/[,\n]/).map((e) => e.trim()).filter(Boolean);
      if (emails.length > 10) return setError("Max 10 members");
      const result = await createVault({
        name: form.name,
        targetDate: form.targetDate,
        goalAmount: Number(form.goalAmount),
        contributionAmount: Number(form.contributionAmount),
        contributionFrequency: form.contributionFrequency,
        inviteEmails: emails
      });
      onCreated(result);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create vault");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 border border-purple-500/30 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "🏦 Create Your Carnival Sou Sou" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-white text-2xl", children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-300 text-sm mb-6", children: "Save together for carnival. No awkward Venmo texts. No missed costume deposits." }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mb-2", children: "How it works:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-1 list-decimal list-inside", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Invite your crew (2–10 people)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Set auto-save: e.g. $100 every Friday" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We hold the money safe until costume drop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pay Tribe/Yuma direct with 1 click" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-purple-400", children: `You're the "Banker". We're the vault. FDIC-insured through Stripe.` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "Vault Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: form.name,
            onChange: (e) => setForm({ ...form, name: e.target.value }),
            placeholder: "e.g. Trinidad 2027 Squad",
            className: "w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "Target Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: form.targetDate,
            onChange: (e) => setForm({ ...form, targetDate: e.target.value }),
            className: "w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "Goal Amount (max $20,000)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 100,
            max: 2e4,
            value: form.goalAmount,
            onChange: (e) => setForm({ ...form, goalAmount: e.target.value }),
            className: "w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(2), className: "w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors", children: "Next →" })
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "Contribution Per Member ($25–$500)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 25,
            max: 500,
            step: 25,
            value: form.contributionAmount,
            onChange: (e) => setForm({ ...form, contributionAmount: Number(e.target.value) }),
            className: "w-full accent-purple-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-2xl font-bold text-white mt-1", children: formatCurrency(form.contributionAmount) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 block mb-2", children: "Frequency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["weekly", "biweekly", "monthly"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setForm({ ...form, contributionFrequency: f }),
            className: `py-2 rounded-xl text-sm font-medium transition-colors ${form.contributionFrequency === f ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-purple-500"}`,
            children: f === "weekly" ? "Weekly" : f === "biweekly" ? "Bi-weekly" : "Monthly"
          },
          f
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "Invite Crew (emails, comma-separated)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: form.inviteEmails,
            onChange: (e) => setForm({ ...form, inviteEmails: e.target.value }),
            placeholder: "friend1@email.com, friend2@email.com",
            rows: 3,
            className: "w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "2–10 members. They'll get an email invite." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(1), className: "flex-1 py-3 bg-gray-800 text-gray-300 font-bold rounded-xl hover:bg-gray-700 transition-colors", children: "← Back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCreate,
            disabled: loading,
            className: "flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50",
            children: loading ? "Creating..." : "Start My Vault — Free"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 text-center", children: "By continuing, you agree to KYC check. Takes 60 sec." })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm mt-3 text-center", children: error })
  ] }) });
}
function VaultDetail({ vault, user, onBack }) {
  const [members, setMembers] = reactExports.useState([]);
  const [contributions, setContributions] = reactExports.useState([]);
  const [payouts, setPayouts] = reactExports.useState([]);
  const [topUpAmount, setTopUpAmount] = reactExports.useState(50);
  const [payoutAmount, setPayoutAmount] = reactExports.useState("");
  const [payoutDesc, setPayoutDesc] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPayout, setShowPayout] = reactExports.useState(false);
  const isAdmin = vault.adminUserId === user?.uid;
  const progress = getVaultProgress(vault.totalSaved || 0, vault.goalAmount || 1);
  reactExports.useEffect(() => {
    if (!vault?.id) return;
    const unsubs = [
      subscribeToVaultMembers(vault.id, setMembers),
      subscribeToVaultContributions(vault.id, setContributions),
      subscribeToVaultPayouts(vault.id, setPayouts)
    ];
    return () => unsubs.forEach((u) => u());
  }, [vault?.id]);
  const handleTopUp = async () => {
    setLoading(true);
    try {
      const result = await contributeToVault(vault.id, topUpAmount);
      if (result?.checkoutUrl) window.location.href = result.checkoutUrl;
    } catch (err) {
      alert("Top-up failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePayout = async () => {
    if (!payoutAmount || Number(payoutAmount) <= 0) return;
    setLoading(true);
    try {
      await requestVaultPayout(vault.id, Number(payoutAmount), "bank_transfer", payoutDesc || "Payout");
      setShowPayout(false);
      setPayoutAmount("");
      setPayoutDesc("");
      alert("Payout initiated! 1.9% fee applied for bank transfer.");
    } catch (err) {
      alert("Payout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleFreeze = async () => {
    if (!confirm("Freeze this vault? No new charges will occur.")) return;
    try {
      await freezeVault(vault.id, "Admin freeze");
    } catch (err) {
      alert(err.message);
    }
  };
  const handleClose = async () => {
    if (!confirm("Close vault and refund members pro-rata minus fees? This cannot be undone.")) return;
    try {
      await closeVault(vault.id);
      onBack();
    } catch (err) {
      alert(err.message);
    }
  };
  const whatsappLink = getWhatsAppShareLink(vault.name, vault.inviteCode || "", vault.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onBack, className: "text-purple-400 hover:text-purple-300 text-sm font-medium", children: "← Back to Vaults" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-purple-900/80 to-gray-900 border border-purple-500/30 rounded-2xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { progress, size: 110, stroke: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-bold text-white", children: [
          progress,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: vault.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-purple-300 text-lg", children: [
          formatCurrency(vault.totalSaved || 0),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
            "/ ",
            formatCurrency(vault.goalAmount)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400 mt-1", children: [
          vault.memberCount || members.length,
          " members · ",
          vault.contributionFrequency,
          " · ",
          formatCurrency(vault.contributionAmount),
          "/person"
        ] }),
        vault.status === "frozen" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-400 text-sm font-bold mt-1", children: [
          "❄️ Vault Frozen",
          vault.frozenReason ? `: ${vault.frozenReason}` : ""
        ] }),
        vault.status === "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm font-bold mt-1", children: "🔒 Vault Closed" })
      ] })
    ] }) }),
    vault.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleTopUp,
          disabled: loading,
          className: "py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm disabled:opacity-50",
          children: [
            "💰 Top Up ",
            formatCurrency(topUpAmount)
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: whatsappLink,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm text-center",
          children: "📱 WhatsApp Invite"
        }
      ),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowPayout(true), className: "py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm", children: "🎭 Release Payout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleFreeze, className: "py-3 bg-red-600/20 hover:bg-red-600/40 text-red-400 font-bold rounded-xl transition-colors text-sm border border-red-500/30", children: "❄️ Freeze" })
      ] })
    ] }),
    showPayout && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 border border-purple-500/30 rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold", children: "Release Payout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          placeholder: "Amount",
          value: payoutAmount,
          onChange: (e) => setPayoutAmount(e.target.value),
          className: "w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "e.g. Costume Deposit — Tribe Carnival",
          value: payoutDesc,
          onChange: (e) => setPayoutDesc(e.target.value),
          className: "w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Fee: 1.9% on bank transfer. 0% on virtual card (coming soon)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowPayout(false), className: "flex-1 py-2 bg-gray-700 text-gray-300 rounded-xl", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handlePayout, disabled: loading, className: "flex-1 py-2 bg-purple-600 text-white font-bold rounded-xl disabled:opacity-50", children: loading ? "Processing..." : "Confirm Payout" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800/50 border border-gray-700 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold mb-3", children: "👥 Members" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        members.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No members yet. Send invites!" }),
        members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-gray-900/50 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold", children: (m.displayName || m.email || "?")[0].toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-medium", children: m.displayName || m.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs", children: [
                m.role === "admin" ? "🏦 Banker" : "Member",
                " · ",
                m.status
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-sm font-bold", children: formatCurrency(m.totalContributed || 0) })
        ] }, m.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800/50 border border-gray-700 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold mb-3", children: "💸 Recent Contributions" }),
      contributions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No contributions yet." }),
      contributions.slice(0, 10).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm", children: c.userEmail || "Member" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: c.createdAt?.toDate?.()?.toLocaleDateString() || "" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm font-bold ${c.status === "succeeded" ? "text-green-400" : c.status === "failed" ? "text-red-400" : "text-yellow-400"}`, children: [
            c.status === "succeeded" ? "+" : "",
            formatCurrency(c.amount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: c.status })
        ] })
      ] }, c.id))
    ] }),
    payouts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800/50 border border-gray-700 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold mb-3", children: "📤 Payouts" }),
      payouts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm", children: p.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs", children: [
            p.type,
            " · Fee: ",
            formatCurrency(p.feeAmount || 0)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-orange-400 text-sm font-bold", children: [
          "-",
          formatCurrency(p.amount)
        ] })
      ] }, p.id))
    ] }),
    isAdmin && vault.status !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "w-full py-3 bg-red-900/30 border border-red-500/30 text-red-400 font-bold rounded-xl hover:bg-red-900/50 transition-colors text-sm", children: "Close Vault & Refund Members" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 border-t border-gray-700 pt-4 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Squad Vault is a savings club service provided by Carnival-Planner.com." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not a bank. Funds held with our banking partner via Stripe Treasury, Member FDIC." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not lending, not credit, not interest-bearing. No returns guaranteed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You save your own money. We charge 1.9% only on cash-out to external bank." })
    ] })
  ] });
}
function SquadVault({ user, isDemoMode }) {
  const [vaults, setVaults] = reactExports.useState([]);
  const [selectedVault, setSelectedVault] = reactExports.useState(null);
  const [liveVault, setLiveVault] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [showOnboarding, setShowOnboarding] = reactExports.useState(() => !localStorage.getItem("vault-onboarded"));
  reactExports.useEffect(() => {
    if (!user || isDemoMode) return;
    const unsub = subscribeToUserVaults(user.uid, setVaults);
    return () => unsub();
  }, [user, isDemoMode]);
  reactExports.useEffect(() => {
    if (!selectedVault?.id) {
      setLiveVault(null);
      return;
    }
    const unsub = subscribeToVault(selectedVault.id, setLiveVault);
    return () => unsub();
  }, [selectedVault?.id]);
  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("vault-onboarded", "true");
  };
  if (isDemoMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-4 block", children: "🏦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white mb-2", children: "Squad Vault" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Sign up to create a savings vault with your crew!" })
    ] });
  }
  if (showOnboarding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-purple-900 to-gray-900 border border-purple-500/30 rounded-3xl p-8 text-center max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4 block", children: "🏦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "Squad Vault" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-200 mb-6", children: "Like a sou sou but for carnival. Save together, pay costume on time, no awkward texts." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 text-left mb-6", children: [
        { icon: "👥", title: "Invite Crew", desc: "2–10 people" },
        { icon: "💰", title: "Auto-Save", desc: "$100 every Friday" },
        { icon: "🔒", title: "Safe Vault", desc: "FDIC-insured via Stripe" },
        { icon: "🎭", title: "1-Click Pay", desc: "Direct to costume vendor" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-800/30 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-bold mt-1", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-300 text-xs", children: item.desc })
      ] }, item.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: dismissOnboarding, className: "w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity", children: "Got it — Show me Vaults" })
    ] }) });
  }
  if (selectedVault && liveVault) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VaultDetail, { vault: liveVault, user, onBack: () => setSelectedVault(null) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: "🏦 Squad Vaults" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowCreate(true),
          className: "px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-colors",
          children: "+ New Vault"
        }
      )
    ] }),
    vaults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800/50 border border-dashed border-gray-600 rounded-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3 block", children: "🎭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg mb-2", children: "No vaults yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Create a savings vault with your carnival crew. Pool money, pay costume on time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowCreate(true), className: "px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors", children: "Start My Vault — Free" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: vaults.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(VaultCard, { vault: v, onSelect: setSelectedVault }, v.id)) }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateVaultModal, { user, onClose: () => setShowCreate(false), onCreated: (result) => {
      console.log("Vault created:", result);
    } })
  ] });
}
export {
  SquadVault as default
};
