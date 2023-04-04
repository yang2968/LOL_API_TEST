import React from "react";
import {
    Image
} from "react-native";
import Unranked from "../../images/emblem/Unranked.png"

export default ({ style }) => {

    return (
        <Image
            style={style}
            source={Unranked}
        />
    )
};