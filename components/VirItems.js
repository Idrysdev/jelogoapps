import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, memo, useCallback } from "react";
import { useFonts } from "expo-font";

const renderItem = (data, item, navigate) => {

  return (
    <Pressable
      style={{
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: data.backgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
      }}
      onPress={() =>
        navigate("Abonement", {
          option: item.option,
          nom: data.nom,
          backgroundColor: data.backgroundColor,
          textColor: data.textColor,
        })
      }
    >
      <Text style={{ fontFamily: "Nunito-Medium", fontSize: 20 }}>
        {item.Label}
      </Text>
      <AntDesign name="right" size={24} color="black" />
    </Pressable>
  );
};

const VirItems = ({ data, navigate }) => {
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

  const renderItemFalse = (item) => {
    return (
      <View
        onPress={onLayoutRootView}
        style={{
          marginVertical: 7,
          marginHorizontal: 7,
          gap: 3,
        }}
      >
        <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: 17 }}>
          {item.Etape}
        </Text>
        <TextInput
          style={[styles.TextInput]}
          placeholder={item.Placeholder}
          placeholderTextColor={"gray"}
          keyboardType={item.Etape == "Nom du compte" ? "default" : "numeric"}
          secureTextEntry={!!(item.Etape == "Code secret")}
          maxLength={item.Etape == "Code secret" ? 4 : 14}
          onSubmitEditing={() => navigate("code")}
        />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={data.option}
        style={{ marginVertical: 27 }}
        renderItem={({ item }) =>
          Object.keys(item).length == 2
            ? renderItemFalse(item)
            : renderItem(data, item, navigate)
        }
      />
    </>
  );
};

export default memo(VirItems);

const styles = StyleSheet.create({
  visible: {
    flex: 1,
    display: "flex",
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#ABB0BC",
    fontSize: 17,
    fontFamily: "Nunito-Medium",
    width: "auto",
    padding: 7,
    borderRadius: 7,
  },
  BtnPrinc: {
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor: "#0372C1",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: "center",
  },
  BtnPrincTxt: {
    fontFamily: "Nunito-Medium",
    fontSize: 21,
    color: "white",
  },
});
