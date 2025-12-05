import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY',
  authDomain: 'carnival-planner.web.app',
  projectId: 'carnival-planner',
  storageBucket: 'carnival-planner.appspot.com',
  messagingSenderId: '1036340118282',
  appId: '1:1036340118282:web:809dc12c298ff1b8f2f0f3',
  measurementId: 'G-XC1K69PSVC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);   // 👈 export this

export const auth = getAuth(app);
export const db = getFirestore(app);

export const appId = 'carnival-planner-v1';
