import React from "react";
import {
    Image
} from "react-native";
import Diamond from "../../images/emblem/Emblem_Diamond.png"

export default ({ style }) => {

    return (
        <Image
            style={style}
            source={Diamond}
        />
    )
};