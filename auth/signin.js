import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";

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
      type: "error",
      text1: "Error",
      text2: errorMessage,
      position: "top",
    });
  }
};

export default signInWithEmail;
