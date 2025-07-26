import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const signUpWithEmail = (email, password) => {
  const auth = getAuth();
  auth.useDeviceLanguage();
  console.log(auth, email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export default signUpWithEmail;
