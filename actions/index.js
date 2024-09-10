// packages
const redis = require('redis')
const client = redis.createClient();
client.connect();

const homeMenu = (bot, chatId) => {
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'ترجمه با Google', callback_data: 'google' },
                    { text: 'ترجمه با Microsoft', callback_data: 'microsoft' }
                ],
            ]
        }
    };

    bot.sendMessage(chatId, "به ربات ترجمه خوش اومدی!", inlineKeyboard)
}

const sendTranslateKeyboard = (bot, chatId, field, command, keyboard, textMessage, messageId) => {
    client.set(`user:${chatId}:${field}`, command, {
        EX: 300
    })
    const inline_keyboard = keyboard
    bot.editMessageText(textMessage, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: inline_keyboard.reply_markup
    })
}

const sendLanguage = (bot, chatId, lang, message) => {
    client.set(`user:${chatId}:lang`, lang, {
        EX: 300
    })
    bot.sendMessage(chatId, message)
}


module.exports = { homeMenu, sendTranslateKeyboard, sendLanguage }