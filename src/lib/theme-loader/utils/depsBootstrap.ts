'use client'
// depsBootstrap.ts (client)
import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
import AOS from 'aos'

declare global {
    interface Window {
        __ALPINE_STARTED__?: boolean
        __AOS_STARTED__?: boolean
    }
}

export function ensureAlpineStarted(opts?: { focus?: boolean }) {
    if (window.__ALPINE_STARTED__) return
    if (opts?.focus) Alpine.plugin(focus)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Alpine = Alpine
    Alpine.start()
    window.__ALPINE_STARTED__ = true
}

export async function ensureAOSStarted(opts?: Parameters<typeof AOS.init>[0]) {
    if (window.__AOS_STARTED__) return
    // css会在buildHeadTags最开始引入
    AOS.init(opts ?? {})
    window.__AOS_STARTED__ = true
}
