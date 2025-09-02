import { ActionRespTypeError, ActionRespTypeSuccess } from '@/types/api/response';
import { redirect } from 'next/navigation';

type ServerRedirectOption =
    | { customRedirect: true; path: string }
    | { customRedirect?: false; path?: undefined };

type ClientErrorHandler = (err: ActionRespTypeError) => void;

interface AssertApiOptions {
    server?: ServerRedirectOption;
    client?: ClientErrorHandler;
}

/**
 * 通用 API 响应校验函数，支持服务端跳转与客户端错误提示。
 * 
 * ✅ 用法示例（服务端 Server Component 中）：
 * ```ts
 * await assertApiSuccess<SafeUser>(res); 
 * // 默认错误跳转到 /not-found?httpcode=xxx
 * 
 * await assertApiSuccess<SafeUser>(res, {
 *   server: { customRedirect: true, path: `/${tenant}/login?httpcode=`, },
 * });
 * // 自定义跳转到登录页
 * ```
 * 
 * ✅ 用法示例（客户端 Client Component 中）：
 * ```ts
 * await assertApiSuccess<SafeUser>(res, {
 *   client: (err) => toast.error(err.message),
 * });
 * // 请求失败时 toast 提示
 * ```
 */
export async function assertApiSuccess<T>(
    res: Response,
    options?: AssertApiOptions
): Promise<T | void> {
    if (res.ok) {
        const json: ActionRespTypeSuccess<T> = await res.json();
        return json.data!;
    }

    const err: ActionRespTypeError = await res.json();

    if (typeof window === 'undefined') {
        console.log(`BizError ${err.code}: ${err.message}`);
        // 服务端
        if (options?.server?.customRedirect && options.server.path) {
            redirect(`${options.server.path}`); // 中断退出，本质是Error
        } else {
            redirect(`/not-found?httpcode=${res.status}`);
        }
    } else {
        // 客户端
        if (typeof options?.client === 'function') {
            options.client(err);
            return Promise.resolve(); // 👈 非常重要：结束这次 Promise 执行
        } else {
            console.error(err);
            throw new Error(`客户端请求失败：${err.message}`);
        }
    }

}

