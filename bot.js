require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Create the client instance with necessary intents
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Player stats
let players = {};

client.once('ready', () => {
  console.log('Cultivator\'s Path bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const userId = message.author.id;

  // Initialize player if not already done
  if (!players[userId]) {
    players[userId] = {
      name: message.author.username,
      cultivation: 1,
      strength: 1,
      experience: 0,
    };
  }

  // Start the game
  if (message.content.toLowerCase() === '!start') {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Cultivator\'s Path')
      .setDescription('Welcome to the world of cultivation! Choose your martial art and start your journey.')
      .addFields(
        { name: 'Objective', value: 'Cultivate your Qi, learn martial arts, and become a master cultivator.' },
        { name: 'Commands', value: '!train - Cultivate and train, !stats - View your stats.' }
      )
      .setFooter({ text: 'Use !train to begin your cultivation.' });

    message.channel.send({ embeds: [embed] });
  }

  // Display player stats
  if (message.content.toLowerCase() === '!stats') {
    const player = players[userId];
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle(`${player.name}'s Stats`)
      .addFields(
        { name: 'Cultivation', value: `${player.cultivation}`, inline: true },
        { name: 'Strength', value: `${player.strength}`, inline: true },
        { name: 'Experience', value: `${player.experience}`, inline: true }
      )
      .setFooter({ text: 'Cultivate your path further!' });

    message.channel.send({ embeds: [embed] });
  }

  // Train and increase cultivation
  if (message.content.toLowerCase() === '!train') {
    const player = players[userId];
    
    // Simulate training and gaining experience
    player.experience += 10;
    player.strength += 1;
    
    // Level up cultivation after certain experience
    if (player.experience >= 100) {
      player.cultivation += 1;
      player.experience = 0;  // Reset experience after leveling up
    }

    const embed = new EmbedBuilder()
      .setColor(0xFFFF00)
      .setTitle('Training Complete')
      .setDescription(`You trained diligently and your cultivation has improved!`)
      .addFields(
        { name: 'Strength', value: `${player.strength}`, inline: true },
        { name: 'Cultivation Level', value: `${player.cultivation}`, inline: true },
        { name: 'Experience', value: `${player.experience}`, inline: true }
      )
      .setFooter({ text: 'Continue cultivating to become stronger!' });

    message.channel.send({ embeds: [embed] });
  }

  // Additional commands could be added here, like battles, quests, or other features
});

// Log in using the bot token from the .env file
client.login(process.env.BOT_TOKEN);
