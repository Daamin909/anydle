import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, Animated, Easing } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const Box = ({ letter, bgStyles, fgStyles }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const flipAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: animatedValue._value + 360,
      duration: 750,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!!bgStyles && !!fgStyles) {
      flipAnimation();
    }
  }, [bgStyles, fgStyles]);

  const rotateY = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotateY }],
  };

  return (
    <Animated.View style={[styles.container, bgStyles, animatedStyle]}>
      <Text style={[styles.text, fgStyles]}>{letter}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3a3a3c",
    justifyContent: "center",
    alignItems: "center",
    width: "18.5%",
    aspectRatio: 1,
    marginHorizontal: 5,
    backfaceVisibility: "hidden",
  },
  text: {
    fontSize: RFValue(30),
    fontFamily: "Inter_700Bold",
    color: "white",
  },
});

export default Box;
