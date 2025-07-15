'use client'

import { assertApiSuccess } from "@/lib/http/assert";
import { useTenant } from "@/redux/hooks/useTenant";
import { TenantPublic } from "@/types/entities/Tenant";
import { ReactNode, useEffect } from "react";

export default function TenantBootstrap({ tenantName, children }: { tenantName: string; children: ReactNode }) {
    const { setTenantId } = useTenant()

    useEffect(() => {
        const run = async () => {
            const tenantRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantName}/tenant`, {
                next: { revalidate: 3600 }
            })
            try {
                const { tenantId } = (await assertApiSuccess<TenantPublic>(tenantRes))!
                setTenantId(tenantId)
            } catch (err) {
                console.log(err)
            }
        }
        run()
    }, [setTenantId, tenantName])

    return (
        <>{children}</>
    )
}
