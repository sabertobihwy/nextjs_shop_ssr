'use client'

import { z } from 'zod'
import { useForm, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { ActionRespType, ActionRespTypeError, Status } from '@/types/api/response'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import TenantLink from '@/components/TenantLink'
import { useTenantRouter } from '@/router/useTenantRouter'
import { useAuth } from '@/redux/hooks/useAuth'
import { toUserPublic, isSafeUser } from '@/types/entities/User'
import { useTenant } from '@/redux/hooks/useTenant'
import Turnstile from './Turnstile'
import { useStatus, StatusHint } from './useStatus'


type AuthFormProps<S extends z.ZodTypeAny, R = null> = {
    schema: S
    defaultValues: z.infer<S>
    onSubmitAction: (values: z.infer<S>) => Promise<ActionRespType<R>>
    successRedirect: string
    successMessage: string
    submitText: string
    alternateLink?: {
        href: string
        label: string
    },
    IPcheck?: boolean
}


export default function AuthForm<S extends z.ZodTypeAny, R>({
    schema,
    defaultValues,
    onSubmitAction,
    successRedirect,
    successMessage,
    submitText,
    alternateLink,
    IPcheck
}: AuthFormProps<S, R>) {
    const { tenantName, tenantId } = useTenant()
    const { push } = useTenantRouter()

    const form = useForm<z.infer<S>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValues,
            tenantName: tenantName || ''
        }
    })

    const {
        status,
        message,
        setLoading,
        setSuccess,
        setError,
    } = useStatus()
    const [token, setToken] = useState<string | null>(null)
    const { setUser } = useAuth()

    async function onSubmit(values: z.infer<S>) {
        if (!token && IPcheck) {
            setError("请先通过人机验证")
            return
        }
        setLoading("处理中...")
        await Promise.resolve()
        if (IPcheck) {
            const ipRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantName}/account/ipcheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenant_id: tenantId,
                    turnstile_token: token
                }),
            })
            if (!ipRes.ok) {
                const err: ActionRespTypeError = await ipRes.json();
                setError(err.message || err.code.toString())
                return
                // other error 
                //push(`/not-found?httpcode=${ipRes.status}`);
            }
        }
        const result = await onSubmitAction(values)
        if (result.status === Status.SUCCESS) {
            setSuccess(successMessage)
            if (isSafeUser(result.data)) { // for login
                setUser(toUserPublic(result.data))
            }
            setTimeout(() => push(`${successRedirect}`), 3000)
        } else {
            setError(result.message || result.code.toString())
            console.log(JSON.stringify(result, null, 2))
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto mt-10 ">
                {/* 用户名 */}
                <FormField
                    control={form.control}
                    name={"username" as Path<z.infer<S>>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >用户名</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入用户名" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* 密码 */}
                <FormField
                    control={form.control}
                    name={"password" as Path<z.infer<S>>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="请输入密码" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* 租户名（隐藏） */}
                <input type="hidden" {...form.register('tenantName' as Path<z.infer<S>>)} value={tenantName} />

                {IPcheck && <Turnstile onSuccess={setToken} />}
                <Button type="submit" size={"lg"}>{submitText}</Button>
                {/* 状态提示（稳定占位） */}
                <StatusHint status={status} message={message} />

                {/* 登录跳转 */}
                {alternateLink && (
                    <div className="text-sm text-center text-gray-600 pt-2">
                        <TenantLink
                            href={alternateLink.href}
                            className="text-blue-600 hover:underline hover:text-blue-800"
                        >
                            {alternateLink.label}
                        </TenantLink>
                    </div>
                )}
            </form>
        </Form>
    )
}
