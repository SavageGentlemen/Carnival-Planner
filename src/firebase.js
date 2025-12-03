
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY",
  authDomain: "carnival-planner-49626964.firebaseapp.com",
  projectId: "carnival-planner-49626964",
  storageBucket: "carnival-planner-49626964.appspot.com",
  messagingSenderId: "1036340118282",
  appId: "1:1036340118282:web:809dc12c298ff1b8f2f0f3",
  measurementId: "G-XC1K69PSVC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);