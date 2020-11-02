module.exports = {
  name: 'forum',
  description: 'Access the forum for MapleSaga',
  execute(message, args) {
    message.channel.send('https://forums.maplesaga.com/index.php');
  },
};
