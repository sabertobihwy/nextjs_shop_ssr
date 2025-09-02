import { supabase } from "@/db/supabase"
import { getTenantByNameStrict } from "@/lib/dao/tenants.dao"
import { verifyTurnstile } from "@/lib/utils/verifyTurnstile"
import { ActionRespType, Status, toApiResponse } from "@/types/api/response"
import { TenantPublic } from "@/types/entities/Tenant"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest, { params }: { params: Promise<{ tenant: string }> }) {

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0"

    const body = await req.json()
    let tenant_id = body.tenant_id
    const turnstile_token = body.turnstile_token
    if (!turnstile_token) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.Turnstile_TOKEN_MISSING,
            httpCode: 400,
            message: '缺少 Turnstile token',
        })
    }
    const valid = await verifyTurnstile(turnstile_token, ip)
    if (!valid) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.FORBIDDEN,
            httpCode: 403,
            message: '人机验证未通过',
        })
    }

    if (!tenant_id) { // todo: 有可能没有吗？
        const { tenant: tenantName } = await params

        try {
            const tenant: TenantPublic = await getTenantByNameStrict(tenantName)
            tenant_id = tenant.tenantId
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

    const { count } = await supabase
        .from('register_logs')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenant_id)
        .eq('ip', ip)
        .gte('created_at', new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString())

    if ((count ?? 0) >= 3) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.IP_EXCEED_LIMIT,
            httpCode: 429,
            message: '此 IP 在该租户下注册次数过多'
        })
    }

    const { error } = await supabase.from('register_logs').insert({ tenant_id, ip })
    if (error) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.DATABASE_ERROR,
            httpCode: 500,
            message: error.message
        })
    }

    return toApiResponse({
        status: Status.SUCCESS,
        code: 0,
        data: null
    })

}