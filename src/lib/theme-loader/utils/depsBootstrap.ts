'use client'
// depsBootstrap.ts (client)
declare global {
    interface Window {
        __ALPINE_STARTED__?: boolean
        __AOS_STARTED__?: boolean
    }
}

// 用 Promise 变量做“只加载一次”的缓存
let alpineP: Promise<any> | null = null
let aosP: Promise<any> | null = null

export async function ensureAlpineStarted(opts?: { focus?: boolean }) {
    if (window.__ALPINE_STARTED__) return
    const Alpine = (await (alpineP ??= import('alpinejs'))).default
    if (opts?.focus) {
        const focusMod = await import('@alpinejs/focus')
        Alpine.plugin(focusMod.default)
    }
    ; (window as any).Alpine = Alpine
    Alpine.start()
    window.__ALPINE_STARTED__ = true
}

export async function ensureAOSStarted(opts?: Parameters<typeof import('aos')['init']>[0]) {
    if (window.__AOS_STARTED__) return
    const AOS = (await (aosP ??= import('aos'))).default
    // css会在buildHeadTags最开始引入
    AOS.init(opts ?? {})
    window.__AOS_STARTED__ = true
}
