import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { memo } from "react";
import Data from "./Data";

const ShareItems = () => {
  const { Data_Social_Media } = Data;
  return (
    <FlatList
      data={Data_Social_Media}
      numColumns={4}
      keyExtractor={(item) => item.nom}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.img} style={{ width: 50, height: 50 }} />
          <Text style={styles.txtItems}>{item.nom}</Text>
        </View>
      )}
      style={styles.flatlist}
    />
  );
};

export default memo(ShareItems);

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    gap: 6,
    marginRight: 20,
    marginBottom: 20,
  },
  flatlist: {
    marginTop: 39,
    gap: 30,
  },
  txtItems: {
    fontFamily: "Nunito-Regular",
  },
});
