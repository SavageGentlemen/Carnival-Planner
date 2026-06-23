import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { r as ref, u as uploadBytes, g as getDownloadURL, f as deleteDoc, d as doc, s as setDoc, T as Timestamp, h as getDoc } from "./vendor-firebase-data-O6IN0zfq.js";
import { c as createLucideIcon, X, J as Camera, L as Loader2, M as Music, W as Wallet, E as ExternalLink, N as Globe, O as Shield, s as storage, d as db } from "./index-CXUot43X.js";
import { I as Instagram, T as Twitter, t as truncateAddress, g as getExplorerUrl, i as isWalletAvailable, c as connectExternalWallet, s as saveWalletAddress } from "./web3Service-HPXyfGxN.js";
import { U as User } from "./user-B1jUIL0e.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import { C as Check } from "./check-LoUvj2UR.js";
import { C as Copy } from "./copy-DeHw19Y5.js";
import { C as ChevronDown } from "./chevron-down-BKwfjrDe.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Link2 = createLucideIcon("Link2", [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
]);
function ProfileEditor({
  user,
  currentProfile,
  onSave,
  onClose,
  carnivals
  // User's carnival data to extract history
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [usernameError, setUsernameError] = reactExports.useState("");
  const [checkingUsername, setCheckingUsername] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    displayName: "",
    username: "",
    bio: "",
    isPublic: false,
    socialLinks: {
      instagram: "",
      twitter: "",
      tiktok: ""
    }
  });
  const [profilePhoto, setProfilePhoto] = reactExports.useState(null);
  const [coverPhoto, setCoverPhoto] = reactExports.useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = reactExports.useState("");
  const [coverPhotoPreview, setCoverPhotoPreview] = reactExports.useState("");
  const [walletAddress, setWalletAddress] = reactExports.useState(currentProfile?.walletAddress || "");
  const [walletConnecting, setWalletConnecting] = reactExports.useState(false);
  const [walletError, setWalletError] = reactExports.useState("");
  const [walletCopied, setWalletCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (currentProfile) {
      setFormData({
        displayName: currentProfile.displayName || user?.displayName || "",
        username: currentProfile.username || "",
        bio: currentProfile.bio || "",
        isPublic: currentProfile.isPublic || false,
        socialLinks: {
          instagram: currentProfile.socialLinks?.instagram || "",
          twitter: currentProfile.socialLinks?.twitter || "",
          tiktok: currentProfile.socialLinks?.tiktok || ""
        }
      });
      setProfilePhotoPreview(currentProfile.profilePhoto || "");
      setCoverPhotoPreview(currentProfile.coverPhoto || "");
    } else {
      setFormData((prev) => ({
        ...prev,
        displayName: user?.displayName || ""
      }));
    }
  }, [currentProfile, user]);
  const validateUsername = async (username) => {
    if (!username) {
      setUsernameError("");
      return true;
    }
    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError("3-20 chars, lowercase letters, numbers, underscores only");
      return false;
    }
    if (currentProfile?.username === username) {
      setUsernameError("");
      return true;
    }
    setCheckingUsername(true);
    try {
      const usernameDoc = await getDoc(doc(db, "usernames", username));
      if (usernameDoc.exists()) {
        setUsernameError("This username is taken");
        setCheckingUsername(false);
        return false;
      }
      setUsernameError("");
      setCheckingUsername(false);
      return true;
    } catch (err) {
      console.error("Error checking username:", err);
      setCheckingUsername(false);
      return true;
    }
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setFormData((prev) => ({ ...prev, username: value }));
    const timeoutId = setTimeout(() => validateUsername(value), 500);
    return () => clearTimeout(timeoutId);
  };
  const handlePhotoSelect = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (type === "profile") {
        setProfilePhoto(file);
        setProfilePhotoPreview(reader.result);
      } else {
        setCoverPhoto(file);
        setCoverPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const extractCarnivalHistory = () => {
    if (!carnivals) return [];
    const history = [];
    Object.entries(carnivals).forEach(([carnivalId, data]) => {
      if (data.costume?.band) {
        history.push({
          carnivalId,
          year: (/* @__PURE__ */ new Date()).getFullYear(),
          // Could be enhanced to track actual year
          band: data.costume.band,
          section: data.costume.section || null
        });
      }
    });
    return history;
  };
  const handleSave = async () => {
    if (!user) return;
    if (formData.username && !await validateUsername(formData.username)) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      let profilePhotoUrl = currentProfile?.profilePhoto || "";
      let coverPhotoUrl = currentProfile?.coverPhoto || "";
      if (profilePhoto) {
        const photoRef = ref(storage, `profiles/${user.uid}/avatar_${Date.now()}`);
        await uploadBytes(photoRef, profilePhoto);
        profilePhotoUrl = await getDownloadURL(photoRef);
      }
      if (coverPhoto) {
        const coverRef = ref(storage, `profiles/${user.uid}/cover_${Date.now()}`);
        await uploadBytes(coverRef, coverPhoto);
        coverPhotoUrl = await getDownloadURL(coverRef);
      }
      const oldUsername = currentProfile?.username;
      const newUsername = formData.username;
      if (oldUsername && oldUsername !== newUsername) {
        await deleteDoc(doc(db, "usernames", oldUsername));
      }
      if (newUsername && newUsername !== oldUsername) {
        await setDoc(doc(db, "usernames", newUsername), {
          userId: user.uid,
          claimedAt: Timestamp.now()
        });
      }
      const carnivalHistory = extractCarnivalHistory();
      const profileData = {
        userId: user.uid,
        displayName: formData.displayName || user.displayName || "Carnival Lover",
        username: formData.username || null,
        bio: formData.bio || "",
        profilePhoto: profilePhotoUrl,
        coverPhoto: coverPhotoUrl,
        isPublic: formData.isPublic,
        socialLinks: formData.socialLinks,
        carnivalHistory,
        walletAddress: walletAddress || null,
        ...walletAddress ? { walletType: "external", walletLinkedAt: Timestamp.now() } : {},
        stats: {
          carnivalsAttended: carnivalHistory.length,
          countriesVisited: [...new Set(carnivalHistory.map((c) => c.carnivalId))].length,
          bandsPlayedWith: [...new Set(carnivalHistory.map((c) => c.band).filter(Boolean))]
        },
        updatedAt: Timestamp.now(),
        ...currentProfile ? {} : { createdAt: Timestamp.now() }
      };
      await setDoc(doc(db, "userProfiles", user.uid), profileData, { merge: true });
      onSave?.(profileData);
      onClose?.();
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Edit Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-gray-500" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500", children: coverPhotoPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: coverPhotoPreview, alt: "Cover", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-gray-700 dark:text-gray-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              onChange: (e) => handlePhotoSelect(e, "cover"),
              className: "hidden"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center -mt-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500", children: profilePhotoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profilePhotoPreview, alt: "Profile", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-white" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "absolute bottom-0 right-0 p-2 bg-purple-500 rounded-full cursor-pointer hover:bg-purple-600 transition-colors shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              onChange: (e) => handlePhotoSelect(e, "profile"),
              className: "hidden"
            }
          )
        ] })
      ] }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 flex-shrink-0" }),
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: formData.displayName,
            onChange: (e) => setFormData((prev) => ({ ...prev, displayName: e.target.value })),
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
            placeholder: "Your carnival name",
            maxLength: 50
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "@" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: formData.username,
              onChange: handleUsernameChange,
              className: `w-full pl-8 pr-10 py-3 rounded-xl border ${usernameError ? "border-red-300 dark:border-red-500" : "border-gray-200 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`,
              placeholder: "your_username",
              maxLength: 20
            }
          ),
          checkingUsername && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" })
        ] }),
        usernameError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-red-500", children: usernameError }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-400", children: [
          "Your public profile URL: carnivalplanner.app/profile/",
          formData.username || "username"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Bio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: formData.bio,
            onChange: (e) => setFormData((prev) => ({ ...prev, bio: e.target.value })),
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none",
            placeholder: "Tell the fete world about your carnival journey... 🎭",
            rows: 3,
            maxLength: 200
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 text-right", children: [
          formData.bio.length,
          "/200"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Social Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: formData.socialLinks.instagram,
              onChange: (e) => setFormData((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, instagram: e.target.value.replace("@", "") }
              })),
              className: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
              placeholder: "Instagram username"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: formData.socialLinks.twitter,
              onChange: (e) => setFormData((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, twitter: e.target.value.replace("@", "") }
              })),
              className: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
              placeholder: "Twitter/X username"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: formData.socialLinks.tiktok,
              onChange: (e) => setFormData((prev) => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, tiktok: e.target.value.replace("@", "") }
              })),
              className: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm",
              placeholder: "TikTok username"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-indigo-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900 dark:text-white text-sm", children: "Carnival Wallet" })
          ] }),
          walletAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" }),
            "Active"
          ] })
        ] }),
        walletAddress ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-3 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-gray-700 dark:text-gray-300 flex-1", children: truncateAddress(walletAddress) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  navigator.clipboard.writeText(walletAddress);
                  setWalletCopied(true);
                  setTimeout(() => setWalletCopied(false), 2e3);
                },
                className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                title: "Copy address",
                children: walletCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 text-gray-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: getExplorerUrl(walletAddress, "address"),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                title: "View on BaseScan",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 text-gray-400" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "Your stamps and achievements are minted to this wallet on the Base network. No gas fees required." }),
          isWalletAvailable() && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 group-open:rotate-180 transition-transform" }),
              "Advanced: Use external wallet"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400", children: "Override with your own MetaMask wallet address." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: async () => {
                    setWalletConnecting(true);
                    setWalletError("");
                    try {
                      const address = await connectExternalWallet();
                      setWalletAddress(address);
                      if (user?.uid) {
                        await saveWalletAddress(user.uid, address, "external");
                      }
                    } catch (err) {
                      setWalletError(err.message);
                    } finally {
                      setWalletConnecting(false);
                    }
                  },
                  disabled: walletConnecting,
                  className: "w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all",
                  children: walletConnecting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }),
                    "Connecting..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5" }),
                    "Connect MetaMask"
                  ] })
                }
              ),
              walletError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-red-500", children: walletError })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 text-indigo-400 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Setting up your wallet..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 text-center", children: "Your carnival wallet is generated automatically. No downloads or crypto needed." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          formData.isPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 dark:text-white text-sm", children: "Public Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Anyone can view your carnival history" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic })),
            className: `relative w-12 h-7 rounded-full transition-colors ${formData.isPublic ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.isPublic ? "translate-x-5" : ""}` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSave,
          disabled: saving || !!usernameError,
          className: "w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
          children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
            "Saving..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }),
            "Save Profile"
          ] })
        }
      )
    ] })
  ] }) });
}
export {
  ProfileEditor as default
};
