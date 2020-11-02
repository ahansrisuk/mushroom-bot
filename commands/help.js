module.exports = {
  name: 'help',
  description: 'List of all available commands',
  execute(message, args) {
    message.channel.send('Here is a list of all available commands: ');
  },
};
