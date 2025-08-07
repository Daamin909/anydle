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
import { IconButton } from "react-native-paper";

const AccountDashboard = ({ user }) => {
  const [photo, setPhoto] = useState(user?.providerData[0]?.photoURL || null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePhotoChange = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
    setMenuVisible(false);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setMenuVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.heading}>My Account</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Image
                source={
                  photo
                    ? { uri: photo }
                    : require("../../assets/placeholder.jpg")
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={async () => {
              const permission =
                await ImagePicker.requestCameraPermissionsAsync();
              if (!permission.granted) {
                Alert.alert(
                  "Permission needed",
                  "We need access to your camera."
                );
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
              });

              if (!result.canceled) {
                setPhoto(result.assets[0].uri);
              }

              setMenuVisible(false);
            }}
            title="Take Photo"
          />

          <Menu.Item
            onPress={async () => {
              const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (!permission.granted) {
                Alert.alert(
                  "Permission needed",
                  "We need access to your photos."
                );
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
              });

              if (!result.canceled) {
                setPhoto(result.assets[0].uri);
              }

              setMenuVisible(false);
            }}
            title="Choose from Gallery"
          />

          <Menu.Item
            onPress={() => {
              setPhoto(null);
              setMenuVisible(false);
            }}
            title="Remove Photo"
          />
        </Menu>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>{user?.email}</Text>

          <Text style={styles.label}>Username</Text>
          <Text style={styles.text}>
            {user?.providerData[0]?.displayName || "Not set"}
          </Text>
        </View>

        <View style={styles.buttonBox}>
          <Button
            mode="contained-tonal"
            onPress={() => Alert.alert("Change Password")}
            buttonColor="#538d4e"
            labelStyle={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
            textColor="#f8f8f8"
          >
            Change Password
          </Button>
          <Button
            mode="outlined"
            onPress={() => Alert.alert("Forgot Password")}
            style={styles.button}
            labelStyle={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
            textColor="#ffe368ff"
          >
            Forgot Password
          </Button>
          <Button
            mode="text"
            onPress={logout}
            textColor="#f87171"
            labelStyle={{ fontFamily: "Inter_400Regular", fontSize: 16 }}
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
