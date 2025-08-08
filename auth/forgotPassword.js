import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getApp } from "firebase/app";

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
