// ShopPageClient.tsx —— 父容器：状态 + 触发条件，数据交给 React Query
"use client";
import { useShopViewQuery, useSubcatsQuery } from "@/hooks/shopDisplayProducts";
import * as React from "react";
import ShopRemoteContainer from "../../../containers/ShopRemoteContainer";
import { useTheme } from "@/redux/hooks/useTheme";
import { generateCdn_theme_url } from "@/constants/theme";
import { buildSidebarContent, Category } from "@/types/entities/products";
import { SortValue } from "@/types/entities/Sort";
import { ShopViewLite } from "@/lib/service/server/products/buildShopView";

type Props = {
    tenant: { tenantId: string; tenantName: string }
    sectionProps: unknown
    themeName: string
    initialView: ShopViewLite
    categoriesMeta: Category[]
}

export default function ShopController({ tenant, sectionProps, themeName, initialView, categoriesMeta }: Props) {
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
        data: viewQ,
        isFetching: isFetchingProducts // isPlaceholderData 用来干嘛的？
    } = useShopViewQuery({
        tenant, catId: selectedCatId, subIds: selectedSubIds, page, sortTag,
        initialView, // 仅在 SSR 场景注水
    })
    // 轻量拼 sidebar（用 memo 防抖）
    const sidebar = React.useMemo(
        () => buildSidebarContent(
            categoriesMeta,
            selectedCatId,
            selectedSubIds,
            subcats ?? []
        ),
        // 子类列表变更、选择变更才重算
        [categoriesMeta, selectedCatId, selectedSubIds, subcats]
    )

    // 交互：点“大类”
    const onCategorySelect = React.useCallback((catId: number | null) => {
        setSelectedCatId(catId); setSelectedSubIds([]); setPage(1)
    }, [])

    // 交互：勾选子类
    const onSubToggle = React.useCallback((id: number, checked: boolean) => {
        setSelectedSubIds(prev => checked ? [...prev, id] : prev.filter(x => x !== id)); setPage(1)
    }, [])

    // 3) 排序交互：切换排序并回到第一页
    const onSortChange = React.useCallback((next: SortValue) => {
        if (next !== sortTag) { setSortTag(next); setPage(1) }
    }, [sortTag])

    // 4) 翻页交互：只改页码（可选加边界判断）
    const onPageChange = React.useCallback((next: number) => {
        if (Number.isInteger(next) && next > 0 && next !== page) setPage(next)
    }, [page])

    const { themeCdnMap } = useTheme()
    const url = generateCdn_theme_url(themeCdnMap[`${themeName}-shop-main`])

    const params = {
        url,
        validateProps: sectionProps,
        dbProps: {
            cardItems: viewQ!.cardItems,
            sidebar,
            pagination: viewQ!.pagination,
            totalItems: viewQ!.totalItems
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

