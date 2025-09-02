'use server'

import bcrypt from 'bcryptjs'
import { ActionRespType, Status } from '@/types/api/response'
import { getTenantByNameStrict } from '@/lib/dao/tenants.dao'
import { createUser, getUserByUserName } from '@/lib/dao/user.dao'
import { BizError } from '@/types/shared/BizError'
import { ErrorCode } from '@/types/shared/error-code'
import { NonEmptyString } from '@/types/brand'
import { RegisterSchema } from '@/lib/schemas/base'
import { toHashedString, toUUIDString } from '@/lib/schemas/transforms'

export async function registerAction(payload: {
    username: string
    password: string
    tenantName: string
}): Promise<ActionRespType<null>> {

    try {
        // 0. zod validation
        const result = RegisterSchema.safeParse(payload)
        if (!result.success) {
            throw new BizError(ErrorCode.INVALID_INPUT, 400)
        }
        const { username, password, tenantName } = result.data

        // 1. 获取租户
        const tenant = await getTenantByNameStrict(tenantName)

        // 2. 检查用户名是否已存在
        const existingUser = await getUserByUserName(username, tenant.tenantId)
        if (existingUser) {
            throw new BizError(ErrorCode.USER_ALREADY_EXISTS, 409) // conflict: "已经存在的资源"
        }

        // 3. 加密密码
        const hashedPassword = await bcrypt.hash(password, 10)

        // 4. 创建用户 + validation 
        await createUser({
            username: username as string & NonEmptyString, // already checked in zod 
            password: toHashedString(hashedPassword),
            tenantId: toUUIDString(tenant.tenantId),
        })

        // 5. 返回成功（不登录、不设置 cookie）
        return {
            status: Status.SUCCESS,
            code: 0,
            data: null
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
