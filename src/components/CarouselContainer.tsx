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
