import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for the Carnival Planner.  The values below
// are placeholders and should be replaced with your own Firebase
// project's configuration.  Never commit your real API keys to a
// public repository.  Instead, keep them in environment variables or
// use Firebase Hosting's environment configuration.
// Firebase configuration for your Carnival Planner project.  These values
// come directly from the Firebase console (Project settings → General →
// Your apps).  Do not share these keys publicly in a real
// production environment.
const firebaseConfig = {
  // These values come directly from your Firebase console (Project settings → General →
  // Your apps).  Ensure that they exactly match the values shown in the console.  The
  // `apiKey` here has been updated based on the Firebase dashboard screenshot you
  // provided.  If sign‑in still fails, double‑check each field for typos or missing
  // characters.
  apiKey: 'AIzaSyCWp0X6bLJBsyYKTjUaVsXBSuVD8KeeEqY',
  // Use the hosted `web.app` domain for auth to ensure the OAuth redirect
  // returns to the same domain where the app is served.  When deploying
  // to `carnival-planner.web.app`, set authDomain accordingly.  If you
  // prefer to use `carnival-planner.firebaseapp.com` in development,
  // update this value and add that domain to authorized domains.
  authDomain: 'carnival-planner.web.app',
  projectId: 'carnival-planner',
  storageBucket: 'carnival-planner.appspot.com',
  messagingSenderId: '1036340118282',
  appId: '1:1036340118282:web:809dc12c298ff1b8f2f0f3',
  // measurementId is optional but included here for completeness
  measurementId: 'G-XC1K69PSVC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication and Firestore instances.  These
// exports allow the rest of the application to interact with
// Firebase without reinitialising the app multiple times.
export const auth = getAuth(app);
export const db = getFirestore(app);

// A namespace used to scope data within Firestore.  Changing this
// value will cause the app to read from a different subcollection,
// which can be useful when versioning your data model.
export const appId = 'carnival-planner-v1';