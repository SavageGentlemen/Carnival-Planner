// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY",
  authDomain: "carnival-planner.firebaseapp.com",
  projectId: "carnival-planner",
  storageBucket: "carnival-planner.firebasestorage.app",
  messagingSenderId: "1036340118282",
  appId: "1:1036340118282:web:809dc12c298ff1b8f2f0f3",
  measurementId: "G-XC1K69PSVC"
};

// Optional: log what we're actually using at runtime
console.log("Firebase config at runtime:", firebaseConfig);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);


