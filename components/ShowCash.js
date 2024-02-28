import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { setSecretCode } from "../store/actions/secretCodeActions";
import { setUserBalance } from "../store/actions/customAction";

const ShowCash = ({ replace }) => {
    const dispatch = useDispatch();

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

    const secretCode = useSelector((state) => state.secretCode.code);
    const phone = useSelector((state) => state.secretCode.number);

    const [cashVisible, setCashVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const balance = useSelector(state => state.count.balance)
    const [amount, setAmount] = useState(balance);

    const fetchBalance = async () => {
        try {
            setLoading(true)
            const url = `https://admin.jelogo.net/api/public/wallet?phone=${phone}&code=${secretCode}`
            console.log('url......', url)
            const res = await fetch(url)
            const response = await res.json()
            console.log('response...', response)
            const { message, result } = response

            setLoading(false)

            if (message === "wrong password") {
                dispatch(setSecretCode())
                replace("login")
                return
            }
            setAmount(result.balance)
            dispatch(setUserBalance(result.balance))
        } catch (error) {
            console.error('error...', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        setAmount(balance)
    }, [balance]);

    return (
        <>
            <Pressable
                onPress={() => {
                    if (!cashVisible) fetchBalance();
                    setCashVisible(!cashVisible)
                }}
                style={styles.cash}
            >
                <View style={styles.cashTxtContainer}>
                    {loading &&
                        <Text
                            style={[
                                styles.cashTxt,
                                {
                                    width: 20,
                                    height: 20,
                                },
                            ]}
                        >
                            <ActivityIndicator animating={true} color="white" size={20} />
                        </Text>
                    }
                    {cashVisible ?
                        <>
                            <Text
                                style={[
                                    styles.cashTxt,
                                ]}
                            >
                                {amount ?? 0}
                            </Text>
                            <Text
                                style={[
                                    styles.cashTxt,
                                ]}
                            >
                                FCFA
                            </Text>
                        </>
                        :
                        <View
                            onPress={onLayoutRootView}
                            style={[
                                styles.cashBtn,
                            ]}
                        >
                            <View style={styles.btnItem}></View>
                            <View style={styles.btnItem}></View>
                            <View style={styles.btnItem}></View>
                            <View style={styles.btnItem}></View>
                        </View>
                    }
                </View>
            </Pressable>
            {Dimensions.get("window").height < 600 ? (
                <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
            ) : (
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Text style={styles.sldTxt}>Solde disponible</Text>
                </View>
            )}
        </>
    );
};

export default ShowCash;

const styles = StyleSheet.create({
    cash: {
        flex: 1,
        marginTop: 40,
        alignItems: "center",
    },
    cashTxtContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    cashBtn: {
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginLeft: 10,
        gap: 10,
    },
    btnItem: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    cashTxt: {
        fontSize: 25,
        fontFamily: "Nunito-Bold",
        color: "white",
        textAlign: "center",
        marginHorizontal: 5,
    },
    sldTxt: {
        fontFamily: "Nunito-SemiBold",
        color: "white",
        marginBottom: 20,
        textAlign: "center",
    },
});
