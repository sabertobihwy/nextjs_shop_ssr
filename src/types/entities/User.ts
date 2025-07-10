import { HashedString, NonEmptyString, UUIDString } from "../brand"

// 服务端内部逻辑: 处理鉴权、签 JWT 
// server
export type SafeUser = {
    id: string
    username: string
    tenant_id: string
    role: 'user' | 'admin'
}

// client 
export type UserPublic = {
    username: string
}

// 类型守卫 + 类型转换
export function toSafeUser(user: {
    id: string
    username: string
    tenant_id: string
    password: string
    role: string
}): SafeUser {
    const allowedRoles = ['user', 'admin'] as const

    if (!allowedRoles.includes(user.role as 'user' | 'admin')) {
        throw new Error(`Unknown role: ${user.role}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user
    return {
        ...rest,
        role: user.role as 'user' | 'admin'
    }
}

export function isSafeUser(value: unknown): value is SafeUser {
    return (
        !!value &&
        typeof value === 'object' &&
        'id' in value &&
        'username' in value &&
        'tenant_id' in value &&
        'role' in value &&
        (value['role'] === 'user' || value['role'] === 'admin')
    )
}


export function toUserPublic(user: SafeUser): UserPublic {
    return {
        username: user.username
    }
}

export type CreateUserInput = {
    username: string & NonEmptyString
    password: string & HashedString
    tenantId: string & UUIDString
    role?: 'user' | 'admin'
}