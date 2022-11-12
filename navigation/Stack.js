import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Color from '../styles/Color';
import Tab from './Tab';
import Login from "../View/Stack/Login";

const Stack = createNativeStackNavigator();

export default () => {

    return (
        <Stack.Navigator
            initialRouteName={"Tab"}
            resetOnBlur={true}
            screenOptions={({ navigation, route }) => ({
                unmountOnBlur: true,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: Color.white
                },
                headerBackTitle: null,
                headerShadowVisible: false,
                // headerTitle: () => { // Custom Title
                // },
                headerTitleAlign: "center",
                headerBackVisible: false,
                headerLeft: () => {
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    iconName += "menu";
                    return (
                        <TouchableOpacity
                            style={{}}
                            onPress={() => {
                                navigation.dispatch(DrawerActions.openDrawer());
                            }}>
                            <Icon
                                name={iconName}
                                size={25}
                                color={Color.black} />
                        </TouchableOpacity>)
                },
                headerRight: () => {
                    // Custom headerRight
                }
            })}>

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Main" component={Tab} options={{ headerShown: true, gestureEnabled: false }} />
        </Stack.Navigator>
    )
}