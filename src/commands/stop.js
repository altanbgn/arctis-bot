const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops music."),

  execute: async (client, interaction) => {
    // Checks if user entered voice channel
    if (!interaction.member.voice.channel) {
      return await interaction
        .reply({ content: `❌ Join a voice channel to use this command.` })
        .catch(() => {});
    }

    const queue = client.distube.getQueue(interaction.guild.id);

    // Checks if music is playing
    if (!queue || !queue.playing)
      return await interaction
        .reply({ content: `❌ No music currently playing.`})
        .catch(() => {});

    // Stops ongoing music
    queue.stop(interaction.guild.id);
  }
}