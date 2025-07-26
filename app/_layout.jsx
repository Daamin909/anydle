import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Button, StyleSheet, View } from "react-native";
import Navbar from "../components/navbar/Navbar";
import { ModalContext } from "../context/ModalContext";
import { useState } from "react";

const _layout = () => {
  const [showModalFn, setShowModalFn] = useState(() => () => {});
  const [hideModalFn, setHideModalFn] = useState(() => () => {});
  const [isSettingsVisible, setIsSettingsVisibleExternal] = useState(false);

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
              name="index" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Home",
                title: "",
              }}
            />
            <Drawer.Screen
              name="leaderboard" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Leaderboard",
                title: "",
              }}
            />
          </Drawer>
          <Toast />
        </View>
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
