const { getBlacklist, unBlackList } = require('../utils/blacklist');

module.exports = {
  name: 'unblacklist',
  description: 'unblacklist people',
  execute(message, args) {
    if(args.length == 1){
      getBlacklist(message.channel);
    } else{
      unBlackList(args.slice(1), message.channel);
    }
  },
};