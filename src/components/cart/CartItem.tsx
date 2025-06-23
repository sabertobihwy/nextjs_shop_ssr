"use client"
import CartQuantity from "./CartQuantity"
import Image from 'next/image'
import { CartProduct } from "@/lib/type"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

export default function CartItem({ item }: { item: CartProduct }) {
    //const items: Record<string, CartProduct[]> = useCartStore(state => state.items)
    //const list: CartProduct[] = items[id]
    return (<>
        <TableRow>
            <TableCell className="font-medium">
                <div className="flex">
                    <div className="w-[100px] aspect-[1/1] border relative">
                        <Image src={item.image} alt={item.name} fill className='object-contain' />
                    </div>
                    <div className="flex flex-col justify-center ">
                        <span className="p-2 ml-4 text-lg">{item.name}</span>
                        <span className="p-2 ml-4 text-base text-gray-400">{item.variant}</span>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <CartQuantity id={item.id.toString()} variant={item.variant} />
            </TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell className="text-right">${item.totalPrice.toFixed(2)}</TableCell>
        </TableRow></>)
}