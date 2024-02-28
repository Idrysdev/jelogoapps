import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";
import { Entypo, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

import BtnItem from "../../components/BtnItem";
import CustVerifItems from "../../components/CustVerifItems";
import { AuthContext } from "../../context/AuthContext";
import { firebaseUploadFile } from "../../utilies/utils";

const SubscriptionDocuments = ({ route, navigation: { replace, navigate } }) => {
    const {
        imageCNI_RectoBD,
        imageCNI_VersoBD,
        setImageCNI_RectoBD,
        setImageCNI_VersoBD,
        imageUser,
        setImageUser,
        selectedType,
        setSelectedType,
        setCode,
        setNumero,
    } = useContext(AuthContext);

    const phone = useSelector((state) => state.secretCode.number);
    const secretCode = useSelector((state) => state.secretCode.code);

    const [selectedLanguage, setSelectedLanguage] = useState(selectedType);

    const [recto, setRecto] = useState(imageCNI_RectoBD);
    const [rectoDraft, setRectoDraft] = useState();

    const [verso, setVerso] = useState(imageCNI_VersoBD);
    const [versoDraft, setVersoDraft] = useState();

    const [avatar, setAvatar] = useState(imageUser);
    const [avatarDraft, setAvatarDraft] = useState();

    const [rectoSpinner, setRectoSpinner] = useState(false);
    const [versoSpinner, setVersoSpinner] = useState(false);
    const [avatarSpinner, setAvatarSpinner] = useState(false);

    const [fontsLoaded] = useFonts({
        "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
        "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
        "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
        "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
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

    // events

    async function getCameraPermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry');
            return
        }
    }

    const onUploadRecto = async (url) => {
        setRectoSpinner(false)
        setRecto(url);
    };

    const onUploadVerso = async (url) => {
        setVersoSpinner(false)
        setVerso(url);
    };

    const onUploadAvatar = async (url) => {
        setAvatarSpinner(false)
        setAvatar(url);
    };

    const lanchCamera = async (showSpinner, callback, setDraft) => {
        await getCameraPermission()
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 3],
            });
            if (!result.canceled) {
                if (setDraft) setDraft(result.assets[0].uri)
                showSpinner(true)
                const url = await firebaseUploadFile(result.assets[0].uri, phone ? phone : route?.params?.phone);
                callback(url)
            }
        } catch (error) {
            setRectoSpinner(false)
            console.log("Error occurred while launching the camera: ", error);
        }
    }

    const _onSubmit = async () => {
        if (verso === null || recto === null || avatar === '') {
            alert('Veuillez renseigner les documents avant de pouvoir continuer')
            return
        }

        setImageCNI_RectoBD(recto);
        setImageCNI_VersoBD(verso);
        setImageUser(avatar);
        setSelectedType(selectedLanguage)
        setNumero(route.params.phone ?? phone)
        setCode(route.params.code ?? secretCode)

        replace("SubscriptionInformations", { phone: route.params.phone, code: route.params.code });
    }

    return (
        <ScrollView>
            <View onLayout={onLayoutRootView} style={styles.container}>
                <CustVerifItems text="Piece d’identification" />
                <View style={{ marginVertical: 22, gap: 17, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: "column", alignSelf: "flex-start" }}>
                        <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: 17 }}>
                            Type de document
                        </Text>

                        <Picker
                            style={{ width: 250 }}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }
                        >
                            <Picker.Item label="CNI" value="cni" />
                            <Picker.Item label="Passeport" value="passport" />
                            <Picker.Item
                                label="Permis de conduire"
                                value="drive_card"
                            />
                            <Picker.Item
                                label="Attestation d'identité"
                                value="id_card"
                            />
                            <Picker.Item
                                label="Carte consulaire / titre de sejour"
                                value="consulat_card"
                            />
                            <Picker.Item label="Autres" value="other" />
                        </Picker>

                        <View
                            style={{
                                marginTop: 15,
                                gap: 10,
                                flexDirection: "row",
                                marginHorizontal: 15,
                                marginBottom: 20,
                            }}
                        >
                            <Pressable
                                style={{
                                    position: "relative",
                                    width: "50%",
                                    height: 200,
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    lanchCamera(setRectoSpinner, onUploadRecto, setRectoDraft)
                                }}
                            >
                                {rectoDraft || recto ?
                                    <>
                                        <Image
                                            source={{ uri: rectoDraft }}
                                            style={{ width: "100%", height: 200, borderRadius: 15 }}
                                        />
                                        {recto ?
                                            <FontAwesome5
                                                name="check-circle"
                                                size={30}
                                                color="#0E9CFF"
                                                brand
                                                style={{
                                                    position: "absolute"
                                                }}
                                            />
                                            :
                                            <ActivityIndicator
                                                animating={true}
                                                color="#0E9CFF"
                                                size={40}
                                                style={{
                                                    position: "absolute"
                                                }}
                                            />
                                        }
                                    </>
                                    :
                                    <View style={{ alignItems: "center", gap: 10 }}>
                                        {!rectoSpinner ?
                                            <View>
                                                <MaterialIcons name="add-a-photo" size={50} color="gray" />
                                                <Text
                                                    style={{ fontFamily: "Nunito-Medium", color: "gray" }}
                                                >
                                                    Pièce Recto
                                                </Text>
                                            </View>
                                            :
                                            <ActivityIndicator animating={true} color="#0E9CFF" size={40} />
                                        }

                                    </View>
                                }
                            </Pressable>
                            <Pressable
                                style={{
                                    width: "50%",
                                    height: 200,
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    lanchCamera(setVersoSpinner, onUploadVerso, setVersoDraft)
                                }}
                            >
                                {versoDraft || verso ?
                                    <>
                                        <Image
                                            source={{ uri: versoDraft }}
                                            style={{ width: "100%", height: 200, borderRadius: 15 }}
                                        />
                                        {verso ?
                                            <FontAwesome5
                                                name="check-circle"
                                                size={30}
                                                color="#0E9CFF"
                                                brand
                                                style={{
                                                    position: "absolute"
                                                }}
                                            />
                                            :
                                            <ActivityIndicator
                                                animating={true}
                                                color="#0E9CFF"
                                                size={40}
                                                style={{
                                                    position: "absolute"
                                                }}
                                            />
                                        }
                                    </>
                                    :
                                    <View style={{ alignItems: "center", gap: 10 }}>
                                        {!versoSpinner ?
                                            <View>
                                                <MaterialIcons name="add-a-photo" size={50} color="gray" />
                                                <Text
                                                    style={{ fontFamily: "Nunito-Medium", color: "gray" }}
                                                >
                                                    Pièce Verso
                                                </Text>
                                            </View>
                                            :
                                            <ActivityIndicator animating={true} color="#0E9CFF" size={40} />
                                        }
                                    </View>
                                }
                            </Pressable>
                        </View>
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Pressable
                                style={{
                                    width: "50%",
                                    height: 200,
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    lanchCamera(setAvatarSpinner, onUploadAvatar, setAvatarDraft)
                                }}
                            >
                                {avatarDraft || avatar ?
                                    <>
                                        <Image
                                            source={{ uri: avatarDraft }}
                                            resizeMode="center"
                                            style={{
                                                width: "100%",
                                                height: 200,
                                                borderRadius: 15,
                                            }}
                                        />
                                        {avatar ?
                                            <FontAwesome5
                                                name="check-circle"
                                                size={30}
                                                color="#0E9CFF"
                                                brand
                                                style={{
                                                    position: "absolute"
                                                }}
                                            />
                                            :
                                            <ActivityIndicator
                                                animating={true}
                                                color="#0E9CFF"
                                                size={40}
                                                style={{
                                                    position: "absolute"
                                                }}
                                            />
                                        }
                                    </>
                                    :
                                    <View style={{ alignItems: "center", gap: 10 }}>
                                        {!avatarSpinner ? <View>
                                            <Entypo name="user" size={50} color="gray" />
                                            <Text
                                                style={{ fontFamily: "Nunito-Medium", color: "gray" }}
                                            >
                                                Prendre un selfie
                                            </Text>
                                        </View>
                                            :
                                            <ActivityIndicator animating={true} color="#0E9CFF" size={40} />}
                                    </View>
                                }
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <BtnItem
                        text="Continuer"
                        navigation={() => _onSubmit()}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default SubscriptionDocuments;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        alignItems: "center",
        paddingTop: Dimensions.get("window").height * 0.1,
    },
});
