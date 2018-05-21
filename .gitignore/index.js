const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const playlist = require('discord.js-music');
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const music = require('discord.js-music-v11')

const adapter = new FileSync('database.json');
const db = low(adapter);

music(bot, {
	prefix: '@',       
	global: false,     
	maxQueueSize: 10,  
	clearInvoker: true, 
    channel: 'music'  
});

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("@");
var dispatcher;
var randnum = 0;

bot.on("ready",function() {
    bot.user.setGame("Gameur,@help");
    console.log("Le bot est bien été connecté");
});

function sendError(message, description) {
    message.channel.send({embed: {
        color: 15158332,
        description: ':x: ' + description
    }});
}

bot.on('message',message => {
    if (message.content === prefix + "création") {
        message.channel.send("Création du bot le __11/05/2018__");   
       console.log("yes");
    }
    if (message.content === prefix + "créateur") {
        message.channel.send("__**Ce bot a été créer par Tamaki Yagami#6540**__");   
       console.log("yes");
    }
    if (message.content ===  "ping") {
        message.reply("pong");   
        console.log("yes");
    }
    
    //if (message.content === prefix + "help"){
        //message.channel.send('voici les commandes du bot :\n-@help pour afficher les commandes \n-@ban pour bannir un personne \n-@kick pour kicker un personne du serveur \n-@xp pour voir l xp gagné \n-@ping pour voir les ping du serveur  \n-@clear pour supprimé les message \n-@création voir la date de création du bot \n-@créateur pour voir qui a créée ce bot');
        //console.log("liste des commandes demander !");
    //}
    
    }
);


bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "🔐 『Équipe Staff』");
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
        let modRole = message.guild.roles.find("name", "🔐 『Équipe Staff』");
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


    bot.on('message', message => {

        var msgauthor = message.author.id;
    
        if(message.author.bot)return;
    
        if(!db.get("xp").find({user: msgauthor}).value()){
            db.get("xp").push({user: msgauthor, xp: 1}).write();
        }else{
            var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
            console.log(userxpdb);
            var userxp = Object.values(userxpdb)
            console.log(userxp)
            console.log(`Nombre d'xp: ${userxp[1]}`)
    
            db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    
        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des xp de ${message.author.username}`)
                .setColor('#0AF340')
                .setDescription("Affichage des XP")
                .addField("XP:", `${xpfinal[1]} xp `)
                .setFooter("Si tu veux plus d'xp sois plus actifs 😉")
            message.channel.send({embed: xp_embed});
            
        }}})


bot.on('guildMemberAdd' , member => {
    member.createDM().then(channel => {
        return channel.send('bienvenue sur mon serveur , n oublie pas de lire le règlement et n hésite pas partagés le discord au maximum ' + member.displayName);
    }).catch(console.error);
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
		case "ping":
		message.delete()
        message.channel.sendMessage('temp de latence avec le serveur:  `' + `${message.createdTimestamp - Date.now()}` + 'ms`').catch(console.log("ping du serveur demander !"));
        break;
		case "clear":
        if (message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.fetchMessages()
                .then(function(list){
                    message.channel.bulkDelete(list).catch(console.log("message du serveur effacée"));
                }, function(err){message.channel.send("Erreur")})}
        }});

bot.on('message', message => {
        if (message.content === prefix + "help") {
			message.delete()
            var help_embed = new Discord.RichEmbed()
                .setTitle("__**Commande du bot**__")
                .setDescription(" __voici les commandes du bot :__")
                .addField("-@help", "pour afficher les commandes")
                .addField("-@ban", "pour bannir un personne")
                .addField("-@kick", "pour kicker un personne du serveur")
                .addField("-@xp", "pour voir l xp gagné")
                .addField("-@ping", "pour voir les ping du serveur")
                .addField("-@clear", "pour supprimé les message")
				.addField("-@création", "voir la date de création du bot")
				.addField("-@créateur", "pour voir qui a créée ce bot")
				.addField("-@avatar", "pour voir votre photo de profile")
                .addField("-@Salut", "pour que le bot vous parle")
                .addField("-@comment vas-tu ?", "pour que le bot vous parle")
                .setColor("#00EFEF")
                .setFooter("Ceci sont les commande du bot ! ")
            message.channel.sendEmbed(help_embed)
        }});

bot.on('message', message => {
    if (message.content === prefix + "comment vas-tu ?"){
        random();
        if (randnum == 1){
            message.channel.send("Merci je vais très bein !");
            console.log(randnum);
        }
        if (randnum == 2){
            message.channel.send("ça va pas mais ça va aller merci de te sousier de moi !");
            console.log(randnum)
        }
    }
})
bot.on('message', message => {
    if (message.content === prefix + "Salut"){
        randim();
        if (randnum == 1){
            message.channel.send("salut");
            console.log(randnum);
        }
        if (randnum == 2){
            message.channel.send("yo");
            console.log(randnum)
        }
        if (randnum == 3){
            message.channel.send("slt");
            console.log(randnum)
        }
        if (randnum == 4){
            message.channel.send("yo 😋");
            console.log(randnum)
        }
        if (randnum == 5){
            message.channel.send("salut🤨");
            console.log(randnum)
        }
    
    }
})
function random (min, max){
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
    }   

function randim (min, max){
    min = Math.ceil(0);
    max = Math.floor(5);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
    } 
    
    
bot.on('message', message => {
	if (message.content === prefix + 'avatar') {
	  message.reply(message.author.avatarURL);
	}
  });

  bot.on('message', message => {
	
	if (!message.guild) return;
  
	if (message.content === prefix + 'join') {
	  // Only try to join the sender's voice channel if they are in one themselves
	  if (message.member.voiceChannel) {
		message.member.voiceChannel.join()
		  .then(connection => { // Connection is an instance of VoiceConnection
			message.reply('j\'ai réussi a ma connecter au channel audio !');
		  })
		  .catch(console.log);
	  } else {
		message.reply('Vous devez d\'abord rejoindre une chaîne vocale!');
	  }
	}
  })


  bot.on(`message`, message => {
    if(message.content[0] === prefix) {
        let splitMessage = message.content.split(" ");
        if(splitMessage[0] === prefix + `play`) {
            if(splitMessage.length === 2)
            {
                if(message.member.voiceChannel)
                {
                    message.member.voiceChannel.join().then(connection => {
                        dispatcher = connection.playArbitraryInput('https://www.youtube.com/watch?v=ZMwbswoUdP8');

                        dispatcher.on('error', e => {
                            console.log(e);
                        });

                        dispatcher.on('end' , e => {
                            dispatcher = undefined;
                            console.log('Fin du son');
                        });
                    }).catch(console.log);
                }
                else
                    sendError(message, "Erreur, Vous devez d'abord rejoindre un canal vocal");
            }
            else
                sendError(message, 'Erreur, problème dans les paramètres');
        }
        else if(splitMessage[0] === prefix + `pause`) {
            if(dispatcher !== undefined)
                dispatcher.pause()
        }
        else if(splitMessage[0] === prefix + `resume`) 
            if(dispatcher !== undefined)
                dispatcher.resume();
        }
    }
  );

bot.login("NDQwNjIxNDM3MjM0MDUzMTIw.DcyC_w.JIor2AV27wRC4ojbf3ee3hLLhFU")
