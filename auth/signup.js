import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const signUpWithEmail = async (email, password, name) => {
  const auth = getAuth();
  auth.useDeviceLanguage();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    console.log("User created");
    console.log("Display name set to:", user.displayName);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Error",
      textBody: errorMessage,
    });
  }
};

export default signUpWithEmail;
