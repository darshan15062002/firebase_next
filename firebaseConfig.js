import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEJD3pVs6eR2JgV6v3uyMmbADq74AiVLI",
  authDomain: "fir-next-c182d.firebaseapp.com",
  projectId: "fir-next-c182d",
  storageBucket: "fir-next-c182d.appspot.com",
  messagingSenderId: "467289023715",
  appId: "1:467289023715:web:25df73c541c4f38760d1d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
