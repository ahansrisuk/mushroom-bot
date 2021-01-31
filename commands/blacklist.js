const { getBlacklist, addBlacklist } = require('../utils/blacklist');

module.exports = {
  name: 'blacklist',
  description: 'blacklist people',
  execute(message, args) {
    if(args.length == 1){
      getBlacklist(message.channel);
    } else{
      addBlacklist(args.slice(1), message.channel);
    }
  },
};