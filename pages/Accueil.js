import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import MbSrvItem from "../components/MbSrvItem";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import News from "../components/News";
import Data from "../components/Data";

SplashScreen.preventAutoHideAsync();

const Accueil = ({ route, navigation: { navigate } }) => {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
  });

  const { label, txt, data, name } = route.params;
  // console.log('route :>> ', JSON.stringify(route));alert("ee")
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const { Data_Null } = Data;
  const { Data_Null } = Data;

  const Header = () => {
    return (
      <View onLayout={onLayoutRootView} style={styles.container}>
        <Text style={styles.textCont}>{txt}</Text>
        <View style={styles.items}>
          <MbSrvItem navigate={navigate} name={name} label={label} data={data} txt={txt} />
        </View>
        <Text style={styles.textCont}>News</Text>
        <News />
      </View>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={Data_Null}
      renderItem={() => <Header />}
    />
  );
};

export default Accueil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  textCont: {
    fontSize: 28,
    fontFamily: "Nunito-Bold",
    textAlign: "left",
    marginTop: 25,
    marginBottom: 20,
  },
  items: {
    flex: 1,
    alignItems: "center",
  },
});
