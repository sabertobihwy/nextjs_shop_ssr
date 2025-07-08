// app/api/products/route.ts

import { getAllProducts } from "@/db/products.dao"
import { ActionRespType, Status, toApiResponse } from "@/types/api/response"
import { UUIDString } from "@/types/brand"
import { BizError } from "@/types/shared/BizError"
import { NextResponse } from "next/server"

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url)
        const tenantId = searchParams.get('tenantId')

        const data = await getAllProducts(tenantId as string & UUIDString)

        const resp: ActionRespType<typeof data> = {
            status: Status.SUCCESS,
            code: 0,
            data,
        }

        return toApiResponse(resp)
    } catch (error) {
        const err: ActionRespType<null> =
            error instanceof BizError
                ? {
                    status: Status.ERROR,
                    code: error.code,
                    httpCode: error.httpCode,
                    message: error.message,
                }
                : {
                    status: Status.ERROR,
                    code: 1000,
                    httpCode: 500,
                    message: 'Internal Server Error',
                }

        return toApiResponse(err)
    }
}

