const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a track.")
    .addStringOption(option => 
      option
        .setName("input")
        .setDescription("URL | Keyword")
        .setRequired(true)
  ),

  execute: async (client, interaction) => {
    // Checks if user entered voice channel
    if (!interaction.member.voice.channel) {
      return await interaction
        .reply({ content: `❌ Join a voice channel to use this command.` })
        .catch(() => {});
    }
        
    let input = await interaction.options.getString("input");
    
    // Stop command if no value is given!
    if (!input)
      return await interaction
        .reply({ content: `❌ Write the name or URL of the track you want to play.` })
        .catch(() => {});

    try {
      await interaction
        .reply({ content: `Processing...` })
        .catch(() => {});
        
      await client.distube.play(
        interaction.member.voice.channel,
        input,
        {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction
        }
      )
    } catch (error) {
      await interaction
        .editReply({ content: `❌ No results found!` })
        .catch(() => {});
    }
  }
}