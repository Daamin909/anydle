import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Button, IconButton } from "react-native-paper";
import { signInSchema } from "../../utils/authSchema";
import signInWithEmail from "../../auth/signIn";

const SignInPage = ({ setShowSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    try {
      await signInSchema.validate({ email, password });
      setLoading(true);
      await signInWithEmail(email, password);
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: err.message,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <Image
            style={styles.lottie}
            source={require("../../assets/loading.gif")}
          />
        </View>
      )}
      <Text style={styles.heading}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        editable={!loading}
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
          editable={!loading}
          secureTextEntry={!showPassword}
        />
        <IconButton
          icon={showPassword ? "eye-off" : "eye"}
          size={20}
          disabled={loading}
          iconColor="#ffffff8a"
          onPress={() => setShowPassword((prev) => !prev)}
        />
      </View>
      <Button
        mode="text"
        onPress={() => setShowSignUp(true)}
        textColor="#ffdf52ff"
        disabled={loading}
        labelStyle={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
      >
        Don't have an Account? Sign up.
      </Button>
      <Button
        onPress={handlePress}
        mode="contained-tonal"
        disabled={loading}
        dark={true}
        buttonColor={"#538d4e"}
        textColor="#f8f8f8"
        labelStyle={{ fontSize: 16, fontFamily: "Inter_400Regular" }}
      >
        Sign In
      </Button>
    </View>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 50,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
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
    fontFamily: "Inter_400Regular",
  },
  passwordContainer: {
    fontFamily: "Inter_400Regular",
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
    fontFamily: "Inter_700Bold",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default SignInPage;
