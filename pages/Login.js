import { StyleSheet, Text, View, Image, Pressable, Dimensions, } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import BtnItem from "../components/BtnItem";
import { AuthContext } from "../context/AuthContext";
import LoaderComponent from "../components/LoaderComponent";
import { useDispatch, useSelector } from "react-redux";
import { setUserBalance } from "../store/actions/customAction";
import { setNumber } from "../store/actions/secretCodeActions";
import ApiServices from "../services/ApiServices";
import VerifItem from "../components/lock/VerifItem";
SplashScreen.preventAutoHideAsync();


const Login = ({ navigation: { navigate, replace } }) => {
    const { numero, setNumero } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const secretCode = useSelector((state) => state.secretCode.code);
    const number = useSelector((state) => state.secretCode.number);
    const customer = useSelector(state => state.count.customer);

    const [action, setAction] = useState("login")

    const dispatch = useDispatch();

    const [fontsLoaded] = useFonts({
        "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
        "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
        "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    });

    // console.log('login customer...:::', action, customer, number, secretCode)

    useEffect(() => {
        if (number && customer) {
            const type = secretCode && secretCode !== "" ? "normal" : "first-login"
            replace("lockScreen", { type, phone: number })
        }
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const _onSubmit = async () => {
        console.log('submit login......................:::', numero)
        if (numero === '') return

        if (parseInt(numero).toString().length !== 9) {
            alert("Numéro de téléphone incorrect !")
            setIsLoading(false)
            return
        }

        const url = `https://admin.jelogo.net/api/public/users/otp?phone=${numero}`
        try {
            setIsLoading(true)
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            setIsLoading(false)
            const response = await res.json()
            console.log('response...:::', response)
            const { result } = response


            if (res.status === 401) {
                alert("Le service est indisponible pour l'instant, Veuillez réessayer plus tard")
                return
            }
            if (!result) {
                alert("Numéro de téléphone non enregistré ! Veuillez vous inscrire s'il vous plaît.")
                return
            }

            dispatch(setUserBalance(result.balance))

            if (numero == "0123456789") {
                replace("lockScreen", { type: "first-login", phone: numero, otp: "0000" })
                return
            }
            replace("OTPScreen", { type: !secretCode || secretCode === "first-login" ? "first-login" : "normal" })
        } catch (error) {
            setIsLoading(false)
            console.error('error.......', error)
            alert("Veuillez verifier votre connexion internet")
        }
    }

    const _handleRegister = async () => {
        console.log('submit register.............................')
        if (numero === '') return

        if (parseInt(numero).toString().length !== 9) {
            setIsLoading(false)
            alert("Numéro de téléphone incorrect !")
            return
        }

        const url = `https://admin.jelogo.net/api/public/users/otp?phone=${numero}`
        try {
            setIsLoading(true)
            const res = await ApiServices._axiosReq('post', url)
            const { status, data, error } = res
            console.log('res url signup...:::', url)

            if (error?.toString()?.includes("AxiosError: Request failed with status code")) {
                setIsLoading(false)
            }

            if (!data) {
                setIsLoading(false)
                alert("Le service est indisponible pour l'instant, Veuillez réessayer plus tard")
                return
            }

            const { message, result } = data
            console.log('message signup...:::', message)

            if (message === "already") {
                setIsLoading(false)
                alert("Numéro de téléphone déjà enregistré ! Veuillez vous connecter ou utiliser un autre numéro.")
                return
            }
            else if (!result) {
                setIsLoading(false)
                alert("Le service est indisponible pour l'instant, Veuillez réessayer plus tard")
                return
            }

            setNumber(numero)

            setIsLoading(false)
            navigate("OTPScreen", { type: "subscription", phone: numero })
        } catch (error) {
            console.error('phone errorrrr::::::::::::::::', error)
            setIsLoading(false)
            alert("Veuillez verifier votre connexion internet.")
        }

    }

    return (
        <>
            <ScrollView>
                <View onLayout={onLayoutRootView} style={styles.container}>
                    <VerifItem text={action == "login" ? "Entrez votre numéro de téléphone" : "Entrez votre numéro de compte pour vous inscrire"} />
                    <View style={styles.ViewInputText}>
                        <View style={styles.ViewInputText.prefix}>
                            <Image source={require("../assets/icons/Group.png")} />
                            <Text style={styles.ViewInputText.text}>+225</Text>
                            <AntDesign name="down" size={20} color="black" />
                        </View>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="0X XX XX XX XX"
                            keyboardType="numeric"
                            maxLength={10}
                            onChange={(text) => {
                                setNumero(text.nativeEvent.text);
                            }}
                        />
                    </View>

                    <Pressable
                        onPress={() => {
                            action == "login" ? setAction("register") : setAction("login")
                        }}
                    >
                        <Text style={[styles.textLogin, { color: 'black' }]}>Cliquez ici pour: <Text style={styles.textLogin}>
                            {action == "login" ? "S'inscrire" : "Se connecter"}
                        </Text>
                        </Text>
                    </Pressable>

                    <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}>
                        <BtnItem
                            text="Continuer"
                            navigation={() => {
                                action == "login" ? _onSubmit() : _handleRegister()
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            {isLoading && <LoaderComponent />}
        </>

    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        alignItems: "center",
        marginTop: Dimensions.get("window").height * 0.1,
    },
    ViewInputText: {
        prefix: {
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            borderBottomWidth: 1,
            borderBottomColor: "#ABB0BC",
            paddingVertical: 3,
        },
        text: {
            fontFamily: "Nunito-Medium",
            fontSize: 17,
        },
        marginTop: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },
    TextInput: {
        width: "35%",
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 17,
        fontFamily: "Nunito-Medium",
    },
    textLogin: {
        fontFamily: "Nunito-Regular",
        fontSize: 18,
        marginTop: 30,
        marginBottom: 22,
        color: "#0E9CFF",
    },
    TextInputPwd: {
        height: "auto",
        width: 70,
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 17,
        letterSpacing: 8,
        fontFamily: "Nunito-Medium",
    },
});
