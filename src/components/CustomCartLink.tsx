"use client"

import Link from "next/link"
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from "@/store";

export default function CustomCartLink({ href, name }: { href: string, name: string }) {
    const totalCount = useCartStore(state => state.totalCount)
    return (<>
        <Link href={href} className="text-lg flex gap-2"> <ShoppingCart /> {name} ({totalCount})</Link>

    </>)
}