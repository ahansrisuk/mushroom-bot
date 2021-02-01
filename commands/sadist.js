const { sendAsciiArt } = require('../memes/asciiArt');

module.exports = {
  name: 'sadist',
  description: 'Spawn a glasses wearing sadist to the chat. (Will not work for mobile)',
  execute(message, args) {
    sendAsciiArt(message.channel, "./memes/mike.txt");
  },
};