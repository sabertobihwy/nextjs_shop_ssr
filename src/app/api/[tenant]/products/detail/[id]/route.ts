import { getProductById } from "@/db/products.dao"
import { ActionRespType, Status, toApiResponse } from "@/types/api/response"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"
import { UUIDString } from "@/types/brand"
import { NextResponse } from "next/server"
import { ProductDTO } from "@/types/entities/products"

// app/api/products/detail/[id]/route.ts
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string, tenant: string }> }
): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url)
        const tenantId = searchParams.get('tenantId')
        const { id } = await context.params

        console.log('✅=====GET detail/id=====tenantId===' + tenantId)
        console.log('✅=====GET detail/id=====id===' + id)

        if (Number.isNaN(id)) {
            return toApiResponse({
                status: Status.ERROR,
                code: ErrorCode.INVALID_PARAMETERS,
                httpCode: 400
            })
        }

        const product: ProductDTO = await getProductById(tenantId as string & UUIDString, Number(id))

        const resp: ActionRespType<typeof product> = {
            status: Status.SUCCESS,
            code: 0,
            data: product,
        }
        console.log('✅=====GET detail/id=====product===' + JSON.stringify(product, null, 2))
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
                    code: ErrorCode.UNKNOWN,
                    httpCode: 500,
                }

        return toApiResponse(err)
    }
}