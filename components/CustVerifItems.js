import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";

const CustVerifItems = ({ text, text1 }) => {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <>
      <View
        onPress={onLayoutRootView}
        style={{ backgroundColor: "#0372C1", padding: 10, borderRadius: 5 }}
      >
        <Image
          source={require("../assets/playstore.png")}
          style={{ width: 172, height: 39 }}
        />
      </View>

      <Text style={styles.FirstText}>{text}</Text>
      <Text style={styles.scndText}>{text1}</Text>
    </>
  );
};

export default CustVerifItems;

const styles = StyleSheet.create({
  FirstText: {
    marginTop: 43,
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    textAlign: "center",
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
