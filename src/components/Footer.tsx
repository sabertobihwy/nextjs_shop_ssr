'use client'
import { Separator } from "@/components/ui/separator"
import React from "react"
import TenantLink from "./TenantLink"
import { FOOTERLINK } from "@/constants/footerLinks"

export function Footer() {
    return (
        <div className="border-t mt-6">
            <div className="containerM py-32 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <TenantLink href='/'>SHOPSTACK</TenantLink>
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
                                        <li><TenantLink href={child.href}>{child.name}</TenantLink></li>
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