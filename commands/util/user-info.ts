import { ICommand } from "wokcommands";
import fs from 'fs'
const yml = require('js-yaml')

const config = yml.load(fs.readFileSync('config/config.yml'))

export default {
    category: 'utility',
    description: 'Give information about a user',

    slash: true,
    testOnly: true,

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user you want information about, if left blank, your information will be shown',
        }
    ],

    callback: async ({ interaction, guild }) => {

        function getUser() {
            if (interaction.options.getUser('user')) {
                return guild?.members.cache.get(interaction.options.getUser('user')!.id)
            } else {
                const intUser = guild?.members.cache.get(interaction.user.id!)
                return intUser
            }
        }

        function isBot() {
            if (getUser()!.user.bot) return 'Yes'
            else return 'No'
        }

        function getAvatarURL() {
            if (getUser()?.user.avatar) {
                const url = `${getUser()!.user.displayAvatarURL()}`
                const message = `[Avatar URL](${url})`
                return message
            } else {
                return 'This user has no avatar'
            }
        }

        function getAvatar() {
            if (getUser()?.user.avatar) {
                const url = `${getUser()!.user.displayAvatarURL()}`
                return url
            } else {
                return 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnektony.com%2Fwp-content%2Fuploads%2F2019%2F07%2Fdiscord-icon.png&f=1&nofb=1'
            }
        }
        
        const embed = {
            title: `User Information - ${getUser()?.user.username}`,
            fields: [
                {
                    name: 'User',
                    value: `${getUser()?.user} (${getUser()?.user.username}#${getUser()?.user.discriminator})`,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: `\`${getUser()!.user.id}\``
                },
                {
                    name: 'Bot',
                    value: `${isBot()}`
                },
                {
                    name: 'Joined Discord',
                    value: `<t:${Math.floor(Date.parse(getUser()!.user.createdAt.toString()!) / 1000)}:R>`,
                    inline: true
                },
                {
                    name: 'Joined this server',
                    value: `<t:${Math.floor(Date.parse(getUser()!.joinedAt?.toString()!) / 1000)}:R>`,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: `${getUser()!.roles.cache.toJSON().join(', ')}`
                },
                {
                    name: 'Permissions',
                    value: `\`\`\`${getUser()!.permissions.toArray().join(', ')}\`\`\``
                },
                {
                    name: 'Avatar URL',
                    value: `${getAvatarURL()}`
                }
            ],
            thumbnail: { url: `${getAvatar()}` },
            color: 0xFFFFFF,
            footer: { text: `Resonding to: ${interaction.user.username}`, icon_url: `${interaction.user.displayAvatarURL()}` }
        }

        interaction.reply({
            content: `Here is some information about ${getUser()!}`,
            embeds: [embed],
            ephemeral: true
        })

    }
} as ICommand