module.exports = {
  name: 'spotlight',
  description: 'Access the latest Saga Spotlight',
  execute(message, args) {
    message.channel.send('https://maplesaga.com/bulletin');
  },
};
