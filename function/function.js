import React from "react";
import {
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { DATA_URL } from '@env';
import queue from "../data/queue";
import Champion from "../View/base/Champion"
import Spell1 from "../View/base/Spell";
import Spell2 from "../View/base/Spell";
import Rune from "../View/base/Rune";
import Unranked from "../View/base/Unranked";
import Iron from "../View/base/Iron";
import Bronze from "../View/base/Bronze";
import Silver from "../View/base/Silver";
import Gold from "../View/base/Gold";
import Platinum from "../View/base/Platinum";
import Diamond from "../View/base/Diamond";
import Master from "../View/base/Master";
import GrandMaster from "../View/base/GrandMaster";
import Challenger from "../View/base/Challenger";
import ImageSize from "../styles/ImageSize";
import ProfileIcon from "../View/base/ProfileIcon";
import StatModes from "../View/base/StatModes";

const rankData = [{
    queue: "개인/2인랭크",
    queueType: "RANKED_SOLO_5x5",
    tier: "Unranked",
    rank: "",
    leaguePoints: 0,
    wins: 0,
    losses: 0
}, 
{
    queue: "자유 랭크",
    queueType: "RANKED_FLEX_SR",
    tier: "Unranked",
    rank: "",
    leaguePoints: 0,
    wins: 0,
    losses: 0
},
{
    queue: "TFT 더블업",
    queueType: "RANKED_TFT_DOUBLE_UP",
    tier: "Unranked",
    rank: "",
    leaguePoints: 0,
    wins: 0,
    losses: 0
}];

export function getRankData(data) {
    const result = rankData.slice();
    const length = data.length;
    if (length === 0) {
        return result;
    } else {
        result.forEach((item, idx) => {
            const { queueType } = item;
            data.forEach(item2 => {
                if(queueType === item2.queueType) {
                    if(item2.queueType === "RANKED_SOLO_5x5") {
                        item2.queue = "개인/2인랭크";
                    }
                    if(item2.queueType === "RANKED_FLEX_SR") {
                        item2.queue = "자유 랭크";
                    }
                    if(item2.queueType === "RANKED_TFT_DOUBLE_UP") {
                        item2.queue = "TFT 더블업";
                    }
                    result[idx] = item2;
                }
            })
        })  
        return result;     
    }
}

export function getRankImage(rankData) {
    const { tier } = rankData;
    switch (tier) {
        case "IRON":
            return <Iron style={ImageSize.emblem} />;
        case "BRONZE":
            return <Bronze style={ImageSize.emblem} />;
        case "SILVER":
            return <Silver style={ImageSize.emblem} />;
        case "GOLD":
            return <Gold style={ImageSize.emblem} />;
        case "PLATINUM":
            return <Platinum style={ImageSize.emblem} />;
        case "DIAMOND":
            return <Diamond style={ImageSize.emblem} />;
        case "MASTER":
            return <Master style={ImageSize.emblem} />;
        case "GRANDMASTER":
            return <GrandMaster style={ImageSize.emblem} />;
        case "CHALLENGER":
            return <Challenger style={ImageSize.emblem} />;
    }
}

export const BannedChampions = (data, champion, URL, version) => {
    const result = data.map((item) => {
        const championName = Object.keys(champion).find(
            (champ) => champion[champ].key == item.championId
        );
        return (
            <Image
                key={item.pickTurn}
                style={ImageSize.bannedChamp}
                source={{
                    uri: `${URL}${version}/img/champion/${championName}.png`,
                }}
            />
        );
    });
    return result;
}

export const checkDraw = (startTime, endTime) => {
    const time = endTime - startTime;
    const result = new Date(time);
    const minutes = result.getMinutes();
    return (minutes);
}

export const killStreaks = (data) => {
    const { doubleKills, tripleKills, quadraKills, pentaKills } = data;
    const killObject = { "펜타킬": pentaKills, "쿼드라킬": quadraKills, "트리플킬": tripleKills, "더블킬": doubleKills };
    const myKill = Object.keys(killObject).find((kill, idx)=> {
        if(killObject[Object.keys(killObject)[idx]] > 0)
            return kill;
    });
    if(myKill === undefined) {
        return null;
    } else {
        return (
            <Text style={styles.killStreaks}>{myKill}</Text>
        )
    }
}

export const EndTime = (startTime, endTime) => {
    const time = endTime - startTime;
    const result = new Date(time);
    let minutes = result.getMinutes();
    if(minutes < 10)
        minutes = "0" + minutes;
    let seconds = result.getSeconds();
    if(seconds < 10)
        seconds = "0" + seconds;
    return (
        <Text style={{ textAlign: "center", fontSize: 15 }}>{`${minutes}:${seconds}`}</Text>
    );
}

export const beforeCurrentTime = (endTime) => {
    const currentTime = new Date();
    const time = new Date(endTime);
    const diffSec = currentTime.getTime() - time.getTime();
    const day = diffSec / (24 * 60 * 60 * 1000);
    const hours = diffSec / (60 * 60 * 1000);
    const minutes = diffSec / (60 * 1000);
    const seconds = diffSec / 1000;
    if (day >= 1)
        return `${Math.floor(day)}일`;
    if (hours >= 1 && hours < 24)
        return `${Math.floor(hours)}시간`;
    if (minutes >= 1 && minutes < 60)
        return `${Math.floor(minutes)}분`;
    if (seconds >= 1 && seconds < 60)
        return `${Math.floor(seconds)}초`;
}

export const renderItem = ({ item, idx }) => {
    return (
        <View style={idx === 2 ? styles.rankView2_1 : styles.rankView2}>
            {
                item.tier === "Unranked" ?
                    <Unranked style={ImageSize.emblem} />
                    :
                    getRankImage(item)
            }
            <View style={styles.rankView3}>
                <Text style={styles.rankTitle}>{item.queue}</Text>

                <Text style={styles.rankContent}>{item.tier + " " + item.rank}</Text>
                <Text style={styles.rankContent}>{item.leaguePoints + " LP"}</Text>
                <View style={styles.rankView4}>
                    <Text style={styles.rankContent}>{item.wins + "승 " + item.losses + "패"}</Text>
                    <Text style={styles.rankContent2}>{item.wins + item.losses < 2 ? "(0%)" : "(" + Math.round((item.wins / (item.wins + item.losses)) * 100) + "%)"}</Text>
                </View>
            </View>
        </View>
    )
} 

export const Item = (data, version) => {
    const { item0, item1, item2, item3, item4, item5, item6 } = data;
    const result = [item0, item1, item2, item3, item4, item5, item6];
    const result2 = result.map((item, index) => {
        if (item !== 0) {
            return (
                <Image
                    key={index}
                    style={ImageSize.item}
                    source={{
                        uri: `${DATA_URL}${version}/img/item/${item}.png`,
                    }}
                />
            );
        }
    });
    return result2;
}

export const showMatchHistory = (match, name, spell, version) => {
    const matchHistory = match.map((item, index) => {
        const findQueue = queue.find(queue => queue.queueId === item.queueId);
        const myInfo = item.participants.find((item2) => item2.summonerName === name);
        const spellName1 = Object.keys(spell).find((spe) => spell[spe].key == String(myInfo.summoner1Id));
        const spellName2 = Object.keys(spell).find((spe) => spell[spe].key == String(myInfo.summoner2Id));
        return (
            <TouchableOpacity key={index} style={styles.matchView}>
                {
                    myInfo.win === true ?
                        <View style={styles.winView}>
                            <View style={styles.view4}>
                                <Text style={styles.resultText}>승</Text>
                                {EndTime(item.gameStartTimestamp, item.gameEndTimestamp)}
                            </View>
                        </View>
                        :
                        checkDraw(item.gameStartTimestamp, item.gameEndTimestamp) < 4 ?
                            <View style={styles.drawView}>
                                <View style={styles.view4}>
                                    <Text style={styles.resultText}>무</Text>
                                    {EndTime(item.gameStartTimestamp, item.gameEndTimestamp)}
                                </View>
                            </View>
                            :
                            <View style={styles.defeatView}>
                                <View style={styles.view4}>
                                    <Text style={styles.resultText}>패</Text>
                                    {EndTime(item.gameStartTimestamp, item.gameEndTimestamp)}
                                </View>
                            </View>
                }
                <View style={styles.matchView2}>
                    <View style={styles.view2}>
                        <Champion style={ImageSize.userChamp} URL={DATA_URL} version={version} champion={myInfo.championName} />
                        <View>
                            <Spell1 style={ImageSize.spell} URL={DATA_URL} version={version} spell={spellName1} />
                            <Spell2 style={ImageSize.spell} URL={DATA_URL} version={version} spell={spellName2} />
                        </View>

                        <View>
                            <View style={styles.runeView}>
                                <Rune style={ImageSize.spell} rune={myInfo.perks.styles[0].selections[0].perk} />
                            </View>

                            <View style={styles.runeView}>
                                <Rune style={ImageSize.spell} rune={myInfo.perks.styles[1].style} />
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 10 }}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: Color.white }}>{`${myInfo.kills} / ${myInfo.deaths} / ${myInfo.assists}`}</Text>
                            {
                                myInfo.challenges.killParticipation === undefined ?
                                <Text style={{ textAlign: "center", fontSize: 15, color: Color.white }}>{`킬 관여 0%`}</Text>
                                :
                                <Text style={{ textAlign: "center", fontSize: 15, color: Color.white }}>{`킬 관여 ${Math.round(myInfo.challenges.killParticipation * 100)}%`}</Text>
                            }
                        </View>

                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15, color: Color.white }}>{findQueue.description}</Text>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15, color: Color.white }}>{beforeCurrentTime(item.gameEndTimestamp)} 전</Text>
                        </View>

                    </View>

                    <View style={styles.view3}>
                        {Item(myInfo, version)}
                        {killStreaks(myInfo)}
                    </View>
                </View>
            </TouchableOpacity>
        )
    })
    return matchHistory;
}

