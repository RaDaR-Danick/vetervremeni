const PHONE = '+7 (747) 701-06-06'
const CLEAR_PHONE = '77477010606'
const EMAIL = 'veter.vremeni@mail.ru'
const WHATSAPP = '77477010606'
const PARTNERS = ['swisstime.kz', 'chronos.kz', 'sws.kz']
const INSTAGRAM = 'gsquare.kz'
const SOCIAL = [
    {
        icon: 'whatsapp',
        link: 'https://wa.me/77477010606'
    },
    {
        icon: 'instagram',
        link: `https://www.instagram.com/${INSTAGRAM}/`
    },
]
const FOOTER = [
    {
        title: 'Навигация',
        links: [
            {
                link: '/',
                text: 'Главная'
            },
            {
                link: '/products',
                text: 'Каталог'
            },
            {
                link: '/products/?filters=225418:225536',
                text: 'Мужские часы'
            },
            {
                link: '/products/?filters=225418:225421',
                text: 'Женские часы'
            },
            {
                link: '/cart',
                text: 'Корзина'
            },
        ]
    },
    {
        title: 'Информация',
        links: [
            {
                link: '/about',
                text: 'О нас'
            },
            {
                link: '/delivery',
                text: 'Доставка и оплата'
            },
            {
                link: '/guarantee',
                text: 'Гарантия'
            },
            {
                link: '/service',
                text: 'Сервисный центр'
            },
        ]
    },
]
const PRICE_HINT = 'Уточняйте цену'
const PRICE_HINT_SHORT = 'Уточняйте'
const IP_API_URL = 'https://api.ipgeolocation.io/ipgeo?apiKey=41e58eba5a6a4067b5ef9efc2154d615'

export { PHONE, CLEAR_PHONE, EMAIL, WHATSAPP, SOCIAL, PARTNERS, INSTAGRAM, FOOTER, PRICE_HINT, PRICE_HINT_SHORT, IP_API_URL }
