// app/api/shop/products/subcategories/route.ts
import { getShopSubCateService } from "@/lib/service/server/products/getShopSubCateService";
import { ActionRespType, Status, toApiResponse } from "@/types/api/response";
import { Category } from "@/types/entities/products";
import { BizError } from "@/types/shared/BizError";
import { ErrorCode } from "@/types/shared/error-code";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tenantId = searchParams.get("tenantId");
        const topIdStr = searchParams.get("topId");

        if (!tenantId || !topIdStr) {
            throw new BizError(ErrorCode.TENANT_NOT_FOUND, 404)
        }

        const topId = Number(topIdStr);
        if (!Number.isFinite(topId) || topId <= 0) {
            throw new BizError(ErrorCode.PRODUCT_CATEGORY_TOPID_NOT_FOUND, 404)
        }

        const data: Category[] = await getShopSubCateService({ tenantId, topId });
        console.log('===fetchSubcats===:' + JSON.stringify(data))
        const resp: ActionRespType<Category[]> = {
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
