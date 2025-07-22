import { StyleSheet, View, Text } from "react-native";
import Box from "./Box";

const LetterBoxes = () => {
  const words = ["aroma", "puked", "     ", "     ", "     ", "     "];
  return (
    <View style={styles.container}>
      {words.map((word, index_1) => {
        const letters = word.split("");
        return (
          <View key={index_1} style={styles.row}>
            {letters.map((letter, index) => (
              <Box letter={letter} key={index} />
            ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 5,
  },
});

export default LetterBoxes;
