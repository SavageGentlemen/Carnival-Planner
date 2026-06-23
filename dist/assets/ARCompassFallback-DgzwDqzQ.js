import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as calculateDistance, d as calculateBearing, f as formatDistance, e as getCompassDirection } from "./gpsUtils-CRBO3jvk.js";
import { N as Navigation, C as Compass } from "./FeteMap-CKmyTWJI.js";
import { c as createLucideIcon, X, b as MapPin } from "./index-CXUot43X.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import "./vendor-maps-DCMhh9kT.js";
import "./plus-BHAJcjwt.js";
import "./shirt-z6cB87UO.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowUp = createLucideIcon("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
function ARCompassFallback({ target, onClose }) {
  const [userPos, setUserPos] = reactExports.useState(null);
  const [heading, setHeading] = reactExports.useState(null);
  const [bearing, setBearing] = reactExports.useState(null);
  const [distance, setDistance] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const watchIdRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not available");
      return;
    }
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
        setError(null);
      },
      (err) => setError(`GPS error: ${err.message}`),
      { enableHighAccuracy: true, maximumAge: 5e3, timeout: 1e4 }
    );
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);
  reactExports.useEffect(() => {
    const handleOrientation = (event) => {
      if (event.webkitCompassHeading !== void 0) {
        setHeading(event.webkitCompassHeading);
      } else if (event.alpha !== null) {
        setHeading(360 - event.alpha);
      }
    };
    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission().then((state) => {
          if (state === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true);
          }
        }).catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    }
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);
  reactExports.useEffect(() => {
    if (!userPos || !target?.lat || !target?.lng) return;
    setDistance(calculateDistance(userPos.lat, userPos.lng, target.lat, target.lng));
    setBearing(calculateBearing(userPos.lat, userPos.lng, target.lat, target.lng));
  }, [userPos, target]);
  const arrowRotation = heading !== null && bearing !== null ? (bearing - heading + 360) % 360 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-indigo-500/20 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-5 h-5 text-indigo-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm", children: "Compass Navigate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-indigo-300", children: target.name || "Destination" })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center h-full", children: error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-12 h-12 text-red-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-center", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm text-center", children: "Enable location services to use navigation." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64 h-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-indigo-500/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-full border border-indigo-500/20" }),
        ["N", "E", "S", "W"].map((dir, i) => {
          const angle = i * 90 - (heading || 0);
          const rad = angle * Math.PI / 180;
          const r = 112;
          const x = 128 + r * Math.sin(rad);
          const y = 128 - r * Math.cos(rad);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute text-xs font-bold transition-all ${dir === "N" ? "text-red-400" : "text-gray-500"}`,
              style: { left: `${x}px`, top: `${y}px`, transform: "translate(-50%, -50%)" },
              children: dir
            },
            dir
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-8 flex items-center justify-center transition-transform duration-200",
            style: { transform: `rotate(${arrowRotation}deg)` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-16 h-16 text-indigo-400 drop-shadow-lg", strokeWidth: 3 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-16 bg-gradient-to-b from-indigo-400 to-transparent rounded-full" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-black/60 backdrop-blur-sm rounded-2xl px-5 py-3 text-center", children: distance !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-white", children: formatDistance(distance) }),
          bearing !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-indigo-300 mt-1", children: getCompassDirection(bearing) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-pink-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: target.name || "Destination" })
        ] }),
        target.venue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: target.venue }),
        userPos && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-gray-600 mt-2", children: [
          "GPS accuracy: ±",
          Math.round(userPos.accuracy),
          "m"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-4 h-4 text-indigo-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-300", children: heading !== null ? `${Math.round(heading)}°` : "Calibrating..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-colors",
          children: "Exit Navigation"
        }
      )
    ] }) })
  ] });
}
export {
  ARCompassFallback as default
};
