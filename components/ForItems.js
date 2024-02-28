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
import React, { useState, memo } from "react";

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
        navigate("Forfait", {
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

const ForItems = ({ data, navigate }) => {
  const [visible, setVisible] = useState(false);
  const [forfait, setForfait] = useState("");

  const [forMe, setForMe] = useState(true);
  const [forYou, setForYou] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setVisible(false);
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

      <Modal
        visible={visible}
        onAccessibilityAction={true}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <Pressable
          onPress={() => {
            setVisible(!visible);
          }}
          style={{
            backgroundColor: "rgba(0,0,0,.2)",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            style={{
              flex: 0.6,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: "center",
              paddingVertical: 30,
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Nunito-Light" }}>
              Confirmer l'achat du forfait suivant :
            </Text>
            <Text style={{ fontSize: 21, fontFamily: "Nunito-Bold" }}>
              {forfait}
            </Text>

            <View style={{ gap: 10, marginVertical: 20 }}>
              <Pressable
                onPress={() => {
                  setForMe(true);
                  setForYou(false);
                }}
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: forMe
                      ? "#0372C1"
                      : "rgba(3, 114, 193, 0.25)",
                  }}
                ></View>
                <Text style={{ fontSize: 17, fontFamily: "Nunito-Regular" }}>
                  Confirmer pour soi même
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setForYou(true);
                  setForMe(false);
                }}
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: forYou
                      ? "#0372C1"
                      : "rgba(3, 114, 193, 0.25)",
                  }}
                ></View>
                <Text style={{ fontSize: 17, fontFamily: "Nunito-Regular" }}>
                  Confirmer pour un(e) autre
                </Text>
              </Pressable>
              <View
                style={{ flexDirection: "row", alignItems: "flex-end", gap: 7 }}
              >
                <View
                  style={{
                    borderBottomColor: "#ABB0BC",
                    borderBottomWidth: 1,
                    padding: 3,
                  }}
                >
                  <Text style={{ fontSize: 17, fontFamily: "Nunito-Medium" }}>
                    +225
                  </Text>
                </View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="0X XX XX XX XX"
                  keyboardType="numeric"
                  maxLength={10}
                  onSubmitEditing={() => showModal()}
                  onFocus={() => {
                    setForMe(false);
                    setForYou(true);
                  }}
                />
              </View>
            </View>

            <Pressable
              onPress={() => {
                alert("Le service est indisponible pour l'instant !")
                return
                showModal()
              }} style={styles.BtnPrinc}>
              <Text style={styles.BtnPrincTxt}>Confirmer</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <FlatList
        data={data.option}
        contentContainerStyle={{ paddingBottom: 210 }}
        renderItem={({ item }) =>
          Object.keys(item).length == 2 ? (
            renderItem(data, item, navigate)
          ) : (
            <Pressable
              onPress={() => {
                setVisible(!visible);
                setForfait(item.Label);
              }}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: data.backgroundColor,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontFamily: "Nunito-Medium", fontSize: 17 }}>
                {item.Label}
              </Text>
            </Pressable>
          )
        }
      />
    </>
  );
};

export default memo(ForItems);

const styles = StyleSheet.create({
  visible: {
    flex: 1,
    display: "flex",
  },
  TextInput: {
    width: "53%",
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
  },
  BtnPrincTxt: {
    fontFamily: "Nunito-Medium",
    fontSize: 21,
    color: "white",
  },
});
