import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmNj8usrSCMGoGnqnA2_wM2YPIhFuEYXQ",
  authDomain: "notion-clone-6b0b1.firebaseapp.com",
  projectId: "notion-clone-6b0b1",
  storageBucket: "notion-clone-6b0b1.firebasestorage.app",
  messagingSenderId: "928095877189",
  appId: "1:928095877189:web:dbe5a068c087aab6eb4b2c",
  measurementId: "G-K5E2KR9GNR"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };
