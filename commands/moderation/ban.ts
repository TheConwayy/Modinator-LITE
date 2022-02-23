import { ICommand } from "wokcommands";

export default {
    category: 'moderation',
    description: 'Bans the user you defined for the reason provided',

    slash: true,
    testOnly: true,

    permissions: ['BAN_MEMBERS'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user you want to ban',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'The reason you are banning the user',
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
            description: "**ERROR**\n```You cannot ban yourself```",
            color: 0xff4040
        }

        const succEmbed = {
            author: {
                name: `${interaction.user.username}#${interaction.user.discriminator}`,
                icon_url: `${interaction.user.displayAvatarURL()}`
            },
            description: `**SUCCESS**\n\`\`\`Banned "${user?.user.username}" for the reason "${hasReason()}"\`\`\``,
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

                await interaction.editReply({
                    embeds: [succEmbed]
                })
    
                user?.ban({ reason: hasReason() })

            }

    }
} as ICommand