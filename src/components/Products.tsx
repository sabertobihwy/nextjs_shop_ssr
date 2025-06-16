"use client"

import { Product } from "@/lib/type"

export function Products({ list, isPending }: { list: Product[], isPending: boolean }) {
    return (<div className="py-32 px-16">
        <div className="grid grid-cols-3 gap-3">
            {isPending ? 'loading' : list.map((item, i) => (<div key={i} className="border">
                {item.name}
            </div>))}
        </div>
    </div>)
}