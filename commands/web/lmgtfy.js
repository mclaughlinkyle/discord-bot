const { SlashCommandBuilder } = require('discord.js');

module.exports = 
{
  category: 'web',
  data: 
    new SlashCommandBuilder()
            .setName('lmgtfy')
            .setDescription('Generate a LetMeGoogleThatForYou link.')
            .addStringOption(option =>
              option.setName('search')
                .setDescription('What to search Google for.')
                .setRequired(true)),
  
    async execute(interaction) 
    {
      const lmgtfyUrl = "https://letmegooglethat.com/?q=";
      // does nothing rn
      interaction.reply('');
    }
};;