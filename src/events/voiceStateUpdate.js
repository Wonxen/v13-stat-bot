const { joinVoiceChannel } = require("@discordjs/voice");
const client = global.bot;

const svoice = require('../database/a-ses');
const svoicep = require('../database/parent-ses');
const starih = require('../database/tarih');

/**
 * 
 * @param {Ready} ready 
 *
**/

module.exports = async (oldState, newState) => {
    try 
    {
        if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
        if (!oldState.channelId && newState.channelId) {
            await starih.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
        }
        const starihdata = await starih.findOne({ userID: oldState.id });
        if (!starihdata) {
            await starih.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
        }  
        const data = Date.now() - starihdata.date;
        if (oldState.channelId && !newState.channelId) {
            await datakayit(oldState, oldState.channel, data);
            await starih.deleteOne({ userID: oldState.id }, { useFindAndModify: false });
          } else if (oldState.channelId && newState.channelId) {
            await datakayit(oldState, oldState.channel, data);
            await starih.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
          }
    }
    catch (e) {
        
    }
}

async function datakayit(user, channel, data) {
    await svoice.findOneAndUpdate({ sunucuid: user.guild.id, kulid: user.id }, { $inc: { gunluk: data, haftalik: data, aylik: data } }, { upsert: true });
    await svoicep.findOneAndUpdate({ sunucuid: user.guild.id, kulid: user.id, kanalid: channel.id}, { $inc: { gunluk: data, haftalik: data, aylik: data } }, { upsert: true });
}

module.exports.Config = {
    Event: "voiceStateUpdate",
};
