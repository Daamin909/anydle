import { StyleSheet, View, Text } from "react-native";
import LetterBoxes from "../components/input/LetterBoxes";
import Keyboard from "../components/input/Keyboard";
import { useState } from "react";

const index = () => {
  const [words, setWords] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const handlePress = (key) => {};

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
