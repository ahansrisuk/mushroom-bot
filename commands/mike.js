const { sendAsciiArt } = require('../memes/asciiArt');

module.exports = {
  name: 'mike',
  description: 'Spawn a glasses wearing mike to the chat. (Will not work for mobile)',
  execute(message, args) {
    sendAsciiArt(message.channel, "./memes/mike.txt");
  },
};