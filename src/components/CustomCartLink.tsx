"use client"

import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/redux/hooks/useCart";
import SmartNavLink from './tenant/SmartNavLink';

export default function CustomCartLink({ href, name, tenantName }: { href: string, name: string, tenantName: string }) {
    const { totalCount } = useCart()
    return (<>
        <SmartNavLink tenantName={tenantName} href={href} className="text-lg flex gap-2">
            <ShoppingCart /> {name} ({totalCount})
        </SmartNavLink>
    </>)
}