const { Message } = Discord = require("discord.js");
const client = global.bot;

const schat = require('../database/a-chat');
const schatp = require('../database/parent-chat');
const sxp = require('../database/xp');

/**
 * 
 * @param {Message} message 
 *
**/

module.exports =  async (message) => {
  try 
  {
    if (message.author.bot || !message.channel || message.channel.type == "dm") return;

    await schat.findOneAndUpdate({ sunucuid: message.guild.id, kulid: message.author.id }, { $inc: { gunluk: 1, haftalik: 1, aylik: 1 } }, { upsert: true });
    await schatp.findOneAndUpdate({ sunucuid: message.guild.id, kulid: message.author.id, kanalid: message.channel.id}, { $inc: { gunluk: 1, haftalik: 1, aylik: 1 } }, { upsert: true });
    await sxp.findOneAndUpdate({ sunucuid: message.guild.id, kulid: message.author.id }, { $inc: { xpdata: 1 } }, { upsert: true });
  }
  catch (e) {
    console.log(`Events ${module.exports.Config.Event}\nHata: ${e}`);
  }
}

module.exports.Config = {
  Event: "messageCreate"
}