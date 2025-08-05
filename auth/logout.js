import { getAuth, signOut } from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Error",
      textBody: error.message,
    });
  }
};

export default logout;
