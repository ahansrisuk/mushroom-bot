const { getEvent } = require('../utils/event');

module.exports = {
  name: 'event',
  description: 'Current/Next Event',
  execute(message, args) {
    message.channel.send(getEvent());
  },
};