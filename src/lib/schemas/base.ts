import { z } from 'zod'

// 登录 schema
export const LoginSchema = z.object({
    username: z
        .string()
        .min(8, { message: '用户名至少需要 8 个字符' })
        .max(15, { message: '用户名不能超过 15 个字符' }),

    password: z
        .string()
        .min(8, { message: '密码至少需要 8 个字符' })
        .max(15, { message: '密码不能超过 15 个字符' }),

    tenantName: z
        .string()
        .min(1, { message: '租户名不能为空' })
        .max(64, { message: '租户名不能超过 64 个字符' }),
})


export const fieldSchemas = {
    username: LoginSchema.pick({ username: true }),
    password: LoginSchema.pick({ password: true }),
    tenantName: LoginSchema.pick({ tenantName: true }),
};

export type LoginInput = z.infer<typeof LoginSchema>

// 注册 schema 可以和登录复用，或者独立
export const RegisterSchema = LoginSchema
export type RegisterInput = z.infer<typeof RegisterSchema>
