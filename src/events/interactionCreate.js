const fs = require("fs");

module.exports = (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')) || [];

	for (const file of commandFiles) {		
		if (interaction.commandName === file.split(".")[0]) {
			const command = require(`../commands/${file}`);

			command.execute(client, interaction);
		}
	}
}