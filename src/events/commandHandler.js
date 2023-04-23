const { Message } = Discord = require("discord.js");
const client = global.bot;

/**
 * 
 * @param {Message} message 
 *
**/

module.exports =  async (message) => {
  try 
  {
    let prefix = Config.System.Prefix.find((x) => message.content.toLowerCase().startsWith(x));
    if (message.author.bot || !prefix || !message.channel || message.channel.type == "dm") return;
    let args = message.content.substring(prefix.length).split(" ");
    let Komutcuklar = args[0];
    let bot = message.client;
    args = args.splice(1);
    let calistirici;
    if (bot.Komut.has(Komutcuklar)) {
      calistirici = bot.Komut.get(Komutcuklar);
      calistirici.onRequest(bot, message, args);
    } else if (bot.Komutlar.has(Komutcuklar)) {
      calistirici = bot.Komutlar.get(Komutcuklar);
      calistirici.onRequest(bot, message, args);
    }
  }
  catch (e) {
    console.log(`Events ${module.exports.Config.Event}\nHata: ${e}`);
  }
}

module.exports.Config = {
  Event: "messageCreate"
}