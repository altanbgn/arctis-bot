const fs = require("fs");

module.exports = async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')) || [];

	for (const file of commandFiles) {		
		if (interaction.commandName === file.split(".")[0]) {
			const command = require(`../commands/${file}`);

			try {
				await command.execute(client, interaction);
			} catch (error) {
				await interaction
					.reply({ content: `Please try this command again later. Possible bug reported to bot developers.\n\`${error}\`` })
					.catch(() => {})
			}
		}
	}
}