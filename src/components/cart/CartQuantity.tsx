"use client"

import { Trash2 } from 'lucide-react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { useMemo } from "react";
import { useCart } from "@/redux/hooks/useCart";

function useCartItemActions(id: string, variant: string) {
    const { plusQuantity, minusQuantity, removeItem } = useCart()

    return {
        onPlus: () => plusQuantity(id, variant),
        onMinus: () => minusQuantity(id, variant),
        onRemove: () => removeItem(id, variant),
    };
}


export default function CartQuantity({ id, variant }: { id: string, variant: string }) {
    const { items } = useCart()
    const item = useMemo(() => items[id]?.find(i => i.variant === variant), [items, id, variant]);
    const { onPlus, onMinus, onRemove } = useCartItemActions(id, variant);

    if (!item) return null;

    return (
        <div className="flex items-center">
            <Trash2 onClick={onRemove} className="mr-2 w-[30px]" color="#71717a" />
            <CircleMinus onClick={onMinus} className="w-[15px]" />
            <Input
                value={item.quantity}
                readOnly
                className="w-[50px] mx-2 focus-visible:border-none focus-visible:ring-0"
            />
            <CirclePlus onClick={onPlus} className="w-[15px]" />
        </div>
    );


}