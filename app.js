const fs = require('node:fs');
const path = require('node:path');
const fetch = require('node-fetch');

const { clientId, guildId, token } = require('./config.json');

const { createInterface } = require('node:readline');
const { execSync } = require('child_process');

const { REST, Routes } = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const wait = require('node:timers/promises').setTimeout;

/**
 * Registering commands from files.
 */
client.commands = new Collection();
const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) 
{
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) 
  {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) 
    {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    } 
    else
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

/**
 * Event handling / Registering events from files.
 */
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) 
{
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) 
    client.once(event.name, (...args) => event.execute(...args));
  else
    client.on(event.name, (...args) => event.execute(...args));
}

const rl = createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async () => 
{
  // Checking for rate limiting.
  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);
  if(!ratelimitTest.ok) 
  {
    await question(`IP is rate limited by Discord. Press "Enter" to kill program. 
                  (you'll need to rerun the program once you reconnect)`)
    execSync('kill 1');
    return;
  };
  
  // Login to our bot account.
  await client.login(token).catch((err) => 
  {
    throw err
  });

  /*
  // Delete current commands.
  // Run this if you had once pushed commands that no longer exist.
  await rest.put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);
  */

  // Push commands to the application.
  await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });

})();
