import { client } from './client';
import { client2 } from './client2';
import { dataClient } from './dataClient';
import { VERSION_URL, DEVELOPMENT_API_KEY } from '@env';

export async function getCurrentVersion() {
    try {    
        const response = await client.get(VERSION_URL);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
    }
}

export async function getChampionInfo(version) {
    try {    
        const response = await dataClient.get(`${version}/data/ko_KR/champion.json`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
    }
}
export async function getSpellInfo(version) {
    try {    
        const response = await dataClient.get(`${version}/data/en_US/summoner.json`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
    }
}
export async function getItemInfo(version) {
    try {    
        const response = await dataClient.get(`${version}/data/ko_KR/item.json`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
    }
}

export async function findUserInfo(user) {
    try {    
        const response = await client.get(`/summoner/v4/summoners/by-name/${user}`, {
            headers: {
                "X-Riot-Token": DEVELOPMENT_API_KEY,
            }
        });
        return response;
    } catch (error) {
        return { status: 404}
    }
}

export async function getUserRankInfo(id) {
    try {    
        const response = await client.get(`/league/v4/entries/by-summoner/${id}`, {
            headers: {
                "X-Riot-Token": DEVELOPMENT_API_KEY,
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export async function checkPlayingGame(id) {
    try {    
        const response = await client.get(`/spectator/v4/active-games/by-summoner/${id}`, {
            headers: {
                "X-Riot-Token": DEVELOPMENT_API_KEY,
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export async function getUserMatchId(puuid, count) {
    try {    
        const response = await client2.get(`/matches/by-puuid/${puuid}/ids?start=0&count=${count}`, {
            headers: {
                "X-Riot-Token": DEVELOPMENT_API_KEY,
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export async function getMatchData(matchId) {
    try {    
        const response = await client2.get(`/matches/${matchId}`, {
            headers: {
                "X-Riot-Token": DEVELOPMENT_API_KEY,
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}