// lib/useTenantRouter.ts
'use client'

import { useTenant } from '@/redux/hooks/useTenant'
import { useRouter } from 'next/navigation'
/**
 * 
 * @usage 
 *      const { push } = useTenantRouter()
        push('/detail/123')
 */
export function useTenantRouter() {
    const { tenantName } = useTenant()
    const router = useRouter()

    // 不走Layout
    function push(path: string) {
        if (!tenantName) throw new Error('tenant not set')
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        router.push(`/${tenantName}${normalizedPath}`)
    }

    function replace(path: string) {
        if (!tenantName) throw new Error('tenant not set')
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        router.replace(`/${tenantName}${normalizedPath}`)
    }
    // 走Layout
    function tenantRedirect(path: string) {
        if (!tenantName) throw new Error('tenant not set')
        const normalizedPath = path.startsWith('/') ? path : `/${path}`
        window.location.href = `/${tenantName}${normalizedPath}`
    }

    return { push, replace, tenantRedirect }
}
