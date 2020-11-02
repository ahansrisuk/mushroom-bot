const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = '-';

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.login('NzcyOTI1MDcwNzEyNjM1NDUz.X6BwkQ.Djv-T2BZspa3NaDjcaCAVcM7NP8');

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (!client.commands.has(command)) {
    return;
  }

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    message.reply('There was an error trying to execute that command.');
    message.reply(error);
  }
});
