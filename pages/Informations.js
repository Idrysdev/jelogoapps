import { StyleSheet, Text, View, Image, Modal, Platform } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";

SplashScreen.preventAutoHideAsync();

const Informations = () => {
    const customer = useSelector(state => state.count.customer);

    const [dateTime, setDateTime] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [avatar, setAvatar] = useState(customer.avatar);
    const [lastName, setLastName] = useState(customer.lastName);
    const [firstName, setFirstName] = useState(customer.firstName);
    const [birthday, setBirtday] = useState(customer.birthday);
    const [email, setEmail] = useState(customer.email);
    const [phone, setPhone] = useState(customer.phone);
    const [city, setCity] = useState(customer.city);
    const [id_card_recto, setIDRecto] = useState(customer.id_card_recto);
    const [id_card_verso, setImageCNI_Verso] = useState(customer.id_card_verso);

    useEffect(() => {

    }, [customer])

    const onChange = (selectedDate) => {
        setDateTime(new Date(selectedDate));
        setShow(false);
    };

    const showMode = () => {
        if (Platform.OS === "android") {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode("date");
    };

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

    if (!fontsLoaded) {
        return null;
    }

    const getBirthday = (birthday) => {
        const dateBirthday = new Date(birthday);
        // Récupération des éléments de la date
        const year = dateBirthday.getFullYear();
        const month = `0${dateBirthday.getMonth() + 1}`.slice(-2); // Les mois commencent à 0
        const day = `0${dateBirthday.getDate()}`.slice(-2);

        const hours = `0${dateBirthday.getHours()}`.slice(-2);
        const minutes = `0${dateBirthday.getMinutes()}`.slice(-2);

        // Formatage de la date et de l'heure
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}h${minutes}`;
        return `${formattedDate}`
    };

    const handle = () => {
        setNom(lastName);
        setPrenom(firstName);
        setEmail(email);
        setNumero(phone);
        setLieu(city);
        setDate(dateTime.toLocaleDateString());
        setImageUser(avatar);
        setModalVisible(true);
        setImageCNI_RectoBD(id_card_recto);
        setImageCNI_VersoBD(id_card_verso);
        setTimeout(() => {
            setModalVisible(false);
        }, 800);
    };

    // const openCameraCNI_Recto = async () => {
    //   const { status } = await ImagePicker.getCameraPermissionsAsync();
    //   if (status !== "granted") {
    //     alert("Sorry, we need camera permissions to make this work!");
    //     return;
    //   }
    //   try {
    //     let result = await ImagePicker.launchCameraAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       quality: 1,
    //       aspect: [4, 3],
    //     });
    //     if (!result.canceled) {
    //       setIDRecto(result.assets[0].uri);
    //     }
    //   } catch (error) {
    //     console.log("Error occurred while launching the camera: ", error);
    //   }
    // };
    // const openCameraCNI_Verso = async () => {
    //   const { status } = await ImagePicker.getCameraPermissionsAsync();
    //   if (status !== "granted") {
    //     alert("Sorry, we need camera permissions to make this work!");
    //     return;
    //   }
    //   try {
    //     let result = await ImagePicker.launchCameraAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       quality: 1,
    //       aspect: [4, 3],
    //     });
    //     if (!result.canceled) {
    //       setImageCNI_Verso(result.assets[0].uri);
    //     }
    //   } catch (error) {
    //     console.log("Error occurred while launching the camera: ", error);
    //   }
    // };

    // const handlePickUser = async () => {
    //   AvatarPermission.getCameraPermission();
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });
    //   if (!result.canceled) {
    //     setAvatar(result.assets[0].uri);
    //   }
    // };

    return (
        <ScrollView>
            <View onPress={onLayoutRootView} style={styles.container}>
                <Modal animationType="fade" transparent visible={modalVisible}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,.2)",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "white",
                                paddingVertical: 25,
                                paddingHorizontal: 30,
                                borderRadius: 25,
                                gap: 15,
                            }}
                        >
                            <AntDesign name="checkcircleo" size={55} color="#1ACA56" />
                            <Text
                                style={{
                                    fontFamily: "Nunito-Medium",
                                    fontSize: 20,
                                    textAlign: "center",
                                }}
                            >
                                Vos modifications ont bien été enregistrées
                            </Text>
                        </View>
                    </View>
                </Modal>

                <View style={styles.princUser}>
                    <Image
                        source={{ uri: avatar }}
                        style={{ width: 125, height: 125, borderRadius: 100 }}
                    />
                </View>

                <View style={styles.itemsInfos}>
                    <View style={styles.listInputs}>
                        <View style={styles.inputStyle}>
                            <AntDesign name="user" size={24} color="black" />
                            <View
                                style={styles.TextInput}
                                placeholder="Nom"
                                keyboardType="default"
                                onChangeText={(textNom) => {
                                    setLastName(textNom);
                                }}
                                value={lastName}
                                maxLength={15}
                            >
                                <Text style={styles.TextView}>{firstName}</Text>
                            </View>
                        </View>
                        <View style={styles.inputStyle}>
                            <AntDesign name="user" size={24} color="black" />
                            <View
                                style={styles.TextInput}
                                placeholder="Prenom"
                                keyboardType="default"
                                onChangeText={(textNom) => {
                                    setFirstName(textNom);
                                }}
                                value={firstName}
                            >
                                <Text style={styles.TextView}>{lastName}</Text>
                            </View>
                        </View>
                        <View style={styles.inputStyle}>
                            <AntDesign name="mail" size={24} color="black" />
                            <View
                                style={styles.TextInput}
                                placeholder="Email"
                                onChangeText={(textEmail) => {
                                    setEmail(textEmail);
                                }}
                                value={email}
                            >
                                <Text style={styles.TextView}>{email}</Text>
                            </View>
                        </View>
                        <View style={styles.inputStyle}>
                            <AntDesign name="phone" size={24} color="black" />
                            <View
                                style={styles.TextInput}
                                placeholder={"Numero"}
                                keyboardType="numeric"
                                onChangeText={(textNumero) => {
                                    setPhone(textNumero);
                                }}
                                value={phone}
                            >
                                <Text style={styles.TextView}>{phone}</Text>
                            </View>
                        </View>
                        <View style={styles.inputStyle}>
                            <MaterialIcons name="gps-fixed" size={24} color="black" />
                            <View
                                style={styles.TextInput}
                                placeholder={"Lieu"}
                                onChangeText={(textLieu) => {
                                    setCity(textLieu);
                                }}
                                value={city}
                            >
                                <Text style={styles.TextView}>{city}</Text>
                            </View>
                        </View>
                        <View
                            onPress={() => {
                                showMode();
                            }}
                            style={styles.itmCalnd}
                        >
                            <View style={styles.btnCalnd}>
                                <AntDesign name="calendar" size={24} color="black" />
                            </View>
                            <Text style={styles.txtCalnd}>{getBirthday(birthday)}</Text>
                        </View>
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
                    <View style={{ marginTop: 15, gap: 10 }}>
                        <Text style={{ fontSize: 19, fontFamily: "Nunito-Regular" }}>
                            Documents et pieces personnelles
                        </Text>
                        <View
                            style={{
                                width: "100%",
                                height: 200,
                                backgroundColor: "white",
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {id_card_recto === undefined ? (
                                <View style={{ alignItems: "center", gap: 10 }}>
                                    <MaterialIcons name="add-a-photo" size={50} color="gray" />
                                    <Text style={{ fontFamily: "Nunito-Medium", color: "gray" }}>
                                        Pièce Recto
                                    </Text>
                                </View>
                            ) : (
                                <Image
                                    // source={{ uri: id_card_recto }}
                                    source={{ uri: `${customer.id_card_recto}` }}
                                    style={{ width: "100%", height: 200, borderRadius: 15 }}
                                />
                            )}
                        </View>
                        <View
                            style={{
                                width: "100%",
                                height: 200,
                                backgroundColor: "white",
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {id_card_verso === undefined ? (
                                <View style={{ alignItems: "center", gap: 10 }}>
                                    <MaterialIcons name="add-a-photo" size={50} color="gray" />
                                    <Text style={{ fontFamily: "Nunito-Medium", color: "gray" }}>
                                        Pièce Verso
                                    </Text>
                                </View>
                            ) : (
                                <Image
                                    // source={{ uri: id_card_verso }}
                                    source={{ uri: `${customer.id_card_verso}` }}
                                    style={{ width: "100%", height: 200, borderRadius: 15 }}
                                />
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.viewBtn}>
                    {/* <Pressable
                        onPress={() => handle()}
                        style={[
                            styles.BtnPrinc,
                            id_card_verso === null
                                ? { backgroundColor: "#0372C1" }
                                : { backgroundColor: "#D8D8D8" },
                        ]}
                    >
                        <Text style={styles.BtnPrincTxt}>Enregistrer</Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            navigate("code", {
                                type: "delete",
                            })
                        }
                        style={[
                            styles.BtnPrinc,
                            {
                                backgroundColor: "none",
                                borderColor: "#0372C1",
                                borderWidth: 1,
                            },
                        ]}
                    >
                        <Text style={[styles.BtnPrincTxt, { color: "black" }]}>
                            Supprimer le compte
                        </Text>
                    </Pressable> */}
                    <Text style={styles.txtRec}>Compte crée le {new Date(customer.createdAt).toLocaleDateString('fr-FR')}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Informations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
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
