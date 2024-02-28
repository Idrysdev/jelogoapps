import { StyleSheet, Text, View, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, {useContext, useEffect, useState} from "react";
import VirItems from "../components/VirItems";
import { AuthContext } from "../context/AuthContext";
import BtnItem from "../components/BtnItem";
import Data from "../components/Data";
import { FlatList } from "react-native-gesture-handler";

const { Data_Null } = Data;

const Page_etape_bnq = ({ route, navigation: { navigate } }) => {
  const { validate, setValidate } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log("route Page_etape_bnq", route.name)
    },[route]);

  const showModal = () => {
    setValidate(false);
    navigate("Notification");
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setValidate(!validate);
      navigate("DrawerNav");
    }, 800);
  };
    // alert("Le service est indisponible pour l'instant !!!")
  return (
    <FlatList
      data={Data_Null}
      style={{ paddingBottom: 100 }}
      renderItem={({ item }) => (
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
              <VirItems data={route.params} navigate={navigate} />
            </View>

            {validate === true ? (
              showModal()
            ) : (
              <View style={{ marginTop: 20 }}>
                <BtnItem
                  navigation={() =>
                      route.name === "Page_etape_bnq" ? alert("Le service est indisponible pour l'instant !!!"):
                    navigate("code", {
                      type: "normal",
                    })
                  }
                  text="Confirmer"
                />
              </View>
            )}
          </View>
        </>
      )}
    />
  );
};

export default Page_etape_bnq;

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
