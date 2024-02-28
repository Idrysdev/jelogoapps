import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const VerifItemCode = ({ text, type }) => {
  return type == "secure" ? (
    <>
      <View
        style={{
          backgroundColor: "#000000",
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      >
        <Image
          source={require("../assets/playstoreSlug2.png")}
          style={{ width: 172, height: 78.68 }}
        />
      </View>
      <AntDesign
        name="lock"
        size={50}
        color="black"
        style={{ marginVertical: 10 }}
      />
      <Text style={styles.scndText}>{text}</Text>
    </>
  ) : (
    <>
      <View
        style={{ backgroundColor: "#0372C1", padding: 10, borderRadius: 5 }}
      >
        <Image
          source={require("../assets/playstore.png")}
          style={{ width: 172, height: 39 }}
        />
      </View>
      <Text style={styles.scndText}>{text}</Text>
    </>
  );
};

export default VerifItemCode;

const styles = StyleSheet.create({
  FirstText: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
  },
  span: {
    fontFamily: "Nunito-Black",
  },
  scndText: {
    fontFamily: "Nunito-Medium",
    fontSize: 21,
    textAlign: "center",
  },
});
