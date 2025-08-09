import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getApp } from "firebase/app";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const forgotPassword = async (email) => {
  const app = getApp();
  const auth = getAuth(app);
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Error",
      textBody: error.message,
    });
    return false;
  }
};

export default forgotPassword;
