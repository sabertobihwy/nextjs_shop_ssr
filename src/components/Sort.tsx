"use client"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { SORTLIST } from "@/lib/constants";
import { SortValue } from "@/lib/type";
import { useSortStore } from "@/store";

export function Sort() {
    const setSort = useSortStore(state => state.setSort)
    const sortTag = useSortStore(state => state.sortTag)
    return (<div className="w-64 py-6">
        <h2 className="text-2xl">Sort by</h2>
        <ToggleGroup type="single"
            variant={"default"}
            value={sortTag}
            onValueChange={(value: SortValue) => {
                setSort(value)
            }}
            className="flex flex-col items-start mt-6 gap-3 ml-10">

            {SORTLIST.map((item, i) => (<ToggleGroupItem key={i} value={item.valueName} className="rounded-md text-xl"
            >{item.name}
            </ToggleGroupItem>))}

        </ToggleGroup>
    </div>)
}