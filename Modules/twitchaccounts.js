const Discord = require("discord.js");
const accounts = require("../accounts.json");

exports.hasAccount = function(userID){
    switch(userID){
        case accounts.anntagonist.id:
        case accounts.sideWindr5.id:
        case accounts.haiiro.id:
            return true;
        default:
            return false;
    }
}

exports.createStreamCard = function(userID, userName, userAvatarURL, args){
    const account = getAccount(userID);
    const time = !args[0] ? "Soon" : args[0];
    if(args.length > 1){
        args.reverse();
        args.pop();
        args.reverse();
    }
    const game = args.length > 0 ? args.join(' ') : "Unknown";

    const twitchEmbed = new Discord.RichEmbed()
        .setAuthor(userName, userAvatarURL)
        .setColor(account.color)
        .setTitle(account.channel)
        .setURL(account.url)
        .setDescription(`${account.channel} Streaming Soon!`)
        .setThumbnail(account.imgUrl)
        .addBlankField()
        .addField("Starting At", time, true)
        .addField("Playing", game, true)
        .setTimestamp()
        .setFooter("Card Created");
    
    return twitchEmbed;
}

exports.getAdminId = function(){
    return accounts.anntagonist.id;
}

getAccount = function(userID){
    switch(userID){
        case accounts.anntagonist.id:
            return accounts.anntagonist;
        case accounts.sideWindr5.id:
            return accounts.sideWindr5;
        case accounts.haiiro.id:
            return accounts.haiiro;
        default:
            return;
    }
}