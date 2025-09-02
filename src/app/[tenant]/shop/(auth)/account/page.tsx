import AccountPageClient from "./AccountPageClient";
import { assertApiSuccess } from "@/lib/http/assert";
import { SafeUser } from "@/types/entities/User";
import { cookies } from "next/headers";

// server comp 拿到params；client comp 只能通过useTenant()
export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {

    const { tenant: tenantName } = await params
    // 默认no-store
    const cookieStore = await cookies()
    const refreshResp = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/account/refresh`, {
        cache: 'no-store',
        headers: {
            cookie: cookieStore.toString(), // 手动带上 cookie
        },
    })
    const safeUser = (await assertApiSuccess<SafeUser>(refreshResp, {
        server: { customRedirect: true, path: `/${tenantName}/login`, }
    }))! // 是否需要拿出SafeUser? 需要的

    return <AccountPageClient safeUser={safeUser} /> // 可以客户端获取UserPublic
}