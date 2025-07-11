// deprecated
import { verifyJwt } from '@/auth/jwt'
import { getUserById } from '@/db/user.dao'
import { SafeUser } from '@/types/entities/User'
import { cookies } from 'next/headers'

export async function getUserFromCookie(tenantName: string): Promise<SafeUser | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token' + tenantName)?.value
    if (!token) return null

    const payload = verifyJwt(token)
    if (!payload) return null

    const user = await getUserById(payload.sub, payload.tenantId)
    return user // user or null
}