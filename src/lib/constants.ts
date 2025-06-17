export enum Status {
    SUCCESS = 'success',
    ERROR = 'error'
}

export const HEADERLINK = [
    { href: '/search', name: 'Search' },
    { href: '/account', name: 'Account' },
    { href: '/cart', name: 'Cart' },
]
export const FOOTERLINK = [
    {
        category: 'category1',
        chidren: [
            { href: '/1', name: '1' },
            { href: '/2', name: '2' },
            { href: '/3', name: '3' },
        ]
    }
    ,
    {
        category: 'category2',
        chidren: [
            { href: '/4', name: '4' },
            { href: '/5', name: '5' },
            { href: '/6', name: '6' },
        ]
    },
    {
        category: 'category3',
        chidren: [
            { href: '/1', name: '7' },
            { href: '/2', name: '8' },
            { href: '/3', name: '9' },
        ]
    }
]

export const SORTLIST = [
    { href: '/latest', name: 'Latest Arrivals', valueName: 'latest' },
    { href: '/low', name: 'Price Low - High', valueName: 'low' },
    { href: '/high', name: 'Price High - Low', valueName: 'high' }
] as const