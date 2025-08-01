import { StyleSheet, View, Text } from "react-native";
import LetterBoxes from "../components/input/LetterBoxes";
import Keyboard from "../components/input/Keyboard";
import { useEffect, useState, useCallback, useContext } from "react";
import evaluateGuess from "../scripts/evaluate";
import getRandomWord from "../scripts/getRandomWord";
import isValidWord from "../scripts/isValidWord";
import { useAnimatedShake } from "../hooks/useAnimatedShake";
import Settings from "../components/categories/Settings";
import { PaperProvider } from "react-native-paper";
import { useModal } from "../context/ModalContext";
import { Link } from "expo-router";

const index = () => {
  const [words, setWords] = useState([null, null, null, null, null, null]);
  const [guesses, setGuesses] = useState([null, null, null, null, null, null]);
  const [currentWord, setCurrentWord] = useState(0);
  const [wordle, setWordle] = useState(getRandomWord().toUpperCase());

  // shake animation vars
  const [shakenRowNumber, setShakenRowNumber] = useState(null);
  const { shake, rStyle, isShaking } = useAnimatedShake();

  // settings popup vars
  const { setShowModalFn, setHideModalFn, setIsSettingsVisibleExternal } =
    useModal();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const showSettings = () => setIsSettingsVisible(true);
  const hideSettings = () => setIsSettingsVisible(false);

  useEffect(() => {
    setShowModalFn(() => showSettings);
    setHideModalFn(() => hideSettings);
    setIsSettingsVisibleExternal(isSettingsVisible);
  }, [isSettingsVisible]);

  const handlePress = (key) => {
    if (key == "enter") {
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
    if (key == "backspace") {
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
    <PaperProvider>
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
        <Settings
          hideSettings={hideSettings}
          isSettingsVisible={isSettingsVisible}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 </Text>
          <Link href="https://daamin.tech" style={styles.footerText}>
            Daamin Ashai
          </Link>
          <Text style={styles.footerText}> · </Text>
          <Link href="/privacy" style={styles.footerText}>
            Privacy Policy
          </Link>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121213",
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    margin: "3%",
  },
  footerText: {
    color: "white",
    fontSize: 14,
    fontFamily: "monospace",
  },
});

export default index;
