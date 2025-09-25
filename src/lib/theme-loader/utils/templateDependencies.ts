import { AosOptions } from "aos"
type Deps = {
    alpine?: { focus?: boolean } | true
    aos?: Partial<AosOptions> | true
}

type FontPreset = {
    id: string;                 // 用于去重，例如 'font-inter'
    cssHref: string;            // Google Fonts CSS 或自托管 CSS
    preconnect?: readonly string[];      // 需要 preconnect 的域
    preloadFonts?: { href: string; type?: string }[]; // 可选：直预加载 woff2
};

const preconnectCSSArr = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'] as const;

export const cssFontMap: Record<string, FontPreset> = {
    pro: {
        id: 'font-inter',
        cssHref:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        preconnect: preconnectCSSArr,
        // 如果想更猛：把首屏用到的权重 woff2 贴进来（从 cssHref 打开后复制）
        // preloadFonts: [
        //   { href: 'https://fonts.gstatic.com/s/inter/vXX/...-600.woff2', type: 'font/woff2' },
        // ],
    },

    general: {
        id: 'font-inter',
        cssHref:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
        preconnect: preconnectCSSArr
    },
    cool: {
        id: 'font-inter',
        cssHref:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
        preconnect: preconnectCSSArr
    },

};

/**
 *  set runtime-dependency(like aos) for each template 
 */
export const templateDeps: Record<string, Deps> = {
    pro: {
        alpine: { focus: true },
        aos: { once: true, disable: 'phone', duration: 600, easing: 'ease-out-sine' },
    },
    general: {
        aos: { once: true, disable: 'phone', duration: 600, easing: 'ease-out-sine' },
    },
}

