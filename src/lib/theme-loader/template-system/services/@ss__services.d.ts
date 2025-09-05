// types/@ss__services.d.ts
declare module '@ss/services' {
    import * as React from 'react';
    export type GenericLinkProps = {
        href: string;
        children?: React.ReactNode;
        className?: string;
        target?: string;
        rel?: string;
        ariaLabel?: string;
        overlay?: boolean;
        onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    };

    export type LinkApi = {
        Link: React.ComponentType<GenericLinkProps>;
    };

    export type GenericImageProps = {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        className?: string;
        sizes?: string;
        fill?: boolean;
        priority?: boolean;
        placeholder?: 'blur' | 'empty';
        blurDataURL?: string;
    };

    export type ImageApi = {
        Image: React.ComponentType<GenericImageProps>;
        preload?: (src: string) => Promise<void> | void;
        isDataUrl?: (src: string) => boolean;
    };

    export type Services = { link?: LinkApi; image?: ImageApi };

    export function register(s: Services): Services;
    export function get(): { link: LinkApi; image: ImageApi };
    export const getLink: () => LinkApi;
    export const getImage: () => ImageApi;
    export const provided: () => { link: boolean; image: boolean };
    export const getVersion: () => string;
    export const moduleUrl: string;
}
