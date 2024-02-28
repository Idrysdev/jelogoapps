import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Accueil from "../pages/Accueil";
import Forfait from "../pages/Forfait";
import Abonement from "../pages/Abonement";
import Historique from "../pages/Historique";
import Parametre from "../pages/Parametre";
import Notification from "../pages/Notification";
import DrawerNav from "./DrawerNav";
import Page_select_Abn from "../pages/Page_select_Abn";
import Page_etape_bnq from "../pages/Page_etape_bnq";
import Page_vir_bnq from "../pages/Page_vir_bnq";
import Paiment_scan from "../pages/Paiment_scan";
import TransactionInit from "../pages/transaction/TransactionInit";
import TransactionSuccess from "../pages/transaction/TransactionSuccess";
const Stack = createNativeStackNavigator();

const AccScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="DrawerNav" component={DrawerNav} />
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="Forfait" component={Forfait} />
      <Stack.Screen name="Abonement" component={Abonement} />
      <Stack.Screen name="Paiment_scan" component={Paiment_scan} />
      <Stack.Screen name="Page_select_Abn" component={Page_select_Abn} />
      <Stack.Screen name="Page_etape_bnq" component={Page_etape_bnq} />
      <Stack.Screen name="Page_vir_bnq" component={Page_vir_bnq} />
      <Stack.Screen name="Historique" component={Historique} />
      <Stack.Screen name="Parametre" component={Parametre} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="TransactionInit" component={TransactionInit} />
      <Stack.Screen name="TransactionSuccess" component={TransactionSuccess} />
    </Stack.Navigator>
  );
};

export default AccScreens;
