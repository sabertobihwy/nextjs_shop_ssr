export type GenericImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    sizes?: string;          // 用于响应式
    fill?: boolean;          // 想走 fill 模式时
    priority?: boolean;
    placeholder?: "blur" | "empty";
    blurDataURL?: string;
};

export type ImageComponent = React.ComponentType<GenericImageProps>;
