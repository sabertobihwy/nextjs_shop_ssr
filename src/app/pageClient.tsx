'use client'
import { Sort } from "@/components/Sort";
import { getProductsAction } from "./action";
import { Product } from "@/lib/type";
import { Products } from "@/components/Products";
import { useActionState } from "react";

export type ProductState = { product: Product[] }

export default function PageClient({ productInitialS }: { productInitialS: ProductState }) {
    //const p: Product[] = await getProducts()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [state, action, isPending] = useActionState<ProductState>(getProductsAction as unknown as any, productInitialS)
    return (
        <div className="containerContent flex justify-between">
            <Sort action={action} />
            <Products list={state.product} isPending={isPending} />
        </div>
    )
}