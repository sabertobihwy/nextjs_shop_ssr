import { signJwt, verifyJwt } from "@/auth/jwt"
import { COOKIE_PREFIX, TOKEN_EXPIRY } from "@/constants/cookies"
import { getUserById } from "@/lib/dao/user"
import { Status, toApiResponse } from "@/types/api/response"
import { ErrorCode } from "@/types/shared/error-code"
import { cookies } from "next/headers"

export async function GET(_: Request, { params }: { params: Promise<{ tenant: string }> }) {
    const cookieStore = await cookies()
    const { tenant: tenantName } = await params
    if (!tenantName) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.TENANT_NOT_FOUND,
            httpCode: 400,
        })
    }

    const tenantKey = tenantName.toLowerCase()

    const accessToken = cookieStore.get(`${COOKIE_PREFIX.ACCESS_TOKEN}${tenantKey}`)?.value
    const refreshToken = cookieStore.get(`${COOKIE_PREFIX.REFRESH_TOKEN}${tenantKey}`)?.value

    // Step 1: 检查 access_token 是否有效
    const accessPayload = accessToken ? verifyJwt(accessToken) : null
    if (accessPayload) {
        const user = await getUserById(accessPayload.sub, accessPayload.tenantId)
        if (!user) {
            return toApiResponse({
                status: Status.ERROR,
                code: ErrorCode.USER_NOT_FOUND,
                httpCode: 500,
            })
        }
        return toApiResponse({
            status: Status.SUCCESS,
            code: 0,
            data: user,
        })
    }

    // Step 2: access 无效，检查 refresh_token
    const refreshPayload = refreshToken ? verifyJwt(refreshToken) : null
    if (!refreshPayload) {
        // Step 3: 清除 3 个 cookie
        const res = toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.UNAUTHORIZED,
            httpCode: 401
        })

        res.cookies.set(`${COOKIE_PREFIX.ACCESS_TOKEN}${tenantKey}`, '', {
            path: '/',
            maxAge: 0,
        })
        res.cookies.set(`${COOKIE_PREFIX.REFRESH_TOKEN}${tenantKey}`, '', {
            path: '/',
            maxAge: 0,
        })
        res.cookies.set(`${COOKIE_PREFIX.USER_SAFE}${tenantKey}`, '', {
            path: '/',
            maxAge: 0,
        })

        return res
    }

    // Step 4: refresh 有效 → 颁发新 access_token
    const newAccessToken = signJwt({
        sub: refreshPayload.sub,
        username: refreshPayload.username,
        tenantId: refreshPayload.tenantId,
        role: refreshPayload.role,
    }, { expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN.JWT })  // 设置过期时间为 1 小时

    const user = await getUserById(refreshPayload.sub, refreshPayload.tenantId)
    if (!user) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.USER_NOT_FOUND,
            httpCode: 500,
        })
    }
    const res = toApiResponse({
        status: Status.SUCCESS,
        code: 0,
        data: user,
    })
    res.cookies.set(
        `${COOKIE_PREFIX.ACCESS_TOKEN}${tenantKey}`,
        newAccessToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: TOKEN_EXPIRY.ACCESS_TOKEN.COOKIE,
        }
    )

    return res
}