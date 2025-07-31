import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import Navbar from "../components/navbar/Navbar";
import { ModalContext } from "../context/ModalContext";
import { useState, useEffect } from "react";
import firebaseInit from "../firebase/firebaseConfig";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Inter_700Bold } from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync();

firebaseInit();

const _layout = () => {
  const [showModalFn, setShowModalFn] = useState(() => () => {});
  const [hideModalFn, setHideModalFn] = useState(() => () => {});
  const [isSettingsVisible, setIsSettingsVisibleExternal] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Inter_700Bold,
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
              headerTintColor: "white",
              drawerLabelStyle: {
                color: "white",
              },
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Home",
                title: "",
              }}
            />
            <Drawer.Screen
              name="leaderboard"
              options={{
                drawerLabel: "Leaderboard",
                title: "",
              }}
            />
            <Drawer.Screen
              name="account"
              options={{
                drawerLabel: "My Account",
                title: "",
              }}
            />
            <Drawer.Screen
              name="privacy"
              options={{
                drawerLabel: "Privacy Policy",
                title: "",
              }}
            />
          </Drawer>
        </View>
        <Toast />
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
