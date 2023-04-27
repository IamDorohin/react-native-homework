import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFVidJNcOF7-NwWP9ejkTLNTmasKU9IjM",
  authDomain: "react-native-hw-c3675.firebaseapp.com",
  projectId: "react-native-hw-c3675",
  storageBucket: "react-native-hw-c3675.appspot.com",
  messagingSenderId: "1087728104360",
  appId: "1:1087728104360:web:5fd9fc54426491322fe39d",
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app);
