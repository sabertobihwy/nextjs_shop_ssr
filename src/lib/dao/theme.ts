import { prisma } from '@/db/prisma'

export async function getThemeOptionsByTenantId(tenantId: string) {
    return await prisma.theme_options.findUnique({
        where: { tenant_id: tenantId },
    })

}