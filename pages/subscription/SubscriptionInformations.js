import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    Pressable, Platform,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import BtnItem from "../../components/BtnItem";
import CustVerifItems from "../../components/CustVerifItems";
import ApiServices from "../../services/ApiServices";

import { setUserBalance, setUserData } from '../../store/actions/customAction'
import { useDispatch } from "react-redux";
import LoaderComponent from "../../components/LoaderComponent";
import { AuthContext } from "../../context/AuthContext";
import { handleError } from "../../utilies/validation";
import { setNumber, setSecretCode } from "../../store/actions/secretCodeActions";

const SubscriptionInformations = ({ navigation: { replace } }) => {
    const dispatch = useDispatch();

    const {
        selectedType,
        imageCNI_RectoBD,
        imageCNI_VersoBD,
        imageUser,
        numero,
        code,
    } = useContext(AuthContext);

    const [nomL, setNomL] = useState();
    const [prenomL, setPrenomL] = useState();
    const [emailL, setEmailL] = useState();
    const [lieuL, setLieuL] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [isMal, setMale] = useState(true);
    const [isMlle, setMlle] = useState(false);
    const [isMme, setMme] = useState(false);
    const [dateTime, setDateTime] = useState(new Date(Date.now()));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onChange = (selectedDate) => {
        setDateTime(new Date(selectedDate));
        setShow(false);
        setDate(dateTime.toLocaleDateString());
    };

    const showMode = () => {
        if (Platform.OS === "android") {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode("date");
    };

    const [fontsLoaded] = useFonts({
        "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
        "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
        "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        try {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        } catch {
            console.log("Erreur de police");
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const _signUp = async () => {
        let gender = 'M.'
        if (isMlle) {
            gender = 'Mlle'
        } else if (isMme) {
            gender = 'Mme'
        }

        const vals = {
            phone: numero,
            code,
            id_type: selectedType,
            id_card_recto: imageCNI_RectoBD,
            id_card_verso: imageCNI_VersoBD,
            avatar: imageUser,
            gender: gender,
            firstName: nomL,
            lastName: prenomL,
            email: emailL,
            city: lieuL,
            birthday: dateTime,
            createdAt: dateTime.toLocaleDateString(),
            uid: ""
        }

        // console.log('_onSubmit...:::', vals)
        if (parseInt(numero).toString().length !== 9) {
            setIsLoading(false)
            alert("Numéro de téléphone incorrect !")
            return
        }

        const url = `https://admin.jelogo.net/api/public/users`

        console.log('fetch.....', url, vals)

        try {
            setIsLoading(true)
            const res = await ApiServices._axiosReq('put', url, vals)
            setIsLoading(false)

            const { status, data, error } = res
            console.log('res...:::', res)

            if (!data) {
                setIsLoading(false)
                alert("Le service est indisponible pour l'instant, Veuillez réessayer plus tard")
                return
            }

            const { message, result } = data
            console.log('res result...:::', result)

            if (message !== "success") {
                return handleError(message)
            }

            const userData = {
                code,
                id: result.id,
                gender: result.title,
                avatar: result.avatar,
                firstName: result.firstName,
                lastName: result.lastName,
                phone: result.phone,
                city: result.city,
                email: result.email,
                birthday: result.birthday,
                id_type: result.id_type,
                id_card_recto: result.id_card_recto,
                id_card_verso: result.id_card_verso,
                createdAt: result.createdAt,
                jelogoFees: result.jelogoFees,
                momoFees: result.momoFees,
            }
            dispatch(setUserData(userData))
            dispatch(setSecretCode(code))
            dispatch(setNumber(userData.phone))
            dispatch(setUserBalance(result.balance))
            replace("SubscriptionCompleted")
        } catch (error) {
            console.error("error signup.......", error)
            setIsLoading(false)
        }
    }

    return (
        <>
            <ScrollView>
                <View onLayout={onLayoutRootView} style={styles.container}>
                    <CustVerifItems text="Informations personnelles" />
                    <View style={{ marginVertical: 30, gap: 20 }}>
                        <View style={{ flexDirection: "row", gap: 15 }}>
                            <Pressable
                                onPress={() => {
                                    setMlle(false);
                                    setMme(false);
                                    setMale(true);
                                }}
                                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                            >
                                <Text style={{ fontFamily: "Nunito-Regular", fontSize: 17 }}>
                                    M
                                </Text>
                                <View
                                    style={[
                                        {
                                            width: 20,
                                            height: 20,
                                            borderRadius: 75,
                                        },
                                        isMal
                                            ? { backgroundColor: "#0066B5" }
                                            : { borderColor: "black", borderWidth: 1 },
                                    ]}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setMlle(false);
                                    setMme(true);
                                    setMale(false);
                                }}
                                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                            >
                                <Text style={{ fontFamily: "Nunito-Regular", fontSize: 17 }}>
                                    Mme
                                </Text>
                                <View
                                    style={[
                                        {
                                            width: 20,
                                            height: 20,
                                            borderRadius: 75,
                                        },
                                        isMme
                                            ? { backgroundColor: "#0066B5" }
                                            : { borderColor: "black", borderWidth: 1 },
                                    ]}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setMlle(true);
                                    setMme(false);
                                    setMale(false);
                                }}
                                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                            >
                                <Text style={{ fontFamily: "Nunito-Regular", fontSize: 17 }}>
                                    Mlle
                                </Text>
                                <View
                                    style={[
                                        {
                                            width: 20,
                                            height: 20,
                                            borderRadius: 75,
                                        },
                                        isMlle
                                            ? { backgroundColor: "#0066B5" }
                                            : { borderColor: "black", borderWidth: 1 },
                                    ]}
                                />
                            </Pressable>
                        </View>

                        <View style={styles.inputStyle}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Nom"
                                keyboardType="default"
                                onChangeText={(textNom) => {
                                    setNomL(textNom);
                                }}
                            />
                        </View>
                        <View style={styles.inputStyle}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Prenom"
                                keyboardType="default"
                                onChangeText={(textNom) => {
                                    setPrenomL(textNom);
                                }}
                            />
                        </View>
                        <View style={styles.inputStyle}>
                            <AntDesign name="mail" size={24} color="black" />
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                onChangeText={(val) => {
                                    console.log('email...', val)
                                    setEmailL(val);
                                }}
                            />
                        </View>
                        <View style={styles.inputStyle}>
                            <MaterialIcons name="gps-fixed" size={24} color="black" />
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Commune, Ville"}
                                onChangeText={(textLieu) => {
                                    setLieuL(textLieu);
                                }}
                            />
                        </View>

                        <View style={{ gap: 15 }}>
                            <Text style={{ fontFamily: "Nunito-Regular", fontSize: 20 }}>
                                Date de naissance
                            </Text>
                            <Pressable
                                onPress={() => {
                                    showMode();
                                }}
                                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
                            >
                                <View style={styles.btnCalnd}>
                                    <AntDesign name="calendar" size={24} color="black" />
                                </View>
                                <Text style={styles.txtCalnd}>
                                    {dateTime.toLocaleDateString()}
                                </Text>
                            </Pressable>
                            {show ? (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateTime}
                                    dateFormat="day month year"
                                    mode={mode}
                                    is24Hour={true}
                                    onChange={(e) => {
                                        onChange(e.nativeEvent.timestamp);
                                    }}
                                />
                            ) : null}
                        </View>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <BtnItem
                            text="Continuer"
                            navigation={() => _signUp()}
                        />
                    </View>
                </View>
            </ScrollView>
            {isLoading && <LoaderComponent />}
        </>
    );
};

export default SubscriptionInformations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        alignItems: "center",
        paddingTop: Dimensions.get("window").height * 0.1,
    },
    inputStyle: {
        flexDirection: "row",
        gap: 10,
    },

    TextInput: {
        height: "auto",
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 17,
        fontFamily: "Nunito-Regular",
        width: "80%",
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
});
