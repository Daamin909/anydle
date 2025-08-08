import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import getLeaderboard from "../scripts/db/getLeaderboard";
import User from "../components/leaderboard/User";
import { getApp } from "@react-native-firebase/app";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import AnimatedLoader from "react-native-animated-loader";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(getApp());

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("vro is signed in");
        setSignedIn(true);
        setLoading(true);
        const data = await getLeaderboard();
        setUsers(data);
        setLoading(false);
      } else {
        console.log("vro is signed out");
        setSignedIn(false);
        setUsers([]); // clear users when signed out
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>All-Time Leaderboard</Text>

      {loading && signedIn && (
        <AnimatedLoader
          visible={true}
          animationStyle={styles.lottie}
          speed={1}
          source={require("../assets/json/loading.json")}
        ></AnimatedLoader>
      )}

      {!loading && !signedIn && (
        <Text style={styles.noData}>
          Please sign in to view the leaderboard.
        </Text>
      )}
      {signedIn && !loading && users.length == 0 && (
        <Text style={styles.noData}>No users found.</Text>
      )}
      {signedIn &&
        !loading &&
        users.map((user, index) => (
          <User
            key={user.id}
            user_id={user.id}
            name={user.username}
            score={user.score}
            pfpURL={user.photoURL}
            rank={index + 1}
          />
        ))}
    </ScrollView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
  container: { backgroundColor: "#121213", flex: 1 },
  heading: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    margin: 10,
    padding: 10,
  },
  noData: {
    color: "#aaa",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    fontSize: 18,
    marginTop: 30,
  },
});
