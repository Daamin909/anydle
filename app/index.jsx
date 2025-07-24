import { StyleSheet, View, Text } from "react-native";
import LetterBoxes from "../components/input/LetterBoxes";
import Keyboard from "../components/input/Keyboard";
import { useState } from "react";

const index = () => {
  const [words, setWords] = useState([null, null, null, null, null, null]);
  const [currentWord, setCurrentWord] = useState(0);
  const handlePress = (key) => {
    if (key == "Enter") {
      
      if (words[currentWord]?.trim().length != 5) {
        // ? will we add a shake effect if enter cant be pressed yet
        return;
      }

      // TODO add this calculation bit
      // triggerTheCalculation();

      if (currentWord == 6){
        // ! game is over
        return
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
      <LetterBoxes words={words} setWords={setWords} />
      <Keyboard handlePress={handlePress} />
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