export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export const StartTime = (time) => {
    const currentTime = Date.now();
    const result = currentTime - time;
    let minutes = Math.floor(result / 60000);
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = ((result % 60000) / 1000).toFixed(0);
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return (
        <Text style={styles.title}>{`${minutes}:${seconds}`}</Text>
    );
}

export const handleMoreInfo = (idx, showMoreInfo, setShowMoreInfo) => {
    const newData = showMoreInfo.slice();
    switch (idx) {
        case 0:
            if (newData[0] === "flex")
                newData[0] = "none";
            else
                newData[0] = "flex";
            setShowMoreInfo(newData);
            break;
        case 1:
            if (newData[1] === "flex")
                newData[1] = "none";
            else
                newData[1] = "flex";
            setShowMoreInfo(newData);
            break;
        case 2:
            if (newData[2] === "flex")
                newData[2] = "none";
            else
                newData[2] = "flex";
            setShowMoreInfo(newData);
            break;
        case 3:
            if (newData[3] === "flex")
                newData[3] = "none";
            else
                newData[3] = "flex";
            setShowMoreInfo(newData);
            break;
        case 4:
            if (newData[4] === "flex")
                newData[4] = "none";
            else
                newData[4] = "flex";
            setShowMoreInfo(newData);
            break;
    }
}

