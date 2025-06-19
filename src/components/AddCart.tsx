"use client"

import { Product } from "@/lib/type";
import { useCallback, useState } from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"

export default function AddCart({ product }: { product: Product }) {
    const [value, setValue] = useState<string | null>(() => null)
    const handleClick = useCallback((value: string) => {
        setValue(value)
    }, [setValue])
    return (<div className="w-full flex flex-col items-center">
        <h1 className="text-3xl py-6 self-start">Select</h1>
        <ToggleGroup type="single"
            variant="outline"
            size='lg'
            onValueChange={handleClick}
            className="justify-start border-b mt-3 gap-6 ml-5 pb-6">

            {product.variant.map((item, i) =>
            (<ToggleGroupItem key={i} value={item}
                className="text-xl rounded-none first:rounded-l-none last:rounded-r-none">{item}
            </ToggleGroupItem>))}
        </ToggleGroup>
        <div className="py-10 flex justify-between">
            <span className="text-2xl px-4">Price</span>
            <span className="text-red-500 font-bold text-2xl">${product.price}</span>
        </div>
        <Button className="h-10 w-[150px] text-2xl py-6 bg-orange-400 text-white hover:cursor-pointer" variant="outline" disabled={value ? false : true}>Add to Cart</Button>
    </div>)

}