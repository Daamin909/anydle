import { StyleSheet, View, Text } from "react-native";

const Box = ({ letter }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A3A3C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 30,
    color: "white",
  },
});

export default Box;
