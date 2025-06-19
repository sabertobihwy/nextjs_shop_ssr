"use client"

import AddCart from "@/components/AddCart";
import { Product } from "@/lib/type";
import Image from 'next/image'

export default function PageClient({ detail }: { detail: Product }) {
    return (<div className="containerContent py-6 h-[600px] flex">
        <div className="w-64 p-6">
            <h1 className="font-sans text-3xl leading-10 font-bold my-8">{detail.name}</h1>
            <p className="leading-10">{detail.description}</p>
        </div>
        <div className="relative w-[500px] aspect-[1/1] bg-slate-50">
            <Image src={detail.image} alt={detail.name} sizes="500" priority fill className="object-cover" />
        </div>
        <div className="w-80">
            <AddCart product={detail} />
        </div>
    </div>)
}