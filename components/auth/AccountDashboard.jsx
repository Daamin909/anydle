import { useState } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import logout from "../../auth/logout";

const AccountDashboard = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user && user.email}</Text>
      <Text style={styles.text}>
        Name: {user && user.providerData[0]?.displayName}
      </Text>
      <Text style={styles.text}>
        Phone Number: {user && user.providerData[0]?.phoneNumber}
      </Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: user && user.providerData[0]?.photoURL,
        }}
      />
      <Button title="Log Out" onPress={logout}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tinyLogo: {
    width: 50,
    height: 50,
  },
  text: {
    color: "white",
  },
});

export default AccountDashboard;
