import React from "react";
import {
    Image
} from "react-native";

export default ({ style, URL, version, champion }) => {
    {
        if (champion === "FiddleSticks") {
            return (
                <Image
                    style={style}
                    source={{
                        uri: `${URL}${version}/img/champion/Fiddlesticks.png`
                    }} />
            )
        } else {
            return (
                <Image
                    style={style}
                    source={{
                        uri: `${URL}${version}/img/champion/${champion}.png`
                    }} />
            )
        }
    }
};