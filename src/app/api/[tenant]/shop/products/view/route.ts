// app/api/products/route.ts

import { buildShopView, ShopViewLite } from "@/lib/service/server/products/buildShopView"
import { GetProductsOutput, getProductsService } from "@/lib/service/server/products/productService"
import { ActionRespType, Status, toApiResponse } from "@/types/api/response"
import { UUIDString } from "@/types/brand"
import { SortValue } from "@/types/entities/Sort"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"
import { NextResponse } from "next/server"

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url)
        const tenantId = searchParams.get('tenantId')
        const tenantName = searchParams.get('tenantName')
        const page = Number(searchParams.get('page'))
        const categoryId = searchParams.get('categoryId')
        const subIds = searchParams.get("subIds")?.split(",").map(Number) ?? [];
        const sortTag = searchParams.get("sortTag") as SortValue ?? 'Default'

        console.log({ tenantId, page, categoryId, subIds, sortTag });

        if (!tenantId || !tenantName) {
            throw new BizError(ErrorCode.TENANT_NOT_FOUND, 404)
        }

        const data: GetProductsOutput = await getProductsService({
            tenantId: tenantId as string & UUIDString, // 或者定义成 UUIDString
            page,
            categoryId: categoryId ? Number(categoryId) : undefined,
            subIds,
            sortTag,
            includeMeta: false, // CSR ,不需要查categories
        });

        const view: ShopViewLite = buildShopView(data, page, tenantName)

        const resp: ActionRespType<ShopViewLite> = {
            status: Status.SUCCESS,
            code: 0,
            data: view,
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

