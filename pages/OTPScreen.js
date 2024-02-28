import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FlatList } from "react-native-gesture-handler";
import VerifItem from "../components/lock/VerifItem";
import BtnItem from "../components/BtnItem";
import { AuthContext } from "../context/AuthContext";
import Data from "../components/Data";
import CustVerifItems from "../components/CustVerifItems";

import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setUserBalance } from '../store/actions/customAction'
import LoaderComponent from "../components/LoaderComponent";
import { setNumber, setSecretCode } from "../store/actions/secretCodeActions";

SplashScreen.preventAutoHideAsync();

const OTPScreen = ({ route, navigation: { replace, navigate } }) => {
    const [isLoading, setIsLoading] = useState(false);
    const secretCode = useSelector((state) => state.secretCode.code);
    const number = useSelector((state) => state.secretCode.number);
    const customer = useSelector(state => state.count.customer);
    const [pwd, setPwd] = useState([]);
    const { numero, tablCode } = useContext(AuthContext);

    const [otpSent, setOtpSen] = useState(false);
    useEffect(() => {
        if (route.params.type === "reset-password" && !otpSent) {
            sendOtp()
        }
    }, [pwd]);

    console.log('params...............', route.params)

    const [fontsLoaded] = useFonts({
        "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
        "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
        "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    });

    const sendOtp = async () => {
        console.log('sendOtp..............................')
        const url = `https://admin.jelogo.net/api/public/users/otp?phone=${numero && numero !== "" ? numero : route.params.phone}`
        try {
            setOtpSen(true)
            setIsLoading(true)
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            const result = await res.json()
            setIsLoading(false)
            console.log('result...............', result, url)
        } catch (error) {
            console.error('otp errorrrr::::::::::::::::', error)
            setIsLoading(false)
        }
    }

    const dispatch = useDispatch();
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const puce = [0, 1, 2, 3];
    const { Data_Null } = Data;

    const _onSubmit = async () => {
        console.log('_onSubmit otp................:::', pwd)

        if (pwd.length < 4) {
            alert("Veuillez respectez le format de 4 chiffres pour le code s'il vous plaît")
            return
        }

        const phone = numero && numero != "" ? numero : route.params.phone
        let url = `https://admin.jelogo.net/api/public/users/otp?phone=${phone}&otp=${pwd.join('')}`
        if (route.params.type === "first-login") {
            url += "&action=check"
        }
        console.log('url...:::', url)

        try {
            setIsLoading(true)
            const res = await fetch(url)
            const response = await res.json()
            const { message, result, error } = response
            console.log('result...:::', result)

            setIsLoading(false)

            if (message === "wrong") {
                alert("Code incorrect ! Veuillez reessayer avec un autre code.")
                return
            }
            if (message === "expired") {
                alert("Le code inséré a expiré ! Veuillez reessayer avec le autre code.")
                return
            }
            if (!result) {
                alert("Le service est indisponible pour l'instant, Veuillez réessayer plus tard")
                return
            }
            if (["subscription", "first-login", "reset-password"].includes(route.params.type)) {
                return replace("lockScreen", { type: route.params.type, phone: route.params.phone ?? numero, otp: pwd.join(''), action: route.params.action })
            }
            if (!secretCode || secretCode === "") {
                replace("lockScreen", { type: "first-login", phone: number, otp: pwd.join('') })
                return
            }

            const userData = {
                code: "",
                gender: result.gender,
                city: result.city,
                firstName: result.firstName,
                phone: result.phone,
                lastName: result.lastName,
                email: result.email,
                birthday: result.birthday,
                avatar: result.avatar,
                id_card_recto: result.idCardRecto,
                id_card_verso: result.idCardVerso,
                id: result.id,
                id_type: result.idCardType,
                createdAt: result.createdAt,
                jelogoFees: result.jelogoFees,
                momoFees: result.momoFees,
            }

            dispatch(setUserData(userData))
            dispatch(setNumber(userData.phone))
            dispatch(setUserBalance(result.balance))

            replace("mainScreen")

        } catch (error) {
            console.error('check otp errorrrr::::::::::::::::', error)
            setIsLoading(false)
            alert("Veuillez verifier votre connexion internet.")
        }
    }

    const _valideOpr = async () => {
        console.log('validate........')
        setIsLoading(true)
        const payload = {
            otp: pwd.join(""),
            signature: route?.params.signature,
            pymt_token: route?.params.token,
            username: customer?.email,
            password: secretCode,
        };

        try {
            const res = await fetch('https://admin.jelogo.net/api/public/cash-in', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            setIsLoading(false)

            const result = await res.json()
            const { error, status } = result
            console.log("result.............", result)

            if (res.status === 200) {
                navigate("OprTransactionSuccess4", {
                    type: "normal",
                    label: route.params.label,
                    img: route.params.img?.toString(),
                    operation: route.params.operation,
                    network_id: route.params.label,
                    method: route.params.method,
                    transaction: 'cash-in'
                })
                return
            }
            else if (["PAYMENT_FAILED", "REFUSED", "UNKNOWN_ERROR"].includes(result)) {
                alert('Le paiement a échoué.')
                return
            }

            alert('Service momentanément indisponible. Veuillez reessayer plus tard.')
        } catch (error) {
            console.error('error....', error)
            alert('Veuillez vérifier votre connexion internet')
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={Data_Null}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View onLayout={onLayoutRootView} style={styles.container}>
                            <View
                                style={[
                                    { alignItems: "center" },
                                    Dimensions.get("window").height < 600 ? null : { flex: 2 },
                                ]}
                            >
                                {route.params.type === "subscription" ? (
                                    <CustVerifItems
                                        text="Vérification du numéro de téléphone"
                                        text1="Entrez le code de validation reçu par sms"
                                    />
                                ) : (<VerifItem text={`${route.params.type === "Orange" ? "Confirmer le paiement" : "Code de validation reçu par SMS"}`} operator={"Orange"} />
                                )
                                }
                                <View style={{ width: "100%", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }}>
                                    <Text
                                        numberOfLines={3}
                                        style={{ fontSize: 14, fontFamily: "Nunito-Medium", }}
                                    >
                                        {route?.params?.message?.split("#, Choisir l'option 8 puis l'option 2, Entrer votre code secret et Valider.")}
                                        {route?.params?.message === undefined ? "" : `*82# et entrer votre code secret et Valider.`}
                                    </Text>
                                </View>
                                <View style={styles.ViewPuce}>
                                    <View>
                                        <FlatList
                                            data={puce}
                                            horizontal
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={[
                                                        styles.puce,
                                                        {
                                                            borderColor:
                                                                pwd.length > item
                                                                    ? "#0372C1"
                                                                    : "rgba(3, 114, 193, 0.25)",
                                                        },
                                                    ]}
                                                >
                                                    <Text style={styles.text}>{pwd[index]}</Text>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Pressable
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    alignSelf: "center",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    height: 50,
                                }}
                                onPress={async () => {
                                    sendOtp()
                                }}
                            >
                                <Text style={styles.TxtMdp}>Renvoyer le SMS</Text>
                            </Pressable>
                            <View
                                style={[
                                    {
                                        width: "100%",
                                        justifyContent: "flex-end",
                                    },
                                    Dimensions.get("window").height < 600 ? null : { flex: 1.5 },
                                ]}
                            >
                                <View style={{ gap: 10 }}>
                                    <FlatList
                                        data={tablCode}
                                        numColumns={4}
                                        renderItem={({ item }) => (
                                            <Pressable
                                                style={{
                                                    flex: 1,
                                                    alignItems: "center",
                                                    alignSelf: "center",
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    height: 50,
                                                }}
                                                onPress={() => {
                                                    typeof item != "object"
                                                        ? setPwd([...pwd, item])
                                                        : setPwd([]);
                                                }}
                                            >
                                                <Text
                                                    style={{ fontSize: 20, fontFamily: "Nunito-Medium" }}
                                                >
                                                    {item}
                                                </Text>
                                            </Pressable>
                                        )}
                                    />
                                    <View style={{ marginBottom: 15 }}>
                                        <BtnItem
                                            text={
                                                route.params.type === "subscription"
                                                    ? "Valider"
                                                    : "Confirmer"
                                            }
                                            navigation={() => route.params.type === "Orange" ? _valideOpr() : _onSubmit()}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            {isLoading && <LoaderComponent />}
        </>

    );
};

export default OTPScreen;

const styles = StyleSheet.create({
    TxtMdp: {
        fontFamily: "Nunito-Medium",
        fontSize: 17,
        marginTop: 33,
        color: "#ABB0BC",
    },
    container: {
        paddingTop: Dimensions.get("window").height * 0.1,
        height: Dimensions.get("window").height,
    },
    TextInput: {
        marginTop: 44,
        height: "auto",
        width: 70,
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 17,
        letterSpacing: 8,
        fontFamily: "Nunito-Medium",
    },
    puce: {
        width: 40,
        height: 60,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },
    text: {
        fontFamily: "Nunito-Medium",
        fontSize: 20,
    },
    ViewPuce: {
        flexDirection: "row",
        marginTop: 45,
        justifyContent: "center",
        alignItems: "center",
    },
});
