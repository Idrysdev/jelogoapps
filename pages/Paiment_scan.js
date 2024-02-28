import { StyleSheet, Text, View, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import AbnItems from "../components/AbnItems";
import { AuthContext } from "../context/AuthContext";
import BtnItem from "../components/BtnItem";

const Paiment_scan = ({ route, navigation: { navigate } }) => {
  const { validate, setValidate } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setValidate(false);
    navigate("DrawerNav");
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigate("DrawerNav");
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
          <AbnItems data={route.params} navigate={navigate} />
        </View>
        {validate == true ? (
          <>
            <View style={styles.boxValidate}>
              <AntDesign name="checkcircleo" size={25} color="#1ACA56" />
              <View>
                <Text
                  style={{ textAlign: "center", fontFamily: "Nunito-Medium" }}
                >
                  Votre réabonnement au service{" "}
                  <Text style={{ fontWeight: "bold" }}>{route.params.nom}</Text>{" "}
                  a bien été effectué
                </Text>
              </View>
            </View>
            <BtnItem text="Terminer" navigation={() => showModal()} />
          </>
        ) : null}
      </View>
    </>
  );
};

export default Paiment_scan;

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
  boxValidate: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginHorizontal: 20,
    borderColor: "rgba(26, 202, 86,.3)",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 12,
  },
});
