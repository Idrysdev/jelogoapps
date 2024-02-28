import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Historique from "../pages/Historique";
import NavCompte from "./NavCompte";
import AccScreens from "./AccScreens";
import Scan from "../pages/Scan";

import CustomDrawerContent from "../components/DrawerCustom";
import HeaderRight from "../components/HeaderRight";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

const MainScreen = ({ route, navigation: { navigate, replace } }) => {

  return (
    <Drawer.Navigator
      initialRouteName="AccScreens"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: "",
      }}
    >
      <Drawer.Screen
        name="AccScreens"
        component={AccScreens}
        options={{
          headerRight: () => (
            <HeaderRight route={route} navigate={navigate} replace={replace} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historique"
        component={Historique}
        options={{
          headerRight: () => <HeaderRight route={route} navigate={navigate} />,
        }}
      />
      <Drawer.Screen name="NavCompte" component={NavCompte} />
      <Drawer.Screen
        name="Scan"
        component={Scan}
        options={{ headerShown: false, }}
      />
    </Drawer.Navigator>
  );
};

export default MainScreen;
