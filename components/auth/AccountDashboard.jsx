import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import logout from "../../auth/logout";
import * as ImagePicker from "expo-image-picker";
import { Button, Menu, Provider } from "react-native-paper";
import forgotPassword from "../../auth/forgotPassword";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const AccountDashboard = ({ user }) => {
  const handleForgotPassword = async () => {
    const success = await forgotPassword(user.email);
    if (success) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Email sent!",
        textBody: `Password reset link sent to ${user.email}`,
        autoClose: 1500,
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: `Couldn't send reset link, try again.`,
        autoClose: 1500,
      });
    }
  };
  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.heading}>My Account</Text>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("../../assets/placeholder.jpg")
          }
          style={styles.avatar}
        />
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>{user?.email}</Text>

          <Text style={styles.label}>Username</Text>
          <Text style={styles.text}>{user?.displayName || "Not set"}</Text>
        </View>

        <View style={styles.buttonBox}>
          <Button
            mode="contained-tonal"
            onPress={handleForgotPassword}
            style={styles.button}
            labelStyle={{ fontFamily: "Inter_500Medium", fontSize: 16 }}
            textColor="#000"
            buttonColor="#ffe368ff"
          >
            Forgot Password
          </Button>
          <Button
            mode="text"
            onPress={logout}
            textColor="#f87171"
            labelStyle={{ fontFamily: "Inter_500Medium", fontSize: 16 }}
            style={styles.logoutBtn}
          >
            Log Out
          </Button>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121213",
    padding: 24,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
    fontFamily: "Inter_700Bold",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  infoBox: {
    width: "100%",
    gap: 12,
    marginBottom: 32,
  },
  label: {
    color: "#818384",
    fontSize: 15,
    textTransform: "uppercase",
    fontFamily: "Poppins_400Regular",
  },
  text: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8,
    fontFamily: "Inter_400Regular",
  },
  buttonBox: {
    width: "100%",
    gap: 12,
  },
  logoutBtn: {
    marginTop: 12,
  },
  button: { borderColor: "#ffe368ff" },
});

export default AccountDashboard;
