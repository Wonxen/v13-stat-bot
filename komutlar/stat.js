//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
const client = new Discord.Client();

const svoice = require('../schema/a-ses');
const svoicep = require('../schema/parent-ses');
const schat = require('../schema/a-chat');
const schatp = require('../schema/parent-chat');
const sxp = require('../schema/xp');
const stagli = require('../schema/tagli');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

exports.run = async (client, message, args) => {

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
const moment = require("moment")
moment.locale("tr")
const botayar = ayarlar.bot
const kanallar = ayarlar.kanallar
const roller = ayarlar.roller
const botconfig = ayarlar.config
const prefix = ayarlar.Sistem.Prefix
const dikkat = client.emojis.cache.get(ayarlar.Emoji.Oks)

const msunucu = message.guild
const muye = message.member
const msahip = message.author
const mkanal = message.channel

const kul2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member 
const kul = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author 

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.Bot.Footer}`, kul.avatarURL({ dynamic: true, size: 2048 })).setTimestamp()


const bosson = client.emojis.cache.get(ayarlar.Emoji.BosSonBar)
const bosbas = client.emojis.cache.get(ayarlar.Emoji.BosBaslangicBar)
const bosorta = client.emojis.cache.get(ayarlar.Emoji.BosOrtaBar)

const doluson = client.emojis.cache.get(ayarlar.Emoji.DoluSonBar)
const dolubas = client.emojis.cache.get(ayarlar.Emoji.DoluBaslangicBar)
const doluorta = client.emojis.cache.get(ayarlar.Emoji.DoluOrtaBar)

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}` 

const datacik1 = await schatp.find({ sunucuid: message.guild.id, kulid: kul.id }).sort({ gunluk: -1 });
const datacik2 = await schatp.find({ sunucuid: message.guild.id, kulid: kul.id }).sort({ haftalik: -1 });
const datacik3 = await schatp.find({ sunucuid: message.guild.id, kulid: kul.id }).sort({ aylik: -1 });

const datacik4 = await svoicep.find({ sunucuid: message.guild.id, kulid: kul.id }).sort({ gunluk: -1 });
const datacik5 = await svoicep.find({ sunucuid: message.guild.id, kulid: kul.id }).sort({ haftalik: -1 });
const datacik6 = await svoicep.find({ sunucuid: message.guild.id, kulid: kul.id }).sort({ aylik: -1 });
  
const xpcoin = await sxp.findOne({ sunucuid: message.guild.id, kulid: kul.id })
const taglisayi = await stagli.findOne({ sunucuid: message.guild.id, kulid: kul.id })
const davetsayi = db.get("Davet_Sayi&"+kul.id) ? db.get("Davet_Sayi&"+kul.id) : 0
const levelsira = client.leveller[client.leveller.indexOf(client.leveller.find(x => x.coin >= (xpcoin ? xpcoin.xpdata : 0)))] || client.leveller[client.leveller.length-1];

const aylik_ses_sayi = datacik1 ? datacik1.length : 0;
const haftalik_ses_sayi = datacik2 ? datacik2.length : 0;
const gunluk_ses_sayi = datacik3 ? datacik3.length : 0;

const aylik_mesaj_sayi = datacik4 ? datacik4.length : 0;
const haftalik_mesaj_sayi = datacik5 ? datacik5.length : 0;
const gunluk_mesaj_sayi = datacik6 ? datacik6.length : 0;

let aylik_mesaj_siralama;
let haftalik_mesaj_siralama;
let gunluk_mesaj_siralama;
let aylik_ses_siralama;
let haftalik_ses_siralama;
let gunluk_ses_siralama;

datacik1.length > 0 ? aylik_mesaj_siralama = datacik1.splice(0, 5).map(x => `**<#${x.kanalid}>: \`${Number(x.aylik).toLocaleString()} Mesaj\`**`).join("\n") : aylik_mesaj_siralama = "**\`Veri Bulunamadı.\`**"
datacik2.length > 0 ? haftalik_mesaj_siralama = datacik2.splice(0, 5).map(x => `**<#${x.kanalid}>: \`${Number(x.haftalik).toLocaleString()} Mesaj\`**`).join("\n") : haftalik_mesaj_siralama = "**\`Veri Bulunamadı.\`**"
datacik3.length > 0 ? gunluk_mesaj_siralama = datacik3.splice(0, 5).map(x => `**<#${x.kanalid}>: \`${Number(x.gunluk).toLocaleString()} Mesaj\`**`).join("\n") : gunluk_mesaj_siralama = "**\`Veri Bulunamadı.\`**"

