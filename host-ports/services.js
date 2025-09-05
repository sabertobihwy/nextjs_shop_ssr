// services.v1.mjs —— 纯 ESM，浏览器可直接 import
const REG_KEY = '__SS_SERVICES_SINGLETON__';

// HMR/多次加载下保持单例
const REG = (globalThis[REG_KEY] ||= {
    version: 'services@1 link@1 image@1',
    link: null,
    image: null,
});

/** 覆盖式注册；可被多次调用（HMR 友好） */
export function register(services) {
    if (services?.link) REG.link = services.link;
    if (services?.image) REG.image = services.image;
    return get(); // 方便链式调试
}

/** 取全部服务；未就绪时抛清晰错误 */
export function get() {
    if (!REG.link || !REG.image) {
        const missing = [
            REG.link ? null : 'link',
            REG.image ? null : 'image',
        ].filter(Boolean).join(',');
        throw new Error(`[services] not ready: ${missing}. Call register({ link, image }) first.`);
    }
    return REG;
}

/** 便捷 API */
export const getLink = () => get().link;
export const getImage = () => get().image;
export const provided = () => ({ link: !!REG.link, image: !!REG.image });
export const getVersion = () => REG.version;

// 为了排查“唯一真身”，暴露当前模块 URL
export const moduleUrl = import.meta.url;
