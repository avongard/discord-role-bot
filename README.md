# Discord Role Menu Bot

A simple Discord role menu bot built with [discord.js](https://discord.js.org/), capable of creating a customizable role menu that gives a user roles based on reactions.

## Features

- Customizable Role Menu
- Easy commands
- Assign multiple roles with proper reactions
- Remove role when reaction is taken away

## Commands

| Command | Description |
|---|---|
| `/rolemenu` | Creates the role menu in designated channel |

## Requirements

- [Node.js](https://nodejs.org/) v18 or newer
- [Discord.js](https://discord.js.org/)
- [Discord Bot Application](https://discord.com/developers/applications) with a bot token

## Bot Setup

1. Navigate to the [Discord Developer Portal](https://discord.com/developers/home)

2. Create a new application

3. In the Bot tab click Click Reset Token for config.json

4. In General Information tab record your Application ID for config.json

5. In the OAuth2 tab check the following boxes:

<img width="1102" height="343" alt="{3FE2B6DB-1952-42C5-BE21-8D36D15936CF}" src="https://github.com/user-attachments/assets/af419233-8d33-40b9-ab57-48633c04d175" />

<img width="686" height="556" alt="{7E2CC611-4103-46FE-B37B-FDF06A608678}" src="https://github.com/user-attachments/assets/8193c2c8-05e8-4844-a934-b2b967bcdab1" />

6. Then copy the URL at the bottom of the page and paste into your browser to invite the bot to your server.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/avongard/discord-music-bot.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install

   npm init -y

   npm install discord.js
   ```
   
## Set Up

1. Edit the config.json file with the values from before.

2. Adjust the menuTitle and menuDescription to meet what you're looking for.

3. Change up the menu with the reaction emojis, labels, and correct Role ID from Server Settings -> Roles

## Usage

1. Start the bot:
   ```bash
   npm start
   ```

2. In the channel you'd like the role menu to appear in - type `/rolemenu`

## Running 24/7

To keep the bot online continuously, consider:
- Using [PM2](https://pm2.keymetrics.io/) to manage the process and auto-restart on crash or reboot
- Hosting on a small VPS

## Stack

- [discord.js](https://discord.js.org/)

## Notes

- This repo will maintain development.
- If there are any issues, please let me know.
- I hope you enjoy.
