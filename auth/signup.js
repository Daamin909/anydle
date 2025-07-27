import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
    console.log("User created:", user);
    console.log("Display name set to:", user.displayName);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error:", errorCode, errorMessage);
  }
};

export default signUpWithEmail;
