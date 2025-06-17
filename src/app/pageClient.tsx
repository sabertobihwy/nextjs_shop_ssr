'use client'
import { Sort } from "@/components/Sort";
import { Product } from "@/lib/type";
import { Products } from "@/components/Products";


export default function PageClient({ products }: { products: Product[] }) {
    return (
        <div className="containerContent flex justify-between">
            <Sort />
            <Products list={products} />
        </div>
    )
}