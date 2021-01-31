const axios = require('axios');
const jsonURL = "https://api.jsonbin.io/b/60172f710ba5ca5799d1d9df";
const secret = process.env.SECRET;
axios.defaults.headers.common['secret-key'] = secret;
axios.defaults.headers.put['Content-Type']='application/json';
axios.defaults.headers.put['versioning']=false;

function getBlacklistHelper(){
    return(axios.get(jsonURL));
}

async function getBlacklist(channel){
    channel.send("\n**<BLACKLIST>**\n" + ((await getBlacklistHelper()).data.blacklist.join("\n")) + "\n**<BLACKLIST>**\n");
}

async function addBlacklist(namesToBlackList, channel){
    let blacklist = (await getBlacklistHelper()).data;
    let blacklistArray = blacklist.blacklist;
    blacklistArray = [...new Set(blacklistArray.concat(namesToBlackList).sort((function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    })).filter(function(str) {
        return /\S/.test(str);
    }))];
    axios.put(jsonURL, {
        blacklist : blacklistArray
      })
      .then(function (response) {
        getBlacklist(channel);
      });
}

module.exports = { getBlacklist, addBlacklist };