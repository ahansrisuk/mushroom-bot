const fs = require('fs') 

function sendAsciiArt(channel, file){
    fs.readFile(file, 'utf16le', (err, data) => { 
        if (err) throw err; 
        channel.send("```" + data.toString() + "```");
    }) 
}

module.exports = { sendAsciiArt };