import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYbJfgZBGgitQLZ1pY5uA1KslrHeV58ic",
  authDomain: "capstone-fc429.firebaseapp.com",
  projectId: "capstone-fc429",
  storageBucket: "capstone-fc429.appspot.com",
  messagingSenderId: "181877792653",
  appId: "1:181877792653:web:88f5ba8c0e2eae2031e7c4",
  measurementId: "G-GM4FSFDLJ9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== "undefined") {
  getAnalytics(app);
}