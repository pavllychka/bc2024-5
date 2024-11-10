const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const express = require('express');

program
  .requiredOption('-h, --host <host>', 'address of the server')
  .requiredOption('-p, --port <port>', 'port of the server')
  .requiredOption('-c, --cache <cache>', 'path to cache directory');

program.parse(process.argv);

const options = program.opts();


if (!options.host || !options.port || !options.cache) {
  console.error('Усі параметри (--host, --port, --cache) є обов\'язковими.');
  process.exit(1); 
}

const app = express();

app.get('/', (req, res) => {
    res.send('Сервер працює!');
});

const server = app.listen(options.port, options.host, () => {
    console.log(`Server running at http://${options.host}:${options.port}/`);
});






