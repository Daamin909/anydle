import { initializeApp, getApps } from "firebase/app";
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

// Prevent multiple app initialization
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with proper error handling and persistence
let auth;
try {
  if (Platform.OS === "web") {
    auth = getAuth(app);
  } else {
    // For React Native, always use initializeAuth with AsyncStorage
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch (error) {
  console.log("Auth initialization error:", error);

  // If auth is already initialized, get the existing instance
  if (error.code === "auth/already-initialized") {
    auth = getAuth(app);
  } else {
    // Other errors, fallback to regular getAuth
    auth = getAuth(app);
  }
}

// Initialize Firebase services
const db = getFirestore(app);

// Export the app for reference if needed elsewhere
export default app;
