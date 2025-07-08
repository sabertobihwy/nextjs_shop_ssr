import { z } from 'zod'

// 登录 schema
export const LoginSchema = z.object({
    username: z.string().min(8).max(15),
    password: z.string().min(8).max(15),
    tenantName: z.string().min(1).max(64),
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
