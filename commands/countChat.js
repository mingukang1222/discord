const { QuickDB } = require("quick.db");
const db = new QuickDB();

const setCountChat = async (message) => {
  const serverId = message.guildId;
  const chatAwardData = await db.get(`chatAwardData-${serverId}`);
  if (chatAwardData === null) {
    await db.set(`chatAwardData-${serverId}`, {
      chatData: [
        {
          id: message.author.id,
          serverId: message.guildId,
          globalName: message.author.globalName,
          userName: message.author.username,
          count: 1,
        },
      ],
    });
  } else {
    const chatArr = await db.get(`chatAwardData-${serverId}.chatData`);
    let userChatIdx = null;
    const hasUser = chatArr.map((item, idx) => {
      if (item.id === message.author.id) {
        userChatIdx = idx;
        return true;
      } else return false;
    });

    if (hasUser && userChatIdx !== null) {
      await db.add(
        `chatAwardData-${serverId}.chatData[${userChatIdx}].count`,
        1
      );
      userChatIdx = null;
    } else {
      await db.push(`chatAwardData-${serverId}.chatData`, {
        id: message.author.id,
        globalName: message.author.globalName,
        userName: message.author.username,
        count: 1,
      });
    }
    const data = await db.get(`chatAwardData-${serverId}.chatData`);
    console.log(data);
  }
};

const getChatData = async (message) => {
  const serverId = message.guildId;
  const getChatAwardData = await db.get(`chatAwardData-${serverId}.chatData`);
  const sortedArray = getChatAwardData.sort((a, b) => b.count - a.count);
  console.log(sortedArray);

  // {
  //   name: "x-ratelimit-limit-requests",
  //   value: `${limit}`,
  //   inline: false,
  // },
  let hisotryEmbed = {
    color: 0xffff24,
    title: "서버 채팅 순위",
    fields: [],
  };
  sortedArray.forEach((item, idx) => {
    hisotryEmbed.fields.push({
      name: `${idx + 1}위　${item.count}회 　 ${
        item.globalName ?? item.userName
      }`,
      value: `\u200b`,
      inline: false,
    });
  });

  message.channel.send({ embeds: [hisotryEmbed] });
};

module.exports = {
  setCountChat,
  getChatData,
};
