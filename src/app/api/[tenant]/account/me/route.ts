
import { CustomJwtPayload, verifyJwt } from '@/auth/jwt'
import { getUserByIdStrict } from '@/db/user.dao'
import { Status, toApiResponse } from '@/types/api/response'
import { toUserPublic } from '@/types/entities/User'
import { ErrorCode } from '@/types/shared/error-code'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// client 
export async function GET(): Promise<NextResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.UNAUTHORIZED,
            httpCode: 401,
        })
    }

    const payload: CustomJwtPayload | null = verifyJwt(token)
    if (!payload) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.INVALID_TOKEN,
            httpCode: 401,
        })
    }

    const user = await getUserByIdStrict(payload.sub, payload.tenantId)
    if (!user) {
        return toApiResponse({
            status: Status.ERROR,
            code: ErrorCode.USER_NOT_FOUND,
            httpCode: 404,
        })
    }

    return toApiResponse({
        status: Status.SUCCESS,
        code: 0,
        data: toUserPublic(user)
    })
}
