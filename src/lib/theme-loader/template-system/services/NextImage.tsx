import { GenericImageProps, ImageApi } from "@ss/services";
import NextImage from "next/image";

const NextImageAdapter = (p: GenericImageProps) => (
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

const NextImageImplApi: ImageApi = {
    Image: NextImageAdapter,
    preload: (src: string) => {
        if (!src || typeof window === 'undefined' || typeof document === 'undefined') return;

        // 去重：避免重复插入
        const KEY = `__ss_preloaded_img__`;
        (window as any)[KEY] ||= new Set<string>();
        const set: Set<string> = (window as any)[KEY];
        if (set.has(src)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        // 可选：link.fetchPriority = 'high' as any;
        document.head.appendChild(link);
        set.add(src);
    },
    isDataUrl: (src: string) => /^data:/i.test(src),
};

export { NextImageAdapter, NextImageImplApi }