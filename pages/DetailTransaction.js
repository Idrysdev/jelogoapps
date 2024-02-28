import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getCreatDay } from "../utilies/datetime";

SplashScreen.preventAutoHideAsync();

const DetailTransaction = (props) => {
    const customer = useSelector(state => state.count.customer);

    const data = props.route?.params?.data?.data;
    const { type } = data

    useEffect(() => {
    }, [customer])

    const localIcon = {
        "OM": require("../assets/icons/Mobileservices.png"),
        "FLOOZ": require("../assets/icons/Group12.png"),
        "MOMO": require("../assets/icons/Group13.png"),
        "WAVE": require("../assets/icons/Group14.png"),
        "JELOGO": require("../assets/icons/Jelogo.png"),
    }

    const [fontsLoaded] = useFonts({
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={{ height: 100, backgroundColor: "#fff", justifyContent: "center", gap: 5, }}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={25} color="#000" style={{ marginStart: 20 }} />
                </Pressable>
            </View>

            <View style={{ paddingHorizontal: 5, margin: 20 }}>
                <Image
                    source={localIcon[data?.network?.code]}
                    style={{ borderRadius: 200, width: 45, height: 45 }}
                />

                <View style={{ marginVertical: 10 }}>
                    <Text style={{
                        fontFamily: "Nunito-Medium", color: "black", fontSize: 16, fontWeight: "700",
                        marginTop: 10
                    }}>
                        {type === "cashin" &&
                            "Rechargement"
                        }
                        {type === "cashout" &&
                            "Transfert d'argent"
                        }
                    </Text>

                    <Text style={{ fontFamily: "Nunito-Medium", color: "black", fontSize: 16, margin: 5, marginTop: 6 }}>
                        De {data?.names}
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "gray", margin: 5, fontSize: 16, }}>
                        Montant
                        {type === "cashin" &&
                            " reçu"
                        }
                        {type === "cashout" &&
                            " rétiré (avec frais)"
                        }
                    </Text>

                    <Text style={{ fontFamily: "Nunito-Medium", color: "black", fontSize: 16, margin: 5, fontWeight: "600" }}>
                        {data?.amount} Fcfa
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "gray", margin: 5, fontSize: 16, }}>
                        Statut :
                    </Text>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "black", fontSize: 16, margin: 5 }}>
                        Succès
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "gray", margin: 5, fontSize: 16, }}>
                        Date et heure :
                    </Text>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "black", fontSize: 16, margin: 5 }}>
                        {getCreatDay(data?.createdAt)}
                    </Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "gray", margin: 5, fontSize: 16, }}>
                        ID de la transaction :
                    </Text>
                    <Text style={{ fontFamily: "Nunito-Medium", color: "black", fontSize: 16, margin: 5, marginTop: 5 }}>
                        {data?.id}
                    </Text>
                </View>

            </View>

        </View>
    );
};

export default DetailTransaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    TextView: {
        fontSize: 17,
        fontFamily: "Nunito-Regular",
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
        marginTop: 20,
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
        gap: 10,
        marginTop: 10,
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
        fontSize: 17,
        fontFamily: "Nunito-Regular",
        color: "#BDBDBD",
    },
});
