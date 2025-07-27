import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { Button, IconButton } from "react-native-paper";
import { signInSchema } from "../../utils/authSchema";
import signInWithEmail from "../../auth/signIn";

const SignInPage = ({ setShowSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePress = async () => {
    try {
      await signInSchema.validate({ email, password });
      await signInWithEmail(email, password);
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
      <Button mode="text" onPress={() => setShowSignUp(true)}>
        Don't have an Account? Sign up.
      </Button>
      <Button onPress={handlePress} mode="contained-tonal">
        Sign In
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

export default SignInPage;
