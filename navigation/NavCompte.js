import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../pages/Account";
import Informations from "../pages/Informations";

const Stack = createNativeStackNavigator();

const NavCompte = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="account" component={Account} />
      <Stack.Screen name="informations" component={Informations} />
    </Stack.Navigator>
  );
};

export default NavCompte;
