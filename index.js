const { Client, REST, Routes, GatewayIntentBits, Partials } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const fs = require("fs");
// local
const utils = require('./src/utils');
require('dotenv').config();

console.clear();
utils.log("Starting arctis-bot!");

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

client.commands = [];
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
client.distube.on('error', (channel, error) => {
  utils.log(error, 'error');
  channel.send(`An error occured: ${error.slice(0, 1979)}`);
})


// Get files to a variable
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js')) || [];
const playerEventFile = fs.readdirSync('./src/events/player').filter(file => file.endsWith('.js')) || [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')) || [];

// Run every event file
for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  let eventName = file.split(".")[0];

  client.on(eventName, event.bind(null, client));
  delete require.cache[require.resolve(`./src/events/${file}`)];
  utils.log(`Loaded client event: ${eventName}`);
}

// Run every player event file
for (const file of playerEventFile) {
  const event = require(`./src/events/player/${file}`);
  let eventName = file.split(".")[0];

  client.distube.on(eventName, event.bind(null, client));
  delete require.cache[require.resolve(`./src/events/player/${file}`)];
  utils.log(`Loaded player event: ${eventName}`);
}

// Get every command file
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);

  client.commands.push(command);
  utils.log(`Loaded command: ${command.name}`);
}

rest.put(
  Routes.applicationCommands(process.env.CLIENT_ID),
  { body: client.commands }
);

client.login(process.env.TOKEN);