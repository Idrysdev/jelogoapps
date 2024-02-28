import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import Data from "../components/Data";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import CryptoJS from "react-native-crypto-js";
import QrCode from "../components/QrCode";
import { useFocusEffect } from "@react-navigation/native";
const { Banque_Setting, Data_Null } = Data;

const Carte = () => {
    const customer = useSelector(state => state.count.customer);
    const secretKey = 'myKeyjelogo';
    const [dates, setDates] = useState(new Date())
    const [qrCodeData, setQRCodeData] = useState(generateQRCodeData);

    useEffect(() => {
    })

    useFocusEffect(
        useCallback(() => {
            generateQRCodeData();
        }, [])
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setQRCodeData(generateQRCodeData());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const generateQRCodeData = useCallback(() => {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel
        const expirationTimestamp = currentTimestamp + 60  // Ajoutez 10 secondes à la date actuelle
        const data = {
            "uid": customer?.id,
            "type": "send",
            expiration: expirationTimestamp // Date d'expiration de 24 heures à partir de maintenant
        };

        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    }, []);

    const getMoment = useCallback(() => {
        const hours = dates.getHours();

        if (hours < 12) {
            return "Bonjour";
        } else if (hours < 18) {
            return "Bon après-midi";
        }
        return "Bonsoir";
    }, []);

    return (
        <FlatList
            data={Data_Null}
            style={{
                paddingBottom: 100,
            }}
            renderItem={({ item }) => (
                <View>
                    <Text
                        ellipsizeMode={"middle"}
                        style={{
                            fontFamily: "Nunito-Bold",
                            fontSize: 22,
                            marginVertical: 20,
                            marginStart: 20,
                            width: "90%"
                        }}
                    >
                        {getMoment()} {customer?.gender} {customer?.lastName !== undefined || true || customer?.lastName !== "" ? customer?.lastName : ""} 👋
                    </Text>
                    <ScrollView horizontal={true} style={{ marginHorizontal: 15, }}>
                        <LinearGradient
                            colors={["#4c669f", "#3b5998", "#192f6a"]}
                            style={{
                                width: Dimensions.get("window").width * 0.87,
                                height: Dimensions.get("window").height * 0.25,
                                backgroundColor: "#0372C1",
                                borderRadius: 10,
                                alignSelf: "center",
                                padding: 10,
                                justifyContent: "space-between",
                                marginEnd: 10
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="middle"
                                    style={{
                                        color: "white",
                                        fontFamily: "Nunito-Regular",
                                        fontSize: 20,
                                        width: 210
                                    }}

                                >
                                    {customer?.lastName !== undefined || true || customer?.lastName !== "" ? customer?.lastName : ""} {customer?.firstName !== undefined || true || customer?.firstName !== "" ? customer?.firstName : ""}
                                </Text>
                                <Image
                                    source={require("../assets/playstoreSize.png")}
                                    style={{
                                        height: 40,
                                        width: 80,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={{ height: 50 }}>
                                {/*<Image*/}
                                {/*    source={require("../assets/qrcode.png")}*/}
                                {/*    style={{ width: 50, height: 50 }}*/}
                                {/*/>*/}
                            </View>
                            <Text
                                style={{
                                    color: "white",
                                    fontFamily: "Nunito-Regular",
                                    fontSize: 17,
                                }}
                            >
                                XXXX XXXX XXXX 1234
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View>
                                    <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
                                        Exp Date
                                    </Text>
                                    <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
                                        **/**
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
                                        CVV
                                    </Text>
                                    <Text style={{ color: "white", fontFamily: "Nunito-Regular" }}>
                                        ***
                                    </Text>
                                </View>
                                <Image
                                    source={require("../assets/visa.png")}
                                    style={{
                                        width: 70,
                                        height: 30,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        </LinearGradient>

                        <LinearGradient
                            colors={["#4c669f", "#3b5998", "#192f6a"]}
                            style={{
                                width: Dimensions.get("window").width * 0.87,
                                height: Dimensions.get("window").height * 0.25,
                                backgroundColor: "#0372C1",
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 10,
                            }}
                        >
                            <View style={{ position: "absolute", top: 0, right: 5 }}>
                                <Image
                                    source={require("../assets/playstoreSize.png")}
                                    style={{
                                        height: 40,
                                        width: 80,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={{
                                height: 130, width: 130, backgroundColor: "white", borderRadius: 10, alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <TouchableOpacity onPress={() => generateQRCodeData()}>
                                    <QRCode value={qrCodeData} size={120} />
                                </TouchableOpacity>
                            </View>

                        </LinearGradient>

                    </ScrollView>

                    <View style={{ marginHorizontal: 15, marginTop: 30 }}>
                        <FlatList
                            data={Banque_Setting}
                            ItemSeparatorComponent={() => <View style={{ height: 27 }} />}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 17,
                                        }}
                                    >
                                        {item.Icon}
                                        <View>
                                            <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
                                                {item.Label}
                                            </Text>
                                            <Text
                                                style={{ fontSize: 15, fontFamily: "Nunito-Light" }}
                                            >
                                                {item.Desicrpt}
                                            </Text>
                                        </View>
                                    </View>

                                    <AntDesign name="right" size={18} color="gray" />
                                </View>
                            )}
                        />
                    </View>
                </View>
            )}
        />
    );
};

export default Carte;

const styles = StyleSheet.create({});
