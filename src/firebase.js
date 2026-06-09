import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

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

let messaging = null;

const initMessaging = async () => {
  try {
    const supported = await isSupported();
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
