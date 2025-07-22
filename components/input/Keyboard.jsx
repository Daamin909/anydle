import { StyleSheet, View, Text } from "react-native";
import Key from "./Key";

const Keyboard = () => {
  const keys = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["Enter", ..."ZXCVBNM".split(""), "⌫"],
  ];
  return (
    <View style={styles.container}>
      {keys.map((row) => (
        <View style={styles.row}>
          {row.map((key) => (
            <Key letter={key} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 3,
  },
});

export default Keyboard;
