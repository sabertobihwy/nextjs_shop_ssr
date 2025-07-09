import { ErrorCode } from "./error-code"
import { errorMessageMap } from "./error-message-map"

export class BizError extends Error {
    code: ErrorCode // bizCode
    httpCode: number
    constructor(code: ErrorCode, httpCode: number) {
        super(errorMessageMap[code])
        this.code = code
        this.name = 'ApiError'
        this.httpCode = httpCode
        Object.setPrototypeOf(this, BizError.prototype) // for Babel/ts -> ES5 
    }
}