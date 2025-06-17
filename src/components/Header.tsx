
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { HEADERLINK } from "@/lib/constants"
import React from "react"

export async function Header() {
    return (
        <div className="h-16 border-black/20 border-b bg-white">
            <div className="containerM flex items-center justify-between h-full">
                <h1 className="text-2xl font-bold">
                    SHOP
                </h1>
                <div className="flex justify-end space-x-4 text-sm h-1/3">
                    {
                        HEADERLINK.map((item, i) => <React.Fragment key={i}>
                            {i !== 0 && <Separator orientation='vertical' />}
                            <Link href={item.href} className="text-lg">{item.name}</Link>
                        </React.Fragment>)
                    }
                    {/* <Link href='/search'>Search</Link>
                    <Separator orientation='vertical' />
                    <Link href='/account'>Account</Link>
                    <Separator orientation='vertical' />
                    <Link href='/cart'>Cart</Link> */}
                </div>
            </div>
        </div>

    )
}