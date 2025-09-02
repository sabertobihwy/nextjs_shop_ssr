import { Shop_PageSize } from "@/constants/shop"
import { getAllCategoriesForTenant } from "@/lib/dao/category"
import { getAllProductsByParams, getProductById } from "@/lib/dao/products"
import { UUIDString } from "@/types/brand"
import { ProductBaseDTO, ProductWithVariantsDTO, toProductBaseDTO, toProductWithVariantsDTO } from "@/types/entities/products"
import { SortValue } from "@/types/entities/Sort"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"

export interface GetProductsInput {
    tenantId: string & UUIDString
    page?: number
    pageSize?: number
    categoryId?: number
    subIds?: number[]
    sortTag?: SortValue
    includeMeta?: boolean; // ✨ 新增，SSR 置 true
}

export interface GetProductsOutput {
    products: ProductBaseDTO[],
    totalCount: number,
    totalPage: number,
    // ✨ 只有 includeMeta=true 才返回
    meta?: {
        categories: { id: number; name: string }[];
        // priceBuckets: PriceBucket[]
    };
}

export async function getProductsService(input: GetProductsInput): Promise<GetProductsOutput> {
    const {
        tenantId,
        page = 1,
        pageSize = Shop_PageSize,
        categoryId,
        subIds,
        sortTag = SortValue.Latest,
        includeMeta
    } = input

    // ✅ 参数校验
    if (!tenantId) {
        throw new BizError(ErrorCode.TENANT_NOT_FOUND, 404)
    }

    if (!Number.isInteger(page) || page < 1) {
        throw new BizError(ErrorCode.INVALID_PARAMETERS, 400)
    }

    if (categoryId !== undefined && isNaN(Number(categoryId))) {
        throw new BizError(ErrorCode.INVALID_PARAMETERS, 400)
    }

    // ✅ 调用 DAO
    const { products, totalCount, totalPage } = await getAllProductsByParams({
        tenantId,
        page,
        pageSize,
        categoryId,
        sortTag,
        subIds
    })

    const dtoProducts = products.map(toProductBaseDTO)

    // 默认只返回产品列表：适合 CSR 翻页/切分类
    const out: GetProductsOutput = { products: dtoProducts, totalCount, totalPage };

    if (includeMeta) {
        // ① 分类名列表（SSR 侧边栏用；不受当前 categoryId 过滤，给出全量）
        const categories = await getAllCategoriesForTenant(tenantId);

        // ② 价格四档（基于“当前筛选条件下的所有商品”或全量，按你的需求定）
        // const priceBuckets = buildPriceBuckets(dtoProducts);

        out.meta = { categories };
    }

    return out;
}

export async function getProductsDetailService(tenantId: string & UUIDString, id: number): Promise<ProductWithVariantsDTO> {
    const product = await getProductById(tenantId, id)
    if (!product) {
        throw new BizError(ErrorCode.PRODUCT_NOT_FOUND, 404)
    }
    return toProductWithVariantsDTO(product)
}