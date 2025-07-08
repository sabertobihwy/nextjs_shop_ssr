// components/TenantLink.tsx
'use client'

import { useTenantName } from '@/redux/hooks/useTenant'
import Link from 'next/link'

/**
 * 
 * @usage <TenantLink href="/account/settings">账号设置</TenantLink>
 * 
 */
export default function TenantLink({
    href,
    ...props
}: React.ComponentProps<typeof Link>) {
    const tenantName = useTenantName()

    if (!tenantName) return null

    const normalizedHref = typeof href === 'string'
        ? `/${tenantName}${href.startsWith('/') ? href : `/${href}`}`
        : href // 不处理 URL 对象

    return <Link href={normalizedHref} {...props} />
}
