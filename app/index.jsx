import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import getLeaderboard from "../scripts/db/getLeaderboard";
import User from "../components/leaderboard/User";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getthelb = async () => {
      const data = await getLeaderboard();
      setUsers(data);
    };
    getthelb();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>All-Time Leaderboard</Text>

      {users.map((user, index) => (
        <User
          key={user.id}
          name={user.username}
          score={user.score}
          profilePic={user.profilePic}
          rank={index + 1}
        />
      ))}

      {users.length === 0 && <Text style={styles.noData}>Loading...</Text>}
    </ScrollView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: { backgroundColor: "#1a1a1c", flex: 1 },
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
