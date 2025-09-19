// 只配置“需要控制”的：谁优先 & 显示名
const NAV_CONFIG = {
    order: ['landing', 'shop', 'about'] as const, // 越靠前优先级越高
    labels: {
        landing: 'Home',
        about: 'About Us',
        shop: 'Shop'
    } as Partial<Record<string, string>>,
};

const humanize = (k: string) =>
    k.replace(/[_-]+/g, ' ').replace(/\b\w/g, m => m.toUpperCase());

export type NavItem = { key: string; href: string; label: string };

/** 入参：['landing','about', ...] ；输出按优先顺序 + 原顺序合并 */
export function buildNavigationFromList(sceneList: string[]): NavItem[] {
    const seen = new Set<string>();     // 去重
    const has = new Set(sceneList);    // O(1) 存在性判断
    const nav: NavItem[] = [];

    const push = (key: string) => {
        if (!has.has(key) || seen.has(key)) return;
        nav.push({
            key,
            href: key === 'landing' ? '/' : `/${key}`,
            label: NAV_CONFIG.labels[key] ?? humanize(key),
        });
        seen.add(key);
    };

    // 1) 先放白名单（若存在于 sceneList）
    for (const key of NAV_CONFIG.order) push(key);

    // 2) 再按原始顺序补齐剩余（不排序，线性）
    for (const key of sceneList) push(key);

    return nav;
}
