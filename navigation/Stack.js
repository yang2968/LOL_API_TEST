import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions, StackActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Color from '../styles/Color';
import Tab from './Tab';
import SearchUser from "../View/Stack/SearchUser";
import InGame from "../View/Stack/InGame";

const Stack = createNativeStackNavigator();

export default () => {

    return (
        <Stack.Navigator
            initialRouteName={"SearchUser"}
            resetOnBlur={true}
            screenOptions={({ navigation, route }) => ({
                unmountOnBlur: true,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: Color.white,
                },
                headerBackTitle: null,
                headerShadowVisible: false,
                // headerTitle: () => { // Custom Title
                // },
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                headerTitleAlign: "center",
                headerBackVisible: false,
                headerLeft: () => {
                    let iconName = "arrow-back-ios";
                    return (
                        <TouchableOpacity
                            style={{}}
                            onPress={() => {
                                navigation.dispatch(StackActions.pop());
                            }}>
                            <Icon
                                name={iconName}
                                size={20}
                                color={Color.black} />
                        </TouchableOpacity>)
                },
                headerRight: () => {
                    // Custom headerRight
                }
            })}>

            <Stack.Screen name="SearchUser" component={SearchUser} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="인게임 정보" component={InGame} options={{ headerShown: true, gestureEnabled: false }} />
            <Stack.Screen name="Main" component={Tab} options={{ headerShown: true, gestureEnabled: false }} />
        </Stack.Navigator>
    )
}