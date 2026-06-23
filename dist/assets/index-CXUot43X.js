const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-3iN05rFQ.js","assets/vendor-firebase-core-DHwGrt-V.js","assets/vendor-3d-C6aqP7jv.js","assets/vendor-maps-DCMhh9kT.js","assets/vendor-swr-BEHUV5vo.js","assets/vendor-firebase-data-O6IN0zfq.js","assets/FeteMap-CKmyTWJI.js","assets/plus-BHAJcjwt.js","assets/shirt-z6cB87UO.js","assets/FeteMap-Bvr-Ab8i.css","assets/SquadChat-DdCzF4p7.js","assets/SquadLiveStream-C8FjuTmo.js","assets/video-B7OFzPXm.js","assets/check-LoUvj2UR.js","assets/copy-DeHw19Y5.js","assets/minimize-2-BEh34R84.js","assets/user-B1jUIL0e.js","assets/image-Br-Gm6dl.js","assets/MediaVault-DSGZWdN8.js","assets/upload-Bxs_UXl5.js","assets/VibesPlayer-C6PiZcB8.js","assets/AdminCleanup-D3SnuILQ.js","assets/shield-alert-IiPvvEM9.js","assets/alert-triangle-eo7cw2j4.js","assets/VoiceScheduler-DeCTXmlH.js","assets/mic-off-WRkOT9w8.js","assets/AdManager--nwU2ibm.js","assets/toggle-right-70YlzWSB.js","assets/AdminAnalytics-DXltPh8y.js","assets/crown-i0HipylQ.js","assets/search-DRRdb94Y.js","assets/chevron-down-BKwfjrDe.js","assets/CostumeDirectory-OZqj6e2Z.js","assets/box-Bcz_qeOs.js","assets/AccountSettings-DLJRq6iD.js","assets/award-DJfbIRpy.js","assets/dollar-sign-Dk8Yf5wG.js","assets/save-DAefmSza.js","assets/pen-BlIHjA5h.js","assets/SocaPassportTab-QT8lO47w.js","assets/PassportHome-SJEwmPr3.js","assets/trophy-hLhL8QOQ.js","assets/alert-circle-lhG861Pl.js","assets/bundler-Dmn5v2kr.js","assets/emotion-unitless.esm-BWDbD2bQ.js","assets/TypedData-B3RAtJ0b.js","assets/Address-CuEhN18Y.js","assets/Authorization-CEwvBCmC.js","assets/decimals-RuAU2I0v.js","assets/arweave-BmejQRVS.js","assets/gift-Biw2Zx2l.js","assets/star-CGQXWRD_.js","assets/sparkles-BEe8L_dR.js","assets/CheckinModal-J1aPPP4K.js","assets/x-circle-C5hETfQ-.js","assets/StampCollection-Do1gtD5z.js","assets/chevron-left-C_qBLmw1.js","assets/heart-Byuw4YdV.js","assets/AchievementList-CYs3imug.js","assets/PassportCard-BYB5I0mX.js","assets/html2canvas.esm-s7HdUlmq.js","assets/Leaderboard-Byhz9krg.js","assets/RewardsList-CeuY3eA1.js","assets/check-circle-2-CWiN2kBJ.js","assets/MasqueraderProfile-BtFVmluT.js","assets/web3Service-HPXyfGxN.js","assets/ProfileEditor-DkVUIvFX.js","assets/PromoterDashboard-zmQAMWYw.js","assets/layout-dashboard-PsRkJ6OY.js","assets/AdminDashboard-DIwhph1X.js","assets/MarketingDashboard-Cq91idux.js","assets/MarketplacePage-c8RpAxr0.js","assets/SocaVoid-Ph-sM69i.js","assets/VibeAlert-BOYcadKJ.js","assets/SquadVoice-fc-YuLJB.js","assets/WearableMonitor-Bxxl17_s.js","assets/SquadVault-BK0sYZdP.js","assets/index-DjEsEB5s.js","assets/send-eip712-transaction-C6N5tL5g.js","assets/eth_sendRawTransaction-CgrUWHw8.js","assets/concat-hex-Dx-81yeB.js","assets/sha256-C8LtJplw.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _focused, _cleanup, _setup, _a, _online, _cleanup2, _setup2, _b, _gcTimeout, _c, _initialState, _revertState, _cache, _client, _retryer, _defaultOptions, _abortSignalConsumed, _Query_instances, dispatch_fn, _d, _queries, _e, _observers, _mutationCache, _retryer2, _Mutation_instances, dispatch_fn2, _f, _mutations, _scopes, _mutationId, _g, _queryCache, _mutationCache2, _defaultOptions2, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _h;
import { _ as __vitePreload, j as jsxRuntimeExports, aZ as client } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports, u as useSWR, R as React } from "./vendor-swr-BEHUV5vo.js";
import { _ as _registerComponent, C as Component, r as registerVersion, b as _getProvider, e as getModularInstance, j as getDefaultEmulatorHostnameAndPort, h as getApp, F as FirebaseError, a8 as ErrorFactory, a9 as openDB, aa as deleteDB, ab as validateIndexedDBOpenable, c as isIndexedDBAvailable, ac as areCookiesEnabled, ad as initializeApp, l as getAuth, n as createUserWithEmailAndPassword, z as sendEmailVerification, J as signInWithEmailAndPassword, A as sendPasswordResetEmail, ae as onAuthStateChanged, s as getRedirectResult, v as GoogleAuthProvider, af as signInWithCredential, Y as signInWithPopup, a7 as signOut } from "./vendor-firebase-core-DHwGrt-V.js";
import { n as initializeFirestore, p as persistentLocalCache, t as getStorage, v as persistentMultipleTabManager, c as collection, q as query, w as where, o as onSnapshot, i as orderBy, f as deleteDoc, d as doc, a as addDoc, T as Timestamp, b as updateDoc, h as getDoc, s as setDoc, j as getDocs, x as arrayUnion, y as arrayRemove, k as serverTimestamp, z as deleteField } from "./vendor-firebase-data-O6IN0zfq.js";
import "./vendor-maps-DCMhh9kT.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/*! Capacitor: https://capacitorjs.com/ - MIT License */
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
  constructor(message, code, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
const getPlatformId = (win) => {
  var _a2, _b2;
  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return "android";
  } else if ((_b2 = (_a2 = win === null || win === void 0 ? void 0 : win.webkit) === null || _a2 === void 0 ? void 0 : _a2.messageHandlers) === null || _b2 === void 0 ? void 0 : _b2.bridge) {
    return "ios";
  } else {
    return "web";
  }
};
const createCapacitor = (win) => {
  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  const getPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };
  const isNativePlatform = () => getPlatform() !== "web";
  const isPluginAvailable = (pluginName) => {
    const plugin = registeredPlugins.get(pluginName);
    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      return true;
    }
    if (getPluginHeader(pluginName)) {
      return true;
    }
    return false;
  };
  const getPluginHeader = (pluginName) => {
    var _a2;
    return (_a2 = cap.PluginHeaders) === null || _a2 === void 0 ? void 0 : _a2.find((h) => h.name === pluginName);
  };
  const handleError = (err) => win.console.error(err);
  const registeredPlugins = /* @__PURE__ */ new Map();
  const registerPlugin2 = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }
    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;
    const loadPluginImplementation = async () => {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
      } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
        jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
      }
      return jsImplementation;
    };
    const createPluginMethod = (impl, prop) => {
      var _a2, _b2;
      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
        if (methodHeader) {
          if (methodHeader.rtype === "promise") {
            return (options) => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a2 = impl[prop]) === null || _a2 === void 0 ? void 0 : _a2.bind(impl);
        }
      } else if (impl) {
        return (_b2 = impl[prop]) === null || _b2 === void 0 ? void 0 : _b2.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };
    const createPluginMethodWrapper = (prop) => {
      let remove2;
      const wrapper = (...args) => {
        const p = loadPluginImplementation().then((impl) => {
          const fn = createPluginMethod(impl, prop);
          if (fn) {
            const p2 = fn(...args);
            remove2 = p2 === null || p2 === void 0 ? void 0 : p2.remove;
            return p2;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });
        if (prop === "addListener") {
          p.remove = async () => remove2();
        }
        return p;
      };
      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
      Object.defineProperty(wrapper, "name", {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };
    const addListener = createPluginMethodWrapper("addListener");
    const removeListener = createPluginMethodWrapper("removeListener");
    const addListenerNative = (eventName, callback) => {
      const call2 = addListener({ eventName }, callback);
      const remove2 = async () => {
        const callbackId = await call2;
        removeListener({
          eventName,
          callbackId
        }, callback);
      };
      const p = new Promise((resolve) => call2.then(() => resolve({ remove: remove2 })));
      p.remove = async () => {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        await remove2();
      };
      return p;
    };
    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          case "$$typeof":
            return void 0;
          case "toJSON":
            return () => ({});
          case "addListener":
            return pluginHeader ? addListenerNative : addListener;
          case "removeListener":
            return removeListener;
          default:
            return createPluginMethodWrapper(prop);
        }
      }
    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
    });
    return proxy;
  };
  if (!cap.convertFileSrc) {
    cap.convertFileSrc = (filePath) => filePath;
  }
  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.registerPlugin = registerPlugin2;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  return cap;
};
const initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
const Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
const registerPlugin = Capacitor.registerPlugin;
class WebPlugin {
  constructor() {
    this.listeners = {};
    this.retainedEventArguments = {};
    this.windowListeners = {};
  }
  addListener(eventName, listenerFunc) {
    let firstListener = false;
    const listeners = this.listeners[eventName];
    if (!listeners) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);
    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }
    if (firstListener) {
      this.sendRetainedArgumentsForEvent(eventName);
    }
    const remove2 = async () => this.removeListener(eventName, listenerFunc);
    const p = Promise.resolve({ remove: remove2 });
    return p;
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const listener in this.windowListeners) {
      this.removeWindowListener(this.windowListeners[listener]);
    }
    this.windowListeners = {};
  }
  notifyListeners(eventName, data, retainUntilConsumed) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        let args = this.retainedEventArguments[eventName];
        if (!args) {
          args = [];
        }
        args.push(data);
        this.retainedEventArguments[eventName] = args;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }
  hasListeners(eventName) {
    var _a2;
    return !!((_a2 = this.listeners[eventName]) === null || _a2 === void 0 ? void 0 : _a2.length);
  }
  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }
  unimplemented(msg = "not implemented") {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }
  unavailable(msg = "not available") {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }
  async removeListener(eventName, listenerFunc) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      return;
    }
    const index = listeners.indexOf(listenerFunc);
    this.listeners[eventName].splice(index, 1);
    if (!this.listeners[eventName].length) {
      this.removeWindowListener(this.windowListeners[eventName]);
    }
  }
  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }
  removeWindowListener(handle) {
    if (!handle) {
      return;
    }
    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }
  sendRetainedArgumentsForEvent(eventName) {
    const args = this.retainedEventArguments[eventName];
    if (!args) {
      return;
    }
    delete this.retainedEventArguments[eventName];
    args.forEach((arg) => {
      this.notifyListeners(eventName, arg);
    });
  }
}
const encode$2 = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
const decode$2 = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
  async getCookies() {
    const cookies = document.cookie;
    const cookieMap = {};
    cookies.split(";").forEach((cookie) => {
      if (cookie.length <= 0)
        return;
      let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      key = decode$2(key).trim();
      value = decode$2(value).trim();
      cookieMap[key] = value;
    });
    return cookieMap;
  }
  async setCookie(options) {
    try {
      const encodedKey = encode$2(options.key);
      const encodedValue = encode$2(options.value);
      const expires = options.expires ? `; expires=${options.expires.replace("expires=", "")}` : "";
      const path = (options.path || "/").replace("path=", "");
      const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
      document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteCookie(options) {
    try {
      document.cookie = `${options.key}=; Max-Age=0`;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearCookies() {
    try {
      const cookies = document.cookie.split(";") || [];
      for (const cookie of cookies) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
registerPlugin("CapacitorCookies", {
  web: () => new CapacitorCookiesPluginWeb()
});
const readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result;
    resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
  };
  reader.onerror = (error) => reject(error);
  reader.readAsDataURL(blob);
});
const normalizeHttpHeaders = (headers = {}) => {
  const originalKeys = Object.keys(headers);
  const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
  const normalized = loweredKeys.reduce((acc, key, index) => {
    acc[key] = headers[originalKeys[index]];
    return acc;
  }, {});
  return normalized;
};
const buildUrlParams = (params, shouldEncode = true) => {
  if (!params)
    return null;
  const output = Object.entries(params).reduce((accumulator, entry) => {
    const [key, value] = entry;
    let encodedValue;
    let item;
    if (Array.isArray(value)) {
      item = "";
      value.forEach((str) => {
        encodedValue = shouldEncode ? encodeURIComponent(str) : str;
        item += `${key}=${encodedValue}&`;
      });
      item.slice(0, -1);
    } else {
      encodedValue = shouldEncode ? encodeURIComponent(value) : value;
      item = `${key}=${encodedValue}`;
    }
    return `${accumulator}&${item}`;
  }, "");
  return output.substr(1);
};
const buildRequestInit = (options, extra = {}) => {
  const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
  const headers = normalizeHttpHeaders(options.headers);
  const type = headers["content-type"] || "";
  if (typeof options.data === "string") {
    output.body = options.data;
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.data || {})) {
      params.set(key, value);
    }
    output.body = params.toString();
  } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
    const form = new FormData();
    if (options.data instanceof FormData) {
      options.data.forEach((value, key) => {
        form.append(key, value);
      });
    } else {
      for (const key of Object.keys(options.data)) {
        form.append(key, options.data[key]);
      }
    }
    output.body = form;
    const headers2 = new Headers(output.headers);
    headers2.delete("content-type");
    output.headers = headers2;
  } else if (type.includes("application/json") || typeof options.data === "object") {
    output.body = JSON.stringify(options.data);
  }
  return output;
};
class CapacitorHttpPluginWeb extends WebPlugin {
  /**
   * Perform an Http request given a set of options
   * @param options Options to build the HTTP request
   */
  async request(options) {
    const requestInit = buildRequestInit(options, options.webFetchExtra);
    const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
    const url = urlParams ? `${options.url}?${urlParams}` : options.url;
    const response = await fetch(url, requestInit);
    const contentType = response.headers.get("content-type") || "";
    let { responseType = "text" } = response.ok ? options : {};
    if (contentType.includes("application/json")) {
      responseType = "json";
    }
    let data;
    let blob;
    switch (responseType) {
      case "arraybuffer":
      case "blob":
        blob = await response.blob();
        data = await readBlobAsBase64(blob);
        break;
      case "json":
        data = await response.json();
        break;
      case "document":
      case "text":
      default:
        data = await response.text();
    }
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return {
      data,
      headers,
      status: response.status,
      url: response.url
    };
  }
  /**
   * Perform an Http GET request given a set of options
   * @param options Options to build the HTTP request
   */
  async get(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
  }
  /**
   * Perform an Http POST request given a set of options
   * @param options Options to build the HTTP request
   */
  async post(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
  }
  /**
   * Perform an Http PUT request given a set of options
   * @param options Options to build the HTTP request
   */
  async put(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
  }
  /**
   * Perform an Http PATCH request given a set of options
   * @param options Options to build the HTTP request
   */
  async patch(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
  }
  /**
   * Perform an Http DELETE request given a set of options
   * @param options Options to build the HTTP request
   */
  async delete(options) {
    return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
  }
}
registerPlugin("CapacitorHttp", {
  web: () => new CapacitorHttpPluginWeb()
});
var SystemBarsStyle;
(function(SystemBarsStyle2) {
  SystemBarsStyle2["Dark"] = "DARK";
  SystemBarsStyle2["Light"] = "LIGHT";
  SystemBarsStyle2["Default"] = "DEFAULT";
})(SystemBarsStyle || (SystemBarsStyle = {}));
var SystemBarType;
(function(SystemBarType2) {
  SystemBarType2["StatusBar"] = "StatusBar";
  SystemBarType2["NavigationBar"] = "NavigationBar";
})(SystemBarType || (SystemBarType = {}));
class SystemBarsPluginWeb extends WebPlugin {
  async setStyle() {
    this.unavailable("not available for web");
  }
  async setAnimation() {
    this.unavailable("not available for web");
  }
  async show() {
    this.unavailable("not available for web");
  }
  async hide() {
    this.unavailable("not available for web");
  }
}
registerPlugin("SystemBars", {
  web: () => new SystemBarsPluginWeb()
});
var Persistence;
(function(Persistence2) {
  Persistence2["IndexedDbLocal"] = "INDEXED_DB_LOCAL";
  Persistence2["InMemory"] = "IN_MEMORY";
  Persistence2["BrowserLocal"] = "BROWSER_LOCAL";
  Persistence2["BrowserSession"] = "BROWSER_SESSION";
})(Persistence || (Persistence = {}));
var ProviderId;
(function(ProviderId2) {
  ProviderId2["APPLE"] = "apple.com";
  ProviderId2["FACEBOOK"] = "facebook.com";
  ProviderId2["GAME_CENTER"] = "gc.apple.com";
  ProviderId2["GITHUB"] = "github.com";
  ProviderId2["GOOGLE"] = "google.com";
  ProviderId2["MICROSOFT"] = "microsoft.com";
  ProviderId2["PLAY_GAMES"] = "playgames.google.com";
  ProviderId2["TWITTER"] = "twitter.com";
  ProviderId2["YAHOO"] = "yahoo.com";
  ProviderId2["PASSWORD"] = "password";
  ProviderId2["PHONE"] = "phone";
})(ProviderId || (ProviderId = {}));
const FirebaseAuthentication = registerPlugin("FirebaseAuthentication", {
  web: () => __vitePreload(() => import("./web-3iN05rFQ.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0).then((m) => new m.FirebaseAuthenticationWeb())
});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LONG_TYPE = "type.googleapis.com/google.protobuf.Int64Value";
const UNSIGNED_LONG_TYPE = "type.googleapis.com/google.protobuf.UInt64Value";
function mapValues(o, f) {
  const result = {};
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      result[key] = f(o[key]);
    }
  }
  return result;
}
function encode$1(data) {
  if (data == null) {
    return null;
  }
  if (data instanceof Number) {
    data = data.valueOf();
  }
  if (typeof data === "number" && isFinite(data)) {
    return data;
  }
  if (data === true || data === false) {
    return data;
  }
  if (Object.prototype.toString.call(data) === "[object String]") {
    return data;
  }
  if (data instanceof Date) {
    return data.toISOString();
  }
  if (Array.isArray(data)) {
    return data.map((x) => encode$1(x));
  }
  if (typeof data === "function" || typeof data === "object") {
    return mapValues(data, (x) => encode$1(x));
  }
  throw new Error("Data cannot be encoded in JSON: " + data);
}
function decode$1(json2) {
  if (json2 == null) {
    return json2;
  }
  if (json2["@type"]) {
    switch (json2["@type"]) {
      case LONG_TYPE:
      case UNSIGNED_LONG_TYPE: {
        const value = Number(json2["value"]);
        if (isNaN(value)) {
          throw new Error("Data cannot be decoded from JSON: " + json2);
        }
        return value;
      }
      default: {
        throw new Error("Data cannot be decoded from JSON: " + json2);
      }
    }
  }
  if (Array.isArray(json2)) {
    return json2.map((x) => decode$1(x));
  }
  if (typeof json2 === "function" || typeof json2 === "object") {
    return mapValues(json2, (x) => decode$1(x));
  }
  return json2;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const FUNCTIONS_TYPE = "functions";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const errorCodeMap = {
  OK: "ok",
  CANCELLED: "cancelled",
  UNKNOWN: "unknown",
  INVALID_ARGUMENT: "invalid-argument",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  NOT_FOUND: "not-found",
  ALREADY_EXISTS: "already-exists",
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  OUT_OF_RANGE: "out-of-range",
  UNIMPLEMENTED: "unimplemented",
  INTERNAL: "internal",
  UNAVAILABLE: "unavailable",
  DATA_LOSS: "data-loss"
};
class FunctionsError extends FirebaseError {
  constructor(code, message, details) {
    super(`${FUNCTIONS_TYPE}/${code}`, message || "");
    this.details = details;
  }
}
function codeForHTTPStatus(status) {
  if (status >= 200 && status < 300) {
    return "ok";
  }
  switch (status) {
    case 0:
      return "internal";
    case 400:
      return "invalid-argument";
    case 401:
      return "unauthenticated";
    case 403:
      return "permission-denied";
    case 404:
      return "not-found";
    case 409:
      return "aborted";
    case 429:
      return "resource-exhausted";
    case 499:
      return "cancelled";
    case 500:
      return "internal";
    case 501:
      return "unimplemented";
    case 503:
      return "unavailable";
    case 504:
      return "deadline-exceeded";
  }
  return "unknown";
}
function _errorForResponse(status, bodyJSON) {
  let code = codeForHTTPStatus(status);
  let description = code;
  let details = void 0;
  try {
    const errorJSON = bodyJSON && bodyJSON.error;
    if (errorJSON) {
      const status2 = errorJSON.status;
      if (typeof status2 === "string") {
        if (!errorCodeMap[status2]) {
          return new FunctionsError("internal", "internal");
        }
        code = errorCodeMap[status2];
        description = status2;
      }
      const message = errorJSON.message;
      if (typeof message === "string") {
        description = message;
      }
      details = errorJSON.details;
      if (details !== void 0) {
        details = decode$1(details);
      }
    }
  } catch (e) {
  }
  if (code === "ok") {
    return null;
  }
  return new FunctionsError(code, description, details);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ContextProvider {
  constructor(authProvider, messagingProvider, appCheckProvider) {
    this.auth = null;
    this.messaging = null;
    this.appCheck = null;
    this.auth = authProvider.getImmediate({ optional: true });
    this.messaging = messagingProvider.getImmediate({
      optional: true
    });
    if (!this.auth) {
      authProvider.get().then((auth2) => this.auth = auth2, () => {
      });
    }
    if (!this.messaging) {
      messagingProvider.get().then((messaging2) => this.messaging = messaging2, () => {
      });
    }
    if (!this.appCheck) {
      appCheckProvider.get().then((appCheck) => this.appCheck = appCheck, () => {
      });
    }
  }
  async getAuthToken() {
    if (!this.auth) {
      return void 0;
    }
    try {
      const token = await this.auth.getToken();
      return token === null || token === void 0 ? void 0 : token.accessToken;
    } catch (e) {
      return void 0;
    }
  }
  async getMessagingToken() {
    if (!this.messaging || !("Notification" in self) || Notification.permission !== "granted") {
      return void 0;
    }
    try {
      return await this.messaging.getToken();
    } catch (e) {
      return void 0;
    }
  }
  async getAppCheckToken(limitedUseAppCheckTokens) {
    if (this.appCheck) {
      const result = limitedUseAppCheckTokens ? await this.appCheck.getLimitedUseToken() : await this.appCheck.getToken();
      if (result.error) {
        return null;
      }
      return result.token;
    }
    return null;
  }
  async getContext(limitedUseAppCheckTokens) {
    const authToken = await this.getAuthToken();
    const messagingToken = await this.getMessagingToken();
    const appCheckToken = await this.getAppCheckToken(limitedUseAppCheckTokens);
    return { authToken, messagingToken, appCheckToken };
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_REGION = "us-central1";
function failAfter(millis) {
  let timer = null;
  return {
    promise: new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new FunctionsError("deadline-exceeded", "deadline-exceeded"));
      }, millis);
    }),
    cancel: () => {
      if (timer) {
        clearTimeout(timer);
      }
    }
  };
}
class FunctionsService {
  /**
   * Creates a new Functions service for the given app.
   * @param app - The FirebaseApp to use.
   */
  constructor(app2, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain = DEFAULT_REGION, fetchImpl) {
    this.app = app2;
    this.fetchImpl = fetchImpl;
    this.emulatorOrigin = null;
    this.contextProvider = new ContextProvider(authProvider, messagingProvider, appCheckProvider);
    this.cancelAllRequests = new Promise((resolve) => {
      this.deleteService = () => {
        return Promise.resolve(resolve());
      };
    });
    try {
      const url = new URL(regionOrCustomDomain);
      this.customDomain = url.origin + (url.pathname === "/" ? "" : url.pathname);
      this.region = DEFAULT_REGION;
    } catch (e) {
      this.customDomain = null;
      this.region = regionOrCustomDomain;
    }
  }
  _delete() {
    return this.deleteService();
  }
  /**
   * Returns the URL for a callable with the given name.
   * @param name - The name of the callable.
   * @internal
   */
  _url(name2) {
    const projectId = this.app.options.projectId;
    if (this.emulatorOrigin !== null) {
      const origin = this.emulatorOrigin;
      return `${origin}/${projectId}/${this.region}/${name2}`;
    }
    if (this.customDomain !== null) {
      return `${this.customDomain}/${name2}`;
    }
    return `https://${this.region}-${projectId}.cloudfunctions.net/${name2}`;
  }
}
function connectFunctionsEmulator$1(functionsInstance, host, port) {
  functionsInstance.emulatorOrigin = `http://${host}:${port}`;
}
function httpsCallable$1(functionsInstance, name2, options) {
  return (data) => {
    return call(functionsInstance, name2, data, {});
  };
}
async function postJSON(url, body, headers, fetchImpl) {
  headers["Content-Type"] = "application/json";
  let response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers
    });
  } catch (e) {
    return {
      status: 0,
      json: null
    };
  }
  let json2 = null;
  try {
    json2 = await response.json();
  } catch (e) {
  }
  return {
    status: response.status,
    json: json2
  };
}
function call(functionsInstance, name2, data, options) {
  const url = functionsInstance._url(name2);
  return callAtURL(functionsInstance, url, data, options);
}
async function callAtURL(functionsInstance, url, data, options) {
  data = encode$1(data);
  const body = { data };
  const headers = {};
  const context = await functionsInstance.contextProvider.getContext(options.limitedUseAppCheckTokens);
  if (context.authToken) {
    headers["Authorization"] = "Bearer " + context.authToken;
  }
  if (context.messagingToken) {
    headers["Firebase-Instance-ID-Token"] = context.messagingToken;
  }
  if (context.appCheckToken !== null) {
    headers["X-Firebase-AppCheck"] = context.appCheckToken;
  }
  const timeout = options.timeout || 7e4;
  const failAfterHandle = failAfter(timeout);
  const response = await Promise.race([
    postJSON(url, body, headers, functionsInstance.fetchImpl),
    failAfterHandle.promise,
    functionsInstance.cancelAllRequests
  ]);
  failAfterHandle.cancel();
  if (!response) {
    throw new FunctionsError("cancelled", "Firebase Functions instance was deleted.");
  }
  const error = _errorForResponse(response.status, response.json);
  if (error) {
    throw error;
  }
  if (!response.json) {
    throw new FunctionsError("internal", "Response is not valid JSON object.");
  }
  let responseData = response.json.data;
  if (typeof responseData === "undefined") {
    responseData = response.json.result;
  }
  if (typeof responseData === "undefined") {
    throw new FunctionsError("internal", "Response is missing data field.");
  }
  const decodedData = decode$1(responseData);
  return { data: decodedData };
}
const name$2 = "@firebase/functions";
const version$5 = "0.11.8";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const AUTH_INTERNAL_NAME = "auth-internal";
const APP_CHECK_INTERNAL_NAME = "app-check-internal";
const MESSAGING_INTERNAL_NAME = "messaging-internal";
function registerFunctions(fetchImpl, variant) {
  const factory = (container, { instanceIdentifier: regionOrCustomDomain }) => {
    const app2 = container.getProvider("app").getImmediate();
    const authProvider = container.getProvider(AUTH_INTERNAL_NAME);
    const messagingProvider = container.getProvider(MESSAGING_INTERNAL_NAME);
    const appCheckProvider = container.getProvider(APP_CHECK_INTERNAL_NAME);
    return new FunctionsService(app2, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain, fetchImpl);
  };
  _registerComponent(new Component(
    FUNCTIONS_TYPE,
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(true));
  registerVersion(name$2, version$5, variant);
  registerVersion(name$2, version$5, "esm2017");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getFunctions(app2 = getApp(), regionOrCustomDomain = DEFAULT_REGION) {
  const functionsProvider = _getProvider(getModularInstance(app2), FUNCTIONS_TYPE);
  const functionsInstance = functionsProvider.getImmediate({
    identifier: regionOrCustomDomain
  });
  const emulator = getDefaultEmulatorHostnameAndPort("functions");
  if (emulator) {
    connectFunctionsEmulator(functionsInstance, ...emulator);
  }
  return functionsInstance;
}
function connectFunctionsEmulator(functionsInstance, host, port) {
  connectFunctionsEmulator$1(getModularInstance(functionsInstance), host, port);
}
function httpsCallable(functionsInstance, name2, options) {
  return httpsCallable$1(getModularInstance(functionsInstance), name2);
}
registerFunctions(fetch.bind(self));
const name$1 = "@firebase/installations";
const version$4 = "0.6.9";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PENDING_TIMEOUT_MS = 1e4;
const PACKAGE_VERSION = `w:${version$4}`;
const INTERNAL_AUTH_VERSION = "FIS_v2";
const INSTALLATIONS_API_URL = "https://firebaseinstallations.googleapis.com/v1";
const TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1e3;
const SERVICE = "installations";
const SERVICE_NAME = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERROR_DESCRIPTION_MAP = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "not-registered"
    /* ErrorCode.NOT_REGISTERED */
  ]: "Firebase Installation is not registered.",
  [
    "installation-not-found"
    /* ErrorCode.INSTALLATION_NOT_FOUND */
  ]: "Firebase Installation not found.",
  [
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  ]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  [
    "app-offline"
    /* ErrorCode.APP_OFFLINE */
  ]: "Could not process request. Application offline.",
  [
    "delete-pending-registration"
    /* ErrorCode.DELETE_PENDING_REGISTRATION */
  ]: "Can't delete installation while there is a pending registration request."
};
const ERROR_FACTORY$1 = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
function isServerError(error) {
  return error instanceof FirebaseError && error.code.includes(
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getInstallationsEndpoint({ projectId }) {
  return `${INSTALLATIONS_API_URL}/projects/${projectId}/installations`;
}
function extractAuthTokenInfoFromResponse(response) {
  return {
    token: response.token,
    requestStatus: 2,
    expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
    creationTime: Date.now()
  };
}
async function getErrorFromResponse(requestName, response) {
  const responseJson = await response.json();
  const errorData = responseJson.error;
  return ERROR_FACTORY$1.create("request-failed", {
    requestName,
    serverCode: errorData.code,
    serverMessage: errorData.message,
    serverStatus: errorData.status
  });
}
function getHeaders$1({ apiKey }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": apiKey
  });
}
function getHeadersWithAuth(appConfig, { refreshToken }) {
  const headers = getHeaders$1(appConfig);
  headers.append("Authorization", getAuthorizationHeader(refreshToken));
  return headers;
}
async function retryIfServerError(fn) {
  const result = await fn();
  if (result.status >= 500 && result.status < 600) {
    return fn();
  }
  return result;
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
  return Number(responseExpiresIn.replace("s", "000"));
}
function getAuthorizationHeader(refreshToken) {
  return `${INTERNAL_AUTH_VERSION} ${refreshToken}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function createInstallationRequest({ appConfig, heartbeatServiceProvider }, { fid }) {
  const endpoint = getInstallationsEndpoint(appConfig);
  const headers = getHeaders$1(appConfig);
  const heartbeatService = heartbeatServiceProvider.getImmediate({
    optional: true
  });
  if (heartbeatService) {
    const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
    if (heartbeatsHeader) {
      headers.append("x-firebase-client", heartbeatsHeader);
    }
  }
  const body = {
    fid,
    authVersion: INTERNAL_AUTH_VERSION,
    appId: appConfig.appId,
    sdkVersion: PACKAGE_VERSION
  };
  const request = {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  };
  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (response.ok) {
    const responseValue = await response.json();
    const registeredInstallationEntry = {
      fid: responseValue.fid || fid,
      registrationStatus: 2,
      refreshToken: responseValue.refreshToken,
      authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
    };
    return registeredInstallationEntry;
  } else {
    throw await getErrorFromResponse("Create Installation", response);
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function sleep$2(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function bufferToBase64UrlSafe(array) {
  const b64 = btoa(String.fromCharCode(...array));
  return b64.replace(/\+/g, "-").replace(/\//g, "_");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
const INVALID_FID = "";
function generateFid() {
  try {
    const fidByteArray = new Uint8Array(17);
    const crypto = self.crypto || self.msCrypto;
    crypto.getRandomValues(fidByteArray);
    fidByteArray[0] = 112 + fidByteArray[0] % 16;
    const fid = encode(fidByteArray);
    return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
  } catch (_a2) {
    return INVALID_FID;
  }
}
function encode(fidByteArray) {
  const b64String = bufferToBase64UrlSafe(fidByteArray);
  return b64String.substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getKey$1(appConfig) {
  return `${appConfig.appName}!${appConfig.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fidChangeCallbacks = /* @__PURE__ */ new Map();
function fidChanged(appConfig, fid) {
  const key = getKey$1(appConfig);
  callFidChangeCallbacks(key, fid);
  broadcastFidChange(key, fid);
}
function callFidChangeCallbacks(key, fid) {
  const callbacks = fidChangeCallbacks.get(key);
  if (!callbacks) {
    return;
  }
  for (const callback of callbacks) {
    callback(fid);
  }
}
function broadcastFidChange(key, fid) {
  const channel = getBroadcastChannel();
  if (channel) {
    channel.postMessage({ key, fid });
  }
  closeBroadcastChannel();
}
let broadcastChannel = null;
function getBroadcastChannel() {
  if (!broadcastChannel && "BroadcastChannel" in self) {
    broadcastChannel = new BroadcastChannel("[Firebase] FID Change");
    broadcastChannel.onmessage = (e) => {
      callFidChangeCallbacks(e.data.key, e.data.fid);
    };
  }
  return broadcastChannel;
}
function closeBroadcastChannel() {
  if (fidChangeCallbacks.size === 0 && broadcastChannel) {
    broadcastChannel.close();
    broadcastChannel = null;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DATABASE_NAME$1 = "firebase-installations-database";
const DATABASE_VERSION$1 = 1;
const OBJECT_STORE_NAME$1 = "firebase-installations-store";
let dbPromise$1 = null;
function getDbPromise$1() {
  if (!dbPromise$1) {
    dbPromise$1 = openDB(DATABASE_NAME$1, DATABASE_VERSION$1, {
      upgrade: (db2, oldVersion) => {
        switch (oldVersion) {
          case 0:
            db2.createObjectStore(OBJECT_STORE_NAME$1);
        }
      }
    });
  }
  return dbPromise$1;
}
async function set(appConfig, value) {
  const key = getKey$1(appConfig);
  const db2 = await getDbPromise$1();
  const tx = db2.transaction(OBJECT_STORE_NAME$1, "readwrite");
  const objectStore = tx.objectStore(OBJECT_STORE_NAME$1);
  const oldValue = await objectStore.get(key);
  await objectStore.put(value, key);
  await tx.done;
  if (!oldValue || oldValue.fid !== value.fid) {
    fidChanged(appConfig, value.fid);
  }
  return value;
}
async function remove(appConfig) {
  const key = getKey$1(appConfig);
  const db2 = await getDbPromise$1();
  const tx = db2.transaction(OBJECT_STORE_NAME$1, "readwrite");
  await tx.objectStore(OBJECT_STORE_NAME$1).delete(key);
  await tx.done;
}
async function update(appConfig, updateFn) {
  const key = getKey$1(appConfig);
  const db2 = await getDbPromise$1();
  const tx = db2.transaction(OBJECT_STORE_NAME$1, "readwrite");
  const store = tx.objectStore(OBJECT_STORE_NAME$1);
  const oldValue = await store.get(key);
  const newValue = updateFn(oldValue);
  if (newValue === void 0) {
    await store.delete(key);
  } else {
    await store.put(newValue, key);
  }
  await tx.done;
  if (newValue && (!oldValue || oldValue.fid !== newValue.fid)) {
    fidChanged(appConfig, newValue.fid);
  }
  return newValue;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function getInstallationEntry(installations) {
  let registrationPromise;
  const installationEntry = await update(installations.appConfig, (oldEntry) => {
    const installationEntry2 = updateOrCreateInstallationEntry(oldEntry);
    const entryWithPromise = triggerRegistrationIfNecessary(installations, installationEntry2);
    registrationPromise = entryWithPromise.registrationPromise;
    return entryWithPromise.installationEntry;
  });
  if (installationEntry.fid === INVALID_FID) {
    return { installationEntry: await registrationPromise };
  }
  return {
    installationEntry,
    registrationPromise
  };
}
function updateOrCreateInstallationEntry(oldEntry) {
  const entry = oldEntry || {
    fid: generateFid(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return clearTimedOutRequest(entry);
}
function triggerRegistrationIfNecessary(installations, installationEntry) {
  if (installationEntry.registrationStatus === 0) {
    if (!navigator.onLine) {
      const registrationPromiseWithError = Promise.reject(ERROR_FACTORY$1.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry,
        registrationPromise: registrationPromiseWithError
      };
    }
    const inProgressEntry = {
      fid: installationEntry.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    };
    const registrationPromise = registerInstallation(installations, inProgressEntry);
    return { installationEntry: inProgressEntry, registrationPromise };
  } else if (installationEntry.registrationStatus === 1) {
    return {
      installationEntry,
      registrationPromise: waitUntilFidRegistration(installations)
    };
  } else {
    return { installationEntry };
  }
}
async function registerInstallation(installations, installationEntry) {
  try {
    const registeredInstallationEntry = await createInstallationRequest(installations, installationEntry);
    return set(installations.appConfig, registeredInstallationEntry);
  } catch (e) {
    if (isServerError(e) && e.customData.serverCode === 409) {
      await remove(installations.appConfig);
    } else {
      await set(installations.appConfig, {
        fid: installationEntry.fid,
        registrationStatus: 0
        /* RequestStatus.NOT_STARTED */
      });
    }
    throw e;
  }
}
async function waitUntilFidRegistration(installations) {
  let entry = await updateInstallationRequest(installations.appConfig);
  while (entry.registrationStatus === 1) {
    await sleep$2(100);
    entry = await updateInstallationRequest(installations.appConfig);
  }
  if (entry.registrationStatus === 0) {
    const { installationEntry, registrationPromise } = await getInstallationEntry(installations);
    if (registrationPromise) {
      return registrationPromise;
    } else {
      return installationEntry;
    }
  }
  return entry;
}
function updateInstallationRequest(appConfig) {
  return update(appConfig, (oldEntry) => {
    if (!oldEntry) {
      throw ERROR_FACTORY$1.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    }
    return clearTimedOutRequest(oldEntry);
  });
}
function clearTimedOutRequest(entry) {
  if (hasInstallationRequestTimedOut(entry)) {
    return {
      fid: entry.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    };
  }
  return entry;
}
function hasInstallationRequestTimedOut(installationEntry) {
  return installationEntry.registrationStatus === 1 && installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function generateAuthTokenRequest({ appConfig, heartbeatServiceProvider }, installationEntry) {
  const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
  const headers = getHeadersWithAuth(appConfig, installationEntry);
  const heartbeatService = heartbeatServiceProvider.getImmediate({
    optional: true
  });
  if (heartbeatService) {
    const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
    if (heartbeatsHeader) {
      headers.append("x-firebase-client", heartbeatsHeader);
    }
  }
  const body = {
    installation: {
      sdkVersion: PACKAGE_VERSION,
      appId: appConfig.appId
    }
  };
  const request = {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  };
  const response = await retryIfServerError(() => fetch(endpoint, request));
  if (response.ok) {
    const responseValue = await response.json();
    const completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
    return completedAuthToken;
  } else {
    throw await getErrorFromResponse("Generate Auth Token", response);
  }
}
function getGenerateAuthTokenEndpoint(appConfig, { fid }) {
  return `${getInstallationsEndpoint(appConfig)}/${fid}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function refreshAuthToken(installations, forceRefresh = false) {
  let tokenPromise;
  const entry = await update(installations.appConfig, (oldEntry) => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY$1.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    }
    const oldAuthToken = oldEntry.authToken;
    if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
      return oldEntry;
    } else if (oldAuthToken.requestStatus === 1) {
      tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
      return oldEntry;
    } else {
      if (!navigator.onLine) {
        throw ERROR_FACTORY$1.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      }
      const inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
      tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
      return inProgressEntry;
    }
  });
  const authToken = tokenPromise ? await tokenPromise : entry.authToken;
  return authToken;
}
async function waitUntilAuthTokenRequest(installations, forceRefresh) {
  let entry = await updateAuthTokenRequest(installations.appConfig);
  while (entry.authToken.requestStatus === 1) {
    await sleep$2(100);
    entry = await updateAuthTokenRequest(installations.appConfig);
  }
  const authToken = entry.authToken;
  if (authToken.requestStatus === 0) {
    return refreshAuthToken(installations, forceRefresh);
  } else {
    return authToken;
  }
}
function updateAuthTokenRequest(appConfig) {
  return update(appConfig, (oldEntry) => {
    if (!isEntryRegistered(oldEntry)) {
      throw ERROR_FACTORY$1.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    }
    const oldAuthToken = oldEntry.authToken;
    if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
      return Object.assign(Object.assign({}, oldEntry), { authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      } });
    }
    return oldEntry;
  });
}
async function fetchAuthTokenFromServer(installations, installationEntry) {
  try {
    const authToken = await generateAuthTokenRequest(installations, installationEntry);
    const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken });
    await set(installations.appConfig, updatedInstallationEntry);
    return authToken;
  } catch (e) {
    if (isServerError(e) && (e.customData.serverCode === 401 || e.customData.serverCode === 404)) {
      await remove(installations.appConfig);
    } else {
      const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      } });
      await set(installations.appConfig, updatedInstallationEntry);
    }
    throw e;
  }
}
function isEntryRegistered(installationEntry) {
  return installationEntry !== void 0 && installationEntry.registrationStatus === 2;
}
function isAuthTokenValid(authToken) {
  return authToken.requestStatus === 2 && !isAuthTokenExpired(authToken);
}
function isAuthTokenExpired(authToken) {
  const now2 = Date.now();
  return now2 < authToken.creationTime || authToken.creationTime + authToken.expiresIn < now2 + TOKEN_EXPIRATION_BUFFER;
}
function makeAuthTokenRequestInProgressEntry(oldEntry) {
  const inProgressAuthToken = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return Object.assign(Object.assign({}, oldEntry), { authToken: inProgressAuthToken });
}
function hasAuthTokenRequestTimedOut(authToken) {
  return authToken.requestStatus === 1 && authToken.requestTime + PENDING_TIMEOUT_MS < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function getId(installations) {
  const installationsImpl = installations;
  const { installationEntry, registrationPromise } = await getInstallationEntry(installationsImpl);
  if (registrationPromise) {
    registrationPromise.catch(console.error);
  } else {
    refreshAuthToken(installationsImpl).catch(console.error);
  }
  return installationEntry.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function getToken$3(installations, forceRefresh = false) {
  const installationsImpl = installations;
  await completeInstallationRegistration(installationsImpl);
  const authToken = await refreshAuthToken(installationsImpl, forceRefresh);
  return authToken.token;
}
async function completeInstallationRegistration(installations) {
  const { registrationPromise } = await getInstallationEntry(installations);
  if (registrationPromise) {
    await registrationPromise;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function extractAppConfig$1(app2) {
  if (!app2 || !app2.options) {
    throw getMissingValueError$1("App Configuration");
  }
  if (!app2.name) {
    throw getMissingValueError$1("App Name");
  }
  const configKeys = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const keyName of configKeys) {
    if (!app2.options[keyName]) {
      throw getMissingValueError$1(keyName);
    }
  }
  return {
    appName: app2.name,
    projectId: app2.options.projectId,
    apiKey: app2.options.apiKey,
    appId: app2.options.appId
  };
}
function getMissingValueError$1(valueName) {
  return ERROR_FACTORY$1.create("missing-app-config-values", {
    valueName
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const INSTALLATIONS_NAME = "installations";
const INSTALLATIONS_NAME_INTERNAL = "installations-internal";
const publicFactory = (container) => {
  const app2 = container.getProvider("app").getImmediate();
  const appConfig = extractAppConfig$1(app2);
  const heartbeatServiceProvider = _getProvider(app2, "heartbeat");
  const installationsImpl = {
    app: app2,
    appConfig,
    heartbeatServiceProvider,
    _delete: () => Promise.resolve()
  };
  return installationsImpl;
};
const internalFactory = (container) => {
  const app2 = container.getProvider("app").getImmediate();
  const installations = _getProvider(app2, INSTALLATIONS_NAME).getImmediate();
  const installationsInternal = {
    getId: () => getId(installations),
    getToken: (forceRefresh) => getToken$3(installations, forceRefresh)
  };
  return installationsInternal;
};
function registerInstallations() {
  _registerComponent(new Component(
    INSTALLATIONS_NAME,
    publicFactory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
  _registerComponent(new Component(
    INSTALLATIONS_NAME_INTERNAL,
    internalFactory,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
registerInstallations();
registerVersion(name$1, version$4);
registerVersion(name$1, version$4, "esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_SW_PATH = "/firebase-messaging-sw.js";
const DEFAULT_SW_SCOPE = "/firebase-cloud-messaging-push-scope";
const DEFAULT_VAPID_KEY = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";
const ENDPOINT = "https://fcmregistrations.googleapis.com/v1";
const CONSOLE_CAMPAIGN_ID = "google.c.a.c_id";
const CONSOLE_CAMPAIGN_NAME = "google.c.a.c_l";
const CONSOLE_CAMPAIGN_TIME = "google.c.a.ts";
const CONSOLE_CAMPAIGN_ANALYTICS_ENABLED = "google.c.a.e";
var MessageType$1;
(function(MessageType2) {
  MessageType2[MessageType2["DATA_MESSAGE"] = 1] = "DATA_MESSAGE";
  MessageType2[MessageType2["DISPLAY_NOTIFICATION"] = 3] = "DISPLAY_NOTIFICATION";
})(MessageType$1 || (MessageType$1 = {}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
var MessageType;
(function(MessageType2) {
  MessageType2["PUSH_RECEIVED"] = "push-received";
  MessageType2["NOTIFICATION_CLICKED"] = "notification-clicked";
})(MessageType || (MessageType = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function arrayToBase64(array) {
  const uint8Array = new Uint8Array(array);
  const base64String = btoa(String.fromCharCode(...uint8Array));
  return base64String.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function base64ToArray(base64String) {
  const padding2 = "=".repeat((4 - base64String.length % 4) % 4);
  const base642 = (base64String + padding2).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base642);
  const outputArray = new Uint8Array(rawData.length);
  for (let i2 = 0; i2 < rawData.length; ++i2) {
    outputArray[i2] = rawData.charCodeAt(i2);
  }
  return outputArray;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const OLD_DB_NAME = "fcm_token_details_db";
const OLD_DB_VERSION = 5;
const OLD_OBJECT_STORE_NAME = "fcm_token_object_Store";
async function migrateOldDatabase(senderId) {
  if ("databases" in indexedDB) {
    const databases = await indexedDB.databases();
    const dbNames = databases.map((db3) => db3.name);
    if (!dbNames.includes(OLD_DB_NAME)) {
      return null;
    }
  }
  let tokenDetails = null;
  const db2 = await openDB(OLD_DB_NAME, OLD_DB_VERSION, {
    upgrade: async (db3, oldVersion, newVersion, upgradeTransaction) => {
      var _a2;
      if (oldVersion < 2) {
        return;
      }
      if (!db3.objectStoreNames.contains(OLD_OBJECT_STORE_NAME)) {
        return;
      }
      const objectStore = upgradeTransaction.objectStore(OLD_OBJECT_STORE_NAME);
      const value = await objectStore.index("fcmSenderId").get(senderId);
      await objectStore.clear();
      if (!value) {
        return;
      }
      if (oldVersion === 2) {
        const oldDetails = value;
        if (!oldDetails.auth || !oldDetails.p256dh || !oldDetails.endpoint) {
          return;
        }
        tokenDetails = {
          token: oldDetails.fcmToken,
          createTime: (_a2 = oldDetails.createTime) !== null && _a2 !== void 0 ? _a2 : Date.now(),
          subscriptionOptions: {
            auth: oldDetails.auth,
            p256dh: oldDetails.p256dh,
            endpoint: oldDetails.endpoint,
            swScope: oldDetails.swScope,
            vapidKey: typeof oldDetails.vapidKey === "string" ? oldDetails.vapidKey : arrayToBase64(oldDetails.vapidKey)
          }
        };
      } else if (oldVersion === 3) {
        const oldDetails = value;
        tokenDetails = {
          token: oldDetails.fcmToken,
          createTime: oldDetails.createTime,
          subscriptionOptions: {
            auth: arrayToBase64(oldDetails.auth),
            p256dh: arrayToBase64(oldDetails.p256dh),
            endpoint: oldDetails.endpoint,
            swScope: oldDetails.swScope,
            vapidKey: arrayToBase64(oldDetails.vapidKey)
          }
        };
      } else if (oldVersion === 4) {
        const oldDetails = value;
        tokenDetails = {
          token: oldDetails.fcmToken,
          createTime: oldDetails.createTime,
          subscriptionOptions: {
            auth: arrayToBase64(oldDetails.auth),
            p256dh: arrayToBase64(oldDetails.p256dh),
            endpoint: oldDetails.endpoint,
            swScope: oldDetails.swScope,
            vapidKey: arrayToBase64(oldDetails.vapidKey)
          }
        };
      }
    }
  });
  db2.close();
  await deleteDB(OLD_DB_NAME);
  await deleteDB("fcm_vapid_details_db");
  await deleteDB("undefined");
  return checkTokenDetails(tokenDetails) ? tokenDetails : null;
}
function checkTokenDetails(tokenDetails) {
  if (!tokenDetails || !tokenDetails.subscriptionOptions) {
    return false;
  }
  const { subscriptionOptions } = tokenDetails;
  return typeof tokenDetails.createTime === "number" && tokenDetails.createTime > 0 && typeof tokenDetails.token === "string" && tokenDetails.token.length > 0 && typeof subscriptionOptions.auth === "string" && subscriptionOptions.auth.length > 0 && typeof subscriptionOptions.p256dh === "string" && subscriptionOptions.p256dh.length > 0 && typeof subscriptionOptions.endpoint === "string" && subscriptionOptions.endpoint.length > 0 && typeof subscriptionOptions.swScope === "string" && subscriptionOptions.swScope.length > 0 && typeof subscriptionOptions.vapidKey === "string" && subscriptionOptions.vapidKey.length > 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DATABASE_NAME = "firebase-messaging-database";
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = "firebase-messaging-store";
let dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade: (upgradeDb, oldVersion) => {
        switch (oldVersion) {
          case 0:
            upgradeDb.createObjectStore(OBJECT_STORE_NAME);
        }
      }
    });
  }
  return dbPromise;
}
async function dbGet(firebaseDependencies) {
  const key = getKey(firebaseDependencies);
  const db2 = await getDbPromise();
  const tokenDetails = await db2.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME).get(key);
  if (tokenDetails) {
    return tokenDetails;
  } else {
    const oldTokenDetails = await migrateOldDatabase(firebaseDependencies.appConfig.senderId);
    if (oldTokenDetails) {
      await dbSet(firebaseDependencies, oldTokenDetails);
      return oldTokenDetails;
    }
  }
}
async function dbSet(firebaseDependencies, tokenDetails) {
  const key = getKey(firebaseDependencies);
  const db2 = await getDbPromise();
  const tx = db2.transaction(OBJECT_STORE_NAME, "readwrite");
  await tx.objectStore(OBJECT_STORE_NAME).put(tokenDetails, key);
  await tx.done;
  return tokenDetails;
}
function getKey({ appConfig }) {
  return appConfig.appId;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERROR_MAP = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "only-available-in-window"
    /* ErrorCode.AVAILABLE_IN_WINDOW */
  ]: "This method is available in a Window context.",
  [
    "only-available-in-sw"
    /* ErrorCode.AVAILABLE_IN_SW */
  ]: "This method is available in a service worker context.",
  [
    "permission-default"
    /* ErrorCode.PERMISSION_DEFAULT */
  ]: "The notification permission was not granted and dismissed instead.",
  [
    "permission-blocked"
    /* ErrorCode.PERMISSION_BLOCKED */
  ]: "The notification permission was not granted and blocked instead.",
  [
    "unsupported-browser"
    /* ErrorCode.UNSUPPORTED_BROWSER */
  ]: "This browser doesn't support the API's required to use the Firebase SDK.",
  [
    "indexed-db-unsupported"
    /* ErrorCode.INDEXED_DB_UNSUPPORTED */
  ]: "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
  [
    "failed-service-worker-registration"
    /* ErrorCode.FAILED_DEFAULT_REGISTRATION */
  ]: "We are unable to register the default service worker. {$browserErrorMessage}",
  [
    "token-subscribe-failed"
    /* ErrorCode.TOKEN_SUBSCRIBE_FAILED */
  ]: "A problem occurred while subscribing the user to FCM: {$errorInfo}",
  [
    "token-subscribe-no-token"
    /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
  ]: "FCM returned no token when subscribing the user to push.",
  [
    "token-unsubscribe-failed"
    /* ErrorCode.TOKEN_UNSUBSCRIBE_FAILED */
  ]: "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
  [
    "token-update-failed"
    /* ErrorCode.TOKEN_UPDATE_FAILED */
  ]: "A problem occurred while updating the user from FCM: {$errorInfo}",
  [
    "token-update-no-token"
    /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
  ]: "FCM returned no token when updating the user to push.",
  [
    "use-sw-after-get-token"
    /* ErrorCode.USE_SW_AFTER_GET_TOKEN */
  ]: "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
  [
    "invalid-sw-registration"
    /* ErrorCode.INVALID_SW_REGISTRATION */
  ]: "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
  [
    "invalid-bg-handler"
    /* ErrorCode.INVALID_BG_HANDLER */
  ]: "The input to setBackgroundMessageHandler() must be a function.",
  [
    "invalid-vapid-key"
    /* ErrorCode.INVALID_VAPID_KEY */
  ]: "The public VAPID key must be a string.",
  [
    "use-vapid-key-after-get-token"
    /* ErrorCode.USE_VAPID_KEY_AFTER_GET_TOKEN */
  ]: "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."
};
const ERROR_FACTORY = new ErrorFactory("messaging", "Messaging", ERROR_MAP);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function requestGetToken(firebaseDependencies, subscriptionOptions) {
  const headers = await getHeaders(firebaseDependencies);
  const body = getBody(subscriptionOptions);
  const subscribeOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  };
  let responseData;
  try {
    const response = await fetch(getEndpoint(firebaseDependencies.appConfig), subscribeOptions);
    responseData = await response.json();
  } catch (err) {
    throw ERROR_FACTORY.create("token-subscribe-failed", {
      errorInfo: err === null || err === void 0 ? void 0 : err.toString()
    });
  }
  if (responseData.error) {
    const message = responseData.error.message;
    throw ERROR_FACTORY.create("token-subscribe-failed", {
      errorInfo: message
    });
  }
  if (!responseData.token) {
    throw ERROR_FACTORY.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  }
  return responseData.token;
}
async function requestUpdateToken(firebaseDependencies, tokenDetails) {
  const headers = await getHeaders(firebaseDependencies);
  const body = getBody(tokenDetails.subscriptionOptions);
  const updateOptions = {
    method: "PATCH",
    headers,
    body: JSON.stringify(body)
  };
  let responseData;
  try {
    const response = await fetch(`${getEndpoint(firebaseDependencies.appConfig)}/${tokenDetails.token}`, updateOptions);
    responseData = await response.json();
  } catch (err) {
    throw ERROR_FACTORY.create("token-update-failed", {
      errorInfo: err === null || err === void 0 ? void 0 : err.toString()
    });
  }
  if (responseData.error) {
    const message = responseData.error.message;
    throw ERROR_FACTORY.create("token-update-failed", {
      errorInfo: message
    });
  }
  if (!responseData.token) {
    throw ERROR_FACTORY.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  }
  return responseData.token;
}
async function requestDeleteToken(firebaseDependencies, token) {
  const headers = await getHeaders(firebaseDependencies);
  const unsubscribeOptions = {
    method: "DELETE",
    headers
  };
  try {
    const response = await fetch(`${getEndpoint(firebaseDependencies.appConfig)}/${token}`, unsubscribeOptions);
    const responseData = await response.json();
    if (responseData.error) {
      const message = responseData.error.message;
      throw ERROR_FACTORY.create("token-unsubscribe-failed", {
        errorInfo: message
      });
    }
  } catch (err) {
    throw ERROR_FACTORY.create("token-unsubscribe-failed", {
      errorInfo: err === null || err === void 0 ? void 0 : err.toString()
    });
  }
}
function getEndpoint({ projectId }) {
  return `${ENDPOINT}/projects/${projectId}/registrations`;
}
async function getHeaders({ appConfig, installations }) {
  const authToken = await installations.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": appConfig.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${authToken}`
  });
}
function getBody({ p256dh, auth: auth2, endpoint, vapidKey }) {
  const body = {
    web: {
      endpoint,
      auth: auth2,
      p256dh
    }
  };
  if (vapidKey !== DEFAULT_VAPID_KEY) {
    body.web.applicationPubKey = vapidKey;
  }
  return body;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1e3;
async function getTokenInternal(messaging2) {
  const pushSubscription = await getPushSubscription(messaging2.swRegistration, messaging2.vapidKey);
  const subscriptionOptions = {
    vapidKey: messaging2.vapidKey,
    swScope: messaging2.swRegistration.scope,
    endpoint: pushSubscription.endpoint,
    auth: arrayToBase64(pushSubscription.getKey("auth")),
    p256dh: arrayToBase64(pushSubscription.getKey("p256dh"))
  };
  const tokenDetails = await dbGet(messaging2.firebaseDependencies);
  if (!tokenDetails) {
    return getNewToken(messaging2.firebaseDependencies, subscriptionOptions);
  } else if (!isTokenValid(tokenDetails.subscriptionOptions, subscriptionOptions)) {
    try {
      await requestDeleteToken(messaging2.firebaseDependencies, tokenDetails.token);
    } catch (e) {
      console.warn(e);
    }
    return getNewToken(messaging2.firebaseDependencies, subscriptionOptions);
  } else if (Date.now() >= tokenDetails.createTime + TOKEN_EXPIRATION_MS) {
    return updateToken(messaging2, {
      token: tokenDetails.token,
      createTime: Date.now(),
      subscriptionOptions
    });
  } else {
    return tokenDetails.token;
  }
}
async function updateToken(messaging2, tokenDetails) {
  try {
    const updatedToken = await requestUpdateToken(messaging2.firebaseDependencies, tokenDetails);
    const updatedTokenDetails = Object.assign(Object.assign({}, tokenDetails), { token: updatedToken, createTime: Date.now() });
    await dbSet(messaging2.firebaseDependencies, updatedTokenDetails);
    return updatedToken;
  } catch (e) {
    throw e;
  }
}
async function getNewToken(firebaseDependencies, subscriptionOptions) {
  const token = await requestGetToken(firebaseDependencies, subscriptionOptions);
  const tokenDetails = {
    token,
    createTime: Date.now(),
    subscriptionOptions
  };
  await dbSet(firebaseDependencies, tokenDetails);
  return tokenDetails.token;
}
async function getPushSubscription(swRegistration, vapidKey) {
  const subscription = await swRegistration.pushManager.getSubscription();
  if (subscription) {
    return subscription;
  }
  return swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: base64ToArray(vapidKey)
  });
}
function isTokenValid(dbOptions, currentOptions) {
  const isVapidKeyEqual = currentOptions.vapidKey === dbOptions.vapidKey;
  const isEndpointEqual = currentOptions.endpoint === dbOptions.endpoint;
  const isAuthEqual = currentOptions.auth === dbOptions.auth;
  const isP256dhEqual = currentOptions.p256dh === dbOptions.p256dh;
  return isVapidKeyEqual && isEndpointEqual && isAuthEqual && isP256dhEqual;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function externalizePayload(internalPayload) {
  const payload = {
    from: internalPayload.from,
    // eslint-disable-next-line camelcase
    collapseKey: internalPayload.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: internalPayload.fcmMessageId
  };
  propagateNotificationPayload(payload, internalPayload);
  propagateDataPayload(payload, internalPayload);
  propagateFcmOptions(payload, internalPayload);
  return payload;
}
function propagateNotificationPayload(payload, messagePayloadInternal) {
  if (!messagePayloadInternal.notification) {
    return;
  }
  payload.notification = {};
  const title = messagePayloadInternal.notification.title;
  if (!!title) {
    payload.notification.title = title;
  }
  const body = messagePayloadInternal.notification.body;
  if (!!body) {
    payload.notification.body = body;
  }
  const image = messagePayloadInternal.notification.image;
  if (!!image) {
    payload.notification.image = image;
  }
  const icon = messagePayloadInternal.notification.icon;
  if (!!icon) {
    payload.notification.icon = icon;
  }
}
function propagateDataPayload(payload, messagePayloadInternal) {
  if (!messagePayloadInternal.data) {
    return;
  }
  payload.data = messagePayloadInternal.data;
}
function propagateFcmOptions(payload, messagePayloadInternal) {
  var _a2, _b2, _c2, _d2, _e2;
  if (!messagePayloadInternal.fcmOptions && !((_a2 = messagePayloadInternal.notification) === null || _a2 === void 0 ? void 0 : _a2.click_action)) {
    return;
  }
  payload.fcmOptions = {};
  const link = (_c2 = (_b2 = messagePayloadInternal.fcmOptions) === null || _b2 === void 0 ? void 0 : _b2.link) !== null && _c2 !== void 0 ? _c2 : (_d2 = messagePayloadInternal.notification) === null || _d2 === void 0 ? void 0 : _d2.click_action;
  if (!!link) {
    payload.fcmOptions.link = link;
  }
  const analyticsLabel = (_e2 = messagePayloadInternal.fcmOptions) === null || _e2 === void 0 ? void 0 : _e2.analytics_label;
  if (!!analyticsLabel) {
    payload.fcmOptions.analyticsLabel = analyticsLabel;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isConsoleMessage(data) {
  return typeof data === "object" && !!data && CONSOLE_CAMPAIGN_ID in data;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function extractAppConfig(app2) {
  if (!app2 || !app2.options) {
    throw getMissingValueError("App Configuration Object");
  }
  if (!app2.name) {
    throw getMissingValueError("App Name");
  }
  const configKeys = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ];
  const { options } = app2;
  for (const keyName of configKeys) {
    if (!options[keyName]) {
      throw getMissingValueError(keyName);
    }
  }
  return {
    appName: app2.name,
    projectId: options.projectId,
    apiKey: options.apiKey,
    appId: options.appId,
    senderId: options.messagingSenderId
  };
}
function getMissingValueError(valueName) {
  return ERROR_FACTORY.create("missing-app-config-values", {
    valueName
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MessagingService {
  constructor(app2, installations, analyticsProvider) {
    this.deliveryMetricsExportedToBigQueryEnabled = false;
    this.onBackgroundMessageHandler = null;
    this.onMessageHandler = null;
    this.logEvents = [];
    this.isLogServiceStarted = false;
    const appConfig = extractAppConfig(app2);
    this.firebaseDependencies = {
      app: app2,
      appConfig,
      installations,
      analyticsProvider
    };
  }
  _delete() {
    return Promise.resolve();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function registerDefaultSw(messaging2) {
  try {
    messaging2.swRegistration = await navigator.serviceWorker.register(DEFAULT_SW_PATH, {
      scope: DEFAULT_SW_SCOPE
    });
    messaging2.swRegistration.update().catch(() => {
    });
  } catch (e) {
    throw ERROR_FACTORY.create("failed-service-worker-registration", {
      browserErrorMessage: e === null || e === void 0 ? void 0 : e.message
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function updateSwReg(messaging2, swRegistration) {
  if (!swRegistration && !messaging2.swRegistration) {
    await registerDefaultSw(messaging2);
  }
  if (!swRegistration && !!messaging2.swRegistration) {
    return;
  }
  if (!(swRegistration instanceof ServiceWorkerRegistration)) {
    throw ERROR_FACTORY.create(
      "invalid-sw-registration"
      /* ErrorCode.INVALID_SW_REGISTRATION */
    );
  }
  messaging2.swRegistration = swRegistration;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function updateVapidKey(messaging2, vapidKey) {
  if (!!vapidKey) {
    messaging2.vapidKey = vapidKey;
  } else if (!messaging2.vapidKey) {
    messaging2.vapidKey = DEFAULT_VAPID_KEY;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function getToken$1(messaging2, options) {
  if (!navigator) {
    throw ERROR_FACTORY.create(
      "only-available-in-window"
      /* ErrorCode.AVAILABLE_IN_WINDOW */
    );
  }
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
  if (Notification.permission !== "granted") {
    throw ERROR_FACTORY.create(
      "permission-blocked"
      /* ErrorCode.PERMISSION_BLOCKED */
    );
  }
  await updateVapidKey(messaging2, options === null || options === void 0 ? void 0 : options.vapidKey);
  await updateSwReg(messaging2, options === null || options === void 0 ? void 0 : options.serviceWorkerRegistration);
  return getTokenInternal(messaging2);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function logToScion(messaging2, messageType, data) {
  const eventType = getEventType(messageType);
  const analytics = await messaging2.firebaseDependencies.analyticsProvider.get();
  analytics.logEvent(eventType, {
    /* eslint-disable camelcase */
    message_id: data[CONSOLE_CAMPAIGN_ID],
    message_name: data[CONSOLE_CAMPAIGN_NAME],
    message_time: data[CONSOLE_CAMPAIGN_TIME],
    message_device_time: Math.floor(Date.now() / 1e3)
    /* eslint-enable camelcase */
  });
}
function getEventType(messageType) {
  switch (messageType) {
    case MessageType.NOTIFICATION_CLICKED:
      return "notification_open";
    case MessageType.PUSH_RECEIVED:
      return "notification_foreground";
    default:
      throw new Error();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function messageEventListener(messaging2, event) {
  const internalPayload = event.data;
  if (!internalPayload.isFirebaseMessaging) {
    return;
  }
  if (messaging2.onMessageHandler && internalPayload.messageType === MessageType.PUSH_RECEIVED) {
    if (typeof messaging2.onMessageHandler === "function") {
      messaging2.onMessageHandler(externalizePayload(internalPayload));
    } else {
      messaging2.onMessageHandler.next(externalizePayload(internalPayload));
    }
  }
  const dataPayload = internalPayload.data;
  if (isConsoleMessage(dataPayload) && dataPayload[CONSOLE_CAMPAIGN_ANALYTICS_ENABLED] === "1") {
    await logToScion(messaging2, internalPayload.messageType, dataPayload);
  }
}
const name = "@firebase/messaging";
const version$3 = "0.12.12";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const WindowMessagingFactory = (container) => {
  const messaging2 = new MessagingService(container.getProvider("app").getImmediate(), container.getProvider("installations-internal").getImmediate(), container.getProvider("analytics-internal"));
  navigator.serviceWorker.addEventListener("message", (e) => messageEventListener(messaging2, e));
  return messaging2;
};
const WindowMessagingInternalFactory = (container) => {
  const messaging2 = container.getProvider("messaging").getImmediate();
  const messagingInternal = {
    getToken: (options) => getToken$1(messaging2, options)
  };
  return messagingInternal;
};
function registerMessagingInWindow() {
  _registerComponent(new Component(
    "messaging",
    WindowMessagingFactory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
  _registerComponent(new Component(
    "messaging-internal",
    WindowMessagingInternalFactory,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  registerVersion(name, version$3);
  registerVersion(name, version$3, "esm2017");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function isWindowSupported() {
  try {
    await validateIndexedDBOpenable();
  } catch (e) {
    return false;
  }
  return typeof window !== "undefined" && isIndexedDBAvailable() && areCookiesEnabled() && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window && "fetch" in window && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function onMessage$1(messaging2, nextOrObserver) {
  if (!navigator) {
    throw ERROR_FACTORY.create(
      "only-available-in-window"
      /* ErrorCode.AVAILABLE_IN_WINDOW */
    );
  }
  messaging2.onMessageHandler = nextOrObserver;
  return () => {
    messaging2.onMessageHandler = null;
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getMessagingInWindow(app2 = getApp()) {
  isWindowSupported().then((isSupported) => {
    if (!isSupported) {
      throw ERROR_FACTORY.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
    }
  }, (_) => {
    throw ERROR_FACTORY.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  });
  return _getProvider(getModularInstance(app2), "messaging").getImmediate();
}
async function getToken$2(messaging2, options) {
  messaging2 = getModularInstance(messaging2);
  return getToken$1(messaging2, options);
}
function onMessage(messaging2, nextOrObserver) {
  messaging2 = getModularInstance(messaging2);
  return onMessage$1(messaging2, nextOrObserver);
}
registerMessagingInWindow();
const firebaseConfig = {
  apiKey: "AIzaSyCWRyVUAOTYiayOzzjVw200Vw1SMb2bchw",
  authDomain: "carnival-planner.firebaseapp.com",
  projectId: "carnival-planner",
  storageBucket: "carnival-planner.firebasestorage.app",
  messagingSenderId: "1036340118282",
  appId: "1:1036340118282:web:809dc12c298ff1b8f2f0f3",
  measurementId: "G-XC1K69PSVC"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, "squad-db");
const storage = getStorage(app);
Promise.resolve(true);
console.log("Firestore initialized");
let messaging = null;
const initMessaging = async () => {
  try {
    const supported = await isWindowSupported();
    if (supported) {
      messaging = getMessagingInWindow(app);
      console.log("Firebase Messaging initialized");
      return messaging;
    } else {
      console.log("Firebase Messaging not supported in this browser");
      return null;
    }
  } catch (err) {
    console.log("Error initializing Firebase Messaging:", err);
    return null;
  }
};
const requestNotificationPermission = async (vapidKey) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }
    if (!messaging) {
      await initMessaging();
    }
    if (!messaging) {
      return null;
    }
    const token = await getToken$2(messaging, { vapidKey });
    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.log("Error getting FCM token:", err);
    return null;
  }
};
const onForegroundMessage = (callback) => {
  if (!messaging) {
    initMessaging().then(() => {
      if (messaging) {
        onMessage(messaging, callback);
      }
    });
  } else {
    onMessage(messaging, callback);
  }
};
initMessaging();
const logo = "/assets/carnival-logo-CBA9n7vt.png";
const carnivalData = [
  // --- January 2026 ---
  { name: "Sugar Mas (St. Kitts)", date: "2026-01-01" },
  { name: "St. Croix Carnival", date: "2026-01-03" },
  // --- February 2026 ---
  { name: "Carnaval Ponceno (Puerto Rico)", date: "2026-02-12" },
  { name: "Aruba Carnival", date: "2026-02-14" },
  { name: "Barranquilla Carnival (Colombia)", date: "2026-02-14" },
  { name: "Martinique Carnival", date: "2026-02-15" },
  { name: "Rio Carnival (Brazil)", date: "2026-02-15" },
  { name: "Carnaval De Saint-Martin", date: "2026-02-15" },
  { name: "Mas Domnik (Dominica)", date: "2026-02-16" },
  { name: "Carriacou & Petite Martinique", date: "2026-02-16" },
  { name: "Venezuela Carnival", date: "2026-02-16" },
  { name: "Trinidad Carnival", date: "2026-02-16" },
  { name: "Guyana Mashramani", date: "2026-02-23" },
  { name: "Carnaval De San Pedro (Belize)", date: "2026-02-23" },
  // --- March 2026 ---
  { name: "Cape Town Carnival (South Africa)", date: "2026-03-21" },
  // --- April 2026 ---
  { name: "Virgin Gorda Easter Festival", date: "2026-04-05" },
  { name: "Jamaica Carnival", date: "2026-04-12" },
  { name: "Tampa Bay Carnival (USA)", date: "2026-04-18" },
  { name: "St. Maarten Carnival", date: "2026-04-30" },
  // --- May 2026 ---
  { name: "St. Thomas Carnival (USVI)", date: "2026-05-02" },
  { name: "Cayman Carnival Batabano", date: "2026-05-09" },
  { name: "Braccanal (Cayman Islands)", date: "2026-05-13" },
  { name: "Berlin Carnival (Germany)", date: "2026-05-22" },
  { name: "Atlanta Caribbean Carnival", date: "2026-05-23" },
  { name: "Aalborg Karneval (Denmark)", date: "2026-05-23" },
  { name: "Orlando Carnival", date: "2026-05-24" },
  { name: "Luton International Carnival (UK)", date: "2026-05-24" },
  { name: "Guyana Independence", date: "2026-05-26" },
  // --- June 2026 ---
  { name: "Munich Carnival (Germany)", date: "2026-06-04" },
  { name: "Bahamas Carnival", date: "2026-06-06" },
  { name: "South Carolina Carnival", date: "2026-06-11" },
  { name: "Bermuda Carnival", date: "2026-06-15" },
  { name: "Hollywood Carnival (USA)", date: "2026-06-20" },
  { name: "Caymas Carnival (Cayman Islands)", date: "2026-06-20" },
  { name: "Philadelphia Carnival", date: "2026-06-20" },
  { name: "Vienna Carnival (Austria)", date: "2026-06-26" },
  // --- July 2026 ---
  { name: "Vincy Mas (St. Vincent)", date: "2026-07-06" },
  { name: "Saint Lucia Carnival", date: "2026-07-20" },
  { name: "Anguilla Summer Festival", date: "2026-07-24" },
  { name: "Zomercarnaval (Rotterdam)", date: "2026-07-25" },
  // --- August 2026 ---
  { name: "Toronto Caribbean Carnival (Caribana)", date: "2026-08-01" },
  { name: "Crop Over (Barbados)", date: "2026-08-03" },
  { name: "Antigua Carnival", date: "2026-08-03" },
  { name: "Nevis Culturama Festival", date: "2026-08-04" },
  { name: "Cariwest (Canada)", date: "2026-08-07" },
  { name: "Spice Mas (Grenada)", date: "2026-08-10" },
  { name: "Notting Hill Carnival (London)", date: "2026-08-31" },
  // --- September 2026 ---
  { name: "New York Carnival (Labor Day)", date: "2026-09-07" },
  { name: "Japan Caribbean Carnival", date: "2026-09-23" },
  // --- October 2026 ---
  { name: "Miami Carnival", date: "2026-10-11" },
  // --- November 2026 ---
  { name: "Tobago Carnival", date: "2026-11-01" }
];
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim();
const createLucideIcon = (iconName, iconNode) => {
  const Component2 = reactExports.forwardRef(
    ({ color = "currentColor", size: size2 = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, ...rest }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size2,
        height: size2,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth,
        className: ["lucide", `lucide-${toKebabCase(iconName)}`, className].join(" "),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  Component2.displayName = `${iconName}`;
  return Component2;
};
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Calendar$1 = createLucideIcon("Calendar", [
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2", key: "eu3xkr" }],
  ["line", { x1: "16", x2: "16", y1: "2", y2: "6", key: "m3sa8f" }],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "6", key: "18kwsl" }],
  ["line", { x1: "3", x2: "21", y1: "10", y2: "10", key: "xt86sb" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Camera = createLucideIcon("Camera", [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CheckCircle = createLucideIcon("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cookie = createLucideIcon("Cookie", [
  ["path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5", key: "laymnq" }],
  ["path", { d: "M8.5 8.5v.01", key: "ue8clq" }],
  ["path", { d: "M16 15.5v.01", key: "14dtrp" }],
  ["path", { d: "M12 12v.01", key: "u5ubse" }],
  ["path", { d: "M11 17v.01", key: "1hyl5a" }],
  ["path", { d: "M7 14v.01", key: "uct60s" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CreditCard = createLucideIcon("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Download = createLucideIcon("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }],
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["line", { x1: "10", x2: "21", y1: "14", y2: "3", key: "18c3s4" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EyeOff = createLucideIcon("EyeOff", [
  ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
  [
    "path",
    {
      d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
      key: "9wicm4"
    }
  ],
  [
    "path",
    { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61", key: "1jreej" }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileText = createLucideIcon("FileText", [
  [
    "path",
    { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", key: "1nnpy2" }
  ],
  ["polyline", { points: "14 2 14 8 20 8", key: "1ew0cm" }],
  ["line", { x1: "16", x2: "8", y1: "13", y2: "13", key: "14keom" }],
  ["line", { x1: "16", x2: "8", y1: "17", y2: "17", key: "17nazh" }],
  ["line", { x1: "10", x2: "8", y1: "9", y2: "9", key: "1a5vjj" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Globe = createLucideIcon("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HelpCircle = createLucideIcon("HelpCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Loader2 = createLucideIcon("Loader2", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lock = createLucideIcon("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MapPin = createLucideIcon("MapPin", [
  ["path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", key: "2oe9fu" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Map$1 = createLucideIcon("Map", [
  ["polygon", { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21", key: "ok2ie8" }],
  ["line", { x1: "9", x2: "9", y1: "3", y2: "18", key: "w34qz5" }],
  ["line", { x1: "15", x2: "15", y1: "6", y2: "21", key: "volv9a" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MessageSquare = createLucideIcon("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mic = createLucideIcon("Mic", [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Music = createLucideIcon("Music", [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PartyPopper = createLucideIcon("PartyPopper", [
  ["path", { d: "M5.8 11.3 2 22l10.7-3.79", key: "gwxi1d" }],
  ["path", { d: "M4 3h.01", key: "1vcuye" }],
  ["path", { d: "M22 8h.01", key: "1mrtc2" }],
  ["path", { d: "M15 2h.01", key: "1cjtqr" }],
  ["path", { d: "M22 20h.01", key: "1mrys2" }],
  [
    "path",
    {
      d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
      key: "bpx1uq"
    }
  ],
  [
    "path",
    { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17", key: "1pd0s7" }
  ],
  [
    "path",
    { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7", key: "zq5xbz" }
  ],
  [
    "path",
    {
      d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
      key: "4kbmks"
    }
  ]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Send = createLucideIcon("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Share2 = createLucideIcon("Share2", [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Shield = createLucideIcon("Shield", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10", key: "1irkt0" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Smartphone = createLucideIcon("Smartphone", [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ticket = createLucideIcon("Ticket", [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wallet = createLucideIcon("Wallet", [
  ["path", { d: "M21 12V7H5a2 2 0 0 1 0-4h14v4", key: "195gfw" }],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h16v-5", key: "195n9w" }],
  ["path", { d: "M18 12a2 2 0 0 0 0 4h4v-4Z", key: "vllfpd" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zap$1 = createLucideIcon("Zap", [
  ["polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", key: "45s27k" }]
]);
const DEFAULT_PREMIUM_ADS = [
  {
    id: "default-fete-map-banner",
    title: "Unlock Interactive Fete Map",
    imageUrl: "/images/promo/premium_fete_map_promo_banner.png",
    placement: "banner",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-media-vault-banner",
    title: "Store Your Tickets & Photos",
    imageUrl: "/images/promo/premium_media_vault_promo_banner.png",
    placement: "banner",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-offline-banner",
    title: "Plan Offline, Anywhere",
    imageUrl: "/images/promo/premium_offline_mode_promo_banner.png",
    placement: "banner",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-premium-banner",
    title: "Go Premium - Ad Free Experience",
    imageUrl: "/images/promo/premium_subscription_promo_banner.png",
    placement: "banner",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-fete-map-inline",
    title: "Unlock Interactive Fete Map",
    imageUrl: "/images/promo/premium_fete_map_promo_banner.png",
    placement: "inline",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-media-vault-inline",
    title: "Store Your Tickets & Photos",
    imageUrl: "/images/promo/premium_media_vault_promo_banner.png",
    placement: "inline",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-offline-inline",
    title: "Plan Offline, Anywhere",
    imageUrl: "/images/promo/premium_offline_mode_promo_banner.png",
    placement: "inline",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "default-premium-inline",
    title: "Go Premium - Ad Free Experience",
    imageUrl: "/images/promo/premium_subscription_promo_banner.png",
    placement: "inline",
    mediaType: "image",
    linkUrl: null,
    isDefault: true
  },
  {
    id: "madd-colors-banner-v2",
    title: "Madd Colors Carnival - Atlanta",
    imageUrl: "https://www.atlanta-carnival.com/uploads/2/6/6/0/26602334/madd-logo26.jpg",
    placement: "banner",
    mediaType: "image",
    linkUrl: "https://maddcolorscarnival.com/",
    isDefault: false
  },
  {
    id: "madd-colors-inline-v2",
    title: "Madd Colors Carnival - Atlanta",
    imageUrl: "https://www.atlanta-carnival.com/uploads/2/6/6/0/26602334/madd-logo26.jpg",
    placement: "inline",
    mediaType: "image",
    linkUrl: "https://maddcolorscarnival.com/",
    isDefault: false
  }
];
function PromoAd({ placement = "banner", className = "", onUpgradeClick }) {
  const [ads, setAds] = reactExports.useState([]);
  const [currentAdIndex, setCurrentAdIndex] = reactExports.useState(0);
  const [dismissed, setDismissed] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setLoading(true);
    setError(null);
    const adsRef = collection(db, "promoAds");
    const q = query(adsRef, where("active", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allAds = [];
      snapshot.forEach((doc2) => {
        allAds.push({ id: doc2.id, ...doc2.data() });
      });
      const filteredAds = allAds.filter((ad) => ad.placement === placement);
      const maddColorsAd = DEFAULT_PREMIUM_ADS.find((ad) => ad.id.includes("madd-colors") && ad.placement === placement);
      let finalAds = filteredAds;
      if (filteredAds.length === 0) {
        finalAds = DEFAULT_PREMIUM_ADS.filter((ad) => ad.placement === placement);
      } else if (maddColorsAd) {
        const hasMadd = filteredAds.some((ad) => ad.id.includes("madd-colors"));
        if (!hasMadd) {
          finalAds = [...filteredAds, { ...maddColorsAd, isDefault: false }];
        }
      }
      if (finalAds.length > 0) {
        setAds(finalAds);
      } else {
        const defaultAds = DEFAULT_PREMIUM_ADS.filter((ad) => ad.placement === placement);
        setAds(defaultAds);
      }
      setLoading(false);
    }, (err) => {
      console.error(`PromoAd [${placement}] error:`, err);
      const defaultAds = DEFAULT_PREMIUM_ADS.filter((ad) => ad.placement === placement);
      setAds(defaultAds);
      setError(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [placement]);
  reactExports.useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 8e3);
    return () => clearInterval(interval);
  }, [ads.length]);
  if (loading) return null;
  if (dismissed || ads.length === 0) return null;
  const safeIndex = Math.min(currentAdIndex, ads.length - 1);
  const currentAd = ads[safeIndex];
  if (!currentAd || !currentAd.imageUrl) return null;
  const isVideo = currentAd.mediaType === "video";
  const isDefaultAd = currentAd.id.includes("madd-colors") ? false : currentAd.isDefault;
  currentAd.id.includes("madd-colors") ? "https://maddcolorscarnival.com/" : currentAd.linkUrl;
  const handleClick = () => {
    if (isDefaultAd && onUpgradeClick) {
      onUpgradeClick();
    } else if (currentAd.linkUrl) {
      window.open(currentAd.linkUrl, "_blank", "noopener,noreferrer");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-4 relative ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: handleClick,
      className: `relative overflow-hidden rounded-lg shadow-md ${currentAd.linkUrl || isDefaultAd ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`,
      children: [
        isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            src: currentAd.imageUrl,
            className: "w-full h-auto object-cover",
            style: { maxHeight: placement === "banner" ? "120px" : "250px" },
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            onError: (e) => console.error("Video load error:", e)
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentAd.imageUrl,
            alt: currentAd.title || "Promotion",
            className: "w-full h-auto object-cover",
            style: { maxHeight: placement === "banner" ? "120px" : "250px" },
            onError: (e) => {
              console.error("Image load error:", currentAd.imageUrl);
              e.target.style.display = "none";
            }
          }
        ),
        currentAd.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-bold truncate", children: currentAd.title }),
          isDefaultAd && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-300 text-xs font-medium", children: "Tap to upgrade to Premium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded", children: isDefaultAd ? "PREMIUM" : "AD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setDismissed(true);
            },
            className: "absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        ),
        ads.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 flex gap-1", children: ads.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-1.5 h-1.5 rounded-full transition ${idx === currentAdIndex ? "bg-white" : "bg-white/50"}`
          },
          idx
        )) })
      ]
    }
  ) });
}
function SplashPage({ onGetStarted, logo: logo2, onTryDemo }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-pink-500 selection:text-white font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center font-bold text-sm", children: "CP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tracking-tight text-white/90", children: "Caribbean Carnival Planner" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onGetStarted,
          className: "px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-semibold transition-all",
          children: "Log In"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fadeIn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-400 tracking-wide uppercase", children: "All Carnivals 2026" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400", children: "Stop Planning Carnival" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500", children: "in 6 Group Chats." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed", children: [
          "Squad Sync, Smart Budget, Fete Map. 1 app for All Carnivals 2026. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-400 font-medium", children: "Vibes Included." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: onGetStarted,
              className: "group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105",
              children: [
                "Create Your Squad Free",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: onTryDemo,
              className: "group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border border-white/10 text-white rounded-full font-bold text-lg backdrop-blur-sm transition-all transform hover:scale-105 shadow-[0_0_30px_-8px_rgba(168,85,247,0.4)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "inline-block mr-2 w-5 h-5 group-hover:scale-110 transition-transform" }),
                "Preview App — No Sign Up"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex justify-center lg:justify-end relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-indigo-500/20 blur-[80px] rounded-full scale-75" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-[300px] md:w-[340px] transform hover:scale-[1.02] transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/squad-mockup.png",
            alt: "Squad Sync showing 8 squad members and Jade is Road Ready notification",
            className: "w-full h-auto relative z-10 drop-shadow-[0_20px_60px_rgba(168,85,247,0.3)]"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white/5 border-y border-white/5 py-4 overflow-hidden relative z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex animate-marquee whitespace-nowrap gap-12 text-sm font-medium text-gray-400 uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✨  350+ Live Squads" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📍  Trinidad 2026 Ready" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💰  Expense Tracking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎵  Soca Included" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🤝  Become an Ambassador" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📢  Sponsor the Culture" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🛂  Passport Sync Active" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✨  350+ Live Squads" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📍  Trinidad 2026 Ready" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💰  Expense Tracking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎵  Soca Included" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🤝  Become an Ambassador" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📢  Sponsor the Culture" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🛂  Passport Sync Active" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative z-10 py-32 px-6 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-black mb-6", children: [
        "Everything you need.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Nothing you don't."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-yellow-500/30 transition-all p-8 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute top-0 right-0 w-72 h-72 object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700 transform rotate-45 translate-x-16 -translate-y-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-48 h-48 text-yellow-500 transform rotate-12 translate-x-12 -translate-y-12" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/20 flex items-center justify-center mb-4 text-yellow-400 border border-yellow-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Squad Sync" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 max-w-sm", children: "Real-time collaboration. See when your friends add events, update budgets, or get road ready." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-4 mt-8", children: [
            ["🇹🇹", "🇯🇲", "🇧🇧", "🇱🇨"].map((flag, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 border-4 border-gray-900 flex items-center justify-center text-lg transform transition-transform group-hover:translate-x-2", style: { transitionDelay: `${i2 * 50}ms` }, children: flag }, i2)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 border-4 border-gray-900 flex items-center justify-center text-xs font-bold text-white z-10 shadow-lg shadow-yellow-500/20", children: "+3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:row-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-green-500/30 transition-all p-8 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/20 flex items-center justify-center mb-4 text-green-400 border border-green-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Smart Budget" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-8", children: "Track every costume payment, fete ticket, and flight." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-4 group-hover:bg-gray-750 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Costume Deposit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-green-400", children: "-$300" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-700 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-500 w-3/4 h-full rounded-full" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-4 group-hover:bg-gray-750 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Flight (MIA → POS)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-green-400", children: "-$850" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-700 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-500 w-full h-full rounded-full" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-4 group-hover:bg-gray-750 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Soca Brainwash" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-yellow-400", children: "-$120" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-700 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-500 w-1/2 h-full rounded-full" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-white", children: "$2,850" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 ml-2", children: "/ $4,000 goal" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-purple-500/30 transition-all p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-opacity duration-700 grayscale group-hover:grayscale-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 h-full flex flex-col justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Map$1, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Live Map" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Discover fetes, events, and band routes near your AirBnb." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 md:col-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-900/30 via-gray-900 to-teal-900/20 border border-white/10 hover:border-yellow-500/30 transition-all p-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute right-0 top-0 bottom-0 w-1/2 object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-teal-500/20 flex items-center justify-center mb-4 text-yellow-400 border border-yellow-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Soca Passport" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Your digital carnival identity. Collect stamps, earn medals, and climb the leaderboard." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block relative w-64 h-40 bg-gradient-to-br from-yellow-500/20 to-teal-500/10 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 text-[10px] font-mono text-yellow-400/50", children: "9438-2910" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-12 left-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-white/80", children: "READY TO FETE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-500", children: "Level: Gold Masquerader" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-yellow-400", children: "🥇 12 STAMPS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-500", children: "FEB 2026" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-pink-500/30 transition-all p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-pink-900/10 to-transparent z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 h-full flex flex-col justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/20 flex items-center justify-center mb-4 text-pink-400 border border-pink-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap$1, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Ambassadors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Join the Decentralized Sales Fleet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Promote the app, earn 20% recurring commissions, and get paid via Stripe." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-900 border border-white/10 hover:border-blue-500/30 transition-all p-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-900/20 to-transparent z-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 flex items-center justify-center mb-4 text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold mb-2", children: "Direct Sponsorship Engine" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-4", children: "Are you a promoter, band, or brand? Sponsor the culture directly." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-400 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "✓" }),
                " Target high-intent traveling masqueraders"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "✓" }),
                " Premium banner spaces across the platform"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "✓" }),
                " 100% direct revenue (no middlemen margins)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block relative w-64 h-32 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-10 p-3 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-wider text-gray-500 font-bold", children: "Sponsored Fete" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center font-black text-white text-sm shadow-inner", children: "SOCA BRAINWASH 🔥" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 w-3/4 bg-gray-700 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-2 w-1/2 bg-gray-700 rounded-full" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative z-10 py-32 text-center px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl md:text-7xl font-black mb-8", children: "Ready to jump?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onGetStarted,
          className: "px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl",
          children: "Create Your Squad Free"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
          " Global Support"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          " Secure Data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4" }),
          " Vibes Included"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-white/10 p-8 text-center text-gray-600 text-sm", children: "© 2026 Caribbean Carnival Planner. Built for the culture." })
  ] });
}
const COMPANY_NAME = "Caribbean Carnival Planner";
const COMPANY_EMAIL = "cpteam@carnival-planner.com";
const LAST_UPDATED = "December 12, 2025";
function PrivacyPolicy({ onBack, logo: logo2 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageWrapper, { title: "Privacy Policy", icon: Shield, onBack, logo: logo2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 mb-6", children: [
      "Last Updated: ",
      LAST_UPDATED
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "1. Introduction", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      COMPANY_NAME,
      ' ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").'
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Information We Collect", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.1 Personal Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "When you sign in with Google, we collect:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Display name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Profile picture URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Google account unique identifier" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.2 User-Generated Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Information you voluntarily provide includes:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Carnival planning data (budgets, schedules, packing lists)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Costume and band information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Squad member names and coordination data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Uploaded media files (tickets, photos, documents)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Map pins and location notes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.3 Payment Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For premium subscriptions, payment processing is handled securely by Stripe. We do not store your credit card numbers. We receive only transaction confirmation, subscription status, and billing email from Stripe." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "3. How We Use Your Information", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To provide and maintain the Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To authenticate your identity via Google Sign-In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To process premium subscription payments via Stripe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To sync your carnival planning data across devices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To send push notifications for squad alerts (if enabled)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To improve and optimize our Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To respond to your inquiries and support requests" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Data Storage and Security", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Your data is stored using Firebase services provided by Google:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firebase Authentication:" }),
          " Manages secure sign-in"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cloud Firestore:" }),
          " Stores your planning data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firebase Storage:" }),
          " Stores uploaded media files"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firebase Cloud Messaging:" }),
          " Delivers push notifications"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We implement industry-standard security measures including encryption in transit (TLS) and at rest. Firebase services are SOC 2 and ISO 27001 certified." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. Third-Party Services", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "We use the following third-party services:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Google (Firebase):" }),
          " Authentication, database, storage, and hosting. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://firebase.google.com/support/privacy", className: "text-pink-400 hover:underline", target: "_blank", rel: "noopener noreferrer", children: "Firebase Privacy Policy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Stripe:" }),
          " Payment processing. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://stripe.com/privacy", className: "text-pink-400 hover:underline", target: "_blank", rel: "noopener noreferrer", children: "Stripe Privacy Policy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "OpenStreetMap:" }),
          " Map tiles for the Fete Map feature. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wiki.osmfoundation.org/wiki/Privacy_Policy", className: "text-pink-400 hover:underline", target: "_blank", rel: "noopener noreferrer", children: "OSM Privacy Policy" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "6. Your Rights (GDPR/CCPA)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Depending on your location, you may have the following rights:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Access:" }),
          " Request a copy of your personal data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Rectification:" }),
          " Correct inaccurate personal data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Erasure:" }),
          " Request deletion of your personal data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Portability:" }),
          " Receive your data in a portable format"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Opt-out:" }),
          " Opt out of certain data processing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Non-discrimination:" }),
          " We will not discriminate against you for exercising your rights"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4", children: [
        "To exercise these rights, contact us at ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Data Retention", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We retain your personal data for as long as your account is active. If you delete your account, we will delete your data within 30 days, except where we are legally required to retain it." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Children's Privacy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "9. Changes to This Policy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.' }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "10. Contact Us", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you have questions about this Privacy Policy, please contact us at:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL }) })
    ] })
  ] });
}
function TermsOfService({ onBack, logo: logo2 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageWrapper, { title: "Terms of Service", icon: FileText, onBack, logo: logo2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 mb-6", children: [
      "Last Updated: ",
      LAST_UPDATED
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "1. Acceptance of Terms", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "By accessing or using ",
      COMPANY_NAME,
      ' ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.'
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "2. Description of Service", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      COMPANY_NAME,
      " is a Progressive Web App that helps users plan and organize Caribbean carnival events. The Service includes free features (budget planning, scheduling, squad coordination) and premium subscription features (interactive maps, media vault, offline mode)."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. User Accounts", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "3.1 Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "You must sign in with a valid Google account to use the Service. You are responsible for maintaining the security of your account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "3.2 Account Responsibilities" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You must provide accurate information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You are responsible for all activities under your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You must notify us immediately of any unauthorized use" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Premium Subscriptions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "4.1 Subscription Plans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "We offer monthly ($4.99/month) and yearly ($39.99/year) subscription plans. Prices are subject to change with reasonable notice." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "4.2 Billing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Subscriptions are billed in advance on a recurring basis. Payment is processed through Stripe. Your subscription will automatically renew unless you cancel before the renewal date." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "4.3 Cancellation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You may cancel your subscription at any time. You will continue to have access to premium features until the end of your current billing period. See our Refund Policy for details." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. User Content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "5.1 Your Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "You retain ownership of all content you upload to the Service (schedules, media, notes). By uploading content, you grant us a limited license to store, display, and process it to provide the Service." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "5.2 Content Restrictions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "You agree not to upload content that:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Is illegal, harmful, or offensive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Infringes on intellectual property rights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Contains malware or malicious code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Violates others' privacy" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "6. Acceptable Use", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "You agree not to:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use the Service for any unlawful purpose" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempt to gain unauthorized access to our systems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Interfere with or disrupt the Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reverse engineer or decompile the Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use automated systems to access the Service without permission" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Intellectual Property", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "The Service, including its design, features, and content (excluding user content), is owned by ",
      COMPANY_NAME,
      " and protected by intellectual property laws. You may not copy, modify, or distribute our intellectual property without permission."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Disclaimer of Warranties", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK.' }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "9. Limitation of Liability", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, ",
      COMPANY_NAME.toUpperCase(),
      " SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "10. Termination", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may terminate or suspend your account at any time for violation of these Terms. You may delete your account at any time. Upon termination, your right to use the Service will immediately cease." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "11. Governing Law", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "These Terms shall be governed by the laws of the jurisdiction in which ",
      COMPANY_NAME,
      " operates, without regard to conflict of law principles."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "12. Changes to Terms", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may modify these Terms at any time. We will notify you of significant changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the new Terms." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "13. Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "For questions about these Terms, contact us at ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL }),
      "."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "14. Vault / Sou Sou Feature", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.1 Nature of Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Squad Vault is a digital savings club modeled after traditional Caribbean sou sou/partner systems. You and your invited members pool funds for a shared carnival goal. This is not a bank account, investment, loan, or deposit product." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.2 Custody of Funds" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4", children: [
        "All funds are held in For Benefit Of (FBO) accounts with our banking partner via Stripe Treasury. ",
        COMPANY_NAME,
        " does not hold or own user funds and cannot access them except to execute your instructions."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.3 No Interest" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Funds do not earn interest or returns. Balance = sum of contributions minus fees." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.4 Fees" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "1.9% fee assessed on withdrawals to external bank accounts. 0% fee when spending via issued virtual card at approved carnival vendors. ACH failures may incur $0.25 bank fee, passed through with notice." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.5 User Roles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: 'Vault "Banker" is responsible for inviting members and triggering payouts. Banker is not paid by us. Members authorize recurring ACH debits until they leave vault or vault closes.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.6 Failed Payments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "If 2+ members fail payments twice, vault auto-freezes to protect group. No new charges occur. Banker may close vault and refund pro-rata minus fees." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.7 Disputes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4", children: [
        "As this is a private savings club between friends, ",
        COMPANY_NAME,
        " is not liable for disputes between members. We provide transaction history only. ACH disputes fall under NACHA rules."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.8 Compliance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Users must complete KYC via Stripe. We reserve right to close vaults suspected of money laundering, fraud, or exceeding $20,000 aggregate. This service is not available in NY until further notice." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.9 Tax" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "We do not issue 1099s. Contributions are not tax-deductible. Consult your advisor." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "14.10 Termination" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You may close vault anytime. Funds returned to source accounts in 3-5 business days minus fees." })
    ] })
  ] });
}
function CookiePolicy({ onBack, logo: logo2 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageWrapper, { title: "Cookie Policy", icon: Cookie, onBack, logo: logo2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 mb-6", children: [
      "Last Updated: ",
      LAST_UPDATED
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "1. What Are Cookies", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. How We Use Cookies", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4", children: [
        COMPANY_NAME,
        " uses cookies and similar technologies for the following purposes:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.1 Essential Cookies (Required)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "These cookies are necessary for the Service to function and cannot be disabled:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firebase Authentication:" }),
          " Maintains your signed-in session securely"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Session Management:" }),
          " Remembers your authentication state"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.2 Functional Cookies" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "These cookies enhance your experience:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Preferences:" }),
          " Remembers your dark mode setting"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Local Storage:" }),
          " Caches carnival data for offline access (Premium feature)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.3 Third-Party Cookies" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "Our third-party services may set their own cookies:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firebase/Google:" }),
          " Authentication and analytics"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Stripe:" }),
          " Payment processing security"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "3. Cookie Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 pr-4", children: "Cookie Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 pr-4", children: "Purpose" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 pr-4", children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "Type" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "firebase-auth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "User authentication" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Session" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: "Essential" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "__stripe_mid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Fraud prevention" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "1 year" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: "Essential" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "darkMode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Theme preference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: "Persistent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: "Functional" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Local Storage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "In addition to cookies, we use browser local storage for:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Caching carnival data for offline access (Premium)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Storing FCM tokens for push notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Temporary UI state" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. Managing Cookies", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "You can manage cookies through your browser settings:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Chrome:" }),
          " Settings → Privacy and security → Cookies"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Firefox:" }),
          " Settings → Privacy & Security → Cookies"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Safari:" }),
          " Preferences → Privacy → Cookies"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Edge:" }),
          " Settings → Cookies and site permissions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-yellow-400", children: "Note: Disabling essential cookies may prevent you from using the Service." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. Updates to This Policy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may update this Cookie Policy to reflect changes in our practices or for legal reasons. Check this page periodically for updates." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "For questions about our use of cookies, contact us at ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL }),
      "."
    ] }) })
  ] });
}
function RefundPolicy({ onBack, logo: logo2 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageWrapper, { title: "Refund Policy", icon: CreditCard, onBack, logo: logo2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 mb-6", children: [
      "Last Updated: ",
      LAST_UPDATED
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "1. Premium Subscription", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      COMPANY_NAME,
      " offers premium subscriptions at $4.99/month or $39.99/year. This policy explains our refund terms for these subscriptions."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Subscription Cancellation", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.1 How to Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "You can cancel your subscription at any time by:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Contacting us at ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Managing your subscription through Stripe's customer portal (link provided in your confirmation email)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "2.2 Effect of Cancellation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your premium access continues until the end of your current billing period" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You will not be charged again after cancellation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "No partial refunds are provided for unused time in the current billing period" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. Refund Eligibility", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "3.1 Eligible for Refund" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "We offer refunds in the following situations:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mb-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Technical Issues:" }),
          " If the Service was unavailable or significantly impaired for an extended period"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Accidental Purchase:" }),
          " If you accidentally subscribed and request a refund within 48 hours, without using premium features"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Duplicate Charges:" }),
          " If you were charged multiple times for the same subscription period"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-2", children: "3.2 Not Eligible for Refund" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Change of mind after using premium features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Requests made after 30 days from the charge date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Failure to cancel before renewal (you must cancel before renewal to avoid charges)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Issues caused by your device, browser, or internet connection" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. How to Request a Refund", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "To request a refund:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Email us at ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Include your account email and the date of the charge" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Explain the reason for your refund request" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4", children: "We will review your request and respond within 5 business days." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. Refund Processing", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "If your refund is approved:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Refunds are processed through Stripe to your original payment method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Allow 5-10 business days for the refund to appear on your statement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your premium access will be revoked upon refund" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. Free Trial", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We do not currently offer free trials. All core features are free to use. Premium features require a paid subscription." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Price Changes", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If we increase subscription prices, existing subscribers will be notified at least 30 days in advance. You may cancel before the new price takes effect to avoid being charged at the higher rate." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "For refund requests or questions about this policy, contact us at ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY_EMAIL}`, className: "text-pink-400 hover:underline", children: COMPANY_EMAIL }),
      "."
    ] }) })
  ] });
}
function LegalPageWrapper({ title, icon: Icon, onBack, logo: logo2, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-950 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -top-48 -right-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl bottom-0 left-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onBack,
          className: "flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        logo2 && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo2, alt: "Logo", className: "w-12 h-12 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-pink-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: title })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-12 text-center text-gray-500 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Caribbean Carnival Planner - Plan your Mas. Track your Fetes. Coordinate your Squad." }) })
    ] })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-4", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-300 leading-relaxed", children })
  ] });
}
function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = reactExports.useState(null);
  const [showPrompt, setShowPrompt] = reactExports.useState(false);
  const [isInstalled, setIsInstalled] = reactExports.useState(false);
  const [dismissed, setDismissed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }
    const dismissedTime = localStorage.getItem("pwa-install-dismissed");
    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1e3 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setDismissed(true);
      }
    }
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!dismissed) {
        setShowPrompt(true);
      }
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [dismissed]);
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };
  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };
  if (!showPrompt || isInstalled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-20 left-4 right-4 z-40 animate-slideUp md:left-auto md:right-4 md:max-w-sm safe-bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-4 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleDismiss,
        className: "absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pr-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-1", children: "Add to Home Screen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm mb-3", children: "Install Caribbean Carnival Planner for quick access and offline use!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleInstall,
            className: "flex items-center gap-2 px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Install App"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function ContactPage({ onBack, logo: logo2, user }) {
  const [subject, setSubject] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      await addDoc(collection(db, "support-requests"), {
        email: email.trim(),
        subject: subject.trim() || "General Inquiry",
        message: message.trim(),
        userId: user?.uid || null,
        userName: user?.displayName || null,
        status: "new",
        createdAt: Timestamp.now()
      });
      setSubmitted(true);
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting support request:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-slate-950 text-white flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-10 h-10 text-green-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Message Sent!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-8", children: "Thank you for reaching out. We'll get back to you as soon as possible." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onBack,
          className: "px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold hover:opacity-90 transition-opacity",
          children: "Back to App"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-950 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -top-48 -right-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl bottom-0 left-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onBack,
          className: "flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
        logo2 && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo2, alt: "Logo", className: "w-12 h-12 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-6 h-6 text-pink-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "Contact Support" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-6", children: "Have a question, feedback, or need help? Send us a message and we'll get back to you as soon as possible." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Email Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "your@email.com",
                  required: true,
                  className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: subject,
                onChange: (e) => setSubject(e.target.value),
                className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-gray-900", children: "Select a topic..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "General Question", className: "bg-gray-900", children: "General Question" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Premium Subscription", className: "bg-gray-900", children: "Premium Subscription" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Technical Issue", className: "bg-gray-900", children: "Technical Issue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Feature Request", className: "bg-gray-900", children: "Feature Request" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Refund Request", className: "bg-gray-900", children: "Refund Request" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Account Issue", className: "bg-gray-900", children: "Account Issue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", className: "bg-gray-900", children: "Other" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Message *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: message,
                onChange: (e) => setMessage(e.target.value),
                placeholder: "How can we help you?",
                required: true,
                rows: 6,
                className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50",
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
                "Sending..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" }),
                "Send Message"
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-sm text-center mt-8", children: [
        "You can also email us directly at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:cpteam@carnival-planner.com", className: "text-pink-400 hover:underline", children: "cpteam@carnival-planner.com" })
      ] })
    ] })
  ] });
}
function SupportAdmin() {
  const [requests, setRequests] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const q = query(collection(db, "support-requests"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc2) => ({
          id: doc2.id,
          ...doc2.data()
        }));
        setRequests(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("SupportAdmin query failed:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);
  const handleDelete = async (id) => {
    if (confirm("Delete this support request?")) {
      await deleteDoc(doc(db, "support-requests", id));
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-6 h-6 animate-spin mx-auto" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-600 dark:text-red-400", children: [
        "Failed to load support requests: ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-2", children: "This may require a Firestore index. Check the console." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-gray-200 dark:border-gray-700 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg mb-4 text-gray-800 dark:text-white flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }),
      "Support Requests (",
      requests.length,
      ")"
    ] }),
    requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-center py-4", children: "No support requests yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-h-96 overflow-y-auto", children: requests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800 dark:text-white", children: req.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-gray-400", children: "|" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: req.subject || "General" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleDelete(req.id),
                className: "p-1 text-gray-400 hover:text-red-500 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap", children: req.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-2", children: req.createdAt?.toDate?.().toLocaleString() || "Unknown date" })
        ]
      },
      req.id
    )) })
  ] });
}
const SquadPromoProgressBar = ({ currentMemberCount, shareCode }) => {
  if (currentMemberCount >= 5) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 p-4 rounded-2xl shadow-lg border border-yellow-300 mb-6 text-center text-white animate-fadeIn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-6 h-6 animate-bounce" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-xl tracking-wide uppercase", children: "Squad Goals Unlocked!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-6 h-6 animate-bounce" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: "Premium Activated for 3 Months for the whole squad! 🏆" })
        ]
      }
    );
  }
  const handleShare = async () => {
    if (navigator.share && shareCode) {
      try {
        await navigator.share({
          title: "Join my Squad on Carnival Planner!",
          text: `Use my invite code ${shareCode} to join my squad. If we hit 5 members, we all get 3 months of Premium FREE!`,
          url: "https://carnival-planner.web.app"
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else if (shareCode) {
      navigator.clipboard.writeText(shareCode);
      alert("Invite code copied to clipboard!");
    }
  };
  const progressPercentage = currentMemberCount / 5 * 100;
  const membersNeeded = 5 - currentMemberCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-1.5", children: [
        "🔥 ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-pink-500", children: [
          currentMemberCount,
          "/5 Squad Members."
        ] }),
        "Add ",
        membersNeeded,
        " more ",
        membersNeeded === 1 ? "friend" : "friends",
        " to unlock 3 Months of Premium!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { width: `${progressPercentage}%`, transition: "width 1s ease-out" },
          className: "h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleShare,
        className: "flex-shrink-0 w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
          "Share Invite Code"
        ]
      }
    )
  ] });
};
function HomeHub({
  user,
  activeCarnivalId,
  carnivalData: carnivalData2,
  scrapedEvents = [],
  vibeScores = {},
  squadMembers = [],
  squadShareCode = "",
  budgetTotal = 0,
  budgetSpent = 0,
  isPremium,
  onAction
}) {
  const nextCarnival = reactExports.useMemo(() => {
    if (activeCarnivalId) {
      const carnivalNameMap = {
        "stkitts-sugar-mas": "Sugar Mas",
        "stcroix": "St. Croix Carnival",
        "trinidad": "Trinidad Carnival",
        "dominica": "Mas Domnik",
        "jamaica": "Jamaica Carnival",
        "tampa": "Tampa Bay Carnival",
        "stmaarten": "St. Maarten Carnival",
        "cayman-batabano": "Cayman Carnival Batabano",
        "stthomas": "St. Thomas Carnival",
        "atlanta": "Atlanta Caribbean Carnival",
        "guyana": "Guyana Independence",
        "bahamas": "Bahamas Carnival",
        "bermuda": "Bermuda Carnival",
        "hollywood": "Hollywood Carnival",
        "caymas": "Caymas Carnival",
        "vincymas": "Vincy Mas",
        "stlucia": "Saint Lucia Carnival",
        "toronto": "Toronto Caribbean Carnival",
        "barbados": "Crop Over",
        "nevis": "Nevis Culturama",
        "antigua": "Antigua Carnival",
        "grenada": "Spice Mas",
        "ny-labor-day": "New York Carnival",
        "japan": "Japan Caribbean Carnival",
        "miami": "Miami Carnival",
        "tobago": "Tobago Carnival"
      };
      const searchName = carnivalNameMap[activeCarnivalId] || activeCarnivalId.replace(/-/g, " ");
      const found = carnivalData2.find(
        (c) => c.name.toLowerCase().includes(searchName.toLowerCase()) || searchName.toLowerCase().includes(c.name.split("(")[0].trim().toLowerCase())
      );
      return found || carnivalData2[0];
    }
    const today = /* @__PURE__ */ new Date();
    const sorted = [...carnivalData2].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted.find((c) => new Date(c.date) >= today) || sorted[0];
  }, [activeCarnivalId, carnivalData2]);
  const [timeLeft, setTimeLeft] = reactExports.useState({ days: 0, hours: 0 });
  reactExports.useEffect(() => {
    if (!nextCarnival) return;
    const updateTimer = () => {
      const target = /* @__PURE__ */ new Date(nextCarnival.date + "T00:00:00");
      const now2 = /* @__PURE__ */ new Date();
      const diff = target - now2;
      if (diff > 0) {
        const days = Math.ceil(diff / (1e3 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1e3 * 60 * 60) % 24);
        setTimeLeft({ days, hours });
      } else {
        setTimeLeft({ days: 0, hours: 0 });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 6e4);
    return () => clearInterval(interval);
  }, [nextCarnival]);
  const recentEvents = reactExports.useMemo(() => {
    if (scrapedEvents.length > 0) return scrapedEvents.slice(0, 5);
    return null;
  }, [scrapedEvents]);
  const topVibes = reactExports.useMemo(() => {
    const scores = Object.values(vibeScores);
    if (scores.length === 0) return null;
    return scores.filter((s) => s.score >= 6).sort((a, b) => b.score - a.score).slice(0, 3);
  }, [vibeScores]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mb-8 animate-fadeIn", children: [
    activeCarnivalId && /* @__PURE__ */ jsxRuntimeExports.jsx(SquadPromoProgressBar, { currentMemberCount: squadMembers.length + 1, shareCode: squadShareCode }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 shadow-2xl text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl -ml-10 -mb-10 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest border border-white/10", children: activeCarnivalId ? "CURRENT MISSION" : "UP NEXT" }),
              isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-[10px] font-bold uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap$1, { className: "w-3 h-3 mr-1" }),
                " Premium"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-black tracking-tight leading-none mb-1", children: nextCarnival?.name?.split("(")[0].trim() || "Carnival" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm font-medium", children: "Get ready for the road." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-2xl sm:text-3xl font-black", children: timeLeft.days }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase opacity-70", children: "Days" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-2xl sm:text-3xl font-black", children: timeLeft.hours }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase opacity-70", children: "Hrs" })
            ] })
          ] })
        ] }),
        recentEvents && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3 bg-black/20 rounded-xl p-2.5 backdrop-blur-sm overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-1.5 px-2 py-0.5 bg-red-500 rounded text-[10px] font-bold uppercase animate-pulse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-white rounded-full" }),
            "Live"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block animate-marquee text-xs font-medium", children: recentEvents.map((evt, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-8", children: [
            "🔥 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-pink-200", children: evt.title }),
            vibeScores[evt.id] && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `ml-1.5 px-1 py-0.5 rounded text-[9px] font-bold ${vibeScores[evt.id].score >= 8 ? "bg-red-500/30 text-red-200" : vibeScores[evt.id].score >= 5 ? "bg-amber-500/30 text-amber-200" : "bg-gray-500/30 text-gray-300"}`, children: [
              vibeScores[evt.id].score,
              "/10"
            ] }),
            evt.venue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-75", children: [
              " @ ",
              evt.venue
            ] }),
            evt.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-300 ml-1", children: [
              "($",
              evt.price,
              ")"
            ] })
          ] }, evt.id || i2)) }) })
        ] })
      ] })
    ] }),
    topVibes && topVibes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: topVibes.map((vibe, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => onAction("Schedule"),
        className: `relative overflow-hidden p-3 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] border ${i2 === 0 ? "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20 dark:from-red-900/20 dark:to-orange-900/20 dark:border-red-700/30" : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: `w-3.5 h-3.5 ${i2 === 0 ? "text-red-500" : "text-amber-500"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500", children: i2 === 0 ? "🔥 Hottest" : `#${i2 + 1}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-white truncate", children: vibe.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-lg font-black ${vibe.score >= 8 ? "text-red-500" : "text-amber-500"}`, children: vibe.score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400", children: "/10" })
          ] }),
          vibe.reason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1", children: vibe.reason })
        ]
      },
      vibe.eventId || i2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onAction("Budget"),
          className: "relative overflow-hidden bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute -right-8 -top-8 w-24 h-24 object-cover opacity-[0.04] dark:opacity-[0.08] rotate-45 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium", children: "Budget Spent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-gray-800 dark:text-white mt-0.5", children: [
              "$",
              budgetSpent.toLocaleString(),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 font-normal ml-1", children: [
                "/ $",
                budgetTotal.toLocaleString()
              ] })
            ] }),
            budgetTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-blue-500 rounded-full",
                style: { width: `${Math.min(budgetSpent / budgetTotal * 100, 100)}%` }
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onAction("Squad"),
          className: "relative overflow-hidden bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-green-300 dark:hover:border-green-700 transition-all group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute -right-8 -top-8 w-24 h-24 object-cover opacity-[0.04] dark:opacity-[0.08] -rotate-12 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium", children: "Squad Online" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-gray-800 dark:text-white mt-0.5", children: [
              squadMembers.length + 1,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 font-normal ml-1", children: "members" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2 mt-2", children: [...Array(Math.min(squadMembers.length + 1, 4))].map((_, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800" }, i2)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onAction("Map"),
          className: "relative overflow-hidden bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute -right-8 -bottom-8 w-24 h-24 object-cover opacity-[0.04] dark:opacity-[0.08] rotate-90 group-hover:opacity-[0.08] dark:group-hover:opacity-[0.15] transition-opacity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium", children: "Live Events" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-gray-800 dark:text-white mt-0.5", children: scrapedEvents.length || "30+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-purple-500 font-bold mt-1", children: " View Map" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onAction("Passport"),
          className: "relative overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 p-4 rounded-2xl shadow-sm shadow-teal-500/20 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute -right-6 -top-6 w-28 h-28 object-cover opacity-[0.15] rotate-12 group-hover:opacity-[0.25] transition-opacity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-white/20 rounded-lg text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 text-white/70 group-hover:text-white transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-teal-100 font-medium", children: "Identity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-white mt-0.5", children: "Passport" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/80 font-bold mt-1", children: "Launch App" })
          ]
        }
      )
    ] })
  ] });
}
function WelcomeModal({ onClose }) {
  const features = [
    { icon: Calendar$1, title: "Plan Your Schedule", desc: "Add fetes, mas, and events to your itinerary" },
    { icon: Wallet, title: "Track Your Budget", desc: "Keep tabs on costume costs, accommodations, and more" },
    { icon: Users, title: "Squad Up", desc: "Create or join a squad to share plans with friends" },
    { icon: MapPin, title: "Map Your Adventure", desc: "Pin venues and see event locations (Premium)" },
    { icon: Camera, title: "Share Memories", desc: "Upload photos to your private media vault (Premium)" },
    { icon: Music, title: "Vibes Player", desc: "Stream soca playlists while you plan" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-6 rounded-t-2xl text-white text-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "relative z-10 text-2xl font-black mb-1", children: "Welcome to Caribbean Carnival Planner! 🎭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative z-10 text-white/90 text-sm", children: "Your all-in-one Caribbean carnival companion" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm text-center mb-4", children: "Here's what you can do:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: features.map((feature, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute -right-6 -top-6 w-16 h-16 object-cover opacity-[0.03] dark:opacity-[0.06] rotate-45 group-hover:opacity-[0.06] dark:group-hover:opacity-[0.1] transition-opacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800 dark:text-white text-sm", children: feature.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400 text-xs", children: feature.desc })
        ] })
      ] }, i2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pt-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30",
          children: "Let's Go! 🎉"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-gray-400 mt-3", children: 'Tap "Help" in the footer anytime for guidance' })
    ] })
  ] }) });
}
function HelpGuide({ onClose }) {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { icon: "🎭", text: "Select your carnival from the dropdown at the top" },
        { icon: "➕", text: "Use the tabs to add budget items, schedule events, and more" },
        { icon: "💾", text: "Everything saves automatically to your account" }
      ]
    },
    {
      title: "Free Features",
      items: [
        { icon: Calendar$1, text: "Schedule — Add fetes, mas bands, and events" },
        { icon: Wallet, text: "Budget — Track all your carnival expenses" },
        { icon: Users, text: "Squad — Create/join a group and chat with friends" },
        { icon: Mic, text: 'Voice Add — Say "Add Tribe Friday 3pm" to quick-add events' },
        { icon: Music, text: "Vibes Player — Stream soca playlists while planning" }
      ]
    },
    {
      title: "Premium Features",
      items: [
        { icon: MapPin, text: "Map — Pin venues and view event locations" },
        { icon: Camera, text: "Media Vault — Store and share carnival photos" },
        { icon: "🎫", text: "Live Events — Daily-updated fete listings from ticket sites" },
        { icon: "📡", text: "Road Mode — Offline mesh chat via Bitchat" }
      ]
    },
    {
      title: "Squad Mode",
      items: [
        { icon: "🔗", text: "Create a squad to get a 6-digit share code" },
        { icon: "👥", text: "Friends join with your code to sync plans" },
        { icon: "💬", text: "Chat with your squad and the AI Carnival Concierge" },
        { icon: "🚫", text: "Leaders can remove members if needed" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between rounded-t-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCircle, { className: "w-6 h-6 text-purple-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "How to Use Caribbean Carnival Planner" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      sections.map((section, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-purple-600 dark:text-purple-400 text-sm uppercase tracking-wider mb-3", children: section.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: section.items.map((item, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg flex-shrink-0", children: typeof item.icon === "string" ? item.icon : /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 text-gray-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 dark:text-gray-300 text-sm", children: item.text })
        ] }, j)) })
      ] }, i2)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-purple-800 dark:text-purple-300 mb-2", children: "💡 Pro Tips" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-purple-700 dark:text-purple-400 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Use Demo Mode to try all features without signing up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Export your itinerary from the Info tab as a backup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• The AI Concierge in Squad Chat can answer carnival questions" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 rounded-b-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
        children: "Got it!"
      }
    ) })
  ] }) });
}
function EmailAuthForm({ onBack, onSuccess }) {
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [successMessage, setSuccessMessage] = reactExports.useState("");
  const validateEmail = (email2) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email2);
  };
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check and try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessMessage("Account created! Please check your email to verify your account.");
      if (onSuccess) onSuccess(userCredential.user);
    } catch (err) {
      console.error("Sign up error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (onSuccess) onSuccess(userCredential.user);
    } catch (err) {
      console.error("Login error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    setError("");
    setSuccessMessage("");
    if (!validateEmail(email)) {
      setError("Please enter your email address first.");
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error("Password reset error:", err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onBack,
        className: "flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-6 text-center", children: mode === "login" ? "Welcome Back" : "Create Account" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm", children: error }),
      successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm", children: successMessage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: mode === "login" ? handleLogin : handleSignUp, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-gray-400 mb-1", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "your@email.com",
                className: "w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors",
                disabled: isLoading
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-gray-400 mb-1", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter your password",
                className: "w-full pl-10 pr-12 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors",
                disabled: isLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-gray-400 mb-1", children: "Confirm Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                placeholder: "Confirm your password",
                className: "w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-colors",
                disabled: isLoading
              }
            )
          ] })
        ] }),
        mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleForgotPassword,
            className: "text-sm text-pink-400 hover:text-pink-300 transition-colors",
            disabled: isLoading,
            children: "Forgot password?"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isLoading,
            className: "w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
              mode === "login" ? "Signing in..." : "Creating account..."
            ] }) : mode === "login" ? "Sign In" : "Create Account"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-sm", children: [
        mode === "login" ? "Don't have an account?" : "Already have an account?",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setSuccessMessage("");
            },
            className: "ml-2 text-pink-400 hover:text-pink-300 font-semibold transition-colors",
            children: mode === "login" ? "Sign Up" : "Sign In"
          }
        )
      ] }) })
    ] })
  ] });
}
function EmailVerificationBanner({ user, onResend }) {
  const [isSending, setIsSending] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  if (!user || user.emailVerified || !user.email) {
    return null;
  }
  const handleResend = async () => {
    setIsSending(true);
    try {
      await sendEmailVerification(user);
      setSent(true);
      setTimeout(() => setSent(false), 5e3);
    } catch (err) {
      console.error("Error sending verification:", err);
    } finally {
      setIsSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 px-4 py-3 flex items-center justify-between gap-4 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Please verify your email address to access all features." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleResend,
        disabled: isSending || sent,
        className: "text-sm font-semibold bg-yellow-500/30 hover:bg-yellow-500/40 px-3 py-1 rounded-lg transition-colors disabled:opacity-50",
        children: sent ? "Email Sent!" : isSending ? "Sending..." : "Resend Email"
      }
    )
  ] });
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes$3(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber$3(n, title = "") {
  if (!Number.isSafeInteger(n) || n < 0) {
    const prefix = title && `"${title}" `;
    throw new Error(`${prefix}expected integer >= 0, got ${n}`);
  }
}
function abytes$3(value, length, title = "") {
  const bytes = isBytes$3(value);
  const len = value?.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash must wrapped by utils.createHasher");
  anumber$3(h.outputLen);
  anumber$3(h.blockLen);
}
function aexists$1(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput$1(out, instance) {
  abytes$3(out, void 0, "digestInto() output");
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error('"digestInto() output" expected to be of length >=' + min);
  }
}
function clean$1(...arrays) {
  for (let i2 = 0; i2 < arrays.length; i2++) {
    arrays[i2].fill(0);
  }
}
function createView$1(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr$1(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
const hexes$3 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
function bytesToHex$2(bytes) {
  abytes$3(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i2 = 0; i2 < bytes.length; i2++) {
    hex += hexes$3[bytes[i2]];
  }
  return hex;
}
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes$3(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i2 = 0; i2 < arrays.length; i2++) {
    const a = arrays[i2];
    abytes$3(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i2 = 0, pad2 = 0; i2 < arrays.length; i2++) {
    const a = arrays[i2];
    res.set(a, pad2);
    pad2 += a.length;
  }
  return res;
}
function createHasher(hashCons, info = {}) {
  const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
  const tmp = hashCons(void 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  Object.assign(hashC, info);
  return Object.freeze(hashC);
}
function randomBytes(bytesLength = 32) {
  const cr = typeof globalThis === "object" ? globalThis.crypto : null;
  if (typeof cr?.getRandomValues !== "function")
    throw new Error("crypto.getRandomValues must be defined");
  return cr.getRandomValues(new Uint8Array(bytesLength));
}
const oidNist = (suffix) => ({
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, suffix])
});
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
class HashMD {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    __publicField(this, "blockLen");
    __publicField(this, "outputLen");
    __publicField(this, "padOffset");
    __publicField(this, "isLE");
    // For partial updates less than block size
    __publicField(this, "buffer");
    __publicField(this, "view");
    __publicField(this, "finished", false);
    __publicField(this, "length", 0);
    __publicField(this, "pos", 0);
    __publicField(this, "destroyed", false);
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView$1(this.buffer);
  }
  update(data) {
    aexists$1(this);
    abytes$3(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView$1(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists$1(this);
    aoutput$1(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean$1(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i2 = pos; i2 < blockLen; i2++)
      buffer[i2] = 0;
    view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView$1(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen must be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i2 = 0; i2 < outLen; i2++)
      oview.setUint32(4 * i2, state[i2], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA2_32B extends HashMD {
  constructor(outputLen) {
    super(64, outputLen, 8, false);
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i2 = 0; i2 < 16; i2++, offset += 4)
      SHA256_W[i2] = view.getUint32(offset, false);
    for (let i2 = 16; i2 < 64; i2++) {
      const W15 = SHA256_W[i2 - 15];
      const W2 = SHA256_W[i2 - 2];
      const s0 = rotr$1(W15, 7) ^ rotr$1(W15, 18) ^ W15 >>> 3;
      const s1 = rotr$1(W2, 17) ^ rotr$1(W2, 19) ^ W2 >>> 10;
      SHA256_W[i2] = s1 + SHA256_W[i2 - 7] + s0 + SHA256_W[i2 - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i2 = 0; i2 < 64; i2++) {
      const sigma1 = rotr$1(E, 6) ^ rotr$1(E, 11) ^ rotr$1(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i2] + SHA256_W[i2] | 0;
      const sigma0 = rotr$1(A, 2) ^ rotr$1(A, 13) ^ rotr$1(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean$1(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean$1(this.buffer);
  }
}
class _SHA256 extends SHA2_32B {
  constructor() {
    super(32);
    // We cannot use array here since array allows indexing by variable
    // which means optimizer/compiler cannot use registers.
    __publicField(this, "A", SHA256_IV[0] | 0);
    __publicField(this, "B", SHA256_IV[1] | 0);
    __publicField(this, "C", SHA256_IV[2] | 0);
    __publicField(this, "D", SHA256_IV[3] | 0);
    __publicField(this, "E", SHA256_IV[4] | 0);
    __publicField(this, "F", SHA256_IV[5] | 0);
    __publicField(this, "G", SHA256_IV[6] | 0);
    __publicField(this, "H", SHA256_IV[7] | 0);
  }
}
const sha256 = /* @__PURE__ */ createHasher(
  () => new _SHA256(),
  /* @__PURE__ */ oidNist(1)
);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$5 = /* @__PURE__ */ BigInt(0);
const _1n$4 = /* @__PURE__ */ BigInt(1);
function abool$1(value, title = "") {
  if (typeof value !== "boolean") {
    const prefix = title && `"${title}" `;
    throw new Error(prefix + "expected boolean, got type=" + typeof value);
  }
  return value;
}
function abignumber(n) {
  if (typeof n === "bigint") {
    if (!isPosBig(n))
      throw new Error("positive bigint expected, got " + n);
  } else
    anumber$3(n);
  return n;
}
function numberToHexUnpadded(num2) {
  const hex = abignumber(num2).toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber$2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$5 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber$2(bytesToHex$2(bytes));
}
function bytesToNumberLE(bytes) {
  return hexToNumber$2(bytesToHex$2(copyBytes$1(abytes$3(bytes)).reverse()));
}
function numberToBytesBE(n, len) {
  anumber$3(len);
  n = abignumber(n);
  const res = hexToBytes$3(n.toString(16).padStart(len * 2, "0"));
  if (res.length !== len)
    throw new Error("number too large");
  return res;
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function copyBytes$1(bytes) {
  return Uint8Array.from(bytes);
}
function asciiToBytes(ascii) {
  return Uint8Array.from(ascii, (c, i2) => {
    const charCode = c.charCodeAt(0);
    if (c.length !== 1 || charCode > 127) {
      throw new Error(`string contains non-ASCII character "${ascii[i2]}" with code ${charCode} at position ${i2}`);
    }
    return charCode;
  });
}
const isPosBig = (n) => typeof n === "bigint" && _0n$5 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$5; n >>= _1n$4, len += 1)
    ;
  return len;
}
const bitMask = (n) => (_1n$4 << BigInt(n)) - _1n$4;
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  anumber$3(hashLen, "hashLen");
  anumber$3(qByteLen, "qByteLen");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  const u8n = (len) => new Uint8Array(len);
  const NULL = Uint8Array.of();
  const byte0 = Uint8Array.of(0);
  const byte1 = Uint8Array.of(1);
  const _maxDrbgIters = 1e3;
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i2 = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i2 = 0;
  };
  const h = (...msgs) => hmacFn(k, concatBytes(v, ...msgs));
  const reseed = (seed = NULL) => {
    k = h(byte0, seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(byte1, seed);
    v = h();
  };
  const gen2 = () => {
    if (i2++ >= _maxDrbgIters)
      throw new Error("drbg: tried max amount of iterations");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
function validateObject(object, fields = {}, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  const iter = (f, isOpt) => Object.entries(f).forEach(([k, v]) => checkField(k, v, isOpt));
  iter(fields, false);
  iter(optFields, true);
}
function memoized(fn) {
  const map2 = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map2.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map2.set(arg, computed);
    return computed;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$4 = /* @__PURE__ */ BigInt(0), _1n$3 = /* @__PURE__ */ BigInt(1), _2n$3 = /* @__PURE__ */ BigInt(2);
const _3n$1 = /* @__PURE__ */ BigInt(3), _4n$1 = /* @__PURE__ */ BigInt(4), _5n = /* @__PURE__ */ BigInt(5);
const _7n$1 = /* @__PURE__ */ BigInt(7), _8n = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9);
const _16n = /* @__PURE__ */ BigInt(16);
function mod(a, b) {
  const result = a % b;
  return result >= _0n$4 ? result : b + result;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n$4) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n$4)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$4)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n$4, u = _1n$3;
  while (a !== _0n$4) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    b = a, a = r, x = u, u = m;
  }
  const gcd2 = b;
  if (gcd2 !== _1n$3)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function assertIsSquare(Fp, root, n) {
  if (!Fp.eql(Fp.sqr(root), n))
    throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp, n) {
  const p1div4 = (Fp.ORDER + _1n$3) / _4n$1;
  const root = Fp.pow(n, p1div4);
  assertIsSquare(Fp, root, n);
  return root;
}
function sqrt5mod8(Fp, n) {
  const p5div8 = (Fp.ORDER - _5n) / _8n;
  const n2 = Fp.mul(n, _2n$3);
  const v = Fp.pow(n2, p5div8);
  const nv = Fp.mul(n, v);
  const i2 = Fp.mul(Fp.mul(nv, _2n$3), v);
  const root = Fp.mul(nv, Fp.sub(i2, Fp.ONE));
  assertIsSquare(Fp, root, n);
  return root;
}
function sqrt9mod16(P) {
  const Fp_ = Field(P);
  const tn = tonelliShanks(P);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P + _7n$1) / _16n;
  return (Fp, n) => {
    let tv1 = Fp.pow(n, c4);
    let tv2 = Fp.mul(tv1, c1);
    const tv3 = Fp.mul(tv1, c2);
    const tv4 = Fp.mul(tv1, c3);
    const e1 = Fp.eql(Fp.sqr(tv2), n);
    const e2 = Fp.eql(Fp.sqr(tv3), n);
    tv1 = Fp.cmov(tv1, tv2, e1);
    tv2 = Fp.cmov(tv4, tv3, e2);
    const e3 = Fp.eql(Fp.sqr(tv2), n);
    const root = Fp.cmov(tv1, tv2, e3);
    assertIsSquare(Fp, root, n);
    return root;
  };
}
function tonelliShanks(P) {
  if (P < _3n$1)
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n$3;
  let S = 0;
  while (Q % _2n$3 === _0n$4) {
    Q /= _2n$3;
    S++;
  }
  let Z = _2n$3;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n$3) / _2n$3;
  return function tonelliSlow(Fp, n) {
    if (Fp.is0(n))
      return n;
    if (FpLegendre(Fp, n) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c = Fp.mul(Fp.ONE, cc);
    let t = Fp.pow(n, Q);
    let R = Fp.pow(n, Q1div2);
    while (!Fp.eql(t, Fp.ONE)) {
      if (Fp.is0(t))
        return Fp.ZERO;
      let i2 = 1;
      let t_tmp = Fp.sqr(t);
      while (!Fp.eql(t_tmp, Fp.ONE)) {
        i2++;
        t_tmp = Fp.sqr(t_tmp);
        if (i2 === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$3 << BigInt(M - i2 - 1);
      const b = Fp.pow(c, exponent);
      M = i2;
      c = Fp.sqr(b);
      t = Fp.mul(t, c);
      R = Fp.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n$1 === _3n$1)
    return sqrt3mod4;
  if (P % _8n === _5n)
    return sqrt5mod8;
  if (P % _16n === _9n)
    return sqrt9mod16(P);
  return tonelliShanks(P);
}
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map2, val) => {
    map2[val] = "function";
    return map2;
  }, initial);
  validateObject(field, opts);
  return field;
}
function FpPow(Fp, num2, power) {
  if (power < _0n$4)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$4)
    return Fp.ONE;
  if (power === _1n$3)
    return num2;
  let p = Fp.ONE;
  let d = num2;
  while (power > _0n$4) {
    if (power & _1n$3)
      p = Fp.mul(p, d);
    d = Fp.sqr(d);
    power >>= _1n$3;
  }
  return p;
}
function FpInvertBatch(Fp, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num2, i2) => {
    if (Fp.is0(num2))
      return acc;
    inverted[i2] = acc;
    return Fp.mul(acc, num2);
  }, Fp.ONE);
  const invertedAcc = Fp.inv(multipliedAcc);
  nums.reduceRight((acc, num2, i2) => {
    if (Fp.is0(num2))
      return acc;
    inverted[i2] = Fp.mul(acc, inverted[i2]);
    return Fp.mul(acc, num2);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp, n) {
  const p1mod2 = (Fp.ORDER - _1n$3) / _2n$3;
  const powered = Fp.pow(n, p1mod2);
  const yes = Fp.eql(powered, Fp.ONE);
  const zero = Fp.eql(powered, Fp.ZERO);
  const no = Fp.eql(powered, Fp.neg(Fp.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber$3(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
class _Field {
  constructor(ORDER, opts = {}) {
    __publicField(this, "ORDER");
    __publicField(this, "BITS");
    __publicField(this, "BYTES");
    __publicField(this, "isLE");
    __publicField(this, "ZERO", _0n$4);
    __publicField(this, "ONE", _1n$3);
    __publicField(this, "_lengths");
    __publicField(this, "_sqrt");
    // cached sqrt
    __publicField(this, "_mod");
    if (ORDER <= _0n$4)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    let _nbitLength = void 0;
    this.isLE = false;
    if (opts != null && typeof opts === "object") {
      if (typeof opts.BITS === "number")
        _nbitLength = opts.BITS;
      if (typeof opts.sqrt === "function")
        this.sqrt = opts.sqrt;
      if (typeof opts.isLE === "boolean")
        this.isLE = opts.isLE;
      if (opts.allowedLengths)
        this._lengths = opts.allowedLengths?.slice();
      if (typeof opts.modFromBytes === "boolean")
        this._mod = opts.modFromBytes;
    }
    const { nBitLength, nByteLength } = nLength(ORDER, _nbitLength);
    if (nByteLength > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    this.ORDER = ORDER;
    this.BITS = nBitLength;
    this.BYTES = nByteLength;
    this._sqrt = void 0;
    Object.preventExtensions(this);
  }
  create(num2) {
    return mod(num2, this.ORDER);
  }
  isValid(num2) {
    if (typeof num2 !== "bigint")
      throw new Error("invalid field element: expected bigint, got " + typeof num2);
    return _0n$4 <= num2 && num2 < this.ORDER;
  }
  is0(num2) {
    return num2 === _0n$4;
  }
  // is valid and invertible
  isValidNot0(num2) {
    return !this.is0(num2) && this.isValid(num2);
  }
  isOdd(num2) {
    return (num2 & _1n$3) === _1n$3;
  }
  neg(num2) {
    return mod(-num2, this.ORDER);
  }
  eql(lhs, rhs) {
    return lhs === rhs;
  }
  sqr(num2) {
    return mod(num2 * num2, this.ORDER);
  }
  add(lhs, rhs) {
    return mod(lhs + rhs, this.ORDER);
  }
  sub(lhs, rhs) {
    return mod(lhs - rhs, this.ORDER);
  }
  mul(lhs, rhs) {
    return mod(lhs * rhs, this.ORDER);
  }
  pow(num2, power) {
    return FpPow(this, num2, power);
  }
  div(lhs, rhs) {
    return mod(lhs * invert(rhs, this.ORDER), this.ORDER);
  }
  // Same as above, but doesn't normalize
  sqrN(num2) {
    return num2 * num2;
  }
  addN(lhs, rhs) {
    return lhs + rhs;
  }
  subN(lhs, rhs) {
    return lhs - rhs;
  }
  mulN(lhs, rhs) {
    return lhs * rhs;
  }
  inv(num2) {
    return invert(num2, this.ORDER);
  }
  sqrt(num2) {
    if (!this._sqrt)
      this._sqrt = FpSqrt(this.ORDER);
    return this._sqrt(this, num2);
  }
  toBytes(num2) {
    return this.isLE ? numberToBytesLE(num2, this.BYTES) : numberToBytesBE(num2, this.BYTES);
  }
  fromBytes(bytes, skipValidation = false) {
    abytes$3(bytes);
    const { _lengths: allowedLengths, BYTES, isLE: isLE2, ORDER, _mod: modFromBytes } = this;
    if (allowedLengths) {
      if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
        throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
      }
      const padded = new Uint8Array(BYTES);
      padded.set(bytes, isLE2 ? 0 : padded.length - bytes.length);
      bytes = padded;
    }
    if (bytes.length !== BYTES)
      throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
    let scalar = isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    if (modFromBytes)
      scalar = mod(scalar, ORDER);
    if (!skipValidation) {
      if (!this.isValid(scalar))
        throw new Error("invalid field element: outside of range 0..ORDER");
    }
    return scalar;
  }
  // TODO: we don't need it here, move out to separate fn
  invertBatch(lst) {
    return FpInvertBatch(this, lst);
  }
  // We can't move this out because Fp6, Fp12 implement it
  // and it's unclear what to return in there.
  cmov(a, b, condition) {
    return condition ? b : a;
  }
}
function Field(ORDER, opts = {}) {
  return new _Field(ORDER, opts);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  abytes$3(key);
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num2 = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num2, fieldOrder - _1n$3) + _1n$3;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = /* @__PURE__ */ BigInt(0);
const _1n$2 = /* @__PURE__ */ BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c, points) {
  const invertedZs = FpInvertBatch(c.Fp, points.map((p) => p.Z));
  return points.map((p, i2) => c.fromAffine(p.toAffine(invertedZs[i2])));
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$2;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function assert0(n) {
  if (n !== _0n$3)
    throw new Error("invalid wNAF");
}
class wNAF {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    __publicField(this, "BASE");
    __publicField(this, "ZERO");
    __publicField(this, "Fn");
    __publicField(this, "bits");
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n, p = this.ZERO) {
    let d = elm;
    while (n > _0n$3) {
      if (n & _1n$2)
        p = p.add(d);
      d = d.double();
      n >>= _1n$2;
    }
    return p;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W) {
    const { windows, windowSize } = calcWOpts(W, this.bits);
    const points = [];
    let p = point;
    let base = p;
    for (let window2 = 0; window2 < windows; window2++) {
      base = p;
      points.push(base);
      for (let i2 = 1; i2 < windowSize; i2++) {
        base = base.add(p);
        points.push(base);
      }
      p = base.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W, precomputes, n) {
    if (!this.Fn.isValid(n))
      throw new Error("invalid scalar");
    let p = this.ZERO;
    let f = this.BASE;
    const wo = calcWOpts(W, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        f = f.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p = p.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n);
    return { p, f };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W, precomputes, n, acc = this.ZERO) {
    const wo = calcWOpts(W, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      if (n === _0n$3)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n);
    return acc;
  }
  getPrecomputes(W, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W);
      if (W !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W = getW(point);
    return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W = getW(point);
    if (W === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P, W) {
    validateW(W, this.bits);
    pointWindowSizes.set(P, W);
    pointPrecomputes.delete(P);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
}
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n$3 || k2 > _0n$3) {
    if (k1 & _1n$2)
      p1 = p1.add(acc);
    if (k2 & _1n$2)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n$2;
    k2 >>= _1n$2;
  }
  return { p1, p2 };
}
function createField(order, field, isLE2) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order, { isLE: isLE2 });
  }
}
function createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p of ["p", "n", "h"]) {
    const val = CURVE[p];
    if (!(typeof val === "bigint" && val > _0n$3))
      throw new Error(`CURVE.${p} must be positive bigint`);
  }
  const Fp = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b2 = "b";
  const params = ["Gx", "Gy", "a", _b2];
  for (const p of params) {
    if (!Fp.isValid(CURVE[p]))
      throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp, Fn };
}
function createKeygen(randomSecretKey, getPublicKey2) {
  return function keygen(seed) {
    const secretKey = randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey2(secretKey) };
  };
}
class _HMAC {
  constructor(hash, key) {
    __publicField(this, "oHash");
    __publicField(this, "iHash");
    __publicField(this, "blockLen");
    __publicField(this, "outputLen");
    __publicField(this, "finished", false);
    __publicField(this, "destroyed", false);
    ahash(hash);
    abytes$3(key, void 0, "key");
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad2 = new Uint8Array(blockLen);
    pad2.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i2 = 0; i2 < pad2.length; i2++)
      pad2[i2] ^= 54;
    this.iHash.update(pad2);
    this.oHash = hash.create();
    for (let i2 = 0; i2 < pad2.length; i2++)
      pad2[i2] ^= 54 ^ 92;
    this.oHash.update(pad2);
    clean$1(pad2);
  }
  update(buf) {
    aexists$1(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists$1(this);
    abytes$3(out, this.outputLen, "output");
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
}
const hmac = (hash, key, message) => new _HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new _HMAC(hash, key);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const divNearest = (num2, den) => (num2 + (num2 >= 0 ? den : -den) / _2n$2) / den;
function _splitEndoScalar(k, basis, n) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k, n);
  const c2 = divNearest(-b1 * k, n);
  let k1 = k - c1 * a1 - c2 * a2;
  let k2 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n$2;
  const k2neg = k2 < _0n$2;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k2 = -k2;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n$1;
  if (k1 < _0n$2 || k1 >= MAX_NUM || k2 < _0n$2 || k2 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k);
  }
  return { k1neg, k1, k2neg, k2 };
}
function validateSigFormat(format) {
  if (!["compact", "recovered", "der"].includes(format))
    throw new Error('Signature format must be "compact", "recovered", or "der"');
  return format;
}
function validateSigOpts(opts, def) {
  const optsn = {};
  for (let optName of Object.keys(def)) {
    optsn[optName] = opts[optName] === void 0 ? def[optName] : opts[optName];
  }
  abool$1(optsn.lowS, "lowS");
  abool$1(optsn.prehash, "prehash");
  if (optsn.format !== void 0)
    validateSigFormat(optsn.format);
  return optsn;
}
class DERErr extends Error {
  constructor(m = "") {
    super(m);
  }
}
const DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E } = DER;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length = 0;
      if (!isLong)
        length = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length = length << 8 | b;
        pos += lenLen;
        if (length < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length);
      if (v.length !== length)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num2) {
      const { Err: E } = DER;
      if (num2 < _0n$2)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num2);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER;
      if (data[0] & 128)
        throw new E("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE(data);
    }
  },
  toSig(bytes) {
    const { Err: E, _int: int, _tlv: tlv } = DER;
    const data = abytes$3(bytes, void 0, "signature");
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
const _0n$2 = BigInt(0), _1n$1 = BigInt(1), _2n$2 = BigInt(2), _3n = BigInt(3), _4n = BigInt(4);
function weierstrass(params, extraOpts = {}) {
  const validated = createCurveFields("weierstrass", params, extraOpts);
  const { Fp, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp, Fn);
  function assertCompressionIsSupported() {
    if (!Fp.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes2(_c2, point, isCompressed) {
    const { x, y } = point.toAffine();
    const bx = Fp.toBytes(x);
    abool$1(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp.isOdd(y);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp.toBytes(y));
    }
  }
  function pointFromBytes(bytes) {
    abytes$3(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === comp && (head === 2 || head === 3)) {
      const x = Fp.fromBytes(tail);
      if (!Fp.isValid(x))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x);
      let y;
      try {
        y = Fp.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const evenY = Fp.isOdd(y);
      const evenH = (head & 1) === 1;
      if (evenH !== evenY)
        y = Fp.neg(y);
      return { x, y };
    } else if (length === uncomp && head === 4) {
      const L = Fp.BYTES;
      const x = Fp.fromBytes(tail.subarray(0, L));
      const y = Fp.fromBytes(tail.subarray(L, L * 2));
      if (!isValidXY(x, y))
        throw new Error("bad point: is not on curve");
      return { x, y };
    } else {
      throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes2;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x) {
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, CURVE.a)), CURVE.b);
  }
  function isValidXY(x, y) {
    const left = Fp.sqr(y);
    const right = weierstrassEquation(x);
    return Fp.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n), _4n);
  const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
  if (Fp.is0(Fp.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp.isValid(n) || banZero && Fp.is0(n))
      throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("Weierstrass Point expected");
  }
  function splitEndoScalarN(k) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k, endo.basises, Fn.ORDER);
  }
  const toAffineMemo = memoized((p, iz) => {
    const { X: X2, Y, Z } = p;
    if (Fp.eql(Z, Fp.ONE))
      return { x: X2, y: Y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(Z);
    const x = Fp.mul(X2, iz);
    const y = Fp.mul(Y, iz);
    const zz = Fp.mul(Z, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x, y };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp.is0(p.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp.isValid(x) || !Fp.isValid(y))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  const _Point = class _Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X2, Y, Z) {
      __publicField(this, "X");
      __publicField(this, "Y");
      __publicField(this, "Z");
      this.X = acoord("x", X2);
      this.Y = acoord("y", Y, true);
      this.Z = acoord("z", Z);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof _Point)
        throw new Error("projective point not allowed");
      if (Fp.is0(x) && Fp.is0(y))
        return _Point.ZERO;
      return new _Point(x, y, Fp.ONE);
    }
    static fromBytes(bytes) {
      const P = _Point.fromAffine(decodePoint(abytes$3(bytes, void 0, "point")));
      P.assertValidity();
      return P;
    }
    static fromHex(hex) {
      return _Point.fromBytes(hexToBytes$3(hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (!Fp.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp.isOdd(y);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new _Point(this.X, Fp.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new _Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new _Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(_Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul3 = (n) => wnaf.cached(this, n, (p) => normalizeZ(_Point, p));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul3(k1);
        const { p: k2p, f: k2f } = mul3(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p, f } = mul3(scalar);
        point = p;
        fake = f;
      }
      return normalizeZ(_Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p = this;
      if (!Fn.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n$2 || p.is0())
        return _Point.ZERO;
      if (sc === _1n$1)
        return p;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2 } = mulEndoUnsafe(_Point, p, k1, k2);
        return finishEndo(endo2.beta, p1, p2, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p, sc);
      }
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n$1)
        return true;
      if (isTorsionFree)
        return isTorsionFree(_Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n$1)
        return this;
      if (clearCofactor)
        return clearCofactor(_Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      abool$1(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(_Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex$2(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
  };
  // base / generator point
  __publicField(_Point, "BASE", new _Point(CURVE.Gx, CURVE.Gy, Fp.ONE));
  // zero / infinity / identity point
  __publicField(_Point, "ZERO", new _Point(Fp.ZERO, Fp.ONE, Fp.ZERO));
  // 0, 1, 0
  // math field
  __publicField(_Point, "Fp", Fp);
  // scalar field
  __publicField(_Point, "Fn", Fn);
  let Point = _Point;
  const bits = Fn.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function getWLengths(Fp, Fn) {
  return {
    secretKey: Fn.BYTES,
    publicKey: 1 + Fp.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn.BYTES
  };
}
function ecdh(Point, ecdhOpts = {}) {
  const { Fn } = Point;
  const randomBytes_ = ecdhOpts.randomBytes || randomBytes;
  const lengths = Object.assign(getWLengths(Point.Fp, Fn), { seed: getMinHashLength(Fn.ORDER) });
  function isValidSecretKey(secretKey) {
    try {
      const num2 = Fn.fromBytes(secretKey);
      return Fn.isValidNot0(num2);
    } catch (error) {
      return false;
    }
  }
  function isValidPublicKey(publicKey, isCompressed) {
    const { publicKey: comp, publicKeyUncompressed } = lengths;
    try {
      const l = publicKey.length;
      if (isCompressed === true && l !== comp)
        return false;
      if (isCompressed === false && l !== publicKeyUncompressed)
        return false;
      return !!Point.fromBytes(publicKey);
    } catch (error) {
      return false;
    }
  }
  function randomSecretKey(seed = randomBytes_(lengths.seed)) {
    return mapHashToField(abytes$3(seed, lengths.seed, "seed"), Fn.ORDER);
  }
  function getPublicKey2(secretKey, isCompressed = true) {
    return Point.BASE.multiply(Fn.fromBytes(secretKey)).toBytes(isCompressed);
  }
  function isProbPub(item) {
    const { secretKey, publicKey, publicKeyUncompressed } = lengths;
    if (!isBytes$3(item))
      return void 0;
    if ("_lengths" in Fn && Fn._lengths || secretKey === publicKey)
      return void 0;
    const l = abytes$3(item, void 0, "key").length;
    return l === publicKey || l === publicKeyUncompressed;
  }
  function getSharedSecret(secretKeyA, publicKeyB, isCompressed = true) {
    if (isProbPub(secretKeyA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicKeyB) === false)
      throw new Error("second arg must be public key");
    const s = Fn.fromBytes(secretKeyA);
    const b = Point.fromBytes(publicKeyB);
    return b.multiply(s).toBytes(isCompressed);
  }
  const utils2 = {
    isValidSecretKey,
    isValidPublicKey,
    randomSecretKey
  };
  const keygen = createKeygen(randomSecretKey, getPublicKey2);
  return Object.freeze({ getPublicKey: getPublicKey2, getSharedSecret, keygen, Point, utils: utils2, lengths });
}
function ecdsa(Point, hash, ecdsaOpts = {}) {
  ahash(hash);
  validateObject(ecdsaOpts, {}, {
    hmac: "function",
    lowS: "boolean",
    randomBytes: "function",
    bits2int: "function",
    bits2int_modN: "function"
  });
  ecdsaOpts = Object.assign({}, ecdsaOpts);
  const randomBytes$1 = ecdsaOpts.randomBytes || randomBytes;
  const hmac$1 = ecdsaOpts.hmac || ((key, msg) => hmac(hash, key, msg));
  const { Fp, Fn } = Point;
  const { ORDER: CURVE_ORDER, BITS: fnBits } = Fn;
  const { keygen, getPublicKey: getPublicKey2, getSharedSecret, utils: utils2, lengths } = ecdh(Point, ecdsaOpts);
  const defaultSigOpts = {
    prehash: true,
    lowS: typeof ecdsaOpts.lowS === "boolean" ? ecdsaOpts.lowS : true,
    format: "compact",
    extraEntropy: false
  };
  const hasLargeCofactor = CURVE_ORDER * _2n$2 < Fp.ORDER;
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n$1;
    return number > HALF;
  }
  function validateRS(title, num2) {
    if (!Fn.isValidNot0(num2))
      throw new Error(`invalid signature ${title}: out of range 1..Point.Fn.ORDER`);
    return num2;
  }
  function assertSmallCofactor() {
    if (hasLargeCofactor)
      throw new Error('"recovered" sig type is not supported for cofactor >2 curves');
  }
  function validateSigLength(bytes, format) {
    validateSigFormat(format);
    const size2 = lengths.signature;
    const sizer = format === "compact" ? size2 : format === "recovered" ? size2 + 1 : void 0;
    return abytes$3(bytes, sizer);
  }
  class Signature {
    constructor(r, s, recovery) {
      __publicField(this, "r");
      __publicField(this, "s");
      __publicField(this, "recovery");
      this.r = validateRS("r", r);
      this.s = validateRS("s", s);
      if (recovery != null) {
        assertSmallCofactor();
        if (![0, 1, 2, 3].includes(recovery))
          throw new Error("invalid recovery id");
        this.recovery = recovery;
      }
      Object.freeze(this);
    }
    static fromBytes(bytes, format = defaultSigOpts.format) {
      validateSigLength(bytes, format);
      let recid;
      if (format === "der") {
        const { r: r2, s: s2 } = DER.toSig(abytes$3(bytes));
        return new Signature(r2, s2);
      }
      if (format === "recovered") {
        recid = bytes[0];
        format = "compact";
        bytes = bytes.subarray(1);
      }
      const L = lengths.signature / 2;
      const r = bytes.subarray(0, L);
      const s = bytes.subarray(L, L * 2);
      return new Signature(Fn.fromBytes(r), Fn.fromBytes(s), recid);
    }
    static fromHex(hex, format) {
      return this.fromBytes(hexToBytes$3(hex), format);
    }
    assertRecovery() {
      const { recovery } = this;
      if (recovery == null)
        throw new Error("invalid recovery id: must be present");
      return recovery;
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(messageHash) {
      const { r, s } = this;
      const recovery = this.assertRecovery();
      const radj = recovery === 2 || recovery === 3 ? r + CURVE_ORDER : r;
      if (!Fp.isValid(radj))
        throw new Error("invalid recovery id: sig.r+curve.n != R.x");
      const x = Fp.toBytes(radj);
      const R = Point.fromBytes(concatBytes(pprefix((recovery & 1) === 0), x));
      const ir = Fn.inv(radj);
      const h = bits2int_modN(abytes$3(messageHash, void 0, "msgHash"));
      const u1 = Fn.create(-h * ir);
      const u2 = Fn.create(s * ir);
      const Q = Point.BASE.multiplyUnsafe(u1).add(R.multiplyUnsafe(u2));
      if (Q.is0())
        throw new Error("invalid recovery: point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    toBytes(format = defaultSigOpts.format) {
      validateSigFormat(format);
      if (format === "der")
        return hexToBytes$3(DER.hexFromSig(this));
      const { r, s } = this;
      const rb = Fn.toBytes(r);
      const sb = Fn.toBytes(s);
      if (format === "recovered") {
        assertSmallCofactor();
        return concatBytes(Uint8Array.of(this.assertRecovery()), rb, sb);
      }
      return concatBytes(rb, sb);
    }
    toHex(format) {
      return bytesToHex$2(this.toBytes(format));
    }
  }
  const bits2int = ecdsaOpts.bits2int || function bits2int_def(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num2 = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - fnBits;
    return delta > 0 ? num2 >> BigInt(delta) : num2;
  };
  const bits2int_modN = ecdsaOpts.bits2int_modN || function bits2int_modN_def(bytes) {
    return Fn.create(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(fnBits);
  function int2octets(num2) {
    aInRange("num < 2^" + fnBits, num2, _0n$2, ORDER_MASK);
    return Fn.toBytes(num2);
  }
  function validateMsgAndHash(message, prehash) {
    abytes$3(message, void 0, "message");
    return prehash ? abytes$3(hash(message), void 0, "prehashed message") : message;
  }
  function prepSig(message, secretKey, opts) {
    const { lowS, prehash, extraEntropy } = validateSigOpts(opts, defaultSigOpts);
    message = validateMsgAndHash(message, prehash);
    const h1int = bits2int_modN(message);
    const d = Fn.fromBytes(secretKey);
    if (!Fn.isValidNot0(d))
      throw new Error("invalid private key");
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (extraEntropy != null && extraEntropy !== false) {
      const e = extraEntropy === true ? randomBytes$1(lengths.secretKey) : extraEntropy;
      seedArgs.push(abytes$3(e, void 0, "extraEntropy"));
    }
    const seed = concatBytes(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!Fn.isValidNot0(k))
        return;
      const ik = Fn.inv(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r = Fn.create(q.x);
      if (r === _0n$2)
        return;
      const s = Fn.create(ik * Fn.create(m + r * d));
      if (s === _0n$2)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n$1);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = Fn.neg(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, hasLargeCofactor ? void 0 : recovery);
    }
    return { seed, k2sig };
  }
  function sign(message, secretKey, opts = {}) {
    const { seed, k2sig } = prepSig(message, secretKey, opts);
    const drbg = createHmacDrbg(hash.outputLen, Fn.BYTES, hmac$1);
    const sig = drbg(seed, k2sig);
    return sig.toBytes(opts.format);
  }
  function verify(signature, message, publicKey, opts = {}) {
    const { lowS, prehash, format } = validateSigOpts(opts, defaultSigOpts);
    publicKey = abytes$3(publicKey, void 0, "publicKey");
    message = validateMsgAndHash(message, prehash);
    if (!isBytes$3(signature)) {
      const end = signature instanceof Signature ? ", use sig.toBytes()" : "";
      throw new Error("verify expects Uint8Array signature" + end);
    }
    validateSigLength(signature, format);
    try {
      const sig = Signature.fromBytes(signature, format);
      const P = Point.fromBytes(publicKey);
      if (lowS && sig.hasHighS())
        return false;
      const { r, s } = sig;
      const h = bits2int_modN(message);
      const is = Fn.inv(s);
      const u1 = Fn.create(h * is);
      const u2 = Fn.create(r * is);
      const R = Point.BASE.multiplyUnsafe(u1).add(P.multiplyUnsafe(u2));
      if (R.is0())
        return false;
      const v = Fn.create(R.x);
      return v === r;
    } catch (e) {
      return false;
    }
  }
  function recoverPublicKey(signature, message, opts = {}) {
    const { prehash } = validateSigOpts(opts, defaultSigOpts);
    message = validateMsgAndHash(message, prehash);
    return Signature.fromBytes(signature, "recovered").recoverPublicKey(message).toBytes();
  }
  return Object.freeze({
    keygen,
    getPublicKey: getPublicKey2,
    getSharedSecret,
    utils: utils2,
    lengths,
    Point,
    sign,
    verify,
    recoverPublicKey,
    Signature,
    hash
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const secp256k1_CURVE = {
  p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
  n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
  h: BigInt(1),
  a: BigInt(0),
  b: BigInt(7),
  Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
  Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
};
const secp256k1_ENDO = {
  beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
  basises: [
    [BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],
    [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]
  ]
};
const _0n$1 = /* @__PURE__ */ BigInt(0);
const _2n$1 = /* @__PURE__ */ BigInt(2);
function sqrtMod(y) {
  const P = secp256k1_CURVE.p;
  const _3n2 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n2, P) * b3 % P;
  const b9 = pow2(b6, _3n2, P) * b3 % P;
  const b11 = pow2(b9, _2n$1, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n2, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n$1, P);
  if (!Fpk1.eql(Fpk1.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
const Fpk1 = Field(secp256k1_CURVE.p, { sqrt: sqrtMod });
const Pointk1 = /* @__PURE__ */ weierstrass(secp256k1_CURVE, {
  Fp: Fpk1,
  endo: secp256k1_ENDO
});
const secp256k1 = /* @__PURE__ */ ecdsa(Pointk1, sha256);
const TAGGED_HASH_PREFIXES = {};
function taggedHash(tag, ...messages) {
  let tagP = TAGGED_HASH_PREFIXES[tag];
  if (tagP === void 0) {
    const tagH = sha256(asciiToBytes(tag));
    tagP = concatBytes(tagH, tagH);
    TAGGED_HASH_PREFIXES[tag] = tagP;
  }
  return sha256(concatBytes(tagP, ...messages));
}
const pointToBytes = (point) => point.toBytes(true).slice(1);
const hasEven = (y) => y % _2n$1 === _0n$1;
function schnorrGetExtPubKey(priv) {
  const { Fn, BASE } = Pointk1;
  const d_ = Fn.fromBytes(priv);
  const p = BASE.multiply(d_);
  const scalar = hasEven(p.y) ? d_ : Fn.neg(d_);
  return { scalar, bytes: pointToBytes(p) };
}
function lift_x(x) {
  const Fp = Fpk1;
  if (!Fp.isValidNot0(x))
    throw new Error("invalid x: Fail if x ≥ p");
  const xx = Fp.create(x * x);
  const c = Fp.create(xx * x + BigInt(7));
  let y = Fp.sqrt(c);
  if (!hasEven(y))
    y = Fp.neg(y);
  const p = Pointk1.fromAffine({ x, y });
  p.assertValidity();
  return p;
}
const num = bytesToNumberBE;
function challenge(...args) {
  return Pointk1.Fn.create(num(taggedHash("BIP0340/challenge", ...args)));
}
function schnorrGetPublicKey(secretKey) {
  return schnorrGetExtPubKey(secretKey).bytes;
}
function schnorrSign(message, secretKey, auxRand = randomBytes(32)) {
  const { Fn } = Pointk1;
  const m = abytes$3(message, void 0, "message");
  const { bytes: px, scalar: d } = schnorrGetExtPubKey(secretKey);
  const a = abytes$3(auxRand, 32, "auxRand");
  const t = Fn.toBytes(d ^ num(taggedHash("BIP0340/aux", a)));
  const rand = taggedHash("BIP0340/nonce", t, px, m);
  const { bytes: rx, scalar: k } = schnorrGetExtPubKey(rand);
  const e = challenge(rx, px, m);
  const sig = new Uint8Array(64);
  sig.set(rx, 0);
  sig.set(Fn.toBytes(Fn.create(k + e * d)), 32);
  if (!schnorrVerify(sig, m, px))
    throw new Error("sign: Invalid signature produced");
  return sig;
}
function schnorrVerify(signature, message, publicKey) {
  const { Fp, Fn, BASE } = Pointk1;
  const sig = abytes$3(signature, 64, "signature");
  const m = abytes$3(message, void 0, "message");
  const pub = abytes$3(publicKey, 32, "publicKey");
  try {
    const P = lift_x(num(pub));
    const r = num(sig.subarray(0, 32));
    if (!Fp.isValidNot0(r))
      return false;
    const s = num(sig.subarray(32, 64));
    if (!Fn.isValidNot0(s))
      return false;
    const e = challenge(Fn.toBytes(r), pointToBytes(P), m);
    const R = BASE.multiplyUnsafe(s).add(P.multiplyUnsafe(Fn.neg(e)));
    const { x, y } = R.toAffine();
    if (R.is0() || !hasEven(y) || x !== r)
      return false;
    return true;
  } catch (error) {
    return false;
  }
}
const schnorr = /* @__PURE__ */ (() => {
  const size2 = 32;
  const seedLength = 48;
  const randomSecretKey = (seed = randomBytes(seedLength)) => {
    return mapHashToField(seed, secp256k1_CURVE.n);
  };
  return {
    keygen: createKeygen(randomSecretKey, schnorrGetPublicKey),
    getPublicKey: schnorrGetPublicKey,
    sign: schnorrSign,
    verify: schnorrVerify,
    Point: Pointk1,
    utils: {
      randomSecretKey,
      taggedHash,
      lift_x,
      pointToBytes
    },
    lengths: {
      secretKey: size2,
      publicKey: size2,
      publicKeyHasPrefix: false,
      signature: size2 * 2,
      seed: seedLength
    }
  };
})();
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes$2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes$2(b) {
  if (!isBytes$2(b))
    throw new Error("Uint8Array expected");
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function afn(input) {
  if (typeof input !== "function")
    throw new Error("function expected");
  return true;
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber$2(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function chain(...args) {
  const id = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode2 = args.map((x) => x.encode).reduceRight(wrap, id);
  const decode2 = args.map((x) => x.decode).reduce(wrap, id);
  return { encode: encode2, decode: decode2 };
}
// @__NO_SIDE_EFFECTS__
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l, i2) => [l, i2]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i2) => {
        if (!Number.isSafeInteger(i2) || i2 < 0 || i2 >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i2}". Allowed: ${letters}`);
        return lettersA[i2];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i2 = indexes.get(letter);
        if (i2 === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i2;
      });
    }
  };
}
// @__NO_SIDE_EFFECTS__
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from2) => {
      astrArr("join.decode", from2);
      return from2.join(separator);
    },
    decode: (to) => {
      astr("join.decode", to);
      return to.split(separator);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function padding(bits, chr = "=") {
  anumber$2(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from2, to) => from2 + (to - gcd(from2, to));
const powers = /* @__PURE__ */ (() => {
  let res = [];
  for (let i2 = 0; i2 < 40; i2++)
    res.push(2 ** i2);
  return res;
})();
function convertRadix2(data, from2, to, padding2) {
  aArr(data);
  if (from2 <= 0 || from2 > 32)
    throw new Error(`convertRadix2: wrong from=${from2}`);
  if (to <= 0 || to > 32)
    throw new Error(`convertRadix2: wrong to=${to}`);
  if (/* @__PURE__ */ radix2carry(from2, to) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from2} to=${to} carryBits=${/* @__PURE__ */ radix2carry(from2, to)}`);
  }
  let carry = 0;
  let pos = 0;
  const max = powers[from2];
  const mask = powers[to] - 1;
  const res = [];
  for (const n of data) {
    anumber$2(n);
    if (n >= max)
      throw new Error(`convertRadix2: invalid data word=${n} from=${from2}`);
    carry = carry << from2 | n;
    if (pos + from2 > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from2}`);
    pos += from2;
    for (; pos >= to; pos -= to)
      res.push((carry >> pos - to & mask) >>> 0);
    const pow = powers[pos];
    if (pow === void 0)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to - pos & mask;
  if (!padding2 && pos >= from2)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
// @__NO_SIDE_EFFECTS__
function radix2(bits, revPadding = false) {
  anumber$2(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes$2(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
function unsafeWrapper(fn) {
  afn(fn);
  return function(...args) {
    try {
      return fn.apply(null, args);
    } catch (e) {
    }
  };
}
const hasBase64Builtin = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
const decodeBase64Builtin = (s, isUrl) => {
  astr("base64", s);
  const re = /^[A-Za-z0-9=+/]+$/;
  const alphabet2 = "base64";
  if (s.length > 0 && !re.test(s))
    throw new Error("invalid base64");
  return Uint8Array.fromBase64(s, { alphabet: alphabet2, lastChunkHandling: "strict" });
};
const base64 = hasBase64Builtin ? {
  encode(b) {
    abytes$2(b);
    return b.toBase64();
  },
  decode(s) {
    return decodeBase64Builtin(s);
  }
} : /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ padding(6), /* @__PURE__ */ join(""));
const BECH_ALPHABET = /* @__PURE__ */ chain(/* @__PURE__ */ alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), /* @__PURE__ */ join(""));
const POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(pre) {
  const b = pre >> 25;
  let chk = (pre & 33554431) << 5;
  for (let i2 = 0; i2 < POLYMOD_GENERATORS.length; i2++) {
    if ((b >> i2 & 1) === 1)
      chk ^= POLYMOD_GENERATORS[i2];
  }
  return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
  const len = prefix.length;
  let chk = 1;
  for (let i2 = 0; i2 < len; i2++) {
    const c = prefix.charCodeAt(i2);
    if (c < 33 || c > 126)
      throw new Error(`Invalid prefix (${prefix})`);
    chk = bech32Polymod(chk) ^ c >> 5;
  }
  chk = bech32Polymod(chk);
  for (let i2 = 0; i2 < len; i2++)
    chk = bech32Polymod(chk) ^ prefix.charCodeAt(i2) & 31;
  for (let v of words)
    chk = bech32Polymod(chk) ^ v;
  for (let i2 = 0; i2 < 6; i2++)
    chk = bech32Polymod(chk);
  chk ^= encodingConst;
  return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
}
// @__NO_SIDE_EFFECTS__
function genBech32(encoding) {
  const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
  const _words = /* @__PURE__ */ radix2(5);
  const fromWords = _words.decode;
  const toWords = _words.encode;
  const fromWordsUnsafe = unsafeWrapper(fromWords);
  function encode2(prefix, words, limit = 90) {
    astr("bech32.encode prefix", prefix);
    if (isBytes$2(words))
      words = Array.from(words);
    anumArr("bech32.encode", words);
    const plen = prefix.length;
    if (plen === 0)
      throw new TypeError(`Invalid prefix length ${plen}`);
    const actualLength = plen + 7 + words.length;
    if (limit !== false && actualLength > limit)
      throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    const lowered = prefix.toLowerCase();
    const sum = bechChecksum(lowered, words, ENCODING_CONST);
    return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
  }
  function decode2(str, limit = 90) {
    astr("bech32.decode input", str);
    const slen = str.length;
    if (slen < 8 || limit !== false && slen > limit)
      throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
    const lowered = str.toLowerCase();
    if (str !== lowered && str !== str.toUpperCase())
      throw new Error(`String must be lowercase or uppercase`);
    const sepIndex = lowered.lastIndexOf("1");
    if (sepIndex === 0 || sepIndex === -1)
      throw new Error(`Letter "1" must be present between prefix and data only`);
    const prefix = lowered.slice(0, sepIndex);
    const data = lowered.slice(sepIndex + 1);
    if (data.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const words = BECH_ALPHABET.decode(data).slice(0, -6);
    const sum = bechChecksum(prefix, words, ENCODING_CONST);
    if (!data.endsWith(sum))
      throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
    return { prefix, words };
  }
  const decodeUnsafe = unsafeWrapper(decode2);
  function decodeToBytes(str) {
    const { prefix, words } = decode2(str, false);
    return { prefix, words, bytes: fromWords(words) };
  }
  function encodeFromBytes(prefix, bytes) {
    return encode2(prefix, toWords(bytes));
  }
  return {
    encode: encode2,
    decode: decode2,
    encodeFromBytes,
    decodeToBytes,
    decodeUnsafe,
    fromWords,
    fromWordsUnsafe,
    toWords
  };
}
const bech32 = /* @__PURE__ */ genBech32("bech32");
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
function isBytes$1(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abool(b) {
  if (typeof b !== "boolean")
    throw new Error(`boolean expected, not ${b}`);
}
function anumber$1(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes$1(value, length, title = "") {
  const bytes = isBytes$1(value);
  const len = value?.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function u32$2(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i2 = 0; i2 < arrays.length; i2++) {
    arrays[i2].fill(0);
  }
}
const isLE$2 = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function overlapBytes(a, b) {
  return a.buffer === b.buffer && // best we can do, may fail with an obscure Proxy
  a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
  b.byteOffset < a.byteOffset + a.byteLength;
}
function complexOverlapBytes(input, output) {
  if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
    throw new Error("complex overlap of input and output is not supported");
}
function checkOpts(defaults, opts) {
  if (opts == null || typeof opts !== "object")
    throw new Error("options must be defined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i2 = 0; i2 < a.length; i2++)
    diff |= a[i2] ^ b[i2];
  return diff === 0;
}
const wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes$1(key, void 0, "key");
    if (!isLE$2)
      throw new Error("Non little-endian hardware is not yet supported");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      abytes$1(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
    }
    const tagl = params.tagLength;
    if (tagl && args[1] !== void 0)
      abytes$1(args[1], void 0, "AAD");
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes$1(output, void 0, "output");
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes$1(data);
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes$1(data);
        if (tagl && data.length < tagl)
          throw new Error('"ciphertext" expected length bigger than tagLength=' + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  if (out.length !== expectedLength)
    throw new Error('"output" expected Uint8Array of length ' + expectedLength + ", got: " + out.length);
  if (onlyAligned && !isAligned32$1(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function isAligned32$1(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
const BLOCK_SIZE = 16;
const POLY = 283;
function validateKeyLength(key) {
  if (![16, 24, 32].includes(key.length))
    throw new Error('"aes key" expected Uint8Array of length 16/24/32, got length=' + key.length);
}
function mul2(n) {
  return n << 1 ^ POLY & -(n >> 7);
}
function mul(a, b) {
  let res = 0;
  for (; b > 0; b >>= 1) {
    res ^= a & -(b & 1);
    a = mul2(a);
  }
  return res;
}
const sbox = /* @__PURE__ */ (() => {
  const t = new Uint8Array(256);
  for (let i2 = 0, x = 1; i2 < 256; i2++, x ^= mul2(x))
    t[i2] = x;
  const box = new Uint8Array(256);
  box[0] = 99;
  for (let i2 = 0; i2 < 255; i2++) {
    let x = t[255 - i2];
    x |= x << 8;
    box[t[i2]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
  }
  clean(t);
  return box;
})();
const invSbox = /* @__PURE__ */ sbox.map((_, j) => sbox.indexOf(j));
const rotr32_8 = (n) => n << 24 | n >>> 8;
const rotl32_8 = (n) => n << 8 | n >>> 24;
function genTtable(sbox2, fn) {
  if (sbox2.length !== 256)
    throw new Error("Wrong sbox length");
  const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
  const T1 = T0.map(rotl32_8);
  const T2 = T1.map(rotl32_8);
  const T3 = T2.map(rotl32_8);
  const T01 = new Uint32Array(256 * 256);
  const T23 = new Uint32Array(256 * 256);
  const sbox22 = new Uint16Array(256 * 256);
  for (let i2 = 0; i2 < 256; i2++) {
    for (let j = 0; j < 256; j++) {
      const idx = i2 * 256 + j;
      T01[idx] = T0[i2] ^ T1[j];
      T23[idx] = T2[i2] ^ T3[j];
      sbox22[idx] = sbox2[i2] << 8 | sbox2[j];
    }
  }
  return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
}
const tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
const tableDecoding = /* @__PURE__ */ genTtable(invSbox, (s) => mul(s, 11) << 24 | mul(s, 13) << 16 | mul(s, 9) << 8 | mul(s, 14));
const xPowers = /* @__PURE__ */ (() => {
  const p = new Uint8Array(16);
  for (let i2 = 0, x = 1; i2 < 16; i2++, x = mul2(x))
    p[i2] = x;
  return p;
})();
function expandKeyLE(key) {
  abytes$1(key);
  const len = key.length;
  validateKeyLength(key);
  const { sbox2 } = tableEncoding;
  const toClean = [];
  if (!isAligned32$1(key))
    toClean.push(key = copyBytes(key));
  const k32 = u32$2(key);
  const Nk = k32.length;
  const subByte = (n) => applySbox(sbox2, n, n, n, n);
  const xk = new Uint32Array(len + 28);
  xk.set(k32);
  for (let i2 = Nk; i2 < xk.length; i2++) {
    let t = xk[i2 - 1];
    if (i2 % Nk === 0)
      t = subByte(rotr32_8(t)) ^ xPowers[i2 / Nk - 1];
    else if (Nk > 6 && i2 % Nk === 4)
      t = subByte(t);
    xk[i2] = xk[i2 - Nk] ^ t;
  }
  clean(...toClean);
  return xk;
}
function expandKeyDecLE(key) {
  const encKey = expandKeyLE(key);
  const xk = encKey.slice();
  const Nk = encKey.length;
  const { sbox2 } = tableEncoding;
  const { T0, T1, T2, T3 } = tableDecoding;
  for (let i2 = 0; i2 < Nk; i2 += 4) {
    for (let j = 0; j < 4; j++)
      xk[i2 + j] = encKey[Nk - i2 - 4 + j];
  }
  clean(encKey);
  for (let i2 = 4; i2 < Nk - 4; i2++) {
    const x = xk[i2];
    const w = applySbox(sbox2, x, x, x, x);
    xk[i2] = T0[w & 255] ^ T1[w >>> 8 & 255] ^ T2[w >>> 16 & 255] ^ T3[w >>> 24];
  }
  return xk;
}
function apply0123(T01, T23, s0, s1, s2, s3) {
  return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
}
function applySbox(sbox2, s0, s1, s2, s3) {
  return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
}
function encrypt$1(xk, s0, s1, s2, s3) {
  const { sbox2, T01, T23 } = tableEncoding;
  let k = 0;
  s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
  const rounds = xk.length / 4 - 2;
  for (let i2 = 0; i2 < rounds; i2++) {
    const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
    const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
    const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
    const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
    s0 = t02, s1 = t12, s2 = t22, s3 = t32;
  }
  const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
  const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
  const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
  const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
  return { s0: t0, s1: t1, s2: t2, s3: t3 };
}
function decrypt$1(xk, s0, s1, s2, s3) {
  const { sbox2, T01, T23 } = tableDecoding;
  let k = 0;
  s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
  const rounds = xk.length / 4 - 2;
  for (let i2 = 0; i2 < rounds; i2++) {
    const t02 = xk[k++] ^ apply0123(T01, T23, s0, s3, s2, s1);
    const t12 = xk[k++] ^ apply0123(T01, T23, s1, s0, s3, s2);
    const t22 = xk[k++] ^ apply0123(T01, T23, s2, s1, s0, s3);
    const t32 = xk[k++] ^ apply0123(T01, T23, s3, s2, s1, s0);
    s0 = t02, s1 = t12, s2 = t22, s3 = t32;
  }
  const t0 = xk[k++] ^ applySbox(sbox2, s0, s3, s2, s1);
  const t1 = xk[k++] ^ applySbox(sbox2, s1, s0, s3, s2);
  const t2 = xk[k++] ^ applySbox(sbox2, s2, s1, s0, s3);
  const t3 = xk[k++] ^ applySbox(sbox2, s3, s2, s1, s0);
  return { s0: t0, s1: t1, s2: t2, s3: t3 };
}
function validateBlockDecrypt(data) {
  abytes$1(data);
  if (data.length % BLOCK_SIZE !== 0) {
    throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size " + BLOCK_SIZE);
  }
}
function validateBlockEncrypt(plaintext, pcks5, dst) {
  abytes$1(plaintext);
  let outLen = plaintext.length;
  const remaining = outLen % BLOCK_SIZE;
  if (!pcks5 && remaining !== 0)
    throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
  if (!isAligned32$1(plaintext))
    plaintext = copyBytes(plaintext);
  const b = u32$2(plaintext);
  if (pcks5) {
    let left = BLOCK_SIZE - remaining;
    if (!left)
      left = BLOCK_SIZE;
    outLen = outLen + left;
  }
  dst = getOutput(outLen, dst);
  complexOverlapBytes(plaintext, dst);
  const o = u32$2(dst);
  return { b, o, out: dst };
}
function validatePCKS(data, pcks5) {
  if (!pcks5)
    return data;
  const len = data.length;
  if (!len)
    throw new Error("aes/pcks5: empty ciphertext not allowed");
  const lastByte = data[len - 1];
  if (lastByte <= 0 || lastByte > 16)
    throw new Error("aes/pcks5: wrong padding");
  const out = data.subarray(0, -lastByte);
  for (let i2 = 0; i2 < lastByte; i2++)
    if (data[len - i2 - 1] !== lastByte)
      throw new Error("aes/pcks5: wrong padding");
  return out;
}
function padPCKS(left) {
  const tmp = new Uint8Array(16);
  const tmp32 = u32$2(tmp);
  tmp.set(left);
  const paddingByte = BLOCK_SIZE - left.length;
  for (let i2 = BLOCK_SIZE - paddingByte; i2 < BLOCK_SIZE; i2++)
    tmp[i2] = paddingByte;
  return tmp32;
}
const cbc = /* @__PURE__ */ wrapCipher({ blockSize: 16, nonceLength: 16 }, function aescbc(key, iv, opts = {}) {
  const pcks5 = !opts.disablePadding;
  return {
    encrypt(plaintext, dst) {
      const xk = expandKeyLE(key);
      const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
      let _iv = iv;
      const toClean = [xk];
      if (!isAligned32$1(_iv))
        toClean.push(_iv = copyBytes(_iv));
      const n32 = u32$2(_iv);
      let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
      let i2 = 0;
      for (; i2 + 4 <= b.length; ) {
        s0 ^= b[i2 + 0], s1 ^= b[i2 + 1], s2 ^= b[i2 + 2], s3 ^= b[i2 + 3];
        ({ s0, s1, s2, s3 } = encrypt$1(xk, s0, s1, s2, s3));
        o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
      }
      if (pcks5) {
        const tmp32 = padPCKS(plaintext.subarray(i2 * 4));
        s0 ^= tmp32[0], s1 ^= tmp32[1], s2 ^= tmp32[2], s3 ^= tmp32[3];
        ({ s0, s1, s2, s3 } = encrypt$1(xk, s0, s1, s2, s3));
        o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
      }
      clean(...toClean);
      return _out;
    },
    decrypt(ciphertext, dst) {
      validateBlockDecrypt(ciphertext);
      const xk = expandKeyDecLE(key);
      let _iv = iv;
      const toClean = [xk];
      if (!isAligned32$1(_iv))
        toClean.push(_iv = copyBytes(_iv));
      const n32 = u32$2(_iv);
      dst = getOutput(ciphertext.length, dst);
      if (!isAligned32$1(ciphertext))
        toClean.push(ciphertext = copyBytes(ciphertext));
      complexOverlapBytes(ciphertext, dst);
      const b = u32$2(ciphertext);
      const o = u32$2(dst);
      let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
      for (let i2 = 0; i2 + 4 <= b.length; ) {
        const ps0 = s0, ps1 = s1, ps2 = s2, ps3 = s3;
        s0 = b[i2 + 0], s1 = b[i2 + 1], s2 = b[i2 + 2], s3 = b[i2 + 3];
        const { s0: o0, s1: o1, s2: o2, s3: o3 } = decrypt$1(xk, s0, s1, s2, s3);
        o[i2++] = o0 ^ ps0, o[i2++] = o1 ^ ps1, o[i2++] = o2 ^ ps2, o[i2++] = o3 ^ ps3;
      }
      clean(...toClean);
      return validatePCKS(dst, pcks5);
    }
  };
});
const encodeStr = (str) => Uint8Array.from(str.split(""), (c) => c.charCodeAt(0));
const sigma16 = encodeStr("expand 16-byte k");
const sigma32 = encodeStr("expand 32-byte k");
const sigma16_32 = u32$2(sigma16);
const sigma32_32 = u32$2(sigma32);
function rotl(a, b) {
  return a << b | a >>> 32 - b;
}
function isAligned32(b) {
  return b.byteOffset % 4 === 0;
}
const BLOCK_LEN = 64;
const BLOCK_LEN32 = 16;
const MAX_COUNTER = 2 ** 32 - 1;
const U32_EMPTY = Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
  const len = data.length;
  const block = new Uint8Array(BLOCK_LEN);
  const b32 = u32$2(block);
  const isAligned = isAligned32(data) && isAligned32(output);
  const d32 = isAligned ? u32$2(data) : U32_EMPTY;
  const o32 = isAligned ? u32$2(output) : U32_EMPTY;
  for (let pos = 0; pos < len; counter++) {
    core(sigma, key, nonce, b32, counter, rounds);
    if (counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const take = Math.min(BLOCK_LEN, len - pos);
    if (isAligned && take === BLOCK_LEN) {
      const pos32 = pos / 4;
      if (pos % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let j = 0, posj; j < BLOCK_LEN32; j++) {
        posj = pos32 + j;
        o32[posj] = d32[posj] ^ b32[j];
      }
      pos += BLOCK_LEN;
      continue;
    }
    for (let j = 0, posj; j < take; j++) {
      posj = pos + j;
      output[posj] = data[posj] ^ block[j];
    }
    pos += take;
  }
}
function createCipher(core, opts) {
  const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
  if (typeof core !== "function")
    throw new Error("core must be a function");
  anumber$1(counterLength);
  anumber$1(rounds);
  abool(counterRight);
  abool(allowShortKeys);
  return (key, nonce, data, output, counter = 0) => {
    abytes$1(key, void 0, "key");
    abytes$1(nonce, void 0, "nonce");
    abytes$1(data, void 0, "data");
    const len = data.length;
    if (output === void 0)
      output = new Uint8Array(len);
    abytes$1(output, void 0, "output");
    anumber$1(counter);
    if (counter < 0 || counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    if (output.length < len)
      throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
    const toClean = [];
    let l = key.length;
    let k;
    let sigma;
    if (l === 32) {
      toClean.push(k = copyBytes(key));
      sigma = sigma32_32;
    } else if (l === 16 && allowShortKeys) {
      k = new Uint8Array(32);
      k.set(key);
      k.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k);
    } else {
      abytes$1(key, 32, "arx key");
      throw new Error("invalid key size");
    }
    if (!isAligned32(nonce))
      toClean.push(nonce = copyBytes(nonce));
    const k32 = u32$2(k);
    if (extendNonceFn) {
      if (nonce.length !== 24)
        throw new Error(`arx: extended nonce must be 24 bytes`);
      extendNonceFn(sigma, k32, u32$2(nonce.subarray(0, 16)), k32);
      nonce = nonce.subarray(16);
    }
    const nonceNcLen = 16 - counterLength;
    if (nonceNcLen !== nonce.length)
      throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
    if (nonceNcLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      nonce = nc;
      toClean.push(nonce);
    }
    const n32 = u32$2(nonce);
    runCipher(core, sigma, k32, n32, data, output, counter, rounds);
    clean(...toClean);
    return output;
  };
}
function chachaCore(s, k, n, out, cnt, rounds = 20) {
  let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let r = 0; r < rounds; r += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
}
const chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  allowShortKeys: false
});
function extract(hash, ikm, salt) {
  ahash(hash);
  if (salt === void 0)
    salt = new Uint8Array(hash.outputLen);
  return hmac(hash, salt, ikm);
}
const HKDF_COUNTER = /* @__PURE__ */ Uint8Array.of(0);
const EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info, length = 32) {
  ahash(hash);
  anumber$3(length, "length");
  const olen = hash.outputLen;
  if (length > 255 * olen)
    throw new Error("Length must be <= 255*HashLen");
  const blocks = Math.ceil(length / olen);
  if (info === void 0)
    info = EMPTY_BUFFER;
  else
    abytes$3(info, void 0, "info");
  const okm = new Uint8Array(blocks * olen);
  const HMAC = hmac.create(hash, prk);
  const HMACTmp = HMAC._cloneInto();
  const T = new Uint8Array(HMAC.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
    okm.set(T, olen * counter);
    HMAC._cloneInto(HMACTmp);
  }
  HMAC.destroy();
  HMACTmp.destroy();
  clean$1(T, HKDF_COUNTER);
  return okm.slice(0, length);
}
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
};
var verifiedSymbol = Symbol("verified");
var isRecord = (obj) => obj instanceof Object;
function validateEvent(event) {
  if (!isRecord(event))
    return false;
  if (typeof event.kind !== "number")
    return false;
  if (typeof event.content !== "string")
    return false;
  if (typeof event.created_at !== "number")
    return false;
  if (typeof event.pubkey !== "string")
    return false;
  if (!event.pubkey.match(/^[a-f0-9]{64}$/))
    return false;
  if (!Array.isArray(event.tags))
    return false;
  for (let i2 = 0; i2 < event.tags.length; i2++) {
    let tag = event.tags[i2];
    if (!Array.isArray(tag))
      return false;
    for (let j = 0; j < tag.length; j++) {
      if (typeof tag[j] !== "string")
        return false;
    }
  }
  return true;
}
var utils_exports = {};
__export(utils_exports, {
  binarySearch: () => binarySearch,
  bytesToHex: () => bytesToHex$2,
  hexToBytes: () => hexToBytes$3,
  insertEventIntoAscendingList: () => insertEventIntoAscendingList,
  insertEventIntoDescendingList: () => insertEventIntoDescendingList,
  mergeReverseSortedLists: () => mergeReverseSortedLists,
  normalizeURL: () => normalizeURL,
  utf8Decoder: () => utf8Decoder,
  utf8Encoder: () => utf8Encoder
});
var utf8Decoder = new TextDecoder("utf-8");
var utf8Encoder = new TextEncoder();
function normalizeURL(url) {
  try {
    if (url.indexOf("://") === -1)
      url = "wss://" + url;
    let p = new URL(url);
    if (p.protocol === "http:")
      p.protocol = "ws:";
    else if (p.protocol === "https:")
      p.protocol = "wss:";
    p.pathname = p.pathname.replace(/\/+/g, "/");
    if (p.pathname.endsWith("/"))
      p.pathname = p.pathname.slice(0, -1);
    if (p.port === "80" && p.protocol === "ws:" || p.port === "443" && p.protocol === "wss:")
      p.port = "";
    p.searchParams.sort();
    p.hash = "";
    return p.toString();
  } catch (e) {
    throw new Error(`Invalid URL: ${url}`);
  }
}
function insertEventIntoDescendingList(sortedArray, event) {
  const [idx, found] = binarySearch(sortedArray, (b) => {
    if (event.id === b.id)
      return 0;
    if (event.created_at === b.created_at)
      return -1;
    return b.created_at - event.created_at;
  });
  if (!found) {
    sortedArray.splice(idx, 0, event);
  }
  return sortedArray;
}
function insertEventIntoAscendingList(sortedArray, event) {
  const [idx, found] = binarySearch(sortedArray, (b) => {
    if (event.id === b.id)
      return 0;
    if (event.created_at === b.created_at)
      return -1;
    return event.created_at - b.created_at;
  });
  if (!found) {
    sortedArray.splice(idx, 0, event);
  }
  return sortedArray;
}
function binarySearch(arr, compare) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const cmp = compare(arr[mid]);
    if (cmp === 0) {
      return [mid, true];
    }
    if (cmp < 0) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return [start, false];
}
function mergeReverseSortedLists(list1, list2) {
  const result = new Array(list1.length + list2.length);
  result.length = 0;
  let i1 = 0;
  let i2 = 0;
  let sameTimestampIds = [];
  while (i1 < list1.length && i2 < list2.length) {
    let next;
    if (list1[i1]?.created_at > list2[i2]?.created_at) {
      next = list1[i1];
      i1++;
    } else {
      next = list2[i2];
      i2++;
    }
    if (result.length > 0 && result[result.length - 1].created_at === next.created_at) {
      if (sameTimestampIds.includes(next.id))
        continue;
    } else {
      sameTimestampIds.length = 0;
    }
    result.push(next);
    sameTimestampIds.push(next.id);
  }
  while (i1 < list1.length) {
    const next = list1[i1];
    i1++;
    if (result.length > 0 && result[result.length - 1].created_at === next.created_at) {
      if (sameTimestampIds.includes(next.id))
        continue;
    } else {
      sameTimestampIds.length = 0;
    }
    result.push(next);
    sameTimestampIds.push(next.id);
  }
  while (i2 < list2.length) {
    const next = list2[i2];
    i2++;
    if (result.length > 0 && result[result.length - 1].created_at === next.created_at) {
      if (sameTimestampIds.includes(next.id))
        continue;
    } else {
      sameTimestampIds.length = 0;
    }
    result.push(next);
    sameTimestampIds.push(next.id);
  }
  return result;
}
var JS = class {
  generateSecretKey() {
    return schnorr.utils.randomSecretKey();
  }
  getPublicKey(secretKey) {
    return bytesToHex$2(schnorr.getPublicKey(secretKey));
  }
  finalizeEvent(t, secretKey) {
    const event = t;
    event.pubkey = bytesToHex$2(schnorr.getPublicKey(secretKey));
    event.id = getEventHash(event);
    event.sig = bytesToHex$2(schnorr.sign(hexToBytes$3(getEventHash(event)), secretKey));
    event[verifiedSymbol] = true;
    return event;
  }
  verifyEvent(event) {
    if (typeof event[verifiedSymbol] === "boolean")
      return event[verifiedSymbol];
    try {
      const hash = getEventHash(event);
      if (hash !== event.id) {
        event[verifiedSymbol] = false;
        return false;
      }
      const valid = schnorr.verify(hexToBytes$3(event.sig), hexToBytes$3(hash), hexToBytes$3(event.pubkey));
      event[verifiedSymbol] = valid;
      return valid;
    } catch (err) {
      event[verifiedSymbol] = false;
      return false;
    }
  }
};
function serializeEvent(evt) {
  if (!validateEvent(evt))
    throw new Error("can't serialize event with wrong or missing properties");
  return JSON.stringify([0, evt.pubkey, evt.created_at, evt.kind, evt.tags, evt.content]);
}
function getEventHash(event) {
  let eventHash = sha256(utf8Encoder.encode(serializeEvent(event)));
  return bytesToHex$2(eventHash);
}
var i = new JS();
var generateSecretKey = i.generateSecretKey;
var getPublicKey = i.getPublicKey;
var finalizeEvent = i.finalizeEvent;
var verifyEvent = i.verifyEvent;
var kinds_exports = {};
__export(kinds_exports, {
  Application: () => Application,
  BadgeAward: () => BadgeAward,
  BadgeDefinition: () => BadgeDefinition,
  BlockedRelaysList: () => BlockedRelaysList,
  BlossomServerList: () => BlossomServerList,
  BookmarkList: () => BookmarkList,
  Bookmarksets: () => Bookmarksets,
  Calendar: () => Calendar,
  CalendarEventRSVP: () => CalendarEventRSVP,
  ChannelCreation: () => ChannelCreation,
  ChannelHideMessage: () => ChannelHideMessage,
  ChannelMessage: () => ChannelMessage,
  ChannelMetadata: () => ChannelMetadata,
  ChannelMuteUser: () => ChannelMuteUser,
  ChatMessage: () => ChatMessage,
  ClassifiedListing: () => ClassifiedListing,
  ClientAuth: () => ClientAuth,
  Comment: () => Comment,
  CommunitiesList: () => CommunitiesList,
  CommunityDefinition: () => CommunityDefinition,
  CommunityPostApproval: () => CommunityPostApproval,
  Contacts: () => Contacts,
  CreateOrUpdateProduct: () => CreateOrUpdateProduct,
  CreateOrUpdateStall: () => CreateOrUpdateStall,
  Curationsets: () => Curationsets,
  Date: () => Date2,
  DirectMessageRelaysList: () => DirectMessageRelaysList,
  DraftClassifiedListing: () => DraftClassifiedListing,
  DraftLong: () => DraftLong,
  Emojisets: () => Emojisets,
  EncryptedDirectMessage: () => EncryptedDirectMessage,
  EventDeletion: () => EventDeletion,
  FavoriteRelays: () => FavoriteRelays,
  FileMessage: () => FileMessage,
  FileMetadata: () => FileMetadata,
  FileServerPreference: () => FileServerPreference,
  Followsets: () => Followsets,
  ForumThread: () => ForumThread,
  GenericRepost: () => GenericRepost,
  Genericlists: () => Genericlists,
  GiftWrap: () => GiftWrap,
  GroupMetadata: () => GroupMetadata,
  HTTPAuth: () => HTTPAuth,
  Handlerinformation: () => Handlerinformation,
  Handlerrecommendation: () => Handlerrecommendation,
  Highlights: () => Highlights,
  InterestsList: () => InterestsList,
  Interestsets: () => Interestsets,
  JobFeedback: () => JobFeedback,
  JobRequest: () => JobRequest,
  JobResult: () => JobResult,
  Label: () => Label,
  LightningPubRPC: () => LightningPubRPC,
  LiveChatMessage: () => LiveChatMessage,
  LiveEvent: () => LiveEvent,
  LongFormArticle: () => LongFormArticle,
  Metadata: () => Metadata,
  Mutelist: () => Mutelist,
  NWCWalletInfo: () => NWCWalletInfo,
  NWCWalletRequest: () => NWCWalletRequest,
  NWCWalletResponse: () => NWCWalletResponse,
  NormalVideo: () => NormalVideo,
  NostrConnect: () => NostrConnect,
  OpenTimestamps: () => OpenTimestamps,
  Photo: () => Photo,
  Pinlist: () => Pinlist,
  Poll: () => Poll,
  PollResponse: () => PollResponse,
  PrivateDirectMessage: () => PrivateDirectMessage,
  ProblemTracker: () => ProblemTracker,
  ProfileBadges: () => ProfileBadges,
  PublicChatsList: () => PublicChatsList,
  Reaction: () => Reaction,
  RecommendRelay: () => RecommendRelay,
  RelayList: () => RelayList,
  RelayReview: () => RelayReview,
  Relaysets: () => Relaysets,
  Report: () => Report,
  Reporting: () => Reporting,
  Repost: () => Repost,
  Seal: () => Seal,
  SearchRelaysList: () => SearchRelaysList,
  ShortTextNote: () => ShortTextNote,
  ShortVideo: () => ShortVideo,
  Time: () => Time,
  UserEmojiList: () => UserEmojiList,
  UserStatuses: () => UserStatuses,
  Voice: () => Voice,
  VoiceComment: () => VoiceComment,
  Zap: () => Zap,
  ZapGoal: () => ZapGoal,
  ZapRequest: () => ZapRequest,
  classifyKind: () => classifyKind,
  isAddressableKind: () => isAddressableKind,
  isEphemeralKind: () => isEphemeralKind,
  isKind: () => isKind,
  isRegularKind: () => isRegularKind,
  isReplaceableKind: () => isReplaceableKind
});
function isRegularKind(kind) {
  return kind < 1e4 && kind !== 0 && kind !== 3;
}
function isReplaceableKind(kind) {
  return kind === 0 || kind === 3 || 1e4 <= kind && kind < 2e4;
}
function isEphemeralKind(kind) {
  return 2e4 <= kind && kind < 3e4;
}
function isAddressableKind(kind) {
  return 3e4 <= kind && kind < 4e4;
}
function classifyKind(kind) {
  if (isRegularKind(kind))
    return "regular";
  if (isReplaceableKind(kind))
    return "replaceable";
  if (isEphemeralKind(kind))
    return "ephemeral";
  if (isAddressableKind(kind))
    return "parameterized";
  return "unknown";
}
function isKind(event, kind) {
  const kindAsArray = kind instanceof Array ? kind : [kind];
  return validateEvent(event) && kindAsArray.includes(event.kind) || false;
}
var Metadata = 0;
var ShortTextNote = 1;
var RecommendRelay = 2;
var Contacts = 3;
var EncryptedDirectMessage = 4;
var EventDeletion = 5;
var Repost = 6;
var Reaction = 7;
var BadgeAward = 8;
var ChatMessage = 9;
var ForumThread = 11;
var Seal = 13;
var PrivateDirectMessage = 14;
var FileMessage = 15;
var GenericRepost = 16;
var Photo = 20;
var NormalVideo = 21;
var ShortVideo = 22;
var ChannelCreation = 40;
var ChannelMetadata = 41;
var ChannelMessage = 42;
var ChannelHideMessage = 43;
var ChannelMuteUser = 44;
var OpenTimestamps = 1040;
var GiftWrap = 1059;
var Poll = 1068;
var FileMetadata = 1063;
var Comment = 1111;
var LiveChatMessage = 1311;
var Voice = 1222;
var VoiceComment = 1244;
var ProblemTracker = 1971;
var Report = 1984;
var Reporting = 1984;
var Label = 1985;
var CommunityPostApproval = 4550;
var JobRequest = 5999;
var JobResult = 6999;
var JobFeedback = 7e3;
var ZapGoal = 9041;
var ZapRequest = 9734;
var Zap = 9735;
var Highlights = 9802;
var PollResponse = 1018;
var Mutelist = 1e4;
var Pinlist = 10001;
var RelayList = 10002;
var BookmarkList = 10003;
var CommunitiesList = 10004;
var PublicChatsList = 10005;
var BlockedRelaysList = 10006;
var SearchRelaysList = 10007;
var FavoriteRelays = 10012;
var InterestsList = 10015;
var UserEmojiList = 10030;
var DirectMessageRelaysList = 10050;
var FileServerPreference = 10096;
var BlossomServerList = 10063;
var NWCWalletInfo = 13194;
var LightningPubRPC = 21e3;
var ClientAuth = 22242;
var NWCWalletRequest = 23194;
var NWCWalletResponse = 23195;
var NostrConnect = 24133;
var HTTPAuth = 27235;
var Followsets = 3e4;
var Genericlists = 30001;
var Relaysets = 30002;
var Bookmarksets = 30003;
var Curationsets = 30004;
var ProfileBadges = 30008;
var BadgeDefinition = 30009;
var Interestsets = 30015;
var CreateOrUpdateStall = 30017;
var CreateOrUpdateProduct = 30018;
var LongFormArticle = 30023;
var DraftLong = 30024;
var Emojisets = 30030;
var Application = 30078;
var LiveEvent = 30311;
var UserStatuses = 30315;
var ClassifiedListing = 30402;
var DraftClassifiedListing = 30403;
var Date2 = 31922;
var Time = 31923;
var Calendar = 31924;
var CalendarEventRSVP = 31925;
var RelayReview = 31987;
var Handlerrecommendation = 31989;
var Handlerinformation = 31990;
var CommunityDefinition = 34550;
var GroupMetadata = 39e3;
function matchFilter(filter, event) {
  if (filter.ids && filter.ids.indexOf(event.id) === -1) {
    return false;
  }
  if (filter.kinds && filter.kinds.indexOf(event.kind) === -1) {
    return false;
  }
  if (filter.authors && filter.authors.indexOf(event.pubkey) === -1) {
    return false;
  }
  for (let f in filter) {
    if (f[0] === "#") {
      let tagName = f.slice(1);
      let values = filter[`#${tagName}`];
      if (values && !event.tags.find(([t, v]) => t === f.slice(1) && values.indexOf(v) !== -1))
        return false;
    }
  }
  if (filter.since && event.created_at < filter.since)
    return false;
  if (filter.until && event.created_at > filter.until)
    return false;
  return true;
}
function matchFilters(filters, event) {
  for (let i2 = 0; i2 < filters.length; i2++) {
    if (matchFilter(filters[i2], event)) {
      return true;
    }
  }
  return false;
}
var fakejson_exports = {};
__export(fakejson_exports, {
  getHex64: () => getHex64,
  getInt: () => getInt,
  getSubscriptionId: () => getSubscriptionId,
  matchEventId: () => matchEventId,
  matchEventKind: () => matchEventKind,
  matchEventPubkey: () => matchEventPubkey
});
function getHex64(json2, field) {
  let len = field.length + 3;
  let idx = json2.indexOf(`"${field}":`) + len;
  let s = json2.slice(idx).indexOf(`"`) + idx + 1;
  return json2.slice(s, s + 64);
}
function getInt(json2, field) {
  let len = field.length;
  let idx = json2.indexOf(`"${field}":`) + len + 3;
  let sliced = json2.slice(idx);
  let end = Math.min(sliced.indexOf(","), sliced.indexOf("}"));
  return parseInt(sliced.slice(0, end), 10);
}
function getSubscriptionId(json2) {
  let idx = json2.slice(0, 22).indexOf(`"EVENT"`);
  if (idx === -1)
    return null;
  let pstart = json2.slice(idx + 7 + 1).indexOf(`"`);
  if (pstart === -1)
    return null;
  let start = idx + 7 + 1 + pstart;
  let pend = json2.slice(start + 1, 80).indexOf(`"`);
  if (pend === -1)
    return null;
  let end = start + 1 + pend;
  return json2.slice(start + 1, end);
}
function matchEventId(json2, id) {
  return id === getHex64(json2, "id");
}
function matchEventPubkey(json2, pubkey) {
  return pubkey === getHex64(json2, "pubkey");
}
function matchEventKind(json2, kind) {
  return kind === getInt(json2, "kind");
}
var nip42_exports = {};
__export(nip42_exports, {
  makeAuthEvent: () => makeAuthEvent
});
function makeAuthEvent(relayURL, challenge2) {
  return {
    kind: ClientAuth,
    created_at: Math.floor(Date.now() / 1e3),
    tags: [
      ["relay", relayURL],
      ["challenge", challenge2]
    ],
    content: ""
  };
}
var SendingOnClosedConnection = class extends Error {
  constructor(message, relay) {
    super(`Tried to send message '${message} on a closed connection to ${relay}.`);
    this.name = "SendingOnClosedConnection";
  }
};
var AbstractRelay = class {
  constructor(url, opts) {
    __publicField(this, "url");
    __publicField(this, "_connected", false);
    __publicField(this, "onclose", null);
    __publicField(this, "onnotice", (msg) => console.debug(`NOTICE from ${this.url}: ${msg}`));
    __publicField(this, "onauth");
    __publicField(this, "baseEoseTimeout", 4400);
    __publicField(this, "publishTimeout", 4400);
    __publicField(this, "pingFrequency", 29e3);
    __publicField(this, "pingTimeout", 2e4);
    __publicField(this, "resubscribeBackoff", [1e4, 1e4, 1e4, 2e4, 2e4, 3e4, 6e4]);
    __publicField(this, "openSubs", /* @__PURE__ */ new Map());
    __publicField(this, "enablePing");
    __publicField(this, "enableReconnect");
    __publicField(this, "idleSince", Date.now());
    __publicField(this, "ongoingOperations", 0);
    __publicField(this, "reconnectTimeoutHandle");
    __publicField(this, "pingIntervalHandle");
    __publicField(this, "reconnectAttempts", 0);
    __publicField(this, "skipReconnection", false);
    __publicField(this, "connectionPromise");
    __publicField(this, "openCountRequests", /* @__PURE__ */ new Map());
    __publicField(this, "openEventPublishes", /* @__PURE__ */ new Map());
    __publicField(this, "ws");
    __publicField(this, "challenge");
    __publicField(this, "authPromise");
    __publicField(this, "serial", 0);
    __publicField(this, "verifyEvent");
    __publicField(this, "_WebSocket");
    this.url = normalizeURL(url);
    this.verifyEvent = opts.verifyEvent;
    this._WebSocket = opts.websocketImplementation || WebSocket;
    this.enablePing = opts.enablePing;
    this.enableReconnect = opts.enableReconnect || false;
  }
  static async connect(url, opts) {
    const relay = new AbstractRelay(url, opts);
    await relay.connect(opts);
    return relay;
  }
  closeAllSubscriptions(reason) {
    for (let [_, sub] of this.openSubs) {
      sub.close(reason);
    }
    this.openSubs.clear();
    for (let [_, ep] of this.openEventPublishes) {
      ep.reject(new Error(reason));
    }
    this.openEventPublishes.clear();
    for (let [_, cr] of this.openCountRequests) {
      cr.reject(new Error(reason));
    }
    this.openCountRequests.clear();
  }
  get connected() {
    return this._connected;
  }
  async reconnect() {
    const backoff = this.resubscribeBackoff[Math.min(this.reconnectAttempts, this.resubscribeBackoff.length - 1)];
    this.reconnectAttempts++;
    this.reconnectTimeoutHandle = setTimeout(async () => {
      try {
        await this.connect();
      } catch (err) {
      }
    }, backoff);
  }
  handleHardClose(reason) {
    if (this.pingIntervalHandle) {
      clearInterval(this.pingIntervalHandle);
      this.pingIntervalHandle = void 0;
    }
    this._connected = false;
    this.connectionPromise = void 0;
    this.idleSince = void 0;
    if (this.enableReconnect && !this.skipReconnection) {
      this.reconnect();
    } else {
      this.onclose?.();
      this.closeAllSubscriptions(reason);
    }
  }
  async connect(opts) {
    let connectionTimeoutHandle;
    if (this.connectionPromise)
      return this.connectionPromise;
    this.challenge = void 0;
    this.authPromise = void 0;
    this.skipReconnection = false;
    this.connectionPromise = new Promise((resolve, reject) => {
      if (opts?.timeout) {
        connectionTimeoutHandle = setTimeout(() => {
          reject("connection timed out");
          this.connectionPromise = void 0;
          this.skipReconnection = true;
          this.onclose?.();
          this.handleHardClose("relay connection timed out");
        }, opts.timeout);
      }
      if (opts?.abort) {
        opts.abort.onabort = reject;
      }
      try {
        this.ws = new this._WebSocket(this.url);
      } catch (err) {
        clearTimeout(connectionTimeoutHandle);
        reject(err);
        return;
      }
      this.ws.onopen = () => {
        if (this.reconnectTimeoutHandle) {
          clearTimeout(this.reconnectTimeoutHandle);
          this.reconnectTimeoutHandle = void 0;
        }
        clearTimeout(connectionTimeoutHandle);
        this._connected = true;
        const isReconnection = this.reconnectAttempts > 0;
        this.reconnectAttempts = 0;
        for (const sub of this.openSubs.values()) {
          sub.eosed = false;
          if (isReconnection) {
            for (let f = 0; f < sub.filters.length; f++) {
              if (sub.lastEmitted) {
                sub.filters[f].since = sub.lastEmitted + 1;
              }
            }
          }
          sub.fire();
        }
        if (this.enablePing) {
          this.pingIntervalHandle = setInterval(() => this.pingpong(), this.pingFrequency);
        }
        resolve();
      };
      this.ws.onerror = () => {
        clearTimeout(connectionTimeoutHandle);
        reject("connection failed");
        this.connectionPromise = void 0;
        this.skipReconnection = true;
        this.onclose?.();
        this.handleHardClose("relay connection failed");
      };
      this.ws.onclose = (ev) => {
        clearTimeout(connectionTimeoutHandle);
        reject(ev.message || "websocket closed");
        this.handleHardClose("relay connection closed");
      };
      this.ws.onmessage = this._onmessage.bind(this);
    });
    return this.connectionPromise;
  }
  waitForPingPong() {
    return new Promise((resolve) => {
      this.ws.once("pong", () => resolve(true));
      this.ws.ping();
    });
  }
  waitForDummyReq() {
    return new Promise((resolve, reject) => {
      if (!this.connectionPromise)
        return reject(new Error(`no connection to ${this.url}, can't ping`));
      try {
        const sub = this.subscribe(
          [{ ids: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"], limit: 0 }],
          {
            label: "<forced-ping>",
            oneose: () => {
              resolve(true);
              sub.close();
            },
            onclose() {
              resolve(true);
            },
            eoseTimeout: this.pingTimeout + 1e3
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  async pingpong() {
    if (this.ws?.readyState === 1) {
      const result = await Promise.any([
        this.ws && this.ws.ping && this.ws.once ? this.waitForPingPong() : this.waitForDummyReq(),
        new Promise((res) => setTimeout(() => res(false), this.pingTimeout))
      ]);
      if (!result) {
        if (this.ws?.readyState === this._WebSocket.OPEN) {
          this.ws?.close();
        }
      }
    }
  }
  async send(message) {
    if (!this.connectionPromise)
      throw new SendingOnClosedConnection(message, this.url);
    this.connectionPromise.then(() => {
      this.ws?.send(message);
    });
  }
  async auth(signAuthEvent) {
    const challenge2 = this.challenge;
    if (!challenge2)
      throw new Error("can't perform auth, no challenge was received");
    if (this.authPromise)
      return this.authPromise;
    this.authPromise = new Promise(async (resolve, reject) => {
      try {
        let evt = await signAuthEvent(makeAuthEvent(this.url, challenge2));
        let timeout = setTimeout(() => {
          let ep = this.openEventPublishes.get(evt.id);
          if (ep) {
            ep.reject(new Error("auth timed out"));
            this.openEventPublishes.delete(evt.id);
          }
        }, this.publishTimeout);
        this.openEventPublishes.set(evt.id, { resolve, reject, timeout });
        this.send('["AUTH",' + JSON.stringify(evt) + "]");
      } catch (err) {
        console.warn("subscribe auth function failed:", err);
      }
    });
    return this.authPromise;
  }
  async publish(event) {
    this.idleSince = void 0;
    this.ongoingOperations++;
    const ret = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const ep = this.openEventPublishes.get(event.id);
        if (ep) {
          ep.reject(new Error("publish timed out"));
          this.openEventPublishes.delete(event.id);
        }
      }, this.publishTimeout);
      this.openEventPublishes.set(event.id, { resolve, reject, timeout });
    });
    this.send('["EVENT",' + JSON.stringify(event) + "]");
    this.ongoingOperations--;
    if (this.ongoingOperations === 0)
      this.idleSince = Date.now();
    return ret;
  }
  async count(filters, params) {
    this.serial++;
    const id = params?.id || "count:" + this.serial;
    const ret = new Promise((resolve, reject) => {
      this.openCountRequests.set(id, { resolve, reject });
    });
    this.send('["COUNT","' + id + '",' + JSON.stringify(filters).substring(1));
    return ret;
  }
  subscribe(filters, params) {
    if (params.label !== "<forced-ping>") {
      this.idleSince = void 0;
      this.ongoingOperations++;
    }
    const sub = this.prepareSubscription(filters, params);
    sub.fire();
    if (params.abort) {
      params.abort.onabort = () => sub.close(String(params.abort.reason || "<aborted>"));
    }
    return sub;
  }
  prepareSubscription(filters, params) {
    this.serial++;
    const id = params.id || (params.label ? params.label + ":" : "sub:") + this.serial;
    const sub = new Subscription(this, id, filters, params);
    this.openSubs.set(id, sub);
    return sub;
  }
  close() {
    this.skipReconnection = true;
    if (this.reconnectTimeoutHandle) {
      clearTimeout(this.reconnectTimeoutHandle);
      this.reconnectTimeoutHandle = void 0;
    }
    if (this.pingIntervalHandle) {
      clearInterval(this.pingIntervalHandle);
      this.pingIntervalHandle = void 0;
    }
    this.closeAllSubscriptions("relay connection closed by us");
    this._connected = false;
    this.idleSince = void 0;
    this.onclose?.();
    if (this.ws?.readyState === this._WebSocket.OPEN) {
      this.ws?.close();
    }
  }
  _onmessage(ev) {
    const json2 = ev.data;
    if (!json2) {
      return;
    }
    const subid = getSubscriptionId(json2);
    if (subid) {
      const so = this.openSubs.get(subid);
      if (!so) {
        return;
      }
      const id = getHex64(json2, "id");
      const alreadyHave = so.alreadyHaveEvent?.(id);
      so.receivedEvent?.(this, id);
      if (alreadyHave) {
        return;
      }
    }
    try {
      let data = JSON.parse(json2);
      switch (data[0]) {
        case "EVENT": {
          const so = this.openSubs.get(data[1]);
          const event = data[2];
          if (this.verifyEvent(event) && matchFilters(so.filters, event)) {
            so.onevent(event);
          } else {
            so.oninvalidevent?.(event);
          }
          if (!so.lastEmitted || so.lastEmitted < event.created_at)
            so.lastEmitted = event.created_at;
          return;
        }
        case "COUNT": {
          const id = data[1];
          const payload = data[2];
          const cr = this.openCountRequests.get(id);
          if (cr) {
            cr.resolve(payload.count);
            this.openCountRequests.delete(id);
          }
          return;
        }
        case "EOSE": {
          const so = this.openSubs.get(data[1]);
          if (!so)
            return;
          so.receivedEose();
          return;
        }
        case "OK": {
          const id = data[1];
          const ok = data[2];
          const reason = data[3];
          const ep = this.openEventPublishes.get(id);
          if (ep) {
            clearTimeout(ep.timeout);
            if (ok)
              ep.resolve(reason);
            else
              ep.reject(new Error(reason));
            this.openEventPublishes.delete(id);
          }
          return;
        }
        case "CLOSED": {
          const id = data[1];
          const so = this.openSubs.get(id);
          if (!so)
            return;
          so.closed = true;
          so.close(data[2]);
          return;
        }
        case "NOTICE": {
          this.onnotice(data[1]);
          return;
        }
        case "AUTH": {
          this.challenge = data[1];
          if (this.onauth) {
            this.auth(this.onauth);
          }
          return;
        }
        default: {
          const so = this.openSubs.get(data[1]);
          so?.oncustom?.(data);
          return;
        }
      }
    } catch (err) {
      try {
        const [_, __, event] = JSON.parse(json2);
        console.warn(`[nostr] relay ${this.url} error processing message:`, err, event);
      } catch (_) {
        console.warn(`[nostr] relay ${this.url} error processing message:`, err);
      }
      return;
    }
  }
};
var Subscription = class {
  constructor(relay, id, filters, params) {
    __publicField(this, "relay");
    __publicField(this, "id");
    __publicField(this, "lastEmitted");
    __publicField(this, "closed", false);
    __publicField(this, "eosed", false);
    __publicField(this, "filters");
    __publicField(this, "alreadyHaveEvent");
    __publicField(this, "receivedEvent");
    __publicField(this, "onevent");
    __publicField(this, "oninvalidevent");
    __publicField(this, "oneose");
    __publicField(this, "onclose");
    __publicField(this, "oncustom");
    __publicField(this, "eoseTimeout");
    __publicField(this, "eoseTimeoutHandle");
    if (filters.length === 0)
      throw new Error("subscription can't be created with zero filters");
    this.relay = relay;
    this.filters = filters;
    this.id = id;
    this.alreadyHaveEvent = params.alreadyHaveEvent;
    this.receivedEvent = params.receivedEvent;
    this.eoseTimeout = params.eoseTimeout || relay.baseEoseTimeout;
    this.oneose = params.oneose;
    this.onclose = params.onclose;
    this.oninvalidevent = params.oninvalidevent;
    this.onevent = params.onevent || ((event) => {
      console.warn(
        `onevent() callback not defined for subscription '${this.id}' in relay ${this.relay.url}. event received:`,
        event
      );
    });
  }
  fire() {
    this.relay.send('["REQ","' + this.id + '",' + JSON.stringify(this.filters).substring(1));
    this.eoseTimeoutHandle = setTimeout(this.receivedEose.bind(this), this.eoseTimeout);
  }
  receivedEose() {
    if (this.eosed)
      return;
    clearTimeout(this.eoseTimeoutHandle);
    this.eosed = true;
    this.oneose?.();
  }
  close(reason = "closed by caller") {
    if (!this.closed && this.relay.connected) {
      try {
        this.relay.send('["CLOSE",' + JSON.stringify(this.id) + "]");
      } catch (err) {
        if (err instanceof SendingOnClosedConnection) ;
        else {
          throw err;
        }
      }
      this.closed = true;
    }
    this.relay.openSubs.delete(this.id);
    this.relay.ongoingOperations--;
    if (this.relay.ongoingOperations === 0)
      this.relay.idleSince = Date.now();
    this.onclose?.(reason);
  }
};
var _WebSocket;
try {
  _WebSocket = WebSocket;
} catch {
}
var alwaysTrue = (t) => {
  t[verifiedSymbol] = true;
  return true;
};
var AbstractSimplePool = class {
  constructor(opts) {
    __publicField(this, "relays", /* @__PURE__ */ new Map());
    __publicField(this, "seenOn", /* @__PURE__ */ new Map());
    __publicField(this, "trackRelays", false);
    __publicField(this, "verifyEvent");
    __publicField(this, "enablePing");
    __publicField(this, "enableReconnect");
    __publicField(this, "automaticallyAuth");
    __publicField(this, "trustedRelayURLs", /* @__PURE__ */ new Set());
    __publicField(this, "onRelayConnectionFailure");
    __publicField(this, "onRelayConnectionSuccess");
    __publicField(this, "allowConnectingToRelay");
    __publicField(this, "maxWaitForConnection");
    __publicField(this, "_WebSocket");
    this.verifyEvent = opts.verifyEvent;
    this._WebSocket = opts.websocketImplementation;
    this.enablePing = opts.enablePing;
    this.enableReconnect = opts.enableReconnect || false;
    this.automaticallyAuth = opts.automaticallyAuth;
    this.onRelayConnectionFailure = opts.onRelayConnectionFailure;
    this.onRelayConnectionSuccess = opts.onRelayConnectionSuccess;
    this.allowConnectingToRelay = opts.allowConnectingToRelay;
    this.maxWaitForConnection = opts.maxWaitForConnection || 3e3;
  }
  async ensureRelay(url, params) {
    url = normalizeURL(url);
    let relay = this.relays.get(url);
    if (!relay) {
      relay = new AbstractRelay(url, {
        verifyEvent: this.trustedRelayURLs.has(url) ? alwaysTrue : this.verifyEvent,
        websocketImplementation: this._WebSocket,
        enablePing: this.enablePing,
        enableReconnect: this.enableReconnect
      });
      relay.onclose = () => {
        this.relays.delete(url);
      };
      this.relays.set(url, relay);
    }
    if (this.automaticallyAuth) {
      const authSignerFn = this.automaticallyAuth(url);
      if (authSignerFn) {
        relay.onauth = authSignerFn;
      }
    }
    try {
      await relay.connect({
        timeout: params?.connectionTimeout,
        abort: params?.abort
      });
    } catch (err) {
      this.relays.delete(url);
      throw err;
    }
    return relay;
  }
  close(relays) {
    relays.map(normalizeURL).forEach((url) => {
      this.relays.get(url)?.close();
      this.relays.delete(url);
    });
  }
  subscribe(relays, filter, params) {
    const request = [];
    const uniqUrls = [];
    for (let i2 = 0; i2 < relays.length; i2++) {
      const url = normalizeURL(relays[i2]);
      if (!request.find((r) => r.url === url)) {
        if (uniqUrls.indexOf(url) === -1) {
          uniqUrls.push(url);
          request.push({ url, filter });
        }
      }
    }
    return this.subscribeMap(request, params);
  }
  subscribeMany(relays, filter, params) {
    return this.subscribe(relays, filter, params);
  }
  subscribeMap(requests, params) {
    const grouped = /* @__PURE__ */ new Map();
    for (const req of requests) {
      const { url, filter } = req;
      if (!grouped.has(url))
        grouped.set(url, []);
      grouped.get(url).push(filter);
    }
    const groupedRequests = Array.from(grouped.entries()).map(([url, filters]) => ({ url, filters }));
    if (this.trackRelays) {
      params.receivedEvent = (relay, id) => {
        let set2 = this.seenOn.get(id);
        if (!set2) {
          set2 = /* @__PURE__ */ new Set();
          this.seenOn.set(id, set2);
        }
        set2.add(relay);
      };
    }
    const _knownIds = /* @__PURE__ */ new Set();
    const subs = [];
    const eosesReceived = [];
    let handleEose = (i2) => {
      if (eosesReceived[i2])
        return;
      eosesReceived[i2] = true;
      if (eosesReceived.filter((a) => a).length === groupedRequests.length) {
        params.oneose?.();
        handleEose = () => {
        };
      }
    };
    const closesReceived = [];
    let handleClose = (i2, reason) => {
      if (closesReceived[i2])
        return;
      handleEose(i2);
      closesReceived[i2] = reason;
      if (closesReceived.filter((a) => a).length === groupedRequests.length) {
        params.onclose?.(closesReceived);
        handleClose = () => {
        };
      }
    };
    const localAlreadyHaveEventHandler = (id) => {
      if (params.alreadyHaveEvent?.(id)) {
        return true;
      }
      const have = _knownIds.has(id);
      _knownIds.add(id);
      return have;
    };
    const allOpened = Promise.all(
      groupedRequests.map(async ({ url, filters }, i2) => {
        if (this.allowConnectingToRelay?.(url, ["read", filters]) === false) {
          handleClose(i2, "connection skipped by allowConnectingToRelay");
          return;
        }
        let relay;
        try {
          relay = await this.ensureRelay(url, {
            connectionTimeout: this.maxWaitForConnection < (params.maxWait || 0) ? Math.max(params.maxWait * 0.8, params.maxWait - 1e3) : this.maxWaitForConnection,
            abort: params.abort
          });
        } catch (err) {
          this.onRelayConnectionFailure?.(url);
          handleClose(i2, err?.message || String(err));
          return;
        }
        this.onRelayConnectionSuccess?.(url);
        let subscription = relay.subscribe(filters, {
          ...params,
          oneose: () => handleEose(i2),
          onclose: (reason) => {
            if (reason.startsWith("auth-required: ") && params.onauth) {
              relay.auth(params.onauth).then(() => {
                relay.subscribe(filters, {
                  ...params,
                  oneose: () => handleEose(i2),
                  onclose: (reason2) => {
                    handleClose(i2, reason2);
                  },
                  alreadyHaveEvent: localAlreadyHaveEventHandler,
                  eoseTimeout: params.maxWait,
                  abort: params.abort
                });
              }).catch((err) => {
                handleClose(i2, `auth was required and attempted, but failed with: ${err}`);
              });
            } else {
              handleClose(i2, reason);
            }
          },
          alreadyHaveEvent: localAlreadyHaveEventHandler,
          eoseTimeout: params.maxWait,
          abort: params.abort
        });
        subs.push(subscription);
      })
    );
    return {
      async close(reason) {
        await allOpened;
        subs.forEach((sub) => {
          sub.close(reason);
        });
      }
    };
  }
  subscribeEose(relays, filter, params) {
    let subcloser;
    subcloser = this.subscribe(relays, filter, {
      ...params,
      oneose() {
        const reason = "closed automatically on eose";
        if (subcloser)
          subcloser.close(reason);
        else
          params.onclose?.(relays.map((_) => reason));
      }
    });
    return subcloser;
  }
  subscribeManyEose(relays, filter, params) {
    return this.subscribeEose(relays, filter, params);
  }
  async querySync(relays, filter, params) {
    return new Promise(async (resolve) => {
      const events = [];
      this.subscribeEose(relays, filter, {
        ...params,
        onevent(event) {
          events.push(event);
        },
        onclose(_) {
          resolve(events);
        }
      });
    });
  }
  async get(relays, filter, params) {
    filter.limit = 1;
    const events = await this.querySync(relays, filter, params);
    events.sort((a, b) => b.created_at - a.created_at);
    return events[0] || null;
  }
  publish(relays, event, params) {
    return relays.map(normalizeURL).map(async (url, i2, arr) => {
      if (arr.indexOf(url) !== i2) {
        return Promise.reject("duplicate url");
      }
      if (this.allowConnectingToRelay?.(url, ["write", event]) === false) {
        return Promise.reject("connection skipped by allowConnectingToRelay");
      }
      let r;
      try {
        r = await this.ensureRelay(url, {
          connectionTimeout: this.maxWaitForConnection < (params?.maxWait || 0) ? Math.max(params.maxWait * 0.8, params.maxWait - 1e3) : this.maxWaitForConnection,
          abort: params?.abort
        });
      } catch (err) {
        this.onRelayConnectionFailure?.(url);
        return String("connection failure: " + String(err));
      }
      return r.publish(event).catch(async (err) => {
        if (err instanceof Error && err.message.startsWith("auth-required: ") && params?.onauth) {
          await r.auth(params.onauth);
          return r.publish(event);
        }
        throw err;
      }).then((reason) => {
        if (this.trackRelays) {
          let set2 = this.seenOn.get(event.id);
          if (!set2) {
            set2 = /* @__PURE__ */ new Set();
            this.seenOn.set(event.id, set2);
          }
          set2.add(r);
        }
        return reason;
      });
    });
  }
  listConnectionStatus() {
    const map2 = /* @__PURE__ */ new Map();
    this.relays.forEach((relay, url) => map2.set(url, relay.connected));
    return map2;
  }
  destroy() {
    this.relays.forEach((conn) => conn.close());
    this.relays = /* @__PURE__ */ new Map();
  }
  pruneIdleRelays(idleThresholdMs = 1e4) {
    const prunedUrls = [];
    for (const [url, relay] of this.relays) {
      if (relay.idleSince && Date.now() - relay.idleSince >= idleThresholdMs) {
        this.relays.delete(url);
        prunedUrls.push(url);
        relay.close();
      }
    }
    return prunedUrls;
  }
};
var _WebSocket2;
try {
  _WebSocket2 = WebSocket;
} catch {
}
var SimplePool = class extends AbstractSimplePool {
  constructor(options) {
    super({ verifyEvent, websocketImplementation: _WebSocket2, maxWaitForConnection: 3e3, ...options });
  }
};
var nip19_exports = {};
__export(nip19_exports, {
  BECH32_REGEX: () => BECH32_REGEX,
  Bech32MaxSize: () => Bech32MaxSize,
  NostrTypeGuard: () => NostrTypeGuard,
  decode: () => decode,
  decodeNostrURI: () => decodeNostrURI,
  encodeBytes: () => encodeBytes,
  naddrEncode: () => naddrEncode,
  neventEncode: () => neventEncode,
  noteEncode: () => noteEncode,
  nprofileEncode: () => nprofileEncode,
  npubEncode: () => npubEncode,
  nsecEncode: () => nsecEncode
});
var NostrTypeGuard = {
  isNProfile: (value) => /^nprofile1[a-z\d]+$/.test(value || ""),
  isNEvent: (value) => /^nevent1[a-z\d]+$/.test(value || ""),
  isNAddr: (value) => /^naddr1[a-z\d]+$/.test(value || ""),
  isNSec: (value) => /^nsec1[a-z\d]{58}$/.test(value || ""),
  isNPub: (value) => /^npub1[a-z\d]{58}$/.test(value || ""),
  isNote: (value) => /^note1[a-z\d]+$/.test(value || ""),
  isNcryptsec: (value) => /^ncryptsec1[a-z\d]+$/.test(value || "")
};
var Bech32MaxSize = 5e3;
var BECH32_REGEX = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
function integerToUint8Array(number) {
  const uint8Array = new Uint8Array(4);
  uint8Array[0] = number >> 24 & 255;
  uint8Array[1] = number >> 16 & 255;
  uint8Array[2] = number >> 8 & 255;
  uint8Array[3] = number & 255;
  return uint8Array;
}
function decodeNostrURI(nip19code) {
  try {
    if (nip19code.startsWith("nostr:"))
      nip19code = nip19code.substring(6);
    return decode(nip19code);
  } catch (_err) {
    return { type: "invalid", data: null };
  }
}
function decode(code) {
  let { prefix, words } = bech32.decode(code, Bech32MaxSize);
  let data = new Uint8Array(bech32.fromWords(words));
  switch (prefix) {
    case "nprofile": {
      let tlv = parseTLV(data);
      if (!tlv[0]?.[0])
        throw new Error("missing TLV 0 for nprofile");
      if (tlv[0][0].length !== 32)
        throw new Error("TLV 0 should be 32 bytes");
      return {
        type: "nprofile",
        data: {
          pubkey: bytesToHex$2(tlv[0][0]),
          relays: tlv[1] ? tlv[1].map((d) => utf8Decoder.decode(d)) : []
        }
      };
    }
    case "nevent": {
      let tlv = parseTLV(data);
      if (!tlv[0]?.[0])
        throw new Error("missing TLV 0 for nevent");
      if (tlv[0][0].length !== 32)
        throw new Error("TLV 0 should be 32 bytes");
      if (tlv[2] && tlv[2][0].length !== 32)
        throw new Error("TLV 2 should be 32 bytes");
      if (tlv[3] && tlv[3][0].length !== 4)
        throw new Error("TLV 3 should be 4 bytes");
      return {
        type: "nevent",
        data: {
          id: bytesToHex$2(tlv[0][0]),
          relays: tlv[1] ? tlv[1].map((d) => utf8Decoder.decode(d)) : [],
          author: tlv[2]?.[0] ? bytesToHex$2(tlv[2][0]) : void 0,
          kind: tlv[3]?.[0] ? parseInt(bytesToHex$2(tlv[3][0]), 16) : void 0
        }
      };
    }
    case "naddr": {
      let tlv = parseTLV(data);
      if (!tlv[0]?.[0])
        throw new Error("missing TLV 0 for naddr");
      if (!tlv[2]?.[0])
        throw new Error("missing TLV 2 for naddr");
      if (tlv[2][0].length !== 32)
        throw new Error("TLV 2 should be 32 bytes");
      if (!tlv[3]?.[0])
        throw new Error("missing TLV 3 for naddr");
      if (tlv[3][0].length !== 4)
        throw new Error("TLV 3 should be 4 bytes");
      return {
        type: "naddr",
        data: {
          identifier: utf8Decoder.decode(tlv[0][0]),
          pubkey: bytesToHex$2(tlv[2][0]),
          kind: parseInt(bytesToHex$2(tlv[3][0]), 16),
          relays: tlv[1] ? tlv[1].map((d) => utf8Decoder.decode(d)) : []
        }
      };
    }
    case "nsec":
      return { type: prefix, data };
    case "npub":
    case "note":
      return { type: prefix, data: bytesToHex$2(data) };
    default:
      throw new Error(`unknown prefix ${prefix}`);
  }
}
function parseTLV(data) {
  let result = {};
  let rest = data;
  while (rest.length > 0) {
    let t = rest[0];
    let l = rest[1];
    let v = rest.slice(2, 2 + l);
    rest = rest.slice(2 + l);
    if (v.length < l)
      throw new Error(`not enough data to read on TLV ${t}`);
    result[t] = result[t] || [];
    result[t].push(v);
  }
  return result;
}
function nsecEncode(key) {
  return encodeBytes("nsec", key);
}
function npubEncode(hex) {
  return encodeBytes("npub", hexToBytes$3(hex));
}
function noteEncode(hex) {
  return encodeBytes("note", hexToBytes$3(hex));
}
function encodeBech32(prefix, data) {
  let words = bech32.toWords(data);
  return bech32.encode(prefix, words, Bech32MaxSize);
}
function encodeBytes(prefix, bytes) {
  return encodeBech32(prefix, bytes);
}
function nprofileEncode(profile) {
  let data = encodeTLV({
    0: [hexToBytes$3(profile.pubkey)],
    1: (profile.relays || []).map((url) => utf8Encoder.encode(url))
  });
  return encodeBech32("nprofile", data);
}
function neventEncode(event) {
  let kindArray;
  if (event.kind !== void 0) {
    kindArray = integerToUint8Array(event.kind);
  }
  let data = encodeTLV({
    0: [hexToBytes$3(event.id)],
    1: (event.relays || []).map((url) => utf8Encoder.encode(url)),
    2: event.author ? [hexToBytes$3(event.author)] : [],
    3: kindArray ? [new Uint8Array(kindArray)] : []
  });
  return encodeBech32("nevent", data);
}
function naddrEncode(addr) {
  let kind = new ArrayBuffer(4);
  new DataView(kind).setUint32(0, addr.kind, false);
  let data = encodeTLV({
    0: [utf8Encoder.encode(addr.identifier)],
    1: (addr.relays || []).map((url) => utf8Encoder.encode(url)),
    2: [hexToBytes$3(addr.pubkey)],
    3: [new Uint8Array(kind)]
  });
  return encodeBech32("naddr", data);
}
function encodeTLV(tlv) {
  let entries = [];
  Object.entries(tlv).reverse().forEach(([t, vs]) => {
    vs.forEach((v) => {
      let entry = new Uint8Array(v.length + 2);
      entry.set([parseInt(t)], 0);
      entry.set([v.length], 1);
      entry.set(v, 2);
      entries.push(entry);
    });
  });
  return concatBytes(...entries);
}
var nip04_exports = {};
__export(nip04_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt
});
function encrypt(secretKey, pubkey, text) {
  const privkey = secretKey instanceof Uint8Array ? secretKey : hexToBytes$3(secretKey);
  const key = secp256k1.getSharedSecret(privkey, hexToBytes$3("02" + pubkey));
  const normalizedKey = getNormalizedX(key);
  let iv = Uint8Array.from(randomBytes(16));
  let plaintext = utf8Encoder.encode(text);
  let ciphertext = cbc(normalizedKey, iv).encrypt(plaintext);
  let ctb64 = base64.encode(new Uint8Array(ciphertext));
  let ivb64 = base64.encode(new Uint8Array(iv.buffer));
  return `${ctb64}?iv=${ivb64}`;
}
function decrypt(secretKey, pubkey, data) {
  const privkey = secretKey instanceof Uint8Array ? secretKey : hexToBytes$3(secretKey);
  let [ctb64, ivb64] = data.split("?iv=");
  let key = secp256k1.getSharedSecret(privkey, hexToBytes$3("02" + pubkey));
  let normalizedKey = getNormalizedX(key);
  let iv = base64.decode(ivb64);
  let ciphertext = base64.decode(ctb64);
  let plaintext = cbc(normalizedKey, iv).decrypt(ciphertext);
  return utf8Decoder.decode(plaintext);
}
function getNormalizedX(key) {
  return key.slice(1, 33);
}
var nip05_exports = {};
__export(nip05_exports, {
  NIP05_REGEX: () => NIP05_REGEX,
  isNip05: () => isNip05,
  isValid: () => isValid,
  queryProfile: () => queryProfile,
  searchDomain: () => searchDomain,
  useFetchImplementation: () => useFetchImplementation
});
var NIP05_REGEX = /^(?:([\w.+-]+)@)?([\w_-]+(\.[\w_-]+)+)$/;
var isNip05 = (value) => NIP05_REGEX.test(value || "");
var _fetch;
try {
  _fetch = fetch;
} catch (_) {
}
function useFetchImplementation(fetchImplementation) {
  _fetch = fetchImplementation;
}
async function searchDomain(domain, query2 = "") {
  try {
    const url = `https://${domain}/.well-known/nostr.json?name=${query2}`;
    const res = await _fetch(url, { redirect: "manual" });
    if (res.status !== 200) {
      throw Error("Wrong response code");
    }
    const json2 = await res.json();
    return json2.names;
  } catch (_) {
    return {};
  }
}
async function queryProfile(fullname) {
  const match = fullname.match(NIP05_REGEX);
  if (!match)
    return null;
  const [, name2 = "_", domain] = match;
  try {
    const url = `https://${domain}/.well-known/nostr.json?name=${name2}`;
    const res = await _fetch(url, { redirect: "manual" });
    if (res.status !== 200) {
      throw Error("Wrong response code");
    }
    const json2 = await res.json();
    const pubkey = json2.names[name2];
    return pubkey ? { pubkey, relays: json2.relays?.[pubkey] } : null;
  } catch (_e2) {
    return null;
  }
}
async function isValid(pubkey, nip05) {
  const res = await queryProfile(nip05);
  return res ? res.pubkey === pubkey : false;
}
var nip10_exports = {};
__export(nip10_exports, {
  parse: () => parse
});
function parse(event) {
  const result = {
    reply: void 0,
    root: void 0,
    mentions: [],
    profiles: [],
    quotes: []
  };
  let maybeParent;
  let maybeRoot;
  for (let i2 = event.tags.length - 1; i2 >= 0; i2--) {
    const tag = event.tags[i2];
    if (tag[0] === "e" && tag[1]) {
      const [_, eTagEventId, eTagRelayUrl, eTagMarker, eTagAuthor] = tag;
      const eventPointer = {
        id: eTagEventId,
        relays: eTagRelayUrl ? [eTagRelayUrl] : [],
        author: eTagAuthor
      };
      if (eTagMarker === "root") {
        result.root = eventPointer;
        continue;
      }
      if (eTagMarker === "reply") {
        result.reply = eventPointer;
        continue;
      }
      if (eTagMarker === "mention") {
        result.mentions.push(eventPointer);
        continue;
      }
      if (!maybeParent) {
        maybeParent = eventPointer;
      } else {
        maybeRoot = eventPointer;
      }
      result.mentions.push(eventPointer);
      continue;
    }
    if (tag[0] === "q" && tag[1]) {
      const [_, eTagEventId, eTagRelayUrl] = tag;
      result.quotes.push({
        id: eTagEventId,
        relays: eTagRelayUrl ? [eTagRelayUrl] : []
      });
    }
    if (tag[0] === "p" && tag[1]) {
      result.profiles.push({
        pubkey: tag[1],
        relays: tag[2] ? [tag[2]] : []
      });
      continue;
    }
  }
  if (!result.root) {
    result.root = maybeRoot || maybeParent || result.reply;
  }
  if (!result.reply) {
    result.reply = maybeParent || result.root;
  }
  [result.reply, result.root].forEach((ref) => {
    if (!ref)
      return;
    let idx = result.mentions.indexOf(ref);
    if (idx !== -1) {
      result.mentions.splice(idx, 1);
    }
    if (ref.author) {
      let author = result.profiles.find((p) => p.pubkey === ref.author);
      if (author && author.relays) {
        if (!ref.relays) {
          ref.relays = [];
        }
        author.relays.forEach((url) => {
          if (ref.relays?.indexOf(url) === -1)
            ref.relays.push(url);
        });
        author.relays = ref.relays;
      }
    }
  });
  result.mentions.forEach((ref) => {
    if (ref.author) {
      let author = result.profiles.find((p) => p.pubkey === ref.author);
      if (author && author.relays) {
        if (!ref.relays) {
          ref.relays = [];
        }
        author.relays.forEach((url) => {
          if (ref.relays.indexOf(url) === -1)
            ref.relays.push(url);
        });
        author.relays = ref.relays;
      }
    }
  });
  return result;
}
var nip11_exports = {};
__export(nip11_exports, {
  fetchRelayInformation: () => fetchRelayInformation,
  useFetchImplementation: () => useFetchImplementation2
});
var _fetch2;
try {
  _fetch2 = fetch;
} catch {
}
function useFetchImplementation2(fetchImplementation) {
  _fetch2 = fetchImplementation;
}
async function fetchRelayInformation(url) {
  return await (await fetch(url.replace("ws://", "http://").replace("wss://", "https://"), {
    headers: { Accept: "application/nostr+json" }
  })).json();
}
var nip13_exports = {};
__export(nip13_exports, {
  getPow: () => getPow,
  minePow: () => minePow
});
function getPow(hex) {
  let count = 0;
  for (let i2 = 0; i2 < 64; i2 += 8) {
    const nibble = parseInt(hex.substring(i2, i2 + 8), 16);
    if (nibble === 0) {
      count += 32;
    } else {
      count += Math.clz32(nibble);
      break;
    }
  }
  return count;
}
function getPowFromBytes(hash) {
  let count = 0;
  for (let i2 = 0; i2 < hash.length; i2++) {
    const byte = hash[i2];
    if (byte === 0) {
      count += 8;
    } else {
      count += Math.clz32(byte) - 24;
      break;
    }
  }
  return count;
}
function minePow(unsigned, difficulty) {
  let count = 0;
  const event = unsigned;
  const tag = ["nonce", count.toString(), difficulty.toString()];
  event.tags.push(tag);
  while (true) {
    const now2 = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    if (now2 !== event.created_at) {
      count = 0;
      event.created_at = now2;
    }
    tag[1] = (++count).toString();
    const hash = sha256(
      utf8Encoder.encode(JSON.stringify([0, event.pubkey, event.created_at, event.kind, event.tags, event.content]))
    );
    if (getPowFromBytes(hash) >= difficulty) {
      event.id = bytesToHex$2(hash);
      break;
    }
  }
  return event;
}
var nip17_exports = {};
__export(nip17_exports, {
  unwrapEvent: () => unwrapEvent2,
  unwrapManyEvents: () => unwrapManyEvents2,
  wrapEvent: () => wrapEvent2,
  wrapManyEvents: () => wrapManyEvents2
});
var nip59_exports = {};
__export(nip59_exports, {
  createRumor: () => createRumor,
  createSeal: () => createSeal,
  createWrap: () => createWrap,
  unwrapEvent: () => unwrapEvent,
  unwrapManyEvents: () => unwrapManyEvents,
  wrapEvent: () => wrapEvent,
  wrapManyEvents: () => wrapManyEvents
});
var nip44_exports = {};
__export(nip44_exports, {
  decrypt: () => decrypt2,
  encrypt: () => encrypt2,
  getConversationKey: () => getConversationKey,
  v2: () => v2
});
var minPlaintextSize = 1;
var maxPlaintextSize = 65535;
function getConversationKey(privkeyA, pubkeyB) {
  const sharedX = secp256k1.getSharedSecret(privkeyA, hexToBytes$3("02" + pubkeyB)).subarray(1, 33);
  return extract(sha256, sharedX, utf8Encoder.encode("nip44-v2"));
}
function getMessageKeys(conversationKey, nonce) {
  const keys = expand(sha256, conversationKey, nonce, 76);
  return {
    chacha_key: keys.subarray(0, 32),
    chacha_nonce: keys.subarray(32, 44),
    hmac_key: keys.subarray(44, 76)
  };
}
function calcPaddedLen(len) {
  if (!Number.isSafeInteger(len) || len < 1)
    throw new Error("expected positive integer");
  if (len <= 32)
    return 32;
  const nextPower = 1 << Math.floor(Math.log2(len - 1)) + 1;
  const chunk = nextPower <= 256 ? 32 : nextPower / 8;
  return chunk * (Math.floor((len - 1) / chunk) + 1);
}
function writeU16BE(num2) {
  if (!Number.isSafeInteger(num2) || num2 < minPlaintextSize || num2 > maxPlaintextSize)
    throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");
  const arr = new Uint8Array(2);
  new DataView(arr.buffer).setUint16(0, num2, false);
  return arr;
}
function pad$3(plaintext) {
  const unpadded = utf8Encoder.encode(plaintext);
  const unpaddedLen = unpadded.length;
  const prefix = writeU16BE(unpaddedLen);
  const suffix = new Uint8Array(calcPaddedLen(unpaddedLen) - unpaddedLen);
  return concatBytes(prefix, unpadded, suffix);
}
function unpad(padded) {
  const unpaddedLen = new DataView(padded.buffer).getUint16(0);
  const unpadded = padded.subarray(2, 2 + unpaddedLen);
  if (unpaddedLen < minPlaintextSize || unpaddedLen > maxPlaintextSize || unpadded.length !== unpaddedLen || padded.length !== 2 + calcPaddedLen(unpaddedLen))
    throw new Error("invalid padding");
  return utf8Decoder.decode(unpadded);
}
function hmacAad(key, message, aad) {
  if (aad.length !== 32)
    throw new Error("AAD associated data must be 32 bytes");
  const combined = concatBytes(aad, message);
  return hmac(sha256, key, combined);
}
function decodePayload(payload) {
  if (typeof payload !== "string")
    throw new Error("payload must be a valid string");
  const plen = payload.length;
  if (plen < 132 || plen > 87472)
    throw new Error("invalid payload length: " + plen);
  if (payload[0] === "#")
    throw new Error("unknown encryption version");
  let data;
  try {
    data = base64.decode(payload);
  } catch (error) {
    throw new Error("invalid base64: " + error.message);
  }
  const dlen = data.length;
  if (dlen < 99 || dlen > 65603)
    throw new Error("invalid data length: " + dlen);
  const vers = data[0];
  if (vers !== 2)
    throw new Error("unknown encryption version " + vers);
  return {
    nonce: data.subarray(1, 33),
    ciphertext: data.subarray(33, -32),
    mac: data.subarray(-32)
  };
}
function encrypt2(plaintext, conversationKey, nonce = randomBytes(32)) {
  const { chacha_key, chacha_nonce, hmac_key } = getMessageKeys(conversationKey, nonce);
  const padded = pad$3(plaintext);
  const ciphertext = chacha20(chacha_key, chacha_nonce, padded);
  const mac = hmacAad(hmac_key, ciphertext, nonce);
  return base64.encode(concatBytes(new Uint8Array([2]), nonce, ciphertext, mac));
}
function decrypt2(payload, conversationKey) {
  const { nonce, ciphertext, mac } = decodePayload(payload);
  const { chacha_key, chacha_nonce, hmac_key } = getMessageKeys(conversationKey, nonce);
  const calculatedMac = hmacAad(hmac_key, ciphertext, nonce);
  if (!equalBytes(calculatedMac, mac))
    throw new Error("invalid MAC");
  const padded = chacha20(chacha_key, chacha_nonce, ciphertext);
  return unpad(padded);
}
var v2 = {
  utils: {
    getConversationKey,
    calcPaddedLen
  },
  encrypt: encrypt2,
  decrypt: decrypt2
};
var TWO_DAYS = 2 * 24 * 60 * 60;
var now = () => Math.round(Date.now() / 1e3);
var randomNow = () => Math.round(now() - Math.random() * TWO_DAYS);
var nip44ConversationKey = (privateKey, publicKey) => getConversationKey(privateKey, publicKey);
var nip44Encrypt = (data, privateKey, publicKey) => encrypt2(JSON.stringify(data), nip44ConversationKey(privateKey, publicKey));
var nip44Decrypt = (data, privateKey) => JSON.parse(decrypt2(data.content, nip44ConversationKey(privateKey, data.pubkey)));
function createRumor(event, privateKey) {
  const rumor = {
    created_at: now(),
    content: "",
    tags: [],
    ...event,
    pubkey: getPublicKey(privateKey)
  };
  rumor.id = getEventHash(rumor);
  return rumor;
}
function createSeal(rumor, privateKey, recipientPublicKey) {
  return finalizeEvent(
    {
      kind: Seal,
      content: nip44Encrypt(rumor, privateKey, recipientPublicKey),
      created_at: randomNow(),
      tags: []
    },
    privateKey
  );
}
function createWrap(seal, recipientPublicKey) {
  const randomKey = generateSecretKey();
  return finalizeEvent(
    {
      kind: GiftWrap,
      content: nip44Encrypt(seal, randomKey, recipientPublicKey),
      created_at: randomNow(),
      tags: [["p", recipientPublicKey]]
    },
    randomKey
  );
}
function wrapEvent(event, senderPrivateKey, recipientPublicKey) {
  const rumor = createRumor(event, senderPrivateKey);
  const seal = createSeal(rumor, senderPrivateKey, recipientPublicKey);
  return createWrap(seal, recipientPublicKey);
}
function wrapManyEvents(event, senderPrivateKey, recipientsPublicKeys) {
  if (!recipientsPublicKeys || recipientsPublicKeys.length === 0) {
    throw new Error("At least one recipient is required.");
  }
  const senderPublicKey = getPublicKey(senderPrivateKey);
  const wrappeds = [wrapEvent(event, senderPrivateKey, senderPublicKey)];
  recipientsPublicKeys.forEach((recipientPublicKey) => {
    wrappeds.push(wrapEvent(event, senderPrivateKey, recipientPublicKey));
  });
  return wrappeds;
}
function unwrapEvent(wrap, recipientPrivateKey) {
  const unwrappedSeal = nip44Decrypt(wrap, recipientPrivateKey);
  return nip44Decrypt(unwrappedSeal, recipientPrivateKey);
}
function unwrapManyEvents(wrappedEvents, recipientPrivateKey) {
  let unwrappedEvents = [];
  wrappedEvents.forEach((e) => {
    unwrappedEvents.push(unwrapEvent(e, recipientPrivateKey));
  });
  unwrappedEvents.sort((a, b) => a.created_at - b.created_at);
  return unwrappedEvents;
}
function createEvent(recipients, message, conversationTitle, replyTo) {
  const baseEvent = {
    created_at: Math.ceil(Date.now() / 1e3),
    kind: PrivateDirectMessage,
    tags: [],
    content: message
  };
  const recipientsArray = Array.isArray(recipients) ? recipients : [recipients];
  recipientsArray.forEach(({ publicKey, relayUrl }) => {
    baseEvent.tags.push(relayUrl ? ["p", publicKey, relayUrl] : ["p", publicKey]);
  });
  if (replyTo) {
    baseEvent.tags.push(["e", replyTo.eventId, replyTo.relayUrl || "", "reply"]);
  }
  if (conversationTitle) {
    baseEvent.tags.push(["subject", conversationTitle]);
  }
  return baseEvent;
}
function wrapEvent2(senderPrivateKey, recipient, message, conversationTitle, replyTo) {
  const event = createEvent(recipient, message, conversationTitle, replyTo);
  return wrapEvent(event, senderPrivateKey, recipient.publicKey);
}
function wrapManyEvents2(senderPrivateKey, recipients, message, conversationTitle, replyTo) {
  if (!recipients || recipients.length === 0) {
    throw new Error("At least one recipient is required.");
  }
  const senderPublicKey = getPublicKey(senderPrivateKey);
  return [{ publicKey: senderPublicKey }, ...recipients].map(
    (recipient) => wrapEvent2(senderPrivateKey, recipient, message, conversationTitle, replyTo)
  );
}
var unwrapEvent2 = unwrapEvent;
var unwrapManyEvents2 = unwrapManyEvents;
var nip18_exports = {};
__export(nip18_exports, {
  finishRepostEvent: () => finishRepostEvent,
  getRepostedEvent: () => getRepostedEvent,
  getRepostedEventPointer: () => getRepostedEventPointer
});
function finishRepostEvent(t, reposted, relayUrl, privateKey) {
  let kind;
  const tags = [...t.tags ?? [], ["e", reposted.id, relayUrl], ["p", reposted.pubkey]];
  if (reposted.kind === ShortTextNote) {
    kind = Repost;
  } else {
    kind = GenericRepost;
    tags.push(["k", String(reposted.kind)]);
  }
  return finalizeEvent(
    {
      kind,
      tags,
      content: t.content === "" || reposted.tags?.find((tag) => tag[0] === "-") ? "" : JSON.stringify(reposted),
      created_at: t.created_at
    },
    privateKey
  );
}
function getRepostedEventPointer(event) {
  if (![Repost, GenericRepost].includes(event.kind)) {
    return void 0;
  }
  let lastETag;
  let lastPTag;
  for (let i2 = event.tags.length - 1; i2 >= 0 && (lastETag === void 0 || lastPTag === void 0); i2--) {
    const tag = event.tags[i2];
    if (tag.length >= 2) {
      if (tag[0] === "e" && lastETag === void 0) {
        lastETag = tag;
      } else if (tag[0] === "p" && lastPTag === void 0) {
        lastPTag = tag;
      }
    }
  }
  if (lastETag === void 0) {
    return void 0;
  }
  return {
    id: lastETag[1],
    relays: [lastETag[2], lastPTag?.[2]].filter((x) => typeof x === "string"),
    author: lastPTag?.[1]
  };
}
function getRepostedEvent(event, { skipVerification } = {}) {
  const pointer = getRepostedEventPointer(event);
  if (pointer === void 0 || event.content === "") {
    return void 0;
  }
  let repostedEvent;
  try {
    repostedEvent = JSON.parse(event.content);
  } catch (error) {
    return void 0;
  }
  if (repostedEvent.id !== pointer.id) {
    return void 0;
  }
  if (!skipVerification && !verifyEvent(repostedEvent)) {
    return void 0;
  }
  return repostedEvent;
}
var nip21_exports = {};
__export(nip21_exports, {
  NOSTR_URI_REGEX: () => NOSTR_URI_REGEX,
  parse: () => parse2,
  test: () => test
});
var NOSTR_URI_REGEX = new RegExp(`nostr:(${BECH32_REGEX.source})`);
function test(value) {
  return typeof value === "string" && new RegExp(`^${NOSTR_URI_REGEX.source}$`).test(value);
}
function parse2(uri) {
  const match = uri.match(new RegExp(`^${NOSTR_URI_REGEX.source}$`));
  if (!match)
    throw new Error(`Invalid Nostr URI: ${uri}`);
  return {
    uri: match[0],
    value: match[1],
    decoded: decode(match[1])
  };
}
var nip25_exports = {};
__export(nip25_exports, {
  finishReactionEvent: () => finishReactionEvent,
  getReactedEventPointer: () => getReactedEventPointer
});
function finishReactionEvent(t, reacted, privateKey) {
  const inheritedTags = reacted.tags.filter((tag) => tag.length >= 2 && (tag[0] === "e" || tag[0] === "p"));
  return finalizeEvent(
    {
      ...t,
      kind: Reaction,
      tags: [...t.tags ?? [], ...inheritedTags, ["e", reacted.id], ["p", reacted.pubkey]],
      content: t.content ?? "+"
    },
    privateKey
  );
}
function getReactedEventPointer(event) {
  if (event.kind !== Reaction) {
    return void 0;
  }
  let lastETag;
  let lastPTag;
  for (let i2 = event.tags.length - 1; i2 >= 0 && (lastETag === void 0 || lastPTag === void 0); i2--) {
    const tag = event.tags[i2];
    if (tag.length >= 2) {
      if (tag[0] === "e" && lastETag === void 0) {
        lastETag = tag;
      } else if (tag[0] === "p" && lastPTag === void 0) {
        lastPTag = tag;
      }
    }
  }
  if (lastETag === void 0 || lastPTag === void 0) {
    return void 0;
  }
  return {
    id: lastETag[1],
    relays: [lastETag[2], lastPTag[2]].filter((x) => x !== void 0),
    author: lastPTag[1]
  };
}
var nip27_exports = {};
__export(nip27_exports, {
  parse: () => parse3
});
var noCharacter = /\W/m;
var noURLCharacter = /[^\w\/] |[^\w\/]$|$|,| /m;
var MAX_HASHTAG_LENGTH = 42;
function* parse3(content) {
  let emojis = [];
  if (typeof content !== "string") {
    for (let i2 = 0; i2 < content.tags.length; i2++) {
      const tag = content.tags[i2];
      if (tag[0] === "emoji" && tag.length >= 3) {
        emojis.push({ type: "emoji", shortcode: tag[1], url: tag[2] });
      }
    }
    content = content.content;
  }
  const max = content.length;
  let prevIndex = 0;
  let index = 0;
  mainloop:
    while (index < max) {
      const u = content.indexOf(":", index);
      const h = content.indexOf("#", index);
      if (u === -1 && h === -1) {
        break mainloop;
      }
      if (u === -1 || h >= 0 && h < u) {
        if (h === 0 || content[h - 1].match(noCharacter)) {
          const m = content.slice(h + 1, h + MAX_HASHTAG_LENGTH).match(noCharacter);
          const end = m ? h + 1 + m.index : max;
          yield { type: "text", text: content.slice(prevIndex, h) };
          yield { type: "hashtag", value: content.slice(h + 1, end) };
          index = end;
          prevIndex = index;
          continue mainloop;
        }
        index = h + 1;
        continue mainloop;
      }
      if (content.slice(u - 5, u) === "nostr") {
        const m = content.slice(u + 60).match(noCharacter);
        const end = m ? u + 60 + m.index : max;
        try {
          let pointer;
          let { data, type } = decode(content.slice(u + 1, end));
          switch (type) {
            case "npub":
              pointer = { pubkey: data };
              break;
            case "note":
              pointer = { id: data };
              break;
            case "nsec":
              index = end + 1;
              continue;
            default:
              pointer = data;
          }
          if (prevIndex !== u - 5) {
            yield { type: "text", text: content.slice(prevIndex, u - 5) };
          }
          yield { type: "reference", pointer };
          index = end;
          prevIndex = index;
          continue mainloop;
        } catch (_err) {
          index = u + 1;
          continue mainloop;
        }
      } else if (content.slice(u - 5, u) === "https" || content.slice(u - 4, u) === "http") {
        const m = content.slice(u + 4).match(noURLCharacter);
        const end = m ? u + 4 + m.index : max;
        const prefixLen = content[u - 1] === "s" ? 5 : 4;
        try {
          let url = new URL(content.slice(u - prefixLen, end));
          if (url.hostname.indexOf(".") === -1) {
            throw new Error("invalid url");
          }
          if (prevIndex !== u - prefixLen) {
            yield { type: "text", text: content.slice(prevIndex, u - prefixLen) };
          }
          if (/\.(png|jpe?g|gif|webp|heic|svg)$/i.test(url.pathname)) {
            yield { type: "image", url: url.toString() };
            index = end;
            prevIndex = index;
            continue mainloop;
          }
          if (/\.(mp4|avi|webm|mkv|mov)$/i.test(url.pathname)) {
            yield { type: "video", url: url.toString() };
            index = end;
            prevIndex = index;
            continue mainloop;
          }
          if (/\.(mp3|aac|ogg|opus|wav|flac)$/i.test(url.pathname)) {
            yield { type: "audio", url: url.toString() };
            index = end;
            prevIndex = index;
            continue mainloop;
          }
          yield { type: "url", url: url.toString() };
          index = end;
          prevIndex = index;
          continue mainloop;
        } catch (_err) {
          index = end + 1;
          continue mainloop;
        }
      } else if (content.slice(u - 3, u) === "wss" || content.slice(u - 2, u) === "ws") {
        const m = content.slice(u + 4).match(noURLCharacter);
        const end = m ? u + 4 + m.index : max;
        const prefixLen = content[u - 1] === "s" ? 3 : 2;
        try {
          let url = new URL(content.slice(u - prefixLen, end));
          if (url.hostname.indexOf(".") === -1) {
            throw new Error("invalid ws url");
          }
          if (prevIndex !== u - prefixLen) {
            yield { type: "text", text: content.slice(prevIndex, u - prefixLen) };
          }
          yield { type: "relay", url: url.toString() };
          index = end;
          prevIndex = index;
          continue mainloop;
        } catch (_err) {
          index = end + 1;
          continue mainloop;
        }
      } else {
        for (let e = 0; e < emojis.length; e++) {
          const emoji = emojis[e];
          if (content[u + emoji.shortcode.length + 1] === ":" && content.slice(u + 1, u + emoji.shortcode.length + 1) === emoji.shortcode) {
            if (prevIndex !== u) {
              yield { type: "text", text: content.slice(prevIndex, u) };
            }
            yield emoji;
            index = u + emoji.shortcode.length + 2;
            prevIndex = index;
            continue mainloop;
          }
        }
        index = u + 1;
        continue mainloop;
      }
    }
  if (prevIndex !== max) {
    yield { type: "text", text: content.slice(prevIndex) };
  }
}
var nip28_exports = {};
__export(nip28_exports, {
  channelCreateEvent: () => channelCreateEvent,
  channelHideMessageEvent: () => channelHideMessageEvent,
  channelMessageEvent: () => channelMessageEvent,
  channelMetadataEvent: () => channelMetadataEvent,
  channelMuteUserEvent: () => channelMuteUserEvent
});
var channelCreateEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finalizeEvent(
    {
      kind: ChannelCreation,
      tags: [...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelMetadataEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finalizeEvent(
    {
      kind: ChannelMetadata,
      tags: [["e", t.channel_create_event_id], ...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelMessageEvent = (t, privateKey) => {
  const tags = [["e", t.channel_create_event_id, t.relay_url, "root"]];
  if (t.reply_to_channel_message_event_id) {
    tags.push(["e", t.reply_to_channel_message_event_id, t.relay_url, "reply"]);
  }
  return finalizeEvent(
    {
      kind: ChannelMessage,
      tags: [...tags, ...t.tags ?? []],
      content: t.content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelHideMessageEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finalizeEvent(
    {
      kind: ChannelHideMessage,
      tags: [["e", t.channel_message_event_id], ...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var channelMuteUserEvent = (t, privateKey) => {
  let content;
  if (typeof t.content === "object") {
    content = JSON.stringify(t.content);
  } else if (typeof t.content === "string") {
    content = t.content;
  } else {
    return void 0;
  }
  return finalizeEvent(
    {
      kind: ChannelMuteUser,
      tags: [["p", t.pubkey_to_mute], ...t.tags ?? []],
      content,
      created_at: t.created_at
    },
    privateKey
  );
};
var nip30_exports = {};
__export(nip30_exports, {
  EMOJI_SHORTCODE_REGEX: () => EMOJI_SHORTCODE_REGEX,
  matchAll: () => matchAll,
  regex: () => regex,
  replaceAll: () => replaceAll
});
var EMOJI_SHORTCODE_REGEX = /:(\w+):/;
var regex = () => new RegExp(`\\B${EMOJI_SHORTCODE_REGEX.source}\\B`, "g");
function* matchAll(content) {
  const matches = content.matchAll(regex());
  for (const match of matches) {
    try {
      const [shortcode, name2] = match;
      yield {
        shortcode,
        name: name2,
        start: match.index,
        end: match.index + shortcode.length
      };
    } catch (_e2) {
    }
  }
}
function replaceAll(content, replacer) {
  return content.replaceAll(regex(), (shortcode, name2) => {
    return replacer({
      shortcode,
      name: name2
    });
  });
}
var nip39_exports = {};
__export(nip39_exports, {
  useFetchImplementation: () => useFetchImplementation3,
  validateGithub: () => validateGithub
});
var _fetch3;
try {
  _fetch3 = fetch;
} catch {
}
function useFetchImplementation3(fetchImplementation) {
  _fetch3 = fetchImplementation;
}
async function validateGithub(pubkey, username, proof) {
  try {
    let res = await (await _fetch3(`https://gist.github.com/${username}/${proof}/raw`)).text();
    return res === `Verifying that I control the following Nostr public key: ${pubkey}`;
  } catch (_) {
    return false;
  }
}
var nip47_exports = {};
__export(nip47_exports, {
  makeNwcRequestEvent: () => makeNwcRequestEvent,
  parseConnectionString: () => parseConnectionString
});
function parseConnectionString(connectionString) {
  const { host, pathname, searchParams } = new URL(connectionString);
  const pubkey = pathname || host;
  const relay = searchParams.get("relay");
  const secret = searchParams.get("secret");
  if (!pubkey || !relay || !secret) {
    throw new Error("invalid connection string");
  }
  return { pubkey, relay, secret };
}
async function makeNwcRequestEvent(pubkey, secretKey, invoice) {
  const content = {
    method: "pay_invoice",
    params: {
      invoice
    }
  };
  const encryptedContent = encrypt(secretKey, pubkey, JSON.stringify(content));
  const eventTemplate = {
    kind: NWCWalletRequest,
    created_at: Math.round(Date.now() / 1e3),
    content: encryptedContent,
    tags: [["p", pubkey]]
  };
  return finalizeEvent(eventTemplate, secretKey);
}
var nip54_exports = {};
__export(nip54_exports, {
  normalizeIdentifier: () => normalizeIdentifier
});
function normalizeIdentifier(name2) {
  name2 = name2.trim().toLowerCase();
  name2 = name2.normalize("NFKC");
  return Array.from(name2).map((char) => {
    if (/\p{Letter}/u.test(char) || /\p{Number}/u.test(char)) {
      return char;
    }
    return "-";
  }).join("");
}
var nip57_exports = {};
__export(nip57_exports, {
  getSatoshisAmountFromBolt11: () => getSatoshisAmountFromBolt11,
  getZapEndpoint: () => getZapEndpoint,
  makeZapReceipt: () => makeZapReceipt,
  makeZapRequest: () => makeZapRequest,
  useFetchImplementation: () => useFetchImplementation4,
  validateZapRequest: () => validateZapRequest
});
var _fetch4;
try {
  _fetch4 = fetch;
} catch {
}
function useFetchImplementation4(fetchImplementation) {
  _fetch4 = fetchImplementation;
}
async function getZapEndpoint(metadata) {
  try {
    let lnurl = "";
    let { lud06, lud16 } = JSON.parse(metadata.content);
    if (lud16) {
      let [name2, domain] = lud16.split("@");
      lnurl = new URL(`/.well-known/lnurlp/${name2}`, `https://${domain}`).toString();
    } else if (lud06) {
      let { words } = bech32.decode(lud06, 1e3);
      let data = bech32.fromWords(words);
      lnurl = utf8Decoder.decode(data);
    } else {
      return null;
    }
    let res = await _fetch4(lnurl);
    let body = await res.json();
    if (body.allowsNostr && body.nostrPubkey) {
      return body.callback;
    }
  } catch (err) {
  }
  return null;
}
function makeZapRequest(params) {
  let zr = {
    kind: 9734,
    created_at: Math.round(Date.now() / 1e3),
    content: params.comment || "",
    tags: [
      ["p", "pubkey" in params ? params.pubkey : params.event.pubkey],
      ["amount", params.amount.toString()],
      ["relays", ...params.relays]
    ]
  };
  if ("event" in params) {
    zr.tags.push(["e", params.event.id]);
    if (isReplaceableKind(params.event.kind)) {
      const a = ["a", `${params.event.kind}:${params.event.pubkey}:`];
      zr.tags.push(a);
    } else if (isAddressableKind(params.event.kind)) {
      let d = params.event.tags.find(([t, v]) => t === "d" && v);
      if (!d)
        throw new Error("d tag not found or is empty");
      const a = ["a", `${params.event.kind}:${params.event.pubkey}:${d[1]}`];
      zr.tags.push(a);
    }
    zr.tags.push(["k", params.event.kind.toString()]);
  }
  return zr;
}
function validateZapRequest(zapRequestString) {
  let zapRequest;
  try {
    zapRequest = JSON.parse(zapRequestString);
  } catch (err) {
    return "Invalid zap request JSON.";
  }
  if (!validateEvent(zapRequest))
    return "Zap request is not a valid Nostr event.";
  if (!verifyEvent(zapRequest))
    return "Invalid signature on zap request.";
  let p = zapRequest.tags.find(([t, v]) => t === "p" && v);
  if (!p)
    return "Zap request doesn't have a 'p' tag.";
  if (!p[1].match(/^[a-f0-9]{64}$/))
    return "Zap request 'p' tag is not valid hex.";
  let e = zapRequest.tags.find(([t, v]) => t === "e" && v);
  if (e && !e[1].match(/^[a-f0-9]{64}$/))
    return "Zap request 'e' tag is not valid hex.";
  let relays = zapRequest.tags.find(([t, v]) => t === "relays" && v);
  if (!relays)
    return "Zap request doesn't have a 'relays' tag.";
  return null;
}
function makeZapReceipt({
  zapRequest,
  preimage,
  bolt11,
  paidAt
}) {
  let zr = JSON.parse(zapRequest);
  let tagsFromZapRequest = zr.tags.filter(([t]) => t === "e" || t === "p" || t === "a");
  let zap = {
    kind: 9735,
    created_at: Math.round(paidAt.getTime() / 1e3),
    content: "",
    tags: [...tagsFromZapRequest, ["P", zr.pubkey], ["bolt11", bolt11], ["description", zapRequest]]
  };
  if (preimage) {
    zap.tags.push(["preimage", preimage]);
  }
  return zap;
}
function getSatoshisAmountFromBolt11(bolt11) {
  if (bolt11.length < 50) {
    return 0;
  }
  bolt11 = bolt11.substring(0, 50);
  const idx = bolt11.lastIndexOf("1");
  if (idx === -1) {
    return 0;
  }
  const hrp = bolt11.substring(0, idx);
  if (!hrp.startsWith("lnbc")) {
    return 0;
  }
  const amount = hrp.substring(4);
  if (amount.length < 1) {
    return 0;
  }
  const char = amount[amount.length - 1];
  const digit = char.charCodeAt(0) - "0".charCodeAt(0);
  const isDigit = digit >= 0 && digit <= 9;
  let cutPoint = amount.length - 1;
  if (isDigit) {
    cutPoint++;
  }
  if (cutPoint < 1) {
    return 0;
  }
  const num2 = parseInt(amount.substring(0, cutPoint));
  switch (char) {
    case "m":
      return num2 * 1e5;
    case "u":
      return num2 * 100;
    case "n":
      return num2 / 10;
    case "p":
      return num2 / 1e4;
    default:
      return num2 * 1e8;
  }
}
var nip77_exports = {};
__export(nip77_exports, {
  Negentropy: () => Negentropy,
  NegentropyStorageVector: () => NegentropyStorageVector,
  NegentropySync: () => NegentropySync
});
var PROTOCOL_VERSION = 97;
var ID_SIZE = 32;
var FINGERPRINT_SIZE = 16;
var Mode = {
  Skip: 0,
  Fingerprint: 1,
  IdList: 2
};
var WrappedBuffer = class {
  constructor(buffer) {
    __publicField(this, "_raw");
    __publicField(this, "length");
    if (typeof buffer === "number") {
      this._raw = new Uint8Array(buffer);
      this.length = 0;
    } else if (buffer instanceof Uint8Array) {
      this._raw = new Uint8Array(buffer);
      this.length = buffer.length;
    } else {
      this._raw = new Uint8Array(512);
      this.length = 0;
    }
  }
  unwrap() {
    return this._raw.subarray(0, this.length);
  }
  get capacity() {
    return this._raw.byteLength;
  }
  extend(buf) {
    if (buf instanceof WrappedBuffer)
      buf = buf.unwrap();
    if (typeof buf.length !== "number")
      throw Error("bad length");
    const targetSize = buf.length + this.length;
    if (this.capacity < targetSize) {
      const oldRaw = this._raw;
      const newCapacity = Math.max(this.capacity * 2, targetSize);
      this._raw = new Uint8Array(newCapacity);
      this._raw.set(oldRaw);
    }
    this._raw.set(buf, this.length);
    this.length += buf.length;
  }
  shift() {
    const first = this._raw[0];
    this._raw = this._raw.subarray(1);
    this.length--;
    return first;
  }
  shiftN(n = 1) {
    const firstSubarray = this._raw.subarray(0, n);
    this._raw = this._raw.subarray(n);
    this.length -= n;
    return firstSubarray;
  }
};
function decodeVarInt(buf) {
  let res = 0;
  while (1) {
    if (buf.length === 0)
      throw Error("parse ends prematurely");
    let byte = buf.shift();
    res = res << 7 | byte & 127;
    if ((byte & 128) === 0)
      break;
  }
  return res;
}
function encodeVarInt(n) {
  if (n === 0)
    return new WrappedBuffer(new Uint8Array([0]));
  let o = [];
  while (n !== 0) {
    o.push(n & 127);
    n >>>= 7;
  }
  o.reverse();
  for (let i2 = 0; i2 < o.length - 1; i2++)
    o[i2] |= 128;
  return new WrappedBuffer(new Uint8Array(o));
}
function getByte(buf) {
  return getBytes(buf, 1)[0];
}
function getBytes(buf, n) {
  if (buf.length < n)
    throw Error("parse ends prematurely");
  return buf.shiftN(n);
}
var Accumulator = class {
  constructor() {
    __publicField(this, "buf");
    this.setToZero();
  }
  setToZero() {
    this.buf = new Uint8Array(ID_SIZE);
  }
  add(otherBuf) {
    let currCarry = 0, nextCarry = 0;
    let p = new DataView(this.buf.buffer);
    let po = new DataView(otherBuf.buffer);
    for (let i2 = 0; i2 < 8; i2++) {
      let offset = i2 * 4;
      let orig = p.getUint32(offset, true);
      let otherV = po.getUint32(offset, true);
      let next = orig;
      next += currCarry;
      next += otherV;
      if (next > 4294967295)
        nextCarry = 1;
      p.setUint32(offset, next & 4294967295, true);
      currCarry = nextCarry;
      nextCarry = 0;
    }
  }
  negate() {
    let p = new DataView(this.buf.buffer);
    for (let i2 = 0; i2 < 8; i2++) {
      let offset = i2 * 4;
      p.setUint32(offset, ~p.getUint32(offset, true));
    }
    let one = new Uint8Array(ID_SIZE);
    one[0] = 1;
    this.add(one);
  }
  getFingerprint(n) {
    let input = new WrappedBuffer();
    input.extend(this.buf);
    input.extend(encodeVarInt(n));
    let hash = sha256(input.unwrap());
    return hash.subarray(0, FINGERPRINT_SIZE);
  }
};
var NegentropyStorageVector = class {
  constructor() {
    __publicField(this, "items");
    __publicField(this, "sealed");
    this.items = [];
    this.sealed = false;
  }
  insert(timestamp, id) {
    if (this.sealed)
      throw Error("already sealed");
    const idb = hexToBytes$3(id);
    if (idb.byteLength !== ID_SIZE)
      throw Error("bad id size for added item");
    this.items.push({ timestamp, id: idb });
  }
  seal() {
    if (this.sealed)
      throw Error("already sealed");
    this.sealed = true;
    this.items.sort(itemCompare);
    for (let i2 = 1; i2 < this.items.length; i2++) {
      if (itemCompare(this.items[i2 - 1], this.items[i2]) === 0)
        throw Error("duplicate item inserted");
    }
  }
  unseal() {
    this.sealed = false;
  }
  size() {
    this._checkSealed();
    return this.items.length;
  }
  getItem(i2) {
    this._checkSealed();
    if (i2 >= this.items.length)
      throw Error("out of range");
    return this.items[i2];
  }
  iterate(begin, end, cb) {
    this._checkSealed();
    this._checkBounds(begin, end);
    for (let i2 = begin; i2 < end; ++i2) {
      if (!cb(this.items[i2], i2))
        break;
    }
  }
  findLowerBound(begin, end, bound) {
    this._checkSealed();
    this._checkBounds(begin, end);
    return this._binarySearch(this.items, begin, end, (a) => itemCompare(a, bound) < 0);
  }
  fingerprint(begin, end) {
    let out = new Accumulator();
    out.setToZero();
    this.iterate(begin, end, (item) => {
      out.add(item.id);
      return true;
    });
    return out.getFingerprint(end - begin);
  }
  _checkSealed() {
    if (!this.sealed)
      throw Error("not sealed");
  }
  _checkBounds(begin, end) {
    if (begin > end || end > this.items.length)
      throw Error("bad range");
  }
  _binarySearch(arr, first, last, cmp) {
    let count = last - first;
    while (count > 0) {
      let it = first;
      let step = Math.floor(count / 2);
      it += step;
      if (cmp(arr[it])) {
        first = ++it;
        count -= step + 1;
      } else {
        count = step;
      }
    }
    return first;
  }
};
var Negentropy = class {
  constructor(storage2, frameSizeLimit = 6e4) {
    __publicField(this, "storage");
    __publicField(this, "frameSizeLimit");
    __publicField(this, "lastTimestampIn");
    __publicField(this, "lastTimestampOut");
    if (frameSizeLimit < 4096)
      throw Error("frameSizeLimit too small");
    this.storage = storage2;
    this.frameSizeLimit = frameSizeLimit;
    this.lastTimestampIn = 0;
    this.lastTimestampOut = 0;
  }
  _bound(timestamp, id) {
    return { timestamp, id: id || new Uint8Array(0) };
  }
  initiate() {
    let output = new WrappedBuffer();
    output.extend(new Uint8Array([PROTOCOL_VERSION]));
    this.splitRange(0, this.storage.size(), this._bound(Number.MAX_VALUE), output);
    return bytesToHex$2(output.unwrap());
  }
  reconcile(queryMsg, onhave, onneed) {
    const query2 = new WrappedBuffer(hexToBytes$3(queryMsg));
    this.lastTimestampIn = this.lastTimestampOut = 0;
    let fullOutput = new WrappedBuffer();
    fullOutput.extend(new Uint8Array([PROTOCOL_VERSION]));
    let protocolVersion = getByte(query2);
    if (protocolVersion < 96 || protocolVersion > 111)
      throw Error("invalid negentropy protocol version byte");
    if (protocolVersion !== PROTOCOL_VERSION) {
      throw Error("unsupported negentropy protocol version requested: " + (protocolVersion - 96));
    }
    let storageSize = this.storage.size();
    let prevBound = this._bound(0);
    let prevIndex = 0;
    let skip = false;
    while (query2.length !== 0) {
      let o = new WrappedBuffer();
      let doSkip = () => {
        if (skip) {
          skip = false;
          o.extend(this.encodeBound(prevBound));
          o.extend(encodeVarInt(Mode.Skip));
        }
      };
      let currBound = this.decodeBound(query2);
      let mode = decodeVarInt(query2);
      let lower = prevIndex;
      let upper = this.storage.findLowerBound(prevIndex, storageSize, currBound);
      if (mode === Mode.Skip) {
        skip = true;
      } else if (mode === Mode.Fingerprint) {
        let theirFingerprint = getBytes(query2, FINGERPRINT_SIZE);
        let ourFingerprint = this.storage.fingerprint(lower, upper);
        if (compareUint8Array(theirFingerprint, ourFingerprint) !== 0) {
          doSkip();
          this.splitRange(lower, upper, currBound, o);
        } else {
          skip = true;
        }
      } else if (mode === Mode.IdList) {
        let numIds = decodeVarInt(query2);
        let theirElems = {};
        for (let i2 = 0; i2 < numIds; i2++) {
          let e = getBytes(query2, ID_SIZE);
          theirElems[bytesToHex$2(e)] = e;
        }
        skip = true;
        this.storage.iterate(lower, upper, (item) => {
          let k = item.id;
          const id = bytesToHex$2(k);
          if (!theirElems[id]) {
            onhave?.(id);
          } else {
            delete theirElems[bytesToHex$2(k)];
          }
          return true;
        });
        if (onneed) {
          for (let v of Object.values(theirElems)) {
            onneed(bytesToHex$2(v));
          }
        }
      } else {
        throw Error("unexpected mode");
      }
      if (this.exceededFrameSizeLimit(fullOutput.length + o.length)) {
        let remainingFingerprint = this.storage.fingerprint(upper, storageSize);
        fullOutput.extend(this.encodeBound(this._bound(Number.MAX_VALUE)));
        fullOutput.extend(encodeVarInt(Mode.Fingerprint));
        fullOutput.extend(remainingFingerprint);
        break;
      } else {
        fullOutput.extend(o);
      }
      prevIndex = upper;
      prevBound = currBound;
    }
    return fullOutput.length === 1 ? null : bytesToHex$2(fullOutput.unwrap());
  }
  splitRange(lower, upper, upperBound, o) {
    let numElems = upper - lower;
    let buckets = 16;
    if (numElems < buckets * 2) {
      o.extend(this.encodeBound(upperBound));
      o.extend(encodeVarInt(Mode.IdList));
      o.extend(encodeVarInt(numElems));
      this.storage.iterate(lower, upper, (item) => {
        o.extend(item.id);
        return true;
      });
    } else {
      let itemsPerBucket = Math.floor(numElems / buckets);
      let bucketsWithExtra = numElems % buckets;
      let curr = lower;
      for (let i2 = 0; i2 < buckets; i2++) {
        let bucketSize = itemsPerBucket + (i2 < bucketsWithExtra ? 1 : 0);
        let ourFingerprint = this.storage.fingerprint(curr, curr + bucketSize);
        curr += bucketSize;
        let nextBound;
        if (curr === upper) {
          nextBound = upperBound;
        } else {
          let prevItem;
          let currItem;
          this.storage.iterate(curr - 1, curr + 1, (item, index) => {
            if (index === curr - 1)
              prevItem = item;
            else
              currItem = item;
            return true;
          });
          nextBound = this.getMinimalBound(prevItem, currItem);
        }
        o.extend(this.encodeBound(nextBound));
        o.extend(encodeVarInt(Mode.Fingerprint));
        o.extend(ourFingerprint);
      }
    }
  }
  exceededFrameSizeLimit(n) {
    return n > this.frameSizeLimit - 200;
  }
  decodeTimestampIn(encoded) {
    let timestamp = decodeVarInt(encoded);
    timestamp = timestamp === 0 ? Number.MAX_VALUE : timestamp - 1;
    if (this.lastTimestampIn === Number.MAX_VALUE || timestamp === Number.MAX_VALUE) {
      this.lastTimestampIn = Number.MAX_VALUE;
      return Number.MAX_VALUE;
    }
    timestamp += this.lastTimestampIn;
    this.lastTimestampIn = timestamp;
    return timestamp;
  }
  decodeBound(encoded) {
    let timestamp = this.decodeTimestampIn(encoded);
    let len = decodeVarInt(encoded);
    if (len > ID_SIZE)
      throw Error("bound key too long");
    let id = getBytes(encoded, len);
    return { timestamp, id };
  }
  encodeTimestampOut(timestamp) {
    if (timestamp === Number.MAX_VALUE) {
      this.lastTimestampOut = Number.MAX_VALUE;
      return encodeVarInt(0);
    }
    let temp = timestamp;
    timestamp -= this.lastTimestampOut;
    this.lastTimestampOut = temp;
    return encodeVarInt(timestamp + 1);
  }
  encodeBound(key) {
    let output = new WrappedBuffer();
    output.extend(this.encodeTimestampOut(key.timestamp));
    output.extend(encodeVarInt(key.id.length));
    output.extend(key.id);
    return output;
  }
  getMinimalBound(prev, curr) {
    if (curr.timestamp !== prev.timestamp) {
      return this._bound(curr.timestamp);
    } else {
      let sharedPrefixBytes = 0;
      let currKey = curr.id;
      let prevKey = prev.id;
      for (let i2 = 0; i2 < ID_SIZE; i2++) {
        if (currKey[i2] !== prevKey[i2])
          break;
        sharedPrefixBytes++;
      }
      return this._bound(curr.timestamp, curr.id.subarray(0, sharedPrefixBytes + 1));
    }
  }
};
function compareUint8Array(a, b) {
  for (let i2 = 0; i2 < a.byteLength; i2++) {
    if (a[i2] < b[i2])
      return -1;
    if (a[i2] > b[i2])
      return 1;
  }
  if (a.byteLength > b.byteLength)
    return 1;
  if (a.byteLength < b.byteLength)
    return -1;
  return 0;
}
function itemCompare(a, b) {
  if (a.timestamp === b.timestamp) {
    return compareUint8Array(a.id, b.id);
  }
  return a.timestamp - b.timestamp;
}
var NegentropySync = class {
  constructor(relay, storage2, filter, params = {}) {
    __publicField(this, "relay");
    __publicField(this, "storage");
    __publicField(this, "neg");
    __publicField(this, "filter");
    __publicField(this, "subscription");
    __publicField(this, "onhave");
    __publicField(this, "onneed");
    this.relay = relay;
    this.storage = storage2;
    this.neg = new Negentropy(storage2);
    this.onhave = params.onhave;
    this.onneed = params.onneed;
    this.filter = filter;
    this.subscription = this.relay.prepareSubscription([{}], { label: params.label || "negentropy" });
    this.subscription.oncustom = (data) => {
      switch (data[0]) {
        case "NEG-MSG": {
          if (data.length < 3) {
            console.warn(`got invalid NEG-MSG from ${this.relay.url}: ${data}`);
          }
          try {
            const response = this.neg.reconcile(data[2], this.onhave, this.onneed);
            if (response) {
              this.relay.send(`["NEG-MSG", "${this.subscription.id}", "${response}"]`);
            } else {
              this.close();
              params.onclose?.();
            }
          } catch (error) {
            console.error("negentropy reconcile error:", error);
            params?.onclose?.(`reconcile error: ${error}`);
          }
          break;
        }
        case "NEG-CLOSE": {
          const reason = data[2];
          console.warn("negentropy error:", reason);
          params.onclose?.(reason);
          break;
        }
        case "NEG-ERR": {
          params.onclose?.();
        }
      }
    };
  }
  async start() {
    const initMsg = this.neg.initiate();
    this.relay.send(`["NEG-OPEN","${this.subscription.id}",${JSON.stringify(this.filter)},"${initMsg}"]`);
  }
  close() {
    this.relay.send(`["NEG-CLOSE","${this.subscription.id}"]`);
    this.subscription.close();
  }
};
var nip98_exports = {};
__export(nip98_exports, {
  getToken: () => getToken,
  hashPayload: () => hashPayload,
  unpackEventFromToken: () => unpackEventFromToken,
  validateEvent: () => validateEvent2,
  validateEventKind: () => validateEventKind,
  validateEventMethodTag: () => validateEventMethodTag,
  validateEventPayloadTag: () => validateEventPayloadTag,
  validateEventTimestamp: () => validateEventTimestamp,
  validateEventUrlTag: () => validateEventUrlTag,
  validateToken: () => validateToken
});
var _authorizationScheme = "Nostr ";
async function getToken(loginUrl, httpMethod, sign, includeAuthorizationScheme = false, payload) {
  const event = {
    kind: HTTPAuth,
    tags: [
      ["u", loginUrl],
      ["method", httpMethod]
    ],
    created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
    content: ""
  };
  if (payload) {
    event.tags.push(["payload", hashPayload(payload)]);
  }
  const signedEvent = await sign(event);
  const authorizationScheme = includeAuthorizationScheme ? _authorizationScheme : "";
  return authorizationScheme + base64.encode(utf8Encoder.encode(JSON.stringify(signedEvent)));
}
async function validateToken(token, url, method) {
  const event = await unpackEventFromToken(token).catch((error) => {
    throw error;
  });
  const valid = await validateEvent2(event, url, method).catch((error) => {
    throw error;
  });
  return valid;
}
async function unpackEventFromToken(token) {
  if (!token) {
    throw new Error("Missing token");
  }
  token = token.replace(_authorizationScheme, "");
  const eventB64 = utf8Decoder.decode(base64.decode(token));
  if (!eventB64 || eventB64.length === 0 || !eventB64.startsWith("{")) {
    throw new Error("Invalid token");
  }
  const event = JSON.parse(eventB64);
  return event;
}
function validateEventTimestamp(event) {
  if (!event.created_at) {
    return false;
  }
  return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) - event.created_at < 60;
}
function validateEventKind(event) {
  return event.kind === HTTPAuth;
}
function validateEventUrlTag(event, url) {
  const urlTag = event.tags.find((t) => t[0] === "u");
  if (!urlTag) {
    return false;
  }
  return urlTag.length > 0 && urlTag[1] === url;
}
function validateEventMethodTag(event, method) {
  const methodTag = event.tags.find((t) => t[0] === "method");
  if (!methodTag) {
    return false;
  }
  return methodTag.length > 0 && methodTag[1].toLowerCase() === method.toLowerCase();
}
function hashPayload(payload) {
  const hash = sha256(utf8Encoder.encode(JSON.stringify(payload)));
  return bytesToHex$2(hash);
}
function validateEventPayloadTag(event, payload) {
  const payloadTag = event.tags.find((t) => t[0] === "payload");
  if (!payloadTag) {
    return false;
  }
  const payloadHash = hashPayload(payload);
  return payloadTag.length > 0 && payloadTag[1] === payloadHash;
}
async function validateEvent2(event, url, method, body) {
  if (!verifyEvent(event)) {
    throw new Error("Invalid nostr event, signature invalid");
  }
  if (!validateEventKind(event)) {
    throw new Error("Invalid nostr event, kind invalid");
  }
  if (!validateEventTimestamp(event)) {
    throw new Error("Invalid nostr event, created_at timestamp invalid");
  }
  if (!validateEventUrlTag(event, url)) {
    throw new Error("Invalid nostr event, url tag invalid");
  }
  if (!validateEventMethodTag(event, method)) {
    throw new Error("Invalid nostr event, method tag invalid");
  }
  if (Boolean(body) && typeof body === "object" && Object.keys(body).length > 0) {
    if (!validateEventPayloadTag(event, body)) {
      throw new Error("Invalid nostr event, payload tag does not match request body hash");
    }
  }
  return true;
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u8a = (a) => a instanceof Uint8Array;
const u32$1 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
const isLE$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE$1)
  throw new Error("Non little-endian hardware is not supported");
const hexes$2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
function bytesToHex$1(bytes) {
  if (!u8a(bytes))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i2 = 0; i2 < bytes.length; i2++) {
    hex += hexes$2[bytes[i2]];
  }
  return hex;
}
function hexToBytes$2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const len = hex.length;
  if (len % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + len);
  const array = new Uint8Array(len / 2);
  for (let i2 = 0; i2 < array.length; i2++) {
    const j = i2 * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i2] = byte;
  }
  return array;
}
function utf8ToBytes$1(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes$4(data) {
  if (typeof data === "string")
    data = utf8ToBytes$1(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
let Hash$1 = class Hash {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor$1(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes$4(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
const generateInviteCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
const createSquad = async (user, squadName, carnivalId) => {
  if (!user) throw new Error("User not authenticated");
  const inviteCode = generateInviteCode();
  const sk = generateSecretKey();
  const squadData = {
    name: squadName,
    leaderId: user.uid,
    leaderName: user.displayName || user.email,
    members: [user.uid],
    // Store minimal details for UI (avatars etc)
    memberDetails: {
      [user.uid]: {
        name: user.displayName || user.email,
        role: "leader",
        photoURL: user.photoURL || null,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    },
    carnivalId,
    inviteCode,
    createdAt: serverTimestamp(),
    sharedItinerary: [],
    // Array of events
    // Decentralized Messaging: Unique Nostr keypair for this squad
    nostrPrivKey: bytesToHex$1(sk),
    nostrPubKey: getPublicKey(sk)
  };
  console.log("Attempting to create squad doc...", squadData);
  const squadRef = await addDoc(collection(db, "squads"), squadData);
  console.log("Squad doc created with ID:", squadRef.id);
  const userRef = doc(db, "users", user.uid);
  console.log("Updating user profile for squad:", user.uid);
  await setDoc(userRef, {
    currentSquadId: squadRef.id
  }, { merge: true });
  console.log("User profile updated.");
  return { id: squadRef.id, ...squadData };
};
const joinSquadByCode = async (user, inviteCode) => {
  console.log("joinSquadByCode started", { uid: user?.uid, inviteCode });
  if (!user) throw new Error("Must be logged in");
  const squadsRef = collection(db, "squads");
  const q = query(squadsRef, where("inviteCode", "==", inviteCode.toUpperCase()));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error("Invalid Squad Code");
  }
  const squadDoc = querySnapshot.docs[0];
  const squadId = squadDoc.id;
  const squadData = squadDoc.data();
  console.log("Squad found:", { squadId, squadData });
  const squadRef = doc(db, "squads", squadId);
  const userName = user.displayName || user.email || "Unknown User";
  console.log("Adding user to squad:", userName);
  if (!squadData.members || !squadData.members.includes(user.uid)) {
    await updateDoc(squadRef, {
      members: arrayUnion(user.uid),
      [`memberDetails.${user.uid}`]: {
        name: userName,
        role: "member",
        photoURL: user.photoURL || null,
        joinedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
    console.log("Squad doc updated");
  } else {
    console.log("User already in squad (skipping array update)");
  }
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    currentSquadId: squadId
  }, { merge: true });
  console.log("User profile updated with squadId:", squadId);
  return { id: squadId, ...squadData };
};
const leaveSquad = async (user, squadId) => {
  if (!user || !squadId) return;
  const squadRef = doc(db, "squads", squadId);
  const userRef = doc(db, "users", user.uid);
  await updateDoc(squadRef, {
    members: arrayRemove(user.uid)
    // We intentionally leave memberDetails history or clean it up? 
    // Keeping it for history is safer for now.
  });
  await updateDoc(userRef, {
    currentSquadId: null
    // or deleteField()
  });
};
const regenerateInviteCode = async (leaderUid, squadId) => {
  if (!leaderUid || !squadId) {
    throw new Error("Missing required parameters");
  }
  const squadRef = doc(db, "squads", squadId);
  const squadSnap = await getDoc(squadRef);
  if (!squadSnap.exists()) {
    throw new Error("Squad not found");
  }
  const squadData = squadSnap.data();
  if (squadData.leaderId !== leaderUid) {
    throw new Error("Only the squad leader can regenerate the invite code");
  }
  const newCode = generateInviteCode();
  await updateDoc(squadRef, {
    inviteCode: newCode
  });
  console.log(`New invite code generated for squad ${squadId}: ${newCode}`);
  return newCode;
};
const getUserSquads = async (userId) => {
  if (!userId) throw new Error("User ID required");
  const squadsRef = collection(db, "squads");
  const q = query(squadsRef, where("members", "array-contains", userId));
  const querySnapshot = await getDocs(q);
  const squads = [];
  querySnapshot.forEach((doc2) => {
    const data = doc2.data();
    squads.push({
      id: doc2.id,
      name: data.name || "Unnamed Squad",
      carnivalId: data.carnivalId,
      memberCount: data.members?.length || 0,
      isLeader: data.leaderId === userId,
      inviteCode: data.inviteCode
    });
  });
  return squads;
};
const switchActiveSquad = async (userId, squadId) => {
  if (!userId) throw new Error("User ID required");
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    currentSquadId: squadId
  }, { merge: true });
};
const startLiveStream = async (squadId, userId, roomId) => {
  if (!squadId || !roomId) throw new Error("Squad ID and Room ID required");
  const squadRef = doc(db, "squads", squadId);
  await updateDoc(squadRef, {
    liveStream: {
      roomId,
      hostId: userId,
      startedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  });
  console.log(`Live stream started for squad ${squadId}: ${roomId}`);
  return { roomId };
};
const endLiveStream = async (squadId, userId) => {
  if (!squadId) throw new Error("Squad ID required");
  const squadRef = doc(db, "squads", squadId);
  const squadSnap = await getDoc(squadRef);
  if (squadSnap.exists()) {
    const data = squadSnap.data();
    if (data.liveStream?.hostId === userId) {
      await updateDoc(squadRef, {
        liveStream: deleteField()
      });
      console.log(`Live stream ended for squad ${squadId}`);
    }
  }
};
const subscribeToLiveStream = (squadId, callback) => {
  if (!squadId) {
    callback(null);
    return () => {
    };
  }
  const squadRef = doc(db, "squads", squadId);
  return onSnapshot(squadRef, (doc2) => {
    if (doc2.exists()) {
      const data = doc2.data();
      callback(data.liveStream || null);
    } else {
      callback(null);
    }
  });
};
const AffiliateContext = reactExports.createContext({ affiliateRef: null });
const STORAGE_KEY = "carnival_affiliate_ref";
const STORAGE_TIMESTAMP_KEY = "carnival_affiliate_ref_ts";
const ATTRIBUTION_WINDOW_MS = 30 * 24 * 60 * 60 * 1e3;
function useAffiliate() {
  return reactExports.useContext(AffiliateContext);
}
function AffiliateProvider({ children }) {
  const [affiliateRef, setAffiliateRef] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get("ref");
    if (urlRef && urlRef.trim()) {
      const code = urlRef.trim().toUpperCase();
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
      setAffiliateRef(code);
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.toString());
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedTs = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
    if (stored && storedTs) {
      const elapsed = Date.now() - parseInt(storedTs, 10);
      if (elapsed < ATTRIBUTION_WINDOW_MS) {
        setAffiliateRef(stored);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
      }
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateContext.Provider, { value: { affiliateRef }, children });
}
function AndroidBetaPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-900 text-white flex flex-col font-sans selection:bg-purple-500 selection:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[120px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-gray-700/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🎭" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500", children: "Carnival Planner: Android Beta Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed", children: "Bypass the app store limits. Download the official, uncensored native app directly to your device." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-16 w-full flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "/CarnivalPlanner.apk",
          download: "CarnivalPlanner.apk",
          className: "group relative flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-bold text-xl shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-105 active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download Android APK" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-8 text-center text-white/90", children: "Frictionless Installation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 bg-gray-700 text-white font-bold text-xs px-3 py-1 rounded-bl-xl opacity-80", children: "STEP 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-4", children: "📥" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Download & Open" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 leading-relaxed text-sm", children: [
              "Tap the download button above. Once finished, open your file manager or notification panel and tap ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "CarnivalPlanner.apk" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 bg-gray-700 text-white font-bold text-xs px-3 py-1 rounded-bl-xl opacity-80", children: "STEP 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-4", children: "⚙️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3", children: "Allow Unknown Sources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 leading-relaxed text-sm", children: [
              "If your phone blocks the installation, tap ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Settings" }),
              ' on the popup and toggle on "Allow from this source." Hit the back button and tap ',
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Install" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/20 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden transform md:-translate-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 bg-amber-600 text-white font-bold text-xs px-3 py-1 rounded-bl-xl", children: "CRUCIAL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-4 text-amber-500", children: "🛡️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-amber-400 mb-3", children: "Bypass Beta Warning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300 leading-relaxed text-sm", children: [
              'Because we are distributing this Beta outside of the Google Play Store, Google Play Protect may show a red "Unsafe App" warning. ',
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: 'Do not click "Got it."' }),
              " Instead, tap the small arrow that says ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-400 border-b border-amber-400/50 pb-0.5", children: '"More details"' }),
              ", then tap ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Install anyway."' })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const COUNTRY_CONFIGS = {
  trinidad: {
    name: "Trinidad",
    displayName: "Trinidad Carnival",
    flag: "🇹🇹",
    welcome: "👋 Welcome to Trinidad! I'm your local Carnival Concierge. Ask me anything about fete locations, transport, costume pickup, or the best doubles spots!",
    keywords: ["doubles", "shark", "maracas", "curepe", "savannah", "woodbrook"],
    knowledge: {
      fetes: "Trinidad Carnival has legendary fetes! Here are the top ones for your schedule:\n\n1. **Soca Brainwash** (Saturdays, absolute staple) 🍹\n2. **AM Bush** (Saturdays, dirty mas/paint & powder) 🎨\n3. **Phuket** (Friday, ultra-premium all-inclusive) 🍾\n4. **Soaka Street Festival** (Sunday, high-energy rhythm & iron) 🥁\n\n*Pro-tip: Buy tickets early as they sell out fast on committee sites!*",
      food: "Trinidad's street food is world-famous. You must try:\n\n1. **Doubles:** Two baras (flat fried dough) filled with channa (chickpeas). Check out *Sauce Doubles* in Curepe or the stalls around the Savannah! 🌽\n2. **Bake & Shark:** Crispy fried shark meat in a fried bake, loaded with garlic sauce, chadon beni, and tamarind. Head to *Maracas Bay* for the original! 🦈\n3. **Corn Soup:** Thick, spicy split pea soup with corn, dumplings, and provisions. Best enjoyed hot after a late-night fete near the Savannah. 🥣",
      transport: "Getting around during Carnival can be hectic. Here are safety and transit tips:\n\n1. **Rideshare:** Use local rideshare apps like **TT RideShare** or **Travelr**. They are safer and have tracked fares. 🚗\n2. **Private Drivers:** For squad groups, it is highly recommended to pre-book a registered driver for late-night fete returns. 🤝\n3. **Red Band Maxi Taxis:** Cheap and routes run along the Eastern Main Road, but can get extremely crowded during peak road times. 🚌\n\n*Safety note: Never walk alone at night; always travel with your squad!*",
      costumes: "Costume distribution guidelines:\n\n1. **Tribe / Bliss / Lost Tribe:** Collection takes place at the **Queen's Park Savannah** distribution center. 🎭\n2. **What to bring:** You *must* present your costume distribution slip, the original credit card used for payment, and your national ID/Passport. 🎫\n3. **Pick-up by proxy:** If someone else is collecting for you, write an authorization letter and provide a copy of your ID. 📝",
      safety: "Stay safe on the road:\n\n1. **Hydration:** The Caribbean sun is intense. Drink coconut water and carry a reusable water bottle. 💧\n2. **Valuables:** Keep your phone in a secure pouch/fanny pack under your costume. Avoid wearing expensive jewelry. 🔒\n3. **Squad Sync:** Stay close to your band's security fence. Use the app's **Road Mode SOS** feature if you get separated from your squad! 🚨"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "Tell me about fetes tonight" },
      { label: "🌽 Doubles & Food", prompt: "Where can I find the best doubles?" },
      { label: "🚗 Transit Tips", prompt: "Tips for transport and safety" },
      { label: "🎭 Costume Info", prompt: "Costume pickup distribution guidelines" }
    ]
  },
  jamaica: {
    name: "Jamaica",
    displayName: "Jamaica Carnival",
    flag: "🇯🇲",
    welcome: "👋 Welcome to Jamaica! I'm your local Jamaica Carnival Concierge. Ask me anything about fete locations, transport, costume pickup, or where to get the best jerk chicken!",
    keywords: ["jerk", "kingston", "xodus", "yard mas", "genxs", "constant spring"],
    knowledge: {
      fetes: "Jamaica Carnival has incredible energy! Some must-attend events are:\n\n1. **Sunrise Breakfast Party** (A major highlight of Carnival week) 🍳\n2. **Frenchmen** (Ultra-premium event, incredible vibe) 🍾\n3. **A.M.B.U.S.H. Jamaica** (High-energy J'ouvert) 🎨\n4. **PM Fete** (Great vibes, late night) 🍹",
      food: "Jamaica's culinary scene is outstanding. Make sure to try:\n\n1. **Jerk Chicken/Pork:** Spiced and smoked over pimento wood. Best from roadside jerk pan drums in Kingston! 🍗\n2. **Ackee & Saltfish:** Jamaica's national dish, savory and delicious, served with fried dumplings or festival. 🥟\n3. **Devon House Ice Cream:** Grab a scoop of local flavors like Gravenstein Mango or Rum & Raisin in Kingston. 🍦",
      transport: "Transportation tips for Kingston during Carnival:\n\n1. **Registered Taxis:** Look for official **red plate** taxis for safety. 🚗\n2. **Private Shuttles:** Pre-booking a private driver/shuttle for your squad is highly recommended for late-night fete runs. 🚐\n3. **Rideshares:** Use reputable rideshare services locally if available. 📱",
      costumes: "Jamaica Costume Collection info:\n\n1. **Bands:** Xodus, GenXS, and Yard Mas are the top bands. 🎭\n2. **Mas Camps:** Collections happen at the respective mas camps/distribution sites in Kingston. 🏢\n3. **What to bring:** Bring your printed receipt, the purchasing credit card, and a valid government-issued ID. 🎫",
      safety: "Road safety and health:\n\n1. **Squad Coordination:** Kingston crowds are large. Agree on meet-up spots and keep your squad sync active. 👥\n2. **Stay Hydrated:** Drink plenty of water and sports drinks. 💧\n3. **Valuables:** Carry cash and phone in a secure under-costume pouch. Avoid flashing large amounts of cash. 🔒"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "Tell me about Jamaica Carnival fetes" },
      { label: "🍗 Jerk & Food", prompt: "Where are the best spots for jerk chicken?" },
      { label: "🚗 Transport", prompt: "How do I safely get around Kingston?" },
      { label: "🎭 Costume Pickup", prompt: "Where do I pick up GenXS or Xodus costumes?" }
    ]
  },
  stlucia: {
    name: "St. Lucia",
    displayName: "St. Lucia Carnival",
    flag: "🇱🇨",
    welcome: "👋 Welcome to Saint Lucia! I'm your St. Lucia Carnival Concierge. Ask me about Remedy, beach fetes, transport, costume collection, or local food like green fig and saltfish!",
    keywords: ["gros islet", "remedy", "just 4 fun", "xuvo", "legends", "rodney bay", "castries"],
    knowledge: {
      fetes: "St. Lucia Carnival features breathtaking scenic fetes! Key events include:\n\n1. **Remedy** (Famous beach fete/coolers allowed) 🏖️\n2. **Mess** (Paint, powder, mud J'ouvert) 🎨\n3. **Indulgence** (Scenic breakfast fete) 🍳\n4. **Brazen** (High energy party) 🍹",
      food: "Taste the unique Saint Lucian flavors:\n\n1. **Green Fig & Saltfish:** St. Lucia's national dish made with green bananas and salted codfish. 🍌\n2. **Bouillon:** A hearty local stew with meat, dumplings, and ground provisions. 🍲\n3. **Fresh Seafood:** Head to the **Gros Islet Friday Night Street Party** or Anse La Raye for delicious grilled fish! 🐟",
      transport: "Transit tips around Rodney Bay and Castries:\n\n1. **Authorized Taxis:** Use taxis with **green license plates** (official tourist transport). 🚕\n2. **Minibuses:** Minibuses (like Route 1A running Castries to Gros Islet) are affordable, but can be crowded. 🚌\n3. **Squad Drivers:** Pre-booking a private driver for late-night fete returns is safest. 🤝",
      costumes: "St. Lucia Costume Pick-up details:\n\n1. **Bands:** Just 4 Fun, Legends, and Xuvo Mas. 🎭\n2. **Collection:** Done at the band houses or designated hotel conference rooms in Rodney Bay. 🏢\n3. **Bring:** Your collection slip, ID, and the original payment card. 🎫",
      safety: "Road safety guidelines:\n\n1. **Heat Warning:** Saint Lucia is extremely humid. Drink local piton water or coconut water. 💧\n2. **Gros Islet Street Party:** Keep valuables zipped in front pockets. Stay with your squad. 🚨\n3. **Road March:** Stay inside the band security lines on the highway. 🚧"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "What are the main St. Lucia Carnival fetes?" },
      { label: "🍌 Fig & Saltfish", prompt: "Where can I try green fig and saltfish?" },
      { label: "🚗 Green Plates", prompt: "How do I hire a green plate taxi?" },
      { label: "🎭 Band Pickup", prompt: "How does Just 4 Fun costume pickup work?" }
    ]
  },
  barbados: {
    name: "Barbados",
    displayName: "Crop Over (Barbados)",
    flag: "🇧🇧",
    welcome: "👋 Welcome to Barbados! I'm your Crop Over Concierge. Ask me about the best beach fetes, Cohobblopot, costume pickup, or local delicacies like flying fish and cou-cou!",
    keywords: ["crop over", "kadooment", "foreday", "bridgetown", "oistins", "spring garden", "flying fish"],
    knowledge: {
      fetes: "Crop Over is the sweet summer festival! Must-attend events include:\n\n1. **Cohobblopot** (Huge stage show with masquerade and live music) 🎭\n2. **Foreday Morning Jam** (Mud, paint, cocoa, late-night J'ouvert jump) 🎨\n3. **Lifted / Mimosa** (Premium all-inclusive breakfast fetes) 🍳\n4. **Scorch Crop Over** (High energy fete) 🍹",
      food: "Barbados local eats are top tier:\n\n1. **Flying Fish & Cou-Cou:** The national dish—steamed flying fish in spicy gravy served with cornmeal and okra. 🐟\n2. **Fish Cakes:** Spicy, deep-fried saltfish batter. Get them hot from **Oistins Fish Fry** on Friday night! 🧆\n3. **Macaroni Pie:** Bajan baked macaroni pie is cheesy and packed with flavor. 🥧",
      transport: "Getting around Barbados:\n\n1. **ZR Vans:** Small white vans with maroon stripes (Route 11 for South Coast) are fast and cheap. 🚐\n2. **Z-Plate Taxis:** Official registered taxis have 'Z' on their license plates. 🚕\n3. **Yellow Buses:** Loud, fun, local transport buses. 🚌",
      costumes: "Grand Kadooment Costume distribution:\n\n1. **Bands:** Aura, Zulu, Baje International, Blue Box Cart. 🎭\n2. **Showrooms:** Collections happen at the bands' mas camps or showrooms around Bridgetown. 🏢\n3. **Documents:** Passport/ID, receipt, and payment verification are required. 🎫",
      safety: "Road safety and health:\n\n1. **Grand Kadooment Day:** The march goes down the Mighty Grynner Highway. Hydration is vital! 💧\n2. **Sun Protection:** The Bajan sun is intense. Use high-SPF sunblock. ☀️\n3. **Valuables:** Carry a secure fanny pack or neck pouch. Avoid wearing expensive jewelry. 🔒"
    },
    chips: [
      { label: "🎟️ Crop Over Fetes", prompt: "Tell me about Cohobblopot and Foreday Morning" },
      { label: "🐟 Flying Fish", prompt: "Where can I try flying fish and fish cakes?" },
      { label: "🚐 ZR Vans & Transit", prompt: "How do ZR vans work in Barbados?" },
      { label: "🎭 Costume Pickup", prompt: "Where do I pick up my Kadooment costume?" }
    ]
  },
  tobago: {
    name: "Tobago",
    displayName: "Tobago Carnival",
    flag: "🇹🇹",
    welcome: "👋 Welcome to Tobago! I'm your Tobago Carnival Concierge. Ask me about Fog Angels J'ouvert & Mas packages, Pigeon Point fetes, transport, or where to get local crab & dumpling!",
    keywords: ["fog angels", "pigeon point", "scarborough", "bon accord", "crab and dumpling", "tobago", "store bay"],
    knowledge: {
      fetes: "Tobago Carnival has wonderful beach and road events! Top ones include:\n\n1. **Wave & Rave Boat Party** (Thursday before parade) ⛵\n2. **Fog Angels J'ouvert** (Paint, mud & powder, Friday morning) 🎨\n3. **Beach to Beach Parade** (Scenic Scarborough to Pigeon Point road march) 🏖️\n4. **Pretty Mas Parade** (Sunday showpiece) 🎭",
      food: "Tobago's food is delicious. You must try:\n\n1. **Curry Crab & Dumpling:** The absolute signature dish of Tobago! Check out the food huts at *Store Bay* or *Pigeon Point*. 🦀\n2. **Benne Balls:** Sweet crunchy treats made of sesame seeds (benne) and brown sugar. 🧆\n3. **Dirt Oven Bread:** Traditional baking in clay dirt ovens, incredibly soft oven fresh. 🍞",
      transport: "Transit tips for Tobago:\n\n1. **Authorized Taxis:** Look for license plates starting with **H** (hired). Always confirm the fare before departing Store Bay or Crown Point. 🚕\n2. **Car Rentals:** Highly recommended for squads wanting to explore Parlatuvier or Speyside. 🚗\n3. **Private Drivers:** Pre-book a registered taxi for late-night fete returns. 🤝",
      costumes: "Tobago Costume collection (e.g., Fog Angels):\n\n1. **Mas Camp:** Collection takes place at **Chill Out Bar, Bon Accord, Tobago**. 🏢\n2. **What to bring:** Bring your registration slip, ID, and original credit card. 🎫\n3. **Double Play:** If you registered for both J'ouvert and Pretty Mas, ensure you collect both packages! 🎭",
      safety: "Tobago safety tips:\n\n1. **Sun & Surf:** Tobago is sunny. Wear sunblock and stay hydrated. ☀️\n2. **Store Bay / Crown Point:** Keep valuables secure when swimming. 🔒\n3. **Road March:** Stick close to your band security fence on the Milford Road. 🚧"
    },
    chips: [
      { label: "🎟️ Tobago Fetes", prompt: "Tell me about Tobago Carnival events" },
      { label: "🦀 Crab & Dumplings", prompt: "Where is the best place for curry crab and dumpling?" },
      { label: "🎭 Fog Angels Info", prompt: "How does Fog Angels costume pickup work?" },
      { label: "🚗 Getting Around", prompt: "What is the best way to get around Tobago?" }
    ]
  },
  default: {
    name: "Carnival",
    displayName: "Carnival",
    flag: "🌴",
    welcome: "👋 Welcome to the Carnival! I'm your local Carnival Concierge. Ask me anything about fete locations, transport, costume pickup, or the best local spots!",
    keywords: ["party", "fete", "mas", "costume", "safe", "food"],
    knowledge: {
      fetes: "Check the **Schedule** tab in your planner! We support listing all popular local fetes, beach party cruises, and J'ouvert jumps. 🎟️",
      food: "Make sure to try local street food, local fruits, and traditional dishes. Ask locals for the highest-rated spots! 🍽️",
      transport: "We recommend using registered taxis, pre-booked private drivers for your squad, or official ridesharing apps. 🚗",
      costumes: "Mas band costume pickup usually requires bringing your ID, payment confirmation, and arriving at the mas camp distribution hub. 🎭",
      safety: "Stay hydrated, use sun protection, keep your phone in a secure pouch, and stay synced with your squad! 🚨"
    },
    chips: [
      { label: "🎟️ Fetes", prompt: "Tell me about the popular events" },
      { label: "🍽️ Local Food", prompt: "What local food should I try?" },
      { label: "🚗 Transport", prompt: "What is the safest way to get around?" },
      { label: "🎭 Costume Pickup", prompt: "What do I need to bring for costume pickup?" }
    ]
  }
};
const getSystemPrompt = (countryId, scrapedEvents) => {
  const cid = countryId;
  const cfg = COUNTRY_CONFIGS[cid] || COUNTRY_CONFIGS.default;
  let scrapedEventsContext = "";
  if (scrapedEvents && scrapedEvents.length > 0) {
    scrapedEventsContext = "\nHere are the actual live events scraped for this carnival:\n" + scrapedEvents.slice(0, 10).map((evt) => `- **${evt.title}** on ${evt.date || evt.date_raw || "TBA"} at ${evt.venue || "TBA"} (Link: ${evt.url})`).join("\n") + "\nUse these real live events to answer questions about what's happening, what events/parties/fetes are scheduled, or what to attend. Provide the ticket links so users can purchase tickets!";
  }
  return `
You are the AI Carnival Concierge, a friendly, local Caribbean helper for the Carnival Planner PWA.
Your goal is to assist masqueraders with questions about ${cfg.displayName} 2026, including:
1. Fete locations and ticket recommendations.
2. Local street food options (e.g. ${cfg.keywords.join(", ")}).
3. Transport, rideshares, and safety.
4. Costume pickup guidelines.
5. Road safety, hydration, and squad coordination.
${scrapedEventsContext}

Guidelines:
- Keep your answers concise, structured, and friendly.
- Use bullet points, bold text, and emojis (e.g. ${cfg.flag}, 🍹, 🍗, 🚗, 🎭) to make answers highly readable on mobile screens.
- Adopt a helpful, welcoming local Caribbean tone (professional but warm).
- If the user asks about locations, mention keywords relevant to ${cfg.name}: ${cfg.keywords.join(", ")}.
`;
};
const getMockResponse = (query2, countryId, scrapedEvents) => {
  const cid = countryId;
  const cfg = COUNTRY_CONFIGS[cid] || COUNTRY_CONFIGS.default;
  const lower = query2.toLowerCase();
  if (lower.includes("fete") || lower.includes("party") || lower.includes("show") || lower.includes("event")) {
    if (scrapedEvents && scrapedEvents.length > 0) {
      let list = scrapedEvents.slice(0, 5).map((evt, idx) => {
        return `${idx + 1}. **${evt.title}** (${evt.date || "TBA"}) - ${evt.venue || "TBA"} 🎟️
   [Purchase Tickets](${evt.url})`;
      }).join("\n\n");
      return `Here are the live events scheduled for ${cfg.displayName}:

${list}

*Check the Schedule tab to add them to your planner!*`;
    }
    return cfg.knowledge.fetes;
  }
  if (lower.includes("food") || lower.includes("eat") || lower.includes("doubles") || lower.includes("shark") || lower.includes("soup") || lower.includes("hungry") || lower.includes("jerk") || lower.includes("fish") || lower.includes("fig") || lower.includes("pie") || lower.includes("crab") || lower.includes("dumpling")) {
    return cfg.knowledge.food;
  }
  if (lower.includes("transport") || lower.includes("taxi") || lower.includes("drive") || lower.includes("ride") || lower.includes("car") || lower.includes("maxi") || lower.includes("zr") || lower.includes("bus")) {
    return cfg.knowledge.transport;
  }
  if (lower.includes("costume") || lower.includes("mas") || lower.includes("band") || lower.includes("pickup") || lower.includes("collect")) {
    return cfg.knowledge.costumes;
  }
  if (lower.includes("safe") || lower.includes("police") || lower.includes("lost") || lower.includes("water") || lower.includes("hydrate")) {
    return cfg.knowledge.safety;
  }
  return `I'm not fully sure about that specific topic, but I can help you with **Fetes**, **Local food**, **Costume pickup**, **Transport**, or **Road Safety** for ${cfg.displayName}! Ask me any of those to get local tips. ${cfg.flag}`;
};
function CarnivalConcierge({ user, isPremium, activeCarnivalId, scrapedEvents }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const countryId = activeCarnivalId || "trinidad";
  const config = COUNTRY_CONFIGS[countryId] || COUNTRY_CONFIGS.default;
  const [messages, setMessages] = reactExports.useState([
    {
      id: "welcome",
      text: config.welcome,
      senderId: "bot",
      senderName: "Concierge",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ]);
  const [inputText, setInputText] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const [aiStatus, setAiStatus] = reactExports.useState("Checking...");
  const chatEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);
  reactExports.useEffect(() => {
    const checkAIStatus = async () => {
      try {
        const res4001 = await fetch("http://localhost:4001/v1/models").catch(() => null);
        if (res4001 && res4001.ok) {
          setAiStatus("Local 7B");
          return;
        }
        const res4000 = await fetch("http://localhost:4000/v1/models").catch(() => null);
        if (res4000 && res4000.ok) {
          setAiStatus("Local 1.5B");
          return;
        }
        setAiStatus("Offline");
      } catch (err) {
        setAiStatus("Offline");
      }
    };
    checkAIStatus();
    const interval = setInterval(checkAIStatus, 3e4);
    return () => clearInterval(interval);
  }, []);
  reactExports.useEffect(() => {
    const currentConfig = COUNTRY_CONFIGS[activeCarnivalId || "trinidad"] || COUNTRY_CONFIGS.default;
    setMessages([
      {
        id: "welcome-" + (activeCarnivalId || "trinidad") + "-" + Date.now(),
        text: currentConfig.welcome,
        senderId: "bot",
        senderName: "Concierge",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
  }, [activeCarnivalId]);
  const fetchAIResponse = async (userMessage, history) => {
    const ports = [4001, 4e3];
    const formattedHistory = history.map((msg) => ({
      role: msg.senderId === "user" ? "user" : "assistant",
      content: msg.text
    }));
    for (const port of ports) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6e4);
        const response = await fetch(`http://localhost:${port}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer dummy"
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            messages: [
              { role: "system", content: getSystemPrompt(countryId, scrapedEvents) },
              ...formattedHistory,
              { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 300
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (response.ok) {
          const data = await response.json();
          if (data?.choices?.[0]?.message?.content) {
            return data.choices[0].message.content;
          }
        }
      } catch (err) {
        console.warn(`Local AI query failed on port ${port}, trying next...`, err);
      }
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockResponse(userMessage, countryId, scrapedEvents));
      }, 1e3);
    });
  };
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    setInputText("");
    const userMsg = {
      id: Date.now().toString(),
      text,
      senderId: "user",
      senderName: user?.displayName || "Me",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);
    try {
      const botResponse = await fetchAIResponse(text, updatedMessages);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        senderId: "bot",
        senderName: "Concierge",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Failed to generate bot response:", err);
    } finally {
      setIsTyping(false);
    }
  };
  const triggerChipPrompt = (promptText) => {
    handleSendMessage(promptText);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-24 z-[60] font-body", children: [
    !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_32px_0_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 glass-btn-primary",
        style: { touchAction: "manipulation" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${aiStatus === "Offline" ? "bg-yellow-500" : "bg-green-500"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0 right-0 w-3.5 h-3.5 rounded-full ${aiStatus === "Offline" ? "bg-yellow-500 animate-ping" : "bg-green-500 animate-ping"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-7 h-7 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[340px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col overflow-hidden animate-slideIn border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] glass-panel text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-display font-bold text-white shadow-md", children: [
            config.flag,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-slate-900" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm tracking-wide", children: "Carnival Concierge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/50 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
              "Active (",
              aiStatus,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsOpen(false),
            className: "p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide", children: [
        messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex flex-col max-w-[82%] ${msg.senderId === "user" ? "ml-auto items-end" : "mr-auto items-start"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 px-1", children: msg.senderName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.senderId === "user" ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-tr-none shadow-md" : "bg-white/10 text-white rounded-tl-none border border-white/5 shadow-sm"}`,
                  children: msg.text
                }
              )
            ]
          },
          msg.id
        )),
        isTyping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start max-w-[80%]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 px-1", children: "Concierge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 rounded-2xl rounded-tl-none bg-white/10 border border-white/5 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-pink-500 animate-bounce", style: { animationDelay: "0ms" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-purple-500 animate-bounce", style: { animationDelay: "150ms" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-orange-500 animate-bounce", style: { animationDelay: "300ms" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-hide select-none", children: config.chips.map((chip, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => triggerChipPrompt(chip.prompt),
          className: `flex-shrink-0 px-3 py-1 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/5 rounded-full text-xs font-medium transition-colors ${idx === 0 ? "text-purple-200" : idx === 1 ? "text-pink-200" : idx === 2 ? "text-yellow-200" : "text-orange-200"}`,
          children: chip.label
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            handleSendMessage();
          },
          className: "p-3 border-t border-white/10 flex gap-2 bg-black/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: inputText,
                onChange: (e) => setInputText(e.target.value),
                placeholder: "Ask about fetes, food, venues...",
                className: "flex-1 px-4 py-2.5 rounded-full text-sm outline-none bg-white/5 border border-white/10 focus:border-pink-500/50 text-white placeholder-white/30 transition-colors"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 glass-btn-primary",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-white transform rotate-90", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const firestoreDocFetcher = async (path) => {
  if (!path) return null;
  const segments = path.split("/");
  const docRef = doc(db, ...segments);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};
function useFirestoreDoc(path, options = {}) {
  return useSWR(
    path ? `firestore:doc:${path}` : null,
    () => firestoreDocFetcher(path),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 3e4,
      // 30s — prevent duplicate requests
      errorRetryCount: 2,
      ...options
    }
  );
}
const LazyFallback = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" }) });
const FeteMap = React.lazy(() => __vitePreload(() => import("./FeteMap-CKmyTWJI.js").then((n) => n.F), true ? __vite__mapDeps([6,2,3,4,7,8,9]) : void 0));
const SquadChat = React.lazy(() => __vitePreload(() => import("./SquadChat-DdCzF4p7.js"), true ? __vite__mapDeps([10,2,3,4,5,1,11,12,13,14,15,16,17]) : void 0));
const MediaVault = React.lazy(() => __vitePreload(() => import("./MediaVault-DSGZWdN8.js"), true ? __vite__mapDeps([18,2,3,4,5,1,19]) : void 0));
const VibesPlayer = React.lazy(() => __vitePreload(() => import("./VibesPlayer-C6PiZcB8.js"), true ? __vite__mapDeps([20,2,3,4,15,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./AdminCleanup-D3SnuILQ.js"), true ? __vite__mapDeps([21,2,3,4,22,13,23,1,5]) : void 0));
const VoiceScheduler = React.lazy(() => __vitePreload(() => import("./VoiceScheduler-DeCTXmlH.js"), true ? __vite__mapDeps([24,2,3,4,25,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./AdManager--nwU2ibm.js"), true ? __vite__mapDeps([26,2,3,4,5,1,17,7,12,27]) : void 0));
React.lazy(() => __vitePreload(() => import("./AdminAnalytics-DXltPh8y.js"), true ? __vite__mapDeps([28,2,3,4,5,1,21,22,13,23,29,30,31,27]) : void 0));
const CostumeDirectory = React.lazy(() => __vitePreload(() => import("./CostumeDirectory-OZqj6e2Z.js"), true ? __vite__mapDeps([32,2,3,4,30,33,1,5]) : void 0));
const AccountSettings = React.lazy(() => __vitePreload(() => import("./AccountSettings-DLJRq6iD.js"), true ? __vite__mapDeps([34,2,3,4,1,5,35,13,14,36,16,37,38,23]) : void 0));
const SocaPassportTab = React.lazy(() => __vitePreload(() => import("./SocaPassportTab-QT8lO47w.js"), true ? __vite__mapDeps([39,2,3,4,40,41,42,43,44,45,46,47,1,48,49,50,51,35,52,53,13,5,54,55,56,57,58,59,60,61,16,29,62,63]) : void 0));
const MasqueraderProfile = React.lazy(() => __vitePreload(() => import("./MasqueraderProfile-BtFVmluT.js"), true ? __vite__mapDeps([64,2,3,4,5,1,65,16,38]) : void 0));
const ProfileEditor = React.lazy(() => __vitePreload(() => import("./ProfileEditor-DkVUIvFX.js"), true ? __vite__mapDeps([66,2,3,4,5,1,65,16,42,13,14,31]) : void 0));
const PromoterDashboard = React.lazy(() => __vitePreload(() => import("./PromoterDashboard-zmQAMWYw.js"), true ? __vite__mapDeps([67,2,3,4,68,7,50,17,52,36,42,1,5]) : void 0));
const AdminDashboard = React.lazy(() => __vitePreload(() => import("./AdminDashboard-DIwhph1X.js"), true ? __vite__mapDeps([69,2,3,4,5,1,28,21,22,13,23,29,30,31,27,26,17,7,12,68,54,35]) : void 0));
const MarketingDashboard = React.lazy(() => __vitePreload(() => import("./MarketingDashboard-Cq91idux.js"), true ? __vite__mapDeps([70,2,3,4,60]) : void 0));
const MarketplacePage = React.lazy(() => __vitePreload(() => import("./MarketplacePage-c8RpAxr0.js"), true ? __vite__mapDeps([71,2,3,4,5,1,30,8,42,33,7,36,19,37,63]) : void 0));
const SocaVoid = React.lazy(() => __vitePreload(() => import("./SocaVoid-Ph-sM69i.js"), true ? __vite__mapDeps([72,2,3,4]) : void 0));
React.lazy(() => __vitePreload(() => import("./Leaderboard-Byhz9krg.js"), true ? __vite__mapDeps([61,2,3,4,41,56,16,29,51,35,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./PassportHome-SJEwmPr3.js").then((n) => n.aL), true ? __vite__mapDeps([40,2,3,4,41,42,43,44,45,46,47,1,48,49,50,51,35,52]) : void 0));
React.lazy(() => __vitePreload(() => import("./StampCollection-Do1gtD5z.js"), true ? __vite__mapDeps([55,2,3,4,56,51,57,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./AchievementList-CYs3imug.js"), true ? __vite__mapDeps([58,2,3,4,56,35,52,13,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./RewardsList-CeuY3eA1.js"), true ? __vite__mapDeps([62,2,3,4,63,42,50,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./PassportCard-BYB5I0mX.js"), true ? __vite__mapDeps([59,2,3,4,60,41,52,13,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./CheckinModal-J1aPPP4K.js"), true ? __vite__mapDeps([53,2,3,4,13,52,50,42,1,5]) : void 0));
React.lazy(() => __vitePreload(() => import("./SquadLiveStream-C8FjuTmo.js"), true ? __vite__mapDeps([11,2,3,4,12,13,14,15,1,5]) : void 0));
const VibeAlert = React.lazy(() => __vitePreload(() => import("./VibeAlert-BOYcadKJ.js"), true ? __vite__mapDeps([73,2,3,4,1,5]) : void 0));
const SquadVoice = React.lazy(() => __vitePreload(() => import("./SquadVoice-fc-YuLJB.js"), true ? __vite__mapDeps([74,2,3,4,5,1,42,25]) : void 0));
const WearableMonitor = React.lazy(() => __vitePreload(() => import("./WearableMonitor-Bxxl17_s.js"), true ? __vite__mapDeps([75,2,3,4,22,57,23,1,5]) : void 0));
const SquadVault = React.lazy(() => __vitePreload(() => import("./SquadVault-BK0sYZdP.js"), true ? __vite__mapDeps([76,2,3,4,5,1]) : void 0));
const appId = "carnival-planner-v1";
const STRIPE_MONTHLY_PRICE_ID = "price_1SanHUJR9xpdRiXijLesRPVt";
const STRIPE_YEARLY_PRICE_ID = "price_1SanMhJR9xpdRiXinv2F9knM";
const POPULAR_EVENTS = {
  trinidad: [
    { title: "Soca Brainwash", note: "The main event. Bring drinks." },
    { title: "AM Bush", note: "J'ouvert style. Wear old clothes." },
    { title: "Phuket", note: "All inclusive." },
    { title: "Soaka Street Festival", note: "Iron park." }
  ],
  stlucia: [
    { title: "Remedy", note: "Beachside." },
    { title: "Mess", note: "Paint and Powder." },
    { title: "Indulgence", note: "Breakfast fete." }
  ],
  default: [
    { title: "Catamaran Cruise", note: "Boat ride." },
    { title: "J'ouvert", note: "Paint and powder." },
    { title: "Monday Mas", note: "On the road." }
  ]
};
function App() {
  const { affiliateRef } = useAffiliate();
  const [user, setUser] = reactExports.useState(null);
  const [isDemoMode, setIsDemoMode] = reactExports.useState(false);
  const isAndroidBetaPage = window.location.pathname === "/android" || window.location.search.includes("android=true");
  const [carnivals, setCarnivals] = reactExports.useState({});
  const [activeCarnivalId, setActiveCarnivalId] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("Budget");
  const [isPremium, setIsPremium] = reactExports.useState(false);
  const [showLanding, setShowLanding] = reactExports.useState(true);
  const [roadMode, setRoadMode] = reactExports.useState(false);
  const [darkMode, setDarkMode] = reactExports.useState(true);
  const [isCheckingOut, setIsCheckingOut] = reactExports.useState(false);
  const [newBudgetName, setNewBudgetName] = reactExports.useState("");
  const [newBudgetCost, setNewBudgetCost] = reactExports.useState("");
  const [newScheduleName, setNewScheduleName] = reactExports.useState("");
  const [newScheduleDate, setNewScheduleDate] = reactExports.useState("");
  const [newScheduleNote, setNewScheduleNote] = reactExports.useState("");
  const [newPackingItem, setNewPackingItem] = reactExports.useState("");
  const [newSquadMember, setNewSquadMember] = reactExports.useState("");
  const [costumeDetails, setCostumeDetails] = reactExports.useState({ band: "", section: "", total: "", paid: "" });
  const [squadShareCode, setSquadShareCode] = reactExports.useState("");
  const [joinCode, setJoinCode] = reactExports.useState("");
  const [squadMembers, setSquadMembers] = reactExports.useState([]);
  const [currentSquad, setCurrentSquad] = reactExports.useState(null);
  const [targetSquadId, setTargetSquadId] = reactExports.useState(null);
  const [isCreatingShare, setIsCreatingShare] = reactExports.useState(false);
  const [isJoiningSquad, setIsJoiningSquad] = reactExports.useState(false);
  const [squadShareError, setSquadShareError] = reactExports.useState("");
  const [squadShareSuccess, setSquadShareSuccess] = reactExports.useState("");
  const [userSquads, setUserSquads] = reactExports.useState([]);
  const [loadingSquads, setLoadingSquads] = reactExports.useState(false);
  const handleTryDemo = async () => {
    const { DEMO_USER, DEMO_CARNIVALS, DEMO_SQUAD } = await __vitePreload(async () => {
      const { DEMO_USER: DEMO_USER2, DEMO_CARNIVALS: DEMO_CARNIVALS2, DEMO_SQUAD: DEMO_SQUAD2 } = await import("./demoData-BhxWo7cj.js");
      return { DEMO_USER: DEMO_USER2, DEMO_CARNIVALS: DEMO_CARNIVALS2, DEMO_SQUAD: DEMO_SQUAD2 };
    }, true ? [] : void 0);
    setIsDemoMode(true);
    setUser(DEMO_USER);
    setCarnivals(DEMO_CARNIVALS);
    setActiveCarnivalId("trinidad");
    setSquadMembers(DEMO_SQUAD);
    setIsPremium(true);
    setShowLanding(false);
    setSharedCarnivalData(DEMO_CARNIVALS.trinidad);
  };
  const handleExitDemo = () => {
    setIsDemoMode(false);
    setUser(null);
    setCarnivals({});
    setActiveCarnivalId(null);
    setSquadMembers([]);
    setIsPremium(false);
    setShowLanding(true);
    setSharedCarnivalData(null);
  };
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "true") {
      handleTryDemo();
    }
  }, []);
  const handleCreateSquad = async () => {
    if (isDemoMode) {
      alert("This feature is simulated in Demo Mode.");
      return;
    }
    if (!user) return;
    setIsCreatingShare(true);
    setSquadShareError("");
    try {
      const squad = await createSquad(user, `${user.displayName || "User"}'s Squad`, activeCarnivalId);
      setCurrentSquad(squad);
      setSquadShareCode(squad.inviteCode);
      setToastMessage("Only Premium users can lead a squad!");
    } catch (error) {
      console.error("Error creating squad:", error);
      setSquadShareError(`Failed: ${error.message}`);
    } finally {
      setIsCreatingShare(false);
    }
  };
  const handleJoinSquad = async () => {
    if (isDemoMode) {
      alert("Joining squads is simulated in Demo Mode.");
      return;
    }
    if (!user || !joinCode) return;
    const cleanCode = joinCode.trim().toUpperCase();
    setIsJoiningSquad(true);
    setSquadShareError("");
    console.log("HandleJoinSquad: Attempting to join with code:", cleanCode);
    try {
      const squad = await joinSquadByCode(user, cleanCode);
      console.log("HandleJoinSquad: Join success. Squad result:", squad);
      if (!squad) {
        console.warn("HandleJoinSquad: No squad object returned, but execution did not throw. Assuming success via listener.");
      }
      setSquadShareSuccess(`Joined Squad!`);
      setJoinCode("");
    } catch (error) {
      console.error("Error joining squad:", error);
      setSquadShareError(error.message || "Invalid code");
    } finally {
      setIsJoiningSquad(false);
    }
  };
  const handleLeaveSquad = async () => {
    if (isDemoMode) {
      if (confirm("Exit Demo Mode?")) handleExitDemo();
      return;
    }
    if (!user || !currentSquad) return;
    if (confirm("Are you sure you want to leave this squad?")) {
      const leavingSquadId = currentSquad.id;
      await leaveSquad(user, leavingSquadId);
      const remainingSquads = userSquads.filter((s) => s.id !== leavingSquadId);
      if (remainingSquads.length > 0) {
        await switchActiveSquad(user.uid, remainingSquads[0].id);
        setToastMessage(`Switched to ${remainingSquads[0].name}`);
      } else {
        setCurrentSquad(null);
        setSquadMembers([]);
      }
      loadUserSquads();
    }
  };
  const handleRemoveMember = async (memberUid, memberName) => {
    if (isDemoMode) {
      alert("Member removal is disabled in Demo Mode.");
      return;
    }
    if (!user || !currentSquad) return;
    if (currentSquad.leaderId !== user.uid) {
      alert("Only the squad leader can remove members.");
      return;
    }
    if (!confirm(`Remove ${memberName} from your squad?`)) return;
    try {
      await removeSquadMember2(user.uid, currentSquad.id, memberUid);
      setToastMessage(`${memberName} has been removed from the squad.`);
      if (confirm(`${memberName} was removed.

Would you like to generate a new invite code?
(This prevents them from rejoining with the old code)`)) {
        const newCode = await regenerateInviteCode(user.uid, currentSquad.id);
        setSquadShareCode(newCode);
        setToastMessage(`New invite code: ${newCode}`);
      }
    } catch (error) {
      console.error("Error removing member:", error);
      alert(`Failed to remove member: ${error.message}`);
    }
  };
  const loadUserSquads = async () => {
    if (!user || isDemoMode) return;
    setLoadingSquads(true);
    try {
      const squads = await getUserSquads(user.uid);
      setUserSquads(squads);
    } catch (err) {
      console.error("Failed to load user squads:", err);
    } finally {
      setLoadingSquads(false);
    }
  };
  const handleSwitchSquad = async (squadId) => {
    if (!user || isDemoMode) return;
    if (squadId === currentSquad?.id) return;
    try {
      await switchActiveSquad(user.uid, squadId);
      setToastMessage("Switched squad!");
    } catch (err) {
      console.error("Failed to switch squad:", err);
      alert("Failed to switch squad: " + err.message);
    }
  };
  const [toastMessage, setToastMessage] = reactExports.useState(null);
  const [notifySquadOnRoadReady, setNotifySquadOnRoadReady] = reactExports.useState(true);
  const [isSendingRoadReadyAlert, setIsSendingRoadReadyAlert] = reactExports.useState(false);
  const [isOnline, setIsOnline] = reactExports.useState(navigator.onLine);
  reactExports.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const [activeLegalPage, setActiveLegalPage] = reactExports.useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = reactExports.useState(() => {
    return !localStorage.getItem("carnival-planner-welcomed");
  });
  const [showHelpGuide, setShowHelpGuide] = reactExports.useState(false);
  const [userProfile, setUserProfile] = reactExports.useState(null);
  const [showProfileEditor, setShowProfileEditor] = reactExports.useState(false);
  const [showEmailAuth, setShowEmailAuth] = reactExports.useState(false);
  const [scrapedEvents, setScrapedEvents] = reactExports.useState([]);
  const [isLoadingScrapedEvents, setIsLoadingScrapedEvents] = reactExports.useState(false);
  const [scrapedEventsLastUpdated, setScrapedEventsLastUpdated] = reactExports.useState(null);
  const [vibeScores, setVibeScores] = reactExports.useState({});
  const [vibeAlert, setVibeAlert] = reactExports.useState(null);
  const carnivalOptions = [
    { id: "stkitts-sugar-mas", name: "St. Kitts (Sugar Mas)", monthIndex: 0 },
    { id: "stcroix", name: "St. Croix Carnival", monthIndex: 0 },
    { id: "trinidad", name: "Trinidad Carnival", monthIndex: 1 },
    { id: "dominica", name: "Dominica (Mas Domnik)", monthIndex: 1 },
    { id: "jamaica", name: "Jamaica Carnival", monthIndex: 3 },
    { id: "tampa", name: "Tampa Bay Carnival", monthIndex: 3 },
    { id: "stmaarten", name: "St. Maarten Carnival", monthIndex: 3 },
    { id: "cayman-batabano", name: "Cayman Batabano", monthIndex: 4 },
    { id: "stthomas", name: "St. Thomas Carnival", monthIndex: 4 },
    { id: "atlanta", name: "Atlanta Caribbean Carnival", monthIndex: 4 },
    { id: "guyana", name: "Guyana Independence", monthIndex: 4 },
    { id: "bahamas", name: "Bahamas Carnival", monthIndex: 5 },
    { id: "bermuda", name: "Bermuda Carnival", monthIndex: 5 },
    { id: "hollywood", name: "Hollywood Carnival", monthIndex: 5 },
    { id: "caymas", name: "Caymas Carnival", monthIndex: 5 },
    { id: "vincymas", name: "St. Vincent (Vincy Mas)", monthIndex: 6 },
    { id: "stlucia", name: "St. Lucia Carnival", monthIndex: 6 },
    { id: "toronto", name: "Toronto (Caribana)", monthIndex: 7 },
    { id: "barbados", name: "Barbados Crop Over", monthIndex: 7 },
    { id: "nevis", name: "Nevis Culturama", monthIndex: 7 },
    { id: "antigua", name: "Antigua Carnival", monthIndex: 7 },
    { id: "grenada", name: "Grenada Spicemas", monthIndex: 7 },
    { id: "ny-labor-day", name: "New York Carnival", monthIndex: 8 },
    { id: "japan", name: "Japan Caribbean", monthIndex: 8 },
    { id: "miami", name: "Miami Carnival", monthIndex: 9 },
    { id: "tobago", name: "Tobago Carnival", monthIndex: 10 }
  ];
  const gradientClasses = [
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-green-400 to-blue-500",
    "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
    "bg-gradient-to-r from-teal-400 to-cyan-500",
    "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500",
    "bg-gradient-to-r from-purple-600 to-indigo-600"
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  reactExports.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  reactExports.useEffect(() => {
    if (!user || isDemoMode) return;
    const loadThemePreference = async () => {
      try {
        const userPrefsRef = doc(db, "users", user.uid, "preferences", "theme");
        const prefSnap = await getDoc(userPrefsRef);
        if (prefSnap.exists()) {
          const data = prefSnap.data();
          if (typeof data.darkMode === "boolean") {
            setDarkMode(data.darkMode);
          }
        }
      } catch (err) {
        console.log("Could not load theme preference:", err);
      }
    };
    loadThemePreference();
  }, [user, isDemoMode]);
  const saveThemePreference = async (isDark) => {
    if (!user || isDemoMode) return;
    try {
      const userPrefsRef = doc(db, "users", user.uid, "preferences", "theme");
      await setDoc(userPrefsRef, { darkMode: isDark, updatedAt: Timestamp.now() }, { merge: true });
    } catch (err) {
      console.log("Could not save theme preference:", err);
    }
  };
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    saveThemePreference(newValue);
  };
  reactExports.useEffect(() => {
    if (isDemoMode) return;
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        console.log("[Analytics] Creating/updating user doc for:", u.uid, u.email);
        try {
          const userDocRef = doc(db, "users", u.uid);
          await setDoc(userDocRef, {
            lastLoginAt: Timestamp.now(),
            email: u.email || null,
            displayName: u.displayName || null
          }, { merge: true });
          console.log("[Analytics] User document updated successfully");
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setDoc(userDocRef, {
                  lastLocation: { lat: latitude, lng: longitude },
                  lastLocationAt: Timestamp.now()
                }, { merge: true }).then(() => console.log("Location saved")).catch((e) => console.error("Loc save error", e));
              },
              (error) => {
                console.log("Geolocation denied/error:", error.message);
              }
            );
          }
          const ensureWalletFn = httpsCallable(getFunctions(app), "ensureWallet");
          ensureWalletFn({}).then((result) => {
            const { walletAddress, isNew } = result.data;
            if (isNew) {
              console.log("[Web3] 🎉 Generated new carnival wallet:", walletAddress);
            } else {
              console.log("[Web3] Wallet exists:", walletAddress);
            }
          }).catch((err) => {
            console.warn("[Web3] Auto-wallet skipped:", err.message);
          });
        } catch (err) {
          console.error("[Analytics] Failed to update user doc:", err.code, err.message);
        }
      }
    });
    return () => unsubscribe();
  }, [isDemoMode]);
  reactExports.useEffect(() => {
    if (!user || isDemoMode) {
      setTargetSquadId(null);
      return;
    }
    const unsubUser = onSnapshot(doc(db, "users", user.uid), (uDoc) => {
      const uData = uDoc.data();
      const newSquadId = uData?.currentSquadId || null;
      if (newSquadId !== targetSquadId) {
        console.log("App: User changed squad to:", newSquadId);
        setTargetSquadId(newSquadId);
      }
    });
    return () => unsubUser();
  }, [user, isDemoMode, targetSquadId]);
  reactExports.useEffect(() => {
    if (user && !isDemoMode) {
      loadUserSquads();
    }
  }, [user, isDemoMode, targetSquadId]);
  reactExports.useEffect(() => {
    if (!user || isDemoMode) return;
    if (!targetSquadId) {
      console.log("App: No target squad, clearing state.");
      setCurrentSquad(null);
      setSquadMembers([]);
      setSharedCarnivalData(null);
      return;
    }
    console.log("App: Subscribing to squad:", targetSquadId);
    const unsubSquad = onSnapshot(doc(db, "squads", targetSquadId), (sSnap) => {
      if (sSnap.exists()) {
        const sData = sSnap.data();
        console.log("App: Squad loaded:", sSnap.id);
        setCurrentSquad({ id: sSnap.id, ...sData });
        setSharedCarnivalData(sData);
        const membersList = Object.values(sData.memberDetails || {});
        setSquadMembers(membersList);
        setSquadShareCode(sData.inviteCode);
      } else {
        console.warn("App: Target squad does not exist/deleted:", targetSquadId);
        setCurrentSquad(null);
        setSharedCarnivalData(null);
        setSquadMembers([]);
        setSquadShareCode("");
      }
    });
    return () => {
      console.log("App: Unsubscribing from squad:", targetSquadId);
      unsubSquad();
      setSquadShareCode("");
    };
  }, [targetSquadId, user, isDemoMode]);
  reactExports.useEffect(() => {
    if (!currentSquad && squadMembers.length > 0) {
      console.warn("App: DETECTED GHOST MEMBERS! Self-healing state.");
      setSquadMembers([]);
      setSquadShareCode("");
    }
  }, [currentSquad, squadMembers]);
  reactExports.useEffect(() => {
    if (!user) {
      if (!isDemoMode) setIsPremium(false);
      return;
    }
    if (isDemoMode) {
      setIsPremium(true);
      return;
    }
    const premiumEmails = ["djkrss1@gmail.com", "maikacooke@gmail.com"];
    if (premiumEmails.includes(user.email)) {
      setIsPremium(true);
    }
    const appRef = doc(db, "users", user.uid, "apps", appId);
    const unsub = onSnapshot(appRef, (snap) => {
      if (premiumEmails.includes(user.email)) {
        setIsPremium(true);
        return;
      }
      if (snap.exists()) {
        const data = snap.data();
        setIsPremium(!!data.premiumActive);
      } else {
        setIsPremium(false);
      }
    });
    return () => unsub();
  }, [user, isDemoMode]);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    const checkAdmin = async () => {
      if (isDemoMode) {
        setIsAdmin(true);
        return;
      }
      if (user.email === "djkrss1@gmail.com") {
        setIsAdmin(true);
        return;
      }
      try {
        const adminRef = doc(db, "admins", user.uid);
        const adminSnap = await getDoc(adminRef);
        setIsAdmin(adminSnap.exists());
      } catch (err) {
        console.error("Admin check failed:", err);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user, isDemoMode]);
  reactExports.useEffect(() => {
    if (!user) {
      if (!isDemoMode) {
        setCarnivals({});
        setActiveCarnivalId(null);
      }
      return;
    }
    if (isDemoMode) return;
    const carnivalsRef = collection(db, "users", user.uid, "apps", appId, "carnivals");
    const unsubscribe = onSnapshot(carnivalsRef, (snapshot) => {
      const map2 = {};
      snapshot.forEach((docSnap) => {
        map2[docSnap.id] = docSnap.data();
      });
      setCarnivals(map2);
      if (!activeCarnivalId && snapshot.docs.length > 0) {
        setActiveCarnivalId(snapshot.docs[0].id);
      }
    });
    return () => unsubscribe();
  }, [user, isDemoMode]);
  const { data: swrProfile } = useFirestoreDoc(
    user && !isDemoMode ? `userProfiles/${user.uid}` : null
  );
  reactExports.useEffect(() => {
    if (!user || isDemoMode) {
      setUserProfile(null);
      return;
    }
    if (swrProfile) {
      setUserProfile(swrProfile);
    }
  }, [user, isDemoMode, swrProfile]);
  reactExports.useEffect(() => {
    if (!isDemoMode) {
      getRedirectResult(auth).catch((err) => console.error(err));
    }
  }, [isDemoMode]);
  reactExports.useEffect(() => {
    if (!user || isDemoMode) return;
    const setupNotifications = async () => {
      try {
        const vapidKey = "BLbW7EjHjQ9_YjKrRbJwgBgRqnkSmZsXMnEWTQZpqYwSRbVgYLmXW5RvXA2_aS3vH9XJpCxHu4VmXnZL2wQxMvI";
        const token = await requestNotificationPermission(vapidKey);
        if (token) {
          const functions = getFunctions(app);
          const saveFcmToken = httpsCallable(functions, "saveFcmToken");
          await saveFcmToken({ fcmToken: token });
          console.log("FCM token saved");
        }
      } catch (err) {
        console.log("Error setting up notifications:", err);
      }
    };
    setupNotifications();
    onForegroundMessage((payload) => {
      console.log("Foreground message:", payload);
      setToastMessage({
        title: payload.notification?.title || "Squad Alert",
        body: payload.notification?.body || "Someone in your squad is Road Ready!"
      });
      setTimeout(() => setToastMessage(null), 5e3);
    });
  }, [user, isDemoMode]);
  const handleSignIn = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        const result = await FirebaseAuthentication.signInWithGoogle();
        console.log("Success:", result);
        const idToken = result.credential?.idToken;
        if (idToken) {
          const credential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, credential);
        }
      } else {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      const errorMessage = error.message || String(error);
      const errorCode = error.code || "UNKNOWN_CODE";
      alert("NATIVE CRASH \nCode: " + errorCode + "\nMessage: " + errorMessage);
      console.error("Auth Failure:", error);
    }
  };
  const handleSignOut = async () => {
    if (isDemoMode) {
      handleExitDemo();
      return;
    }
    if (Capacitor.isNativePlatform()) {
      await FirebaseAuthentication.signOut();
    }
    await signOut(auth);
    setShowLanding(true);
    setRoadMode(false);
    setActiveTab("Budget");
    setDarkMode(true);
  };
  const handleSubscribe = async (interval) => {
    if (isDemoMode) {
      alert("Subscriptions are disabled in Demo Mode.");
      return;
    }
    if (!user) {
      alert("You must be signed in to subscribe.");
      return;
    }
    const billingInterval = interval === "yearly" ? "yearly" : "monthly";
    const priceId = billingInterval === "yearly" ? STRIPE_YEARLY_PRICE_ID : STRIPE_MONTHLY_PRICE_ID;
    setIsCheckingOut(true);
    try {
      const functions = getFunctions(app);
      const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");
      console.log(`Starting checkout... Interval: ${billingInterval}, PriceID: ${priceId}`);
      const checkoutPayload = {
        priceId,
        // Ensure key is explicitly 'priceId'
        success_url: window.location.origin,
        cancel_url: window.location.origin
      };
      if (affiliateRef) {
        checkoutPayload.affiliateRef = affiliateRef;
        console.log(`Affiliate ref attached to checkout: ${affiliateRef}`);
      }
      const result = await createCheckoutSession(checkoutPayload);
      const { data } = result || {};
      if (data && (data.url || data.checkoutUrl)) {
        window.location.href = data.url || data.checkoutUrl;
      } else {
        console.error("No checkout URL returned:", data);
        alert("Unable to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error starting checkout:", error);
      alert("There was a problem starting your checkout: " + error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };
  const selectCarnival = async (id, name2) => {
    if (!user) return;
    setActiveCarnivalId(id);
    if (isDemoMode) {
      if (!carnivals[id]) {
        setCarnivals((prev) => ({
          ...prev,
          [id]: {
            name: name2,
            budget: [],
            schedule: [],
            packing: [],
            squad: [],
            costume: null,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        }));
        setSharedCarnivalData(null);
      } else if (id === "trinidad" && carnivals["trinidad"]) {
        setSharedCarnivalData(carnivals["trinidad"]);
      } else {
        setSharedCarnivalData(null);
      }
      return;
    }
    if (!carnivals[id]) {
      try {
        const ref = doc(db, "users", user.uid, "apps", appId, "carnivals", id);
        await setDoc(ref, {
          name: name2,
          budget: [],
          schedule: [],
          packing: [],
          squad: [],
          costume: null,
          createdAt: Timestamp.now()
        }, { merge: true });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const currentSharedPlanId = carnivals[activeCarnivalId]?.sharedPlanId;
  const isCollaborative = !!currentSharedPlanId;
  const [sharedCarnivalData, setSharedCarnivalData] = reactExports.useState(null);
  const [loadingSharedData, setLoadingSharedData] = reactExports.useState(false);
  const loadSharedCarnivalData = async () => {
    if (isDemoMode) return;
    if (!currentSharedPlanId || !user) {
      setSharedCarnivalData(null);
      return;
    }
    setLoadingSharedData(true);
    try {
      const functions = getFunctions(app);
      const getSharedData = httpsCallable(functions, "getSharedCarnivalData");
      const result = await getSharedData({
        planId: currentSharedPlanId,
        uid: user.uid
      });
      setSharedCarnivalData(result.data);
    } catch (err) {
      console.log("Could not load shared carnival data:", err.message);
      setSharedCarnivalData(null);
    } finally {
      setLoadingSharedData(false);
    }
  };
  reactExports.useEffect(() => {
    if (currentSharedPlanId && !isDemoMode) {
      loadSharedCarnivalData();
    } else if (!isDemoMode) {
      setSharedCarnivalData(null);
    }
  }, [currentSharedPlanId, user, isDemoMode]);
  const updateCarnivalData = async (field, newData, action = "set") => {
    if (!user || !activeCarnivalId) return;
    if (isDemoMode) {
      const updateLocal = (targetData) => {
        let updatedFieldData = newData;
        if (action === "add" && Array.isArray(targetData[field])) {
          updatedFieldData = [...targetData[field] || [], ...newData];
        } else if (action === "remove" && Array.isArray(targetData[field])) {
          updatedFieldData = (targetData[field] || []).filter((i2) => i2.id !== newData.id);
        } else if (action === "update" && Array.isArray(targetData[field])) {
          if (newData.id !== void 0) {
            updatedFieldData = (targetData[field] || []).map((i2) => i2.id === newData.id ? { ...i2, ...newData } : i2);
          }
        }
        if (action === "set") updatedFieldData = newData;
        return {
          ...targetData,
          [field]: updatedFieldData
        };
      };
      if (isCollaborative) {
        setSharedCarnivalData((prev) => updateLocal(prev));
        setCarnivals((prev) => ({
          ...prev,
          [activeCarnivalId]: updateLocal(prev[activeCarnivalId])
        }));
      } else {
        setCarnivals((prev) => ({
          ...prev,
          [activeCarnivalId]: updateLocal(prev[activeCarnivalId])
        }));
      }
      return;
    }
    if (currentSharedPlanId && ["budget", "schedule", "packing", "costume", "squad"].includes(field)) {
      try {
        const functions = getFunctions(app);
        const updateSharedData = httpsCallable(functions, "updateSharedCarnivalData");
        const result = await updateSharedData({
          planId: currentSharedPlanId,
          field,
          data: newData,
          action,
          uid: user.uid,
          userEmail: user.email
        });
        if (result.data?.data) {
          setSharedCarnivalData(result.data.data);
        }
        return;
      } catch (err) {
        console.error("Error updating shared data:", err);
      }
    }
    const ref = doc(db, "users", user.uid, "apps", appId, "carnivals", activeCarnivalId);
    await updateDoc(ref, { [field]: newData });
  };
  reactExports.useEffect(() => {
    if (!user || !activeCarnivalId || !isPremium) {
      setScrapedEvents([]);
      return;
    }
    const fetchScrapedEvents = async () => {
      setIsLoadingScrapedEvents(true);
      try {
        const functions = getFunctions(app);
        const getScrapedEvents = httpsCallable(functions, "getScrapedEvents");
        const result = await getScrapedEvents({ carnivalId: activeCarnivalId });
        if (result.data?.success) {
          setScrapedEvents(result.data.events || []);
          setScrapedEventsLastUpdated(result.data.lastScrapedAt);
        } else {
          setScrapedEvents([]);
          setScrapedEventsLastUpdated(null);
        }
      } catch (err) {
        console.log("Error fetching scraped events:", err);
        setScrapedEvents([]);
      } finally {
        setIsLoadingScrapedEvents(false);
      }
    };
    fetchScrapedEvents();
  }, [user, activeCarnivalId, isPremium]);
  reactExports.useEffect(() => {
    if (!user || !activeCarnivalId || isDemoMode) {
      setVibeScores({});
      return;
    }
    const vibeRef = doc(db, "vibeScores", activeCarnivalId);
    const unsubVibe = onSnapshot(vibeRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const scoresMap = {};
        (data.scores || []).forEach((s) => {
          scoresMap[s.eventId] = s;
        });
        setVibeScores(scoresMap);
        console.log(`Vibe Engine: Loaded ${Object.keys(scoresMap).length} scores for ${activeCarnivalId}`);
      } else {
        setVibeScores({});
      }
    }, (err) => {
      console.log("Vibe Engine: Listener error:", err.message);
      setVibeScores({});
    });
    return () => unsubVibe();
  }, [user, activeCarnivalId, isDemoMode]);
  reactExports.useEffect(() => {
    if (Object.keys(vibeScores).length === 0) return;
    const schedule = getCarnivalField("schedule") || [];
    if (schedule.length === 0) return;
    for (const planned of schedule) {
      const matchedScore = Object.values(vibeScores).find(
        (s) => s.title && planned.name && s.title.toLowerCase().includes(planned.name.toLowerCase())
      );
      if (matchedScore && matchedScore.score <= 3) {
        const allScores = Object.values(vibeScores);
        const best = allScores.filter((s) => s.score >= 7 && s.title !== matchedScore.title).sort((a, b) => b.score - a.score)[0];
        if (best) {
          setVibeAlert({
            droppedEvent: {
              title: matchedScore.title,
              score: matchedScore.score,
              reason: matchedScore.reason
            },
            suggestedEvent: {
              title: best.title,
              score: best.score,
              reason: best.reason,
              venue: best.venue
            }
          });
          break;
        }
      }
    }
  }, [vibeScores, activeCarnivalId]);
  const toggleRoadMode = async () => {
    setRoadMode(true);
    if (isPremium && notifySquadOnRoadReady && currentCarnival) {
      setIsSendingRoadReadyAlert(true);
      try {
        const functions = getFunctions(app);
        const sendRoadReadyAlert = httpsCallable(functions, "sendRoadReadyAlert");
        const result = await sendRoadReadyAlert({
          carnivalId: activeCarnivalId,
          carnivalName: currentCarnival.name,
          userName: user?.displayName || user?.email?.split("@")[0] || "Squad Member"
        });
        if (result.data?.notified > 0) {
          setToastMessage({
            title: "Squad Notified!",
            body: `${result.data.notified} squad member(s) alerted that you're Road Ready!`
          });
          setTimeout(() => setToastMessage(null), 5e3);
        }
      } catch (err) {
        console.log("Error sending Road Ready alert:", err);
      } finally {
        setIsSendingRoadReadyAlert(false);
      }
    }
  };
  const addBudgetItem = () => {
    if (!newBudgetName.trim() || !newBudgetCost) return;
    const newItem = { id: Date.now().toString(), name: newBudgetName.trim(), cost: parseFloat(newBudgetCost) };
    if (isCollaborative) {
      updateCarnivalData("budget", [newItem], "add");
    } else {
      const items = carnivals[activeCarnivalId]?.budget || [];
      updateCarnivalData("budget", [...items, newItem]);
    }
    setNewBudgetName("");
    setNewBudgetCost("");
  };
  const removeBudgetItem = (id) => {
    if (isCollaborative) {
      updateCarnivalData("budget", { id }, "remove");
    } else {
      const items = carnivals[activeCarnivalId]?.budget || [];
      updateCarnivalData("budget", items.filter((i2) => i2.id !== id));
    }
  };
  const addScheduleItem = () => {
    if (!newScheduleName.trim() || !newScheduleDate) return;
    const newItem = {
      id: Date.now().toString(),
      title: newScheduleName.trim(),
      datetime: newScheduleDate,
      note: newScheduleNote.trim()
    };
    if (isCollaborative) {
      updateCarnivalData("schedule", [newItem], "add");
    } else {
      const items = carnivals[activeCarnivalId]?.schedule || [];
      updateCarnivalData("schedule", [...items, newItem]);
    }
    setNewScheduleName("");
    setNewScheduleDate("");
    setNewScheduleNote("");
  };
  const removeScheduleItem = (id) => {
    if (isCollaborative) {
      updateCarnivalData("schedule", { id }, "remove");
    } else {
      const items = carnivals[activeCarnivalId]?.schedule || [];
      updateCarnivalData("schedule", items.filter((i2) => i2.id !== id));
    }
  };
  const addCuratedEvent = (evt) => {
    const defaultDate = /* @__PURE__ */ new Date();
    defaultDate.setDate(defaultDate.getDate() + 1);
    defaultDate.setHours(12, 0, 0, 0);
    const dateStr = defaultDate.toISOString().slice(0, 16);
    const newItem = {
      id: Date.now().toString(),
      title: evt.title,
      datetime: dateStr,
      note: evt.note || "Added from curated list"
    };
    if (isCollaborative) {
      updateCarnivalData("schedule", [newItem], "add");
    } else {
      const items = carnivals[activeCarnivalId]?.schedule || [];
      updateCarnivalData("schedule", [...items, newItem]);
    }
  };
  const addPackingItem = () => {
    if (!newPackingItem.trim()) return;
    const newItem = { id: Date.now().toString(), item: newPackingItem.trim(), checked: false };
    if (isCollaborative) {
      updateCarnivalData("packing", [newItem], "add");
    } else {
      const items = carnivals[activeCarnivalId]?.packing || [];
      updateCarnivalData("packing", [...items, newItem]);
    }
    setNewPackingItem("");
  };
  const togglePackingItem = (id) => {
    const items = isCollaborative ? sharedCarnivalData?.packing || [] : carnivals[activeCarnivalId]?.packing || [];
    const item = items.find((i2) => i2.id === id);
    if (!item) return;
    if (isCollaborative) {
      updateCarnivalData("packing", { id, checked: !item.checked }, "update");
    } else {
      updateCarnivalData("packing", items.map((i2) => i2.id === id ? { ...i2, checked: !i2.checked } : i2));
    }
  };
  const removePackingItem = (id) => {
    if (isCollaborative) {
      updateCarnivalData("packing", { id }, "remove");
    } else {
      const items = carnivals[activeCarnivalId]?.packing || [];
      updateCarnivalData("packing", items.filter((i2) => i2.id !== id));
    }
  };
  const addSquadMember = () => {
    if (!newSquadMember.trim()) return;
    const newItem = { id: Date.now().toString(), name: newSquadMember.trim() };
    if (isCollaborative) {
      updateCarnivalData("squad", [newItem], "add");
    } else {
      const items = carnivals[activeCarnivalId]?.squad || [];
      updateCarnivalData("squad", [...items, newItem]);
    }
    setNewSquadMember("");
  };
  const removeSquadMember2 = (id) => {
    if (isCollaborative) {
      updateCarnivalData("squad", { id }, "remove");
    } else {
      const items = carnivals[activeCarnivalId]?.squad || [];
      updateCarnivalData("squad", items.filter((i2) => i2.id !== id));
    }
  };
  reactExports.useEffect(() => {
    const carnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
    if (carnival?.shareCode) {
      setSquadShareCode(carnival.shareCode);
    } else {
      setSquadShareCode("");
    }
  }, [activeCarnivalId, carnivals]);
  const copyShareCode = () => {
    if (squadShareCode) {
      navigator.clipboard.writeText(squadShareCode);
      setSquadShareSuccess("Code copied to clipboard!");
      setTimeout(() => setSquadShareSuccess(""), 2e3);
    }
  };
  const saveCostume = () => {
    updateCarnivalData("costume", {
      ...costumeDetails,
      total: parseFloat(costumeDetails.total) || 0,
      paid: parseFloat(costumeDetails.paid) || 0,
      updatedAt: Date.now()
    });
    alert("Costume details saved!");
  };
  const handleExport = () => {
    if (!currentCarnival) return;
    const lines = [];
    lines.push(`CARNIVAL PLANNER: ${currentCarnival.name}`);
    lines.push("==========================================\n");
    lines.push(`-- SQUAD --`);
    (currentCarnival.squad || []).forEach((s) => lines.push(`- ${s.name}`));
    lines.push("\n");
    lines.push("-- COSTUME --");
    if (currentCarnival.costume) {
      lines.push(`Band: ${currentCarnival.costume.band}`);
      lines.push(`Section: ${currentCarnival.costume.section}`);
      lines.push(`Balance Due: $${((currentCarnival.costume.total || 0) - (currentCarnival.costume.paid || 0)).toFixed(2)}`);
    } else {
      lines.push("No costume details.");
    }
    lines.push("\n");
    lines.push("-- SCHEDULE --");
    const sorted = (currentCarnival.schedule || []).slice().sort((a2, b) => new Date(a2.datetime) - new Date(b.datetime));
    sorted.forEach((s) => lines.push(`${new Date(s.datetime).toLocaleString()} | ${s.title}`));
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentCarnival.name.replace(/\s+/g, "_")}_Plan.txt`;
    a.click();
  };
  const baseCarnival = activeCarnivalId ? carnivals[activeCarnivalId] : null;
  const currentCarnival = baseCarnival ? {
    ...baseCarnival,
    // Override with shared data if available
    ...isCollaborative && sharedCarnivalData ? {
      budget: sharedCarnivalData.budget || baseCarnival.budget || [],
      schedule: sharedCarnivalData.schedule || baseCarnival.schedule || [],
      packing: sharedCarnivalData.packing || baseCarnival.packing || [],
      costume: sharedCarnivalData.costume || baseCarnival.costume,
      squad: sharedCarnivalData.squad || baseCarnival.squad || []
    } : {}
  } : null;
  const budgetTotal = currentCarnival?.budget?.reduce((acc, item) => acc + (item.cost || 0), 0) || 0;
  const costumeBalance = currentCarnival?.costume ? currentCarnival.costume.total - currentCarnival.costume.paid : 0;
  const curatedEvents = currentCarnival ? POPULAR_EVENTS[activeCarnivalId] || POPULAR_EVENTS.default : [];
  if (activeLegalPage) {
    const legalProps = { onBack: () => setActiveLegalPage(null), logo };
    switch (activeLegalPage) {
      case "privacy":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PrivacyPolicy, { ...legalProps });
      case "terms":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TermsOfService, { ...legalProps });
      case "cookies":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CookiePolicy, { ...legalProps });
      case "refund":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RefundPolicy, { ...legalProps });
      case "contact":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ContactPage, { ...legalProps, user });
      default:
        setActiveLegalPage(null);
    }
  }
  if (showLanding && !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocaVoid, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SplashPage, { onGetStarted: () => setShowLanding(false), logo, onLegalPage: setActiveLegalPage, onTryDemo: handleTryDemo })
    ] });
  }
  if (user && roadMode && currentCarnival) {
    const nextEvent = (currentCarnival.schedule || []).slice().sort((a, b) => new Date(a.datetime) - new Date(b.datetime)).find((e) => new Date(e.datetime) > /* @__PURE__ */ new Date());
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocaVoid, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-transparent text-white p-6 flex flex-col relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold italic", children: "ROAD MODE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRoadMode(false), className: "text-sm bg-gray-800 px-3 py-1 rounded", children: "Exit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold opacity-75 uppercase tracking-wider mb-1", children: "Up Next" }),
            nextEvent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black mb-1", children: nextEvent.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl opacity-90", children: new Date(nextEvent.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm bg-white/20 inline-block px-2 py-1 rounded", children: nextEvent.note || "No notes" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl italic opacity-75", children: "No more fetes scheduled! Sleep time?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 p-6 rounded-2xl border border-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold opacity-75 uppercase tracking-wider mb-2", children: "Costume Pickup" }),
            currentCarnival.costume ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-yellow-400", children: currentCarnival.costume.band }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-400", children: [
                "Section: ",
                currentCarnival.costume.section
              ] }),
              costumeBalance > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-red-400 font-bold mt-1", children: [
                "Balance Due: $",
                costumeBalance
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 italic", children: "No costume details saved." })
          ] })
        ] })
      ] })
    ] });
  }
  if (isAndroidBetaPage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AndroidBetaPage, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${isDemoMode ? "pb-20" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocaVoid, {}) }),
    toastMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-50 animate-slideIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-2xl max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: typeof toastMessage === "string" ? toastMessage : toastMessage.title }),
        typeof toastMessage !== "string" && toastMessage.body && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: toastMessage.body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setToastMessage(null), className: "ml-2 text-white/70 hover:text-white", children: "×" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      VibeAlert,
      {
        alert: vibeAlert,
        onSwap: (alert2) => {
          const schedule = getCarnivalField("schedule") || [];
          const updated = schedule.map(
            (item) => item.name?.toLowerCase().includes(alert2.droppedEvent.title.toLowerCase()) ? { ...item, name: alert2.suggestedEvent.title, note: `Swapped from ${alert2.droppedEvent.title} (Vibe: ${alert2.droppedEvent.score}/10)` } : item
          );
          updateCarnivalData("schedule", updated);
          setVibeAlert(null);
          setToastMessage(`Swapped to ${alert2.suggestedEvent.title} 🔥`);
        },
        onDismiss: () => setVibeAlert(null)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstallPrompt, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-white dark:bg-gray-800 shadow-sm py-4 px-4 flex justify-between items-center sticky top-0 z-20 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Logo", className: "w-8 h-8", loading: "eager", decoding: "async" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-gray-800 dark:text-white hidden sm:block", children: "Caribbean Carnival Planner" })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: toggleDarkMode, className: "p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300", children: darkMode ? "☀️" : "🌙" }),
        isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                handleExitDemo();
                setShowLanding(false);
              },
              className: "px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:opacity-90 transition-opacity shadow-md",
              children: "Sign Up Free"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleExitDemo,
              className: "px-3 py-1 text-xs font-medium rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors",
              children: "Exit Preview"
            }
          )
        ] }),
        currentCarnival && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleRoadMode,
            disabled: isSendingRoadReadyAlert,
            className: "px-3 py-1 text-xs font-bold rounded-full transition bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 disabled:opacity-50",
            children: isSendingRoadReadyAlert ? "..." : "GO ROAD READY"
          }
        ),
        !isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Free Plan" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-bold", children: "Premium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isOnline ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-orange-500 animate-pulse"}` }),
          isOnline ? "Online" : "Offline Mode"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSignOut, className: "text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400", children: "Sign Out" })
      ] })
    ] }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsx(EmailVerificationBanner, { user }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 max-w-4xl mx-auto w-full", children: !user ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4", children: showEmailAuth ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmailAuthForm,
      {
        onBack: () => setShowEmailAuth(false),
        onSuccess: () => setShowEmailAuth(false)
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-gray-800 dark:text-white", children: "Welcome Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSignIn,
            className: "w-full flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg", className: "w-5 h-5 mr-3", alt: "G" }),
              "Continue with Google"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-gray-400 dark:text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-300 dark:bg-gray-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "or" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-300 dark:bg-gray-600" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowEmailAuth(true),
            className: "w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-sm hover:opacity-90 text-white font-semibold transition-opacity",
            children: "Continue with Email"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowLanding(true),
          className: "mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          children: "Back to home"
        }
      )
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 snap-x", children: carnivalOptions.map((c, idx) => {
        const isActive = activeCarnivalId === c.id;
        const gradient = gradientClasses[idx % gradientClasses.length];
        const carnivalNameMap = {
          "stkitts-sugar-mas": "Sugar Mas",
          "stcroix": "St. Croix Carnival",
          "trinidad": "Trinidad Carnival",
          "dominica": "Mas Domnik",
          "jamaica": "Jamaica Carnival",
          "tampa": "Tampa Bay Carnival",
          "stmaarten": "St. Maarten Carnival",
          "cayman-batabano": "Cayman Carnival Batabano",
          "stthomas": "St. Thomas Carnival",
          "atlanta": "Atlanta Caribbean Carnival",
          "guyana": "Guyana Independence",
          "bahamas": "Bahamas Carnival",
          "bermuda": "Bermuda Carnival",
          "hollywood": "Hollywood Carnival",
          "caymas": "Caymas Carnival",
          "vincymas": "Vincy Mas",
          "stlucia": "Saint Lucia Carnival",
          "toronto": "Toronto Caribbean Carnival",
          "barbados": "Crop Over",
          "nevis": "Nevis Culturama",
          "antigua": "Antigua Carnival",
          "grenada": "Spice Mas",
          "ny-labor-day": "New York Carnival",
          "japan": "Japan Caribbean Carnival",
          "miami": "Miami Carnival",
          "tobago": "Tobago Carnival"
        };
        const searchName = carnivalNameMap[c.id] || c.name;
        const matchingCarnival = carnivalData.find(
          (cd) => cd.name.toLowerCase().includes(searchName.toLowerCase()) || searchName.toLowerCase().includes(cd.name.split("(")[0].trim().toLowerCase())
        );
        let daysUntil = null;
        if (matchingCarnival) {
          const now2 = /* @__PURE__ */ new Date();
          const today = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
          const [year, month, day] = matchingCarnival.date.split("-").map(Number);
          const carnivalDate = new Date(year, month - 1, day);
          if (carnivalDate >= today) {
            daysUntil = Math.round((carnivalDate - today) / (1e3 * 60 * 60 * 24));
          }
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => selectCarnival(c.id, `${c.name} - ${monthNames[c.monthIndex]}`),
            className: `snap-center min-w-[200px] cursor-pointer rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all duration-300 ${isActive ? "ring-4 ring-offset-2 ring-blue-400 scale-105" : "hover:scale-105 opacity-90"} ${gradient}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg leading-tight mb-1", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider opacity-90", children: monthNames[c.monthIndex] }),
                matchingCarnival && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium opacity-80 mt-1", children: (/* @__PURE__ */ new Date(matchingCarnival.date + "T00:00:00")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }),
                daysUntil !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 inline-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black", children: daysUntil }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1 opacity-90", children: "days" })
                ] })
              ] })
            ]
          },
          c.id
        );
      }) }) }),
      !currentCarnival ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeHub,
        {
          user,
          activeCarnivalId: null,
          carnivalData,
          scrapedEvents,
          vibeScores,
          squadMembers: [],
          squadShareCode: "",
          budgetTotal: 0,
          budgetSpent: 0,
          isPremium,
          onAction: setActiveTab
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HomeHub,
          {
            user,
            activeCarnivalId,
            carnivalData,
            scrapedEvents,
            vibeScores,
            squadMembers,
            squadShareCode,
            budgetTotal: 2e4,
            budgetSpent: budgetTotal,
            isPremium,
            onAction: setActiveTab
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors", children: [
          !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✨" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-sm", children: "Unlock Premium Features" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-xs", children: "Go ad-free and get a Premium badge!" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setActiveTab("Info"),
                className: "px-4 py-2 bg-white text-orange-600 font-bold text-sm rounded-full hover:bg-gray-100 transition",
                children: "Upgrade"
              }
            )
          ] }),
          !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromoAd, { placement: "banner", onUpgradeClick: () => setActiveTab("Info") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto scrollbar-hide", children: [
            "Budget",
            "Costume",
            "Bands",
            "Schedule",
            "Squad",
            "Vault",
            "Passport",
            "Packing",
            "Map",
            "Media",
            "Profile",
            "Promoter",
            "Marketplace",
            "Marketing",
            "Info"
          ].filter((tab) => (isPremium || !["Map", "Media", "Passport"].includes(tab)) && (isAdmin || tab !== "Marketing") && (!isDemoMode || !["Promoter", "Marketing", "Profile"].includes(tab))).map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                console.log("Switching to tab:", tab, "isPremium:", isPremium);
                React.startTransition(() => setActiveTab(tab));
              },
              className: `flex-shrink-0 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`,
              children: [
                tab,
                ["Map", "Media", "Passport"].includes(tab) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-yellow-500", children: "★" }),
                activeTab === tab && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400" })
              ]
            },
            tab
          )) }),
          isCollaborative && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-lg", children: "👥" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium text-sm", children: "Squad Mode Active" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-xs", children: [
                  "Changes sync with ",
                  squadMembers.length,
                  " squad member(s)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: loadSharedCarnivalData,
                disabled: loadingSharedData,
                className: "px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full hover:bg-white/30 transition disabled:opacity-50",
                children: loadingSharedData ? "Syncing..." : "Refresh"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            activeTab === "Budget" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Budget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Total Estimate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black text-green-600 dark:text-green-400", children: [
                    "$",
                    budgetTotal.toFixed(2)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: (currentCarnival.budget || []).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700 dark:text-gray-200", children: item.name }),
                  item.addedBy && isCollaborative && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-gray-400 dark:text-gray-500", children: [
                    "by ",
                    item.addedBy.email?.split("@")[0] || "squad member"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-gray-900 dark:text-white", children: [
                    "$",
                    item.cost.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeBudgetItem(item.id), className: "text-gray-400 hover:text-red-500", children: "×" })
                ] })
              ] }, item.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Item", value: newBudgetName, onChange: (e) => setNewBudgetName(e.target.value), className: "flex-[2] p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "0.00", value: newBudgetCost, onChange: (e) => setNewBudgetCost(e.target.value), className: "flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addBudgetItem, className: "w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium", children: "Add" })
              ] }),
              !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromoAd, { placement: "inline", onUpgradeClick: () => setActiveTab("Info") }) })
            ] }),
            activeTab === "Bands" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CostumeDirectory, { carnivalId: activeCarnivalId, isPremium }) }) }),
            activeTab === "Costume" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white mb-4", children: "Mas Costume" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl border border-pink-100 dark:border-pink-900 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1", children: "Band Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        className: "w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white",
                        value: costumeDetails.band || (currentCarnival.costume?.band || ""),
                        onChange: (e) => setCostumeDetails({ ...costumeDetails, band: e.target.value }),
                        placeholder: "e.g. Tribe, Bliss..."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1", children: "Section" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        className: "w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white",
                        value: costumeDetails.section || (currentCarnival.costume?.section || ""),
                        onChange: (e) => setCostumeDetails({ ...costumeDetails, section: e.target.value }),
                        placeholder: "e.g. The Monarch"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1", children: "Total Cost" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        className: "w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white",
                        value: costumeDetails.total || (currentCarnival.costume?.total || ""),
                        onChange: (e) => setCostumeDetails({ ...costumeDetails, total: e.target.value }),
                        placeholder: "0.00"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-pink-800 dark:text-pink-300 uppercase mb-1", children: "Amount Paid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        className: "w-full p-2 border border-pink-200 dark:border-pink-800 rounded dark:bg-gray-700 dark:text-white",
                        value: costumeDetails.paid || (currentCarnival.costume?.paid || ""),
                        onChange: (e) => setCostumeDetails({ ...costumeDetails, paid: e.target.value }),
                        placeholder: "0.00"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveCostume, className: "mt-4 w-full py-2 bg-pink-600 text-white font-bold rounded hover:bg-pink-700", children: "Save Details" })
              ] })
            ] }),
            activeTab === "Schedule" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white mb-4", children: "Itinerary" }),
              curatedEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gray-400 uppercase mb-2", children: "Popular Events (Click to Add)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2", children: curatedEvents.map((evt, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => addCuratedEvent(evt),
                    className: "min-w-[140px] p-3 text-left rounded-lg border transition bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-blue-900 dark:text-blue-300 text-sm", children: evt.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-blue-700 dark:text-blue-400 opacity-75 truncate", children: evt.note })
                    ]
                  },
                  i2
                )) })
              ] }),
              isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" }),
                    "Live Events from Fete Sites"
                  ] }),
                  scrapedEventsLastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                    "Updated: ",
                    new Date(scrapedEventsLastUpdated).toLocaleDateString()
                  ] })
                ] }),
                isLoadingScrapedEvents ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 text-gray-500 dark:text-gray-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin inline-block w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading live events..." })
                ] }) : scrapedEvents.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: scrapedEvents.slice(0, 10).map((evt, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:shadow-md transition",
                    children: [
                      evt.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: evt.image, alt: "", className: "w-12 h-12 rounded object-cover flex-shrink-0", loading: "lazy", decoding: "async" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-bold text-emerald-900 dark:text-emerald-300 text-sm truncate", children: evt.title }),
                          vibeScores[evt.id] && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex-shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${vibeScores[evt.id].score >= 8 ? "bg-red-500/20 text-red-400" : vibeScores[evt.id].score >= 5 ? "bg-amber-500/20 text-amber-400" : "bg-gray-500/20 text-gray-400"}`, children: [
                            "🔥 ",
                            vibeScores[evt.id].score,
                            "/10"
                          ] })
                        ] }),
                        evt.date && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-700 dark:text-emerald-400", children: [
                          (/* @__PURE__ */ new Date(evt.date + "T00:00:00")).toLocaleDateString(void 0, { weekday: "short", month: "short", day: "numeric" }),
                          evt.time && ` at ${evt.time}`
                        ] }),
                        evt.venue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: evt.venue }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                          "via ",
                          evt.source
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-shrink-0", children: [
                        evt.url && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: evt.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700",
                            children: "Tickets"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => addCuratedEvent({ title: evt.title, note: evt.venue || `via ${evt.source}` }),
                            className: "px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700",
                            children: "+ Add"
                          }
                        )
                      ] })
                    ]
                  },
                  evt.id || i2
                )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-emerald-700 dark:text-emerald-400", children: "No live events found for this carnival yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Events are updated daily from fetelist.com & frontlineticketing.com" })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-900 dark:text-amber-300", children: "Unlock Live Event Listings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400", children: "Premium members get daily-updated fete listings from fetelist.com & frontlineticketing.com" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setActiveTab("Info"),
                    className: "px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg hover:opacity-90 flex-shrink-0",
                    children: "Upgrade"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-6", children: (currentCarnival.schedule || []).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-400 relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center min-w-[60px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase", children: new Date(event.datetime).toLocaleDateString(void 0, { month: "short" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xl font-black text-gray-800 dark:text-white", children: new Date(event.datetime).getDate() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-gray-500 dark:text-gray-400", children: new Date(event.datetime).toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-gray-800 dark:text-white", children: event.title }),
                  event.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mt-1", children: event.note }),
                  event.addedBy && isCollaborative && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 dark:text-gray-500 mt-1", children: [
                    "Added by ",
                    event.addedBy.email?.split("@")[0] || "squad member"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeScheduleItem(event.id), className: "absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100", children: "×" })
              ] }, event.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceScheduler, { onScheduleDetected: async (voiceData) => {
                console.log("Voice Command:", voiceData);
                if (!user) return;
                const newEvent = {
                  name: voiceData.name,
                  date: voiceData.day + " " + voiceData.time,
                  // e.g. "Friday 3pm"
                  note: voiceData.note,
                  completed: false
                };
                try {
                  await createScheduleItem(user, activeCarnivalId, newEvent);
                  const updatedCarnivals = { ...carnivals };
                  const plan = updatedCarnivals[activeCarnivalId];
                  if (plan) {
                    plan.schedule = [...plan.schedule || [], { id: Date.now().toString(), ...newEvent }];
                    setCarnivals(updatedCarnivals);
                  }
                  alert(`Added: ${voiceData.name}`);
                } catch (e) {
                  console.error("Voice Add Failed", e);
                  alert("Could not add voice event.");
                }
              } }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Event Name (e.g. Scorch, Tribe)",
                    value: newScheduleName,
                    onChange: (e) => setNewScheduleName(e.target.value),
                    className: "p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Date/Time (e.g. Fri 2PM)",
                    value: newScheduleDate,
                    onChange: (e) => setNewScheduleDate(e.target.value),
                    className: "p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Type (Fete, Mas, transport...)",
                    value: newScheduleNote,
                    onChange: (e) => setNewScheduleNote(e.target.value),
                    className: "md:col-span-2 p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addScheduleItem, className: "md:col-span-2 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700", children: "Add Event" })
              ] })
            ] }),
            activeTab === "Squad" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white", children: "Your Squad" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full", children: [
                  currentCarnival.squad?.length || 0,
                  " members"
                ] })
              ] }),
              userSquads.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "👥" }),
                  " My Squads (",
                  userSquads.length,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: userSquads.map((squad) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleSwitchSquad(squad.id),
                    className: `w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${currentSquad?.id === squad.id ? "bg-indigo-100 dark:bg-indigo-900/40 border-indigo-400 dark:border-indigo-600" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: squad.name }),
                          squad.isLeader && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-1.5 py-0.5 rounded font-bold uppercase", children: "Leader" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: [
                          squad.memberCount,
                          " member",
                          squad.memberCount !== 1 ? "s" : ""
                        ] })
                      ] }),
                      currentSquad?.id === squad.id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-indigo-600 text-white px-2 py-1 rounded-full font-medium", children: "Active" })
                    ]
                  },
                  squad.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SquadVoice,
                {
                  squadId: currentSquad?.id,
                  userId: user?.uid,
                  userName: user?.displayName,
                  isPremium,
                  squadMembers
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                WearableMonitor,
                {
                  isPremium,
                  userId: user?.uid,
                  userName: user?.displayName,
                  activeCarnivalId,
                  onSafetyAlert: async (alertData) => {
                    try {
                      const functions = getFunctions(app);
                      const sendSafetyAlert = httpsCallable(functions, "sendSafetyAlert");
                      await sendSafetyAlert({
                        carnivalId: activeCarnivalId,
                        userName: user?.displayName,
                        heartRate: alertData.heartRate,
                        duration: alertData.duration
                      });
                      console.log("Safety alert sent to squad");
                    } catch (err) {
                      console.error("Failed to send safety alert:", err);
                    }
                  }
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-4 mb-6 shadow-lg border border-gray-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-screen" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-lg flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📡" }),
                      " Road Mode: Offline Chat"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Mesh chat for when cell service dies. Uses Bluetooth & Wi-Fi — no data needed." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex-shrink-0", children: "No Data Needed" })
                ] }),
                !activeCarnivalId || !currentSquad ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 bg-white/5 rounded-lg border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-300", children: "Create or join a squad to enable offline comms." }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg border border-white/10 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-gray-400 font-bold mb-2", children: "How it works" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-gray-300 space-y-1.5 list-decimal list-inside", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        "Download ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Bitchat" }),
                        " on your phone (iOS or Android)"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Create or join a squad in Carnival Planner" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy your squad's unique channel name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Open Bitchat & join the channel — works without cell service!" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "https://apps.apple.com/us/app/bitchat-mesh/id6748219622",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🍎" }),
                          " Get Bitchat for iOS"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "https://play.google.com/store/apps/details?id=com.bitchat.droid",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🤖" }),
                          " Get Bitchat for Android"
                        ]
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  (() => {
                    const squadIdShort = currentSquad.id.slice(0, 8).toUpperCase();
                    const channelName = `#CP-${squadIdShort}`;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/30 p-4 rounded-lg border border-white/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-gray-400 font-bold mb-2", children: "Your squad's Bitchat channel" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-2xl font-bold text-blue-400 tracking-wider select-all flex-1", children: channelName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => {
                              navigator.clipboard.writeText(channelName);
                              setToastMessage("Channel name copied!");
                              setTimeout(() => setToastMessage(null), 3e3);
                            },
                            className: "px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors",
                            children: "Copy"
                          }
                        )
                      ] })
                    ] });
                  })(),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg border border-white/10 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-gray-400 font-bold mb-2", children: "Quick start" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-gray-300 space-y-1.5 list-decimal list-inside", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy the channel name above" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                        "Open ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Bitchat" }),
                        " on your phone"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Join the channel — chat works even without cell service!" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "https://apps.apple.com/us/app/bitchat-mesh/id6748219622",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🍎" }),
                          " Get Bitchat for iOS"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "https://play.google.com/store/apps/details?id=com.bitchat.droid",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🤖" }),
                          " Get Bitchat for Android"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔗" }),
                  " Squad Sharing"
                ] }),
                squadShareError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm", children: squadShareError }),
                squadShareSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-sm", children: squadShareSuccess }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-2", children: "Share your carnival plan with friends:" }),
                    squadShareCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider", children: squadShareCode }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: copyShareCode,
                          className: "text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-3 py-1 rounded hover:bg-purple-200",
                          children: "Copy"
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: handleCreateSquad,
                        disabled: isCreatingShare,
                        className: "w-full py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 disabled:opacity-50",
                        children: isCreatingShare ? "Creating..." : "Start a Squad"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-2", children: "Join a friend's squad:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Enter 6-digit code",
                          value: joinCode,
                          onChange: (e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6)),
                          className: "flex-1 p-2 border rounded font-mono text-center tracking-wider uppercase dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                          maxLength: 6
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: handleJoinSquad,
                          disabled: isJoiningSquad || joinCode.length !== 6,
                          className: "bg-pink-600 text-white px-4 rounded hover:bg-pink-700 disabled:opacity-50",
                          children: isJoiningSquad ? "..." : "Join"
                        }
                      )
                    ] })
                  ] })
                ] }),
                currentSquad && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLeaveSquad, className: "text-sm text-red-500 hover:text-red-700 underline", children: "Leave Squad" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-xl p-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-pink-500/20 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-pink-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold text-white flex items-center gap-2", children: [
                        "📹 Squad Live Stream",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-pink-500/30 text-pink-300 px-2 py-0.5 rounded-full uppercase font-bold", children: "Premium" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Stream live from the road to your squad" })
                    ] })
                  ] }),
                  isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://vdo.ninja/?push&quality=1",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2",
                      children: "🔴 Go Live"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setActiveTab("Info"),
                      className: "px-4 py-2 bg-gray-600/50 text-gray-300 font-semibold rounded-xl hover:bg-gray-600 transition-all flex items-center gap-2",
                      children: "🔒 Upgrade to Go Live"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-3", children: isPremium ? "Opens VDO.Ninja - share the generated link with your squad to let them watch!" : "Premium subscribers can stream live video to their squad members" })
              ] }),
              isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-purple-200 dark:border-purple-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: notifySquadOnRoadReady,
                    onChange: (e) => setNotifySquadOnRoadReady(e.target.checked),
                    className: "w-5 h-5 text-purple-600 rounded"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-purple-800 dark:text-purple-300", children: "Notify squad when I go Road Ready" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Send push notification to squad members" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full", children: "Premium" })
              ] }) }),
              squadMembers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium text-green-700 dark:text-green-400 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "👥" }),
                  " Connected Squad Members"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mb-3", children: 'These users joined using your share code and can see this carnival plan. Click "Refresh" to check for new members.' }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: squadMembers.map((member, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-2 px-3 py-2 rounded-full border ${member.role === "leader" ? "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800" : "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold", children: (member.name || member.email || member.uid || "?").charAt(0).toUpperCase() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium text-sm ${member.role === "leader" ? "text-yellow-800 dark:text-yellow-300" : "text-green-800 dark:text-green-300"}`, children: member.name || member.email || `User ${member.uid?.slice(0, 6)}...` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${member.role === "leader" ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}`, children: member.role === "leader" ? "👑 Leader" : "✓ Member" })
                      ] }),
                      currentSquad?.leaderId === user?.uid && member.role !== "leader" && member.uid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => handleRemoveMember(member.uid, member.name || member.email || "this member"),
                          className: "ml-auto text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full p-1 transition-colors",
                          title: "Remove from squad",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                        }
                      )
                    ]
                  },
                  member.uid || idx
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Quick Add (Offline List)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Add friend's name",
                      value: newSquadMember,
                      onChange: (e) => setNewSquadMember(e.target.value),
                      className: "flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addSquadMember, className: "w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-medium", children: "Add" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2", children: [
                  squadMembers.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full border border-purple-100 dark:border-purple-800", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-900 dark:text-purple-200 font-medium", children: member.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeSquadMember2(member.id), className: "text-purple-400 hover:text-red-500 text-xs font-bold", children: "×" })
                  ] }, member.id)),
                  (currentCarnival.squad || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 italic text-sm", children: "No squad members added yet. Riding solo?" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SquadChat,
                {
                  squadId: currentSquad?.id,
                  user,
                  isDemoMode,
                  isPremium
                }
              ) }) }),
              !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromoAd, { placement: "inline", onUpgradeClick: () => setActiveTab("Info") }) })
            ] }),
            activeTab === "Vault" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SquadVault,
              {
                user,
                isDemoMode
              }
            ) }) }),
            activeTab === "Packing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-white mb-4", children: "Packing List" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-6", children: (currentCarnival.packing || []).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: item.checked, onChange: () => togglePackingItem(item.id), className: "w-5 h-5 text-blue-600 rounded" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-gray-700 dark:text-gray-200 ${item.checked ? "line-through opacity-50" : ""}`, children: item.item })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removePackingItem(item.id), className: "text-gray-400 hover:text-red-500", children: "×" })
              ] }, item.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Item", value: newPackingItem, onChange: (e) => setNewPackingItem(e.target.value), className: "flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addPackingItem, className: "w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium", children: "Add" })
              ] }),
              !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-gray-100 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromoAd, { placement: "inline", onUpgradeClick: () => setActiveTab("Info") }) })
            ] }),
            activeTab === "Map" && isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeteMap,
              {
                locations: currentCarnival.mapLocations || [],
                scrapedEvents,
                onLocationsChange: (newLocations) => updateCarnivalData("mapLocations", newLocations),
                carnivalName: currentCarnival.name,
                carnivalId: activeCarnivalId,
                isPremium
              }
            ) }) }),
            activeTab === "Passport" && isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SocaPassportTab,
              {
                user,
                activeCarnivalId,
                activePlanId: currentSharedPlanId,
                isDemoMode
              }
            ) }) }),
            activeTab === "Media" && isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MediaVault,
              {
                files: currentCarnival.mediaFiles || [],
                onFilesChange: (newFiles) => updateCarnivalData("mediaFiles", newFiles),
                carnivalName: currentCarnival.name,
                carnivalId: activeCarnivalId,
                userId: user.uid
              }
            ) }) }),
            activeTab === "Profile" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: [
              console.log("Rendering MasqueraderProfile, isOwnProfile: true"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MasqueraderProfile,
                {
                  currentUser: user,
                  profileData: {
                    ...userProfile || {
                      displayName: user?.displayName || "Carnival Lover",
                      bio: "",
                      isPublic: false,
                      carnivalHistory: Object.entries(carnivals || {}).filter(([_, data]) => data?.costume?.band).map(([carnivalId, data]) => ({
                        carnivalId,
                        year: (/* @__PURE__ */ new Date()).getFullYear(),
                        band: data.costume?.band,
                        section: data.costume?.section
                      }))
                    },
                    activeCarnivalId,
                    // For context
                    isPromoter: userProfile?.isPromoter || false,
                    onAccessPromoter: () => setActiveTab("Promoter")
                  },
                  isOwnProfile: true,
                  onEdit: () => setShowProfileEditor(true)
                }
              )
            ] }) }),
            activeTab === "Marketplace" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MarketplacePage, { user }) }) }),
            activeTab === "Marketing" && isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MarketingDashboard, {}) }) }),
            activeTab === "Promoter" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PromoterDashboard,
              {
                user,
                isPremium,
                onExit: () => setActiveTab("Profile")
              }
            ) }) }),
            activeTab === "Info" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fadeIn text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 mb-6 shadow-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/carnival-feathers.png", alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-screen", loading: "lazy", decoding: "async" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Logo", className: "relative z-10 w-20 h-20 mx-auto mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: isPremium ? "Premium Supporter" : "Support the App" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-6", children: isPremium ? "Thank you for supporting Caribbean Carnival Planner!" : "All features are free! Premium removes ads and shows your support." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleExport,
                    className: "flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full font-bold transition-colors bg-white text-gray-900 hover:bg-gray-100",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📥" }),
                      " Export Itinerary"
                    ]
                  }
                )
              ] }),
              !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-yellow-800 dark:text-yellow-400 mb-2", children: "Become a Premium Supporter" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-700 dark:text-yellow-500 text-sm mb-4", children: "Get an ad-free experience and a Premium badge to show your support!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handleSubscribe("monthly"),
                      disabled: isCheckingOut,
                      className: "px-4 py-2 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 disabled:opacity-50",
                      children: isCheckingOut ? "Loading..." : "Monthly - $4.99"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handleSubscribe("yearly"),
                      disabled: isCheckingOut,
                      className: "px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded shadow hover:bg-yellow-500 disabled:opacity-50",
                      children: isCheckingOut ? "Loading..." : "Yearly - $39.99"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountSettings, { user }) }) }),
              isAdmin && !isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-left space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { user }) }) })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 px-4 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveLegalPage("privacy"),
            className: "hover:text-gray-900 dark:hover:text-white transition-colors",
            children: "Privacy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveLegalPage("terms"),
            className: "hover:text-gray-900 dark:hover:text-white transition-colors",
            children: "Terms"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveLegalPage("cookies"),
            className: "hover:text-gray-900 dark:hover:text-white transition-colors",
            children: "Cookies"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveLegalPage("refund"),
            className: "hover:text-gray-900 dark:hover:text-white transition-colors",
            children: "Refunds"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveLegalPage("contact"),
            className: "hover:text-gray-900 dark:hover:text-white transition-colors",
            children: "Contact"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowHelpGuide(true),
            className: "hover:text-gray-900 dark:hover:text-white transition-colors font-medium",
            children: "Help"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 dark:text-gray-500 text-xs mt-3", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Caribbean Carnival Planner"
      ] })
    ] }) }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(VibesPlayer, { activeCarnivalId, isPremium }) }),
    showWelcomeModal && /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeModal, { onClose: () => {
      setShowWelcomeModal(false);
      localStorage.setItem("carnival-planner-welcomed", "true");
    } }),
    showHelpGuide && /* @__PURE__ */ jsxRuntimeExports.jsx(HelpGuide, { onClose: () => setShowHelpGuide(false) }),
    showProfileEditor && /* @__PURE__ */ jsxRuntimeExports.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileEditor,
      {
        user,
        currentProfile: userProfile,
        carnivals,
        onSave: (updatedProfile) => setUserProfile(updatedProfile),
        onClose: () => setShowProfileEditor(false)
      }
    ) }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsx(CarnivalConcierge, { user, isPremium, activeCarnivalId, scrapedEvents }),
    isDemoMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-orange-900/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm sm:text-base", children: "You're previewing Carnival Planner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs sm:text-sm", children: "Create a free account to save your plans and sync with your squad" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              handleExitDemo();
              setShowLanding(false);
            },
            className: "px-5 py-2 bg-white text-gray-900 font-bold text-sm rounded-full hover:bg-gray-100 transition-colors shadow-lg",
            children: "Sign Up Free"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleExitDemo,
            className: "px-3 py-2 text-white/60 hover:text-white text-xs font-medium transition-colors",
            children: "Dismiss"
          }
        )
      ] })
    ] }) })
  ] });
}
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query2) {
  return typeof staleTime === "function" ? staleTime(query2) : staleTime;
}
function resolveEnabled(enabled, query2) {
  return typeof enabled === "function" ? enabled(query2) : enabled;
}
function matchQuery(filters, query2) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query2.queryHash !== hashQueryKeyByOptions(queryKey, query2.options)) {
        return false;
      }
    } else if (!partialMatchKey(query2.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query2.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query2.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query2.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query2)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    const aItemsSet = new Set(aItems);
    let equalItems = 0;
    for (let i2 = 0; i2 < bSize; i2++) {
      const key = array ? i2 : bItems[i2];
      if ((!array && aItemsSet.has(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep$1(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") {
    return throwOnError(...params);
  }
  return !!throwOnError;
}
var FocusManager = (_a = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _focused);
    __privateAdd(this, _cleanup);
    __privateAdd(this, _setup);
    __privateSet(this, _setup, (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup)) {
      this.setEventListener(__privateGet(this, _setup));
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _cleanup)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _cleanup, void 0);
    }
  }
  setEventListener(setup) {
    var _a2;
    __privateSet(this, _setup, setup);
    (_a2 = __privateGet(this, _cleanup)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _cleanup, setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    }));
  }
  setFocused(focused) {
    const changed = __privateGet(this, _focused) !== focused;
    if (changed) {
      __privateSet(this, _focused, focused);
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof __privateGet(this, _focused) === "boolean") {
      return __privateGet(this, _focused);
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
}, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a);
var focusManager = new FocusManager();
var OnlineManager = (_b = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _online, true);
    __privateAdd(this, _cleanup2);
    __privateAdd(this, _setup2);
    __privateSet(this, _setup2, (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup2)) {
      this.setEventListener(__privateGet(this, _setup2));
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _cleanup2)) == null ? void 0 : _a2.call(this);
      __privateSet(this, _cleanup2, void 0);
    }
  }
  setEventListener(setup) {
    var _a2;
    __privateSet(this, _setup2, setup);
    (_a2 = __privateGet(this, _cleanup2)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
  }
  setOnline(online) {
    const changed = __privateGet(this, _online) !== online;
    if (changed) {
      __privateSet(this, _online, online);
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return __privateGet(this, _online);
  }
}, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _b);
var onlineManager = new OnlineManager();
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  const thenable = pendingThenable();
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep$1(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}
var defaultScheduler = (cb) => setTimeout(cb, 0);
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();
var Removable = (_c = class {
  constructor() {
    __privateAdd(this, _gcTimeout);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      __privateSet(this, _gcTimeout, setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime));
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (__privateGet(this, _gcTimeout)) {
      clearTimeout(__privateGet(this, _gcTimeout));
      __privateSet(this, _gcTimeout, void 0);
    }
  }
}, _gcTimeout = new WeakMap(), _c);
var Query = (_d = class extends Removable {
  constructor(config) {
    super();
    __privateAdd(this, _Query_instances);
    __privateAdd(this, _initialState);
    __privateAdd(this, _revertState);
    __privateAdd(this, _cache);
    __privateAdd(this, _client);
    __privateAdd(this, _retryer);
    __privateAdd(this, _defaultOptions);
    __privateAdd(this, _abortSignalConsumed);
    __privateSet(this, _abortSignalConsumed, false);
    __privateSet(this, _defaultOptions, config.defaultOptions);
    this.setOptions(config.options);
    this.observers = [];
    __privateSet(this, _client, config.client);
    __privateSet(this, _cache, __privateGet(this, _client).getQueryCache());
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    __privateSet(this, _initialState, getDefaultState$1(this.options));
    this.state = config.state ?? __privateGet(this, _initialState);
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return __privateGet(this, _retryer)?.promise;
  }
  setOptions(options) {
    this.options = { ...__privateGet(this, _defaultOptions), ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      __privateGet(this, _cache).remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = __privateGet(this, _retryer)?.promise;
    __privateGet(this, _retryer)?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(__privateGet(this, _initialState));
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveEnabled(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
      );
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    __privateGet(this, _retryer)?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    __privateGet(this, _retryer)?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (__privateGet(this, _retryer)) {
          if (__privateGet(this, _abortSignalConsumed)) {
            __privateGet(this, _retryer).cancel({ revert: true });
          } else {
            __privateGet(this, _retryer).cancelRetry();
          }
        }
        this.scheduleGc();
      }
      __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (__privateGet(this, _retryer)) {
        __privateGet(this, _retryer).continueRetry();
        return __privateGet(this, _retryer).promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          __privateSet(this, _abortSignalConsumed, true);
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: __privateGet(this, _client),
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      __privateSet(this, _abortSignalConsumed, false);
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: __privateGet(this, _client),
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    this.options.behavior?.onFetch(context, this);
    __privateSet(this, _revertState, this.state);
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!(isCancelledError(error) && error.silent)) {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        __privateGet(this, _cache).config.onError?.(
          error,
          this
        );
        __privateGet(this, _cache).config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      this.scheduleGc();
    };
    __privateSet(this, _retryer, createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (data === void 0) {
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        __privateGet(this, _cache).config.onSuccess?.(data, this);
        __privateGet(this, _cache).config.onSettled?.(
          data,
          this.state.error,
          this
        );
        this.scheduleGc();
      },
      onError,
      onFail: (failureCount, error) => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "pause" });
      },
      onContinue: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    }));
    return __privateGet(this, _retryer).start();
  }
}, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _client = new WeakMap(), _retryer = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _Query_instances = new WeakSet(), dispatch_fn = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          fetchFailureCount: action.failureCount,
          fetchFailureReason: action.error
        };
      case "pause":
        return {
          ...state,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...state,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...state,
          ...fetchState(state.data, this.options),
          fetchMeta: action.meta ?? null
        };
      case "success":
        __privateSet(this, _revertState, void 0);
        return {
          ...state,
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: false,
          status: "success",
          ...!action.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const error = action.error;
        if (isCancelledError(error) && error.revert && __privateGet(this, _revertState)) {
          return { ...__privateGet(this, _revertState), fetchStatus: "idle" };
        }
        return {
          ...state,
          error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          fetchFailureReason: error,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...state,
          isInvalidated: true
        };
      case "setState":
        return {
          ...state,
          ...action.state
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    this.observers.forEach((observer) => {
      observer.onQueryUpdate();
    });
    __privateGet(this, _cache).notify({ query: this, type: "updated", action });
  });
}, _d);
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState$1(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var QueryCache = (_e = class extends Subscribable {
  constructor(config = {}) {
    super();
    __privateAdd(this, _queries);
    this.config = config;
    __privateSet(this, _queries, /* @__PURE__ */ new Map());
  }
  build(client2, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query2 = this.get(queryHash);
    if (!query2) {
      query2 = new Query({
        client: client2,
        queryKey,
        queryHash,
        options: client2.defaultQueryOptions(options),
        state,
        defaultOptions: client2.getQueryDefaults(queryKey)
      });
      this.add(query2);
    }
    return query2;
  }
  add(query2) {
    if (!__privateGet(this, _queries).has(query2.queryHash)) {
      __privateGet(this, _queries).set(query2.queryHash, query2);
      this.notify({
        type: "added",
        query: query2
      });
    }
  }
  remove(query2) {
    const queryInMap = __privateGet(this, _queries).get(query2.queryHash);
    if (queryInMap) {
      query2.destroy();
      if (queryInMap === query2) {
        __privateGet(this, _queries).delete(query2.queryHash);
      }
      this.notify({ type: "removed", query: query2 });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query2) => {
        this.remove(query2);
      });
    });
  }
  get(queryHash) {
    return __privateGet(this, _queries).get(queryHash);
  }
  getAll() {
    return [...__privateGet(this, _queries).values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query2) => matchQuery(defaultedFilters, query2)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query2) => matchQuery(filters, query2)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query2) => {
        query2.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query2) => {
        query2.onOnline();
      });
    });
  }
}, _queries = new WeakMap(), _e);
var Mutation = (_f = class extends Removable {
  constructor(config) {
    super();
    __privateAdd(this, _Mutation_instances);
    __privateAdd(this, _observers);
    __privateAdd(this, _mutationCache);
    __privateAdd(this, _retryer2);
    this.mutationId = config.mutationId;
    __privateSet(this, _mutationCache, config.mutationCache);
    __privateSet(this, _observers, []);
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!__privateGet(this, _observers).includes(observer)) {
      __privateGet(this, _observers).push(observer);
      this.clearGcTimeout();
      __privateGet(this, _mutationCache).notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    __privateSet(this, _observers, __privateGet(this, _observers).filter((x) => x !== observer));
    this.scheduleGc();
    __privateGet(this, _mutationCache).notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!__privateGet(this, _observers).length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        __privateGet(this, _mutationCache).remove(this);
      }
    }
  }
  continue() {
    return __privateGet(this, _retryer2)?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const onContinue = () => {
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "continue" });
    };
    __privateSet(this, _retryer2, createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => __privateGet(this, _mutationCache).canRun(this)
    }));
    const restored = this.state.status === "pending";
    const isPaused = !__privateGet(this, _retryer2).canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pending", variables, isPaused });
        await __privateGet(this, _mutationCache).config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, {
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await __privateGet(this, _retryer2).start();
      await __privateGet(this, _mutationCache).config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await __privateGet(this, _mutationCache).config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "success", data });
      return data;
    } catch (error) {
      try {
        await __privateGet(this, _mutationCache).config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await __privateGet(this, _mutationCache).config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "error", error });
      }
    } finally {
      __privateGet(this, _mutationCache).runNext(this);
    }
  }
}, _observers = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _Mutation_instances = new WeakSet(), dispatch_fn2 = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          failureCount: action.failureCount,
          failureReason: action.error
        };
      case "pause":
        return {
          ...state,
          isPaused: true
        };
      case "continue":
        return {
          ...state,
          isPaused: false
        };
      case "pending":
        return {
          ...state,
          context: action.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: action.isPaused,
          status: "pending",
          variables: action.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...state,
          data: action.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: false
        };
      case "error":
        return {
          ...state,
          data: void 0,
          error: action.error,
          failureCount: state.failureCount + 1,
          failureReason: action.error,
          isPaused: false,
          status: "error"
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    __privateGet(this, _observers).forEach((observer) => {
      observer.onMutationUpdate(action);
    });
    __privateGet(this, _mutationCache).notify({
      mutation: this,
      type: "updated",
      action
    });
  });
}, _f);
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var MutationCache = (_g = class extends Subscribable {
  constructor(config = {}) {
    super();
    __privateAdd(this, _mutations);
    __privateAdd(this, _scopes);
    __privateAdd(this, _mutationId);
    this.config = config;
    __privateSet(this, _mutations, /* @__PURE__ */ new Set());
    __privateSet(this, _scopes, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationId, 0);
  }
  build(client2, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++__privateWrapper(this, _mutationId)._,
      options: client2.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    __privateGet(this, _mutations).add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = __privateGet(this, _scopes).get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        __privateGet(this, _scopes).set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (__privateGet(this, _mutations).delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = __privateGet(this, _scopes).get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            __privateGet(this, _scopes).delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = __privateGet(this, _scopes).get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = __privateGet(this, _scopes).get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    notifyManager.batch(() => {
      __privateGet(this, _mutations).forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      __privateGet(this, _mutations).clear();
      __privateGet(this, _scopes).clear();
    });
  }
  getAll() {
    return Array.from(__privateGet(this, _mutations));
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop))
      )
    );
  }
}, _mutations = new WeakMap(), _scopes = new WeakMap(), _mutationId = new WeakMap(), _g);
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query2) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query2
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
var QueryClient = (_h = class {
  constructor(config = {}) {
    __privateAdd(this, _queryCache);
    __privateAdd(this, _mutationCache2);
    __privateAdd(this, _defaultOptions2);
    __privateAdd(this, _queryDefaults);
    __privateAdd(this, _mutationDefaults);
    __privateAdd(this, _mountCount);
    __privateAdd(this, _unsubscribeFocus);
    __privateAdd(this, _unsubscribeOnline);
    __privateSet(this, _queryCache, config.queryCache || new QueryCache());
    __privateSet(this, _mutationCache2, config.mutationCache || new MutationCache());
    __privateSet(this, _defaultOptions2, config.defaultOptions || {});
    __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mountCount, 0);
  }
  mount() {
    __privateWrapper(this, _mountCount)._++;
    if (__privateGet(this, _mountCount) !== 1) return;
    __privateSet(this, _unsubscribeFocus, focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onFocus();
      }
    }));
    __privateSet(this, _unsubscribeOnline, onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onOnline();
      }
    }));
  }
  unmount() {
    var _a2, _b2;
    __privateWrapper(this, _mountCount)._--;
    if (__privateGet(this, _mountCount) !== 0) return;
    (_a2 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a2.call(this);
    __privateSet(this, _unsubscribeFocus, void 0);
    (_b2 = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b2.call(this);
    __privateSet(this, _unsubscribeOnline, void 0);
  }
  isFetching(filters) {
    return __privateGet(this, _queryCache).findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return __privateGet(this, _mutationCache2).findAll({ ...filters, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return __privateGet(this, _queryCache).get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query2 = __privateGet(this, _queryCache).build(this, defaultedOptions);
    const cachedData = query2.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query2.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query2))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return __privateGet(this, _queryCache).findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query2 = __privateGet(this, _queryCache).get(
      defaultedOptions.queryHash
    );
    const prevData = query2?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return __privateGet(this, _queryCache).get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache = __privateGet(this, _queryCache);
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query2) => {
        queryCache.remove(query2);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = __privateGet(this, _queryCache);
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query2) => {
        query2.reset();
      });
      return this.refetchQueries(
        {
          type: "active",
          ...filters
        },
        options
      );
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map((query2) => query2.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      __privateGet(this, _queryCache).findAll(filters).forEach((query2) => {
        query2.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries(
        {
          ...filters,
          type: filters?.refetchType ?? filters?.type ?? "active"
        },
        options
      );
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).filter((query2) => !query2.isDisabled() && !query2.isStatic()).map((query2) => {
        let promise = query2.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop);
        }
        return query2.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query2 = __privateGet(this, _queryCache).build(this, defaultedOptions);
    return query2.isStaleByTime(
      resolveStaleTime(defaultedOptions.staleTime, query2)
    ) ? query2.fetch(defaultedOptions) : Promise.resolve(query2.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return __privateGet(this, _mutationCache2).resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return __privateGet(this, _queryCache);
  }
  getMutationCache() {
    return __privateGet(this, _mutationCache2);
  }
  getDefaultOptions() {
    return __privateGet(this, _defaultOptions2);
  }
  setDefaultOptions(options) {
    __privateSet(this, _defaultOptions2, options);
  }
  setQueryDefaults(queryKey, options) {
    __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...__privateGet(this, _queryDefaults).values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...__privateGet(this, _mutationDefaults).values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...__privateGet(this, _defaultOptions2).queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...__privateGet(this, _defaultOptions2).mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    __privateGet(this, _queryCache).clear();
    __privateGet(this, _mutationCache2).clear();
  }
}, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _h);
var QueryClientContext = reactExports.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client2 = reactExports.useContext(QueryClientContext);
  if (!client2) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client2;
};
var QueryClientProvider = ({
  client: client2,
  children
}) => {
  reactExports.useEffect(() => {
    client2.mount();
    return () => {
      client2.unmount();
    };
  }, [client2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientContext.Provider, { value: client2, children });
};
const DEFAULT_RPC_URL = "rpc.thirdweb.com";
const DEFAULT_SOCIAL_URL = "social.thirdweb.com";
const DEFAULT_IN_APP_WALLET_URL = "embedded-wallet.thirdweb.com";
const DEFAULT_PAY_URL = "pay.thirdweb.com";
const DEFAULT_STORAGE_URL = "storage.thirdweb.com";
const DEFAULT_BUNDLER_URL = "bundler.thirdweb.com";
const DEFAULT_ANALYTICS_URL = "c.thirdweb.com";
const DEFAULT_INSIGHT_URL = "insight.thirdweb.com";
const DEFAULT_ENGINE_CLOUD_URL = "engine.thirdweb.com";
const DEFAULT_BRIDGE_URL = "bridge.thirdweb.com";
let domains = {
  analytics: DEFAULT_ANALYTICS_URL,
  bridge: DEFAULT_BRIDGE_URL,
  bundler: DEFAULT_BUNDLER_URL,
  engineCloud: DEFAULT_ENGINE_CLOUD_URL,
  inAppWallet: DEFAULT_IN_APP_WALLET_URL,
  insight: DEFAULT_INSIGHT_URL,
  pay: DEFAULT_PAY_URL,
  rpc: DEFAULT_RPC_URL,
  social: DEFAULT_SOCIAL_URL,
  storage: DEFAULT_STORAGE_URL
};
const setThirdwebDomains = (DomainOverrides) => {
  domains = {
    analytics: DomainOverrides.analytics ?? DEFAULT_ANALYTICS_URL,
    bridge: DomainOverrides.bridge ?? DEFAULT_BRIDGE_URL,
    bundler: DomainOverrides.bundler ?? DEFAULT_BUNDLER_URL,
    engineCloud: DomainOverrides.engineCloud ?? DEFAULT_ENGINE_CLOUD_URL,
    inAppWallet: DomainOverrides.inAppWallet ?? DEFAULT_IN_APP_WALLET_URL,
    insight: DomainOverrides.insight ?? DEFAULT_INSIGHT_URL,
    pay: DomainOverrides.pay ?? DEFAULT_PAY_URL,
    rpc: DomainOverrides.rpc ?? DEFAULT_RPC_URL,
    social: DomainOverrides.social ?? DEFAULT_SOCIAL_URL,
    storage: DomainOverrides.storage ?? DEFAULT_STORAGE_URL
  };
};
const getThirdwebDomains = () => {
  return domains;
};
const getThirdwebBaseUrl = (service) => {
  const origin = domains[service];
  if (origin.startsWith("localhost")) {
    return `http://${origin}`;
  }
  return `https://${origin}`;
};
let serviceKey = null;
const setServiceKey = (key) => {
  serviceKey = key;
};
const getServiceKey = () => {
  return serviceKey;
};
const domains$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_RPC_URL,
  getServiceKey,
  getThirdwebBaseUrl,
  getThirdwebDomains,
  setServiceKey,
  setThirdwebDomains
}, Symbol.toStringTag, { value: "Module" }));
const version$2 = "5.119.3";
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey) {
        this.delete(firstKey);
      }
    }
    return this;
  }
}
const operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detectPlatform() {
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return "mobile";
  }
  if (typeof navigator !== "undefined") {
    return "browser";
  }
  return "node";
}
function detectOS(ua) {
  for (let ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    const [os, regex2] = operatingSystemRules[ii];
    const match = regex2.exec(ua);
    if (match) {
      return os;
    }
  }
  return null;
}
function isJWT(str) {
  return str.split(".").length === 3;
}
var define_process_env_default = {};
const IS_DEV = typeof process !== "undefined" && define_process_env_default && false;
const DEFAULT_REQUEST_TIMEOUT = 6e4;
function getClientFetch(client2, ecosystem) {
  async function fetchWithHeaders(url, init) {
    const { requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT, useAuthToken, ...restInit } = init || {};
    let headers = restInit.headers ? new Headers(restInit.headers) : typeof url === "object" ? url.headers : void 0;
    const urlString = typeof url === "string" ? url : url.url;
    if (isThirdwebUrl(urlString)) {
      if (!headers) {
        headers = new Headers();
      }
      const authToken = useAuthToken && client2.secretKey && isJWT(client2.secretKey) ? client2.secretKey : void 0;
      const secretKey = client2.secretKey && !isJWT(client2.secretKey) ? client2.secretKey : void 0;
      const clientId = client2.clientId;
      if (authToken && isBundlerUrl(urlString)) {
        headers.set("authorization", `Bearer ${authToken}`);
        if (client2.teamId) {
          headers.set("x-team-id", client2.teamId);
        }
        if (clientId) {
          headers.set("x-client-id", clientId);
        }
      } else if (authToken && !isPayUrl(urlString) && !isInAppWalletUrl(urlString)) {
        headers.set("authorization", `Bearer ${authToken}`);
        if (client2.teamId) {
          headers.set("x-team-id", client2.teamId);
        }
      } else {
        if (secretKey) {
          headers.set("x-secret-key", secretKey);
        }
        if (clientId) {
          headers.set("x-client-id", clientId);
        }
      }
      if (ecosystem) {
        headers.set("x-ecosystem-id", ecosystem.id);
        if (ecosystem.partnerId) {
          headers.set("x-ecosystem-partner-id", ecosystem.partnerId);
        }
      }
      for (const [key, value] of getPlatformHeaders()) {
        headers.set(key, value);
      }
      const serviceKey2 = getServiceKey();
      if (serviceKey2) {
        headers.set("x-service-api-key", serviceKey2);
      }
    }
    let controller;
    let abortTimeout;
    if (requestTimeoutMs) {
      controller = new AbortController();
      abortTimeout = setTimeout(() => {
        controller?.abort("timeout");
      }, requestTimeoutMs);
    }
    return fetch(url, {
      ...restInit,
      headers,
      signal: controller?.signal
    }).finally(() => {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    });
  }
  return fetchWithHeaders;
}
const THIRDWEB_DOMAINS = [
  ".thirdweb.com",
  ".ipfscdn.io",
  // dev domains
  ".thirdweb.dev",
  ".thirdweb-dev.com",
  ".thirdwebstorage-dev.com"
];
const IS_THIRDWEB_URL_CACHE = new LruMap(4096);
function isThirdwebUrl(url) {
  if (IS_THIRDWEB_URL_CACHE.has(url)) {
    return IS_THIRDWEB_URL_CACHE.get(url);
  }
  try {
    const { hostname } = new URL(url);
    try {
      if (IS_DEV) ;
    } catch {
    }
    const is = THIRDWEB_DOMAINS.some((domain) => hostname.endsWith(domain));
    IS_THIRDWEB_URL_CACHE.set(url, is);
    return is;
  } catch {
    IS_THIRDWEB_URL_CACHE.set(url, false);
    return false;
  }
}
function isPayUrl(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.startsWith("pay.");
  } catch {
    return false;
  }
}
function isInAppWalletUrl(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.startsWith("in-app-wallet.") || hostname.startsWith("embedded-wallet.");
  } catch {
    return false;
  }
}
function isBundlerUrl(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.endsWith(".bundler.thirdweb.com") || hostname.endsWith(".bundler.thirdweb-dev.com");
  } catch {
    return false;
  }
}
const SDK_NAME = "unified-sdk";
let previousPlatform;
function getPlatformHeaders() {
  if (previousPlatform) {
    return previousPlatform;
  }
  let os = null;
  if (typeof navigator !== "undefined") {
    os = detectOS(navigator.userAgent);
  }
  let bundleId;
  if (typeof globalThis !== "undefined" && "Application" in globalThis) {
    bundleId = globalThis.Application.applicationId;
  }
  previousPlatform = Object.entries({
    "x-sdk-name": SDK_NAME,
    "x-sdk-os": os ? parseOs(os) : "unknown",
    "x-sdk-platform": detectPlatform(),
    "x-sdk-version": version$2,
    ...bundleId ? { "x-bundle-id": bundleId } : {}
  });
  return previousPlatform;
}
function parseOs(os) {
  const osLowerCased = os.toLowerCase();
  if (osLowerCased.startsWith("win")) {
    return "win";
  }
  switch (os) {
    case "Mac OS":
      return "mac";
    case "iOS":
      return "ios";
    case "Android OS":
      return "android";
    default:
      return osLowerCased.replace(/\s/gi, "_");
  }
}
const fetch$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IS_THIRDWEB_URL_CACHE,
  getClientFetch,
  getPlatformHeaders,
  isThirdwebUrl
}, Symbol.toStringTag, { value: "Module" }));
const promiseCache = /* @__PURE__ */ new Map();
const responseCache = /* @__PURE__ */ new Map();
function getCache(cacheKey) {
  const buildCache = (cacheKey_, cache2) => ({
    clear: () => cache2.delete(cacheKey_),
    get: () => cache2.get(cacheKey_),
    set: (data) => cache2.set(cacheKey_, data)
  });
  const promise = buildCache(cacheKey, promiseCache);
  const response = buildCache(cacheKey, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey, cacheTime = Number.POSITIVE_INFINITY }) {
  const cache2 = getCache(cacheKey);
  const response = cache2.response.get();
  if (response && cacheTime > 0) {
    const age = Date.now() - response.created.getTime();
    if (age < cacheTime) {
      return response.data;
    }
  }
  let promise = cache2.promise.get();
  if (!promise) {
    promise = fn();
    cache2.promise.set(promise);
  }
  try {
    const data = await promise;
    cache2.response.set({ created: /* @__PURE__ */ new Date(), data });
    return data;
  } finally {
    cache2.promise.clear();
  }
}
const CUSTOM_CHAIN_MAP = /* @__PURE__ */ new Map();
function defineChain(options) {
  const RPC_URL = getThirdwebDomains().rpc;
  if (typeof options === "number") {
    return {
      id: options,
      rpc: `https://${options}.${RPC_URL}`
    };
  }
  if (isViemChain(options)) {
    return convertViemChain(options);
  }
  if (isLegacyChain(options)) {
    return convertLegacyChain(options);
  }
  let rpc2 = options.rpc;
  if (!rpc2) {
    rpc2 = `https://${options.id}.${RPC_URL}`;
  }
  const chain2 = { ...options, rpc: rpc2 };
  CUSTOM_CHAIN_MAP.set(options.id, chain2);
  return chain2;
}
function cacheChains(chains) {
  for (const chain2 of chains) {
    CUSTOM_CHAIN_MAP.set(chain2.id, chain2);
  }
}
function getCachedChain(id) {
  if (CUSTOM_CHAIN_MAP.has(id)) {
    return CUSTOM_CHAIN_MAP.get(id);
  }
  const RPC_URL = getThirdwebDomains().rpc;
  const chain2 = {
    id,
    rpc: `https://${id}.${RPC_URL}`
  };
  return chain2;
}
function getCachedChainIfExists(id) {
  return CUSTOM_CHAIN_MAP.get(id);
}
function isLegacyChain(chain2) {
  return "rpc" in chain2 && Array.isArray(chain2.rpc) && "slug" in chain2;
}
function convertLegacyChain(legacyChain) {
  const RPC_URL = getThirdwebDomains().rpc;
  return {
    blockExplorers: legacyChain?.explorers?.map((explorer) => ({
      apiUrl: explorer.url,
      name: explorer.name,
      url: explorer.url
    })),
    faucets: legacyChain.faucets ? [...legacyChain.faucets] : void 0,
    icon: legacyChain.icon,
    id: legacyChain.chainId,
    name: legacyChain.name,
    nativeCurrency: {
      decimals: legacyChain.nativeCurrency.decimals,
      name: legacyChain.nativeCurrency.name,
      symbol: legacyChain.nativeCurrency.symbol
    },
    rpc: legacyChain.rpc[0] ?? `https://${legacyChain.chainId}.${RPC_URL}`,
    testnet: legacyChain.testnet ? true : void 0
  };
}
function isViemChain(chain2) {
  return "rpcUrls" in chain2 && !("rpc" in chain2);
}
function convertViemChain(viemChain) {
  const RPC_URL = getThirdwebDomains().rpc;
  return {
    blockExplorers: viemChain?.blockExplorers ? Object.values(viemChain?.blockExplorers).map((explorer) => {
      return {
        apiUrl: explorer.apiUrl,
        name: explorer.name,
        url: explorer.url
      };
    }) : [],
    id: viemChain.id,
    name: viemChain.name,
    nativeCurrency: {
      decimals: viemChain.nativeCurrency.decimals,
      name: viemChain.nativeCurrency.name,
      symbol: viemChain.nativeCurrency.symbol
    },
    rpc: viemChain.rpcUrls.default.http[0] ?? `https://${viemChain.id}.${RPC_URL}`,
    testnet: viemChain.testnet ? true : void 0
  };
}
function getRpcUrlForChain(options) {
  const baseRpcUrl = getThirdwebDomains().rpc;
  if (typeof options.chain === "number") {
    return `https://${options.chain}.${baseRpcUrl}/${options.client.clientId}`;
  }
  const { rpc: rpc2 } = options.chain;
  if (isThirdwebUrl(rpc2)) {
    const rpcUrl = new URL(options.chain.rpc.replace(DEFAULT_RPC_URL, baseRpcUrl));
    if (rpcUrl.pathname === "/" || rpcUrl.pathname.startsWith("/$")) {
      rpcUrl.pathname = `/${options.client.clientId}`;
    }
    return rpcUrl.toString();
  }
  return rpc2;
}
async function getChainSymbol(chain2) {
  if (!chain2.nativeCurrency?.symbol) {
    return getChainMetadata(chain2).then((data) => data.nativeCurrency.symbol).catch(() => {
      return "ETH";
    });
  }
  return chain2.nativeCurrency.symbol;
}
async function getChainDecimals(chain2) {
  if (!chain2.nativeCurrency?.decimals) {
    return getChainMetadata(chain2).then((data) => data.nativeCurrency.decimals).catch(() => {
      return 18;
    });
  }
  return chain2.nativeCurrency.decimals;
}
async function getChainNativeCurrencyName(chain2) {
  if (!chain2.nativeCurrency?.name) {
    return getChainMetadata(chain2).then((data) => data.nativeCurrency.name).catch(() => {
      return "ETH";
    });
  }
  return chain2.nativeCurrency.name;
}
function getChainMetadata(chain2) {
  const chainId = chain2.id;
  return withCache(async () => {
    try {
      const res = await fetch(`https://api.thirdweb.com/v1/chains/${chainId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch chain data for chainId ${chainId}. ${res.status} ${res.statusText}`);
      }
      const response = await res.json();
      if (response.error) {
        throw new Error(`Failed to fetch chain data for chainId ${chainId}`);
      }
      if (!response.data) {
        throw new Error(`Failed to fetch chain data for chainId ${chainId}`);
      }
      const data = response.data;
      return createChainMetadata(chain2, data);
    } catch {
      return createChainMetadata(chain2);
    }
  }, {
    cacheKey: `chain:${chainId}`,
    cacheTime: 5 * 60 * 1e3
    // 5 minutes
  });
}
async function getInsightEnabledChainIds() {
  return withCache(async () => {
    const res = await fetch(`https://api.thirdweb.com/v1/chains/services?service=insight`);
    if (!res.ok) {
      throw new Error(`Failed to fetch services. ${res.status} ${res.statusText}`);
    }
    const response = await res.json();
    return Object.keys(response.data).map((chainId) => Number(chainId));
  }, {
    cacheKey: `chain:insight-enabled`,
    cacheTime: 24 * 60 * 60 * 1e3
    // 1 day
  });
}
function convertApiChainToChain(apiChain) {
  return {
    blockExplorers: apiChain.explorers?.map((explorer) => {
      return {
        apiUrl: explorer.url,
        name: explorer.name,
        url: explorer.url
      };
    }),
    faucets: apiChain.faucets ? [...apiChain.faucets] : void 0,
    icon: apiChain.icon,
    id: apiChain.chainId,
    name: apiChain.name,
    nativeCurrency: apiChain.nativeCurrency,
    rpc: apiChain.rpc[0] || "",
    testnet: apiChain.testnet === true ? true : void 0
  };
}
function createChainMetadata(chain2, data) {
  const nativeCurrency = chain2.nativeCurrency ? {
    ...data?.nativeCurrency,
    ...chain2.nativeCurrency
  } : data?.nativeCurrency;
  return {
    ...data,
    chain: data?.chain || chain2.name || "",
    chainId: chain2.id || data?.chainId || -1,
    explorers: chain2.blockExplorers?.map((e) => ({
      name: e.name,
      standard: "EIP3091",
      url: e.url
    })) || data?.explorers,
    icon: chain2.icon || data?.icon,
    name: chain2.name || data?.name || "",
    nativeCurrency: {
      decimals: nativeCurrency?.decimals || 18,
      name: nativeCurrency?.name || "",
      symbol: nativeCurrency?.symbol || ""
    },
    rpc: chain2.rpc ? [chain2.rpc] : data?.rpc || [""],
    shortName: data?.shortName || chain2.name || "",
    slug: data?.slug || chain2.name || "",
    stackType: data?.stackType || "",
    testnet: chain2.testnet || data?.testnet || false
  };
}
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CUSTOM_CHAIN_MAP,
  cacheChains,
  convertApiChainToChain,
  convertLegacyChain,
  convertViemChain,
  defineChain,
  getCachedChain,
  getCachedChainIfExists,
  getChainDecimals,
  getChainMetadata,
  getChainNativeCurrencyName,
  getChainSymbol,
  getInsightEnabledChainIds,
  getRpcUrlForChain
}, Symbol.toStringTag, { value: "Module" }));
function isHex$1(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
function size$2(value) {
  if (isHex$1(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
const version$1 = "2.39.0";
let errorConfig = {
  getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
  version: `viem@${version$1}`
};
function setErrorConfig(config) {
  errorConfig = config;
}
let BaseError$1 = class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    const details = (() => {
      if (args.cause instanceof BaseError)
        return args.cause.details;
      if (args.cause?.message)
        return args.cause.message;
      return args.details;
    })();
    const docsPath = (() => {
      if (args.cause instanceof BaseError)
        return args.cause.docsPath || args.docsPath;
      return args.docsPath;
    })();
    const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsUrl ? [`Docs: ${docsUrl}`] : [],
      ...details ? [`Details: ${details}`] : [],
      ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
    ].join("\n");
    super(message, args.cause ? { cause: args.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.name = args.name ?? this.name;
    this.shortMessage = shortMessage;
    this.version = version$1;
  }
  walk(fn) {
    return walk$1(this, fn);
  }
};
function walk$1(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk$1(err.cause, fn);
  return fn ? null : err;
}
let SliceOffsetOutOfBoundsError$1 = class SliceOffsetOutOfBoundsError extends BaseError$1 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size2}).`, { name: "SliceOffsetOutOfBoundsError" });
  }
};
let SizeExceedsPaddingSizeError$2 = class SizeExceedsPaddingSizeError extends BaseError$1 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
  }
};
class InvalidBytesLengthError extends BaseError$1 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size2} ${type} long.`, { name: "InvalidBytesLengthError" });
  }
}
function pad$2(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex$1(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex$1(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError$2({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError$2({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i2 = 0; i2 < size2; i2++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i2 : size2 - i2 - 1] = bytes[padEnd ? i2 : bytes.length - i2 - 1];
  }
  return paddedBytes;
}
let IntegerOutOfRangeError$1 = class IntegerOutOfRangeError extends BaseError$1 {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
  }
};
class InvalidBytesBooleanError extends BaseError$1 {
  constructor(bytes) {
    super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
      name: "InvalidBytesBooleanError"
    });
  }
}
class InvalidHexBooleanError extends BaseError$1 {
  constructor(hex) {
    super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, { name: "InvalidHexBooleanError" });
  }
}
let InvalidHexValueError$1 = class InvalidHexValueError extends BaseError$1 {
  constructor(value) {
    super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`, { name: "InvalidHexValueError" });
  }
};
let SizeOverflowError$2 = class SizeOverflowError extends BaseError$1 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
  }
};
function trim$2(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i2 = 0; i2 < data.length - 1; i2++) {
    if (data[dir === "left" ? i2 : data.length - i2 - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right")
      data = `${data}0`;
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}
function assertSize$2(hexOrBytes, { size: size2 }) {
  if (size$2(hexOrBytes) > size2)
    throw new SizeOverflowError$2({
      givenSize: size$2(hexOrBytes),
      maxSize: size2
    });
}
function fromHex$1(hex, toOrOpts) {
  const opts = typeof toOrOpts === "string" ? { to: toOrOpts } : toOrOpts;
  const to = opts.to;
  if (to === "number")
    return hexToNumber$1(hex, opts);
  if (to === "bigint")
    return hexToBigInt$1(hex, opts);
  if (to === "string")
    return hexToString$1(hex, opts);
  if (to === "boolean")
    return hexToBool(hex, opts);
  return hexToBytes$1(hex, opts);
}
function hexToBigInt$1(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize$2(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size2) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize$2(hex, { size: opts.size });
    hex = trim$2(hex);
  }
  if (trim$2(hex) === "0x00")
    return false;
  if (trim$2(hex) === "0x01")
    return true;
  throw new InvalidHexBooleanError(hex);
}
function hexToNumber$1(hex, opts = {}) {
  return Number(hexToBigInt$1(hex, opts));
}
function hexToString$1(hex, opts = {}) {
  let bytes = hexToBytes$1(hex);
  if (opts.size) {
    assertSize$2(bytes, { size: opts.size });
    bytes = trim$2(bytes, { dir: "right" });
  }
  return new TextDecoder().decode(bytes);
}
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i2) => i2.toString(16).padStart(2, "0"));
function toHex$1(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex$1(value, opts);
  if (typeof value === "string") {
    return stringToHex$1(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex$1(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex$1(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize$2(hex, { size: opts.size });
    return pad$2(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i2 = 0; i2 < value.length; i2++) {
    string += hexes$1[value[i2]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize$2(hex, { size: opts.size });
    return pad$2(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex$1(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError$1({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad$2(hex, { size: size2 });
  return hex;
}
const encoder$3 = /* @__PURE__ */ new TextEncoder();
function stringToHex$1(value_, opts = {}) {
  const value = encoder$3.encode(value_);
  return bytesToHex(value, opts);
}
const encoder$2 = /* @__PURE__ */ new TextEncoder();
function toBytes$3(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes$1(value, opts);
  if (typeof value === "boolean")
    return boolToBytes$1(value, opts);
  if (isHex$1(value))
    return hexToBytes$1(value, opts);
  return stringToBytes$1(value, opts);
}
function boolToBytes$1(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize$2(bytes, { size: opts.size });
    return pad$2(bytes, { size: opts.size });
  }
  return bytes;
}
const charCodeMap$1 = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16$1(char) {
  if (char >= charCodeMap$1.zero && char <= charCodeMap$1.nine)
    return char - charCodeMap$1.zero;
  if (char >= charCodeMap$1.A && char <= charCodeMap$1.F)
    return char - (charCodeMap$1.A - 10);
  if (char >= charCodeMap$1.a && char <= charCodeMap$1.f)
    return char - (charCodeMap$1.a - 10);
  return void 0;
}
function hexToBytes$1(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize$2(hex, { size: opts.size });
    hex = pad$2(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16$1(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16$1(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError$1(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes$1(value, opts) {
  const hex = numberToHex$1(value, opts);
  return hexToBytes$1(hex);
}
function stringToBytes$1(value, opts = {}) {
  const bytes = encoder$2.encode(value);
  if (typeof opts.size === "number") {
    assertSize$2(bytes, { size: opts.size });
    return pad$2(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
function defineFormatter(type, format) {
  return ({ exclude, format: overrides }) => {
    return {
      exclude,
      format: (args, action) => {
        const formatted = format(args, action);
        if (exclude) {
          for (const key of exclude) {
            delete formatted[key];
          }
        }
        return {
          ...formatted,
          ...overrides(args, action)
        };
      },
      type
    };
  };
}
const transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction, _) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber$1(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber$1(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
const defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}
const receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt, _) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber$1(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
const defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);
const version = "0.1.1";
function getVersion() {
  return version;
}
class BaseError2 extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      if (options.cause instanceof BaseError2) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
        return options.cause.details;
      if (options.cause?.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof BaseError2)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x) => typeof x === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn);
  return fn ? null : err;
}
const bigIntSuffix = "#__bigint";
function stringify$1(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof replacer === "function")
      return replacer(key, value2);
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}
function assertSize$1(bytes, size_) {
  if (size$1(bytes) > size_)
    throw new SizeOverflowError$1({
      givenSize: size$1(bytes),
      maxSize: size_
    });
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad$1(bytes, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError$1({
      size: bytes.length,
      targetSize: size2,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i2 = 0; i2 < size2; i2++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i2 : size2 - i2 - 1] = bytes[padEnd ? i2 : bytes.length - i2 - 1];
  }
  return paddedBytes;
}
function trim$1(value, options = {}) {
  const { dir = "left" } = options;
  let data = value;
  let sliceLength = 0;
  for (let i2 = 0; i2 < data.length - 1; i2++) {
    if (data[dir === "left" ? i2 : data.length - i2 - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  return data;
}
function assertSize(hex, size_) {
  if (size(hex) > size_)
    throw new SizeOverflowError3({
      givenSize: size(hex),
      maxSize: size_
    });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError2({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError2({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
function pad(hex_, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError3({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function trim(value, options = {}) {
  const { dir = "left" } = options;
  let data = value.replace("0x", "");
  let sliceLength = 0;
  for (let i2 = 0; i2 < data.length - 1; i2++) {
    if (data[dir === "left" ? i2 : data.length - i2 - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (data === "0")
    return "0x";
  if (dir === "right" && data.length % 2 === 1)
    return `0x${data}0`;
  return `0x${data}`;
}
const encoder$1 = /* @__PURE__ */ new TextEncoder();
function concat$1(...values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  for (let i2 = 0, index = 0; i2 < values.length; i2++) {
    const arr = values[i2];
    result.set(arr, index);
    index += arr.length;
  }
  return result;
}
function from$1(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromBoolean$1(value, options = {}) {
  const { size: size2 } = options;
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof size2 === "number") {
    assertSize$1(bytes, size2);
    return padLeft$1(bytes, size2);
  }
  return bytes;
}
function fromHex(value, options = {}) {
  const { size: size2 } = options;
  let hex = value;
  if (size2) {
    assertSize(value, size2);
    hex = padRight(value, size2);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromNumber$1(value, options) {
  const hex = fromNumber(value, options);
  return fromHex(hex);
}
function fromString$1(value, options = {}) {
  const { size: size2 } = options;
  const bytes = encoder$1.encode(value);
  if (typeof size2 === "number") {
    assertSize$1(bytes, size2);
    return padRight$1(bytes, size2);
  }
  return bytes;
}
function padLeft$1(value, size2) {
  return pad$1(value, { dir: "left", size: size2 });
}
function padRight$1(value, size2) {
  return pad$1(value, { dir: "right", size: size2 });
}
function size$1(value) {
  return value.length;
}
function trimRight(value) {
  return trim$1(value, { dir: "right" });
}
let SizeOverflowError$1 = class SizeOverflowError2 extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
let SizeExceedsPaddingSizeError$1 = class SizeExceedsPaddingSizeError2 extends BaseError2 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};
const encoder = /* @__PURE__ */ new TextEncoder();
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i2) => i2.toString(16).padStart(2, "0"));
function assert(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError2(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError2(value);
}
function concat(...values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
function from(value) {
  if (value instanceof Uint8Array)
    return fromBytes(value);
  if (Array.isArray(value))
    return fromBytes(new Uint8Array(value));
  return value;
}
function fromBoolean(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize(hex, options.size);
    return padLeft(hex, options.size);
  }
  return hex;
}
function fromBytes(value, options = {}) {
  let string = "";
  for (let i2 = 0; i2 < value.length; i2++)
    string += hexes[value[i2]];
  const hex = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size2 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError2({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size2)
    return padLeft(hex, size2);
  return hex;
}
function fromString(value, options = {}) {
  return fromBytes(encoder.encode(value), options);
}
function padLeft(value, size2) {
  return pad(value, { dir: "left", size: size2 });
}
function padRight(value, size2) {
  return pad(value, { dir: "right", size: size2 });
}
function slice(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset(value_, start, end);
  return value_;
}
function size(value) {
  return Math.ceil((value.length - 2) / 2);
}
function trimLeft(value) {
  return trim(value, { dir: "left" });
}
function toBigInt(hex, options = {}) {
  const { signed } = options;
  if (options.size)
    assertSize(hex, options.size);
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max_unsigned = (1n << BigInt(size2) * 8n) - 1n;
  const max_signed = max_unsigned >> 1n;
  if (value <= max_signed)
    return value;
  return value - max_unsigned - 1n;
}
function toBytes$2(hex, options = {}) {
  return fromHex(hex, options);
}
function toNumber(hex, options = {}) {
  const { signed, size: size2 } = options;
  if (!signed && !size2)
    return Number(hex);
  return Number(toBigInt(hex, options));
}
function toString(hex, options = {}) {
  const { size: size2 } = options;
  let bytes = fromHex(hex);
  if (size2) {
    assertSize$1(bytes, size2);
    bytes = trimRight(bytes);
  }
  return new TextDecoder().decode(bytes);
}
function validate(value, options = {}) {
  const { strict = false } = options;
  try {
    assert(value, { strict });
    return true;
  } catch {
    return false;
  }
}
class IntegerOutOfRangeError2 extends BaseError2 {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number \`${value}\` is not in safe${size2 ? ` ${size2 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
}
class InvalidHexTypeError extends BaseError2 {
  constructor(value) {
    super(`Value \`${typeof value === "object" ? stringify$1(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
}
class InvalidHexValueError2 extends BaseError2 {
  constructor(value) {
    super(`Value \`${value}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
}
class SizeOverflowError3 extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
}
class SliceOffsetOutOfBoundsError2 extends BaseError2 {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SliceOffsetOutOfBoundsError"
    });
  }
}
class SizeExceedsPaddingSizeError3 extends BaseError2 {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size2}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
}
function isHex(value, options = {}) {
  return validate(value, options);
}
function padHex(hex_, options = {}) {
  const { dir, size: size2 = 32 } = options;
  if (size2 === null) {
    return hex_;
  }
  if (dir === "right") {
    return padRight(hex_, size2);
  }
  return padLeft(hex_, size2);
}
function hexToString(hex, opts = {}) {
  return toString(hex, opts);
}
function hexToBigInt(hex, opts = {}) {
  return toBigInt(hex, opts);
}
function hexToNumber(hex, opts = {}) {
  return toNumber(hex, opts);
}
function hexToUint8Array(hex, opts = {}) {
  return toBytes$2(hex, opts);
}
function boolToHex(value, opts = {}) {
  return fromBoolean(value, opts);
}
function uint8ArrayToHex(value, opts = {}) {
  return fromBytes(value, opts);
}
function numberToHex(value_, opts = {}) {
  return fromNumber(value_, opts);
}
function stringToHex(value_, opts = {}) {
  return fromString(value_, opts);
}
function toHex(value, opts = {}) {
  switch (typeof value) {
    case "number":
    case "bigint":
      return numberToHex(value, opts);
    case "string":
      return stringToHex(value, opts);
    case "boolean":
      return boolToHex(value, opts);
    default:
      return uint8ArrayToHex(value, opts);
  }
}
function toBytes$1(value, opts = {}) {
  switch (typeof value) {
    case "number":
    case "bigint":
      return numberToBytes(value, opts);
    case "boolean":
      return boolToBytes(value, opts);
    default:
      if (isHex(value)) {
        return hexToBytes(value, opts);
      }
      return stringToBytes(value, opts);
  }
}
function boolToBytes(value, opts = {}) {
  return fromBoolean$1(value, opts);
}
function hexToBytes(hex_, opts = {}) {
  return fromHex(hex_, opts);
}
function numberToBytes(value, opts) {
  return fromNumber$1(value, opts);
}
function stringToBytes(value, opts = {}) {
  return fromString$1(value, opts);
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i2 = 0; i2 < lst.length; i2++) {
    const { h, l } = fromBig(lst[i2], le);
    [Ah[i2], Al[i2]] = [h, l];
  }
  return [Ah, Al];
}
const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i2 = 0; i2 < arr.length; i2++) {
    arr[i2] = byteSwap(arr[i2]);
  }
}
typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("utf8ToBytes expected string, got " + typeof str);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
class Hash2 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
const rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
const rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
class Keccak extends Hash2 {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    if (!isLE)
      byteSwap32(this.state32);
    keccakP(this.state32, this.rounds);
    if (!isLE)
      byteSwap32(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i2 = 0; i2 < take; i2++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
const gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
const keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
function keccak256(value, to) {
  const bytes = keccak_256(isHex(value, { strict: false }) ? hexToUint8Array(value) : value);
  if (to === "bytes") {
    return bytes;
  }
  return uint8ArrayToHex(bytes);
}
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const IS_ADDRESS_CACHE = new LruMap(4096);
function isAddress(address) {
  if (IS_ADDRESS_CACHE.has(address)) {
    return IS_ADDRESS_CACHE.get(address);
  }
  const result = ADDRESS_REGEX.test(address) && (address.toLowerCase() === address || checksumAddress(address) === address);
  IS_ADDRESS_CACHE.set(address, result);
  return result;
}
function checksumAddress(address) {
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address_ = hexAddress.split("");
  for (let i2 = 0; i2 < 40; i2 += 2) {
    if (hash[i2 >> 1] >> 4 >= 8 && address[i2]) {
      address_[i2] = address_[i2].toUpperCase();
    }
    if ((hash[i2 >> 1] & 15) >= 8 && address[i2 + 1]) {
      address_[i2 + 1] = address_[i2 + 1].toUpperCase();
    }
  }
  return `0x${address_.join("")}`;
}
function getAddress(address) {
  if (!isAddress(address)) {
    throw new Error(`Invalid address: ${address}`);
  }
  return checksumAddress(address);
}
function shortenAddress(address, length = 4) {
  const _address = getAddress(address);
  return shortenHex(_address, length);
}
function shortenHex(hex, length = 4) {
  return `${hex.slice(0, length + 2)}...${hex.slice(-length)}`;
}
function getContract(options) {
  if (!options.client) {
    throw new Error(`getContract validation error - invalid client: ${options.client}`);
  }
  if (!isAddress(options.address)) {
    throw new Error(`getContract validation error - invalid address: ${options.address}`);
  }
  if (!options.chain || !options.chain.id) {
    throw new Error(`getContract validation error - invalid chain: ${options.chain}`);
  }
  return options;
}
async function eth_blockNumber(request) {
  const blockNumberHex = await request({
    method: "eth_blockNumber"
  });
  return hexToBigInt(blockNumberHex);
}
function stringify(value, replacer, space) {
  const res = JSON.stringify(value, (key, value_) => {
    const value__ = typeof value_ === "bigint" ? value_.toString() : value_;
    return typeof replacer === "function" ? replacer(key, value__) : value__;
  }, space);
  return res;
}
const json = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  stringify
}, Symbol.toStringTag, { value: "Module" }));
async function fetchRpc(rpcUrl, client2, options) {
  const response = await getClientFetch(client2)(rpcUrl, {
    body: stringify(options.requests),
    headers: {
      ...client2.config?.rpc?.fetch?.headers,
      "Content-Type": "application/json"
    },
    keepalive: client2.config?.rpc?.fetch?.keepalive,
    method: "POST",
    requestTimeoutMs: options.requestTimeoutMs ?? client2.config?.rpc?.fetch?.requestTimeoutMs
  });
  if (!response.ok) {
    const error = await response.text().catch(() => null);
    throw new Error(`RPC request failed with status ${response.status} - ${response.statusText}: ${error || "unknown error"}`);
  }
  return await response.json();
}
async function fetchSingleRpc(rpcUrl, client2, options) {
  const response = await getClientFetch(client2)(rpcUrl, {
    body: stringify(options.request),
    headers: {
      ...client2.config?.rpc?.fetch?.headers || {},
      "Content-Type": "application/json"
    },
    keepalive: client2.config?.rpc?.fetch?.keepalive,
    method: "POST",
    requestTimeoutMs: options.requestTimeoutMs ?? client2.config?.rpc?.fetch?.requestTimeoutMs
  });
  if (!response.ok) {
    const error = await response.text().catch(() => null);
    throw new Error(`RPC request failed with status ${response.status} - ${response.statusText}: ${error || "unknown error"}`);
  }
  return await response.json();
}
const RPC_CLIENT_MAP = /* @__PURE__ */ new WeakMap();
function getRpcClientMap(client2) {
  if (RPC_CLIENT_MAP.has(client2)) {
    return RPC_CLIENT_MAP.get(client2);
  }
  const rpcClientMap = /* @__PURE__ */ new Map();
  RPC_CLIENT_MAP.set(client2, rpcClientMap);
  return rpcClientMap;
}
function rpcRequestKey(request) {
  return `${request.method}:${stringify(request.params)}`;
}
const DEFAULT_MAX_BATCH_SIZE = 100;
const DEFAULT_BATCH_TIMEOUT_MS = 0;
function getRpcClient(options) {
  const rpcClientMap = getRpcClientMap(options.client);
  const rpcUrl = options.chain.rpc;
  if (rpcClientMap.has(rpcUrl)) {
    return rpcClientMap.get(rpcUrl);
  }
  const rpcClient = (() => {
    const rpcUrl2 = getRpcUrlForChain({
      chain: options.chain,
      client: options.client
    });
    const batchSize = (
      // look at the direct options passed
      options.config?.maxBatchSize ?? // look at the client options
      options.client.config?.rpc?.maxBatchSize ?? // use defaults
      DEFAULT_MAX_BATCH_SIZE
    );
    const batchTimeoutMs = (
      // look at the direct options passed
      options.config?.batchTimeoutMs ?? // look at the client options
      options.client.config?.rpc?.batchTimeoutMs ?? DEFAULT_BATCH_TIMEOUT_MS
    );
    const inflightRequests = /* @__PURE__ */ new Map();
    let pendingBatch = [];
    let pendingBatchTimeout = null;
    function sendPendingBatch() {
      if (pendingBatchTimeout) {
        clearTimeout(pendingBatchTimeout);
        pendingBatchTimeout = null;
      }
      const requests = new Array(pendingBatch.length);
      const activeBatch = pendingBatch.slice().map((inflight, index) => {
        inflight.request.id = index;
        inflight.request.jsonrpc = "2.0";
        requests[index] = inflight.request;
        return inflight;
      });
      pendingBatch = [];
      fetchRpc(rpcUrl2, options.client, {
        requests,
        requestTimeoutMs: options.config?.requestTimeoutMs
      }).then((responses) => {
        activeBatch.forEach((inflight, index) => {
          const response = responses[index];
          if (!response) {
            inflight.reject(new Error(`RPC Error from ${rpcUrl2}:
requests: ${stringify(requests)}
responses: ${stringify(responses)}`));
          } else if (response instanceof Error) {
            inflight.reject(response);
          } else if ("error" in response) {
            inflight.reject(response.error);
          } else if (typeof response === "string") {
            inflight.reject(new Error(response));
          } else if (response.method === "eth_subscription") {
            inflight.reject("Subscriptions not supported yet");
          } else {
            inflight.resolve(response.result);
          }
        });
      }).catch((err) => {
        for (const inflight of activeBatch) {
          inflight.reject(err);
        }
      }).finally(() => {
        inflightRequests.clear();
      });
    }
    if (batchSize === 1) {
      return async (request) => {
        request.id = 1;
        request.jsonrpc = "2.0";
        const rpcResponse = await fetchSingleRpc(rpcUrl2, options.client, {
          request,
          requestTimeoutMs: options.config?.requestTimeoutMs
        });
        if (!rpcResponse) {
          throw new Error("No response");
        }
        if ("error" in rpcResponse) {
          throw rpcResponse.error;
        }
        return rpcResponse.result;
      };
    }
    return async (request) => {
      const requestKey = rpcRequestKey(request);
      if (inflightRequests.has(requestKey)) {
        return inflightRequests.get(requestKey);
      }
      let resolve;
      let reject;
      const promise = new Promise((resolve_, reject_) => {
        resolve = resolve_;
        reject = reject_;
      });
      inflightRequests.set(requestKey, promise);
      pendingBatch.push({ reject, request, requestKey, resolve });
      if (batchSize > 1) {
        if (!pendingBatchTimeout) {
          pendingBatchTimeout = setTimeout(sendPendingBatch, batchTimeoutMs);
        }
        if (pendingBatch.length >= batchSize) {
          sendPendingBatch();
        }
      } else {
        sendPendingBatch();
      }
      return promise;
    };
  })();
  rpcClientMap.set(rpcUrl, rpcClient);
  return rpcClient;
}
const rpc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRpcClient
}, Symbol.toStringTag, { value: "Module" }));
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const MAX_POLL_DELAY = 5e3;
const DEFAULT_POLL_DELAY = 1e3;
const MIN_POLL_DELAY = 500;
const DEFAULT_OVERPOLL_RATIO = 2;
const SLIDING_WINDOW_SIZE = 10;
function getAverageBlockTime(blockTimes) {
  while (blockTimes.length < SLIDING_WINDOW_SIZE) {
    blockTimes.unshift(DEFAULT_POLL_DELAY);
  }
  const sum = blockTimes.reduce((acc, blockTime) => acc + blockTime, 0);
  return sum / blockTimes.length;
}
function createBlockNumberPoller(client2, chain2, overPollRatio, onError) {
  let subscribers = [];
  let blockTimesWindow = [];
  let isActive = false;
  let lastBlockNumber;
  let lastBlockAt;
  const rpcRequest = getRpcClient({ chain: chain2, client: client2 });
  async function poll() {
    if (!isActive) {
      return;
    }
    try {
      const blockNumber = await eth_blockNumber(rpcRequest);
      if (!lastBlockNumber || blockNumber > lastBlockNumber) {
        let newBlockNumbers = [];
        if (lastBlockNumber) {
          for (let i2 = lastBlockNumber + 1n; i2 <= blockNumber; i2++) {
            newBlockNumbers.push(BigInt(i2));
          }
        } else {
          newBlockNumbers = [blockNumber];
        }
        lastBlockNumber = blockNumber;
        const currentTime = Date.now();
        if (lastBlockAt) {
          const blockTime = (currentTime - lastBlockAt) / newBlockNumbers.length;
          blockTimesWindow.push(blockTime);
          blockTimesWindow = blockTimesWindow.slice(-SLIDING_WINDOW_SIZE);
        }
        lastBlockAt = currentTime;
        for (const b of newBlockNumbers) {
          for (const subscriberCallback of subscribers) {
            subscriberCallback(b);
          }
        }
      }
    } catch (err) {
      if (onError) {
        onError(err);
      } else {
        console.error(`[watchBlockNumber]: Failed to poll for latest block number: ${err}`);
      }
    }
    const currentApproximateBlockTime = getAverageBlockTime(blockTimesWindow);
    const pollDelay = Math.max(MIN_POLL_DELAY, Math.min(MAX_POLL_DELAY, Math.max(MIN_POLL_DELAY, currentApproximateBlockTime)));
    await sleep(pollDelay / (overPollRatio ?? DEFAULT_OVERPOLL_RATIO));
    poll();
  }
  return function subscribe(callBack, initialBlockNumber) {
    subscribers.push(callBack);
    if (!isActive) {
      lastBlockNumber = initialBlockNumber;
      isActive = true;
      poll();
    }
    return function unSubscribe() {
      subscribers = subscribers.filter((fn) => fn !== callBack);
      if (subscribers.length === 0) {
        lastBlockNumber = void 0;
        lastBlockAt = void 0;
        isActive = false;
      }
    };
  };
}
const existingPollers = /* @__PURE__ */ new Map();
function watchBlockNumber(opts) {
  const { client: client2, chain: chain2, onNewBlockNumber, overPollRatio, latestBlockNumber, onError } = opts;
  const chainId = chain2.id;
  let poller = existingPollers.get(chainId);
  if (!poller) {
    poller = createBlockNumberPoller(client2, chain2, overPollRatio, onError);
    existingPollers.set(chainId, poller);
  }
  return poller(onNewBlockNumber, latestBlockNumber);
}
async function track({ client: client2, ecosystem, data }) {
  const fetch2 = getClientFetch(client2, ecosystem);
  const event = {
    source: "sdk",
    ...data
  };
  return fetch2(`${getThirdwebBaseUrl("analytics")}/event`, {
    body: stringify(event),
    method: "POST"
  }).catch(() => {
  });
}
async function eth_getTransactionReceipt(request, params) {
  const receipt = await request({
    method: "eth_getTransactionReceipt",
    params: [params.hash]
  });
  if (!receipt) {
    throw new Error("Transaction receipt not found.");
  }
  return formatTransactionReceipt(receipt);
}
const DEFAULT_MAX_BLOCKS_WAIT_TIME = 100;
const map = /* @__PURE__ */ new Map();
function waitForReceipt(options) {
  const { transactionHash, chain: chain2, client: client2 } = options;
  const chainId = chain2.id;
  const key = `${chainId}:tx_${transactionHash}`;
  const maxBlocksWaitTime = options.maxBlocksWaitTime ?? DEFAULT_MAX_BLOCKS_WAIT_TIME;
  if (map.has(key)) {
    return map.get(key);
  }
  const promise = new Promise((resolve, reject) => {
    if (!transactionHash) {
      reject(new Error("Transaction has no transactionHash to wait for, did you execute it?"));
    }
    const request = getRpcClient({ chain: chain2, client: client2 });
    let blocksWaited = -1;
    const unwatch = watchBlockNumber({
      chain: chain2,
      client: client2,
      onNewBlockNumber: async () => {
        blocksWaited++;
        if (blocksWaited >= maxBlocksWaitTime) {
          unwatch();
          reject(new Error(`Transaction receipt for ${transactionHash} not found after ${maxBlocksWaitTime} blocks`));
          return;
        }
        try {
          const receipt = await eth_getTransactionReceipt(request, {
            hash: transactionHash
          });
          unwatch();
          resolve(receipt);
        } catch {
        }
      }
    });
  }).finally(() => {
    map.delete(key);
  });
  map.set(key, promise);
  return promise;
}
function invalidateWalletBalance(queryClient, chainId) {
  queryClient.invalidateQueries({
    queryKey: chainId ? ["walletBalance", chainId] : ["walletBalance"]
  });
  queryClient.invalidateQueries({
    queryKey: chainId ? ["internal_account_balance", chainId] : ["internal_account_balance"]
  });
  queryClient.invalidateQueries({
    queryKey: chainId ? ["nfts", chainId] : ["nfts"]
  });
  queryClient.invalidateQueries({
    queryKey: chainId ? ["tokens", chainId] : ["tokens"]
  });
}
const ConnectionManagerCtx = reactExports.createContext(void 0);
function useConnectionManager() {
  const connectionManager = useConnectionManagerCtx("useConnectionManager");
  if (!connectionManager) {
    throw new Error("useConnectionManager must be used within a <ThirdwebProvider> Provider");
  }
  return connectionManager;
}
function useConnectionManagerCtx(hookname) {
  const manager = reactExports.useContext(ConnectionManagerCtx);
  if (!manager) {
    throw new Error(`${hookname} must be used within <ThirdwebProvider>`);
  }
  return manager;
}
function isEcosystemWallet(wallet) {
  return typeof wallet === "string" ? wallet.startsWith("ecosystem.") : wallet.id.startsWith("ecosystem.");
}
function createStore(initialValue) {
  const listeners = /* @__PURE__ */ new Set();
  let value = initialValue;
  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };
  return {
    getValue() {
      return value;
    },
    setValue(newValue) {
      if (newValue === value) {
        return;
      }
      value = newValue;
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}
async function isZkSyncChain(chain2) {
  if (chain2.id === 1337 || chain2.id === 31337) {
    return false;
  }
  if (chain2.id === 324 || chain2.id === 300 || chain2.id === 302 || chain2.id === 11124 || chain2.id === 282 || chain2.id === 388 || chain2.id === 4654 || chain2.id === 333271 || chain2.id === 37111 || chain2.id === 978658 || chain2.id === 531050104 || chain2.id === 4457845 || chain2.id === 2741 || chain2.id === 240 || chain2.id === 555271 || chain2.id === 61166 || chain2.id === 555272) {
    return true;
  }
  try {
    const { getChainMetadata: getChainMetadata2 } = await __vitePreload(async () => {
      const { getChainMetadata: getChainMetadata3 } = await Promise.resolve().then(() => utils);
      return { getChainMetadata: getChainMetadata3 };
    }, true ? void 0 : void 0);
    const chainMetadata = await getChainMetadata2(chain2);
    return chainMetadata.stackType === "zksync_stack";
  } catch {
    return false;
  }
}
function isSmartWallet(activeWallet) {
  if (!activeWallet) {
    return false;
  }
  if (activeWallet.id === "smart") {
    return true;
  }
  if (activeWallet.id === "inApp" || isEcosystemWallet(activeWallet)) {
    const options = activeWallet.getConfig();
    if (options && "smartAccount" in options && options.smartAccount) {
      return true;
    }
    if (options?.executionMode) {
      const execMode = options.executionMode;
      return execMode.mode === "EIP4337" || execMode.mode === "EIP7702";
    }
  }
  return false;
}
function hasSponsoredTransactionsEnabled(wallet) {
  if (!wallet) {
    return false;
  }
  let sponsoredTransactionsEnabled = false;
  if (wallet && wallet.id === "smart") {
    const options = wallet.getConfig();
    if ("sponsorGas" in options) {
      sponsoredTransactionsEnabled = options.sponsorGas;
    }
    if ("gasless" in options) {
      sponsoredTransactionsEnabled = options.gasless;
    }
  }
  if (wallet && (wallet.id === "inApp" || isEcosystemWallet(wallet))) {
    const options = wallet.getConfig();
    if (options && "smartAccount" in options && options.smartAccount) {
      const smartOptions = options.smartAccount;
      if ("sponsorGas" in smartOptions) {
        sponsoredTransactionsEnabled = smartOptions.sponsorGas;
      }
      if ("gasless" in smartOptions) {
        sponsoredTransactionsEnabled = smartOptions.gasless;
      }
    }
    if (options?.executionMode) {
      const execMode = options.executionMode;
      if (execMode.mode === "EIP4337") {
        const smartOptions = execMode.smartAccount;
        if (smartOptions && "sponsorGas" in smartOptions) {
          sponsoredTransactionsEnabled = smartOptions.sponsorGas;
        }
        if (smartOptions && "gasless" in smartOptions) {
          sponsoredTransactionsEnabled = smartOptions.gasless;
        }
      }
      if (execMode.mode === "EIP7702") {
        sponsoredTransactionsEnabled = execMode.sponsorGas || false;
      }
    }
  }
  return sponsoredTransactionsEnabled;
}
const SetRootElementContext = reactExports.createContext(() => {
});
async function trackConnect(args) {
  const { client: client2, ecosystem, walletType, walletAddress, chainId } = args;
  return track({
    client: client2,
    data: {
      action: "connect",
      chainId,
      source: "connectWallet",
      walletAddress,
      walletType
    },
    ecosystem
  });
}
const webLocalStorage = {
  async getItem(key) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch {
    }
    return null;
  },
  async removeItem(key) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(key);
    }
  },
  async setItem(key, value) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value);
      }
    } catch {
    }
  }
};
function createEmitter() {
  const subsribers = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      const subscribers = subsribers.get(event);
      if (subscribers) {
        for (const cb of subscribers) {
          cb(data);
        }
      }
    },
    subscribe(event, cb) {
      if (!subsribers.has(event)) {
        subsribers.set(event, /* @__PURE__ */ new Set([cb]));
      } else {
        subsribers.get(event)?.add(cb);
      }
      return () => {
        const subscribers = subsribers.get(event);
        if (subscribers) {
          subscribers.delete(cb);
        }
      };
    }
  };
}
function createWalletEmitter() {
  return createEmitter();
}
async function eth_getCode(request, params) {
  return request({
    method: "eth_getCode",
    params: [params.address, params.blockTag || "latest"]
  });
}
const BYTECODE_CACHE = /* @__PURE__ */ new WeakMap();
function getBytecode(contract) {
  if (BYTECODE_CACHE.has(contract)) {
    return BYTECODE_CACHE.get(contract);
  }
  const prom = (async () => {
    const rpcRequest = getRpcClient(contract);
    const result = await eth_getCode(rpcRequest, {
      address: contract.address,
      blockTag: "latest"
    });
    if (result === "0x") {
      BYTECODE_CACHE.delete(contract);
    }
    return result;
  })();
  BYTECODE_CACHE.set(contract, prom);
  return prom;
}
const cache = /* @__PURE__ */ new WeakSet();
async function isContractDeployed(contract) {
  if (cache.has(contract)) {
    return true;
  }
  const bytecode = await getBytecode(contract);
  const isDeployed = bytecode !== "0x";
  if (isDeployed) {
    cache.add(contract);
  }
  return isDeployed;
}
const DUMMY_SIGNATURE = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
const DEFAULT_ACCOUNT_FACTORY_V0_6 = "0x85e23b94e7F5E9cC1fF78BCe78cfb15B81f0DF00";
const DEFAULT_ACCOUNT_FACTORY_V0_7 = "0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb";
const ENTRYPOINT_ADDRESS_v0_6 = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const ENTRYPOINT_ADDRESS_v0_7 = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const MANAGED_ACCOUNT_GAS_BUFFER = 50000n;
const getDefaultAccountFactory = (entryPointAddress) => {
  const version2 = getEntryPointVersion(entryPointAddress || ENTRYPOINT_ADDRESS_v0_6);
  if (version2 === "v0.7") {
    return DEFAULT_ACCOUNT_FACTORY_V0_7;
  }
  return DEFAULT_ACCOUNT_FACTORY_V0_6;
};
const getDefaultBundlerUrl = (chain2) => {
  const domain = getThirdwebDomains().bundler;
  if (domain.startsWith("localhost:")) {
    return `http://${domain}/v2?chain=${chain2.id}`;
  }
  return `https://${chain2.id}.${domain}/v2`;
};
const getEntryPointVersion = (address) => {
  const checksummedAddress = getAddress(address);
  if (checksummedAddress === ENTRYPOINT_ADDRESS_v0_6) {
    return "v0.6";
  }
  if (checksummedAddress === ENTRYPOINT_ADDRESS_v0_7) {
    return "v0.7";
  }
  throw new Error("Unknown paymaster version");
};
function smartWallet(createOptions) {
  const emitter = createWalletEmitter();
  let account;
  let adminAccount;
  let chain2;
  let lastConnectOptions;
  return {
    autoConnect: async (options) => {
      const { connectSmartAccount: connectSmartWallet } = await __vitePreload(async () => {
        const { connectSmartAccount: connectSmartWallet2 } = await import("./index-DjEsEB5s.js").then((n) => n.i);
        return { connectSmartAccount: connectSmartWallet2 };
      }, true ? __vite__mapDeps([77,2,3,4,43,78,79,80,1,5,81]) : void 0);
      const [connectedAccount, connectedChain] = await connectSmartWallet(options, createOptions);
      lastConnectOptions = options;
      account = connectedAccount;
      chain2 = connectedChain;
      trackConnect({
        chainId: chain2.id,
        client: options.client,
        walletAddress: account.address,
        walletType: "smart"
      });
      return account;
    },
    connect: async (options) => {
      const { connectSmartAccount } = await __vitePreload(async () => {
        const { connectSmartAccount: connectSmartAccount2 } = await import("./index-DjEsEB5s.js").then((n) => n.i);
        return { connectSmartAccount: connectSmartAccount2 };
      }, true ? __vite__mapDeps([77,2,3,4,43,78,79,80,1,5,81]) : void 0);
      const [connectedAccount, connectedChain] = await connectSmartAccount(options, createOptions);
      adminAccount = options.personalAccount;
      lastConnectOptions = options;
      account = connectedAccount;
      chain2 = connectedChain;
      trackConnect({
        chainId: chain2.id,
        client: options.client,
        walletAddress: account.address,
        walletType: "smart"
      });
      emitter.emit("accountChanged", account);
      return account;
    },
    disconnect: async () => {
      if (account) {
        const { disconnectSmartAccount } = await __vitePreload(async () => {
          const { disconnectSmartAccount: disconnectSmartAccount2 } = await import("./index-DjEsEB5s.js").then((n) => n.i);
          return { disconnectSmartAccount: disconnectSmartAccount2 };
        }, true ? __vite__mapDeps([77,2,3,4,43,78,79,80,1,5,81]) : void 0);
        await disconnectSmartAccount(account);
      }
      account = void 0;
      adminAccount = void 0;
      chain2 = void 0;
      emitter.emit("disconnect", void 0);
    },
    getAccount: () => account,
    getAdminAccount: () => adminAccount,
    getChain() {
      if (!chain2) {
        return void 0;
      }
      chain2 = getCachedChainIfExists(chain2.id) || chain2;
      return chain2;
    },
    getConfig: () => createOptions,
    id: "smart",
    subscribe: emitter.subscribe,
    switchChain: async (newChain) => {
      if (!lastConnectOptions) {
        throw new Error("Cannot switch chain without a previous connection");
      }
      const isZksyncChain = await isZkSyncChain(newChain);
      if (!isZksyncChain) {
        const factory = getContract({
          address: createOptions.factoryAddress || getDefaultAccountFactory(createOptions.overrides?.entrypointAddress),
          chain: newChain,
          client: lastConnectOptions.client
        });
        const isDeployed = await isContractDeployed(factory);
        if (!isDeployed) {
          throw new Error(`Factory contract not deployed on chain: ${newChain.id}`);
        }
      }
      const { connectSmartAccount } = await __vitePreload(async () => {
        const { connectSmartAccount: connectSmartAccount2 } = await import("./index-DjEsEB5s.js").then((n) => n.i);
        return { connectSmartAccount: connectSmartAccount2 };
      }, true ? __vite__mapDeps([77,2,3,4,43,78,79,80,1,5,81]) : void 0);
      const [connectedAccount, connectedChain] = await connectSmartAccount({ ...lastConnectOptions, chain: newChain }, { ...createOptions, chain: newChain });
      account = connectedAccount;
      chain2 = connectedChain;
      emitter.emit("accountChanged", connectedAccount);
      emitter.emit("chainChanged", connectedChain);
    }
  };
}
function computedStore(computation, dependencies) {
  const listeners = /* @__PURE__ */ new Set();
  let value = computation();
  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };
  const setValue = (newValue) => {
    value = newValue;
    notify();
  };
  for (const store of dependencies) {
    store.subscribe(() => {
      setValue(computation());
    });
  }
  return {
    getValue() {
      return value;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}
function effect(effectFn, dependencies, runOnMount = true) {
  if (runOnMount) {
    effectFn();
  }
  const unsubscribeList = dependencies.map((store) => {
    return store.subscribe(() => {
      effectFn();
    });
  });
  return () => {
    for (const fn of unsubscribeList) {
      fn();
    }
  };
}
const CONNECT_PARAMS_MAP_KEY = "tw:connected-wallet-params";
async function saveConnectParamsToStorage(storage2, walletId, params) {
  if (!isStringifiable(params)) {
    throw new Error("given params are not stringifiable");
  }
  const currentValueStr = await storage2.getItem(CONNECT_PARAMS_MAP_KEY);
  let value;
  if (currentValueStr) {
    try {
      value = JSON.parse(currentValueStr);
    } catch {
      value = {};
    }
    value[walletId] = params;
  } else {
    value = {
      [walletId]: params
    };
  }
  storage2.setItem(CONNECT_PARAMS_MAP_KEY, stringify(value));
}
async function deleteConnectParamsFromStorage(storage2, walletId) {
  const currentValueStr = await storage2.getItem(CONNECT_PARAMS_MAP_KEY);
  let value;
  if (currentValueStr) {
    try {
      value = JSON.parse(currentValueStr);
    } catch {
      value = {};
    }
    delete value[walletId];
    storage2.setItem(CONNECT_PARAMS_MAP_KEY, stringify(value));
  }
}
async function getSavedConnectParamsFromStorage(storage2, walletId) {
  const valueStr = await storage2.getItem(CONNECT_PARAMS_MAP_KEY);
  if (!valueStr) {
    return null;
  }
  try {
    const value = JSON.parse(valueStr);
    if (value?.[walletId]) {
      return value[walletId];
    }
    return null;
  } catch {
    return null;
  }
}
function isStringifiable(value) {
  try {
    stringify(value);
    return true;
  } catch {
    return false;
  }
}
const CONNECTED_WALLET_IDS = "thirdweb:connected-wallet-ids";
const LAST_ACTIVE_EOA_ID = "thirdweb:active-wallet-id";
const LAST_ACTIVE_CHAIN = "thirdweb:active-chain";
const LAST_USED_WALLET_ID = "thirdweb:last-used-wallet-id";
function createConnectionManager(storage2) {
  const activeWalletStore = createStore(void 0);
  const activeAccountStore = createStore(void 0);
  const activeWalletChainStore = createStore(void 0);
  const activeWalletConnectionStatusStore = createStore("unknown");
  const definedChainsStore = createStore(/* @__PURE__ */ new Map());
  effect(() => {
    cacheChains([...definedChainsStore.getValue().values()]);
  }, [definedChainsStore]);
  effect(() => {
    const chainVal = activeWalletChainStore.getValue();
    if (!chainVal) {
      return;
    }
    const definedChain = definedChainsStore.getValue().get(chainVal.id);
    if (!definedChain || definedChain === chainVal) {
      return;
    }
    activeWalletChainStore.setValue(definedChain);
  }, [definedChainsStore, activeWalletChainStore]);
  const walletIdToConnectedWalletMap = createStore(/* @__PURE__ */ new Map());
  const isAutoConnecting = createStore(false);
  const connectedWallets = computedStore(() => {
    return Array.from(walletIdToConnectedWalletMap.getValue().values());
  }, [walletIdToConnectedWalletMap]);
  const addConnectedWallet = (wallet) => {
    const oldValue = walletIdToConnectedWalletMap.getValue();
    if (oldValue.has(wallet.id)) {
      return;
    }
    const newValue = new Map(oldValue);
    newValue.set(wallet.id, wallet);
    walletIdToConnectedWalletMap.setValue(newValue);
  };
  const removeConnectedWallet = (wallet) => {
    const oldValue = walletIdToConnectedWalletMap.getValue();
    const newValue = new Map(oldValue);
    newValue.delete(wallet.id);
    walletIdToConnectedWalletMap.setValue(newValue);
  };
  const onWalletDisconnect = (wallet) => {
    deleteConnectParamsFromStorage(storage2, wallet.id);
    removeConnectedWallet(wallet);
    if (activeWalletStore.getValue() === wallet) {
      storage2.removeItem(LAST_ACTIVE_EOA_ID);
      activeAccountStore.setValue(void 0);
      activeWalletChainStore.setValue(void 0);
      activeWalletStore.setValue(void 0);
      activeWalletConnectionStatusStore.setValue("disconnected");
    }
  };
  const disconnectWallet = (wallet) => {
    onWalletDisconnect(wallet);
    wallet.disconnect();
  };
  const handleConnection = async (wallet, options) => {
    const account = wallet.getAccount();
    if (!account) {
      throw new Error("Cannot set a wallet without an account as active");
    }
    const activeWallet = await (async () => {
      if (options?.accountAbstraction && !isSmartWallet(wallet)) {
        return await handleSmartWalletConnection(wallet, options.client, options.accountAbstraction, onWalletDisconnect);
      } else {
        return wallet;
      }
    })();
    await storage2.setItem(LAST_ACTIVE_EOA_ID, wallet.id);
    await storage2.setItem(LAST_USED_WALLET_ID, wallet.id);
    addConnectedWallet(wallet);
    if (options?.setWalletAsActive !== false) {
      handleSetActiveWallet(activeWallet);
    }
    wallet.subscribe("accountChanged", async () => {
      const newWallet = await handleConnection(wallet, options);
      options?.onConnect?.(newWallet, connectedWallets.getValue());
    });
    return activeWallet;
  };
  const connect = async (wallet, options) => {
    const connectedWallet = await handleConnection(wallet, options);
    options?.onConnect?.(connectedWallet, connectedWallets.getValue());
    return connectedWallet;
  };
  const handleSetActiveWallet = (activeWallet) => {
    const account = activeWallet.getAccount();
    if (!account) {
      throw new Error("Cannot set a wallet without an account as active");
    }
    addConnectedWallet(activeWallet);
    activeWalletStore.setValue(activeWallet);
    activeAccountStore.setValue(account);
    activeWalletChainStore.setValue(activeWallet.getChain());
    activeWalletConnectionStatusStore.setValue("connected");
    const onAccountsChanged = (newAccount) => {
      activeAccountStore.setValue(newAccount);
    };
    const unsubAccounts = activeWallet.subscribe("accountChanged", onAccountsChanged);
    const unsubChainChanged = activeWallet.subscribe("chainChanged", (chain2) => activeWalletChainStore.setValue(chain2));
    const unsubDisconnect = activeWallet.subscribe("disconnect", () => {
      handleDisconnect();
    });
    const handleDisconnect = () => {
      onWalletDisconnect(activeWallet);
      unsubAccounts();
      unsubChainChanged();
      unsubDisconnect();
    };
  };
  const setActiveWallet = async (activeWallet) => {
    handleSetActiveWallet(activeWallet);
    if (activeWallet.id !== "smart") {
      await storage2.setItem(LAST_ACTIVE_EOA_ID, activeWallet.id);
      await storage2.setItem(LAST_USED_WALLET_ID, activeWallet.id);
    }
  };
  effect(() => {
    const _chain = activeWalletChainStore.getValue();
    if (_chain) {
      storage2.setItem(LAST_ACTIVE_CHAIN, stringify(_chain));
    } else {
      storage2.removeItem(LAST_ACTIVE_CHAIN);
    }
  }, [activeWalletChainStore], false);
  effect(async () => {
    const accounts = connectedWallets.getValue();
    const ids = accounts.map((acc) => acc?.id).filter((c) => !!c);
    storage2.setItem(CONNECTED_WALLET_IDS, stringify(Array.from(/* @__PURE__ */ new Set([...ids]))));
  }, [connectedWallets], false);
  const switchActiveWalletChain = async (chain2) => {
    const wallet = activeWalletStore.getValue();
    if (!wallet) {
      throw new Error("No active wallet found");
    }
    if (!wallet.switchChain) {
      throw new Error("Wallet does not support switching chains");
    }
    if (isSmartWallet(wallet)) {
      const personalWalletId = await getStoredActiveWalletId(storage2);
      if (personalWalletId) {
        const personalWallet = connectedWallets.getValue().find((w) => w.id === personalWalletId);
        if (personalWallet) {
          await personalWallet.switchChain(chain2);
          await wallet.switchChain(chain2);
          handleSetActiveWallet(wallet);
          return;
        }
      }
      await wallet.switchChain(chain2);
      handleSetActiveWallet(wallet);
    } else {
      await wallet.switchChain(chain2);
    }
    activeWalletChainStore.setValue(wallet.getChain());
  };
  function defineChains(chains) {
    const currentMapVal = definedChainsStore.getValue();
    const allChainsSame = chains.every((c) => {
      const definedChain = currentMapVal.get(c.id);
      return stringify(definedChain) === stringify(c);
    });
    if (allChainsSame) {
      return;
    }
    const newMapVal = new Map(currentMapVal);
    for (const c of chains) {
      newMapVal.set(c.id, c);
    }
    definedChainsStore.setValue(newMapVal);
  }
  return {
    activeAccountStore,
    activeWalletChainStore,
    activeWalletConnectionStatusStore,
    activeWalletStore,
    addConnectedWallet,
    connect,
    connectedWallets,
    defineChains,
    disconnectWallet,
    handleConnection,
    isAutoConnecting,
    removeConnectedWallet,
    setActiveWallet,
    switchActiveWalletChain
  };
}
async function getStoredConnectedWalletIds(storage2) {
  try {
    const value = await storage2.getItem(CONNECTED_WALLET_IDS);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  } catch {
    return [];
  }
}
async function getStoredActiveWalletId(storage2) {
  try {
    const value = await storage2.getItem(LAST_ACTIVE_EOA_ID);
    if (value) {
      return value;
    }
  } catch {
  }
  return null;
}
async function getLastConnectedChain(storage2) {
  try {
    const value = await storage2.getItem(LAST_ACTIVE_CHAIN);
    if (value) {
      return JSON.parse(value);
    }
  } catch {
  }
  return null;
}
const handleSmartWalletConnection = async (eoaWallet, client2, options, onWalletDisconnect) => {
  const signer = eoaWallet.getAccount();
  if (!signer) {
    throw new Error("Cannot set a wallet without an account as active");
  }
  const wallet = smartWallet(options);
  await wallet.connect({
    chain: options.chain,
    client: client2,
    personalAccount: signer
  });
  const disconnectUnsub = eoaWallet.subscribe("disconnect", () => {
    handleDisconnect();
  });
  const handleDisconnect = () => {
    disconnectUnsub();
    onWalletDisconnect(wallet);
  };
  return wallet;
};
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isObjectWithKeys(value, keys = []) {
  return isObject(value) && keys.every((key) => key in value);
}
function isBaseTransactionOptions(value) {
  return isObjectWithKeys(value, ["__contract"]) && isObjectWithKeys(value.__contract, ["address", "chain"]) && typeof value.__contract.address === "string";
}
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor)
      return false;
    let length;
    let i2;
    if (Array.isArray(a) && Array.isArray(b)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i2 = length; i2-- !== 0; )
        if (!deepEqual(a[i2], b[i2]))
          return false;
      return true;
    }
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i2 = length; i2-- !== 0; )
      if (!Object.hasOwn(b, keys[i2]))
        return false;
    for (i2 = length; i2-- !== 0; ) {
      const key = keys[i2];
      if (key && !deepEqual(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}
function structuralSharing(oldData, newData) {
  if (deepEqual(oldData, newData)) {
    return oldData;
  }
  return replaceEqualDeep(oldData, newData);
}
function ThirdwebProviderCore(props) {
  const [el, setEl] = reactExports.useState(null);
  const [queryClient] = reactExports.useState(() => new QueryClient({
    defaultOptions: {
      mutations: {
        onSettled: (data, _error, variables) => {
          if (isBaseTransactionOptions(variables)) {
            if (isObjectWithKeys(data, ["transactionHash"]) && isObjectWithKeys(variables, ["client", "chain"])) {
              waitForReceipt({
                chain: variables.chain,
                // We know it exists from the if
                client: variables.client,
                transactionHash: data.transactionHash
              }).catch((e) => {
                console.error("[Transaction Error]", e);
              }).then(() => {
                return Promise.all([
                  queryClient.invalidateQueries({
                    queryKey: (
                      // invalidate any readContract queries for this chainId:contractAddress
                      [
                        "readContract",
                        variables.__contract?.chain.id || variables.chain.id,
                        variables.__contract?.address || variables.to
                      ]
                    )
                  }),
                  invalidateWalletBalance(queryClient, variables.__contract?.chain.id || variables.chain.id)
                ]);
              });
            }
          }
        }
      },
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1e3,
        structuralSharing
      }
    }
  }));
  return jsxRuntimeExports.jsx(ConnectionManagerCtx.Provider, { value: props.manager, children: jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [jsxRuntimeExports.jsx(SetRootElementContext.Provider, { value: setEl, children: props.children }), el] }) });
}
function ThirdwebProvider(props) {
  const connectionManager = reactExports.useMemo(() => props.connectionManager || createConnectionManager(webLocalStorage), [props.connectionManager]);
  return jsxRuntimeExports.jsx(ThirdwebProviderCore, { manager: connectionManager, children: props.children });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThirdwebProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) })
);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      console.log("SW registered:", registration.scope);
    }).catch((error) => {
      console.log("SW registration failed:", error);
    });
  });
}
export {
  isHex$1 as $,
  defineChain as A,
  isHex as B,
  Calendar$1 as C,
  Download as D,
  ExternalLink as E,
  getContract as F,
  keccak256 as G,
  waitForReceipt as H,
  TrendingUp as I,
  Camera as J,
  auth as K,
  Loader2 as L,
  Music as M,
  Globe as N,
  Shield as O,
  ProviderId as P,
  PartyPopper as Q,
  ArrowRight as R,
  Share2 as S,
  Trash2 as T,
  Users as U,
  withCache as V,
  Wallet as W,
  X,
  Smartphone as Y,
  Zap$1 as Z,
  BaseError$1 as _,
  Mic as a,
  webLocalStorage as a$,
  LruMap as a0,
  getRpcClient as a1,
  eth_getTransactionReceipt as a2,
  EyeOff as a3,
  size as a4,
  fromNumber as a5,
  padLeft as a6,
  BaseError2 as a7,
  fromBoolean as a8,
  IntegerOutOfRangeError2 as a9,
  from$1 as aA,
  checksumAddress as aB,
  stringToBytes as aC,
  toBytes$1 as aD,
  concat$1 as aE,
  isContractDeployed as aF,
  toBigInt as aG,
  CheckCircle as aH,
  MessageSquare as aI,
  SupportAdmin as aJ,
  wrapConstructor$1 as aK,
  Hash$1 as aL,
  u32$1 as aM,
  toBytes$4 as aN,
  CreditCard as aO,
  getDefaultBundlerUrl as aP,
  ENTRYPOINT_ADDRESS_v0_6 as aQ,
  getClientFetch as aR,
  getEntryPointVersion as aS,
  isThirdwebUrl as aT,
  DUMMY_SIGNATURE as aU,
  ENTRYPOINT_ADDRESS_v0_7 as aV,
  isZkSyncChain as aW,
  getDefaultAccountFactory as aX,
  isSmartWallet as aY,
  getThirdwebBaseUrl as aZ,
  sleep as a_,
  padRight as aa,
  fromString as ab,
  slice as ac,
  stringify$1 as ad,
  fromString$1 as ae,
  getBytecode as af,
  isAddress as ag,
  hexToBytes$2 as ah,
  getPublicKey as ai,
  finalizeEvent as aj,
  SimplePool as ak,
  subscribeToLiveStream as al,
  Send as am,
  startLiveStream as an,
  endLiveStream as ao,
  fromBytes as ap,
  fromHex as aq,
  from as ar,
  trimLeft as as,
  hexToBytes as at,
  toBytes$3 as au,
  pad$2 as av,
  toHex as aw,
  hexToBytes$1 as ax,
  bytesToHex as ay,
  toHex$1 as az,
  MapPin as b,
  getChainDecimals as b$,
  hexToString as b0,
  getThirdwebDomains as b1,
  InvalidHexValueError$1 as b2,
  size$2 as b3,
  numberToHex$1 as b4,
  hexToNumber$1 as b5,
  hexToBigInt$1 as b6,
  trim$2 as b7,
  padHex$1 as b8,
  stringToHex$1 as b9,
  createStore as bA,
  validate as bB,
  toNumber as bC,
  MANAGED_ACCOUNT_GAS_BUFFER as bD,
  InvalidBytesLengthError as bE,
  receiptStatuses as bF,
  Subscribable as bG,
  pendingThenable as bH,
  resolveEnabled as bI,
  shallowEqualObjects as bJ,
  resolveStaleTime as bK,
  noop as bL,
  isServer as bM,
  isValidTimeout as bN,
  timeUntilStale as bO,
  focusManager as bP,
  fetchState as bQ,
  replaceData as bR,
  notifyManager as bS,
  replaceEqualDeep as bT,
  hashKey as bU,
  getDefaultState as bV,
  shouldThrowError as bW,
  useQueryClient as bX,
  convertApiChainToChain as bY,
  getChainMetadata as bZ,
  getChainSymbol as b_,
  IntegerOutOfRangeError$1 as ba,
  InvalidBytesBooleanError as bb,
  InvalidHexBooleanError as bc,
  SizeExceedsPaddingSizeError$2 as bd,
  SizeOverflowError$2 as be,
  SliceOffsetOutOfBoundsError$1 as bf,
  boolToBytes$1 as bg,
  boolToHex$1 as bh,
  defineTransaction as bi,
  defineTransactionReceipt as bj,
  formatLog as bk,
  formatTransaction as bl,
  formatTransactionReceipt as bm,
  fromHex$1 as bn,
  hexToBool as bo,
  hexToString$1 as bp,
  numberToBytes$1 as bq,
  padBytes as br,
  setErrorConfig as bs,
  stringToBytes$1 as bt,
  transactionType as bu,
  assertSize$2 as bv,
  defineFormatter as bw,
  padHex as bx,
  boolToHex as by,
  track as bz,
  createLucideIcon as c,
  getChainNativeCurrencyName as c0,
  useConnectionManagerCtx as c1,
  watchBlockNumber as c2,
  isEcosystemWallet as c3,
  detectOS as c4,
  getCachedChainIfExists as c5,
  trackConnect as c6,
  createWalletEmitter as c7,
  smartWallet as c8,
  getStoredConnectedWalletIds as c9,
  getStoredActiveWalletId as ca,
  getLastConnectedChain as cb,
  LAST_USED_WALLET_ID as cc,
  useConnectionManager as cd,
  hasSponsoredTransactionsEnabled as ce,
  shortenAddress as cf,
  shortenHex as cg,
  invalidateWalletBalance as ch,
  SetRootElementContext as ci,
  connectFunctionsEmulator as cj,
  Hash2 as ck,
  createView as cl,
  aexists as cm,
  toBytes as cn,
  aoutput as co,
  wrapConstructor as cp,
  rotr as cq,
  hexToUint8Array as cr,
  isJWT as cs,
  domains$1 as ct,
  fetch$1 as cu,
  utils as cv,
  json as cw,
  rpc as cx,
  db as d,
  app as e,
  Lock as f,
  getFunctions as g,
  httpsCallable as h,
  Ticket as i,
  WebPlugin as j,
  Persistence as k,
  concat as l,
  Eye as m,
  getSavedConnectParamsFromStorage as n,
  getCachedChain as o,
  saveConnectParamsToStorage as p,
  getRpcUrlForChain as q,
  stringify as r,
  storage as s,
  getAddress as t,
  stringToHex as u,
  uint8ArrayToHex as v,
  numberToHex as w,
  getInsightEnabledChainIds as x,
  hexToBigInt as y,
  hexToNumber as z
};
