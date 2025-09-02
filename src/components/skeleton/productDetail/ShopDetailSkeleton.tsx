import { Skeleton } from "@/components/ui/skeleton";

export function ShopDetailSkeleton() {
    return (<div className="flex h-[100dvh] overflow-hidden">
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <main className="grow">
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                    {/* Page content */}
                    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
                        {/* Left: Content */}
                        <div className="flex-1">
                            {/* Back link */}
                            <div className="mb-3">
                                <Skeleton className="h-4 w-40" />
                            </div>

                            {/* Header */}
                            <header className="mb-4 space-y-2">
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-4 w-2/3" />
                            </header>

                            {/* Image */}
                            <figure className="mb-6">
                                <Skeleton className="h-[360px] w-full rounded-xs" />
                            </figure>

                            {/* Product content */}
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-44" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-11/12" />
                                    <Skeleton className="h-4 w-10/12" />
                                </div>

                                {/* list bullets */}
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Skeleton className="h-3 w-3 rounded-full" />
                                            <Skeleton className="h-4 w-2/3" />
                                        </div>
                                    ))}
                                </div>

                                {/* blockquote */}
                                <Skeleton className="h-20 w-full" />
                            </div>

                            {/* Divider */}
                            <div className="my-6">
                                <Skeleton className="h-px w-full" />
                            </div>
                        </div>

                        {/* Right: Sidebar */}
                        <aside className="mt-8 lg:mt-0">
                            <div className="p-5 shadow-xs rounded-xl lg:w-72 xl:w-80 border">
                                <div className="mb-3 flex justify-center">
                                    <Skeleton className="h-5 w-40" />
                                </div>

                                {/* package options */}
                                <ul className="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col mb-4">
                                    {[0, 1, 2].map((i) => (
                                        <li key={i} className="w-full">
                                            <div className="w-full rounded-lg border p-4 shadow-xs">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Skeleton className="h-5 w-24" />
                                                    <Skeleton className="h-5 w-16" />
                                                </div>
                                                <Skeleton className="h-4 w-3/4" />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* buy button */}
                                <div className="mb-4">
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>

                                {/* terms text */}
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-3/5 mx-auto" />
                                    <Skeleton className="h-3 w-2/5 mx-auto" />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    </div>)
}