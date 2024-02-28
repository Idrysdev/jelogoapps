import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const VerifItem = ({ text, operator }) => {
  return (
    <>
      <View
        style={{ backgroundColor: "#0372C1", padding: 10, borderRadius: 5 , marginBottom: operator === "Orange" ? 20 : 0}}
      >
        <Image
          source={require("../../assets/playstore.png")}
          style={{ width: 172, height: 39 }}
        />
      </View>

        {operator !=="Orange" && <Text style={styles.FirstText}>
            Bienvenue sur l’application <Text style={styles.span}>JELOGO</Text>
        </Text>}
      <Text style={styles.scndText}>{text}</Text>
    </>
  );
};

export default VerifItem;

const styles = StyleSheet.create({
  FirstText: {
    marginTop: 43,
    fontFamily: "Nunito-Regular",
    fontSize: 18,
  },
  span: {
    fontFamily: "Nunito-Black",
  },
  scndText: {
    fontFamily: "Nunito-Medium",
    fontSize: 21,
    textAlign: 'center'
  },
});
