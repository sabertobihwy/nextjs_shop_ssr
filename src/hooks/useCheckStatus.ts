"use client"
// deprecated
import { useTenantPath } from "@/router/tenantPath"
import useAuthStore from "@/Zustandstore/authStore"
import { useEffect, useRef } from "react"

export function useCheckStatus() {
    const setUser = useAuthStore(s => s.setUser)
    const setCheckStatusState = useAuthStore(s => s.setCheckStatusState)
    const tenantPath = useTenantPath()

    const didRun = useRef(false)

    useEffect(() => {
        if (didRun.current) return
        didRun.current = true

        const run = async () => {
            setCheckStatusState('loading')
            const resp = await fetch(tenantPath('/account/checklogin'), {
                cache: 'no-store',
                credentials: 'include'
            })
            if (resp.ok) {
                const res = await resp.json()
                setUser(res.data)
            } else {
                setUser(null)
            }
            setCheckStatusState('checked')

        }
        run()
    }, [setCheckStatusState, setUser, tenantPath])
}
