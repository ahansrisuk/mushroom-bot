const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

require('dotenv').config();

const prefix = '-';

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

// Log In
client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
  console.log('Ready!');
});

// Event Listeners
client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args[0].toLowerCase();
  console.log(args);

  if (!client.commands.has(command)) {
    message.channel.send(
      "Having trouble? Try '-help' for more information on possible commands."
    );
    return;
  }

  try {
    if (command === 'help') {
      console.log(command);
      client.commands.get(command).execute(message, args, client.commands);
    } else {
      client.commands.get(command).execute(message, args);
    }
  } catch (error) {
    message.reply('There was an error trying to execute that command.');
    message.reply(error);
  }
});
