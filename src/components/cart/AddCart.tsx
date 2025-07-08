"use client"

import { CartProduct } from "@/types/entities/cart";
import { RefObject, useCallback, useState } from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { CarouselHandle } from "../CarouselContainer";
import { ProductDetailVO } from "@/types/entities/products";
import { useCart } from "@/redux/hooks/useCart";


export default function AddCart({ product, onClickVariantHandler }: { product: ProductDetailVO, onClickVariantHandler: RefObject<CarouselHandle | null> }) {
    const [value, setValue] = useState<string | null>(() => null)
    const [price, setPrice] = useState<number>(() => product.imgList[0].price)
    const [imgurl, setImgurl] = useState<string>(() => product.imgList[0].url)
    const handleClick = useCallback((value: string) => {
        setValue(value)
        const index = product.typeIndexMap[value]
        onClickVariantHandler.current?.scrollToIndex(index)
        setPrice(product.imgList[index].price)
        setImgurl(product.imgList[index].url)
    }, [setValue, onClickVariantHandler, product.typeIndexMap, product.imgList])
    const { addItem } = useCart()
    const addToCart = useCallback(() => {
        const cartItem: Omit<CartProduct, 'quantity' | 'totalPrice'> = {
            id: product.id,
            name: product.name,
            price: price,
            image: imgurl,
            variant: value!
        }
        addItem(cartItem)
        toast("successfully added into your cart ✔")

    }, [product, value, addItem, imgurl, price])

    return (<div className="w-full px-6 flex flex-col items-center">
        <h1 className="text-3xl py-6 self-start">Select</h1>
        <ToggleGroup type="single"
            variant="outline"
            size='lg'
            onValueChange={handleClick}
            className="justify-start border-b mt-3 gap-6 ml-5 p-6">

            {product.imgList.map((item, i) =>
            (<ToggleGroupItem key={i} value={item.type}
                className="text-xl rounded-none first:rounded-l-none last:rounded-r-none px-4">{item.type}
            </ToggleGroupItem>))}
        </ToggleGroup>
        <div className="py-10 flex justify-between">
            <span className="text-2xl px-4">Price</span>
            <span className="text-red-500 font-bold text-2xl">${price}</span>
        </div>
        <Button className="h-10 w-[150px] text-2xl py-6 bg-orange-400 text-white hover:cursor-pointer"
            onClick={addToCart}
            variant="outline" disabled={value ? false : true}
        >Add to Cart</Button>
        <Toaster />
    </div>)

}