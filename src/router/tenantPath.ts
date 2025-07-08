'use client'

import { useTenantName } from "@/redux/hooks/useTenant"

export function useTenantPath() {
    const tenantName = useTenantName()
    return (path: string) => `/${tenantName}${path.startsWith('/') ? path : '/' + path}`
}
