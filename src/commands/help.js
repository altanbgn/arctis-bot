const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("It helps you to get information about bot and commands.")
    .addStringOption(option => 
      option
        .setName("input")
        .setDescription("The command you want to get information about.")
        .setRequired(false)
    ),

  execute: async (client, interaction) => {
    const input = await interaction.options.getString("input");

    if (input) {
      const command = await client.commands.find(x => x.name === input);

      // If command not found! return error
      if (!command)
        return await interaction
          .reply({ content: 'Command is not defined.', ephemeral: true })
          .catch(() => {})

      const embed = new EmbedBuilder()
        .setTitle(`Command Info: ${command.name}`)
        .setDescription(`
          > **Description: \`${command.description}\`**
          ${command.options.length !== 0  
            ? `> **Options:**\n${command.options?.map(x => `> **\`${x.name}\` - \`${x.description}\`**`).join("\n")}`
            : ``
          }
        `)
        .setFooter({ text: `Arctis Team ❤️` });

      return await interaction
        .reply({ embeds: [embed], ephemeral: true })
        .catch(() => {});
    }

    const embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle(`${client.user.username}#${client.user.discriminator}`)
      .setDescription("It's time to listen to music on your discord server with a completely free and advanced interface. Music bot that supports playing music on many platforms that will make your server feel special. We support **Spotify, YouTube, SoundCloud**\n\nTo view more help on a specific command or category, run\n\`/help <command>\`")
      .addFields(
        { name: 'Basic Commands', value: client.commands.map(x => `\`/${x.name}\``).join(', ') }
      )
      .setFooter({ text: `Arctis Team ❤️` })

    return await interaction
      .reply({ embeds: [embed], ephemeral: true })
      .catch(() => {})
  }
}