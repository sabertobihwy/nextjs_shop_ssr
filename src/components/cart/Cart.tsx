"use client"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store";
import React from "react"
import CartItem from "./CartItem";
import { CartProduct } from "@/types/models/cart";

export default function Cart() {
    const items: Record<string, CartProduct[]> = useCartStore(state => state.items)
    const totalPrice: number = useCartStore(state => state.totalPrice)
    return (<div className="containerContent flex py-25">
        <div className="flex-1 w-full flex flex-col">
            <h1 className="text-2xl font-bold py-3">Cart</h1>
            <div className="w-full">
                <Table>
                    <TableHeader>
                        <TableRow className="text-base  hover:bg-transparent">
                            <TableHead className="w-3/5 text-zinc-500 font-normal">Item</TableHead>
                            <TableHead className="w-[200px] text-zinc-500 font-normal text-left">Quantity</TableHead>
                            <TableHead className="w-[100px] text-zinc-500 font-normal ">Price</TableHead>
                            <TableHead className="w-[100px] text-zinc-500 text-right  font-normal">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.keys(items).map(id => {
                            const list: CartProduct[] = items[id]
                            return list.map((p, i) => (<React.Fragment key={id + '-' + i}>
                                <CartItem item={p} />
                            </React.Fragment>))
                        })}

                    </TableBody>
                </Table>
            </div>
        </div>
        <div className="w-56 mx-25 flex flex-col gap-5 items-center">
            <div className="text-2xl font-bold self-start py-3">Total</div>
            <div className="text-2xl font-bold text-red-400 self-start">${totalPrice.toFixed(2)}</div>
            <Button variant="outline" size="lg" className="text-white bg-black w-2/3 hover:cursor-pointer">Login</Button>
            <div className="text-sm text-gray-400">You need to login to checkout</div>
        </div>
    </div>)
}