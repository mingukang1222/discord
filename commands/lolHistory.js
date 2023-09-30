const { EmbedBuilder } = require("discord.js");
const $api = require("../api/index.js");

const searchHistory = (user, message) => {
  $api
    .getSummoner(user)
    .then((res) => {
      let userData = res.data;
      console.log(userData);
      let userRank = {
        SOLO: {},
        TEAM: {},
        TFT: {},
      };

      $api
        .getSummonerRankData(userData.id)
        .then((res) => {
          if (res) {
            let rankData = res.data;
            console.log(rankData);
            rankData.forEach((e) => {
              if (e.queueType === "RANKED_SOLO_5x5") {
                userRank.SOLO = {
                  value: true,
                  tier: e.tier,
                  rank: e.rank,
                  point: e.leaguePoints,
                  wins: e.wins,
                  losses: e.losses,
                  rate: Math.round((e.wins / (e.wins + e.losses)) * 100),
                  type: "솔로랭크",
                };
              } else if (e.queueType === "RANKED_FLEX_SR") {
                userRank.TEAM = {
                  value: true,
                  tier: e.tier,
                  rank: e.rank,
                  point: e.leaguePoints,
                  wins: e.wins,
                  losses: e.losses,
                  rate: Math.round((e.wins / (e.wins + e.losses)) * 100),
                  type: "자유랭크",
                };
              } else if (e.queueType === "RANKED_TFT_DOUBLE_UP") {
                userRank.TFT = {
                  value: true,
                  tier: e.tier,
                  rank: e.rank,
                  point: e.leaguePoints,
                  wins: e.wins,
                  losses: e.losses,
                  rate: Math.round((e.wins / (e.wins + e.losses)) * 100),
                  type: "TFT(더블업)",
                };
              }
            });
            console.log(userRank);
          }

          const userInfo = {
            profileUrl: `http://ddragon.leagueoflegends.com/cdn/13.19.1/img/profileicon/${userData.profileIconId}.png`,
            userName: userData.name.replace(/(\s*)/g, ""),
            userLv: userData.summonerLevel,
            opggUrl: `https://www.op.gg/summoners/kr/${userData.name.replace(
              /(\s*)/g,
              ""
            )}`,
          };

          const hisotryEmbed = {
            color: 0xff0000,
            title: userInfo.userName,
            url: userInfo.opggUrl,
            author: {
              name: userInfo.userName,
              icon_url: userInfo.profileUrl,
              url: userInfo.opggUrl,
            },
            description: `${userInfo.userLv} 레벨`,
            thumbnail: {
              url: userInfo.profileUrl,
            },
            fields: [
              // {
              //   name: "Regular field title",
              //   value: "Some value here",
              // },
              {
                name: "\u200b",
                value: "\u200b",
                inline: false,
              },
              {
                name: `솔로랭크 - ${userRank.SOLO.tier ?? ""} ${
                  userRank.SOLO.rank ?? "Unranked"
                }`,
                value: `${userRank.SOLO.wins ?? 0}승 ${
                  userRank.SOLO.losses ?? 0
                }패 승률${userRank.SOLO.rate ?? 0}%`,
                inline: true,
              },
              {
                name: `자유랭크 - ${userRank.TEAM.tier ?? ""} ${
                  userRank.TEAM.rank ?? "Unranked"
                }`,
                value: `${userRank.TEAM.wins ?? 0}승 ${
                  userRank.TEAM.losses ?? 0
                }패 승률${userRank.TEAM.rate ?? 0}%`,
                inline: true,
              },
              {
                name: `TFT(D.U) - ${userRank.TFT.tier ?? ""} ${
                  userRank.TFT.rank ?? "Unranked"
                }`,
                value: `${userRank.TFT.wins ?? 0}승 ${
                  userRank.TFT.losses ?? 0
                }패 승률${userRank.TFT.rate ?? 0}%`,
                inline: true,
              },
            ],
            // image: {
            //   url: "https://i.imgur.com/AfFp7pu.png",
            // },
            // timestamp: new Date().toISOString(),
            // footer: {
            //   text: "Some footer text here",
            //   icon_url: "https://i.imgur.com/AfFp7pu.png",
            // },
          };
          message.channel.send({ embeds: [hisotryEmbed] });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  searchHistory,
};
