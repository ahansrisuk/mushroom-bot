const { sendAsciiArt } = require('../memes/asciiArt');

module.exports = {
  name: 'clem',
  description: 'Spawn a clem logo. (Will not work for mobile)',
  execute(message, args) {
    sendAsciiArt(message.channel, "./memes/clem.txt");
  },
};