'use server'

import { ActionRespType, Status } from "@/types/api/response"
import { cookies } from "next/headers"

export async function logoutAction(): Promise<ActionRespType<null>> {
    const cookieStore = await cookies()

    cookieStore.set({
        name: 'token',
        value: '',
        path: '/',
        maxAge: 0, // 立即过期
    })

    return {
        status: Status.SUCCESS,
        code: 0,
        data: null,
    }
}