// services/shop/getShopSubCateService.ts

import { getSubcategoriesByTop } from "@/lib/dao/category";
import { Category } from "@/types/entities/products";

export type GetShopSubCateInput = {
    tenantId: string;
    topId: number;
};

export async function getShopSubCateService(
    input: GetShopSubCateInput
): Promise<Category[]> {
    const { tenantId, topId } = input;

    if (!tenantId) throw new Error("TENANT_ID_REQUIRED");
    if (!Number.isFinite(topId)) throw new Error("TOP_ID_INVALID");

    const subs: Category[] = await getSubcategoriesByTop({ tenantId, topId });
    // 这里可做 DTO 映射/排序
    return subs;
}
