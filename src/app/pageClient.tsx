"use client"
import { Sort } from "@/components/Sort";
import { ProductDisplayVO } from "@/domain/products"
import { Products } from "@/components/Products";


export default function PageClient({ products }: { products: ProductDisplayVO[] }) {
    return (
        <div className="containerContent flex justify-between">
            <Sort />
            <Products list={products} />
        </div>
    )
}