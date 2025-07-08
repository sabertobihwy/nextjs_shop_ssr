import { NextResponse } from "next/server"

export enum Status {
    SUCCESS = 'success',
    ERROR = 'error'
}
// 公共响应字段
export type BaseResponse = {
    status: Status.SUCCESS | Status.ERROR
    code: number                //  业务错误码
    message?: string            // 可选提示（i18n 走 code）
}

// 成功时
export type ActionRespTypeSuccess<T> = BaseResponse & {
    status: Status.SUCCESS
    data: T
}

// 失败时
export type ActionRespTypeError = BaseResponse & {
    status: Status.ERROR
    httpCode: number            //  HTTP 状态码
}

// 联合体
export type ActionRespType<T> = ActionRespTypeSuccess<T> | ActionRespTypeError

export function toApiResponse<T>(result: ActionRespType<T>): NextResponse {
    if (result.status === Status.SUCCESS) {
        return NextResponse.json(result)
    } else {
        return NextResponse.json(result, { status: result.httpCode })
    }
}