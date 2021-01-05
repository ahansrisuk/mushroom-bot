const { getEventSchedule } = require('../utils/event');

module.exports = {
  name: 'esest',
  description: 'Event Schedule EST',
  execute(message, args) {
    message.channel.send(getEventSchedule('est'));
  },
};