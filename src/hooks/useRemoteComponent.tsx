'use client'
import Ajv2020, { AnySchema, ErrorObject } from 'ajv/dist/2020.js'
import { loadRemoteComponent } from '@/lib/theme-loader/utils/loadRemoteComponent'
import { useQuery } from '@tanstack/react-query'

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
    validationErrors?: ErrorObject[] | any[]
}
// 用 schema 引用做缓存键；同一份 schema（同一模块实例）只编译一次
const validatorCache = new WeakMap<object, ReturnType<typeof ajv.compile>>()

export function useRemoteComponent<TValidated = any>(
    { url, exportName = 'default', validateProps, strict = false }: UseRemoteOpts<TValidated>
): UseRemoteResult {
    const q = useQuery({
        queryKey: ['remoteComponent', url, exportName] as const,
        queryFn: async () => {
            // 你自己的 loader 已经做了 waitForReactGlobal + single-flight + retry
            const mod: any = await loadRemoteComponent(url, { exportName })
            let component: React.ComponentType<any>
            let schema: any | undefined

            if (mod && typeof mod === 'object' && 'component' in mod) {
                component = mod.component
                schema = mod.schema
                // console.log('=====schema:', schema)
            } else {
                component = mod
            }
            return { component, schema } as const
        },
        // 远程 URL 一般带 hash：视作永远新鲜；换 URL 即新版本
        staleTime: Infinity,
        // 无订阅后 30 分钟把这条 Query 从内存缓存移除（与 ESM 是否卸载无关）
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // 底层已 retry，这里不开启，避免双重重试
        retry: false,
        networkMode: 'always',
        enabled: Boolean(url),
    })

    const loading = q.isPending || q.isLoading
    const baseError = q.error ?? null

    let Comp: React.ComponentType<any> | null = null
    let schema: any | undefined
    let validated: boolean | undefined
    let validationErrors: any[] | undefined
    let validationErrorObj: Error | null = null

    if (q.data) {
        Comp = q.data.component ?? null
        schema = q.data.schema

        // —— 校验仅在拿到 schema 后进行；不会触发新的查询 ——
        if (schema) {
            if (validateProps == null) {
                const msg = `[useRemoteComponent] schema present at ${url} but no validateProps provided`
                if (process.env.NODE_ENV !== 'production' && strict) {
                    validationErrorObj = new Error(msg)
                } else {
                    console.warn(msg)
                }
                validated = undefined // 无 props 不判通过/失败
            } else {
                try {
                    // 复用已编译的 validator
                    const key = (schema && typeof schema === 'object') ? schema as object : null
                    const validator =
                        key && validatorCache.get(key as object)
                        || ajv.compile(schema as AnySchema)
                    if (key && !validatorCache.has(key)) validatorCache.set(key, validator)

                    const ok = !!validator(validateProps as any)
                    validated = ok
                    if (!ok) {
                        validationErrors = validator.errors ?? []
                        const text = `[useRemoteComponent] schema validation failed for ${url}: ${JSON.stringify(validationErrors, null, 2)}`
                        if (process.env.NODE_ENV !== 'production') {
                            validationErrorObj = new Error(text)
                        } else {
                            console.error(text)
                        }
                    }
                } catch (e: any) {
                    validationErrorObj = new Error(`[useRemoteComponent] schema compile error for ${url}: ${e?.message || e}`)
                }
            }
        } else {
            validated = true // 无 schema 视作通过
        }
    }

    const error = baseError ?? validationErrorObj
    return { Comp, loading, error, schema, validated, validationErrors }
}
