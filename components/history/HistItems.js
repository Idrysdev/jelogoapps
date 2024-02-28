import { StyleSheet, Text, Pressable, View } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const HistItems = ({ label, active, id, onPress }) => {

  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
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
    <Pressable
      onLayout={onLayoutRootView}
      onPress={() => {onPress(id)}}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: active ? "#0372C1" : "#BDBDBD" },
        ]}
      >
        <Text style={styles.txt}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default HistItems;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minWidth: 123,
    paddingVertical: 12,
    borderRadius: 10,
  },
  txt: {
    color: "white",
    fontFamily: "Nunito-Bold",
  },
});
