import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { d as db, L as Loader2, S as Share2, U as Users, I as TrendingUp, X, J as Camera, T as Trash2, s as storage, g as getFunctions, e as app, h as httpsCallable, K as auth } from "./index-CXUot43X.js";
import { a7 as signOut } from "./vendor-firebase-core-DHwGrt-V.js";
import { o as onSnapshot, d as doc, q as query, w as where, c as collection, a as addDoc, T as Timestamp, h as getDoc, s as setDoc, r as ref, u as uploadBytes, g as getDownloadURL } from "./vendor-firebase-data-O6IN0zfq.js";
import { A as Award } from "./award-DJfbIRpy.js";
import { C as Check } from "./check-LoUvj2UR.js";
import { C as Copy } from "./copy-DeHw19Y5.js";
import { D as DollarSign } from "./dollar-sign-Dk8Yf5wG.js";
import { U as User } from "./user-B1jUIL0e.js";
import { S as Save } from "./save-DAefmSza.js";
import { P as Pen } from "./pen-BlIHjA5h.js";
import { A as AlertTriangle } from "./alert-triangle-eo7cw2j4.js";
import "./vendor-maps-DCMhh9kT.js";
const APP_ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://carnival-planner.web.app";
function AffiliateDashboard({ user }) {
  const [affiliateData, setAffiliateData] = reactExports.useState(null);
  const [conversions, setConversions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [copied, setCopied] = reactExports.useState(false);
  const [applying, setApplying] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, "affiliates", user.uid), (snap) => {
      if (snap.exists()) {
        setAffiliateData({ id: snap.id, ...snap.data() });
      } else {
        setAffiliateData(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [user?.uid]);
  reactExports.useEffect(() => {
    if (!affiliateData?.affiliateCode) return;
    const q = query(
      collection(db, "affiliateConversions"),
      where("affiliateCode", "==", affiliateData.affiliateCode)
    );
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.convertedAt?.toMillis?.() || 0) - (a.convertedAt?.toMillis?.() || 0));
      setConversions(list);
    });
    return () => unsub();
  }, [affiliateData?.affiliateCode]);
  const handleCopy = () => {
    if (!affiliateData?.affiliateCode) return;
    const link = `${APP_ORIGIN}?ref=${affiliateData.affiliateCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleShare = () => {
    if (!affiliateData?.affiliateCode) return;
    const link = `${APP_ORIGIN}?ref=${affiliateData.affiliateCode}`;
    if (navigator.share) {
      navigator.share({
        title: "Caribbean Carnival Planner",
        text: "Plan your carnival experience with me! Use my link to sign up:",
        url: link
      }).catch(() => {
      });
    } else {
      handleCopy();
    }
  };
  const handleApply = async () => {
    if (!user) return;
    setApplying(true);
    try {
      const baseName = (user.displayName || user.email?.split("@")[0] || "user").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8);
      const code = `${baseName}${Math.floor(Math.random() * 1e3).toString().padStart(3, "0")}`;
      await addDoc(collection(db, "affiliates"), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email,
        affiliateCode: code,
        commissionRate: 0.2,
        // 20% default
        status: "pending",
        totalEarnings: 0,
        totalConversions: 0,
        appliedAt: Timestamp.now()
      });
    } catch (err) {
      console.error("Apply error:", err);
      alert("Failed to apply: " + err.message);
    }
    setApplying(false);
  };
  const totalEarnings = conversions.reduce((s, c) => s + (c.commission || 0), 0);
  const pendingEarnings = conversions.filter((c) => c.payoutStatus !== "paid").reduce((s, c) => s + (c.commission || 0), 0);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-6 h-6 animate-spin text-purple-500" }) });
  }
  if (!affiliateData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto text-center space-y-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Become a Carnival Ambassador" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: [
        "Share your unique referral link with your squad. When someone signs up for Premium using your link, you earn ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-purple-500", children: "20% commission" }),
        " on their first payment."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-left space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "How it works:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-600 dark:text-gray-400 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Share your unique referral link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Your friend signs up and goes Premium ($4.99/mo or $39.99/yr)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• You earn 20% commission on their first payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Commissions are paid out monthly" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleApply,
          disabled: applying,
          className: "px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2 mx-auto",
          children: applying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
            " Applying..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }),
            " Apply to Join"
          ] })
        }
      )
    ] });
  }
  if (affiliateData.status === "pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto text-center space-y-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 text-yellow-600 dark:text-yellow-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Application Under Review" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Your affiliate application is being reviewed. You'll get access to your referral link once approved." })
    ] });
  }
  if (affiliateData.status === "rejected") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto text-center space-y-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Your application was not approved at this time. Contact support for details." }) });
  }
  const referralLink = `${APP_ORIGIN}?ref=${affiliateData.affiliateCode}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-purple-500" }),
        "Affiliate Dashboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
        "Code: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-purple-600", children: affiliateData.affiliateCode }),
        " · ",
        ((affiliateData.commissionRate || 0.2) * 100).toFixed(0),
        "% commission"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 mb-2", children: "Your Referral Link" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            readOnly: true,
            value: referralLink,
            className: "flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCopy,
            className: `p-2 rounded-lg transition ${copied ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"}`,
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleShare,
            className: "p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Conversions", value: conversions.length, icon: Users, color: "text-blue-500" },
      { label: "Total Earned", value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: "text-green-500" },
      { label: "Pending", value: `$${pendingEarnings.toFixed(2)}`, icon: TrendingUp, color: "text-orange-500" },
      { label: "Commission", value: `${((affiliateData.commissionRate || 0.2) * 100).toFixed(0)}%`, icon: Award, color: "text-purple-500" }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-4 h-4 ${stat.color} mb-1` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-gray-800 dark:text-white", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: stat.label })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-gray-800 dark:text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-green-500" }),
        "Conversion History"
      ] }) }),
      conversions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-200 dark:divide-gray-600", children: conversions.map((conv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: conv.subscriberEmail ? conv.subscriberEmail.replace(/(.{2}).*(@)/, "$1***$2") : "Premium Signup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
            conv.convertedAt?.toDate?.().toLocaleDateString() || "N/A",
            conv.plan && ` · ${conv.plan}`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-green-600 dark:text-green-400", children: [
            "+$",
            (conv.commission || 0).toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs font-medium ${conv.payoutStatus === "paid" ? "text-green-500" : "text-orange-500"}`, children: conv.payoutStatus === "paid" ? "Paid" : "Pending" })
        ] })
      ] }, conv.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 mx-auto mb-2 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No conversions yet — share your referral link!" })
      ] })
    ] })
  ] });
}
function AccountSettings({ user, onClose }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = reactExports.useState("");
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [profile, setProfile] = reactExports.useState({
    displayName: "",
    bio: "",
    avatarUrl: ""
  });
  const [isEditingProfile, setIsEditingProfile] = reactExports.useState(false);
  const [isSavingProfile, setIsSavingProfile] = reactExports.useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = reactExports.useState(false);
  const [profileSuccess, setProfileSuccess] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      try {
        const profileRef = doc(db, "users", user.uid, "profile", "info");
        const snap = await getDoc(profileRef);
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            displayName: data.displayName || user.displayName || "",
            bio: data.bio || "",
            avatarUrl: data.avatarUrl || user.photoURL || ""
          });
        } else {
          setProfile({
            displayName: user.displayName || "",
            bio: "",
            avatarUrl: user.photoURL || ""
          });
        }
      } catch (err) {
        console.log("Could not load profile:", err);
      }
    };
    loadProfile();
  }, [user]);
  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    setError("");
    try {
      const profileRef = doc(db, "users", user.uid, "profile", "info");
      await setDoc(profileRef, {
        displayName: profile.displayName,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        updatedAt: Timestamp.now()
      }, { merge: true });
      setIsEditingProfile(false);
      setProfileSuccess("Profile saved!");
      setTimeout(() => setProfileSuccess(""), 3e3);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Could not save profile. Please try again.");
    } finally {
      setIsSavingProfile(false);
    }
  };
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Image too large. Max 2MB.");
      return;
    }
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, GIF, or WebP image.");
      return;
    }
    setIsUploadingAvatar(true);
    setError("");
    try {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop();
      const storagePath = `avatars/${user.uid}/${timestamp}.${ext}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setProfile((prev) => ({ ...prev, avatarUrl: downloadUrl }));
      const profileRef = doc(db, "users", user.uid, "profile", "info");
      await setDoc(profileRef, {
        avatarUrl: downloadUrl,
        updatedAt: Timestamp.now()
      }, { merge: true });
      setProfileSuccess("Avatar updated!");
      setTimeout(() => setProfileSuccess(""), 3e3);
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError("Could not upload avatar. Please try again.");
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }
    setIsDeleting(true);
    setError("");
    try {
      const functions = getFunctions(app);
      const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");
      await deleteUserAccount();
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting account:", err);
      setError(err.message || "Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-800 dark:text-white", children: "Account Settings" }),
      onClose && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
    ] }),
    profileSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm", children: profileSuccess }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center", children: profile.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatarUrl, alt: "Avatar", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-gray-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              onChange: handleAvatarUpload,
              className: "hidden",
              id: "avatar-upload"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "avatar-upload",
              className: "absolute -bottom-1 -right-1 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition",
              children: isUploadingAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: isEditingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Display Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: profile.displayName,
                onChange: (e) => setProfile((prev) => ({ ...prev, displayName: e.target.value })),
                placeholder: "Your name",
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
                maxLength: 50
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: profile.bio,
                onChange: (e) => setProfile((prev) => ({ ...prev, bio: e.target.value })),
                placeholder: "Tell us about yourself...",
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none",
                rows: 3,
                maxLength: 200
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
              profile.bio.length,
              "/200"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleSaveProfile,
                disabled: isSavingProfile,
                className: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50",
                children: [
                  isSavingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  "Save"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsEditingProfile(false),
                className: "px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500",
                children: "Cancel"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-gray-800 dark:text-white mb-1", children: profile.displayName || "No name set" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-2", children: user?.email }),
          profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-3", children: profile.bio }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setIsEditingProfile(true),
              className: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" }),
                "Edit Profile"
              ]
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-gray-800 dark:text-white font-bold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-purple-500" }),
          "Affiliate Program"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateDashboard, { user })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-red-600 dark:text-red-400 font-bold mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-5 h-5" }),
          "Danger Zone"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: "Permanently delete your account and all associated data. This action cannot be undone." }),
        !showDeleteConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowDeleteConfirm(true),
            className: "flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              "Delete My Account"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600 dark:text-red-400 mb-3", children: "This will permanently delete:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-red-500 dark:text-red-400 list-disc list-inside mb-4 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All your carnival plans and data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Uploaded photos and documents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Squad memberships" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your account and login" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: [
            "Type ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded", children: "DELETE" }),
            " to confirm:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: deleteConfirmText,
              onChange: (e) => setDeleteConfirmText(e.target.value),
              placeholder: "Type DELETE",
              className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText("");
                  setError("");
                },
                disabled: isDeleting,
                className: "flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleDeleteAccount,
                disabled: isDeleting || deleteConfirmText !== "DELETE",
                className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50",
                children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
                  "Deleting..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                  "Delete Forever"
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AccountSettings as default
};
