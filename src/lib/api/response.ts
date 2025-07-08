import { Status } from "@/types/api/response"
import { NextResponse } from "next/server"

// 目前没用
export function success<T>(data: T) {
    return NextResponse.json({
        status: Status.SUCCESS,
        code: 0,
        data,
    })
}

export function fail(code: number, message: string, httpCode = 400) {
    return NextResponse.json({
        status: Status.ERROR,
        code,
        message,
        httpCode,
    }, { status: httpCode })
}