import { StyleSheet, View, Text } from "react-native";
import Key from "./Key";
import { useEffect, useState } from "react";

const Keyboard = ({ handlePress, words, currentWord, guesses }) => {
  const [greens, setGreens] = useState(new Set());
  const [blacks, setBlacks] = useState(new Set());
  const [yellows, setYellows] = useState(new Set());

  const keys = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["enter", ..."ZXCVBNM".split(""), "backspace"],
  ];

  useEffect(() => {
    if (currentWord == 0) return;
    words.forEach((word, index) => {
      if (!word || !guesses[index]) return;
      const letters = word.split("");
      const feedback = guesses[index].split("");
      letters.forEach((letter, i) => {
        const color = feedback[i];
        if (color === "G") {
          setGreens((prev) => new Set([...prev, letter]));
          if (yellows.has(letter)) {
            setYellows((prev) => {
              const updated = new Set(prev);
              updated.delete(letter);
              return updated;
            });
          }
          if (blacks.has(letter)) {
            setBlacks((prev) => {
              const updated = new Set(prev);
              updated.delete(letter);
              return updated;
            });
          }
        } else if (color === "Y") {
          if (!greens.has(letter)) {
            setYellows((prev) => new Set([...prev, letter]));
          }
          if (blacks.has(letter)) {
            setBlacks((prev) => {
              const updated = new Set(prev);
              updated.delete(letter);
              return updated;
            });
          }
        } else {
          if (!greens.has(letter) && !yellows.has(letter)) {
            setBlacks((prev) => new Set([...prev, letter]));
          }
        }
      });
    });
  }, [currentWord]);

  return (
    <View style={styles.container}>
      {keys.map((row, index_1) => (
        <View key={index_1} style={styles.row}>
          {row.map((key, index) => {
            return (
              <Key
                key={index}
                letter={key}
                handlePress={handlePress}
                greens={greens}
                blacks={blacks}
                yellows={yellows}
              />
            );
          })}
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
