const TelegramBot = require('node-telegram-bot-api');

// packages
const axios = require('axios')
const redis = require('redis')
const client = redis.createClient();
client.connect();

// .env
const dotenv = require('dotenv')
dotenv.config()

// config
const token = process.env.TOKEN;
const api_token = process.env.API_TOKEN

const bot = new TelegramBot(token, { polling: true });

// utils
const components = require("./components")
const actions = require("./actions")
const messages = require("./utils/messages")


// start command
bot.onText(/\/start/, (msg, match) => actions.homeMenu(bot, msg.chat.id));

bot.on('callback_query', (query) => {
    const myActions = ["google", "microsoft"]
    const myLangs = ["fa", "en", "fr", "es", "pr","ar"]


    const command = query.data
    const chatId = query.message.chat.id
    const messageId = query.message.message_id

    myActions.includes(command) ? actions.sendTranslateKeyboard(bot, chatId, 'action', command, components[`${command}DestinationLanguage`], messages.select_language, messageId) : false
    myLangs.includes(command) ? actions.sendLanguage(bot, chatId, command, messages.send_query) : false
})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if (!text.startsWith('/')) {
        const action = await client.get(`user:${chatId}:action`)
        const lang = await client.get(`user:${chatId}:lang`)

        if (action && lang) {
            const response = await axios.post(`https://api.one-api.ir/translate/v1/${action}/`, {
                target: lang,
                text
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'one-api-token': api_token
                },
            })

            let translated_text = await response.data.result

            // // send translated text to user
            await bot.sendMessage(chatId, translated_text)

            // // remove records in redis
            await client.del(`user:${chatId}:action`)
            await client.del(`user:${chatId}:lang`)
        }
        actions.homeMenu(bot, msg.chat.id)
    }
})

bot.on('polling_error', (error) => {
    console.log("Polling Error: ", error)
})
bot.on('webhook_error', (error) => {
    console.log("WebHook Error: ", error)
})
bot.on('error', (error) => {
    console.log("General Error: ", error)
})