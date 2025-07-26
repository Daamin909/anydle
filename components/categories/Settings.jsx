import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
import getCategory from "../../scripts/fetch/getCategory";

const Settings = ({ isSettingsVisible, hideSettings }) => {
  const containerStyle = { backgroundColor: "rgba(25, 27, 30)", padding: 20 };

  return (
    <View>
      <Portal>
        <Modal
          visible={isSettingsVisible}
          onDismiss={hideSettings}
          contentContainerStyle={containerStyle}
          dismissableBackButton={true}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getCategory("technology")}
            >
              <Text style={styles.text}>Hello</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontWeight: 900,
    color: "white",
    fontSize: 40,
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 20,
  },
});
