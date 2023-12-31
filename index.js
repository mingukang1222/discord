const {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
  Discord,
  EmbedBuilder,
} = require("discord.js");
const { token, prefix } = require("./config.json");
const cm = require("./commands/common.js");
const ai = require("./commands/openai.js");
const { searchHistory } = require("./commands/lolHistory.js");
const { setCountChat, getChatData } = require("./commands/countChat.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("ready", () => {
  client.user.setActivity(`잘 못`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return false;

  await setCountChat(message);

  const msg = message.content;

  let isCommand = msg.indexOf(prefix) === 0;

  if (isCommand) {
    const command = msg.split(" ");
    const mainCommand = command[0].slice(1, msg.length);

    // 띄어쓰기 이후 모든 텍스트
    const spaceIdx = msg.indexOf(" ");
    const subCommand = msg.slice(spaceIdx + 1);

    console.log(mainCommand, "-", subCommand);

    //message.mentions

    switch (mainCommand) {
      case "모대요":
        message.reply(`${message.author.globalName} ${new Date()}`);
        break;
      case "랜덤":
        message.reply(`${cm.random(subCommand ?? "1~10")}`);
        break;
      case "롤":
        searchHistory(subCommand, message);
        break;
      case "질문":
        ai.runAPI_dictionary(subCommand, message);
        break;
      case "예은아":
        ai.runAPI(subCommand, message);
        break;
      case "테스트":
        ai.runAPI(subCommand, message);
        break;
      case "info":
        ai.infoAPI(message);
        break;
      case "dm":
        console.log(client.users.UserManager);
        const channelId = message.channelId;
        console.log(message);
        break;
      case "채팅":
        getChatData(message);
        break;
    }
  }
});

client.login(process.env.TOKEN);
//process.env.TOKEN
