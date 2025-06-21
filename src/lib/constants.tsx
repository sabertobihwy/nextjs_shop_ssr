import { Search } from 'lucide-react';
import type { ReactNode, ReactElement } from "react";
import { CircleUserRound } from 'lucide-react';
import CustomCartLink from '@/components/CustomCartLink';

export type HeaderLinkItem = {
    href: string;
    name: string;
    icon?: ReactNode;
    render?: ReactElement<{ href: string; name: string }>; // 若存在，则跳过默认渲染
};

export const HEADERLINK: HeaderLinkItem[] = [
    { href: '/search', name: 'Search', icon: <Search /> },
    { href: '/account', name: 'Account', icon: <CircleUserRound /> },
    { href: '/cart', name: 'Cart', render: <CustomCartLink href="/cart" name="Cart" />, },
]

export enum Status {
    SUCCESS = 'success',
    ERROR = 'error'
}

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