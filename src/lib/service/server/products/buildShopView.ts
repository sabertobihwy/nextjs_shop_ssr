import { toShopCardContent } from "@/types/entities/products"
import { GetProductsOutput } from "./productService"


// 不强绑卡片字段结构，直接用 toShopCardContent 的返回类型
export type ShopViewLite = {
    cardItems: ReturnType<typeof toShopCardContent>
    pagination: {
        currentStart: number
        currentEnd: number
        total: number
        showPrevious: boolean
        showNext: boolean
    }
    totalItems: number
}

export function buildShopView(data: GetProductsOutput, page: number, tenantName: string): ShopViewLite {
    return {
        cardItems: toShopCardContent(data.products ?? [], tenantName),
        pagination: {
            currentStart: page,
            currentEnd: data.totalPage ?? page,
            total: data.totalCount ?? 0,
            showPrevious: page > 1,
            showNext: page < (data.totalPage ?? page),
        },
        totalItems: data.totalCount ?? 0,
    }
}
