import { Skeleton } from "@/components/ui/skeleton";

export function ShopDetailSkeleton() {
    return (<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-[var(--main-bg)]" >
        <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Page content */}
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Back link */}
                        <div className="mb-5">
                            <Skeleton className="h-4 w-40 rounded-md" />
                        </div>

                        {/* Title + Desc */}
                        <header className="mb-6">
                            <Skeleton className="h-8 w-2/3 mb-4 rounded-md" />
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                        </header>

                        {/* Image area: w-[640px] & aspect-[100/71] 与正式版一致 */}
                        <figure className="mb-6 w-[640px] max-w-full aspect-[100/71] rounded-xl" >
                            <div className="relative h-full w-full overflow-hidden rounded-xl">
                                <Skeleton className="absolute inset-0 rounded-xl" />
                            </div>
                        </figure>

                        {/* Overview markdown 若干段落 */}
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-11/12 rounded-md" />
                            <Skeleton className="h-6 w-10/12 rounded-md" />
                            <Skeleton className="h-6 w-9/12 rounded-md" />
                        </div>


                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-sd-surface py-10 mt-15 ml-10 shadow-xs rounded-xl lg:w-72 xl:w-80 border-2">
                            {/* 标题 */}
                            <div className="mb-6 flex justify-center">
                                <Skeleton className="h-4 w-28 rounded-md" />
                            </div>

                            {/* 三个选项：5 个实心块风格中的中间 3 块 */}
                            <div className="space-y-3 mb-8 px-6">
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                            </div>

                            {/* CTA 按钮：底部第 5 块 */}
                            <div className="flex justify-center px-6">
                                <Skeleton className="h-10 w-40 rounded-lg" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
    )
}