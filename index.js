const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chratis_cooldown_time = 60;
const chratis_talked_users = new Set();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  if (message.content === '^help') {
    message.channel.send("DMed you! Check it out for all the info!")
    return message.author.send("**My Commands:** *all commands start with `^` prefix.*\n\t`help` shows this message.\n\t`test` tests to see if the bot is properly set up.\n\t`info` shows bot info.\n\t`ad` bumps your channel to the top of the list.")
  }
  if (message.content === '^invite') {
    message.channel.send("I DMed you a link to add me to your server!")
    return message.author.send("**Invite me** to your discord:\n:link: https://discordapp.com/api/oauth2/authorize?client_id=421744026740457474&permissions=2146958583&scope=bot :link:")
  }
  if (message.content === '^test') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I test for you? I have a **Admin only** policy.");
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("You don't have a **#ads** channel in the server! Please create one then type `,test`!");
    message.channel.send("**__ALL SYSTEMS OPERATIONAL!__** In other words you did everything right and CussOut can run properly!")
  }
  if (message.content === '^ad') {
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("The bot is not properly set up! Please type `^test`.");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I do this for you? I have a **Admin only** policy.");
    if (chratis_talked_users.has(message.author.id)) return message.reply("This command has a 5 minute cooldown.");
    message.channel.createInvite()
    	.then(invite => {
	    bot.channels.filter(c => c.name.toLowerCase() === 'ads').forEach(channel => channel.send(`Join **${message.guild.name}**!\n\t${message.guild.name} is a dope server with lots of cool stuff.\n\n**-----------------------------------------------------------**\nhttps://www.discord.gg/${invite.code}`));
        });
    message.channel.send("Your server has been advirtized for!")
    chratis_talked_users.add(message.author.id);
    setTimeout(() => {
      chratis_talked_users.delete(message.author.id);
    }, chratis_cooldown_time * 5000);
  } 
});

//Ik5KSLzA6C
//test lol note thingh

bot.login(process.env.BOT_TOKEN);

