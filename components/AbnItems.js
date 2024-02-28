import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Pressable,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, memo, useContext, useCallback } from "react";
import BtnItem from "./BtnItem";
import { AuthContext } from "../context/AuthContext";
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

const AbnItems = ({ data, navigate }) => {
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

  const { validate } = useContext(AuthContext);
  const renderItemFalse = (item) => {
    return (
      <View
        onPress={onLayoutRootView}
        style={
          item.valideScan
            ? {
              alignItems: "center",
              marginVertical: 40,
              gap: 30,
            }
            : {
              alignItems: "center",
              marginVertical: 25,
              gap: 10,
            }
        }
      >
        {item.valideScan ? (
          <Pressable
            onPress={() => {
              navigate("Scan");
            }}
          >
            <Image
              source={require("../assets/qrcodescan.png")}
              style={{ width: 100, height: 100 }}
            />
          </Pressable>
        ) : null}
        <Text
          style={{
            fontFamily: "Nunito-SemiBold",
            fontSize: 17,
            textAlign: "center",
            color: "gray",
          }}
        >
          {item.Etape}
        </Text>
        {item.valideScan ? null : (
          <TextInput
            style={[
              styles.TextInput,
              {
                width: item.Etape == "Code secret" ? "13%" : "45%",
              },
            ]}
            placeholder={
              item.Etape == "Code secret" ? "* * * *" : "XXXXXXXXXXXXX"
            }
            keyboardType="numeric"
            secureTextEntry={item.Etape == "Code secret" ? true : false}
            maxLength={item.Etape == "Code secret" ? 4 : 14}
            onSubmitEditing={() => navigate("code")}
          />
        )}

        {(validate == false) & !item.valideScan ? (
          <View style={{ marginTop: 20 }}>
            <BtnItem
              navigation={() =>
                alert("Le service est indisponible pour l'instant !!!")
                // navigate("code", {
                //   type: "normal",
                // })
              }
              text="Confirmer"
            />
          </View>
        ) : null}
      </View>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigate("Home");
    }, 800);
  };

  return (
    <>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              paddingVertical: 25,
              paddingHorizontal: 30,
              borderRadius: 25,
              gap: 15,
            }}
          >
            <AntDesign name="checkcircleo" size={55} color="#1ACA56" />
            <Text
              style={{
                fontFamily: "Nunito-Medium",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Votre transaction a bien été effectuée
            </Text>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data.option}
        renderItem={({ item }) =>
          Object.keys(item).length == 2
            ? renderItem(data, item, navigate)
            : renderItemFalse(item)
        }
      />
    </>
  );
};

export default memo(AbnItems);

const styles = StyleSheet.create({
  visible: {
    flex: 1,
    display: "flex",
  },
  TextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ABB0BC",
    fontSize: 17,
    fontFamily: "Nunito-Medium",
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
