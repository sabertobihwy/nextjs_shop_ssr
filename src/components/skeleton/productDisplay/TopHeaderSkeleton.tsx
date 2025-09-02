
import { Skeleton } from "@/components/ui/skeleton"

export default function TopHeaderSkeleton() {
    return (
        <header className="h-12 border-black/20 border-b not-only:px-4 flex items-center justify-between bg-amber-500">
            {/* 左侧 tenant name */}
            <Skeleton className="w-24 h-12" />

            {/* 右侧导航链接 */}
            <div className="flex justify-end space-x-4 h-1/3 items-center">
                <Skeleton className="w-12 h-8" />
                <Skeleton className="w-12 h-8" />
                <Skeleton className="w-12 h-8" />
            </div>
        </header>
    )
}