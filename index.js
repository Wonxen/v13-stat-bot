const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
const mongo = require('mongoose');

const ayarlar = require('./ayarlar.json');
require('discord-buttons')(client);
require('moment-duration-format')

global.client = client

client.leveller = [
  { level: 0, coin: 0 },
  { level: 1, coin: 50},
  { level: 2, coin: 100},
  { level: 3, coin: 175},
  { level: 4, coin: 250},
  { level: 5, coin: 350},
  { level: 6, coin: 500},
  { level: 7, coin: 700},
  { level: 8, coin: 1000},
  { level: 9, coin: 1450},
  { level: 10, coin: 2000},
  { level: 11, coin: 3000},
  { level: 12, coin: 5000},
]

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.login(ayarlar.Sistem.Token).then(x => {
  console.log("")
  girisc("Bot Başarıyla Giriş Yaptı.")
}).catch(err => girisc("Bot Giriş Yaparken Bir Hata Oluştu."))

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: ayarlar.Bot.Text, type: ayarlar.Bot.Type }, status: ayarlar.Bot.Status });
  client.channels.cache.get(ayarlar.Bot.Voice).join().then(x => {
  seslic("Bot Başarıyla Sese Giriş Yaptı.")
  console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
}).catch(err => {
  seslic("Bot Sese Girerken Bir Hata Oluştu.\nHata : "+chalk.yellow(err))
  process.exit(0)
})
})

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let ccc = chalk.yellow(" | ")

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

let tarihc = ccc+chalk.red("Tarih : ")+chalk.white("[")+chalk.green(rcre)+chalk.white("]")+ccc

let wonxenkomutc = chalk.magenta("KOMUTLAR")
let wonxenmongoc = chalk.magenta("DATABASE")
let wonxengirisc = chalk.magenta("GİRİŞ")
let wonxensesliodac = chalk.magenta("SESLİ ODA")
let wonxenbotc = chalk.magenta("BOT")
let wonxeneventc = chalk.magenta("FONKSİYON")

const komutc = message => {
  console.log(chalk.bold(`${wonxenkomutc} ${tarihc} `+chalk.red(message)))
}
const girisc = message => {
  console.log(chalk.bold(`${wonxengirisc} ${tarihc} `+chalk.red(message)))
}
const seslic = message => {
  console.log(chalk.bold(`${wonxensesliodac} ${tarihc} `+chalk.red(message)))
}
const logc = message => {
  console.log(chalk.bold(`${wonxenbotc} ${tarihc} `+chalk.red(message)))
}
const mongoc = message => {
  console.log(chalk.bold(`${wonxenmongoc} ${tarihc} `+chalk.red(message)))
}
const eventc = message => {
  console.log(chalk.bold(`${wonxeneventc} ${tarihc} `+chalk.red(message)))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

require('./events/komut')(client);
mongo.connect(ayarlar.Sistem.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(x => {
mongoc("MongoDB Bağlantısı Başarıyla Kuruldu.")
}).catch(err => {
mongoc("MongoDB Bağlantısı Kurulurken Bir Hata Oluştu.\nHata : "+chalk.yellow(err))
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
  komutc(`${files.length} Adet Komut Yüklenicek.`);
  files.forEach(f => {
let props = require(`./komutlar/${f}`);
  komutc(`Bir Komut Yüklendi. / Yüklenen Komut : ${props.help.name} / Yüklenen Kod : ${f} / Komutun Alias'ları : ${props.conf.aliases.map(x => `${x}`).join(", ")}`);
  client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
  client.aliases.set(alias, props.help.name);
}); 
});
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.reload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);});
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.load = command => {
    return new Promise((resolve, reject) => {
    try {
let cmd = require(`./komutlar/${command}`);
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.unload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
fs.readdir("./fonk", (err, files) => {
  if (err) return console.error(err);
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let prop = require(`./fonk/${file}`);
      if (!prop.conf) return;
      client.on(prop.conf.name, prop);
      setTimeout(function() {
       eventc(`${chalk.magenta(prop.conf.name.toUpperCase())} Fonksiyonu Başarıyla Başlatıldı.`);
      }, 5000)
    });
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Invites = new Discord.Collection();

//#region Load
client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites().then(_invites => {
            Invites.set(guild.id, _invites);
        }).catch(err => { });
    });
});
client.on("inviteCreate", (invite) => {
    var gi = Invites.get(invite.guild.id) || new Discord.Collection();
    gi.set(invite.code, invite);
    Invites.set(invite.guild.id, gi);
});
client.on("inviteDelete", (invite) => {
    var gi = Invites.get(invite.guild.id) || new Discord.Collection();
    gi.delete(invite.code);
    Invites.set(invite.guild.id, gi);
});

client.on("guildCreate", (guild) => {
	guild.fetchInvites().then(invites => {
		Invites.set(guild.id, invites);
	}).catch(e => {})
});


client.on('message', async message => {
if (message.content === '.fakekatıl') { // . yerine prefixi yaz
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------