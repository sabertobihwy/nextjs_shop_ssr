'use client'
import React from "react"
import DefaultNavLink from "./DefaultNavLink"
import { buildNavigationFromList, NavItem } from "@/constants/buildNav"
import SmartNavLink from "./tenant/SmartNavLink"
type RootHeaderProps = {
    tenantName: string
    themeName: string,
    sceneList: string[]
}
// themeOption
export function RootHeader({ tenantName, themeName, sceneList }: RootHeaderProps) {
    const nav: NavItem[] = buildNavigationFromList(sceneList)
    return (
        <div className="sticky top-0 z-50 h-[var(--root-header-h)] border-gray-200 border-b bg-white">
            <div className="containerContent flex items-center justify-between h-full root-actions">
                <h1 className="flex-none h-12 text-xl font-bold hover:cursor-pointer">
                    <SmartNavLink tenantName={tenantName} href={'/'}>{themeName}</SmartNavLink>
                </h1>
                <div className="inline-flex flex-none items-center gap-4 text-sm h-8 ">
                    {
                        nav.map((navItem, i) =>
                            <React.Fragment key={i}>
                                {i !== 0 && <span aria-hidden className="inline-block w-px h-4 bg-gray-200" />}
                                <DefaultNavLink tenantName={tenantName} className="h-8" href={navItem.href} name={navItem.label} />
                            </React.Fragment>)
                    }
                </div>
            </div>
        </div>

    )
}