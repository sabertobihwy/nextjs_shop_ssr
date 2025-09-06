'use client';

import type { GenericImageProps, ImageApi } from '@ss/services';
import NextImage from 'next/image';

const NextImageAdapter = (p: GenericImageProps) => {
    // 宿主不传像素尺寸：默认用 fill；也允许外部手动传 fill=false
    const fill = p.fill ?? true;
    const sizes = p.sizes ?? '100vw';

    // 去黑边三件套：继承圆角 + GPU 合成 + 轻微放大
    const imgClass = [
        'object-cover rounded-[inherit] [transform:translateZ(0)_scale(1.005)]',
        p.className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <NextImage
            src={p.src} // 远程组件会赋值src+alt
            alt={p.alt}
            className={imgClass}
            fill={fill}
            sizes={sizes}
            // width / height 不参与：按你的约定不传
            priority={p.priority}
            placeholder={p.placeholder}
            blurDataURL={p.blurDataURL}
        />
    );
};

const NextImageImplApi: ImageApi = {
    Image: NextImageAdapter,
    preload: (src: string) => {
        if (!src || typeof window === 'undefined' || typeof document === 'undefined') return;

        const KEY = '__ss_preloaded_img__';
        (window as any)[KEY] ||= new Set<string>();
        const set: Set<string> = (window as any)[KEY];
        if (set.has(src)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        // 可选： (link as any).fetchPriority = 'high';
        document.head.appendChild(link);
        set.add(src);
    },
    isDataUrl: (src: string) => /^data:/i.test(src),
};

export { NextImageAdapter, NextImageImplApi };
