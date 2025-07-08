'use server'

import { signJwt } from "@/auth/jwt";
import { getTenantByNameStrict } from "@/db/tenants.dao";
import { getUserByUserNameStrict } from "@/db/user.dao";
import { LoginSchema } from "@/lib/schemas/base";
import { ActionRespType, Status } from "@/types/api/response";
import { SafeUser } from "@/types/entities/User";
import { BizError } from "@/types/shared/BizError";
import { ErrorCode } from "@/types/shared/error-code";
import bcrypt from "bcryptjs";
import { cookies } from 'next/headers'

// login client : get tenantName -> login server
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(_: any, formData: FormData): Promise<ActionRespType<SafeUser>> {
    try {
        const raw = Object.fromEntries(formData.entries());
        // 0. zod validation
        const result = LoginSchema.safeParse(raw)
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

        // 4. 签发 token
        const token = signJwt({
            sub: safeUser.id,
            username: safeUser.username,
            tenantId: safeUser.tenant_id,
            role: safeUser.role,
        })

        const cookieStore = await cookies()
        cookieStore.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7天
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