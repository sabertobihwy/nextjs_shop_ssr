'use client'
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { SORTLIST } from "@/lib/constants";
import { SortValue } from "@/lib/type";
import { useState } from "react";
import Link from "next/link"

export function Sort() {
    const [value, setValue] = useState(() => 'latest');

    return (<div className="w-64 py-6">
        <h2 className="text-2xl">Sort by</h2>
        <ToggleGroup type="single"
            variant={"default"}
            value={value}
            onValueChange={(value: SortValue) => {
                if (value) setValue(value);
            }}
            className="flex flex-col items-start mt-6 gap-3 ml-10">
            {SORTLIST.map((item, i) => (<ToggleGroupItem key={i} value={item.valueName} className="rounded-md">
                <h3 className="text-xl"><Link href={item.href}>{item.name}</Link></h3>
            </ToggleGroupItem>))}
        </ToggleGroup>
    </div>)
}