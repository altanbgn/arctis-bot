const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips ongoing music onto next one.")
    .addIntegerOption(option => 
      option
        .setName("number")
        .setDescription("Type how many songs you want to skip.")
        .setRequired(false)
        .setMinValue(0)
    ),

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

    const number = interaction.options.getNumber('number');

    if (number) {
      // Checks if entered number is valid
      if (!queue.songs.length > number)
        return await interaction
          .reply({ content: `❌ The number you entered is higher than the amount of songs in the queue.` })
          .catch(() => {});

      if (isNaN(number))
        return await interaction
          .reply({ content: `Please write a valid number.` })
          .catch(() => {});

      if (1 > number)
        return await interaction
          .reply({ content: `Please write a valid number.` })
          .catch(() => {});

      try {
        await interaction
          .reply({ content: `Processing...` })
          .catch(() => {});

        await client.distube.jump(interaction, number)
      } catch (error) {
        await interaction
          .editReply({ content: `❌ Queue is empty.` })
          .catch(() => {});
      }
    } else {
      try {
        const success = await queue.skip();
        return await interaction
          .reply({ content: success ? `Skipped song ✅` : `❌ Something went wrong.` });
      } catch (error) {
        await interaction
        .editReply({ content: `❌ Queue is empty.` })
        .catch(() => {});
      }
    }
  }
}