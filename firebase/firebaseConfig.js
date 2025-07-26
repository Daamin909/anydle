import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAP8fZ2o9zquGItpyVSQICsK9j3-lE86sw",
    authDomain: "anydle101.firebaseapp.com",
    projectId: "anydle101",
    storageBucket: "anydle101.firebasestorage.app",
    messagingSenderId: "829594006872",
    appId: "1:829594006872:web:8eddcfe52fbb7bc386a12d",
    measurementId: "G-9N2348RKRV",
  };

  if (!getApps().length) {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
    } catch (error) {
      console.log("Error initializing app: " + error);
    }
  } else {
    const app = getApp();
    const auth = getAuth(app);
  }
};

export default firebaseInit;
