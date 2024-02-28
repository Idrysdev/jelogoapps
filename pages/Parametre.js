import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ItemParam from "../components/ItemParam";
import Data from "../components/Data";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const { Data_Parametre, Data_Null } = Data;
const Parametre = ({ navigation: { navigate } }) => {

  const customer = useSelector(state => state.count.customer);

  return (
    <FlatList
      data={Data_Null}
      renderItem={({ item }) => (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              margin: 10,
            }}
          >
            <Image
              source={{ uri: customer.avatar }}
              style={{ width: 70, height: 70, borderRadius: 100 }}
            />
            <View>
              <Text style={{ fontSize: 21, fontFamily: "Nunito-Bold" }}>
                {customer.firstName}
              </Text>
              <Text style={{ fontFamily: "Nunito-Regular" }}>
                +225 {customer.phone}
              </Text>
            </View>
          </View>
          <View>
            <ItemParam data={Data_Parametre} nav={navigate} />
          </View>
        </View>
      )}
    />
  );
};

export default Parametre;

const styles = StyleSheet.create({});
