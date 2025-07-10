'use server'

import { cookies } from "next/headers"

export async function logoutAction(): Promise<void> {
    const cookieStore = await cookies()

    cookieStore.set({
        name: 'token',
        value: '',
        path: '/',
        maxAge: 0, // 立即过期
    })

    cookieStore.set({
        name: 'userPublic',
        value: '',
        path: '/',
        maxAge: 0,
    })

}