//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
const client = global.client

const schat = require('../schema/a-chat');
const schatp = require('../schema/parent-chat');
const sxp = require('../schema/xp');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async (message) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config
const prefix = ayarlar.Sistem.Prefix
const wonxen = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.Bot.Footer}`, message.author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
const msunucu = message.guild
const muye = message.member
const msahip = message.author
const mkanal = message.channel

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if (message.author.bot || !message.guild || message.content.startsWith(prefix)) return;

await schat.findOneAndUpdate({ sunucuid: msunucu.id, kulid: msahip.id }, { $inc: { gunluk: 1, haftalik: 1, aylik: 1 } }, { upsert: true });
await schatp.findOneAndUpdate({ sunucuid: msunucu.id, kulid: msahip.id, kanalid: mkanal.id}, { $inc: { gunluk: 1, haftalik: 1, aylik: 1 } }, { upsert: true });
await sxp.findOneAndUpdate({ sunucuid: msunucu.id, kulid: msahip.id }, { $inc: { xpdata: 1 } }, { upsert: true });

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = {
  name: "message"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------