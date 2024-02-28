import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Carte from "../pages/Carte";
import TabCustom from "../components/TabCustom";
const Tabs = createBottomTabNavigator();

const DrawerNav = () => {
  return (
    <Tabs.Navigator
      tabBar={(props) => <TabCustom {...props} />}
      initialRouteName="Acceuil"
      screenOptions={{
        headerTitle: "",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        key={1}
        name="Acceuil"
        component={Home}
        options={{ tabBarLabel: "Acceuil" }}
      />
      <Tabs.Screen
        key={2}
        name="Carte"
        component={Carte}
        options={{ tabBarLabel: "Carte" }}
      />
    </Tabs.Navigator>
  );
};

export default DrawerNav;
