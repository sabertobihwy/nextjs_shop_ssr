"use client"

import { registerAction } from "@/actions/auth/register"
import AuthForm from "@/components/auth/AuthForm"
import { RegisterSchema } from "@/lib/schemas/base"

export default function RegisterClient() {
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