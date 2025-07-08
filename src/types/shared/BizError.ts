import { ErrorCode } from "./error-code"

export class BizError extends Error {
    code: ErrorCode // bizCode
    httpCode: number
    constructor(code: number, httpCode: number, fallbackMessage = '请求失败') {
        super(fallbackMessage)
        this.code = code
        this.name = 'ApiError'
        this.httpCode = httpCode
        Object.setPrototypeOf(this, BizError.prototype) // for Babel/ts -> ES5 
    }
}