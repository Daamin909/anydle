import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const signInWithEmail = async (email, password) => {
  const auth = getAuth();
  auth.useDeviceLanguage();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in");
  } catch (error) {
    const errorMessage = error.message;
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Error",
      textBody: errorMessage,
    });
  }
};

export default signInWithEmail;
