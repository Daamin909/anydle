import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    console.log("User signed in:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error:", errorCode, errorMessage);
  }
};

export default signInWithEmail;
