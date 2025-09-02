"use client";
import { useRemoteComponent } from "@/hooks/useRemoteComponent";
import { ShopSkeleton } from "@/components/skeleton/productDisplay/ShopSkeleton";
import { ShopCardContent, ShopSidebarContentProps } from "@/types/entities/products";
import { SortValue } from "@/types/entities/Sort";

type Props = {
    url: string,
    validateProps: unknown,
    dbProps: {
        cardItems: ShopCardContent[],
        sidebar: ShopSidebarContentProps,
        pagination: {
            currentStart: number,
            currentEnd: number,
            total: number,
            showPrevious: boolean,
            showNext: boolean,
        },
        totalItems: number
    },
    state: {
        isFetchingProducts: boolean,
        isLoadingSubcategories: boolean,
        showSubcategoriesPanel: boolean
    },
    action: {
        categorySelect: (catId: number | null) => void,
        subToggle: (subId: number, checked: boolean) => void,
        sortChange: (sortTag: SortValue) => void,
        pageChange: (nextPage: number) => void
    }
}

export default function ShopRemoteContainer(
    { url, validateProps, dbProps, state, action }: Props) {
    const { Comp, loading, error } = useRemoteComponent({
        url,
        validateProps,
    });

    if (error) {
        console.log(error);
        return <div>加载失败</div>;
    }
    if (loading || !Comp) return <ShopSkeleton />;

    return (
        <Comp
            dbProps={dbProps}
            validateProps={validateProps}
            state={state}
            action={action}
        />
    );
}
