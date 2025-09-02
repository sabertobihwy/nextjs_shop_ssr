"use client";

import { useRemoteComponent } from "@/hooks/useRemoteComponent";
import { ShopDetailSkeleton } from "@/components/skeleton/productDetail/ShopDetailSkeleton";

// 远程组件预期的 props（与你给的 CoolShopDetailWrapper 一致）
export type DetailDbProps = {
    detail: {
        id: number;
        tenantId: string;
        name: string;
        desc: string;
        overviewMD: string;
        imgList: { url: string; type: string; price: number; variantId: number }[];
        typeIndexMap: Record<string, number>;
    };
    linkHref: string;
};

type Props = {
    url: string;                 // 远程 bundle 地址
    dbProps: DetailDbProps;      // 远程组件需要的数据
};

export default function ShopDetailRemoteContainer({ url, dbProps }: Props) {
    const { Comp, loading, error } = useRemoteComponent({
        url
    });

    if (error) {
        console.error(error);
        return <div>加载失败</div>;
    }
    if (loading || !Comp) return <ShopDetailSkeleton />;

    // CoolShopDetailWrapper 只接受 { dbProps }
    return (<Comp dbProps={dbProps} />)
}
