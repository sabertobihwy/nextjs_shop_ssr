import { Skeleton } from "@/components/ui/skeleton"

export const ShopSkeleton = () => {
    return (
        <main className="grow px-4 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

            <Skeleton className="w-2/3 h-8 mb-6" />

            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 md:flex-col md:space-y-10 xl:flex-row xl:space-x-6 mt-9">
                {/* Sidebar */}
                <div className="min-w-60 space-y-4">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-40" />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <Skeleton className="w-1/3 h-5 mb-4" />

                    <div className="grid grid-cols-12 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="col-span-full md:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl overflow-hidden"
                            >
                                <Skeleton className="w-full h-[226px]" />
                                <div className="p-5 space-y-2">
                                    <Skeleton className="w-2/3 h-5" />
                                    <Skeleton className="w-full h-4" />
                                    <div className="flex justify-between items-center mt-4">
                                        <Skeleton className="w-1/4 h-4" />
                                        <Skeleton className="w-1/4 h-6" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>)


}
