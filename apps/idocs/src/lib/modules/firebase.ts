import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  browserLocalPersistence,
  indexedDBLocalPersistence,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

auth.setPersistence(indexedDBLocalPersistence);
auth.setPersistence(browserLocalPersistence);

export const db = getDatabase(app);

export const provider = {
  get google() {
    const p = new GoogleAuthProvider();
    p.addScope("profile");
    p.addScope("email");
    return p;
  },
};
// export namespace provider {
//   export const google = new GoogleAuthProvider();
//   google.addScope("profile");
//   google.addScope("email");
// }
