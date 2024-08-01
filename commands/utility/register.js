const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('By using this command you can register you command here.')
        .addIntegerOption(option =>
            option.setName('year')
                .setDescription('Vehicle Year')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('make')
                .setDescription('Vehicle Make')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('model')
                .setDescription('Vehicle Model')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Vehicle Color')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('number-plate')
                .setDescription('Vehicle Number Plate')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const year = interaction.options.getInteger('year');
            const make = interaction.options.getString('make');
            const model = interaction.options.getString('model');
            const color = interaction.options.getString('color');
            const numberPlate = interaction.options.getString('number-plate');

            const user = interaction.user.username;

            const embed = new EmbedBuilder()
                .setTitle('Vehicle Registered')
                .setDescription(`<@${interaction.user.id}> has registered their vehicle to the database. The information below is the vehicle information.
                
                **Vehicle Information:**
                
                Owner: <@${interaction.user.id}>
                Year: **${year}**
                Make: **${make}**
                Model: **${model}**
                Color: **${color}**
                Number Plate: **${numberPlate}**`)

            const targetChannel = await interaction.client.channels.fetch('1268251210520203265');
            if (targetChannel.isTextBased()) {
                await targetChannel.send({ embeds: [embed] });
            }

            const confirmationEmbed = new EmbedBuilder()
                .setDescription(` A new vehicle has been registered by <@${interaction.user.id}>. Please navigate to <#1268251210520203265> to view the registration details.`)
                .setColor(0xfd9797)
                .setFooter({
                    text: 'Southwest Florida Roleplay Adventures',
                    iconURL: 'https://cdn.discordapp.com/attachments/1267950415069188199/1268248042998468648/SFRA.png?ex=66abbb88&is=66aa6a08&hm=a6f4079757e778f7de61575a76e56068306b31073ae86dd85b2d3f5540073694&'
                });

            const confirmationChannel = await interaction.client.channels.fetch('1268251210520203265');
            if (confirmationChannel.isTextBased()) {
                await confirmationChannel.send({ embeds: [confirmationEmbed] });
            }

            await interaction.editReply({ content: 'Vehicle has now been registered successfully. If you would like to view it head over to <#1268251210520203265>', ephemeral: true });
        } catch (error) {
            console.error('Error processing vehicle registration:', error);
            await interaction.editReply({ content: 'There was an error while processing your request.', ephemeral: true });
        }
    },
};
