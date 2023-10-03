const { ai, organization } = require("../config.json");

// const openai = require("openai");

// // OpenAI API 키 설정
// const openaiInstance = new openai({ apiKey: ai });

// // 요청할 데이터 설정
// const prompt = "오늘 저녁 추천";

// const runAPI = async () => {
//   await openaiInstance.completions
//     .create({
//       model: "gpt-3.5-turbo-0613", // 엔진 선택
//       prompt: prompt,
//       max_tokens: 100,
//     })
//     .then((response) => {
//       const answer = response.choices[0].text;
//       console.log("Answer:", answer);
//       console.log("Answer:", response.usage);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// module.exports = {
//   runAPI,
// };

/*

openai api token -> heroku
process.env.OPENAI

*/
const axios = require("axios");
const runAPI = async (command, message) => {
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `지금부터 부정적이고 사회에 적응하지 못하는 사람처럼 대답해줘`,
          },
          {
            role: "user",
            content: `${command}`,
          },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI}`,
          "x-ratelimit-limit-requests": "400",
        },
      }
    )
    .then((response) => {
      console.log(response.data.choices[0].message.content);

      const limit = response.headers["x-ratelimit-limit-requests"];
      const current = response.headers["x-ratelimit-remaining-requests"];
      const answer = response.data.choices[0].message.content;
      const useToken = response.data.usage.total_tokens;

      message.reply(`${answer} - ${current}/${limit}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

const infoAPI = async (message) => {
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `정보`,
          },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI}`,
        },
      }
    )
    .then((response) => {
      console.log("response.headers", response.headers);
      console.log("response.headers", response.headers);
      console.log(response.data.choices[0].message.content);

      const limit = response.headers["x-ratelimit-limit-requests"];
      const current = response.headers["x-ratelimit-remaining-requests"];
      const time = response.headers["x-ratelimit-reset-requests"];

      const hisotryEmbed = {
        color: 0xff0000,
        title: "모대요 봇 정보",
        fields: [
          {
            name: "x-ratelimit-limit-requests",
            value: `${limit}`,
            inline: false,
          },
          {
            name: "x-ratelimit-remaining-requests",
            value: `${current}`,
            inline: false,
          },
          {
            name: "x-ratelimit-reset-requests",
            value: `${time}`,
            inline: false,
          },
        ],
      };

      message.channel.send({ embeds: [hisotryEmbed] });
    })
    .catch((error) => {
      console.error(error);
    });
};

const runAPI_dictionary = async (command, message) => {
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: command,
          },
        ],
        max_tokens: 2000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI}`,
          "x-ratelimit-limit-requests": "400",
        },
      }
    )
    .then((response) => {
      console.log(response.data.choices[0].message.content);

      const limit = response.headers["x-ratelimit-limit-requests"];
      const current = response.headers["x-ratelimit-remaining-requests"];
      const answer = response.data.choices[0].message.content;
      const useToken = response.data.usage.total_tokens;

      message.reply(`${answer} - ${current}/${limit}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  runAPI,
  infoAPI,
  runAPI_dictionary,
};
