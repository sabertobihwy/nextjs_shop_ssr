import { getTenantByName } from "@/lib/dao/tenants"
import { TenantPublic, toTenantPublic } from "@/types/entities/Tenant"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"

export async function getTenantService(tenantName: string): Promise<TenantPublic> {
    const tenantRsp = await getTenantByName(tenantName)
    if (!tenantRsp) {
        throw new BizError(ErrorCode.TENANT_NOT_FOUND, 400,)
    }
    return toTenantPublic(tenantRsp)
}