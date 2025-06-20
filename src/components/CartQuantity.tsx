"use client"

import { useCartStore } from "@/store"
import { Trash2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CartQuantity({ id, variant }: { id: string, variant: string }) {
    const items = useCartStore(state => state.items)
    const setQuantity = useCartStore(state => state.setQuantity)
    const removeItem = useCartStore(state => state.removeItem)
    const quantityList = Array.from({ length: 10 }, (_, i) => i + 1)
    const index = items[id].findIndex(item => item.variant === variant)
    const item = items[id][index]
    return (<div className="flex items-center">
        <Trash2 className="mr-2" onClick={() => removeItem(id, variant)} />
        <Select defaultValue={item.quantity.toString()} onValueChange={(val) => setQuantity(id, variant, parseInt(val))}>
            <SelectTrigger className="w-[80px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {quantityList.map(n =>
                    (<SelectItem key={n} value={n.toString()}>{n.toString()}</SelectItem>))}
            </SelectContent>
        </Select>
    </div>)

}