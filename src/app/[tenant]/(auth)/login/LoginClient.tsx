"use client"
import { LoginAction } from '@/actions/auth/login'
import AuthForm from "@/components/auth/AuthForm"
import { LoginSchema } from "@/lib/schemas/base"

export default function LoginPageClient() {
    return <div className="containerM max-w-[400px] py-5 border shadow-lg">
        <AuthForm
            schema={LoginSchema}
            defaultValues={{ username: '', password: '', tenantName: '' }}
            onSubmitAction={LoginAction}
            successRedirect="/"
            successMessage="登录成功，正在跳转登录页..."
            submitText="登录"
            alternateLink={{ href: '/register', label: '没有账号？去注册' }}
        />
    </div>
}   