import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ForItems from "../components/ForItems";

const Forfait = ({ route, navigation: { navigate } }) => {
  return (
    <View>
      <View
        style={[
          styles.barner,
          { backgroundColor: route.params.backgroundColor },
        ]}
      >
        <Text style={[styles.text, { color: route.params.textColor }]}>
          {route.params.nom}
        </Text>
      </View>
      <View>
        <ForItems data={route.params} navigate={navigate} />
      </View>
    </View>
  );
};

export default Forfait;

const styles = StyleSheet.create({
  barner: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 22,
    fontFamily: "Nunito-Bold",
  },
});
