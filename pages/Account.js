import { StyleSheet, Text, View, Pressable, Image, Modal, Platform } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import Data from "../components/Data";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

SplashScreen.preventAutoHideAsync();

const Account = ({ navigation: { navigate, replace } }) => {
    const customer = useSelector(state => state.count.customer);
    const number = useSelector((state) => state.secretCode.number);

    const { Compte_Setting } = Data;

    useEffect(() => {
    }, [customer])

    const [modalVisible, setModalVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View onPress={onLayoutRootView} style={styles.container}>
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
                            Vos modifications ont bien été enregistrées
                        </Text>
                    </View>
                </View>
            </Modal>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                    marginTop: 20,
                    marginLeft: 15,
                }}
            >
                <Pressable
                    style={styles.princUser}
                    onPress={() => {
                        navigate("compte");
                    }}
                >
                    <Image
                        source={customer?.avatar !== undefined ? { uri: `${customer?.avatar}` } : { uri: customer?.avatar }}
                        style={{ width: 90, height: 90, borderRadius: 100 }}
                    />
                </Pressable>
                <View>
                    <Text style={{ fontSize: 25, fontFamily: "Nunito-Bold" }}>{customer?.firstName}</Text>
                    <Text style={{ fontSize: 17, fontFamily: "Nunito-SemiBold" }}>
                        (+225) {customer?.phone}
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: "Nunito-Regular" }}>
                        {customer?.email}
                    </Text>
                </View>
            </View>

            <View style={styles.itemsInfos}>
                <FlatList
                    data={Compte_Setting}
                    ItemSeparatorComponent={() => (
                        <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }} />
                    )}
                    renderItem={({ item }) => (
                        <Pressable
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 17,
                                justifyContent: "space-between",
                            }}
                            onPress={() => {
                                console.log('edit passsss.................................', item)
                                item.Lien === "lockScreen" ?
                                    navigate(item.Lien, { type: "password", phone: number, action: item.action })
                                    : item.Lien === "informations" ?
                                        navigate(item.Lien)
                                        : null
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                {item.Icon}
                                <Text style={{ fontSize: 18, fontFamily: "Nunito-Regular" }}>
                                    {item.Label}
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="black" />
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
    },

    // modal

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    TextInput: {
        height: "auto",
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 17,
        fontFamily: "Nunito-Regular",
        width: "80%",
    },
    modalView: {
        gap: 40,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: 36,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    enTete: {
        alignItems: "center",
        flexDirection: "row",
        gap: 9,
    },
    txtLabel: {
        fontSize: 22,
        fontFamily: "Nunito-SemiBold",
    },
    listInputs: {
        gap: 25,
    },
    itmCalnd: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    txtCalnd: {
        fontFamily: "Nunito-Regular",
        fontSize: 20,
    },
    btnCalnd: {
        padding: 8,
        backgroundColor: "rgba(3, 114, 193, 0.2)",
        borderRadius: 10,
    },
    inputStyle: {
        flexDirection: "row",
        gap: 10,
    },

    ///
    princUser: {
        alignItems: "center",
    },
    plus: {
        position: "absolute",
        top: 100,
        left: 85,
        borderRadius: 20,
        backgroundColor: "white",
    },
    txtName: {
        marginTop: 17,
        fontSize: 30,
        fontFamily: "Nunito-Bold",
    },
    itemsInfos: {
        marginTop: 40,
        backgroundColor: "white",
        borderRadius: 7,
        marginHorizontal: 15,
    },
    itemIfon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 19,
    },
    txtIfon: {
        fontSize: 20,
        fontFamily: "Nunito-Regular",
        color: "#6F6F70",
    },
    viewBtn: {
        marginVertical: 40,
        gap: 25,
    },
    BtnPrinc: {
        padding: 10,
        backgroundColor: "#0372C1",
        alignItems: "center",
        borderRadius: 10,
        minWidth: 200,
    },

    BtnPrincTxt: {
        fontFamily: "Nunito-Medium",
        fontSize: 20,
        color: "white",
    },
    txtRec: {
        fontSize: 20,
        fontFamily: "Nunito-Regular",
        color: "#BDBDBD",
        textAlign: "center",
    },
});
