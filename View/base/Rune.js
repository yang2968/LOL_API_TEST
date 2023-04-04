import React from "react";
import {
    Image
} from "react-native";
import ImageSize from "../../styles/ImageSize";
import 정밀 from "../../images/rune/precision/8000.png";
import 집중공격 from "../../images/rune/precision/8005.png";
import 치명적속도 from "../../images/rune/precision/8008.png";
import 정복자 from "../../images/rune/precision/8010.png";
import 기민한발걸음 from "../../images/rune/precision/8021.png";
import 과다치유 from "../../images/rune/precision/Overheal.png";
import 승전보 from "../../images/rune/precision/Triumph.png";
import 침착 from "../../images/rune/precision/PresenceOfMind.png";
import 민첩함 from "../../images/rune/precision/LegendAlacrity.png";
import 강인함 from "../../images/rune/precision/LegendTenacity.png";
import 핏빛길 from "../../images/rune/precision/LegendBloodline.png";
import 최후의일격 from "../../images/rune/precision/CoupDeGrace.png";
import 체력차극복 from "../../images/rune/precision/CutDown.png";
import 최후의저항 from "../../images/rune/precision/LastStand.png";

import 지배 from "../../images/rune/domination/8100.png";
import 감전 from "../../images/rune/domination/8112.png";
import 포식자 from "../../images/rune/domination/8124.png";
import 어둠의수확 from "../../images/rune/domination/8128.png";
import 칼날비 from "../../images/rune/domination/9923.png";
import 비열한한방 from "../../images/rune/domination/CheapShot.png";
import 피의맛 from "../../images/rune/domination/TasteOfBlood.png";
import 돌발일격 from "../../images/rune/domination/SuddenImpact.png";
import 좀비와드 from "../../images/rune/domination/ZombieWard.png";
import 유령포로 from "../../images/rune/domination/GhostPoro.png";
import 사냥의증표 from "../../images/rune/domination/EyeballCollection.png";
import 보물사냥꾼 from "../../images/rune/domination/TreasureHunter.png";
import 영리한사냥꾼 from "../../images/rune/domination/IngeniousHunter.png";
import 끈질긴사냥꾼 from "../../images/rune/domination/RelentlessHunter.png";
import 궁극의사냥꾼 from "../../images/rune/domination/UltimateHunter.png";

import 마법 from "../../images/rune/sorcery/8200.png";
import 콩콩이소환 from "../../images/rune/sorcery/8214.png";
import 신비로운유성 from "../../images/rune/sorcery/8229.png";
import 난입 from "../../images/rune/sorcery/8230.png";
import 무효화구체 from "../../images/rune/sorcery/Pokeshield.png";
import 마나순환팔찌 from "../../images/rune/sorcery/ManaflowBand.png";
import 빛의망토 from "../../images/rune/sorcery/NimbusCloak.png";
import 깨달음 from "../../images/rune/sorcery/Transcendence.png";
import 기민함 from "../../images/rune/sorcery/CelerityTemp.png";
import 절대집중 from "../../images/rune/sorcery/AbsoluteFocus.png";
import 주문작열 from "../../images/rune/sorcery/Scorch.png";
import 물위를걷는자 from "../../images/rune/sorcery/Waterwalking.png";
import 폭풍의결집 from "../../images/rune/sorcery/GatheringStorm.png";

import 결의 from "../../images/rune/resolve/8400.png";
import 착취의손아귀 from "../../images/rune/resolve/8437.png";
import 여진 from "../../images/rune/resolve/8439.png";
import 수호자 from "../../images/rune/resolve/8465.png";
import 철거 from "../../images/rune/resolve/Demolish.png";
import 생명의샘 from "../../images/rune/resolve/FontOfLife.png";
import 보호막강타 from "../../images/rune/resolve/MirrorShell.png";
import 사전준비 from "../../images/rune/resolve/Conditioning.png";
import 재생의바람 from "../../images/rune/resolve/SecondWind.png";
import 뼈방패 from "../../images/rune/resolve/BonePlating.png";
import 과잉성장 from "../../images/rune/resolve/Overgrowth.png";
import 소생 from "../../images/rune/resolve/Revitalize.png";
import 불굴의의지 from "../../images/rune/resolve/Unflinching.png";

