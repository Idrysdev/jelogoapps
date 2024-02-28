import { Image, FlatList, Pressable, Text } from "react-native";
import React, { memo, useEffect } from "react";
import Data from "./Data";

const MbSrvItem = (props) => {
  const { name } = props;
  console.log('MbSrvItem.....', name)

  useEffect(() => {
  }, [props.data]);

  return (
    <FlatList
      data={props.data}
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            console.log('pressed..........', item)
            item.option && item.pass
              ? props.navigate("Forfait", {
                option: item.option,
                nom: item.nom,
                backgroundColor: item.backgroundColor,
                textColor: item.textColor,
              })
              : item.option
                ? props.navigate("Page_select_Abn", {
                  option: item.option,
                  nom: item.nom,
                  backgroundColor: item.backgroundColor,
                  textColor: item.textColor,
                })
                : item.Option_Bnq
                  ? props.navigate("Page_vir_bnq", {
                    option: item.Option_Bnq,
                    nom: item.nom,
                    backgroundColor: item.backgroundColor,
                    textColor: item.textColor,
                  })
                  : props.navigate("TransactionInit", {
                    label: item.nom,
                    img: item.text,
                    style: item.style,
                    operation: props.label,
                    method: item.method,
                    name
                  });
          }}
        >
          <Image
            source={item.text}
            style={{
              width: 154,
              height: 154,
              marginLeft: 5,
              marginBottom: 5,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Nunito-Regular",
              textAlign: 'center'
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default memo(MbSrvItem);
