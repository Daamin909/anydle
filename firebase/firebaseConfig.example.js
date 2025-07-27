import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseInit = () => {
  // insert according to your own config
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
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
