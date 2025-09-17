'use client'
import React from 'react'
import { SilentTokenRefresher } from "@/components/auth/SilentTokenRefresher"
import { SafeUser } from "@/types/entities/User"
import { ReactNode } from "react"
import { useTheme } from '@/redux/hooks/useTheme'
import { generateCdn_theme_url } from '@/constants/theme'
import HeaderRemoteContainer from '@/containers/ShopHeaderRemoteContainer'

type Props = {
    user: SafeUser | null,
    tenantName: string,
    children: ReactNode
}

export default function ShopHeaderClient({ user, tenantName, children }: Props) {
    const { themeName, themeCdnMap } = useTheme()
    const url = generateCdn_theme_url(themeCdnMap[`${themeName}-shop-header`])

    return (
        <>
            <SilentTokenRefresher tenantName={tenantName} />
            <div className="flex-1 min-h-0">
                <div className="flex flex-col flex-1 min-h-0">
                    <div className="sticky top-[var(--root-header-h)] z-40 shrink-0" >
                        <HeaderRemoteContainer url={url} user={user} />
                    </div>
                    <main data-scroll-root className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>

        </>
    )
}