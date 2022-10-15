const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const utils = require('../utils');

const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('It helps you to get information about the speed of the bot.')

ping.execute = (client, interaction) => {
  try {
    const start = Date.now();
    interaction
      .reply("Pong!")
      .then(() => {
        const end = Date.now();
        const embed = new EmbedBuilder()
          .setTitle(client.user.username + " - Pong!")
          .setThumbnail(client.user.displayAvatarURL())
          .addFields([
            { name: `Message Ping`, value: `\`${end - start}ms\` 🛰️` },
            { name: `Message Latency`, value: `\`${Date.now() - start}ms\` 🛰️` },
            { name: `API Latency`, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
          ])
          .setTimestamp()
          .setFooter({ text: `Arctis Team ❤️` });

        return interaction.editReply({ embeds: [embed] }).catch(e => {});
      })
  } catch (error) {
    utils.log(error, 'error');
    return interaction
      .reply({
        content: `Please try this command again later. Possible bug reported to bot developers.\n\`${error}\``,
        ephemeral: true
      })
      .catch(error => { utils.log(error, 'error') });
  }
}

module.exports = ping.toJSON()