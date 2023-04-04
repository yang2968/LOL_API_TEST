import React from "react";
import {
    Image
} from "react-native";

export default ({ style, URL, version, spell }) => {
    return (
        <Image
            style={style}
            source={{
                uri: `${URL}${version}/img/spell/${spell}.png`
            }} />
    )
};