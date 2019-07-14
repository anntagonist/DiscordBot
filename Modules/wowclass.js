// Requirements
const Discord = require("discord.js");

// Local Variables
const wowHeadURL = "https://classic.wowhead.com/";
const abilitiesURL = "-abilities#0+2+20";
const guidesURL = "https://classic.wowhead.com/guides/classic-wow-";
const overviewURL = "-class-overview";
const wowIconURL = "https://wow.zamimg.com/images/wow/icons/large/wow_token01.jpg";

//Exported Methods
exports.isValidClass = function(className){
    /** Checks that the class provided by the user is a Class that is a playable class in Classic WoW 
     * className: String
     * Returns: Boolean
    */
    switch(className){
        case "warrior":
        case "warlock":
        case "priest":
        case "paladin":
        case "rogue":
        case "druid":
        case "mage":
        case "shaman":
        case "hunter":
            return true;
        default:
            return false;
    }
}

getClassDetails = function(className){
    switch(className){
        case "warrior":
            return {
                "name": "Warrior",
                "quote": "Now, watch them attack me. Pitiful!\n-Skeer the Bloodseeker",
                "color": "#C79C6E",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg",
            };
        case "warlock":
            return {
                "name": "Warlock",
                "quote": "I am the Fel!\n-Gul'dan",
                "color": "#8787ED",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg",
            };
        case "priest":
            return {
                "name": "Priest",
                "quote": "By the Light",
                "color": "#FFFFFF",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg",
            };
        case "paladin":
            return {
                "name": "Paladin",
                "quote": "The Light Demands Retribution",
                "color": "#F58CBA",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg",
            };
        case "rogue":
            return {
                "name": "Rogue",
                "quote": "Stabby Stabby",
                "color": "#FFF569",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg",
            };
        case "druid":
            return {
                "name": "Druid",
                "quote": "We are the preservers of the balance, now and forever, as Malfurion lies in the Dreaming. Never forget this.\n-Kal of Dolanaar",
                "color": "#FF7D0A",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg",
            };
        case "mage":
            return {
                "name": "Mage",
                "quote": "Bein' a mage means knowin' power can flow in more than one direction.\n-Ganvar Singebeard",
                "color": "#40C7EB",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg",
            };
        case "shaman":
            return {
                "name": "Shaman",
                "quote": "May the Elements Guide You",
                "color": "#0070DE",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg",
            };
        case "hunter":
            return {
                "name": "Hunter",
                "quote": "The way of the hunter is one of mastery over the beasts of the world, an unparalleled precision in marksmanship, and the knowledge of how to survive in situations where others would perish.\n-Ranger Sallina",
                "color": "#ABD473",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg",
            };
        default:
            return {
                "name": "Merw",
                "quote": "Merw Merw ChoCho Train",
                "color": "#A330C9",
                "thumbnail": "https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg",
            };
    }
}

exports.spells = function(className){
    const details = getClassDetails(className);
    const abilities = new Discord.RichEmbed()
        .setAuthor(details.name + "-Spells", details.thumbnail, wowHeadURL + className + abilitiesURL)
        .setTitle("Link")
        .setURL(wowHeadURL + className + abilitiesURL)
        .setDescription(details.quote)
        .setColor(details.color)
        .setThumbnail(details.thumbnail)
        .setTimestamp()
        .setFooter("Classic WoW Spells", wowIconURL);

    return abilities;
}

exports.guide = function(className){
    const details = getClassDetails(className);
    const guide = new Discord.RichEmbed()
        .setAuthor(details.name + "-Guide", details.thumbnail, guidesURL + className + overviewURL)
        .setTitle("Link")
        .setURL(guidesURL + className + overviewURL)
        .setDescription(details.quote)
        .setColor(details.color)
        .setThumbnail(details.thumbnail)
        .setTimestamp()
        .setFooter("Classic WoW Guide", wowIconURL);
    return guide;
}
