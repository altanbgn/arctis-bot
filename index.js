const { Client, REST, Routes, GatewayIntentBits, Partials } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const fs = require("fs");
// local
const utils = require('./src/utils');
require('dotenv').config()

console.clear();
utils.log("Starting arctis-bot!");

const commands = [];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const client = new Client({
  partials: [
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.User, // for discord user
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildMessages, // for guild message related things
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.MessageContent,
  ],
});

client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: false,
  leaveOnEmpty: true,
  emptyCooldown: 300,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js')) || [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')) || [];
const playerEventFile = fs.readdirSync('./src/events/player').filter(file => file.endsWith('.js')) || [];

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  let eventName = file.split(".")[0];

  client.on(eventName, event.bind(null, client));
  delete require.cache[require.resolve(`./src/events/${file}`)];
  utils.log(`Loaded client event: ${eventName}`);
}

for (const file of playerEventFile) {
  const event = require(`./src/events/player/${file}`);
  let eventName = file.split(".")[0];

  client.distube.on(eventName, event.bind(null, client));
  delete require.cache[require.resolve(`./src/events/player/${file}`)];
  utils.log(`Loaded player event: ${eventName}`);
}

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  // Set a new item in the array
	// With the key as the command name and the value as the exported module
  commands.push(command);
  utils.log(`Loaded command: ${command.name}`);
}

const options = {
  body: commands
}

const main = async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      options
    );

    client.login(process.env.TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();