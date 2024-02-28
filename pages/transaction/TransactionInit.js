import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FlatList, TextInput } from "react-native-gesture-handler";
import BtnItem from "../../components/BtnItem";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import Data from "../../components/Data";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import LoaderComponent from "../../components/LoaderComponent";
import { format_phone, round_amount } from "../../utilies/numbers";
import { get_amount_for_fees, validate_phone } from "../../utilies/validation";
SplashScreen.preventAutoHideAsync();

const TransactionInit = ({ route, navigation: { navigate, replace } }) => {
    const { contactSelect, setContactSelect } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [check, setCheck] = useState(false);
    const [value, setValue] = useState(0);
    const [valueAf, setValueAf] = useState(0);
    const customer = useSelector(state => state.count.customer);
    const secretCode = useSelector((state) => state.secretCode.code);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [scannedUser, setScannedUser] = useState(false);

    const [contactSelected, setContactSelected] = useState(false);
    const balance = useSelector(state => state.count.balance)

    const [amountToPay, setToPay] = useState(0);
    const [amountToReceive, setToReceive] = useState(0);

    const { label, img, operation, method, txt, name, style, uid } = route.params;
    const { Data_Null } = Data;

    console.log('TransactionInit...', operation, method)

    const handleScan = async () => {
        const url = `https://admin.jelogo.net/api/public/users?code=${secretCode}&phone=${customer?.phone}&scan=${uid}`
        console.log('handleScan...', url)
        const res = await fetch(url)
        const result = await res.json()
        setScannedUser(result);
        setPhone(result.phone)
    };

    useEffect(() => {
        const feesVal = method === "jelogo" ? customer.jelogoFees : customer.momoFees
        const { amountToPay, amountToReceive } = get_amount_for_fees(value, check, feesVal)
        setToPay(amountToPay)
        setToReceive(amountToReceive)

        if (uid && !scannedUser) {
            handleScan()
        }
        if (!contactSelected) {
            console.log('unseeeee...')
            setContactSelect('')
        }
        else if (contactSelect.phoneNumbers !== undefined) {
            console.log('selected...', contactSelect.phoneNumbers)
            setPhone(format_phone(Object.values(contactSelect.phoneNumbers)[0].number))
        }
    }, [valueAf, value, contactSelect, scannedUser, check]);

    const [fontsLoaded] = useFonts({
        "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
        "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
        "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const handleCheck = () => {
        setCheck(!check);
        const fees = parseInt(value + (value * 0.015))
        setValueAf(round_amount(!check ? fees : value));
    };

    const validateForm = (phone) => {
        phone = phone.replaceAll(' ', '')

        if (phone === '') {
            alert('Vous devez renseigner un numéro valide')
            return
        }
        else if (parseFloat(valueAf) < 100) {
            alert('Le montant minimum est de 100 FCFA')
            return
        }
        else if (phone.length !== 10) {
            alert("Numéro de téléphone incorrect !")
            return
        }
        else if (![validate_phone(phone).operator, "wave", "bank", "jelogo"].includes(method)) {
            alert(`Veuillez entrer un numero ${label.split(' ')[0] ?? ''} valide`)
            return
        }

        return true
    }

    // submission

    const _onSubmit = async () => {
        const validated = validateForm(phone, value)
        console.log('submit:::::::::::::::::::::::::::::::::::', validated)

        if (!validated) {
            setLoadingMsg()
            return
        }

        setIsLoading(true)

        if (name === "cashout") {
            _handleCashOut()
        }
        if (name === "cashin") {
            _handleCashIn()
        }
    }

    const _handleCashIn = async () => {
        console.log('handle cash in........')

        try {
            const payload = {
                amount: value,
                phone: `225${phone}`,
                username: customer?.email,
                password: secretCode,
                fees: check,
            };
            console.log("payload...................", payload)

            if (amountToReceive < 100) {
                alert('Le montant à recevoir doit être au minimum 100 FCFA')
                setIsLoading(false)
                return
            }

            const res = await fetch('https://admin.jelogo.net/api/public/cash-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            setIsLoading(false)
            setLoadingMsg(false)

            const result = await res.json();
            console.log("result................", result)

            if (result === "amount") {
                alert('Le montant à recevoir doit être au minimum 100 FCFA')
                return
            }
            if (route.params.label === "Orange Money") {
                _cashInOM(res.status, result)
                return
            }
            _cashInMOMO(res.status, result)
        }
        catch (error) {
            setIsLoading(false)
            setLoadingMsg()
            alert('Service momentanément indisponible.')
        }
    }

    const _cashInOM = async (status, result) => {
        console.log('OM........', status, result)

        if (status === 200) {
            navigate("OTPScreen", { type: "Orange", token: result.APIResponse.token, signature: result.APIResponse.signature, message: result.APIResponse.instruction })
            return
        }

        alert('Service momentanément indisponible.')
    };

    const _cashInMOMO = async (status, result) => {
        console.log('MOMOOOOO........', status, result)

        const { signature, instruction, error } = result

        if (status === 404 || error === "network") {
            alert('Veuillez vérifier votre connexion internet.')
            return
        }
        if (status !== 200) {
            alert('Service momentanément indisponible.')
            return
        }
        checkTransaction(signature, instruction)
    };

    const _handleCashOut = async () => {
        console.log('handle cash out........', balance, amountToPay, amountToReceive)

        try {
            const payload = {
                email: customer.email ?? "",
                lastName: customer.lastName ?? "",
                firstName: customer.firstName ?? "",
                amount: value,
                phone: scannedUser ? scannedUser.phone : `225${phone}`,
                username: customer?.email,
                password: secretCode,
                fees: check
            };
            if (method === "wave") {
                payload.payment_method = "WAVECI"
            }
            if (method === "jelogo") {
                payload.payment_method = "jelogo"
            }

            if (amountToPay > balance) {
                alert('Le montant à payer est superieur à votre solde')
                setIsLoading(false)
                return
            }
            if (amountToReceive < 200) {
                alert('Le montant à recevoir doit être au minimum 200 FCFA')
                setIsLoading(false)
                return
            }

            const res = await fetch('https://admin.jelogo.net/api/public/cash-out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            setIsLoading(false)
            setLoadingMsg()

            const result = await res.json();
            const { error, status } = result
            console.log("result................", result, res.status, error)

            if (result === "amount") {
                alert('Le montant à recevoir doit être au minimum 200 FCFA')
                return
            }
            if (result === "receiver") {
                alert("Aucun compte JELOGO n'est associé à ce numéro !")
                return
            }
            if (result === "balance") {
                alert('Le montant à payer est superieur à votre solde')
                return
            }
            if (res.status === 404) {
                alert('Veuillez vérifier votre connexion internet.')
                return
            }
            if (res.status !== 200) {
                alert('Service indisponible. Veuillez reessayer plus tard.')
                return
            }
            if (status !== "OPERATION_SUCCES") {
                alert('Echec de paiement')
                return
            }

            replace("TransactionSuccess", {
                type: "normal",
                label,
                operation,
                img: img.toString(),
                amount: value.toLocaleString(),
                network_id: label,
                method,
                transaction: 'cash-out'
            })

        } catch (error) {
            console.error('error.....', error)
            setIsLoading(false)
            setLoadingMsg()
            alert('Service momentanément indisponible.')
        }
    };

    const checkTransaction = (signature, instruction) => {
        setLoadingMsg(instruction)
        setIsLoading(true)

        const url = `https://admin.jelogo.net/api/public/cash-in?username=${customer.email}&password=${secretCode}&signature=${signature}`;
        console.log('check-status................', instruction, url)

        const interval = setInterval(async () => {
            try {
                const res = await fetch(url);

                const result = await res.json();
                console.log("result.............", result)
                const { status } = result

                if (res.status === 200 && status !== "WAITING_CUSTOMER_TO_VALIDATE") {
                    clearInterval(interval)
                    setIsLoading(false)
                    setLoadingMsg()

                    if (status !== "ACCEPTED") {
                        checkPaymentStatus(status)
                        return
                    }

                    replace("TransactionSuccess", {
                        type: "normal",
                        label,
                        operation,
                        img: img.toString(),
                        amount: value.toLocaleString(),
                        network_id: label,
                        method,
                        transaction: 'cash-in',
                    })
                }
            } catch (error) {
                setIsLoading(false)
                setLoadingMsg()
                alert("Une erreur s'est produite. Veuillez contacter le service client")
            }
        }, 10000)
    }

    const checkPaymentStatus = () => {
        alert("Le rechargement a échoué")
    }

    return (
        <>
            <FlatList
                data={Data_Null}
                renderItem={({ item }) => (
                    <View onLayout={onLayoutRootView} style={styles.container}>
                        <View
                            style={{
                                alignItems: "center",
                                paddingVertical: 15,
                                ...style
                            }}
                        >
                            <Text
                                style={{
                                    color: style.color,
                                    fontFamily: "Nunito-Bold",
                                    fontSize: 18,
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                        {route.params.operation === "Recharger mon solde" ? (
                            <Text style={styles.txtPwd}>Compte à débiter</Text>
                        ) : (
                            <Text style={styles.txtPwd}>{txt}</Text>
                            // <Text style={styles.txtPwd}>Transférez votre argent</Text>
                        )}

                        <View style={{ gap: 23, marginVertical: 30 }}>
                            {label === "VISA" ? (
                                <>
                                    <View style={{ flexDirection: "row", gap: 8 }}>
                                        <Text style={{ fontFamily: "Nunito-Bold", fontSize: 21 }}>
                                            IBAN
                                        </Text>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="XXX XXX XXXX 12"
                                            keyboardType="numeric"
                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", gap: 8 }}>
                                        <Text style={{ fontFamily: "Nunito-Bold", fontSize: 21 }}>
                                            Banque du bénéficiare
                                        </Text>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="Banque d'Abidjan (BDA)"
                                            keyboardType="numeric"
                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", gap: 8 }}>
                                        <Text style={{ fontFamily: "Nunito-Bold", fontSize: 21 }}>
                                            Nom du bénéficiare
                                        </Text>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="LASTNAME NAME"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </>
                            )
                                :
                                uid && scannedUser
                                    ?
                                    <View
                                        style={{
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Nunito-Bold",
                                                fontSize: 20,
                                            }}
                                        >
                                            {scannedUser?.firstName} {scannedUser?.lastName}
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ alignItems: "center", gap: 15 }}>
                                        {uid ?
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
                                            :
                                            <>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "flex-end",
                                                        gap: 10,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            fontFamily: "Nunito-Regular",
                                                            borderBottomWidth: 1,
                                                            // borderBottomColor: style.color,
                                                        }}
                                                    >
                                                        +225
                                                    </Text>
                                                    <TextInput
                                                        style={styles.TextInput}
                                                        value={
                                                            contactSelect.phoneNumbers && format_phone(Object.values(contactSelect.phoneNumbers)[0].number)
                                                        }
                                                        placeholder="Numéro du compte"
                                                        onChangeText={(number) => setPhone(number)}
                                                        keyboardType="numeric"
                                                        onSubmitEditing={() => {
                                                            // navigate("code", { type: "normal" })
                                                        }}
                                                    />

                                                </View>

                                                <View style={{ alignSelf: "flex-start" }}>
                                                    <Pressable
                                                        style={{
                                                            paddingHorizontal: 10,
                                                            flexDirection: "row",
                                                            gap: 10,
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            width: "100%",
                                                        }}
                                                        onPress={() => {
                                                            setContactSelected(true)
                                                            navigate("ContactsScreen")
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                padding: 10,
                                                                flexDirection: "row",
                                                                gap: 10,
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <AntDesign name="contacts" size={24} color="black" />
                                                            <Text
                                                                style={{
                                                                    textAlign: "left",
                                                                    fontSize: 18,
                                                                    fontFamily: "Nunito-Medium",
                                                                }}
                                                            >
                                                                Vos contacts
                                                            </Text>
                                                        </View>

                                                        <AntDesign name="right" size={20} color="black" />
                                                    </Pressable>
                                                    <Text
                                                        style={{
                                                            marginVertical: 10,
                                                            fontFamily: "Nunito-Regular",
                                                            color: "gray",
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        Contacts récents
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            marginVertical: 10,
                                                            fontFamily: "Nunito-Regular",
                                                            color: "gray",
                                                            marginLeft: 10,
                                                            marginBottom: 5,
                                                        }}
                                                    >
                                                        Contacts sélectionnés
                                                    </Text>
                                                </View>
                                            </>
                                        }
                                    </View>
                            }
                        </View>

                        {typeof contactSelect.phoneNumbers == "undefined" ? null : (
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginHorizontal: 5,
                                    marginBottom: 30,
                                }}
                            >
                                <View
                                    style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
                                >
                                    <View
                                        style={{
                                            width: 55,
                                            height: 55,
                                            borderRadius: 50,
                                            backgroundColor: "#C2D0E1",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 17, fontFamily: "Nunito-Medium" }}>
                                            {contactSelect.lastName === undefined
                                                ? contactSelect.name.substr(0, 2)
                                                : contactSelect.firstName.substr(0, 1) +
                                                contactSelect.lastName.substr(0, 1)}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 17, fontFamily: "Nunito-Medium" }}>
                                            {contactSelect.name}
                                        </Text>
                                        <Text style={{ fontSize: 17, fontFamily: "Nunito-Medium" }}>
                                            {Object.values(contactSelect.phoneNumbers)[0].number}
                                        </Text>
                                    </View>
                                </View>
                                <Pressable style={{}} onPress={() => setContactSelect({})}>
                                    <Entypo name="cross" size={24} color="gray" />
                                </Pressable>
                            </View>
                        )}

                        <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "Nunito-SemiBold",
                                    marginBottom: 15,
                                }}
                            >
                                Entrez le montant
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <Ionicons name="cash" size={24} color="black" />
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Montant"
                                    keyboardType="numeric"
                                    onChangeText={(value) => {
                                        const amount = parseInt(value)
                                        setValue(amount);
                                        const fees = parseInt(check ? amount + (amount * 0.015) : amount)
                                        setValueAf(round_amount(check ? fees : amount));
                                    }}
                                />
                            </View>
                        </View>
                        {(route.params.operation === "Recharger mon solde" || route.params.operation === "Transfert d’argent" && route.params.label !== "JELOGO") &&
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    marginHorizontal: 25,
                                    marginTop: 35,
                                }}
                            >
                                <Pressable
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 15,
                                    }}
                                    onPress={() => {
                                        handleCheck();
                                    }}
                                >
                                    <View
                                        style={[
                                            {
                                                width: 20,
                                                height: 20,
                                                borderRadius: 75,
                                            },
                                            check
                                                ? { backgroundColor: "#0066B5" }
                                                : { borderColor: "black", borderWidth: 1 },
                                        ]}
                                    ></View>

                                    <Text style={{ fontFamily: "Nunito-Regular", fontSize: 18 }}>
                                        Je paie les frais 1.5%
                                    </Text>
                                </Pressable>
                            </View>
                        }
                        <View style={{ marginHorizontal: 25, marginBottom: 40, marginTop: 18 }}>
                            <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: 17 }}>
                                Total à payer :
                                <Text style={{ fontFamily: "Nunito-Bold", fontSize: 18, marginHorizontal: 20 }}>
                                    {isNaN(amountToPay) ? ' 0' : ' ' + amountToPay} FCFA
                                </Text>
                            </Text>
                            <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: 17 }}>
                                Montant {name === "cashin" ? "à recevoir" : name === "cashout" ? "à envoyer" : "final"} :
                                <Text style={{ fontFamily: "Nunito-Bold", fontSize: 18, marginHorizontal: 20 }}>
                                    {'  ' + amountToReceive} FCFA
                                </Text>
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <BtnItem
                                text="Continuer"
                                navigation={async () => {
                                    _onSubmit()
                                }}
                            />
                        </View>
                    </View>
                )}
            />
            {isLoading && <LoaderComponent message={loadingMsg} />}
        </>
    );
};

export default TransactionInit;

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 50 },
    TextInput: {
        height: "auto",
        borderBottomWidth: 1,
        borderBottomColor: "#ABB0BC",
        fontSize: 21,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 15,
    },
    txtPwd: {
        fontFamily: "Nunito-Medium",
        marginTop: 15,
        fontSize: 21,
        alignItems: "center",
        textAlign: "center",
    },

    icon: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});
