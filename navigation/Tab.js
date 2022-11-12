import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Color from '../styles/Color';
import Tab1 from "../View/Tab/Tab1";
import Tab2 from "../View/Tab/Tab2";
import Tab3 from "../View/Tab/Tab3";
import Tab4 from "../View/Tab/Tab4";

const Tab = createBottomTabNavigator();

const setIcon = {
  Tab1() {
    return "home";
  },
  Tab2() {
    return "search-sharp";
  },
  Tab3() {
    return "chatbubble-ellipses";
  },
  Tab4() {
    return "person";
  }
}

export default () => {
  return (
    <Tab.Navigator
      initialRouteName={"페이지1"}
      resetOnBlur={true}
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: Color.black,
        tabBarActiveBackgroundColor: Color.white,
        tabBarItemStyle: {
          // add tabBarItemStyle
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 13
        },
        tabBarStyle: {
          backgroundColor: Color.white,
          height: 60,
          padding: 5,
          paddingBottom: 5,
        },
        headerTitleAlign: "left",
        tabBarIcon: ({ focused }) => {
          const { name } = route;
          const iconName = setIcon[name]();
          return (
            <Icon
              name={iconName}
              size={20}
              color={focused ? Color.black : "grey"} />
          );
        },
      })}
    >

      <Tab.Screen name="Tab1" component={Tab1} options={{ headerShown: false }} />
      <Tab.Screen name="Tab2" component={Tab2} options={{ headerShown: false }} />
      <Tab.Screen name="Tab3" component={Tab3} options={{ headerShown: false }} />
      <Tab.Screen name="Tab4" component={Tab4} options={{ headerShown: false }} />

    </Tab.Navigator>

  );
};