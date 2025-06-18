import { SORTLIST } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton"

export default async function Loading() {
    return (<>
        <div className="containerContent flex justify-between">
            <div className="w-64 py-6">
                <h2 className="text-2xl">Sort by</h2>
                <div className="flex flex-col items-start mt-6 gap-3 ml-10">
                    {SORTLIST.map((_, i) => (<Skeleton key={i} className="h-[20px] w-[100px] rounded-md " />
                    ))}
                </div>
            </div>
            <div className="py-10 flex-1">
                <h2 className='text-4xl mb-8'>Products</h2>
                <div className="grid grid-cols-3 gap-10">
                    {Array(10).fill(1).map((_, i) =>
                    (<div key={i} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 flex flex-col 
                    transition duration-300 ease-in-out ">
                        <div className="relative w-full aspect-[1/1] overflow-hidden">
                            <Skeleton className='absolute inset-0 w-full h-full' />
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-[180px]" />
                        </div>
                    </div>))}
                </div>
            </div>
        </div>



    </>
    )

}