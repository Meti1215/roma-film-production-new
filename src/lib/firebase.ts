import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration (VanguardX Import & Export project)
const firebaseConfig = {
  apiKey: "AIzaSyDfm1e_jo5GsdGkAMtT6g6tpqpw5DxCiNw",
  authDomain: "vanguardx-import-export.firebaseapp.com",
  projectId: "vanguardx-import-export",
  storageBucket: "vanguardx-import-export.firebasestorage.app",
  messagingSenderId: "29165953704",
  appId: "1:29165953704:web:dd0f9e1bd3fdc06b21989d"
};

// Initialize Firebase (Singleton pattern to avoid multiple instances)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
