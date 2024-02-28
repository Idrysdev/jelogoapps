import { StyleSheet, Text, View, Image, ImageBackground, Pressable, Modal } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import ShareItems from "./ShareItems";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useDispatch, useSelector } from 'react-redux';
import { setUserBalance, setUserData } from "../store/actions/customAction";
import { setNumber, setSecretCode } from "../store/actions/secretCodeActions";
import { _signOut } from "../services/ApiServices";

SplashScreen.preventAutoHideAsync();

const CustomDrawerContent = (props) => {
    const customer = useSelector(state => state.count.customer);
    const secretCode = useSelector((state) => state.secretCode.code);
    const phone = useSelector((state) => state.secretCode.number);

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [fontsLoaded] = useFonts({
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

    const handleSignOut = async () => {
        _signOut(phone, secretCode)
        dispatch(setUserData())
        dispatch(setNumber())
        dispatch(setUserBalance(0))
        dispatch(setSecretCode())
        props.navigation.replace("login");
    }

    return (
        <DrawerContentScrollView {...props}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    style={styles.centeredView}
                >
                    <Pressable onPress={() => { }} style={styles.modalView}>
                        <Text style={styles.txtLabel}>
                            Partagez votre code parrainage avec
                        </Text>
                        <ShareItems />
                    </Pressable>
                </Pressable>
            </Modal>

            <View onLayout={onLayoutRootView} style={styles.MenuContainer}>
                <ImageBackground
                    style={{ height: 182 }}
                    source={require("../assets/icons/BckOverlay.png")}
                ></ImageBackground>
                <View style={styles.drawerItem}>
                    <Pressable
                        onPress={() => {
                            props.navigation.navigate("NavCompte");
                        }}
                        style={styles.profil}
                    >
                        <Image
                            source={customer?.avatar !== undefined ? { uri: `${customer?.avatar}` } : { uri: customer?.avatar }}
                            style={{ width: 80, height: 80, borderRadius: 100 }}
                        />
                        <View style={{ marginHorizontal: 14 }}>
                            <Text style={styles.TxtName}>{customer?.firstName}</Text>
                            <Text style={styles.TxtMail}>{customer?.lastName}</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.drawerItem}>
                    <DrawerItem
                        label="Accueil"
                        labelStyle={{ fontFamily: "Nunito-Regular" }}
                        onPress={() => {
                            props.navigation.navigate("DrawerNav");
                        }}
                        icon={() => <AntDesign name="home" size={20} color="black" />}
                        style={{ marginTop: 90, paddingHorizontal: 40 }}
                    />
                </View>
                <View style={styles.drawerItem}>
                    <DrawerItem
                        label="Compte"
                        labelStyle={{ fontFamily: "Nunito-Regular" }}
                        onPress={() => {
                            props.navigation.navigate("NavCompte");
                        }}
                        icon={() => <AntDesign name="user" size={20} color="black" />}
                        style={{ paddingHorizontal: 40 }}
                    />
                </View>
                <View style={styles.drawerItem}>
                    <DrawerItem
                        label="Historique"
                        labelStyle={{ fontFamily: "Nunito-Regular" }}
                        onPress={() => {
                            props.navigation.navigate("Historique");
                        }}
                        icon={() => <AntDesign name="calendar" size={17} color="black" />}
                        style={{
                            paddingHorizontal: 40,
                        }}
                    />
                </View>
                <View style={styles.drawerItem}>
                    <DrawerItem
                        label="Notification"
                        labelStyle={{ fontFamily: "Nunito-Regular" }}
                        onPress={() => {
                            props.navigation.navigate("Notification");
                        }}
                        icon={() => <AntDesign name="bells" size={17} color="black" />}
                        style={{
                            paddingHorizontal: 40,
                        }}
                    />
                </View>
                <View style={[styles.drawerItem, { marginBottom: 60 }]}>
                    <DrawerItem
                        label="Paramètre"
                        labelStyle={{ fontFamily: "Nunito-Regular" }}
                        onPress={() => {
                            props.navigation.navigate("Parametre");
                        }}
                        icon={() => <AntDesign name="setting" size={20} color="black" />}
                        style={{ paddingHorizontal: 40 }}
                    />
                </View>

                <View style={{ flex: 1, gap: 19, marginHorizontal: 40 }}>
                    <Pressable
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        style={styles.BtnPrinc}
                    >
                        <Text style={styles.BtnPrincTxt}>Invitez vos amis</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            handleSignOut()
                        }}
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
                            Déconnexion
                        </Text>
                    </Pressable>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalView: {
        justifyContent: "flex-end",
        backgroundColor: "white",
        paddingHorizontal: 28,
        paddingVertical: 18,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    txtLabel: {
        fontSize: 17,
        fontFamily: "Nunito-Medium",
    },

    drawerItem: {
        flexDirection: "column",
    },
    profil: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: -15,
        zIndex: 1,
    },
    TxtName: {
        fontSize: 27,
        fontFamily: "Nunito-Bold",
    },
    TxtMail: {
        fontSize: 12,
        fontFamily: "Nunito-Light",
    },
    BtnPrinc: {
        padding: 10,
        backgroundColor: "#0372C1",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "flex-end",
    },
    BtnPrincTxt: {
        fontFamily: "Nunito-Medium",
        fontSize: 17,
        color: "white",
    },
});
