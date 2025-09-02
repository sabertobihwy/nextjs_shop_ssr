// ShopPageClient.tsx —— 父容器：状态 + 触发条件，数据交给 React Query
"use client";
import { useProductsQuery, useSubcatsQuery } from "@/hooks/shopDisplayProducts";
import { GetProductsOutput } from "@/lib/service/server/products/productService";
import * as React from "react";
import ShopRemoteContainer from "../../../containers/ShopRemoteContainer";
import { useTheme } from "@/redux/hooks/useTheme";
import { generateCdn_theme_url } from "@/constants/theme";
import { buildSidebarContent, toShopCardContent } from "@/types/entities/products";
import { SortValue } from "@/types/entities/Sort";

type Props = {
    tenant: {
        tenantId: string,
        tenantName: string
    }
    sectionProps: unknown
    productData: GetProductsOutput
    themeName: string
}

export default function ShopController({ tenant, sectionProps, productData, themeName }: Props) {
    // 本地状态只存“条件”，不再手动发请求
    const [selectedCatId, setSelectedCatId] = React.useState<number | null>(null);
    const [selectedSubIds, setSelectedSubIds] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(1);
    const [sortTag, setSortTag] = React.useState<SortValue>(SortValue.Default);
    const showSubcategoriesPanel = selectedCatId !== null;

    // 子类查询：仅在选了大类时启用
    const { data: subcats, isFetching: isLoadingSubcategories } = useSubcatsQuery(tenant, selectedCatId);

    // 商品查询：条件 -> queryKey，交给 React Query
    const {
        data: productOutput,
        isFetching: isFetchingProducts // isPlaceholderData 用来干嘛的？
    } = useProductsQuery({
        tenant,
        catId: selectedCatId,
        subIds: selectedSubIds,
        page,
        sortTag,
        initialProducts: productData,  // 首屏注水
    });

    // 交互：点“大类”
    function onCategorySelect(catId: number | null) {
        setSelectedCatId(catId);
        setSelectedSubIds([]);    // 清空子类选择
        setPage(1);
    }

    // 交互：勾选子类
    function onSubToggle(id: number, checked: boolean) {
        setSelectedSubIds(prev => {
            const next = checked ? [...prev, id] : prev.filter(x => x !== id);
            return next;
        });
        setPage(1);
    }

    // 3) 排序交互：切换排序并回到第一页
    function onSortChange(next: typeof sortTag) {
        if (next === sortTag) return;  // 同值不触发
        setSortTag(next);
        setPage(1);
    }

    // 4) 翻页交互：只改页码（可选加边界判断）
    function onPageChange(next: number) {
        if (!Number.isInteger(next) || next < 1) return;   // 简单防御
        if (next === page) return;                          // 同页不触发
        setPage(next);
    }

    const { themeCdnMap } = useTheme()
    const url = generateCdn_theme_url(themeCdnMap[`${themeName}-shop-main`])

    const params = {
        url,
        validateProps: sectionProps,
        dbProps: {
            cardItems: toShopCardContent(productOutput?.products ?? []),
            sidebar: buildSidebarContent(productData.meta?.categories, selectedCatId, selectedSubIds, subcats ?? []),
            pagination: {
                currentStart: page,
                currentEnd: productOutput?.totalPage ?? page,
                total: productOutput?.totalCount ?? 0,
                showPrevious: page > 1,
                showNext: page < (productOutput?.totalPage ?? page),
            },
            totalItems: productOutput?.totalCount ?? 0
        },
        state: {
            isFetchingProducts,
            isLoadingSubcategories,
            showSubcategoriesPanel,
            activeSortTag: sortTag
        },
        action: {
            categorySelect: onCategorySelect,
            subToggle: onSubToggle,
            sortChange: onSortChange,
            pageChange: onPageChange
        }
    }

    return (
        <ShopRemoteContainer {...params} />
    );
}

