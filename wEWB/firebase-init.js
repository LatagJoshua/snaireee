// Firebase initialization for wEWB pages (modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbwafLJM24juGZrr0EBWMf-MeOQIdMwj8",
  authDomain: "thesociety-be40c.firebaseapp.com",
  databaseURL: "https://thesociety-be40c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thesociety-be40c",
  storageBucket: "thesociety-be40c.firebasestorage.app",
  messagingSenderId: "788540455361",
  appId: "1:788540455361:web:c4649452cc66a7431d1740",
  measurementId: "G-5DQTHGSE0G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);


