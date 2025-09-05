import { waitForReactGlobal, WaitOpts } from "./waitForReactGlobal";
type LoadOpts = WaitOpts & {
    exportName?: string  // 默认 'default'
}

type AnyModule = Record<string, unknown>;

declare global {
    interface Window {
        __REMOTE_IMPORT_CACHE__?: Map<string, Promise<AnyModule>>;
    }
}

const cache = (window.__REMOTE_IMPORT_CACHE__ ??= new Map());

function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
}

function shouldRetry(err: unknown) {
    const msg = String((err as any)?.message || err);
    // 这些错误通常“不可重试”
    if (/export .* not found/i.test(msg)) return false;
    if (/SyntaxError|Unexpected token/.test(msg)) return false;
    if (/version mismatch|react family/i.test(msg)) return false;
    // 其他网络/瞬时错误可以试试
    return true;
}

async function withRetry<T>(fn: () => Promise<T>, tries = 3) {
    let lastErr: any;
    for (let i = 0; i < tries; i++) {
        try {
            return await fn();
        } catch (e) {
            lastErr = e;
            if (!shouldRetry(e) || i === tries - 1) break;
            const backoff = Math.min(1000 * 2 ** i + Math.random() * 300, 10_000);
            await sleep(backoff);
        }
    }
    throw lastErr;
}

/** 统一的导入入口：同一个 url 全局只导一次（Promise 去重） */
export function getRemoteModule(url: string): Promise<AnyModule> {
    if (!cache.has(url)) {
        const p = withRetry(async () => {
            return await importShim(url);
        });
        cache.set(url, p);
    }
    return cache.get(url)!;
}

export async function loadRemoteComponent(url: string, opts: LoadOpts = {}) {
    await waitForReactGlobal({ timeoutMs: opts.timeoutMs ?? 10000, signal: opts.signal });           // ✅ 确保 ReactBridge 已经把全局塞好了

    // 直接用原生 dynamic import；避免 new Function 触发 CSP: unsafe-eval
    // => 演变成使用importShim， 来完成importmap-shim在后退时的正常解析
    const Comp: AnyModule = await getRemoteModule(
        /* webpackIgnore: true */
        /* @vite-ignore */
        url);
    const exportName = (opts.exportName ?? 'default') as string
    const picked = Comp?.[exportName]

    if (picked == null) {
        const exported = Object.keys(Comp ?? {})
        throw new Error(
            `[loadRemoteComponent] Export "${exportName}" not found from ${url}. ` +
            `Available exports: ${exported.length ? exported.join(', ') : '(none)'}`
        )
    }
    return picked;
}
