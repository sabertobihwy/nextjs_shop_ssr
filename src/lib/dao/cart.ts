import { CartProduct } from "@/types/entities/cart";
import { prisma } from '@/db/prisma'

export async function fetchCartProducts(userId: string, tenantId: string): Promise<CartProduct[]> {
    const carts = await prisma.carts.findMany({
        where: {
            user_id: userId,
            tenant_id: tenantId,
        },
        include: {
            variants: {
                include: {
                    products: true,
                },
            },
        },
    });

    return carts
        .filter(c => c.variants && c.variants.products)
        .map(c => ({
            id: c.variants!.products!.id,
            name: c.variants!.products!.name,
            price: c.variants!.price.toNumber(),
            image: c.variants!.image_url,
            variant: c.variants!.type,
            quantity: c.quantity,
            totalPrice: c.quantity * c.variants!.price.toNumber(),
            variantId: c.variant_id!
        }));
}

export async function upsertCartItems(
    userId: string,
    tenantId: string,
    items: {
        variant_id: number;
        quantity: number;
    }[]
) {
    const data = items.map((item) => ({
        user_id: userId,
        tenant_id: tenantId,
        variant_id: item.variant_id, // 你可能需要加上这个字段到类型里
        quantity: item.quantity,
    }))
    console.log(`==== upsertCartItems: ${JSON.stringify(data)}`)

    // 先 delete 再 createMany 是个策略（避免复杂的 upsert 冲突）
    await prisma.carts.deleteMany({
        where: { user_id: userId, tenant_id: tenantId },
    })

    await prisma.carts.createMany({ data })
}