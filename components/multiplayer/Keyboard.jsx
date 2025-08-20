import { StyleSheet, View, Text } from "react-native";
import Key from "./Key";
import { useEffect, useState } from "react";

const getKeyColors = (words, guesses) => {
  const greens = new Set();
  const yellows = new Set();
  const blacks = new Set();

  words.forEach((word, index) => {
    if (!word || !guesses[index]) return;
    const letters = word.trim().split("");
    const feedback = guesses[index].split("");

    letters.forEach((letter, i) => {
      const color = feedback[i];
      if (color === "G") {
        greens.add(letter);
        yellows.delete(letter);
        blacks.delete(letter);
      } else if (color === "Y") {
        if (!greens.has(letter)) yellows.add(letter);
        blacks.delete(letter);
      } else {
        if (!greens.has(letter) && !yellows.has(letter)) {
          blacks.add(letter);
        }
      }
    });
  });

  return { greens, yellows, blacks };
};

const Keyboard = ({ handlePress, words, currentWord, guesses }) => {
  const { greens, yellows, blacks } = getKeyColors(words, guesses);

  const keys = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["enter", ..."ZXCVBNM".split(""), "backspace"],
  ];

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
