const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("@");

bot.on("ready",function() {
    bot.user.setGame("Gamer,@help");
    console.log("Le bot est bien été connecté");
});

bot.login("NDQwNjIxNDM3MjM0MDUzMTIw.DckZow.h-nifa-7M0tBPpxit-EGTBl9z98");

bot.on('message',message => {
    if (message.content ===  "ping") {
        message.reply("pong");        
       console.log("yes");
    }
    
    if (message.content === prefix + "help"){
        message.channel.send('voici les commandes du bot :\n-@help pour afficher les commandes');
        message.channel.send('\n-@ban pour bannir un personne');
        message.channel.send('\n-@kick pour kicker un personne du serveur');
        console.log("liste des commandes demander !");
    }
});


bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "⛔👑Gérant du serveur 🌟 ⛔");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expluser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expluser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBER pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "🗯membres-staff🗯").send(`**${member.user.username} a été expulsé du discord par **${message.author.username}**`)
        }).catch(console.error) 
    
    }

    if (command === "ban") {
        let modRole = message.guild.roles.find("name", "⛔👑Gérant du serveur 🌟 ⛔");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni avec succès.`).catch(console.error);
            message.guild.channels.find("name", "🗯membres-staff🗯").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error)

    }})

    bot.on('message',message => {
        if (message.content === "Je t'aime mon zguég") {
            message.reply("tg ptn");        
           console.log("yes");
        }
    })
