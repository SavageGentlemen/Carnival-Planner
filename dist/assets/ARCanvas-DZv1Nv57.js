import { j as jsxRuntimeExports, T as Text, c as useFrame, C as Canvas } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { X as XR, c as createXRStore } from "./ray-grab-BRAacQ8J.js";
import { g as gpsToLocalCartesian, c as calculateDistance, a as clampPosition, f as formatDistance, b as getWaypointScale } from "./gpsUtils-CRBO3jvk.js";
import { m as Eye, a3 as EyeOff, X } from "./index-CXUot43X.js";
import { A as AlertCircle } from "./alert-circle-lhG861Pl.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
const PIN_COLORS = {
  accommodation: "#3B82F6",
  costume: "#F59E0B",
  fete: "#EC4899",
  meetup: "#10B981",
  scraped: "#8B5CF6",
  default: "#EC4899"
};
function ARWaypointMesh({ position, name, type, distance }) {
  const meshRef = reactExports.useRef();
  const glowRef = reactExports.useRef();
  const color = PIN_COLORS[type] || PIN_COLORS.default;
  const scale = getWaypointScale(distance);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, scale: [scale, scale, scale], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.4, 32, 32] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color,
          emissive: color,
          emissiveIntensity: 1.5,
          transparent: true,
          opacity: 0.9
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: glowRef, position: [0, position[1], 0], scale: [scale * 1.3, scale * 1.3, scale * 1.3], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ringGeometry", { args: [0.5, 0.65, 32] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color,
          transparent: true,
          opacity: 0.3,
          side: 2
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        position: [0, position[1] + scale * 0.8, 0],
        fontSize: 0.25 * scale,
        color: "white",
        anchorX: "center",
        anchorY: "bottom",
        outlineWidth: 0.02,
        outlineColor: "black",
        maxWidth: 3,
        children: name || "Waypoint"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        position: [0, position[1] - scale * 0.6, 0],
        fontSize: 0.18 * scale,
        color: "#94A3B8",
        anchorX: "center",
        anchorY: "top",
        outlineWidth: 0.015,
        outlineColor: "black",
        children: formatDistance(distance)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, position[1] / 2, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.02 * scale, 0.02 * scale, position[1], 8] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color, transparent: true, opacity: 0.2 })
    ] })
  ] });
}
function ARScene({ userLocation, waypoints = [] }) {
  const waypointData = reactExports.useMemo(() => {
    if (!userLocation) return [];
    return waypoints.map((wp) => {
      const rawPos = gpsToLocalCartesian(userLocation.lat, userLocation.lng, wp.lat, wp.lng);
      const pos = clampPosition(rawPos, 200);
      const dist = calculateDistance(userLocation.lat, userLocation.lng, wp.lat, wp.lng);
      return {
        id: wp.id || `${wp.lat}-${wp.lng}`,
        name: wp.name || wp.title || "Waypoint",
        type: wp.type || "default",
        position: pos,
        distance: dist
      };
    }).filter((wp) => wp.distance > 5);
  }, [userLocation, waypoints]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.6 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 10, 0], intensity: 0.4 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ringGeometry", { args: [2, 2.1, 64] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#6366F1", transparent: true, opacity: 0.3 })
    ] }),
    waypointData.map((wp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ARWaypointMesh,
      {
        position: wp.position,
        name: wp.name,
        type: wp.type,
        distance: wp.distance
      },
      wp.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, 2, -10], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.1, 16, 16] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#EF4444" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Text,
      {
        position: [0, 2.4, -10],
        fontSize: 0.2,
        color: "#EF4444",
        anchorX: "center",
        outlineWidth: 0.015,
        outlineColor: "black",
        children: "N"
      }
    )
  ] });
}
const store = createXRStore({
  // Request hit-test for potential future ground-plane features
  hitTest: false
});
function ARCanvas({ userLocation, waypoints = [], onClose }) {
  const [arActive, setArActive] = reactExports.useState(false);
  const [arError, setArError] = reactExports.useState(null);
  const handleEnterAR = reactExports.useCallback(async () => {
    try {
      setArError(null);
      await store.enterAR();
      setArActive(true);
    } catch (err) {
      console.error("AR session failed:", err);
      setArError(err.message || "Failed to start AR session");
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Canvas,
      {
        className: "w-full h-full",
        camera: { position: [0, 1.6, 0], fov: 70 },
        gl: { alpha: true, antialias: true },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(XR, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ARScene, { userLocation, waypoints }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 pointer-events-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full", children: [
          arActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-green-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-300 text-xs font-bold", children: "AR LIVE" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4 text-yellow-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-300 text-xs font-bold", children: "PREVIEW" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 text-xs ml-1", children: [
            waypoints.length,
            " pin",
            waypoints.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-white" })
          }
        )
      ] }),
      arError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mx-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl pointer-events-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-red-400 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-200 text-sm", children: arError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-6 pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        userLocation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-500 bg-black/40 px-2 py-1 rounded-full", children: [
          "📍 ±",
          Math.round(userLocation.accuracy),
          "m accuracy"
        ] }) }),
        !arActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleEnterAR,
            className: "w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }),
                "Launch AR Camera"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-indigo-200 text-xs mt-1", children: "Opens camera passthrough with 3D waypoints" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors",
            children: "Exit AR Mode"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  ARCanvas as default
};
