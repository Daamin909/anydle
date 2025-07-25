import { StyleSheet, View, Text } from "react-native";
import LetterBoxes from "../components/input/LetterBoxes";
import Keyboard from "../components/input/Keyboard";
import { useEffect, useState, useCallback } from "react";
import evaluateGuess from "../scripts/evaluate";
import getRandomWord from "../scripts/getRandomWord";
import isValidWord from "../scripts/isValidWord";
import { useAnimatedShake } from "../hooks/useAnimatedShake";

const index = () => {
  const [words, setWords] = useState([null, null, null, null, null, null]);
  const [guesses, setGuesses] = useState([null, null, null, null, null, null]);
  const [currentWord, setCurrentWord] = useState(0);
  const [wordle, setWordle] = useState(getRandomWord().toUpperCase());
  const [shakenRowNumber, setShakenRowNumber] = useState(null);
  const { shake, rStyle, isShaking } = useAnimatedShake();

  // useEffect(() => {
  //   shake();
  // }, [shakenRowNumber]);

  const handlePress = (key) => {
    if (key == "Enter") {
      if (words[currentWord]?.trim().length != 5) {
        setShakenRowNumber(currentWord);
        shake();
        return;
      } else if (!isValidWord(words[currentWord]?.trim())) {
        setShakenRowNumber(currentWord);
        shake();
        return;
      }
      const guess = evaluateGuess(words[currentWord], wordle);
      setGuesses((prev) => {
        const updated = [...prev];
        updated[currentWord] = guess;
        return updated;
      });
      if (currentWord == 6) {
        return;
      }
      setCurrentWord((prev) => prev + 1);
      return;
    }
    if (key == "⌫") {
      if (words[currentWord]) {
        setWords((prev) => {
          let updated = [...prev];
          const newWord = words[currentWord].trim().slice(0, -1);
          updated[currentWord] = newWord + " ".repeat(5 - newWord.length);
          return updated;
        });
      }
      return;
    }
    if (!words[currentWord]) {
      setWords((prev) => {
        let updated = [...prev];
        updated[currentWord] = `${key}    `;
        return updated;
      });
    } else if (words[currentWord].trim().length == 5) {
      return;
    } else {
      setWords((prev) => {
        let updated = [...prev];
        const newWord = words[currentWord].trim() + key;
        updated[currentWord] = newWord + " ".repeat(5 - newWord.length);
        return updated;
      });
    }
  };

  return (
    <View style={styles.container}>
      <LetterBoxes
        words={words}
        setWords={setWords}
        guesses={guesses}
        setGuesses={setGuesses}
        rStyle={rStyle}
        shakenRowNumber={shakenRowNumber}
      />
      <Keyboard
        handlePress={handlePress}
        words={words}
        currentWord={currentWord}
        guesses={guesses}
      />
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121213",
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15%",
    paddingTop: 10,
  },
  footer: {},
});

export default index;
