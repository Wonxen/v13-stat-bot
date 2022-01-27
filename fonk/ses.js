//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
const client = global.client

const svoice = require('../schema/a-ses');
const svoicep = require('../schema/parent-ses');
const starih = require('../schema/tarih');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async (oldState, newState) => {

const msunucu = newState.guild

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
  
if (!oldState.channelID && newState.channelID) {
  await starih.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
}

const starihdata = await starih.findOne({ userID: oldState.id });

if (!starihdata) {
  await starih.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
}

const data = Date.now() - starihdata.date;

if (oldState.channelID && !newState.channelID) {
  await datakayit(oldState, oldState.channel, data);
  await starih.deleteOne({ userID: oldState.id });
} else if (oldState.channelID && newState.channelID) {
  await datakayit(oldState, oldState.channel, data);
  await starih.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
}

async function datakayit(user, channel, data) {
  await svoice.findOneAndUpdate({ sunucuid: user.guild.id, kulid: user.id }, { $inc: { gunluk: data, haftalik: data, aylik: data } }, { upsert: true });
  await svoicep.findOneAndUpdate({ sunucuid: user.guild.id, kulid: user.id, kanalid: channel.id}, { $inc: { gunluk: data, haftalik: data, aylik: data } }, { upsert: true });
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = {
  name: "voiceStateUpdate"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------