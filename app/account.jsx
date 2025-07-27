import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import SignUpPage from "../components/auth/SignUpPage";
import AccountDashboard from "../components/auth/AccountDashboard";
import SignInPage from "../components/auth/SignInPage";

const Account = () => {
  const [user, setUser] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    const the_user = auth.currentUser;

    if (the_user) {
      setUser(the_user);
    } else {
      setUser(null);
    }

    const unsubscribe = onAuthStateChanged(auth, (the_user) => {
      if (the_user) {
        setUser(the_user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {!user && showSignUp && <SignUpPage setShowSignUp={setShowSignUp} />}
      {!user && !showSignUp && <SignInPage setShowSignUp={setShowSignUp} />}
      {user && <AccountDashboard user={user} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Account;
