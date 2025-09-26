import type { ReactNode, ReactElement } from "react";

export type HeaderLinkItem = {
    href: string,
    name: string,
    tenantName: string,
    icon?: ReactNode,
    className?: string,
    render?: ReactElement<{ href: string; name: string }>; // 若存在，则跳过默认渲染
};
