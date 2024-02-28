import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import VerifItem from "../components/lock/VerifItem";

SplashScreen.preventAutoHideAsync();

const VerificationN22 = ({ navigation: { navigate } }) => {
  const [fontsLoaded] = useFonts({
    "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <VerifItem />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../assets/icons/Digtal.png")}
          style={{ width: 157, height: 184 }}
        />
        <Text style={styles.txtPrint}>
          Posez votre doigt pour l’authentification{" "}
        </Text>
      </View>
      <Pressable
        onPress={() => navigate("lockScreen")}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 40,
          alignItems: "center",
          gap: 8,
        }}
      >
        <View style={{ flexDirection: "row", gap: 15 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "rgba(3, 114, 193, 0.25)",
            }}
          ></View>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "rgba(3, 114, 193, 0.25)",
            }}
          ></View>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "rgba(3, 114, 193, 0.25)",
            }}
          ></View>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "rgba(3, 114, 193, 0.25)",
            }}
          ></View>
        </View>
        <Text style={{ color: "#ABB0BC", fontFamily: "Nunito-Light" }}>
          Utiliser votre code secret
        </Text>
      </Pressable>
    </View>
  );
};

export default VerificationN22;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    marginTop: 116,
  },
  txtPrint: {
    fontFamily: "Nunito-Medium",
    color: "#6F6F70",
    fontSize: 17,
    textAlign: "center",
    marginTop: 30,
  },
});
