import React from "react";
import { Alert, View, Platform } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Color from '../styles/Color';
import Stack from "./Stack";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView {...props}>

      <View style={{ flex: 1, flexDirection: "column" }}>

        <DrawerItem
          icon={() => {
            let iconName = Platform.OS === "ios" ? "ios-" : "md-";
            iconName += "settings-outline";
            return (
              <Icon
                name={iconName}
                size={25}
                color={Color.black} />
            )
          }}
          label="Setting"
          labelStyle={{ color: Color.black, fontWeight: 'bold' }}
          onPress={() => alert("Setting")}
        />

        <DrawerItem
          icon={() => {
            let iconName1 = Platform.OS === "ios" ? "ios-" : "md-";
            iconName1 += "log-out-outline";
            return (
              <Icon
                name={iconName1}
                size={25}
                color={Color.black} />
            )
          }}
          label="Log Out"
          labelStyle={{ color: Color.black, fontWeight: 'bold' }}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert("알림", "로그아웃하시겠습니까?", [
              {
                text: "확인",
                onPress: () => {
                  props.navigation.dispatch(
                    StackActions.replace("Login")
                  )
                }
              }, {
                text: "취소"
              }
            ])
          }}
        />

      </View>

    </DrawerContentScrollView>
  );
}

export default () => {

  return (
    <Drawer.Navigator
      hideStatusBar={true}
      screenOptions={{ swipeEnabled: false }}
      drawerStyle={{ backgroundColor: Color.white, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="drawerScreen" component={Stack} options={{ headerShown: false, gestureEnabled: false }} />
    </Drawer.Navigator>
  );
};