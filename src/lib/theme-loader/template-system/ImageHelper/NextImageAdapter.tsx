// app/_providers/ImageAdapter.tsx (Next 项目里)
import NextImage from "next/image";
import { GenericImageProps } from "./ImageType";
import React from "react";

// 只负责渲染，不做任何计算
const BaseNextImageAdapter = (p: GenericImageProps) => (
    <NextImage
        src={p.src}
        alt={p.alt}
        className={p.className}
        width={p.fill ? undefined : p.width}
        height={p.fill ? undefined : p.height}
        fill={p.fill}
        sizes={p.sizes ?? (p.fill ? '100vw' : undefined)}
        priority={p.priority}
        placeholder={p.placeholder}
        blurDataURL={p.blurDataURL}
    />
)

// 自定义对比：只有这些关键 props 变化才重渲
function propsEqual(a: GenericImageProps, b: GenericImageProps) {
    return (
        a.src === b.src &&
        a.alt === b.alt &&
        a.width === b.width &&
        a.height === b.height &&
        a.className === b.className &&
        a.sizes === b.sizes &&
        a.fill === b.fill &&
        a.priority === b.priority &&
        a.placeholder === b.placeholder &&
        a.blurDataURL === b.blurDataURL
    )
}

export const NextImageAdapter = React.memo(BaseNextImageAdapter, propsEqual)
NextImageAdapter.displayName = 'NextImageAdapter'