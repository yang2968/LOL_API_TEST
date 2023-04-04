import React from "react";
import {
    Image
} from "react-native";
import ImageSize from "../../styles/ImageSize";
import 체력 from "../../images/rune/StatMods/5001.png";
import 방어력 from "../../images/rune/StatMods/5002.png";
import 마법저항력 from "../../images/rune/StatMods/5003.png";
import 공격속도 from "../../images/rune/StatMods/5005.png";
import 스킬가속 from "../../images/rune/StatMods/5007.png";
import 적응형능력치 from "../../images/rune/StatMods/5008.png";

export default ({ stats, style }) => {
    switch(stats) {
        case 5001:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={체력}
                />
            );
        case 5002:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={방어력}
                />
            );
        case 5003:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={마법저항력}
                />
            );
        case 5005:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={공격속도}
                />
            );
        case 5007:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={스킬가속}
                />
            );
        case 5008:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={적응형능력치}
                />
            );
    }
};