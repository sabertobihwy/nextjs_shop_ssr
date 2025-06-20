"use client"
import Image from 'next/image'
import { Product } from "@/lib/type"
import { useSortStore } from '@/store'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

export function Products({ list }: { list: Product[] }) {
    const sortTag = useSortStore(state => state.sortTag)
    const listResult = useMemo(() => {
        const listCopy = [...list]
        return listCopy.sort((a: Product, b: Product) => sortTag === 'latest' ? b.id - a.id : sortTag === 'low' ? a.price - b.price : b.price - a.price)
    }, [sortTag, list])
    const router = useRouter()
    const handleClick = useCallback((id: number) => {
        router.push(`/detail/${id}`)
    }, [router])
    return (<div className="py-10 flex-1">
        <h2 className='text-4xl mb-8'>Products</h2>
        <div className="grid grid-cols-3 gap-10">
            {listResult.map((item) =>
            (
                <div key={item.id}
                    className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 
                                transition duration-300 ease-in-out cursor-pointer flex flex-col"
                    onClick={() => { handleClick(item.id) }} >
                    <div className="relative w-full aspect-[1/1] overflow-hidden">
                        <Image src={item.image} alt={item.name} sizes='180' fill priority className='object-contain self-center' />
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                        <p className='text-xl text-slate-700'>{item.name}</p>
                        <p className='font-bold text-red-400'>${item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}