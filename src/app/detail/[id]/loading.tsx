import { Skeleton } from "@/components/ui/skeleton"

export default async function Loading() {
    return (
        <div className="containerContent py-6 h-[600px] flex">

            {/* 左侧信息栏 */}
            <div className="w-64 p-6 flex flex-col">
                <Skeleton className="h-9 w-48 my-8 rounded" /> {/* 标题 */}
                <div className="space-y-4">
                    <Skeleton className="h-5 w-5/6 rounded" />
                    <Skeleton className="h-5 w-5/6 rounded" />
                    <Skeleton className="h-5 w-4/5 rounded" />
                    <Skeleton className="h-5 w-4/5 rounded" />
                    <Skeleton className="h-5 w-4/5 rounded" />
                </div>
            </div>

            {/* 中间图片栏 */}
            <div className="relative w-[500px] aspect-[1/1] bg-slate-50 rounded-md overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
            </div>

            {/* 右侧 Add to Cart 区域 */}
            <div className="w-80 p-6 flex flex-col space-y-10">
                {/* Select 标签 */}
                <Skeleton className="h-6 w-24 rounded" />
                {/* 两个按钮 */}
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
                {/* Price */}
                <div className="flex gap-2 items-center">
                    <Skeleton className="h-6 w-12 rounded" />
                    <Skeleton className="h-6 w-20 bg-red-200 rounded" />
                </div>
                {/* Add to Cart 按钮 */}
                <Skeleton className="h-12 w-40 bg-orange-200 rounded-md" />
            </div>

        </div>
    )
}