'use client'
import { Separator } from "@/components/ui/separator"
import React from "react"
import { HEADERLINK, HeaderLinkItem } from "@/constants/headerLinks"
import { useTenant } from "@/redux/hooks/useTenant"
import TenantLink from "@/components/tenant/SmartNavLink"
import DefaultNavLink from "@/components/DefaultNavLink"
import { useAuth } from "@/redux/hooks/useAuth"
import { logoutAction } from "@/actions/auth/logout"

// deprecated
export function Header() {
    const { tenantName } = useTenant()
    const { user } = useAuth()
    return (
        <div className="h-16 border-black/20 border-b bg-white">
            <div className="containerContent flex items-center justify-between h-full">
                <h1 className="text-2xl font-bold hover:cursor-pointer">
                    <TenantLink href={'/'} tenantName="">SHOPSTACK</TenantLink>
                </h1>
                <div className="flex justify-end space-x-4 text-sm h-1/3">
                    {
                        HEADERLINK.map((link: HeaderLinkItem, i) => <React.Fragment key={i}>
                            {i !== 0 && <Separator orientation='vertical' />}
                            {link.render ? (React.cloneElement(link.render))
                                : <DefaultNavLink {...link} />}
                        </React.Fragment>)
                    }
                </div>
                {/* <div>
                    {user ? user.username : <TenantLink href={'/login'}>Login</TenantLink>}
                    {user && <form action={logoutAction}>
                        <button type="submit">Logout</button>
                    </form>}
                </div> */}
                <div className="w-[160px] text-right flex items-center justify-end ">
                    {/* 登录按钮（默认显示，user 为 null） */}
                    <div style={{ visibility: user ? 'hidden' : 'visible' }}>
                        <TenantLink href="/login" tenantName="" >Login</TenantLink>
                    </div>

                    {/* 用户名 + 登出按钮（user 不为 null 时显示，但不影响布局） */}
                    <div
                        className="flex items-center space-x-4 text-red-500"
                        style={{ visibility: user ? 'visible' : 'hidden' }}
                    >
                        <span>{user?.username}</span>
                        <form action={logoutAction}>
                            <input type="hidden" name="tenantName" value={tenantName} />
                            <button type="submit" className="text-black hover:underline">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}