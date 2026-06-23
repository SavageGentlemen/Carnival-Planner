import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { r as ref, u as uploadBytes, g as getDownloadURL, e as deleteObject } from "./vendor-firebase-data-O6IN0zfq.js";
import { c as createLucideIcon, i as Ticket, L as Loader2, X, s as storage, m as Eye, D as Download, T as Trash2 } from "./index-CXUot43X.js";
import { U as Upload } from "./upload-Bxs_UXl5.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ImagePlus = createLucideIcon("ImagePlus", [
  ["path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7", key: "31hg93" }],
  ["line", { x1: "16", x2: "22", y1: "5", y2: "5", key: "ez7e4s" }],
  ["line", { x1: "19", x2: "19", y1: "2", y2: "8", key: "1gkr8c" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
const FILE_TYPES = {
  ticket: { label: "Ticket", icon: Ticket, color: "#F59E0B" },
  photo: { label: "Photo", icon: ImagePlus, color: "#3B82F6" }
};
function MediaVault({ files = [], onFilesChange, carnivalName, carnivalId, userId }) {
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState("");
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [fileType, setFileType] = reactExports.useState("ticket");
  const [fileName, setFileName] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload an image (JPG, PNG, GIF, WebP) or PDF.");
      return;
    }
    setIsUploading(true);
    setUploadProgress("Uploading...");
    try {
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const storagePath = `users/${userId}/carnivals/${carnivalId}/${timestamp}.${fileExtension}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      const newFile = {
        id: timestamp.toString(),
        name: fileName || file.name.split(".")[0],
        type: fileType,
        url: downloadUrl,
        storagePath,
        originalName: file.name,
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
        fileType: file.type
      };
      onFilesChange([...files, newFile]);
      setFileName("");
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    }
    setIsUploading(false);
  };
  const deleteFile = async (fileToDelete) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const storageRef = ref(storage, fileToDelete.storagePath);
      await deleteObject(storageRef);
      onFilesChange(files.filter((f) => f.id !== fileToDelete.id));
    } catch (error) {
      console.error("Delete error:", error);
      onFilesChange(files.filter((f) => f.id !== fileToDelete.id));
    }
  };
  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.originalName || file.name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const tickets = files.filter((f) => f.type === "ticket");
  const photos = files.filter((f) => f.type === "photo");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-5 h-5 text-purple-500" }),
        "Media Vault"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
        "Store your tickets, photos, and important documents for ",
        carnivalName
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-800 dark:text-white mb-3", children: "Upload New File" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "File label (e.g., 'Tribe Costume Receipt')",
              value: fileName,
              onChange: (e) => setFileName(e.target.value),
              className: "flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: fileType,
              onChange: (e) => setFileType(e.target.value),
              className: "px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              children: Object.entries(FILE_TYPES).map(([key, { label }]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: key, children: label }, key))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*,.pdf",
              onChange: handleFileSelect,
              className: "hidden",
              id: "file-upload"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "file-upload",
              className: `flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition ${isUploading ? "border-gray-300 bg-gray-50 dark:bg-gray-800 cursor-not-allowed" : "border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"}`,
              children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin text-purple-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-600 dark:text-purple-400", children: uploadProgress })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-purple-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-600 dark:text-purple-400 font-medium", children: "Click to upload image or PDF (max 10MB)" })
              ] })
            }
          )
        ] })
      ] })
    ] }),
    tickets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-4 h-4 text-yellow-500" }),
        "Tickets (",
        tickets.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: tickets.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx(FileCard, { file, onView: setSelectedFile, onDownload: downloadFile, onDelete: deleteFile }, file.id)) })
    ] }),
    photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-4 h-4 text-blue-500" }),
        "Photos (",
        photos.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: photos.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoCard, { file, onView: setSelectedFile, onDownload: downloadFile, onDelete: deleteFile }, file.id)) })
    ] }),
    files.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500 dark:text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-16 h-16 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No files uploaded yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Upload your tickets, costume receipts, and travel photos" })
    ] }),
    selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4", onClick: () => setSelectedFile(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl max-h-[90vh] w-full", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setSelectedFile(null),
          className: "absolute -top-12 right-0 text-white hover:text-gray-300",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-8 h-8" })
        }
      ),
      selectedFile.fileType === "application/pdf" ? /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: selectedFile.url, className: "w-full h-[80vh] rounded-lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedFile.url, alt: selectedFile.name, className: "max-w-full max-h-[80vh] mx-auto rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-center mt-4 font-medium", children: selectedFile.name })
    ] }) })
  ] });
}
function FileCard({ file, onView, onDownload, onDelete }) {
  const typeConfig = FILE_TYPES[file.type] || FILE_TYPES.ticket;
  const IconComponent = typeConfig.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-lg flex items-center justify-center",
          style: { backgroundColor: `${typeConfig.color}20` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-5 h-5", style: { color: typeConfig.color } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800 dark:text-white", children: file.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: new Date(file.uploadedAt).toLocaleDateString() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onView(file),
          className: "p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onDownload(file),
          className: "p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onDelete(file),
          className: "p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}
function PhotoCard({ file, onView, onDownload, onDelete }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: file.url,
        alt: file.name,
        className: "w-full h-32 object-cover cursor-pointer",
        onClick: () => onView(file)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onView(file),
          className: "p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onDownload(file),
          className: "p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onDelete(file),
          className: "p-2 bg-red-500/50 hover:bg-red-500/70 rounded-full text-white transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate", children: file.name })
  ] });
}
export {
  MediaVault as default
};
