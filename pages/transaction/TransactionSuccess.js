import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

const TransactionSuccess = ({ route, navigation }) => {
    const [fontsLoaded] = useFonts({
        "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
        "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const { label, img, operation, transaction } = route.params;

    return (
        <View onLayout={onLayoutRootView} style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <Image source={typeof img === "number" ? img : { uri: img }} style={{ width: 154, height: 154 }} />
            {operation === "Recharger mon solde" ?
                <Text style={styles.txtPwd}>
                    Votre demande de réchargement a bien été éffectué
                </Text>
                :
                <Text style={styles.txtPwd}>
                    <Text style={styles.txtBld}>Félicitations !</Text>
                    Votre {transaction === 'cash-in' ? 'rechargement' : 'transfert'} a bien été effectué.
                </Text>
            }
            <View
                style={{
                    flex: 1,
                    gap: 28,
                    justifyContent: "flex-end",
                    marginBottom: 40,
                }}
            >
                <Pressable
                    onPress={() => {
                        // navigation.popToTop()
                        navigation.replace('mainScreen')
                    }}
                    style={[
                        styles.BtnPrinc,
                        { backgroundColor: "none", borderColor: "#0372C1", borderWidth: 1 },
                    ]}
                >
                    <Text style={[styles.BtnPrincTxt, { color: "black" }]}>
                        Aller à l'accueil
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default TransactionSuccess;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    TextInput: {
        height: "auto",
        minWidth: 70,
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 21,
        letterSpacing: 8,
    },
    text: {
        fontFamily: "Nunito-Bold",
        fontSize: 30,
        marginVertical: 40,
    },
    BtnPrinc: {
        padding: 10,
        backgroundColor: "#0372C1",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "flex-end",
        minWidth: 200,
    },

    BtnPrincTxt: {
        fontFamily: "Nunito-Medium",
        fontSize: 20,
        color: "white",
    },
    txtBld: {
        fontFamily: "Nunito-Bold",
    },
    txtPwd: {
        fontFamily: "Nunito-Medium",
        marginTop: 20,
        fontSize: 21,
        textAlign: "center",
        maxWidth: 300,
    },
});
