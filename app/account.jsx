import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignUpPage from "../components/auth/SignUpPage";
import AccountDashboard from "../components/auth/AccountDashboard";
import SignInPage from "../components/auth/SignInPage";
import { getApp } from "firebase/app";

const Account = () => {
  const [user, setUser] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const the_user = auth.currentUser;

    if (the_user) {
      setUser(the_user);
    } else {
      setUser(null);
    }
    const unsubscribe = onAuthStateChanged(auth, async (the_user) => {
      if (the_user) {
        await the_user.reload();
        setUser({ ...the_user });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const thingy = async () => {
      const app = getApp();
      const auth = getAuth(app);
      await auth.currentUser.reload();
      setUser(auth.currentUser);
    };
    thingy();
  }, [reload]);
  return (
    <View style={styles.container}>
      {!user && showSignUp && (
        <SignUpPage setShowSignUp={setShowSignUp} setReload={setReload} />
      )}
      {!user && !showSignUp && <SignInPage setShowSignUp={setShowSignUp} />}
      {user && <AccountDashboard user={user} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121213",
    flex: 1,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Account;