export const getInGameData = (champion, spell, data, setInGameData, setTime) => {
    const { gameQueueConfigId } = data;
    const participants = data.participants.map(item => {
        const championName = Object.keys(champion).find((champ) => champion[champ].key == item.championId);
        const spellName1 = Object.keys(spell).find((spe) => spell[spe].key == item.spell1Id);
        const spellName2 = Object.keys(spell).find((spe) => spell[spe].key == item.spell2Id);
        return {
            ...item,
            name: championName,
            spell1: spellName1,
            spell2: spellName2
        };
    });
    const result = {
        ...data,
        participants: participants
    }
    const blueTeam = result.participants.filter((item) => item.teamId == 100);
    const redTeam = result.participants.filter((item) => item.teamId != 100);
    result.participants = {
        blueTeam,
        redTeam,
    };
    if (result.bannedChampions.length !== 0) {
        const blueBan = result.bannedChampions.filter((item) => item.teamId == 100);
        const redBan = result.bannedChampions.filter((item) => item.teamId != 100);
        result.bannedChampions = {
            blueBan,
            redBan,
        };
    }
    
    queue.find(item => {
        if (gameQueueConfigId === item.queueId) {
            result.map = item.map;
            result.description = item.description;
            setInGameData(result);
            setTime(result.gameStartTime);
        }
    });
};

