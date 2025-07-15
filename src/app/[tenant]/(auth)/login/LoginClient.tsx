"use client"
import { LoginAction } from '@/actions/auth/login'
import { LoginSchema } from "@/lib/schemas/base"
import dynamic from 'next/dynamic'
import LoginSkeleton from './LoginSkeleton'

export default function LoginPageClient() {
    const AuthForm = dynamic(() => import("@/components/auth/AuthForm"), {
        ssr: false, // 关闭 SSR，确保这是客户端组件
        loading: () => <LoginSkeleton />
    })
    return (
        <div className="containerM w-[400px] py-5 border shadow-lg">
            <AuthForm
                schema={LoginSchema}
                defaultValues={{ username: '', password: '', tenantName: '' }}
                onSubmitAction={LoginAction}
                successRedirect="/"
                successMessage="登录成功，正在跳转登录页..."
                submitText="登录"
                alternateLink={{ href: '/register', label: '没有账号？去注册' }}
                mode={"login"}
            />
        </div>
    )
}   