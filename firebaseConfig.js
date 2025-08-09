import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Your Firebase config object - get this from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAP8fZ2o9zquGItpyVSQICsK9j3-lE86sw",
  authDomain: "anydle101.firebaseapp.com",
  projectId: "anydle101",
  storageBucket: "anydle101.firebasestorage.app",
  messagingSenderId: "829594006872",
  appId: "1:829594006872:web:8eddcfe52fbb7bc386a12d",
  measurementId: "G-9N2348RKRV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence for production builds
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Initialize Firebase services
const db = getFirestore(app);

export { auth, db };
