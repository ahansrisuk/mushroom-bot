module.exports = {
  name: 'vote',
  description: 'Vote for MapleSaga',
  execute(message, args) {
    message.channel.send('https://maplesaga.com/vote');
  },
};
