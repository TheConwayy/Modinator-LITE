import { ICommand } from "wokcommands";
import { MessageActionRow, MessageButton } from 'discord.js'

export default {
    category: 'help',
    description: 'Will give you help with the commands that the bot offers',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel }) => {

        const helpRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('help')
                    .setLabel('Help')
                    .setEmoji('❔')
                    .setStyle('PRIMARY')
            )
        const modRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('mod')
                    .setLabel('Moderation')
                    .setEmoji('⚠')
                    .setStyle('PRIMARY')
            )
        const utilRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('util')
                    .setLabel('Utility')
                    .setEmoji('⛏')
                    .setStyle('PRIMARY') 
            )
        
        const initEmbed = {
            description: '>>> **Select a category below**',
            color: 0xFFFFFF
        }

        const helpEmbed = {
            title: 'Commands - HELP',
            description: '_These are all commands relating to help with the bot_\n_For more information, visit [this](http://modinator.tk/docs) website_',
            fields: [
                {
                    name: '/commands',
                    value: 'Will give you help with the commands that the bot offers'
                },
                {
                    name: '/help OR !help',
                    value: 'Will send a link to the bots commands & give information about the bot'
                }
            ],
            color: 0xFFFFFF,
            footer: { text: `Modinator LITE | Made by: Conway#6112` }
        }

        const modEmbed = {
            title: 'Commands - MODERATION',
            description: '_These are all commands relating to moderation with the bot_\n_For more information, visit [this](http://modinator.tk/docs) website_',
            fields: [
                {
                    name: '/ban',
                    value: 'Bans the user you defined for the reason provided'
                },
                {
                    name: '/kick',
                    value: 'Kicks the user you defined for the reason provided'
                },
                {
                    name: '/mute',
                    value: 'Mutes the user given for the reason given'
                },
                {
                    name: '/unmute',
                    value: 'Unmutes the user given for the reason given'
                },
            ],
            color: 0xFFFFFF,
            footer: { text: `Modinator LITE | Made by: Conway#1234` }
        }

        const utilEmbed = {
            title: 'Commands - UTILITY',
            description: '_These are all commands relating to utility with the bot_\n_For more information, visit [this](http://modinator.tk/docs) website_',
            fields: [
                {
                    name: '/user-info',
                    value: 'Give information about a user'
                }
            ],
            color: 0xFFFFFF,
            footer: { text: `Modinator LITE | Made by: Conway#1234` }
        }

        msgInt.reply({
            embeds: [initEmbed],
            components: [helpRow, modRow, utilRow],
            ephemeral: true
        })

        const collector = channel.createMessageComponentCollector({  })

        collector.on('collect', async i => {
            if(i.customId === 'help') {
                await i.deferUpdate()
                await msgInt.editReply({
                    embeds: [helpEmbed],
                    components: [modRow, utilRow]
                })
            }
            if (i.customId === 'mod') {
                await i.deferUpdate()
                await msgInt.editReply({
                    embeds: [modEmbed],
                    components: [helpRow, utilRow]
                })
            }
            if (i.customId === 'util') {
                await i.deferUpdate()
                await msgInt.editReply({
                    embeds: [utilEmbed],
                    components: [helpRow, modRow]
                })
            }
        })
    }
} as ICommand