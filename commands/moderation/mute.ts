import { ICommand } from "wokcommands";
import fs from 'fs'
const yml = require('js-yaml')

const config = yml.load(fs.readFileSync('config/config.yml'))

export default {
    category: 'moderation',
    description: 'Mutes the user given for the reason given',

    slash: true,
    testOnly: true,

    permissions: ['MANAGE_ROLES'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user you are wanting to mute',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'The reason you are muting the user',
            required: false
        }
    ],

    callback: async ({ interaction, guild }) => {

        const userid = interaction.options.getUser('user')!.id
        const user = guild?.members.cache.get(userid!)
        const intUser = guild?.members.cache.get(interaction.user.id!)

        const reason = interaction.options.getString('reason')
        
        const mutedRole = config.roles.mutedRole

        function hasReason() {
            if (reason) {
                return reason
            } else return 'No reason specified'
        }

        const noSelfEmbed = {
            description: "**ERROR**\n```You cannot mute yourself```",
            color: 0xff4040
        }

        const mutedEmbed = {
            description: "**ERROR**\n```This user is already muted```",
            color: 0xff4040
        }

        const succEmbed = {
            author: {
                name: `${interaction.user.username}#${interaction.user.discriminator}`,
                icon_url: `${interaction.user.displayAvatarURL()}`
            },
            description: `**SUCCESS**\n\`\`\`Muted "${user?.user.username}" for the reason "${hasReason()}"\`\`\``,
            color: 0x3cd070,
            footer: { text: `Modinator LITE | Made by: Conway#1234` }
        }

        await interaction.deferReply({
            ephemeral: true
        })
        await new Promise((resolve) => setTimeout(resolve, 500))

         if (userid === intUser!.id) {
                interaction.editReply({
                    embeds: [noSelfEmbed]
                })
                return
            } else {

                if (user?.roles.cache.has(mutedRole)) {
                    interaction.editReply({
                        embeds: [mutedEmbed]
                    })
                    return
                } else {

                    await user?.roles.add(mutedRole)

                    interaction.editReply({
                        embeds: [succEmbed]
                    })
    
                    user?.send({
                        content: `>>> **You have been __muted__ in** \`${guild?.name}\` **for the reason:** \`${hasReason()}\``
                    })

                }

            }

    }
} as ICommand