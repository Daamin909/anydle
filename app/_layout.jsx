import "../firebaseConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import Navbar from "../components/navbar/Navbar";
import { ModalContext } from "../context/ModalContext";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AlertNotificationRoot } from "react-native-alert-notification";
// font imports
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [showModalFn, setShowModalFn] = useState(() => () => {});
  const [hideModalFn, setHideModalFn] = useState(() => () => {});
  const [isSettingsVisible, setIsSettingsVisibleExternal] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    RobotoMono_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ModalContext.Provider
      value={{
        showModal: showModalFn,
        setShowModalFn,
        hideModal: hideModalFn,
        setHideModalFn,
        isSettingsVisible,
        setIsSettingsVisibleExternal,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AlertNotificationRoot>
          <View style={styles.rootContainer}>
            <Drawer
              screenOptions={{
                drawerStyle: {
                  backgroundColor: "#121213",
                },
                headerRight: () => <Navbar />,
                headerStyle: {
                  backgroundColor: "#121213",
                  borderBottomWidth: 0.5,
                  borderColor: "white",
                },
                headerTitleStyle: {
                  fontFamily: "Poppins_400Regular",
                  marginTop: 5,
                },
                headerTintColor: "white",
                drawerLabelStyle: {
                  color: "white",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 22,
                },
              }}
            >
              <Drawer.Screen
                name="index"
                options={{
                  drawerLabel: "Home",
                  title: "Anydle",
                }}
              />
              <Drawer.Screen
                name="leaderboard"
                options={{
                  drawerLabel: "Leaderboard",
                  title: "Leaderboard",
                }}
              />
              <Drawer.Screen
                name="multiplayer"
                options={{
                  drawerLabel: "Multiplayer",
                  title: "Multiplayer",
                }}
              />
              <Drawer.Screen
                name="account"
                options={{
                  drawerLabel: "My Account",
                  title: "My Account",
                }}
              />
              <Drawer.Screen
                name="privacy"
                options={{
                  drawerLabel: "Privacy Policy",
                  title: "Privacy Policy",
                }}
              />
            </Drawer>
          </View>
        </AlertNotificationRoot>
      </GestureHandlerRootView>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default _layout;
