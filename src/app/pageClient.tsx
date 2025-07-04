"use client"
import { Sort } from "@/components/Sort";
import { Products } from "@/components/Products";
import { ProductDisplayVO } from "@/types/models/products";


export default function PageClient({ products }: { products: ProductDisplayVO[] }) {
    return (
        <div className="containerContent flex justify-between">
            <Sort />
            <Products list={products} />
        </div>
    )
}