const express = require('express');
const commander = require('commander');
const fs = require('fs');
const path = require('path');


const program = new commander.Command();

program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')
  .requiredOption('-c, --cache <cache>', 'шлях до директорії для кешу');

program.parse(process.argv);
const options = program.opts();


if (!fs.existsSync(options.cache)) {
  console.error('Помилка: Вказана директорія для кешу не існує.');
  process.exit(1);
}


const app = express();

app.get('/', (req, res) => {
  res.send('Веб сервер працює!');
});


app.listen(options.port, options.host, () => {
  console.log(`Сервер запущено на http://${options.host}:${options.port}`);
  console.log(`Кеш директорія: ${path.resolve(options.cache)}`);
});
