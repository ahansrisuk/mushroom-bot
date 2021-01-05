const { getEventSchedule } = require('../utils/event');

module.exports = {
  name: 'espst',
  description: 'Event Schedule PST',
  execute(message, args) {
    message.channel.send(getEventSchedule('pst'));
  },
};