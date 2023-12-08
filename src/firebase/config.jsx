import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDdIK1i0vMxfe-3_GR8HTWPsWmo52B7fPU",
  authDomain: "ecommerce-fullstact.firebaseapp.com",
  projectId: "ecommerce-fullstact",
  storageBucket: "ecommerce-fullstact.appspot.com",
  messagingSenderId: "942892856858",
  appId: "1:942892856858:web:6458095a1e4cfe473503a3",
  measurementId: "G-SKY77CW0ZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

const analytics = getAnalytics(app);
