module.exports = {
  name: 'vote',
  description: 'vote for MapleSaga',
  execute(message, args) {
    message.channel.send('https://maplesaga.com/vote');
  },
};
