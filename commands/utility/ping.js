const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
  category: 'utility',
  data: 
    new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Pings the bot and replies with the latency.'),

    async execute(interaction) 
    {
      await interaction.reply(
        { content: `Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`,
          ephemeral: true } 
      );
    }
};