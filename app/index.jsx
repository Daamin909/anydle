import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native-paper";
import { io } from "socket.io-client";
import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const multiplayer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const auth = getAuth(getApp());
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });

    socketRef.current = io("http://192.168.29.66:3000");
    socketRef.current.on("connect", () => {
      console.log("Connected to server:", socketRef.current.id);
    });
    socketRef.current.on("pongFromServer", (msg) => {
      console.log("Received from server:", msg);
    });
    return () => {
      socketRef.current.disconnect();
      unsubscribe();
    };
  }, []);

  const handlePress = () => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("singleplayerMatchup", {
        looking_for_matchup: true,
        uid: user.uid,
        timestamp: new Date(),
        email: user.email,
        username: user.displayName,
      });
      setLoading(true);
    } else {
      console.log("Not connected to server yet");
    }
  };

  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <Text style={styles.heading}>multiplayer</Text>
          {user && (
            <Button mode="contained-tonal" onPress={handlePress}>
              Start matchmaking
            </Button>
          )}
          {!user && (
            <Text style={styles.text}>Sign in to play multiplayer</Text>
          )}
        </>
      )}
      {loading && (
        <View style={styles.overlay}>
          <Image
            style={styles.lottie}
            source={require("../assets/loading.gif")}
          />
        </View>
      )}
    </View>
  );
};

export default multiplayer;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  container: {
    backgroundColor: "#121213",
    flex: 1,
    gap: 10,
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontFamily: "Inter_500Medium",
    textTransform: "capitalize",
    textAlign: "center",
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    textTransform: "capitalize",
    textAlign: "center",
    margin: 10,
  },
});
