import type { ProductDTO } from '@/types/entities/products'
import { prisma } from '@/db/prisma'
import { BizError } from '@/types/shared/BizError'
import { ErrorCode } from '@/types/shared/error-code'
import { UUIDString } from '@/types/brand'

export async function getAllProducts(tenantId: string & UUIDString): Promise<ProductDTO[]> {

    const products = await prisma.products.findMany({
        where: { tenant_id: tenantId },
        include: {
            variants: true,
        },
    })

    if (!products || products.length === 0) {
        throw new BizError(ErrorCode.PRODUCT_NOT_FOUND, 404)
    }
    // console.log(JSON.stringify(products))
    return products as unknown as ProductDTO[]
}

export async function getProductById(tenantId: string & UUIDString, id: number): Promise<ProductDTO> {

    const product = await prisma.products.findFirst({
        where: {
            id,
            tenant_id: tenantId,
        },
        include: {
            variants: true,
        },
    })

    if (!product) {
        throw new BizError(ErrorCode.PRODUCT_NOT_FOUND, 404)
    }
    return product as unknown as ProductDTO
}
