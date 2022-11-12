import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet
} from "react-native";

export default Tab3 = () => {

  return (
   <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Tab3</Text>
   </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
  },
  text: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold"
  }
});