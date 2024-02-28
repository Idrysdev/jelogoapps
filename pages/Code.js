import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Alert,
    Dimensions,
} from "react-native";
import React, {
    useCallback,
    useContext,
    useState,
    memo,
    useEffect,
} from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import VerifItemCode from "../components/VerifItemCode";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import BtnItem from "../components/BtnItem";
import { AntDesign } from "@expo/vector-icons";
import Data from "../components/Data";

import * as LocalAuthentication from "expo-local-authentication";

SplashScreen.preventAutoHideAsync();

const Code = ({ route, navigation }) => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    }, []);


    const fallBackToDefaultAuth = () => {
        // console.log("fall back to password authentification");
    };
    
    const alertComponent = (title, mess, btnTxt, BtnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: BtnFunc,
            },
        ]);
    };

    const handleBiometricAuth = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        if (!isBiometricAvailable) {
            return alertComponent(
                "Entrez votre code secret",
                "Authentication biométrique n'est pas pris en charge par cet appareil",
                "Ok",
                () => fallBackToDefaultAuth()
            );
        }
        let supportedBiometrics;
        if (isBiometricAvailable) {
            supportedBiometrics =
                await LocalAuthentication.supportedAuthenticationTypesAsync();
        }

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            return alertComponent(
                "Biometric record not found",
                "Connecter vous avec votre code secret",
                "Ok",
                () => fallBackToDefaultAuth()
            );
        }

        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Connexion par empreinte digital",
            cancelLabel: "cancel",
            disableDeviceFallback: true,
        });

        if (biometricAuth.success) {
            console.log(biometricAuth.success)
        }
    };

    const { tabl, setValidate, numero } = useContext(AuthContext);
    const [pwd, setPwd] = useState([]);

    const [fontsLoaded] = useFonts({
        "Nunito-Black": require("../assets/fonts/Nunito-Black.ttf"),
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

    const puce = [0, 1, 2, 3];
    const { Data_Null } = Data;

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={Data_Null}
                contentContainerStyle={
                    Dimensions.get("window").height < 600
                        ? { paddingBottom: 100 }
                        : { paddingBottom: 20 }
                }
                renderItem={({ item }) => (
                    <View onLayout={onLayoutRootView} style={styles.container}>
                        {route.params.type === "secure" ? null : (
                            <Pressable
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                style={{ position: "absolute", zIndex: 3, top: 40, left: 20 }}
                            >
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        )}

                        <View
                            style={[
                                { alignItems: "center" },
                                Dimensions.get("window").height < 600 ? null : { flex: 2 },
                            ]}
                        >
                            {route.params.type === "delete" ? (
                                <VerifItemCode
                                    text="Entrez votre code secret pour supprimer le compte"
                                    type="secure"
                                />
                            ) : (
                                <VerifItemCode text="Entrez votre code secret" type="secure" />
                            )}

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
                                                            pwd.length > item
                                                                ? "#0372C1"
                                                                : "rgba(3, 114, 193, 0.25)",
                                                    },
                                                ]}
                                            ></View>
                                        )}
                                    />
                                </View>
                            </View>
                            <Text style={styles.TxtMdp}>Code secret oublié</Text>
                        </View>

                        <View
                            style={[
                                {
                                    gap: 8,
                                    width: "100%",
                                    justifyContent: "flex-end",
                                },
                                Dimensions.get("window").height < 600 ? null : { flex: 1.5 },
                            ]}
                        >
                            <View style={{ gap: 17 }}>
                                <FlatList
                                    data={tabl}
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
                                                    : Object.values(item)[4].name === "fingerprint"
                                                        ? handleBiometricAuth()
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
                                        text="Validez"
                                        navigation={() => {
                                            route.params.type === "delete" ?
                                                navigation.navigate("login")
                                                :
                                                (setValidate(true), navigation.navigate("mainScreen"));
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default memo(Code);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get("window").height,
        paddingTop: Dimensions.get("window").height * 0.1,
    },
    TxtMdp: {
        fontFamily: "Nunito-Medium",
        fontSize: 17,
        marginTop: 33,
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
