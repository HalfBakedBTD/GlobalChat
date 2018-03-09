const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const badWords = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    for (i = 0; i < badWords.length; i++) {
        var rgx = new RegExp(badWords[i], 'gi');
        if (rgx.test(message.content)) {
            return bot.channels.filter(c => c.name.toLowerCase() === 'global').forEach(channel => channel.send(`**<@${message.author.id}>** from **${message.guild.name}** server:\n  ${message.author.lastMessage}`));
        }
    }
  if (message.content === '^help') {
    message.channel.send("DMed you! Check it out for all the info!")
    return message.author.send("**My Commands:** *all commands start with `^` prefix.*\n\t`help` shows this message.\n\t`test` tests to see if the bot is properly set up.\n\t`info` shows bot info.")
  }
  if (message.content === '^invite') {
    message.channel.send("I DMed you a link to add me to your server!")
    return message.author.send("**Invite me** to your discord:\n:link:  :link:")
  }
  if (message.content === '^test') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I test for you? I have a **Admin only** policy.");
    let globalchannel = message.guild.channels.find(`name`, "global");
    if(!globalchannel) return message.channel.send("You don't have a **#global** channel in the server! Please create one then type `,test`!");
    message.channel.send("**__ALL SYSTEMS OPERATIONAL!__** In other words you did everything right and CussOut can run properly!")
  }
  if (message.content === '^info') {
    message.author.send(`**CussOut:**\n\n\tRunning on: ${bot.guilds.size} servers.\n\n\tWatching: ${bot.users.size} online users.`)
    return message.channel.send("I DMed you my info!")
  }
});

//Ik5KSLzA6C
//test lol note thing

bot.login(process.env.BOT_TOKEN);

