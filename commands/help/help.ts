import { ICommand } from "wokcommands";

export default {
    category: 'help',
    description: 'Will send information about the bot',

    slash: 'both',
    testOnly: true,

    callback: async ({}) => {

        const embed = {
            title: 'Help & Information',
            fields: [
                {
                    name: 'Commands',
                    value: '**\`/commands\`**'
                },
                {
                    name: 'Information',
                    value: `

> **What this bot is:**

This is the "Modinator" _(LITE edition)_ bot.
This bot is free and hosted by the developer and comes with a preview of the plethora of moderation commands that the _PLUS_ version offers. It also uses the new interaction technologies to make the life of a mod even easier.

> **About the developer:**

Hey there!
My name is Devin Conway and I am a young developer that has been coding since I was 10, starting with HTML & CSS, but I have been coding things like Discord bots for about 2 years now.

I'm just like any other teenager, I'm still in highschooler, have friends, live with family, all of that stuff..
But, I am always around to help others.

Feel free to get ahold of me anytime you want! My DM's are always open (Conway#1234)`
                }
            ],
            color: 0xFFFFFF,
            footer: { text: 'Modinator LITE | Made by: Conway#1234' }
        }

        return embed

    }
} as ICommand