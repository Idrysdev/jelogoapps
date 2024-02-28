import { StyleSheet, Text, View, Pressable, Dimensions, BackHandler } from "react-native";
import React, { useCallback, useContext, useState, memo, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import VerifItem from "../components/lock/VerifItem";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import BtnItem from "../components/BtnItem";
import Data from "../components/Data";
//
import * as LocalAuthentication from "expo-local-authentication";
import CustVerifItems from "../components/CustVerifItems";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "../components/LoaderComponent";
import { setUserBalance, setUserData } from "../store/actions/customAction";
import { handleError } from "../utilies/validation";

import { setNumber, setSecretCode } from "../store/actions/secretCodeActions";
import { usePushNotifications } from "../usePushNotifications";
import ApiServices, { _signOut } from "../services/ApiServices";

SplashScreen.preventAutoHideAsync();

const LockScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const defaultTitle = `${route?.params?.type === "password" ? "Modifier " : route?.params?.type === "reset-password" ? "Redéfinissez " : "Créez"} votre code secret`

    const number = useSelector((state) => state.secretCode.number);
    const secretCode = useSelector((state) => state.secretCode.code);
    const { setCode, tabl, tablVerif, numero } = useContext(AuthContext);

    const [newCode, setNewCode] = useState();

    const { navigate, replace } = navigation
    const [title, setTitle] = useState(defaultTitle);
    const [isLoading, setIsLoading] = useState(false);

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    const isPasswordScreen = ["subscription", "password", "reset-password"].includes(route?.params?.type)
    // console.log('isPasswordScreen................', route?.params, isPasswordScreen)

    const previous = route?.params?.previous?.state?.routes?.at(-1)

    const [items, setItems] = useState([]);
    const [filled, setFilled] = useState(false);

    const { Data_Null } = Data;
    const puce = [0, 1, 2, 3];

    const { expoPushToken } = usePushNotifications()

    useEffect(() => {
        if (!filled) {
            setItems([])
            if (!isPasswordScreen) handleBiometricAuth()
        }
        const backAction = () => {
            console.log('backAction................', route?.params, previous)
            if (route?.params?.action === "secure") {
                BackHandler.exitApp();
                setItems([])
                return false;
            }
            else if (route?.params?.action === "create-code") {
                replace('mainScreen')
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
        return () => backHandler.remove();
    }, [secretCode, filled, navigation]);

    // console.log('phone.....', route?.params, )

    const handleBiometricAuth = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        if (!isBiometricAvailable) {
            // return alertComponent(
            //     "Aucune empreinte trouvée !",
            //     "L'authentication biométrique n'est pas pris en charge par cet appareil",
            //     "Ok",
            //     () => fallBackToDefaultAuth()
            // );
        }
        let supportedBiometrics;
        if (isBiometricAvailable) {
            supportedBiometrics =
                await LocalAuthentication.supportedAuthenticationTypesAsync();
        }

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            // return alertComponent(
            //     "Aucune empreinte trouvée !",
            //     "Veuillez utiliser votre code secret",
            //     "Ok",
            //     () => fallBackToDefaultAuth()
            // );
        }

        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Connexion par empreinte digital",
            cancelLabel: "cancel",
            disableDeviceFallback: true,
        });

        if (biometricAuth?.success) {
            replace("mainScreen")
        }
    };

    const [fontsLoaded] = useFonts({
        "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
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

    const onClickNumber = async (item) => {
        if (typeof item == "object") {
            Object.values(item)[4].name === "fingerprint" ?
                handleBiometricAuth()
                :
                setItems([]);
            return
        }
        if (items.length >= 4) return

        setItems([...items, item])
    }

    const _onSubmit = async () => {
        setItems([])

        if (items.length < 4) {
            alert("Veuillez respecter le format de 4 chiffres pour le code s'il vous plaît")
            return
        }

        if (isPasswordScreen) {
            _handleNewPassword()
            return
        }

        if (route?.params?.type === "first-login") {
            _checkAuth()
            return
        }

        _checkCode()
    }

    const _checkAuth = async () => {
        try {
            setIsLoading(true)
            const url = `https://admin.jelogo.net/api/public/users?phone=${route.params.phone}&code=${items.join('')}&notifToken=${expoPushToken?.data}`
            console.log('checkAuth.....', url)

            const res = await fetch(url)
            const response = await res.json()
            const { message, result } = response
            console.log('result.....', message)

            setIsLoading(false)

            if (message !== "success") {
                return handleError(message)
            }

            const code = items.join('')

            if (result.lastName && result.lastName != "") {
                const userData = {
                    gender: result.gender,
                    code: secretCode,
                    city: result.city,
                    firstName: result.firstName,
                    phone: result.phone,
                    lastName: result.lastName,
                    email: result.email,
                    birthday: result.birthday,
                    avatar: result.avatar,
                    id_card_recto: result.id_card_recto,
                    id_card_verso: result.id_card_verso,
                    id: result.id,
                    id_type: result.id_type,
                    createdAt: result.createdAt,
                    jelogoFees: result.jelogoFees,
                    momoFees: result.momoFees,
                }
                console.log('customer...', userData)

                dispatch(setUserData(userData))
                dispatch(setSecretCode(code))
                dispatch(setNumber(userData.phone))
                dispatch(setUserBalance(result.balance))
                replace("mainScreen")
                return
            }

            replace("SubscriptionDocuments");
        } catch (error) {
            console.error("error............", error)
            setIsLoading(false)
        }
    }

    const _checkCode = async () => {
        if (items.join('') !== secretCode) {
            alert("Code secret incorrect !")
            return
        }
        else if (previous) {
            replace("mainScreen")
            return
        }
        setCode(items)
        replace("mainScreen")
    }

    const handleSignOut = async () => {
        _signOut(route.params.phone, secretCode)
        dispatch(setUserData())
        dispatch(setNumber())
        dispatch(setUserBalance(0))
        dispatch(setSecretCode())
        replace("login");
    }

    const _handleNewPassword = async () => {
        console.log('codes..............................', items)

        if (items.length < 4) {
            alert("Veuillez respecter le format de 4 chiffres pour le code s'il vous plaît")
            return
        }

        const code = items.join('')

        if (!newCode) {
            setNewCode(code)
            setTitle("Veuillez confirmer votre code")
            return
        }

        if (newCode !== code) {
            setIsLoading(false)
            alert("Les codes ne sont pas identiques, Veuillez renseigner le bon code");
            return
        }

        const phone = route?.params?.phone ? route?.params?.phone : number && number !== "" ? number : numero

        const otp = route?.params?.type === "password" && route?.params?.action === "edit" ? secretCode : route?.params?.otp
        console.log('otp.....', phone, otp)

        const vals = {
            code: otp,
            phone,
            password: code,
            expoToken: expoPushToken?.data
        }
        console.log('vals..............:::', vals)

        const url = `https://admin.jelogo.net/api/public/users`

        try {
            setIsLoading(true)
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vals)
            })
            const response = await res.json()
            const { result, message } = response
            console.log('result......', result)

            setIsLoading(false)

            if (res.status !== 200 || !result || message !== "success") {
                return handleError(result?.message)
            }

            if (!result.lastName || result.lastName == "") {
                replace("SubscriptionDocuments", { phone, code });
                return
            }

            dispatch(setSecretCode(code))

            const userData = {
                code,
                id: result.id,
                gender: result.title,
                firstName: result.firstName,
                phone: result.phone,
                lastName: result.lastName,
                city: result.city,
                email: result.email,
                birthday: result.birthday,
                avatar: result.avatar,
                id_card_recto: result.id_card_recto,
                id_card_verso: result.id_card_verso,
                id_type: result.id_type,
                createdAt: result.createdAt,
                jelogoFees: result.jelogoFees,
                momoFees: result.momoFees,
            }
            dispatch(setUserData(userData))
            dispatch(setNumber(userData.phone))
            dispatch(setUserBalance(result.balance))
            replace("mainScreen")

        } catch (error) {
            console.error('password errorrrr::::::::::::::::', error)
            setIsLoading(false)
            alert("Veuillez verifier votre connexion internet.")
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={Data_Null}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View onLayout={onLayoutRootView} style={[styles.container]}>
                            <View
                                style={{
                                    width: "auto",
                                    marginBottom: 50
                                }}
                            >
                                {(["password", "first-login"].includes(route?.params?.type) || route?.params?.type == "normal") &&
                                    <Pressable
                                        onPress={() => {
                                            handleSignOut()
                                        }}
                                        style={{
                                            width: 40,
                                        }}
                                    >
                                        <FontAwesome5
                                            name="sign-out-alt"
                                            size={30}
                                            color="#455761"
                                            brand
                                            style={{
                                                transform: [{ rotateY: "180deg" }],
                                                fontWeight: "400"
                                            }}
                                        />
                                    </Pressable>
                                }
                            </View>
                            <View
                                style={[
                                    { alignItems: "center" },
                                    Dimensions.get("window").height < 600 ? null : { flex: 2 },
                                ]}
                            >
                                {isPasswordScreen ?
                                    <>
                                        <CustVerifItems
                                            text={title}
                                            text1={null}
                                        />
                                        <AntDesign
                                            name="lock"
                                            size={50}
                                            color="black"
                                            style={{ marginVertical: 10 }}
                                        />
                                    </>
                                    :
                                    <VerifItem text={"Entrez votre code secret"} />
                                }
                                <View style={styles.ViewPuce}>
                                    <View>
                                        <FlatList
                                            data={puce}
                                            horizontal
                                            renderItem={({ item }) => (
                                                <View
                                                    style={[
                                                        styles.puce,
                                                        {
                                                            backgroundColor:
                                                                items.length > item
                                                                    ? "#0372C1"
                                                                    : "rgba(3, 114, 193, 0.25)",
                                                        },
                                                    ]}
                                                >
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>
                                {!isPasswordScreen &&
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
                                            navigate("OTPScreen", { type: "reset-password", action: "reset", phone: route.params.phone, otp: route.params.otp })
                                        }}
                                    >
                                        <Text style={styles.TxtMdp}>Code secret oublié</Text>
                                    </Pressable>
                                }
                            </View>

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
                                        data={isPasswordScreen ? tablVerif : tabl}
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
                                                onPress={async () => {
                                                    setFilled(true)
                                                    if (!item && item !== 0) {
                                                        return
                                                    }
                                                    onClickNumber(item)
                                                }}
                                            >
                                                <Text style={{ fontSize: 20, fontFamily: "Nunito-Medium" }}>
                                                    {item}
                                                </Text>
                                            </Pressable>
                                        )}
                                    />
                                    <View style={{ marginBottom: 15 }}>
                                        <BtnItem
                                            text="Valider"
                                            navigation={() => _onSubmit()}
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

export default memo(LockScreen);

const styles = StyleSheet.create({
    container: {
        paddingTop: Dimensions.get("window").height * 0.05,
        height: Dimensions.get("window").height,
    },
    TxtMdp: {
        fontFamily: "Nunito-Medium",
        fontSize: 17,
        marginTop: 0,
        color: "#ABB0BC",
    },

    puce: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    ViewPuce: {
        flexDirection: "row",
        marginTop: 45,
        justifyContent: "center",
        alignItems: "center",
    },
});
