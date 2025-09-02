

// hooks/products.ts
import { assertApiSuccess } from "@/lib/http/assert";
import { GetProductsOutput } from "@/lib/service/server/products/productService";
import { Category } from "@/types/entities/products";
import { SortValue } from "@/types/entities/Sort";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// 统一的 queryKey 生成器（避免手写散乱的 key）
const qk = {
    products: (tenantId: string, catId: number | null, subIds: number[], page: number, sortTag: SortValue) =>
        ["products", tenantId, catId, subIds.slice().sort().join(","), page, sortTag] as const,
    subcats: (tenantId: string, catId: number | null) =>
        ["subcategories", tenantId, catId] as const,
};

// —— API fetchers
async function fetchProducts(tenant: {
    tenantId: string,
    tenantName: string
}, catId: number | null, subIds: number[], page: number, sortTag: SortValue) {
    const p = new URLSearchParams({
        tenantId: tenant.tenantId,
        page: String(page),
        ...(catId !== null ? { categoryId: String(catId) } : {}),
        ...(subIds.length ? { subIds: subIds.join(",") } : {}),
        sortTag
    });
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenant.tenantName}/shop/products?${p.toString()}`);
    const data = await assertApiSuccess<GetProductsOutput>(r)
    return data;
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
export function useProductsQuery(opts: {
    tenant: {
        tenantId: string,
        tenantName: string
    };
    catId: number | null;
    subIds: number[];
    page: number;
    sortTag: SortValue;
    // 用于 SSR 首屏注水（可选）
    initialProducts?: GetProductsOutput;
    staleTime?: number;
}) {

    const { tenant, catId, subIds, page, sortTag, initialProducts, staleTime = 60_000 } = opts;
    const isSSRKey =
        catId === null &&
        page === 1 &&
        sortTag === SortValue.Default &&
        subIds.length === 0;

    return useQuery({
        queryKey: qk.products(tenant.tenantId, catId, subIds, page, sortTag),
        queryFn: () => fetchProducts(tenant, catId, subIds, page, sortTag),
        // 首屏 SSR 注水
        initialData: isSSRKey ? initialProducts : undefined,
        // 避免翻页/切换时闪一下空白
        placeholderData: keepPreviousData,
        staleTime: staleTime,
    });
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
