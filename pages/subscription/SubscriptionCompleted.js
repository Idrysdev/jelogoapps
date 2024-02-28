import { View, StyleSheet, Dimensions, Image } from "react-native";
import React, { useCallback, memo } from "react";
import { useFonts } from "expo-font";
import BtnItem from "../../components/BtnItem";
import CustVerifItems from "../../components/CustVerifItems";
import Data from "../../components/Data";
import { FlatList } from "react-native-gesture-handler";

const SubscriptionCompleted = ({ navigation: { replace } }) => {
    const { Data_Null } = Data;
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

    return (
        <FlatList
            data={Data_Null}
            renderItem={() => (
                <View onLayout={onLayoutRootView} style={styles.container}>
                    <CustVerifItems text="Félicitations, votre inscription est terminée" />
                    <Image
                        source={require("../../assets/congrat.png")}
                        style={{
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").height * 0.45,
                            borderRadius: 100,
                        }}
                    />
                    <View style={{ marginTop: Dimensions.get("window").height * 0.1 }}>
                        <BtnItem
                            text="Terminer"
                            navigation={() => {
                                replace("mainScreen");
                            }}
                        />
                    </View>
                </View>
            )}
        />
    );
};

export default memo(SubscriptionCompleted);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        alignItems: "center",
        paddingTop: Dimensions.get("window").height * 0.1,
    },
});
