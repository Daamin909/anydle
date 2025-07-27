import { getAuth, signOut } from "firebase/auth";

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export default logout;
