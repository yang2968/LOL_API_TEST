import React from "react";
import {
    Image
} from "react-native";
import Challenger from "../../images/emblem/Emblem_Challenger.png"

export default ({ style }) => {

    return (
        <Image
            style={style}
            source={Challenger}
        />
    )
};