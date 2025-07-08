"use client"

import { CarouselContainer, CarouselHandle } from "@/components/CarouselContainer";
import AddCart from "@/components/cart/AddCart";
import { ProductDetailVO } from "@/types/entities/products";
import { useRef } from "react";

// ProductDetailVO 
export default function PageClient({ detail }: { detail: ProductDetailVO }) {
    const carouselRef = useRef<CarouselHandle>(null)

    return (<div className="containerContent py-6 h-[600px] flex">
        <div className="w-64 p-6">
            <h1 className="font-sans text-3xl leading-10 font-bold my-8">{detail.name}</h1>
            <p className="leading-10">{detail.desc}</p>
        </div>
        <div className="w-[500px] aspect-[1/1] bg-slate-50">
            {/* const imgList = [{ url: 'https://duyi-resource.oss-cn-beijing.aliyuncs.com/dupeng/1734699799829-3707c90c-ae03-4352-92ba-086391c0ca26.webp', type: 'red' },
    { url: 'https://duyi-resource.oss-cn-beijing.aliyuncs.com/dupeng/1734699832491-18cc3117-cdd8-4801-9fd2-cc044e3e7f89.webp', type: 'black' },
    { url: 'https://duyi-resource.oss-cn-beijing.aliyuncs.com/dupeng/1734699844911-0fcb80a5-fe52-4253-8a12-ad05cb543ef9.webp', type: 'pink' }
    ] */}
            <CarouselContainer ref={carouselRef} imgList={detail.imgList} />
        </div>
        <div className="w-80">
            {/* { 'red': 0, 'black': 1} */}
            <AddCart product={detail} onClickVariantHandler={carouselRef} />
        </div>
    </div>)
}