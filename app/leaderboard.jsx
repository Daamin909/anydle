import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import getLeaderboard from "../scripts/db/getLeaderboard";
import User from "../components/leaderboard/User";
import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setUsers(data);
      setLoading(false);
    };

    fetchLeaderboard();

    const auth = getAuth(getApp());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>All-Time Leaderboard</Text>

      {loading && signedIn && <Text style={styles.noData}>Loading...</Text>}

      {!signedIn && (
        <Text style={styles.noData}>
          Please sign in to view the leaderboard.
        </Text>
      )}

      {signedIn &&
        users.map((user, index) => (
          <User
            key={`${user.username}-${index}`}
            name={user.username}
            score={user.score}
            rank={index + 1}
          />
        ))}
    </ScrollView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: { backgroundColor: "#121213", flex: 1 },
  heading: {
    color: "white",
    fontFamily: "monospace",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    margin: 10,
    padding: 10,
  },
  noData: {
    color: "#aaa",
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
  },
});
