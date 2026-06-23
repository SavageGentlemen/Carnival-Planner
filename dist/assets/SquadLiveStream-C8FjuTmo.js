import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { V as Video } from "./video-B7OFzPXm.js";
import { U as Users, X } from "./index-CXUot43X.js";
import { C as Check } from "./check-LoUvj2UR.js";
import { C as Copy } from "./copy-DeHw19Y5.js";
import { a as Minimize2, M as Maximize2 } from "./minimize-2-BEh34R84.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
function SquadLiveStream({
  squadId,
  isPremium,
  isHost,
  activeRoomId,
  onStartStream,
  onEndStream
}) {
  const [isStreaming, setIsStreaming] = reactExports.useState(false);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const [viewerCount, setViewerCount] = reactExports.useState(0);
  const generateRoomId = () => `carnival-${squadId}-${Date.now().toString(36)}`;
  const getHostUrl = (roomId) => `https://vdo.ninja/?room=${roomId}&push&quality=1&autostart`;
  const getViewerUrl = (roomId) => `https://vdo.ninja/?room=${roomId}&view&cleanoutput&autoplay`;
  const handleStartStream = () => {
    const newRoomId = generateRoomId();
    setIsStreaming(true);
    onStartStream?.(newRoomId);
  };
  const handleEndStream = () => {
    setIsStreaming(false);
    onEndStream?.();
  };
  const copyInviteLink = async () => {
    if (!activeRoomId) return;
    const viewerUrl = getViewerUrl(activeRoomId);
    await navigator.clipboard.writeText(viewerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  if (!activeRoomId && !isHost) return null;
  if (isHost && !activeRoomId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-purple-500/20 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5 text-purple-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white", children: "Go Live" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Stream to your squad in real-time" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleStartStream,
          className: "px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" }),
            "Start Stream"
          ]
        }
      )
    ] }) });
  }
  const streamUrl = isHost ? getHostUrl(activeRoomId) : getViewerUrl(activeRoomId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-gray-900 rounded-xl overflow-hidden mb-4 border border-purple-500/30 transition-all ${isFullscreen ? "fixed inset-4 z-50" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse", children: "🔴 LIVE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-medium", children: isHost ? "You are streaming" : "Squad Live Stream" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-white/80 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Squad" })
        ] }),
        isHost && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: copyInviteLink,
            className: "p-2 hover:bg-white/10 rounded-lg transition-colors",
            title: "Copy viewer link",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsFullscreen(!isFullscreen),
            className: "p-2 hover:bg-white/10 rounded-lg transition-colors",
            children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 text-white" })
          }
        ),
        isHost && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleEndStream,
            className: "p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors",
            title: "End stream",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-white" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative bg-black ${isFullscreen ? "h-[calc(100%-48px)]" : "h-64 sm:h-80"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: streamUrl,
          allow: "camera; microphone; display-capture; autoplay; fullscreen",
          className: "w-full h-full border-0",
          title: "Live Stream"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900/50 pointer-events-none opacity-0 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Connecting..." })
      ] }) })
    ] }),
    isHost && isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-purple-900/50 text-purple-200 text-xs text-center", children: "💡 Tip: Allow camera/microphone access in the stream window above. Your squad can now see you!" })
  ] });
}
export {
  SquadLiveStream as default
};
