'use client'
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { SORTLIST } from "@/lib/constants";
import { SortValue } from "@/lib/type";
import { useState } from "react";

export function Sort({ action }: { action: () => void }) {
    const [value, setValue] = useState(() => 'latest');

    return (<div className="w-64 py-6">
        <h2 className="text-2xl">Sort by</h2>
        <form action={action}>
            <ToggleGroup type="single"
                variant={"default"}
                value={value}
                onValueChange={(value: SortValue) => {
                    if (value) setValue(value);
                }}
                className="flex flex-col items-start mt-6 gap-3 ml-10">

                {SORTLIST.map((item, i) => (<ToggleGroupItem key={i} value={item.valueName} className="rounded-md text-xl"
                    type="submit" name="sortTag"
                >{item.name}
                    {/* <button className="text-xl" type="submit" name="sortTag" value={item.valueName}>{item.name}</button> */}
                </ToggleGroupItem>))}

            </ToggleGroup>
        </form>
    </div>)
}