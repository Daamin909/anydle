import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

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
        ...(letter == "enter" || letter == "backspace" ? { width: "12%" } : {}),
      }}
      onPress={() => handlePress(letter)}
      activeOpacity={0.6}
      accessibilityLabel={`Key ${letter}`}
    >
      {letter != "enter" && letter != "backspace" && (
        <Text
          style={{
            ...styles.text,
            ...(key_color ? styles[`${key_color}_fg`] : {}),
            lineHeight: RFValue(26),
          }}
        >
          {letter}
        </Text>
      )}
      {letter == "backspace" && (
        <Icon
          source={"backspace-outline"}
          size={RFValue(24)}
          style={{ height: RFValue(26) }}
        />
      )}
      {letter == "enter" && (
        <Icon
          source={"keyboard-return"}
          size={RFValue(24)}
          style={{ height: RFValue(26) }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#818384",
    paddingVertical: 4,
    marginHorizontal: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "9%",
  },
  text: {
    color: "#f8f8f8",
    fontSize: RFValue(20),
    fontFamily: "RobotoMono_700Bold",
  },
  G_bg: { backgroundColor: "#538d4e" },
  Y_bg: { backgroundColor: "#b59f3b" },
  B_bg: { backgroundColor: "#3a3a3c" },
  G_fg: { color: "#f8f8f8" },
  Y_fg: { color: "#f8f8f8" },
  B_fg: { color: "#fff" },
});

export default Key;
