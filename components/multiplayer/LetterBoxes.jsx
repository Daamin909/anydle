import { StyleSheet, View, Text } from "react-native";
import Box from "./Box";
import Animated from "react-native-reanimated";

const LetterBoxes = ({
  words,
  setWords,
  guesses,
  setGuesses,
  rStyle,
  shakenRowNumber,
}) => {
  return (
    <View style={styles.container}>
      {words.map((word, index_1) => {
        if (!guesses[index_1]) {
          if (!word) {
            word = "     ";
          }
          const letters = word.split("");
          return (
            <Animated.View
              key={index_1}
              style={[styles.row, shakenRowNumber == index_1 ? rStyle : {}]}
            >
              {letters.map((letter, index) => (
                <Box letter={letter} key={index} />
              ))}
            </Animated.View>
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
  G_bg: { backgroundColor: "#538d4e", borderWidth: 0 },
  Y_bg: { backgroundColor: "#b59f3b", borderWidth: 0 },
  B_bg: { backgroundColor: "#3a3a3c", borderWidth: 0 },
  G_fg: { color: "#f8f8f8" },
  Y_fg: { color: "#f8f8f8" },
  B_fg: { color: "#fff" },
});

export default LetterBoxes;
