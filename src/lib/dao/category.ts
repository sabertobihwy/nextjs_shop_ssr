
import { prisma } from '@/db/prisma'

export async function getAllCategoriesForTenant(tenantId: string) {
    return prisma.categories.findMany({
        where: {
            tenant_id: tenantId,
            parent_id: null
        },
        orderBy: {
            name: "asc", // 按字母排序，或者你可以加 sort_order 字段
        },
        select: {
            id: true,
            name: true,
        },
    });
}

export async function getSubcategoriesByTop(params: {
    tenantId: string;
    topId: number;
}) {
    const { tenantId, topId } = params;

    // categories 表结构：id | name | tenant_id | parent_id
    return prisma.categories.findMany({
        where: {
            tenant_id: tenantId,
            parent_id: topId,
        },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
    });
}