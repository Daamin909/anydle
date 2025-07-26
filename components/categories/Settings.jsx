import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

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
            <Text>Me when the and the can the but they then the</Text>
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
  },
});
