import { prisma } from '@/db/prisma'
import { UUIDString } from '@/types/brand'
import { SortValue } from '@/types/entities/Sort'

interface GetAllProductsParams {
    tenantId: string & UUIDString
    page: number
    pageSize: number
    categoryId?: number
    subIds?: number[]
    sortTag: SortValue
}

export async function getProductById(tenantId: string & UUIDString, id: number) {

    const product = await prisma.products.findFirst({
        where: {
            id,
            tenant_id: tenantId,
        },
        include: {
            variants: true,
        },
    })


    return product
}

export async function getAllProductsByParams({
    tenantId,
    page,
    pageSize,
    categoryId,
    sortTag,
    subIds = [],
}: GetAllProductsParams) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where = {
        tenant_id: tenantId,
        ...(categoryId ? { category_id: Number(categoryId) } : {}),
        ...(subIds.length
            ? {
                // 命中任意一个 subId 即可（OR 语义）
                product_categories: {
                    some: {
                        category_id: { in: subIds },
                        // 可选强化：同租户约束（利用索引）
                        tenant_id: tenantId,
                    },
                },
            }
            : {}),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = {}

    switch (sortTag) {
        case SortValue.PriceAsc:
            orderBy = { min_price: 'asc' }
            break
        case SortValue.PriceDesc:
            orderBy = { min_price: 'desc' }
            break
        case SortValue.Latest:
        default:
            orderBy = { created_at: 'desc' }
            break
    }

    const products = await prisma.products.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            categories: { select: { name: true } }, // ← 等价于 LEFT JOIN 取 name
            product_categories: { select: { category_id: true } }, // 命中的子类（可选）
        },
    });

    const totalCount = await prisma.products.count({ where })
    const totalPage = Math.ceil(totalCount / pageSize)

    return { products, totalCount, totalPage }
}

