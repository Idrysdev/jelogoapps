import { View } from "react-native";
import React, { memo } from "react";
import { FlatList } from "react-native-gesture-handler";
import Data from "./Data";
import RenderItemIcon from "./RenderItemIcon";

const Iconogrh = ({ navigate, replace }) => {
  const { Data_Iconographie } = Data;
  return (
    <FlatList
      numColumns={3}
      data={Data_Iconographie}
      keyExtractor={item => Data_Iconographie.indexOf(item)}
      ItemSeparatorComponent={() => (
        <View
          style={{
            minHeight: 30,
          }}
        />
      )}
      renderItem={({ item }) => <RenderItemIcon item={item} navigate={navigate} replace={replace} />}
    />
  );
};

export default memo(Iconogrh);
