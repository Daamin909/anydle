import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import signUpWithEmail from "../auth/signup";
import signInWithEmail from "../auth/signin";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain one special character"
    ),
});

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async () => {
    try {
      await schema.validate({ email, password });
      console.log(email, password);
      signInWithEmail(email, password);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message,
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 50,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default Account;
