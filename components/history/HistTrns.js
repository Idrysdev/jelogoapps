import {StyleSheet, Text, View, Image, Pressable} from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from '@react-navigation/native';

const localIcon = {
  "OM": require("../../assets/icons/Mobileservices.png"),
  "FLOOZ": require("../../assets/icons/Group12.png"),
  "MOMO": require("../../assets/icons/Group13.png"),
  "WAVE": require("../../assets/icons/Group14.png"),
  "JELOGO": require("../../assets/icons/Jelogo.png"),
}

SplashScreen.preventAutoHideAsync();

const HistTrns = (props) => {
  const navigation = useNavigation();
  const { data } = props
  const { type, network, amount, createdAt } = data

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

  const formatDateTime = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}h${date.getMinutes()}min`;
  };

  return (
      <Pressable onPress={()=>{
        navigation.navigate("DetailTransaction", {data:props})}}>
        <View onLayout={onLayoutRootView} style={styles.container}>
          <Image
              source={localIcon[network.code]}
              style={{ borderRadius: 200, width: 45, height: 45 }}
          />
          <View style={styles.allTxt}>
            {type === "cashin" &&
                <Text style={styles.txt1}>Rechargement</Text>
            }
            {type === "cashout" &&
                <Text style={styles.txt1}>Transfert d'argent</Text>
            }
            <Text style={styles.txt2}>{formatDateTime(new Date(createdAt))} </Text>
          </View>
          <Text style={styles.txt3}>{amount} FCFA</Text>
          <AntDesign name="right" size={16} color="black" />
        </View>
      </Pressable>

  );
};

export default HistTrns;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 17,
  },
  txt1: {
    fontFamily: "Nunito-Regular",
    fontSize: 15,
  },
  txt2: {
    fontFamily: "Nunito-Light",
    fontSize: 10,
  },
  txt3: {
    fontFamily: "Nunito-Bold",
    fontSize: 15,
  },
});
