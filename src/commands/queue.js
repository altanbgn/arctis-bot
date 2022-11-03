const { SlashCommandBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("a line of people or things waiting to be handled"),

  execute: async (client, interaction) => {
    // Checks if user entered voice channel
    if (!interaction.member.voice.channel) {
      return await interaction
        .reply({ content: `❌ Join a voice channel to use this command.` })
        .catch(() => {});
    }

    const queue = client.distube.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return await interaction
        .reply({ content: `❌ No music currently playing.`})
        .catch(() => {});

    if (!queue.songs[0])
      return await interaction
        .reply({ content: `❌ Queue is empty.` })
        .catch(() => {});

    const track1 = [];

    for (const track of queue.songs) {
      track1.push({
        title: track.name,
        author: track.uploader.name,
        user: track.user,
        url: track.url,
        duration: track.duration
      })
    };

    const backID = "emojiBack";
    const forwardID = "emojiForward";

    const backButton = new ButtonBuilder({
      style: ButtonStyle.Secondary,
      emoji: "⬅️",
      custom_id: backID
    })

    const deleteButton = new ButtonBuilder({
      style: ButtonStyle.Secondary,
      emoji: "❌",
      customId: "close"
    });

    const forwardButton = new ButtonBuilder({
      style: ButtonStyle.Secondary,
      emoji: "➡️",
      customId: forwardID
    });

    let kaçtane = 8
    let page = 1
    let a = trackl.length / kaçtane

    // TODO: Complete queue list
  }
}