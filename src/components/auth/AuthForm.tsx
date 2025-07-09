'use client'

import { z } from 'zod'
import { useForm, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { ActionRespType, Status } from '@/types/api/response'
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
import { useTenantName } from '@/redux/hooks/useTenant'
import { useTenantRouter } from '@/router/useTenantRouter'
import { useAuth } from '@/redux/hooks/useAuth'
import { toUserPublic, isSafeUser } from '@/types/entities/User'

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
    }
}


export default function AuthForm<S extends z.ZodTypeAny, R>({
    schema,
    defaultValues,
    onSubmitAction,
    successRedirect,
    successMessage,
    submitText,
    alternateLink
}: AuthFormProps<S, R>) {
    const tenantName = useTenantName()
    const { push } = useTenantRouter()

    const form = useForm<z.infer<S>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValues,
            tenantName: tenantName || ''
        }
    })

    const [statusMessage, setStatusMessage] = useState<string | null>(null)
    const [status, setStatus] = useState<Status | null>(null)
    const { setUser } = useAuth()

    async function onSubmit(values: z.infer<S>) {
        const result = await onSubmitAction(values)

        if (result.status === Status.SUCCESS) {
            setStatus(Status.SUCCESS)
            setStatusMessage(successMessage)
            if (isSafeUser(result.data)) { // for login
                setUser(toUserPublic(result.data))
            }
            setTimeout(() => push(`${successRedirect}`), 3000)
        } else {
            setStatus(Status.ERROR)
            console.log(JSON.stringify(result, null, 2))
            setStatusMessage(result.message || result.code.toString())
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

                {/* 状态提示 */}
                {status === Status.ERROR && (
                    <p className="text-red-500 text-sm">{statusMessage}</p>
                )}
                {status === Status.SUCCESS && (
                    <p className="text-green-600 text-sm">{statusMessage}</p>
                )}

                <Button type="submit">{submitText}</Button>

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
