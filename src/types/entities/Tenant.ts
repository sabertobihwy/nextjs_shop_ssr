import type { tenants as Tenant } from '@prisma/client'

export type TenantPublic = {
    tenantId: string
    tenantName: string
}
export function toTenantPublic(tenant: Tenant): TenantPublic {
    return {
        tenantId: tenant.id,
        tenantName: tenant.name
    }
}