import React from "react";
import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from "react-native";
import Color from "../../styles/Color";

export default Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Main");
                }}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: Color.black,
        fontSize: 30,
        fontWeight: "bold"
    }
  });