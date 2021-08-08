const { MessageEmbed } = require("discord.js");
const guildConfig = require("../models/guild");

module.exports = async (client, message) => {
    const { info, embed } = client.config;
    const { guild, channel, author, content, mentions } = message;
    let member = message.member;
    
    const { owner } = info;
    const { color, emoji, footer } = embed;

    const config = guildConfig.findOne({ id: guild.id }).exec();
    let prefix = config.prefix ? config.prefix : client.config.info.prefix;

    const args = content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    
    let command;

    if (mentions.users.get(client.user.id)) {
        channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(color.positive)
                .setAuthor(author.tag, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
                .setTitle("Hello! :smile:")
                .setDescription(`This is a discord.js template made by [aanthr0](https://github.com/aanthr0). Enjoy :kissing_heart:`)
                .setFooter(footer)
            ]
        });
        return;
    };

    if (!content.startsWith(prefix) || !cmd) return;
    if (!member) member = await guild.fetchMember(author);

    if (client.commands.has(cmd)) command = client.commands.get(cmd);
    else if (client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd));

    if (!command) return;
    const { name, ownerOnly, minArgs, maxArgs, usage } = command.help;

    if (ownerOnly == true && !owners.includes(author.id)) {
        channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(color.negative)
                .setAuthor(author.tag, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
                .setTitle(`${emoji.negative} Error!`)
                .addField("Invalid Permissions", "To run this command, you need to be a bot owner!")
                .setFooter(footer)
            ]
        });
        return;
    };

    let reqArgs;
    if (minArgs === maxArgs) reqArgs = `This command requires ${minArgs} arguments!`;
    if (minArgs > 0 && maxArgs == -1) reqArgs = `This command requires at least ${minArgs} arguments!`;
    if (minArgs !== maxArgs) reqArgs = `This command requires ${minArgs}-${maxArgs} arguments!`;

    if (args.length < minArgs) {
        channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(color.negative)
                .setAuthor(author.tag, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
                .setTitle(`${emoji.negative} Error!`)
                .addField("Not Enough Arguments!", `${reqArgs}\n*Usage: ${prefix}${name} ${usage}*`)
                .setFooter(footer)
            ]
        });
        return;
    }
    if (args.length > maxArgs && maxArgs !== -1) {
        channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(color.negative)
                .setAuthor(author.tag, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
                .setTitle(`${emoji.negative} Error!`)
                .addField("Too Many Arguments!", `${reqArgs}\n*Usage: ${prefix}${name} ${usage}*`)
                .setFooter(footer)
            ]
        });
        return;
    };

    if (command) command.run(client, message, args);
};
