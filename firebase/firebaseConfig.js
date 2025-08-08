import { getApps, initializeApp, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const webFirebaseConfig = {
  apiKey: "AIzaSyAP8fZ2o9zquGItpyVSQICsK9j3-lE86sw",
  authDomain: "anydle101.firebaseapp.com",
  projectId: "anydle101",
  storageBucket: "anydle101.appspot.com",
  messagingSenderId: "829594006872",
  appId: "1:829594006872:web:8eddcfe52fbb7bc386a12d",
  measurementId: "G-9N2348RKRV",
};

const firebaseInit = () => {
  try {
    let app;

    if (!getApps().length) {
      const isWeb = Platform.OS === "web";
      const isExpoGo = Constants.appOwnership === "expo";

      if (isWeb || isExpoGo) {
        // Expo Go or Web: must use explicit config
        app = initializeApp(webFirebaseConfig);
      } else {
        // Standalone native app: try native config, fallback to web config
        try {
          app = initializeApp();
        } catch (nativeErr) {
          console.warn(
            "Native Firebase config missing or invalid, falling back to web config",
            nativeErr
          );
          app = initializeApp(webFirebaseConfig);
        }
      }
    } else {
      app = getApp();
    }

    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    const db = getFirestore(app);
    const storage = getStorage(app);

    return { app, auth, db, storage };
  } catch (error) {
    console.error("Firebase init error:", error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Firebase Init Error",
      textBody: error.message || String(error),
    });
    return null;
  }
};

export default firebaseInit;
