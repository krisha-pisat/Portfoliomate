import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyB3ABKJLFRr4-_9ukc40x3C35H2rE0p7SM",
  authDomain: "portfoliomate-21775.firebaseapp.com",
  projectId: "portfoliomate-21775",
  storageBucket: "portfoliomate-21775.firebasestorage.app",
  messagingSenderId: "633648636340",
  appId: "1:633648636340:web:3102fcd25019ef586992e1"
};

// 1. Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2. Export only DB and Storage (Removed Functions)
export const db = getFirestore(app);
export const storage = getStorage(app);