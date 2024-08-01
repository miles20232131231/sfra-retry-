const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('SFRA | Session Startup')
            .setDescription(` <@${interaction.user.id}> started a session! Are you guys ready to start the session? Kindly make sure to check out <#1263673502116876447> for important information before participating.

                For registering a vehicle, /register can be used and /unregister for unregistration. Both of these commands may be run in <#1268251210520203265>.

                The session shall begin once this hits **__${reactions}+__**`)
            .setImage('https://cdn.discordapp.com/attachments/1267950415069188199/1268250763184836619/SFRC_5.png?ex=66abbe10&is=66aa6c90&hm=686fc9319589589e932ad606af20891cbba16a473d47ba45c02978aad189179d&')
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1267950415069188199/1268248042998468648/SFRA.png?ex=66abbb88&is=66aa6a08&hm=a6f4079757e778f7de61575a76e56068306b31073ae86dd85b2d3f5540073694&'
            });

        const message = await interaction.channel.send({
            content: '@everyone',
            embeds: [embed]
        });

        await message.react('✅');

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Startup")
            .setDescription(`<@${interaction.user.id}> has started up a session in <#1263673502331043968>`)
            .setFooter({
                text: 'Southwest Florida Roleplay Adventures',
                iconURL: 'https://cdn.discordapp.com/attachments/1267950415069188199/1268248042998468648/SFRA.png?ex=66abbb88&is=66aa6a08&hm=a6f4079757e778f7de61575a76e56068306b31073ae86dd85b2d3f5540073694&'
            });

        const targetChannel = await interaction.client.channels.fetch('1268251301301588043');
        await targetChannel.send({ embeds: [newEmbed] });

        const filter = (reaction, user) => reaction.emoji.name === '✅';

        const collector = message.createReactionCollector({ filter, time: 86400000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.count} reactions`);
            if (reaction.count >= reactions) {
                const settingUpEmbed = new EmbedBuilder()
                    .setDescription('Setting up!')
                    .setFooter({
                        text: 'Southwest Florida Roleplay Adventures',
                        iconURL: 'https://cdn.discordapp.com/attachments/1267950415069188199/1268248042998468648/SFRA.png?ex=66abbb88&is=66aa6a08&hm=a6f4079757e778f7de61575a76e56068306b31073ae86dd85b2d3f5540073694&'
                    });

                interaction.channel.send({ embeds: [settingUpEmbed] });
                collector.stop();
            }
        });

        collector.on('end', collected => {
            console.log(`Collector ended. Total reactions: ${collected.size}`);
        });

        await interaction.reply({ content: `You Have Initiated A Session Successfully.`, ephemeral: true });
    },
};