export const inGameInfo = (inGameData, handleMoreInfo, showMoreInfo, setShowMoreInfo, name, version) => {
    const result = inGameData?.participants?.blueTeam?.map((item, idx) => {
        return (
            <React.Fragment key={item.summonerName}>
                <TouchableOpacity style={styles.userView} onPress={() => handleMoreInfo(idx, showMoreInfo, setShowMoreInfo)}>
                    <View style={styles.iconView}>
                        <Icon
                            name={showMoreInfo[idx] === "none" ? "downcircle" : "upcircle"}
                            size={25}
                            color={Color.black} />
                    </View>

                    <View style={styles.blueTeamView}>
                        <View style={styles.view2}>
                            {
                                item.summonerName === name ?
                                    <View style={styles.userView2}>
                                        <Champion style={ImageSize.userChamp} URL={DATA_URL} version={version} champion={item.name} />
                                    </View>
                                    :
                                    <Champion style={ImageSize.userChamp} URL={DATA_URL} version={version} champion={item.name} />
                            }
                            <View>
                                <Spell1 style={ImageSize.spell} URL={DATA_URL} version={version} spell={item.spell1} />
                                <Spell2 style={ImageSize.spell} URL={DATA_URL} version={version} spell={item.spell2} />
                            </View>

                            <View>
                                <View style={styles.runeView}>
                                    <Rune style={ImageSize.spell} rune={item.perks.perkIds[0]} />
                                </View>

                                <View style={styles.runeView}>
                                    <Rune style={ImageSize.spell} rune={item.perks.perkSubStyle} />
                                </View>

                            </View>

                        </View>
                        <Text style={styles.title}>{item.summonerName}</Text>
                    </View>

                    <View style={styles.redTeamView}>
                        <View style={styles.view2}>
                            <View>
                                <View style={styles.runeView}>
                                    <Rune style={ImageSize.spell} rune={inGameData.participants.redTeam[idx].perks.perkIds[0]} />
                                </View>
                                <View style={styles.runeView}>
                                    <Rune style={ImageSize.spell} rune={inGameData.participants.redTeam[idx].perks.perkSubStyle} />
                                </View>
                            </View>

                            <View>
                                <Spell1 style={ImageSize.spell} URL={DATA_URL} version={version} spell={inGameData.participants.redTeam[idx].spell1} />
                                <Spell2 style={ImageSize.spell} URL={DATA_URL} version={version} spell={inGameData.participants.redTeam[idx].spell2} />
                            </View>
                            {
                                inGameData.participants.redTeam[idx].summonerName === name ?
                                    <View style={styles.userView2}>
                                        <Champion style={ImageSize.userChamp} URL={DATA_URL} version={version} champion={inGameData.participants.redTeam[idx].name} />
                                    </View>
                                    :
                                    <Champion style={ImageSize.userChamp} URL={DATA_URL} version={version} champion={inGameData.participants.redTeam[idx].name} />
                            }
                        </View>

                        <Text style={styles.title}>{inGameData.participants.redTeam[idx].summonerName}</Text>
                    </View>
                </TouchableOpacity>
                {/* 룬 상세 페이지 */}
                <View style={{ display: showMoreInfo[idx], backgroundColor: Color.white }}>
                    <View style={styles.profileIconView}>
                        <ProfileIcon style={ImageSize.icon} version={version} profileIcon={item.profileIconId} />
                        <Text style={styles.title}>{item.summonerName}</Text>
                    </View>

                    <View style={styles.runeView2}>

                        <View style={styles.view2}>
                            <Rune rune={item.perks.perkStyle} />
                            <Rune rune={item.perks.perkIds[0]} />
                            <Rune rune={item.perks.perkIds[1]} />
                            <Rune rune={item.perks.perkIds[2]} />
                            <Rune rune={item.perks.perkIds[3]} />
                        </View>
                        <View style={styles.view2}>
                            <Rune rune={item.perks.perkSubStyle} />
                            <Rune rune={item.perks.perkIds[4]} />
                            <Rune rune={item.perks.perkIds[5]} />
                        </View>
                        <View style={styles.view2}>
                            <StatModes style={ImageSize.stats} stats={item.perks.perkIds[6]} />
                            <StatModes style={ImageSize.stats} stats={item.perks.perkIds[7]} />
                            <StatModes style={ImageSize.stats} stats={item.perks.perkIds[8]} />
                        </View>

                    </View>

                    <View style={styles.profileIconView2}>
                        <Text style={styles.title}>{inGameData.participants.redTeam[idx].summonerName}</Text>
                        <ProfileIcon style={ImageSize.icon2} version={version} profileIcon={inGameData.participants.redTeam[idx].profileIconId} />
                    </View>

                    <View style={styles.runeView3}>

                        <View style={styles.view2}>
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkIds[3]} />
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkIds[2]} />
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkIds[1]} />
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkIds[0]} />
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkStyle} />

                        </View>
                        <View style={styles.view2}>
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkIds[5]} />
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkIds[4]} />
                            <Rune rune={inGameData.participants.redTeam[idx].perks.perkSubStyle} />

                        </View>
                        <View style={styles.view2}>
                            <StatModes style={ImageSize.stats} stats={inGameData.participants.redTeam[idx].perks.perkIds[8]} />
                            <StatModes style={ImageSize.stats} stats={inGameData.participants.redTeam[idx].perks.perkIds[7]} />
                            <StatModes style={ImageSize.stats} stats={inGameData.participants.redTeam[idx].perks.perkIds[6]} />
                        </View>

                    </View>
                </View>
            </React.Fragment>
        );
    })
    return result;
}

