import { j as jsxRuntimeExports, C as Canvas, E as Environment, a as ContactShadows, O as OrbitControls, u as useGLTF, b as Center, H as Html } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports, R as React } from "./vendor-swr-BEHUV5vo.js";
import { X as XR, c as createXRStore } from "./ray-grab-BRAacQ8J.js";
import { B as Box } from "./box-Bcz_qeOs.js";
import { c as createLucideIcon, m as Eye, Y as Smartphone, X, L as Loader2 } from "./index-CXUot43X.js";
import { a as Minimize2, M as Maximize2 } from "./minimize-2-BEh34R84.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RotateCw = createLucideIcon("RotateCw", [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
]);
const xrStore = createXRStore();
function Model({ url, onLoaded }) {
  const { scene } = useGLTF(url);
  React.useEffect(() => {
    if (scene) {
      onLoaded?.();
    }
  }, [scene]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("primitive", { object: scene }) });
}
function LoadingSpinner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Loading 3D Model..." })
  ] }) });
}
function ModelViewer({
  modelUrl,
  // URL to .glb/.gltf file
  usdzUrl,
  // Optional URL to .usdz for iOS AR Quick Look
  title,
  // Product/costume name
  onClose,
  // Close handler
  isPremium
}) {
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  const [autoRotate, setAutoRotate] = reactExports.useState(true);
  const [arActive, setArActive] = reactExports.useState(false);
  const [arError, setArError] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const [arSupported, setArSupported] = reactExports.useState(false);
  React.useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then(setArSupported).catch(() => setArSupported(false));
    }
  }, []);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (!isPremium) return null;
  if (!modelUrl) return null;
  const handleARView = reactExports.useCallback(async () => {
    if (isIOS && usdzUrl) {
      const a = document.createElement("a");
      a.rel = "ar";
      a.href = usdzUrl;
      const img = document.createElement("img");
      a.appendChild(img);
      a.click();
    } else if (arSupported) {
      try {
        setArError(null);
        await xrStore.enterAR();
        setArActive(true);
      } catch (err) {
        console.error("AR session failed:", err);
        setArError(err.message || "AR session failed");
      }
    }
  }, [arSupported, isIOS, usdzUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: `fixed z-50 bg-black/95 backdrop-blur-xl flex flex-col transition-all duration-300 ${isFullscreen ? "inset-0" : "inset-4 sm:inset-8 md:inset-16 rounded-2xl"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-5 h-5 text-purple-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm", children: title || "3D Viewer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400", children: "Drag to rotate • Pinch to zoom" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setAutoRotate(!autoRotate),
                className: `p-2 rounded-lg transition-colors ${autoRotate ? "bg-purple-500/20 text-purple-400" : "text-gray-500 hover:text-white"}`,
                title: "Toggle auto-rotate",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4" })
              }
            ),
            (arSupported || isIOS && usdzUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleARView,
                className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${arActive ? "bg-green-600 text-white" : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"}`,
                children: arActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                  " AR Active"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
                  " Try in AR"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsFullscreen(!isFullscreen),
                className: "p-2 text-gray-400 hover:text-white transition-colors",
                children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "p-2 text-gray-400 hover:text-white transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        arError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-red-500/20 border-b border-red-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-300 text-xs", children: arError }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Canvas,
            {
              camera: { position: [0, 1, 3], fov: 45 },
              gl: { antialias: true, alpha: true },
              dpr: [1, 2],
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(XR, { store: xrStore, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.6 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [5, 5, 5], intensity: 0.8, castShadow: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [-3, 2, -3], intensity: 0.3 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Model, { url: modelUrl, onLoaded: () => setIsLoaded(true) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Environment, { preset: "city" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ContactShadows, { position: [0, -1, 0], opacity: 0.4, blur: 2 })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OrbitControls,
                  {
                    autoRotate,
                    autoRotateSpeed: 2,
                    enablePan: false,
                    minPolarAngle: Math.PI / 6,
                    maxPolarAngle: Math.PI / 1.5,
                    minDistance: 1.5,
                    maxDistance: 6
                  }
                )
              ] })
            }
          ),
          !isLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 text-purple-400 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-300", children: "Loading 3D model..." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-t border-white/10 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-500", children: arActive ? "🟢 AR session active — move your phone to place costume" : arSupported ? "✅ AR try-on available on this device" : isIOS && usdzUrl ? "✅ AR Quick Look available" : "❌ AR not supported on this browser" }),
          !isIOS && !arSupported && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-500", children: "Use Chrome on Android for AR" })
        ] })
      ]
    }
  );
}
export {
  ModelViewer as default
};
