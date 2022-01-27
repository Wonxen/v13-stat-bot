//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
const { CronJob } = require("cron");
const client = global.client

const schat = require('../schema/a-chat');
const schatp = require('../schema/parent-chat');
const svoice = require('../schema/a-ses');
const svoicep = require('../schema/parent-ses');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

module.exports = async () => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

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

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
module.exports.conf = {
  name: "ready"
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------