'use client';

import { loginAction } from '@/actions/auth/login';
import { fieldSchemas, LoginInput, LoginSchema } from '@/lib/schemas/base';
import { ActionRespType, Status } from '@/types/api/response';
import { SafeUser } from '@/types/entities/User';
import { ErrorCode } from '@/types/shared/error-code';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useTenantStore } from '@/Zustandstore/tenantStore';

const initialState: ActionRespType<SafeUser> = {
    status: Status.ERROR,
    code: -1,
    message: '',
    httpCode: 400,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="btn-primary">
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}

async function validatedLoginAction(_: unknown, formData: FormData) {
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;

    const result = LoginSchema.safeParse(raw);

    if (!result.success) {
        const first = result.error.errors[0];
        return {
            status: Status.ERROR,
            code: ErrorCode.VALIDATION_ERROR, // ✅ 你的业务错误码，自己定义（如 LOGIN_VALIDATION_FAILED）
            message: first?.message || 'Invalid input',
            httpCode: 400,
        };
    }

    // ✅ 校验通过后，调用真正的 server action
    return await loginAction(undefined, formData);
}

export default function LoginForm() {
    const { tenant } = useTenantStore()()
    const [state, formAction] = useFormState(validatedLoginAction, initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const [showRedirectMessage, setShowRedirectMessage] = useState(false);
    const router = useRouter();

    const validateField = useCallback((name: keyof LoginInput, value: string) => {
        const result = fieldSchemas[name].safeParse({ [name]: value });

        setErrors(prev => ({
            ...prev,
            [name]: result.success ? undefined : result.error.errors[0]?.message
        }));
    }, [])

    const debouncedValidate = useMemo(() => debounce(validateField, 500), [validateField])

    useEffect(() => {
        return () => {
            debouncedValidate.cancel();
        };
    }, [debouncedValidate]);

    // ✅ 登录成功后 3 秒跳转主页
    useEffect(() => {
        if (state.status === Status.SUCCESS) {
            setShowRedirectMessage(true);
            const timer = setTimeout(() => {
                router.push(`/${tenant.tenantName}`);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state, router, tenant.tenantName]);

    return (
        <form action={formAction}
            ref={formRef}
            className="space-y-4 max-w-md mx-auto mt-10">
            <input name="username" placeholder="Username" className="input" onChange={(e) => debouncedValidate("username", e.target.value)} />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            <input name="password" type="password" placeholder="Password" className="input" onChange={(e) => debouncedValidate("password", e.target.value)} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <input name="tenantName" type='hidden' className="input" value={tenant.tenantName} />
            {/* ✅ 错误提示 */}
            {state.status === Status.ERROR && (
                <p className="text-red-500 text-sm">{state.message}</p>
            )}
            {/* ✅ 登录成功后提示 */}
            {showRedirectMessage && (
                <p className="text-green-600 text-sm">登录成功，正在跳转首页...</p>
            )}

            <SubmitButton />
        </form>
    );
}
