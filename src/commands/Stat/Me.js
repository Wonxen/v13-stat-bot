const { Client, Message, MessageButton, MessageActionRow, MessageEmbed } = Discord = require("discord.js");
const moment = require("moment");

const schat = require('../../database/a-chat');
const schatp = require('../../database/parent-chat');

const svoice = require('../../database/a-ses');
const svoicep = require('../../database/parent-ses');

const sxp = require('../../database/xp');
const stagli = require('../../database/tagli');


module.exports = {
    Isim: "me",
    Komut: [],
    Kullanim: "me",
    Aciklama: "",
    Kategori: "Stat",
    
   /**
   * @param {Client} client 
   **/
  
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const datacik1 = await schatp.find({ sunucuid: message.guild.id, kulid: member.id }).sort({ gunluk: -1 });
    const datacik2 = await schatp.find({ sunucuid: message.guild.id, kulid: member.id }).sort({ haftalik: -1 });
    const datacik3 = await schatp.find({ sunucuid: message.guild.id, kulid: member.id }).sort({ aylik: -1 });

    const datacik4 = await svoicep.find({ sunucuid: message.guild.id, kulid: member.id }).sort({ gunluk: -1 });
    const datacik5 = await svoicep.find({ sunucuid: message.guild.id, kulid: member.id }).sort({ haftalik: -1 });
    const datacik6 = await svoicep.find({ sunucuid: message.guild.id, kulid: member.id }).sort({ aylik: -1 });

    const xpcoin = await sxp.findOne({ sunucuid: message.guild.id, kulid: member.id })
    const taglisayi = await stagli.findOne({ sunucuid: message.guild.id, kulid: member.id })
    const levelsira = client.leveller[client.leveller.indexOf(client.leveller.find(x => x.coin >= (xpcoin ? xpcoin.xpdata : 0)))] || client.leveller[client.leveller.length-1];

    let aylik_mesaj_siralama;
    let haftalik_mesaj_siralama;
    let gunluk_mesaj_siralama;

    let aylik_ses_siralama;
    let haftalik_ses_siralama;
    let gunluk_ses_siralama;

    datacik1.length > 0 ? aylik_mesaj_siralama = datacik1.splice(0, 5).map((x, i) => `\`${i + 1}.\` **<#${x.kanalid}>: \`${Number(x.aylik).toLocaleString()} Mesaj\`**`).join("\n") : aylik_mesaj_siralama = "**\`Veri Bulunamadı.\`**"
    datacik2.length > 0 ? haftalik_mesaj_siralama = datacik2.splice(0, 5).map((x, i) => `\`${i + 1}.\` **<#${x.kanalid}>: \`${Number(x.haftalik).toLocaleString()} Mesaj\`**`).join("\n") : haftalik_mesaj_siralama = "**\`Veri Bulunamadı.\`**"
    datacik3.length > 0 ? gunluk_mesaj_siralama = datacik3.splice(0, 5).map((x, i) => `\`${i + 1}.\` **<#${x.kanalid}>: \`${Number(x.gunluk).toLocaleString()} Mesaj\`**`).join("\n") : gunluk_mesaj_siralama = "**\`Veri Bulunamadı.\`**"

    datacik4.length > 0 ? aylik_ses_siralama = datacik4.splice(0, 5).map((x, i) => `\`${i + 1}.\` **<#${x.kanalid}>: \`${moment.duration(x.aylik).format("H [Saat], m [Dakika,] s [Saniye]")}\`**`).join("\n") : aylik_ses_siralama = "**\`Veri Bulunamadı.\`**"
    datacik5.length > 0 ? haftalik_ses_siralama = datacik5.splice(0, 5).map((x, i) => `\`${i + 1}.\` **<#${x.kanalid}>: \`${moment.duration(x.haftalik).format("H [Saat], m [Dakika,] s [Saniye]")}\`**`).join("\n") : haftalik_ses_siralama = "**\`Veri Bulunamadı.\`**"
    datacik6.length > 0 ? gunluk_ses_siralama = datacik6.splice(0, 5).map((x, i) => `\`${i + 1}.\` **<#${x.kanalid}>: \`${moment.duration(x.gunluk).format("H [Saat], m [Dakika,] s [Saniye]")}\`**`).join("\n") : gunluk_ses_siralama = "**\`Veri Bulunamadı.\`**" 

    const mdata = await schat.findOne({ sunucuid: message.guild.id, kulid: member.id });
    const sdata = await svoice.findOne({ sunucuid: message.guild.id, kulid: member.id });

    const mesaj_aylik =  mdata ? mdata.aylik+" Mesaj" : 0+" Mesaj";
    const mesaj_haftalik = mdata ? mdata.haftalik+" Mesaj" : 0+" Mesaj";
    const mesaj_gunluk = mdata ? mdata.gunluk+" Mesaj" : 0+" Mesaj";

    const ses_aylik =  moment.duration(sdata ? sdata.aylik : 0).format("H [Saat], m [Dakika,] s [Saniye]");
    const ses_haftalik = moment.duration(sdata ? sdata.haftalik : 0).format("H [Saat], m [Dakika,] s [Saniye]");
    const ses_gunluk = moment.duration(sdata ? sdata.gunluk : 0).format("H [Saat], m [Dakika,] s [Saniye]");


    const Rows = new MessageActionRow().addComponents([
      new MessageButton().setStyle('SECONDARY').setEmoji("📕").setLabel("Günlük").setCustomId('1'),
      new MessageButton().setStyle('SECONDARY').setEmoji("📙").setLabel("Haftalık").setCustomId('2'),
      new MessageButton().setStyle('SECONDARY').setEmoji("📒").setLabel("Aylık").setCustomId('3'),
      new MessageButton().setStyle('SECONDARY').setEmoji("📗").setLabel("Genel").setCustomId('4')
    ]);

    const filter = i => i.user.id === message.member.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
    let panel = await message.reply({embeds : [
      new MessageEmbed().setColor('#47006a')
      .setAuthor({name : message.author.tag, iconURL : message.author.avatarURL({dynamic : true})})
      .setDescription("İstatistik verilerinize aşağıdaki interaktif butonlardan ulaşabilirsiniz.")
      .setFooter({text : Config.Bot.Text , iconURL : message.guild.iconURL({dynamic : true})}).setTimestamp()
    ], components : [Rows]})

    collector.on('collect', async i => {
      if (i.customId === '1') {
        i.deferUpdate();
        await panel.edit({embeds : [
          new MessageEmbed()
          .setColor('#47006a')
          .setThumbnail(member.user.avatarURL({dynamic : true}))
          .setDescription(`${member}, (${member.roles.highest}) \`${message.guild.name}\` sunucusundaki günlük veri tabanına kaydedilen verileri aşağıda toplu olarak gösterilmiştir.`) 
          .setAuthor({name : message.author.tag, iconURL : message.author.avatarURL({dynamic : true})})
          .addFields({ name: 'Yazı Kanalları', value: gunluk_mesaj_siralama, inline: true })
          .addFields({ name: 'Ses Kanalları', value: gunluk_ses_siralama, inline: false })
          .addFields(
            { name: 'Mesaj Sayısı', value: Discord.Formatters.codeBlock("js", mesaj_gunluk), inline: true },
            { name: 'Ses Süresi', value: Discord.Formatters.codeBlock("js", ses_gunluk), inline: true },
          )
          .setFooter({text : Config.Bot.Text , iconURL : message.guild.iconURL({dynamic : true})}).setTimestamp()
        ]});
        message.react(message.guild.Emoji(Config.Others.Yes))
      }
      else if (i.customId === '2') {
        i.deferUpdate();
        await panel.edit({embeds : [
          new MessageEmbed()
          .setColor('#47006a')
          .setThumbnail(member.user.avatarURL({dynamic : true}))
          .setDescription(`${member}, (${member.roles.highest}) \`${message.guild.name}\` sunucusundaki haftalık veri tabanına kaydedilen verileri aşağıda toplu olarak gösterilmiştir.`) 
          .setAuthor({name : message.author.tag, iconURL : message.author.avatarURL({dynamic : true})})
          .addFields({ name: 'Yazı Kanalları', value: haftalik_mesaj_siralama, inline: true })
          .addFields({ name: 'Ses Kanalları', value: haftalik_ses_siralama, inline: false })
          .addFields(
            { name: 'Mesaj Sayısı', value: Discord.Formatters.codeBlock("js", mesaj_haftalik), inline: true },
            { name: 'Ses Süresi', value: Discord.Formatters.codeBlock("js", ses_haftalik), inline: true },
          )
          .setFooter({text : Config.Bot.Text , iconURL : message.guild.iconURL({dynamic : true})}).setTimestamp()
        ]});
        message.react(message.guild.Emoji(Config.Others.Yes))
      }
      else if (i.customId === '3') {
        i.deferUpdate();
        await panel.edit({embeds : [
          new MessageEmbed()
          .setColor('#47006a')
          .setThumbnail(member.user.avatarURL({dynamic : true}))
          .setDescription(`${member}, (${member.roles.highest}) \`${message.guild.name}\` sunucusundaki aylık veri tabanına kaydedilen verileri aşağıda toplu olarak gösterilmiştir.`) 
          .setAuthor({name : message.author.tag, iconURL : message.author.avatarURL({dynamic : true})})
          .addFields({ name: 'Yazı Kanalları', value: aylik_mesaj_siralama, inline: true })
          .addFields({ name: 'Ses Kanalları', value: aylik_ses_siralama, inline: false })
          .addFields(
            { name: 'Mesaj Sayısı', value: Discord.Formatters.codeBlock("js", mesaj_aylik), inline: true },
            { name: 'Ses Süresi', value: Discord.Formatters.codeBlock("js", ses_aylik), inline: true },
          )
          .setFooter({text : Config.Bot.Text , iconURL : message.guild.iconURL({dynamic : true})}).setTimestamp()
        ]});
        message.react(message.guild.Emoji(Config.Others.Yes))
      }
      else {
        i.deferUpdate();
        await panel.edit({embeds : [
          new MessageEmbed()
          .setColor('#47006a')
          .setThumbnail(member.user.avatarURL({dynamic : true}))
          .setDescription(`${member}, (${member.roles.highest}) \`${message.guild.name}\` sunucusundaki genel veri tabanına kaydedilen verileri aşağıda toplu olarak gösterilmiştir.`) 
          .setAuthor({name : message.author.tag, iconURL : message.author.avatarURL({dynamic : true})})
          .addFields(
            { name: 'Taglı Sayısı', value: `\`➥\` Son İşlem Yapılan Kişi: \`Bulunamadı.\`` },
            { name: 'Davet Sayısı', value: `\`➥\` Taglı Sayısı: \`${taglisayi ? taglisayi.sayi : 0} Adet\``, inline: false },
            { name: 'Xp Durumu', value: `\`➥\` ${progressBar(xpcoin ? xpcoin.xpdata: 0, levelsira.coin, 8)} **\`${xpcoin.xpdata}/${levelsira.coin}\`**`, inline: false },
            { name: 'Seviye Durumu', value: `\`➥\` ${levelsira.level}. seviyeye ulaşabilmek için \`${levelsira.coin - (xpcoin ? xpcoin.xpdata : 0)} xp\` kazanmanız gerekiyor.`, inline: false },
          )
          .setFooter({text : Config.Bot.Text , iconURL : message.guild.iconURL({dynamic : true})}).setTimestamp()
        ]});
        message.react(message.guild.Emoji(Config.Others.Yes))
      }
    })
    collector.on("end", () => {
      if (panel) panel.edit({components: []})
    })

    const bosson = message.guild.Emoji(Config.Others.Empty_Top);
    const bosorta = message.guild.Emoji(Config.Others.Empty_Middle);

    const doluson = message.guild.Emoji(Config.Others.Full_Bottom);
    const dolubas = message.guild.Emoji(Config.Others.Full_Top);
    const doluorta = message.guild.Emoji(Config.Others.Full_Middle);
    
    function progressBar(value, maxValue, size) {
      const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
      const emptyProgress = size - progress > 0 ? size - progress : 0;
      
      const progressText = `${doluorta}`.repeat(progress);
      const emptyProgressText = `${bosorta}`.repeat(emptyProgress);
      
      return emptyProgress > 0 ? `${dolubas}${progressText}${emptyProgressText}${bosson}` : `${dolubas}${progressText}${emptyProgressText}${doluson}`;
    };
  }
};

