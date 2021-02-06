const { sendAsciiArt } = require('../memes/asciiArt');

module.exports = {
  name: 'skem',
  description: 'Skem. (Will not work for mobile)',
  execute(message, args) {
    sendAsciiArt(message.channel, "./memes/syd.txt");
  },
};