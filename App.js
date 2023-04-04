import React from 'react';
import {
  StatusBar,
  Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './navigation/Drawer';

const barStyle = Platform.OS === "ios" ? "dark-content" : "default";

const App = () => {

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </>
  );
};

export default App;
