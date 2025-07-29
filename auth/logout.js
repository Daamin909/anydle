import { getAuth, signOut } from "firebase/auth";
import Toast from "react-native-toast-message";

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    Toast.show({
      type: "error",
      text1: `Error signing out: ${error}`,
      text2: err.message,
      position: "top",
    });
  }
};

export default logout;
