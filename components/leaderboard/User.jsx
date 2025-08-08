import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";

const User = ({ pfpURL, name, score, rank, user_id }) => {
  const [uuid, setUuid] = useState(null);
  const getRankColor = () => {
    if (rank === 1) return "#6aaa64";
    if (rank === 2) return "#c9b458";
    if (rank === 3) return "#7b9daeff";
    return "#c5c5c5ff";
  };
  useEffect(() => {
    try {
      const app = getApp();
      const auth = getAuth(app);
      const user = auth?.currentUser;
      const id = user.uid;
      setUuid(id);
    } catch (err) {
      console.log(err, "leaderboard auth thingy");
    }
  }, []);
  return (
    <View
      style={[
        styles.container,
        user_id === uuid && {
          borderColor: "#538d4e",
          transform: "scale(1.03)",
        },
      ]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.rank, { color: getRankColor() }]}>#{rank}</Text>
        <Image
          source={{
            uri:
              pfpURL || `https://picsum.photos/seed/${Math.random()}/200/300`,
          }}
          style={styles.profilePic}
        />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderColor: "#f8f8f8",
    borderWidth: 2,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 40,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  profilePic: {
    height: 42,
    width: 42,
    borderRadius: 21,
    marginRight: 12,
    backgroundColor: "#3a3a3c",
  },
  name: {
    fontSize: 22,
    color: "#f8f8f8",
    flexShrink: 1,
    fontFamily: "Inter_500Medium",
    width: "100%",
  },
  score: {
    fontSize: 20,
    color: "#f8f8f8",
    marginLeft: 10,
    fontFamily: "Inter_600SemiBold",
  },
});
