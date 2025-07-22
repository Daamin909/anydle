import { StyleSheet, View, Text } from "react-native";
import LetterBoxes from "../components/input/LetterBoxes";
import Keyboard from "../components/input/Keyboard";

const index = () => {
  return (
    <View style={styles.container}>
      <LetterBoxes />
      <Keyboard />
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
});

export default index;
