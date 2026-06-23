import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { M as Music, X } from "./index-CXUot43X.js";
import { M as Maximize2, a as Minimize2 } from "./minimize-2-BEh34R84.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const PLAYLISTS = {
  // Trinidad - 'Soca 2025' (Spotify Official)
  "trinidad": "https://open.spotify.com/embed/playlist/2H61cIhlAeFVmreSMqvui3",
  // Jamaica - 'Dancehall Official'
  "jamaica": "https://open.spotify.com/embed/playlist/37i9dQZF1DX82pCGH5USnM",
  // Miami - 'Soca Classics'
  "miami": "https://open.spotify.com/embed/playlist/37i9dQZF1DXS1X4r7p38D5",
  // St. Lucia - 'Dennery Segment'
  "stlucia": "https://open.spotify.com/embed/playlist/37i9dQZF1DX62XscWx9t6h",
  // Barbados - 'Bashment Soca'
  "barbados": "https://open.spotify.com/embed/playlist/37i9dQZF1DX23V8kYg8jC2",
  // St. Kitts, St. Thomas, USVI - 'Soca Anthems'
  "stkitts": "https://open.spotify.com/embed/playlist/37i9dQZF1E4v6hGc9x5z4y",
  "stcroix": "https://open.spotify.com/embed/playlist/37i9dQZF1E4v6hGc9x5z4y",
  "stthomas": "https://open.spotify.com/embed/playlist/37i9dQZF1E4v6hGc9x5z4y",
  // Default - User Provided Playlist (Soca 2024/2025)
  "default": "https://open.spotify.com/embed/playlist/28bCuQ5IhyPbmvJx30ZMea"
};
function VibesPlayer({ activeCarnivalId, isPremium }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [isMinimized, setIsMinimized] = reactExports.useState(false);
  const [isRadioMode, setIsRadioMode] = reactExports.useState(false);
  const getPlaylistData = () => {
    if (!activeCarnivalId) return { key: "default", url: PLAYLISTS["default"] };
    const key = Object.keys(PLAYLISTS).find((k) => activeCarnivalId.toLowerCase().includes(k));
    const url = PLAYLISTS[key] || PLAYLISTS["default"];
    return { key: key || "default (fallback)", url };
  };
  const { key: playlistKey, url: playlistUrl } = getPlaylistData();
  if (!isOpen) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "fixed bottom-24 right-4 z-40 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce-slow",
        "aria-label": "Open Vibes Player",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-6 h-6" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `fixed z-40 transition-all duration-300 shadow-2xl overflow-hidden bg-black/90 backdrop-blur-md border border-white/20 rounded-t-2xl sm:rounded-2xl
      ${isMinimized ? "bottom-24 right-4 w-64 h-16 rounded-full" : "bottom-0 sm:bottom-24 right-0 sm:right-4 w-full sm:w-80 h-[400px]"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between p-3 bg-gradient-to-r from-pink-600 to-purple-700 text-white
        ${isMinimized ? "h-full" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-5 h-5 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: isMinimized ? "Carnival Vibes" : isRadioMode ? "Team Soca Live" : "Soca Vibes Player" }),
                  !isMinimized && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setIsRadioMode(!isRadioMode),
                      className: "text-[10px] bg-white/20 px-2 py-0.5 rounded-full hover:bg-white/30 transition text-left w-fit",
                      children: isRadioMode ? "Switch to Playlist" : "Switch to Live Radio"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                isMinimized ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsMinimized(false), className: "p-1 hover:bg-white/20 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsMinimized(true), className: "p-1 hover:bg-white/20 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsOpen(false), className: "p-1 hover:bg-white/20 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
              ] })
            ]
          }
        ),
        !isMinimized && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[calc(100%-48px)] bg-black relative", children: [
          !isPremium && !isRadioMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 z-10 bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 text-center", children: "Upgrade directly in Spotify for ad-free listening" }),
          isRadioMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              src: "https://ice23.securenetsystems.net/TSDC",
              width: "100%",
              height: "100%",
              frameBorder: "0",
              allow: "autoplay; encrypted-media;",
              title: "Team Soca Live"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              style: { borderRadius: "12px" },
              src: playlistUrl,
              width: "100%",
              height: "100%",
              frameBorder: "0",
              allowFullScreen: "",
              allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
              loading: "lazy",
              title: "Soca Playlist"
            }
          )
        ] })
      ]
    }
  );
}
export {
  VibesPlayer as default
};
