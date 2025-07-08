'use client'
import { Separator } from "@/components/ui/separator"
import React from "react"
import DefaultNavLink from "./DefaultNavLink"
import { HEADERLINK, HeaderLinkItem } from "@/constants/headerLinks"
import TenantLink from "./TenantLink"

export function Header() {
    return (
        <div className="h-16 border-black/20 border-b bg-white">
            <div className="containerM flex items-center justify-between h-full">
                <h1 className="text-2xl font-bold hover:cursor-pointer">
                    <TenantLink href={'/'}>SHOPSTACK</TenantLink>
                </h1>
                <div className="flex justify-end space-x-4 text-sm h-1/3">
                    {
                        HEADERLINK.map((link: HeaderLinkItem, i) => <React.Fragment key={i}>
                            {i !== 0 && <Separator orientation='vertical' />}
                            {link.render ? (React.cloneElement(link.render))
                                : <DefaultNavLink {...link} />}
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