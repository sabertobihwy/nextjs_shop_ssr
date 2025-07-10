'use server'

import { cookies } from "next/headers"

export async function logoutAction(formData: FormData): Promise<void> {
    const cookieStore = await cookies()
    const tenantName = formData.get('tenantName')
    if (!tenantName) {
        console.error('❌ [logoutAction] tenantName missing or invalid')
        return
    }

    cookieStore.set({
        name: 'token' + tenantName,
        value: '',
        path: '/',
        maxAge: 0, // 立即过期
    })

    cookieStore.set({
        name: 'userPublic' + tenantName,
        value: '',
        path: '/',
        maxAge: 0,
    })

}