datacik4.length > 0 ? aylik_ses_siralama = datacik4.splice(0, 5).map(x => `**<#${x.kanalid}>: \`${moment.duration(x.aylik).format("H [Saat], m [Dakika,] s [Saniye]")}\`**`).join("\n") : aylik_ses_siralama = "**\`Veri Bulunamadı.\`**"
datacik5.length > 0 ? haftalik_ses_siralama = datacik5.splice(0, 5).map(x => `**<#${x.kanalid}>: \`${moment.duration(x.haftalik).format("H [Saat], m [Dakika,] s [Saniye]")}\`**`).join("\n") : haftalik_ses_siralama = "**\`Veri Bulunamadı.\`**"
datacik6.length > 0 ? gunluk_ses_siralama = datacik6.splice(0, 5).map(x => `**<#${x.kanalid}>: \`${moment.duration(x.gunluk).format("H [Saat], m [Dakika,] s [Saniye]")}\`**`).join("\n") : gunluk_ses_siralama = "**\`Veri Bulunamadı.\`**" 

const mdata = await schat.findOne({ sunucuid: message.guild.id, kulid: kul.id });
const sdata = await svoice.findOne({ sunucuid: message.guild.id, kulid: kul.id });

const mesaj_aylik =  mdata ? mdata.aylik+" Mesaj" : 0+" Mesaj";
const ses_aylik =  moment.duration(sdata ? sdata.aylik : 0).format("H [Saat], m [Dakika,] s [Saniye]");

const mesaj_haftalik = mdata ? mdata.haftalik+" Mesaj" : 0+" Mesaj";
const ses_haftalik = moment.duration(sdata ? sdata.haftalik : 0).format("H [Saat], m [Dakika,] s [Saniye]");

