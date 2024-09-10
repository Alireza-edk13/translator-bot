
const googleDestinationLanguage = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'انگلیسی', callback_data: 'en' },
                { text: 'فارسی', callback_data: 'fa' }
            ], [
                { text: 'اسپانیایی', callback_data: 'es' },
                { text: 'فرانسوی', callback_data: 'fr' }
            ],
            [
                { text: 'پرتقالی', callback_data: 'pr' },
                { text: 'عربی', callback_data: 'ar' }
            ]
        ]
    }
};

const microsoftDestinationLanguage = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'انگلیسی', callback_data: 'en' },
                { text: 'فارسی', callback_data: 'fa' }
            ], [
                { text: 'اسپانیایی', callback_data: 'es' },
                { text: 'فرانسوی', callback_data: 'fr' }
            ],
            [

                { text: 'پرتقالی', callback_data: 'pr' },
                { text: 'عربی', callback_data: 'ar' }
            ]
        ]
    }
};



module.exports = { googleDestinationLanguage, microsoftDestinationLanguage }