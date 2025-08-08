import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@react-native-firebase/auth";
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
    const seed = encodeURIComponent(email);
    const pfpUrl = `https://picsum.photos/seed/${seed}/200`;
    await updateProfile(user, {
      displayName: name.trim(),
      photoURL: pfpUrl,
    });
    await user.reload();
    console.log("User created");
    console.log("Display name sett to:", user.displayName);
    console.log("profile pic: ", pfpUrl);
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
