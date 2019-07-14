// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

const twitchAccounts = require("./Modules/twitchaccounts.js");

const wowGuide = require('./Modules/wowclass.js');

const giphy = require('./Modules/giphy.js');

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0 && message.content.indexOf(config.rootPrefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const author = message.author.username;

  console.log(`${author}: !${command} [${args}]`);

  var isDestroy = false;

  switch(command){
    case "stream":
        if(message.channel.type === "dm") return;
        let member = message.member;
        if(!twitchAccounts.hasAccount(member.id)){
            message.channel.reply("Sorry you don't your account setup to link")
                .catch(error => console.log(`Unable to reply due to: ${error}`));
        } else {
            message.channel.send(twitchAccounts.createStreamCard(member.id, member.user.username, member.user.avatarURL, args))
                .catch(error => console.log(`Unable to create card due to: ${error}`));
        }
        break;
    case "purge":
        if(message.author.id !== twitchAccounts.getAdminId()) return;
        if(message.channel.type === "dm"){
            message.reply("Unable to purge messages in private chat, dumbass")
                .catch(error => console.log(`Unable to reply: ${error}`));
            return;
        }
        // This command removes all messages from all users in the channel, up to 100.
        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);

        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete")
                .catch(error => console.log(`Error: ${error}`));
    
        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({limit: deleteCount})
            .catch(error => console.log(`Unable to fetch messages becaue of: ${error}`));
        message.channel.bulkDelete(fetched)
            .catch(error => console.log(`Error: ${error}`))
            .then(messages => message.reply(`${messages.size} Messages Deleted.`)
                .catch(error => console.log(`Unable to reply: ${error}`)));
        break;
    case "wow-spells":
    case "ws":
        if(!args[0]){
            message.reply("Class was not provided.");
        } else {
            const wowClass = args[0].toLocaleLowerCase();
            if(wowGuide.isValidClass(wowClass)){
                message.channel.send(wowGuide.spells(wowClass))
                    .catch(error => message.reply(`Couldn't send message because of: ${error}`));
            } else {
                message.reply(`${wowClass} is not a valid WoW Classic Class`)
                    .catch(error => message.reply(`Couldn't send message because of: ${error}`));
            }
        }
        break;
    case "wow-guide":
    case "wg":
        if(!args[0]){
            message.reply("Class was not provided.");
        } else {
            const wowClass = args[0].toLocaleLowerCase();
            if(wowGuide.isValidClass(wowClass)){
                message.channel.send(wowGuide.guide(wowClass))
                    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            } else {
                message.reply(`${wowClass} is not a valid WoW Classic Class`)
                    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            }
        }
        break;
    case "commands":
        const commandsEmbed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setTitle("Hench Bot Commands")
            .setDescription("List of Commands for Hench Bot")
            .addBlankField()
            .addField("!commands", "Shows list of Hench Bot Commands", false)
            .addField("!stream <HH:MM> <Name of Game>", "Creates a card for your stream", false)
            .addField("!wow-spells <class>", "Retuns a web-link for that classes spells", false)
            .addField("!wow-guide <class>", "Retuns a web-link for that classes guide", false)
            .setColor("0xFF7D0A")
            .setTimestamp()
            .setFooter("Hench Bot Out", client.user.avatarURL);
        message.channel.send(commandsEmbed)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        break;
    case "logout":
        if(message.author.id !== twitchAccounts.getAdminId()) return;
        var parameter = 'bye';
        var gif = await giphy.searchGif(parameter);
        console.log(`Gif found: ${gif}`);
        message.channel.send(":wave: Henchbot Out!", {
            files: [gif]
        }).catch(error => {
            console.log(`Unable to send gif ${error}`);
        });
        message.delete()
                .catch(error => console.log(`Unabled to Delete logout: ${error}`));
        setTimeout(function(){
            client.destroy();
        }, 7777);
        return;
    default:
        message.reply(`Sorry, but !${command} is not in my repertoire.  For a list of my commands try !commands`)
            .catch(error => console.log(`Unable to reply: ${error}`));
        break;
  }
  if(message.channel.type !== "dm" && command !== "purge"){
       message.delete()
        .catch(error => message.reply(`Failed to Delete Message due to: ${error}`));
  }
});

client.login(config.token);
