"use client"
import Cart from "@/components/cart/Cart";
import { useCart } from "@/redux/hooks/useCart";

export default function Page() {
    const { items } = useCart()
    if (Object.keys(items).length === 0) {
        return (<div>
            EMPTY
        </div>)
    }
    return (<Cart />)
}