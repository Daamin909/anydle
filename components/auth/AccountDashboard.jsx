import { useState } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import logout from "../../auth/logout";

const AccountDashboard = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text>Email: {user && user.email}</Text>
      <Text>Name: {user && user.providerData[0]?.displayName}</Text>
      <Text>Phone Number: {user && user.providerData[0]?.phoneNumber}</Text>
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
});

export default AccountDashboard;
