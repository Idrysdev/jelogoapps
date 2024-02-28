import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LockScreen from "../pages/LockScreen";
import VerificationN22 from "../pages/VerificationN22";
import OTPScreen from "../pages/OTPScreen";
import MainScreen from "./MainScreen";
import Login from "../pages/Login";
import Code from "../pages/Code";
import ContactsScreen from "../pages/Contacts";

import DetailTransaction from "../pages/DetailTransaction";
import SubscriptionDocuments from "../pages/subscription/SubscriptionDocuments";
import SubscriptionCompleted from "../pages/subscription/SubscriptionCompleted";
import SubscriptionInformations from "../pages/subscription/SubscriptionInformations";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="mainScreen" component={MainScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="code" component={Code} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="lockScreen" component={LockScreen} />
        <Stack.Screen name="verificationN22" component={VerificationN22} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="SubscriptionInformations" component={SubscriptionInformations} />
        <Stack.Screen name="SubscriptionDocuments" component={SubscriptionDocuments} />
        <Stack.Screen name="SubscriptionCompleted" component={SubscriptionCompleted} />
        <Stack.Screen name="DetailTransaction" component={DetailTransaction} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
