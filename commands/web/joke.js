const fetch = require("node-fetch");

const { SlashCommandBuilder } = require('discord.js');

const JOKEAPI_URL = "https://v2.jokeapi.dev/joke/";

module.exports = 
{
  category: 'web',
  data: 
    new SlashCommandBuilder()
            .setName('joke')
            .setDescription('Sends you a joke.'),

    async execute(interaction) 
    {
        fetch(JOKEAPI_URL + "Any?type=twopart")
          .then(response => response.json())
          .then(result => {
            interaction.reply(result.setup + "\n" + "||" + result.delivery + "||");
          });
    }
};