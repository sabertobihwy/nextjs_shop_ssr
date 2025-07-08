"use client"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { SortValue } from "@/types/entities/Sort";
import { SORTLIST } from "@/constants/sortList";
import { useSort } from "@/redux/hooks/useSort";

export function Sort() {
    const { sortTag, setSortTag } = useSort()
    return (<div className="w-64 py-6">
        <h2 className="text-2xl">Sort by</h2>
        <ToggleGroup type="single"
            variant={"default"}
            value={sortTag}
            onValueChange={(value: SortValue) => {
                setSortTag(value)
            }}
            className="flex flex-col items-start mt-6 gap-3 ml-10">

            {SORTLIST.map((item) => (<ToggleGroupItem key={item.valueName} value={item.valueName} className="rounded-md text-xl"
            >{item.name}
            </ToggleGroupItem>))}

        </ToggleGroup>
    </div>)
}