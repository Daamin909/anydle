import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Key = ({ letter, handlePress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(letter)}>
      <Text style={styles.text}>{letter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#818384",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#f8f8f8",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Key;
