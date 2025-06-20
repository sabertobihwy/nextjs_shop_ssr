"use client"
import Cart from "@/components/Cart";
import { useCartStore } from "@/store";

export default function Page() {
    const items = useCartStore(state => state.items)
    if (Object.keys(items).length === 0) {
        return (<div>
            EMPTY
        </div>)
    }
    return (<Cart />)
}