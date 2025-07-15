"use client"

import { registerAction } from "@/actions/auth/register"
import dynamic from 'next/dynamic'
import { RegisterSchema } from "@/lib/schemas/base"
import RegisterSkeleton from "./RegisterSkeleton"

export default function RegisterClient() {
    const AuthForm = dynamic(() => import("@/components/auth/AuthForm"), {
        ssr: false,
        loading: () => <RegisterSkeleton />
    })
    return <div className="containerM w-[400px] py-5 border shadow-lg">
        <AuthForm
            schema={RegisterSchema}
            defaultValues={{ username: '', password: '', tenantName: '' }}
            onSubmitAction={registerAction}
            successRedirect="/login"
            successMessage="注册成功，正在跳转登录页..."
            submitText="注册"
            alternateLink={{ href: '/login', label: '已有账号？去登录' }}
            mode={"register"}
            IPcheck={true}
        />
    </div>
}