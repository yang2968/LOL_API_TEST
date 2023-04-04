import React from "react";
import {
    Image
} from "react-native";
import { DATA_URL } from '@env';

export default ({ style, version, profileIcon }) => {
    return (
        <Image
            style={style}
            source={{
                uri: `${DATA_URL}${version}/img/profileicon/${profileIcon}.png`
            }} />
    )
};