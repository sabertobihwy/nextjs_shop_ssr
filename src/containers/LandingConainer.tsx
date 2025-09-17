// ProLandingRemoteContainer.tsx
import React from 'react';
import { useRemoteComponent } from '@/hooks/useRemoteComponent'; // 按你的路径改
import { ShopDetailSkeleton } from '@/components/skeleton/productDetail/ShopDetailSkeleton';
// import { ProLandingSkeleton } from './ProLandingSkeleton'; // 可选：你自己的骨架屏

type Props<D = unknown> = {
    url: string;            // 远程模块 URL
    data: D;                // 任意数据，作为根 props 展开给远程组件
};

export default function LandingRemoteContainer<D = unknown>({
    url,
    data,
}: Props<D>) {
    // 如果你的 hook 支持传 props 类型参数，就给个泛型；否则 <any> 也行
    const { Comp, loading, error } = useRemoteComponent<any>({
        url,
    });

    if (error) {
        console.error('[LandingRemoteContainer] load error:', error);
        return <div>加载失败</div>;
    }
    if (loading || !Comp) {
        return <ShopDetailSkeleton />;
    }

    return <Comp {...(data as any)} />
};
