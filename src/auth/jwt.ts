import jwt from 'jsonwebtoken'

export type CustomJwtPayload = {
    sub: string            // 用户唯一ID
    username: string      // 显示名称（登录用）
    tenantId: string
    role: 'user' | 'admin' // 权限
}

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment')
}

/**
 * 签发 JWT Token
 */
export function signJwt(payload: CustomJwtPayload, options?: jwt.SignOptions): string {
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: '1h',
        ...options,
    })
}

/**
 * 验证 JWT Token，有效时返回 payload，失败时返回 null
 */
export function verifyJwt(token: string): CustomJwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET!) as CustomJwtPayload
    } catch {
        return null
    }
}
