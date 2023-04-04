import React, { useEffect, useState, useCallback } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { DATA_URL } from '@env';
import { getCurrentVersion, getChampionInfo, getSpellInfo } from "../../API/API";
import Color from "../../styles/Color";
import queue from "../../data/queue";
import { BannedChampions, StartTime, handleMoreInfo, inGameInfo, getInGameData } from "../../function/function";

export default ({ route }) => {
    const user = route.params;
    const [name, setName] = useState("");

    const [version, setVersion] = useState("");
    const [champion, setChampion] = useState("");
    const [spell, setSpell] = useState("");
    const [inGameData, setInGameData] = useState();
    const [time, setTime] = useState(0);

    const [showMoreInfo, setShowMoreInfo] = useState(["none", "none", "none", "none", "none"]);

    const getAllGameData = useCallback(async (version, data) => {
        const response = await getChampionInfo(version);
        const response2 = await getSpellInfo(version);
        getInGameData(response.data, response2.data, data, setInGameData, setTime);

        setChampion(response.data);
        setSpell(response2.data);
    }, []);

    const getVersion = useCallback(async (data) => {
        const response = await getCurrentVersion();
        getAllGameData(response[0], data);
        setVersion(response[0]);
    }, []);

    useEffect(() => {
        getVersion(user.data)
        setName(user.name);
    }, [])

    useEffect(() => {
        const id = setInterval(() => {
            setTime(time => time + 1);
        }, 1000);
        return () => clearInterval(id);
    }, [time]);

    return (
        <SafeAreaView style={styles.container}>
            {
                inGameData &&
                <ScrollView style={styles.scrollView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{inGameData.description}</Text>
                        <Text style={styles.title}> | </Text>
                        <Text style={styles.title}>{inGameData.map}</Text>
                        <Text style={styles.title}> | </Text>
                        <Text style={styles.title}>{StartTime(time)}</Text>
                    </View>

                    <View style={styles.titleView2}>
                        <Text style={styles.blue}>블루</Text>
                        <Text style={styles.title2}>챔프 스코어</Text>
                        <Text style={styles.red}>레드</Text>
                    </View>
                        {
                            inGameData && inGameInfo(inGameData, handleMoreInfo, showMoreInfo, setShowMoreInfo, user.name, version)
                        }
                        {
                            inGameData?.bannedChampions.length === 0 ?
                                <View style={styles.banView2} />
                                :
                                <View style={styles.banView}>
                                    <View style={styles.view2}>
                                        { BannedChampions(inGameData.bannedChampions.blueBan, champion, DATA_URL, version) }
                                    </View>
                                    <View style={styles.view2}>
                                        { BannedChampions(inGameData.bannedChampions.redBan, champion, DATA_URL, version) }
                                    </View>
                                </View>
                        }
                </ScrollView>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: "center",
        justifyContent: "center"
    },
    loading: {
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 1000
    },
    text: {
        color: Color.black,
        fontSize: 30,
        fontWeight: "bold"
    },
    scrollView: {
        flex: 1,
        width: "100%",
        backgroundColor: Color.white
    },
    titleView: {
        flexDirection: "row",
        padding: 5,
        backgroundColor: Color.white,
        borderColor: Color.black,
        borderTopWidth: 1.5,
    },
    titleView2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 5,
        backgroundColor: Color.white,
        borderColor: Color.black,
        borderTopWidth: 1.5,
    },
    title: {
        color: Color.black,
        fontSize: 15,
        fontWeight: "bold"
    },
    title2: {
        flex: 1,
        color: Color.black,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
    },
    blue: {
        flex: 1,
        color: Color.blue,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 15
    },
    red: {
        flex: 1,
        color: Color.red,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
        textAlign: "right",
        marginRight: 15
    },





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
});