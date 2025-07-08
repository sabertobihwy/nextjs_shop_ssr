import { prisma } from '@/db/prisma'
import { CreateUserInput, SafeUser, toSafeUser } from '@/types/entities/User'
import { BizError } from '@/types/shared/BizError'
import { ErrorCode } from '@/types/shared/error-code'
import { Prisma } from '@prisma/client'

export async function getUserById(id: string, tenantId: string): Promise<SafeUser | null> {
    const user = await prisma.users.findUnique({
        where: {
            // 复合唯一约束：username + tenant_id
            id_tenant_id: {
                id,
                tenant_id: tenantId,
            },
        },
    })
    if (user) return toSafeUser(user)
    return null
}

export async function getUserByIdStrict(id: string, tenantId: string): Promise<SafeUser> {
    const user = await getUserById(id, tenantId)
    if (!user) throw new BizError(ErrorCode.USER_NOT_FOUND, 404)
    return user
}

export async function getUserByUserName(username: string, tenantId: string): Promise<{
    id: string;
    tenant_id: string;
    username: string;
    password: string;
    role: string;
} | null> {
    const user = await prisma.users.findUnique({
        where: {
            username_tenant_id: {
                username,
                tenant_id: tenantId,
            },
        },
    })

    return user
}

// for verify password
export async function getUserByUserNameStrict(username: string, tenantId: string): Promise<{
    id: string;
    tenant_id: string;
    username: string;
    password: string;
    role: string;
}> {
    const user = await prisma.users.findUnique({
        where: {
            username_tenant_id: {
                username,
                tenant_id: tenantId,
            },
        },
    })

    if (!user) {
        throw new BizError(ErrorCode.USER_NOT_FOUND, 404)
    }

    return user
}

export async function createUser(input: CreateUserInput) {
    const { username, password, tenantId, role = 'user' } = input

    try {
        return await prisma.users.create({
            data: {
                username,
                password,
                tenant_id: tenantId,
                role,
            },
        })
    } catch (error) {
        // 捕捉违反联合唯一约束 (username + tenant_id)
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            throw new BizError(ErrorCode.USER_ALREADY_EXISTS, 409)
        }

        // 其他错误抛为内部错误
        throw new BizError(ErrorCode.INTERNAL_SERVER_ERROR, 500)
    }
}