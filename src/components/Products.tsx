"use client"
import Image from 'next/image'
import { useSortStore } from '@/store'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProductDisplayVO } from "@/domain/products"

export function Products({ list }: { list: ProductDisplayVO[] }) {
    const sortTag = useSortStore(state => state.sortTag)
    const listResult = useMemo(() => {
        const listCopy = [...list]
        return listCopy.sort((a: ProductDisplayVO, b: ProductDisplayVO) => sortTag === 'latest'
            ? b.id - a.id
            : sortTag === 'low' ? a.minPrice - b.minPrice : b.minPrice - a.minPrice)
    }, [sortTag, list])
    const router = useRouter()
    const handleClick = useCallback((id: number) => {
        router.push(`/detail/${id}`)
    }, [router])
    // console.log(listResult)
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
                        <Image src={item.minImageUrl} alt={item.name} sizes='180' fill priority className='object-contain self-center' />
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                        <p className='text-xl text-slate-700'>{item.name}</p>
                        <p className='font-bold text-red-400'>${item.minPrice}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}