const mesaj_gunluk = mdata ? mdata.gunluk+" Mesaj" : 0+" Mesaj";
const ses_gunluk = moment.duration(sdata ? sdata.gunluk : 0).format("H [Saat], m [Dakika,] s [Saniye]");

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const gonder = async mesaj => {
  message.channel.send(discow.setDescription(`${mesaj}`))
}
const hata = async mesaj => {
  message.channel.send(discow.setDescription(`${dikkat} ${mesaj} ${dikkat}`))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

    //if(!botayar.sahipler.includes(kul.id)) return hata(`**Bu Komutu Sadece \`Sahibim\` Kullanabilir.**`)
    //if(!kul2.roles.cache.get(roller.yetkilistaff) && !kul2.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(kul.id)) return hata(`**Bu Komutu Sadece \`Yetkililer\` Kullanabilir.**`)
    //if(!kul2.hasPermission("ADMINISTRATOR") && !botayar.sahipler.includes(kul.id)) return hata(`**Bu Komutu Sadece \`Yöneticiler\` Kullanabilir.**`)

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
const { MessageButton } = require('discord-buttons');

const butoncuk = MessageButton
  
const sayfa1 = new MessageButton().setStyle(2).setLabel("Günlük").setEmoji("📕").setID("stat_sayfa_1")
const sayfa2 = new MessageButton().setStyle(2).setLabel("Haftalık").setEmoji("📙").setID("stat_sayfa_2")
const sayfa3 = new MessageButton().setStyle(2).setLabel("Aylık").setEmoji("📒").setID("stat_sayfa_3")
const sayfa4 = new MessageButton().setStyle(2).setLabel("Genel").setEmoji("📗").setID("stat_sayfa_4") 

    await message.channel.send(discow.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setThumbnail(client.guilds.cache.get(message.guild.id).members.cache.get(user.id).user.displayAvatarURL({ dynamic: true })).setDescription(`
    ${client.users.cache.get(message.member.id).username} (<@${message.member.id}>) kişisinin istatistik bilgileri için;
    
    **Hesap Bilgileri**
    \`➜\` Kullanıcı ID: \`${user.id}\`
    \`➜\` Katılım Sıralaması: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.guild.members.cache.get(user.id).joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
    \`➜\` Hesap Kuruluş Tarihi: \`${moment(user.createdAt).format('DD')}/${moment(user.createdAt).format('MM')}/${moment(user.createdAt).format('YY HH:mm:ss')}\` 
    ─────────────────────
    **İstatistik Bilgileri**
    \`➜\` Günlük istatistik verin İçin: \`📕\`
    \`➜\` Haftalık istatistik verin İçin: \`📙\`
    \`➜\` Aylık istatistik verin İçin : \`📒\`
    \`➜\` Genel istatistik verin İçin : \`📗\`
`), { buttons: [sayfa1, sayfa2, sayfa3, sayfa4]}).then(async function(discowm) {

    discowm.createButtonCollector(user => user.clicker.user.id == kul.id).on('collect', async (button) => {
  
if(button.id === "stat_sayfa_1") {

    await button.reply.defer()
    discow.fields = [];
    await button.message.edit(discow.setDescription(`${kul2} (${kul2.roles.highest}) Rolüne sahip kişinin sunucudaki __**günlük**__ istatistikleri;
    
    Ses Kanalları: \n ${gunluk_ses_siralama}

    Yazı Kanalları: \n ${gunluk_mesaj_siralama}
    `)
.addField(`${client.emojis.cache.get(ayarlar.Emoji.Sohbet)} Günlük Mesaj Sayısı :`, `**\`\`\`js\n${mesaj_gunluk}\`\`\`**`, true)
.addField(`${client.emojis.cache.get(ayarlar.Emoji.Ses)} Günlük Ses Süresi :`, `**\`\`\`js\n${ses_gunluk}\`\`\`**`, true)
)      
}
  
if(button.id === "stat_sayfa_2") {

    await button.reply.defer()
    discow.fields = [];

    await button.message.edit(discow.setDescription(`${kul2} (${kul2.roles.highest}) Rolüne sahip kişinin sunucudaki __**haftalık**__ istatistikleri;
    
    Ses Kanalları: \n ${haftalik_ses_siralama}

    Yazı Kanalları: \n ${haftalik_mesaj_siralama}
    `)
    .addField(`${client.emojis.cache.get(ayarlar.Emoji.Sohbet)} Haftalık Mesaj Sayısı:`, `**\`\`\`js\n${mesaj_haftalik}\`\`\`**`, true)
    .addField(`${client.emojis.cache.get(ayarlar.Emoji.Ses)} Haftalık Ses Süresi:`, `**\`\`\`js\n${ses_haftalik}\`\`\`**`, true)
)
}

if(button.id === "stat_sayfa_3") {

    await button.reply.defer()
    discow.fields = [];
    await button.message.edit(discow.setDescription(`${kul2} (${kul2.roles.highest}) Rolüne sahip kişinin sunucudaki __**aylık**__ istatistikleri;
    
    Ses Kanalları: \n ${aylik_ses_siralama}

    Yazı Kanalları: \n ${aylik_mesaj_siralama}
    `)
    .addField(`${client.emojis.cache.get(ayarlar.Emoji.Sohbet)} Aylık Mesaj Sayısı:`, `**\`\`\`js\n${mesaj_aylik}\`\`\`**`, true)
    .addField(`${client.emojis.cache.get(ayarlar.Emoji.Ses)} Aylık Ses Süresi:`, `**\`\`\`js\n${ses_aylik}\`\`\`**`, true)
)
}

if(button.id === "stat_sayfa_4") {

    await button.reply.defer()
    discow.fields = [];
    await button.message.edit(discow.setDescription(`${kul2} (${kul2.roles.highest}) Rolüne sahip kişinin sunucudaki __**genel**__ istatistikleri;`)
.addField(`${client.emojis.cache.get(ayarlar.Emoji.Oks)} Taglı Sayısı :`,
`${client.emojis.cache.get(ayarlar.Emoji.Yildiz)} **Son İşlem Yapılan Kişi :** **${db.get("Son_Tag_Verilen"+kul.id+"&"+msunucu.id) ? "<@"+db.get("Son_Tag_Verilen"+kul.id+"&"+msunucu.id)+">" : `\`Bulanamadı.\`` } / \`${message.guild.members.cache.get(db.get("Son_Tag_Verilen"+kul.id+"&"+msunucu.id)) ? message.guild.members.cache.get(db.get("Son_Tag_Verilen"+kul.id+"&"+msunucu.id)).user.tag : "Bulunamadı."}\` **
${client.emojis.cache.get(ayarlar.Emoji.Yildiz)} **Taglı Sayısı : \`${taglisayi ? taglisayi.sayi : 0} Adet\`**`)
.addField(`${client.emojis.cache.get(ayarlar.Emoji.Oks)} Davet Sayısı :`,
`${client.emojis.cache.get(ayarlar.Emoji.Yildiz)} **Son İşlem Yapılan Kişi :** **${db.get("Son_Davet_Edilen"+kul.id+"&"+msunucu.id) ? "<@"+db.get("Son_Davet_Edilen"+kul.id+"&"+msunucu.id)+">" : `\`Bulanamadı.\`` } / \`${message.guild.members.cache.get(db.get("Son_Davet_Edilen"+kul.id+"&"+msunucu.id)) ? message.guild.members.cache.get(db.get("Son_Davet_Edilen"+kul.id+"&"+msunucu.id)).user.tag : "Bulunamadı."}\` **
${client.emojis.cache.get(ayarlar.Emoji.Yildiz)} **Davet Sayısı : \`${davetsayi ? davetsayi.sayi : 0} Adet\`**`)
.addField(`${client.emojis.cache.get(ayarlar.Emoji.Xp)} XP Durumu :`, `**\`${xpcoin.xpdata} -\` ${progressBar(xpcoin ? xpcoin.xpdata: 0, levelsira.coin, 8)} \`- ${levelsira.coin}\`**`)
.addField(`${client.emojis.cache.get(ayarlar.Emoji.Oks)} Seviye Durumu :`, `${client.emojis.cache.get(ayarlar.Emoji.Yildiz)} **\`${levelsira.level} Seviye\` Olabilmek İçin \`${levelsira.coin - (xpcoin ? xpcoin.xpdata : 0)} XP\` Kasmalısın.**`)

)
}    

})})
  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  
function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = `${doluorta}`.repeat(progress);
const emptyProgressText = `${bosorta}`.repeat(emptyProgress);

return emptyProgress > 0 ? `${dolubas}${progressText}${emptyProgressText}${bosson}` : `${dolubas}${progressText}${emptyProgressText}${doluson}`;
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

}
exports.conf = {
  aliases: ['me', 'stat'],
};
  
exports.help = {
  name: 'Stat Komutu',
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------