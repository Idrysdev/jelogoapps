import {StyleSheet, Text, Pressable, TouchableOpacity} from "react-native";
import React from "react";

const BtnItem = ({text, navigation}) => {
  return (
    <>
      <TouchableOpacity
        onPress={navigation}
        style={styles.BtnPrinc}
      >
        <Text style={styles.BtnPrincTxt}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default BtnItem;

const styles = StyleSheet.create({
  BtnPrinc: {
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor: "#0372C1",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  BtnPrincTxt: {
    fontFamily: "Nunito-Medium",
    fontSize: 21,
    color: "white",
  },
});
