"use client"
import Image from 'next/image'
import { Product } from "@/lib/type"

export function Products({ list, isPending }: { list: Product[], isPending: boolean }) {
    const p = [...list]
    return (<div className="py-10 flex-1">
        <h2 className='text-4xl mb-8'>Products</h2>
        <div className="grid grid-cols-3 gap-10">
            {isPending ? 'loading' : p.map((item) =>
            (<div key={item.id} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 
                transition duration-300 ease-in-out cursor-pointer">
                <Image src={item.image} alt={item.name} width={180} height={180} priority />
                <div className='flex items-center justify-between mt-4'>
                    <p className='text-xl text-slate-700'>{item.name}</p>
                    <p className='font-bold text-red-400'>${item.price}</p>
                </div>
                {/* <span>{item.variant.map((str, j) => (<a key={i - j}>{str}</a>))}</span> */}
            </div>))}
        </div>
    </div>)
}