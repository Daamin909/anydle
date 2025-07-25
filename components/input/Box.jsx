import { StyleSheet, View, Text } from "react-native";

const Box = ({ letter, bgStyles, fgStyles }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...bgStyles,
      }}
    >
      <Text
        style={{
          ...styles.text,
          ...fgStyles,
        }}
      >
        {letter}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A3A3C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 40,
    fontWeight: 700,
    color: "white",
  },
});

export default Box;
