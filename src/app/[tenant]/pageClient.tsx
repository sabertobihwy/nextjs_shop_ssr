"use client"
import { Products } from "@/components/product/Products";
import { Sort } from "@/components/product/Sort";
import { useTenant } from "@/redux/hooks/useTenant";
import { ProductDisplayVO } from "@/types/entities/products";
import { useEffect } from "react";


export default function PageClient({ products, tenantId }: { products: ProductDisplayVO[], tenantId: string }) {
    const { setTenantId } = useTenant()
    useEffect(() => {
        setTenantId(tenantId)
    }, [tenantId, setTenantId])
    return (
        <div className="containerContent flex justify-between">
            <Sort />
            <Products list={products} />
        </div>
    )
}