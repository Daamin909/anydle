import { getAuth, sendPasswordResetEmail } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";

const forgotPassword = async (email) => {
  const app = getApp();
  const auth = getAuth(app);
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default forgotPassword;
