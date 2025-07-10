import AccountPageClient from "./AccountPageClient";
import { redirect } from 'next/navigation'
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";

// server comp 拿到params；client comp 只能通过useTenant()
export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {

    const { tenant: tenantName } = await params
    // 自动 force-dynamic 
    const safeUser = await getUserFromCookie(tenantName)
    if (!safeUser) {
        redirect(`/${tenantName}/login`)
    }
    return <AccountPageClient safeUser={safeUser} />
}