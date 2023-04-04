import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Animated,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Alert,
    RefreshControl
} from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Color from "../../styles/Color";
import { getCurrentVersion, getChampionInfo, getSpellInfo, findUserInfo, getUserRankInfo, checkPlayingGame, getUserMatchId, getMatchData } from "../../API/API";
import { getRankData, renderItem, showMatchHistory, isCloseToBottom } from "../../function/function";
import ProfileIcon from "../base/ProfileIcon";

export default ({ navigation }) => {
    const [isFlashing, setIsFlashing] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;
    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    const [version, serVersion] = useState("");
    const [champion, setChampion] = useState("");
    const [spell, setSpell] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMatchLoading, setIsMatchLoading] = useState(false);
    const [text, onChangeText] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [userRankInfo, setUserRankInfo] = useState([
        {
            queue: "개인/2인랭크",
            queueType: "RANKED_SOLO_5x5",
            tier: "",
            rank: "",
            leaguePoints: 0,
            wins: 0,
            losses: 0
        },
        {
            queue: "자유 랭크",
            queueType: "RANKED_FLEX_SR",
            tier: "",
            rank: "",
            leaguePoints: 0,
            wins: 0,
            losses: 0
        },
        {
            queue: "TFT 더블업",
            queueType: "RANKED_TFT_DOUBLE_UP",
            tier: "",
            rank: "",
            leaguePoints: 0,
            wins: 0,
            losses: 0
        }]);
    const [match, setMatch] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        searchUserInfoData(text, 20)
        setRefreshing(false);
    }, [text]);
    const getChampionsData = useCallback(async (version) => {
        const response = await getChampionInfo(version);
        setChampion(response);
    }, []);
    const getSpellData = useCallback(async (version) => {
        const response = await getSpellInfo(version);
        setSpell(response.data);
    }, []);
    const getVersion = useCallback(async () => {
        const response = await getCurrentVersion();
        serVersion(response[0]);
        getChampionsData(response[0]);
        getSpellData(response[0]);
    }, []);
    const checkPlaying = async (id) => {
        const response = await checkPlayingGame(id);
        return response;
    }
    const checkPlayingGameData = useCallback(async (id) => {
        const response = await checkPlaying(id);
        const { status } = response;
        if (status === 200) {
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [playing, setPlaying]);

    const searchUserRankInfoData = useCallback(async (id) => {
        const response = await getUserRankInfo(id);
        if (response !== undefined) {
            const { status, data } = response;
            if (status === 200) {
                const rankData = getRankData(data);
                setUserRankInfo(rankData);
                setIsLoading(false);
            }
        }
    }, [userRankInfo, setUserRankInfo]);

    const getMatchInfoData = async (matchIds) => {
        let result = [];
        for (const item of matchIds) {
            const response = await getMatchData(item);
            if (response !== undefined) {
                const { status, data } = response;
                if (status === 200) {
                    result = [...result, data.info];
                }
            }
        }
        setMatch(result);
        setIsMatchLoading(false);
    };

    const getUserMatchIdData = useCallback(async (puuid, count) => {
        let response;
        if (count === undefined) {
            response = await getUserMatchId(puuid, 20);
        } else {
            response = await getUserMatchId(puuid, count);
        }
        if (response !== undefined) {
            const { status, data } = response;
            if (status === 200) {
                getMatchInfoData(data);
            }
        }
    }, [getMatchInfoData]);

    const searchUserInfoData = useCallback(async (id, count) => {
        if (id.length !== 0) {
            setIsLoading(true);
            setIsMatchLoading(true);
            const response = await findUserInfo(id);
            if (response !== undefined) {
                const { status, data } = response;
                if (status === 200) {
                    setUserInfo(data);
                    const { id, puuid } = data;
                    searchUserRankInfoData(id);
                    checkPlayingGameData(id)
                    if (count === undefined) {
                        getUserMatchIdData(puuid, 20);
                    } else {
                        getUserMatchIdData(puuid, count);
                    }
                } else {
                    Alert.alert("존재하지 않는 소환사입니다.", "소환사 아이디를 확인해주세요!", [
                        {
                            text: "확인"
                        }
                    ]);
                    setIsLoading(false);
                }
            }
        }
    }, [text, setUserInfo, searchUserRankInfoData]);

    useEffect(() => {
        getVersion();
    }, [])

    useEffect(() => {
        if (isFlashing) {
            const interval = setInterval(() => {
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isFlashing, animation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>LOL API</Text>
            </View>

            <View style={styles.searchView}>
                <Icon
                    name={"search"}
                    size={25}
                    color={Color.black} />
                <TextInput
                    style={styles.searchInput}
                    maxLength={20}
                    placeholder={"소환사 검색"}
                    placeholderTextColor={Color.gray}
                    onChangeText={text => onChangeText(text)}
                    onSubmitEditing={() => searchUserInfoData(text)}
                    value={text} />
            </View>
            {
                isLoading === true ?
                    <ActivityIndicator style={styles.loading} color={Color.black} size={"large"} />
                    :
                    userInfo &&
                    <>
                        <ScrollView
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    console.log("스크롤뷰 끝!");
                                    // if(match.length === 40) {
                                    //     Alert.alert("알림.", "전적은 40개까지만 확인할 수 있습니다!", [
                                    //         {
                                    //             text: "확인"
                                    //         }
                                    //     ]);
                                    //     return;
                                    // }
                                    // searchUserInfoData(userInfo.name, 40);
                                }
                            }}
                            scrollEventThrottle={0}
                            style={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh} />
                            }>
                            <View style={styles.userInfoView}>
                                <View style={styles.userIconView}>
                                    <ProfileIcon
                                        style={styles.userIcon}
                                        version={version}
                                        profileIcon={userInfo.profileIconId} />
                                    {
                                        playing &&
                                        <Animated.View
                                            style={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: 20,
                                                position: "absolute",
                                                bottom: 0,
                                                paddingHorizontal: 5,
                                                opacity: opacity,
                                                borderWidth: 3,
                                                borderColor: Color.playingGame
                                            }} />
                                    }
                                    <View style={styles.userIconTextView}>
                                        <Text style={styles.userIconText}>{userInfo.summonerLevel}</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.userName}>{userInfo.name}</Text>
                                </View>

                            </View>

                            <TouchableOpacity
                                style={playing === false ? styles.inGameView : styles.inGameView2}
                                onPress={async () => {
                                    const response = await checkPlaying(userInfo.id)
                                    const { status, data } = response;
                                    if (status === 200) {
                                        setPlaying(true);
                                        navigation.navigate("인게임 정보", { name: userInfo.name, data: data });
                                    } else {
                                        setPlaying(false);
                                        Alert.alert("알림", userInfo.name + "님은 게임 중이 아닙니다.", [
                                            {
                                                text: "확인"
                                            }
                                        ]);
                                    }
                                }}>
                                <Text style={styles.inGameText}>인게임</Text>
                            </TouchableOpacity>

                            <FlatList
                                style={styles.rankView}
                                keyExtractor={item => item.queueType}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItem}
                                data={userRankInfo} />
                            {
                                isMatchLoading === true ?
                                <Text style={styles.matchLoading}>전적 로딩중...</Text>
                                :
                                match && showMatchHistory(match, userInfo.name, spell, version)
                            }
                        </ScrollView>
                    </>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: "center",
    },
    titleView: {
        width: "100%",
        paddingTop: "2%",
        paddingHorizontal: "5%"
    },
    title: {
        color: Color.black,
        fontSize: 30,
        fontWeight: "bold"
    },
    searchView: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "5%",
        paddingHorizontal: "2%",
        backgroundColor: Color.white,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: Color.black,
    },
    searchInput: {
        width: "100%",
        height: 50,
        marginLeft: 10,
        color: Color.black,
        fontSize: 15
    },
    userInfoView: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "5%",
        marginHorizontal: "5%"
    },
    userInfoView2: {
        flexDirection: "row",
    },
    userIconView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    userName: {
        color: Color.black,
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 10
    },
    userTier: {
        color: Color.black,
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10
    },
    userIcon: {
        width: 70,
        height: 70,
        borderRadius: 20,
    },
    userIcon2: {
        width: 70,
        height: 70,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Color.playingGame
    },
    userIconTextView: {
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 5,
        borderRadius: 7,
        backgroundColor: Color.black
    },
    userIconText: {
        color: Color.white,
        fontSize: 15,
        fontWeight: "bold"
    },
    loading: {
        position: "absolute",
        top: 0,
        bottom: 0
    },
    scrollView: {
        flex: 1,
        width: "100%",
        backgroundColor: Color.white
    },
    inGameView: {
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        paddingVertical: "4%",
        backgroundColor: Color.gray
    },
    inGameView2: {
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        paddingVertical: "4%",
        backgroundColor: Color.playingGame
    },
    inGameText: {
        color: Color.white,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    matchLoading: { flex: 1, color: Color.black, textAlign: "center", fontSize: 20, fontWeight: "bold" },
    rankView: {
        flex: 1,
        marginHorizontal: "5%",
        marginTop: "5%",
        marginBottom: "4%"
    },
});