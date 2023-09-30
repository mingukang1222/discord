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
            content: `${command}, 가능한 짧게 대답`,
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
      console.log(response);
      console.log(response.data.choices[0].message.content);
      const answer = response.data.choices[0].message.content;
      const useToken = response.data.usage.total_tokens;

      message.reply(`${answer} - ${useToken}토큰 사용`);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {
  runAPI,
};
