import { TenantPublic } from "@/types/entities/Tenant"
import { assertApiSuccess } from "../http/assert"

export async function loadTenantOrRedirect(tenantName: string): Promise<TenantPublic> {
    const tenantRes = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/tenant`, {
        next: {
            revalidate: 3600
        }
    })
    const tenantPublic = (await assertApiSuccess<TenantPublic>(tenantRes))!
    return tenantPublic
}
