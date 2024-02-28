import { View, Pressable, Image, AppState } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationState } from '@react-navigation/native';
import { setUserBalance } from "../store/actions/customAction";
import { getDateDiff } from "../utilies/datetime";
import { usePushNotifications } from "../usePushNotifications";

const HeaderRight = ({ navigate, replace }) => {
    const { expoPushToken } = usePushNotifications()

    const customer = useSelector(state => state.count.customer);
    const dispatch = useDispatch();

    const [state, setState] = useState("active")
    const [unactivated, setUnactivated] = useState(false)

    const navigationState = useNavigationState(state => state);
    const currentTab = navigationState.routes[navigationState.index];

    const secretCode = useSelector((state) => state.secretCode.code);
    const phone = useSelector((state) => state.secretCode.number);

    useEffect(() => {
        const stateHandler = AppState.addEventListener('change', handleAppStateChange);
        return () => stateHandler.remove();
    }, []);


    const handleState = async (dt) => {
        if (state === 'active') {
            fetchBalance()
            if (dt) {
                const diff = getDateDiff(dt, new Date())
                if (diff > 2) {
                    setUnactivated(false)
                    replace("lockScreen", { type: "normal", action: "secure", previous: currentTab, phone })
                }
                else {
                    setUnactivated(false)
                }
            }
        } else {
            const dt = new Date()
            setUnactivated(dt)
        }
    }

    useEffect(() => {
        handleState(unactivated)
    }, [state]);

    const fetchBalance = async () => {
        try {
            const url = `https://admin.jelogo.net/api/public/wallet?phone=${phone}&code=${secretCode}`
            const res = await fetch(url)
            const response = await res.json()
            const { result } = response
            if (result.balance) dispatch(setUserBalance(result.balance))
        } catch (error) {
            console.error('error....', error)
        }
    }

    const handleAppStateChange = (nextAppState) => {
        setState(nextAppState)
    }

    return (
        <View
            style={{
                flexDirection: "row",
                gap: 5,
                marginRight: 10,
                alignItems: "center",
            }}
        >
            <Pressable
                onPress={() => {
                    replace("lockScreen", { type: "normal", action: "secure", previous: currentTab, phone: customer?.phone })
                }}
            >
                <AntDesign
                    name="unlock"
                    size={24}
                    color="#a4a4a4"
                    style={{ marginRight: 5 }}
                />
            </Pressable>

            <Pressable
                onPress={() => navigate("Notification")}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(3, 114, 193, 0.43)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AntDesign name="bells" size={17} color="white" />
            </Pressable>
            <Pressable onPress={() => navigate("NavCompte")}>
                <Image
                    source={customer?.avatar !== undefined ? { uri: `${customer?.avatar}` } : { uri: customer?.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                />
            </Pressable>
        </View>
    );
};

export default HeaderRight;
