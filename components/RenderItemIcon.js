import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { memo, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Data from "./Data";

const RenderItemIcon = ({ item, navigate, replace }) => {
    const { Data_Transaction, Data_Transaction_Recharge, Data_Pass, Data_Factures } = Data;

    const _getTransactionList = async () => {
        // alert("Le service est indisponible pour l'instant !!!")
        navigate("Historique")
    }
    const _getMoneyIssuerList = async () => {
        // const moneyIssuerList = await ApiServices._getNetworkList()
        navigate("Accueil", {
            label: item?.label,
            txt: item.txt,
            name: item.name,
            data: item?.label === "Transfert et achat de Pass"
                ? Data_Pass
                : item?.label === "Recharger mon solde"
                    ? Data_Transaction_Recharge
                    : item?.label === "Paiements"
                        ? Data_Factures : Data_Transaction
        });
    }

    return (
        <Pressable
            onPress={() => {
                item?.label === "Historique" ?
                    _getTransactionList()
                    :
                    item?.label === "Envoi par scan" ?
                        navigate("Scan", { scanned: false })
                        :
                        _getMoneyIssuerList(item.name)
            }}
            style={[{ marginRight: 7, flex: 1, alignItems: "center" }]}
        >
            <View style={styles.item}>
                <Image
                    source={item.img}
                    style={{ width: item.width, height: item.height }}
                />
            </View>
            <Text style={styles.txt}>{item?.label}</Text>
        </Pressable>
    );
};

export default memo(RenderItemIcon);

const styles = StyleSheet.create({
    item: {
        borderRadius: 50,
        backgroundColor: "rgba(123, 207, 255, 0.2)",
        minWidth: 95,
        minHeight: 95,
        alignItems: "center",
        justifyContent: "center",
    },
    txt: {
        maxWidth: 100,
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Nunito-Medium",
    },
});
