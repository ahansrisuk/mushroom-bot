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
    let sendString = "\n**<BLACKLIST>**\n";
    let blacklist = (await getBlacklistHelper()).data.blacklist;
    for (entry of blacklist){
        sendString += "**" + entry.ign + "**" + " was blacklisted for: " + entry.reason + "\n";
    }
    channel.send(sendString);
}

async function addBlacklist(namesToBlackList, channel){
    let tempNamesList = [];

    for (nameString of namesToBlackList){
        if(nameString.indexOf("(")<0 || nameString.indexOf(")")<0){
            channel.send("One of your names to blacklist is missing a reason.  Please use the syntax: -blacklist ign(reason) ign(reason) ign(reason)");
            return;
        }
        let ign = nameString.slice(0, nameString.indexOf("("));
        let reason = nameString.slice(nameString.indexOf("(") + 1, nameString.indexOf(")"));
        tempNamesList.push({
            ign,
            reason
        });
    }
    namesToBlackList = tempNamesList;
    let blacklist = (await getBlacklistHelper()).data;
    let blacklistArray = blacklist.blacklist;
    blacklistArray = [...new Set(blacklistArray.concat(namesToBlackList).sort((function (a, b) {
        return a.ign.toLowerCase().localeCompare(b.ign.toLowerCase());
    })).filter(function(obj) {
        return /\S/.test(obj.ign);
    }))];
    axios.put(jsonURL, {
        blacklist : blacklistArray
      })
      .then(function (response) {
        getBlacklist(channel);
      });
}

async function unBlackList(namesToClear, channel){
    let blacklist = (await getBlacklistHelper()).data;
    let blacklistArray = blacklist.blacklist;
    console.log(blacklistArray, namesToClear);
    blacklistArray = blacklistArray.filter((blacklistName)=>{ 
        return !namesToClear.includes(blacklistName.ign);
    });
    axios.put(jsonURL, {
        blacklist : blacklistArray
      })
      .then(function (response) {
        getBlacklist(channel);
      });
}

module.exports = { getBlacklist, addBlacklist, unBlackList };