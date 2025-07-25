import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Key = ({ letter, handlePress, greens, blacks, yellows }) => {
  let key_color = greens.has(letter)
    ? "G"
    : yellows.has(letter)
    ? "Y"
    : blacks.has(letter)
    ? "B"
    : null;
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...(key_color ? styles[`${key_color}_bg`] : {}),
      }}
      onPress={() => handlePress(letter)}
    >
      <Text
        style={{
          ...styles.text,
          ...(key_color ? styles[`${key_color}_fg`] : {}),
        }}
      >
        {letter}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#818384",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#f8f8f8",
    fontSize: 20,
    fontWeight: "bold",
  },
  G_bg: { backgroundColor: "#538d4e" },
  Y_bg: { backgroundColor: "#b59f3b" },
  B_bg: { backgroundColor: "#3a3a3c" },
  G_fg: { color: "#f8f8f8" },
  Y_fg: { color: "#f8f8f8" },
  B_fg: { color: "#fff" },
});

export default Key;
