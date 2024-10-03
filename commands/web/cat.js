const fetch = require("node-fetch");

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = 
{
  category: 'web',
  data: 
    new SlashCommandBuilder()
          .setName('cat')
          .setDescription('Send you a cat picture.'),

    async execute(interaction) 
    {
      /*fetch("http://cataas.com/cat?limit=1", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error)); 
      */

      // doesnt work as intended currently
      const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('purrrrrr')
      .setImage('https://cataas.com/cat')

      await interaction.reply({ embeds: [exampleEmbed] });
      
    }
};