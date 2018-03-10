const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chratis_cooldown_time = 10;
const chratis_talked_users = new Set();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
});

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`:loudspeaker: **${member}** just joined the server. Have a great time here!`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content === '^help') {
    message.channel.send("DMed you! Check it out for all the info!")
    return message.author.send("**My Commands:** *all commands start with `^` prefix.*\n\t`help` shows this message.\n\t`test` tests to see if the bot is properly set up.\n\t`info` shows bot info.\n\t`ad` bumps your channel to the top of the list.\n\n**IMPORTANT**: The `^ad` command can be used every 10 seconds!\n**JOIN:** [*official discord]* https://discord.gg/4T22QKn")
  }
  if (message.content === '^invite') {
    message.channel.send("I DMed you a link to add me to your server!")
    return message.author.send("**Invite me** to your discord:\n:link: https://discordapp.com/api/oauth2/authorize?client_id=421744026740457474&permissions=2146958583&scope=bot :link:")
  }
  if (message.content === '^test') {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I test for you? I have a **Admin only** policy.");
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("You don't have a **#ads** channel in the server! Please create one then type `^test`!");
    message.channel.send("**__ALL SYSTEMS OPERATIONAL!__** In other words you did everything right and CussOut can run properly!")
  }
  if (message.content === '^ad') {
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("The bot is not properly set up! Please type `^test`.");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I do this for you? I have a **Admin only** policy.");
    if (chratis_talked_users.has(message.author.id)) return message.reply("You have to wait before using this command again.\n*[Only 1 server can be advertised every 10 seconds.]*");
    message.channel.createInvite()
    	.then(invite => {
	    bot.channels.filter(c => c.name === 'ads').forEach(channel => channel.send(`Join **${message.guild.name}**!\n\t${message.guild.name} is a dope server with lots of cool stuff.\n\n**-----------------------------------------------------------**\n      https://www.discord.gg/${invite.code}\n\n**-----------------------------------------------------------**\n[Type \`^help\` for help and a link to join the official server!]`));
        });
    message.channel.send("Your server has been advirtised!")
    chratis_talked_users.add(message.author.id);
    setTimeout(() => {
      chratis_talked_users.delete(message.author.id);
    }, chratis_cooldown_time * 1000);
  } 
  if (message.content === '^info') {
    message.author.send(`**AdBot:**\n\n\tRunning on: ${bot.guilds.size} servers.\n\n\tWatching: ${bot.users.size} online users.`)
    return message.channel.send("I DMed you my info!")
  }
  if (message.content === '^custom-ad') {
    let adschannel = message.guild.channels.find(`name`, "ads");
    if(!adschannel) return message.channel.send("The bot is not properly set up! Please type `^test`.");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No. Why would I do this for you? I have a **Admin only** policy.");
    if (chratis_talked_users.has(message.author.id)) return message.reply("You have to wait before using this command again.\n*[Only 1 server can be advertised every 10 seconds.]*");
    const sayMessage = args.join(" ");
    message.channel.send("Your server has been advirtised!")
    bot.channels.filter(c => c.name === 'ads').forEach(channel => channel.send(`**-----------------------------------------------------------**\n\n${sayMessage}\n\n**-----------------------------------------------------------**\n[Type \`^help\` for help and a link to join the official server!]`));
    chratis_talked_users.add(message.author.id);
    setTimeout(() => {
      chratis_talked_users.delete(message.author.id);
    }, chratis_cooldown_time * 1000);
  } 
});

//Ik5KSLzA6C
//test lol note thingh
//-----------------------------------------------------------
//    [do `^help` for help and join official server!]

bot.login(process.env.BOT_TOKEN);

