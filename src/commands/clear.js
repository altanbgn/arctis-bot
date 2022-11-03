const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the music queue."),

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

    // Checks if queue is empty
    if (!queue.songs[0])
      return await interaction
        .reply({ content: `❌ The queue is empty.`})
        .catch(() => {});

    await queue.stop(interaction.guild.id);

    await interaction
      .reply({ content: "" })
      .catch(() => {})
  }
}