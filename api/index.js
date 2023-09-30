// import axios from "axios";

const axios = require("axios");

const config = {
  key: "RGAPI-cf1d30d4-36bd-4876-8257-507486aea482",
};

const $api = axios.create({
  baseURL: "https://kr.api.riotgames.com/",
});

const $api_ASIA = axios.create({
  baseURL: "https://asia.api.riotgames.com/",
});

const getSummoner = (name) => {
  console.log(":::::::::::::::", name);
  // 프로필
  return $api.get(
    `/lol/summoner/v4/summoners/by-name/${name}?api_key=${config.key}`
  ); //summonerName
};

const getSummonerRankData = (id) => {
  // 랭크 ['솔랭','자유랭',...]
  return $api.get(
    `/lol/league/v4/entries/by-summoner/${id}?api_key=${config.key}`
  );
};

const getCurrentGame = (id) => {
  // 현재 게임
  return $api.get(
    `/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${config.key}`
  );
};

//ASIA
const getMatchIds = (id, start, count) => {
  // 게임 id
  return $api_ASIA.get(
    `/lol/match/v5/matches/by-puuid/${id}/ids?start=${start}&count=${count}&api_key=${config.key}`
  );
};

const getMatchData = (id) => {
  // 게임 데이터
  return $api_ASIA.get(`/lol/match/v5/matches/${id}?api_key=${config.key}`);
};

module.exports = {
  getSummoner,
  getSummonerRankData,
  getCurrentGame,
  getMatchIds,
  getMatchData,
};
