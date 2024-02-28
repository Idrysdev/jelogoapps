import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, StatusBar, BackHandler } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import CryptoJS from "react-native-crypto-js";

export default function App({ navigation: { navigate, replace } }) {
    const secretKey = 'myKeyjelogo';

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [key, setKey] = useState(0);

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };
        requestPermission();

        const backAction = () => {
            setKey((prevKey) => prevKey + 1); // Increment key to force component remount
            setScanned(true); // Reset scanned state
            setRefresh(!refresh)
            navigate('mainScreen')
            return false;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();

    }, [key]);

    useFocusEffect(
        React.useCallback(() => {
            setKey((prevKey) => prevKey + 1); // Increment key to force component remount
            setScanned(false); // Reset scanned state
        }, [refresh])
    );

    const onScan = ({ type, data }) => {
        console.log("Scanned data:", data);
        if (scanned) return

        setScanned(true);

        try {
            // Vibration.vibrate(500);
            const decryptedData = CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
            const encryptedData = JSON.parse(decryptedData);

            console.log("encryptedData ::::", encryptedData);

            const { expiration, type, uid } = encryptedData

            if (type !== "send") {
                alert("QR code invalide !")
                return
            }
            if (new Date() >= new Date(expiration * 1000)) {
                alert("Le QR code a expiré !")
                return
            }
            console.log("Le QR code est encore valide.....")
            navigate("TransactionInit", {
                operation: "Retrait",
                label: "JELOGO",
                name: 'cashout',
                txt: "Retirer votre argent en toute securité",
                img: require("../assets/icons/iconographie/cash.png"),
                // img: require("../assets/icons/Jelogo.png"),
                style: {
                    color: "white",
                    backgroundColor: "black",
                },
                method: 'jelogo',
                uid
            })

        } catch (error) {
            console.error('error.......', error)
            setScanned(false);
        }

        setKey(prevKey => prevKey + 1);
    };

    return (
        <View style={styles.container}>
            {hasPermission && !scanned && (
                <BarCodeScanner
                    key={new Date().valueOf} // Utilisation de la clé pour détruire et recréer le composant
                    onBarCodeScanned={onScan}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            <Text style={styles.txt}>Scanner le QR Code</Text>
            <View style={styles.scan}></View>

            <Pressable
                onPress={() => {
                    setKey((prevKey) => prevKey + 1); // Increment key to force component remount
                    setScanned(true); // Reset scanned state
                    setRefresh(!refresh)
                }}
                activeOpacity={0.8}
                style={{ alignItems: "center" }}
            >
                {scanned ?
                    <AntDesign name={"reload1"} color={"#000"} size={30} />
                    :
                    < AntDesign name={"reload1"} color={"#fff"} size={30} />
                }
                <Text style={styles.txt}>Toucher pour re-scanner</Text>
            </Pressable>

            <StatusBar style="auto" />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 30,
    },
    scan: {
        width: 250,
        height: 250,
        borderColor: "white",
        borderWidth: 2.5,
        borderRadius: 10,
    },
    txt: {
        fontSize: 20,
        fontFamily: "Nunito-Medium",
        color: "white",
    },
});
