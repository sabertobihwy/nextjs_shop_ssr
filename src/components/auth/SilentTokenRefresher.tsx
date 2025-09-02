'use client'
import React from 'react'
import { useEffect, useRef } from 'react'
import { toast, Toaster } from 'sonner'
import { useAuth } from '@/redux/hooks/useAuth'
import { assertApiSuccess } from '@/lib/http/assert'
import { ActionRespTypeError } from '@/types/api/response'

export function SilentTokenRefresher({ tenantName }: { tenantName: string }) {
    const { clearUser } = useAuth()
    const refreshed = useRef(false)

    useEffect(() => {
        if (refreshed.current) return
        refreshed.current = true

        const refreshFn = async () => {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantName}/shop/account/refresh`, {
                credentials: 'include',
            })

            await assertApiSuccess(res, {
                client: (err: ActionRespTypeError) => {
                    console.log('Refresh token invalid:', err.code)
                    toast('登录已过期', {
                        description: '请重新登录',
                    })
                    clearUser()
                }
            })

        }

        refreshFn()
    })

    return (<Toaster />)
}
