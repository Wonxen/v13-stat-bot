const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

module.exports = async client => {
  const botayar = ayarlar.bot
  const kanallar = ayarlar.kanallar
  const roller = ayarlar.roller
  const botconfig = ayarlar.config

  let ccc = chalk.yellow(" | ")

  const rgun = moment(new Date().toISOString()).format('DD')
  const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
  const ryıl = moment(new Date().toISOString()).format('YYYY')
  const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
  const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}`

  let tarihc = ccc + chalk.red("Tarih : ") + chalk.white("[") + chalk.green(rcre) + chalk.white("]") + ccc

  let wonxenbotc = chalk.magenta("wonxen / Bot")

  const komutc = message => {
    console.log(chalk.bold(`${wonxenkomutc} ${tarihc} ` + chalk.red(message)))
  }

  const girisc = message => {
    console.log(chalk.bold(`${wonxengirisc} ${tarihc} ` + chalk.red(message)))
  }

  const seslic = message => {
    console.log(chalk.bold(`${wonxensesliodac} ${tarihc} ` + chalk.red(message)))
  }

  const logc = message => {
    console.log(chalk.bold(`${wonxenbotc} ${tarihc} ` + chalk.red(message)))
  }

  const mongoc = message => {
    console.log(chalk.bold(`${wonxenmongoc} ${tarihc} ` + chalk.red(message)))
  }

  const eventc = message => {
    console.log(chalk.bold(`${wonxeneventc} ${tarihc} ` + chalk.red(message)))
  }

  //-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------------------------

  client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const msunucu = message.guild
    const muye = message.member
    const msahip = message.author
    const mkanal = message.channel

    const prefix = ayarlar.Sistem.Prefix

    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0].slice(prefix.length);
    let params = message.content.split(' ').slice(1);
    let cmd;

    if (!client.commands.has(command)) {
      if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
      } else {
        if (command == '') return;
      }
    }

    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }

    //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  
    if (cmd) {

      const embed = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.Bot.Footer}`, message.author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()
      const dikkat = client.emojis.cache.get(ayarlar.Emoji.Oks)

      const gonder = async mesaj => {
        message.channel.send(embed.setDescription(`${mesaj}`))
      }
      const hata = async mesaj => {
        message.channel.send(embed.setDescription(`${dikkat} ${mesaj} ${dikkat}`))
      }

      const kanal = message.guild.channels.cache.get(ayarlar.Channel.Log)

      if (!kanal) return hata(`**\`Komut Log\` Kanalını Bulamıyorum.**`)

      cmd.run(client, message, params)

      logc("Bir Komut Kullanıldı. / Kullanılan Komut : " + prefix + command + " / Komutun Adı : " + client.aliases.get(command))

      kanal.send(embed.setAuthor(`${msahip.tag} Bir komut kullandı`)
      .setDescription(`${msahip} (\`${msahip.tag}\` - \`${msahip.id}\`) adlı kullanıcı \`${rcre}\` tarihinde komut kullandı \`"${prefix + command}"\` kullandığı sunucu ${msunucu.name} (\`${msunucu.id}\`)`))

    }
  })
};

