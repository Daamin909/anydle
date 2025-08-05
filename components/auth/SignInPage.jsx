import { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
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
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: err,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#ffffff8a"}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, borderWidth: 0, marginVertical: 0 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"#ffffff8a"}
          secureTextEntry={!showPassword}
        />
        <IconButton
          icon={showPassword ? "eye-off" : "eye"}
          size={20}
          iconColor="#ffffff8a"
          onPress={() => setShowPassword((prev) => !prev)}
        />
      </View>
      <Button
        mode="text"
        onPress={() => setShowSignUp(true)}
        textColor="#ffdf52ff"
      >
        Don't have an Account? Sign up.
      </Button>
      <Button
        onPress={handlePress}
        mode="contained-tonal"
        dark={true}
        buttonColor={"#538d4e"}
        textColor="#f8f8f8"
        labelStyle={{ fontSize: 16 }}
      >
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
    marginVertical: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3a3a3c",
    color: "#f8f8f8",
    fontSize: 18,
    borderRadius: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    borderRadius: 20,
    paddingRight: 5,
    borderWidth: 1,
    backgroundColor: "#3a3a3c",
  },
  heading: {
    color: "white",
    fontSize: 42,
    textAlign: "center",
    padding: 10,
    margin: 10,
    fontFamily: "monospace",
  },
});

export default SignInPage;
