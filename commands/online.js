const axios = require('axios');

module.exports = {
  name: 'online',
  description: 'View how many players are currently playing MapleSaga',
  execute(message, args) {
    axios
      .get('https://maplesaga.com/')
      .then((response) => {
        const playerCount = response.data.match(
          /<span class="label">(.+) players online<\/span>/
        );
        message.channel.send(
          `There are currently ${playerCount[1]} players online.`
        );
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
