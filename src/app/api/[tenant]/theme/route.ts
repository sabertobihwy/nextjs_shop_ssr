import { getThemeOptionsService } from "@/lib/service/server/theme/getThemeOptionsService"
import { ActionRespType, Status, toApiResponse } from "@/types/api/response"
import { ThemeOptionsEntity } from "@/types/entities/Theme"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url)
        const tenantId = searchParams.get('tenantId')

        if (!tenantId) {
            throw new BizError(ErrorCode.TENANT_NOT_FOUND, 404)
        }
        // api -> service -> dao
        const themeOpts: ThemeOptionsEntity = await getThemeOptionsService(tenantId)
        const resp: ActionRespType<typeof themeOpts> = {
            status: Status.SUCCESS,
            code: 0,
            data: themeOpts,
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