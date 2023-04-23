const chalk = require("chalk");
const client = global.bot;
const fs = require("fs");

fs.readdir("./src/events", (err, files) => {
  if (err) return console.error(err);
  console.log(`${chalk.grey("Statistics |")} ${chalk.blue(`[${tarihsel(Date.now())}] | ${files.length} adet etkinlik yüklendi.`)}`);
  files
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let prop = require(`../events/${file}`);
      if (!prop.Config) return;
      client.on(prop.Config.Event, prop);
    });
});
