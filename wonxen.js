const { Client, Collection, Guild } = Discord = require('discord.js');
const Config = require('./src/settings/Config.json');
const moment = require('moment');
const chalk = require("chalk");
const fs = require('fs');

require("moment-duration-format");
require("moment-timezone");
moment.locale("tr");

class wonxen extends Client {
    constructor(options) {
        super(options);

            /*-------- Sistem Gereksinimi --------*/
                this.Config = global.Config = Config;
            /*-------- Sistem Gereksinimi --------*/

            /*-------- Handler --------*/
                this.Komutlar = new Collection();
                this.Komut = new Collection();
            /*-------- Handler --------*/
    }

    Cmd() {
        let dirs = fs.readdirSync("./src/commands", { encoding: "utf8" });
        console.log(`${chalk.grey("Statistics |")} ${chalk.bold.yellow(`[${tarihsel(Date.now())}] | ${dirs.length} adet Komut dosyası yüklendi.`)}`);
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./src/commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let referans = require(`./src/commands/${dir}/${file}`);
                if(typeof referans.onLoad === "function") referans.onLoad(this);
                this.Komutlar.set(referans.Isim, referans);
                if (referans.Komut) referans.Komut.forEach(alias => this.Komut.set(alias, referans));
            });
        });
    }
}


class Mongo {
    static Connect() {
        require('mongoose').connect(Config.System.MongoDb, {
            connectTimeoutMS: 1000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`${chalk.grey("Statistics |")} ${chalk.cyanBright(`[${tarihsel(Date.now())}] | MongoDB Bağlantısı Başarıyla Kuruldu.`)}`);
        }).catch((err) => {
            console.log(`${chalk.grey("Statistics |")} ${chalk.red(`[${tarihsel(Date.now())}] | MongoDB Bağlantısı Başarısız.\nHata: ${err}`)}`);
        });
    }
}

const sayilariCevir = global.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
    global.aylar = aylartoplam;
    const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment().format('LLL')  
    return tarihci;
};


Guild.prototype.Emoji = function(content) {
    let emoji = this.emojis.cache.find(e => e.name === content) || this.emojis.cache.find(e => e.id === content) 
    if(!emoji) {
        if(this.client.emojis.cache.find(e => e.id === content) || this.client.emojis.cache.find(e => e.name === content)) {
            let emojicik = this.client.emojis.cache.find(e => e.id === content) || this.client.emojis.cache.find(e => e.name === content)
            if(!emojicik) return '#EmojiBulunamadı';
            if(emojicik.animated) return `<a:${emojicik.name}:${emojicik.id}>`;
            return `<:${emojicik.name}:${emojicik.id}>`;
        }
    }
    return emoji;
}


module.exports = { wonxen, Mongo };