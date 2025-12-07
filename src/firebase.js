import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- PASTE YOUR CONFIG FROM FIREBASE CONSOLE HERE ---
const firebaseConfig = {
  apiKey: "AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY",
  authDomain: "carnival-planner.firebaseapp.com",
  projectId: "carnival-planner",
  storageBucket: "carnival-planner.firebasestorage.app",
  messagingSenderId: "1036340118282",
  appId: "1:1036340118282:web:809dc12c298ff1b8f2f0f3",
  measurementId: "G-XC1K69PSVC"
};
// ---------------------------------------------------

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize and EXPORT the services so App.jsx can use them
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;