'use client'
import { Separator } from "@/components/ui/separator"
import React from "react"
import DefaultNavLink from "./DefaultNavLink"
import TenantLink from "./tenant/TenantLink"
import { useTheme } from "@/redux/hooks/useTheme"
import { buildNavigationFromList, NavItem } from "@/constants/buildNav"

// themeOption
export function RootHeader() {
    const { themeName, sceneList } = useTheme()
    const nav: NavItem[] = buildNavigationFromList(sceneList)
    return (
        <div className="sticky top-0 z-50 h-[var(--root-header-h)] border-gray-200 border-b bg-white">
            <div className="containerContent flex items-center justify-between h-full">
                <h1 className="h-12 text-xl font-bold hover:cursor-pointer">
                    <TenantLink href={'/'}>{themeName}</TenantLink>
                </h1>
                <div className="flex justify-end space-x-4 text-sm h-1/3">
                    {
                        nav.map((navItem, i) =>
                            <React.Fragment key={i}>
                                {i !== 0 && <Separator orientation='vertical' />}
                                <DefaultNavLink className="h-8" href={navItem.href} name={navItem.label} />
                            </React.Fragment>)
                    }
                </div>
            </div>
        </div>

    )
}