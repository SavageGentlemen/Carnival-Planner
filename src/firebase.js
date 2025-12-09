import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- PASTE YOUR KEYS HERE ---
const firebaseConfig = {
  apiKey: "AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY",
  authDomain: "carnival-planner.firebaseapp.com",
  projectId: "carnival-planner",
  storageBucket: "carnival-planner.firebasestorage.app",
  messagingSenderId: "1036340118282",
  appId: "1:1036340118282:web:809dc12c298ff1b8f2f0f3",
  measurementId: "G-XC1K69PSVC"
};
// ----------------------------

const app = initializeApp(firebaseConfig);

// EXPORT these services so App.jsx can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
// App ID used for Firestore paths
export const appId = 'carnival-planner-v1';

export default app;