// lib/useTenantRouter.ts
'use client'

import { useTenantName } from '@/redux/hooks/useTenant'
import { useRouter } from 'next/navigation'
/**
 * 
 * @usage 
 *      const { push } = useTenantRouter()
        push('/detail/123')
 */
export function useTenantRouter() {
    const tenantName = useTenantName()
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
