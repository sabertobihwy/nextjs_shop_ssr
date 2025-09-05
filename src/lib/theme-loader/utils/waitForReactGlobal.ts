export type WaitOpts = {
    timeoutMs?: number
    signal?: AbortSignal
}

function hasReactGlobal() {
    return typeof window !== 'undefined'
        && (window as any).__REACT__
        && (window as any).__REACT_JSX__
}

function hasServicesGlobal() {
    return typeof window !== 'undefined'
        && (window as any).__SS_SERVICES_READY__ === true
}

// 单例承诺：多次并发等待只挂一次监听
let reactAndServicesReadyPromise: Promise<void> | null = null

export function waitForReactGlobal(opts: WaitOpts = {}): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve()
    if (hasReactGlobal() && hasServicesGlobal()) return Promise.resolve()
    if (!reactAndServicesReadyPromise) {
        reactAndServicesReadyPromise = new Promise<void>((resolve, reject) => {
            let rafId: number | null = null
            let timeoutId: number | null = null
            let reactOk = hasReactGlobal()
            let servicesOk = hasServicesGlobal()

            const bothOk = () => reactOk && servicesOk

            const cleanup = () => {
                window.removeEventListener('react-ready', onReactReady)
                window.removeEventListener('ss-services:ready', onServicesReady)
                if (rafId != null) cancelAnimationFrame(rafId)
                if (timeoutId != null) clearTimeout(timeoutId)
                opts.signal?.removeEventListener('abort', onAbort)
                reactAndServicesReadyPromise = null
            }

            const tryResolve = () => { if (bothOk()) { cleanup(); resolve() } }

            const onReactReady = () => { reactOk = hasReactGlobal(); tryResolve() }
            const onServicesReady = () => { servicesOk = hasServicesGlobal(); tryResolve() }
            const onAbort = () => { cleanup(); reject(new Error('[waitForReactGlobal] aborted (services)')) }

            // 1) 事件优先
            window.addEventListener('react-ready', onReactReady, { once: true })
            window.addEventListener('ss-services:ready', onServicesReady, { once: true })

            // 2) rAF 仅用于 React（services 事件足够）
            const tick = () => {
                if (!reactOk) { reactOk = hasReactGlobal() }
                if (!servicesOk) { servicesOk = hasServicesGlobal() } // 防止事件被错过
                if (bothOk()) {
                    tryResolve()
                } else {
                    rafId = requestAnimationFrame(tick)
                }

            }
            rafId = requestAnimationFrame(tick)

            // 3) 超时
            if (opts.timeoutMs && opts.timeoutMs > 0) {
                timeoutId = window.setTimeout(() => { cleanup(); reject(new Error('[waitForReactGlobal] timeout (services)')) }, opts.timeoutMs)
            }

            // 4) Abort
            opts.signal?.addEventListener('abort', onAbort, { once: true })
        })
    }
    return reactAndServicesReadyPromise
}
