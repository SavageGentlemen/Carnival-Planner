import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as collection, o as onSnapshot, r as ref, u as uploadBytes, g as getDownloadURL, a as addDoc, b as updateDoc, d as doc, e as deleteObject, f as deleteDoc } from "./vendor-firebase-data-O6IN0zfq.js";
import { L as Loader2, E as ExternalLink, T as Trash2, s as storage, d as db } from "./index-CXUot43X.js";
import { I as Image } from "./image-Br-Gm6dl.js";
import { P as Plus } from "./plus-BHAJcjwt.js";
import { V as Video } from "./video-B7OFzPXm.js";
import { T as ToggleRight, a as ToggleLeft } from "./toggle-right-70YlzWSB.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
const PLACEMENTS = [
  { id: "banner", label: "Top Banner" },
  { id: "sidebar", label: "Sidebar" },
  { id: "inline", label: "Inline (Between Sections)" }
];
function AdManager() {
  const [ads, setAds] = reactExports.useState([]);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [uploadStatus, setUploadStatus] = reactExports.useState("");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newAd, setNewAd] = reactExports.useState({
    title: "",
    linkUrl: "",
    placement: "banner"
  });
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const adsRef = collection(db, "promoAds");
    const unsubscribe = onSnapshot(adsRef, (snapshot) => {
      const adsList = [];
      snapshot.forEach((doc2) => {
        adsList.push({ id: doc2.id, ...doc2.data() });
      });
      adsList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setAds(adsList);
    });
    return () => unsubscribe();
  }, []);
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const maxSize = isVideo ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File too large. Maximum size is ${isVideo ? "10MB for videos" : "5MB for images"}.`);
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const validVideoTypes = ["video/mp4", "video/webm"];
    const validTypes = [...validImageTypes, ...validVideoTypes];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload JPG, PNG, GIF, WebP, MP4, or WebM.");
      return;
    }
    setIsUploading(true);
    setUploadStatus("Preparing upload...");
    const uploadTimeout = setTimeout(() => {
      setIsUploading(false);
      setUploadStatus("");
      alert("Upload timed out after 60 seconds. Please check your connection and try again.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 6e4);
    try {
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const storagePath = `promoAds/${timestamp}.${fileExtension}`;
      const storageRef = ref(storage, storagePath);
      setUploadStatus("Uploading to storage...");
      console.log("Uploading file to Storage...", storagePath);
      await uploadBytes(storageRef, file);
      setUploadStatus("Getting download URL...");
      const downloadUrl = await getDownloadURL(storageRef);
      console.log("File uploaded, URL:", downloadUrl);
      const isVideoFile = file.type.startsWith("video/");
      const adData = {
        title: newAd.title || "",
        linkUrl: newAd.linkUrl || "",
        placement: newAd.placement,
        imageUrl: downloadUrl,
        mediaType: isVideoFile ? "video" : "image",
        storagePath,
        active: true,
        createdAt: timestamp
      };
      setUploadStatus("Saving ad data...");
      console.log("Saving ad metadata to Firestore...", adData);
      const docRef = await addDoc(collection(db, "promoAds"), adData);
      console.log("Ad saved to Firestore successfully, ID:", docRef.id);
      clearTimeout(uploadTimeout);
      alert("Ad uploaded successfully!");
      setNewAd({ title: "", linkUrl: "", placement: "banner" });
      setShowForm(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      clearTimeout(uploadTimeout);
      console.error("Upload error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Full error:", JSON.stringify(error, null, 2));
      if (error.code === "storage/unauthorized") {
        alert("Upload failed: You do not have permission to upload ads. Make sure you are logged in with the admin account (djkrss1@gmail.com).");
      } else if (error.code === "storage/canceled") {
        alert("Upload was cancelled.");
      } else if (error.code === "permission-denied") {
        alert("Firestore permission denied: You do not have permission to save ad metadata. Make sure you are logged in with the admin account (djkrss1@gmail.com).");
      } else {
        alert(`Failed to upload ad: ${error.code || "Unknown error"} - ${error.message || "Please try again."}`);
      }
    }
    setIsUploading(false);
    setUploadStatus("");
  };
  const toggleAdActive = async (ad) => {
    try {
      await updateDoc(doc(db, "promoAds", ad.id), {
        active: !ad.active
      });
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };
  const deleteAd = async (ad) => {
    if (!confirm("Delete this ad?")) return;
    try {
      if (ad.storagePath) {
        const storageRef = ref(storage, ad.storagePath);
        await deleteObject(storageRef).catch(() => {
        });
      }
      await deleteDoc(doc(db, "promoAds", ad.id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-orange-500" }),
          "Ad Manager"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Upload promotional ads and flyers for free users" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowForm(!showForm),
          className: "flex items-center gap-1 px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "New Ad"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Ad title (optional)",
            value: newAd.title,
            onChange: (e) => setNewAd({ ...newAd, title: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "url",
            placeholder: "Link URL (optional) - where to go when clicked",
            value: newAd.linkUrl,
            onChange: (e) => setNewAd({ ...newAd, linkUrl: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: newAd.placement,
            onChange: (e) => setNewAd({ ...newAd, placement: e.target.value }),
            className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white",
            children: PLACEMENTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.label }, p.id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*,video/mp4,video/webm",
          onChange: handleFileSelect,
          className: "hidden",
          id: "ad-upload"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "ad-upload",
          className: `flex flex-col items-center justify-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition ${isUploading ? "border-gray-300 bg-gray-50 cursor-not-allowed" : "border-orange-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30"}`,
          children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin text-orange-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-600", children: uploadStatus || "Uploading..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5 text-orange-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-600 font-medium", children: "Click to upload image or video" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Images: max 5MB (1200x300 recommended) | Videos: max 10MB (MP4, WebM)" })
          ] })
        }
      )
    ] }),
    ads.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ads.map((ad) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-4 p-3 rounded-lg border transition ${ad.active ? "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600" : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60"}`,
        children: [
          ad.mediaType === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: ad.imageUrl,
              className: "w-20 h-14 object-cover rounded",
              muted: true
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ad.imageUrl,
              alt: ad.title || "Ad",
              className: "w-20 h-14 object-cover rounded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800 dark:text-white truncate", children: ad.title || "Untitled Ad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
              PLACEMENTS.find((p) => p.id === ad.placement)?.label || ad.placement,
              ad.linkUrl && " • Has link"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleAdActive(ad),
                className: `p-2 rounded-lg transition ${ad.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`,
                title: ad.active ? "Active - Click to disable" : "Inactive - Click to enable",
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
                onClick: () => deleteAd(ad),
                className: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      ad.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-16 h-16 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No ads uploaded yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Upload flyers and promotions to show to free users" })
    ] })
  ] });
}
export {
  AdManager as default
};
