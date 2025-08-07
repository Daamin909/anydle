import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

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
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error.message,
      });
    }
  } else {
    const app = getApp();
    const auth = getAuth(app);
  }
};

export default firebaseInit;
