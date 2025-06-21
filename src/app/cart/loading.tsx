import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

export default async function Loading() {
    return (<div className="containerContent flex py-25">
        <div className="flex-1 w-full flex flex-col">
            <h1 className="text-2xl font-bold py-3">Cart</h1>
            <div className="w-full">
                <Table>
                    <TableHeader>
                        <TableRow className="text-base hover:bg-transparent">
                            <TableHead className="w-3/5 text-gray-500 font-normal">Item</TableHead>
                            <TableHead className="w-[100px] text-gray-500 font-normal">Quantity</TableHead>
                            <TableHead className="w-[100px] text-gray-500 font-normal">Price</TableHead>
                            <TableHead className="w-[100px] text-right text-gray-500 font-normal">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <Skeleton className="h-[30px] w-full my-6" />
                <Skeleton className="h-[30px] w-full my-6" />
                <Skeleton className="h-[30px] w-full my-6" />
            </div>
        </div>
        <div className="w-56 mx-25 flex flex-col gap-5 items-center">
            <div className="text-2xl font-bold self-start py-3">Total</div>
            <div className="text-2xl font-bold text-red-400 self-start">
                <Skeleton className="h-[24px] w-[100px]" />
            </div>
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-[14px] w-[100px]" />
        </div>
    </div>)
}