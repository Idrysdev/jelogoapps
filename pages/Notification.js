import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vous n'avez aucune nouvelle notification</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "gray",
    fontFamily: "Nunito-Light",
  },
});
