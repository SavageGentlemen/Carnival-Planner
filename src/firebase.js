import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY",
  authDomain: "carnival-planner.firebaseapp.com",
  projectId: "carnival-planner",
  storageBucket: "carnival-planner.firebasestorage.app",
  messagingSenderId: "1036340118282",
  appId: "1:1036340118282:web:809dc12c298ff1b8f2f0f3",
  measurementId: "G-XC1K69PSVC"
};

const app = initializeApp(firebaseConfig);

// EXPORT these services so App.jsx can use them
export const auth = getAuth(app);

// Initialize Firestore with long-polling (Crucial for Preview/Corp networks)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const storage = getStorage(app);

// Simple promise that resolves when Firestore is initialized
export const firestoreReady = Promise.resolve(true);

console.log('Firestore initialized');

// Firebase Cloud Messaging for push notifications
let messaging = null;

// Initialize messaging only if supported
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

// Request permission and get FCM token
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

    if (!messaging) {
      return null;
    }

    const token = await getToken(messaging, { vapidKey });
    console.log('FCM Token:', token);
    return token;
  } catch (err) {
    console.log('Error getting FCM token:', err);
    return null;
  }
};

// Listen for foreground messages
export const onForegroundMessage = (callback) => {
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

// Initialize messaging on module load
initMessaging();

export default app;