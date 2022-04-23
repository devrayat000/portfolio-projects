import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "9287616661",
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: "G-6S80LYS87J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);

export const googleProvider = new GoogleAuthProvider();
// Start a sign in process for an unauthenticated user.
googleProvider.addScope("profile");
googleProvider.addScope("email");

export const firestore = getFirestore(app);
