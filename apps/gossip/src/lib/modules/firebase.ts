import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgtu0yX-W-UCB-eLrGJn8jGMZKpc5yY00",
  authDomain: "nonamed-chat-app.firebaseapp.com",
  projectId: "nonamed-chat-app",
  storageBucket: "nonamed-chat-app.appspot.com",
  messagingSenderId: "9287616661",
  appId: "1:9287616661:web:03e97fe9cb64a01954b39c",
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
