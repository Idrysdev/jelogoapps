import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { openLink } from "../utilies/utils";

const renderItem = (item, nav) => {
  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={styles.text}>{item.Label}</Text>
      <ItemParam data={item.option} nav={nav} />
    </View>
  );
};

const ItemParam = (props) => {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) =>
        item.option ? (
          renderItem(item, props.nav)
        ) : (
          <Pressable
            onPress={() => {
              console.log('nav.....', item)
              item.link ? openLink(item.link)
                :
                item.Label == "Lire Qr code" ? props.nav("Scan")
                  :
                  item.Label == "Changer code secret" ? props.nav("code", { type: "normal" })
                    :
                    null;
            }}
            style={styles.item}
          >
            <View style={styles.icon}>
              <FontAwesome5 name={item.icon} size={20} color="black" />
              <Text style={{ fontFamily: "Nunito-Bold", fontSize: 17 }}>
                {item.Label}
              </Text>
            </View>
            <AntDesign name="right" size={16} color="black" />
          </Pressable>
        )
      }
    />
  );
};

export default memo(ItemParam);

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito-Medium",
    fontSize: 17,
    marginHorizontal: 10,
    color: "gray",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
