"use client"

import TenantLink from "./TenantLink"
import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/redux/hooks/useCart";

export default function CustomCartLink({ href, name }: { href: string, name: string }) {
    const { totalCount } = useCart()
    return (<>
        <TenantLink href={href} className="text-lg flex gap-2"> <ShoppingCart /> {name} ({totalCount})</TenantLink>

    </>)
}