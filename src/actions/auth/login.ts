'use server'

import { signJwt } from "@/auth/jwt";
import { COOKIE_PREFIX, TOKEN_EXPIRY } from "@/constants/cookies";
import { getTenantByNameStrict } from "@/db/tenants.dao";
import { getUserByUserNameStrict } from "@/db/user.dao";
import { LoginSchema } from "@/lib/schemas/base";
import { ActionRespType, Status } from "@/types/api/response";
import { SafeUser, toUserPublic } from "@/types/entities/User";
import { BizError } from "@/types/shared/BizError";
import { ErrorCode } from "@/types/shared/error-code";
import bcrypt from "bcryptjs";
import { cookies } from 'next/headers'

// login client : get tenantName -> login server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function LoginAction(payload: {
    username: string
    password: string
    tenantName: string
}): Promise<ActionRespType<SafeUser>> {
    try {
        // 0. zod validation
        const result = LoginSchema.safeParse(payload)
        if (!result.success) {
            throw new BizError(ErrorCode.INVALID_INPUT, 400)
        }
        const { username, password, tenantName } = result.data

        // 1. 查找租户
        const tenant = await getTenantByNameStrict(tenantName)

        // 2. 查找用户
        const user = await getUserByUserNameStrict(username, tenant.tenantId)

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new BizError(ErrorCode.INVALID_PASSWORD, 401)

        // 3. 转换为 safeUser
        const safeUser: SafeUser = {
            id: user.id,
            username: user.username,
            tenant_id: user.tenant_id,
            role: user.role as 'user' | 'admin',
        }

        // 4. 签发 ACCESS_TOKEN
        const accessToken = signJwt({
            sub: safeUser.id,
            username: safeUser.username,
            tenantId: safeUser.tenant_id,
            role: safeUser.role,
        }, { expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN.JWT })  // 设置过期时间为 1 小时

        const refreshToken = signJwt({
            sub: safeUser.id,
            username: safeUser.username,
            tenantId: safeUser.tenant_id,
            role: safeUser.role,
        }, { expiresIn: TOKEN_EXPIRY.REFRESH_TOKEN.JWT })  // 设置过期时间为 7 天

        const cookieStore = await cookies()
        const tenantKey = tenantName.toLowerCase()

        cookieStore.set({
            name: `${COOKIE_PREFIX.ACCESS_TOKEN}${tenantKey}`,
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: TOKEN_EXPIRY.ACCESS_TOKEN.COOKIE,
        })

        cookieStore.set({
            name: `${COOKIE_PREFIX.REFRESH_TOKEN}${tenantKey}`,
            value: refreshToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: TOKEN_EXPIRY.REFRESH_TOKEN.COOKIE,
        })

        const userPublicStr = JSON.stringify(toUserPublic(safeUser))
        cookieStore.set(`${COOKIE_PREFIX.USER_PUBLIC}${tenantKey}`, userPublicStr, {
            httpOnly: false,
            maxAge: TOKEN_EXPIRY.USER_PUBLIC.COOKIE,
            path: '/',
        })

        // 7. 返回成功响应
        return {
            status: Status.SUCCESS,
            code: 0,
            data: safeUser,
        }

    } catch (error) {
        const isBizError = error instanceof BizError

        return {
            status: Status.ERROR,
            code: isBizError ? error.code : ErrorCode.INTERNAL_SERVER_ERROR,
            message: isBizError ? error.message : 'Internal server error',
            httpCode: isBizError ? error.httpCode : 500,
        }
    }

}