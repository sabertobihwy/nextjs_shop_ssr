'use client'
import { useEffect, useState } from 'react'
import Ajv2020 from "ajv/dist/2020.js";
import { loadRemoteComponent } from '@/lib/theme-loader/utils/loadRemoteComponent'

const ajv = new Ajv2020()

type UseRemoteOpts<TValidated = any> = {
    url: string
    exportName?: string
    validateProps?: TValidated        // 只在远程提供 schema 时用于校验；可不传
    strict?: boolean                   // 有 schema 但未传 validatedProps 时，strict=true 在 dev 抛错
}

type UseRemoteResult = {
    Comp: React.ComponentType<any> | null
    loading: boolean
    error: unknown | null
    schema?: any
    validated?: boolean
    validationErrors?: any[]
}

export function useRemoteComponent<TValidated = any>(
    { url, exportName, validateProps, strict = false }: UseRemoteOpts<TValidated>
): UseRemoteResult {
    const [state, setState] = useState<UseRemoteResult>({
        Comp: null, loading: true, error: null
    })

    useEffect(() => {
        let cancelled = false

            ; (async () => {
                try {
                    const mod: any = await loadRemoteComponent(url, { exportName: exportName ?? 'default' })
                    let component: React.ComponentType<any>
                    let schema: any | undefined

                    if (mod && typeof mod === 'object' && 'component' in mod) {
                        component = mod.component
                        schema = mod.schema
                        console.log('=====schema:' + schema)
                    } else {
                        component = mod
                    }

                    let validated = true, errors: any[] | undefined
                    if (schema) {
                        if (validateProps == null) {
                            const msg = `[useRemoteComponent] schema present at ${url} but no validatedProps provided`
                            if ((process.env.NODE_ENV !== 'production' && strict)) throw new Error(msg)
                            console.warn(msg)
                        } else {
                            const validate = ajv.compile(schema)
                            validated = !!validate(validateProps)
                            if (!validated) {
                                errors = validate.errors ?? []
                                const text = `[useRemoteComponent] schema validation failed for ${url}: ${JSON.stringify(errors, null, 2)}`
                                console.error(text)
                                if (process.env.NODE_ENV !== 'production') throw new Error(text)
                            }
                        }
                    }

                    if (!cancelled) {
                        setState({ Comp: component, loading: false, error: null, schema, validated, validationErrors: errors })
                    }
                } catch (e) {
                    if (!cancelled) setState({ Comp: null, loading: false, error: e })
                }
            })()

        return () => { cancelled = true }
        // 依赖里避免大对象抖动，外层如需稳定可传入 memo 后的 validatedProps 或版本号
    }, [url, exportName, validateProps, strict])

    return state
}

// 'use client'
// import * as React from 'react'
// import Ajv2020 from 'ajv/dist/2020.js'
// import { useQuery } from '@tanstack/react-query'
// import { loadRemoteComponent } from '@/lib/theme-loader/utils/loadRemoteComponent'

// const ajv = new Ajv2020()

// type UseRemoteOpts<TValidated = any> = {
//     url: string
//     exportName?: string
//     validateProps?: TValidated       // 远程提供 schema 时用于校验；可不传
//     strict?: boolean                 // 有 schema 但未传 validatedProps 时，strict=true 在 dev 抛错
//     /** 可选：当 validateProps 是个大对象且频繁变更时，传一个稳定的 key 避免不必要的 refetch */
//     validationKey?: string | number
// }

// type UseRemoteResult = {
//     Comp: React.ComponentType<any> | null
//     loading: boolean
//     error: unknown | null
//     schema?: any
//     validated?: boolean
//     validationErrors?: any[]
// }

// // 帮你做一次“网络/分块”异常的一次性 cache-busting 重试
// function isTransientModuleError(e: any) {
//     const s = String(e?.message || e || '')
//     return /Failed to fetch|Network|Chunk|module script|import/i.test(s)
// }

