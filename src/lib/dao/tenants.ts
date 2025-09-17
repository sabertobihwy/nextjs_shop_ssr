import { prisma } from '@/db/prisma'
import { TenantPublic, toTenantPublic } from '@/types/entities/Tenant'

// for BFF server service
export async function getTenantByName(name: string) {
    const result = prisma.tenants.findUnique({
        where: { name }
    })
    return result
}
// deprecated 
export async function getTenantByNamePublic(name: string): Promise<TenantPublic | null> {
    const tenant = await getTenantByName(name)
    if (!tenant) {
        return null
    }
    return toTenantPublic(tenant)
}
