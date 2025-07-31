import { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
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
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        placeholderTextColor={"#ffffff8a"}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor={"#ffffff8a"}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholderTextColor={"#ffffff8a"}
          style={[styles.input, { flex: 1, borderWidth: 0, marginVertical: 0 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
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
        onPress={() => setShowSignUp(false)}
        textColor="#ffdf52ff"
      >
        Already have an Account? Sign in.
      </Button>
      <Button
        onPress={handlePress}
        mode="contained-tonal"
        dark={true}
        buttonColor={"#538d4e"}
        textColor="#f8f8f8"
        labelStyle={{ fontSize: 16 }}
      >
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

export default SignUpPage;
