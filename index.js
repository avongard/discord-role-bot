const {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  REST,
  Routes,
} = require('discord.js');

const fs = require('fs');
const config = require('./config.json');

const MENU_FILE = './menu.json';

function loadMenu() {
  try {
    return JSON.parse(fs.readFileSync(MENU_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function saveMenu(data) {
  fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2));
}

let menu = loadMenu();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User],
});

const commands = [
  new SlashCommandBuilder()
    .setName('rolemenu')
    .setDescription('Post the reaction role menu in this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .toJSON(),
];

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(config.token);
  await rest.put(
    Routes.applicationGuildCommands(config.clientId, config.guildId),
    { body: commands }
  );
  console.log('Slash commands registered.');
}

client.once(Events.ClientReady, async (c) => {
  console.log(`Logged in as ${c.user.tag}`);
  try {
    await registerCommands();
  } catch (err) {
    console.error('Failed to register commands:', err);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'rolemenu') return;

  const description =
    `${config.menuDescription}\n\n` +
    config.roles.map((r) => `${r.emoji}  **${r.label}**`).join('\n\n');

  const embed = new EmbedBuilder()
    .setTitle(config.menuTitle)
    .setDescription(description)
    .setColor(0x5865f2);

  await interaction.reply({ content: 'Posting menu...', ephemeral: true });

  const message = await interaction.channel.send({ embeds: [embed] });

  for (const r of config.roles) {
    await message.react(r.emoji);
  }

  menu = { channelId: message.channelId, messageId: message.id };
  saveMenu(menu);

  await interaction.editReply('Role menu posted!');
});

async function handleReaction(reaction, user, isAdd) {
  if (user.bot) return;

  try {
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
  } catch (err) {
    console.error('Failed to fetch partial:', err);
    return;
  }

  if (!menu || reaction.message.id !== menu.messageId) return;

  const emojiKey = reaction.emoji.id ?? reaction.emoji.name;
  const entry = config.roles.find((r) => r.emoji === emojiKey);

  if (!entry) {
    if (isAdd) await reaction.users.remove(user.id).catch(() => {});
    return;
  }

  try {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);

    if (isAdd) {
      await member.roles.add(entry.roleId);
      console.log(`Gave ${entry.label} to ${user.tag}`);
    } else {
      await member.roles.remove(entry.roleId);
      console.log(`Removed ${entry.label} from ${user.tag}`);
    }
  } catch (err) {
    console.error(`Failed to update role "${entry.label}":`, err);
  }
}

client.on(Events.MessageReactionAdd, (reaction, user) =>
  handleReaction(reaction, user, true)
);
client.on(Events.MessageReactionRemove, (reaction, user) =>
  handleReaction(reaction, user, false)
);

client.login(config.token);