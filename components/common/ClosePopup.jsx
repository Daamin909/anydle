import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const ClosePopup = ({ onPress }) => {
  return (
    <IconButton
      icon="close"
      iconColor="#fff"
      size={24}
      onPress={onPress}
      style={styles.closePopup}
    />
  );
};

export default ClosePopup;

const styles = StyleSheet.create({
  closePopup: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 20,
    zIndex: 100,
  },
});
