import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { Button, IconButton } from "react-native-paper";
import { signUpSchema } from "../../utils/authSchema";
import signUpWithEmail from "../../auth/signUp";

const SignUpPage = ({ setShowSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePress = async () => {
    try {
      await signUpSchema.validate({ name, email, password });
      await signUpWithEmail(email, password, name);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message,
        position: "top",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            { flex: 1, borderWidth: 0, padding: 0, marginVertical: 0 },
          ]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <IconButton
          icon={showPassword ? "eye-off" : "eye"}
          size={20}
          onPress={() => setShowPassword((prev) => !prev)}
        />
      </View>
      <Button mode="text" onPress={() => setShowSignUp(false)}>
        Already have an Account? Sign in.
      </Button>
      <Button onPress={handlePress} mode="contained-tonal">
        Sign Up
      </Button>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
});

export default SignUpPage;