import 영감 from "../../images/rune/inspiration/8300.png";
import 빙결강화 from "../../images/rune/inspiration/8351.png";
import 봉인풀린주문서 from "../../images/rune/inspiration/8360.png";
import 선제공격 from "../../images/rune/inspiration/8369.png";
import 마법공학점멸기 from "../../images/rune/inspiration/HextechFlashtraption.png";
import 마법의신발 from "../../images/rune/inspiration/MagicalFootwear.png";
import 완벽한타이밍 from "../../images/rune/inspiration/PerfectTiming.png";
import 외상 from "../../images/rune/inspiration/FuturesMarket.png";
import 미니언해체분석기 from "../../images/rune/inspiration/MinionDematerializer.png";
import 비스킷배달 from "../../images/rune/inspiration/BiscuitDelivery.png";
import 우주적통찰력 from "../../images/rune/inspiration/CosmicInsight.png";
import 쾌속접근 from "../../images/rune/inspiration/ApproachVelocity.png";
import 시간왜곡물약 from "../../images/rune/inspiration/TimeWarpTonic.png";

export default ({ rune, style }) => {
    switch (rune) {
        case 8000:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={정밀}
                />
            );
        case 8005:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={집중공격}
                />
            );
        case 8008:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={치명적속도}
                />
            );
        case 8010:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={정복자}
                />
            );
        case 8021:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={기민한발걸음}
                />
            );
        case 9101:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={과다치유}
                />
            );
        case 9111:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={승전보}
                />
            );
        case 8009:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={침착}
                />
            );
        case 9104:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={민첩함}
                />
            );
        case 9105:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={강인함}
                />
            );
        case 9103:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={핏빛길}
                />
            );
        case 8014:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={최후의일격}
                />
            );
        case 8017:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={체력차극복}
                />
            );
        case 8299:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={최후의저항}
                />
            );
        case 8100:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={지배}
                />
            );
        case 8112:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={감전}
                />
            );
        case 8124:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={포식자}
                />
            );
        case 8128:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={어둠의수확}
                />
            );
        case 9923:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={칼날비}
                />
            );
        case 8126:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={비열한한방}
                />
            );
        case 8139:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={피의맛}
                />
            );
        case 8143:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={돌발일격}
                />
            );
        case 8136:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={좀비와드}
                />
            );
        case 8120:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={유령포로}
                />
            );
        case 8138:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={사냥의증표}
                />
            );
        case 8135:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={보물사냥꾼}
                />
            );
        case 8134:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={영리한사냥꾼}
                />
            );
        case 8105:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={끈질긴사냥꾼}
                />
            );
        case 8106:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={궁극의사냥꾼}
                />
            );
        case 8200:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={마법}
                />
            );
        case 8214:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={콩콩이소환}
                />
            );
        case 8229:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={신비로운유성}
                />
            );
        case 8230:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={난입}
                />
            );
        case 8224:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={무효화구체}
                />
            );
        case 8226:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={마나순환팔찌}
                />
            );
        case 8275:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={빛의망토}
                />
            );
        case 8210:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={깨달음}
                />
            );
        case 8234:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={기민함}
                />
            );
        case 8233:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={절대집중}
                />
            );
        case 8237:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={주문작열}
                />
            );
        case 8232:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={물위를걷는자}
                />
            );
        case 8236:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={폭풍의결집}
                />
            );
        case 8300:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={영감}
                />
            );
        case 8351:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={빙결강화}
                />
            );
        case 8360:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={봉인풀린주문서}
                />
            );
        case 8369:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={선제공격}
                />
            );
        case 8306:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={마법공학점멸기}
                />
            );
        case 8304:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={마법의신발}
                />
            );
        case 8313:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={완벽한타이밍}
                />
            );
        case 8321:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={외상}
                />
            );
        case 8316:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={미니언해체분석기}
                />
            );
        case 8345:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={비스킷배달}
                />
            );
        case 8347:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={우주적통찰력}
                />
            );
        case 8410:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={쾌속접근}
                />
            );
        case 8352:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={시간왜곡물약}
                />
            );
        case 8400:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={결의}
                />
            );
        case 8437:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={착취의손아귀}
                />
            );
        case 8439:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={여진}
                />
            );
        case 8465:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={수호자}
                />
            );
        case 8446:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={철거}
                />
            );
        case 8463:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={생명의샘}
                />
            );
        case 8401:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={보호막강타}
                />
            );
        case 8429:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={사전준비}
                />
            );
        case 8444:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={재생의바람}
                />
            );
        case 8473:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={뼈방패}
                />
            );
        case 8451:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={과잉성장}
                />
            );
        case 8453:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={소생}
                />
            );
        case 8242:
            return(
                <Image
                    style={style || ImageSize.rune}
                    source={불굴의의지}
                />
            );
    }
};