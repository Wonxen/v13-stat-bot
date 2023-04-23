const { joinVoiceChannel } = require("@discordjs/voice");
const { CronJob } = require("cron");
const client = global.bot;

const schat = require('../database/a-chat');
const schatp = require('../database/parent-chat');
const svoice = require('../database/a-ses');
const svoicep = require('../database/parent-ses');

/**
 * 
 * @param {Ready} ready 
 *
**/

module.exports = async () => {
    try 
    {
    const Voice = client.channels.cache.get(Config.Bot.Voice);
    joinVoiceChannel({ channelId: Voice.id, guildId: Voice.guild.id, adapterCreator: Voice.guild.voiceAdapterCreator, selfDeaf: true, selfMute: true});

    const gunlukm = new CronJob("0 0 * * *", () => {
        client.guilds.cache.forEach(async (guild) => {
          await svoicep.findOneAndUpdate({ sunucuid: guild.id}, { $set: { gunluk: 0 } });
          await svoice.findOneAndUpdate({ sunucuid: guild.id}, { $set: { gunluk: 0 } });
          await schatp.findOneAndUpdate({ sunucuid: guild.id}, { $set: { gunluk: 0 } });
          await schat.findOneAndUpdate({ sunucuid: guild.id}, { $set: { gunluk: 0 } });
        });
    }, null, true, "Europe/Istanbul");
    gunlukm.start();

    const haftalikm = new CronJob("0 0 * * 0", () => {
        client.guilds.cache.forEach(async (guild) => {
          await svoicep.findOneAndUpdate({ sunucuid: guild.id}, { $set: { haftalik: 0 } });
          await svoice.findOneAndUpdate({ sunucuid: guild.id}, { $set: { haftalik: 0 } });
          await schatp.findOneAndUpdate({ sunucuid: guild.id}, { $set: { haftalik: 0 } });
          await schat.findOneAndUpdate({ sunucuid: guild.id}, { $set: { haftalik: 0 } });
        });
    }, null, true, "Europe/Istanbul");
    haftalikm.start();

    const aylikm = new CronJob('0 0 0 * * 1', () => {
        client.guilds.cache.forEach(async (guild) => {
          await svoicep.findOneAndUpdate({ sunucuid: guild.id}, { $set: { aylik: 0 } });
          await svoice.findOneAndUpdate({ sunucuid: guild.id}, { $set: { aylik: 0 } });
          await schatp.findOneAndUpdate({ sunucuid: guild.id}, { $set: { aylik: 0 } });
          await schat.findOneAndUpdate({ sunucuid: guild.id}, { $set: { aylik: 0 } });
        });
    }, null, true, "Europe/Istanbul")
    aylikm.start();
    }
    catch (e) {
        console.log(`Events ${module.exports.Config.Event}\nHata: ${e}`);
    }
}

module.exports.Config = {
    Event: "ready",
};
  