import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HistChart from "../components/history/HistChart";
import ShowCash from "../components/ShowCash";
import ItemDate from "../components/ItemDate";
import ItemOperat from "../components/ItemOperat";
import Data from "../components/Data";
import { getMonthFirstAndLastDays } from "../utilies/datetime";

SplashScreen.preventAutoHideAsync();

const Historique = ({ navigation: { navigate, replace } }) => {
    const secretCode = useSelector((state) => state.secretCode.code);
    const phone = useSelector((state) => state.secretCode.number);

    const [cashin, setCashin] = useState(0);
    const [cashout, setCashout] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [data, setData] = useState([]);

    const [month, setMonth] = useState(new Date().getMonth());
    const balance = useSelector(state => state.count.balance)

    const [filter, setFilter] = useState();
    const [selectedFilter, setSelectedFilter] = useState("all");

    const [isLoading, setIsLoading] = useState(false);
    const { Data_Null, Data_Operation, Data_Date } = Data;

    const fetchData = async (dates) => {
        try {
            setIsLoading(true)
            const url = `https://admin.jelogo.net/api/public/wallet/history?phone=${phone}&code=${secretCode}&from_date=${dates[0]}&to_date=${dates[1]}`
            console.log('url.......', url)

            const res = await fetch(url)
            setIsLoading(false)

            const result = await res.json()
            const { totalCashin, totalCashout, transactions } = result.result

            setCashin(totalCashin)
            setCashout(totalCashout)
            setTransactions(transactions ?? [])

            const filtered = transactions.filter(item => ["all", item.type].includes(filter ?? "all"))
            setData(filtered)
        } catch (error) {
            setIsLoading(false)
            console.log('errorrrr.........', error)
        }

    }

    useEffect(() => {
        setFilter("all")
        const days = getMonthFirstAndLastDays(month)
        fetchData(days)
    }, [month, selectedFilter]);

    useEffect(() => {
        console.log('new data......')
        if (selectedFilter && filter != selectedFilter) {
            setFilter(selectedFilter)
            const filtered = transactions.filter(item => ["all", item.type].includes(selectedFilter))
            setData(filtered)
        }
    }, [transactions]);

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

    const getMonthString = (month) => {
        const date = new Date();
        date.setMonth(month);

        if (month > new Date().getMonth()) {
            date.setFullYear(date.getFullYear() - 1);
        }

        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    const Header = () => {
        return (
            <View onLayout={onLayoutRootView} style={styles.container}>
                <View style={styles.Solde}>
                    <ShowCash navigate={navigate} replace={replace} />
                </View>
                <View style={styles.Ctn}>
                    <Text style={styles.histTxt}>Historique des transactions</Text>
                    <View style={styles.scrollH}>
                        <ItemDate
                            active={month}
                            onSelect={(e) => setMonth(e)}
                            data={Data_Date}
                        />
                    </View>
                    <View style={styles.chart}>
                        {isLoading &&
                            <Text
                                style={[
                                    styles.cashTxt,
                                    {
                                        width: 20,
                                        height: 20,
                                    },
                                ]}
                            >
                                <ActivityIndicator animating={true} color="black" size={20} />
                            </Text>
                        }
                        {data.filter(item => item.type === "cashin").length > 0 &&
                            <HistChart data={data.filter(item => item.type === "cashin")} />
                        }
                    </View>
                    <View style={styles.txtDps}>
                        <Text style={styles.txt1}>Recapitulatif {getMonthString(month)}</Text>
                        <Text style={styles.txt2}>Rechargements : {cashin} FCFA</Text>
                        <Text style={styles.txt3}>Dépenses : {cashout} FCFA</Text>
                        <Text style={styles.txt4}>Solde : {balance} FCFA</Text>
                    </View>
                    <View style={styles.scrollH}>
                        <ItemDate
                            active={filter}
                            onSelect={setSelectedFilter}
                            data={Data_Operation}
                        />
                    </View>
                    <Text style={styles.Auj}>Dernières transactions</Text>
                    <View style={styles.listTranssc}>
                        <ItemOperat data={data} />
                    </View>
                </View>
            </View>
        );
    };

    return <FlatList data={Data_Null} renderItem={() => <Header />} />;
};

export default memo(Historique);

const styles = StyleSheet.create({
    cashTxt: {
        fontSize: 25,
        fontFamily: "Nunito-Bold",
        color: "white",
        textAlign: "center",
        marginHorizontal: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#0372C1",
    },
    Solde: {
        flex: 1,
    },
    Ctn: {
        flex: 3,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // borderWidth: 1,
        // borderColor: "red"
    },
    scrollH: {
        marginVertical: 30,
        marginHorizontal: 5,
    },
    chart: {
        alignItems: "center",
        height: 225,
    },
    histTxt: {
        fontFamily: "Nunito-Bold",
        fontSize: 24,
        textAlign: "left",
        alignItems: "center",
        marginVertical: 30,
        marginHorizontal: 39,
        // borderWidth: 1
    },
    txtDps: {
        marginTop: 45,
        marginHorizontal: 25,
        gap: 13,
    },
    txt1: {
        fontFamily: "Nunito-Bold",
        fontSize: 19,
    },
    txt2: {
        fontFamily: "Nunito-SemiBold",
    },
    txt3: {
        fontFamily: "Nunito-SemiBold",
    },
    txt4: {
        fontFamily: "Nunito-Bold",
    },
    Auj: {
        fontFamily: "Nunito-Regular",
        marginHorizontal: 14,
        marginVertical: 15,
        color: "#4F4F4F",
    },
    listTranssc: {
        marginBottom: 40,
    },
});
