module.exports = {
  name: 'help',
  description: 'List of all available commands',
  execute(message, args, commands) {
    var printedOutput = '';
    console.log(commands);
    commands.forEach((command) => {
      printedOutput += `-${command.name}: ${command.description}\n`;
    });
    message.channel.send(
      `Here is a list of all available commands:\n\n${printedOutput}`
    );
  },
};
