import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useModal } from "../../context/ModalContext";

const Navbar = () => {
  const { showModal, hideModal, isSettingsVisible } = useModal();
  return (
    <View style={styles.container}>
      <IconButton
        icon={"cog"}
        iconColor="#e3e3e3"
        onPress={isSettingsVisible ? hideModal : showModal}
      />
      <TouchableOpacity onPress={() => null} style={styles.button}>
        <Text style={styles.text}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 3,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    borderColor: "#e3e3e3",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Navbar;
