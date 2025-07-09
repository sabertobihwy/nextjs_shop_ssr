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

    return { push, replace }
}
