import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

export type CarouselHandle = {
    scrollToIndex: (index: number) => void
}
type CarouselProps = {
    imgList: { url: string; type: string }[]
}
export const CarouselContainer = React.forwardRef<CarouselHandle, CarouselProps>(({ imgList }, ref) => {
    const apiRef = React.useRef<CarouselApi | null>(null)

    React.useImperativeHandle(ref, () => ({
        scrollToIndex(index: number) {
            apiRef.current?.scrollTo(index)
        },
    }))
    // const imgList = [{ url: 'https://duyi-resource.oss-cn-beijing.aliyuncs.com/dupeng/1734699799829-3707c90c-ae03-4352-92ba-086391c0ca26.webp', type: 'red' },
    // { url: 'https://duyi-resource.oss-cn-beijing.aliyuncs.com/dupeng/1734699832491-18cc3117-cdd8-4801-9fd2-cc044e3e7f89.webp', type: 'red' },
    // { url: 'https://duyi-resource.oss-cn-beijing.aliyuncs.com/dupeng/1734699844911-0fcb80a5-fe52-4253-8a12-ad05cb543ef9.webp', type: 'red' }
    // ]
    return (
        <Carousel setApi={(api) => (apiRef.current = api)} className="w-full">
            <CarouselContent>
                {imgList.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card >
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="relative w-full aspect-[1/1] overflow-hidden">
                                        <Image src={img.url} alt={img.type} sizes='180' fill priority className='object-contain self-center' />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
})
CarouselContainer.displayName = "ExampleCarousel"
