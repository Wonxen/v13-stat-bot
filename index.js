const Config = require('./src/settings/Config.json');
const { wonxen, Mongo } = require('./wonxen');
const client = global.bot = new wonxen({
    presence: {
        status: 'idle',
        afk: false,
        activities: [{
            name: Config.Bot.Text,
            type: "WATCHING", /* WATCHING - LISTENING - PLAYING */
        }],
    },
    fetchAllMembers: true,
    intents: [ 32767 ],
}); 
require('./src/handlers/eventHander');
const chalk = require("chalk");
Mongo.Connect();
client.Cmd();

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
    { level: 9, coin: 1500},
    { level: 10, coin: 2000},
    { level: 11, coin: 3000},
    { level: 12, coin: 5000},
    { level: 13, coin: 7000},
    { level: 14, coin: 9000},
    { level: 15, coin: 10000},
]

client
  .login(Config.System.Token).then(x => {
    console.log(`${chalk.grey("Statistics |")} ${chalk.magentaBright(`[${tarihsel(Date.now())}] | ${`Başarıyla Giriş Yapıldı: ${client.user.tag}`}`)}`);
  }).catch(err => {
    console.log(`${chalk.grey("Statistics |")} ${chalk.red(`[${tarihsel(Date.now())}] | Botun tokeni doğrulanamadı. 5 Saniye sonra tekrardan denenecektir...`)}`);
    setTimeout(() => {
        process.exit(0);
    }, 5000);
})

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error(`${chalk.red("Beklenmedik Yakalanamayan Hata: ")}`, errorMsg);
    process.exit(1);
});
  
process.on("unhandledRejection", err => {
    console.error(`${chalk.red("Promise Hatası: ")}`, err);
});
