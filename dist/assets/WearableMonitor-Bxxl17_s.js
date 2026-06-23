import { j as jsxRuntimeExports } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { c as createLucideIcon, X, O as Shield } from "./index-CXUot43X.js";
import { S as ShieldAlert } from "./shield-alert-IiPvvEM9.js";
import { H as Heart } from "./heart-Byuw4YdV.js";
import { A as AlertTriangle } from "./alert-triangle-eo7cw2j4.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./vendor-firebase-data-O6IN0zfq.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BluetoothOff = createLucideIcon("BluetoothOff", [
  ["path", { d: "m17 17-5 5V12l-5 5", key: "v5aci6" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M14.5 9.5 17 7l-5-5v4.5", key: "1kddfz" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bluetooth = createLucideIcon("Bluetooth", [
  ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17", key: "1q5490" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ShieldCheck = createLucideIcon("ShieldCheck", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10", key: "1irkt0" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
function isWebBluetoothSupported() {
  return !!navigator.bluetooth;
}
class HeartRateMonitor {
  constructor() {
    this.device = null;
    this.server = null;
    this.characteristic = null;
    this.onReading = null;
    this.onDisconnect = null;
    this.isConnected = false;
  }
  /**
   * Request and connect to a BLE heart rate monitor.
   * Shows the browser's native device picker dialog.
   */
  async connect() {
    if (!isWebBluetoothSupported()) {
      throw new Error("Web Bluetooth is not supported in this browser. Use Chrome on Android or Desktop.");
    }
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
        optionalServices: ["battery_service"]
      });
      this.device.addEventListener("gattserverdisconnected", () => {
        this.isConnected = false;
        this.onDisconnect?.();
        console.log("BLE HR Monitor: Disconnected");
      });
      this.server = await this.device.gatt.connect();
      console.log("BLE HR Monitor: Connected to", this.device.name);
      const service = await this.server.getPrimaryService("heart_rate");
      this.characteristic = await service.getCharacteristic("heart_rate_measurement");
      await this.characteristic.startNotifications();
      this.characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = event.target.value;
        const parsed = this._parseHeartRate(value);
        this.onReading?.(parsed);
      });
      this.isConnected = true;
      return {
        success: true,
        deviceName: this.device.name || "HR Monitor"
      };
    } catch (err) {
      console.error("BLE HR Monitor: Connection failed:", err);
      return {
        success: false,
        error: err.message
      };
    }
  }
  /**
   * Disconnect from the device.
   */
  disconnect() {
    if (this.characteristic) {
      try {
        this.characteristic.stopNotifications();
      } catch (e) {
      }
    }
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.isConnected = false;
    this.device = null;
    this.server = null;
    this.characteristic = null;
  }
  /**
   * Parse the Heart Rate Measurement characteristic value.
   * Follows Bluetooth Heart Rate Profile specification.
   */
  _parseHeartRate(dataView) {
    const flags = dataView.getUint8(0);
    const is16Bit = flags & 1;
    const contactDetected = (flags & 6) === 6;
    let heartRate;
    if (is16Bit) {
      heartRate = dataView.getUint16(1, true);
    } else {
      heartRate = dataView.getUint8(1);
    }
    return {
      heartRate,
      contactDetected,
      timestamp: Date.now()
    };
  }
}
class SafetyMonitor {
  constructor(onAlert) {
    this.onAlert = onAlert;
    this.readings = [];
    this.isMonitoring = false;
    this.lastAlertTime = 0;
    this.alertCooldownMs = 15 * 60 * 1e3;
    this.thresholdBpm = 160;
    this.sustainedDurationMs = 3 * 60 * 1e3;
    this.hasMotion = false;
    this.motionHandler = null;
    this.dismissed = false;
  }
  /**
   * Start monitoring heart rate readings.
   */
  start() {
    this.isMonitoring = true;
    this.dismissed = false;
    this.readings = [];
    if (window.DeviceMotionEvent) {
      this.motionHandler = (event) => {
        const acc = event.accelerationIncludingGravity;
        if (!acc) return;
        const magnitude = Math.sqrt(
          (acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2
        );
        this.hasMotion = magnitude > 12;
      };
      window.addEventListener("devicemotion", this.motionHandler);
    } else {
      this.hasMotion = true;
    }
  }
  /**
   * Stop monitoring.
   */
  stop() {
    this.isMonitoring = false;
    this.readings = [];
    if (this.motionHandler) {
      window.removeEventListener("devicemotion", this.motionHandler);
      this.motionHandler = null;
    }
  }
  /**
   * Feed a new heart rate reading into the monitor.
   */
  addReading(reading) {
    if (!this.isMonitoring || this.dismissed) return;
    this.readings.push(reading);
    const fiveMinAgo = Date.now() - 5 * 60 * 1e3;
    this.readings = this.readings.filter((r) => r.timestamp > fiveMinAgo);
    this._checkThreshold();
  }
  /**
   * User dismisses the alert ("I'm OK").
   */
  dismiss() {
    this.dismissed = true;
    setTimeout(() => {
      this.dismissed = false;
    }, this.alertCooldownMs);
  }
  /**
   * Check if alert conditions are met.
   */
  _checkThreshold() {
    const now = Date.now();
    if (now - this.lastAlertTime < this.alertCooldownMs) return;
    const threeMinAgo = now - this.sustainedDurationMs;
    const recentReadings = this.readings.filter((r) => r.timestamp >= threeMinAgo);
    if (recentReadings.length < 10) return;
    const allAboveThreshold = recentReadings.every((r) => r.heartRate > this.thresholdBpm);
    if (allAboveThreshold && this.hasMotion) {
      const avgHR = Math.round(
        recentReadings.reduce((sum, r) => sum + r.heartRate, 0) / recentReadings.length
      );
      this.lastAlertTime = now;
      this.onAlert?.({
        heartRate: avgHR,
        duration: Math.round((now - recentReadings[0].timestamp) / 1e3 / 60),
        message: `Elevated heart rate (${avgHR} bpm) sustained for ${Math.round((now - recentReadings[0].timestamp) / 1e3 / 60)} minutes with continuous movement.`
      });
    }
  }
}
function WearableMonitor({
  isPremium,
  userId,
  userName,
  activeCarnivalId,
  onSafetyAlert
  // callback({ heartRate, duration }) — fires sendSafetyAlert Cloud Function
}) {
  const [isSupported] = reactExports.useState(isWebBluetoothSupported());
  const [isConnected, setIsConnected] = reactExports.useState(false);
  const [deviceName, setDeviceName] = reactExports.useState("");
  const [heartRate, setHeartRate] = reactExports.useState(null);
  const [hrHistory, setHrHistory] = reactExports.useState([]);
  const [safetyEnabled, setSafetyEnabled] = reactExports.useState(true);
  const [safetyTriggered, setSafetyTriggered] = reactExports.useState(false);
  const [connecting, setConnecting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const hrMonitorRef = reactExports.useRef(null);
  const safetyMonitorRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const monitor = new SafetyMonitor((alertData) => {
      setSafetyTriggered(true);
      onSafetyAlert?.(alertData);
    });
    safetyMonitorRef.current = monitor;
    return () => monitor.stop();
  }, [onSafetyAlert]);
  reactExports.useEffect(() => {
    if (!safetyMonitorRef.current) return;
    if (safetyEnabled && isConnected) {
      safetyMonitorRef.current.start();
    } else {
      safetyMonitorRef.current.stop();
    }
  }, [safetyEnabled, isConnected]);
  const handleConnect = async () => {
    setError(null);
    setConnecting(true);
    const monitor = new HeartRateMonitor();
    monitor.onReading = (reading) => {
      setHeartRate(reading.heartRate);
      setHrHistory((prev) => [...prev.slice(-29), reading.heartRate]);
      if (safetyMonitorRef.current) {
        safetyMonitorRef.current.addReading(reading);
      }
    };
    monitor.onDisconnect = () => {
      setIsConnected(false);
      setHeartRate(null);
      setDeviceName("");
    };
    const result = await monitor.connect();
    setConnecting(false);
    if (result.success) {
      hrMonitorRef.current = monitor;
      setIsConnected(true);
      setDeviceName(result.deviceName);
    } else {
      setError(result.error);
    }
  };
  const handleDisconnect = () => {
    hrMonitorRef.current?.disconnect();
    hrMonitorRef.current = null;
    setIsConnected(false);
    setHeartRate(null);
    setDeviceName("");
    setHrHistory([]);
  };
  const handleDismissSafety = () => {
    setSafetyTriggered(false);
    safetyMonitorRef.current?.dismiss();
  };
  reactExports.useEffect(() => {
    return () => {
      hrMonitorRef.current?.disconnect();
      safetyMonitorRef.current?.stop();
    };
  }, []);
  if (!isPremium) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⌚" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-900 dark:text-amber-300", children: "Wearable Safety Monitor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400", children: "Connect your HR monitor for automated squad safety alerts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-[10px] font-bold bg-amber-500 text-white rounded-full uppercase", children: "Premium" })
    ] }) });
  }
  if (!isSupported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BluetoothOff, { className: "w-5 h-5 text-gray-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-300", children: "Wearable Monitor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Web Bluetooth is only available on Chrome (Android/Desktop). Not supported on Safari/iOS." })
      ] })
    ] }) });
  }
  const getHrColor = (hr) => {
    if (!hr) return "text-gray-400";
    if (hr >= 160) return "text-red-500";
    if (hr >= 120) return "text-orange-500";
    if (hr >= 80) return "text-green-500";
    return "text-blue-500";
  };
  const getHrZone = (hr) => {
    if (!hr) return "";
    if (hr >= 160) return "Max";
    if (hr >= 140) return "Hard";
    if (hr >= 120) return "Cardio";
    if (hr >= 100) return "Active";
    if (hr >= 60) return "Resting";
    return "Low";
  };
  const maxHr = Math.max(...hrHistory, 100);
  const minHr = Math.min(...hrHistory, 60);
  const hrRange = maxHr - minHr || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl border border-pink-200 dark:border-pink-800", children: [
    safetyTriggered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 bg-red-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-12 h-12 text-red-300 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg text-center", children: "Safety Alert Sent!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-200 text-sm text-center mt-1", children: "Your squad has been notified to check on you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleDismissSafety,
          className: "mt-4 px-6 py-2 bg-white text-red-900 font-bold rounded-xl hover:bg-gray-100 transition",
          children: "I'm OK — Dismiss"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-3 flex items-center justify-between ${isConnected ? "bg-gradient-to-r from-pink-600 to-rose-600" : "bg-gradient-to-r from-pink-500/10 to-rose-500/10 dark:from-pink-900/30 dark:to-rose-900/30"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${isConnected ? "text-white animate-pulse" : "text-pink-600 dark:text-pink-400"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold ${isConnected ? "text-white" : "text-pink-800 dark:text-pink-300"}`, children: "Wearable Monitor" }),
        isConnected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-white/20 rounded-full text-[10px] text-white font-medium", children: deviceName })
      ] }),
      isConnected && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleDisconnect,
          className: "text-white/70 hover:text-white transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white dark:bg-gray-800", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4 text-red-500 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600 dark:text-red-400", children: error })
      ] }),
      !isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-3", children: "Connect a Bluetooth heart rate monitor for real-time health tracking and squad safety alerts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleConnect,
            disabled: connecting,
            className: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl hover:from-pink-500 hover:to-rose-500 transition-all shadow-lg shadow-pink-500/20 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bluetooth, { className: "w-4 h-4" }),
              connecting ? "Connecting..." : "Connect Wearable"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400 mt-2", children: "Works with Fitbit, Garmin, Polar, and other BLE heart rate monitors" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-6 h-6 ${getHrColor(heartRate)} ${heartRate ? "animate-pulse" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-4xl font-black ${getHrColor(heartRate)}`, children: heartRate || "--" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400 ml-1", children: "bpm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${getHrColor(heartRate)}`, children: getHrZone(heartRate) })
        ] }) }),
        hrHistory.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 flex items-end gap-px", children: hrHistory.map((hr, i) => {
          const height = (hr - minHr) / hrRange * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex-1 rounded-t-sm transition-all ${hr >= 160 ? "bg-red-400" : hr >= 120 ? "bg-orange-400" : hr >= 80 ? "bg-green-400" : "bg-blue-400"}`,
              style: { height: `${Math.max(height, 4)}%`, opacity: 0.4 + i / hrHistory.length * 0.6 }
            },
            i
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            safetyEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Safety Monitor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400", children: "Alerts squad if HR stays elevated" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSafetyEnabled(!safetyEnabled),
              className: `relative w-10 h-5 rounded-full transition-colors ${safetyEnabled ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${safetyEnabled ? "translate-x-5" : "translate-x-0.5"}`
                }
              )
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  WearableMonitor as default
};
