'use client'
import * as React from 'react'
import * as JSX from 'react/jsx-runtime'
import * as ReactRedux from 'react-redux';
import { useEffect } from "react"
//import { getVersion, provided, register } from '@ss/services';
import { NextLinkImplApi } from '@/lib/theme-loader/template-system/services/NextLink'
import { NextImageImplApi } from '@/lib/theme-loader/template-system/services/NextImage'
import { templateDeps } from './templateDependencies';
import { ensureAlpineStarted, ensureAOSStarted } from './depsBootstrap';

// 幂等工具：避免 StrictMode 双执行
function ensureOnce(key: string, fn: () => void) {
    // 用 window 标记最直白
    const w = window as any
    if (w[key]) return
    w[key] = true
    fn()
}

export function RuntimeBootstrap({ themeName }: { themeName: string }) {
    // 1) React 桥（一次）
    useEffect(() => {
        ensureOnce('__REACT_READY__', () => {
            ; (window as any).__REACT__ = React
                ; (window as any).__REACT_JSX__ = JSX
                ; (window as any).__REACT_REDUX__ = ReactRedux
            window.dispatchEvent(new Event('react-ready'))
        })
    }, [])

    // 2) Services 注入（一次）
    useEffect(() => {
        ensureOnce('__SS_SERVICES_READY__', () => {
            // // 1) 注册（幂等、允许 HMR 覆盖）
            // register({ link: NextLinkImplApi, image: NextImageImplApi })
            // const detail = { provided: provided(), version: getVersion(), ts: Date.now() }
            // // 2) 标记 & 广播
            // window.dispatchEvent(new CustomEvent('ss-services:ready', { detail }))
            // console.log('[services] ready', detail)

            let aborted = false
                ; (async () => {
                    const mod = await import(/* webpackIgnore: true */ '/externals/services.mjs' as any)
                    // 兼容 default / 具名导出两种写法
                    const api = (mod as any).default ?? mod
                    const { getVersion, provided, register } = api

                    // 1) 注册（幂等、允许 HMR 覆盖）
                    register({ link: NextLinkImplApi, image: NextImageImplApi })

                    const detail = { provided: provided(), version: getVersion(), ts: Date.now() }
                    if (!aborted) {
                        // 2) 标记 & 广播
                        window.dispatchEvent(new CustomEvent('ss-services:ready', { detail }))
                        console.log('[services] ready', detail)
                    }
                })()
            return () => {
                aborted = true
            }
        })
    }, [])

    // 3) 主题依赖（按 themeName 变化，函数本身幂等）
    useEffect(() => {
        const deps = templateDeps[themeName]
        if (!deps) return

        if (deps.alpine) {
            ensureAlpineStarted(deps.alpine === true ? undefined : deps.alpine)
        }
        if (deps.aos) {
            ensureAOSStarted(deps.aos === true ? undefined : deps.aos)
        }
    }, [themeName])

    return null
}