'use client'

import { useTenant } from "@/redux/hooks/useTenant"

export function useTenantPath() {
    const { tenantName } = useTenant()
    return (path: string) => `/${tenantName}${path.startsWith('/') ? path : '/' + path}`
}
