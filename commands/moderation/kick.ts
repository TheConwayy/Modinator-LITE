import { ICommand } from "wokcommands";

export default {
    category: 'moderation',
    description: 'Kicks the user you defined for the reason provided',

    slash: true,
    testOnly: true,

    permissions: ['KICK_MEMBERS'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user you want to kick',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'The reason you are kicking the user',
            required: false
        }
    ],

    callback: async ({ interaction, guild }) => {

        const userid = interaction.options.getUser('user')!.id
        const user = guild?.members.cache.get(userid!)
        const intUser = guild?.members.cache.get(interaction.user.id!)

        const reason = interaction.options.getString('reason')

        function hasReason() {

            if (reason) {
                return reason
            } else {
                return 'No reason provided.'
            }

        }

        const noSelfEmbed = {
            description: "**ERROR**\n```You cannot kick yourself```",
            color: 0xff4040
        }

        const succEmbed = {
            author: {
                name: `${interaction.user.username}#${interaction.user.discriminator}`,
                icon_url: `${interaction.user.displayAvatarURL()}`
            },
            description: `**SUCCESS**\n\`\`\`Kicked "${user?.user.username}" for the reason "${hasReason()}"\`\`\``,
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

                await user?.send({
                    content: `>>> **You have been __kicked__ from** \`${guild?.name}\` **for the reason:** \`${hasReason()}\``
                })
    
                await interaction.editReply({
                    embeds: [succEmbed]
                })
    
                user?.kick(`${hasReason()}`)

            }

    }
} as ICommand