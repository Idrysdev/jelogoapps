import { StyleSheet, View, FlatList } from "react-native";
import React, { memo, useEffect } from "react";
import Data from "./Data";
import HistTrns from "./history/HistTrns";

const ItemOperat = (route) => {

  const data = route.data;

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => data.indexOf(item)}
        renderItem={({ item }) => <HistTrns data={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      />
    </>
  );
};

export default memo(ItemOperat);

const styles = StyleSheet.create({});
