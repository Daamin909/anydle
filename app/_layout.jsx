import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#121213",
            },
            headerStyle: {
              backgroundColor: "#121213",
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
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
export default _layout;
