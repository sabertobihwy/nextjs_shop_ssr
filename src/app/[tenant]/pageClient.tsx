"use client"
import { Products } from "@/components/product/Products";
import { Sort } from "@/components/product/Sort";
import { ProductDisplayVO } from "@/types/entities/products";


export default function PageClient({ products }: { products: ProductDisplayVO[] }) {
    return (
        <div className="containerContent flex justify-between">
            <Sort />
            <Products list={products} />
        </div>
    )
}