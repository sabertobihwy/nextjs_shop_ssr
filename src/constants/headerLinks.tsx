import type { ReactNode, ReactElement } from "react";
import { Search } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import CustomCartLink from '@/components/CustomCartLink';

export type HeaderLinkItem = {
    href: string,
    name: string,
    icon?: ReactNode,
    className?: string,
    render?: ReactElement<{ href: string; name: string }>; // 若存在，则跳过默认渲染
};
export const HEADERLINK: HeaderLinkItem[] = [
    { href: ('/search'), name: 'Search', icon: <Search /> },
    { href: ('/account'), name: 'Account', icon: <CircleUserRound /> },
    { href: ('/cart'), name: 'Cart', render: <CustomCartLink href={'/cart'} name="Cart" /> },
]