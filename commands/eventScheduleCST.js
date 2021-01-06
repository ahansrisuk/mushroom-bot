const { getEventSchedule } = require('../utils/event');

module.exports = {
  name: 'escst',
  description: 'Event Schedule CST',
  execute(message, args) {
    message.channel.send(getEventSchedule('cst'));
  },
};