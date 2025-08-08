import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseInit = () => {
  // insert according to your own config
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
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error,
      });
    }
  } else {
    const app = getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
  }
};

export default firebaseInit;
