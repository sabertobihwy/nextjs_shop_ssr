import { prisma } from '@/db/prisma'
import { TenantPublic, toTenantPublic } from '@/types/entities/Tenant'
import { BizError } from '@/types/shared/BizError'
import { ErrorCode } from '@/types/shared/error-code'

async function getTenantByName(name: string) {
    return prisma.tenants.findUnique({
        where: { name }
    })
}
export async function getTenantByNamePublic(name: string): Promise<TenantPublic | null> {
    const tenant = await getTenantByName(name)
    if (!tenant) {
        return null
    }
    return toTenantPublic(tenant)
}

export async function getTenantByNameStrict(name: string): Promise<TenantPublic> {
    const tenant = await getTenantByName(name)
    if (!tenant) {
        throw new BizError(ErrorCode.TENANT_NOT_FOUND, 404)
    }
    return toTenantPublic(tenant)
}