const styles = StyleSheet.create({
    rankView2: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 20
    },
    rankView2_1: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 20,
    },
    rankView3: {
        alignItems: "flex-start",
        justifyContent: "center"
    },
    rankView4: {
        flexDirection: "row",
    },
    rankTitle: {
        color: Color.black,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10
    },
    rankContent: {
        color: Color.black,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10
    },
    rankContent2: {
        color: Color.black,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 2
    },
    matchView: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: Color.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    matchView2: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: Color.black,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    runeView: {
        backgroundColor: Color.black,
        borderRadius: 10
    },
    view2: {
        flexDirection: "row",
        alignItems: "center"
    },
    view3: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    winView: { width: 45, backgroundColor: Color.blue, alignItems: "center" },
    drawView: { width: 45, backgroundColor: Color.draw, alignItems: "center" },
    defeatView: { width: 45, backgroundColor: Color.red, alignItems: "center" },
    view4: { flex: 1, justifyContent: "center" },
    resultText: { textAlign: "center", fontSize: 15 },
    killStreaks: { textAlign: "center", fontWeight: "bold", fontSize: 15, color: Color.red, flex: 1, textAlign: "right" },
    userView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: Color.white,
        borderTopWidth: 1.5,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    iconView: {
        position: "absolute",
        alignItems: "center",
        left: 0,
        right: 0,
        backgroundColor: Color.white
    },
    blueTeamView: {
        alignItems: "flex-start",
    },
    redTeamView: {
        alignItems: "flex-end",
    },
    userView2: {
        borderRadius: 20,
        borderWidth: 2.5,
        borderColor: Color.playingGame,
        marginRight: 1
    },
    runeView: {
        backgroundColor: Color.black,
        borderRadius: 10
    },
    runeView2: {
        backgroundColor: Color.black,
        padding: 10
    },
    runeView3: {
        alignItems: "flex-end",
        backgroundColor: Color.black,
        padding: 10
    },
    profileIconView: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: Color.black,
        borderTopWidth: 1.5,
        padding: 5
    },
    profileIconView2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        borderColor: Color.black,
        borderTopWidth: 1.5,
        padding: 5
    },
    banView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: Color.white,
        borderColor: Color.black,
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5
    },
    banView2: {
        height: 30,
        borderColor: Color.black,
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5
    },
    view2: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        color: Color.black,
        fontSize: 15,
        fontWeight: "bold"
    },
});