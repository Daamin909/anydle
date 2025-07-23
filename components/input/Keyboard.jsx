import { StyleSheet, View, Text } from "react-native";
import Key from "./Key";

const Keyboard = ({ handlePress }) => {
  const keys = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["Enter", ..."ZXCVBNM".split(""), "⌫"],
  ];
  return (
    <View style={styles.container}>
      {keys.map((row, index_1) => (
        <View key={index_1} style={styles.row}>
          {row.map((key, index) => (
            <Key key={index} letter={key} handlePress={handlePress} />
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
