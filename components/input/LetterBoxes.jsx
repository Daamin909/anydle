import { StyleSheet, View, Text } from "react-native";
import Box from "./Box";

const LetterBoxes = ({ words, setWords, guesses, setGuesses }) => {
  return (
    <View style={styles.container}>
      {words.map((word, index_1) => {
        if (!guesses[index_1]) {
          if (!word) {
            word = "     ";
          }
          const letters = word.split("");
          return (
            <View key={index_1} style={styles.row}>
              {letters.map((letter, index) => (
                <Box letter={letter} key={index} />
              ))}
            </View>
          );
        } else {
          const letters = guesses[index_1].split("");
          return (
            <View key={index_1} style={styles.row}>
              {letters.map((letter, index) => (
                <Box
                  letter={word[index]}
                  key={index}
                  bgStyles={styles[`${letter}_bg`]}
                  fgStyles={styles[`${letter}_fg`]}
                />
              ))}
            </View>
          );
        }
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
  G_bg: { backgroundColor: "#538d4e" },
  Y_bg: { backgroundColor: "#b59f3b" },
  B_bg: { backgroundColor: "#3a3a3c" },
  G_fg: { color: "#f8f8f8" },
  Y_fg: { color: "#f8f8f8" },
  B_fg: { color: "#fff" },
});

export default LetterBoxes;
