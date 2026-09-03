import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, isSupported as isMessagingSupported } from "firebase/messaging";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
  logEvent,
  setUserId,
  setUserProperties,
} from "firebase/analytics";

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

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, 'squad-db');

export const storage = getStorage(app);

export const firestoreReady = Promise.resolve(true);
console.log('Firestore initialized');

// ── Firebase Analytics (GA4: G-XC1K69PSVC) ──
export let analytics = null;

export const initAnalytics = async () => {
  try {
    const supported = await isAnalyticsSupported();
    if (supported) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics (GA4) initialized:', firebaseConfig.measurementId);
      return analytics;
    } else {
      console.log('Firebase Analytics not supported in this environment');
      return null;
    }
  } catch (err) {
    console.warn('Error initializing Firebase Analytics:', err);
    return null;
  }
};

export const analyticsReady = initAnalytics();

export const logAnalyticsEvent = async (eventName, eventParams = {}) => {
  try {
    let instance = analytics;
    if (!instance) {
      instance = await analyticsReady;
    }
    if (instance) {
      logEvent(instance, eventName, eventParams);
    }
  } catch (err) {
    console.warn('[Analytics] Failed to log event:', eventName, err);
  }
};

export const logPageView = async (pagePath, pageTitle) => {
  try {
    let instance = analytics;
    if (!instance) {
      instance = await analyticsReady;
    }
    if (instance) {
      logEvent(instance, 'page_view', {
        page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/'),
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
      });
    }
  } catch (err) {
    console.warn('[Analytics] Failed to log page_view:', err);
  }
};

export const setAnalyticsUser = async (userId, properties = {}) => {
  try {
    let instance = analytics;
    if (!instance) {
      instance = await analyticsReady;
    }
    if (instance && userId) {
      setUserId(instance, userId);
      if (properties && typeof properties === 'object') {
        const cleanProps = {};
        for (const [k, v] of Object.entries(properties)) {
          if (v !== null && v !== undefined) cleanProps[k] = String(v);
        }
        if (Object.keys(cleanProps).length > 0) {
          setUserProperties(instance, cleanProps);
        }
      }
    }
  } catch (err) {
    console.warn('[Analytics] Failed to set analytics user:', err);
  }
};

let messaging = null;

const initMessaging = async () => {
  try {
    const supported = await isMessagingSupported();
    if (supported) {
      messaging = getMessaging(app);
      console.log('Firebase Messaging initialized');
      return messaging;
    } else {
      console.log('Firebase Messaging not supported in this browser');
      return null;
    }
  } catch (err) {
    console.log('Error initializing Firebase Messaging:', err);
    return null;
  }
};

export const requestNotificationPermission = async (vapidKey) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }
    if (!messaging) {
      await initMessaging();
    }
    if (!messaging) return null;
    const token = await getToken(messaging, { vapidKey });
    console.log('FCM Token:', token);
    return token;
  } catch (err) {
    console.log('Error getting FCM token:', err);
    return null;
  }
};

export const onForegroundMessage = (callback) => {
  if (!messaging) {
    initMessaging().then(() => {
      if (messaging) onMessage(messaging, callback);
    });
  } else {
    onMessage(messaging, callback);
  }
};

initMessaging();

export default app;
