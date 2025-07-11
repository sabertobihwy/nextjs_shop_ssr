import { getTenantByNameStrict } from "@/db/tenants.dao"
import { ActionRespType, Status, toApiResponse } from "@/types/api/response"
import { TenantPublic } from "@/types/entities/Tenant"
import { BizError } from "@/types/shared/BizError"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ tenant: string }> }): Promise<NextResponse> {
    try {
        const { tenant: tenantName } = await params
        console.log('======getTenantByNameStrict=====,tenantName:' + tenantName)
        const data: TenantPublic = await getTenantByNameStrict(tenantName)

        const resp: ActionRespType<typeof data> = {
            status: Status.SUCCESS,
            code: 0,
            data,
        }

        return toApiResponse(resp)
    } catch (error) {
        const err: ActionRespType<null> =
            error instanceof BizError
                ? {
                    status: Status.ERROR,
                    code: error.code,
                    httpCode: error.httpCode,
                    message: error.message,
                }
                : {
                    status: Status.ERROR,
                    code: 1000,
                    httpCode: 500,
                    message: 'Internal Server Error',
                }

        return toApiResponse(err)
    }
}