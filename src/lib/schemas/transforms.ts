import { z } from 'zod'
import type { HashedString, UUIDString } from '@/types/brand'
import { BizError } from '@/types/shared/BizError'
import { ErrorCode } from '@/types/shared/error-code'

// ✅ schema：可复用组合
export const UUIDSchema = z.string().uuid()
export const NonEmptyStringSchema = z.string().min(1, 'Empty string not allowed')

// ✅ 包装函数：用于类型安全封装
export function toUUIDString(input: string): string & UUIDString {
    try {
        return UUIDSchema.parse(input) as string & UUIDString
    } catch {
        throw new BizError(ErrorCode.INVALID_UUID, 400)
    }
}

export function toHashedString(input: string): string & HashedString {
    // ✅ 如果你希望更严格，可以加 bcrypt hash 开头检测
    if (!input.startsWith('$2')) {
        throw new BizError(ErrorCode.INVALID_HASHED_PASSWORD, 400)
    }
    return input as string & HashedString
}
