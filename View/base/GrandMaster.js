import React from "react";
import {
    Image
} from "react-native";
import GrandMaster from "../../images/emblem/Emblem_Grandmaster.png"

export default ({ style }) => {

    return (
        <Image
            style={style}
            source={GrandMaster}
        />
    )
};