const { SlashCommandBuilder } = require("@discordjs/builders");

const play = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Play a track.")
  .addSubcommand(subcommand => 
    subcommand
      .setName("normal")
      .setDescription("Open music from other platforms.")
      .addStringOption(option => 
        option
          .setName('name')
          .setDescription('Write your music name.')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand => 
    subcommand
      .setName("playlist")
      .setDescription("Write your playlist name.")
      .addStringOption(option => 
        option
          .setName('name')
          .setDescription('Write your music name.')
          .setRequired(true)
      )
  )

play.execute = (client, interaction) => {

  try {
    let subcommand = interaction.options.getSubcommand()
    
    switch (subcommand) {
      case 'normal': {
        let name = interaction.options.getString('name')

        if (!name)
          return interaction.reply({ content: `Write the name of the track you want to search. ❌`, ephemeral: true }).catch(() => {});

        try {
          return client.distube.play(
            interaction.member.voice.channel,
            name,
            {
              member: interaction.member,
              textChannel: interaction.channel,
              interaction
            }
          )
        } catch (error) {
          return interaction.editReply({ content: `No results found! ❌`, ephemeral: true }).catch(() => {});
        }
      }
    }

    return interaction.reply("Play coming soon...").catch(() => {});
  } catch (error) {
    return interaction.reply({ content: `Please try this command again later. Possible bug reported to bot developers.\n\`${e}\``, ephemeral: true }).catch(() => {})
  }
}

module.exports = play.toJSON()