// function importMapReady() {
//     const s = document.querySelector<HTMLScriptElement>('script[type="importmap"]')
//     if (!s) return false
//     console.log("s:" + !!JSON.parse(s.textContent || '{}')?.imports?.['react/jsx-runtime'])
//     try { return !!JSON.parse(s.textContent || '{}')?.imports?.['react/jsx-runtime'] } catch { return false }
// }

// /** 用 React Query 的缓存/重试/状态机重写；API 兼容原版 */
// export function useRemoteComponent<TValidated = any>(
//     { url, exportName, validateProps, strict = false }: UseRemoteOpts<TValidated>
// ): UseRemoteResult {
//     const key = ['remoteComponent', url, exportName ?? 'default', strict]
//     console.log(key)
//     const query = useQuery({
//         queryKey: key,
//         // 把原来 effect 里的逻辑搬进来
//         queryFn: async () => {
//             try {
//                 const mod: any = await loadRemoteComponent(url, { exportName: exportName ?? 'default' })

//                 let component: React.ComponentType<any>
//                 let schema: any | undefined

//                 if (mod && typeof mod === 'object' && 'component' in mod) {
//                     component = mod.component
//                     schema = mod.schema
//                     // console.log('=====schema:', schema)
//                 } else {
//                     component = mod
//                 }

//                 // schema 校验逻辑保持不变
//                 let validated = true, errors: any[] | undefined
//                 if (schema) {
//                     if (validateProps == null) {
//                         const msg = `[useRemoteComponent] schema present at ${url} but no validatedProps provided`
//                         if ((process.env.NODE_ENV !== 'production') && strict) {
//                             throw new Error(msg)
//                         }
//                         // 与原实现一致：开发期给出提醒
//                         if (process.env.NODE_ENV !== 'production') console.warn(msg)
//                     } else {
//                         const validate = ajv.compile(schema)
//                         validated = !!validate(validateProps)
//                         if (!validated) {
//                             errors = validate.errors ?? []
//                             const text = `[useRemoteComponent] schema validation failed for ${url}: ${JSON.stringify(errors, null, 2)}`
//                             if (process.env.NODE_ENV !== 'production') {
//                                 console.error(text)
//                                 throw new Error(text)
//                             }
//                         }
//                     }
//                 }
//                 return { component, schema, validated, errors }
//             } catch (e) {
//                 // 一次性 cache-busting 重试（对偶发 chunk/network 更友好）
//                 if (isTransientModuleError(e) && typeof url === 'string' && !url.includes('__bust=')) {
//                     const retryUrl = url + (url.includes('?') ? '&' : '?') + `__bust=${Date.now()}`
//                     const mod: any = await loadRemoteComponent(retryUrl, { exportName: exportName ?? 'default' })
//                     let component: React.ComponentType<any>
//                     let schema: any | undefined
//                     if (mod && typeof mod === 'object' && 'component' in mod) {
//                         component = mod.component
//                         schema = mod.schema
//                     } else {
//                         component = mod
//                     }
//                     return { component, schema, validated: true, errors: undefined }
//                 }
//                 throw e
//             }
//         },
//         // —— 策略：把“远程模块”当成资源缓存 —— //
//         staleTime: 5 * 60 * 1000,     // 5min 内视为新鲜（避免无谓重载）
//         gcTime: 30 * 60 * 1000,    // 30min 不用时仍保留缓存（回退/前进命中）
//         retry: 1,                     // 失败自动重试 1 次（再加上上面的 cache-busting）
//         refetchOnWindowFocus: false,  // 切回窗口不抖动
//         refetchOnReconnect: false,
//         networkMode: 'always',        // 即使离线恢复也会按需运行,
//         enabled: typeof window !== 'undefined' && importMapReady()
//     })

//     if (query.isLoading) {
//         return { Comp: null, loading: true, error: null }
//     }

//     if (query.isError) {
//         console.log(2)
//         return { Comp: null, loading: false, error: query.error }
//     }

//     const data = query.data!
//     return {
//         Comp: data.component ?? null,
//         loading: false,
//         error: null,
//         schema: data.schema,
//         validated: data.validated,
//         validationErrors: data.errors,
//     }
// }
