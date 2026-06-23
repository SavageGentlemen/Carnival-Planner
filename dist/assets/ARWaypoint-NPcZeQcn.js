const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ARCanvas-DZv1Nv57.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/ray-grab-BRAacQ8J.js","assets/gpsUtils-CRBO3jvk.js","assets/index-CXUot43X.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/index-ByoYVoQD.css","assets/alert-circle-lhG861Pl.js","assets/ARCompassFallback-DgzwDqzQ.js","assets/FeteMap-CKmyTWJI.js","assets/plus-BHAJcjwt.js","assets/shirt-z6cB87UO.js","assets/FeteMap-Bvr-Ab8i.css"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports, R as React } from "./vendor-swr-BEHUV5vo.js";
import { N as Navigation, C as Compass } from "./FeteMap-CKmyTWJI.js";
import { X, L as Loader2, m as Eye } from "./index-CXUot43X.js";
import "./vendor-maps-DCMhh9kT.js";
import "./plus-BHAJcjwt.js";
import "./shirt-z6cB87UO.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const ARCanvas = React.lazy(() => __vitePreload(() => import("./ARCanvas-DZv1Nv57.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0));
const ARCompassFallback = React.lazy(() => __vitePreload(() => import("./ARCompassFallback-DgzwDqzQ.js"), true ? __vite__mapDeps([11,1,2,3,5,12,6,7,8,9,13,14,15,10]) : void 0));
function ARWaypoint({ targets, target, onClose, isPremium }) {
  const [arSupported, setArSupported] = reactExports.useState(null);
  const [mode, setMode] = reactExports.useState(null);
  const [userPos, setUserPos] = reactExports.useState(null);
  const [gpsError, setGpsError] = reactExports.useState(null);
  const watchIdRef = reactExports.useRef(null);
  const allTargets = targets || (target ? [target] : []);
  reactExports.useEffect(() => {
    const checkAR = async () => {
      if (!navigator.xr) {
        setArSupported(false);
        return;
      }
      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setArSupported(supported);
      } catch {
        setArSupported(false);
      }
    };
    checkAR();
  }, []);
  reactExports.useEffect(() => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation not available");
      return;
    }
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
        setGpsError(null);
      },
      (err) => setGpsError(`GPS error: ${err.message}`),
      { enableHighAccuracy: true, maximumAge: 3e3, timeout: 15e3 }
    );
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);
  if (!isPremium || allTargets.length === 0) return null;
  if (mode === "ar") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(ARLoadingScreen, { onClose }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ARCanvas,
      {
        userLocation: userPos,
        waypoints: allTargets,
        onClose
      }
    ) });
  }
  if (mode === "compass") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(ARLoadingScreen, { onClose }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ARCompassFallback,
      {
        target: allTargets[0],
        onClose
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-indigo-500/20 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-5 h-5 text-indigo-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold", children: "AR Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-indigo-300", children: [
            allTargets.length,
            " waypoint",
            allTargets.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-white" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-6 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-white text-center mb-2", children: "Choose Navigation Mode" }),
      gpsError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-300 text-sm", children: gpsError }) }) : userPos ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-300 text-sm", children: [
        "📍 GPS locked (±",
        Math.round(userPos.accuracy),
        "m)"
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 text-yellow-300 animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-300 text-sm", children: "Acquiring GPS..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setMode("ar"),
          disabled: arSupported === false || !userPos,
          className: `w-full max-w-sm p-6 rounded-2xl border transition-all ${arSupported ? "bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-indigo-500/40 hover:border-indigo-400 hover:scale-[1.02]" : "bg-gray-800/50 border-gray-700 opacity-50 cursor-not-allowed"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-indigo-500/30 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8 text-indigo-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg", children: "AR Camera View" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: arSupported === null ? "Checking WebXR support..." : arSupported ? "See 3D waypoints through your camera" : "WebXR not supported on this browser" })
              ] })
            ] }),
            arSupported && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              allTargets.slice(0, 3).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-indigo-500/20 rounded-full text-[10px] text-indigo-300 font-medium", children: t.name || t.title }, i)),
              allTargets.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 bg-indigo-500/20 rounded-full text-[10px] text-indigo-300", children: [
                "+",
                allTargets.length - 3,
                " more"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setMode("compass"),
          disabled: !userPos,
          className: "w-full max-w-sm p-6 rounded-2xl border bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-600/40 hover:border-gray-500 hover:scale-[1.02] transition-all",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gray-600/30 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-8 h-8 text-gray-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg", children: "Compass Navigate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "2D compass with distance & direction" })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-xs text-center mt-4", children: "AR Camera requires Android Chrome. iOS uses Compass mode." })
    ] })
  ] });
}
function ARLoadingScreen({ onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-12 h-12 text-indigo-400 animate-spin mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: "Loading AR Experience..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition",
        children: "Cancel"
      }
    )
  ] });
}
export {
  ARWaypoint as default
};
