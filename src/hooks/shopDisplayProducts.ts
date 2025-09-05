

// hooks/products.ts
import { assertApiSuccess } from "@/lib/http/assert";
import { ShopViewLite } from "@/lib/service/server/products/buildShopView";
import { Category } from "@/types/entities/products";
import { SortValue } from "@/types/entities/Sort";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// 统一的 queryKey 生成器（避免手写散乱的 key）
const qk = {
    view: (tid: string, cat: number | null, subs: number[], page: number, sort: SortValue) =>
        ['shopView', tid, cat, subs.slice().sort().join(','), page, sort] as const,
    subcats: (tenantId: string, catId: number | null) =>
        ["subcategories", tenantId, catId] as const,
};

// —— API fetchers
async function fetchShopView(
    tenant: { tenantId: string; tenantName: string },
    catId: number | null, subIds: number[], page: number, sortTag: SortValue
) {
    const p = new URLSearchParams({
        tenantId: tenant.tenantId,
        page: String(page),
        ...(catId !== null ? { categoryId: String(catId) } : {}),
        ...(subIds.length ? { subIds: subIds.join(",") } : {}),
        sortTag,
        tenantName: tenant.tenantName

    });
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenant.tenantName}/shop/products/view?${p.toString()}`);
    const data = await assertApiSuccess<ShopViewLite>(r)
    return data!;
}

async function fetchSubcats(
    tenant: {
        tenantId: string,
        tenantName: string
    }, catId: number) {
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenant.tenantName}/shop/products/subcategories?tenantId=${tenant.tenantId}&topId=${catId}`);
    const data = await assertApiSuccess<Category[]>(r)
    return data;
}

// —— 查询 hooks
export function useShopViewQuery(opts: {
    tenant: { tenantId: string; tenantName: string }
    catId: number | null
    subIds: number[]
    page: number
    sortTag: SortValue
    initialView?: ShopViewLite
    staleTime?: number
}) {
    const { tenant, catId, subIds, page, sortTag, initialView, staleTime = 60_000 } = opts
    const isSSR = catId === null && page === 1 && sortTag === SortValue.Default && subIds.length === 0

    return useQuery({
        queryKey: qk.view(tenant.tenantId, catId, subIds, page, sortTag),
        queryFn: () => fetchShopView(tenant, catId, subIds, page, sortTag),
        initialData: isSSR ? initialView : undefined,
        placeholderData: keepPreviousData,
        staleTime,
    })
}

export function useSubcatsQuery(
    tenant: {
        tenantId: string,
        tenantName: string
    }, catId: number | null) {
    return useQuery({
        queryKey: qk.subcats(tenant.tenantId, catId),
        queryFn: () => fetchSubcats(tenant, catId as number),
        enabled: catId !== null,             // 只有选了大类才查
        staleTime: 60_000,
    });
}
