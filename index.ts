import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import fs from 'fs'
const yml = require('js-yaml')

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
    ]
})

const token = yml.load(fs.readFileSync('config/token.yml'))
const config = yml.load(fs.readFileSync('config/config.yml'))

client.on('ready', () => {

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: config.server.id,
        botOwners: [`${config.server.ownerid}`]
    })

    client.user?.setActivity({ name: 'Modinator LITE', type: 'PLAYING' })

})

client.login(token.token)