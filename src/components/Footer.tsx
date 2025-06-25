import { Separator } from "@/components/ui/separator"
import { FOOTERLINK } from "@/types/enum"
import Link from "next/link"
import React from "react"

export async function Footer() {
    return (
        <div className="border-t mt-6">
            <div className="containerM py-32 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href='/'>SHOPSTACK</Link>
                </div>
                <div className="flex space-x-10 h-35">
                    {
                        FOOTERLINK.map((item, i) => <React.Fragment key={i}>
                            {i !== 0 && <Separator orientation='vertical' />}
                            <div>
                                <span>
                                    {item.category}
                                </span>
                                <ul className="m-4 space-y-3">
                                    {item.chidren.map((child, j) => <React.Fragment key={i - j}>
                                        <li><Link href={child.href}>{child.name}</Link></li>
                                    </React.Fragment>)}
                                </ul>
                            </div>
                        </React.Fragment>)
                    }

                </div>
            </div>
        </div>
    )
}