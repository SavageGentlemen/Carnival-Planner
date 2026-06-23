import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as collection, o as onSnapshot, a as addDoc, T as Timestamp, f as deleteDoc, d as doc, r as ref, u as uploadBytes, g as getDownloadURL, b as updateDoc, e as deleteObject, q as query, i as orderBy, w as where, j as getDocs, s as setDoc } from "./vendor-firebase-data-O6IN0zfq.js";
import { c as createLucideIcon, d as db, m as Eye, I as TrendingUp, L as Loader2, E as ExternalLink, T as Trash2, s as storage, U as Users, aH as CheckCircle, O as Shield, aI as MessageSquare, aJ as SupportAdmin } from "./index-CXUot43X.js";
import AdminAnalytics from "./AdminAnalytics-DXltPh8y.js";
import AdManager from "./AdManager--nwU2ibm.js";
import { P as Plus } from "./plus-BHAJcjwt.js";
import { I as Image } from "./image-Br-Gm6dl.js";
import { V as Video } from "./video-B7OFzPXm.js";
import { T as ToggleRight, a as ToggleLeft } from "./toggle-right-70YlzWSB.js";
import { B as BarChart3, L as LayoutDashboard } from "./layout-dashboard-PsRkJ6OY.js";
import { S as Search } from "./search-DRRdb94Y.js";
import { X as XCircle } from "./x-circle-C5hETfQ-.js";
import { A as Award } from "./award-DJfbIRpy.js";
import { A as AlertTriangle } from "./alert-triangle-eo7cw2j4.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./AdminCleanup-D3SnuILQ.js";
import "./shield-alert-IiPvvEM9.js";
import "./check-LoUvj2UR.js";
import "./crown-i0HipylQ.js";
import "./chevron-down-BKwfjrDe.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Building2 = createLucideIcon("Building2", [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Megaphone = createLucideIcon("Megaphone", [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MousePointer = createLucideIcon("MousePointer", [
  ["path", { d: "m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z", key: "y2ucgo" }],
  ["path", { d: "m13 13 6 6", key: "1nhxnf" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Percent = createLucideIcon("Percent", [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PiggyBank = createLucideIcon("PiggyBank", [
  [
    "path",
    {
      d: "M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z",
      key: "uf6l00"
    }
  ],
  ["path", { d: "M2 9v1c0 1.1.9 2 2 2h1", key: "nm575m" }],
  ["path", { d: "M16 11h0", key: "k2aug8" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Settings = createLucideIcon("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Target = createLucideIcon("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);
const AD_ZONES = {
  "banner-top": { label: "Top Banner", size: "728x90" },
  "sidebar-right": { label: "Sidebar Right", size: "300x250" },
  "inline-feed": { label: "Inline (Between Sections)", size: "468x60" },
  "fete-map": { label: "Fete Map Overlay", size: "320x50" }
};
function subscribeToSponsoredAds(callback) {
  const adsRef = collection(db, "sponsoredAds");
  return onSnapshot(adsRef, (snapshot) => {
    const ads = [];
    snapshot.forEach((d) => ads.push({ id: d.id, ...d.data() }));
    ads.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    callback(ads);
  });
}
function subscribeToAdvertisers(callback) {
  const ref2 = collection(db, "advertisers");
  return onSnapshot(ref2, (snapshot) => {
    const list = [];
    snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
    list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    callback(list);
  });
}
const VIEWS = ["campaigns", "advertisers", "analytics"];
function SponsorshipManager() {
  const [view, setView] = reactExports.useState("campaigns");
  const [ads, setAds] = reactExports.useState([]);
  const [advertisers, setAdvertisers] = reactExports.useState([]);
  const [showCampaignForm, setShowCampaignForm] = reactExports.useState(false);
  const [showAdvertiserForm, setShowAdvertiserForm] = reactExports.useState(false);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [uploadStatus, setUploadStatus] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const [newCampaign, setNewCampaign] = reactExports.useState({
    title: "",
    linkUrl: "",
    zone: "banner-top",
    advertiserId: "",
    startDate: "",
    endDate: "",
    impressionCap: "",
    weight: 1
  });
  const [newAdvertiser, setNewAdvertiser] = reactExports.useState({
    name: "",
    contact: "",
    email: "",
    notes: "",
    budget: ""
  });
  reactExports.useEffect(() => {
    const unsub1 = subscribeToSponsoredAds(setAds);
    const unsub2 = subscribeToAdvertisers(setAdvertisers);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);
  const handleCreateAdvertiser = async (e) => {
    e.preventDefault();
    if (!newAdvertiser.name.trim()) return;
    try {
      await addDoc(collection(db, "advertisers"), {
        ...newAdvertiser,
        budget: newAdvertiser.budget ? parseFloat(newAdvertiser.budget) : 0,
        createdAt: Timestamp.now()
      });
      setNewAdvertiser({ name: "", contact: "", email: "", notes: "", budget: "" });
      setShowAdvertiserForm(false);
    } catch (err) {
      console.error("Create advertiser error:", err);
      alert("Failed to create advertiser: " + err.message);
    }
  };
  const deleteAdvertiser = async (adv) => {
    if (!confirm(`Delete advertiser "${adv.name}"?`)) return;
    try {
      await deleteDoc(doc(db, "advertisers", adv.id));
    } catch (err) {
      console.error("Delete advertiser error:", err);
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideoFile = file.type.startsWith("video/");
    const maxSize = isVideoFile ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File too large. Max: ${isVideoFile ? "10MB" : "5MB"}.`);
      return;
    }
    setIsUploading(true);
    setUploadStatus("Uploading...");
    try {
      const ts = Date.now();
      const ext = file.name.split(".").pop();
      const path = `sponsoredAds/${ts}.${ext}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const advertiser = advertisers.find((a) => a.id === newCampaign.advertiserId);
      const adData = {
        title: newCampaign.title || "",
        linkUrl: newCampaign.linkUrl || "",
        zone: newCampaign.zone,
        advertiserId: newCampaign.advertiserId || null,
        advertiserName: advertiser?.name || "",
        imageUrl: url,
        mediaType: isVideoFile ? "video" : "image",
        storagePath: path,
        active: true,
        weight: parseInt(newCampaign.weight) || 1,
        impressionCap: newCampaign.impressionCap ? parseInt(newCampaign.impressionCap) : null,
        startDate: newCampaign.startDate ? Timestamp.fromDate(new Date(newCampaign.startDate)) : null,
        endDate: newCampaign.endDate ? Timestamp.fromDate(new Date(newCampaign.endDate)) : null,
        impressions: 0,
        clicks: 0,
        createdAt: Timestamp.now()
      };
      await addDoc(collection(db, "sponsoredAds"), adData);
      alert("Sponsored ad campaign created!");
      setNewCampaign({ title: "", linkUrl: "", zone: "banner-top", advertiserId: "", startDate: "", endDate: "", impressionCap: "", weight: 1 });
      setShowCampaignForm(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to create campaign: " + err.message);
    }
    setIsUploading(false);
    setUploadStatus("");
  };
  const toggleCampaignActive = async (ad) => {
    try {
      await updateDoc(doc(db, "sponsoredAds", ad.id), { active: !ad.active });
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };
  const deleteCampaign = async (ad) => {
    if (!confirm(`Delete campaign "${ad.title || "Untitled"}"?`)) return;
    try {
      if (ad.storagePath) {
        await deleteObject(ref(storage, ad.storagePath)).catch(() => {
        });
      }
      await deleteDoc(doc(db, "sponsoredAds", ad.id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  const totalImpressions = ads.reduce((s, a) => s + (a.impressions || 0), 0);
  const totalClicks = ads.reduce((s, a) => s + (a.clicks || 0), 0);
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : "0.00";
  const activeCampaigns = ads.filter((a) => a.active).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5 text-purple-500" }),
        "Sponsorship Manager"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Sell premium ad space directly to Mas Bands, Promoters & Hotels — keep 100% revenue" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Active Campaigns", value: activeCampaigns, icon: Target, color: "text-purple-500" },
      { label: "Total Impressions", value: totalImpressions.toLocaleString(), icon: Eye, color: "text-blue-500" },
      { label: "Total Clicks", value: totalClicks.toLocaleString(), icon: MousePointer, color: "text-green-500" },
      { label: "CTR", value: `${ctr}%`, icon: TrendingUp, color: "text-orange-500" }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-4 h-4 ${stat.color} mb-1` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-gray-800 dark:text-white", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: stat.label })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1", children: VIEWS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setView(v),
        className: `flex-1 px-3 py-1.5 text-sm font-medium rounded-md capitalize transition ${view === v ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`,
        children: v
      },
      v
    )) }),
    view === "campaigns" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowCampaignForm(!showCampaignForm),
          className: "flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " New Campaign"
          ]
        }
      ),
      showCampaignForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Campaign title",
              value: newCampaign.title,
              onChange: (e) => setNewCampaign({ ...newCampaign, title: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "url",
              placeholder: "Click-through URL",
              value: newCampaign.linkUrl,
              onChange: (e) => setNewCampaign({ ...newCampaign, linkUrl: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: newCampaign.zone,
              onChange: (e) => setNewCampaign({ ...newCampaign, zone: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              children: Object.entries(AD_ZONES).map(([id, z]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: id, children: [
                z.label,
                " (",
                z.size,
                ")"
              ] }, id))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: newCampaign.advertiserId,
              onChange: (e) => setNewCampaign({ ...newCampaign, advertiserId: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Advertiser (optional)" }),
                advertisers.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a.id, children: a.name }, a.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              placeholder: "Start date",
              value: newCampaign.startDate,
              onChange: (e) => setNewCampaign({ ...newCampaign, startDate: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              placeholder: "End date",
              value: newCampaign.endDate,
              onChange: (e) => setNewCampaign({ ...newCampaign, endDate: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              placeholder: "Impression cap (optional)",
              value: newCampaign.impressionCap,
              onChange: (e) => setNewCampaign({ ...newCampaign, impressionCap: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              placeholder: "Weight (1-10)",
              min: "1",
              max: "10",
              value: newCampaign.weight,
              onChange: (e) => setNewCampaign({ ...newCampaign, weight: e.target.value }),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*,video/mp4,video/webm",
            onChange: handleFileUpload,
            className: "hidden",
            id: "sponsored-upload"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "sponsored-upload",
            className: `flex flex-col items-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition ${isUploading ? "border-gray-300 bg-gray-50 cursor-not-allowed" : "border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30"}`,
            children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin text-purple-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-600", children: uploadStatus })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-purple-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5 text-purple-500" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-600 font-medium", children: "Upload ad creative" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: "Images max 5MB · Videos max 10MB" })
            ] })
          }
        )
      ] }),
      ads.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ads.map((ad) => {
        const impressions = ad.impressions || 0;
        const clicks = ad.clicks || 0;
        const adCtr = impressions > 0 ? (clicks / impressions * 100).toFixed(1) : "0.0";
        const capPct = ad.impressionCap ? Math.round(impressions / ad.impressionCap * 100) : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-4 p-3 rounded-lg border transition ${ad.active ? "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600" : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60"}`,
            children: [
              ad.mediaType === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: ad.imageUrl, className: "w-20 h-14 object-cover rounded", muted: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ad.imageUrl, alt: ad.title || "Ad", className: "w-20 h-14 object-cover rounded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800 dark:text-white truncate", children: ad.title || "Untitled Campaign" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
                  AD_ZONES[ad.zone]?.label || ad.zone,
                  ad.advertiserName && ` · ${ad.advertiserName}`
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-1 text-xs text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                    " ",
                    impressions.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointer, { className: "w-3 h-3" }),
                    " ",
                    clicks.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    adCtr,
                    "% CTR"
                  ] }),
                  capPct !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: capPct >= 90 ? "text-red-500" : "", children: [
                    capPct,
                    "% of cap"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => toggleCampaignActive(ad),
                    className: `p-2 rounded-lg transition ${ad.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`,
                    title: ad.active ? "Active" : "Inactive",
                    children: ad.active ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-5 h-5" })
                  }
                ),
                ad.linkUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: ad.linkUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => deleteCampaign(ad),
                    className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          ad.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-16 h-16 mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No sponsored campaigns yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Create your first campaign to sell premium ad space" })
      ] })
    ] }),
    view === "advertisers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowAdvertiserForm(!showAdvertiserForm),
          className: "flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Advertiser"
          ]
        }
      ),
      showAdvertiserForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleCreateAdvertiser,
          className: "bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Business name *",
                  required: true,
                  value: newAdvertiser.name,
                  onChange: (e) => setNewAdvertiser({ ...newAdvertiser, name: e.target.value }),
                  className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Contact person",
                  value: newAdvertiser.contact,
                  onChange: (e) => setNewAdvertiser({ ...newAdvertiser, contact: e.target.value }),
                  className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  placeholder: "Email",
                  value: newAdvertiser.email,
                  onChange: (e) => setNewAdvertiser({ ...newAdvertiser, email: e.target.value }),
                  className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  placeholder: "Budget ($)",
                  value: newAdvertiser.budget,
                  onChange: (e) => setNewAdvertiser({ ...newAdvertiser, budget: e.target.value }),
                  className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                placeholder: "Notes",
                rows: 2,
                value: newAdvertiser.notes,
                onChange: (e) => setNewAdvertiser({ ...newAdvertiser, notes: e.target.value }),
                className: "w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium",
                children: "Save Advertiser"
              }
            )
          ]
        }
      ),
      advertisers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: advertisers.map((adv) => {
        const advAds = ads.filter((a) => a.advertiserId === adv.id);
        const advImpressions = advAds.reduce((s, a) => s + (a.impressions || 0), 0);
        const advClicks = advAds.reduce((s, a) => s + (a.clicks || 0), 0);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-gray-800 dark:text-white flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-purple-500" }),
                  adv.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                  adv.contact && `${adv.contact} · `,
                  adv.email && `${adv.email} · `,
                  advAds.length,
                  " campaign",
                  advAds.length !== 1 ? "s" : "",
                  adv.budget ? ` · $${adv.budget} budget` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-1 text-xs text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    advImpressions.toLocaleString(),
                    " impressions"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    advClicks.toLocaleString(),
                    " clicks"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => deleteAdvertiser(adv),
                  className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          },
          adv.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-16 h-16 mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No advertisers yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Add Mas Bands, Promoters, or Hotels as advertisers" })
      ] })
    ] }),
    view === "analytics" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "w-4 h-4 text-purple-500" }),
        "Campaign Performance"
      ] }),
      ads.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Campaign" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium", children: "Zone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium text-right", children: "Impressions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium text-right", children: "Clicks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium text-right", children: "CTR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 font-medium text-right", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y dark:divide-gray-600", children: ads.map((ad) => {
          const imp = ad.impressions || 0;
          const clk = ad.clicks || 0;
          const r = imp > 0 ? (clk / imp * 100).toFixed(2) : "0.00";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-gray-700 dark:text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 truncate max-w-[120px]", children: ad.title || "Untitled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-xs", children: AD_ZONES[ad.zone]?.label || ad.zone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-mono", children: imp.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right font-mono", children: clk.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right font-mono", children: [
              r,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ad.active ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`, children: ad.active ? "Active" : "Paused" }) })
          ] }, ad.id);
        }) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-center py-6", children: "No campaign data yet" })
    ] }) })
  ] });
}
function AffiliateManager() {
  const [affiliates, setAffiliates] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  reactExports.useEffect(() => {
    const q = query(collection(db, "affiliates"), orderBy("appliedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setAffiliates(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const handleUpdateStatus = async (id, newStatus) => {
    if (!confirm(`Are you sure you want to mark this affiliate as ${newStatus}?`)) return;
    try {
      await updateDoc(doc(db, "affiliates", id), {
        status: newStatus
      });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };
  const handleUpdateCommission = async (id, currentRate) => {
    const newRateRaw = prompt(`Enter new commission rate (e.g., 25 for 25%):`, (currentRate * 100).toFixed(0));
    if (!newRateRaw) return;
    const newRate = parseFloat(newRateRaw) / 100;
    if (isNaN(newRate) || newRate < 0 || newRate > 1) {
      alert("Invalid rate. Please enter a number between 0 and 100.");
      return;
    }
    try {
      await updateDoc(doc(db, "affiliates", id), {
        commissionRate: newRate
      });
    } catch (err) {
      console.error("Error updating commission:", err);
      alert("Failed to update commission rate.");
    }
  };
  const filteredAffiliates = affiliates.filter((a) => {
    const matchesSearch = (a.displayName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || (a.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || (a.affiliateCode?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-gray-500", children: "Loading Affiliates..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-purple-600" }),
        "Affiliate Management"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Review applications, set commission rates, and track ambassador performance." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search by name, email, or code...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm dark:text-white"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm dark:text-white",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rejected", children: "Rejected" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm whitespace-nowrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium", children: "Ambassador" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium", children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium", children: "Performance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium", children: "Comm. Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700/50", children: [
        filteredAffiliates.map((affiliate) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-gray-900 dark:text-white", children: affiliate.displayName || "Unknown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: affiliate.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md", children: affiliate.affiliateCode }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
            affiliate.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-3 h-3" }),
              " Approved"
            ] }),
            affiliate.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
              " Pending"
            ] }),
            affiliate.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(XCircle, { className: "w-3 h-3" }),
              " Rejected"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-900 dark:text-white font-medium", children: [
              "$",
              (affiliate.totalEarnings || 0).toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [
              affiliate.totalConversions || 0,
              " conversions"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleUpdateCommission(affiliate.id, affiliate.commissionRate || 0.2),
              className: "group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  ((affiliate.commissionRate || 0.2) * 100).toFixed(0),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            affiliate.status !== "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleUpdateStatus(affiliate.id, "approved"),
                className: "p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition",
                title: "Approve Affiliate",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-4 h-4" })
              }
            ),
            affiliate.status !== "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleUpdateStatus(affiliate.id, "rejected"),
                className: "p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition",
                title: "Reject Affiliate",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(XCircle, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ] }, affiliate.id)),
        filteredAffiliates.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: "6", className: "px-6 py-12 text-center text-gray-500 dark:text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No affiliates found matching your criteria." })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = reactExports.useState("Overview");
  const [isSuperAdmin, setIsSuperAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!user) return;
    if (user.email === "djkrss1@gmail.com") {
      setIsSuperAdmin(true);
    }
    setLoading(false);
  }, [user]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-gray-500", children: "Loading Admin Dashboard..." });
  }
  const tabs = [
    { id: "Overview", label: "Overview", icon: LayoutDashboard },
    { id: "Ads", label: "Ad Manager", icon: Megaphone },
    { id: "Sponsorships", label: "Sponsorships", icon: Target },
    { id: "Affiliates", label: "Affiliates", icon: Users },
    { id: "Vaults", label: "Vaults", icon: PiggyBank },
    { id: "Support", label: "Support", icon: MessageSquare },
    { id: "Settings", label: "Admins", icon: Settings }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 min-h-screen rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 text-white p-4 md:p-6 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "text-pink-500" }),
          "Admin Console"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "Manage your entire carnival platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "bg-pink-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "w-4 h-4" }),
            tab.label
          ]
        },
        tab.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      activeTab === "Overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminAnalytics, {}),
      activeTab === "Ads" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdManager, {}),
      activeTab === "Sponsorships" && /* @__PURE__ */ jsxRuntimeExports.jsx(SponsorshipManager, {}),
      activeTab === "Affiliates" && /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateManager, {}),
      activeTab === "Vaults" && /* @__PURE__ */ jsxRuntimeExports.jsx(VaultAdmin, {}),
      activeTab === "Support" && /* @__PURE__ */ jsxRuntimeExports.jsx(SupportAdmin, {}),
      activeTab === "Settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdminManagement, { user, isSuperAdmin })
    ] })
  ] });
}
function VaultAdmin() {
  const [vaults, setVaults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [processingId, setProcessingId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "vaults"), orderBy("createdAt", "desc")),
      (snap) => {
        setVaults(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("Vault admin query failed:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);
  const handleFreeze = async (vaultId) => {
    if (!confirm("Freeze this vault?")) return;
    setProcessingId(vaultId);
    try {
      await updateDoc(doc(db, "vaults", vaultId), { status: "frozen", frozenReason: "Admin freeze", updatedAt: Timestamp.now() });
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessingId(null);
    }
  };
  const handleClose = async (vaultId) => {
    if (!confirm("Close this vault permanently?")) return;
    setProcessingId(vaultId);
    try {
      await updateDoc(doc(db, "vaults", vaultId), { status: "closed", updatedAt: Timestamp.now() });
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessingId(null);
    }
  };
  const totalGMV = vaults.reduce((sum, v) => sum + (v.totalSaved || 0), 0);
  const feeRevenue = vaults.reduce((sum, v) => sum + (v.totalPayouts || 0) * 0.019, 0);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin mx-auto text-pink-500" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      { label: "Total Vaults", value: vaults.length, color: "purple" },
      { label: "Active", value: vaults.filter((v) => v.status === "active").length, color: "green" },
      { label: "Total Saved (GMV)", value: `$${totalGMV.toLocaleString()}`, color: "blue" },
      { label: "Est. Fee Revenue", value: `$${feeRevenue.toFixed(2)}`, color: "yellow" }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border border-${stat.color}-200 dark:border-${stat.color}-800 rounded-xl p-4`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 uppercase font-bold", children: stat.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-black text-${stat.color}-600 dark:text-${stat.color}-400`, children: stat.value })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 dark:border-gray-700 text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4", children: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4", children: "Members" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4", children: "Saved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4", children: "Goal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 pr-4", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: vaults.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 font-medium dark:text-white", children: v.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-gray-500 text-xs", children: v.adminEmail || "N/A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 dark:text-gray-300", children: v.memberCount || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 pr-4 text-green-600 dark:text-green-400 font-bold", children: [
          "$",
          (v.totalSaved || 0).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 pr-4 dark:text-gray-300", children: [
          "$",
          (v.goalAmount || 0).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${v.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : v.status === "frozen" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"}`, children: v.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: processingId === v.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          v.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleFreeze(v.id), className: "px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400", children: "Freeze" }),
          v.status !== "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleClose(v.id), className: "px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400", children: "Close" })
        ] }) })
      ] }, v.id)) })
    ] }) }),
    vaults.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-500 py-8", children: "No vaults created yet." })
  ] });
}
function AdminManagement({ user, isSuperAdmin }) {
  const [admins, setAdmins] = reactExports.useState([]);
  const [newAdminEmail, setNewAdminEmail] = reactExports.useState("");
  const [adding, setAdding] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "admins"),
      (snap) => {
        setAdmins(snap.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("AdminManagement query failed:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    setAdding(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", newAdminEmail));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert("User not found! They must log in to the app at least once.");
        setAdding(false);
        return;
      }
      const targetUserDoc = querySnapshot.docs[0];
      const targetUid = targetUserDoc.id;
      await setDoc(doc(db, "admins", targetUid), {
        email: newAdminEmail,
        role: "admin",
        addedBy: user.email,
        addedAt: Timestamp.now()
      });
      setNewAdminEmail("");
      alert(`Added ${newAdminEmail} as admin!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add admin: " + err.message);
    } finally {
      setAdding(false);
    }
  };
  const handleRemove = async (adminId) => {
    if (!confirm("Remove this admin? They will lose access immediately.")) return;
    try {
      await deleteDoc(doc(db, "admins", adminId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove admin");
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin mx-auto text-pink-500" }) });
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-600 dark:text-red-400", children: [
    "Failed to load admins: ",
    error
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800 flex gap-3 text-amber-800 dark:text-amber-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold", children: "Access Control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: "Admins have full access to analytics, support messages, and ad management. Only grant this to trusted team members." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4 dark:text-white", children: "Add New Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddAdmin, className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            placeholder: "Enter user email address",
            value: newAdminEmail,
            onChange: (e) => setNewAdminEmail(e.target.value),
            className: "flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-pink-500",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: adding,
            className: "px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 disabled:opacity-50 flex items-center gap-2",
            children: [
              adding ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "animate-spin w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
              "Add Admin"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4 dark:text-white", children: "Current Admins" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 opacity-75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold", children: "D" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold dark:text-white", children: "djkrss1@gmail.com" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-pink-500 font-bold uppercase", children: "Super Admin" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Owner" })
        ] }),
        admins.map((admin) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold", children: admin.email[0].toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold dark:text-white", children: admin.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                "Added by ",
                admin.addedBy?.split("@")[0]
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleRemove(admin.id),
              className: "p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5" })
            }
          )
        ] }, admin.id))
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
