'use server'

import { COOKIE_PREFIX } from "@/constants/cookies"
import { cookies } from "next/headers"

export async function logoutAction(formData: FormData): Promise<void> {
    console.log('====logoutAction===start====')
    const cookieStore = await cookies()
    const tenantName = formData.get('tenantName') as string
    if (!tenantName) {
        console.error('❌ [logoutAction] tenantName missing or invalid')
        return
    }
    const tenantKey = tenantName.toLowerCase()

    cookieStore.set({
        name: `${COOKIE_PREFIX.ACCESS_TOKEN}${tenantKey}`,
        value: '',
        path: '/',
        maxAge: 0, // 立即过期
    })

    cookieStore.set({
        name: `${COOKIE_PREFIX.REFRESH_TOKEN}${tenantKey}`,
        value: '',
        path: '/',
        maxAge: 0,
    })

    cookieStore.set({
        name: `${COOKIE_PREFIX.USER_SAFE}${tenantKey}`,
        value: '',
        path: '/',
        maxAge: 0,
    })
    // redirect(`${process.env.NEXT_BASE_URL}/${tenantName}`)

}